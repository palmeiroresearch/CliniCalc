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

(function () {
    if (!window.Capacitor || !Capacitor.isNativePlatform || !Capacitor.isNativePlatform()) {
        return;
    }

    const CapacitorUpdater = Capacitor.Plugins && Capacitor.Plugins.CapacitorUpdater;
    if (!CapacitorUpdater) return;

    // Confirma que el bundle actual cargó bien. Debe llamarse ANTES de
    // cualquier red — si no se llama a tiempo (10s), el plugin hace
    // rollback automático al bundle anterior/builtin.
    CapacitorUpdater.notifyAppReady().catch(() => {});

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

    async function checkForUpdate() {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

            const response = await fetch(MANIFEST_URL, { cache: 'no-store', signal: controller.signal });
            clearTimeout(timeout);
            if (!response.ok) return;

            const manifest = await response.json();
            if (!manifest || !manifest.version || !manifest.url) return;

            const currentVersion = (typeof APP_VERSION !== 'undefined') ? APP_VERSION : null;
            if (!currentVersion || !isNewerVersion(manifest.version, currentVersion)) return;

            const bundle = await CapacitorUpdater.download({
                version: manifest.version,
                url: manifest.url
            });

            // next() aplica el bundle recién descargado la próxima vez que la
            // app pase a segundo plano o se reabra — no interrumpe la sesión
            // actual (a diferencia de set(), que recarga de inmediato).
            await CapacitorUpdater.next({ id: bundle.id });

            console.log('[OTA] Actualización', manifest.version, 'descargada — se aplicará al reabrir la app.');
        } catch (err) {
            // Sin red, timeout, manifiesto inválido, descarga fallida, etc.
            // No hacer nada más: la app sigue funcionando con el bundle actual.
            console.warn('[OTA] Chequeo de actualización omitido:', err && err.message);
        }
    }

    checkForUpdate();
})();
