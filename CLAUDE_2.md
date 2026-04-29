# Guía Claude — Web Apps Médicas (Vanilla Stack)

Guía de referencia para construir web apps médicas con UI profesional, modo offline y excelente UX. Basada en la arquitectura refinada de CliniCalc. Aplica a calculadoras, scores, formularios clínicos, gestores de pacientes y herramientas similares.

---

## 1. Stack y filosofía

**Stack**: HTML5 + CSS3 + JavaScript ES6+ **sin frameworks**. Sin React, Vue, Angular, ni bundlers.

**Por qué vanilla:**
- Cero tiempo de carga de runtime
- Funciona offline sin compilación
- Depurable directamente en DevTools
- Instalable como PWA sin configuración extra

**Regla de oro**: si algo se puede hacer con CSS puro, no uses JS. Si algo se puede hacer sin librería, no la añadas.

---

## 2. Estructura de archivos

### Principio: separar por responsabilidad, no por volumen

Cada archivo tiene **una razón para cambiar**. No splits arbitrarios ni monolitos por descuido. La estructura escala con la app — no la sobre-diseñes desde el día uno.

| Responsabilidad | Qué va aquí |
|-----------------|-------------|
| **config** | Constantes globales, metadata, versión, interpretaciones clínicas |
| **storage** | Toda la lógica de persistencia (LocalStorage / IndexedDB) |
| **logic / calculators** | Fórmulas y reglas de negocio puras — **sin tocar el DOM** |
| **ui** | Funciones de renderizado, CSS inyectado dinámicamente |
| **forms / views** | Generación de formularios e inputs por dominio |
| **app** | Inicialización, navegación, event handlers globales, SW |

### Cuándo dividir un archivo

- **~400 líneas**: señal de alerta, valorar si hay dos responsabilidades mezcladas
- **~600+ líneas**: dividir, siempre por dominio (no por secuencia)
- **Nunca**: `logic2.js`, `forms2.js`, `utils_v2.js` — el número en el nombre es código muerto futuro

**Dividir por dominio, no por cantidad:**
```
# ❌ División por volumen — no comunica nada
forms.js / forms2.js

# ✅ División por dominio — cada archivo dice lo que contiene
forms-renal.js / forms-cardio.js / forms-neuro.js
# o por tipo si el dominio no aplica:
forms-scores.js / forms-labs.js
```

### Estructura de referencia (apps pequeñas-medianas)

```
mi-app/
├── index.html          # Shell + nav + <script> en orden al final del body
├── manifest.json       # PWA metadata
├── sw.js               # Service Worker
├── CLAUDE.md           # Contexto del proyecto para Claude Code
│
├── css/
│   ├── main.css        # Design system completo (variables, componentes, layout)
│   └── [dominio].css   # Opcional: estilos muy específicos de un área
│
└── js/
    ├── config.js       # APP_VERSION + datos de configuración de la app
    ├── storage.js      # Persistencia (un módulo, métodos cohesivos)
    ├── [logic].js      # Lógica de negocio pura, sin DOM — dividir por dominio si crece
    ├── ui.js           # Renderizado dinámico
    ├── [forms/views].js # Formularios — dividir por dominio cuando supere ~500 líneas
    └── app.js          # Punto de entrada: init, navegación, orquestación
```

### Orden de scripts — respeta dependencias

```html
<!-- Siempre al final del <body>, en orden de dependencia -->
<script src="js/config.js"></script>     <!-- sin dependencias -->
<script src="js/storage.js"></script>    <!-- usa config -->
<script src="js/logic.js"></script>      <!-- usa config + storage -->
<script src="js/ui.js"></script>         <!-- usa config + storage + logic -->
<script src="js/forms.js"></script>      <!-- usa todo lo anterior -->
<script src="js/app.js"></script>        <!-- orquesta todo, carga última -->
```

La regla es simple: un script solo puede usar lo que fue declarado antes que él.

---

## 3. Design System CSS

### Variables obligatorias en `:root`

