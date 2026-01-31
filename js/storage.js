// ============================================
// CLINICALC - GESTIÓN DE ALMACENAMIENTO
// LocalStorage, Historial, Configuración
// ============================================

const Storage = {
    // === KEYS === //
    KEYS: {
        MAIN_SCREEN: 'clinicalc_mainScreen',
        FAVORITES: 'clinicalc_favorites',
        HISTORY: 'clinicalc_history',
        SETTINGS: 'clinicalc_settings'
    },

    // === INICIALIZACIÓN === //
    init() {
        // Si no existe configuración, crear predeterminada
        if (!this.getSettings()) {
            this.setSettings(DEFAULT_CONFIG.settings);
        }
        if (!this.getMainScreen()) {
            this.setMainScreen(DEFAULT_CONFIG.mainScreen);
        }
        if (!this.getFavorites()) {
            this.setFavorites(DEFAULT_CONFIG.favorites);
        }
        if (!this.getHistory()) {
            this.setHistory([]);
        }
    },

    // === PANTALLA PRINCIPAL === //
    getMainScreen() {
        const data = localStorage.getItem(this.KEYS.MAIN_SCREEN);
        return data ? JSON.parse(data) : null;
    },

    setMainScreen(calcIds) {
        // Validar mínimo 1, máximo 10
        if (calcIds.length < 1) {
            calcIds = [1]; // GFR como mínimo
        }
        if (calcIds.length > 10) {
            calcIds = calcIds.slice(0, 10);
        }
        localStorage.setItem(this.KEYS.MAIN_SCREEN, JSON.stringify(calcIds));
        this.dispatchEvent('mainScreenChanged', calcIds);
    },

    addToMainScreen(calcId) {
        const mainScreen = this.getMainScreen();
        if (mainScreen.length >= 10) {
            return { success: false, error: 'Máximo 10 calculadoras' };
        }
        if (mainScreen.includes(calcId)) {
            return { success: false, error: 'Ya está en pantalla principal' };
        }
        mainScreen.push(calcId);
        this.setMainScreen(mainScreen);
        return { success: true };
    },

    removeFromMainScreen(calcId) {
        const mainScreen = this.getMainScreen();
        if (mainScreen.length <= 1) {
            return { success: false, error: 'Debe haber al menos 1 calculadora' };
        }
        const filtered = mainScreen.filter(id => id !== calcId);
        this.setMainScreen(filtered);
        return { success: true };
    },

    reorderMainScreen(calcIds) {
        this.setMainScreen(calcIds);
    },

    // === FAVORITOS === //
    getFavorites() {
        const data = localStorage.getItem(this.KEYS.FAVORITES);
        return data ? JSON.parse(data) : null;
    },

    setFavorites(calcIds) {
        localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(calcIds));
        this.dispatchEvent('favoritesChanged', calcIds);
    },

    toggleFavorite(calcId) {
        const favorites = this.getFavorites();
        const index = favorites.indexOf(calcId);
        
        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(calcId);
        }
        
        this.setFavorites(favorites);
        return favorites.includes(calcId);
    },

    isFavorite(calcId) {
        const favorites = this.getFavorites();
        return favorites.includes(calcId);
    },

    // === HISTORIAL === //
    getHistory() {
        const data = localStorage.getItem(this.KEYS.HISTORY);
        return data ? JSON.parse(data) : null;
    },

    setHistory(history) {
        localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(history));
    },

    addToHistory(calculation) {
        const history = this.getHistory();
        
        // Crear objeto de historial
        const historyItem = {
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            calculatorId: calculation.calculatorId,
            calculatorName: calculation.calculatorName,
            formula: calculation.formula || null,
            inputs: calculation.inputs,
            result: calculation.result,
            interpretation: calculation.interpretation,
            timestamp: new Date().toISOString()
        };
        
        // Añadir al inicio
        history.unshift(historyItem);
        
        // Mantener solo los últimos 20
        if (history.length > 20) {
            history.splice(20);
        }
        
        this.setHistory(history);
        this.dispatchEvent('historyChanged', history);
        return historyItem;
    },

    clearHistory() {
        this.setHistory([]);
        this.dispatchEvent('historyChanged', []);
    },

    deleteHistoryItem(itemId) {
        const history = this.getHistory();
        const filtered = history.filter(item => item.id !== itemId);
        this.setHistory(filtered);
        this.dispatchEvent('historyChanged', filtered);
    },

    // === CONFIGURACIÓN === //
    getSettings() {
        const data = localStorage.getItem(this.KEYS.SETTINGS);
        return data ? JSON.parse(data) : null;
    },

    setSettings(settings) {
        localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
        this.dispatchEvent('settingsChanged', settings);
    },

    updateSetting(key, value) {
        const settings = this.getSettings();
        
        // Soporte para keys anidados (e.g., 'units.creatinine')
        const keys = key.split('.');
        let current = settings;
        
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
        
        this.setSettings(settings);
        return settings;
    },

    getSetting(key) {
        const settings = this.getSettings();
        const keys = key.split('.');
        let current = settings;
        
        for (const k of keys) {
            if (!current || !current[k]) return null;
            current = current[k];
        }
        
        return current;
    },

    // === RESTAURAR CONFIGURACIÓN === //
    restoreDefaults() {
        this.setSettings(DEFAULT_CONFIG.settings);
        this.setMainScreen(DEFAULT_CONFIG.mainScreen);
        this.setFavorites(DEFAULT_CONFIG.favorites);
        this.dispatchEvent('defaultsRestored');
    },

    // === EXPORTAR/IMPORTAR === //
    exportData() {
        return {
            version: '1.0.0',
            exportDate: new Date().toISOString(),
            mainScreen: this.getMainScreen(),
            favorites: this.getFavorites(),
            history: this.getHistory(),
            settings: this.getSettings()
        };
    },

    importData(data) {
        try {
            if (data.mainScreen) this.setMainScreen(data.mainScreen);
            if (data.favorites) this.setFavorites(data.favorites);
            if (data.history) this.setHistory(data.history);
            if (data.settings) this.setSettings(data.settings);
            
            this.dispatchEvent('dataImported');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // === EVENTOS === //
    dispatchEvent(eventName, data) {
        window.dispatchEvent(new CustomEvent('storage:' + eventName, { 
            detail: data 
        }));
    },

    // === UTILIDADES === //
    getStorageSize() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key) && key.startsWith('clinicalc_')) {
                total += localStorage[key].length + key.length;
            }
        }
        return {
            bytes: total,
            kb: (total / 1024).toFixed(2),
            mb: (total / 1024 / 1024).toFixed(2)
        };
    },

    clearAll() {
        for (let key in this.KEYS) {
            localStorage.removeItem(this.KEYS[key]);
        }
        this.init();
    }
};

// === INICIALIZAR AL CARGAR === //
Storage.init();
