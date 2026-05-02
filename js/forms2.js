// ============================================
// CLINICALC - FORMULARIOS CONTINUACIÓN
// Formularios 5-10: Sodio, IMC, BSA, Osm, CHADS, HAS-BLED
// ============================================

// === 5. SODIO CORREGIDO === //
function createCorrectedSodiumForm() {
    const units = Storage.getSettings().units;
    return `
        <form id="correctedSodiumForm" onsubmit="calculateCorrectedSodium(event)">
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Sodio sérico (mEq/L)
                </label>
                <input type="number" id="sodiumNa" required step="any" min="120" max="160" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Glucosa (${units.glucose})
                </label>
                <input type="number" id="glucose" required step="any" class="form-input">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular Sodio Corregido
            </button>
        </form>
        <div id="correctedSodiumResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateCorrectedSodium(event) {
    event.preventDefault();
    const inputs = {
        sodium: parseFloat(document.getElementById('sodiumNa').value),
        glucose: parseFloat(document.getElementById('glucose').value)
    };
    const result = Calculators.calculateCorrectedSodium(inputs);
    
    const container = document.getElementById('correctedSodiumResult');
    container.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">SODIO CORREGIDO</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">
                ${result.value} <span style="font-size: 20px; font-weight: 600;">${result.unit}</span>
            </div>
            <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">
                ${result.interpretation.label}
            </div>
            <div style="background: rgba(30, 56, 114, 0.15); padding: 12px; border-radius: 8px; font-size: 13px;">
                <strong>Fórmula de Katz:</strong> ${result.value} ${result.unit}<br>
                <strong>Fórmula de Hillier:</strong> ${result.hillier} ${result.unit}
            </div>
        </div>
        <div class="interpretation-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); border-left: 4px solid var(--${result.interpretation.color});">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Interpretación</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
                ${result.interpretation.description}
            </p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('correctedSodiumForm').reset(); document.getElementById('correctedSodiumResult').style.display='none';" style="width: 100%; margin-top: 16px;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 5, calculatorName: 'Sodio Corregido', inputs, result, interpretation: result.interpretation });
}

// === 6. IMC === //
function createBMIForm() {
    const units = Storage.getSettings().units;
    return `
        <form id="bmiForm" onsubmit="calculateBMI(event)">
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Peso (${units.weight})
                </label>
                <input type="number" id="weight" required step="any" min="30" max="300" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Altura (${units.height})
                </label>
                <input type="number" id="height" required step="any" class="form-input">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular IMC
            </button>
        </form>
        <div id="bmiResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateBMI(event) {
    event.preventDefault();
    const inputs = {
        weight: parseFloat(document.getElementById('weight').value),
        height: parseFloat(document.getElementById('height').value)
    };
    const result = Calculators.calculateBMI(inputs);
    displayGenericResult(result, inputs, 6, 'IMC', null, 'bmiResult');
    Storage.addToHistory({ calculatorId: 6, calculatorName: 'IMC', inputs, result, interpretation: result.interpretation });
}

// === 7. BSA === //
function createBSAForm() {
    const units = Storage.getSettings().units;
    return `
        <form id="bsaForm" onsubmit="calculateBSA(event)">
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Fórmula</label>
                <select id="bsaFormula" class="form-input">
                    <option value="Mosteller">Mosteller (Recomendada)</option>
                    <option value="DuBois">DuBois</option>
                </select>
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Peso (${units.weight})
                </label>
                <input type="number" id="weightBSA" required step="any" min="30" max="300" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Altura (${units.height})
                </label>
                <input type="number" id="heightBSA" required step="any" class="form-input">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular BSA
            </button>
        </form>
        <div id="bsaResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateBSA(event) {
    event.preventDefault();
    const formula = document.getElementById('bsaFormula').value;
    const inputs = {
        weight: parseFloat(document.getElementById('weightBSA').value),
        height: parseFloat(document.getElementById('heightBSA').value)
    };
    const result = Calculators.calculateBSA(inputs, formula);
    displayGenericResult(result, inputs, 7, 'BSA', formula, 'bsaResult');
    Storage.addToHistory({ calculatorId: 7, calculatorName: 'BSA', formula, inputs, result, interpretation: result.interpretation });
}

// === 8. OSMOLARIDAD === //
function createOsmolarityForm() {
    const units = Storage.getSettings().units;
    return `
        <form id="osmolarityForm" onsubmit="calculateOsmolarity(event)">
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Sodio (mEq/L)
                </label>
                <input type="number" id="sodiumOsm" required step="any" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Glucosa (${units.glucose})
                </label>
                <input type="number" id="glucoseOsm" required step="any" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    BUN (${units.bun})
                </label>
                <input type="number" id="bunOsm" required step="any" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Osmolaridad medida (opcional) - mOsm/kg
                </label>
                <input type="number" id="measuredOsm" step="any" class="form-input" placeholder="Dejar vacío si no se midió">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular Osmolaridad
            </button>
        </form>
        <div id="osmolarityResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateOsmolarity(event) {
    event.preventDefault();
    const measuredInput = document.getElementById('measuredOsm').value;
    const inputs = {
        sodium: parseFloat(document.getElementById('sodiumOsm').value),
        glucose: parseFloat(document.getElementById('glucoseOsm').value),
        bun: parseFloat(document.getElementById('bunOsm').value),
        measuredOsm: measuredInput ? parseFloat(measuredInput) : null
    };
    const result = Calculators.calculateOsmolarity(inputs);
    
    const container = document.getElementById('osmolarityResult');
    container.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">OSMOLARIDAD CALCULADA</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">
                ${result.value} <span style="font-size: 20px; font-weight: 600;">${result.unit}</span>
            </div>
            <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">
                ${result.interpretation.label}
            </div>
            ${result.osmGap !== null ? `
                <div style="background: rgba(30, 56, 114, 0.15); padding: 12px; border-radius: 8px; font-size: 13px;">
                    <strong>Gap Osmolar:</strong> ${result.osmGap} mOsm/kg
                    ${Math.abs(result.osmGap) > 10 ? '<br><span style="color: #dc2626;">⚠️ Gap >10: considerar tóxicos (metanol, etilenglicol)</span>' : ''}
                </div>
            ` : ''}
        </div>
        <div class="interpretation-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); border-left: 4px solid var(--${result.interpretation.color});">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Interpretación</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
                ${result.interpretation.description}
            </p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('osmolarityForm').reset(); document.getElementById('osmolarityResult').style.display='none';" style="width: 100%; margin-top: 16px;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 8, calculatorName: 'Osmolaridad', inputs, result, interpretation: result.interpretation });
}

// === 9. CHADS2-VASc === //
function createCHADSVAScForm() {
    return `
        <form id="chadsVascForm" onsubmit="calculateCHADSVASc(event)">
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Edad (años)</label>
                <input type="number" id="ageCHADS" required min="18" max="120" class="form-input">
            </div>
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Sexo</label>
                <select id="sexCHADS" required class="form-input">
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                </select>
            </div>
            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <p style="font-size: 13px; font-weight: 600; margin-bottom: 12px;">Seleccione factores de riesgo:</p>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="chf" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Insuficiencia Cardíaca (CHF)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="hypertension" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Hipertensión</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="diabetes" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Diabetes</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="stroke" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">ACV/AIT/Embolia previos</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="vascularDisease" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Enfermedad Vascular</span>
                </label>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular CHADS₂-VASc
            </button>
        </form>
        <div id="chadsVascResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateCHADSVASc(event) {
    event.preventDefault();
    const inputs = {
        age: parseInt(document.getElementById('ageCHADS').value),
        sex: document.getElementById('sexCHADS').value,
        chf: document.getElementById('chf').checked,
        hypertension: document.getElementById('hypertension').checked,
        diabetes: document.getElementById('diabetes').checked,
        stroke: document.getElementById('stroke').checked,
        vascularDisease: document.getElementById('vascularDisease').checked
    };
    const result = Calculators.calculateCHADSVASc(inputs);
    displayGenericResult(result, inputs, 9, 'CHADS₂-VASc', null, 'chadsVascResult');
    Storage.addToHistory({ calculatorId: 9, calculatorName: 'CHADS₂-VASc', inputs, result, interpretation: result.interpretation });
}

// === 10. HAS-BLED === //
function createHASBLEDForm() {
    return `
        <form id="hasBledForm" onsubmit="calculateHASBLED(event)">
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Edad (años)</label>
                <input type="number" id="ageHAS" required min="18" max="120" class="form-input">
            </div>
            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <p style="font-size: 13px; font-weight: 600; margin-bottom: 12px;">Seleccione factores de riesgo:</p>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="hypertensionHAS" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Hipertensión no controlada (>160 mmHg)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="abnormalRenal" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Función renal anormal (diálisis, Cr >2.3)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="abnormalLiver" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Función hepática anormal</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="strokeHAS" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">ACV previo</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="bleeding" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Historia de sangrado</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="labileINR" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">INR lábil (si usa warfarina)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="drugs" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Medicación predisponente (AINEs, antiplaquetarios)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="alcohol" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Abuso de alcohol (≥8 bebidas/semana)</span>
                </label>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular HAS-BLED
            </button>
        </form>
        <div id="hasBledResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateHASBLED(event) {
    event.preventDefault();
    const inputs = {
        age: parseInt(document.getElementById('ageHAS').value),
        hypertension: document.getElementById('hypertensionHAS').checked,
        abnormalRenal: document.getElementById('abnormalRenal').checked,
        abnormalLiver: document.getElementById('abnormalLiver').checked,
        stroke: document.getElementById('strokeHAS').checked,
        bleeding: document.getElementById('bleeding').checked,
        labileINR: document.getElementById('labileINR').checked,
        drugs: document.getElementById('drugs').checked,
        alcohol: document.getElementById('alcohol').checked
    };
    const result = Calculators.calculateHASBLED(inputs);
    displayGenericResult(result, inputs, 10, 'HAS-BLED', null, 'hasBledResult');
    Storage.addToHistory({ calculatorId: 10, calculatorName: 'HAS-BLED', inputs, result, interpretation: result.interpretation });
}

// === 16. SOFA === //
function createSOFAForm() {
    const units = Storage.getSettings().units;
    const crMax = units.creatinine === 'mg/dL' ? 15 : 1326;
    const crLabel = units.creatinine;
    return `
        <form id="sofaForm" onsubmit="calculateSOFA(event)">
            <div class="alert-box" style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #92400e; margin: 0;">
                    <strong>⚠️ Nota:</strong> SOFA Score evalúa disfunción orgánica en UCI. Un incremento ≥2 puntos en contexto infeccioso confirma sepsis (Sepsis-3).
                </p>
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Respiratorio</div>
            <div class="form-group" style="margin-bottom: 8px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">PaO₂/FiO₂ (mmHg)</label>
                <input type="number" id="sofaPaFi" required step="any" min="20" max="600" class="form-input">
            </div>
            <div style="background: var(--bg-secondary); padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="sofaVent" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">En ventilación mecánica (necesario para score 3-4)</span>
                </label>
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Coagulación</div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Plaquetas (×10³/µL)</label>
                <input type="number" id="sofaPlatelets" required step="any" min="1" max="800" class="form-input">
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Hepático</div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Bilirrubina (mg/dL)</label>
                <input type="number" id="sofaBilirubin" required step="any" min="0.1" max="50" class="form-input">
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Cardiovascular</div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Estado hemodinámico</label>
                <select id="sofaCardio" required class="form-input">
                    <option value="0">0 – PAM ≥70 mmHg sin vasopresores</option>
                    <option value="1">1 – PAM &lt;70 mmHg sin vasopresores</option>
                    <option value="2">2 – Dopamina ≤5 µg/kg/min o Dobutamina</option>
                    <option value="3">3 – Dopamina 5-15 µg/kg/min o NE/Epi ≤0.1 µg/kg/min</option>
                    <option value="4">4 – Dopamina &gt;15 µg/kg/min o NE/Epi &gt;0.1 µg/kg/min</option>
                </select>
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Neurológico</div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Glasgow Coma Scale (GCS)</label>
                <input type="number" id="sofaGCS" required min="3" max="15" class="form-input">
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Renal</div>
            <div class="form-group" style="margin-bottom: 8px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Creatinina sérica (${crLabel})</label>
                <input type="number" id="sofaCreatinine" required step="any" min="0.1" max="${crMax}" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Diuresis 24h (mL) <span style="font-weight: 400; color: var(--text-secondary);">— opcional</span></label>
                <input type="number" id="sofaUrine" step="any" min="0" max="10000" class="form-input" placeholder="Dejar vacío si no disponible">
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular SOFA
            </button>
        </form>
        <div id="sofaResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateSOFA(event) {
    event.preventDefault();
    const urineInput = document.getElementById('sofaUrine').value;
    const inputs = {
        pao2fio2: parseFloat(document.getElementById('sofaPaFi').value),
        ventilation: document.getElementById('sofaVent').checked,
        platelets: parseFloat(document.getElementById('sofaPlatelets').value),
        bilirubin: parseFloat(document.getElementById('sofaBilirubin').value),
        cardiovascular: document.getElementById('sofaCardio').value,
        gcs: parseInt(document.getElementById('sofaGCS').value),
        creatinine: parseFloat(document.getElementById('sofaCreatinine').value),
        urineOutput: urineInput ? parseFloat(urineInput) : null
    };
    const result = Calculators.calculateSOFA(inputs);
    const c = result.components;

    const componentRow = (label, score) => {
        const colors = ['#22c55e', '#84cc16', '#f59e0b', '#f97316', '#ef4444'];
        const color = colors[score] || '#ef4444';
        return `<div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <span style="font-size: 13px;">${label}</span>
            <span style="font-size: 16px; font-weight: 700; background: ${color}22; color: ${color}; padding: 2px 10px; border-radius: 20px;">${score}</span>
        </div>`;
    };

    const container = document.getElementById('sofaResult');
    container.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">SOFA SCORE TOTAL</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">
                ${result.value} <span style="font-size: 20px; font-weight: 600;">${result.unit}</span>
            </div>
            <div style="font-size: 14px; font-weight: 600;">${result.interpretation.label}</div>
        </div>
        <div style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); margin-bottom: 16px;">
            <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Puntuación por órgano (0-4)</h4>
            ${componentRow('Respiratorio (PaO₂/FiO₂)', c.resp)}
            ${componentRow('Coagulación (Plaquetas)', c.coag)}
            ${componentRow('Hepático (Bilirrubina)', c.liver)}
            ${componentRow('Cardiovascular', c.cardio)}
            ${componentRow('Neurológico (GCS)', c.neuro)}
            ${componentRow('Renal (Creatinina/Diuresis)', c.renal)}
        </div>
        <div class="interpretation-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); border-left: 4px solid var(--${result.interpretation.color});">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Interpretación</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">${result.interpretation.description}</p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('sofaForm').reset(); document.getElementById('sofaResult').style.display='none';" style="width: 100%; margin-top: 16px;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 16, calculatorName: 'SOFA', inputs, result, interpretation: result.interpretation });
}

// === 17. NIHSS === //
const NIHSS_HELP = {
    loc: {
        title: '1a. Nivel de Consciencia',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li>Observe al paciente sin estimulación adicional</li>
                <li>Llame al paciente por su nombre en voz alta</li>
                <li>Si no responde, aplique estímulo táctil suave (toque el hombro)</li>
                <li>Si persiste sin respuesta, aplique estímulo doloroso: presión en esternón o lecho ungueal</li>
                <li>Evalúe la calidad y rapidez de la respuesta</li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Use estímulos progresivos: verbal → táctil → nociceptivo. No asuma somnolencia si hay barrera del lenguaje — verifique respuesta a órdenes gestuales. Documente exactamente qué estímulo generó respuesta.</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">La intubación orotraqueal NO limita este ítem — evalúe despertar y respuesta motora. Un paciente agitado que "pelea" con el tubo = alerta (puntúa 0).</p>
            </div>`
    },
    locQ: {
        title: '1b. Preguntas de Orientación',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li>Pregunte: <em>"¿En qué mes estamos?"</em></li>
                <li>Pregunte: <em>"¿Cuántos años tiene usted?"</em></li>
                <li>Solo acepte respuestas exactamente correctas — no aproximaciones</li>
                <li>No repita las preguntas ni dé pistas</li>
                <li>No acepte respuestas con ayuda de familiares</li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Si el nivel de consciencia impide responder verbalmente, intente comunicación escrita. Afasia severa sin ninguna comunicación posible = puntúe 2. No puntúe 2 solo por disartria si la respuesta intenta ser correcta.</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Autocorrección válida: "tengo… no, 65 años" = correcto. El ítem mide orientación, no velocidad de respuesta. El paciente intubado que puede escribir se evalúa normalmente.</p>
            </div>`
    },
    locC: {
        title: '1c. Órdenes Motoras',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li>Orden 1: <em>"Abra y cierre los ojos"</em></li>
                <li>Orden 2: <em>"Abra y cierre la mano no parética"</em></li>
                <li>Repita cada orden solo una vez</li>
                <li>Evalúe si realiza el esfuerzo aunque no complete la acción</li>
                <li>Alternativa si hay trauma en mano: <em>"Levante la pierna"</em></li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">En estuporoso: dé la orden en voz muy alta y repita una vez. En coma profundo sin respuesta a estímulos: marque 2 directamente. No se deben realizar gestos demostrativos (si lo imita, puntúe como no realizado).</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">El esfuerzo visible cuenta aunque no complete la acción. Un intento fallido = realizó una tarea (puntúa 1). Solo la ausencia total de intento en ambas = 2.</p>
            </div>`
    },
    gaze: {
        title: '2. Mirada Conjugada',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li>Pida al paciente que siga su dedo con la mirada</li>
                <li>Mueva su dedo horizontalmente de lado a lado lentamente</li>
                <li>Observe si ambos ojos se mueven conjugados y alcanzan excursión completa</li>
                <li>Observe si hay desviación tónica de la mirada en reposo</li>
                <li>Evalúe si la paresia puede superarse voluntariamente</li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Use la maniobra oculocefálica (ojos de muñeca): gire la cabeza bruscamente hacia un lado — los ojos deben desviarse en sentido contrario si el reflejo es normal. Contraindicado si hay sospecha de trauma cervical.</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Desviación conjugada <strong>hacia</strong> la lesión = hemisférica. Desviación <strong>contraria</strong> a la lesión = tallo cerebral. Paresia que el paciente puede superar = puntúa 1, no 2.</p>
            </div>`
    },
    visual: {
        title: '3. Campos Visuales',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li>Posiciónese frente al paciente a aproximadamente 1 metro</li>
                <li>Pida que mire fijamente a sus ojos durante toda la prueba</li>
                <li>Presente 1-2 dedos simultáneamente en los 4 cuadrantes visuales</li>
                <li>Pregunte: <em>"¿Cuántos dedos ve de cada lado?"</em></li>
                <li>Repita en diferentes cuadrantes para confirmar</li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Use la amenaza visual: aproxime su mano bruscamente al ojo del paciente desde cada cuadrante. El parpadeo indica campo visual intacto en esa zona. Ausencia de parpadeo ante amenaza = déficit en ese cuadrante.</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Hemianopsia bilateral (puntúa 3) es rara en ACV; sugiere lesión de corteza visual bilateral o tallo cerebral. Cuadrantanopsia superior = lesión temporal; inferior = lesión parietal.</p>
            </div>`
    },
    facial: {
        title: '4. Parálisis Facial',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li>Observe la simetría facial en reposo</li>
                <li>Pida que muestre los dientes o sonría ampliamente</li>
                <li>Pida que cierre los ojos con fuerza (compare la resistencia al abrirlos)</li>
                <li>Observe asimetría del surco nasogeniano y comisura labial</li>
                <li>Observe si puede elevar ambas cejas simétricamente</li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Aplique estímulo doloroso (presión supraorbitaria o lecho ungueal) y observe asimetría en la mueca de dolor. La hemicara que no se contrae al estímulo = lado parético.</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;"><strong>Central (ACV):</strong> respeta el tercio superior (puede arrugar el ceño), afecta mitad inferior. <strong>Periférica (Bell):</strong> afecta toda la hemicara — no puede cerrar el ojo (signo de Bell positivo).</p>
            </div>`
    },
    motorArm: {
        title: '5a/5b. Función Motora del Brazo',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li><strong>Sentado:</strong> extienda el brazo a 90° (palma abajo)</li>
                <li><strong>Acostado:</strong> extienda el brazo a 45°</li>
                <li>Pida: <em>"Mantenga el brazo en esta posición por 10 segundos"</em></li>
                <li>Observe si cae antes de 10 segundos y con qué velocidad</li>
                <li>Evalúe ambos brazos por separado — nunca permita apoyo</li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Posicione usted el brazo pasivamente en la posición correcta y suéltelo. Observe si mantiene, cae lentamente o cae de inmediato. Cualquier resistencia visible aunque sea mínima = puntúa 3, no 4.</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Amputación o fusión articular = marque 9 (no evaluable) y documente el motivo. El ítem mide fuerza antigravitacional, no motricidad fina. Evalúe siempre ambos lados aunque uno sea normal.</p>
            </div>`
    },
    motorLeg: {
        title: '6a/6b. Función Motora de la Pierna',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li>Paciente en decúbito supino</li>
                <li>Pida: <em>"Levante la pierna a 30° del nivel de la cama"</em></li>
                <li>Tiempo de sostén: <strong>5 segundos</strong> (diferente al brazo)</li>
                <li>Observe si cae antes y con qué velocidad</li>
                <li>Evalúe ambas piernas por separado</li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Posicione usted la pierna a 30° y suéltela. Con dolor lumbar: ayude a posicionar y evalúe el esfuerzo de mantención. Mismos criterios que el brazo: esfuerzo mínimo visible = 3, ningún movimiento = 4.</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">⚠️ El tiempo es <strong>5 segundos</strong>, no 10 como el brazo. La diferencia entre 3 y 4 es clave: cualquier resistencia mínima = 3; ningún movimiento en absoluto = 4.</p>
            </div>`
    },
    ataxia: {
        title: '7. Ataxia de Extremidades',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li><strong>Índice-nariz:</strong> pida que toque su nariz y luego el dedo del examinador alternadamente (varias veces rápido)</li>
                <li><strong>Talón-rodilla:</strong> pida que deslice el talón de una pierna por la espinilla de la otra</li>
                <li>Observe dismetría (error en distancia) y temblor intencional</li>
                <li>Evalúe ambos lados</li>
                <li>La ataxia debe ser <strong>desproporcionada</strong> a la debilidad presente</li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Si la alteración de consciencia impide seguir instrucciones o si hay parálisis que impide el movimiento: puntúe 0 (no se puede evaluar ataxia). No puntúe ataxia en una extremidad pléjica.</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Si el motor del brazo puntúa 3-4, no puede evaluarse ataxia en ese brazo — la paresia explica el déficit. Ataxia verdadera sugiere lesión cerebelosa o de vías espinocerebelosas (ACV de fosa posterior).</p>
            </div>`
    },
    sensory: {
        title: '8. Sensibilidad',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li>Use un objeto punzante (alfiler estéril, punta de lapicero o palillo)</li>
                <li>Toque cara, brazo, tronco y pierna en ambos lados</li>
                <li>Compare lado derecho vs izquierdo</li>
                <li>Pregunte: <em>"¿Siente esto igual en ambos lados?"</em></li>
                <li>Pruebe con ojos cerrados para evitar sesgos visuales</li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Aplique estímulo doloroso bilateral (pinchazo en brazo o pierna de cada lado). Observe asimetría en la mueca facial de dolor o en la retirada de la extremidad. Ausencia de reacción unilateral = pérdida severa (puntúa 2).</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Solo puntúe déficit claro que afecte cara + brazo + pierna (hemianestesia). Pérdida aislada de un segmento puede ser previa o artefactual. Paciente afásico grave que no reacciona al dolor = puntúe 2.</p>
            </div>`
    },
    language: {
        title: '9. Mejor Lenguaje (Afasia)',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li><strong>Fluidez:</strong> pida que describa lo que ve en una imagen o su día</li>
                <li><strong>Denominación:</strong> muestre objetos: reloj, lápiz, llave — <em>"¿Qué es esto?"</em></li>
                <li><strong>Comprensión:</strong> órdenes simples y complejas (<em>"Señale el techo, luego la puerta"</em>)</li>
                <li><strong>Lectura:</strong> entregue papel con "Cierre los ojos"</li>
                <li><strong>Repetición:</strong> <em>"Ni sí, ni no, ni pero"</em></li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Si no hay respuesta verbal ni intento comunicativo y no sigue órdenes = puntúe 3 (mutismo). No confunda disartria (articulación defectuosa) con afasia (problema del lenguaje en sí). Use comunicación escrita si la disartria impide la expresión oral.</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;"><strong>Broca:</strong> comprende, habla telegráfico, se frustra. <strong>Wernicke:</strong> habla fluido e incoherente, no comprende. <strong>Global:</strong> no comprende ni habla. Broca = frontal dominante; Wernicke = temporal dominante.</p>
            </div>`
    },
    dysarthria: {
        title: '10. Disartria',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li>Pida que repita palabras: <em>"Artillería"</em>, <em>"Transmisor"</em>, <em>"Caballero"</em></li>
                <li>Pida que repita frases: <em>"Me gustaría ir de compras mañana"</em></li>
                <li>Observe claridad de articulación, <strong>no el contenido</strong></li>
                <li>Inteligible pero con esfuerzo visible = leve-moderada (puntúa 1)</li>
                <li>Ininteligible o ausencia de producción verbal = severa (puntúa 2)</li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Si el nivel de consciencia impide la cooperación: observe si produce vocalizaciones. Vocalización incomprensible que no corresponde a confusión = disartria severa (puntúa 2). Paciente intubado: marque 9 (no evaluable).</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;"><strong>Disartria:</strong> problema de la musculatura articulatoria (labios, lengua, paladar). <strong>Afasia:</strong> problema del lenguaje como función cortical. Un paciente afásico puede tener articulación perfectamente normal.</p>
            </div>`
    },
    extinction: {
        title: '11. Extinción e Inatención',
        content: `
            <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 8px;">Pasos de exploración</p>
            <ol style="margin:0 0 14px;padding-left:20px;font-size:13px;color:var(--text-secondary);line-height:1.9;">
                <li><strong>Táctil:</strong> toque simultáneamente ambas manos — <em>"¿Dónde lo toqué?"</em></li>
                <li><strong>Visual:</strong> presente dedos simultáneamente en ambos campos visuales</li>
                <li><strong>Auditivo:</strong> chasquee los dedos a ambos lados de la cabeza</li>
                <li>Observe si ignora sistemáticamente estímulos de un lado cuando son bilaterales</li>
                <li>Evalúe si el paciente reconoce su extremidad parética</li>
            </ol>
            <div style="background:#7c3aed11;border-left:3px solid #7c3aed;padding:10px 12px;border-radius:0 6px 6px 0;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">🧠 Paciente con consciencia alterada</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Observe si gira los ojos/cabeza hacia estímulos de un solo lado e ignora el otro. Evalúe si interactúa con personas a ambos lados de la cama o solo a uno. La estimulación auditiva (chasquidos) es útil en pacientes con bajo nivel de respuesta.</p>
            </div>
            <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:10px 12px;border-radius:0 6px 6px 0;">
                <p style="font-size:12px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">Heminegligencia sugiere lesión del hemisferio no dominante (derecho en el 90%). Un paciente puede ver cada campo visual perfectamente por separado, pero ignorar el izquierdo en estimulación bilateral simultánea (extinción). Indica peor pronóstico funcional y rehabilitación más compleja.</p>
            </div>`
    }
};

function showNIHSSHelp(key) {
    const h = NIHSS_HELP[key];
    if (!h) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.6);
        display:flex;align-items:flex-start;justify-content:center;z-index:10000;
        backdrop-filter:blur(4px);padding:20px;animation:fadeIn 0.2s ease;overflow-y:auto;`;

    overlay.innerHTML = `
        <div style="background:var(--bg-card);border-radius:var(--radius-xl);padding:24px;
                    max-width:520px;width:100%;margin:auto;box-shadow:var(--shadow-xl);
                    animation:scaleIn 0.3s ease;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
                <h3 style="font-size:16px;font-weight:700;color:var(--text-primary);margin:0;padding-right:12px;">
                    🔍 ${h.title}
                </h3>
                <button onclick="this.closest('.nihss-help-overlay').remove()"
                        style="background:var(--bg-secondary);border:none;width:32px;height:32px;
                               border-radius:8px;cursor:pointer;font-size:18px;flex-shrink:0;
                               display:flex;align-items:center;justify-content:center;color:var(--text-secondary);">✕</button>
            </div>
            ${h.content}
        </div>`;

    overlay.classList.add('nihss-help-overlay');
    overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);
}

