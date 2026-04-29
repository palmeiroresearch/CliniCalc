# CliniCalc — Contexto para Claude Code

## Qué es
PWA de calculadoras médicas offline. 22 calculadoras implementadas. Stack: HTML + CSS + JS vanilla (sin frameworks).

## Estructura de archivos clave
- `js/config.js` — `APP_VERSION` + `CALCULATORS_CONFIG` + `INTERPRETATIONS` + `DEFAULT_CONFIG` + `UNIT_CONVERSIONS`
- `js/calculators.js` — Objeto `Calculators` con todos los métodos `calculate*()`
- `js/forms.js` — Formularios de calculadoras 11-15, 2-4 (y GFR en app.js)
- `js/forms2.js` — Formularios de calculadoras 5-10, 16-22 + `displayGenericResult()` + `resetCalculator()`
- `js/app.js` — Inicialización, navegación, `loadCalculatorForm()` (switch por ID), SW registration, modal, historial actions
- `js/storage.js` — LocalStorage: historial (con patientName/bedNumber), favoritos, settings, pantalla principal
- `js/ui.js` — Renderizado: pantalla principal, biblioteca, historial, búsqueda + CSS inyectado del historial (historyStyles)
- `index.html` — Estructura HTML + filtros de categoría en la biblioteca + scripts
- `css/main.css` — Design system principal: variables CSS, category tokens, cards, animaciones
- `css/additional-styles.css` — Estilos complementarios: form-input, result-card, modales

## Calculadoras implementadas (ID → nombre → categoría)
| ID | Nombre | Categoría |
|----|--------|-----------|
| 1  | GFR (CKD-EPI 2021/2009, Cockroft-Gault, MDRD) | renal |
| 2  | Clearance Creatinina 24h | renal |
| 3  | Anion Gap (+ corregido por albúmina) | electrolitos |
| 4  | Calcio Corregido (Payne) | electrolitos |
| 5  | Sodio Corregido (Katz + Hillier) | electrolitos |
| 6  | IMC | antropometria |
| 7  | BSA (Mosteller + DuBois) | antropometria |
| 8  | Osmolaridad sérica + gap osmolar | electrolitos |
| 9  | CHADS₂-VASc | cardio |
| 10 | HAS-BLED | cardio |
| 11 | Child-Pugh | hepato |
| 12 | CURB-65 | infecciones |
| 13 | qSOFA | infecciones |
| 14 | Wells TEP | otros |
| 15 | MELD + MELD-Na | hepato |
| 16 | SOFA Score | infecciones |
| 17 | NIHSS Score | neuro |
| 18 | Glasgow (GCS) | neuro |
| 19 | TIMI UA/NSTEMI | cardio |
| 20 | TIMI STEMI | cardio |
| 21 | GRACE Score | cardio |
| 22 | Escala de Braden | otros |

## Cómo añadir una calculadora nueva
1. **config.js**: añadir entrada al array `CALCULATORS_CONFIG` (id, name, fullName, icon, category, categoryLabel, description, formulas) y la interpretación en `INTERPRETATIONS`
2. **calculators.js**: añadir `calculateXXX(inputs)` e `interpretXXX(score)` al objeto `Calculators`
3. **forms2.js**: añadir `createXXXForm()` y `calculateXXX(event)` antes del comentario `// === FUNCIÓN GENÉRICA`
4. **app.js**: añadir `case ID: container.innerHTML = createXXXForm(); break;` en `loadCalculatorForm()`
5. Si es una nueva categoría: añadir `<button class="filter-chip" data-category="...">` en `index.html`

## Categorías disponibles (filtros en index.html)
`renal`, `electrolitos`, `antropometria`, `cardio`, `hepato`, `infecciones`, `neuro`, `otros`

## Versión
- `APP_VERSION = '1.1.0'` definida en `js/config.js` — fuente única de verdad
- La sección "Información" en Ajustes se popula dinámicamente desde JS en `DOMContentLoaded` (no editar el HTML)
- `storage.js exportData()` también usa `APP_VERSION`

## Convenciones importantes
- **Creatinina**: unidad por defecto `µmol/L`. Siempre convertir a mg/dL internamente con `/ 88.42` cuando `Storage.getSetting('units.creatinine') === 'µmol/L'`
- **Peso**: leer unidad con `Storage.getSetting('units.weight')`, convertir con `/ 2.20462` si es `lb`
- **IDs**: el próximo ID libre es **23**
- Formularios simples (solo checkboxes/selects) → usar `displayGenericResult()`
- Formularios con desglose de componentes (SOFA, GRACE, Braden, Glasgow) → display custom inline

## Sistema de colores por categoría (UI)
Las cards y filas de biblioteca usan `data-category="..."` para recibir color automático vía CSS (definido en `main.css`):
```
renal=#3b82f6  electrolitos=#06b6d4  antropometria=#8b5cf6  cardio=#ef4444
hepato=#f97316  infecciones=#22c55e  neuro=#6366f1  otros=#64748b
```
El atributo se añade automáticamente en `ui.js` al renderizar. No hace falta tocar el CSS al añadir calculadoras en categorías existentes.

## CSS del historial — ubicación especial
Los estilos de `.history-item`, `.result-badge`, `.btn-icon`, `.history-patient`, `.patient-input`, etc. están en una `const historyStyles` al final de `js/ui.js` (línea ~376), inyectada con `document.head.insertAdjacentHTML`. No buscarlos en los archivos CSS.

## Historial — campos y funciones
**Estructura de un historyItem** (`js/storage.js`):
```js
{ id, calculatorId, calculatorName, formula, inputs, result, interpretation,
  timestamp, patientName, bedNumber }
```
- `patientName` y `bedNumber` son `null` por defecto; se editan inline desde la pestaña Historial
- `Storage.updateHistoryItem(itemId, fields)` — actualiza campos sin reemplazar la entrada
- `recalculate(itemId)` — abre el modal de la calculadora e intenta pre-rellenar campos (best-effort por coincidencia de ID)
- `shareResult(itemId)` — comparte por Web Share API o abre `wa.me` con mensaje formateado
- `editPatientInfo/cancelPatientEdit/savePatientInfo` — toggle inline del formulario de paciente

## Modo offline (Service Worker)
- Estrategia: Cache-First con Stale-While-Revalidate — **no modificar la lógica**
- Update flow correcto: `updatefound` → `statechange` → `showUpdateBanner()` → `SKIP_WAITING` → `controllerchange` → `reload`
- `showUpdateBanner()` en `app.js` crea un bottom-sheet con clase `.update-banner` (estilos en `main.css`)

## Bugs ya corregidos (no reintroducir)
- MELD: faltaba conversión creatinina µmol/L
- MELD dialysis: creatinina=4 debe aplicarse antes de cualquier cálculo
- HAS-BLED: edad usa `>= 65` (no `> 65`)
- Contador total calculadoras en Ajustes: dinámico con `CALCULATORS_CONFIG.length`
- Modal close flash: `closeCalculatorModal()` usa `'fadeOut 0.2s ease forwards'` + `210ms` timeout + `stopPropagation` en el botón X
