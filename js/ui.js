// ============================================
// CLINICALC - INTERFAZ DE USUARIO
// Renderizado dinámico y gestión de UI
// ============================================

const UI = {
    
    // === INICIALIZACIÓN === //
    init() {
        this.renderMainScreenCalculators();
        this.renderLibraryCalculators();
        this.renderHistory();
        this.renderManageCalculatorsList();
        this.updateActiveCalcCount();
    },

    // === PANTALLA PRINCIPAL === //
    renderMainScreenCalculators() {
        const mainScreen = Storage.getMainScreen();
        const favorites = Storage.getFavorites();
        const grid = document.getElementById('mainCalculatorsGrid');
        const emptyState = document.getElementById('emptyMainScreen');
        
        if (mainScreen.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        grid.style.display = 'grid';
        emptyState.style.display = 'none';
        
        let html = '';
        mainScreen.forEach(calcId => {
            const calc = CALCULATORS_CONFIG.find(c => c.id === calcId);
            if (!calc) return;
            
            const isFav = favorites.includes(calcId);
            
            html += `
                <div class="calculator-card ${isFav ? 'favorited' : ''}"
                     onclick="openCalculator(${calcId})"
                     data-calc-id="${calcId}"
                     data-category="${calc.category}">
                    <span class="calc-favorite ${isFav ? 'active' : ''}"
                          onclick="event.stopPropagation(); toggleFavorite(${calcId})">
                        ${isFav ? '⭐' : '☆'}
                    </span>
                    <div class="calc-icon-wrapper">
                        <span class="calc-icon">${calc.icon}</span>
                    </div>
                    <div class="calc-name">${calc.name}</div>
                    <div class="calc-category">
                        <span class="cat-dot"></span>${calc.categoryLabel}
                    </div>
                </div>
            `;
        });
        
        grid.innerHTML = html;
        this._initDragReorder(grid);
    },

    // === DRAG & DROP REORDER === //
    _initDragReorder(grid) {
        if (grid.dataset.dragInited) return;
        grid.dataset.dragInited = '1';

        let editMode = false;
        let dragging = false;
        let dragCard = null;
        let ghost = null;
        let placeholder = null;
        let longPressTimer = null;
        let startX = 0, startY = 0;

        const reorderBtn = document.getElementById('reorderCalcsBtn');

        const ICON_REORDER = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0">
            <circle cx="9" cy="5" r="1.5"/><circle cx="15" cy="5" r="1.5"/>
            <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
            <circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/>
        </svg>`;
        const ICON_DONE = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="flex-shrink:0">
            <polyline points="20 6 9 17 4 12"/>
        </svg>`;

        const updateBtn = (active) => {
            if (!reorderBtn) return;
            reorderBtn.innerHTML = active ? `${ICON_DONE} Listo` : `${ICON_REORDER} Reordenar`;
            reorderBtn.classList.toggle('reorder-active', active);
        };

        const enterEditMode = () => {
            editMode = true;
            grid.classList.add('edit-mode');
            if (navigator.vibrate) navigator.vibrate(25);
            updateBtn(true);
        };

        const exitEditMode = () => {
            if (dragging) endDrag();
            editMode = false;
            grid.classList.remove('edit-mode');
            updateBtn(false);
        };

        if (reorderBtn) {
            reorderBtn.addEventListener('click', () => {
                if (editMode) exitEditMode(); else enterEditMode();
            });
            updateBtn(false);
        }

        const startDrag = (card, clientX, clientY) => {
            dragging = true;
            dragCard = card;
            const rect = card.getBoundingClientRect();
            const offX = clientX - rect.left;
            const offY = clientY - rect.top;

            ghost = card.cloneNode(true);
            ghost.className = 'calculator-card calc-card-ghost';
            ghost.dataset.category = card.dataset.category;
            ghost.style.width  = rect.width  + 'px';
            ghost.style.height = rect.height + 'px';
            ghost.style.left   = rect.left   + 'px';
            ghost.style.top    = rect.top    + 'px';
            document.body.appendChild(ghost);

            placeholder = document.createElement('div');
            placeholder.className = 'calc-drag-placeholder';
            placeholder.style.width  = rect.width  + 'px';
            placeholder.style.height = rect.height + 'px';
            grid.insertBefore(placeholder, card);
            card.style.visibility = 'hidden';

            const onMove = (e) => {
                if (!dragging) return;
                e.preventDefault();
                const cx = e.clientX, cy = e.clientY;
                ghost.style.left = (cx - offX) + 'px';
                ghost.style.top  = (cy - offY) + 'px';

                ghost.style.visibility = 'hidden';
                const target = document.elementFromPoint(cx, cy)?.closest('.calculator-card');
                ghost.style.visibility = '';

                if (target && target !== dragCard && grid.contains(target)) {
                    const tr = target.getBoundingClientRect();
                    if (cx < tr.left + tr.width / 2) {
                        grid.insertBefore(placeholder, target);
                    } else {
                        target.after(placeholder);
                    }
                }
            };

            const onUp = () => {
                endDrag();
                document.removeEventListener('pointermove', onMove);
                document.removeEventListener('pointerup', onUp);
                document.removeEventListener('pointercancel', onUp);
            };

            document.addEventListener('pointermove', onMove, { passive: false });
            document.addEventListener('pointerup', onUp);
            document.addEventListener('pointercancel', onUp);
        };

        const endDrag = () => {
            if (!dragging) return;
            dragging = false;
            if (dragCard && placeholder?.parentNode === grid) {
                grid.insertBefore(dragCard, placeholder);
            }
            if (dragCard) dragCard.style.visibility = '';
            placeholder?.remove();
            ghost?.remove();
            dragCard = null; ghost = null; placeholder = null;

            const newOrder = [...grid.querySelectorAll('.calculator-card[data-calc-id]')]
                .map(c => parseInt(c.dataset.calcId))
                .filter(id => !isNaN(id));
            if (newOrder.length) Storage.reorderMainScreen(newOrder);
        };

        grid.addEventListener('click', e => {
            if (editMode) { e.stopPropagation(); e.preventDefault(); }
        }, true);

        grid.addEventListener('pointerdown', e => {
            const card = e.target.closest('.calculator-card');
            if (!card) return;
            startX = e.clientX; startY = e.clientY;

            if (editMode) {
                e.preventDefault();
                startDrag(card, e.clientX, e.clientY);
                return;
            }

            longPressTimer = setTimeout(() => {
                longPressTimer = null;
                enterEditMode();
                startDrag(card, startX, startY);
            }, 600);
        });

        grid.addEventListener('pointermove', e => {
            if (!longPressTimer) return;
            if (Math.abs(e.clientX - startX) > 6 || Math.abs(e.clientY - startY) > 6) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        });

        grid.addEventListener('pointerup', () => {
            if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
        });

        grid.addEventListener('pointercancel', () => {
            if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
            if (dragging) endDrag();
        });
    },

    // === BIBLIOTECA === //
    renderLibraryCalculators(categoryFilter = 'all') {
        const favorites = Storage.getFavorites();
        const list = document.getElementById('libraryCalculatorsList');
        
        let filteredCalcs = CALCULATORS_CONFIG;
        if (categoryFilter !== 'all') {
            filteredCalcs = CALCULATORS_CONFIG.filter(c => c.category === categoryFilter);
        }
        
        let html = '';
        filteredCalcs.forEach(calc => {
            const isFav = favorites.includes(calc.id);
            
            html += `
                <div class="calculator-list-item ${isFav ? 'favorited' : ''}"
                     onclick="openCalculator(${calc.id})"
                     data-category="${calc.category}">
                    <div class="calc-list-icon">${calc.icon}</div>
                    <div class="calc-list-info">
                        <div class="calc-list-name">${calc.fullName}</div>
                        <div class="calc-list-description">${calc.description}</div>
                    </div>
                    <div class="calc-list-favorite"
                         onclick="event.stopPropagation(); toggleFavorite(${calc.id})">
                        ${isFav ? '⭐' : '☆'}
                    </div>
                </div>
            `;
        });
        
        list.innerHTML = html;
    },

    // === HISTORIAL === //
    renderHistory() {
        const history = Storage.getHistory();
        const list = document.getElementById('historyList');
        const emptyState = document.getElementById('emptyHistory');
        
        if (history.length === 0) {
            list.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        list.style.display = 'block';
        emptyState.style.display = 'none';
        
        let html = '';
        history.forEach(item => {
            const calc = CALCULATORS_CONFIG.find(c => c.id === item.calculatorId);
            const date = new Date(item.timestamp);
            const timeAgo = this.getTimeAgo(date);
            
            const hasPatient = item.patientName || item.bedNumber;
            const patientDisplay = hasPatient
                ? `<span class="patient-name">👤 ${item.patientName || '—'}</span><span class="patient-bed">🛏 ${item.bedNumber || '—'}</span>`
                : `<span class="patient-add">+ Añadir paciente</span>`;

            html += `
                <div class="history-item" data-item-id="${item.id}">
                    <div class="history-header">
                        <div class="history-calc-name">
                            ${calc ? calc.icon : '🧮'} ${item.calculatorName}
                            ${item.formula ? `<span class="history-formula">${item.formula}</span>` : ''}
                        </div>
                        <div class="history-time">${timeAgo}</div>
                    </div>
                    <div class="history-result">
                        <span class="result-value">${item.result.value} ${item.result.unit}</span>
                        <span class="result-badge ${item.interpretation.color}">
                            ${item.interpretation.label}
                        </span>
                    </div>

                    <div class="history-patient" id="patient-display-${item.id}"
                         onclick="editPatientInfo('${item.id}')">
                        ${patientDisplay}
                    </div>
                    <div class="history-patient-edit" id="patient-edit-${item.id}">
                        <input type="text" class="patient-input" id="pname-${item.id}"
                               placeholder="Nombre del paciente"
                               value="${item.patientName || ''}"
                               onkeydown="if(event.key==='Enter') savePatientInfo('${item.id}'); if(event.key==='Escape') cancelPatientEdit('${item.id}')">
                        <input type="text" class="patient-input patient-input--bed" id="pbed-${item.id}"
                               placeholder="Cama"
                               value="${item.bedNumber || ''}"
                               onkeydown="if(event.key==='Enter') savePatientInfo('${item.id}'); if(event.key==='Escape') cancelPatientEdit('${item.id}')">
                        <button class="patient-action patient-action--save" onclick="savePatientInfo('${item.id}')" title="Guardar">✓</button>
                        <button class="patient-action patient-action--cancel" onclick="cancelPatientEdit('${item.id}')" title="Cancelar">✕</button>
                    </div>

                    <div class="history-actions">
                        <button class="btn-icon" onclick="showFullResult('${item.id}')" title="Ver resultado completo">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="pointer-events:none;">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="recalculate('${item.id}')" title="Recalcular con estos valores">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/>
                                <path d="M21 3v5h-5"/>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="shareResult('${item.id}')" title="Compartir por WhatsApp">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/>
                                <polyline points="16 6 12 2 8 6"/>
                                <line x1="12" y1="2" x2="12" y2="15"/>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="deleteHistoryItem('${item.id}')" title="Eliminar">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        });
        
        list.innerHTML = html;
    },

    // === GESTIÓN DE CALCULADORAS === //
    renderManageCalculatorsList() {
        const mainScreen = Storage.getMainScreen();
        const list = document.getElementById('manageCalculatorsList');
        
        let html = '';
        CALCULATORS_CONFIG.forEach(calc => {
            const isActive = mainScreen.includes(calc.id);
            
            html += `
                <div class="calc-manage-item ${isActive ? 'active' : ''}" 
                     onclick="toggleCalcInMainScreen(${calc.id})">
                    <div class="calc-checkbox">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </div>
                    <div class="calc-list-icon">${calc.icon}</div>
                    <div class="calc-list-info">
                        <div class="calc-list-name">${calc.fullName}</div>
                        <div class="calc-list-description">${calc.categoryLabel}</div>
                    </div>
                </div>
            `;
        });
        
        list.innerHTML = html;
    },

    updateActiveCalcCount() {
        const mainScreen = Storage.getMainScreen();
        const counter = document.getElementById('activeCalcCount');
        const total = document.querySelector('.counter-total');
        if (counter) counter.textContent = mainScreen.length;
        if (total) total.textContent = '/ ' + CALCULATORS_CONFIG.length;
    },

    // === BÚSQUEDA === //
    handleSearch(query) {
        query = query.toLowerCase().trim();
        
        if (query === '') {
            this.hideSearchResults();
            return;
        }
        
        const results = CALCULATORS_CONFIG.filter(calc => {
            return calc.name.toLowerCase().includes(query) ||
                   calc.fullName.toLowerCase().includes(query) ||
                   calc.description.toLowerCase().includes(query) ||
                   calc.categoryLabel.toLowerCase().includes(query);
        });
        
        this.showSearchResults(results);
    },

    showSearchResults(results) {
        const container = document.getElementById('searchResults');
        
        if (results.length === 0) {
            container.innerHTML = `
                <div class="search-empty">
                    <p>No se encontraron resultados</p>
                </div>
            `;
        } else {
            let html = '';
            results.forEach(calc => {
                html += `
                    <div class="search-result-item" onclick="openCalculator(${calc.id}); hideSearch()">
                        <span class="calc-list-icon">${calc.icon}</span>
                        <div class="calc-list-info">
                            <div class="calc-list-name">${calc.fullName}</div>
                            <div class="calc-list-description">${calc.description}</div>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        }
        
        container.classList.add('show');
    },

    hideSearchResults() {
        const container = document.getElementById('searchResults');
        container.classList.remove('show');
    },

    // === TOAST NOTIFICATIONS === //
    showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    // === MODAL DE CONFIRMACIÓN === //
    showConfirmDialog(title, message, onConfirm) {
        const overlay = document.createElement('div');
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
        `;
        
        const modal = document.createElement('div');
        modal.className = 'confirm-modal';
        modal.style.cssText = `
            background: var(--bg-card);
            border-radius: var(--radius-xl);
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: var(--shadow-xl);
            animation: scaleIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <h3 style="margin-bottom: 12px; font-size: 18px;">${title}</h3>
            <p style="margin-bottom: 24px; color: var(--text-secondary); font-size: 14px;">${message}</p>
            <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button class="btn btn-secondary" id="cancelBtn">Cancelar</button>
                <button class="btn btn-danger-outline" id="confirmBtn">Confirmar</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        document.getElementById('cancelBtn').onclick = () => {
            overlay.remove();
        };
        
        document.getElementById('confirmBtn').onclick = () => {
            onConfirm();
            overlay.remove();
        };
        
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        };
    },

    // === UTILIDADES === //
    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Ahora mismo';
        if (diffMins < 60) return `Hace ${diffMins} min`;
        if (diffHours < 24) return `Hace ${diffHours}h`;
        if (diffDays < 7) return `Hace ${diffDays}d`;
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    },

    formatNumber(num, decimals = 1) {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }
};

// === ESTILOS ADICIONALES PARA HISTORIAL === //
const historyStyles = `
<style>
.history-item {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 16px;
    margin-bottom: 12px;
    transition: all var(--transition-fast);
}

.history-item:hover {
    border-color: var(--brand-accent);
    transform: translateX(2px);
}

.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.history-calc-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
}

.history-formula {
    font-size: 11px;
    color: var(--text-tertiary);
    background: var(--bg-secondary);
    padding: 2px 8px;
    border-radius: 4px;
    margin-left: 8px;
}

.history-time {
    font-size: 12px;
    color: var(--text-tertiary);
}

.history-result {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.result-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
}

.result-badge {
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 12px;
}

.result-badge.success {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
}

.result-badge.warning {
    background: rgba(245, 158, 11, 0.1);
    color: var(--warning);
}

.result-badge.danger {
    background: rgba(239, 68, 68, 0.1);
    color: var(--danger);
}

.history-actions {
    display: flex;
    gap: 8px;
}

.btn-icon {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.btn-icon:hover {
    background: var(--brand-accent);
    border-color: var(--brand-accent);
}

.btn-icon svg {
    stroke: var(--text-secondary);
}

.btn-icon:hover svg {
    stroke: var(--brand-primary-dark);
}

.search-result-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    cursor: pointer;
    transition: all var(--transition-fast);
    border-bottom: 1px solid var(--border-color);
}

.search-result-item:last-child {
    border-bottom: none;
}

.search-result-item:hover {
    background: var(--bg-secondary);
}

.search-empty {
    padding: 40px 20px;
    text-align: center;
    color: var(--text-tertiary);
}

/* === PATIENT INFO SECTION === */
.history-patient {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    background: var(--bg-secondary);
    cursor: pointer;
    transition: background var(--transition-fast);
    min-height: 32px;
}

.history-patient:hover {
    background: var(--bg-tertiary);
}

.patient-name {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-primary);
}

.patient-bed {
    font-size: 12px;
    color: var(--text-secondary);
    margin-left: 4px;
}

.patient-add {
    font-size: 12px;
    color: var(--text-tertiary);
    font-style: italic;
}

.history-patient-edit {
    display: none;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
    width: 100%;
    min-width: 0;
}

.patient-input {
    flex: 1;
    min-width: 0;
    padding: 6px 10px;
    font-size: 13px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--input-bg);
    color: var(--text-primary);
    font-family: inherit;
    transition: border-color var(--transition-fast);
}

.patient-input:focus {
    outline: none;
    border-color: var(--brand-accent);
}

.patient-input--bed {
    flex: 0 0 72px;
}

.patient-action {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 7px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all var(--transition-fast);
}

.patient-action--save {
    background: var(--brand-accent);
    color: var(--brand-primary-dark);
}

.patient-action--save:hover {
    background: var(--brand-accent-light);
}

.patient-action--cancel {
    background: var(--bg-secondary);
    color: var(--text-secondary);
}

.patient-action--cancel:hover {
    background: var(--bg-tertiary);
}
</style>
`;

// Inyectar estilos
document.head.insertAdjacentHTML('beforeend', historyStyles);