function createNIHSSForm() {
    const select = (id, options) => `
        <select id="${id}" class="form-input" style="margin-bottom: 0;">
            ${options.map((o, i) => `<option value="${i}">${i} – ${o}</option>`).join('')}
        </select>`;

    const item = (label, id, options, helpKey) => `
        <div style="margin-bottom: 14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <label style="font-weight:600;font-size:13px;color:var(--text-primary);">${label}</label>
                ${helpKey ? `<button type="button" onclick="showNIHSSHelp('${helpKey}')"
                    style="font-size:11px;background:#3b82f611;border:1px solid #3b82f644;color:#3b82f6;
                           padding:3px 10px;border-radius:12px;cursor:pointer;font-weight:600;
                           white-space:nowrap;flex-shrink:0;">
                    🔍 ¿Cómo explorar?
                </button>` : ''}
            </div>
            ${select(id, options)}
        </div>`;

    return `
        <form id="nihssForm" onsubmit="calculateNIHSS(event)">
            <div class="alert-box" style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #1e3a8a; margin: 0;">
                    <strong>ℹ️ Nota:</strong> NIHSS evalúa la severidad del ACV isquémico. Escala validada para guiar decisión de trombolisis y trombectomía mecánica. Pulse <strong>🔍 ¿Cómo explorar?</strong> en cada ítem para ver la guía de exploración neurológica.
                </p>
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em;">Conciencia</div>
            ${item('1a. Nivel de conciencia', 'nihssLOC', ['Alerta', 'Somnoliento (estimulación menor)', 'Estuporoso (estímulo repetido)', 'Coma (sólo reflejos)'], 'loc')}
            ${item('1b. Preguntas de orientación (mes y edad)', 'nihssLOCQ', ['Ambas correctas', 'Una correcta', 'Ninguna / intubado / afásico'], 'locQ')}
            ${item('1c. Órdenes motoras (ojos y mano)', 'nihssLOCC', ['Ambas correctas', 'Una correcta', 'Ninguna'], 'locC')}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Oculomotor y Visual</div>
            ${item('2. Mirada conjugada', 'nihssGaze', ['Normal', 'Paresia parcial (puede ser superada)', 'Desviación forzada o parálisis completa'], 'gaze')}
            ${item('3. Campos visuales', 'nihssVisual', ['Sin pérdida', 'Hemianopsia parcial', 'Hemianopsia completa', 'Ceguera bilateral'], 'visual')}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Motricidad Facial</div>
            ${item('4. Parálisis facial', 'nihssFacial', ['Normal', 'Leve (borramiento surco nasogeniano)', 'Parcial (parálisis inferior)', 'Completa (hemiplejia facial)'], 'facial')}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Motor Extremidades (10 s brazo / 5 s pierna)</div>
            ${item('5a. Motor brazo izquierdo', 'nihssMAL', ['Sin caída (10 s)', 'Caída sin tocar cama', 'Algo contra gravedad', 'Sin movimiento contra gravedad', 'Sin movimiento'], 'motorArm')}
            ${item('5b. Motor brazo derecho', 'nihssMAR', ['Sin caída (10 s)', 'Caída sin tocar cama', 'Algo contra gravedad', 'Sin movimiento contra gravedad', 'Sin movimiento'], 'motorArm')}
            ${item('6a. Motor pierna izquierda', 'nihssMLegL', ['Sin caída (5 s)', 'Caída sin tocar cama', 'Algo contra gravedad', 'Sin movimiento contra gravedad', 'Sin movimiento'], 'motorLeg')}
            ${item('6b. Motor pierna derecha', 'nihssMLegR', ['Sin caída (5 s)', 'Caída sin tocar cama', 'Algo contra gravedad', 'Sin movimiento contra gravedad', 'Sin movimiento'], 'motorLeg')}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Coordinación y Sensibilidad</div>
            ${item('7. Ataxia de extremidades', 'nihssAtaxia', ['Ausente', 'En una extremidad', 'En dos extremidades'], 'ataxia')}
            ${item('8. Sensibilidad', 'nihssSensory', ['Normal', 'Pérdida leve-moderada (siente el pinchazo)', 'Pérdida severa o bilateral (no siente)'], 'sensory')}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Lenguaje y Habla</div>
            ${item('9. Mejor lenguaje', 'nihssLanguage', ['Normal', 'Afasia leve-moderada', 'Afasia severa (comunicación fragmentada)', 'Mutismo / afasia global'], 'language')}
            ${item('10. Disartria', 'nihssDysarthria', ['Normal', 'Leve-moderada (inteligible)', 'Severa (ininteligible) o intubado'], 'dysarthria')}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Inatención</div>
            ${item('11. Extinción e inatención', 'nihssExtinction', ['Normal', 'Inatención en una modalidad', 'Hemineglect severo (>1 modalidad)'], 'extinction')}

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px; margin-top: 8px;">
                🧮 Calcular NIHSS
            </button>
        </form>
        <div id="nihssResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateNIHSS(event) {
    event.preventDefault();
    const v = id => parseInt(document.getElementById(id).value);
    const inputs = {
        loc: v('nihssLOC'), locQuestions: v('nihssLOCQ'), locCommands: v('nihssLOCC'),
        gaze: v('nihssGaze'), visual: v('nihssVisual'), facial: v('nihssFacial'),
        motorArmL: v('nihssMAL'), motorArmR: v('nihssMAR'),
        motorLegL: v('nihssMLegL'), motorLegR: v('nihssMLegR'),
        ataxia: v('nihssAtaxia'), sensory: v('nihssSensory'),
        language: v('nihssLanguage'), dysarthria: v('nihssDysarthria'),
        extinction: v('nihssExtinction')
    };
    const result = Calculators.calculateNIHSS(inputs);
    displayGenericResult(result, inputs, 17, 'NIHSS', null, 'nihssResult');
    Storage.addToHistory({ calculatorId: 17, calculatorName: 'NIHSS', inputs, result, interpretation: result.interpretation });
}

// === 18. GLASGOW COMA SCALE === //
function createGlasgowForm() {
    const sel = (id, options) => `
        <select id="${id}" class="form-input" onchange="updateGlasgowTotal()">
            ${options.map((o, i) => `<option value="${i + 1}">${i + 1} – ${o}</option>`).join('')}
        </select>`;

    return `
        <form id="glasgowForm" onsubmit="calculateGlasgow(event)">

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">E — Apertura ocular</div>
            <div style="margin-bottom: 16px;">
                ${sel('gcsEyes', [
                    'Sin respuesta',
                    'Al dolor',
                    'A la voz',
                    'Espontánea'
                ])}
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">V — Respuesta verbal</div>
            <div style="margin-bottom: 16px;">
                ${sel('gcsVerbal', [
                    'Sin respuesta',
                    'Sonidos incomprensibles',
                    'Palabras inapropiadas',
                    'Confuso / desorientado',
                    'Orientado y coherente'
                ])}
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">M — Respuesta motora</div>
            <div style="margin-bottom: 20px;">
                ${sel('gcsMotor', [
                    'Sin respuesta',
                    'Extensión (descerebración)',
                    'Flexión anormal (decorticación)',
                    'Retirada al dolor',
                    'Localiza el dolor',
                    'Obedece órdenes'
                ])}
            </div>

            <div id="glasgowLiveTotal" style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px; text-align: center;">
                <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">TOTAL GCS (E+V+M)</div>
                <div id="glasgowTotalDisplay" style="font-size: 32px; font-weight: 800;">3</div>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular Glasgow
            </button>
        </form>
        <div id="glasgowResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function updateGlasgowTotal() {
    const eyes = parseInt(document.getElementById('gcsEyes')?.value || 1);
    const verbal = parseInt(document.getElementById('gcsVerbal')?.value || 1);
    const motor = parseInt(document.getElementById('gcsMotor')?.value || 1);
    const display = document.getElementById('glasgowTotalDisplay');
    if (display) display.textContent = eyes + verbal + motor;
}

function calculateGlasgow(event) {
    event.preventDefault();
    const inputs = {
        eyes: parseInt(document.getElementById('gcsEyes').value),
        verbal: parseInt(document.getElementById('gcsVerbal').value),
        motor: parseInt(document.getElementById('gcsMotor').value)
    };
    const result = Calculators.calculateGlasgow(inputs);
    const c = result.components;

    const container = document.getElementById('glasgowResult');
    container.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">GLASGOW COMA SCALE</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">
                ${result.value} <span style="font-size: 20px; font-weight: 600;">/15</span>
            </div>
            <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">${result.interpretation.label}</div>
            <div style="background: rgba(30, 56, 114, 0.15); padding: 12px; border-radius: 8px; font-size: 14px; display: flex; justify-content: space-around;">
                <span><strong>E</strong> ${c.eyes}/4</span>
                <span><strong>V</strong> ${c.verbal}/5</span>
                <span><strong>M</strong> ${c.motor}/6</span>
            </div>
        </div>
        <div class="interpretation-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); border-left: 4px solid var(--${result.interpretation.color});">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Interpretación</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">${result.interpretation.description}</p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('glasgowForm').reset(); document.getElementById('glasgowResult').style.display='none'; updateGlasgowTotal();" style="width: 100%; margin-top: 16px;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 18, calculatorName: 'Glasgow', inputs, result, interpretation: result.interpretation });
}

// === 19. TIMI UA/NSTEMI === //
function createTIMI_NSTEMIForm() {
    return `
        <form id="timiNSTEMIForm" onsubmit="calculateTIMI_NSTEMI(event)">
            <div class="alert-box" style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #92400e; margin: 0;">
                    <strong>⚠️ Uso:</strong> Angina inestable y NSTEMI. Predice muerte, IAM o revascularización urgente a 14 días.
                </p>
            </div>
            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <p style="font-size: 13px; font-weight: 600; margin-bottom: 12px;">Marque los criterios presentes (1 punto cada uno):</p>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="timiAge65" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Edad ≥65 años</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="timiRiskFactors" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">≥3 factores de riesgo de EAC (HTA, DM, dislipemia, tabaquismo, EAC familiar)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="timiKnownCAD" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">EAC conocida (estenosis coronaria ≥50%)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="timiAspirin" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Uso de AAS en los últimos 7 días</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="timiSevereAngina" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Angina severa (≥2 episodios en 24h)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="timiElevMarkers" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Marcadores cardíacos elevados (troponina o CK-MB)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="timiSTDev" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Desviación del ST ≥0.5 mm en ECG</span>
                </label>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular TIMI UA/NSTEMI
            </button>
        </form>
        <div id="timiNSTEMIResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateTIMI_NSTEMI(event) {
    event.preventDefault();
    const inputs = {
        age65:        document.getElementById('timiAge65').checked,
        riskFactors:  document.getElementById('timiRiskFactors').checked,
        knownCAD:     document.getElementById('timiKnownCAD').checked,
        aspirin:      document.getElementById('timiAspirin').checked,
        severeAngina: document.getElementById('timiSevereAngina').checked,
        elevMarkers:  document.getElementById('timiElevMarkers').checked,
        stDeviation:  document.getElementById('timiSTDev').checked
    };
    const result = Calculators.calculateTIMI_NSTEMI(inputs);
    displayGenericResult(result, inputs, 19, 'TIMI UA/NSTEMI', null, 'timiNSTEMIResult');
    Storage.addToHistory({ calculatorId: 19, calculatorName: 'TIMI UA/NSTEMI', inputs, result, interpretation: result.interpretation });
}

// === 20. TIMI STEMI === //
function createTIMI_STEMIForm() {
    const units = Storage.getSettings().units;
    return `
        <form id="timiSTEMIForm" onsubmit="calculateTIMI_STEMI(event)">
            <div class="alert-box" style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #7f1d1d; margin: 0;">
                    <strong>🚨 Uso:</strong> IAMCEST. Predice mortalidad a 30 días para guiar intensidad del tratamiento.
                </p>
            </div>

            <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div>
                    <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Edad (años)</label>
                    <input type="number" id="timiSAge" required min="18" max="120" class="form-input">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Peso (${units.weight})</label>
                    <input type="number" id="timiSWeight" required step="any" min="30" max="300" class="form-input">
                </div>
            </div>

            <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div>
                    <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">PAS (mmHg)</label>
                    <input type="number" id="timiSSBP" required min="40" max="250" class="form-input">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">FC (lpm)</label>
                    <input type="number" id="timiSHR" required min="20" max="250" class="form-input">
                </div>
            </div>

            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <p style="font-size: 13px; font-weight: 600; margin-bottom: 12px;">Factores adicionales:</p>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="timiSRiskHx" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">DM / HTA / angina previa (1 pt)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="timiSKillip" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Killip ≥II — signos de insuficiencia cardíaca (2 pts)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="timiSAnteriorST" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Elevación ST anterior o bloqueo de rama izquierda (1 pt)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="timiSTimeLate" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Tiempo a tratamiento >4 horas (1 pt)</span>
                </label>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular TIMI STEMI
            </button>
        </form>
        <div id="timiSTEMIResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateTIMI_STEMI(event) {
    event.preventDefault();
    const inputs = {
        age:          parseInt(document.getElementById('timiSAge').value),
        sbp:          parseInt(document.getElementById('timiSSBP').value),
        hr:           parseInt(document.getElementById('timiSHR').value),
        weight:       parseFloat(document.getElementById('timiSWeight').value),
        riskHistory:  document.getElementById('timiSRiskHx').checked,
        killip2plus:  document.getElementById('timiSKillip').checked,
        anteriorST:   document.getElementById('timiSAnteriorST').checked,
        timeLate:     document.getElementById('timiSTimeLate').checked
    };
    const result = Calculators.calculateTIMI_STEMI(inputs);
    displayGenericResult(result, inputs, 20, 'TIMI STEMI', null, 'timiSTEMIResult');
    Storage.addToHistory({ calculatorId: 20, calculatorName: 'TIMI STEMI', inputs, result, interpretation: result.interpretation });
}

