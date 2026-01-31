// ============================================
// CLINICALC - CONFIGURACIÓN
// Metadata de las 15 Calculadoras Médicas
// ============================================

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
    ]
};

// === CONFIGURACIÓN PREDETERMINADA === //
const DEFAULT_CONFIG = {
    mainScreen: [1, 6, 3, 9, 12], // GFR, IMC, Anion Gap, CHADS2-VASc, CURB-65
    favorites: [1, 6, 3, 9, 12],
    settings: {
        darkMode: true,
        units: {
            creatinine: 'mg/dL',
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
