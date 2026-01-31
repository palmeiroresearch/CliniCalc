// ============================================
// CLINICALC - APLICACIÓN PRINCIPAL
// Inicialización, navegación y event handlers
// ============================================

// === VARIABLES GLOBALES === //
let currentTab = 'calculators';
let currentCalculator = null;

// === INICIALIZACIÓN === //
document.addEventListener('DOMContentLoaded', () => {
    // Ocultar splash screen
    setTimeout(() => {
        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
    }, 2000);
    
    // Inicializar módulos
    Storage.init();
    UI.init();
    
    // Aplicar tema
    applyTheme();
    
    // Setup event listeners
    setupEventListeners();
    
    // Registrar Service Worker
    registerServiceWorker();
});

// === NAVEGACIÓN === //
function switchTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Mostrar tab seleccionado
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    // Actualizar navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    currentTab = tabName;
    
    // Refrescar contenido si es necesario
    if (tabName === 'history') {
        UI.renderHistory();
    }
}

// === FAVORITOS === //
function toggleFavorite(calcId) {
    const isFav = Storage.toggleFavorite(calcId);
    
    // Actualizar UI
    UI.renderMainScreenCalculators();
    UI.renderLibraryCalculators();
    
    UI.showToast(
        isFav ? 'Añadido a favoritos' : 'Eliminado de favoritos',
        'success'
    );
}

// === GESTIÓN PANTALLA PRINCIPAL === //
function toggleCalcInMainScreen(calcId) {
    const mainScreen = Storage.getMainScreen();
    const isActive = mainScreen.includes(calcId);
    
    if (isActive) {
        const result = Storage.removeFromMainScreen(calcId);
        if (!result.success) {
            UI.showToast(result.error, 'error');
            return;
        }
        UI.showToast('Calculadora eliminada de pantalla principal', 'success');
    } else {
        const result = Storage.addToMainScreen(calcId);
        if (!result.success) {
            UI.showToast(result.error, 'warning');
            return;
        }
        UI.showToast('Calculadora añadida a pantalla principal', 'success');
    }
    
    UI.renderMainScreenCalculators();
    UI.renderManageCalculatorsList();
    UI.updateActiveCalcCount();
}

// === ABRIR CALCULADORA === //
function openCalculator(calcId) {
    const calc = CALCULATORS_CONFIG.find(c => c.id === calcId);
    if (!calc) return;
    
    currentCalculator = calc;
    
    // Crear modal de calculadora
    createCalculatorModal(calc);
}

function createCalculatorModal(calc) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.id = 'calculatorModal';
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(4px);
        animation: fadeIn 0.2s ease;
        overflow-y: auto;
        padding: 20px;
    `;
    
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'calculator-modal';
    modal.style.cssText = `
        background: var(--bg-card);
        border-radius: var(--radius-xl);
        padding: 24px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: var(--shadow-xl);
        animation: scaleIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div>
                <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 4px;">${calc.icon} ${calc.fullName}</h2>
                <p style="font-size: 13px; color: var(--text-secondary);">${calc.description}</p>
            </div>
            <button class="btn-icon" onclick="closeCalculatorModal()" style="flex-shrink: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
        <div id="calculatorContent"></div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Cargar formulario específico
    loadCalculatorForm(calc);
    
    // Cerrar al hacer click fuera
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            closeCalculatorModal();
        }
    };
}

function closeCalculatorModal() {
    const modal = document.getElementById('calculatorModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => modal.remove(), 200);
    }
}