// === 21. GRACE SCORE === //
function createGRACEForm() {
    const units = Storage.getSettings().units;
    const crMax = units.creatinine === 'mg/dL' ? 15 : 1326;
    return `
        <form id="graceForm" onsubmit="calculateGRACE(event)">
            <div class="alert-box" style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #1e3a8a; margin: 0;">
                    <strong>ℹ️ Uso:</strong> Síndrome coronario agudo (STEMI y NSTEMI). Predice mortalidad intrahospitalaria.
                </p>
            </div>

            <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div>
                    <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Edad (años)</label>
                    <input type="number" id="graceAge" required min="18" max="120" class="form-input">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">FC (lpm)</label>
                    <input type="number" id="graceHR" required min="20" max="250" class="form-input">
                </div>
            </div>

            <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div>
                    <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">PAS (mmHg)</label>
                    <input type="number" id="graceSBP" required min="40" max="250" class="form-input">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Creatinina (${units.creatinine})</label>
                    <input type="number" id="graceCr" required step="any" min="0.1" max="${crMax}" class="form-input">
                </div>
            </div>

            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 14px;">Clase Killip</label>
                <select id="graceKillip" required class="form-input">
                    <option value="1">Killip I — Sin signos de IC</option>
                    <option value="2">Killip II — Crepitantes, S3 o ingurgitación yugular</option>
                    <option value="3">Killip III — Edema agudo de pulmón</option>
                    <option value="4">Killip IV — Shock cardiogénico</option>
                </select>
            </div>

            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <p style="font-size: 13px; font-weight: 600; margin-bottom: 12px;">Variables adicionales:</p>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="graceArrest" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">PCR al ingreso (43 pts)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="graceSTDev" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Desviación del ST en ECG (30 pts)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="graceMarkers" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Marcadores cardíacos elevados (15 pts)</span>
                </label>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular GRACE Score
            </button>
        </form>
        <div id="graceResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateGRACE(event) {
    event.preventDefault();
    const inputs = {
        age:           parseInt(document.getElementById('graceAge').value),
        hr:            parseInt(document.getElementById('graceHR').value),
        sbp:           parseInt(document.getElementById('graceSBP').value),
        creatinine:    parseFloat(document.getElementById('graceCr').value),
        killip:        document.getElementById('graceKillip').value,
        cardiacArrest: document.getElementById('graceArrest').checked,
        stDeviation:   document.getElementById('graceSTDev').checked,
        elevMarkers:   document.getElementById('graceMarkers').checked
    };
    const result = Calculators.calculateGRACE(inputs);
    const c = result.components;

    const ptRow = (label, pts) => pts > 0 ? `
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.07); font-size: 13px;">
            <span style="color: var(--text-secondary);">${label}</span>
            <span style="font-weight: 700;">+${pts}</span>
        </div>` : '';

    const container = document.getElementById('graceResult');
    container.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">GRACE SCORE</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">
                ${result.value} <span style="font-size: 20px; font-weight: 600;">${result.unit}</span>
            </div>
            <div style="font-size: 14px; font-weight: 600;">${result.interpretation.label}</div>
        </div>
        <div style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); margin-bottom: 16px;">
            <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Desglose de puntos</h4>
            ${ptRow('Edad', c.agePoints)}
            ${ptRow('Frecuencia cardíaca', c.hrPoints)}
            ${ptRow('Presión arterial sistólica', c.sbpPoints)}
            ${ptRow('Creatinina', c.crPoints)}
            ${ptRow('Clase Killip', c.killipPoints)}
            ${ptRow('PCR al ingreso', c.arrestPoints)}
            ${ptRow('Desviación del ST', c.stPoints)}
            ${ptRow('Marcadores elevados', c.markerPoints)}
        </div>
        <div class="interpretation-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); border-left: 4px solid var(--${result.interpretation.color});">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Interpretación</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">${result.interpretation.description}</p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('graceForm').reset(); document.getElementById('graceResult').style.display='none';" style="width: 100%; margin-top: 16px;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 21, calculatorName: 'GRACE', inputs, result, interpretation: result.interpretation });
}

// === 22. ESCALA DE BRADEN === //
function createBradenForm() {
    const sel = (id, label, options, maxVal) => {
        const opts = options.map((o, i) => {
            const val = i + 1;
            return `<option value="${val}">${val} – ${o}</option>`;
        }).join('');
        return `
        <div style="margin-bottom: 14px;">
            <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px;">${label} <span style="font-weight: 400; color: var(--text-secondary);">(1–${maxVal})</span></label>
            <select id="${id}" class="form-input" onchange="updateBradenTotal()" style="margin-bottom: 0;">
                ${opts}
            </select>
        </div>`;
    };

    return `
        <form id="bradenForm" onsubmit="calculateBraden(event)">
            <div class="alert-box" style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #14532d; margin: 0;">
                    <strong>ℹ️ Nota:</strong> Puntuación más baja = mayor riesgo. Total 6–23. Valorar al ingreso y cada 24-48h.
                </p>
            </div>

            ${sel('bradenSensory', 'Percepción sensorial', [
                'Sin respuesta (no reacciona a estímulos dolorosos)',
                'Muy limitada (responde solo al dolor, no comunica malestar)',
                'Levemente limitada (responde a órdenes verbales, puede comunicar)',
                'Sin limitación (responde, sin déficit sensorial)'
            ], 4)}

            ${sel('bradenMoisture', 'Humedad de la piel', [
                'Constantemente húmedo (pañal/ropa siempre empapados)',
                'Muy húmedo (cambios frecuentes, al menos 1 vez por turno)',
                'Ocasionalmente húmedo (cambio extra ~1/día)',
                'Raramente húmedo (piel seca, cambio rutinario)'
            ], 4)}

            ${sel('bradenActivity', 'Actividad', [
                'Encamado (confinado en cama)',
                'En silla (capacidad de caminar muy limitada o nula)',
                'Camina ocasionalmente (distancias muy cortas, con ayuda)',
                'Camina frecuentemente (fuera de la habitación ≥2 veces/día)'
            ], 4)}

            ${sel('bradenMobility', 'Movilidad', [
                'Completamente inmóvil (no puede cambiar posición sin ayuda)',
                'Muy limitada (cambios ligeros y ocasionales de posición)',
                'Ligeramente limitada (cambios frecuentes pero con poca fuerza)',
                'Sin limitación (cambia de posición frecuentemente sin ayuda)'
            ], 4)}

            ${sel('bradenNutrition', 'Nutrición', [
                'Muy pobre (nunca come completo, escasa ingesta de líquidos)',
                'Probablemente inadecuada (raramente come >½ ración)',
                'Adecuada (come >½ de comidas, con suplementos si precisa)',
                'Excelente (come siempre completo, nunca rechaza comida)'
            ], 4)}

            ${sel('bradenFriction', 'Fricción y cizallamiento', [
                'Problema (requiere asistencia máxima, se desliza constantemente)',
                'Problema potencial (se mueve con algo de asistencia, algo de fricción)',
                'Sin problema aparente (se mueve independientemente, sin fricción)'
            ], 3)}

            <div id="bradenLiveTotal" style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px; text-align: center;">
                <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">TOTAL BRADEN</div>
                <div id="bradenTotalDisplay" style="font-size: 32px; font-weight: 800;">6</div>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular Escala de Braden
            </button>
        </form>
        <div id="bradenResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function updateBradenTotal() {
    const ids = ['bradenSensory','bradenMoisture','bradenActivity','bradenMobility','bradenNutrition','bradenFriction'];
    const total = ids.reduce((sum, id) => {
        const el = document.getElementById(id);
        return sum + (el ? parseInt(el.value) : 1);
    }, 0);
    const display = document.getElementById('bradenTotalDisplay');
    if (display) display.textContent = total;
}

function calculateBraden(event) {
    event.preventDefault();
    const inputs = {
        sensory:   parseInt(document.getElementById('bradenSensory').value),
        moisture:  parseInt(document.getElementById('bradenMoisture').value),
        activity:  parseInt(document.getElementById('bradenActivity').value),
        mobility:  parseInt(document.getElementById('bradenMobility').value),
        nutrition: parseInt(document.getElementById('bradenNutrition').value),
        friction:  parseInt(document.getElementById('bradenFriction').value)
    };
    const result = Calculators.calculateBraden(inputs);
    const c = result.components;

    const labels = [
        ['Percepción sensorial', c.sensory, 4],
        ['Humedad',              c.moisture, 4],
        ['Actividad',            c.activity, 4],
        ['Movilidad',            c.mobility, 4],
        ['Nutrición',            c.nutrition, 4],
        ['Fricción/cizalla',     c.friction, 3]
    ];

    const barRow = ([label, val, max]) => {
        const pct = (val / max) * 100;
        const color = pct <= 25 ? '#ef4444' : pct <= 50 ? '#f97316' : pct <= 75 ? '#f59e0b' : '#22c55e';
        return `<div style="margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 3px;">
                <span style="color: var(--text-secondary);">${label}</span>
                <span style="font-weight: 700;">${val}/${max}</span>
            </div>
            <div style="background: rgba(255,255,255,0.1); border-radius: 4px; height: 6px;">
                <div style="background: ${color}; width: ${pct}%; height: 100%; border-radius: 4px;"></div>
            </div>
        </div>`;
    };

    const container = document.getElementById('bradenResult');
    container.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">ESCALA DE BRADEN</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">
                ${result.value} <span style="font-size: 20px; font-weight: 600;">/23</span>
            </div>
            <div style="font-size: 14px; font-weight: 600;">${result.interpretation.label}</div>
        </div>
        <div style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); margin-bottom: 16px;">
            <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Puntuación por subescala</h4>
            ${labels.map(barRow).join('')}
        </div>
        <div class="interpretation-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); border-left: 4px solid var(--${result.interpretation.color});">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Interpretación</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">${result.interpretation.description}</p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('bradenForm').reset(); document.getElementById('bradenResult').style.display='none'; updateBradenTotal();" style="width: 100%; margin-top: 16px;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 22, calculatorName: 'Braden', inputs, result, interpretation: result.interpretation });
}

// === 23. MACOCHA SCORE === //
function createMACOCHAForm() {
    return `
        <form id="macochаForm" onsubmit="calculateMAOCHA(event)">
            <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #1e3a8a; margin: 0;">
                    <strong>ℹ️ MACOCHA Score</strong> — Predice intubación difícil en UCI/Emergencias. Score ≥4 indica alto riesgo (tasa de fallo >90%). <em>De Jong et al., AJRCCM 2013.</em>
                </p>
            </div>

            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <p style="font-size: 13px; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary);">Criterios (marcar los presentes)</p>

                <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; cursor: pointer;">
                    <input type="checkbox" id="macMallampati" style="width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0;">
                    <span style="font-size: 14px;"><strong>Mallampati clase III o IV</strong> <span style="color: var(--brand-accent); font-weight: 700;">+5 pts</span><br><span style="font-size: 12px; color: var(--text-secondary);">Solo visible paladar blando o úvula / no visible paladar blando</span></span>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; cursor: pointer;">
                    <input type="checkbox" id="macOSA" style="width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0;">
                    <span style="font-size: 14px;"><strong>Apnea obstructiva del sueño</strong> <span style="color: var(--brand-accent); font-weight: 700;">+2 pts</span></span>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; cursor: pointer;">
                    <input type="checkbox" id="macCervical" style="width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0;">
                    <span style="font-size: 14px;"><strong>Limitación de columna cervical</strong> <span style="font-weight: 700;">+1 pt</span><br><span style="font-size: 12px; color: var(--text-secondary);">Incapacidad de flexionar/extender el cuello</span></span>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; cursor: pointer;">
                    <input type="checkbox" id="macOpening" style="width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0;">
                    <span style="font-size: 14px;"><strong>Apertura oral &lt;3 cm</strong> <span style="font-weight: 700;">+1 pt</span></span>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; cursor: pointer;">
                    <input type="checkbox" id="macComa" style="width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0;">
                    <span style="font-size: 14px;"><strong>Coma (GCS &lt;8)</strong> <span style="font-weight: 700;">+1 pt</span></span>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; cursor: pointer;">
                    <input type="checkbox" id="macHypoxemia" style="width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0;">
                    <span style="font-size: 14px;"><strong>Hipoxemia grave (SpO₂ &lt;80% pre-intubación)</strong> <span style="font-weight: 700;">+1 pt</span></span>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="macNonAnest" style="width: 18px; height: 18px; margin-top: 2px; flex-shrink: 0;">
                    <span style="font-size: 14px;"><strong>Operador no anestesiólogo</strong> <span style="font-weight: 700;">+1 pt</span></span>
                </label>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular MACOCHA
            </button>
        </form>
        <div id="macochаResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateMAOCHA(event) {
    event.preventDefault();
    const inputs = {
        mallampati: document.getElementById('macMallampati').checked,
        osa:        document.getElementById('macOSA').checked,
        cervical:   document.getElementById('macCervical').checked,
        opening:    document.getElementById('macOpening').checked,
        coma:       document.getElementById('macComa').checked,
        hypoxemia:  document.getElementById('macHypoxemia').checked,
        nonAnest:   document.getElementById('macNonAnest').checked
    };
    const result = Calculators.calculateMAOCHA(inputs);
    displayGenericResult(result, inputs, 23, 'MACOCHA Score', null, 'macochаResult');
    Storage.addToHistory({ calculatorId: 23, calculatorName: 'MACOCHA Score', inputs, result, interpretation: result.interpretation });
}

// === 24. PBW + VOLUMEN TIDAL === //
function createPBWForm() {
    const units = Storage.getSettings().units;
    const hUnit = units.height || 'cm';
    return `
        <form id="pbwForm" onsubmit="calculatePBW(event)">
            <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #1e3a8a; margin: 0;">
                    <strong>ℹ️ ARDSNet</strong> — El volumen tidal se calcula sobre el <strong>peso corporal predicho (PBW)</strong>, no el peso real. Solo se necesita la talla. <em>NEJM 2000.</em>
                </p>
            </div>

            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Sexo biológico</label>
                <select id="pbwSex" required class="form-input">
                    <option value="male">Hombre</option>
                    <option value="female">Mujer</option>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Talla (${hUnit})</label>
                <input type="number" id="pbwHeight" required step="any" min="100" max="220" class="form-input" placeholder="Puede estimarse visualmente">
            </div>

            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Contexto clínico</label>
                <select id="pbwMode" required class="form-input">
                    <option value="ards">ARDS / Pulmón lesionado → TV 6 mL/kg PBW</option>
                    <option value="normal">Sin ARDS / Pulmón normal → TV 8 mL/kg PBW</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular PBW y Volumen Tidal
            </button>
        </form>
        <div id="pbwResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculatePBW(event) {
    event.preventDefault();
    const inputs = {
        sex:    document.getElementById('pbwSex').value,
        height: parseFloat(document.getElementById('pbwHeight').value),
        mode:   document.getElementById('pbwMode').value
    };
    const result = Calculators.calculatePBW(inputs);
    const targetTV = inputs.mode === 'ards' ? result.tv6 : result.tv8;
    const targetLabel = inputs.mode === 'ards' ? '6 mL/kg (ARDS)' : '8 mL/kg (estándar)';

    const row = (label, value, highlight) => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-color);">
            <span style="font-size: 13px; color: var(--text-secondary);">${label}</span>
            <span style="font-size: 15px; font-weight: ${highlight ? '800' : '600'}; color: ${highlight ? 'var(--brand-accent)' : 'var(--text-primary)'};">${value}</span>
        </div>`;

    const container = document.getElementById('pbwResult');
    container.innerHTML = `
        <div style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">PESO CORPORAL PREDICHO (PBW)</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">${result.value} <span style="font-size: 20px; font-weight: 600;">kg</span></div>
            <div style="font-size: 14px; font-weight: 600;">Vol. tidal objetivo: ${targetTV} mL</div>
        </div>
        <div style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); margin-bottom: 16px;">
            <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em;">Volúmenes tidales</h4>
            ${row('4 mL/kg PBW — ARDS severo', result.tv4 + ' mL', false)}
            ${row('6 mL/kg PBW — ARDS / protector ✓', result.tv6 + ' mL', inputs.mode === 'ards')}
            ${row('8 mL/kg PBW — Sin ARDS ✓', result.tv8 + ' mL', inputs.mode === 'normal')}
        </div>
        <div style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); margin-bottom: 16px;">
            <h4 style="font-size: 13px; font-weight: 700; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em;">Parámetros de ventilación</h4>
            ${row('Frecuencia respiratoria', '12 – 20 rpm', false)}
            ${row('Presión plateau máxima', '< 30 cmH₂O', false)}
            ${row('PEEP mínimo', '≥ 5 cmH₂O', false)}
        </div>
        <div style="background: var(--bg-secondary); padding: 16px; border-radius: var(--radius-lg); border-left: 4px solid var(--info, #3b82f6); margin-bottom: 16px;">
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin: 0;">${result.interpretation.description}</p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('pbwForm').reset(); document.getElementById('pbwResult').style.display='none';" style="width: 100%; margin-top: 0;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 24, calculatorName: 'PBW / Vol. Tidal', inputs, result, interpretation: result.interpretation });
}

