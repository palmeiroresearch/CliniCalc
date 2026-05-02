// ============================================
// CLINICALC - CONFIGURACIÓN
// Metadata de las 22 Calculadoras Médicas
// ============================================

const APP_VERSION = '1.2.8';

const CALCULATORS_CONFIG = [
    // === CATEGORÍA: RENAL === //
    {
        id: 1,
        name: 'GFR',
        fullName: 'Filtrado Glomerular',
        icon: '🔬',
        category: 'renal',
        categoryLabel: 'Renal',
        description: 'Estima la función renal (CKD-EPI, Cockroft-Gault, MDRD)',
        formulas: ['CKD-EPI 2021', 'CKD-EPI 2009', 'Cockroft-Gault', 'MDRD'],
        defaultFormula: 'CKD-EPI 2021'
    },
    {
        id: 2,
        name: 'Clearance Cr 24h',
        fullName: 'Clearance de Creatinina 24 horas',
        icon: '⏱️',
        category: 'renal',
        categoryLabel: 'Renal',
        description: 'Cálculo del clearance de creatinina en orina de 24h',
        formulas: ['Clearance 24h']
    },
    
    // === CATEGORÍA: ELECTROLITOS === //
    {
        id: 3,
        name: 'Anion Gap',
        fullName: 'Anion Gap',
        icon: '⚗️',
        category: 'electrolitos',
        categoryLabel: 'Electrolitos',
        description: 'Evalúa acidosis metabólica (AG normal vs aumentado)',
        formulas: ['Anion Gap', 'AG corregido']
    },
    {
        id: 4,
        name: 'Calcio Corregido',
        fullName: 'Corrección de Calcio por Albúmina',
        icon: '🧪',
        category: 'electrolitos',
        categoryLabel: 'Electrolitos',
        description: 'Corrige nivel de calcio según albúmina sérica',
        formulas: ['Corrección Payne']
    },
    {
        id: 5,
        name: 'Sodio Corregido',
        fullName: 'Corrección de Sodio en Hiperglicemia',
        icon: '💧',
        category: 'electrolitos',
        categoryLabel: 'Electrolitos',
        description: 'Corrige sodio en presencia de hiperglicemia',
        formulas: ['Katz (1973)', 'Hillier (1999)']
    },
    
    // === CATEGORÍA: ANTROPOMETRÍA === //
    {
        id: 6,
        name: 'IMC',
        fullName: 'Índice de Masa Corporal',
        icon: '📏',
        category: 'antropometria',
        categoryLabel: 'Antropometría',
        description: 'Clasifica estado nutricional según peso y talla',
        formulas: ['IMC estándar']
    },
    {
        id: 7,
        name: 'BSA',
        fullName: 'Superficie Corporal',
        icon: '📐',
        category: 'antropometria',
        categoryLabel: 'Antropometría',
        description: 'Calcula superficie corporal (dosis quimioterapia)',
        formulas: ['Mosteller', 'DuBois']
    },
    {
        id: 8,
        name: 'Osmolaridad',
        fullName: 'Osmolaridad Sérica',
        icon: '💦',
        category: 'electrolitos',
        categoryLabel: 'Electrolitos',
        description: 'Calcula osmolaridad sérica y gap osmolar',
        formulas: ['Osmolaridad calculada']
    },
    
    // === CATEGORÍA: CARDIOLOGÍA === //
    {
        id: 9,
        name: 'CHADS₂-VASc',
        fullName: 'CHADS₂-VASc Score',
        icon: '❤️',
        category: 'cardio',
        categoryLabel: 'Cardiología',
        description: 'Riesgo de ACV en fibrilación auricular',
        formulas: ['CHADS₂-VASc']
    },
    {
        id: 10,
        name: 'HAS-BLED',
        fullName: 'HAS-BLED Score',
        icon: '🩸',
        category: 'cardio',
        categoryLabel: 'Cardiología',
        description: 'Riesgo de sangrado con anticoagulantes',
        formulas: ['HAS-BLED']
    },
    
    // === CATEGORÍA: HEPATOLOGÍA === //
    {
        id: 11,
        name: 'Child-Pugh',
        fullName: 'Child-Pugh Score',
        icon: '🏥',
        category: 'hepato',
        categoryLabel: 'Hepatología',
        description: 'Clasifica severidad de cirrosis hepática',
        formulas: ['Child-Pugh']
    },
    
    // === CATEGORÍA: INFECCIONES === //
    {
        id: 12,
        name: 'CURB-65',
        fullName: 'CURB-65 Score',
        icon: '🦠',
        category: 'infecciones',
        categoryLabel: 'Infecciones',
        description: 'Severidad de neumonía adquirida en comunidad',
        formulas: ['CURB-65']
    },
    {
        id: 13,
        name: 'qSOFA',
        fullName: 'Quick SOFA',
        icon: '🚨',
        category: 'infecciones',
        categoryLabel: 'Infecciones',
        description: 'Detección rápida de sepsis fuera de UCI',
        formulas: ['qSOFA']
    },
    
    // === CATEGORÍA: OTROS === //
    {
        id: 14,
        name: 'Wells TEP',
        fullName: 'Wells Score (TEP)',
        icon: '🫁',
        category: 'otros',
        categoryLabel: 'Otros',
        description: 'Probabilidad de tromboembolia pulmonar',
        formulas: ['Wells TEP']
    },
    {
        id: 15,
        name: 'MELD',
        fullName: 'MELD Score',
        icon: '🩺',
        category: 'hepato',
        categoryLabel: 'Hepatología',
        description: 'Prioridad para trasplante hepático',
        formulas: ['MELD', 'MELD-Na']
    },

    // === CATEGORÍA: INFECCIONES/UCI === //
    {
        id: 16,
        name: 'SOFA',
        fullName: 'SOFA Score',
        icon: '🏨',
        category: 'infecciones',
        categoryLabel: 'Infecciones',
        description: 'Evaluación secuencial de falla orgánica en UCI (sepsis)',
        formulas: ['SOFA']
    },

    // === CATEGORÍA: NEUROLOGÍA === //
    {
        id: 17,
        name: 'NIHSS',
        fullName: 'NIHSS Score',
        icon: '🧠',
        category: 'neuro',
        categoryLabel: 'Neurología',
        description: 'Escala de ictus del NIH - severidad del ACV isquémico',
        formulas: ['NIHSS']
    },
    {
        id: 18,
        name: 'Glasgow',
        fullName: 'Escala de Glasgow (GCS)',
        icon: '👁️',
        category: 'neuro',
        categoryLabel: 'Neurología',
        description: 'Evalúa nivel de conciencia: apertura ocular, respuesta verbal y motora',
        formulas: ['GCS']
    },

    // === CATEGORÍA: CARDIOLOGÍA (continuación) === //
    {
        id: 19,
        name: 'TIMI NSTEMI',
        fullName: 'TIMI Risk Score (UA/NSTEMI)',
        icon: '💔',
        category: 'cardio',
        categoryLabel: 'Cardiología',
        description: 'Riesgo de muerte/IAM/revascularización en angina inestable y NSTEMI',
        formulas: ['TIMI UA/NSTEMI']
    },
    {
        id: 20,
        name: 'TIMI STEMI',
        fullName: 'TIMI Risk Score (STEMI)',
        icon: '🫀',
        category: 'cardio',
        categoryLabel: 'Cardiología',
        description: 'Mortalidad a 30 días en infarto agudo con elevación del ST',
        formulas: ['TIMI STEMI']
    },
    {
        id: 21,
        name: 'GRACE',
        fullName: 'GRACE Score (SCA)',
        icon: '🏥',
        category: 'cardio',
        categoryLabel: 'Cardiología',
        description: 'Mortalidad intrahospitalaria en síndrome coronario agudo',
        formulas: ['GRACE']
    },

    // === CATEGORÍA: OTROS (continuación) === //
    {
        id: 22,
        name: 'Braden',
        fullName: 'Escala de Braden',
        icon: '🛏️',
        category: 'otros',
        categoryLabel: 'Otros',
        description: 'Riesgo de úlceras por presión (escaras)',
        formulas: ['Braden']
    },

    // === CATEGORÍA: UCI / CRÍTICO === //
    {
        id: 23,
        name: 'MACOCHA',
        fullName: 'MACOCHA Score',
        icon: '🫁',
        category: 'critico',
        categoryLabel: 'UCI / Crítico',
        description: 'Predicción de intubación difícil en UCI y Emergencias',
        formulas: ['Mallampati + 6 criterios clínicos']
    },
    {
        id: 24,
        name: 'PBW / Vol. Tidal',
        fullName: 'Peso Ideal + Volumen Tidal',
        icon: '💨',
        category: 'critico',
        categoryLabel: 'UCI / Crítico',
        description: 'Configuración del ventilador post-intubación (protocolo ARDSNet)',
        formulas: ['PBW ARDSNet', 'TV 6-8 mL/kg PBW']
    },
    {
        id: 25,
        name: 'FOUR Score',
        fullName: 'FOUR Score (Paciente Intubado)',
        icon: '🧠',
        category: 'critico',
        categoryLabel: 'UCI / Crítico',
        description: 'Evaluación neurológica para intubados — reemplaza Glasgow verbal',
        formulas: ['Ojos + Motor + Tronco encefálico + Respiración']
    },

    // === CATEGORÍA: CARDIOLOGÍA (continuación) === //
    {
        id: 26,
        name: 'HEART Score',
        fullName: 'HEART Score',
        icon: '💔',
        category: 'cardio',
        categoryLabel: 'Cardiología',
        description: 'Riesgo de evento cardíaco adverso mayor (MACE) en dolor torácico en Urgencias',
        formulas: ['Historia + ECG + Edad + Factores de riesgo + Troponina']
    },
    {
        id: 27,
        name: 'Regla PERC',
        fullName: 'Regla PERC (Exclusión TEP)',
        icon: '🫁',
        category: 'cardio',
        categoryLabel: 'Cardiología',
        description: 'Descarta tromboembolia pulmonar sin dímero D en bajo riesgo pre-test',
        formulas: ['8 criterios de exclusión']
    },

    // === CATEGORÍA: UCI / CRÍTICO (continuación) === //
    {
        id: 28,
        name: 'CAD / CADE',
        fullName: 'Protocolo CAD / CADE',
        icon: '🩸',
        category: 'critico',
        categoryLabel: 'UCI / Crítico',
        description: 'Reposición de fluidos, electrolitos e insulina en cetoacidosis diabética (ADA 2024)',
        formulas: ['Fluidos IV', 'Potasio', 'Insulina', 'Bicarbonato']
    },
    {
        id: 29,
        name: 'Vasoactivos IV',
        fullName: 'Calculadora de Vasoactivos IV',
        icon: '💉',
        category: 'critico',
        categoryLabel: 'UCI / Crítico',
        description: 'Cálculo de tasa de infusión para 12 fármacos vasoactivos (vasopresores, inotrópicos, vasodilatadores) con dosis recomendadas y perlas clínicas',
        formulas: ['ml/hr', 'gtt/min', 'ml/min']
    },
    {
        id: 30,
        name: 'Guía Antibiótica',
        fullName: 'Guía de Antibioterapia Empírica',
        icon: '💊',
        category: 'infecciones',
        categoryLabel: 'Infecciones',
        description: 'Antibioterapia empírica para 29 patologías infecciosas según Sanford Guide 2024 e IDSA. Primera línea, segunda línea y alternativas en alergia.',
        formulas: ['Primera línea', 'Segunda línea', 'Alergia']
    },
    {
        id: 31,
        name: 'Asma Aguda',
        fullName: 'Crisis Aguda de Asma Bronquial',
        icon: '🌬️',
        category: 'pulmonar',
        categoryLabel: 'Pulmonar',
        description: 'Clasificación y protocolo de tratamiento de la crisis aguda de asma. Leve · Moderada · Grave · Potencialmente Fatal (GINA 2024, BTS-SIGN 2023).',
        formulas: ['Severidad', 'O₂', 'Salbutamol', 'Corticoides', 'MgSO₄']
    },
    {
        id: 32,
        name: 'Control Asma',
        fullName: 'Clasificación y Tratamiento del Asma Crónica',
        icon: '🫁',
        category: 'pulmonar',
        categoryLabel: 'Pulmonar',
        description: 'Clasifica severidad (intermitente/persistente) y recomienda escalón terapéutico 1-5 con fármacos. Dual: diagnóstico inicial + evaluación de control en seguimiento (GINA 2024).',
        formulas: ['Severidad', 'Control GINA', 'Escalón 1-5', 'Biológicos']
    },
    {
        id: 33,
        name: 'Diagnóstico LES',
        fullName: 'Criterios ACR/EULAR 2019 — Lupus Eritematoso Sistémico',
        icon: '🧬',
        category: 'otros',
        categoryLabel: 'Otros',
        description: 'Score ACR/EULAR 2019 para clasificación de LES. 8 dominios clínico-inmunológicos. Manejo del ANA como criterio de entrada: positivo / negativo / pendiente.',
        formulas: ['ACR/EULAR 2019', '8 dominios', 'ANA entrada', '≥10 pts = LES']
    },
    {
        id: 34,
        name: 'PAM',
        fullName: 'Presión Arterial Media',
        icon: '🩸',
        category: 'critico',
        categoryLabel: 'UCI / Crítico',
        description: 'Presión Arterial Media (MAP). Fórmula: PAD + (PAS − PAD) / 3. Interpretación clínica con objetivos para sepsis, TCE y shock.',
        formulas: ['PAD + (PAS − PAD) / 3']
    },
    {
        id: 35,
        name: 'Calculadora',
        fullName: 'Calculadora General',
        icon: '🧮',
        category: 'otros',
        categoryLabel: 'Otros',
        description: 'Calculadora de uso general. Operaciones básicas, porcentaje y cambio de signo.',
        formulas: ['+', '−', '×', '÷', '%', '±']
    }
];

