// ============================================
// LABORATORIO — HORMONAS, MARCADORES TUMORALES, CARDÍACOS Y DE ANEMIAS
// ============================================

const LAB_DATA_HORMONAS = [
    {
        id: 'fsh',
        name: 'FSH (Hormona Folículo Estimulante)',
        aliases: ['fsh'],
        category: 'hormonas',
        valores: [
            { poblacion: 'Hombres', min: 1.5, max: 12.4, unit: 'mUI/mL' },
            { poblacion: 'Mujeres', min: null, max: null, unit: '', texto: 'Según fase del ciclo menstrual' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'lh',
        name: 'LH (Hormona Luteinizante)',
        aliases: ['lh'],
        category: 'hormonas',
        valores: [
            { poblacion: 'Hombres', min: 1.7, max: 8.6, unit: 'mUI/mL' },
            { poblacion: 'Mujeres', min: null, max: null, unit: '', texto: 'Según fase del ciclo menstrual' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'prolactina',
        name: 'Prolactina',
        aliases: ['prl'],
        category: 'hormonas',
        valores: [
            { poblacion: 'Hombres', min: 98, max: 456, unit: 'µUI/mL' },
            { poblacion: 'Mujeres', min: 127, max: 650, unit: 'µUI/mL' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'estradiol',
        name: 'Estradiol',
        aliases: ['e2'],
        category: 'hormonas',
        valores: [
            { poblacion: 'Hombres', min: 28.0, max: 156, unit: 'pmol/L' },
            { poblacion: 'Mujeres', min: null, max: null, unit: '', texto: 'Según fase del ciclo menstrual' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'progesterona',
        name: 'Progesterona',
        aliases: ['progesterona'],
        category: 'hormonas',
        valores: [
            { poblacion: 'Hombres', min: 0.7, max: 4.3, unit: 'nmol/L' },
            { poblacion: 'Mujeres', min: null, max: null, unit: '', texto: 'Según fase del ciclo menstrual' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'testosterona',
        name: 'Testosterona',
        aliases: ['testosterona'],
        category: 'hormonas',
        valores: [
            { poblacion: 'Hombres', min: 9.9, max: 27.8, unit: 'nmol/L' },
            { poblacion: 'Mujeres', min: 0.22, max: 2.9, unit: 'nmol/L' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'tsh',
        name: 'TSH (Hormona Estimulante de Tiroides)',
        aliases: ['tsh'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: 0.4, max: 4.0, unit: 'µUI/mL' }],
        fuente: 'American Thyroid Association (ATA)'
    },
    {
        id: 't3',
        name: 'T3 (Triyodotironina)',
        aliases: ['t3', 'triyodotironina'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: 1.3, max: 3.1, unit: 'nmol/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 't4',
        name: 'T4 (Tiroxina)',
        aliases: ['t4', 'tiroxina'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: 75.00, max: 144.0, unit: 'nmol/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'cortisol',
        name: 'Cortisol',
        aliases: ['cortisol'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: 171, max: 536, unit: 'nmol/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'insulina',
        name: 'Insulina',
        aliases: ['insulina'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: 2, max: 15, unit: 'µUI/mL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'pth',
        name: 'PTH (Hormona Paratiroidea)',
        aliases: ['pth', 'paratohormona'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: 15, max: 65, unit: 'pg/mL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'dhea-s',
        name: 'DHEA-S (Sulfato de Dehidroepiandrosterona)',
        aliases: ['dhea', 'dhea-s', 'dheas'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: 11.9, max: 492.0, unit: 'µg/dL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'afp',
        name: 'AFP (Alfafetoproteína)',
        aliases: ['afp', 'alfafetoproteina'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: null, max: 10, unit: 'ng/mL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'ca-125',
        name: 'CA-125',
        aliases: ['ca125', 'ca-125'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: null, max: 35, unit: 'U/mL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'cea',
        name: 'CEA (Antígeno Carcinoembrionario)',
        aliases: ['cea', 'antigeno carcinoembrionario'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: null, max: 5, unit: 'ng/mL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'psa',
        name: 'PSA (Antígeno Prostático Específico)',
        aliases: ['psa', 'antigeno prostatico'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: null, max: 4.4, unit: 'ng/mL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'beta-hcg',
        name: 'β-HCG (Gonadotropina Coriónica)',
        aliases: ['bhcg', 'beta hcg', 'hcg'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos (no gestante)', min: null, max: 2, unit: 'UI/mL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'ck-mb-masa',
        name: 'CK-MB Masa',
        aliases: ['ck-mb', 'ckmb'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: 0, max: 5, unit: 'ng/mL' }],
        notaClinica: 'Marcador cardíaco — ver TIMI STEMI/NSTEMI (Calculadoras 19/20) y HEART Score (Calculadora 26).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'troponina-t',
        name: 'Troponina T',
        aliases: ['troponina', 'tnt'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: null, max: 0.01, unit: 'ng/mL' }],
        notaClinica: 'Ver HEART Score (Calculadora 26) y TIMI (Calculadoras 19/20). El punto de corte exacto depende del ensayo (convencional vs. alta sensibilidad) — ver también entrada "Troponina de Alta Sensibilidad".',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'troponina-alta-sensibilidad',
        name: 'Troponina de Alta Sensibilidad (hs-cTn)',
        aliases: ['hs-troponina', 'troponina ultrasensible', 'hs-ctn'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: null, max: null, unit: '', texto: 'El punto de corte del percentil 99 varía según el ensayo específico del laboratorio (típicamente rango de 10-40 ng/L) — no existe un único valor universal.' }],
        notaClinica: 'No usar un número fijo sin verificar el ensayo local. Ver HEART Score (Calculadora 26) y TIMI (Calculadoras 19/20) para el algoritmo de decisión clínica.',
        fuente: 'Consenso ESC/ACC de troponina de alta sensibilidad — ampliación fuera del PDF fuente'
    },
    {
        id: 'probnp',
        name: 'proBNP',
        aliases: ['probnp', 'nt-probnp', 'bnp'],
        category: 'hormonas',
        valores: [
            { poblacion: 'Hombres', min: null, max: 84, unit: 'pg/mL' },
            { poblacion: 'Mujeres', min: null, max: 155, unit: 'pg/mL' }
        ],
        notaClinica: 'Elevado en insuficiencia cardíaca descompensada — ver Edema Agudo de Pulmón/ICA Descompensada (Calculadora 44).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'ferritina',
        name: 'Ferritina',
        aliases: ['ferritina'],
        category: 'hormonas',
        valores: [
            { poblacion: 'Hombres', min: 30, max: 400, unit: 'ng/mL' },
            { poblacion: 'Mujeres', min: 13, max: 150, unit: 'ng/mL' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'folico',
        name: 'Ácido Fólico',
        aliases: ['folico', 'acido folico', 'vitamina b9'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: 3.71, max: 17.5, unit: 'ng/mL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'vitamina-b12',
        name: 'Vitamina B12',
        aliases: ['b12', 'cobalamina'],
        category: 'hormonas',
        valores: [{ poblacion: 'Adultos', min: 240.0, max: 900.0, unit: 'pg/mL' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'procalcitonina',
        name: 'Procalcitonina (PCT)',
        aliases: ['pct', 'procalcitonina'],
        category: 'hormonas',
        valores: [
            { poblacion: 'Normal / infección improbable', min: null, max: 0.05, unit: 'ng/mL' },
            { poblacion: 'Infección bacteriana sistémica probable', min: 0.5, max: null, unit: 'ng/mL' }
        ],
        notaClinica: 'Apoya (no reemplaza) la decisión clínica de sepsis — ver Sepsis/Shock Séptico (Calculadora 43) y qSOFA/SOFA (Calculadoras 13/16).',
        fuente: 'Guías de uso de procalcitonina en sepsis (Surviving Sepsis, IDSA) — ampliación fuera del PDF fuente'
    },
    {
        id: 'pcr-ultrasensible-cv',
        name: 'PCR Ultrasensible (Riesgo Cardiovascular)',
        aliases: ['hs-pcr', 'pcr us', 'pcr de alta sensibilidad'],
        category: 'hormonas',
        valores: [
            { poblacion: 'Riesgo bajo', min: null, max: 1.0, unit: 'mg/L' },
            { poblacion: 'Riesgo intermedio', min: 1.0, max: 3.0, unit: 'mg/L' },
            { poblacion: 'Riesgo alto', min: 3.0, max: null, unit: 'mg/L' }
        ],
        notaClinica: 'Distinta de la PCR estándar de infección/inflamación aguda (ver Química Sanguínea) — este ensayo ultrasensible estratifica riesgo cardiovascular a largo plazo, no infección aguda.',
        fuente: 'AHA/CDC — ampliación fuera del PDF fuente'
    }
];