// === 25. FOUR SCORE === //
function createFOURScoreForm() {
    const sel = (id, options) => `
        <select id="${id}" class="form-input" onchange="updateFOURTotal()">
            ${options.map((o, i) => `<option value="${i}">${i} – ${o}</option>`).reverse().join('')}
        </select>`;

    return `
        <form id="fourScoreForm" onsubmit="calculateFOURScore(event)">
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #92400e; margin: 0;">
                    <strong>⚠️ Para pacientes intubados</strong> — El FOUR Score reemplaza al Glasgow cuando la respuesta verbal no puede evaluarse. <em>Wijdicks et al., Mayo Clin Proc 2005.</em>
                </p>
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">E — Apertura ocular</div>
            <div style="margin-bottom: 16px;">
                ${sel('fourEyes', [
                    'Párpados cerrados al dolor',
                    'Párpados cerrados, abren al dolor',
                    'Párpados cerrados, abren a la voz',
                    'Abiertos pero sin seguimiento',
                    'Abiertos o abiertos, con seguimiento o parpadeo a la orden'
                ])}
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">M — Respuesta motora</div>
            <div style="margin-bottom: 16px;">
                ${sel('fourMotor', [
                    'Sin respuesta o mioclonías generalizadas',
                    'Extensión al dolor (descerebración)',
                    'Flexión al dolor (decorticación)',
                    'Localiza el dolor',
                    'Obedece a la orden (pulgar arriba / puño / señal de paz)'
                ])}
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">B — Reflejos de tronco encefálico</div>
            <div style="margin-bottom: 16px;">
                ${sel('fourBrainstem', [
                    'Ausencia de reflejos pupilares, corneales y tusígeno',
                    'Reflejos pupilares Y corneales ausentes',
                    'Reflejo pupilar O corneal ausente',
                    'Una pupila dilatada y fija',
                    'Reflejos pupilares y corneales presentes'
                ])}
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">R — Respiración</div>
            <div style="margin-bottom: 20px;">
                ${sel('fourResp', [
                    'Apnea o respira a la frecuencia del ventilador (intubado)',
                    'Respira por encima del ventilador (intubado)',
                    'Respiración irregular (no intubado)',
                    'Patrón de Cheyne-Stokes (no intubado)',
                    'Patrón regular (no intubado)'
                ])}
            </div>

            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px; text-align: center;">
                <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 4px;">TOTAL FOUR SCORE (E+M+B+R)</div>
                <div id="fourTotalDisplay" style="font-size: 32px; font-weight: 800;">0</div>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular FOUR Score
            </button>
        </form>
        <div id="fourScoreResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function updateFOURTotal() {
    const eyes      = parseInt(document.getElementById('fourEyes')?.value || 0);
    const motor     = parseInt(document.getElementById('fourMotor')?.value || 0);
    const brainstem = parseInt(document.getElementById('fourBrainstem')?.value || 0);
    const resp      = parseInt(document.getElementById('fourResp')?.value || 0);
    const display   = document.getElementById('fourTotalDisplay');
    if (display) display.textContent = eyes + motor + brainstem + resp;
}

function calculateFOURScore(event) {
    event.preventDefault();
    const inputs = {
        eyes:        parseInt(document.getElementById('fourEyes').value),
        motor:       parseInt(document.getElementById('fourMotor').value),
        brainstem:   parseInt(document.getElementById('fourBrainstem').value),
        respiration: parseInt(document.getElementById('fourResp').value)
    };
    const result = Calculators.calculateFOURScore(inputs);
    const c = result.components;
    const colorMap = { success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)', info: '#3b82f6' };

    const container = document.getElementById('fourScoreResult');
    container.innerHTML = `
        <div style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">FOUR SCORE</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">
                ${result.value} <span style="font-size: 20px; font-weight: 500;">/16</span>
            </div>
            <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">${result.interpretation.label}</div>
            <div style="background: rgba(30,56,114,0.15); padding: 12px; border-radius: 8px; font-size: 14px; display: flex; justify-content: space-around;">
                <span><strong>E</strong> ${c.eyes}/4</span>
                <span><strong>M</strong> ${c.motor}/4</span>
                <span><strong>B</strong> ${c.brainstem}/4</span>
                <span><strong>R</strong> ${c.respiration}/4</span>
            </div>
        </div>
        <div style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); border-left: 4px solid ${colorMap[result.interpretation.color] || 'var(--brand-accent)'}; margin-bottom: 16px;">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Interpretación</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">${result.interpretation.description}</p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('fourScoreForm').reset(); document.getElementById('fourScoreResult').style.display='none'; updateFOURTotal();" style="width: 100%; margin-top: 0;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 25, calculatorName: 'FOUR Score', inputs, result, interpretation: result.interpretation });
}

// === 26. HEART SCORE === //
function createHEARTForm() {
    const sel = (id, opts) => `
        <select id="${id}" class="form-input">
            ${opts.map((o, i) => `<option value="${i}">${i} — ${o}</option>`).join('')}
        </select>`;
    return `
        <form id="heartForm" onsubmit="calculateHEART(event)">
            <div style="background:#fef3c7; border-left:4px solid #f59e0b; padding:16px; border-radius:8px; margin-bottom:16px;">
                <p style="font-size:13px; color:#92400e; margin:0;">
                    <strong>⚠️ Uso en Urgencias</strong> — Aplicar en dolor torácico con sospecha de SCA. No usar como única herramienta diagnóstica. <em>Six AJ et al., Neth Heart J 2008.</em>
                </p>
            </div>

            <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.05em;">H — Historia</div>
            <div style="margin-bottom:16px;">
                ${sel('heartHistory', [
                    'Levemente sospechosa — no típica, inespecífica',
                    'Moderadamente sospechosa — mixta o atípica',
                    'Altamente sospechosa — típica de SCA (opresiva, irradiación, diaforesis)'
                ])}
            </div>

            <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.05em;">E — ECG</div>
            <div style="margin-bottom:16px;">
                ${sel('heartECG', [
                    'Normal',
                    'Alteración inespecífica de repolarización / BRI conocido / HVI / cambios no diagnósticos',
                    'Depresión ST significativa o elevación nueva / BRI nuevo / cambios isquémicos activos'
                ])}
            </div>

            <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.05em;">A — Edad (Age)</div>
            <div style="margin-bottom:16px;">
                ${sel('heartAge', [
                    'Menor de 45 años',
                    '45 – 64 años',
                    '65 años o mayor'
                ])}
            </div>

            <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.05em;">R — Factores de riesgo</div>
            <div style="margin-bottom:16px;">
                ${sel('heartRisk', [
                    'Sin factores de riesgo conocidos',
                    '1-2 factores (HTA, DM, dislipemia, tabaquismo, obesidad, antecedente familiar)',
                    '≥3 factores de riesgo O aterosclerosis conocida (SCA previo, stent, bypass, ACV, EAP)'
                ])}
            </div>

            <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.05em;">T — Troponina</div>
            <div style="margin-bottom:20px;">
                ${sel('heartTroponin', [
                    '≤ Límite normal del laboratorio',
                    '1-3× el límite normal',
                    '> 3× el límite normal'
                ])}
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:14px;">
                🧮 Calcular HEART Score
            </button>
        </form>
        <div id="heartResult" style="display:none; margin-top:24px;"></div>
    `;
}

function calculateHEART(event) {
    event.preventDefault();
    const inputs = {
        history:     parseInt(document.getElementById('heartHistory').value),
        ecg:         parseInt(document.getElementById('heartECG').value),
        age:         parseInt(document.getElementById('heartAge').value),
        riskFactors: parseInt(document.getElementById('heartRisk').value),
        troponin:    parseInt(document.getElementById('heartTroponin').value)
    };
    const result = Calculators.calculateHEART(inputs);
    const c = result.components;
    const colorMap = { success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)' };
    const labels = ['H', 'E', 'A', 'R', 'T'];
    const vals   = [c.history, c.ecg, c.age, c.riskFactors, c.troponin];

    const container = document.getElementById('heartResult');
    container.innerHTML = `
        <div style="background:linear-gradient(135deg,var(--brand-accent-dark),var(--brand-accent)); padding:24px; border-radius:var(--radius-lg); color:var(--brand-primary-dark); margin-bottom:16px;">
            <div style="font-size:13px; font-weight:600; margin-bottom:8px; opacity:0.8;">HEART SCORE</div>
            <div style="font-size:36px; font-weight:800; margin-bottom:4px;">
                ${result.value} <span style="font-size:20px; font-weight:500;">/10</span>
            </div>
            <div style="font-size:14px; font-weight:600; margin-bottom:12px;">${result.interpretation.label}</div>
            <div style="background:rgba(30,56,114,0.15); padding:12px; border-radius:8px; font-size:14px; display:flex; justify-content:space-around;">
                ${labels.map((l, i) => `<span><strong>${l}</strong> ${vals[i]}</span>`).join('')}
            </div>
        </div>
        <div style="background:var(--bg-secondary); padding:20px; border-radius:var(--radius-lg); border-left:4px solid ${colorMap[result.interpretation.color]}; margin-bottom:16px;">
            <h4 style="font-size:14px; font-weight:700; margin-bottom:8px;">Interpretación</h4>
            <p style="font-size:13px; color:var(--text-secondary); line-height:1.6;">${result.interpretation.description}</p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('heartForm').reset(); document.getElementById('heartResult').style.display='none';" style="width:100%; margin-top:0;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 26, calculatorName: 'HEART Score', inputs, result, interpretation: result.interpretation });
}

// === 27. REGLA PERC === //
function createPERCForm() {
    const check = (id, text) => `
        <label style="display:flex; align-items:flex-start; gap:10px; margin-bottom:12px; cursor:pointer;">
            <input type="checkbox" id="${id}" style="width:18px; height:18px; margin-top:2px; flex-shrink:0;">
            <span style="font-size:14px;">${text}</span>
        </label>`;
    return `
        <form id="percForm" onsubmit="calculatePERC(event)">
            <div style="background:#dbeafe; border-left:4px solid #3b82f6; padding:16px; border-radius:8px; margin-bottom:16px;">
                <p style="font-size:13px; color:#1e3a8a; margin:0;">
                    <strong>ℹ️ Solo en bajo riesgo pre-test</strong> — Aplicar únicamente si la probabilidad pre-test de TEP es BAJA (Wells ≤1 o Geneva bajo). Marcar los criterios que el paciente <strong>SÍ cumple</strong>. Si ninguno aplica → TEP descartado. <em>Kline JA et al., J Thromb Haemost 2004.</em>
                </p>
            </div>

            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:20px;">
                <p style="font-size:13px; font-weight:700; margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-secondary);">Marcar si está presente</p>
                ${check('percAge',     'Edad ≥ 50 años')}
                ${check('percHR',      'Frecuencia cardíaca ≥ 100 lpm')}
                ${check('percSpO2',    'SpO₂ < 95% en aire ambiente')}
                ${check('percLeg',     'Edema unilateral de miembro inferior')}
                ${check('percHemo',    'Hemoptisis')}
                ${check('percSurg',    'Cirugía o trauma en las últimas 4 semanas (con anestesia general)')}
                ${check('percVTE',     'TEP o TVP previos documentados')}
                ${check('percEstro',   'Uso de estrógenos (ACO, TRH, embarazo)')}
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:14px;">
                🧮 Aplicar Regla PERC
            </button>
        </form>
        <div id="percResult" style="display:none; margin-top:24px;"></div>
    `;
}

function calculatePERC(event) {
    event.preventDefault();
    const inputs = {
        age50:       document.getElementById('percAge').checked,
        hr100:       document.getElementById('percHR').checked,
        spo294:      document.getElementById('percSpO2').checked,
        legSwelling: document.getElementById('percLeg').checked,
        hemoptysis:  document.getElementById('percHemo').checked,
        surgery:     document.getElementById('percSurg').checked,
        priorVTE:    document.getElementById('percVTE').checked,
        estrogen:    document.getElementById('percEstro').checked
    };
    const result = Calculators.calculatePERC(inputs);
    const isNegative = result.value === 0;
    const bgColor   = isNegative ? 'linear-gradient(135deg,#059669,#10b981)' : 'linear-gradient(135deg,#dc2626,#ef4444)';
    const textColor = 'white';

    const container = document.getElementById('percResult');
    container.innerHTML = `
        <div style="background:${bgColor}; padding:24px; border-radius:var(--radius-lg); color:${textColor}; margin-bottom:16px; text-align:center;">
            <div style="font-size:40px; margin-bottom:8px;">${isNegative ? '✅' : '⚠️'}</div>
            <div style="font-size:20px; font-weight:800; margin-bottom:4px;">${result.interpretation.label}</div>
            <div style="font-size:14px; opacity:0.9;">${isNegative ? 'Todos los criterios PERC negativos' : `${result.value} criterio${result.value > 1 ? 's' : ''} positivo${result.value > 1 ? 's' : ''}`}</div>
        </div>
        <div style="background:var(--bg-secondary); padding:20px; border-radius:var(--radius-lg); border-left:4px solid ${isNegative ? 'var(--success)' : 'var(--danger)'}; margin-bottom:16px;">
            <h4 style="font-size:14px; font-weight:700; margin-bottom:8px;">Interpretación</h4>
            <p style="font-size:13px; color:var(--text-secondary); line-height:1.6;">${result.interpretation.description}</p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('percForm').reset(); document.getElementById('percResult').style.display='none';" style="width:100%; margin-top:0;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 27, calculatorName: 'Regla PERC', inputs, result, interpretation: result.interpretation });
}

// === 28. CAD / CADE — PROTOCOLO INTEGRAL === //
function createDKAForm() {
    const units = Storage.getSettings().units;
    const wUnit = units.weight || 'kg';
    return `
        <form id="dkaForm" onsubmit="calculateDKAProtocol(event)">

            <!-- Sección 1: Paciente -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:16px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em;">Datos del Paciente</div>

                <div class="form-group" style="margin-bottom:14px;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Peso (${wUnit})</label>
                    <input type="number" id="dkaWeight" required step="any" min="30" max="300" class="form-input" oninput="updateDKALiveCalcs()">
                </div>

                <div class="form-group" style="margin-bottom:14px;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Tipo de presentación</label>
                    <select id="dkaType" required class="form-input" onchange="updateDKALiveCalcs()">
                        <option value="classic">CAD Clásica — Glucosa ≥ 200 mg/dL (11.1 mmol/L)</option>
                        <option value="cade">CAD Euglucémica (CADE) — Glucosa &lt; 250 mg/dL (13.9 mmol/L) · SGLT-2i / embarazo / ayuno</option>
                    </select>
                </div>

                <div class="form-group">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Estado hemodinámico</label>
                    <select id="dkaHemo" required class="form-input">
                        <option value="mild">Hipovolemia leve-moderada (más frecuente)</option>
                        <option value="severe">Hipovolemia severa — signos de shock</option>
                        <option value="euvolemic">Euvolémico</option>
                        <option value="cardiogenic">Choque cardiogénico / Falla cardíaca</option>
                    </select>
                </div>
            </div>

            <!-- Sección 2: Laboratorio -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:14px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em;">Laboratorio</div>

                <div style="display:grid; grid-template-columns:1fr auto; gap:8px; margin-bottom:14px; align-items:end;">
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Glucosa</label>
                        <input type="number" id="dkaGlucose" required step="any" min="30" max="2000" class="form-input" oninput="updateDKALiveCalcs()">
                    </div>
                    <select id="dkaGlucoseUnit" class="form-input" style="min-width:100px;" onchange="updateDKALiveCalcs()">
                        <option value="mg/dL" ${(Storage.getSetting('units.glucose')||'mg/dL')==='mg/dL' ? 'selected' : ''}>mg/dL</option>
                        <option value="mmol/L" ${Storage.getSetting('units.glucose')==='mmol/L' ? 'selected' : ''}>mmol/L</option>
                    </select>
                </div>

                <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">pH venoso/arterial</label>
                        <input type="number" id="dkaPh" required step="0.01" min="6.5" max="7.5" class="form-input" placeholder="ej. 7.15">
                        <p style="font-size:11px; color:var(--text-tertiary); margin-top:4px;">GSV tan confiable como GSA en CAD (ADA 2024)</p>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">HCO₃⁻ (mEq/L)</label>
                        <input type="number" id="dkaHco3" required step="any" min="1" max="40" class="form-input" oninput="updateDKALiveCalcs()">
                    </div>
                </div>

                <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Na⁺ (mEq/L)</label>
                        <input type="number" id="dkaSodium" required step="any" min="115" max="170" class="form-input" oninput="updateDKALiveCalcs()">
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">
                            K⁺ (mEq/L) <span style="color:#ef4444; font-size:11px;">crítico</span>
                        </label>
                        <input type="number" id="dkaPotassium" required step="0.1" min="1.5" max="8" class="form-input" id="dkaPotassium" oninput="updateDKALiveCalcs()">
                    </div>
                </div>

                <div class="form-group">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">
                        Cl⁻ (mEq/L)
                        <span style="font-size:11px; font-weight:500; color:var(--text-tertiary); margin-left:6px;">opcional — para calcular Anión Gap</span>
                    </label>
                    <input type="number" id="dkaChloride" step="any" min="85" max="130" class="form-input" placeholder="Dejar vacío si no disponible" oninput="updateDKALiveCalcs()">
                </div>
            </div>

            <!-- Cálculos en tiempo real -->
            <div id="dkaLiveCalcs"></div>

            <div style="background:#fef3c7; border-left:4px solid #f59e0b; padding:14px; border-radius:8px; margin-bottom:16px; margin-top:4px;">
                <p style="font-size:12px; color:#92400e; margin:0;">
                    <strong>⚠️ Herramienta de apoyo clínico</strong> — Verificar siempre con el equipo médico. Basado en ADA Consensus Report 2024 · JBDS 2023 · JAMA Netw Open 2020.
                </p>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:14px;">
                🧮 Generar Protocolo CAD/CADE
            </button>
        </form>
        <div id="dkaResult" style="display:none; margin-top:24px;"></div>
    `;
}

function updateDKALiveCalcs() {
    const glucoseUnit = document.getElementById('dkaGlucoseUnit')?.value || 'mg/dL';

    // Ajustar min/max del input de glucosa según la unidad seleccionada
    const glucoseField = document.getElementById('dkaGlucose');
    if (glucoseField) {
        if (glucoseUnit === 'mmol/L') {
            glucoseField.min  = '1.7';
            glucoseField.max  = '111';
            glucoseField.step = '0.1';
        } else {
            glucoseField.min  = '30';
            glucoseField.max  = '2000';
            glucoseField.step = 'any';
        }
    }

    const glucoseVal  = parseFloat(glucoseField?.value);
    const sodiumVal   = parseFloat(document.getElementById('dkaSodium')?.value);
    const chlorideVal = parseFloat(document.getElementById('dkaChloride')?.value);
    const hco3Val     = parseFloat(document.getElementById('dkaHco3')?.value);
    const kVal        = parseFloat(document.getElementById('dkaPotassium')?.value);
    const liveDiv     = document.getElementById('dkaLiveCalcs');
    if (!liveDiv) return;

    let glucoseMg = glucoseVal;
    if (glucoseUnit === 'mmol/L' && !isNaN(glucoseVal)) glucoseMg = glucoseVal / 0.0555;

    const naCorr = (!isNaN(sodiumVal) && !isNaN(glucoseMg))
        ? Math.round((sodiumVal + 2.4 * (glucoseMg - 100) / 100) * 10) / 10 : null;
    const ag = (!isNaN(sodiumVal) && !isNaN(chlorideVal) && !isNaN(hco3Val))
        ? Math.round((sodiumVal - (chlorideVal + hco3Val)) * 10) / 10 : null;
    const osm = (!isNaN(sodiumVal) && !isNaN(glucoseMg))
        ? Math.round((2 * sodiumVal + glucoseMg / 18) * 10) / 10 : null;

    // Color K+ field
    const kField = document.getElementById('dkaPotassium');
    if (kField && !isNaN(kVal)) {
        kField.style.borderColor = kVal < 3.3 ? '#dc2626' : '';
        kField.style.boxShadow   = kVal < 3.3 ? '0 0 0 3px rgba(220,38,38,0.15)' : '';
    }

    const hasData = naCorr !== null || ag !== null || osm !== null;
    if (!hasData) { liveDiv.innerHTML = ''; return; }

    let rows = '';
    if (naCorr !== null) {
        const c = naCorr > 150 ? '#f59e0b' : 'var(--success)';
        rows += `<div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span>Na corregido (ADA 2024)</span><strong style="color:${c}">${naCorr} mEq/L${naCorr > 150 ? ' ⚠' : ''}</strong></div>`;
    }
    if (ag !== null) {
        const c = ag > 12 ? '#ef4444' : 'var(--success)';
        rows += `<div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span>Anión Gap</span><strong style="color:${c}">${ag} mEq/L${ag > 12 ? ' ↑' : ''}</strong></div>`;
    }
    if (osm !== null) {
        rows += `<div style="display:flex;justify-content:space-between;"><span>Osmolaridad efectiva</span><strong>${osm} mOsm/kg</strong></div>`;
    }

    let kAlert = '';
    if (!isNaN(kVal) && kVal < 3.3) {
        kAlert = `<div style="background:#fef2f2;border:1px solid #dc2626;border-radius:6px;padding:8px;margin-top:8px;color:#dc2626;font-weight:700;font-size:12px;">⚠️ K⁺ ${kVal} mEq/L — RETENER INSULINA al generar el protocolo</div>`;
    }

    liveDiv.innerHTML = `<div style="background:var(--bg-secondary);padding:12px;border-radius:10px;margin-bottom:12px;font-size:13px;"><div style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Cálculos automáticos</div>${rows}${kAlert}</div>`;
}

