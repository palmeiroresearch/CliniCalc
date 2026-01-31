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
                     data-calc-id="${calcId}">
                    <span class="calc-favorite ${isFav ? 'active' : ''}" 
                          onclick="event.stopPropagation(); toggleFavorite(${calcId})">
                        ${isFav ? '⭐' : '☆'}
                    </span>
                    <span class="calc-icon">${calc.icon}</span>
                    <div class="calc-name">${calc.name}</div>
                    <div class="calc-category">${calc.categoryLabel}</div>
                </div>
            `;
        });
        
        grid.innerHTML = html;
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
                     onclick="openCalculator(${calc.id})">
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
                    <div class="history-actions">
                        <button class="btn-icon" onclick="recalculate('${item.id}')" title="Recalcular">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/>
                                <path d="M21 3v5h-5"/>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="shareResult('${item.id}')" title="Compartir">
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
        if (counter) {
            counter.textContent = mainScreen.length;
        }
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
</style>
`;

// Inyectar estilos
document.head.insertAdjacentHTML('beforeend', historyStyles);
