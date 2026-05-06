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

        const ag = sodium - (chloride + bicarbonate);
        const hasAlbumin = albumin !== null && !isNaN(albumin);
        const agCorrected = hasAlbumin ? ag + 2.5 * (4 - albumin) : null;

        return {
            value:          Math.round(ag * 10) / 10,
            correctedValue: hasAlbumin ? Math.round(agCorrected * 10) / 10 : null,
            unit: 'mEq/L',
            interpretation: this.interpretAnionGap(hasAlbumin ? agCorrected : ag)
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
        
        // Elderly (≥65 años) (1 punto)
        if (inputs.age >= 65) score += 1;
        
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

    // === 12. CURB-65 / CRB-65 === //
    calculateCURB65(inputs) {
        const hasBUN = inputs.bun !== null && !isNaN(inputs.bun);
        let score = 0;

        if (inputs.confusion)                                     score += 1;
        if (hasBUN && inputs.bun > 19)                           score += 1;
        if (inputs.respiratoryRate >= 30)                        score += 1;
        if (inputs.systolicBP < 90 || inputs.diastolicBP <= 60) score += 1;
        if (inputs.age >= 65)                                    score += 1;

        return {
            value: score,
            maxScore: hasBUN ? 5 : 4,
            mode: hasBUN ? 'CURB-65' : 'CRB-65',
            unit: 'puntos',
            interpretation: hasBUN ? this.interpretCURB65(score) : this.interpretCRB65(score)
        };
    },

    interpretCURB65(score) {
        const range = INTERPRETATIONS.curb65.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.curb65[INTERPRETATIONS.curb65.length - 1];
    },

    interpretCRB65(score) {
        const range = INTERPRETATIONS.crb65.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.crb65[INTERPRETATIONS.crb65.length - 1];
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
        let { bilirubin, inr, creatinine, dialysis, sodium } = inputs;

        // Convertir creatinina a mg/dL si está en µmol/L
        const currentUnit = Storage.getSetting('units.creatinine');
        if (currentUnit === 'µmol/L') {
            creatinine = creatinine / 88.42;
        }

        // Si está en diálisis, creatinina = 4 (antes de cualquier cálculo)
        if (dialysis) creatinine = 4;

        // MELD original
        const meld = 9.57 * Math.log(Math.max(creatinine, 1)) +
                     3.78 * Math.log(Math.max(bilirubin, 1)) +
                     11.2 * Math.log(Math.max(inr, 1)) +
                     6.43;

        let finalMeld = meld;
        
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
    },

    // === 16. SOFA SCORE === //
    calculateSOFA(inputs) {
        let { pao2fio2, ventilation, platelets, bilirubin, cardiovascular, gcs, creatinine, urineOutput } = inputs;

        // Convertir creatinina a mg/dL si está en µmol/L
        const currentUnit = Storage.getSetting('units.creatinine');
        if (currentUnit === 'µmol/L') {
            creatinine = creatinine / 88.42;
        }

        // 1. Respiración (PaO2/FiO2)
        let resp = 0;
        if (pao2fio2 >= 400) resp = 0;
        else if (pao2fio2 >= 300) resp = 1;
        else if (pao2fio2 >= 200) resp = 2;
        else if (pao2fio2 >= 100 && ventilation) resp = 3;
        else if (pao2fio2 < 100 && ventilation) resp = 4;
        else resp = 2; // Sin ventilación con PaO2/FiO2 <200 → máx score posible = 2

        // 2. Coagulación (Plaquetas ×10³/µL)
        let coag = 0;
        if (platelets >= 150) coag = 0;
        else if (platelets >= 100) coag = 1;
        else if (platelets >= 50) coag = 2;
        else if (platelets >= 20) coag = 3;
        else coag = 4;

        // 3. Hepático (Bilirrubina mg/dL)
        let liver = 0;
        if (bilirubin < 1.2) liver = 0;
        else if (bilirubin < 2.0) liver = 1;
        else if (bilirubin < 6.0) liver = 2;
        else if (bilirubin < 12.0) liver = 3;
        else liver = 4;

        // 4. Cardiovascular (0-4 seleccionado directamente)
        const cardio = parseInt(cardiovascular);

        // 5. Neurológico (GCS)
        let neuro = 0;
        if (gcs === 15) neuro = 0;
        else if (gcs >= 13) neuro = 1;
        else if (gcs >= 10) neuro = 2;
        else if (gcs >= 6) neuro = 3;
        else neuro = 4;

        // 6. Renal (Creatinina mg/dL + diuresis opcional)
        let renal = 0;
        if (creatinine < 1.2) renal = 0;
        else if (creatinine < 2.0) renal = 1;
        else if (creatinine < 3.5) renal = 2;
        else if (creatinine < 5.0) renal = 3;
        else renal = 4;

        // Ajustar renal por diuresis si es peor
        if (urineOutput !== null && urineOutput !== undefined) {
            let renalByUrine = 0;
            if (urineOutput < 200) renalByUrine = 4;
            else if (urineOutput < 500) renalByUrine = 3;
            renal = Math.max(renal, renalByUrine);
        }

        const total = resp + coag + liver + cardio + neuro + renal;

        return {
            value: total,
            unit: 'puntos',
            components: { resp, coag, liver, cardio, neuro, renal },
            interpretation: this.interpretSOFA(total)
        };
    },

    interpretSOFA(score) {
        const range = INTERPRETATIONS.sofa.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.sofa[INTERPRETATIONS.sofa.length - 1];
    },

    // === 17. NIHSS SCORE === //
    calculateNIHSS(inputs) {
        const {
            loc, locQuestions, locCommands,
            gaze, visual, facial,
            motorArmL, motorArmR, motorLegL, motorLegR,
            ataxia, sensory, language, dysarthria, extinction
        } = inputs;

        const total = loc + locQuestions + locCommands +
                      gaze + visual + facial +
                      motorArmL + motorArmR + motorLegL + motorLegR +
                      ataxia + sensory + language + dysarthria + extinction;

        return {
            value: total,
            unit: 'puntos',
            interpretation: this.interpretNIHSS(total)
        };
    },

    interpretNIHSS(score) {
        const range = INTERPRETATIONS.nihss.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.nihss[INTERPRETATIONS.nihss.length - 1];
    },

    // === 18. GLASGOW COMA SCALE === //
    calculateGlasgow(inputs) {
        const { eyes, verbal, motor } = inputs;
        const total = eyes + verbal + motor;

        return {
            value: total,
            unit: 'puntos',
            components: { eyes, verbal, motor },
            interpretation: this.interpretGlasgow(total)
        };
    },

    interpretGlasgow(score) {
        const range = INTERPRETATIONS.glasgow.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.glasgow[INTERPRETATIONS.glasgow.length - 1];
    },

    // === 19. TIMI RISK SCORE — UA/NSTEMI === //
    calculateTIMI_NSTEMI(inputs) {
        let score = 0;
        if (inputs.age65)        score += 1;
        if (inputs.riskFactors)  score += 1;
        if (inputs.knownCAD)     score += 1;
        if (inputs.aspirin)      score += 1;
        if (inputs.severeAngina) score += 1;
        if (inputs.elevMarkers)  score += 1;
        if (inputs.stDeviation)  score += 1;

        return {
            value: score,
            unit: 'puntos',
            interpretation: this.interpretTIMI_NSTEMI(score)
        };
    },

    interpretTIMI_NSTEMI(score) {
        const range = INTERPRETATIONS.timiNSTEMI.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.timiNSTEMI[INTERPRETATIONS.timiNSTEMI.length - 1];
    },

    // === 20. TIMI RISK SCORE — STEMI === //
    calculateTIMI_STEMI(inputs) {
        let { age, sbp, hr, weight } = inputs;
        let score = 0;

        // Edad (rangos de puntos)
        if (age >= 75)      score += 3;
        else if (age >= 65) score += 2;

        // Checkboxes clínicos
        if (inputs.riskHistory) score += 1; // DM / HTA / angina previa
        if (sbp < 100)          score += 3;
        if (hr > 100)           score += 2;
        if (inputs.killip2plus)  score += 2; // Killip ≥ II

        // Peso: convertir a kg si está en lb
        const weightUnit = Storage.getSetting('units.weight');
        if (weightUnit === 'lb') weight = weight / 2.20462;
        if (weight < 67) score += 1;

        if (inputs.anteriorST)  score += 1; // Elevación ST anterior o BCRI
        if (inputs.timeLate)    score += 1; // Tiempo a tratamiento >4h

        return {
            value: score,
            unit: 'puntos',
            interpretation: this.interpretTIMI_STEMI(score)
        };
    },

    interpretTIMI_STEMI(score) {
        const range = INTERPRETATIONS.timiSTEMI.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.timiSTEMI[INTERPRETATIONS.timiSTEMI.length - 1];
    },

    // === 21. GRACE SCORE === //
    calculateGRACE(inputs) {
        let { age, hr, sbp, creatinine, killip, cardiacArrest, stDeviation, elevMarkers } = inputs;

        // Convertir creatinina a mg/dL si está en µmol/L
        const crUnit = Storage.getSetting('units.creatinine');
        if (crUnit === 'µmol/L') creatinine = creatinine / 88.42;

        // Puntos por edad
        let agePoints = 0;
        if      (age < 40)  agePoints = 0;
        else if (age < 50)  agePoints = 18;
        else if (age < 60)  agePoints = 36;
        else if (age < 70)  agePoints = 55;
        else if (age < 80)  agePoints = 73;
        else                agePoints = 91;

        // Puntos por FC
        let hrPoints = 0;
        if      (hr < 70)   hrPoints = 0;
        else if (hr < 90)   hrPoints = 7;
        else if (hr < 110)  hrPoints = 13;
        else if (hr < 150)  hrPoints = 23;
        else if (hr < 200)  hrPoints = 36;
        else                hrPoints = 46;

        // Puntos por PAS
        let sbpPoints = 0;
        if      (sbp < 80)   sbpPoints = 63;
        else if (sbp < 100)  sbpPoints = 58;
        else if (sbp < 120)  sbpPoints = 47;
        else if (sbp < 140)  sbpPoints = 37;
        else if (sbp < 160)  sbpPoints = 26;
        else if (sbp < 200)  sbpPoints = 11;
        else                 sbpPoints = 0;

        // Puntos por creatinina (mg/dL)
        let crPoints = 0;
        if      (creatinine < 0.4)  crPoints = 2;
        else if (creatinine < 0.8)  crPoints = 5;
        else if (creatinine < 1.2)  crPoints = 8;
        else if (creatinine < 1.6)  crPoints = 11;
        else if (creatinine < 2.0)  crPoints = 14;
        else if (creatinine < 4.0)  crPoints = 23;
        else                        crPoints = 31;

        // Killip class
        const killipMap = { '1': 0, '2': 21, '3': 43, '4': 64 };
        const killipPoints = killipMap[String(killip)] || 0;

        // Binarios
        const arrestPoints  = cardiacArrest ? 43 : 0;
        const stPoints      = stDeviation   ? 30 : 0;
        const markerPoints  = elevMarkers   ? 15 : 0;

        const total = agePoints + hrPoints + sbpPoints + crPoints + killipPoints + arrestPoints + stPoints + markerPoints;

        return {
            value: total,
            unit: 'puntos',
            components: { agePoints, hrPoints, sbpPoints, crPoints, killipPoints, arrestPoints, stPoints, markerPoints },
            interpretation: this.interpretGRACE(total)
        };
    },

    interpretGRACE(score) {
        const range = INTERPRETATIONS.grace.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.grace[INTERPRETATIONS.grace.length - 1];
    },

    // === 22. ESCALA DE BRADEN === //
    calculateBraden(inputs) {
        const { sensory, moisture, activity, mobility, nutrition, friction } = inputs;
        const total = sensory + moisture + activity + mobility + nutrition + friction;

        return {
            value: total,
            unit: 'puntos',
            components: { sensory, moisture, activity, mobility, nutrition, friction },
            interpretation: this.interpretBraden(total)
        };
    },

    interpretBraden(score) {
        const range = INTERPRETATIONS.braden.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.braden[INTERPRETATIONS.braden.length - 1];
    },

    // === 23. MACOCHA SCORE === //
    calculateMAOCHA(inputs) {
        let score = 0;
        if (inputs.mallampati) score += 5;
        if (inputs.osa)        score += 2;
        if (inputs.cervical)   score += 1;
        if (inputs.opening)    score += 1;
        if (inputs.coma)       score += 1;
        if (inputs.hypoxemia)  score += 1;
        if (inputs.nonAnest)   score += 1;
        return { value: score, unit: 'puntos', interpretation: this.interpretMAOCHA(score) };
    },

    interpretMAOCHA(score) {
        const range = INTERPRETATIONS.macocha.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.macocha[INTERPRETATIONS.macocha.length - 1];
    },

    // === 24. PBW + VOLUMEN TIDAL (ARDSNet) === //
    calculatePBW(inputs) {
        let { sex, height } = inputs;
        const heightUnit = Storage.getSetting('units.height');
        if (heightUnit === 'm')  height = height * 100;
        if (heightUnit === 'in') height = height * 2.54;
        if (heightUnit === 'ft') height = height * 30.48;

        const pbw = sex === 'male'
            ? 50 + 0.91 * (height - 152.4)
            : 45.5 + 0.91 * (height - 152.4);
        const p = Math.round(pbw * 10) / 10;

        return {
            value: p,
            unit: 'kg',
            tv4: Math.round(p * 4),
            tv6: Math.round(p * 6),
            tv8: Math.round(p * 8),
            interpretation: INTERPRETATIONS.pbw[0]
        };
    },

    // === 25. FOUR SCORE === //
    calculateFOURScore(inputs) {
        const { eyes, motor, brainstem, respiration } = inputs;
        const total = eyes + motor + brainstem + respiration;
        return {
            value: total,
            unit: 'puntos',
            components: { eyes, motor, brainstem, respiration },
            interpretation: this.interpretFOURScore(total)
        };
    },

    interpretFOURScore(score) {
        const range = INTERPRETATIONS.fourScore.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.fourScore[INTERPRETATIONS.fourScore.length - 1];
    },

    // === 26. HEART SCORE === //
    calculateHEART(inputs) {
        const { history, ecg, age, riskFactors, troponin } = inputs;
        const score = history + ecg + age + riskFactors + troponin;
        return {
            value: score,
            unit: 'puntos',
            components: { history, ecg, age, riskFactors, troponin },
            interpretation: this.interpretHEART(score)
        };
    },

    interpretHEART(score) {
        const range = INTERPRETATIONS.heart.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.heart[INTERPRETATIONS.heart.length - 1];
    },

    // === 27. REGLA PERC === //
    calculatePERC(inputs) {
        let score = 0;
        if (inputs.age50)       score++;
        if (inputs.hr100)       score++;
        if (inputs.spo294)      score++;
        if (inputs.legSwelling) score++;
        if (inputs.hemoptysis)  score++;
        if (inputs.surgery)     score++;
        if (inputs.priorVTE)    score++;
        if (inputs.estrogen)    score++;
        return {
            value: score,
            unit: 'criterios positivos',
            interpretation: this.interpretPERC(score)
        };
    },

    interpretPERC(score) {
        const range = INTERPRETATIONS.perc.find(r => score >= r.min && score <= r.max);
        return range || INTERPRETATIONS.perc[INTERPRETATIONS.perc.length - 1];
    },

    // === 28. CAD / CADE — PROTOCOLO INTEGRAL === //
    calculateDKA(inputs) {
        let { weight, type, hemodynamic, glucose, glucoseUnit, ph, hco3, sodium, potassium, chloride } = inputs;

        // Convertir unidades
        const weightUnit = Storage.getSetting('units.weight');
        if (weightUnit === 'lb') weight = weight / 2.20462;
        if (glucoseUnit === 'mmol/L') glucose = glucose / 0.0555;

        const isCADE = type === 'cade';

        // Na corregido (ADA 2024: factor 2.4 uniforme)
        const naCorregido = Math.round((sodium + 2.4 * (glucose - 100) / 100) * 10) / 10;

        // Anión Gap (solo si Cl disponible)
        const agCalc = (chloride !== null && !isNaN(chloride))
            ? Math.round((sodium - (chloride + hco3)) * 10) / 10
            : null;

        // Osmolaridad sérica efectiva
        const osmEffective = Math.round((2 * sodium + glucose / 18) * 10) / 10;

        // Clasificación de severidad (pH tiene prioridad clínica)
        let severity;
        if (isCADE) {
            severity = { label: 'CAD Euglucémica (CADE)', colorHex: '#7c3aed', badge: '🟣' };
        } else if (ph < 7.00 || hco3 < 10) {
            severity = { label: 'CAD Severa', colorHex: '#dc2626', badge: '🔴' };
        } else if (ph < 7.25 || hco3 < 15) {
            severity = { label: 'CAD Moderada', colorHex: '#f59e0b', badge: '🟠' };
        } else {
            severity = { label: 'CAD Leve', colorHex: '#16a34a', badge: '🟡' };
        }

        // Alerta crítica K+
        const criticalAlert = potassium < 3.3
            ? { hasAlert: true, message: `K⁺ ${potassium} mEq/L — RETENER INSULINA. Reponer potasio primero. Riesgo de arritmia fatal.` }
            : { hasAlert: false };

        // Fluidos
        let bolusML, bolusTime;
        if (hemodynamic === 'severe') {
            bolusML = 1000; bolusTime = '30 min';
        } else if (hemodynamic === 'cardiogenic') {
            bolusML = 250; bolusTime = '30 min con monitoreo estrecho';
        } else if (hemodynamic === 'euvolemic') {
            bolusML = 300; bolusTime = '30 min';
        } else {
            bolusML = Math.round(weight * 17.5); bolusTime = '60 min';
        }

        const fluidType = naCorregido > 150 ? 'NaCl 0.45%' : 'Ringer Lactato o Plasmalyte';
        const naNote = naCorregido > 150
            ? `Na corregido ${naCorregido} mEq/L (elevado) → usar NaCl 0.45% para reponer agua libre`
            : `Na corregido ${naCorregido} mEq/L → cristaloide balanceado (RL/Plasmalyte)`;
        const dextroseStart = isCADE ? 'DESDE EL INICIO — Dextrosa 5-10% (CADE)' : 'Cuando Glucosa < 250 mg/dL — sistema de 2 bolsas';

        // Potasio
        let kAction, kRate, holdInsulin, kNote;
        if (potassium < 3.3) {
            kAction = 'RETENER INSULINA — Reponer K⁺ primero';
            kRate = '20-40 mEq/h IV'; holdInsulin = true;
            kNote = 'Monitoreo ECG continuo. Si velocidad > 10 mEq/h: línea central o 2 venas periféricas. Reiniciar insulina cuando K⁺ ≥ 3.3 mEq/L.';
        } else if (potassium <= 4.0) {
            kAction = 'Reponer + iniciar insulina'; kRate = '20 mEq/h IV'; holdInsulin = false;
            kNote = 'Monitoreo ECG continuo. Reponer Mg²⁺ si está bajo (favorece refractariedad al K⁺).';
        } else if (potassium <= 5.5) {
            kAction = 'Reponer (dosis reducida) + iniciar insulina'; kRate = '10 mEq/h IV'; holdInsulin = false;
            kNote = 'K⁺ descenderá con insulina. Anticipar hipokalemia a las 2-4 h de iniciada la infusión.';
        } else {
            kAction = 'No reponer — iniciar insulina'; kRate = '—'; holdInsulin = false;
            kNote = 'Hiperkalemia ficticia por redistribución en acidosis. Descenderá con insulina + corrección de pH.';
        }

        // Insulina (dosis concretas)
        const doseIV       = Math.round(weight * 0.1  * 10) / 10;
        const doseIVReduced= Math.round(weight * 0.05 * 10) / 10;
        const doseSCBolus  = Math.round(weight * 0.15 * 10) / 10;
        const isSevereOrShock = ph < 7.00 || hco3 < 10 || hemodynamic === 'cardiogenic' || hemodynamic === 'severe';
        const insulinRoute = isSevereOrShock ? 'IV' : 'IV o SC';

        // Bicarbonato
        const bicarboIndicated = ph < 6.9;

        // Estado vs criterios de resolución
        const agMet  = agCalc !== null ? agCalc <= 12 : null;
        const hco3Met = hco3 > 18;
        const phMet   = ph > 7.30;

        // Transición a SC
        const glarginMin = Math.round(weight * 0.5);
        const glarginMax = Math.round(weight * 0.8);

        return {
            severity, criticalAlert, isCADE,
            naCorregido, agCalc, osmEffective,
            fluids: { bolusML, bolusTime, fluidType, naNote, dextroseStart, hemodynamic },
            potassium: { kAction, kRate, holdInsulin, kNote, value: potassium },
            insulin: { doseIV, doseIVReduced, doseSCBolus, insulinRoute, holdInsulin, isSevereOrShock },
            bicarbonate: { indicated: bicarboIndicated, ph },
            resolution: { agCalc, hco3, ph, agMet, hco3Met, phMet },
            transition: { glarginMin, glarginMax },
            value: weight,
            unit: 'kg',
            interpretation: { label: severity.label, color: 'danger', description: 'Protocolo CAD/CADE generado.' }
        };
    },

    // === 31. ASMA AGUDA — CRISIS BRONQUIAL === //
    calculateAsma(inputs) {
        let { age, weight, spo2, hr, rr, speech, accessory, wheeze, consciousness, cyanosis, fem, paco2 } = inputs;

        const weightUnit = Storage.getSetting('units.weight');
        if (weightUnit === 'lb') weight = weight / 2.20462;
        weight = Math.round(weight * 10) / 10;

        // Criterios potencialmente fatal (GINA 2024 / BTS-SIGN 2023)
        const fatalCriteria = [];
        if (spo2 < 90)                              fatalCriteria.push('SpO₂ < 90%');
        if (fem !== null && fem < 33)               fatalCriteria.push('FEM < 33%');
        if (wheeze === 'silent')                    fatalCriteria.push('Silencio torácico');
        if (cyanosis === 'si')                      fatalCriteria.push('Cianosis');
        if (consciousness === 'confused')           fatalCriteria.push('Confusión / somnolencia');
        if (paco2 !== null && paco2 >= 45)          fatalCriteria.push(`PaCO₂ ${paco2} mmHg ≥ 45 (agotamiento ventilatorio)`);
        const isFatal = fatalCriteria.length > 0;

        // Criterios graves
        const severeCriteria = [];
        if (!isFatal) {
            if (spo2 >= 90 && spo2 <= 93)                       severeCriteria.push('SpO₂ 90-93%');
            if (fem !== null && fem >= 33 && fem <= 50)          severeCriteria.push('FEM 33-50%');
            if (speech === 'words' || speech === 'unable')       severeCriteria.push('Solo palabras / Incapaz de hablar');
            if (hr >= 120)                                       severeCriteria.push(`FC ${hr} lpm ≥ 120`);
            if (rr >= 25)                                        severeCriteria.push(`FR ${rr} rpm ≥ 25`);
            if (accessory === 'si')                              severeCriteria.push('Músculos accesorios activos');
        }
        const isSevere = severeCriteria.length > 0;

        // Criterios moderados
        const moderateCriteria = [];
        if (!isFatal && !isSevere) {
            if (spo2 >= 94 && spo2 <= 96)                        moderateCriteria.push('SpO₂ 94-96%');
            if (fem !== null && fem >= 51 && fem <= 75)          moderateCriteria.push('FEM 51-75%');
            if (speech === 'phrases')                             moderateCriteria.push('Solo frases cortas');
            if (hr >= 100 && hr < 120)                           moderateCriteria.push(`FC ${hr} lpm (100-119)`);
            if (rr >= 20 && rr < 25)                             moderateCriteria.push(`FR ${rr} rpm (20-24)`);
        }
        const isModerate = moderateCriteria.length > 0;
        const isMild = !isFatal && !isSevere && !isModerate;

        let severity;
        if (isFatal)         severity = { label: 'Potencialmente Fatal', colorHex: '#dc2626', badge: '🔴', level: 4 };
        else if (isSevere)   severity = { label: 'Crisis Grave',         colorHex: '#ea580c', badge: '🟠', level: 3 };
        else if (isModerate) severity = { label: 'Crisis Moderada',      colorHex: '#ca8a04', badge: '🟡', level: 2 };
        else                 severity = { label: 'Crisis Leve',          colorHex: '#16a34a', badge: '🟢', level: 1 };

        // Oxigenoterapia
        const o2 = {
            needed: spo2 < 94,
            target: '94-98%',
            device: (isFatal || isSevere)
                ? 'Mascarilla Venturi 35-40% o mascarilla con reservorio'
                : 'Gafas nasales 2-4 L/min'
        };

        // SABA — Salbutamol
        let saba;
        if (isFatal) {
            saba = {
                ivDose: '5 mcg/min → aumentar hasta 20 mcg/min si no respuesta',
                ivPrep: '50 mg en 50 mL SF (1 mg/mL) → iniciar 0.3 mL/h · máx 1.2 mL/h',
                nebDose: '5 mg nebulizado c/20 min (o continuo 10-15 mg/h en UCI)',
                note: 'Monitorizar K⁺ (riesgo hipopotasemia con salbutamol IV)'
            };
        } else if (isSevere) {
            saba = {
                nebDose: '5 mg c/20 min × 3 dosis; continuo 10 mg/h si no respuesta',
                mdiDose: '8 puffs (100 mcg/puff) c/20 min × 3 (MDI + cámara)'
            };
        } else {
            saba = {
                mdiDose: '4-8 puffs (100 mcg/puff) c/20 min × 3, luego c/1-4h según respuesta',
                nebDose: '2.5 mg nebulizado c/20 min × 3 dosis'
            };
        }

        // Ipratropio (grave y fatal)
        const ipratropium = (isSevere || isFatal) ? {
            indicated: true,
            nebDose: '0.5 mg c/20 min × 3 dosis (primeras horas)',
            mdiDose: '4-8 puffs (20 mcg/puff) c/20 min × 3'
        } : { indicated: false };

        // Corticosteroides
        let cortico;
        if (isFatal || isSevere) {
            const mpMin = Math.round(weight * 1);
            const mpMax = Math.min(Math.round(weight * 2), 125);
            cortico = {
                drug1: 'Hidrocortisona 200 mg IV c/6h',
                drug2: `Metilprednisolona ${mpMin}-${mpMax} mg IV c/6h (1-2 mg/kg · máx 125 mg)`,
                duration: 'Hasta tolerar VO → prednisolona 40-50 mg VO × 5-7 días',
                note: 'Iniciar en la primera hora'
            };
        } else {
            cortico = {
                drug1: 'Prednisolona 40-50 mg VO c/24h × 5-7 días',
                drug2: null,
                duration: '5-7 días (no precisa pauta descendente si duración < 3 semanas)',
                note: 'Iniciar lo antes posible'
            };
        }

        // Sulfato de magnesio
        const magnesio = (isSevere || isFatal) ? {
            indicated: true,
            dose: 'MgSO₄ 2 g IV en 20 min (diluido en 100 mL SF)',
            when: 'Sin respuesta a broncodilatadores + corticoides en 30-60 min',
            caution: 'Precaución en insuficiencia renal severa'
        } : { indicated: false };

        // Aminofilina (rescate, solo fatal)
        const aminofilina = isFatal ? {
            indicated: true,
            loading: `${Math.round(weight * 5)} mg IV en 20 min (${weight} kg × 5 mg/kg)`,
            loadingNote: 'Si toma teofilina: OMITIR la carga o reducir al 50%',
            maintenance: `${Math.round(weight * 0.5 * 10) / 10} mg/h IV continua (0.5 mg/kg/h)`,
            warning: 'Índice terapéutico estrecho · Niveles objetivo 10-20 mcg/mL · Vigilar arritmias'
        } : { indicated: false };

        // Destino
        const admision = {
            icu: isFatal,
            required: isFatal || isSevere,
            criteria: isFatal
                ? 'UCI / Área de Críticos — Crisis potencialmente fatal'
                : isSevere
                ? 'Hospitalización — Crisis grave'
                : 'Observación 1h · Alta si FEM > 75% y SpO₂ ≥ 94% en aire ambiente'
        };

        const alta = !admision.required ? {
            applicable: true,
            criteria: [
                'SpO₂ ≥ 94% en aire ambiente',
                'FEM ≥ 75% del mejor personal',
                'Habla en frases completas',
                'Técnica de inhalador verificada',
                'Plan de acción escrito entregado',
                'Control ambulatorio en 48-72h'
            ]
        } : { applicable: false };

        return {
            severity, o2, saba, ipratropium, cortico, magnesio, aminofilina, admision, alta,
            isFatal, isSevere, isModerate, isMild,
            fatalCriteria, severeCriteria, moderateCriteria,
            weightKg: weight,
            value: spo2, unit: '%',
            interpretation: {
                label: severity.label,
                color: 'danger',
                description: `Crisis aguda de asma: ${severity.label}. Protocolo GINA 2024 / BTS-SIGN 2023 generado.`
            }
        };
    },

    // === 32. CONTROL ASMA CRÓNICA — CLASIFICACIÓN Y ESCALÓN === //
    calculateAsmaControl(inputs) {
        const { enTratamiento, escalon, tiempoEscalon, sintomasDiurnos, sintomasNocturnos,
                limitacion, rescate, fev1fem, exacerbaciones, ocs, tabaco } = inputs;

        // ────────────────────────────────────────────────────────────
        // A) EVALUACIÓN DE CONTROL (si en tratamiento — GINA 2024)
        // ────────────────────────────────────────────────────────────
        let controlScore = 0;
        if (sintomasDiurnos === 'gt2' || sintomasDiurnos === 'daily') controlScore++;
        if (limitacion === 'alguna' || limitacion === 'bastante' || limitacion === 'total') controlScore++;
        if (sintomasNocturnos === 'gt2' || sintomasNocturnos === 'frequent') controlScore++;
        if (rescate === 'gt2') controlScore++;

        let control;
        if (controlScore === 0) {
            control = { label: 'Bien controlado', badge: '✅', colorHex: '#16a34a', level: 0 };
        } else if (controlScore <= 2) {
            control = { label: 'Parcialmente controlado', badge: '⚠️', colorHex: '#ca8a04', level: 1 };
        } else {
            control = { label: 'No controlado', badge: '🔴', colorHex: '#dc2626', level: 2 };
        }

        const femRiesgo = fev1fem === 'lt60' || fev1fem === '60-79';

        // ────────────────────────────────────────────────────────────
        // B) CLASIFICACIÓN DE SEVERIDAD (si no en tratamiento)
        // ────────────────────────────────────────────────────────────
        // Regla: el síntoma más grave determina la severidad
        let severidadLevel = 0; // 0=intermitente, 1=leve, 2=moderada, 3=grave

        // Síntomas diurnos
        if (sintomasDiurnos === 'daily') severidadLevel = Math.max(severidadLevel, 3);
        else if (sintomasDiurnos === 'gt2') severidadLevel = Math.max(severidadLevel, 2);
        else if (sintomasDiurnos === 'lte2') severidadLevel = Math.max(severidadLevel, 1);

        // Síntomas nocturnos
        if (sintomasNocturnos === 'frequent') severidadLevel = Math.max(severidadLevel, 3);
        else if (sintomasNocturnos === 'gt2') severidadLevel = Math.max(severidadLevel, 2);
        else if (sintomasNocturnos === 'lte2') severidadLevel = Math.max(severidadLevel, 1);

        // Limitación de actividad
        if (limitacion === 'total') severidadLevel = Math.max(severidadLevel, 3);
        else if (limitacion === 'bastante') severidadLevel = Math.max(severidadLevel, 2);
        else if (limitacion === 'alguna') severidadLevel = Math.max(severidadLevel, 1);

        // FEV1/FEM
        if (fev1fem === 'lt60') severidadLevel = Math.max(severidadLevel, 3);
        else if (fev1fem === '60-79') severidadLevel = Math.max(severidadLevel, 2);

        const SEVERIDADES = [
            { label: 'Intermitente',        colorHex: '#16a34a', badge: '🟢', escalon: 1 },
            { label: 'Persistente Leve',    colorHex: '#ca8a04', badge: '🟡', escalon: 2 },
            { label: 'Persistente Moderada',colorHex: '#ea580c', badge: '🟠', escalon: 3 },
            { label: 'Persistente Grave',   colorHex: '#dc2626', badge: '🔴', escalon: 4 }
        ];
        const severidad = SEVERIDADES[severidadLevel];

        // ────────────────────────────────────────────────────────────
        // C) ESCALÓN RECOMENDADO
        // ────────────────────────────────────────────────────────────
        let escalonRec;
        const escalonActual = enTratamiento === 'si' ? parseInt(escalon) : null;

        if (enTratamiento === 'no') {
            // Diagnóstico inicial: escalón según severidad
            escalonRec = severidadLevel === 3 ? 4 : severidad.escalon;
        } else {
            // En tratamiento: ajustar según control
            if (control.level === 2) {
                // No controlado → subir
                escalonRec = Math.min(escalonActual + 1, 5);
            } else if (control.level === 0 && tiempoEscalon === 'gte3' && escalonActual > 1) {
                // Bien controlado ≥ 3 meses → considerar bajar
                escalonRec = escalonActual - 1;
            } else {
                // Parcialmente controlado o bien controlado < 3 meses → mantener
                escalonRec = escalonActual;
            }
            // Factores de riesgo fuerzan al menos escalón actual
            if ((exacerbaciones === 'gte2' || ocs === 'si') && escalonRec < escalonActual) {
                escalonRec = escalonActual;
            }
        }

        // Indicador de cambio
        const cambio = escalonActual === null ? 'nuevo'
            : escalonRec > escalonActual ? 'subir'
            : escalonRec < escalonActual ? 'bajar'
            : 'mantener';

        // ────────────────────────────────────────────────────────────
        // D) CONTENIDO DE CADA ESCALÓN
        // ────────────────────────────────────────────────────────────
        const ESCALONES = {
            1: {
                label: 'Escalón 1',
                colorHex: '#16a34a',
                controlador: null,
                controladorAlt: null,
                rescatador: 'ICS-Formoterol dosis baja PRN (preferido GINA 2024)',
                rescatadorDetalle: 'Budesonida/Formoterol 160/4.5 mcg 1 inh según necesidad',
                rescatadorAlt: 'Alternativa: Salbutamol 100 mcg 2 inh PRN (si ICS-formoterol no disponible)',
                smart: false,
                nota: 'Sin controlador diario necesario. Máx 2 usos/sem de rescate — si más → subir escalón.'
            },
            2: {
                label: 'Escalón 2',
                colorHex: '#16a34a',
                controlador: 'ICS dosis baja diario (primera línea)',
                controladorDetalle: '• Budesonida 200-400 mcg/día (1-2 inh)\n• Fluticasona propionato 100-200 mcg/día\n• Beclometasona 100-200 mcg/día',
                controladorAlt: 'Alternativas: Montelukast 10 mg/noche (si ICS no tolerado) · ICS dosis baja antes de ejercicio',
                rescatador: 'SABA PRN o ICS-Formoterol PRN',
                rescatadorDetalle: 'Salbutamol 100 mcg 2 inh PRN  o  Budesonida/Formoterol 160/4.5 mcg 1 inh PRN',
                smart: false,
                nota: null
            },
            3: {
                label: 'Escalón 3',
                colorHex: '#ca8a04',
                controlador: 'ICS dosis baja + LABA (primera línea)',
                controladorDetalle: '• Budesonida/Formoterol 160/4.5 mcg 2 inh BID\n• Fluticasona/Salmeterol 100/50 mcg 1 inh BID\n• Beclometasona/Formoterol 100/6 mcg 2 inh BID',
                controladorAlt: 'Alternativas: ICS dosis media diario · ICS + Montelukast 10 mg/noche',
                rescatador: 'SABA PRN  o  SMART (BUD/FORM como mantenimiento y rescate)',
                rescatadorDetalle: 'SMART — Budesonida/Formoterol 160/4.5 mcg: mismo inhalador como controlador y rescate. Reduce exacerbaciones.',
                smart: true,
                nota: null
            },
            4: {
                label: 'Escalón 4',
                colorHex: '#ea580c',
                controlador: 'ICS dosis media-alta + LABA',
                controladorDetalle: '• Budesonida 400-800 mcg/día + Formoterol\n• Fluticasona propionato 250-500 mcg/día + Salmeterol\n• Fluticasona furoato/Vilanterol 92/22 mcg 1 inh/día',
                controladorAlt: 'Add-ons: Tiotropio 2.5 mcg/día (≥ 12a, con exacerbaciones) · Montelukast · Azitromicina 250 mg/día (asma no alérgica — requiere ECG previo)',
                rescatador: 'SABA PRN  o  SMART si usa BUD/FORM',
                rescatadorDetalle: 'Salbutamol 100 mcg 2 inh PRN  o  Budesonida/Formoterol PRN (SMART)',
                smart: true,
                nota: '⚠️ Derivar a especialista en Neumología / Alergología'
            },
            5: {
                label: 'Escalón 5',
                colorHex: '#dc2626',
                controlador: 'ICS dosis alta + LABA + Tiotropio',
                controladorDetalle: '• ICS alta dosis + LABA (continuar)\n• Tiotropio 2.5 mcg/día add-on\n• OCS (Prednisolona ≤ 7.5 mg/día) solo si sin otras opciones',
                controladorAlt: null,
                rescatador: 'SABA PRN  o  ICS-Formoterol PRN',
                rescatadorDetalle: 'Salbutamol 100 mcg 2 inh PRN  o  Budesonida/Formoterol 160/4.5 mcg 1 inh PRN',
                smart: false,
                biologicos: {
                    alergico: {
                        fenotipo: 'Asma alérgica (IgE elevada + sensibilización alérgeno perenne)',
                        farmacos: 'Omalizumab',
                        indicacion: 'IgE total 30-1500 UI/mL · Sensibilización a alérgeno perenne · ≥ 6 años'
                    },
                    eosinofilico: {
                        fenotipo: 'Asma eosinofílica (Eos ≥ 300/µL en sangre)',
                        farmacos: 'Mepolizumab · Benralizumab · Tezepelumab',
                        indicacion: 'Eos ≥ 300/µL (o ≥ 150 si corticodependiente) · Mepolizumab también en Eos < 300 si OCS-dependiente'
                    },
                    tipo2: {
                        fenotipo: 'Asma tipo 2 (Eos elevados y/o FeNO alto)',
                        farmacos: 'Dupilumab',
                        indicacion: 'Eos ≥ 150/µL o FeNO ≥ 25 ppb · También si rinitis alérgica o dermatitis atópica comórbida'
                    }
                },
                nota: '⚠️ Derivación OBLIGATORIA a Neumología / Alergología'
            }
        };

        const escalonData = ESCALONES[escalonRec];

        // Factores de riesgo adicionales
        const riesgos = [];
        if (exacerbaciones === 'gte2') riesgos.push('≥ 2 exacerbaciones en el último año (alto riesgo)');
        else if (exacerbaciones === '1') riesgos.push('1 exacerbación en el último año (riesgo moderado)');
        if (ocs === 'si') riesgos.push('Uso de OCS sistémicos en el último año');
        if (tabaco === 'si') riesgos.push('Tabaquismo activo — reduce respuesta a ICS');
        if (femRiesgo && enTratamiento === 'si') riesgos.push('FEV1/FEM reducido — riesgo de limitación fija del flujo');

        const derivar = escalonRec >= 4 || exacerbaciones === 'gte2' || (enTratamiento === 'si' && control.level === 2 && escalonActual >= 3);

        return {
            enTratamiento, control, severidad, severidadLevel,
            escalonActual, escalonRec, cambio,
            escalonData, riesgos, derivar, femRiesgo, controlScore,
            value: escalonRec, unit: `Escalón ${escalonRec}`,
            interpretation: {
                label: enTratamiento === 'no' ? severidad.label : control.label,
                color: 'info',
                description: `Asma crónica: ${enTratamiento === 'no' ? severidad.label : control.label}. Escalón recomendado: ${escalonRec}.`
            }
        };
    },

    // === 34. PAM — PRESIÓN ARTERIAL MEDIA === //
    calculatePAM(inputs) {
        const { pas, pad } = inputs;
        const pam = Math.round((pad + (pas - pad) / 3) * 10) / 10;

        let stage, label, color, description;
        if (pam < 60) {
            stage = '< 60 mmHg'; label = 'Hipoperfusión grave'; color = 'danger';
            description = 'PAM crítica — perfusión de órganos comprometida. Requiere intervención inmediata: vasopresores y/o reanimación con fluidos.';
        } else if (pam < 65) {
            stage = '60-64 mmHg'; label = 'Límite inferior'; color = 'warning';
            description = 'PAM en límite crítico. Por debajo del objetivo mínimo en sepsis (≥65 mmHg). Evaluar estado hemodinámico y necesidad de vasopresores.';
        } else if (pam <= 100) {
            stage = '65-100 mmHg'; label = 'Normal'; color = 'success';
            description = 'PAM dentro del rango normal. Adecuada para la mayoría de pacientes. Verificar objetivos específicos según contexto clínico.';
        } else if (pam <= 110) {
            stage = '101-110 mmHg'; label = 'Hipertensión leve'; color = 'warning';
            description = 'PAM elevada. Aumenta la poscarga cardíaca. Evaluar en contexto de HTA crónica, ansiedad o dolor.';
        } else {
            stage = '> 110 mmHg'; label = 'Hipertensión moderada-grave'; color = 'danger';
            description = 'PAM muy elevada. Riesgo de daño de órgano diana. Evaluar urgencia/emergencia hipertensiva y necesidad de tratamiento.';
        }

        return {
            value: pam, unit: 'mmHg',
            interpretation: { stage, label, color, description }
        };
    },

    // === 33. DIAGNÓSTICO LES — CRITERIOS ACR/EULAR 2019 === //
    calculateLES(inputs) {
        const { ana, fever, leukopenia, thrombocytopenia, hemolysis,
                delirium, psychosis, seizures,
                alopecia, oralUlcers, subacuteDiscoid, acuteCutaneous,
                effusion, pericarditis, joints,
                proteinuria, biopsy25, biopsy34,
                antiphospholipid, complement, specificAb } = inputs;

        function domMax(criteria) {
            const pts = criteria.filter(c => c.checked).map(c => c.pts);
            return pts.length ? Math.max(...pts) : 0;
        }

        function markDomain(criteria, domScore) {
            let countedYet = false;
            criteria.slice().sort((a, b) => b.pts - a.pts).forEach(cr => {
                if (!cr.checked) { cr.counts = null; return; }
                if (cr.pts === domScore && !countedYet) { cr.counts = true; countedYet = true; }
                else { cr.counts = false; }
            });
        }

        const domainDefs = [
            {
                key: 'constitutional', name: 'Constitucional', max: 2, icon: '🌡️',
                criteria: [{ label: 'Fiebre >38.3°C inexplicada', pts: 2, checked: !!fever }]
            },
            {
                key: 'hematological', name: 'Hematológico', max: 4, icon: '🩸',
                criteria: [
                    { label: 'Leucopenia <4.000/µL', pts: 3, checked: !!leukopenia },
                    { label: 'Trombocitopenia <100.000/µL', pts: 4, checked: !!thrombocytopenia },
                    { label: 'Hemólisis autoinmune — Coombs directo + anemia', pts: 4, checked: !!hemolysis }
                ]
            },
            {
                key: 'neuropsychiatric', name: 'Neuropsiquiátrico', max: 5, icon: '🧠',
                criteria: [
                    { label: 'Delirium', pts: 2, checked: !!delirium },
                    { label: 'Psicosis', pts: 3, checked: !!psychosis },
                    { label: 'Convulsiones', pts: 5, checked: !!seizures }
                ]
            },
            {
                key: 'mucocutaneous', name: 'Mucocutáneo', max: 6, icon: '🔴',
                criteria: [
                    { label: 'Alopecia no cicatricial (parcheada o difusa)', pts: 2, checked: !!alopecia },
                    { label: 'Úlceras orales (paladar o mucosa oral)', pts: 2, checked: !!oralUlcers },
                    { label: 'Lupus cutáneo subagudo o discoide', pts: 4, checked: !!subacuteDiscoid },
                    { label: 'Lupus cutáneo agudo / eritema malar / fotosensibilidad', pts: 6, checked: !!acuteCutaneous }
                ]
            },
            {
                key: 'serosal', name: 'Seroso', max: 6, icon: '💧',
                criteria: [
                    { label: 'Derrame pleural o pericárdico', pts: 5, checked: !!effusion },
                    { label: 'Pericarditis aguda', pts: 6, checked: !!pericarditis }
                ]
            },
            {
                key: 'musculoskeletal', name: 'Musculoesquelético', max: 6, icon: '🦴',
                criteria: [{ label: 'Sinovitis ≥2 articulaciones o rigidez matutina ≥30 min', pts: 6, checked: !!joints }]
            },
            {
                key: 'renal', name: 'Renal', max: 10, icon: '🫘',
                criteria: [
                    { label: 'Proteinuria >0.5 g/24h o cociente Pr/Cr >0.5', pts: 4, checked: !!proteinuria },
                    { label: 'Biopsia renal: Nefritis lúpica clase II o V', pts: 8, checked: !!biopsy25 },
                    { label: 'Biopsia renal: Nefritis lúpica clase III o IV', pts: 10, checked: !!biopsy34 }
                ]
            }
        ];

        domainDefs.forEach(d => {
            d.score = domMax(d.criteria);
            markDomain(d.criteria, d.score);
        });

        const sAphospho = antiphospholipid === 'positive' ? 2 : 0;
        const sComp     = complement === 'both_low' ? 4 : complement === 'one_low' ? 3 : 0;
        const sSpecAb   = specificAb === 'positive' ? 6 : 0;
        const sImmuno   = sAphospho + sComp + sSpecAb;

        const immunoDef = {
            key: 'immunological', name: 'Inmunológico', max: 12, icon: '🔬',
            score: sImmuno, isAdditive: true,
            criteria: [
                { label: 'Anticuerpos antifosfolípidos', pts: 2, score: sAphospho, state: antiphospholipid },
                {
                    label: complement === 'both_low' ? 'Complemento C3 Y C4 bajos' :
                           complement === 'one_low'  ? 'Complemento C3 O C4 bajo'  :
                           complement === 'normal'   ? 'Complemento normal' : 'Complemento',
                    pts: complement === 'both_low' ? 4 : 3, score: sComp,
                    state: complement === 'not_done' ? 'not_done' : sComp > 0 ? 'positive' : 'negative'
                },
                { label: 'Anti-dsDNA o Anti-Sm', pts: 6, score: sSpecAb, state: specificAb }
            ]
        };

        const allDomains = [...domainDefs, immunoDef];
        const totalScore = allDomains.reduce((sum, d) => sum + d.score, 0);

        const anaPositive = ana === 'positive';
        const anaNotDone  = ana === 'not_done';
        const anaNegative = ana === 'negative';

        let classification;
        if (anaNotDone)                           classification = 'incomplete';
        else if (anaNegative)                     classification = 'ana_negative';
        else if (anaPositive && totalScore >= 10) classification = 'met';
        else if (anaPositive && totalScore >= 7)  classification = 'possible';
        else                                      classification = 'not_met';

        const pendingTests = [];
        if (anaNotDone)                           pendingTests.push({ test: 'ANA (HEp-2 ≥1:80)',                                                                pts: 'Criterio de entrada obligatorio' });
        if (antiphospholipid === 'not_done')      pendingTests.push({ test: 'Anticuerpos antifosfolípidos (anti-CL IgG, anti-β2GPI IgG, anticoagulante lúpico)', pts: '+2 pts si positivo' });
        if (complement === 'not_done')            pendingTests.push({ test: 'Complemento C3 y C4',                                                              pts: '+3-4 pts si bajos' });
        if (specificAb === 'not_done')            pendingTests.push({ test: 'Anti-dsDNA y Anti-Sm',                                                             pts: '+6 pts si positivo' });
        if (!proteinuria && !biopsy25 && !biopsy34) pendingTests.push({ test: 'Proteinuria 24h o cociente Pr/Cr',                                               pts: '+4 pts si >0.5 g/24h' });

        let maxAdditional = 0;
        if (antiphospholipid === 'not_done')      maxAdditional += 2;
        if (complement === 'not_done')            maxAdditional += 4;
        if (specificAb === 'not_done')            maxAdditional += 6;
        if (!proteinuria && !biopsy25 && !biopsy34) maxAdditional += 4;

        const classMap = {
            'met':          'Cumple criterios ACR/EULAR 2019 para LES',
            'possible':     'Score elevado — completar evaluación antes de clasificar',
            'not_met':      'No cumple criterios ACR/EULAR 2019',
            'incomplete':   'Score parcial — ANA pendiente',
            'ana_negative': 'LES muy improbable (ANA negativo, sensibilidad 97-99%)'
        };

        return {
            totalScore, classification, classLabel: classMap[classification],
            anaPositive, anaNotDone, anaNegative,
            pendingTests, maxAdditional,
            domains: allDomains,
            value: totalScore, unit: 'pts',
            interpretation: {
                label: classMap[classification],
                color: classification === 'met' ? 'danger' : 'info',
                description: `Score ACR/EULAR 2019: ${totalScore} pts. ${classMap[classification]}.`
            }
        };
    },

    // === 38. FIB-4 / APRI — FIBROSIS HEPÁTICA === //
    calculateFibrosis(inputs) {
        const { age, ast, alt, platelets, plateletsUnit, lsnAst,
                spiderNevi, eritemaPalmar, ictericia, leuconiquia, dupuytren,
                ginecomastia, perdidaVello, sarcopenia,
                hepatomegalia, esplenomegalia, ascitis, caputMedusae, edema,
                asterixis, encefalopatia } = inputs;

        const ageNum  = parseFloat(age)  || 0;
        const astNum  = parseFloat(ast)  || 0;
        const altNum  = parseFloat(alt)  || 0;
        let   platNum = parseFloat(platelets) || 0;
        if (plateletsUnit === 'mm3') platNum = platNum / 1000;
        const lsnNum  = parseFloat(lsnAst) || 40;

        // FIB-4 = (Edad × AST) / (Plaquetas × √ALT)
        let fib4 = null;
        if (ageNum > 0 && astNum > 0 && altNum > 0 && platNum > 0) {
            fib4 = Math.round((ageNum * astNum) / (platNum * Math.sqrt(altNum)) * 100) / 100;
        }

        // APRI = (AST / LSN_AST × 100) / Plaquetas
        let apri = null;
        if (astNum > 0 && platNum > 0) {
            apri = Math.round(((astNum / lsnNum) * 100) / platNum * 100) / 100;
        }

        // FIB-4 cutoffs (ajustados si >65 años — AASLD 2023)
        const isOld = ageNum > 65;
        let fib4Zone = null, fib4Label = null, fib4Color = null;
        if (fib4 !== null) {
            if (isOld) {
                if (fib4 < 2.0)       { fib4Zone = 'low';  fib4Label = 'Bajo riesgo';     fib4Color = '#22c55e'; }
                else if (fib4 <= 3.25){ fib4Zone = 'gray'; fib4Label = 'Indeterminado';   fib4Color = '#f59e0b'; }
                else                  { fib4Zone = 'high'; fib4Label = 'Alto riesgo';     fib4Color = '#ef4444'; }
            } else {
                if (fib4 < 1.30)      { fib4Zone = 'low';  fib4Label = 'Fibrosis avanzada poco probable'; fib4Color = '#22c55e'; }
                else if (fib4 <= 2.67){ fib4Zone = 'gray'; fib4Label = 'Zona indeterminada';              fib4Color = '#f59e0b'; }
                else                  { fib4Zone = 'high'; fib4Label = 'Fibrosis avanzada probable';      fib4Color = '#ef4444'; }
            }
        }

        // APRI interpretation
        let apriZone = null, apriLabel = null, apriColor = null;
        if (apri !== null) {
            if (apri < 0.5)      { apriZone = 'low';      apriLabel = 'Fibrosis poco probable';    apriColor = '#22c55e'; }
            else if (apri < 1.0) { apriZone = 'gray';     apriLabel = 'Indeterminado';             apriColor = '#f59e0b'; }
            else if (apri < 2.0) { apriZone = 'moderate'; apriLabel = 'Fibrosis significativa';   apriColor = '#f97316'; }
            else                 { apriZone = 'high';     apriLabel = 'Cirrosis probable';         apriColor = '#ef4444'; }
        }

        // Estigmas clínicos
        const stigmataMap = { spiderNevi, eritemaPalmar, ictericia, leuconiquia, dupuytren,
                              ginecomastia, perdidaVello, sarcopenia,
                              hepatomegalia, esplenomegalia, ascitis, caputMedusae, edema,
                              asterixis, encefalopatia };
        const stigmataCount = Object.values(stigmataMap).filter(Boolean).length;

        // Interpretación combinada
        let combinedLabel, combinedColor, combinedRec, combinedColorName;
        if (!fib4Zone) {
            combinedLabel = 'Completar laboratorio para interpretación';
            combinedColor = '#64748b'; combinedColorName = 'info';
            combinedRec = 'Ingresa AST/TGO, ALT/TGP, plaquetas y edad para calcular FIB-4 y APRI.';
        } else if (fib4Zone === 'low' && stigmataCount < 2) {
            combinedLabel = 'Hepatopatía crónica avanzada poco probable';
            combinedColor = '#22c55e'; combinedColorName = 'success';
            combinedRec = 'Seguimiento según etiología. Repetir FIB-4 en 1–2 años si persisten factores de riesgo.';
        } else if (fib4Zone === 'low' && stigmataCount >= 2) {
            combinedLabel = 'Discordancia clínico-laboratorial';
            combinedColor = '#f59e0b'; combinedColorName = 'warning';
            combinedRec = 'Hallazgos clínicos no concordantes con laboratorio. Repetir labs en 3-6 meses, considerar elastografía o diagnóstico alternativo.';
        } else if (fib4Zone === 'gray' && stigmataCount === 0) {
            combinedLabel = 'Zona indeterminada — solicitar elastografía';
            combinedColor = '#f59e0b'; combinedColorName = 'warning';
            combinedRec = 'Solicitar elastografía hepática (FibroScan o SWE). Si no disponible, repetir FIB-4 en 6–12 meses.';
        } else if (fib4Zone === 'gray' && stigmataCount >= 1) {
            combinedLabel = 'Zona indeterminada con hallazgos clínicos';
            combinedColor = '#f97316'; combinedColorName = 'warning';
            combinedRec = 'Elastografía hepática prioritaria y valoración por hepatólogo. La clínica aumenta la sospecha.';
        } else if (fib4Zone === 'high' && stigmataCount < 2) {
            combinedLabel = 'Fibrosis avanzada — derivar a hepatólogo';
            combinedColor = '#f97316'; combinedColorName = 'warning';
            combinedRec = 'Elastografía hepática + derivación a hepatólogo. Evaluar complicaciones de hipertensión portal.';
        } else {
            combinedLabel = 'Probable cirrosis establecida';
            combinedColor = '#ef4444'; combinedColorName = 'danger';
            combinedRec = 'Derivar urgente a hepatólogo. Evaluar: endoscopia (várices), ecografía (hepatocarcinoma), Child-Pugh y MELD.';
        }

        return {
            fib4, apri, fib4Zone, fib4Label, fib4Color, apriZone, apriLabel, apriColor,
            stigmataCount, stigmataMap, combinedLabel, combinedColor, combinedRec, isOld,
            value: fib4 ?? '—', unit: '(FIB-4)',
            description: combinedLabel,
            interpretation: { label: combinedLabel, color: combinedColorName, description: `FIB-4: ${fib4 ?? '—'}. APRI: ${apri ?? '—'}. Estigmas: ${stigmataCount}. ${combinedLabel}.` }
        };
    },

    // === 37. PSI/PORT — ÍNDICE DE SEVERIDAD DE NEUMONÍA === //
    calculatePSI(inputs) {
        const { age, sex, nursingHome,
                neoplasia, liver, chf, cerebrovascular, renal,
                ams, rr30, sbp90, tempAbnormal, hr125,
                phAcidosis, bunHigh, sodiumLow, glucoseHigh, hctLow, hypoxia, effusion } = inputs;

        const ageNum = parseInt(age) || 0;

        // Paso 1 — Clase I: ≤50 años, sin comorbilidades, sin alteraciones de signos vitales
        const hasComorbidity = neoplasia || liver || chf || cerebrovascular || renal;
        const hasVitalAbnormality = ams || rr30 || sbp90 || tempAbnormal || hr125;
        const isClassI = ageNum <= 50 && !nursingHome && !hasComorbidity && !hasVitalAbnormality;

        // Paso 2 — Score (aplica si no es Clase I)
        let score = 0;
        const agePts = sex === 'F' ? Math.max(ageNum - 10, 0) : ageNum;
        score += agePts;
        if (nursingHome)     score += 10;
        if (neoplasia)       score += 30;
        if (liver)           score += 20;
        if (chf)             score += 10;
        if (cerebrovascular) score += 10;
        if (renal)           score += 10;
        if (ams)             score += 20;
        if (rr30)            score += 20;
        if (sbp90)           score += 20;
        if (tempAbnormal)    score += 15;
        if (hr125)           score += 10;
        if (phAcidosis)      score += 30;
        if (bunHigh)         score += 20;
        if (sodiumLow)       score += 20;
        if (glucoseHigh)     score += 10;
        if (hctLow)          score += 10;
        if (hypoxia)         score += 10;
        if (effusion)        score += 10;

        let riskClass, mortality, color, colorName, disposicion;
        if (isClassI) {
            riskClass = 'I';   mortality = '<0.1%'; color = '#22c55e'; colorName = 'success';
            disposicion = 'Tratamiento ambulatorio';
        } else if (score <= 70) {
            riskClass = 'II';  mortality = '0.6%';  color = '#22c55e'; colorName = 'success';
            disposicion = 'Tratamiento ambulatorio';
        } else if (score <= 90) {
            riskClass = 'III'; mortality = '2.8%';  color = '#f59e0b'; colorName = 'warning';
            disposicion = 'Observación breve o ingreso hospitalario corto';
        } else if (score <= 130) {
            riskClass = 'IV';  mortality = '8.2%';  color = '#f97316'; colorName = 'warning';
            disposicion = 'Hospitalización en sala';
        } else {
            riskClass = 'V';   mortality = '29.2%'; color = '#ef4444'; colorName = 'danger';
            disposicion = 'Hospitalización — considerar UCI';
        }

        const scoreDisplay = isClassI ? 'N/A' : String(score);
        return {
            score, isClassI, riskClass, mortality, color, colorName, disposicion, agePts,
            value: isClassI ? 'I' : score, unit: isClassI ? '(Clase I)' : 'pts',
            description: `PSI Clase ${riskClass}`,
            interpretation: {
                label: `Clase ${riskClass} — ${disposicion}`,
                color: colorName,
                description: `PSI Clase ${riskClass}. Score: ${scoreDisplay} pts. Mortalidad a 30 días: ${mortality}. ${disposicion}.`
            }
        };
    },

    // === 36. KILLIP-KIMBALL === //
    calculateKillip({ estertores, s3, jvd, pasBaja, hipoperfusion }) {
        let clase = null, warning = null;
        if (pasBaja && hipoperfusion) {
            clase = 4;
        } else if (pasBaja && !hipoperfusion) {
            clase = null;
            warning = 'PAS <90 mmHg sin hipoperfusión periférica completa — verificar: ¿hipovolemia?, ¿bradiarritmia?. Si se confirma hipoperfusión → Clase IV.';
        } else if (estertores === 'mayor_mitad') {
            clase = 3;
        } else if (s3 || estertores === 'menor_mitad' || jvd) {
            clase = 2;
        } else {
            clase = 1;
        }
        const data = {
            1: { label: 'Clase I',   desc: 'Sin signos de insuficiencia cardíaca', mortalidadHist: '~6%',  mortalidadAct: '1–2%',   color: '#22c55e', colorName: 'success' },
            2: { label: 'Clase II',  desc: 'Insuficiencia cardíaca leve',          mortalidadHist: '~17%', mortalidadAct: '4–6%',   color: '#f59e0b', colorName: 'warning' },
            3: { label: 'Clase III', desc: 'Edema agudo de pulmón',                mortalidadHist: '~38%', mortalidadAct: '8–12%',  color: '#f97316', colorName: 'warning' },
            4: { label: 'Clase IV',  desc: 'Shock cardiogénico',                   mortalidadHist: '~81%', mortalidadAct: '40–60%', color: '#ef4444', colorName: 'danger'  },
        };
        if (!clase) {
            return {
                clase: null, warning,
                value: null, unit: '',
                description: 'Indeterminado',
                interpretation: { label: 'Indeterminado', color: 'warning', description: warning || 'No se puede determinar la clase con los datos ingresados.' }
            };
        }
        const d = data[clase];
        return {
            clase, label: d.label, desc: d.desc,
            mortalidadHist: d.mortalidadHist, mortalidadAct: d.mortalidadAct,
            color: d.color, colorName: d.colorName, warning,
            value: clase, unit: `(${d.desc})`,
            description: d.desc,
            interpretation: {
                label: d.label, color: d.colorName,
                description: `${d.label}: ${d.desc}. Mortalidad intrahospitalaria histórica: ${d.mortalidadHist}. Contemporánea: ${d.mortalidadAct}.`
            }
        };
    }
};
