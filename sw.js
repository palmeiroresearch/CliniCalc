// ============================================
// CLINICALC - SERVICE WORKER
// Funcionalidad Offline Completa
// ============================================

const CACHE_NAME = 'clinicalc-v2.0.2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './css/main.css',
    './css/additional-styles.css',
    './js/config.js',
    './js/ota-updater.js',
    './js/storage.js',
    './js/calculators.js',
    './js/ui.js',
    './js/app.js',
    './js/forms.js',
    './js/forms2.js',
    './js/ivcalc/drugs-vasoactive.js',
    './js/ivcalc/drug-index.js',
    './js/antibioticos/antibiotics-data.js',
    './js/antibioticos/antibiotics-data-orl.js',
    './js/antibioticos/antibiotics-data-its2.js',
    './js/antibioticos/antibiotics-data-fungal.js',
    './js/antibioticos/antibiotics-data-tropical.js',
    './js/antibioticos/antibiotics-data-misc.js',
    './js/antibioticos/antibiotics-data-batch2-abdominal.js',
    './js/antibioticos/antibiotics-data-batch2-neuro-ocular.js',
    './js/antibioticos/antibiotics-data-batch2-resp-piel-uro.js',
    './js/antibioticos/antibiotics-data-tropical2.js',
    './js/antibioticos/antibiotics-index.js',
    './js/antibioticos/antibiotics-calculator.js',
    './js/ivcalc/iv-calculator.js',
    './js/laboratorio/lab-data-hematologia.js',
    './js/laboratorio/lab-data-quimica.js',
    './js/laboratorio/lab-data-iones-gases.js',
    './js/laboratorio/lab-data-hormonas.js',
    './js/laboratorio/lab-data-inmunologia.js',
    './js/laboratorio/lab-data-nefro-orina.js',
    './js/laboratorio/lab-index.js',
    './js/laboratorio/lab-calculator.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// === INSTALACIÓN === //
// === RESPUESTAS REDIRIGIDAS === //
// Safari NO acepta que una navegación se sirva con una respuesta que viene
// de una redirección: «Response served by service worker has redirections»,
// y la app no carga, ni con red ni sin ella (Chromium aplica la misma regla).
//
// Cloudflare Pages redirige /index.html → / con un 308; GitHub Pages no lo
// hacía. `cache.addAll` sigue esa redirección y guarda la respuesta MARCADA
// como redirigida bajo './index.html' — que es donde arranca la app instalada
// (start_url) y lo que se sirve como respaldo sin red. Por eso se rompió tras
// la migración.
//
// La respuesta se reconstruye con el mismo cuerpo, estado y cabeceras; solo se
// pierde la marca. Se limpia al instalar y también al servir, por si queda
// alguna entrada vieja. Se copia con blob() y no pasando el body en stream
// porque Safari ha tenido fallos con lo segundo.
async function sinRedireccion(res) {
    if (!res || !res.redirected) return res;
    return new Response(await res.blob(), {
        status: res.status, statusText: res.statusText, headers: res.headers,
    });
}

async function limpiarRedirecciones(cache) {
    for (const req of await cache.keys()) {
        const res = await cache.match(req);
        if (res && res.redirected) await cache.put(req, await sinRedireccion(res));
    }
}

self.addEventListener('install', (event) => {
    console.log('[SW] Instalando CliniCalc...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Cacheando archivos');
                return cache.addAll(ASSETS_TO_CACHE)
                    .then(() => limpiarRedirecciones(cache));
            })
            .then(() => {
                console.log('[SW] Instalación completa - esperando confirmación del usuario');
                // NO hacer skipWaiting() aquí - esperar mensaje del usuario
            })
            .catch((error) => {
                console.error('[SW] Error al cachear:', error);
            })
    );
});

// === ACTIVACIÓN === //
self.addEventListener('activate', (event) => {
    console.log('[SW] Activando CliniCalc...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[SW] Eliminando cache antiguo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Activación completa');
                return self.clients.claim();
            })
    );
});

// === FETCH (Cache-First Strategy) === //
self.addEventListener('fetch', (event) => {
    // Solo cachear requests GET
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Ignorar requests no-HTTP
    if (!event.request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Servir desde cache
                    console.log('[SW] Sirviendo desde cache:', event.request.url);
                    
                    // Actualizar cache en background (stale-while-revalidate)
                    fetch(event.request)
                        .then((networkResponse) => {
                            if (networkResponse && networkResponse.status === 200) {
                                caches.open(CACHE_NAME)
                                    .then((cache) => {
                                        cache.put(event.request, networkResponse.clone());
                                    });
                            }
                        })
                        .catch(() => {
                            // Sin conexión, seguir usando cache
                        });
                    
                    return sinRedireccion(cachedResponse);
                }
                
                // Obtener de red y cachear
                console.log('[SW] Obteniendo de red:', event.request.url);
                return fetch(event.request)
                    .then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200) {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseClone);
                                });
                        }
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[SW] Error de red:', error);
                        
                        // Si falla navegación, mostrar página offline
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html').then(sinRedireccion);
                        }
                        
                        throw error;
                    });
            })
    );
});

// === MENSAJES === //
self.addEventListener('message', (event) => {
    console.log('[SW] Mensaje recibido:', event.data);
    
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys()
                .then((cacheNames) => {
                    return Promise.all(
                        cacheNames.map((cacheName) => caches.delete(cacheName))
                    );
                })
                .then(() => {
                    console.log('[SW] Cache limpiado');
                    if (event.ports && event.ports[0]) {
                        event.ports[0].postMessage({ success: true });
                    }
                })
        );
    }
});

// === BACKGROUND SYNC (Futuro) === //
self.addEventListener('sync', (event) => {
    console.log('[SW] Sincronización background:', event.tag);
    
    if (event.tag === 'sync-calculations') {
        event.waitUntil(
            Promise.resolve()
                .then(() => {
                    console.log('[SW] Sincronización completada');
                })
        );
    }
});

// === NOTIFICACIONES PUSH (Futuro) === //
self.addEventListener('push', (event) => {
    console.log('[SW] Push recibido:', event);
    
    const data = event.data ? event.data.json() : {};
    
    const options = {
        body: data.body || 'Nueva notificación',
        icon: './icon-192.png',
        badge: './icon-192.png',
        vibrate: [200, 100, 200],
        data: data,
        actions: [
            { action: 'open', title: 'Abrir' },
            { action: 'close', title: 'Cerrar' }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'CliniCalc', options)
    );
});

self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Click en notificación');
    event.notification.close();
    
    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow('./')
        );
    }
});