```css
:root {
    /* Brand */
    --brand-primary: #1e3872;
    --brand-primary-dark: #13294f;
    --brand-accent: #78daab;
    --brand-accent-dark: #5bc492;
    --brand-accent-light: #9ae4c1;

    /* Semánticos */
    --success: #10b981;
    --danger: #ef4444;
    --warning: #f59e0b;
    --info: #3b82f6;

    /* Fondos (modo claro) */
    --bg-body: #f8fafc;
    --bg-card: #ffffff;
    --bg-secondary: #f1f5f9;
    --bg-tertiary: #e2e8f0;
    --input-bg: #ffffff;

    /* Texto */
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-tertiary: #94a3b8;

    /* Bordes */
    --border-color: #e2e8f0;
    --border-color-strong: #cbd5e1;

    /* Sombras */
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1);

    /* Radios */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;

    /* Transiciones */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Modo oscuro — sobreescribe solo las variables de color */
body.dark-mode {
    --bg-body: #0f172a;
    --bg-card: #1e293b;
    --bg-secondary: #334155;
    --bg-tertiary: #475569;
    --input-bg: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-tertiary: #94a3b8;
    --border-color: #334155;
    --border-color-strong: #475569;
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
    --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.5);
    --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.6);
}
```

### Tipografía
```css
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
}
/* Cargar Inter desde Google Fonts o usar system-ui como fallback */
```

### Sistema de colores por entidad/categoría
Muy útil para apps con múltiples tipos de items (calculadoras por categoría, pacientes por estado, etc.):
```css
[data-category="renal"]        { --cat-color: #3b82f6; --cat-color-bg: rgba(59,130,246,0.13); }
[data-category="cardio"]       { --cat-color: #ef4444; --cat-color-bg: rgba(239,68,68,0.13); }
/* etc. — se usa en cards, badges, hovers automáticamente */
```
El `data-category` se añade en el JS al renderizar. El CSS funciona solo sin más código.

---

## 4. Componentes UI esenciales

### Cards de items
```css
.item-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 20px 16px;
    cursor: pointer;
    position: relative;
    transition: all var(--transition-normal);
    overflow: hidden;
}

/* Línea de acento superior — color de categoría */
.item-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--cat-color, var(--brand-accent));
    opacity: 0.5;
    transition: opacity var(--transition-normal);
}

.item-card:hover::before { opacity: 1; }
.item-card:hover {
    border-color: var(--cat-color, var(--brand-accent));
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg), 0 0 0 1px var(--cat-color, var(--brand-accent));
}
.item-card:active { transform: translateY(-2px); }
```

### Icono de item (contenedor coloreado)
```css
.item-icon-wrapper {
    width: 58px; height: 58px;
    border-radius: 16px;
    background: var(--cat-color-bg, rgba(120,218,171,0.12));
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
    transition: transform var(--transition-normal);
}
.item-card:hover .item-icon-wrapper {
    transform: scale(1.1) rotate(-4deg);
}
.item-icon { font-size: 28px; display: block; line-height: 1; }
```

### Form inputs
```css
.form-input {
    width: 100%;
    padding: 12px;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--input-bg);
    color: var(--text-primary);
    font-family: inherit;
    font-size: 15px;
    transition: all var(--transition-fast);
}
.form-input:focus {
    outline: none;
    border-color: var(--brand-accent);
    box-shadow: 0 0 0 3px rgba(120, 218, 171, 0.15);
}
```

### Botones
```css
.btn { padding: 12px 24px; border-radius: var(--radius-md); font-size: 15px; font-weight: 600; border: none; cursor: pointer; font-family: inherit; transition: all var(--transition-fast); }
.btn:active { transform: scale(0.98); }

.btn-primary { background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); color: var(--brand-primary-dark); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(120,218,171,0.4); }

.btn-secondary { background: var(--bg-secondary); color: var(--text-primary); border: 2px solid var(--border-color); }
.btn-secondary:hover { background: var(--bg-tertiary); }

.btn-danger { background: transparent; color: var(--danger); border: 2px solid var(--danger); }
.btn-danger:hover { background: var(--danger); color: white; }
```

