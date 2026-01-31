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
                <input type="number" id="sodiumNa" required step="0.1" min="120" max="160" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Glucosa (${units.glucose})
                </label>
                <input type="number" id="glucose" required step="1" class="form-input">
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
                <input type="number" id="weight" required step="0.1" min="30" max="300" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Altura (${units.height})
                </label>
                <input type="number" id="height" required step="0.1" class="form-input">
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
                <input type="number" id="weightBSA" required step="0.1" min="30" max="300" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Altura (${units.height})
                </label>
                <input type="number" id="heightBSA" required step="0.1" class="form-input">
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
                <input type="number" id="sodiumOsm" required step="0.1" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Glucosa (${units.glucose})
                </label>
                <input type="number" id="glucoseOsm" required step="1" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    BUN (${units.bun})
                </label>
                <input type="number" id="bunOsm" required step="1" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Osmolaridad medida (opcional) - mOsm/kg
                </label>
                <input type="number" id="measuredOsm" step="1" class="form-input" placeholder="Dejar vacío si no se midió">
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