// === CARGAR FORMULARIO DE CALCULADORA === //
function loadCalculatorForm(calc) {
    const container = document.getElementById('calculatorContent');
    
    // Cargar formulario según ID de calculadora
    switch(calc.id) {
        case 1: container.innerHTML = createGFRForm(); break;
        case 2: container.innerHTML = createClearance24hForm(); break;
        case 3: container.innerHTML = createAnionGapForm(); break;
        case 4: container.innerHTML = createCorrectedCalciumForm(); break;
        case 5: container.innerHTML = createCorrectedSodiumForm(); break;
        case 6: container.innerHTML = createBMIForm(); break;
        case 7: container.innerHTML = createBSAForm(); break;
        case 8: container.innerHTML = createOsmolarityForm(); break;
        case 9: container.innerHTML = createCHADSVAScForm(); break;
        case 10: container.innerHTML = createHASBLEDForm(); break;
        case 11: container.innerHTML = createChildPughForm(); break;
        case 12: container.innerHTML = createCURB65Form(); break;
        case 13: container.innerHTML = createQSOFAForm(); break;
        case 14: container.innerHTML = createWellsTEPForm(); break;
        case 15: container.innerHTML = createMELDForm(); break;
        default:
            container.innerHTML = `
                <div class="coming-soon" style="text-align: center; padding: 40px 20px;">
                    <div style="font-size: 48px; margin-bottom: 16px;">🚧</div>
                    <h3 style="margin-bottom: 8px;">Error</h3>
                    <p style="color: var(--text-secondary);">Calculadora no encontrada</p>
                </div>
            `;
    }
}

function createGFRForm() {
    const units = Storage.getSettings().units;
    
    // Ajustar validación según unidad
    const crMax = units.creatinine === 'mg/dL' ? 20 : 2000;
    const crStep = units.creatinine === 'mg/dL' ? 0.01 : 1;
    
    return `
        <form id="gfrForm" onsubmit="calculateGFR(event)">
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Fórmula</label>
                <select id="gfrFormula" class="form-input" onchange="toggleGFRFields()">
                    <option value="CKD-EPI 2021">CKD-EPI 2021 (Recomendada - sin raza)</option>
                    <option value="CKD-EPI 2009">CKD-EPI 2009 (con factor racial)</option>
                    <option value="Cockroft-Gault">Cockroft-Gault (requiere peso)</option>
                    <option value="MDRD">MDRD (con factor racial)</option>
                </select>
            </div>
            
            <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                <div class="form-group">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Edad (años)</label>
                    <input type="number" id="gfrAge" required min="18" max="120" class="form-input">
                </div>
                <div class="form-group">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Sexo</label>
                    <select id="gfrSex" required class="form-input">
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Creatinina sérica (${units.creatinine})
                </label>
                <input type="number" id="gfrCreatinine" required step="${crStep}" min="0.1" max="${crMax}" class="form-input">
            </div>
            
            <div id="gfrWeightField" class="form-group" style="margin-bottom: 16px; display: none;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Peso (${units.weight}) <span style="color: var(--danger);">*</span>
                </label>
                <input type="number" id="gfrWeight" step="0.1" min="30" max="300" class="form-input">
            </div>
            
            <div id="gfrRaceField" class="form-group" style="margin-bottom: 16px; display: none;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">Raza</label>
                <select id="gfrRace" class="form-input">
                    <option value="other">Otra</option>
                    <option value="black">Afroamericana</option>
                </select>
            </div>
            
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px;">
                🧮 Calcular GFR
            </button>
        </form>
        <div id="gfrResult" style="display: none; margin-top: 24px;"></div>
    `;
}

// Función para mostrar/ocultar campos según fórmula seleccionada
function toggleGFRFields() {
    const formula = document.getElementById('gfrFormula').value;
    const weightField = document.getElementById('gfrWeightField');
    const weightInput = document.getElementById('gfrWeight');
    const raceField = document.getElementById('gfrRaceField');
    const raceInput = document.getElementById('gfrRace');
    
    // Reset
    weightField.style.display = 'none';
    weightInput.required = false;
    raceField.style.display = 'none';
    
    // Cockroft-Gault necesita peso
    if (formula === 'Cockroft-Gault') {
        weightField.style.display = 'block';
        weightInput.required = true;
    }
    
    // CKD-EPI 2009 y MDRD necesitan raza
    if (formula === 'CKD-EPI 2009' || formula === 'MDRD') {
        raceField.style.display = 'block';
    }
}

