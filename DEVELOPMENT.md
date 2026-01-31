# 🛠️ Guía de Desarrollo - CliniCalc

Documentación técnica para desarrolladores que quieran contribuir o entender el proyecto.

---

## 📂 Estructura del Proyecto

```
clini-calc/
├── index.html                  # Shell principal de la aplicación
├── manifest.json               # PWA manifest
├── sw.js                       # Service Worker
├── icon-192.png               # Ícono PWA 192x192
├── icon-512.png               # Ícono PWA 512x512
├── README.md                  # Documentación usuario
├── CHANGELOG.md               # Registro de versiones
├── DEVELOPMENT.md             # Este archivo
│
├── css/
│   ├── main.css               # Estilos principales (3,000+ líneas)
│   └── additional-styles.css  # Estilos complementarios
│
└── js/
    ├── config.js              # Configuración de calculadoras
    ├── storage.js             # Gestión de LocalStorage
    ├── calculators.js         # Fórmulas matemáticas
    ├── ui.js                  # Interfaz y renderizado
    ├── forms.js               # Formularios (calc 11-15, 2-4)
    ├── forms2.js              # Formularios (calc 5-10)
    └── app.js                 # Lógica principal + GFR
```

---

## 🔄 Flujo de Datos

```
Usuario → UI (app.js) → Formulario (forms.js) → Calculadora (calculators.js)
                                                        ↓
                                                  Storage.addToHistory()
                                                        ↓
                                                  LocalStorage
                                                        ↓
                                                  UI.renderHistory()
```

---

## 🧮 Cómo Añadir una Nueva Calculadora

### 1. Añadir Metadata en `config.js`

```javascript
{
    id: 16,                           // ID único
    name: 'Nueva Calc',               // Nombre corto
    fullName: 'Nueva Calculadora',    // Nombre completo
    icon: '🧮',                       // Emoji
    category: 'otros',                // Categoría
    categoryLabel: 'Otros',
    description: 'Descripción breve'
}
```

### 2. Implementar Fórmula en `calculators.js`

```javascript
calculateNuevaCalc(inputs) {
    const { param1, param2 } = inputs;
    
    // Tu fórmula aquí
    const result = param1 + param2;
    
    return {
        value: Math.round(result * 10) / 10,
        unit: 'unidad',
        interpretation: this.interpretNuevaCalc(result)
    };
},

interpretNuevaCalc(value) {
    if (value < 10) {
        return {
            label: 'Bajo',
            color: 'success',
            description: 'Valor normal'
        };
    }
    // ... más condiciones
}
```

### 3. Crear Formulario en `forms.js` o `forms2.js`

```javascript
function createNuevaCalcForm() {
    return `
        <form id="nuevaCalcForm" onsubmit="calculateNuevaCalc(event)">
            <div class="form-group">
                <label>Parámetro 1</label>
                <input type="number" id="param1" required class="form-input">
            </div>
            <button type="submit" class="btn btn-primary">
                🧮 Calcular
            </button>
        </form>
        <div id="nuevaCalcResult" style="display: none;"></div>
    `;
}

function calculateNuevaCalc(event) {
    event.preventDefault();
    const inputs = {
        param1: parseFloat(document.getElementById('param1').value)
    };
    const result = Calculators.calculateNuevaCalc(inputs);
    displayGenericResult(result, inputs, 16, 'Nueva Calc', null, 'nuevaCalcResult');
    Storage.addToHistory({
        calculatorId: 16,
        calculatorName: 'Nueva Calc',
        inputs,
        result,
        interpretation: result.interpretation
    });
}
```

### 4. Añadir Interpretaciones en `config.js`

```javascript
INTERPRETATIONS.nuevaCalc = [
    {
        label: 'Normal',
        min: 0,
        max: 10,
        color: 'success',
        description: 'Valor dentro del rango normal'
    },
    // ... más rangos
];
```

---

## 🎨 Sistema de Diseño

### Variables CSS

```css
/* Colores Primarios */
--brand-primary: #1e3872         /* Navy blue */
--brand-accent: #78daab          /* Mint green */

/* Estados */
--success: #10b981
--danger: #ef4444
--warning: #f59e0b
--info: #3b82f6

/* Backgrounds */
--bg-body: #f1f5f9               /* Fondo principal */
--bg-card: #ffffff               /* Cards */
--bg-secondary: #f8fafc          /* Áreas secundarias */

/* Modo Oscuro */
body.dark-mode {
    --bg-body: #0f172a
    --bg-card: #1e293b
    --text-primary: #f1f5f9
}
```

### Componentes Reutilizables

**Botones:**
```html
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>
<button class="btn btn-success">Éxito</button>
<button class="btn btn-danger">Peligro</button>
```

**Form Inputs:**
```html
<input type="number" class="form-input" required>
<select class="form-input">...</select>
<textarea class="form-input"></textarea>
```

**Alert Boxes:**
```html
<div class="alert-box" style="background: #fef3c7; border-left: 4px solid #f59e0b;">
    <p>Mensaje de alerta</p>
</div>
```

---

## 💾 Gestión de Datos

### LocalStorage Schema

