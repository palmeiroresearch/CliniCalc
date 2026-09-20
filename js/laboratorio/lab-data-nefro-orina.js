// ============================================
// LABORATORIO — NEFROLOGÍA Y ORINA
// ============================================

const LAB_DATA_NEFRO = [
    {
        id: 'leucocitos-orina',
        name: 'Leucocitos en Orina',
        aliases: ['leucocituria'],
        category: 'nefro-orina',
        valores: [{ poblacion: 'Adultos', min: 0, max: 1, unit: 'x10.000' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'eritrocitos-orina',
        name: 'Eritrocitos en Orina',
        aliases: ['hematuria', 'eritrocituria'],
        category: 'nefro-orina',
        valores: [{ poblacion: 'Adultos', min: 0, max: 1, unit: 'x10.000' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'calcio-orina',
        name: 'Calcio en Orina (24h)',
        aliases: ['calciuria'],
        category: 'nefro-orina',
        valores: [{ poblacion: 'Adultos', min: null, max: 200, unit: 'mg/24h' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'fosforo-orina',
        name: 'Fósforo en Orina (24h)',
        aliases: ['fosfaturia'],
        category: 'nefro-orina',
        valores: [{ poblacion: 'Adultos', min: 300, max: 800, unit: 'mg/24h' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'glucosa-orina',
        name: 'Glucosa en Orina (24h)',
        aliases: ['glucosuria'],
        category: 'nefro-orina',
        valores: [{ poblacion: 'Adultos', min: 0, max: 1.38, unit: 'mmol/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'magnesio-orina',
        name: 'Magnesio en Orina',
        aliases: ['magnesuria'],
        category: 'nefro-orina',
        valores: [{ poblacion: 'Adultos', min: 3.0, max: 5.0, unit: 'mmol/día' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'proteinas-orina-24h',
        name: 'Proteínas en Orina (24h)',
        aliases: ['proteinuria'],
        category: 'nefro-orina',
        valores: [{ poblacion: 'Adultos', min: null, max: 0.4, unit: 'g/L' }],
        notaClinica: 'Para proteinuria de bajo grado, ver también Microalbuminuria/Relación Albúmina-Creatinina en esta misma lista.',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'cituria',
        name: 'Cituria',
        aliases: ['cituria'],
        category: 'nefro-orina',
        valores: [
            { poblacion: 'Albúmina', min: null, max: null, unit: '', texto: 'No contiene' },
            { poblacion: 'Leucocitos', min: null, max: 10000, unit: 'células/mL' },
            { poblacion: 'Eritrocitos', min: null, max: 10000, unit: 'células/mL' },
            { poblacion: 'Cilindros', min: null, max: 2500, unit: 'células/mL' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'filtrado-glomerular',
        name: 'Filtrado Glomerular',
        aliases: ['fg', 'tfg', 'clearance de creatinina'],
        category: 'nefro-orina',
        valores: [{ poblacion: 'Adultos', min: 70, max: 160, unit: 'mL/min' }],
        notaClinica: 'Para estimación ajustada por edad/sexo/peso mediante fórmulas validadas — ver Filtrado Glomerular (Calculadora 1) y Clearance de Creatinina 24h (Calculadora 2).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'conteo-addis',
        name: 'Conteo de Addis',
        aliases: ['addis'],
        category: 'nefro-orina',
        valores: [
            { poblacion: 'Albúmina', min: null, max: null, unit: '', texto: 'No contiene' },
            { poblacion: 'Leucocitos', min: null, max: 1000, unit: 'elementos/min' },
            { poblacion: 'Eritrocitos', min: null, max: 1000, unit: 'elementos/min' },
            { poblacion: 'Cilindros', min: null, max: 250, unit: 'elementos/min' }
        ],
        notaClinica: 'Leucocitos, eritrocitos y cilindros expresados en elementos excretados por minuto, la metodología estándar del conteo de Addis.',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'microalbuminuria-acr',
        name: 'Microalbuminuria / Relación Albúmina-Creatinina (ACR)',
        aliases: ['acr', 'microalbuminuria', 'relacion albumina creatinina'],
        category: 'nefro-orina',
        valores: [
            { poblacion: 'Normal', min: null, max: 30, unit: 'mg/g' },
            { poblacion: 'Microalbuminuria', min: 30, max: 300, unit: 'mg/g' },
            { poblacion: 'Macroalbuminuria', min: 300, max: null, unit: 'mg/g' }
        ],
        notaClinica: 'Marcador temprano de nefropatía (diabética o de otra causa) — complementa el Filtrado Glomerular (Calculadora 1) en la estadificación KDIGO de enfermedad renal crónica.',
        fuente: 'KDIGO — ampliación fuera del PDF fuente'
    }
];
