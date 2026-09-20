// ============================================
// LABORATORIO — IONES, GASES ARTERIALES Y LÍQUIDOS BIOLÓGICOS
// ============================================

const LAB_DATA_IONES_GASES = [
    {
        id: 'sodio',
        name: 'Sodio (Na)',
        aliases: ['na', 'sodio serico'],
        category: 'iones-gases',
        valores: [
            { poblacion: 'Recién nacidos (0-30 días)', min: 134, max: 144, unit: 'mmol/L' },
            { poblacion: 'Niños (>1 mes)', min: 134, max: 143, unit: 'mmol/L' },
            { poblacion: 'Adultos', min: 132, max: 145, unit: 'mmol/L' }
        ],
        unitConvKey: 'sodium',
        notaClinica: 'Para corrección en hiperglicemia — ver Sodio Corregido (Calculadora 5) y Osmolaridad (Calculadora 8).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'cloro',
        name: 'Cloro (Cl)',
        aliases: ['cl', 'cloruro'],
        category: 'iones-gases',
        valores: [
            { poblacion: 'Recién nacidos (0-30 días)', min: 98, max: 113, unit: 'mmol/L' },
            { poblacion: 'Niños (>1 mes)', min: 98, max: 107, unit: 'mmol/L' },
            { poblacion: 'Adultos', min: 99, max: 110, unit: 'mmol/L' }
        ],
        unitConvKey: 'chloride',
        notaClinica: 'Componente del Anion Gap — ver Calculadora 3 y Gasometría Arterial (Calculadora 49).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'potasio',
        name: 'Potasio (K)',
        aliases: ['k', 'potasio serico', 'kalemia'],
        category: 'iones-gases',
        valores: [
            { poblacion: 'Recién nacidos (0-30 días)', min: 3.6, max: 6.1, unit: 'mmol/L' },
            { poblacion: 'Niños (>1 mes)', min: 3.5, max: 5.0, unit: 'mmol/L' },
            { poblacion: 'Adultos', min: 3.2, max: 5.0, unit: 'mmol/L' }
        ],
        notaClinica: 'Hipo/hiperkalemia como causa reversible de paro — ver Paro Cardíaco (Calculadora 46, causa "kalemia").',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'bicarbonato',
        name: 'Bicarbonato (HCO₃⁻)',
        aliases: ['hco3', 'bicarbonato', 'bs'],
        category: 'iones-gases',
        valores: [{ poblacion: 'Adultos', min: 21, max: 25, unit: 'mmol/L' }],
        unitConvKey: 'bicarbonate',
        notaClinica: 'Ver interpretación ácido-base completa en Gasometría Arterial (Calculadora 49).',
        fuente: 'Infomed — Intervalos de referencia en adultos (gasometría arterial)'
    },
    {
        id: 'ph-arterial',
        name: 'pH Arterial',
        aliases: ['ph', 'ph sangre arterial'],
        category: 'iones-gases',
        valores: [{ poblacion: 'Adultos', min: 7.35, max: 7.45, unit: '' }],
        notaClinica: 'Ver interpretación ácido-base sistemática completa en Gasometría Arterial (Calculadora 49) — la clasificación no se basa solo en el pH.',
        fuente: 'Infomed — Intervalos de referencia en adultos (gasometría arterial)'
    },
    {
        id: 'exceso-base',
        name: 'Exceso de Base (EB)',
        aliases: ['eb', 'exceso de base', 'base excess'],
        category: 'iones-gases',
        valores: [{ poblacion: 'Adultos', min: -2.5, max: 2.5, unit: 'mmol/L' }],
        notaClinica: 'Déficit de base >4 mEq/L es uno de los criterios de Ranson a las 48h — ver Pancreatitis Aguda (Calculadora 59).',
        fuente: 'Infomed — Intervalos de referencia en adultos (gasometría arterial)'
    },
    {
        id: 'pco2',
        name: 'pCO₂ (Presión Parcial de CO₂)',
        aliases: ['pco2', 'co2'],
        category: 'iones-gases',
        valores: [{ poblacion: 'Adultos', min: 35, max: 45, unit: 'mmHg' }],
        notaClinica: 'Ver Gasometría Arterial (Calculadora 49) para compensación esperada (Winter) y clasificación completa.',
        fuente: 'Infomed — Intervalos de referencia en adultos (gasometría arterial)'
    },
    {
        id: 'po2',
        name: 'pO₂ (Presión Parcial de O₂)',
        aliases: ['po2', 'o2'],
        category: 'iones-gases',
        valores: [{ poblacion: 'Adultos', min: 95, max: 100, unit: 'mmHg' }],
        notaClinica: 'Ver índice de Kirby (PaO₂/FiO₂) y gradiente A-a en Gasometría Arterial (Calculadora 49).',
        fuente: 'Infomed — Intervalos de referencia en adultos (gasometría arterial)'
    },
    {
        id: 'glucosa-lcr',
        name: 'Glucosa en LCR',
        aliases: ['glucorraquia', 'glucosa liquido cefalorraquideo'],
        category: 'iones-gases',
        valores: [{ poblacion: 'Adultos', min: 2, max: 3, unit: 'mmol/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    }
];