### Modal (overlay + card)
```javascript
function openModal(title, subtitle, contentHTML) {
    const overlay = document.createElement('div');
    overlay.id = 'appModal';
    overlay.style.cssText = `
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.5);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000; backdrop-filter: blur(4px);
        animation: fadeIn 0.2s ease; overflow-y: auto; padding: 20px;
    `;
    overlay.innerHTML = `
        <div style="background:var(--bg-card); border-radius:var(--radius-xl);
                    padding:24px; max-width:500px; width:100%; max-height:90vh;
                    overflow-y:auto; box-shadow:var(--shadow-xl);
                    animation: scaleIn 0.3s ease;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
                <div>
                    <h2 style="font-size:20px; font-weight:700; margin-bottom:4px;">${title}</h2>
                    <p style="font-size:13px; color:var(--text-secondary);">${subtitle}</p>
                </div>
                <button onclick="event.stopPropagation(); closeModal()" style="background:var(--bg-secondary); border:none; width:36px; height:36px; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="pointer-events:none;">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div id="modalContent">${contentHTML}</div>
        </div>
    `;
    overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };
    document.body.appendChild(overlay);
}

function closeModal() {
    const modal = document.getElementById('appModal');
    if (!modal) return;
    modal.style.animation = 'fadeOut 0.2s ease forwards'; /* IMPORTANTE: forwards */
    setTimeout(() => modal.remove(), 210);
}
```

**Trampas del modal:**
- Siempre `forwards` en la animación de cierre → evita el flash de reaparición
- `stopPropagation()` en el botón X + `pointer-events:none` en el SVG interno
- El `setTimeout` debe ser 5-10ms mayor que la duración de la animación

### Toast notifications
```javascript
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer'); // div fijo en el HTML
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${{success:'✓',error:'✕',warning:'⚠',info:'ℹ'}[type]}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.animation = 'slideOut 0.3s ease'; setTimeout(() => toast.remove(), 300); }, duration);
}
```

### Bottom Navigation (móvil)
```html
<nav class="bottom-nav">
    <button class="nav-item active" data-tab="home">
        <!-- SVG icon --> <span>Inicio</span>
    </button>
    <!-- más tabs -->
</nav>
```
```javascript
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}
```

### Resultado de cálculo (card de resultado)
```javascript
// Patrón para mostrar resultado con badge de interpretación
function displayResult(result, containerId) {
    document.getElementById(containerId).innerHTML = `
        <div style="background:linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent));
                    padding:24px; border-radius:var(--radius-lg); color:var(--brand-primary-dark); margin-bottom:16px;">
            <div style="font-size:13px; font-weight:600; opacity:0.8; margin-bottom:8px;">RESULTADO</div>
            <div style="font-size:36px; font-weight:800; margin-bottom:4px;">
                ${result.value} <span style="font-size:20px;">${result.unit}</span>
            </div>
            <div style="font-size:14px; font-weight:600;">${result.interpretation.label}</div>
        </div>
        <div style="background:var(--bg-secondary); padding:20px; border-radius:var(--radius-lg);
                    border-left:4px solid var(--${result.interpretation.color});">
            <h4 style="font-size:14px; font-weight:700; margin-bottom:8px;">Interpretación</h4>
            <p style="font-size:13px; color:var(--text-secondary); line-height:1.6;">${result.interpretation.description}</p>
        </div>
        <button class="btn btn-secondary" onclick="resetForm('${containerId}')" style="width:100%; margin-top:16px;">
            🔄 Nuevo Cálculo
        </button>
    `;
    document.getElementById(containerId).style.display = 'block';
}
```

### Live counter (total en tiempo real — Glasgow, Braden, etc.)
```javascript
// Renderizar en el formulario:
// <div id="liveTotal">6</div>
// En cada select: onchange="updateTotal()"

function updateTotal() {
    const ids = ['field1', 'field2', 'field3'];
    const total = ids.reduce((sum, id) => {
        const el = document.getElementById(id);
        return sum + (el ? parseInt(el.value) : 0);
    }, 0);
    const display = document.getElementById('liveTotal');
    if (display) display.textContent = total;
}
```

---

## 5. Patrón de calculadora / herramienta

El ciclo más repetido en apps médicas. El nombre de los archivos cambia según el proyecto; la separación de responsabilidades no.

```
config (metadata)  →  logic (fórmulas puras)  →  forms/views (UI)  →  app (orquestación)
```

### config — Metadata de herramientas
```javascript
const APP_VERSION = '1.0.0';

const TOOLS_CONFIG = [
    {
        id: 1,
        name: 'Nombre corto',
        fullName: 'Nombre completo',
        icon: '🧮',
        category: 'categoria',
        categoryLabel: 'Categoría',
        description: 'Qué hace esta herramienta',
        formulas: ['Fórmula A', 'Fórmula B']  // opcional
    }
];

const INTERPRETATIONS = {
    toolA: [
        { min: 0,  max: 5,        label: 'Normal',  color: 'success', description: '...' },
        { min: 6,  max: 10,       label: 'Elevado', color: 'warning', description: '...' },
        { min: 11, max: Infinity, label: 'Crítico', color: 'danger',  description: '...' }
    ]
};
```

