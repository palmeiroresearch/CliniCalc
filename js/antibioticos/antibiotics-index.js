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

    // --- Lote 2 (2026-09-12) ---
    ...ANTIBIOTIC_DATA_BATCH2_ABDOMINAL, // 6 abdominal/obstétrico (antibiotics-data-batch2-abdominal.js)
    ...ANTIBIOTIC_DATA_BATCH2_NEURO,     // 5 neuro/oftalmológico (antibiotics-data-batch2-neuro-ocular.js)
    ...ANTIBIOTIC_DATA_BATCH2_MISC,      // 6 respiratorio/piel/urológico/cardiovascular (antibiotics-data-batch2-resp-piel-uro.js)
    ...ANTIBIOTIC_DATA_TROPICAL2,        // 5 tropicales/bioterrorismo (antibiotics-data-tropical2.js)
];