// === CONVERSIÓN DE UNIDADES === //
const UNIT_CONVERSIONS = {
    creatinine: {
        'mg/dL': { factor: 1, label: 'mg/dL (USA)', toSI: 88.42 },
        'µmol/L': { factor: 88.42, label: 'µmol/L (SI)', toSI: 1 }
    },
    weight: {
        'kg': { factor: 1, label: 'kg' },
        'lb': { factor: 2.20462, label: 'lb' }
    },
    height: {
        'cm': { factor: 1, label: 'cm' },
        'm': { factor: 0.01, label: 'm' },
        'in': { factor: 0.393701, label: 'in' },
        'ft': { factor: 0.0328084, label: 'ft' }
    },
    glucose: {
        'mg/dL': { factor: 1, label: 'mg/dL', toSI: 0.0555 },
        'mmol/L': { factor: 0.0555, label: 'mmol/L', toSI: 1 }
    },
    bun: {
        'mg/dL': { factor: 1, label: 'mg/dL', toSI: 0.357 },
        'mmol/L': { factor: 0.357, label: 'mmol/L (urea)', toSI: 1 }
    },
    calcium: {
        'mg/dL': { factor: 1, label: 'mg/dL', toSI: 0.2495 },
        'mmol/L': { factor: 0.2495, label: 'mmol/L', toSI: 1 }
    },
    albumin: {
        'g/dL': { factor: 1, label: 'g/dL' },
        'g/L': { factor: 10, label: 'g/L' }
    },
    bilirubin: {
        'mg/dL': { factor: 1, label: 'mg/dL', toSI: 17.1 },
        'µmol/L': { factor: 17.1, label: 'µmol/L', toSI: 1 }
    },
    sodium: {
        'mEq/L': { factor: 1, label: 'mEq/L' },
        'mmol/L': { factor: 1, label: 'mmol/L' }
    },
    chloride: {
        'mEq/L': { factor: 1, label: 'mEq/L' },
        'mmol/L': { factor: 1, label: 'mmol/L' }
    },
    bicarbonate: {
        'mEq/L': { factor: 1, label: 'mEq/L' },
        'mmol/L': { factor: 1, label: 'mmol/L' }
    }
};

