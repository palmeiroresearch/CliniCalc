// ============================================
// LABORATORIO — INMUNOLOGÍA
// ============================================

const LAB_DATA_INMUNOLOGIA = [
    {
        id: 'autoanticuerpos',
        name: 'Autoanticuerpos (título)',
        aliases: ['ana', 'anticuerpos antinucleares'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos', min: null, max: null, unit: '', texto: '< 1:10' }],
        notaClinica: 'El ANA es criterio de entrada obligatorio (≥1:80) en Diagnóstico LES ACR/EULAR 2019 — ver Calculadora 33.',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'complemento-c3',
        name: 'Complemento C3',
        aliases: ['c3'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos y niños', min: 0.9, max: 1.8, unit: 'g/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'complemento-c4',
        name: 'Complemento C4',
        aliases: ['c4'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos y niños', min: 0.1, max: 0.4, unit: 'g/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'ch50',
        name: 'CH-50 (Complemento Hemolítico Total)',
        aliases: ['ch50', 'ch-50'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos', min: null, max: null, unit: '', texto: '> 23 U de CH50' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'crioglobulinas',
        name: 'Crioglobulinas',
        aliases: ['crioglobulinas'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos y niños', min: null, max: null, unit: '', texto: 'Negativo' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'iga',
        name: 'Inmunoglobulina A (IgA)',
        aliases: ['iga'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos', min: 0.70, max: 4.00, unit: 'g/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'igg',
        name: 'Inmunoglobulina G (IgG)',
        aliases: ['igg'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos', min: 7.00, max: 16.00, unit: 'g/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'igm',
        name: 'Inmunoglobulina M (IgM)',
        aliases: ['igm'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos', min: 0.40, max: 2.30, unit: 'g/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'icc',
        name: 'Inmunocomplejo Circulante (ICC)',
        aliases: ['icc', 'inmunocomplejos circulantes'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos', min: null, max: 0.080, unit: 'U.D.O' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'factor-reumatoide',
        name: 'Factor Reumatoide',
        aliases: ['fr', 'factor reumatoide'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos', min: null, max: 8, unit: 'UI/mL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'fagocitosis',
        name: 'Fagocitosis',
        aliases: ['fagocitosis'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos', min: 37, max: 62, unit: '%' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'pruebas-hipersensibilidad',
        name: 'Pruebas de Hipersensibilidad (cutáneas)',
        aliases: ['hipersensibilidad', 'pruebas cutaneas'],
        category: 'inmunologia',
        valores: [{ poblacion: 'Adultos', min: null, max: null, unit: '', texto: '2 a 3 induraciones > 2 mm' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    }
];
