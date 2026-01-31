// ============================================
// CLINICALC - FORMULARIOS DE CALCULADORAS
// Formularios completos para todas las calculadoras
// ============================================

// === 11. CHILD-PUGH === //
function createChildPughForm() {
    return `
        <form id="childPughForm" onsubmit="calculateChildPugh(event)">
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Bilirrubina total (mg/dL)
                </label>
                <input type="number" id="bilirubinCP" required step="0.1" min="0.1" max="20" class="form-input">
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Albúmina sérica (g/dL)
                </label>
                <input type="number" id="albuminCP" required step="0.1" min="1" max="6" class="form-input">
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    INR
                </label>
                <input type="number" id="inrCP" required step="0.1" min="0.8" max="5" class="form-input">
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Ascitis
                </label>
                <select id="ascitesCP" required class="form-input">
                    <option value="1">Ausente</option>
                    <option value="2">Leve (controlada con diuréticos)</option>
                    <option value="3">Moderada/Severa (refractaria)</option>
                </select>
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Encefalopatía hepática
                </label>
                <select id="encephalopathyCP" required class="form-input">
                    <option value="1">Ausente</option>
                    <option value="2">Grado I-II (mínima)</option>
                    <option value="3">Grado III-IV (avanzada)</option>
                </select>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular Child-Pugh
            </button>
        </form>
        <div id="childPughResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateChildPugh(event) {
    event.preventDefault();
    const inputs = {
        bilirubin: parseFloat(document.getElementById('bilirubinCP').value),
        albumin: parseFloat(document.getElementById('albuminCP').value),
        inr: parseFloat(document.getElementById('inrCP').value),
        ascites: document.getElementById('ascitesCP').value,
        encephalopathy: document.getElementById('encephalopathyCP').value
    };
    const result = Calculators.calculateChildPugh(inputs);
    displayGenericResult(result, inputs, 11, 'Child-Pugh', null, 'childPughResult');
    Storage.addToHistory({ 
        calculatorId: 11, 
        calculatorName: 'Child-Pugh', 
        inputs, 
        result, 
        interpretation: result.interpretation 
    });
}

// === 12. CURB-65 === //
function createCURB65Form() {
    return `
        <form id="curb65Form" onsubmit="calculateCURB65(event)">
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Edad (años)
                </label>
                <input type="number" id="ageCURB" required min="18" max="120" class="form-input">
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    BUN/Urea (mg/dL)
                </label>
                <input type="number" id="bunCURB" required step="1" min="0" max="200" class="form-input">
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Frecuencia respiratoria (rpm)
                </label>
                <input type="number" id="rrCURB" required min="8" max="60" class="form-input">
            </div>
            
            <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div class="form-group">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                        PAS (mmHg)
                    </label>
                    <input type="number" id="sbpCURB" required min="50" max="250" class="form-input">
                </div>
                <div class="form-group">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                        PAD (mmHg)
                    </label>
                    <input type="number" id="dbpCURB" required min="30" max="150" class="form-input">
                </div>
            </div>
            
            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="confusionCURB" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Confusión mental de nuevo inicio</span>
                </label>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular CURB-65
            </button>
        </form>
        <div id="curb65Result" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateCURB65(event) {
    event.preventDefault();
    const inputs = {
        age: parseInt(document.getElementById('ageCURB').value),
        bun: parseFloat(document.getElementById('bunCURB').value),
        respiratoryRate: parseInt(document.getElementById('rrCURB').value),
        systolicBP: parseInt(document.getElementById('sbpCURB').value),
        diastolicBP: parseInt(document.getElementById('dbpCURB').value),
        confusion: document.getElementById('confusionCURB').checked
    };
    const result = Calculators.calculateCURB65(inputs);
    displayGenericResult(result, inputs, 12, 'CURB-65', null, 'curb65Result');
    Storage.addToHistory({ 
        calculatorId: 12, 
        calculatorName: 'CURB-65', 
        inputs, 
        result, 
        interpretation: result.interpretation 
    });
}

// === 13. qSOFA === //
function createQSOFAForm() {
    return `
        <form id="qsofaForm" onsubmit="calculateQSOFA(event)">
            <div class="alert-box" style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #92400e; margin: 0;">
                    <strong>⚠️ Nota:</strong> qSOFA es una herramienta de screening. Un puntaje ≥2 sugiere sepsis, pero NO es criterio diagnóstico. Requiere evaluación completa.
                </p>
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Frecuencia respiratoria (rpm)
                </label>
                <input type="number" id="rrQSOFA" required min="8" max="60" class="form-input">
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Presión arterial sistólica (mmHg)
                </label>
                <input type="number" id="sbpQSOFA" required min="50" max="250" class="form-input">
            </div>
            
            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="alteredMentationQSOFA" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Alteración del estado mental (GCS &lt;15)</span>
                </label>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular qSOFA
            </button>
        </form>
        <div id="qsofaResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateQSOFA(event) {
    event.preventDefault();
    const inputs = {
        respiratoryRate: parseInt(document.getElementById('rrQSOFA').value),
        systolicBP: parseInt(document.getElementById('sbpQSOFA').value),
        alteredMentation: document.getElementById('alteredMentationQSOFA').checked
    };
    const result = Calculators.calculateQSOFA(inputs);
    displayGenericResult(result, inputs, 13, 'qSOFA', null, 'qsofaResult');
    Storage.addToHistory({ 
        calculatorId: 13, 
        calculatorName: 'qSOFA', 
        inputs, 
        result, 
        interpretation: result.interpretation 
    });
}

// === 14. WELLS TEP === //
function createWellsTEPForm() {
    return `
        <form id="wellsTEPForm" onsubmit="calculateWellsTEP(event)">
            <div class="alert-box" style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #1e3a8a; margin: 0;">
                    <strong>ℹ️ Nota:</strong> Wells Score para tromboembolia pulmonar (TEP). Ayuda a estratificar riesgo y decidir estudios adicionales.
                </p>
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Frecuencia cardíaca (lpm)
                </label>
                <input type="number" id="hrWells" required min="40" max="200" class="form-input">
            </div>
            
            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <p style="font-size: 13px; font-weight: 600; margin-bottom: 12px;">Seleccione factores presentes:</p>
                
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="dvpSymptoms" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Síntomas clínicos de TVP (3 pts)</span>
                </label>
                
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="tepMostLikely" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">TEP más probable que diagnóstico alternativo (3 pts)</span>
                </label>
                
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="immobilization" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Inmovilización ≥3 días o cirugía en 4 semanas (1.5 pts)</span>
                </label>
                
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="previousTEP" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">TEP o TVP previa (1.5 pts)</span>
                </label>
                
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                    <input type="checkbox" id="hemoptysis" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Hemoptisis (1 pt)</span>
                </label>
                
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="cancer" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">Cáncer activo (1 pt)</span>
                </label>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular Wells TEP
            </button>
        </form>
        <div id="wellsTEPResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateWellsTEP(event) {
    event.preventDefault();
    const inputs = {
        heartRate: parseInt(document.getElementById('hrWells').value),
        dvpSymptoms: document.getElementById('dvpSymptoms').checked,
        tepMostLikely: document.getElementById('tepMostLikely').checked,
        immobilization: document.getElementById('immobilization').checked,
        previousTEP: document.getElementById('previousTEP').checked,
        hemoptysis: document.getElementById('hemoptysis').checked,
        cancer: document.getElementById('cancer').checked
    };
    const result = Calculators.calculateWellsTEP(inputs);
    displayGenericResult(result, inputs, 14, 'Wells TEP', null, 'wellsTEPResult');
    Storage.addToHistory({ 
        calculatorId: 14, 
        calculatorName: 'Wells TEP', 
        inputs, 
        result, 
        interpretation: result.interpretation 
    });
}

// === 15. MELD === //
function createMELDForm() {
    const units = Storage.getSettings().units;
    const crMax = units.creatinine === 'mg/dL' ? 15 : 1300;
    const crStep = units.creatinine === 'mg/dL' ? 0.1 : 10;
    
    return `
        <form id="meldForm" onsubmit="calculateMELD(event)">
            <div class="alert-box" style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                <p style="font-size: 13px; color: #92400e; margin: 0;">
                    <strong>⚠️ Nota:</strong> MELD Score para priorizar pacientes en lista de espera para trasplante hepático.
                </p>
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Bilirrubina total (mg/dL)
                </label>
                <input type="number" id="bilirubinMELD" required step="0.1" min="0.1" max="50" class="form-input">
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    INR
                </label>
                <input type="number" id="inrMELD" required step="0.1" min="0.8" max="10" class="form-input">
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Creatinina sérica (${units.creatinine})
                </label>
                <input type="number" id="creatinineMELD" required step="${crStep}" min="0.1" max="${crMax}" class="form-input">
            </div>
            
            <div style="background: var(--bg-secondary); padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="dialysisMELD" style="width: 18px; height: 18px;">
                    <span style="font-size: 14px;">En diálisis (2 sesiones en última semana)</span>
                </label>
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Sodio sérico (opcional para MELD-Na) - mEq/L
                </label>
                <input type="number" id="sodiumMELD" step="1" min="120" max="160" class="form-input" placeholder="Dejar vacío para MELD estándar">
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular MELD
            </button>
        </form>
        <div id="meldResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateMELD(event) {
    event.preventDefault();
    const sodiumInput = document.getElementById('sodiumMELD').value;
    const inputs = {
        bilirubin: parseFloat(document.getElementById('bilirubinMELD').value),
        inr: parseFloat(document.getElementById('inrMELD').value),
        creatinine: parseFloat(document.getElementById('creatinineMELD').value),
        dialysis: document.getElementById('dialysisMELD').checked,
        sodium: sodiumInput ? parseFloat(sodiumInput) : null
    };
    const result = Calculators.calculateMELD(inputs);
    
    // Mostrar MELD y MELD-Na si aplica
    const container = document.getElementById('meldResult');
    container.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">MELD SCORE</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">
                ${result.value} <span style="font-size: 20px; font-weight: 600;">${result.unit}</span>
            </div>
            <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">
                ${result.interpretation.label}
            </div>
            ${result.meldNa !== null ? `
                <div style="background: rgba(30, 56, 114, 0.15); padding: 12px; border-radius: 8px; font-size: 13px;">
                    <strong>MELD-Na (con sodio):</strong> ${result.meldNa} puntos
                </div>
            ` : ''}
        </div>
        <div class="interpretation-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); border-left: 4px solid var(--${result.interpretation.color});">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Interpretación</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
                ${result.interpretation.description}
            </p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('meldForm').reset(); document.getElementById('meldResult').style.display='none';" style="width: 100%; margin-top: 16px;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    
    Storage.addToHistory({ 
        calculatorId: 15, 
        calculatorName: 'MELD', 
        inputs, 
        result, 
        interpretation: result.interpretation 
    });
}

// === 2. CLEARANCE CREATININA 24H === //
function createClearance24hForm() {
    const units = Storage.getSettings().units;
    const crUrineMax = units.creatinine === 'mg/dL' ? 300 : 26500;
    const crSerumMax = units.creatinine === 'mg/dL' ? 20 : 2000;
    const crUrineStep = units.creatinine === 'mg/dL' ? 0.1 : 10;
    const crSerumStep = units.creatinine === 'mg/dL' ? 0.01 : 1;
    
    return `
        <form id="clearance24hForm" onsubmit="calculateClearance24h(event)">
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Creatinina en orina (${units.creatinine})
                </label>
                <input type="number" id="creatinineUrine" required step="${crUrineStep}" min="1" max="${crUrineMax}" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Creatinina sérica (${units.creatinine})
                </label>
                <input type="number" id="creatinineSerum" required step="${crSerumStep}" min="0.1" max="${crSerumMax}" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Volumen de orina en 24h (mL)
                </label>
                <input type="number" id="urineVolume" required step="1" min="100" max="10000" class="form-input">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular Clearance
            </button>
        </form>
        <div id="clearance24hResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateClearance24h(event) {
    event.preventDefault();
    const inputs = {
        creatinineUrine: parseFloat(document.getElementById('creatinineUrine').value),
        creatinineSerum: parseFloat(document.getElementById('creatinineSerum').value),
        urineVolume: parseFloat(document.getElementById('urineVolume').value)
    };
    const result = Calculators.calculateClearance24h(inputs);
    displayGenericResult(result, inputs, 2, 'Clearance Cr 24h', null, 'clearance24hResult');
    Storage.addToHistory({ calculatorId: 2, calculatorName: 'Clearance Cr 24h', inputs, result, interpretation: result.interpretation });
}

// === 3. ANION GAP === //
function createAnionGapForm() {
    return `
        <form id="anionGapForm" onsubmit="calculateAnionGap(event)">
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Sodio (Na) - mEq/L
                </label>
                <input type="number" id="sodium" required step="0.1" min="120" max="160" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Cloruro (Cl) - mEq/L
                </label>
                <input type="number" id="chloride" required step="0.1" min="85" max="120" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Bicarbonato (HCO₃) - mEq/L
                </label>
                <input type="number" id="bicarbonate" required step="0.1" min="10" max="40" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Albúmina (g/dL)
                </label>
                <input type="number" id="albumin" required step="0.1" min="1.5" max="6" value="4" class="form-input">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular Anion Gap
            </button>
        </form>
        <div id="anionGapResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateAnionGap(event) {
    event.preventDefault();
    const inputs = {
        sodium: parseFloat(document.getElementById('sodium').value),
        chloride: parseFloat(document.getElementById('chloride').value),
        bicarbonate: parseFloat(document.getElementById('bicarbonate').value),
        albumin: parseFloat(document.getElementById('albumin').value)
    };
    const result = Calculators.calculateAnionGap(inputs);
    
    const container = document.getElementById('anionGapResult');
    container.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">ANION GAP</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">
                ${result.value} <span style="font-size: 20px; font-weight: 600;">${result.unit}</span>
            </div>
            <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">
                ${result.interpretation.label}
            </div>
            <div style="background: rgba(30, 56, 114, 0.15); padding: 12px; border-radius: 8px; font-size: 13px;">
                <strong>AG corregido por albúmina:</strong> ${result.correctedValue} ${result.unit}
            </div>
        </div>
        <div class="interpretation-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); border-left: 4px solid var(--${result.interpretation.color});">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Interpretación</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
                ${result.interpretation.description}
            </p>
        </div>
        <button class="btn btn-secondary" onclick="document.getElementById('anionGapForm').reset(); document.getElementById('anionGapResult').style.display='none';" style="width: 100%; margin-top: 16px;">
            🔄 Nuevo Cálculo
        </button>
    `;
    container.style.display = 'block';
    Storage.addToHistory({ calculatorId: 3, calculatorName: 'Anion Gap', inputs, result, interpretation: result.interpretation });
}

// === 4. CALCIO CORREGIDO === //
function createCorrectedCalciumForm() {
    return `
        <form id="correctedCalciumForm" onsubmit="calculateCorrectedCalcium(event)">
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Calcio sérico (mg/dL)
                </label>
                <input type="number" id="calcium" required step="0.1" min="6" max="15" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Albúmina sérica (g/dL)
                </label>
                <input type="number" id="albuminCa" required step="0.1" min="1.5" max="6" class="form-input">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular Calcio Corregido
            </button>
        </form>
        <div id="correctedCalciumResult" style="display: none; margin-top: 24px;"></div>
    `;
}

function calculateCorrectedCalcium(event) {
    event.preventDefault();
    const inputs = {
        calcium: parseFloat(document.getElementById('calcium').value),
        albumin: parseFloat(document.getElementById('albuminCa').value)
    };
    const result = Calculators.calculateCorrectedCalcium(inputs);
    displayGenericResult(result, inputs, 4, 'Calcio Corregido', null, 'correctedCalciumResult');
    Storage.addToHistory({ calculatorId: 4, calculatorName: 'Calcio Corregido', inputs, result, interpretation: result.interpretation });
}

// Continúa en próximo archivo...