// === INTERPRETACIONES CLÍNICAS === //
const INTERPRETATIONS = {
    // GFR (CKD-EPI / MDRD / Cockroft-Gault)
    gfr: [
        { min: 90, max: Infinity, stage: 'G1', label: 'Normal o elevado', color: 'success', description: 'Función renal normal con marcadores de daño renal' },
        { min: 60, max: 89, stage: 'G2', label: 'Disminución leve', color: 'success', description: 'Función renal ligeramente disminuida' },
        { min: 45, max: 59, stage: 'G3a', label: 'Disminución leve-moderada', color: 'warning', description: 'ERC moderada (KDIGO 2024)' },
        { min: 30, max: 44, stage: 'G3b', label: 'Disminución moderada-severa', color: 'warning', description: 'ERC moderada-severa' },
        { min: 15, max: 29, stage: 'G4', label: 'Disminución severa', color: 'danger', description: 'ERC severa - considerar preparación para TRR' },
        { min: 0, max: 14, stage: 'G5', label: 'Falla renal', color: 'danger', description: 'ERC terminal - candidato a diálisis/trasplante' }
    ],
    
    // IMC
    imc: [
        { min: 0, max: 18.5, label: 'Bajo peso', color: 'warning', description: 'Desnutrición - evaluar causas' },
        { min: 18.5, max: 24.9, label: 'Normal', color: 'success', description: 'Peso saludable' },
        { min: 25, max: 29.9, label: 'Sobrepeso', color: 'warning', description: 'Riesgo cardiovascular aumentado' },
        { min: 30, max: 34.9, label: 'Obesidad I', color: 'danger', description: 'Obesidad leve' },
        { min: 35, max: 39.9, label: 'Obesidad II', color: 'danger', description: 'Obesidad moderada' },
        { min: 40, max: Infinity, label: 'Obesidad III', color: 'danger', description: 'Obesidad mórbida - considerar cirugía bariátrica' }
    ],
    
    // Anion Gap
    anionGap: [
        { min: 0, max: 7, label: 'AG bajo', color: 'warning', description: 'Considerar hipoalbuminemia, mieloma múltiple' },
        { min: 8, max: 12, label: 'AG normal', color: 'success', description: 'Rango normal (8-12 mEq/L)' },
        { min: 13, max: Infinity, label: 'AG elevado', color: 'danger', description: 'Acidosis metabólica con AG ↑ (MUDPILES)' }
    ],
    
    // CHADS2-VASc
    chadsvasc: [
        { min: 0, max: 0, label: 'Bajo riesgo', color: 'success', description: 'Considerar sin anticoagulación (0.2% ACV/año)' },
        { min: 1, max: 1, label: 'Riesgo bajo-moderado', color: 'warning', description: 'Considerar anticoagulación oral (0.6-2% ACV/año)' },
        { min: 2, max: Infinity, label: 'Alto riesgo', color: 'danger', description: 'Anticoagulación recomendada (>2% ACV/año)' }
    ],
    
    // HAS-BLED
    hasbled: [
        { min: 0, max: 2, label: 'Bajo riesgo sangrado', color: 'success', description: 'Riesgo bajo (1.1% sangrado/año)' },
        { min: 3, max: Infinity, label: 'Alto riesgo sangrado', color: 'danger', description: 'Riesgo alto - precaución con anticoagulantes (>3% sangrado/año)' }
    ],
    
    // CURB-65
    curb65: [
        { min: 0, max: 1, label: 'Bajo riesgo', color: 'success', description: 'Manejo ambulatorio (mortalidad 1.5%)' },
        { min: 2, max: 2, label: 'Riesgo moderado', color: 'warning', description: 'Considerar hospitalización (mortalidad 9.2%)' },
        { min: 3, max: Infinity, label: 'Alto riesgo', color: 'danger', description: 'Hospitalización/UCI (mortalidad >20%)' }
    ],

    // CRB-65 (variante sin BUN, para entornos sin laboratorio)
    crb65: [
        { min: 0, max: 0, label: 'Bajo riesgo',     color: 'success', description: 'Manejo ambulatorio (mortalidad ~1%).' },
        { min: 1, max: 2, label: 'Riesgo moderado', color: 'warning', description: 'Evaluar hospitalización (mortalidad ~5-12%).' },
        { min: 3, max: 4, label: 'Alto riesgo',     color: 'danger',  description: 'Hospitalización urgente (mortalidad >20%).' }
    ],
    
    // qSOFA
    qsofa: [
        { min: 0, max: 1, label: 'Bajo riesgo', color: 'success', description: 'Bajo riesgo de sepsis' },
        { min: 2, max: Infinity, label: 'Alto riesgo', color: 'danger', description: 'Alto riesgo - considerar sepsis, evaluar SOFA completo' }
    ],
    
    // Child-Pugh
    childPugh: [
        { min: 5, max: 6, class: 'A', label: 'Clase A', color: 'success', description: 'Cirrosis compensada (mortalidad 1-2 años: 0%)' },
        { min: 7, max: 9, class: 'B', label: 'Clase B', color: 'warning', description: 'Disfunción moderada (mortalidad 1-2 años: 20%)' },
        { min: 10, max: 15, class: 'C', label: 'Clase C', color: 'danger', description: 'Descompensado (mortalidad 1-2 años: 55%)' }
    ],
    
    // Wells TEP
    wellsTEP: [
        { min: 0, max: 1, label: 'Baja probabilidad', color: 'success', description: 'TEP poco probable (1.3%)' },
        { min: 2, max: 6, label: 'Probabilidad moderada', color: 'warning', description: 'TEP posible (16.2%)' },
        { min: 7, max: Infinity, label: 'Alta probabilidad', color: 'danger', description: 'TEP muy probable (37.5%)' }
    ],
    
    // MELD
    meld: [
        { min: 0, max: 9, label: 'Bajo riesgo', color: 'success', description: 'Mortalidad 90d: 1.9%' },
        { min: 10, max: 19, label: 'Riesgo moderado', color: 'warning', description: 'Mortalidad 90d: 6-20%' },
        { min: 20, max: 29, label: 'Alto riesgo', color: 'danger', description: 'Mortalidad 90d: 19-45%' },
        { min: 30, max: Infinity, label: 'Muy alto riesgo', color: 'danger', description: 'Mortalidad 90d: >50% - urgente' }
    ],

    // SOFA
    sofa: [
        { min: 0, max: 6, label: 'Bajo riesgo', color: 'success', description: 'Mortalidad esperada <10%' },
        { min: 7, max: 9, label: 'Riesgo moderado', color: 'warning', description: 'Mortalidad esperada 15-20%' },
        { min: 10, max: 12, label: 'Alto riesgo', color: 'danger', description: 'Mortalidad esperada 40-50%' },
        { min: 13, max: 24, label: 'Muy alto riesgo', color: 'danger', description: 'Mortalidad >50% - UCI crítico' }
    ],

    // TIMI UA/NSTEMI
    timiNSTEMI: [
        { min: 0, max: 2, label: 'Bajo riesgo', color: 'success', description: 'Evento adverso a 14 días: 5-8% — manejo conservador, considerar estrategia temprana selectiva' },
        { min: 3, max: 4, label: 'Riesgo moderado', color: 'warning', description: 'Evento adverso a 14 días: 13-20% — estrategia invasiva temprana (<72h)' },
        { min: 5, max: 7, label: 'Alto riesgo', color: 'danger', description: 'Evento adverso a 14 días: 26-41% — estrategia invasiva urgente (<24h), anticoagulación intensiva' }
    ],

    // TIMI STEMI
    timiSTEMI: [
        { min: 0, max: 3, label: 'Bajo riesgo', color: 'success', description: 'Mortalidad a 30 días <5% — reperfusión estándar' },
        { min: 4, max: 6, label: 'Riesgo moderado', color: 'warning', description: 'Mortalidad a 30 días 5-20% — reperfusión urgente, monitorización estrecha' },
        { min: 7, max: 14, label: 'Alto riesgo', color: 'danger', description: 'Mortalidad a 30 días >20% — reperfusión urgente, soporte hemodinámico, UCI' }
    ],

    // GRACE Score
    grace: [
        { min: 0, max: 108, label: 'Bajo riesgo', color: 'success', description: 'Mortalidad intrahospitalaria <1% — estrategia conservadora o invasiva electiva' },
        { min: 109, max: 140, label: 'Riesgo intermedio', color: 'warning', description: 'Mortalidad intrahospitalaria 1-3% — estrategia invasiva temprana (<72h)' },
        { min: 141, max: 372, label: 'Alto riesgo', color: 'danger', description: 'Mortalidad intrahospitalaria >3% — estrategia invasiva urgente (<24h), UCI' }
    ],

    // Braden
    braden: [
        { min: 6, max: 9, label: 'Riesgo muy alto', color: 'danger', description: 'Úlcera por presión muy probable — cambios posturales cada 2h, superficie especializada, nutrición intensiva' },
        { min: 10, max: 12, label: 'Riesgo alto', color: 'danger', description: 'Riesgo alto — cambios posturales frecuentes, colchón antiescaras, vigilancia intensiva de piel' },
        { min: 13, max: 14, label: 'Riesgo moderado', color: 'warning', description: 'Riesgo moderado — medidas preventivas estándar, revisar factores modificables' },
        { min: 15, max: 18, label: 'Riesgo bajo', color: 'warning', description: 'Riesgo bajo — monitorizar y prevenir deterioro, educación al paciente y familia' },
        { min: 19, max: 23, label: 'Sin riesgo significativo', color: 'success', description: 'Riesgo mínimo — mantener movilización y nutrición adecuadas' }
    ],

    // Glasgow (GCS)
    glasgow: [
        { min: 13, max: 15, label: 'TCE leve / Alerta', color: 'success', description: 'Conciencia preservada o mínimamente alterada' },
        { min: 9, max: 12, label: 'TCE moderado / Confusión', color: 'warning', description: 'Obnubilación — vigilancia estrecha, considerar TC craneal' },
        { min: 3, max: 8, label: 'TCE severo / Coma', color: 'danger', description: 'Coma — intubación y neuroprotección; pronóstico reservado' }
    ],

    // NIHSS
    nihss: [
        { min: 0, max: 0, label: 'Sin déficit neurológico', color: 'success', description: 'Exploración neurológica normal' },
        { min: 1, max: 4, label: 'Ictus leve', color: 'success', description: 'Déficit menor, posible manejo ambulatorio' },
        { min: 5, max: 15, label: 'Ictus moderado', color: 'warning', description: 'Hospitalización recomendada, evaluar trombolisis/trombectomía' },
        { min: 16, max: 20, label: 'Ictus moderado-severo', color: 'danger', description: 'UCI/Unidad de ictus, alta necesidad de intervención' },
        { min: 21, max: 42, label: 'Ictus severo', color: 'danger', description: 'UCI, mortalidad y discapacidad severa elevadas' }
    ],

    // MACOCHA Score (De Jong, AJRCCM 2013)
    macocha: [
        { min: 0, max: 3, label: 'Bajo riesgo', color: 'success',
          description: 'Intubación probablemente fácil (tasa de dificultad <11%). Preparación estándar.' },
        { min: 4, max: 12, label: 'Alto riesgo', color: 'danger',
          description: 'Intubación potencialmente difícil (tasa de dificultad >90%). Prepare videolaringoscopio, operador experto y plan de vía aérea alternativa.' }
    ],

    // PBW + Volumen Tidal (interpretación única — no es un score de riesgo)
    pbw: [
        { min: 0, max: Infinity, label: 'Ventilación protectora', color: 'info',
          description: 'TV objetivo: 6 mL/kg PBW (ARDS: 4-6 mL/kg). FR: 12-20 rpm. Presión plateau máx. 30 cmH₂O. PEEP ≥ 5 cmH₂O. (ARDSNet, NEJM 2000).' }
    ],

    // FOUR Score (Wijdicks, Mayo Clin Proc 2005)
    fourScore: [
        { min: 0,  max: 0,  label: 'Compatible con muerte cerebral', color: 'danger',
          description: 'Score 0. Ausencia de reflejos de tronco encefálico y respiración espontánea. Evaluar test de apnea y protocolo de muerte cerebral.' },
        { min: 1,  max: 7,  label: 'Coma profundo', color: 'danger',
          description: 'Coma profundo. Pronóstico muy reservado. Búsqueda activa de causa tratable.' },
        { min: 8,  max: 12, label: 'Deterioro grave', color: 'warning',
          description: 'Respuesta motora presente pero deterioro neurológico grave. Monitorización estrecha.' },
        { min: 13, max: 15, label: 'Deterioro moderado', color: 'warning',
          description: 'Respuesta conservada parcialmente. Evaluar causa y potencial de recuperación.' },
        { min: 16, max: 16, label: 'Alerta', color: 'success',
          description: 'Score máximo: apertura ocular espontánea con seguimiento, respuesta a órdenes, reflejos presentes.' }
    ],

    // HEART Score (Six AJ et al., Neth Heart J 2008)
    heart: [
        { min: 0, max: 3, label: 'Bajo riesgo', color: 'success',
          description: 'Riesgo de MACE ~1.7%. Considerar alta hospitalaria con seguimiento ambulatorio. No requiere ingreso urgente.' },
        { min: 4, max: 6, label: 'Riesgo moderado', color: 'warning',
          description: 'Riesgo de MACE ~12%. Observación hospitalaria, troponina seriada e imagen según criterio clínico.' },
        { min: 7, max: 10, label: 'Alto riesgo', color: 'danger',
          description: 'Riesgo de MACE ~65%. Estrategia invasiva precoz. Ingreso en Cardiología o UCI coronaria.' }
    ],

    // Regla PERC (Kline JA et al., J Thromb Haemost 2004)
    perc: [
        { min: 0, max: 0, label: 'TEP descartado clínicamente', color: 'success',
          description: 'Todos los criterios PERC negativos. En paciente con probabilidad pre-test BAJA (Wells ≤1 o Geneva bajo), el TEP puede descartarse sin dímero D ni imagen.' },
        { min: 1, max: 8, label: 'No se puede descartar TEP', color: 'danger',
          description: 'Uno o más criterios PERC positivos. La regla PERC no aplica. Continuar con dímero D y/o imagen según probabilidad pre-test.' }
    ]
};

