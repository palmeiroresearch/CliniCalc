// ============================================
// CLINICALC - FÓRMULAS DE CALCULADORAS
// Implementación matemática de las 15 calculadoras
// ============================================

const Calculators = {
    
    // === CONVERSIÓN DE UNIDADES === //
    convertUnit(value, fromUnit, toUnit, type) {
        if (fromUnit === toUnit) return value;
        
        const conversions = UNIT_CONVERSIONS[type];
        if (!conversions || !conversions[fromUnit] || !conversions[toUnit]) {
            return value;
        }
        
        // Convertir a unidad base, luego a unidad destino
        const toBase = value / conversions[fromUnit].factor;
        const toTarget = toBase * conversions[toUnit].factor;
        
        return toTarget;
    },

    // === 1. GFR - FILTRADO GLOMERULAR === //
    calculateGFR(inputs, formula = 'CKD-EPI 2021') {
        let { age, sex, creatinine, race, weight, height } = inputs;
        const currentUnit = Storage.getSetting('units.creatinine');
        
        // Convertir creatinina a mg/dL si está en µmol/L
        if (currentUnit === 'µmol/L') {
            creatinine = creatinine / 88.42;
        }
        
        let gfr = 0;
        
        switch(formula) {
            case 'CKD-EPI 2021':
                // Nueva fórmula sin raza (KDIGO 2024)
                const kappa = sex === 'F' ? 0.7 : 0.9;
                const alpha = sex === 'F' ? -0.241 : -0.302;
                const minRatio = Math.min(creatinine / kappa, 1);
                const maxRatio = Math.max(creatinine / kappa, 1);
                const sexFactor = sex === 'F' ? 1.012 : 1;
                
                gfr = 142 * Math.pow(minRatio, alpha) * Math.pow(maxRatio, -1.200) * 
                      Math.pow(0.9938, age) * sexFactor;
                break;
                
            case 'CKD-EPI 2009':
                // Fórmula antigua con raza
                const kappa09 = sex === 'F' ? 0.7 : 0.9;
                const alpha09 = sex === 'F' ? -0.329 : -0.411;
                const minRatio09 = Math.min(creatinine / kappa09, 1);
                const maxRatio09 = Math.max(creatinine / kappa09, 1);
                const sexFactor09 = sex === 'F' ? 1.018 : 1;
                const raceFactor = race === 'black' ? 1.159 : 1;
                
                gfr = 141 * Math.pow(minRatio09, alpha09) * Math.pow(maxRatio09, -1.209) * 
                      Math.pow(0.993, age) * sexFactor09 * raceFactor;
                break;
                
            case 'Cockroft-Gault':
                // Requiere peso
                const sexMultiplier = sex === 'F' ? 0.85 : 1;
                gfr = ((140 - age) * weight * sexMultiplier) / (72 * creatinine);
                break;
                
            case 'MDRD':
                // MDRD simplificada
                const sexFactorMDRD = sex === 'F' ? 0.742 : 1;
                const raceFactorMDRD = race === 'black' ? 1.212 : 1;
                gfr = 175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203) * 
                      sexFactorMDRD * raceFactorMDRD;
                break;
        }
        
        return {
            value: Math.round(gfr * 10) / 10,
            unit: formula === 'Cockroft-Gault' ? 'mL/min' : 'mL/min/1.73m²',
            interpretation: this.interpretGFR(gfr)
        };
    },

    interpretGFR(gfr) {
        const range = INTERPRETATIONS.gfr.find(r => gfr >= r.min && gfr <= r.max);
        return range || INTERPRETATIONS.gfr[INTERPRETATIONS.gfr.length - 1];
    },

    // === 2. CLEARANCE CREATININA 24H === //
    calculateClearance24h(inputs) {
        const { creatinineUrine, creatinineSerum, urineVolume } = inputs;
        const currentUnit = Storage.getSetting('units.creatinine');
        
        // Convertir a mg/dL si es necesario
        let crUrine = creatinineUrine;
        let crSerum = creatinineSerum;
        
        if (currentUnit === 'µmol/L') {
            crUrine = crUrine / 88.42;
            crSerum = crSerum / 88.42;
        }
        
        // Fórmula: (Cr orina × Vol orina) / (Cr plasma × 1440)
        const clearance = (crUrine * urineVolume) / (crSerum * 1440);
        
        return {
            value: Math.round(clearance * 10) / 10,
            unit: 'mL/min',
            interpretation: clearance >= 80 ? 
                { label: 'Normal', color: 'success', description: 'Función renal normal' } :
                { label: 'Disminuido', color: 'warning', description: 'Función renal disminuida' }
        };
    },

    // === 3. ANION GAP === //
    calculateAnionGap(inputs) {
        const { sodium, chloride, bicarbonate, albumin } = inputs;
        
        // AG = Na - (Cl + HCO3)
        const ag = sodium - (chloride + bicarbonate);
        
        // AG corregido por albúmina (normal = 4 g/dL)
        const albuminCorrection = 2.5 * (4 - albumin);
        const agCorrected = ag + albuminCorrection;
        
        return {
            value: Math.round(ag * 10) / 10,
            correctedValue: Math.round(agCorrected * 10) / 10,
            unit: 'mEq/L',
            interpretation: this.interpretAnionGap(agCorrected)
        };
    },

    interpretAnionGap(ag) {
        const range = INTERPRETATIONS.anionGap.find(r => ag >= r.min && ag <= r.max);
        return range || INTERPRETATIONS.anionGap[1];
    },

    // === 4. CALCIO CORREGIDO === //
    calculateCorrectedCalcium(inputs) {
        const { calcium, albumin } = inputs;
        
        // Fórmula de Payne: Ca corregido = Ca medido + 0.8 × (4 - albúmina)
        const correctedCa = calcium + 0.8 * (4 - albumin);
        
        let interpretation;
        if (correctedCa < 8.5) {
            interpretation = { label: 'Hipocalcemia', color: 'danger', description: 'Calcio bajo' };
        } else if (correctedCa > 10.5) {
            interpretation = { label: 'Hipercalcemia', color: 'danger', description: 'Calcio elevado' };
        } else {
            interpretation = { label: 'Normal', color: 'success', description: '8.5-10.5 mg/dL' };
        }
        
        return {
            value: Math.round(correctedCa * 100) / 100,
            unit: 'mg/dL',
            interpretation
        };
    },

    // === 5. SODIO CORREGIDO === //
    calculateCorrectedSodium(inputs) {
        const { sodium, glucose } = inputs;
        const currentUnit = Storage.getSetting('units.glucose');
        
        // Convertir glucosa a mg/dL si está en mmol/L
        let glucoseMgDl = glucose;
        if (currentUnit === 'mmol/L') {
            glucoseMgDl = glucose / 0.0555;
        }
        
        // Fórmula de Katz (1973): Na corregido = Na medido + 0.016 × (Glucosa - 100)
        // Fórmula de Hillier (1999): Na corregido = Na medido + 0.024 × (Glucosa - 100)
        
        const correctedNaKatz = sodium + 0.016 * (glucoseMgDl - 100);
        const correctedNaHillier = sodium + 0.024 * (glucoseMgDl - 100);
        
        return {
            value: Math.round(correctedNaKatz * 10) / 10,
            hillier: Math.round(correctedNaHillier * 10) / 10,
            unit: 'mEq/L',
            interpretation: correctedNaKatz < 135 ? 
                { label: 'Hiponatremia verdadera', color: 'danger', description: 'Sodio bajo' } :
                { label: 'Normal', color: 'success', description: '135-145 mEq/L' }
        };
    },

    // === 6. IMC === //
    calculateBMI(inputs) {
        let { weight, height } = inputs;
        const weightUnit = Storage.getSetting('units.weight');
        const heightUnit = Storage.getSetting('units.height');
        
        // Convertir peso a kg
        if (weightUnit === 'lb') {
            weight = weight / 2.20462;
        }
        
        // Convertir altura a metros
        if (heightUnit === 'cm') {
            height = height / 100;
        } else if (heightUnit === 'in') {
            height = height * 0.0254;
        } else if (heightUnit === 'ft') {
            height = height * 0.3048;
        }
        
        const bmi = weight / (height * height);
        
        return {
            value: Math.round(bmi * 10) / 10,
            unit: 'kg/m²',
            interpretation: this.interpretBMI(bmi)
        };
    },

    interpretBMI(bmi) {
        const range = INTERPRETATIONS.imc.find(r => bmi >= r.min && bmi < r.max);
        return range || INTERPRETATIONS.imc[INTERPRETATIONS.imc.length - 1];
    },

    // === 7. BSA (SUPERFICIE CORPORAL) === //
    calculateBSA(inputs, formula = 'Mosteller') {
        let { weight, height } = inputs;
        const weightUnit = Storage.getSetting('units.weight');
        const heightUnit = Storage.getSetting('units.height');
        
        // Convertir a unidades base
        if (weightUnit === 'lb') weight = weight / 2.20462;
        if (heightUnit === 'm') height = height * 100;
        if (heightUnit === 'in') height = height * 2.54;
        if (heightUnit === 'ft') height = height * 30.48;
        
        let bsa = 0;
        
        if (formula === 'Mosteller') {
            // Más simple y común
            bsa = Math.sqrt((height * weight) / 3600);
        } else if (formula === 'DuBois') {
            // Fórmula clásica
            bsa = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);
        }
        
        return {
            value: Math.round(bsa * 100) / 100,
            unit: 'm²',
            interpretation: { 
                label: 'Calculado', 
                color: 'success', 
                description: 'Superficie corporal para ajuste de dosis' 
            }
        };
    },

    // === 8. OSMOLARIDAD SÉRICA === //
    calculateOsmolarity(inputs) {
        let { sodium, glucose, bun, measuredOsm } = inputs;
        const glucoseUnit = Storage.getSetting('units.glucose');
        const bunUnit = Storage.getSetting('units.bun');
        
        // Convertir glucosa a mg/dL
        if (glucoseUnit === 'mmol/L') {
            glucose = glucose / 0.0555;
        }
        
        // Convertir BUN a mg/dL
        if (bunUnit === 'mmol/L') {
            bun = bun / 0.357;
        }
        
        // Fórmula: 2 × Na + Glucosa/18 + BUN/2.8
        const calculatedOsm = 2 * sodium + glucose / 18 + bun / 2.8;
        
        // Gap osmolar (si hay medida)
        const osmGap = measuredOsm ? measuredOsm - calculatedOsm : null;
        
        return {
            value: Math.round(calculatedOsm * 10) / 10,
            unit: 'mOsm/kg',
            osmGap: osmGap ? Math.round(osmGap * 10) / 10 : null,
            interpretation: calculatedOsm >= 280 && calculatedOsm <= 295 ?
                { label: 'Normal', color: 'success', description: '280-295 mOsm/kg' } :
                { label: 'Anormal', color: 'warning', description: 'Fuera del rango normal' }
        };
    },

    // === 9. CHADS₂-VASc === //
    calculateCHADSVASc(inputs) {
        let score = 0;
        
        // CHF (1 punto)
        if (inputs.chf) score += 1;
        
        // Hypertension (1 punto)
        if (inputs.hypertension) score += 1;
        
        // Age ≥75 (2 puntos)
        if (inputs.age >= 75) {
            score += 2;
        } else if (inputs.age >= 65) {
            // Age 65-74 (1 punto)
            score += 1;
        }
        
        // Diabetes (1 punto)
        if (inputs.diabetes) score += 1;
        
        // Stroke/TIA/TE (2 puntos)
        if (inputs.stroke) score += 2;
        
        // Vascular disease (1 punto)
        if (inputs.vascularDisease) score += 1;
        
        // Sex category (Female = 1 punto)
        if (inputs.sex === 'F') score += 1;
        
        return {
            value: score,
            unit: 'puntos',
            interpretation: this.interpretCHADSVASc(score)
        };
    },

    interpretCHADSVASc(score) {
        const range = INTERPRETATIONS.chadsvasc.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.chadsvasc[INTERPRETATIONS.chadsvasc.length - 1];
    },

    // === 10. HAS-BLED === //
    calculateHASBLED(inputs) {
        let score = 0;
        
        // Hypertension (1 punto)
        if (inputs.hypertension) score += 1;
        
        // Abnormal renal/liver (1 punto cada uno, máximo 2)
        if (inputs.abnormalRenal) score += 1;
        if (inputs.abnormalLiver) score += 1;
        
        // Stroke (1 punto)
        if (inputs.stroke) score += 1;
        
        // Bleeding (1 punto)
        if (inputs.bleeding) score += 1;
        
        // Labile INR (1 punto)
        if (inputs.labileINR) score += 1;
        
        // Elderly (>65 años) (1 punto)
        if (inputs.age > 65) score += 1;
        
        // Drugs/Alcohol (1 punto cada uno, máximo 2)
        if (inputs.drugs) score += 1;
        if (inputs.alcohol) score += 1;
        
        return {
            value: score,
            unit: 'puntos',
            interpretation: this.interpretHASBLED(score)
        };
    },

    interpretHASBLED(score) {
        const range = INTERPRETATIONS.hasbled.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.hasbled[INTERPRETATIONS.hasbled.length - 1];
    },

    // === 11. CHILD-PUGH === //
    calculateChildPugh(inputs) {
        let score = 0;
        
        // Bilirrubina
        if (inputs.bilirubin < 2) score += 1;
        else if (inputs.bilirubin <= 3) score += 2;
        else score += 3;
        
        // Albúmina
        if (inputs.albumin > 3.5) score += 1;
        else if (inputs.albumin >= 2.8) score += 2;
        else score += 3;
        
        // INR
        if (inputs.inr < 1.7) score += 1;
        else if (inputs.inr <= 2.3) score += 2;
        else score += 3;
        
        // Ascitis
        score += parseInt(inputs.ascites);
        
        // Encefalopatía
        score += parseInt(inputs.encephalopathy);
        
        return {
            value: score,
            unit: 'puntos',
            interpretation: this.interpretChildPugh(score)
        };
    },

    interpretChildPugh(score) {
        const range = INTERPRETATIONS.childPugh.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.childPugh[INTERPRETATIONS.childPugh.length - 1];
    },

    // === 12. CURB-65 === //
    calculateCURB65(inputs) {
        let score = 0;
        
        // Confusion (1 punto)
        if (inputs.confusion) score += 1;
        
        // Urea >7 mmol/L o BUN >19 mg/dL (1 punto)
        if (inputs.bun > 19) score += 1;
        
        // Respiratory rate ≥30 (1 punto)
        if (inputs.respiratoryRate >= 30) score += 1;
        
        // Blood pressure (SBP <90 o DBP ≤60) (1 punto)
        if (inputs.systolicBP < 90 || inputs.diastolicBP <= 60) score += 1;
        
        // Age ≥65 (1 punto)
        if (inputs.age >= 65) score += 1;
        
        return {
            value: score,
            unit: 'puntos',
            interpretation: this.interpretCURB65(score)
        };
    },

    interpretCURB65(score) {
        const range = INTERPRETATIONS.curb65.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.curb65[INTERPRETATIONS.curb65.length - 1];
    },

    // === 13. qSOFA === //
    calculateQSOFA(inputs) {
        let score = 0;
        
        // Respiratory rate ≥22 (1 punto)
        if (inputs.respiratoryRate >= 22) score += 1;
        
        // Altered mentation (1 punto)
        if (inputs.alteredMentation) score += 1;
        
        // Systolic BP ≤100 (1 punto)
        if (inputs.systolicBP <= 100) score += 1;
        
        return {
            value: score,
            unit: 'puntos',
            interpretation: this.interpretQSOFA(score)
        };
    },

    interpretQSOFA(score) {
        const range = INTERPRETATIONS.qsofa.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.qsofa[INTERPRETATIONS.qsofa.length - 1];
    },

    // === 14. WELLS SCORE (TEP) === //
    calculateWellsTEP(inputs) {
        let score = 0;
        
        // Síntomas clínicos de TVP (3 puntos)
        if (inputs.dvpSymptoms) score += 3;
        
        // TEP más probable que otro diagnóstico (3 puntos)
        if (inputs.tepMostLikely) score += 3;
        
        // FC >100 (1.5 puntos)
        if (inputs.heartRate > 100) score += 1.5;
        
        // Inmovilización o cirugía en 4 semanas (1.5 puntos)
        if (inputs.immobilization) score += 1.5;
        
        // TEP o TVP previa (1.5 puntos)
        if (inputs.previousTEP) score += 1.5;
        
        // Hemoptisis (1 punto)
        if (inputs.hemoptysis) score += 1;
        
        // Cáncer activo (1 punto)
        if (inputs.cancer) score += 1;
        
        return {
            value: Math.round(score * 10) / 10,
            unit: 'puntos',
            interpretation: this.interpretWellsTEP(score)
        };
    },

    interpretWellsTEP(score) {
        const range = INTERPRETATIONS.wellsTEP.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.wellsTEP[INTERPRETATIONS.wellsTEP.length - 1];
    },

    // === 15. MELD SCORE === //
    calculateMELD(inputs) {
        const { bilirubin, inr, creatinine, dialysis, sodium } = inputs;
        
        // MELD original
        const meld = 9.57 * Math.log(Math.max(creatinine, 1)) + 
                     3.78 * Math.log(Math.max(bilirubin, 1)) + 
                     11.2 * Math.log(Math.max(inr, 1)) + 
                     6.43;
        
        // Ajustar si está en diálisis (creatinine = 4)
        let finalMeld = dialysis ? 
            9.57 * Math.log(4) + 3.78 * Math.log(Math.max(bilirubin, 1)) + 11.2 * Math.log(Math.max(inr, 1)) + 6.43 :
            meld;
        
        // Límites
        finalMeld = Math.max(6, Math.min(40, Math.round(finalMeld * 10) / 10));
        
        // MELD-Na (si se proporciona sodio)
        let meldNa = null;
        if (sodium) {
            const naAdjusted = Math.max(125, Math.min(137, sodium));
            meldNa = finalMeld + 1.32 * (137 - naAdjusted) - (0.033 * finalMeld * (137 - naAdjusted));
            meldNa = Math.max(6, Math.min(40, Math.round(meldNa * 10) / 10));
        }
        
        return {
            value: Math.round(finalMeld),
            meldNa: meldNa ? Math.round(meldNa) : null,
            unit: 'puntos',
            interpretation: this.interpretMELD(finalMeld)
        };
    },

    interpretMELD(score) {
        const range = INTERPRETATIONS.meld.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.meld[INTERPRETATIONS.meld.length - 1];
    }
};
