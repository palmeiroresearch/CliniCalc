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
function createNIHSSForm() {
    const select = (id, options) => `
        <select id="${id}" class="form-input" style="margin-bottom: 0;">
            ${options.map((o, i) => `<option value="${i}">${i} – ${o}</option>`).join('')}
        </select>`;

    const item = (label, id, options) => `
        <div style="margin-bottom: 14px;">
            <label style="display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px;">${label}</label>
            ${select(id, options)}
        </div>`;

    return `
        <form id="nihssForm" onsubmit="calculateNIHSS(event)">
            <div class="alert-box" style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #1e3a8a; margin: 0;">
                    <strong>ℹ️ Nota:</strong> NIHSS evalúa la severidad del ACV isquémico. Escala validada para guiar decisión de trombolisis y trombectomía mecánica.
                </p>
            </div>

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em;">Conciencia</div>
            ${item('1a. Nivel de conciencia', 'nihssLOC', ['Alerta', 'Somnoliento (estimulación menor)', 'Estuporoso (estímulo repetido)', 'Coma (sólo reflejos)'])}
            ${item('1b. Preguntas de orientación (mes y edad)', 'nihssLOCQ', ['Ambas correctas', 'Una correcta', 'Ninguna / intubado / afásico'])}
            ${item('1c. Órdenes motoras (ojos y mano)', 'nihssLOCC', ['Ambas correctas', 'Una correcta', 'Ninguna'])}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Oculomotor y Visual</div>
            ${item('2. Mirada conjugada', 'nihssGaze', ['Normal', 'Paresia parcial (puede ser superada)', 'Desviación forzada o parálisis completa'])}
            ${item('3. Campos visuales', 'nihssVisual', ['Sin pérdida', 'Hemianopsia parcial', 'Hemianopsia completa', 'Ceguera bilateral'])}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Motricidad Facial</div>
            ${item('4. Parálisis facial', 'nihssFacial', ['Normal', 'Leve (borramiento surco nasogeniano)', 'Parcial (parálisis inferior)', 'Completa (hemiplejia facial)'])}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Motor Extremidades (10 s brazo / 5 s pierna)</div>
            ${item('5a. Motor brazo izquierdo', 'nihssMAL', ['Sin caída (10 s)', 'Caída sin tocar cama', 'Algo contra gravedad', 'Sin movimiento contra gravedad', 'Sin movimiento'])}
            ${item('5b. Motor brazo derecho', 'nihssMAR', ['Sin caída (10 s)', 'Caída sin tocar cama', 'Algo contra gravedad', 'Sin movimiento contra gravedad', 'Sin movimiento'])}
            ${item('6a. Motor pierna izquierda', 'nihssMLegL', ['Sin caída (5 s)', 'Caída sin tocar cama', 'Algo contra gravedad', 'Sin movimiento contra gravedad', 'Sin movimiento'])}
            ${item('6b. Motor pierna derecha', 'nihssMLegR', ['Sin caída (5 s)', 'Caída sin tocar cama', 'Algo contra gravedad', 'Sin movimiento contra gravedad', 'Sin movimiento'])}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Coordinación y Sensibilidad</div>
            ${item('7. Ataxia de extremidades', 'nihssAtaxia', ['Ausente', 'En una extremidad', 'En dos extremidades'])}
            ${item('8. Sensibilidad', 'nihssSensory', ['Normal', 'Pérdida leve-moderada (siente el pinchazo)', 'Pérdida severa o bilateral (no siente)'])}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Lenguaje y Habla</div>
            ${item('9. Mejor lenguaje', 'nihssLanguage', ['Normal', 'Afasia leve-moderada', 'Afasia severa (comunicación fragmentada)', 'Mutismo / afasia global'])}
            ${item('10. Disartria', 'nihssDysarthria', ['Normal', 'Leve-moderada (inteligible)', 'Severa (ininteligible) o intubado'])}

            <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); margin: 14px 0 10px; text-transform: uppercase; letter-spacing: 0.05em;">Inatención</div>
            ${item('11. Extinción e inatención', 'nihssExtinction', ['Normal', 'Inatención en una modalidad', 'Hemineglect severo (>1 modalidad)'])}

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
