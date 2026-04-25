# 🩺 CliniCalc - Calculadoras Médicas Profesionales

> PWA con 22 calculadoras médicas, modo offline completo, datos de paciente en historial y compartir por WhatsApp.

![Versión](https://img.shields.io/badge/versión-1.1.0-blue)
![Estado](https://img.shields.io/badge/estado-producción-brightgreen)
![Licencia](https://img.shields.io/badge/licencia-MIT-green)
![Calculadoras](https://img.shields.io/badge/calculadoras-22-orange)

---

## ✨ Características Principales

### 📱 Progressive Web App (PWA)
- ✅ **Instalable** en móvil y escritorio
- ✅ **100% Offline** — funciona sin internet (Service Worker + Cache-First)
- ✅ **Actualizaciones automáticas** con banner de notificación integrado
- ✅ **Modo Oscuro** predeterminado con soporte completo de variables CSS

### 🧮 22 Calculadoras Médicas

#### 🔬 Renal (2)
1. **GFR** — Filtrado Glomerular (CKD-EPI 2021/2009, Cockroft-Gault, MDRD)
2. **Clearance Cr 24h** — Clearance de creatinina en orina de 24 horas

#### ⚗️ Electrolitos (4)
3. **Anion Gap** — Brecha aniónica con corrección por albúmina
4. **Calcio Corregido** — Corrección por albúmina sérica (Payne)
5. **Sodio Corregido** — Corrección en hiperglicemia (Katz + Hillier)
8. **Osmolaridad** — Osmolaridad sérica y gap osmolar

#### 📏 Antropometría (2)
6. **IMC** — Índice de Masa Corporal con clasificación OMS
7. **BSA** — Superficie corporal (Mosteller + DuBois)

#### ❤️ Cardiología (5)
9. **CHADS₂-VASc** — Riesgo de ACV en fibrilación auricular
10. **HAS-BLED** — Riesgo de sangrado con anticoagulantes
19. **TIMI UA/NSTEMI** — Riesgo de evento adverso en angina inestable y NSTEMI
20. **TIMI STEMI** — Mortalidad a 30 días en infarto con elevación del ST
21. **GRACE Score** — Mortalidad intrahospitalaria en síndrome coronario agudo

#### 🏥 Hepatología (2)
11. **Child-Pugh** — Clasificación de cirrosis hepática (A/B/C)
15. **MELD / MELD-Na** — Prioridad para trasplante hepático

#### 🦠 Infecciones / UCI (3)
12. **CURB-65** — Severidad de neumonía adquirida en comunidad
13. **qSOFA** — Detección rápida de sepsis fuera de UCI
16. **SOFA Score** — Evaluación secuencial de falla orgánica en UCI

#### 🧠 Neurología (2)
17. **NIHSS** — Escala de ictus del NIH (severidad del ACV isquémico)
18. **Glasgow (GCS)** — Nivel de conciencia (apertura ocular, verbal, motor)

#### 🩺 Otros (2)
14. **Wells TEP** — Probabilidad de tromboembolia pulmonar
22. **Escala de Braden** — Riesgo de úlceras por presión

---

### 🔄 Conversión de Unidades

Configurable en Ajustes → Unidades de Medida, con conversión automática interna:

| Parámetro | Unidades disponibles | Por defecto |
|-----------|---------------------|-------------|
| Creatinina | mg/dL · µmol/L | µmol/L (SI) |
| Peso | kg · lb | kg |
| Altura | cm · m · in · ft | cm |
| Glucosa | mg/dL · mmol/L | mg/dL |
| BUN / Urea | mg/dL · mmol/L | mg/dL |

> Bilirrubina, Calcio y Albúmina se ingresan en sus unidades convencionales (mg/dL / g/dL), estándar en Latinoamérica.

### 🎨 Diseño por Categorías

Cada calculadora tiene un color de acento propio según su categoría (renal=azul, cardio=rojo, neuro=índigo, etc.) aplicado automáticamente en cards, biblioteca y hover states.

### 📊 Historial Clínico

- 🕐 Últimos 20 cálculos guardados con timestamp
- 👤 **Datos del paciente** — añade nombre y número de cama a cada entrada directamente desde el historial
- 🔄 **Recalcular** — reabre la calculadora con los valores guardados pre-cargados
- 📤 **Compartir por WhatsApp** — genera mensaje formateado con resultado, interpretación y datos del paciente
- 🗑️ Eliminar individual o limpiar todo el historial

### 🎯 Pantalla Principal Personalizable
- ⭐ Favoritos por calculadora
- 📱 Selección de 1-10 calculadoras para pantalla principal
- 💾 Configuración persistente en LocalStorage

---

## 🚀 Instalación

### Servidor Local
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Luego visita: http://localhost:8000
```

### Instalación PWA
1. Abre la app en Chrome/Edge/Safari
2. Click en el ícono de instalación en la barra de direcciones
3. "Añadir a pantalla de inicio"
4. Funciona como app nativa offline 📱

---

## 📖 Guía de Uso

### Configuración Inicial

1. **Configura unidades** — Ajustes → Unidades de Medida → selecciona según tu región (la creatinina por defecto es µmol/L para sistema SI)
2. **Personaliza pantalla principal** — Ajustes → Pantalla Principal → selecciona hasta 10 calculadoras
3. **Añade favoritos** — toca ⭐ en cualquier calculadora de la biblioteca

### Historial con Datos de Paciente

```
Historial → entrada → toca "+ Añadir paciente"
  → escribe nombre y número de cama
  → Enter o ✓ para guardar
```

El mismo paciente puede tener múltiples entradas (distintos cálculos en distintos momentos). El timestamp identifica cada cálculo unívocamente.

### Compartir por WhatsApp

```
Historial → entrada → botón compartir (↑)
  → genera mensaje con calculadora, resultado,
    interpretación, datos del paciente y fecha
  → abre WhatsApp directamente
```

---

## 🛠️ Tecnologías

- **HTML5** — Estructura semántica
- **CSS3** — Variables CSS, animaciones, diseño responsive
- **JavaScript ES6+** — Lógica de aplicación, sin frameworks
- **LocalStorage API** — Persistencia de datos
- **Service Worker** — Cache-First + Stale-While-Revalidate
- **Web App Manifest** — PWA instalable
- **Web Share API** — Compartir nativo en móvil

**Sin dependencias externas** — Todo vanilla JavaScript

---

## 📂 Estructura del Proyecto

```
clini-calc/
├── index.html              # HTML principal + filtros de biblioteca
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker (cache-first)
├── CLAUDE.md               # Contexto para Claude Code
├── icon-192.png
├── icon-512.png
│
├── css/
│   ├── main.css            # Design system, componentes, animaciones
│   └── additional-styles.css  # Estilos de formularios y modales
│
└── js/
    ├── config.js           # APP_VERSION, CALCULATORS_CONFIG, INTERPRETATIONS, UNIT_CONVERSIONS
    ├── storage.js          # LocalStorage: historial (con datos paciente), favoritos, settings
    ├── calculators.js      # Fórmulas de las 22 calculadoras
    ├── ui.js               # Renderizado (cards, biblioteca, historial, CSS inyectado)
    ├── forms.js            # Formularios IDs 2-4, 11-15
    ├── forms2.js           # Formularios IDs 5-10, 16-22 + displayGenericResult
    └── app.js              # Inicialización, navegación, SW, modal, historial actions
```

---

## 🎯 Calculadoras — Detalle Clínico

| ID | Nombre | Fórmulas / Criterios | Referencia |
|----|--------|---------------------|-----------|
| 1 | GFR | CKD-EPI 2021 (sin raza), 2009, Cockroft-Gault, MDRD | KDIGO 2024 |
| 2 | Clearance Cr 24h | (Cr orina × Vol) / (Cr plasma × 1440) | — |
| 3 | Anion Gap | Na − (Cl + HCO₃) + corrección albúmina | — |
| 4 | Calcio Corregido | Ca + 0.8 × (4 − Alb) | Payne 1973 |
| 5 | Sodio Corregido | Na + 0.016/0.024 × (Glucosa − 100) | Katz 1973, Hillier 1999 |
| 6 | IMC | Peso / Talla² | OMS |
| 7 | BSA | Mosteller, DuBois | — |
| 8 | Osmolaridad | 2×Na + Gluc/18 + BUN/2.8 + gap osmolar | — |
| 9 | CHADS₂-VASc | 8 factores (0–9 pts) | ESC 2020 |
| 10 | HAS-BLED | 9 factores (0–9 pts) | Pisters 2010 |
| 11 | Child-Pugh | 5 variables (5–15 pts, A/B/C) | — |
| 12 | CURB-65 | 5 criterios (0–5 pts) | BTS 2009 |
| 13 | qSOFA | 3 criterios (0–3 pts) | Sepsis-3 2016 |
| 14 | Wells TEP | 7 factores (0–12.5 pts) | Wells 2000 |
| 15 | MELD / MELD-Na | Fórmula logarítmica Cr/Bili/INR/Na (6–40 pts) | UNOS |
| 16 | SOFA | 6 órganos (0–24 pts) | Vincent 1996 |
| 17 | NIHSS | 15 ítems neurológicos (0–42 pts) | — |
| 18 | Glasgow | E(1-4) + V(1-5) + M(1-6) → 3–15 pts | Teasdale 1974 |
| 19 | TIMI NSTEMI | 7 criterios binarios (0–7 pts) | Antman 2000 |
| 20 | TIMI STEMI | Edad + 7 variables (0–14 pts) | Morrow 2000 |
| 21 | GRACE | Lookup tables por rangos (0–372 pts) | Fox 2006 |
| 22 | Braden | 6 subescalas (6–23 pts, menor = mayor riesgo) | Bergstrom 1987 |

---

## 🔧 Añadir una Calculadora Nueva

1. **`js/config.js`** — añadir entrada a `CALCULATORS_CONFIG` + interpretaciones en `INTERPRETATIONS`
2. **`js/calculators.js`** — añadir `calculateXXX(inputs)` e `interpretXXX(score)` al objeto `Calculators`
3. **`js/forms2.js`** — añadir `createXXXForm()` y `calculateXXX(event)` antes de `// === FUNCIÓN GENÉRICA`
4. **`js/app.js`** — añadir `case ID: container.innerHTML = createXXXForm(); break;` en `loadCalculatorForm()`
5. Si es categoría nueva: añadir `<button class="filter-chip" data-category="...">` en `index.html`

El próximo ID libre es **23**.

---

## 📱 Compatibilidad

| Navegador | Desktop | Móvil | PWA | Offline |
|-----------|---------|-------|-----|---------|
| Chrome 90+ | ✅ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ | ✅ |
| Safari 14+ | ✅ | ✅ | ⚠️ | ✅ |
| Firefox 88+ | ✅ | ✅ | ✅ | ✅ |
| Samsung Internet | — | ✅ | ✅ | ✅ |

⚠️ Safari: instalación PWA con funcionalidad limitada

---

## 🐛 Solución de Problemas

**Los datos no se guardan** — verifica que LocalStorage esté habilitado; no usar modo incógnito.

**App no funciona offline** — F12 → Application → Service Workers → "Update" para forzar actualización.

**Calculadora no aparece** — Ajustes → Pantalla Principal → verificar que esté seleccionada (máx. 10).

**Unidades incorrectas** — Ajustes → Unidades de Medida → verificar configuración regional.

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Calculadoras | 22 (100% funcionales) |
| Categorías | 8 (renal, electrolitos, antropometría, cardio, hepato, infecciones, neuro, otros) |
| Conversiones de unidades | 9 tipos |
| Interpretaciones clínicas | 22 (todas implementadas) |
| Archivos JavaScript | 7 |
| Archivos CSS | 2 |

---

## 📄 Licencia

MIT License — Uso libre para fines educativos y profesionales.

---

## 🏆 Créditos

Desarrollado para profesionales de la salud: médicos internos, residentes, estudiantes en práctica preprofesional y personal de enfermería.

**Basado en guías clínicas:**
- KDIGO 2024 (función renal)
- ESC/ACC/AHA Guidelines (cardiología)
- Surviving Sepsis Campaign / Sepsis-3 (infecciones/UCI)
- UNOS/OPTN (trasplante hepático)
- NIH Stroke Scale (neurología)

---

*CliniCalc v1.1.1 — Abril 2026*