// Función reutilizable por calculateDKAProtocol y showFullResult
function buildDKAProtocolHTML(r, inputs) {
    const section = (icon, title, color, content) => `
        <div style="margin-bottom:12px; border-radius:var(--radius-lg); overflow:hidden; border:1px solid ${color}33;">
            <div style="background:${color}22; padding:12px 16px; display:flex; align-items:center; gap:8px; border-bottom:1px solid ${color}33;">
                <span style="font-size:18px;">${icon}</span>
                <span style="font-size:14px; font-weight:700; color:${color};">${title}</span>
            </div>
            <div style="padding:14px 16px; background:var(--bg-card); font-size:13px; line-height:1.8;">${content}</div>
        </div>`;

    const check = (met, label, actual, target) => {
        if (met === null) return `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border-color);"><span>${label}</span><span style="color:var(--text-tertiary);">No disponible</span></div>`;
        const ic = met ? '✅' : '❌';
        const co = met ? 'var(--success)' : 'var(--danger)';
        return `<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid var(--border-color);"><span>${label} <span style="color:var(--text-tertiary);font-size:11px;">(actual: ${actual})</span></span><span style="color:${co};font-weight:700;">${ic} ${target}</span></div>`;
    };

    const headerHTML = `
        <div style="background:${r.severity.colorHex}; padding:20px; border-radius:var(--radius-lg); color:white; margin-bottom:12px;">
            <div style="font-size:22px; font-weight:800; margin-bottom:6px;">${r.severity.badge} ${r.severity.label}</div>
            <div style="font-size:13px; opacity:0.9; display:flex; flex-wrap:wrap; gap:12px;">
                <span>pH ${inputs.ph}</span><span>HCO₃ ${inputs.hco3} mEq/L</span>
                <span>Glucosa ${inputs.glucose} ${inputs.glucoseUnit}</span><span>K⁺ ${inputs.potassium} mEq/L</span>
            </div>
            <div style="margin-top:8px; font-size:12px; opacity:0.85; display:flex; gap:12px; flex-wrap:wrap;">
                <span>Na corregido: ${r.naCorregido} mEq/L</span>
                ${r.agCalc !== null ? `<span>AG: ${r.agCalc} mEq/L</span>` : ''}
                <span>Osm efectiva: ${r.osmEffective} mOsm/kg</span>
            </div>
        </div>`;

    const alertHTML = r.criticalAlert.hasAlert ? `
        <div style="background:#7f1d1d; color:#fca5a5; border:2px solid #dc2626; border-radius:var(--radius-lg); padding:16px; margin-bottom:12px; font-weight:700; font-size:14px; display:flex; align-items:center; gap:10px;">
            <span style="font-size:24px;">🚨</span><span>${r.criticalAlert.message}</span>
        </div>` : '';

    const cadeHTML = r.isCADE ? `
        <div style="background:#4c1d95; color:#c4b5fd; border:2px solid #7c3aed; border-radius:var(--radius-lg); padding:16px; margin-bottom:12px;">
            <div style="font-weight:700; font-size:14px; margin-bottom:6px;">🟣 CAD EUGLUCÉMICA (CADE)</div>
            <div style="font-size:13px; line-height:1.7;">
                • Glucosa aparentemente normal — no descartar CAD<br>
                • Dextrosa 5-10% <strong>DESDE EL INICIO</strong><br>
                • Suspender SGLT-2i inmediatamente si aplica<br>
                • Meta: cerrar el Anión Gap (no bajar glucosa)
            </div>
        </div>` : '';

    const kColor = r.potassium.holdInsulin ? '#dc2626' : '#f59e0b';

    const fluidContent = `
        <div><strong>Bolo inicial:</strong> <span style="color:var(--brand-accent);font-weight:700;">${r.fluids.bolusML} mL</span> de ${r.fluids.fluidType} en ${r.fluids.bolusTime}</div>
        <div><strong>Mantenimiento:</strong> 150–200 mL/h de cristaloide balanceado</div>
        <div><strong>Fluido recomendado:</strong> Ringer Lactato o Plasmalyte ✓ — <em>SS 0.9% genera AGMA hiperclorémica</em></div>
        <div><strong>Na corregido:</strong> ${r.fluids.naNote}</div>
        <div><strong>Agregar Dextrosa:</strong> ${r.fluids.dextroseStart}</div>
        ${r.fluids.hemodynamic === 'cardiogenic' ? '<div style="margin-top:4px;color:#f59e0b;font-weight:600;">⚠️ Choque cardiogénico — evaluar vasopresores desde el inicio</div>' : ''}`;

    const potassiumContent = `
        <div><strong>K⁺ actual:</strong> ${r.potassium.value} mEq/L</div>
        <div><strong>Acción:</strong> <span style="color:${kColor};font-weight:700;">${r.potassium.kAction}</span></div>
        ${r.potassium.kRate !== '—' ? `<div><strong>Velocidad:</strong> ${r.potassium.kRate}</div>` : ''}
        <div style="margin-top:4px;">${r.potassium.kNote}</div>
        <div style="margin-top:4px;color:var(--text-secondary);font-size:12px;">Fosfato: reponer solo si &lt; 1 mg/dL · Magnesio: reponer si bajo</div>`;

    const insulinContent = r.potassium.holdInsulin
        ? `<div style="color:#dc2626;font-weight:700;">⚠️ INSULINA EN ESPERA — Reiniciar cuando K⁺ ≥ 3.3 mEq/L</div>`
        : `<div><strong>Vía:</strong> ${r.insulin.insulinRoute} ${r.insulin.isSevereOrShock ? '(IV — caso severo/shock)' : '(IV o SC según severidad)'}</div>
           <div><strong>Insulina IV:</strong> <span style="color:var(--brand-accent);font-weight:700;">Regular 0.1 U/kg/h = ${r.insulin.doseIV} U/h</span></div>
           <div><strong>Si Glu &lt; 250 mg/dL:</strong> reducir a <strong>0.05 U/kg/h = ${r.insulin.doseIVReduced} U/h</strong> + Dextrosa</div>
           <div><strong>Insulina SC (leve/mod):</strong> Lispro/Aspart ${r.insulin.doseSCBolus} U · c/2h si Glu>250 · c/4h si Glu&lt;250</div>
           <div style="margin-top:4px;color:#dc2626;font-weight:600;">⛔ NO detener insulina IV — agregar Dextrosa hasta BA ≤ 12 + HCO₃ > 18</div>
           ${r.isCADE ? '<div style="margin-top:4px;color:#7c3aed;font-weight:600;">CADE: misma dosis — la insulina cierra el AG, no baja la glucosa</div>' : ''}`;

    const bicarboContent = r.bicarbonate.indicated
        ? `<div style="color:#dc2626;font-weight:700;">pH ${r.bicarbonate.ph} &lt; 6.9 — BICARBONATO INDICADO</div>
           <div>100 mEq NaHCO₃ en 400 mL agua + 20 mEq KCl en 2 h IV · Repetir c/2h hasta pH > 7.0</div>
           <div style="color:var(--text-secondary);">Monitorear K⁺ — el bicarbonato lo desplaza intracelularmente</div>`
        : `<div style="color:var(--success);font-weight:600;">pH ${r.bicarbonate.ph} ≥ 6.9 — No indicado</div>
           <div style="color:var(--text-secondary);">Uso rutinario no mejora outcomes y puede empeorar la hipocalemia.</div>`;

    const resContent = `
        ${check(r.resolution.agMet, 'Brecha Aniónica', r.resolution.agCalc !== null ? `${r.resolution.agCalc} mEq/L` : 'no calculada', '≤ 12 mEq/L')}
        ${check(r.resolution.hco3Met, 'HCO₃⁻', `${r.resolution.hco3} mEq/L`, '> 18 mEq/L')}
        ${check(r.resolution.phMet, 'pH', r.resolution.ph, '> 7.30')}
        <div style="padding:4px 0;border-bottom:1px solid var(--border-color);">Tolerancia a vía oral — confirmar clínicamente</div>
        <div style="padding:4px 0;">β-hidroxibutirato &lt; 0.6 mmol/L — si disponible</div>`;

    const transContent = `
        <div><strong>Criterio:</strong> BA ≤ 12 + HCO₃ > 18 + tolerando VO</div>
        <div><strong>Glargina:</strong> 0.5–0.8 U/kg/día = <span style="color:var(--brand-accent);font-weight:700;">${r.transition.glarginMin}–${r.transition.glarginMax} U/día</span></div>
        <div>50% basal (glargina) · 50% bolo (aspart/lispro con comidas)</div>
        <div style="color:#dc2626;font-weight:600;">⛔ Mantener infusión IV 2 h tras la primera glargina</div>
        <div style="color:var(--text-secondary);font-size:12px;">t½ plasmático insulina IV = 6 min — suspensión brusca reinicia cetogénesis</div>`;

    return `${headerHTML}${alertHTML}${cadeHTML}
        ${section('💧', '1. Fluidos IV', '#3b82f6', fluidContent)}
        ${section('🧪', '2. Potasio', r.potassium.holdInsulin ? '#dc2626' : '#f59e0b', potassiumContent)}
        ${section('💉', '3. Insulina', '#22c55e', insulinContent)}
        ${section('🔬', '4. Bicarbonato', r.bicarbonate.indicated ? '#dc2626' : '#6366f1', bicarboContent)}
        ${section('📋', '5. Criterios de Resolución', '#8b5cf6', resContent)}
        ${section('🔄', '6. Transición a Insulina SC', '#14b8a6', transContent)}`;
}

function calculateDKAProtocol(event) {
    event.preventDefault();
    const chlorideRaw = document.getElementById('dkaChloride').value;
    const inputs = {
        weight:      parseFloat(document.getElementById('dkaWeight').value),
        type:        document.getElementById('dkaType').value,
        hemodynamic: document.getElementById('dkaHemo').value,
        glucose:     parseFloat(document.getElementById('dkaGlucose').value),
        glucoseUnit: document.getElementById('dkaGlucoseUnit').value,
        ph:          parseFloat(document.getElementById('dkaPh').value),
        hco3:        parseFloat(document.getElementById('dkaHco3').value),
        sodium:      parseFloat(document.getElementById('dkaSodium').value),
        potassium:   parseFloat(document.getElementById('dkaPotassium').value),
        chloride:    chlorideRaw === '' ? null : parseFloat(chlorideRaw)
    };
    const r = Calculators.calculateDKA(inputs);
    const container = document.getElementById('dkaResult');
    container.innerHTML = buildDKAProtocolHTML(r, inputs) + `
        <button class="btn btn-secondary" onclick="document.getElementById('dkaForm').reset(); document.getElementById('dkaResult').style.display='none'; document.getElementById('dkaLiveCalcs').innerHTML='';" style="width:100%; margin-top:12px;">
            🔄 Nuevo Protocolo
        </button>`;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 28, calculatorName: 'CAD / CADE', inputs, result: r, interpretation: r.interpretation });
}

// === 31. ASMA AGUDA — CRISIS BRONQUIAL === //
function createAsmaForm() {
    const wUnit = Storage.getSetting('units.weight') || 'kg';
    return `
        <form id="asmaForm" onsubmit="calculateAsmaProtocol(event)">

            <!-- Sección 1: Paciente -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:16px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em;">Datos del Paciente</div>
                <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Edad (años)</label>
                        <input type="number" id="asmaAge" min="14" max="120" class="form-input" placeholder="ej: 35">
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Peso (${wUnit})</label>
                        <input type="number" id="asmaWeight" required step="any" min="20" max="300" class="form-input" placeholder="ej: 70" oninput="updateAsmaLiveCalcs()">
                    </div>
                </div>
            </div>

            <!-- Sección 2: Evaluación clínica -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:16px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em;">⚡ Evaluación Clínica</div>

                <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">SpO₂ (%)</label>
                        <input type="number" id="asmaSpo2" required min="60" max="100" class="form-input" placeholder="ej: 95" oninput="updateAsmaLiveCalcs()">
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">FC (lpm)</label>
                        <input type="number" id="asmaHr" required min="40" max="250" class="form-input" placeholder="ej: 110" oninput="updateAsmaLiveCalcs()">
                    </div>
                </div>

                <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">FR (rpm)</label>
                        <input type="number" id="asmaRr" required min="8" max="80" class="form-input" placeholder="ej: 22" oninput="updateAsmaLiveCalcs()">
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">
                            FEM (% mejor personal)
                            <span style="font-size:11px; font-weight:400; color:var(--text-tertiary);">opcional</span>
                        </label>
                        <input type="number" id="asmaFem" min="0" max="100" class="form-input" placeholder="ej: 60" oninput="updateAsmaLiveCalcs()">
                    </div>
                </div>

                <div class="form-group" style="margin-bottom:14px;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Habla</label>
                    <select id="asmaSpeech" required class="form-input" onchange="updateAsmaLiveCalcs()">
                        <option value="">-- Seleccionar --</option>
                        <option value="sentences">Frases completas</option>
                        <option value="phrases">Solo frases cortas</option>
                        <option value="words">Solo palabras</option>
                        <option value="unable">Incapaz de hablar</option>
                    </select>
                </div>

                <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Músculos accesorios</label>
                        <select id="asmaAccessory" required class="form-input" onchange="updateAsmaLiveCalcs()">
                            <option value="">-- Seleccionar --</option>
                            <option value="no">No</option>
                            <option value="si">Sí (uso activo)</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Sibilancias</label>
                        <select id="asmaWheeze" required class="form-input" onchange="updateAsmaLiveCalcs()">
                            <option value="">-- Seleccionar --</option>
                            <option value="expiratory">Espiratorias</option>
                            <option value="biphasic">Bifásicas (insp + esp)</option>
                            <option value="silent">Silencio torácico ⚠️</option>
                        </select>
                    </div>
                </div>

                <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Nivel de conciencia</label>
                        <select id="asmaConsciousness" required class="form-input" onchange="updateAsmaLiveCalcs()">
                            <option value="">-- Seleccionar --</option>
                            <option value="alert">Alerta</option>
                            <option value="confused">Confuso / somnoliento</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Cianosis</label>
                        <select id="asmaCyanosis" required class="form-input" onchange="updateAsmaLiveCalcs()">
                            <option value="">-- Seleccionar --</option>
                            <option value="no">No</option>
                            <option value="si">Sí</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Sección 3: Gasometría (opcional) -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:16px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em;">
                    Gasometría <span style="font-size:11px; font-weight:500; text-transform:none;">(opcional)</span>
                </div>
                <div class="form-group">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">PaCO₂ (mmHg)</label>
                    <input type="number" id="asmaPaco2" min="10" max="100" step="0.1" class="form-input" placeholder="ej: 38 — ≥ 45 indica agotamiento ventilatorio" oninput="updateAsmaLiveCalcs()">
                    <p style="font-size:11px; color:var(--text-tertiary); margin-top:4px;">PaCO₂ normal o elevada en crisis grave = fallo ventilatorio inminente</p>
                </div>
            </div>

            <!-- Clasificación en tiempo real -->
            <div id="asmaLiveCalcs"></div>

            <div style="background:#fef3c7; border-left:4px solid #f59e0b; padding:14px; border-radius:8px; margin-bottom:16px;">
                <p style="font-size:12px; color:#92400e; margin:0;">
                    <strong>⚠️ Herramienta de apoyo clínico</strong> — Verificar siempre con el equipo médico. Basado en GINA 2024 · BTS-SIGN 2023 · ERS/ATS 2022.
                </p>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:14px;">
                ⚡ Generar Protocolo de Tratamiento
            </button>
        </form>
        <div id="asmaResult" style="display:none; margin-top:24px;"></div>
    `;
}

function updateAsmaLiveCalcs() {
    const container = document.getElementById('asmaLiveCalcs');
    if (!container) return;

    const spo2Val  = document.getElementById('asmaSpo2').value;
    const hrVal    = document.getElementById('asmaHr').value;
    const rrVal    = document.getElementById('asmaRr').value;
    const femVal   = document.getElementById('asmaFem').value;
    const paco2Val = document.getElementById('asmaPaco2').value;
    const speech        = document.getElementById('asmaSpeech').value;
    const accessory     = document.getElementById('asmaAccessory').value;
    const wheeze        = document.getElementById('asmaWheeze').value;
    const consciousness = document.getElementById('asmaConsciousness').value;
    const cyanosis      = document.getElementById('asmaCyanosis').value;

    const spo2  = spo2Val  !== '' ? parseFloat(spo2Val)  : null;
    const hr    = hrVal    !== '' ? parseFloat(hrVal)    : null;
    const rr    = rrVal    !== '' ? parseFloat(rrVal)    : null;
    const fem   = femVal   !== '' ? parseFloat(femVal)   : null;
    const paco2 = paco2Val !== '' ? parseFloat(paco2Val) : null;

    const anyFilled = spo2 !== null || hr !== null || rr !== null || fem !== null || speech || wheeze || consciousness || cyanosis;
    if (!anyFilled) { container.innerHTML = ''; return; }

    const fatal = [];
    if (spo2 !== null && spo2 < 90)    fatal.push(`SpO₂ ${spo2}% (<90%)`);
    if (fem !== null && fem < 33)       fatal.push(`FEM ${fem}% (<33%)`);
    if (wheeze === 'silent')            fatal.push('Silencio torácico');
    if (cyanosis === 'si')              fatal.push('Cianosis');
    if (consciousness === 'confused')   fatal.push('Confuso/somnoliento');
    if (paco2 !== null && paco2 >= 45)  fatal.push(`PaCO₂ ${paco2} mmHg (≥45)`);

    const severe = [];
    if (!fatal.length) {
        if (spo2 !== null && spo2 >= 90 && spo2 <= 93)     severe.push(`SpO₂ ${spo2}% (90-93%)`);
        if (fem !== null && fem >= 33 && fem <= 50)          severe.push(`FEM ${fem}% (33-50%)`);
        if (speech === 'words' || speech === 'unable')        severe.push('Solo palabras / Incapaz de hablar');
        if (hr !== null && hr >= 120)                         severe.push(`FC ${hr} lpm (≥120)`);
        if (rr !== null && rr >= 25)                          severe.push(`FR ${rr} rpm (≥25)`);
        if (accessory === 'si')                               severe.push('Músculos accesorios activos');
    }

    const moderate = [];
    if (!fatal.length && !severe.length) {
        if (spo2 !== null && spo2 >= 94 && spo2 <= 96)      moderate.push(`SpO₂ ${spo2}% (94-96%)`);
        if (fem !== null && fem >= 51 && fem <= 75)           moderate.push(`FEM ${fem}% (51-75%)`);
        if (speech === 'phrases')                              moderate.push('Solo frases cortas');
        if (hr !== null && hr >= 100 && hr < 120)             moderate.push(`FC ${hr} lpm (100-119)`);
        if (rr !== null && rr >= 20 && rr < 25)               moderate.push(`FR ${rr} rpm (20-24)`);
    }

    let badge, label, color, criteria;
    if (fatal.length)        { badge = '🔴'; label = 'POTENCIALMENTE FATAL'; color = '#dc2626'; criteria = fatal; }
    else if (severe.length)  { badge = '🟠'; label = 'GRAVE';                color = '#ea580c'; criteria = severe; }
    else if (moderate.length){ badge = '🟡'; label = 'MODERADA';             color = '#ca8a04'; criteria = moderate; }
    else                     { badge = '🟢'; label = 'LEVE';                 color = '#16a34a'; criteria = []; }

    container.innerHTML = `
        <div style="background:${color}22; border:1px solid ${color}55; border-radius:10px; padding:14px; margin-bottom:16px;">
            <div style="font-size:13px; font-weight:700; color:${color}; margin-bottom:${criteria.length ? 6 : 0}px;">${badge} Clasificación estimada: ${label}</div>
            ${criteria.length
                ? `<div style="font-size:12px; color:${color}cc; line-height:1.6;">Criterios: ${criteria.join(' · ')}</div>`
                : '<div style="font-size:12px; color:#9ca3af;">Complete los campos para refinar la clasificación</div>'
            }
        </div>`;
}