function calculateGFR(event) {
    event.preventDefault();
    
    const formula = document.getElementById('gfrFormula').value;
    const age = parseInt(document.getElementById('gfrAge').value);
    const sex = document.getElementById('gfrSex').value;
    const creatinine = parseFloat(document.getElementById('gfrCreatinine').value);
    
    // Peso solo para Cockroft-Gault
    const weightInput = document.getElementById('gfrWeight');
    const weight = weightInput && weightInput.value ? parseFloat(weightInput.value) : null;
    
    // Raza solo para CKD-EPI 2009 y MDRD
    const raceInput = document.getElementById('gfrRace');
    const race = raceInput ? raceInput.value : 'other';
    
    const inputs = { age, sex, creatinine, weight, race };
    const result = Calculators.calculateGFR(inputs, formula);
    
    // Mostrar resultado
    displayResult(result, inputs, 1, 'GFR', formula);
    
    // Guardar en historial
    Storage.addToHistory({
        calculatorId: 1,
        calculatorName: 'GFR',
        formula: formula,
        inputs: inputs,
        result: result,
        interpretation: result.interpretation
    });
}

function displayResult(result, inputs, calcId, calcName, formula) {
    const container = document.getElementById('gfrResult');
    
    container.innerHTML = `
        <div class="result-card" style="background: linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent)); padding: 24px; border-radius: var(--radius-lg); color: var(--brand-primary-dark); margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; opacity: 0.8;">RESULTADO</div>
            <div style="font-size: 36px; font-weight: 800; margin-bottom: 4px;">
                ${result.value} <span style="font-size: 20px; font-weight: 600;">${result.unit}</span>
            </div>
            <div style="font-size: 14px; font-weight: 600;">
                ${result.interpretation.stage ? result.interpretation.stage + ': ' : ''}${result.interpretation.label}
            </div>
        </div>
        
        <div class="interpretation-card" style="background: var(--bg-secondary); padding: 20px; border-radius: var(--radius-lg); border-left: 4px solid var(--${result.interpretation.color});">
            <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Interpretación</h4>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
                ${result.interpretation.description}
            </p>
        </div>
        
        <div style="display: flex; gap: 12px; margin-top: 16px;">
            <button class="btn btn-secondary" onclick="shareGFRResult()" style="flex: 1;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                Compartir
            </button>
            <button class="btn btn-secondary" onclick="document.getElementById('gfrForm').reset(); document.getElementById('gfrResult').style.display='none';" style="flex: 1;">
                🔄 Nuevo Cálculo
            </button>
        </div>
    `;
    
    container.style.display = 'block';
    
    // Animar aparición
    container.style.animation = 'slideDown 0.4s ease';
}

function shareGFRResult() {
    // Implementar compartir
    UI.showToast('Resultado copiado al portapapeles', 'success');
}

// === HISTORIAL === //
function deleteHistoryItem(itemId) {
    UI.showConfirmDialog(
        '¿Eliminar cálculo?',
        'Esta acción no se puede deshacer',
        () => {
            Storage.deleteHistoryItem(itemId);
            UI.renderHistory();
            UI.showToast('Cálculo eliminado', 'success');
        }
    );
}

function clearAllHistory() {
    UI.showConfirmDialog(
        '¿Limpiar todo el historial?',
        'Se eliminarán todos los cálculos guardados',
        () => {
            Storage.clearHistory();
            UI.renderHistory();
            UI.showToast('Historial limpiado', 'success');
        }
    );
}

// === AJUSTES === //
function applyTheme() {
    const darkMode = Storage.getSetting('darkMode');
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('darkModeToggle').checked = false;
    }
}

