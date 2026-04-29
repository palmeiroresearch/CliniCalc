// ============================================
// CLINICALC — CALCULADORA VASOACTIVOS IV
// Índice de fármacos vasoactivos (12)
// ============================================

const ALL_IV_DRUGS = [
    ...DRUGS_VASOACTIVE,
];

const IV_DRUG_CATEGORIES = [
    { id: 'Vasopresores',    icon: '🩸', label: 'Vasopresores' },
    { id: 'Inotrópicos',     icon: '💪', label: 'Inotrópicos' },
    { id: 'Vasodilatadores', icon: '🩺', label: 'Vasodilatadores' },
    { id: 'Mixtos',          icon: '⚡', label: 'Mixtos (Adrenérgicos)' },
];

function getDrugById(id) {
    return ALL_IV_DRUGS.find(d => d.id === id) || null;
}

function getDrugsByCategory(category) {
    return ALL_IV_DRUGS.filter(d => d.category === category);
}