function buildAsmaProtocolHTML(r, inputs) {
    const { severity, o2, saba, ipratropium, cortico, magnesio, aminofilina, admision, alta, isFatal, isSevere } = r;
    const c = severity.colorHex;
    let sn = 1;

    function section(icon, title, color, content) {
        return `
        <div style="background:${color}18; border:1px solid ${color}33; border-radius:10px; margin-bottom:12px; overflow:hidden;">
            <div style="background:${color}28; border-bottom:1px solid ${color}33; padding:11px 16px; display:flex; align-items:center; gap:8px;">
                <span style="font-size:17px;">${icon}</span>
                <span style="font-size:14px; font-weight:700; color:${color};">${title}</span>
            </div>
            <div style="padding:13px 16px; font-size:13px; line-height:1.85; color:var(--text-primary);">${content}</div>
        </div>`;
    }

    // Header
    let html = `
    <div style="background:${c}; border-radius:12px; padding:20px; margin-bottom:16px; color:white;">
        <div style="font-size:12px; font-weight:600; opacity:0.85; margin-bottom:4px; text-transform:uppercase; letter-spacing:0.05em;">Crisis Aguda de Asma Bronquial</div>
        <div style="font-size:22px; font-weight:800; margin-bottom:12px;">${severity.badge} ${severity.label}</div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; font-size:12px;">
            ${inputs.spo2   ? `<div><div style="opacity:0.75;">SpO₂</div><div style="font-weight:700;">${inputs.spo2}%</div></div>` : ''}
            ${inputs.hr     ? `<div><div style="opacity:0.75;">FC</div><div style="font-weight:700;">${inputs.hr} lpm</div></div>` : ''}
            ${inputs.rr     ? `<div><div style="opacity:0.75;">FR</div><div style="font-weight:700;">${inputs.rr} rpm</div></div>` : ''}
            ${inputs.fem    ? `<div><div style="opacity:0.75;">FEM</div><div style="font-weight:700;">${inputs.fem}%</div></div>` : ''}
            ${inputs.paco2  ? `<div><div style="opacity:0.75;">PaCO₂</div><div style="font-weight:700;">${inputs.paco2} mmHg</div></div>` : ''}
            ${r.weightKg    ? `<div><div style="opacity:0.75;">Peso</div><div style="font-weight:700;">${r.weightKg} kg</div></div>` : ''}
        </div>
    </div>`;

    if (isFatal) {
        html += `<div style="background:#7f1d1d; border:1px solid #ef4444; border-radius:10px; padding:14px; margin-bottom:12px; color:#fca5a5;">
            🚨 <strong>CRISIS POTENCIALMENTE FATAL</strong> — Activar equipo de emergencias · Preparar vía aérea · Ingreso en UCI inmediato
        </div>`;
    }

    if (inputs.wheeze === 'silent') {
        html += `<div style="background:#431407; border:1px solid #f97316; border-radius:10px; padding:14px; margin-bottom:12px; color:#fdba74;">
            ⚠️ <strong>Silencio torácico:</strong> Obstrucción crítica — ausencia de sibilancias NO indica mejoría. Fallo ventilatorio inminente. Evaluar intubación de urgencia.
        </div>`;
    }

    // 1. Oxigenoterapia
    html += section('💨', `${sn++}. Oxigenoterapia`, '#3b82f6',
        o2.needed
            ? `<b>Iniciar O₂</b> — Objetivo: SpO₂ ${o2.target}<br><b>Dispositivo:</b> ${o2.device}`
            : `SpO₂ ${inputs.spo2}% — O₂ suplementario no requerido inicialmente. Monitorizar SpO₂ continuamente.`
    );

    // 2. Salbutamol
    let sabaContent;
    if (isFatal) {
        sabaContent = `<b>Salbutamol IV:</b> ${saba.ivDose}<br>
            <b>Preparación:</b> ${saba.ivPrep}<br>
            <b>Nebulizado simultáneo:</b> ${saba.nebDose}<br>
            <span style="color:#f87171;">⚠️ ${saba.note}</span>`;
    } else if (isSevere) {
        sabaContent = `<b>Nebulizado:</b> ${saba.nebDose}<br>
            <b>Alternativa MDI + cámara:</b> ${saba.mdiDose}`;
    } else {
        sabaContent = `<b>MDI + cámara espaciadora:</b> ${saba.mdiDose}<br>
            <b>Alternativa nebulizado:</b> ${saba.nebDose}`;
    }
    html += section('🫁', `${sn++}. Salbutamol (SABA)`, '#22c55e', sabaContent);

    // 3. Ipratropio (condicional)
    if (ipratropium.indicated) {
        html += section('🔵', `${sn++}. Ipratropio (Anticolinérgico)`, '#8b5cf6',
            `<b>Nebulizado:</b> ${ipratropium.nebDose}<br>
             <b>MDI + cámara:</b> ${ipratropium.mdiDose}<br>
             Puede combinarse con salbutamol en el mismo nebulizador`);
    }

    // 4. Corticosteroides
    let corticoContent = `<b>${cortico.drug1}</b>`;
    if (cortico.drug2) corticoContent += `<br>o bien <b>${cortico.drug2}</b>`;
    corticoContent += `<br><b>Duración:</b> ${cortico.duration}<br><span style="color:#fbbf24;">⏱️ ${cortico.note}</span>`;
    html += section('💊', `${sn++}. Corticosteroides`, '#f59e0b', corticoContent);

    // 5. MgSO4 (condicional)
    if (magnesio.indicated) {
        html += section('🧲', `${sn++}. Sulfato de Magnesio`, '#06b6d4',
            `<b>Dosis:</b> ${magnesio.dose}<br>
             <b>Cuándo:</b> ${magnesio.when}<br>
             <b>Precaución:</b> ${magnesio.caution}`);
    }

    // 6. Aminofilina (condicional, solo fatal)
    if (aminofilina.indicated) {
        html += section('⚠️', `${sn++}. Aminofilina (2ª línea — rescate)`, '#dc2626',
            `<b>Carga:</b> ${aminofilina.loading}<br>
             <span style="color:#f87171;">${aminofilina.loadingNote}</span><br>
             <b>Mantenimiento:</b> ${aminofilina.maintenance}<br>
             <span style="color:#fbbf24;">⚠️ ${aminofilina.warning}</span>`);
    }

    // Destino y monitorización
    let admiContent;
    if (admision.icu) {
        admiContent = `🔴 <b>INGRESO EN UCI / ÁREA DE CRÍTICOS</b><br>${admision.criteria}<br><br>
            <b>Monitorización:</b> ECG continuo · SpO₂ · Capnografía · Gasometría seriada · IOT si deterioro`;
    } else if (admision.required) {
        admiContent = `🟠 <b>INGRESO HOSPITALARIO</b><br>${admision.criteria}<br><br>
            <b>Reevaluar a los 30-60 min:</b> SpO₂ · FC · FR · FEM<br>
            <b>Criterios de alta diferida:</b> FEM ≥ 50% + SpO₂ ≥ 94% estable`;
    } else {
        admiContent = `🟢 <b>Alta a domicilio</b> si cumple todos los criterios tras observación:<br>
            ${alta.criteria.map(x => `• ${x}`).join('<br>')}`;
    }
    html += section('📋', `${sn++}. Destino y Monitorización`, '#64748b', admiContent);

    html += `<div style="font-size:11px; color:#64748b; text-align:right; margin-top:4px; padding:0 4px;">
        GINA 2024 · BTS-SIGN 2023 · ERS/ATS 2022</div>`;

    return html;
}

function calculateAsmaProtocol(event) {
    event.preventDefault();
    const ageRaw   = document.getElementById('asmaAge').value;
    const femRaw   = document.getElementById('asmaFem').value;
    const paco2Raw = document.getElementById('asmaPaco2').value;
    const inputs = {
        age:           ageRaw   !== '' ? parseFloat(ageRaw)   : null,
        weight:        parseFloat(document.getElementById('asmaWeight').value),
        spo2:          parseFloat(document.getElementById('asmaSpo2').value),
        hr:            parseFloat(document.getElementById('asmaHr').value),
        rr:            parseFloat(document.getElementById('asmaRr').value),
        speech:        document.getElementById('asmaSpeech').value,
        accessory:     document.getElementById('asmaAccessory').value,
        wheeze:        document.getElementById('asmaWheeze').value,
        consciousness: document.getElementById('asmaConsciousness').value,
        cyanosis:      document.getElementById('asmaCyanosis').value,
        fem:           femRaw   !== '' ? parseFloat(femRaw)   : null,
        paco2:         paco2Raw !== '' ? parseFloat(paco2Raw) : null,
    };
    const r = Calculators.calculateAsma(inputs);
    const container = document.getElementById('asmaResult');
    container.innerHTML = buildAsmaProtocolHTML(r, inputs) + `
        <button class="btn btn-secondary" onclick="document.getElementById('asmaForm').reset(); document.getElementById('asmaResult').style.display='none'; document.getElementById('asmaLiveCalcs').innerHTML='';" style="width:100%; margin-top:12px;">
            🔄 Nueva Evaluación
        </button>`;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 31, calculatorName: 'Asma Aguda', inputs, result: r, interpretation: r.interpretation });
}

// === 32. CONTROL ASMA CRÓNICA — CLASIFICACIÓN Y ESCALÓN === //
function createAsmaControlForm() {
    return `
        <form id="asmaControlForm" onsubmit="calculateAsmaControlProtocol(event)">

            <!-- Sección 1: Situación actual -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:16px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em;">Situación Actual</div>

                <div class="form-group" style="margin-bottom:14px;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">¿El paciente está actualmente en tratamiento para asma?</label>
                    <select id="acEnTratamiento" required class="form-input" onchange="updateAsmaControlLiveCalcs(); _acToggleTratamiento(this.value)">
                        <option value="">-- Seleccionar --</option>
                        <option value="no">No — Diagnóstico inicial / Virgen a tratamiento</option>
                        <option value="si">Sí — Ya está en tratamiento</option>
                    </select>
                </div>

                <div id="acTratamientoFields" style="display:none;">
                    <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                        <div>
                            <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Escalón actual</label>
                            <select id="acEscalon" class="form-input" onchange="updateAsmaControlLiveCalcs()">
                                <option value="1">Escalón 1 — Solo rescate PRN</option>
                                <option value="2">Escalón 2 — ICS dosis baja</option>
                                <option value="3">Escalón 3 — ICS + LABA</option>
                                <option value="4">Escalón 4 — ICS alta dosis + LABA</option>
                                <option value="5">Escalón 5 — Biológicos / add-ons</option>
                            </select>
                        </div>
                        <div>
                            <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Tiempo en escalón actual</label>
                            <select id="acTiempoEscalon" class="form-input" onchange="updateAsmaControlLiveCalcs()">
                                <option value="lt3">< 3 meses</option>
                                <option value="gte3">≥ 3 meses</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección 2: Síntomas últimas 4 semanas -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:16px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em;">Síntomas — Últimas 4 Semanas</div>

                <div class="form-group" style="margin-bottom:14px;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Síntomas diurnos</label>
                    <select id="acSintomasDiurnos" required class="form-input" onchange="updateAsmaControlLiveCalcs()">
                        <option value="">-- Seleccionar --</option>
                        <option value="none">Ninguno</option>
                        <option value="lte2">≤ 2 días/semana</option>
                        <option value="gt2">> 2 días/sem (pero no diarios)</option>
                        <option value="daily">Diarios o continuos</option>
                    </select>
                </div>

                <div class="form-group" style="margin-bottom:14px;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Despertares nocturnos</label>
                    <select id="acSintomasNocturnos" required class="form-input" onchange="updateAsmaControlLiveCalcs()">
                        <option value="">-- Seleccionar --</option>
                        <option value="none">Ninguno</option>
                        <option value="lte2">≤ 2 veces/mes</option>
                        <option value="gt2">> 2 veces/mes (pero no semanales)</option>
                        <option value="frequent">Frecuentes — ≥ 1 vez/semana</option>
                    </select>
                </div>

                <div class="form-group" style="margin-bottom:14px;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Limitación de actividad</label>
                    <select id="acLimitacion" required class="form-input" onchange="updateAsmaControlLiveCalcs()">
                        <option value="">-- Seleccionar --</option>
                        <option value="none">Ninguna</option>
                        <option value="alguna">Alguna</option>
                        <option value="bastante">Bastante</option>
                        <option value="total">Importante / Total</option>
                    </select>
                </div>

                <div class="form-group">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Uso de inhalador de rescate</label>
                    <select id="acRescate" required class="form-input" onchange="updateAsmaControlLiveCalcs()">
                        <option value="">-- Seleccionar --</option>
                        <option value="lte2">≤ 2 días/semana</option>
                        <option value="gt2">> 2 días/semana</option>
                    </select>
                </div>
            </div>

            <!-- Sección 3: Función pulmonar (opcional) -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:16px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em;">
                    Función Pulmonar <span style="font-size:11px; font-weight:500; text-transform:none;">(opcional)</span>
                </div>
                <div class="form-group">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">FEV1 o FEM (% del predicho)</label>
                    <select id="acFev1fem" class="form-input" onchange="updateAsmaControlLiveCalcs()">
                        <option value="none">No disponible / No medido</option>
                        <option value="gte80">≥ 80% — Normal</option>
                        <option value="60-79">60-79% — Reducido</option>
                        <option value="lt60">< 60% — Muy reducido</option>
                    </select>
                </div>
            </div>

            <!-- Sección 4: Factores de riesgo -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:16px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em;">Factores de Riesgo</div>

                <div class="form-group" style="margin-bottom:14px;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Exacerbaciones en el último año</label>
                    <select id="acExacerbaciones" class="form-input" onchange="updateAsmaControlLiveCalcs()">
                        <option value="none">Ninguna</option>
                        <option value="1">1 exacerbación</option>
                        <option value="gte2">≥ 2 exacerbaciones</option>
                    </select>
                </div>

                <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">OCS sistémicos en el último año</label>
                        <select id="acOcs" class="form-input" onchange="updateAsmaControlLiveCalcs()">
                            <option value="no">No</option>
                            <option value="si">Sí</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Tabaquismo activo</label>
                        <select id="acTabaco" class="form-input" onchange="updateAsmaControlLiveCalcs()">
                            <option value="no">No</option>
                            <option value="si">Sí (fumador activo)</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Live calcs -->
            <div id="acLiveCalcs"></div>

            <div style="background:#fef3c7; border-left:4px solid #f59e0b; padding:14px; border-radius:8px; margin-bottom:16px;">
                <p style="font-size:12px; color:#92400e; margin:0;">
                    <strong>⚕️ Herramienta de apoyo clínico</strong> — Verificar siempre la técnica inhalatoria y adherencia antes de subir escalón. Fuentes: GINA 2024 · SEPAR 2023 · ALAT 2023.
                </p>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:14px;">
                🫁 Generar Recomendación de Tratamiento
            </button>
        </form>
        <div id="acResult" style="display:none; margin-top:24px;"></div>
    `;
}

function _acToggleTratamiento(val) {
    const el = document.getElementById('acTratamientoFields');
    if (el) el.style.display = val === 'si' ? 'block' : 'none';
}

function updateAsmaControlLiveCalcs() {
    const container = document.getElementById('acLiveCalcs');
    if (!container) return;

    const enTrat  = document.getElementById('acEnTratamiento').value;
    const diurnos = document.getElementById('acSintomasDiurnos').value;
    const noct    = document.getElementById('acSintomasNocturnos').value;
    const lim     = document.getElementById('acLimitacion').value;
    const resc    = document.getElementById('acRescate').value;

    if (!enTrat || !diurnos || !noct || !lim || !resc) {
        container.innerHTML = '';
        return;
    }

    // Control score (GINA)
    let score = 0;
    if (diurnos === 'gt2' || diurnos === 'daily') score++;
    if (lim !== 'none') score++;
    if (noct === 'gt2' || noct === 'frequent') score++;
    if (resc === 'gt2') score++;

    let badge, label, color;
    if (score === 0)       { badge = '✅'; label = 'Bien controlado';          color = '#16a34a'; }
    else if (score <= 2)   { badge = '⚠️'; label = 'Parcialmente controlado'; color = '#ca8a04'; }
    else                   { badge = '🔴'; label = 'No controlado';            color = '#dc2626'; }

    const criterios = [];
    if (score > 0) {
        if (diurnos === 'gt2' || diurnos === 'daily') criterios.push('Síntomas diurnos > 2 días/sem');
        if (lim !== 'none') criterios.push('Limitación de actividad');
        if (noct === 'gt2' || noct === 'frequent') criterios.push('Despertares nocturnos');
        if (resc === 'gt2') criterios.push('Rescate > 2 días/sem');
    }

    container.innerHTML = `
        <div style="background:${color}22; border:1px solid ${color}55; border-radius:10px; padding:14px; margin-bottom:16px;">
            <div style="font-size:13px; font-weight:700; color:${color}; margin-bottom:${criterios.length ? 6 : 0}px;">${badge} Control estimado: ${label} (${score}/4 criterios)</div>
            ${criterios.length
                ? `<div style="font-size:12px; color:${color}cc; line-height:1.6;">Criterios presentes: ${criterios.join(' · ')}</div>`
                : '<div style="font-size:12px; color:#9ca3af;">Ningún criterio de mal control — asma bien controlada</div>'
            }
        </div>`;
}