### logic — Fórmulas puras (sin tocar el DOM)
```javascript
const Calculators = {
    calculateToolA(inputs) {
        let { value, weight } = inputs;

        // 1. Convertir unidades si aplica
        const weightUnit = Storage.getSetting('units.weight');
        if (weightUnit === 'lb') weight = weight / 2.20462;

        // 2. Calcular
        const result = /* fórmula */ value * weight;

        // 3. Devolver siempre: value, unit, interpretation
        return {
            value: Math.round(result * 10) / 10,
            unit: 'unidad',
            interpretation: this.interpretToolA(result)
        };
    },

    interpretToolA(score) {
        const range = INTERPRETATIONS.toolA.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.toolA[INTERPRETATIONS.toolA.length - 1];
    }
};
```

> Cuando el módulo de lógica supere ~500 líneas, dividir por dominio: `logic-renal.js`, `logic-cardio.js`, etc. Cada módulo expone su propio objeto o funciones al scope global.

### forms / views — UI de cada herramienta
```javascript
function createToolAForm() {
    const units = Storage.getSettings().units;
    return `
        <form id="toolAForm" onsubmit="calculateToolA(event)">
            <!-- Alert contextual si aplica -->
            <div class="alert-box" style="background:#dbeafe; border-left:4px solid #3b82f6; padding:16px; border-radius:8px; margin-bottom:16px;">
                <p style="font-size:13px; color:#1e3a8a; margin:0;"><strong>ℹ️</strong> Contexto clínico de uso.</p>
            </div>

            <!-- Inputs numéricos -->
            <div class="form-group" style="margin-bottom:16px;">
                <label style="display:block; margin-bottom:8px; font-weight:600; font-size:14px;">
                    Parámetro (${units.weight})
                </label>
                <input type="number" id="paramA" required step="any" min="0" max="500" class="form-input">
            </div>

            <!-- Checkboxes agrupados -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:16px;">
                <p style="font-size:13px; font-weight:600; margin-bottom:12px;">Factores (1 punto cada uno):</p>
                <label style="display:flex; align-items:center; gap:10px; margin-bottom:10px; cursor:pointer;">
                    <input type="checkbox" id="factorA" style="width:18px; height:18px;">
                    <span style="font-size:14px;">Factor A</span>
                </label>
            </div>

            <!-- Selects para clasificaciones -->
            <div class="form-group" style="margin-bottom:16px;">
                <label style="display:block; margin-bottom:8px; font-weight:600; font-size:14px;">Clasificación</label>
                <select id="classA" required class="form-input">
                    <option value="0">Nivel 0 — Normal</option>
                    <option value="1">Nivel 1 — Leve</option>
                    <option value="2">Nivel 2 — Severo</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:14px;">
                🧮 Calcular
            </button>
        </form>
        <div id="toolAResult" style="display:none; margin-top:24px;"></div>
    `;
}

function calculateToolA(event) {
    event.preventDefault();
    const inputs = {
        paramA:  parseFloat(document.getElementById('paramA').value),
        factorA: document.getElementById('factorA').checked,
        classA:  parseInt(document.getElementById('classA').value)
    };
    const result = Calculators.calculateToolA(inputs);
    displayGenericResult(result, inputs, 1, 'Tool A', null, 'toolAResult');
    Storage.addToHistory({ calculatorId: 1, calculatorName: 'Tool A', inputs, result, interpretation: result.interpretation });
}
```

### app — Orquestación (switch de carga)
```javascript
function loadToolForm(tool) {
    const container = document.getElementById('toolContent');
    switch(tool.id) {
        case 1: container.innerHTML = createToolAForm(); break;
        case 2: container.innerHTML = createToolBForm(); break;
        default:
            container.innerHTML = `<div style="text-align:center; padding:40px;">
                <div style="font-size:48px;">🚧</div><p>Herramienta no encontrada</p>
            </div>`;
    }
}
```

---

