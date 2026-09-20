// ============================================
// LABORATORIO — QUÍMICA SANGUÍNEA
// ============================================

const LAB_DATA_QUIMICA = [
    {
        id: 'albumina',
        name: 'Albúmina',
        aliases: ['alb'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 35, max: 45, unit: 'g/L' }],
        unitConvKey: 'albumin',
        notaClinica: 'Necesaria para corregir Calcio (Calculadora 4) y Anion Gap (Calculadora 3) en hipoalbuminemia.',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'amilasa',
        name: 'Amilasa',
        aliases: ['amilasa serica'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: null, max: 90, unit: 'U/L' }],
        notaClinica: 'Elevación >3× el límite superior sugiere pancreatitis aguda — ver Pancreatitis Aguda (Calculadora 59).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'bilirrubina-total',
        name: 'Bilirrubina Total',
        aliases: ['bt', 'bilirrubina'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: null, max: 17, unit: 'µmol/L' }],
        unitConvKey: 'bilirubin',
        notaClinica: 'Usada en Child-Pugh (Calculadora 11) y MELD (Calculadora 15).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'bilirrubina-directa',
        name: 'Bilirrubina Directa',
        aliases: ['bd', 'bilirrubina conjugada'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: null, max: 7.0, unit: 'µmol/L' }],
        unitConvKey: 'bilirubin',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'bilirrubina-indirecta',
        name: 'Bilirrubina Indirecta',
        aliases: ['bi', 'bilirrubina no conjugada'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: null, max: 12.0, unit: 'µmol/L' }],
        unitConvKey: 'bilirubin',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'calcio-serico',
        name: 'Calcio Sérico',
        aliases: ['ca', 'calcio'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 2.0, max: 2.6, unit: 'mmol/L' }],
        unitConvKey: 'calcium',
        notaClinica: 'Para corrección por albúmina en hipoalbuminemia — ver Calcio Corregido (Calculadora 4).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'ceruloplasmina',
        name: 'Ceruloplasmina',
        aliases: ['ceruloplasmina'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 19, max: 57, unit: 'g/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'creatinina',
        name: 'Creatinina',
        aliases: ['cr', 'creat'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 46, max: 106, unit: 'µmol/L' }],
        unitConvKey: 'creatinine',
        notaClinica: 'Para estimar la función renal ajustada por edad/sexo/peso — ver Filtrado Glomerular (Calculadora 1).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'colesterol-total',
        name: 'Colesterol Total',
        aliases: ['colesterol'],
        category: 'quimica',
        valores: [
            { poblacion: 'Valor deseado', min: null, max: 5.2, unit: 'mmol/L' },
            { poblacion: 'Valor límite', min: 5.2, max: 6.1, unit: 'mmol/L' },
            { poblacion: 'Elevado', min: 6.2, max: null, unit: 'mmol/L' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'colesterol-hdl',
        name: 'Colesterol HDL',
        aliases: ['hdl'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 0.9, max: null, unit: 'mmol/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'colesterol-vldl',
        name: 'Colesterol VLDL',
        aliases: ['vldl'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: null, max: 0.77, unit: 'mmol/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'colesterol-ldl',
        name: 'Colesterol LDL',
        aliases: ['ldl'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: null, max: 3.36, unit: 'mmol/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'ck-total',
        name: 'CK Total (Creatina Quinasa)',
        aliases: ['ck', 'cpk'],
        category: 'quimica',
        valores: [
            { poblacion: 'Hombres', min: 38, max: 174, unit: 'U/L' },
            { poblacion: 'Mujeres', min: 26, max: 140, unit: 'U/L' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'fosfatasa-alcalina',
        name: 'Fosfatasa Alcalina',
        aliases: ['fa', 'alp'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 44, max: 147, unit: 'U/L' }],
        fuente: 'Rango internacional estándar (IFCC)'
    },
    {
        id: 'fosforo',
        name: 'Fósforo',
        aliases: ['p', 'fosfato'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 0.8, max: 1.6, unit: 'mmol/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'haptoglobina',
        name: 'Haptoglobina',
        aliases: ['haptoglobina'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 15, max: 200, unit: 'mg/dL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'hierro',
        name: 'Hierro Sérico',
        aliases: ['fe'],
        category: 'quimica',
        valores: [
            { poblacion: 'Hombres', min: 70, max: 130, unit: 'µg/dL' },
            { poblacion: 'Mujeres', min: 60, max: 120, unit: 'µg/dL' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'ggt',
        name: 'GGT (Gamma-Glutamil Transferasa)',
        aliases: ['ggt', 'gamma gt'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: null, max: 50, unit: 'U/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'glucosa',
        name: 'Glucosa',
        aliases: ['gluc'],
        category: 'quimica',
        valores: [
            { poblacion: 'Adultos', min: 3.8, max: 6.1, unit: 'mmol/L' },
            { poblacion: 'Embarazadas', min: null, max: 5.8, unit: 'mmol/L' },
            { poblacion: 'Glucosa alterada en ayunas', min: 6.1, max: 6.9, unit: 'mmol/L' },
            { poblacion: 'Hipoglucemia', min: null, max: 2.2, unit: 'mmol/L' }
        ],
        unitConvKey: 'glucose',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'hba1c',
        name: 'Hemoglobina Glicosilada (HbA1c)',
        aliases: ['hba1c', 'hemoglobina glicada', 'a1c'],
        category: 'quimica',
        valores: [
            { poblacion: 'Normal', min: null, max: 5.7, unit: '%' },
            { poblacion: 'Prediabetes', min: 5.7, max: 6.4, unit: '%' },
            { poblacion: 'Diabetes', min: 6.5, max: null, unit: '%' }
        ],
        notaClinica: 'Refleja control glucémico de los últimos ~3 meses, no la glucemia puntual.',
        fuente: 'American Diabetes Association (ADA) — ampliación fuera del PDF fuente'
    },
    {
        id: 'lactato',
        name: 'Lactato',
        aliases: ['acido lactico', 'lactatemia'],
        category: 'quimica',
        valores: [
            { poblacion: 'Arterial', min: null, max: 11.3, unit: 'mg/dL' },
            { poblacion: 'Venoso', min: 4.5, max: 19.8, unit: 'mg/dL' }
        ],
        notaClinica: 'Umbral de hipoperfusión tisular en sepsis (>2 mmol/L ≈ 18 mg/dL) — ver Sepsis/Shock Séptico (Calculadora 43).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'ldh',
        name: 'LDH (Lactato Deshidrogenasa)',
        aliases: ['ldh'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 230, max: 460, unit: 'U/L' }],
        notaClinica: '>350 U/L es uno de los criterios de Ranson al ingreso — ver Pancreatitis Aguda (Calculadora 59).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'alt',
        name: 'ALT (TGP)',
        aliases: ['alt', 'tgp', 'alanino aminotransferasa'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 10, max: 50, unit: 'U/L' }],
        notaClinica: 'Usada en FIB-4/APRI (Calculadora 38).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'ast',
        name: 'AST (TGO)',
        aliases: ['ast', 'tgo', 'aspartato aminotransferasa'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 10, max: 50, unit: 'U/L' }],
        notaClinica: '>250 U/L es uno de los criterios de Ranson al ingreso; usada también en FIB-4/APRI (Calculadora 38).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'lipoproteina-a',
        name: 'Lipoproteína (a)',
        aliases: ['lp(a)', 'lipoproteina a'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: null, max: 30, unit: 'mg/dL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'magnesio',
        name: 'Magnesio',
        aliases: ['mg'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 1.6, max: 2.5, unit: 'mg/dL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'proteinas-totales',
        name: 'Proteínas Totales',
        aliases: ['proteinas totales'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 60, max: 80, unit: 'g/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'pcr',
        name: 'Proteína C Reactiva (PCR)',
        aliases: ['pcr', 'crp', 'proteina c reactiva'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 0.00, max: 0.05, unit: 'g/L' }],
        notaClinica: 'Marcador de inflamación/infección — ver también PCR ultrasensible cardiovascular en Hormonas y Marcadores.',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'trigliceridos',
        name: 'Triglicéridos',
        aliases: ['tg'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 0.40, max: 1.81, unit: 'mmol/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'transferrina',
        name: 'Transferrina',
        aliases: ['transferrina'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 230, max: 420, unit: 'mg/dL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'urea',
        name: 'Urea (BUN)',
        aliases: ['bun', 'urea', 'nitrogeno ureico'],
        category: 'quimica',
        valores: [{ poblacion: 'Adultos', min: 2.5, max: 6.4, unit: 'mmol/L' }],
        unitConvKey: 'bun',
        notaClinica: 'Usada en CURB-65 (Calculadora 12), PSI/PORT (Calculadora 37), Glasgow-Blatchford (Calculadora 58) y BISAP (Calculadora 59).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'uratos',
        name: 'Ácido Úrico (Uratos)',
        aliases: ['acido urico', 'uratos'],
        category: 'quimica',
        valores: [
            { poblacion: 'Hombres', min: 202, max: 416, unit: 'µmol/L' },
            { poblacion: 'Mujeres', min: 142, max: 310, unit: 'µmol/L' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    }
];
