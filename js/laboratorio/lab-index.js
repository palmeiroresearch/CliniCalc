// ============================================
// LABORATORIO — ÍNDICE (combina todos los arrays de datos)
// ============================================

const LAB_REFERENCE_DB = [
    ...LAB_DATA_HEMATOLOGIA,
    ...LAB_DATA_QUIMICA,
    ...LAB_DATA_IONES_GASES,
    ...LAB_DATA_HORMONAS,
    ...LAB_DATA_INMUNOLOGIA,
    ...LAB_DATA_NEFRO
];

const LAB_CATEGORIES = [
    { id: 'hematologia', label: 'Hematología y Hemostasia', icon: '🩸' },
    { id: 'quimica', label: 'Química Sanguínea', icon: '⚗️' },
    { id: 'iones-gases', label: 'Iones y Gases', icon: '🧪' },
    { id: 'hormonas', label: 'Hormonas y Marcadores', icon: '🧬' },
    { id: 'inmunologia', label: 'Inmunología', icon: '🛡️' },
    { id: 'nefro-orina', label: 'Nefrología y Orina', icon: '💧' }
];
