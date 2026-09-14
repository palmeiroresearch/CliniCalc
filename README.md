# CliniCalc — Calculadoras Médicas Profesionales

> PWA con 60 calculadoras y protocolos médicos, modo offline completo, guía antibiótica empírica (88 patologías), calculadora de vasoactivos IV y guías de manejo clínico escalonado (paro cardíaco, sepsis, ictus, arritmias, dengue y más).

![Versión](https://img.shields.io/badge/versión-1.8.0-blue)
![Estado](https://img.shields.io/badge/estado-producción-brightgreen)
![Licencia](https://img.shields.io/badge/licencia-MIT-green)
![Calculadoras](https://img.shields.io/badge/calculadoras-60-orange)

---

## Características Principales

### Progressive Web App (PWA)
- Instalable en móvil y escritorio
- 100% Offline — funciona sin internet (Service Worker + Cache-First con actualización en segundo plano)
- Actualizaciones automáticas con banner de notificación integrado
- Modo oscuro predeterminado con soporte completo de variables CSS
- Biblioteca con favoritos y pantalla principal personalizable (arrastrar/reordenar, mín. 1 / máx. 15 calculadoras)

### 60 Calculadoras y Protocolos Médicos

#### Renal (2)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 1 | GFR | Filtrado Glomerular — CKD-EPI 2021/2009, Cockroft-Gault, MDRD |
| 2 | Clearance Cr 24h | Clearance de creatinina en orina de 24 horas |

#### Electrolitos (5)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 3 | Anion Gap | Brecha aniónica con corrección por albúmina |
| 4 | Calcio Corregido | Corrección por albúmina sérica (Payne 1973) |
| 5 | Sodio Corregido | Corrección en hiperglicemia (Katz + Hillier) |
| 8 | Osmolaridad | Osmolaridad sérica y gap osmolar |
| 49 | Gasometría Arterial | Interpretación ácido-base sistemática (enfoque Boston/Winter) + Anion Gap/Delta Ratio + índice de Kirby |

#### Antropometría (2)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 6 | IMC | Índice de Masa Corporal con clasificación OMS |
| 7 | BSA | Superficie corporal (Mosteller + DuBois) |

#### Cardiología (13)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 9 | CHADS₂-VASc | Riesgo de ACV en fibrilación auricular |
| 10 | HAS-BLED | Riesgo de sangrado con anticoagulantes |
| 19 | TIMI UA/NSTEMI | Riesgo de evento adverso en angina inestable y NSTEMI |
| 20 | TIMI STEMI | Mortalidad a 30 días en infarto con elevación del ST |
| 21 | GRACE Score | Mortalidad intrahospitalaria en síndrome coronario agudo |
| 26 | HEART Score | Probabilidad de SCA en dolor torácico en urgencias |
| 27 | Regla PERC | Exclusión de TEP sin dímero D en bajo riesgo pre-test |
| 36 | Killip-Kimball | Clasificación de fallo cardíaco post-IAM (Clases I–IV) |
| 41 | Crisis Hipertensiva | Urgencia vs Emergencia — fármaco IV, objetivo y velocidad por escenario |
| 44 | Edema Agudo de Pulmón | Perfil hemodinámico (Forrester/Nohria-Stevenson) + soporte |
| 45 | Protocolo de Arritmias | Estable vs Inestable — cardioversión/antiarrítmicos por tipo |
| 46 | Paro Cardíaco | RCP + búsqueda guiada de causa reversible (6H/5T) |
| 50 | QTc Corregido | Bazett, Fridericia y Framingham + riesgo de Torsades de Pointes |

#### Hepatología (3)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 11 | Child-Pugh | Clasificación de cirrosis hepática (A/B/C) |
| 15 | MELD / MELD-Na | Prioridad para trasplante hepático |
| 38 | FIB-4 / APRI | Fibrosis hepática no invasiva + estigmas clínicos |

#### Infecciones / UCI (7)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 12 | CURB-65 | Severidad de neumonía adquirida en comunidad |
| 13 | qSOFA | Detección rápida de sepsis fuera de UCI |
| 16 | SOFA Score | Evaluación secuencial de falla orgánica en UCI |
| 30 | Guía Antibiótica | 88 patologías infecciosas — primera línea, segunda línea y alergia |
| 37 | PSI/PORT | Índice de severidad de neumonía (Fine et al. 1997) — Clases I–V |
| 43 | Sepsis / Shock Séptico | Bundle terapéutico de la primera hora (Surviving Sepsis 2021) |
| 47 | Dengue | Clasificación OMS Grupo A/B/C + fluidoterapia escalonada por peso |

#### Neurología (6)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 17 | NIHSS | Escala de ictus del NIH (severidad del ACV isquémico) |
| 18 | Glasgow (GCS) | Nivel de conciencia — apertura ocular, verbal, motor |
| 42 | Estatus Epiléptico | Protocolo escalonado por tiempo (benzodiacepina → 2ª línea → anestesia) |
| 48 | Código Ictus | Checklist de trombolisis/trombectomía (AHA/ASA 2019) |
| 51 | ABCD2 Score | Riesgo de ictus a 2 días tras un AIT |
| 52 | Rankin Modificada (mRS) | Grado de discapacidad funcional (basal o al alta) |

#### Pulmonar (3)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 31 | Asma Aguda | Clasificación y protocolo de tratamiento (GINA 2024/BTS-SIGN) |
| 32 | Control Asma | Clasificación crónica y tratamiento escalonado GINA (Pasos 1–5) |
| 39 | EPOC | Clasificación GOLD 2025 (espirometría, CAT, mMRC, esquema ABE) |

#### UCI / Crítico (12)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 23 | MACOCHA | Score de vía aérea difícil en intubación de UCI |
| 24 | Peso Ideal / Tidal | Peso corporal ideal y volumen tidal en ventilación mecánica |
| 25 | FOUR Score | Escala neurológica para pacientes intubados |
| 28 | DKA / CAD | Protocolo de cetoacidosis diabética — clasificación y manejo |
| 29 | Vasoactivos IV | Infusión IV para 12 fármacos vasoactivos (ml/hr + gtt/min) |
| 34 | PAM | Presión arterial media con objetivos clínicos |
| 40 | EHH / HHS | Estado hiperosmolar hiperglucémico — fluidos, K⁺, insulina |
| 53 | Profilaxis de TVE | Caprini (quirúrgico, focalizado) / Padua (médico) |
| 54 | Score 4Ts | Probabilidad de trombocitopenia inducida por heparina (HIT) |
| 55 | Fórmula de Parkland | Fluidoterapia en quemados por peso y %SCT |
| 56 | Delirio y Sedación en UCI | RASS + CAM-ICU (evaluación condicionada por nivel de sedación) |
| 57 | Escalas de Abstinencia | CIWA-Ar (alcohol) / COWS (opioides) |

#### Gastroenterología (2)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 58 | Hemorragia Digestiva Alta | Glasgow-Blatchford (ingreso) + Rockall (pre/post-endoscopia) |
| 59 | Pancreatitis Aguda | Ranson (ingreso + 48h) / BISAP (simplificado, 24h) |

#### Toxicología (1)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 60 | Intoxicación por Paracetamol | Nomograma de Rumack-Matthew + dosis de N-acetilcisteína |

#### Otros (4)
| ID | Nombre | Descripción |
|----|--------|-------------|
| 14 | Wells TEP | Probabilidad de tromboembolia pulmonar |
| 22 | Braden | Riesgo de úlceras por presión |
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

#### Guía de Antibioterapia Empírica (ID 30)
- **88 patologías infecciosas** indexadas (respiratorio, urinario, piel/partes blandas, abdominal, SNC/ocular, ITS, fúngicas, tropicales/parasitarias, ginecológicas y misceláneas)
- Selección por patología → subtema clínico → perfil de alergia
- Primera línea, segunda línea, alternativas en alergia a betalactámicos, dosis y duración
- Fuentes: Sanford Guide 2024, IDSA, ATS, ESCMID, EAU, Tokyo Guidelines, WHO 2022, ACOG, AASLD, CDC (ver `js/antibioticos/INDICE.md` para el listado completo)

#### FIB-4 / APRI + Estigmas Clínicos (ID 38)
- Evaluación no invasiva de fibrosis hepática (AASLD 2023, EASL, OMS)
- Cutoffs ajustados automáticamente para pacientes >65 años
- Checklist de 15 estigmas clínicos en 4 grupos
- Interpretación combinada score + clínica

#### Guías de Manejo Clínico Escalonado
17 calculadoras van más allá de un score puntual y guían el manejo terapéutico completo por etapas: **28** (CAD/CADE), **31** (Asma Aguda), **40** (EHH), **41** (Crisis Hipertensiva), **42** (Estatus Epiléptico), **43** (Sepsis/Shock Séptico), **44** (EAP/ICA Descompensada), **45** (Protocolo de Arritmias), **46** (Paro Cardíaco — con búsqueda guiada de causa 6H/5T por hallazgos clínicos), **47** (Dengue), **48** (Código Ictus), **55** (Parkland), **56** (RASS/CAM-ICU), **57** (Escalas de Abstinencia), **58** (Hemorragia Digestiva Alta), **59** (Pancreatitis Aguda) y **60** (Paracetamol). Cada una calcula la severidad/clasificación y, a partir de ahí, arma un protocolo terapéutico completo (fármacos, dosis por peso, objetivos y reevaluación), no solo un número.

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
| Calcio | mg/dL · mmol/L | mg/dL |
| Albúmina | g/dL · g/L | g/dL |
| Bilirrubina | mg/dL · µmol/L | mg/dL |
| Sodio | mEq/L · mmol/L | mEq/L |
| Cloro | mEq/L · mmol/L | mEq/L |
| Bicarbonato | mEq/L · mmol/L | mEq/L |

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
├── index.html                  # HTML principal + filtros de biblioteca (12 categorías)
├── manifest.json               # PWA manifest
├── sw.js                       # Service Worker (Cache-First + Stale-While-Revalidate)
├── CLAUDE.md                   # Referencia técnica detallada (arquitectura, convenciones, particularidades)
│
├── css/
│   ├── main.css                # Design system, variables CSS, tokens de color por categoría
│   └── additional-styles.css  # Formularios, result-cards, modales
│
└── js/
    ├── config.js               # APP_VERSION, CALCULATORS_CONFIG (60), INTERPRETATIONS, UNIT_CONVERSIONS
    ├── storage.js               # LocalStorage: historial, favoritos, pantalla principal, settings
    ├── calculators.js           # Lógica pura de la mayoría de scores y protocolos
    ├── ui.js                    # Renderizado (pantalla principal, biblioteca, historial, búsqueda)
    ├── forms.js                 # Formularios IDs 2–5, 11–15
    ├── forms2.js                # Grueso de los formularios: IDs 6–10, 16–28, 31–60
    ├── app.js                   # Inicialización, navegación, loadCalculatorForm(), SW, modal, historial
    │
    ├── ivcalc/                  # Módulo Vasoactivos IV (ID 29)
    │   ├── iv-calculator.js     # Motor de cálculo (concentración, ml/hr, gtt/min) + formulario
    │   ├── drug-index.js        # Índice de fármacos y categorías
    │   └── drugs-vasoactive.js  # 12 fármacos vasoactivos con indicaciones y dosis
    │
    └── antibioticos/            # Módulo Guía Antibiótica (ID 30)
        ├── antibiotics-calculator.js       # Motor de selección y display
        ├── antibiotics-index.js            # Combina todos los arrays de datos en ANTIBIOTIC_DB
        ├── antibiotics-data*.js            # 10 archivos temáticos (respiratorio/urinario, ORL, ITS, fúngicas, tropicales ×2, misceláneas, abdominal, neuro/ocular, resp/piel/uro)
        └── INDICE.md                       # Índice completo de las 88 patologías por categoría
```

---

## Añadir una Calculadora Nueva

1. **`js/config.js`** — añadir entrada a `CALCULATORS_CONFIG` (id, name, fullName, icon, category, categoryLabel, description, formulas)
2. **`js/calculators.js`** — añadir `calculateXXX(inputs)` al objeto `Calculators` (lógica pura, sin DOM)
3. **`js/forms2.js`** — añadir `createXXXForm()` y `calculateXXXForm(event)` antes de `// === FUNCIÓN GENÉRICA`; si es una guía de manejo escalonado, clonar el patrón `create*Form()` + `build*ProtocolHTML()` + `calculate*Protocol(event)` de una calculadora similar (ej. 46 o 58) en vez de partir de cero
4. **`js/app.js`** — añadir `case ID:` en `loadCalculatorForm()`
5. Si es una categoría nueva — añadir el `filter-chip` en `index.html` y el bloque `[data-category="..."] { --cat-color; --cat-color-bg; }` en `main.css`
6. Si se añaden archivos `.js` nuevos — registrar el `<script>` en `index.html` y la ruta en `ASSETS_TO_CACHE` de `sw.js`, y subir `CACHE_NAME`

El próximo ID libre es **61**. Ver `CLAUDE.md` para la referencia técnica completa (convenciones de unidades, patrones de referencias cruzadas entre calculadoras, particularidades de cada módulo).

### Categorías disponibles
`renal` · `electrolitos` · `antropometria` · `cardio` · `hepato` · `infecciones` · `neuro` · `otros` · `critico` · `pulmonar` · `gastro` · `toxicologia`

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
| 30 | Guía Antibiótica | Patología → subtema → alergia → cobertura/dosis (88 patologías) | Sanford/IDSA/OMS |
| 31 | Asma Aguda | Leve/Moderada/Grave/Fatal + protocolo GINA 2024 | GINA 2024, BTS-SIGN |
| 32 | Control Asma | Clasificación + Pasos 1–5 GINA + biológicos | GINA 2024 |
| 33 | LES | Criterios ACR/EULAR 2019 (≥10 pts + ANA ≥1:80) | ACR/EULAR 2019 |
| 34 | PAM | PAD + (PAS−PAD)/3 | — |
| 35 | Calculadora | Aritmética básica | — |
| 36 | Killip-Kimball | 4 clases clínicas post-IAM | Killip 1967 |
| 37 | PSI/PORT | Clase I–V (Fine et al.) + mortalidad a 30 días | Fine 1997 |
| 38 | FIB-4 / APRI | FIB-4 = (Edad×AST)/(Plaq×√ALT) + estigmas | Vallet-Pichard 2007 |
| 39 | EPOC | GOLD espirométrico 1–4 + CAT + mMRC + esquema ABE | GOLD 2025 |
| 40 | EHH / HHS | Osmolaridad efectiva + fluidos/K⁺/insulina escalonados | ADA 2024, JBDS-IP 2022 |
| 41 | Crisis Hipertensiva | Daño de órgano diana → fármaco IV/objetivo por escenario | ACC/AHA 2017, ESC/ESH 2023 |
| 42 | Estatus Epiléptico | Benzodiacepina → 2ª línea IV → anestesia (dosis por peso) | AES 2016, ESETT |
| 43 | Sepsis / Shock Séptico | Bundle 1ª hora: lactato, cultivos, ATB, fluidos, vasopresores | Surviving Sepsis 2021 |
| 44 | Edema Agudo de Pulmón | Perfil Forrester/Nohria-Stevenson → vasodilatador/diurético/soporte | ESC HF 2021/2023 |
| 45 | Protocolo de Arritmias | Estable vs inestable (5 criterios) → cardioversión/antiarrítmicos | AHA ACLS 2020 |
| 46 | Paro Cardíaco | RCP + desfibrilable/no + búsqueda de causa por 11 hallazgos (6H/5T) | AHA ACLS 2020 |
| 47 | Dengue | Grupo A/B/C (OMS) + fluidoterapia escalonada por peso | OMS 2009, PAHO |
| 48 | Código Ictus | Ventana horaria + exclusiones + dosis Alteplasa + trombectomía | AHA/ASA 2019 |
| 49 | Gasometría Arterial | Patrón HCO₃/pCO₂ + compensación esperada + Delta Ratio + Kirby | Enfoque Boston/Winter |
| 50 | QTc Corregido | Bazett QT/√RR · Fridericia QT/∛RR · Framingham QT+154×(1−RR) | ACC/HRS |
| 51 | ABCD2 | 5 factores (0–7 pts) — riesgo de ictus a 2 días tras AIT | Johnston 2007 |
| 52 | Rankin (mRS) | Escala funcional 0–6 (tabla de referencia, no sumatoria) | van Swieten 1988 |
| 53 | Profilaxis TVE | Padua (médico, ≥4 = alto riesgo) / Caprini focalizado (quirúrgico) | Barbar 2010, Caprini 2005 |
| 54 | Score 4Ts | 4 dominios (0–2 c/u, 0–8 pts) — probabilidad de HIT | Lo 2006 |
| 55 | Parkland | 4 mL × kg × %SCT, mitad en 8h desde la quemadura | Baxter 1968 |
| 56 | RASS / CAM-ICU | RASS −5 a +4; CAM-ICU solo si RASS ≥ −3 (4 features) | Ely 2001, Sessler 2002 |
| 57 | CIWA-Ar / COWS | CIWA-Ar 10 ítems (0–67) · COWS 11 ítems (0–48) | Sullivan 1989, Wesson 2003 |
| 58 | Hemorragia Digestiva Alta | Glasgow-Blatchford (0–23) + Rockall pre/post-endoscopia (0–11) | Blatchford 2000, Rockall 1996 |
| 59 | Pancreatitis Aguda | Ranson ingreso+48h (0–11) / BISAP (0–5) | Ranson 1974, Wu 2008 |
| 60 | Paracetamol | Nomograma Rumack-Matthew (línea 150→4.7 µg/mL, 4–24h) + NAC 3 bolsas | Rumack & Matthew 1975 |

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

**Calculadora no aparece en pantalla principal** — desde la Biblioteca, usa el ícono 📌 en cada calculadora, o ve a Ajustes → Pantalla Principal (mín. 1 / máx. 15).

**Unidades incorrectas** — Ajustes → Unidades de Medida → verificar configuración regional.

---

## Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Calculadoras y protocolos | 60 (100% funcionales) |
| Categorías | 12 (renal, electrolitos, antropometría, cardio, hepato, infecciones, neuro, otros, crítico, pulmonar, gastro, toxicología) |
| Guías de manejo escalonado | 17 |
| Fármacos vasoactivos IV | 12 |
| Patologías infecciosas indexadas | 88 (ver `js/antibioticos/INDICE.md`) |
| Archivos JavaScript | 20+ |
| Archivos CSS | 2 |

---

## Licencia

MIT License — Uso libre para fines educativos y profesionales.

---

## Créditos

Desarrollado para médicos internos, residentes, estudiantes en práctica preprofesional y personal de enfermería.

Basado en guías clínicas:
- KDIGO 2024 (función renal)
- ESC/ACC/AHA Guidelines, AHA ACLS 2020 (cardiología, arritmias, paro cardíaco)
- GINA 2024 / BTS-SIGN 2023 (asma) · GOLD 2025 (EPOC)
- Surviving Sepsis Campaign 2021 / Sepsis-3 (sepsis/UCI)
- ACR/EULAR 2019 (lupus eritematoso sistémico)
- AASLD 2023 / EASL (hepatología)
- Fine et al. 1997 / PORT Study (neumonía)
- ADA 2024 / JBDS-IP 2022 (cetoacidosis diabética y estado hiperosmolar)
- UNOS/OPTN (trasplante hepático)
- AHA/ASA 2019 (código ictus) · AES 2016/ESETT (estatus epiléptico)
- OMS 2009 / PAHO (dengue) · Sanford Guide 2024, IDSA, ATS, ESCMID, EAU, Tokyo Guidelines, WHO 2022, ACOG, CDC (guía antibiótica)
- Baxter 1968 (fórmula de Parkland) · Rumack & Matthew 1975 (nomograma de paracetamol)
- Ranson 1974 / Wu 2008 BISAP (pancreatitis) · Blatchford 2000 / Rockall 1996 (hemorragia digestiva alta)
- Sullivan 1989 CIWA-Ar / Wesson & Ling 2003 COWS (síndromes de abstinencia)
- Ely 2001 CAM-ICU / Sessler 2002 RASS (delirio y sedación en UCI)
- Barbar 2010 Padua / Caprini 2005 (profilaxis de TVE) · Lo 2006 (score 4Ts, HIT)

---

*CliniCalc v1.8.0*