function restoreDefaultConfig() {
    UI.showConfirmDialog(
        '¿Restaurar configuración?',
        'Se restaurará la configuración predeterminada. No se perderá el historial.',
        () => {
            Storage.restoreDefaults();
            location.reload();
        }
    );
}

// === EVENT LISTENERS === //
function setupEventListeners() {
    // Navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            switchTab(item.dataset.tab);
        });
    });
    
    // Búsqueda
    const searchBtn = document.getElementById('searchBtn');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    searchBtn.addEventListener('click', () => {
        searchContainer.style.display = 'block';
        searchInput.focus();
    });
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        clearSearch.style.display = query ? 'block' : 'none';
        UI.handleSearch(query);
    });
    
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        clearSearch.style.display = 'none';
        UI.hideSearchResults();
    });
    
    // Filtros de categoría
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            UI.renderLibraryCalculators(chip.dataset.category);
        });
    });
    
    // Modo oscuro
    document.getElementById('darkModeToggle').addEventListener('change', (e) => {
        Storage.updateSetting('darkMode', e.target.checked);
        applyTheme();
    });
    
    // Unidades
    const unitSelects = ['unitCreatinine', 'unitWeight', 'unitHeight', 'unitGlucose'];
    unitSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const unitType = id.replace('unit', '').toLowerCase();
            select.value = Storage.getSetting(`units.${unitType}`);
            select.addEventListener('change', (e) => {
                Storage.updateSetting(`units.${unitType}`, e.target.value);
                UI.showToast('Unidad actualizada', 'success');
            });
        }
    });
    
    // Botones de gestión
    document.getElementById('manageCalcsBtn')?.addEventListener('click', () => {
        switchTab('settings');
        // Scroll hacia la sección de gestión
        setTimeout(() => {
            const manageSection = document.querySelector('.settings-section:nth-child(3)');
            if (manageSection) {
                manageSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    });
    document.getElementById('restoreDefaultBtn')?.addEventListener('click', restoreDefaultConfig);
    document.getElementById('clearHistoryBtn')?.addEventListener('click', clearAllHistory);
    document.getElementById('clearAllHistoryBtn')?.addEventListener('click', clearAllHistory);
    
    // Storage events
    window.addEventListener('storage:mainScreenChanged', () => {
        UI.renderMainScreenCalculators();
        UI.updateActiveCalcCount();
    });
    
    window.addEventListener('storage:favoritesChanged', () => {
        UI.renderMainScreenCalculators();
        UI.renderLibraryCalculators();
    });
    
    window.addEventListener('storage:historyChanged', () => {
        UI.renderHistory();
    });
}

function hideSearch() {
    document.getElementById('searchContainer').style.display = 'none';
    document.getElementById('searchInput').value = '';
    UI.hideSearchResults();
}

// === SERVICE WORKER === //
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log('✅ Service Worker registrado');
                document.getElementById('offlineStatus').textContent = '✅ Activo';
            })
            .catch(err => {
                console.error('❌ Error SW:', err);
                document.getElementById('offlineStatus').textContent = '❌ Error';
            });
    }
}

// ============================================
// FORMULARIOS DE CALCULADORAS
// ============================================

// === 2. CLEARANCE CREATININA 24H === //
function createClearance24hForm() {
    const units = Storage.getSettings().units;
    return `
        <form id="clearance24hForm" onsubmit="calculateClearance24h(event)">
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Creatinina en orina (${units.creatinine})
                </label>
                <input type="number" id="creatinineUrine" required step="0.1" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Creatinina sérica (${units.creatinine})
                </label>
                <input type="number" id="creatinineSerum" required step="0.01" class="form-input">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 14px;">
                    Volumen de orina en 24h (mL)
                </label>
                <input type="number" id="urineVolume" required step="1" class="form-input">
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
    
    // Mostrar AG normal y corregido
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
                ${result.interpretation.label}
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
    document.getElementById(formId).reset();
    document.getElementById(containerId).style.display = 'none';
}