## 6. Storage (LocalStorage)

Patrón módulo con claves declaradas, eventos para sincronizar UI, y métodos atómicos.

```javascript
const Storage = {
    KEYS: {
        HISTORY:     'app_history',
        FAVORITES:   'app_favorites',
        MAIN_SCREEN: 'app_mainScreen',
        SETTINGS:    'app_settings'
    },

    init() {
        // Inicializar con defaults si no existen
        if (!localStorage.getItem(this.KEYS.HISTORY))     this.setHistory([]);
        if (!localStorage.getItem(this.KEYS.FAVORITES))   this.setFavorites([]);
        if (!localStorage.getItem(this.KEYS.MAIN_SCREEN)) this.setMainScreen(DEFAULT_MAIN_SCREEN);
        if (!localStorage.getItem(this.KEYS.SETTINGS))    this.setSettings(DEFAULT_SETTINGS);
    },

    // Getters/setters genéricos
    get(key)        { const d = localStorage.getItem(key); return d ? JSON.parse(d) : null; },
    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },

    // Historial
    getHistory()    { return this.get(this.KEYS.HISTORY) || []; },
    setHistory(h)   { this.set(this.KEYS.HISTORY, h); },

    addToHistory(calculation) {
        const history = this.getHistory();
        const item = {
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            ...calculation,
            timestamp: new Date().toISOString(),
            patientName: null,
            bedNumber: null
        };
        history.unshift(item);
        if (history.length > 50) history.splice(50); // límite configurable
        this.setHistory(history);
        this.dispatchEvent('historyChanged', history);
        return item;
    },

    updateHistoryItem(itemId, fields) {
        const history = this.getHistory();
        const idx = history.findIndex(h => h.id === itemId);
        if (idx === -1) return false;
        Object.assign(history[idx], fields);
        this.setHistory(history);
        return true;
    },

    deleteHistoryItem(itemId) {
        const filtered = this.getHistory().filter(h => h.id !== itemId);
        this.setHistory(filtered);
        this.dispatchEvent('historyChanged', filtered);
    },

    // Settings
    getSettings()          { return this.get(this.KEYS.SETTINGS) || DEFAULT_SETTINGS; },
    setSettings(s)         { this.set(this.KEYS.SETTINGS, s); },
    getSetting(path) {
        const keys = path.split('.');
        let val = this.getSettings();
        for (const k of keys) { val = val?.[k]; }
        return val;
    },
    setSetting(path, value) {
        const settings = this.getSettings();
        const keys = path.split('.');
        let obj = settings;
        for (let i = 0; i < keys.length - 1; i++) { obj = obj[keys[i]]; }
        obj[keys[keys.length - 1]] = value;
        this.setSettings(settings);
    },

    // Eventos para sincronizar UI entre módulos
    dispatchEvent(name, data) {
        window.dispatchEvent(new CustomEvent(`storage:${name}`, { detail: data }));
    }
};
```

---

## 7. PWA — Service Worker

Estrategia **Cache-First + Stale-While-Revalidate**: respuesta inmediata desde caché, actualización en background.

```javascript
// sw.js
const CACHE_NAME = 'mi-app-v1.0.0'; // cambiar versión para invalidar caché

const ASSETS = [
    '/', '/index.html', '/manifest.json',
    '/css/main.css', '/css/extra.css',
    '/js/config.js', '/js/storage.js',
    '/js/logic.js',              // o logic-renal.js, logic-cardio.js... si se divide por dominio
    '/js/ui.js', '/js/forms.js', // añadir aquí cada módulo de vistas/formularios
    '/js/app.js',
    '/icon-192.png', '/icon-512.png'
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
    // NO llamar skipWaiting() aquí — esperar confirmación del usuario
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    e.respondWith(
        caches.match(e.request).then(cached => {
            // Stale-while-revalidate
            const network = fetch(e.request).then(res => {
                if (res.ok) caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone()));
                return res;
            }).catch(() => {});
            return cached || network;
        })
    );
});

self.addEventListener('message', e => {
    if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
```

