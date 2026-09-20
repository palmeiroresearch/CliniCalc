// === OTA UPDATER === //
// Actualizaciones over-the-air self-hosted vía @capgo/capacitor-updater,
// SIN usar el servicio cloud de Capgo (ver mobile/capacitor.config.json:
// autoUpdate=false, statsUrl=""). Todo el control de versión es propio,
// vía ./ota/manifest.json hosteado en el mismo dominio que la PWA.
//
// No hace nada en la PWA/navegador — solo corre dentro de la app nativa
// (Capacitor). Diseñado para ser 100% best-effort: cualquier fallo de red
// o del manifiesto se ignora en silencio y la app sigue con el bundle que
// ya tiene instalado. Nunca debe bloquear ni romper el arranque offline.
//
// Expone window.OtaUpdater.checkNow() para que la UI (ej. el botón
// "Buscar actualización" en Ajustes) pueda mostrar el estado REAL del OTA
// en vez de confundirlo con el chequeo del Service Worker (que es un
// mecanismo aparte, pensado para la PWA/navegador).

(function () {
    const isNative = !!(window.Capacitor && Capacitor.isNativePlatform && Capacitor.isNativePlatform());
    const CapacitorUpdater = isNative && Capacitor.Plugins && Capacitor.Plugins.CapacitorUpdater;

    const MANIFEST_URL = './ota/manifest.json';
    const FETCH_TIMEOUT_MS = 8000;

    function isNewerVersion(remote, local) {
        const r = String(remote).split('.').map(n => parseInt(n, 10) || 0);
        const l = String(local).split('.').map(n => parseInt(n, 10) || 0);
        for (let i = 0; i < Math.max(r.length, l.length); i++) {
            const rv = r[i] || 0, lv = l[i] || 0;
            if (rv > lv) return true;
            if (rv < lv) return false;
        }
        return false;
    }

    async function fetchManifest() {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
        try {
            const response = await fetch(MANIFEST_URL, { cache: 'no-store', signal: controller.signal });
            if (!response.ok) return null;
            const manifest = await response.json();
            if (!manifest || !manifest.version || !manifest.url) return null;
            return manifest;
        } finally {
            clearTimeout(timeout);
        }
    }

    // Chequeo manual, para uso desde la UI. Devuelve SIEMPRE un objeto
    // describiendo qué pasó — nunca lanza — para que quien lo llama pueda
    // mostrar un mensaje preciso al usuario.
    async function checkNow() {
        if (!isNative || !CapacitorUpdater) {
            return { supported: false };
        }

        const activeVersion = (typeof APP_VERSION !== 'undefined') ? APP_VERSION : null;

        try {
            const current = await CapacitorUpdater.current();
            const runningVersion = (current && current.bundle && current.bundle.id !== 'builtin')
                ? current.bundle.version
                : activeVersion;

            const manifest = await fetchManifest();
            if (!manifest) {
                return { supported: true, error: 'manifest', runningVersion };
            }

            if (!isNewerVersion(manifest.version, runningVersion)) {
                return { supported: true, upToDate: true, runningVersion, latestVersion: manifest.version };
            }

            // Hay una versión más nueva: descargarla y dejarla lista.
            const bundle = await CapacitorUpdater.download({
                version: manifest.version,
                url: manifest.url
            });
            await CapacitorUpdater.next({ id: bundle.id });

            return {
                supported: true,
                upToDate: false,
                staged: true,
                runningVersion,
                latestVersion: manifest.version
            };
        } catch (err) {
            return { supported: true, error: (err && err.message) || 'unknown', runningVersion };
        }
    }

    window.OtaUpdater = { checkNow, isNewerVersion };

    // --- Chequeo automático y silencioso al arrancar (comportamiento previo) ---
    if (!isNative || !CapacitorUpdater) return;

    // Confirma que el bundle actual cargó bien. Debe llamarse ANTES de
    // cualquier red — si no se llama a tiempo (10s), el plugin hace
    // rollback automático al bundle anterior/builtin.
    CapacitorUpdater.notifyAppReady().catch(() => {});

    checkNow().then((result) => {
        if (result && result.staged) {
            console.log('[OTA] Actualización', result.latestVersion, 'descargada — se aplicará al reabrir la app.');
        } else if (result && result.error) {
            console.warn('[OTA] Chequeo de actualización omitido:', result.error);
        }
    });
})();
