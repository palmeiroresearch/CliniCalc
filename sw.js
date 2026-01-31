// ============================================
// CLINICALC - SERVICE WORKER
// Funcionalidad Offline Completa
// ============================================

const CACHE_NAME = 'clinicalc-v1.0.0';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    './css/main.css',
    './js/config.js',
    './js/storage.js',
    './js/calculators.js',
    './js/ui.js',
    './js/app.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

// === INSTALACIÓN === //
self.addEventListener('install', (event) => {
    console.log('[SW] Instalando CliniCalc...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Cacheando archivos');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('[SW] Instalación completa');
                return self.skipWaiting();
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
                    
                    return cachedResponse;
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
                            return caches.match('./index.html');
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
