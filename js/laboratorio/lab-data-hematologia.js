// ============================================
// LABORATORIO — HEMATOLOGÍA Y HEMOSTASIA
// ============================================

const LAB_DATA_HEMATOLOGIA = [
    {
        id: 'hemoglobina',
        name: 'Hemoglobina',
        aliases: ['hb', 'hgb'],
        category: 'hematologia',
        valores: [
            { poblacion: 'Hombres', min: 13.0, max: 17.0, unit: 'g/dL' },
            { poblacion: 'Mujeres', min: 12.0, max: 15.0, unit: 'g/dL' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'hematocrito',
        name: 'Hematocrito',
        aliases: ['hto', 'hct'],
        category: 'hematologia',
        valores: [
            { poblacion: 'Hombres', min: 40, max: 50, unit: '%' },
            { poblacion: 'Mujeres', min: 37, max: 45, unit: '%' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos (expresado en % en vez de fracción, valor equivalente)'
    },
    {
        id: 'leucocitos',
        name: 'Leucocitos',
        aliases: ['gb', 'globulos blancos', 'wbc'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos', min: 5, max: 10, unit: 'x10⁹/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'eritrocitos',
        name: 'Eritrocitos',
        aliases: ['gr', 'globulos rojos', 'rbc', 'hematies'],
        category: 'hematologia',
        valores: [
            { poblacion: 'Hombres', min: 4.5, max: 5.5, unit: 'x10¹²/L' },
            { poblacion: 'Mujeres', min: 4.0, max: 4.5, unit: 'x10¹²/L' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'eritrosedimentacion',
        name: 'Eritrosedimentación (VSG)',
        aliases: ['vsg', 'velocidad de sedimentacion globular'],
        category: 'hematologia',
        valores: [
            { poblacion: 'Hombres', min: 0, max: 10, unit: 'mm/hr' },
            { poblacion: 'Mujeres', min: 0, max: 20, unit: 'mm/hr' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'diferencial-leucocitario',
        name: 'Conteo Diferencial de Células Sanguíneas',
        aliases: ['diferencial', 'formula leucocitaria', 'diferencial de leucocitos'],
        category: 'hematologia',
        valores: [
            { poblacion: 'Neutrófilos', min: 65, max: 70, unit: '%' },
            { poblacion: 'Linfocitos', min: 25, max: 40, unit: '%' },
            { poblacion: 'Eosinófilos', min: 1, max: 3, unit: '%' },
            { poblacion: 'Monocitos', min: 4, max: 8, unit: '%' },
            { poblacion: 'Basófilos', min: 0.5, max: 1, unit: '%' }
        ],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'vcm',
        name: 'Volumen Corpuscular Medio (VCM)',
        aliases: ['vcm', 'mcv'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos', min: 82, max: 92, unit: 'fL/eritrocito' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'hcm',
        name: 'Hemoglobina Corpuscular Media (HCM)',
        aliases: ['hcm', 'mch'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos', min: 26, max: 32, unit: 'pg/célula' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'chcm',
        name: 'Concentración de Hemoglobina Corpuscular Media (CHCM)',
        aliases: ['chcm', 'mchc'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos', min: 320, max: 360, unit: 'g Hb/L' }],
        notaClinica: 'Equivalente a 32–36 g/dL, el rango estándar de CHCM.',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'reticulocitos',
        name: 'Conteo de Reticulocitos',
        aliases: ['reticulocitos'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos', min: 5, max: 15, unit: 'x10³/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'plaquetas',
        name: 'Conteo de Plaquetas',
        aliases: ['plaquetas', 'plt'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos', min: 150, max: 350, unit: 'x10⁹/L' }],
        notaClinica: 'Caída sostenida en paciente con heparina — ver Score 4Ts (Calculadora 54).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'tiempo-sangramiento',
        name: 'Tiempo de Sangramiento',
        aliases: ['tiempo de sangria'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos', min: 1, max: 3, unit: 'min' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'tiempo-coagulacion',
        name: 'Tiempo de Coagulación',
        aliases: ['tc'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos (37°C)', min: 5, max: 10, unit: 'min' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'tpt-kaolin',
        name: 'TPT Kaolín (Tiempo de Tromboplastina Parcial Activada)',
        aliases: ['tpt', 'ttpa', 'aptt'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos', min: 25, max: 40, unit: 'seg' }],
        fuente: 'Rango internacional estándar (aPTT-Kaolín, 25–40 seg)'
    },
    {
        id: 'tiempo-protrombina',
        name: 'Tiempo de Protrombina',
        aliases: ['tp', 'pt', 'inr'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos', min: null, max: null, unit: '', texto: '≤ 0.3 seg por encima del control (o del valor normal del laboratorio)' }],
        notaClinica: 'Para decisión de reversión de anticoagulación antes de trombolisis — ver Código Ictus (Calculadora 48).',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'factores-coagulacion',
        name: 'Factores de la Coagulación (II, V, VII, VIII, IX, XI)',
        aliases: ['factor viii', 'factor ix', 'factor v', 'factor vii', 'factor xi'],
        category: 'hematologia',
        valores: [
            { poblacion: 'Factor II', min: 0.5, max: 1.0, unit: '', texto: '0.5 – 1.0 (fracción del valor normal, ≈ 50–100%)' },
            { poblacion: 'Factor V', min: 0.5, max: 1.0, unit: '', texto: '0.5 – 1.0 (fracción del valor normal, ≈ 50–100%)' },
            { poblacion: 'Factor VII', min: 0.5, max: 1.0, unit: '', texto: '0.5 – 1.0 (fracción del valor normal, ≈ 50–100%)' },
            { poblacion: 'Factor VIII', min: 0.3, max: 1.0, unit: '', texto: '0.3 – 1.0 (fracción del valor normal, ≈ 30–100%)' },
            { poblacion: 'Factor IX', min: 0.3, max: 1.0, unit: '', texto: '0.3 – 1.0 (fracción del valor normal, ≈ 30–100%)' },
            { poblacion: 'Factor XI', min: 0.5, max: 1.0, unit: '', texto: '0.5 – 1.0 (fracción del valor normal, ≈ 50–100%)' }
        ],
        notaClinica: 'Actividad expresada como fracción del valor normal (1.0 = 100%), la convención estándar de reporte clínico. El Factor I (fibrinógeno) se cubre por separado en el test "Fibrinógeno".',
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'fibrinogeno',
        name: 'Fibrinógeno',
        aliases: ['fibrinogeno'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos', min: 2, max: 4, unit: 'g/L' }],
        fuente: 'Infomed — Intervalos de referencia en adultos'
    },
    {
        id: 'dimero-d',
        name: 'Dímero-D',
        aliases: ['dimero d', 'd-dimero'],
        category: 'hematologia',
        valores: [{ poblacion: 'Adultos', min: 0, max: 500, unit: 'ng/mL (FEU)' }],
        notaClinica: 'Umbral de exclusión de TEP en baja probabilidad pre-test — ver Wells TEP (Calculadora 14) y Regla PERC (Calculadora 27). Puede elevarse por edad, embarazo, inflamación o malignidad sin TEP.',
        fuente: 'Estándar de laboratorio internacional (ensayo FEU) — ampliación fuera del PDF fuente'
    }
];