### Registro + Banner de actualización en app.js
```javascript
function registerSW() {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('./sw.js').then(reg => {
        document.getElementById('offlineStatus').textContent = '✅ Activo';

        const checkForUpdate = (worker) => {
            worker.addEventListener('statechange', () => {
                if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                    showUpdateBanner(reg);
                }
            });
        };

        reg.addEventListener('updatefound', () => checkForUpdate(reg.installing));
        if (reg.waiting) showUpdateBanner(reg);
    }).catch(() => {
        document.getElementById('offlineStatus').textContent = '❌ Error';
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload());
}

function showUpdateBanner(registration) {
    if (document.getElementById('updateBanner')) return;
    const banner = document.createElement('div');
    banner.id = 'updateBanner';
    banner.className = 'update-banner'; // estilos en main.css
    banner.innerHTML = `
        <div class="update-banner__icon">🔄</div>
        <div class="update-banner__body">
            <div class="update-banner__title">Nueva versión disponible</div>
            <div class="update-banner__sub">Toca "Ahora" para actualizar</div>
        </div>
        <div class="update-banner__actions">
            <button id="updateNowBtn" class="update-btn update-btn--primary">Ahora</button>
            <button id="dismissUpdateBtn" class="update-btn update-btn--secondary">Luego</button>
        </div>
    `;
    document.body.appendChild(banner);
    document.getElementById('updateNowBtn').addEventListener('click', () => {
        if (registration.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    });
    document.getElementById('dismissUpdateBtn').addEventListener('click', () => {
        banner.classList.add('update-banner--dismissing');
        setTimeout(() => banner.remove(), 350);
    });
}
```

**CSS del banner** (en main.css):
```css
@keyframes bannerSlideUp   { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes bannerSlideDown { from { transform: translateY(0); opacity: 1; } to { transform: translateY(100%); opacity: 0; } }

.update-banner {
    position: fixed; bottom: 76px; left: 12px; right: 12px;
    background: var(--bg-card); border: 1px solid var(--brand-accent);
    border-radius: var(--radius-lg); padding: 14px 16px;
    display: flex; align-items: center; gap: 12px;
    box-shadow: var(--shadow-xl); z-index: 9999;
    animation: bannerSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.update-banner--dismissing { animation: bannerSlideDown 0.3s ease forwards; }
.update-banner__body { flex: 1; }
.update-banner__title { font-size: 14px; font-weight: 700; color: var(--text-primary); }
.update-banner__sub   { font-size: 12px; color: var(--text-secondary); }
.update-banner__actions { display: flex; gap: 8px; }
.update-btn { border: none; border-radius: var(--radius-sm); padding: 7px 14px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; }
.update-btn--primary  { background: var(--brand-accent); color: var(--brand-primary-dark); }
.update-btn--secondary { background: var(--bg-secondary); color: var(--text-secondary); }
```

---

## 8. Conversión de unidades

Centralizar en el módulo de config y aplicar siempre en el módulo de lógica (nunca en el formulario).

```javascript
// En el módulo de configuración
const UNIT_CONVERSIONS = {
    creatinine: { 'mg/dL': { factor: 1 }, 'µmol/L': { factor: 88.42 } },
    weight:     { 'kg':    { factor: 1 }, 'lb':     { factor: 2.20462 } },
    glucose:    { 'mg/dL': { factor: 1 }, 'mmol/L': { factor: 0.0555 } }
};

// En cada calculador que use creatinina:
const currentUnit = Storage.getSetting('units.creatinine');
if (currentUnit === 'µmol/L') creatinine = creatinine / 88.42;

// En cada calculador que use peso:
const weightUnit = Storage.getSetting('units.weight');
if (weightUnit === 'lb') weight = weight / 2.20462;
```

**Regla**: convertir siempre a la unidad base de la fórmula (mg/dL para creatinina, kg para peso) dentro del calculador, antes de cualquier operación.

---

## 9. Compartir resultados

```javascript
function shareResult(item) {
    const patientLine = item.patientName
        ? `👤 *${item.patientName}*${item.bedNumber ? ` · Cama ${item.bedNumber}` : ''}\n`
        : '';
    const date = new Date(item.timestamp).toLocaleString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    const text = `🏥 *Mi App — ${item.name}*\n${patientLine}\n📊 *${item.result.value} ${item.result.unit}*\n🔍 ${item.interpretation.label}\n${item.interpretation.description}\n\n📅 ${date}`;

    if (navigator.share) {
        navigator.share({ title: item.name, text }).catch(() => openWhatsApp(text));
    } else {
        openWhatsApp(text);
    }
}

function openWhatsApp(text) {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}
```