function buildAsmaControlProtocolHTML(r, inputs) {
    const { enTratamiento, control, severidad, escalonActual, escalonRec, cambio,
            escalonData, riesgos, derivar, controlScore } = r;
    const c = escalonData.colorHex;
    let sn = 1;

    function section(icon, title, color, content) {
        return `
        <div style="background:${color}18; border:1px solid ${color}33; border-radius:10px; margin-bottom:12px; overflow:hidden;">
            <div style="background:${color}28; border-bottom:1px solid ${color}33; padding:11px 16px; display:flex; align-items:center; gap:8px;">
                <span style="font-size:17px;">${icon}</span>
                <span style="font-size:14px; font-weight:700; color:${color};">${title}</span>
            </div>
            <div style="padding:13px 16px; font-size:13px; line-height:1.85; color:var(--text-primary);">${content}</div>
        </div>`;
    }

    // Header
    const esNuevo  = enTratamiento === 'no';
    const cambioIcon = cambio === 'subir' ? '⬆️' : cambio === 'bajar' ? '⬇️' : cambio === 'mantener' ? '↔️' : '▶️';
    const cambioLabel = cambio === 'subir' ? 'Subir escalón' : cambio === 'bajar' ? 'Bajar escalón' : cambio === 'mantener' ? 'Mantener escalón' : 'Escalón inicial';

    let html = `
    <div style="background:${c}; border-radius:12px; padding:20px; margin-bottom:16px; color:white;">
        <div style="font-size:12px; font-weight:600; opacity:0.85; margin-bottom:4px; text-transform:uppercase; letter-spacing:0.05em;">
            ${esNuevo ? 'Clasificación y Tratamiento del Asma' : 'Control del Asma — Seguimiento'}
        </div>
        <div style="font-size:20px; font-weight:800; margin-bottom:6px;">
            ${esNuevo ? `${severidad.badge} ${severidad.label}` : `${control.badge} ${control.label}`}
        </div>
        <div style="display:flex; align-items:center; gap:10px; font-size:14px; opacity:0.9; margin-bottom:10px;">
            ${escalonActual ? `<span>Escalón ${escalonActual}</span><span>${cambioIcon}</span>` : ''}
            <span style="font-weight:700; font-size:16px;">${escalonData.label} ${cambioIcon} ${cambioLabel}</span>
        </div>
        ${!esNuevo ? `<div style="font-size:12px; opacity:0.8;">${controlScore}/4 criterios de mal control</div>` : ''}
    </div>`;

    // Derivación urgente
    if (derivar) {
        html += `<div style="background:#431407; border:1px solid #f97316; border-radius:10px; padding:14px; margin-bottom:12px; color:#fdba74;">
            🏥 <strong>Derivar a Neumología / Alergología</strong> — Escalón 4-5 o asma de difícil control. Evaluar fenotipo para biológicos.
        </div>`;
    }

    // 1. Evaluación de control (solo si en tratamiento)
    if (!esNuevo) {
        const ajuste = cambio === 'subir'
            ? `Subir a ${escalonData.label}: asma no controlada con tratamiento actual. Antes de subir: verificar técnica inhalatoria y adherencia.`
            : cambio === 'bajar'
            ? `Considerar bajar a ${escalonData.label}: bien controlada ≥ 3 meses. Reducir 25-50% dosis ICS. Reevaluar en 4-6 semanas.`
            : `Mantener ${escalonData.label}: continuar tratamiento actual. Reevaluar en 3-6 meses.`;
        html += section('📊', `${sn++}. Evaluación de Control`, c,
            `<b>Control:</b> ${control.badge} ${control.label} (${controlScore}/4 criterios)<br>
             <b>Recomendación:</b> ${ajuste}`);
    }

    // 2. Controlador
    if (escalonData.controlador) {
        let ctContent = `<b>${escalonData.controlador}</b><br>
            <div style="white-space:pre-line; margin: 6px 0 6px 8px;">${escalonData.controladorDetalle}</div>`;
        if (escalonData.controladorAlt) {
            ctContent += `<br><b>Opciones adicionales:</b> ${escalonData.controladorAlt}`;
        }
        if (escalonData.smart) {
            ctContent += `<br><span style="color:#38bdf8;"><b>💡 SMART disponible:</b> ${escalonData.rescatadorDetalle}</span>`;
        }
        html += section('💊', `${sn++}. Medicación Controladora`, c, ctContent);
    } else {
        html += section('💊', `${sn++}. Medicación Controladora`, '#16a34a',
            'Sin controlador diario necesario en Escalón 1. Si se usa rescate > 2 días/semana de forma consistente → subir a Escalón 2.');
    }

    // 3. Rescatador
    const rescContent = `<b>${escalonData.rescatador}</b><br>${escalonData.rescatadorDetalle}`;
    html += section('🫁', `${sn++}. Inhalador de Rescate (SABA / ICS-Formoterol)`, '#3b82f6', rescContent);

    // 4. Biológicos (solo escalón 5)
    if (escalonRec === 5 && escalonData.biologicos) {
        const bio = escalonData.biologicos;
        const bioContent = `
            <div style="margin-bottom:10px; padding:10px; background:#7c3aed22; border-radius:8px;">
                <div style="font-weight:700; color:#a78bfa; margin-bottom:4px;">🧬 ${bio.alergico.fenotipo}</div>
                <b>Fármaco:</b> ${bio.alergico.farmacos}<br>
                <b>Indicación:</b> ${bio.alergico.indicacion}
            </div>
            <div style="margin-bottom:10px; padding:10px; background:#dc262622; border-radius:8px;">
                <div style="font-weight:700; color:#f87171; margin-bottom:4px;">🔬 ${bio.eosinofilico.fenotipo}</div>
                <b>Fármacos:</b> ${bio.eosinofilico.farmacos}<br>
                <b>Indicación:</b> ${bio.eosinofilico.indicacion}
            </div>
            <div style="padding:10px; background:#0284c722; border-radius:8px;">
                <div style="font-weight:700; color:#38bdf8; margin-bottom:4px;">💉 ${bio.tipo2.fenotipo}</div>
                <b>Fármaco:</b> ${bio.tipo2.farmacos}<br>
                <b>Indicación:</b> ${bio.tipo2.indicacion}
            </div>`;
        html += section('🧬', `${sn++}. Biológicos por Fenotipo (Escalón 5)`, '#7c3aed', bioContent);
    }

    // 5. Factores de riesgo
    if (riesgos.length) {
        html += section('⚠️', `${sn++}. Factores de Riesgo Identificados`, '#f59e0b',
            riesgos.map(r => `• ${r}`).join('<br>'));
    }

    // 6. Medidas no farmacológicas
    html += section('📋', `${sn++}. Medidas No Farmacológicas`, '#64748b',
        `• <b>Técnica inhalatoria:</b> Revisar en cada visita (hasta 80% usan mal el inhalador)<br>
         • <b>Adherencia:</b> Clave antes de subir escalón<br>
         • <b>Evitar desencadenantes:</b> Alérgenos (polvo, ácaros, pollen), AINE/AAS, humo de tabaco, RGE<br>
         • <b>Vacunas:</b> Gripe anual · Neumococo (si ≥ 65a o escalón ≥ 3) · COVID<br>
         ${inputs.tabaco === 'si' ? '• <span style="color:#f87171;"><b>🚬 Cesación tabáquica urgente</b> — reduce respuesta al tratamiento y progresión de la enfermedad</span><br>' : ''}
         • <b>Plan de acción escrito:</b> Instrucciones para crisis leve y cuándo acudir a urgencias`);

    html += `<div style="font-size:11px; color:#64748b; text-align:right; margin-top:4px; padding:0 4px;">
        GINA 2024 · SEPAR 2023 · ALAT 2023</div>`;

    return html;
}

function calculateAsmaControlProtocol(event) {
    event.preventDefault();
    const enTrat = document.getElementById('acEnTratamiento').value;
    const inputs = {
        enTratamiento:     enTrat,
        escalon:           document.getElementById('acEscalon').value,
        tiempoEscalon:     document.getElementById('acTiempoEscalon').value,
        sintomasDiurnos:   document.getElementById('acSintomasDiurnos').value,
        sintomasNocturnos: document.getElementById('acSintomasNocturnos').value,
        limitacion:        document.getElementById('acLimitacion').value,
        rescate:           document.getElementById('acRescate').value,
        fev1fem:           document.getElementById('acFev1fem').value,
        exacerbaciones:    document.getElementById('acExacerbaciones').value,
        ocs:               document.getElementById('acOcs').value,
        tabaco:            document.getElementById('acTabaco').value,
    };
    const r = Calculators.calculateAsmaControl(inputs);
    const container = document.getElementById('acResult');
    container.innerHTML = buildAsmaControlProtocolHTML(r, inputs) + `
        <button class="btn btn-secondary" onclick="document.getElementById('asmaControlForm').reset(); document.getElementById('acResult').style.display='none'; document.getElementById('acLiveCalcs').innerHTML=''; _acToggleTratamiento('');" style="width:100%; margin-top:12px;">
            🔄 Nueva Evaluación
        </button>`;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 32, calculatorName: 'Control Asma', inputs, result: r, interpretation: r.interpretation });
}

// === 35. CALCULADORA GENERAL === //
// Estado global de la calculadora
let _cV = '0', _cPrev = null, _cOp = null, _cWait = false, _cExpr = '';

function _cUpdate() {
    const d = document.getElementById('calcDisplay');
    if (!d) return;

    // Poner el texto primero para poder medir scrollWidth
    d.textContent = _cV;

    // Reducir fuente hasta que quepa, o dejar que se salga por la izquierda (Apple)
    const sizes = [80, 66, 52, 40, 30];
    for (const sz of sizes) {
        d.style.fontSize = sz + 'px';
        if (d.scrollWidth <= d.clientWidth || sz === 30) break;
    }

    // Operator buttons: active = white bg + orange text; normal = orange bg + white text
    const opIds = { '÷':'calcOpD', '×':'calcOpX', '−':'calcOpS', '+':'calcOpA' };
    Object.entries(opIds).forEach(([sym, id]) => {
        const b = document.getElementById(id);
        if (!b) return;
        const isActive = _cOp === sym && _cWait;
        b.style.background = isActive ? '#ffffff' : '#FF9F0A';
        b.style.color      = isActive ? '#FF9F0A' : '#ffffff';
    });

    // AC / C toggle
    const acBtn = document.getElementById('calcBtnAC');
    if (acBtn) acBtn.textContent = (_cV === '0' && _cPrev === null) ? 'AC' : 'C';
}

function calcNum(d) {
    if (_cV === 'Error') return;
    if (_cWait) { _cV = String(d); _cWait = false; }
    else { _cV = _cV === '0' ? String(d) : _cV + d; }
    if (_cV.replace(/[-.]/, '').length > 12) { _cV = _cV.slice(0, -1); return; }
    _cUpdate();
}

function calcDot() {
    if (_cWait) { _cV = '0.'; _cWait = false; }
    else if (!_cV.includes('.')) { _cV += '.'; }
    _cUpdate();
}

function calcClear() {
    if (_cV !== '0') {
        _cV = '0';                                              // C: solo borra entrada actual
    } else {
        _cPrev = null; _cOp = null; _cWait = false; _cExpr = ''; // AC: borra todo
    }
    _cUpdate();
}

function calcBack() {
    if (_cWait || _cV === 'Error') { _cV = '0'; _cWait = false; _cUpdate(); return; }
    _cV = _cV.length > 1 ? _cV.slice(0, -1) : '0';
    _cUpdate();
}

function calcSign() {
    if (_cV === '0' || _cV === 'Error') return;
    _cV = _cV.startsWith('-') ? _cV.slice(1) : '-' + _cV;
    _cUpdate();
}

function calcPct() {
    const v = parseFloat(_cV);
    const result = _cPrev !== null && _cOp ? _cPrev * v / 100 : v / 100;
    _cV = String(parseFloat(result.toFixed(10)));
    _cWait = true;
    _cUpdate();
}

function calcOp(op) {
    if (_cV === 'Error') return;
    const v = parseFloat(_cV);
    if (_cPrev !== null && !_cWait) {
        const res = _cCalc(_cPrev, v, _cOp);
        if (!isFinite(res)) { _cV = 'Error'; _cPrev = 0; }
        else {
            const abs = Math.abs(res);
            _cV = (abs !== 0 && (abs >= 1e13 || abs < 1e-7))
                ? parseFloat(res.toPrecision(10)).toString()
                : String(parseFloat(res.toFixed(10)));
            _cPrev = parseFloat(_cV);
        }
    } else {
        _cPrev = v;
    }
    _cOp = op;
    _cWait = true;
    _cExpr = _cV + ' ' + op;
    _cUpdate();
}

function calcEq() {
    if (_cV === 'Error' || _cOp === null || _cPrev === null) return;
    const v = parseFloat(_cV);
    const res = _cCalc(_cPrev, v, _cOp);
    _cExpr = '';
    if (!isFinite(res)) {
        _cV = res === Infinity ? 'Error' : 'Error';
    } else {
        const abs = Math.abs(res);
        if (abs !== 0 && (abs >= 1e13 || abs < 1e-7)) {
            // Notación científica para números muy grandes o muy pequeños
            _cV = parseFloat(res.toPrecision(10)).toString();
        } else {
            _cV = String(parseFloat(res.toFixed(10)));
        }
    }
    _cPrev = null; _cOp = null; _cWait = true;
    _cUpdate();
}

function _cCalc(a, b, op) {
    if (op === '+') return a + b;
    if (op === '−') return a - b;
    if (op === '×') return a * b;
    if (op === '÷') return b === 0 ? Infinity : a / b;
    return b;
}

function createCalculadoraForm() {
    _cV = '0'; _cPrev = null; _cOp = null; _cWait = false; _cExpr = '';

    // Press feedback via brightness
    const tap = `onpointerdown="this.style.filter='brightness(1.5)'" onpointerup="this.style.filter='none'" onpointerleave="this.style.filter='none'"`;

    // Base style for all buttons
    const circle = `border:none;cursor:pointer;-webkit-tap-highlight-color:transparent;display:flex;align-items:center;justify-content:center;transition:filter 0.08s;width:100%;aspect-ratio:1/1;border-radius:50%;`;

    // Number buttons — dark gray, white text
    const nb = (lbl, fn) =>
        `<button onclick="${fn}" ${tap} style="${circle}background:#333;color:#fff;font-size:30px;font-weight:400;">${lbl}</button>`;

    // Utility buttons (AC/C, ±, %) — light gray, black text
    const ub = (lbl, fn, id = '') =>
        `<button ${id ? `id="${id}"` : ''} onclick="${fn}" ${tap} style="${circle}background:#a5a5a5;color:#000;font-size:${lbl.length > 1 ? '22px' : '28px'};font-weight:500;">${lbl}</button>`;

    // Operator buttons — Apple orange, toggled by _cUpdate
    const ob = (lbl, fn, id) =>
        `<button id="${id}" onclick="${fn}" ${tap} style="${circle}background:#FF9F0A;color:#fff;font-size:34px;font-weight:300;">${lbl}</button>`;

    // Wide pill 0 — spans 2 columns, left-padded
    const wideZero = `<button onclick="calcNum('0')" ${tap}
        style="border:none;cursor:pointer;-webkit-tap-highlight-color:transparent;
               grid-column:span 2;background:#333;color:#fff;font-size:30px;font-weight:400;
               border-radius:999px;display:flex;align-items:center;padding-left:28px;
               transition:filter 0.08s;">0</button>`;

    return `
        <div style="background:#000;border-radius:20px;overflow:hidden;max-width:380px;margin:0 auto;user-select:none;">

            <!-- Display -->
            <div style="padding:28px 24px 20px;min-height:150px;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-end;">
                <div id="calcDisplay"
                     style="font-size:80px;font-weight:200;color:#fff;line-height:1;
                            white-space:nowrap;overflow:hidden;text-align:right;width:100%;">0</div>
            </div>

            <!-- Botones -->
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:13px;padding:4px 16px 24px;">

                ${ub('AC', 'calcClear()', 'calcBtnAC')}
                ${ub('±',  'calcSign()')}
                ${ub('%',  'calcPct()')}
                ${ob('÷',  "calcOp('÷')", 'calcOpD')}

                ${nb('7', "calcNum('7')")}
                ${nb('8', "calcNum('8')")}
                ${nb('9', "calcNum('9')")}
                ${ob('×', "calcOp('×')", 'calcOpX')}

                ${nb('4', "calcNum('4')")}
                ${nb('5', "calcNum('5')")}
                ${nb('6', "calcNum('6')")}
                ${ob('−', "calcOp('−')", 'calcOpS')}

                ${nb('1', "calcNum('1')")}
                ${nb('2', "calcNum('2')")}
                ${nb('3', "calcNum('3')")}
                ${ob('+', "calcOp('+')", 'calcOpA')}

                ${wideZero}
                ${nb('.', 'calcDot()')}
                ${ob('=', 'calcEq()', 'calcBtnEq')}

            </div>
        </div>
    `;
}

// === 34. PAM — PRESIÓN ARTERIAL MEDIA === //
function createPAMForm() {
    return `
        <form id="pamForm" onsubmit="calculatePAM(event)">
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:14px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:14px; text-transform:uppercase; letter-spacing:0.05em;">Tensión Arterial</div>

                <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">PAS (mmHg)</label>
                        <input type="number" id="pamPas" required min="40" max="300" class="form-input" placeholder="ej: 120" oninput="updatePAMLive()">
                        <p style="font-size:11px; color:var(--text-tertiary); margin-top:4px;">Sistólica</p>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">PAD (mmHg)</label>
                        <input type="number" id="pamPad" required min="20" max="200" class="form-input" placeholder="ej: 80" oninput="updatePAMLive()">
                        <p style="font-size:11px; color:var(--text-tertiary); margin-top:4px;">Diastólica</p>
                    </div>
                </div>

                <div id="pamLive"></div>
            </div>

            <div style="background:var(--bg-secondary); padding:14px; border-radius:10px; margin-bottom:14px; font-size:12px; color:var(--text-secondary); line-height:1.7;">
                <strong>Objetivos clínicos orientativos:</strong><br>
                ≥ 65 mmHg — Shock séptico (SSC 2021) · UCI general<br>
                ≥ 70 mmHg — Shock cardiogénico<br>
                ≥ 80 mmHg — TCE grave · HTA crónica previa
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:14px;">
                🩸 Calcular PAM
            </button>
        </form>
        <div id="pamResult" style="display:none; margin-top:20px;"></div>
    `;
}

function updatePAMLive() {
    const el = document.getElementById('pamLive');
    if (!el) return;
    const pas = parseFloat(document.getElementById('pamPas').value);
    const pad = parseFloat(document.getElementById('pamPad').value);
    if (isNaN(pas) || isNaN(pad)) { el.innerHTML = ''; return; }
    const pam = Math.round((pad + (pas - pad) / 3) * 10) / 10;
    const color = pam < 60 ? '#ef4444' : pam < 65 ? '#f59e0b' : pam <= 100 ? '#22c55e' : '#f59e0b';
    el.innerHTML = `
        <div style="background:${color}20; border:1px solid ${color}55; border-radius:8px; padding:10px 14px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:13px; font-weight:600; color:${color};">PAM estimada</span>
            <span style="font-size:20px; font-weight:800; color:${color};">${pam} <span style="font-size:13px; font-weight:500;">mmHg</span></span>
        </div>`;
}

function calculatePAM(event) {
    event.preventDefault();
    const inputs = {
        pas: parseFloat(document.getElementById('pamPas').value),
        pad: parseFloat(document.getElementById('pamPad').value)
    };
    const r = Calculators.calculatePAM(inputs);
    const colors = { danger: '#ef4444', warning: '#f59e0b', success: '#22c55e' };
    const c = colors[r.interpretation.color] || '#64748b';
    document.getElementById('pamResult').innerHTML = `
        <div style="background:${c}; border-radius:12px; padding:20px; margin-bottom:14px; color:white;">
            <div style="font-size:12px; font-weight:600; opacity:0.85; margin-bottom:4px; text-transform:uppercase; letter-spacing:0.05em;">Presión Arterial Media</div>
            <div style="font-size:48px; font-weight:900; line-height:1; margin-bottom:6px;">${r.value} <span style="font-size:18px; font-weight:500;">mmHg</span></div>
            <div style="font-size:15px; font-weight:700;">${r.interpretation.stage} — ${r.interpretation.label}</div>
        </div>
        <div style="background:var(--bg-secondary); border-left:4px solid ${c}; padding:16px; border-radius:10px; margin-bottom:14px;">
            <p style="font-size:13px; color:var(--text-primary); margin:0; line-height:1.6;">${r.interpretation.description}</p>
        </div>
        <div style="background:var(--bg-secondary); padding:14px; border-radius:10px; margin-bottom:14px; font-size:12px; color:var(--text-secondary); line-height:1.7;">
            <strong style="color:var(--text-primary);">Fórmula:</strong> PAM = PAD + (PAS − PAD) / 3 = ${inputs.pad} + (${inputs.pas} − ${inputs.pad}) / 3 = <strong>${r.value} mmHg</strong>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('pamForm').reset(); document.getElementById('pamResult').style.display='none'; document.getElementById('pamLive').innerHTML='';" style="width:100%;">
            🔄 Nuevo Cálculo
        </button>`;
    document.getElementById('pamResult').style.display = 'block';
    Storage.addToHistory({ calculatorId: 34, calculatorName: 'PAM', inputs, result: r, interpretation: r.interpretation });
}

