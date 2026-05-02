// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// Índice combinador — ensambla ANTIBIOTIC_DB
// Añadir nuevos arrays aquí al crear lotes futuros
// ============================================

const ANTIBIOTIC_DB = [
    ...ANTIBIOTIC_DATA_CORE,   // 29 enfermedades base (antibiotics-data.js)
    ...ANTIBIOTIC_DATA_ORL,    // 9 enfermedades ORL (antibiotics-data-orl.js)
    ...ANTIBIOTIC_DATA_ITS2,   // 4 entradas ITS adicionales + VIH oportunistas (antibiotics-data-its2.js)
    ...ANTIBIOTIC_DATA_FUNGAL,   // 5 fúngicas (antibiotics-data-fungal.js)
    ...ANTIBIOTIC_DATA_TROPICAL, // 11 tropicales/zoonosis (antibiotics-data-tropical.js)
    ...ANTIBIOTIC_DATA_MISC,     // 9 misceláneos (antibiotics-data-misc.js)
];