```javascript
{
    // Calculadoras en pantalla principal (1-10)
    clinicalc_mainScreen: [1, 6, 3, 9, 12],
    
    // Favoritos (ilimitado)
    clinicalc_favorites: [1, 3, 6, 9, 12, 4],
    
    // Historial (últimos 20)
    clinicalc_history: [
        {
            id: "calc_123",
            calculatorId: 1,
            calculatorName: "GFR",
            formula: "CKD-EPI 2021",
            inputs: { age: 60, sex: "M", cr: 1.2 },
            result: { value: 65, unit: "mL/min/1.73m²" },
            interpretation: { label: "G2", color: "success" },
            timestamp: "2025-01-31T..."
        }
    ],
    
    // Configuración
    clinicalc_settings: {
        darkMode: true,
        units: {
            creatinine: "mg/dL",
            weight: "kg",
            height: "cm",
            glucose: "mg/dL",
            bun: "mg/dL",
            calcium: "mg/dL",
            albumin: "g/dL",
            bilirubin: "mg/dL"
        }
    }
}
```

### API de Storage

```javascript
// Leer
Storage.getMainScreen()
Storage.getFavorites()
Storage.getHistory()
Storage.getSettings()

// Escribir
Storage.setMainScreen([1, 2, 3])
Storage.toggleFavorite(5)
Storage.addToHistory(calculation)
Storage.updateSetting('units.creatinine', 'µmol/L')

// Utilidades
Storage.clearHistory()
Storage.restoreDefaults()
Storage.exportData()
Storage.importData(data)
```

---

## 🔧 Conversión de Unidades

```javascript
// Sistema centralizado en calculators.js
Calculators.convertUnit(value, fromUnit, toUnit, type)

// Ejemplo
const mgdl = 1.2;
const umoll = Calculators.convertUnit(mgdl, 'mg/dL', 'µmol/L', 'creatinine');
// umoll = 106.1
```

**Tipos soportados:**
- `creatinine`: mg/dL ↔ µmol/L (factor: 88.42)
- `glucose`: mg/dL ↔ mmol/L (factor: 0.0555)
- `weight`: kg ↔ lb (factor: 2.20462)
- `height`: cm, m, in, ft

---

## 🧪 Testing Manual

### Checklist Pre-Release

**Funcionalidad:**
- [ ] Todas las 15 calculadoras funcionan
- [ ] Conversión de unidades correcta
- [ ] Historial guarda correctamente
- [ ] Favoritos persisten
- [ ] Pantalla principal editable
- [ ] Búsqueda funcional
- [ ] Modo oscuro funciona

**PWA:**
- [ ] Instalable en Chrome/Edge
- [ ] Funciona offline después de 1ra carga
- [ ] Service Worker registrado
- [ ] Icons 192/512 se ven bien

**Responsive:**
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

**Navegadores:**
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

---

## 🐛 Debugging

### Console Logs Útiles

```javascript
// Ver datos guardados
console.log('Main:', Storage.getMainScreen());
console.log('Favs:', Storage.getFavorites());
console.log('History:', Storage.getHistory());
console.log('Settings:', Storage.getSettings());

// Ver tamaño de storage
console.log('Size:', Storage.getStorageSize());

// Ver Service Worker
navigator.serviceWorker.getRegistration().then(reg => {
    console.log('SW:', reg);
});
```

### Limpiar Datos

```javascript
// Desde consola
Storage.clearAll();

// O desde Application Tab en DevTools
localStorage.clear();
```

---

## 📦 Build y Deploy

### Opción 1: GitHub Pages

```bash
# 1. Subir a GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/user/clini-calc.git
git push -u origin main

# 2. Configurar GitHub Pages
Settings → Pages → Source: main → Save

# 3. Acceder
https://user.github.io/clini-calc
```

### Opción 2: Netlify

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Deploy
netlify deploy --prod
```

### Opción 3: Vercel

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod
```

---

## 🔐 Seguridad

**Buenas Prácticas Implementadas:**
- ✅ Sin dependencias externas (0 vulnerabilidades)
- ✅ Datos solo en LocalStorage (privacidad total)
- ✅ No se envía nada a servidores
- ✅ PWA con HTTPS requerido
- ✅ Content Security Policy (implementar)

---

## 📊 Performance

**Métricas Objetivo:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

**Optimizaciones Actuales:**
- CSS inline crítico
- JavaScript diferido
- Service Worker cachea todo
- Imágenes optimizadas (PNG)
- Sin frameworks pesados

---

## 🤝 Contribuciones

### Workflow

1. Fork del repositorio
2. Crear rama: `git checkout -b feature/nueva-feature`
3. Commit: `git commit -m 'Add: nueva feature'`
4. Push: `git push origin feature/nueva-feature`
5. Pull Request

### Convención de Commits

```
Add: nueva funcionalidad
Fix: corrección de bug
Update: actualización de código
Refactor: refactorización
Docs: documentación
Style: formateo
```

---

## 📞 Soporte Técnico

**¿Dudas sobre el código?**
- Revisa los comentarios inline
- Consulta este documento
- Abre un Issue en GitHub

**Stack Overflow Tags:**
- `vanilla-javascript`
- `pwa`
- `medical-calculator`

---

**CliniCalc** - Sistema modular, extensible y profesional  
*Hecho con ❤️ para la comunidad médica y developers*
