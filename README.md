# CliniCalc — Calculadoras Médicas Profesionales

> PWA con 38 calculadoras médicas, modo offline completo, guía antibiótica, calculadora de vasoactivos y protocolo de fármacos IV.

![Versión](https://img.shields.io/badge/versión-1.2.9-blue)
![Estado](https://img.shields.io/badge/estado-producción-brightgreen)
![Licencia](https://img.shields.io/badge/licencia-MIT-green)
![Calculadoras](https://img.shields.io/badge/calculadoras-38-orange)

---

## Características Principales

### Progressive Web App (PWA)
- Instalable en móvil y escritorio
- 100% Offline — funciona sin internet (Service Worker + Cache-First)
- Actualizaciones automáticas con banner de notificación integrado
- Modo oscuro predeterminado con soporte completo de variables CSS

### 38 Calculadoras Médicas

#### Renal (2)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 1 | GFR | Filtrado Glomerular — CKD-EPI 2021/2009, Cockroft-Gault, MDRD |
| 2 | Clearance Cr 24h | Clearance de creatinina en orina de 24 horas |

#### Electrolitos (4)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 3 | Anion Gap | Brecha aniónica con corrección por albúmina |
| 4 | Calcio Corregido | Corrección por albúmina sérica (Payne 1973) |
| 5 | Sodio Corregido | Corrección en hiperglicemia (Katz + Hillier) |
| 8 | Osmolaridad | Osmolaridad sérica y gap osmolar |

#### Antropometría (2)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 6 | IMC | Índice de Masa Corporal con clasificación OMS |
| 7 | BSA | Superficie corporal (Mosteller + DuBois) |

#### Cardiología (7)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 9 | CHADS₂-VASc | Riesgo de ACV en fibrilación auricular |
| 10 | HAS-BLED | Riesgo de sangrado con anticoagulantes |
| 19 | TIMI UA/NSTEMI | Riesgo de evento adverso en angina inestable y NSTEMI |
| 20 | TIMI STEMI | Mortalidad a 30 días en infarto con elevación del ST |
| 21 | GRACE Score | Mortalidad intrahospitalaria en síndrome coronario agudo |
| 26 | HEART Score | Probabilidad de SCA en dolor torácico en urgencias |
| 36 | Killip-Kimball | Clasificación de fallo cardíaco post-IAM (Clases I–IV) |

#### Hepatología (3)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 11 | Child-Pugh | Clasificación de cirrosis hepática (A/B/C) |
| 15 | MELD / MELD-Na | Prioridad para trasplante hepático |
| 38 | FIB-4 / APRI | Fibrosis hepática no invasiva + estigmas clínicos |

#### Infecciones / UCI (4)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 12 | CURB-65 | Severidad de neumonía adquirida en comunidad |
| 13 | qSOFA | Detección rápida de sepsis fuera de UCI |
| 16 | SOFA Score | Evaluación secuencial de falla orgánica en UCI |
| 37 | PSI/PORT | Índice de severidad de neumonía (Fine et al. 1997) — Clases I–V |

#### Neurología (2)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 17 | NIHSS | Escala de ictus del NIH (severidad del ACV isquémico) |
| 18 | Glasgow (GCS) | Nivel de conciencia — apertura ocular, verbal, motor |

#### Pulmonar (2)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 31 | Asma Aguda | Clasificación y protocolo de tratamiento (GINA 2024/BTS-SIGN) |
| 32 | Control Asma | Clasificación crónica y tratamiento escalonado GINA (Pasos 1–5) |

#### UCI / Crítico (7)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 23 | MACOCHA | Score de vía aérea difícil en intubación de UCI |
| 24 | Peso Ideal / Tidal | Peso corporal ideal y volumen tidal en ventilación mecánica |
| 25 | FOUR Score | Escala neurológica para pacientes intubados |
| 28 | DKA / CAD | Protocolo de cetoacidosis diabética — clasificación y manejo |
| 29 | Vasoactivos IV | Calculadora de infusión IV para 12 fármacos vasoactivos (ml/hr + gtt/min) |
| 34 | PAM | Presión arterial media con objetivos clínicos |
| — | Guía Antibiótica | Selección de antibióticos por patología, subtema y alergia |

#### Otros (5)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 14 | Wells TEP | Probabilidad de tromboembolia pulmonar |
| 22 | Braden | Riesgo de úlceras por presión |
| 27 | Regla PERC | Exclusión de TEP sin pruebas de imagen |
| 33 | Diagnóstico LES | Criterios ACR/EULAR 2019 — clasificación de lupus eritematoso sistémico |
| 35 | Calculadora | Calculadora aritmética general |

---

### Módulos Especiales

#### Calculadora de Vasoactivos IV (ID 29)
12 fármacos: norepinefrina, vasopresina, epinefrina, fenilefrina, metaraminol, dopamina, dobutamina, milrinona, levosimendán, nitroprusiato, nitroglicerina, isoprenalina.
- Concentración configurable (cantidad + volumen + unidad)
- Cálculo de tasa: ml/hr + ml/min + **gtt/min** con selector de factor goteo (10/15/20/60 gtt/ml)
- Validación de rango de dosis por indicación clínica
- Perlas clínicas y alertas por fármaco

#### Guía Antibiótica (ID 30)
- Selección por patología → subtema → perfil de alergia
- Cobertura, dosis y duración del tratamiento
- Alternativas en alergia a betalactámicos

#### FIB-4 / APRI + Estigmas Clínicos (ID 38)
- Evaluación no invasiva de fibrosis hepática (AASLD 2023, EASL, OMS)
- Cutoffs ajustados automáticamente para pacientes >65 años
- Checklist de 15 estigmas clínicos en 4 grupos
- Interpretación combinada score + clínica

---

### Conversión de Unidades

Configurable en Ajustes → Unidades de Medida, con conversión automática interna:

| Parámetro | Unidades disponibles | Por defecto |
|-----------|---------------------|-------------|
| Creatinina | mg/dL · µmol/L | µmol/L (SI) |
| Peso | kg · lb | kg |
| Altura | cm · m · in · ft | cm |
| Glucosa | mg/dL · mmol/L | mg/dL |
| BUN / Urea | mg/dL · mmol/L | mg/dL |

### Historial Clínico
- Últimos 20 cálculos con timestamp
- Datos del paciente — nombre y número de cama editables inline
- Recalcular — reabre la calculadora con valores pre-cargados
- Compartir por WhatsApp — mensaje formateado con resultado, interpretación y datos del paciente
- Mostrar resultado completo — todos los módulos con protocolo muestran su resultado extendido en el historial

---

## Instalación

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

---

## Estructura del Proyecto

```
CliniCalc/
├── index.html                  # HTML principal + filtros de biblioteca
├── manifest.json               # PWA manifest
├── sw.js                       # Service Worker (Cache-First)
├── CLAUDE.md                   # Contexto para Claude Code
│
├── css/
│   ├── main.css                # Design system, variables CSS, componentes
│   └── additional-styles.css  # Formularios, result-cards, modales
│
└── js/
    ├── config.js               # APP_VERSION, CALCULATORS_CONFIG, INTERPRETATIONS
    ├── storage.js              # LocalStorage: historial, favoritos, settings
    ├── calculators.js          # Fórmulas de todas las calculadoras
    ├── ui.js                   # Renderizado (cards, biblioteca, historial)
    ├── forms.js                # Formularios IDs 2–4, 11–15
    ├── forms2.js               # Formularios IDs 5–10, 16–38 + helpers genéricos
    ├── app.js                  # Inicialización, navegación, SW, modal, historial
    │
    ├── ivcalc/                 # Módulo vasoactivos IV
    │   ├── iv-calculator.js    # Motor de cálculo (concentración, ml/hr, gtt/min)
    │   ├── drug-index.js       # Índice de fármacos
    │   ├── drugs-vasoactive.js # 12 fármacos vasoactivos con indicaciones
    │   └── drugs-other.js      # Fármacos adicionales (ej. alteplase)
    │
    └── antibioticos/           # Módulo guía antibiótica
        ├── antibiotics-calculator.js  # Motor de selección y display
        └── INDICE.md           # Índice de patologías y fármacos
```

---

## Añadir una Calculadora Nueva

1. **`js/config.js`** — añadir entrada a `CALCULATORS_CONFIG` (id, name, fullName, icon, category, description, formulas)
2. **`js/calculators.js`** — añadir `calculateXXX(inputs)` al objeto `Calculators`
3. **`js/forms2.js`** — añadir `createXXXForm()` y `calculateXXXForm(event)` antes de `// === FUNCIÓN GENÉRICA`
4. **`js/app.js`** — añadir `case ID:` en `loadCalculatorForm()` y en `showFullResult()` si tiene display custom

El próximo ID libre es **39**.

### Categorías disponibles
`renal` · `electrolitos` · `antropometria` · `cardio` · `hepato` · `infecciones` · `neuro` · `pulmonar` · `critico` · `otros`

---

## Detalle Clínico

| ID | Nombre | Fórmulas / Criterios | Referencia |
|----|--------|---------------------|-----------|
| 1 | GFR | CKD-EPI 2021 (sin raza), 2009, Cockroft-Gault, MDRD | KDIGO 2024 |
| 2 | Clearance Cr 24h | (Cr orina × Vol) / (Cr plasma × 1440) | — |
| 3 | Anion Gap | Na − (Cl + HCO₃) ± corrección albúmina | — |
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
| 15 | MELD / MELD-Na | Cr/Bili/INR/Na (6–40 pts) | UNOS |
| 16 | SOFA | 6 órganos (0–24 pts) | Vincent 1996 |
| 17 | NIHSS | 15 ítems neurológicos (0–42 pts) | — |
| 18 | Glasgow | E(1-4)+V(1-5)+M(1-6) → 3–15 pts | Teasdale 1974 |
| 19 | TIMI NSTEMI | 7 criterios binarios (0–7 pts) | Antman 2000 |
| 20 | TIMI STEMI | Edad + 7 variables (0–14 pts) | Morrow 2000 |
| 21 | GRACE | Lookup tables por rangos (0–372 pts) | Fox 2006 |
| 22 | Braden | 6 subescalas (6–23 pts) | Bergstrom 1987 |
| 23 | MACOCHA | 7 factores (0–12 pts) | De Jong 2013 |
| 24 | PBW / Tidal | IBW (altura/sexo) × 6–8 ml/kg | ARDSNet |
| 25 | FOUR Score | 4 dominios (0–16 pts) | Wijdicks 2005 |
| 26 | HEART Score | 5 componentes (0–10 pts) | Six 2008 |
| 27 | Regla PERC | 8 criterios binarios | Kline 2004 |
| 28 | DKA / CAD | Clasificación leve/moderada/grave + protocolo insulina | ADA 2024 |
| 29 | Vasoactivos IV | Concentración → ml/hr → gtt/min, 12 fármacos | — |
| 30 | Guía Antibiótica | Patología → subtema → alergia → cobertura/dosis | — |
| 31 | Asma Aguda | Leve/Moderada/Grave/Fatal + protocolo GINA 2024 | GINA 2024, BTS-SIGN |
| 32 | Control Asma | Clasificación + Pasos 1–5 GINA + biológicos | GINA 2024 |
| 33 | LES | Criterios ACR/EULAR 2019 (≥10 pts + ANA ≥1:80) | ACR/EULAR 2019 |
| 34 | PAM | PAD + (PAS−PAD)/3 | — |
| 35 | Calculadora | Aritmética básica | — |
| 36 | Killip-Kimball | 4 clases clínicas post-IAM | Killip 1967 |
| 37 | PSI/PORT | Clase I–V (Fine et al.) + mortalidad a 30 días | Fine 1997 |
| 38 | FIB-4 / APRI | FIB-4 = (Edad×AST)/(Plaq×√ALT) + estigmas | Vallet-Pichard 2007 |

---

## Compatibilidad

| Navegador | Desktop | Móvil | PWA | Offline |
|-----------|---------|-------|-----|---------|
| Chrome 90+ | ✅ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ | ✅ |
| Safari 14+ | ✅ | ✅ | ⚠️ | ✅ |
| Firefox 88+ | ✅ | ✅ | ✅ | ✅ |
| Samsung Internet | — | ✅ | ✅ | ✅ |

⚠️ Safari: instalación PWA con funcionalidad limitada en versiones anteriores a iOS 16.4.

---

## Solución de Problemas

**Los datos no se guardan** — verifica que LocalStorage esté habilitado; no usar modo incógnito.

**App no funciona offline** — DevTools → Application → Service Workers → "Update".

**Calculadora no aparece en pantalla principal** — Ajustes → Pantalla Principal → verificar selección (máx. 15).

**Unidades incorrectas** — Ajustes → Unidades de Medida → verificar configuración regional.

---

## Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Calculadoras | 38 (100% funcionales) |
| Categorías | 10 (renal, electrolitos, antropometría, cardio, hepato, infecciones, neuro, pulmonar, crítico, otros) |
| Fármacos vasoactivos | 12 |
| Antibióticos indexados | ver `js/antibioticos/INDICE.md` |
| Archivos JavaScript | 10+ |
| Archivos CSS | 2 |

---

## Licencia

MIT License — Uso libre para fines educativos y profesionales.

---

## Créditos

Desarrollado para médicos internos, residentes, estudiantes en práctica preprofesional y personal de enfermería.

Basado en guías clínicas:
- KDIGO 2024 (función renal)
- ESC/ACC/AHA Guidelines (cardiología)
- GINA 2024 / BTS-SIGN 2023 (asma)
- Surviving Sepsis Campaign / Sepsis-3 (sepsis/UCI)
- ACR/EULAR 2019 (lupus eritematoso sistémico)
- AASLD 2023 / EASL (hepatología)
- Fine et al. 1997 / PORT Study (neumonía)
- ADA 2024 (cetoacidosis diabética)
- UNOS/OPTN (trasplante hepático)

---

*CliniCalc v1.2.9*