// === 33. DIAGNÓSTICO LES — CRITERIOS ACR/EULAR 2019 === //
function createLESForm() {
    // Helper: genera una sección de dominio con checkboxes individuales
    // items: [[id, label, pts, nota?], ...]
    function domCheck(icon, title, max, items) {
        return `
        <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <div style="font-size:13px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em;">${icon} ${title}</div>
                <span style="font-size:11px; color:var(--text-tertiary); background:var(--bg-card); padding:2px 8px; border-radius:12px;">máx ${max} pts</span>
            </div>
            <p style="font-size:11px; color:var(--text-tertiary); margin-top:3px; margin-bottom:12px;">Marque todos los presentes — suma solo el de mayor puntuación</p>
            ${items.map(([id, label, pts, note]) => `
            <label style="display:flex; align-items:flex-start; gap:10px; padding:10px; border-radius:8px; cursor:pointer; margin-bottom:5px; background:var(--bg-card);">
                <input type="checkbox" id="${id}" onchange="updateLESLiveCalcs()" style="margin-top:2px; flex-shrink:0; width:16px; height:16px; accent-color:#7c3aed; cursor:pointer;">
                <div style="flex:1; min-width:0;">
                    <div style="font-size:13px; font-weight:500; color:var(--text-primary);">${label}</div>
                    ${note ? `<div style="font-size:11px; color:var(--text-tertiary); margin-top:2px;">${note}</div>` : ''}
                </div>
                <div style="font-size:12px; font-weight:700; color:#7c3aed; flex-shrink:0; padding-left:8px;">${pts} pts</div>
            </label>`).join('')}
        </div>`;
    }

    return `
        <form id="lesForm" onsubmit="calculateLESForm(event)">

            <!-- ANA: criterio de entrada obligatorio -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:16px; border:2px solid #3b82f655;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <div style="font-size:13px; font-weight:700; color:#3b82f6; text-transform:uppercase; letter-spacing:0.05em;">🔬 Criterio de Entrada</div>
                    <span style="font-size:11px; background:#3b82f622; color:#3b82f6; padding:2px 8px; border-radius:12px; font-weight:600;">obligatorio</span>
                </div>
                <div class="form-group" style="margin-bottom:0;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Anticuerpos Antinucleares (ANA)</label>
                    <select id="lesAna" required class="form-input" onchange="updateLESLiveCalcs()">
                        <option value="">-- Seleccionar --</option>
                        <option value="positive">✅ Positivo ≥1:80 (HEp-2 o técnica equivalente validada)</option>
                        <option value="negative">❌ Negativo &lt;1:80</option>
                        <option value="not_done">⚠️ No realizado aún</option>
                    </select>
                    <p style="font-size:11px; color:var(--text-tertiary); margin-top:4px;">ANA ≥1:80 es requisito obligatorio para clasificación formal ACR/EULAR 2019</p>
                </div>
            </div>

            <!-- Dominios clínicos — checkboxes individuales (suma solo el mayor por dominio) -->
            ${domCheck('🌡️', 'Constitucional', 2, [
                ['lesFever', 'Fiebre >38.3°C inexplicada', 2, 'Descartar infección u otra causa']
            ])}

            ${domCheck('🩸', 'Hematológico', 4, [
                ['lesLeukopenia',       'Leucopenia <4.000/µL', 3, null],
                ['lesThrombocytopenia', 'Trombocitopenia <100.000/µL', 4, null],
                ['lesHemolysis',        'Hemólisis autoinmune', 4, 'Coombs directo positivo + anemia hemolítica']
            ])}

            ${domCheck('🧠', 'Neuropsiquiátrico', 5, [
                ['lesDelirium',  'Delirium', 2, 'Excluir causas metabólicas, tóxicas o infecciosas'],
                ['lesPsychosis', 'Psicosis', 3, null],
                ['lesSeizures',  'Convulsiones', 5, null]
            ])}

            ${domCheck('🔴', 'Mucocutáneo', 6, [
                ['lesAlopecia',        'Alopecia no cicatricial (parcheada o difusa)', 2, null],
                ['lesOralUlcers',      'Úlceras orales (paladar o mucosa oral)', 2, null],
                ['lesSubacuteDiscoid', 'Lupus cutáneo subagudo o discoide', 4, null],
                ['lesAcuteCutaneous',  'Lupus cutáneo agudo — eritema malar / rash fotosensible', 6, null]
            ])}

            ${domCheck('💧', 'Seroso', 6, [
                ['lesEffusion',     'Derrame pleural o pericárdico (sin otra causa)', 5, null],
                ['lesPericarditis', 'Pericarditis aguda (≥2: dolor, roce, ST difuso, derrame)', 6, null]
            ])}

            ${domCheck('🦴', 'Musculoesquelético', 6, [
                ['lesJoints', 'Sinovitis ≥2 articulaciones o rigidez matutina ≥30 min', 6, null]
            ])}

            ${domCheck('🫘', 'Renal', 10, [
                ['lesProteinuria', 'Proteinuria >0.5 g/24h o cociente Pr/Cr >0.5', 4, null],
                ['lesBiopsy25',    'Biopsia renal: Nefritis lúpica clase II o V', 8, null],
                ['lesBiopsy34',    'Biopsia renal: Nefritis lúpica clase III o IV', 10, null]
            ])}

            <!-- Dominio inmunológico: selects (mantienen "No realizado" como estado distinto de negativo) -->
            <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; margin-bottom:16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <div style="font-size:13px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em;">🔬 Inmunológico</div>
                    <span style="font-size:11px; color:var(--text-tertiary); background:var(--bg-card); padding:2px 8px; border-radius:12px;">máx 12 pts · 3 categorías aditivas</span>
                </div>
                <p style="font-size:11px; color:var(--text-tertiary); margin-top:3px; margin-bottom:14px;">Estas 3 categorías se suman entre sí (a diferencia de los dominios clínicos)</p>

                <div class="form-group" style="margin-bottom:14px;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:13px;">Anticuerpos antifosfolípidos <span style="font-weight:400; color:var(--text-tertiary);">(+2 pts si positivo)</span></label>
                    <select id="lesAntiphospholipid" class="form-input" onchange="updateLESLiveCalcs()">
                        <option value="not_done">No realizado</option>
                        <option value="negative">Negativos</option>
                        <option value="positive">Positivos — anti-CL IgG >40 GPL · anti-β2GPI IgG >40 U · o anticoagulante lúpico</option>
                    </select>
                </div>

                <div class="form-group" style="margin-bottom:14px;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:13px;">Complemento <span style="font-weight:400; color:var(--text-tertiary);">(+3 o +4 pts)</span></label>
                    <select id="lesComplement" class="form-input" onchange="updateLESLiveCalcs()">
                        <option value="not_done">No realizado</option>
                        <option value="normal">Normal — C3 y C4 en rango</option>
                        <option value="one_low">C3 O C4 bajo — 3 pts</option>
                        <option value="both_low">C3 Y C4 ambos bajos — 4 pts</option>
                    </select>
                </div>

                <div class="form-group" style="margin-bottom:0;">
                    <label style="display:block; margin-bottom:6px; font-weight:600; font-size:13px;">Anticuerpos específicos LES <span style="font-weight:400; color:var(--text-tertiary);">(+6 pts)</span></label>
                    <select id="lesSpecificAb" class="form-input" onchange="updateLESLiveCalcs()">
                        <option value="not_done">No realizado</option>
                        <option value="negative">Negativos</option>
                        <option value="positive">Anti-dsDNA positivo (≥90% especificidad) O Anti-Sm positivo</option>
                    </select>
                </div>
            </div>

            <!-- Score en tiempo real -->
            <div id="lesLiveCalcs"></div>

            <div style="background:#fef3c7; border-left:4px solid #f59e0b; padding:14px; border-radius:8px; margin-bottom:16px;">
                <p style="font-size:12px; color:#92400e; margin:0;">
                    <strong>⚠️ Herramienta de apoyo clínico</strong> — Criterios de <em>clasificación</em>, no de diagnóstico definitivo. Marque solo criterios sin explicación alternativa más probable. Basado en: Aringer M et al., Arthritis Rheumatol 2019.
                </p>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; padding:14px;">
                🧬 Calcular Score ACR/EULAR 2019
            </button>
        </form>
        <div id="lesResult" style="display:none; margin-top:24px;"></div>
    `;
}

function updateLESLiveCalcs() {
    const container = document.getElementById('lesLiveCalcs');
    if (!container) return;

    const ana = document.getElementById('lesAna').value;
    if (!ana) { container.innerHTML = ''; return; }

    const ck = id => document.getElementById(id)?.checked || false;

    const sc  = ck('lesFever') ? 2 : 0;
    const sh  = Math.max(ck('lesLeukopenia') ? 3 : 0, ck('lesThrombocytopenia') ? 4 : 0, ck('lesHemolysis') ? 4 : 0);
    const sn  = Math.max(ck('lesDelirium') ? 2 : 0, ck('lesPsychosis') ? 3 : 0, ck('lesSeizures') ? 5 : 0);
    const sm  = Math.max(ck('lesAlopecia') ? 2 : 0, ck('lesOralUlcers') ? 2 : 0, ck('lesSubacuteDiscoid') ? 4 : 0, ck('lesAcuteCutaneous') ? 6 : 0);
    const ss  = Math.max(ck('lesEffusion') ? 5 : 0, ck('lesPericarditis') ? 6 : 0);
    const smu = ck('lesJoints') ? 6 : 0;
    const sr  = Math.max(ck('lesProteinuria') ? 4 : 0, ck('lesBiopsy25') ? 8 : 0, ck('lesBiopsy34') ? 10 : 0);

    const aphospho = document.getElementById('lesAntiphospholipid').value;
    const comp     = document.getElementById('lesComplement').value;
    const specAb   = document.getElementById('lesSpecificAb').value;
    const sap = aphospho === 'positive' ? 2 : 0;
    const sco = comp === 'both_low' ? 4 : comp === 'one_low' ? 3 : 0;
    const sab = specAb === 'positive' ? 6 : 0;
    const total   = sc + sh + sn + sm + ss + smu + sr + sap + sco + sab;
    const pending = [aphospho, comp, specAb].filter(v => v === 'not_done').length;

    let badge, label, color;
    if (ana === 'not_done')                     { badge = '⚠️'; label = 'Score parcial — ANA pendiente';            color = '#2563eb'; }
    else if (ana === 'negative')                { badge = '⬜'; label = 'ANA negativo — LES muy improbable';        color = '#475569'; }
    else if (ana === 'positive' && total >= 10) { badge = '🧬'; label = 'Cumple criterios ACR/EULAR 2019 para LES'; color = '#7c3aed'; }
    else if (ana === 'positive' && total >= 7)  { badge = '🟡'; label = 'Score elevado — completar evaluación';      color = '#ca8a04'; }
    else                                        { badge = '🟢'; label = 'Score bajo — no cumple criterios';          color = '#16a34a'; }

    container.innerHTML = `
        <div style="background:${color}22; border:1px solid ${color}55; border-radius:10px; padding:14px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <div style="font-size:13px; font-weight:700; color:${color};">${badge} ${label}</div>
                <div style="font-size:22px; font-weight:800; color:${color};">${total}<span style="font-size:12px; font-weight:500;"> pts</span></div>
            </div>
            <div style="font-size:12px; color:${color}cc;">
                Umbral: ≥10 pts + ANA positivo${pending > 0 ? ` · ${pending} test${pending > 1 ? 's' : ''} inmunológico${pending > 1 ? 's' : ''} pendiente${pending > 1 ? 's' : ''}` : ''}
            </div>
        </div>`;
}

function buildLESResultHTML(r, inputs) {
    const { totalScore, classification, classLabel, pendingTests, maxAdditional, domains } = r;

    const colorMap = {
        'met':          '#7c3aed',
        'possible':     '#ca8a04',
        'not_met':      '#16a34a',
        'incomplete':   '#2563eb',
        'ana_negative': '#475569'
    };
    const c = colorMap[classification] || '#64748b';

    const badgeMap = {
        'met':          '🧬 CUMPLE CRITERIOS ACR/EULAR 2019',
        'possible':     '🟡 SCORE ELEVADO — EVALUACIÓN INCOMPLETA',
        'not_met':      '🟢 NO CUMPLE CRITERIOS',
        'incomplete':   '⚠️ EVALUACIÓN INCOMPLETA',
        'ana_negative': '⬜ ANA NEGATIVO'
    };

    // Header
    let html = `
    <div style="background:${c}; border-radius:12px; padding:20px; margin-bottom:16px; color:white;">
        <div style="font-size:12px; font-weight:600; opacity:0.85; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.05em;">Lupus Eritematoso Sistémico — Clasificación</div>
        <div style="font-size:16px; font-weight:800; margin-bottom:10px;">${badgeMap[classification]}</div>
        <div style="display:flex; align-items:baseline; gap:10px; margin-bottom:6px;">
            <span style="font-size:44px; font-weight:900; line-height:1;">${totalScore}</span>
            <span style="font-size:15px; opacity:0.85;">pts &nbsp;/&nbsp; umbral ≥10 + ANA positivo</span>
        </div>
        <div style="font-size:13px; opacity:0.9;">${classLabel}</div>
    </div>`;

    // ANA alerts
    if (r.anaNotDone) {
        html += `<div style="background:#1e3a5f; border:1px solid #3b82f6; border-radius:10px; padding:14px; margin-bottom:12px; color:#93c5fd;">
            ⚠️ <strong>ANA no realizado</strong> — Es el criterio de entrada obligatorio según ACR/EULAR 2019. Sin ANA no puede emitirse clasificación definitiva. Solicitar urgente.
        </div>`;
    } else if (r.anaNegative) {
        html += `<div style="background:#1e293b; border:1px solid #64748b; border-radius:10px; padding:14px; margin-bottom:12px; color:#94a3b8;">
            ❌ <strong>ANA negativo</strong> — Descarta LES con sensibilidad del 97-99%. No se aplica la clasificación ACR/EULAR 2019.<br>
            <span style="font-size:11px;">Excepción rara: LES ANA-negativo (&lt;1% de casos). Si la sospecha clínica es muy alta, repetir ANA en distinto laboratorio/técnica.</span>
        </div>`;
    }

    // Domain breakdown
    html += `
    <div style="background:var(--bg-secondary); border-radius:10px; padding:16px; margin-bottom:12px;">
        <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:12px; text-transform:uppercase; letter-spacing:0.05em;">Desglose por Dominio</div>
        ${domains.map(d => {
            const checkedCriteria = d.isAdditive
                ? d.criteria.filter(cr => cr.state !== 'not_done')
                : d.criteria.filter(cr => cr.checked);
            return `
            <div style="padding:9px 0; border-bottom:1px solid rgba(148,163,184,0.15);">
                <div style="display:flex; justify-content:space-between; align-items:center; ${checkedCriteria.length ? 'margin-bottom:5px;' : ''}">
                    <div style="font-size:13px; font-weight:600; color:var(--text-primary);">${d.icon} ${d.name}</div>
                    <div style="font-size:15px; font-weight:700; color:${d.score > 0 ? c : 'var(--text-tertiary)'};">
                        ${d.score}<span style="font-size:11px; font-weight:400; color:var(--text-tertiary);"> / ${d.max}</span>
                    </div>
                </div>
                ${d.isAdditive
                    ? d.criteria.map(cr => {
                        const isNotDone = cr.state === 'not_done';
                        const isPos     = cr.score > 0;
                        const col = isNotDone ? '#64748b' : isPos ? c : '#475569';
                        const icon = isNotDone ? '○' : isPos ? '✓' : '✗';
                        return `<div style="display:flex; justify-content:space-between; padding:2px 0 2px 14px; font-size:12px; color:${col};">
                            <span>${icon} ${cr.label}${isNotDone ? ' — pendiente' : ''}</span>
                            <span style="margin-left:8px; white-space:nowrap;">${isNotDone ? '? pts' : isPos ? `+${cr.score} pts` : '0 pts'}</span>
                        </div>`;
                    }).join('')
                    : checkedCriteria.map(cr => {
                        const col = cr.counts ? c : '#64748b';
                        return `<div style="display:flex; justify-content:space-between; padding:2px 0 2px 14px; font-size:12px; color:${col};">
                            <span>${cr.counts ? '✓' : '↳'} ${cr.label}</span>
                            <span style="margin-left:8px; white-space:nowrap;">${cr.pts} pts${cr.counts ? '' : ' — no suma'}</span>
                        </div>`;
                    }).join('')
                }
            </div>`;
        }).join('')}
        <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0 0 0; border-top:2px solid ${c}44; margin-top:4px;">
            <div style="font-size:14px; font-weight:700; color:var(--text-primary);">TOTAL</div>
            <div style="font-size:22px; font-weight:800; color:${c};">${totalScore} pts</div>
        </div>
    </div>`;

    // Pending tests
    if (pendingTests.length > 0) {
        html += `
        <div style="background:var(--bg-secondary); border:1px solid #f59e0b44; border-radius:10px; padding:14px; margin-bottom:12px;">
            <div style="font-size:13px; font-weight:700; color:#fbbf24; margin-bottom:8px;">📋 Tests pendientes que podrían modificar el resultado</div>
            ${maxAdditional > 0 ? `<div style="font-size:12px; color:#d97706; margin-bottom:10px; padding:6px 10px; background:#f59e0b22; border-radius:6px;">Hasta +${maxAdditional} pts adicionales posibles si positivos</div>` : ''}
            ${pendingTests.map(t => `
            <div style="padding:6px 0; border-bottom:1px solid rgba(148,163,184,0.12);">
                <div style="font-size:13px; color:var(--text-primary);">→ ${t.test}</div>
                <div style="font-size:11px; color:#d97706; padding-left:12px;">${t.pts}</div>
            </div>`).join('')}
        </div>`;
    }

    // Differential diagnosis (ANA negative)
    if (r.anaNegative) {
        html += `
        <div style="background:var(--bg-secondary); border-radius:10px; padding:14px; margin-bottom:12px;">
            <div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin-bottom:10px; text-transform:uppercase; letter-spacing:0.05em;">Diagnósticos alternativos a considerar</div>
            <div style="font-size:13px; line-height:1.9; color:var(--text-primary);">
                • Enfermedad mixta del tejido conectivo (EMTC) — anti-U1-RNP<br>
                • Síndrome de Sjögren primario — anti-Ro/SSA, anti-La/SSB<br>
                • Artritis reumatoide — FR, anti-CCP<br>
                • Vasculitis ANCA-asociada — ANCA c/p<br>
                • Lupus inducido por fármacos — anti-histona<br>
                • Síndrome antifosfolípido primario
            </div>
        </div>`;
    }

    // Referral
    if (classification === 'met' || classification === 'possible' || (r.anaNotDone && totalScore >= 5)) {
        html += `
        <div style="background:#1e3a2f; border:1px solid #22c55e33; border-radius:10px; padding:14px; margin-bottom:12px; color:#86efac;">
            👨‍⚕️ <strong>Derivar a Reumatología</strong><br>
            <span style="font-size:12px;">Los criterios ACR/EULAR 2019 son de <em>clasificación</em> (no diagnóstico definitivo). El diagnóstico clínico, la evaluación de actividad y el plan terapéutico requieren valoración especializada.</span>
        </div>`;
    }

    html += `<div style="font-size:11px; color:#64748b; text-align:right; margin-top:4px; padding:0 4px;">
        ACR/EULAR 2019 · Aringer M et al., Arthritis Rheumatol 2019;71:1400-1412</div>`;

    return html;
}

function calculateLESForm(event) {
    event.preventDefault();
    const ck = id => document.getElementById(id)?.checked || false;
    const inputs = {
        ana:               document.getElementById('lesAna').value,
        fever:             ck('lesFever'),
        leukopenia:        ck('lesLeukopenia'),
        thrombocytopenia:  ck('lesThrombocytopenia'),
        hemolysis:         ck('lesHemolysis'),
        delirium:          ck('lesDelirium'),
        psychosis:         ck('lesPsychosis'),
        seizures:          ck('lesSeizures'),
        alopecia:          ck('lesAlopecia'),
        oralUlcers:        ck('lesOralUlcers'),
        subacuteDiscoid:   ck('lesSubacuteDiscoid'),
        acuteCutaneous:    ck('lesAcuteCutaneous'),
        effusion:          ck('lesEffusion'),
        pericarditis:      ck('lesPericarditis'),
        joints:            ck('lesJoints'),
        proteinuria:       ck('lesProteinuria'),
        biopsy25:          ck('lesBiopsy25'),
        biopsy34:          ck('lesBiopsy34'),
        antiphospholipid:  document.getElementById('lesAntiphospholipid').value,
        complement:        document.getElementById('lesComplement').value,
        specificAb:        document.getElementById('lesSpecificAb').value,
    };
    const r = Calculators.calculateLES(inputs);
    const container = document.getElementById('lesResult');
    container.innerHTML = buildLESResultHTML(r, inputs) + `
        <button class="btn btn-secondary" onclick="document.getElementById('lesForm').reset(); document.getElementById('lesResult').style.display='none'; document.getElementById('lesLiveCalcs').innerHTML='';" style="width:100%; margin-top:12px;">
            🔄 Nueva Evaluacion
        </button>`;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 33, calculatorName: 'Diagnóstico LES', inputs, result: r, interpretation: r.interpretation });
}

// === FUNCIÓN GENÉRICA PARA MOSTRAR RESULTADOS === //
function displayGenericResult(result, inputs, calcId, calcName, formula, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">RESULTADO</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">
                ${result.value} <span style="font-size: 20px; font-weight: 600;">${result.unit}</span>
            </div>
            <div style="font-size: 14px; font-weight: 600;">
                ${result.interpretation.stage || ''}${result.interpretation.stage ? ': ' : ''}${result.interpretation.label}
            </div>
            ${formula ? `<div style="font-size: 12px; margin-top: 8px; opacity: 0.8;">Fórmula: ${formula}</div>` : ''}
        </div>
        <div class="interpretation-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); border-left: 4px solid var(--${result.interpretation.color});">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Interpretación</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
                ${result.interpretation.description}
            </p>
        </div>
        <button class="btn btn-secondary" onclick="resetCalculator('${containerId}')" style="width: 100%; margin-top: 16px;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
}

function resetCalculator(containerId) {
    const formId = containerId.replace('Result', 'Form');
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        document.getElementById(containerId).style.display = 'none';
    }
}
