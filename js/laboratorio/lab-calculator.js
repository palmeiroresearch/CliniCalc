// ============================================
// LABORATORIO — MOTOR DE BÚSQUEDA Y RENDERIZADO (Calculadora 61)
// ============================================

function _labNormalize(text) {
    return (text || '')
        .toString()
        .toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .trim();
}

function _labSearch(query) {
    const q = _labNormalize(query);
    if (q.length < 2) return [];
    const scored = [];
    LAB_REFERENCE_DB.forEach(entry => {
        const name = _labNormalize(entry.name);
        let score = 0;
        if (name === q) score = 100;
        else if (name.startsWith(q)) score = 80;
        else if (name.includes(q)) score = 60;
        (entry.aliases || []).forEach(alias => {
            const a = _labNormalize(alias);
            if (a === q) score = Math.max(score, 90);
            else if (a.startsWith(q)) score = Math.max(score, 70);
            else if (a.includes(q)) score = Math.max(score, 50);
        });
        if (score > 0) scored.push({ entry, score });
    });
    scored.sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name));
    return scored.map(s => s.entry);
}

function _labFormatRange(row) {
    if (row.texto) return row.texto;
    if (row.min != null && row.max != null) return `${row.min} – ${row.max} ${row.unit}`;
    if (row.min == null && row.max != null) return `&lt; ${row.max} ${row.unit}`;
    if (row.min != null && row.max == null) return `&gt; ${row.min} ${row.unit}`;
    return '—';
}

function _labConvert(value, key, sourceUnit, targetUnit) {
    if (value == null) return null;
    const table = UNIT_CONVERSIONS[key];
    if (!table || !table[sourceUnit] || !table[targetUnit]) return null;
    const base = value / table[sourceUnit].factor;
    return Math.round(base * table[targetUnit].factor * 100) / 100;
}

function _labRenderRow(row, entry) {
    const mainText = _labFormatRange(row);
    let convertedText = '';

    if (entry.unitConvKey && row.unit && !row.texto) {
        const table = UNIT_CONVERSIONS[entry.unitConvKey];
        const targetUnit = Storage.getSetting('units.' + entry.unitConvKey);
        if (table && targetUnit && table[row.unit] && table[targetUnit] && targetUnit !== row.unit) {
            const targetLabel = table[targetUnit].label || targetUnit;
            if (row.min != null && row.max != null) {
                convertedText = `${_labConvert(row.min, entry.unitConvKey, row.unit, targetUnit)} – ${_labConvert(row.max, entry.unitConvKey, row.unit, targetUnit)} ${targetLabel}`;
            } else if (row.min == null && row.max != null) {
                convertedText = `&lt; ${_labConvert(row.max, entry.unitConvKey, row.unit, targetUnit)} ${targetLabel}`;
            } else if (row.min != null && row.max == null) {
                convertedText = `&gt; ${_labConvert(row.min, entry.unitConvKey, row.unit, targetUnit)} ${targetLabel}`;
            }
        }
    }

    return `
        <div style="display:flex; justify-content:space-between; align-items:baseline; gap:12px; padding:6px 0; border-bottom:1px solid rgba(128,128,128,0.15);">
            <span style="font-size:13px; color:var(--text-secondary);">${row.poblacion}</span>
            <span style="font-size:14px; font-weight:700; text-align:right;">
                ${mainText}
                ${convertedText ? `<div style="font-size:11px; font-weight:500; color:var(--brand-accent);">≈ ${convertedText} (tu unidad configurada)</div>` : ''}
            </span>
        </div>`;
}