---

## 10. Animaciones esenciales

```css
@keyframes fadeIn    { from { opacity: 0; }                         to { opacity: 1; } }
@keyframes fadeOut   { from { opacity: 1; }                         to { opacity: 0; } }
@keyframes scaleIn   { from { transform: scale(0.9); opacity: 0; }  to { transform: scale(1); opacity: 1; } }
@keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideInRight { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes spin      { to { transform: rotate(360deg); } }
@keyframes float     { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
```

**Regla crítica**: siempre usar `forwards` en animaciones de salida para evitar flash de reaparición:
```javascript
element.style.animation = 'fadeOut 0.2s ease forwards'; // ✅
element.style.animation = 'fadeOut 0.2s ease';           // ❌ flash al finalizar
setTimeout(() => element.remove(), 210); // 10ms de margen sobre la duración
```

---

## 11. Responsive (mobile-first)

```css
/* Base: mobile (< 768px) */
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }

/* Tablet (768px+) */
@media (min-width: 768px) {
    .grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .app-main { max-width: 1200px; margin: 0 auto; }
    .grid { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }
}

/* Forms: 2 columnas en móvil > 480px */
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
```

**Patrón para nav móvil**: `position: fixed; bottom: 0; left: 0; right: 0;` + `padding-bottom: env(safe-area-inset-bottom)` para iPhone.

---

## 12. manifest.json mínimo

```json
{
    "name": "Mi App Médica",
    "short_name": "MiApp",
    "start_url": "./index.html",
    "display": "standalone",
    "background_color": "#0f172a",
    "theme_color": "#1e3872",
    "lang": "es",
    "icons": [
        { "src": "icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
        { "src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
    ],
    "categories": ["medical", "health"]
}
```

---

## 13. Bugs conocidos — no repetir

| Bug | Causa | Fix |
|-----|-------|-----|
| Flash al cerrar modal | `fadeOut` sin `forwards` | Siempre `animation: 'fadeOut Xs ease forwards'` |
| Modal se cierra dos veces | Propagación de click al overlay | `event.stopPropagation()` en botón X + `pointer-events:none` en SVG hijo |
| setTimeout antes que la animación | Race condition timing | `setTimeout` = duración animación + 10ms de margen |
| Cálculo incorrecto con µmol/L | Falta conversión de creatinina | Convertir `/88.42` ANTES de cualquier operación |
| Score incorrecto con diálisis | Creatinina=4 aplicada tarde (ej. MELD) | Forzar valor ANTES del cálculo, no dentro del `if (dialysis)` |
| Contador hardcodeado en UI | Número en HTML | Usar `CONFIG_ARRAY.length` dinámico |
| Live total incorrecto al resetear | `form.reset()` no dispara eventos | Llamar `updateTotal()` manualmente tras reset |

---

## 14. Checklist antes de lanzar

### Funcionalidad
- [ ] Todos los calculadores probados con casos clínicos conocidos
- [ ] Conversión de unidades verificada (especialmente creatinina µmol/L ↔ mg/dL)
- [ ] Modo offline probado (F12 → Network → Offline)
- [ ] Banner de actualización probado (DevTools → SW → "Update on reload")
- [ ] Historial: añadir, editar paciente, compartir, eliminar
- [ ] Ajustes: cambio de unidades refleja en formularios inmediatamente

### UI / Responsive
- [ ] Probado en 375px (iPhone SE), 768px (tablet), 1280px (desktop)
- [ ] Dark mode: ningún color hardcodeado que no use variables CSS
- [ ] Hover states visibles en desktop
- [ ] Touch targets ≥ 44px en móvil
- [ ] Sin overflow horizontal en ninguna pantalla

### PWA
- [ ] Lighthouse PWA score ≥ 90
- [ ] Instalable en Chrome/Edge
- [ ] `manifest.json` válido (F12 → Application → Manifest)
- [ ] Service Worker activo (F12 → Application → Service Workers)
- [ ] Íconos 192 y 512 presentes

### Código
- [ ] `APP_VERSION` actualizado en el módulo de configuración
- [ ] Cache name del SW actualizado si cambiaron assets
- [ ] Sin `console.log` de debug en producción
- [ ] `CLAUDE.md` del proyecto actualizado con nuevos IDs y convenciones