// === CONFIGURACIÓN PREDETERMINADA === //
const DEFAULT_CONFIG = {
    mainScreen: [1, 6, 3, 9, 12, 28], // GFR, IMC, Anion Gap, CHADS2-VASc, CURB-65, CAD/CADE
    favorites: [1, 6, 3, 9, 12],
    settings: {
        darkMode: true,
        units: {
            creatinine: 'µmol/L',
            weight: 'kg',
            height: 'cm',
            glucose: 'mg/dL',
            bun: 'mg/dL',
            calcium: 'mg/dL',
            albumin: 'g/dL',
            bilirubin: 'mg/dL',
            sodium: 'mEq/L',
            chloride: 'mEq/L',
            bicarbonate: 'mEq/L'
        }
    }
};

// === RANGOS NORMALES (Para validación) === //
const NORMAL_RANGES = {
    age: { min: 18, max: 120, unit: 'años' },
    weight: { min: 30, max: 300, unit: 'kg' },
    height: { min: 100, max: 250, unit: 'cm' },
    creatinine_mgdl: { min: 0.5, max: 15, unit: 'mg/dL', normal: '0.7-1.3' },
    creatinine_umol: { min: 44, max: 1326, unit: 'µmol/L', normal: '62-115' },
    sodium: { min: 120, max: 160, unit: 'mEq/L', normal: '135-145' },
    chloride: { min: 85, max: 120, unit: 'mEq/L', normal: '96-106' },
    bicarbonate: { min: 10, max: 40, unit: 'mEq/L', normal: '22-29' },
    glucose_mgdl: { min: 40, max: 800, unit: 'mg/dL', normal: '70-100' },
    glucose_mmol: { min: 2.2, max: 44, unit: 'mmol/L', normal: '3.9-5.6' },
    calcium: { min: 6, max: 15, unit: 'mg/dL', normal: '8.5-10.5' },
    albumin: { min: 1.5, max: 6, unit: 'g/dL', normal: '3.5-5.0' },
    bilirubin: { min: 0.1, max: 50, unit: 'mg/dL', normal: '0.3-1.2' },
    inr: { min: 0.8, max: 10, unit: '', normal: '0.8-1.2' },
    systolicBP: { min: 60, max: 250, unit: 'mmHg', normal: '90-120' },
    respiratoryRate: { min: 8, max: 60, unit: '/min', normal: '12-20' }
};