function _labRenderEntry(entry) {
    const cat = LAB_CATEGORIES.find(c => c.id === entry.category);
    return `
        <div style="background:var(--bg-card); border:1px solid rgba(128,128,128,0.15); border-radius:var(--radius-lg); padding:14px 16px; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                <span style="font-size:16px;">${cat ? cat.icon : '🧪'}</span>
                <span style="font-size:14px; font-weight:700;">${entry.name}</span>
            </div>
            <div>${entry.valores.map(row => _labRenderRow(row, entry)).join('')}</div>
            ${entry.notaClinica ? `<div style="margin-top:8px; font-size:12px; color:var(--text-secondary); line-height:1.5;">💡 ${entry.notaClinica}</div>` : ''}
            <div style="margin-top:6px; font-size:11px; color:var(--text-tertiary); font-style:italic;">Fuente: ${entry.fuente}</div>
        </div>`;
}

let _labActiveCategory = null;

function createLabReferenceForm() {
    return `
        <div style="background:#fef3c7; border-left:4px solid #f59e0b; padding:14px; border-radius:8px; margin-bottom:16px;">
            <p style="font-size:12px; color:#92400e; margin:0;">
                <strong>⚠️ Solo de referencia</strong> — Los intervalos varían según el laboratorio, los reactivos y el equipo utilizados. Verifica siempre el rango impreso en el reporte de tu propio laboratorio.
            </p>
        </div>
        <div class="form-group" style="margin-bottom:14px;">
            <input type="text" id="labSearchInput" class="form-input" placeholder="Buscar un test (ej. hemoglobina, TGO, TSH...)" oninput="labSearch()" autocomplete="off">
        </div>
        <div id="labCategoryChips" style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px;">
            <button type="button" class="filter-chip active" data-labcat="all" onclick="labClearFilters()" style="cursor:pointer;">Todas</button>
            ${LAB_CATEGORIES.map(c => `<button type="button" class="filter-chip" data-labcat="${c.id}" onclick="labFilterCategory('${c.id}')" style="cursor:pointer;">${c.icon} ${c.label}</button>`).join('')}
        </div>
        <div id="labContent"></div>
    `;
}

function _labSetActiveChip(catId) {
    const wrap = document.getElementById('labCategoryChips');
    if (!wrap) return;
    wrap.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.labcat === (catId || 'all'));
    });
}

function _labRenderGrouped(categoryFilter) {
    const container = document.getElementById('labContent');
    if (!container) return;
    const cats = categoryFilter ? LAB_CATEGORIES.filter(c => c.id === categoryFilter) : LAB_CATEGORIES;
    let html = '';
    cats.forEach(cat => {
        const entries = LAB_REFERENCE_DB.filter(e => e.category === cat.id);
        if (entries.length === 0) return;
        html += `<div style="font-size:13px; font-weight:700; color:var(--text-secondary); margin:16px 0 8px; text-transform:uppercase; letter-spacing:0.05em;">${cat.icon} ${cat.label}</div>`;
        html += entries.map(e => _labRenderEntry(e)).join('');
    });
    container.innerHTML = html;
}

function _labShowInitial() {
    _labActiveCategory = null;
    _labSetActiveChip(null);
    _labRenderGrouped();
}

function labSearch() {
    const q = document.getElementById('labSearchInput').value;
    if (_labNormalize(q).length < 2) {
        _labRenderGrouped(_labActiveCategory);
        return;
    }
    _labSetActiveChip(null);
    const results = _labSearch(q);
    const container = document.getElementById('labContent');
    if (results.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:32px 16px; color:var(--text-tertiary);">
                <div style="font-size:32px; margin-bottom:8px;">🔍</div>
                <div style="font-size:13px;">Sin resultados para "${q}". Prueba con el nombre completo o una sigla (ej. "TGO", "TSH").</div>
            </div>`;
        return;
    }
    container.innerHTML = results.map(e => _labRenderEntry(e)).join('');
}

function labFilterCategory(catId) {
    _labActiveCategory = catId;
    document.getElementById('labSearchInput').value = '';
    _labSetActiveChip(catId);
    _labRenderGrouped(catId);
}

function labClearFilters() {
    _labActiveCategory = null;
    document.getElementById('labSearchInput').value = '';
    _labSetActiveChip(null);
    _labRenderGrouped();
}
