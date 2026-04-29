// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// Motor de búsqueda + UI (ID 30)
// ============================================

let _abSelectedDisease  = null;
let _abSelectedSubtype  = null;

// === BÚSQUEDA (algoritmo 6 fases, sin dependencias) ===

function _abNormalize(text) {
    return (text || '').toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s]/g, '').trim();
}

function _abSimilarity(s1, s2) {
    const maxLen = Math.max(s1.length, s2.length);
    if (!maxLen) return 1;
    let matches = 0;
    const minLen = Math.min(s1.length, s2.length);
    for (let i = 0; i < minLen; i++) if (s1[i] === s2[i]) matches++;
    return Math.max(0, (matches - Math.abs(s1.length - s2.length) / 2) / maxLen);
}

function _abSearch(query) {
    const q = _abNormalize(query);
    if (q.length < 2) return [];

    const results = [];
    const seen    = new Set();

    for (const disease of ANTIBIOTIC_DB) {
        if (seen.has(disease.id)) continue;
        const name    = _abNormalize(disease.name);
        const aliases = (disease.aliases || []).map(_abNormalize);
        let score = 0;

        if (name === q)              { score = 1000; }
        else if (name.startsWith(q)) { score = 900 + (q.length / name.length) * 50; }
        else if (name.includes(q))   { score = 800 + Math.max(0, 50 - name.indexOf(q)); }
        else {
            for (const a of aliases) {
                if (a === q)              score = Math.max(score, 750);
                else if (a.startsWith(q)) score = Math.max(score, 680 + (q.length / (a.length || 1)) * 30);
                else if (a.includes(q))   score = Math.max(score, 600 + Math.max(0, 30 - a.indexOf(q)));
            }
            if (score === 0) {
                for (const sub of (disease.subtypes || [])) {
                    const sn = _abNormalize(sub.name);
                    if (sn.includes(q)) { score = Math.max(score, 500); break; }
                }
            }
            if (score === 0 && q.length >= 4) {
                const sim = _abSimilarity(q, name);
                if (sim >= 0.80) score = 300 + sim * 100;
            }
        }

        if (score > 0) { results.push({ disease, score }); seen.add(disease.id); }
    }

    return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

// === RENDER TRATAMIENTO ===

function _abDrugCard(entry, accentColor) {
    const noteHtml = entry.note
        ? `<p style="font-size:11px;color:var(--text-tertiary);margin:4px 0 0;line-height:1.5;">${entry.note}</p>`
        : '';
    const detailLine = entry.dose !== 'Ver detalle' && entry.dose !== '—'
        ? `<span style="color:var(--text-primary);font-weight:600;">${entry.dose}</span>
           <span style="color:var(--text-tertiary)"> · ${entry.route} · ${entry.duration}</span>`
        : `<span style="color:var(--text-secondary);font-size:12px;">${entry.route} · ${entry.duration}</span>`;

    return `
        <div style="background:var(--bg-card);border:1px solid var(--border-color);
                    border-left:4px solid ${accentColor};border-radius:var(--radius-md);
                    padding:12px 14px;margin-bottom:8px;">
            <p style="font-size:14px;font-weight:700;color:var(--text-primary);margin:0 0 4px;">
                ${entry.drug}
            </p>
            <p style="font-size:12px;margin:0 0 2px;line-height:1.5;">${detailLine}</p>
            ${noteHtml}
        </div>`;
}

function _abAllergyCard(entry) {
    const noteHtml = entry.note
        ? `<p style="font-size:11px;color:var(--text-tertiary);margin:4px 0 0;line-height:1.5;">${entry.note}</p>`
        : '';
    return `
        <div style="background:var(--bg-card);border:1px solid var(--border-color);
                    border-left:4px solid #ef4444;border-radius:var(--radius-md);
                    padding:12px 14px;margin-bottom:8px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                <p style="font-size:14px;font-weight:700;color:var(--text-primary);margin:0;">
                    ${entry.drug}
                </p>
                <span style="font-size:10px;font-weight:700;color:#ef4444;background:#ef444420;
                             padding:2px 8px;border-radius:20px;white-space:nowrap;">
                    Alergia a ${entry.allergyTo}
                </span>
            </div>
            <p style="font-size:12px;margin:0;line-height:1.5;">
                <span style="color:var(--text-primary);font-weight:600;">${entry.dose}</span>
                <span style="color:var(--text-tertiary);"> · ${entry.route} · ${entry.duration}</span>
            </p>
            ${noteHtml}
        </div>`;
}

function _abRenderTreatment(subtype) {
    const t = subtype.treatment;

    const section = (title, icon, color, bg, entries, renderFn) => {
        if (!entries || !entries.length) return '';
        return `
            <div style="margin-bottom:16px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                    <span style="font-size:16px;">${icon}</span>
                    <span style="font-size:12px;font-weight:800;color:${color};
                                 text-transform:uppercase;letter-spacing:0.07em;">${title}</span>
                </div>
                ${entries.map(e => renderFn(e)).join('')}
            </div>`;
    };

    const notesHtml = t.notes ? `
        <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:12px 14px;
                    border-radius:0 var(--radius-md) var(--radius-md) 0;margin-bottom:12px;">
            <p style="font-size:11px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
            <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">${t.notes}</p>
        </div>` : '';

    const sourceHtml = t.source ? `
        <p style="font-size:11px;color:var(--text-tertiary);margin:4px 0 0;text-align:right;">
            📚 ${t.source}
        </p>` : '';

    return `
        <div style="background:var(--bg-secondary);border-radius:var(--radius-md);
                    padding:12px 14px;margin-bottom:14px;">
            <p style="font-size:12px;color:var(--text-tertiary);margin:0;line-height:1.5;">
                ${subtype.context || ''}
            </p>
        </div>

        ${section('Primera Línea', '🟢', '#22c55e', '#22c55e18',
            t.firstLine, e => _abDrugCard(e, '#22c55e'))}
        ${section('Segunda Línea', '🟡', '#f59e0b', '#f59e0b18',
            t.secondLine, e => _abDrugCard(e, '#f59e0b'))}
        ${section('Alternativa en Alergia', '🔴', '#ef4444', '#ef444418',
            t.allergyAlternatives, e => _abAllergyCard(e))}

        ${notesHtml}
        ${sourceHtml}`;
}

// === NAVEGACIÓN ===

function abGoBack() {
    if (_abSelectedSubtype) {
        _abSelectedSubtype = null;
        _abShowSubtypes(_abSelectedDisease);
    } else {
        _abSelectedDisease = null;
        _abShowInitial();
    }
}

function abSelectDisease(id) {
    const disease = ANTIBIOTIC_DB.find(d => d.id === id);
    if (!disease) return;
    _abSelectedDisease = disease;
    _abSelectedSubtype = null;
    _abShowSubtypes(disease);
}

function abSelectSubtype(idx) {
    if (!_abSelectedDisease) return;
    const sub = _abSelectedDisease.subtypes[idx];
    if (!sub) return;
    _abSelectedSubtype = sub;

    const container = document.getElementById('abContent');
    if (!container) return;

    container.innerHTML = `
        <button onclick="abGoBack()" style="display:flex;align-items:center;gap:6px;
                background:none;border:none;color:var(--brand-accent);cursor:pointer;
                font-size:13px;font-weight:600;padding:0;margin-bottom:14px;">
            ← ${_abSelectedDisease.name}
        </button>
        <h3 style="font-size:15px;font-weight:700;color:var(--text-primary);margin:0 0 4px;">
            ${sub.name}
        </h3>
        <div style="height:1px;background:var(--border-color);margin:12px 0 16px;"></div>
        ${_abRenderTreatment(sub)}`;
}

function _abShowSubtypes(disease) {
    const container = document.getElementById('abContent');
    if (!container) return;

    const subtypeCards = disease.subtypes.map((sub, idx) => `
        <div onclick="abSelectSubtype(${idx})"
            style="background:var(--bg-secondary);border:1px solid var(--border-color);
                   border-radius:var(--radius-md);padding:14px 16px;cursor:pointer;
                   margin-bottom:10px;display:flex;justify-content:space-between;
                   align-items:flex-start;gap:10px;transition:border-color 0.15s;"
            onmouseover="this.style.borderColor='var(--brand-accent)'"
            onmouseout="this.style.borderColor='var(--border-color)'">
            <div>
                <p style="font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 4px;">
                    ${sub.name}
                </p>
                <p style="font-size:11px;color:var(--text-tertiary);margin:0;line-height:1.4;">
                    ${sub.context || ''}
                </p>
            </div>
            <span style="color:var(--brand-accent);font-size:18px;flex-shrink:0;margin-top:2px;">→</span>
        </div>`).join('');

    container.innerHTML = `
        <button onclick="abGoBack()" style="display:flex;align-items:center;gap:6px;
                background:none;border:none;color:var(--brand-accent);cursor:pointer;
                font-size:13px;font-weight:600;padding:0;margin-bottom:14px;">
            ← Volver a búsqueda
        </button>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
            <span style="font-size:24px;">${disease.icon}</span>
            <div>
                <h3 style="font-size:15px;font-weight:700;color:var(--text-primary);margin:0 0 2px;">
                    ${disease.name}
                </h3>
                <span style="font-size:11px;color:var(--text-tertiary);">${disease.category}</span>
            </div>
        </div>
        <div style="height:1px;background:var(--border-color);margin:12px 0 14px;"></div>
        <p style="font-size:12px;font-weight:600;color:var(--text-secondary);
                  text-transform:uppercase;letter-spacing:0.05em;margin:0 0 12px;">
            Selecciona el contexto clínico
        </p>
        ${subtypeCards}`;
}

function _abShowInitial() {
    const container = document.getElementById('abContent');
    if (!container) return;

    const quickChips = ['Neumonía', 'Sepsis', 'ITU', 'Meningitis', 'Celulitis', 'Clostridium'].map(q => `
        <button type="button" onclick="abQuickSearch('${q}')"
            style="padding:7px 14px;border-radius:20px;font-size:12px;font-weight:600;
                   background:var(--bg-secondary);border:1px solid var(--border-color);
                   color:var(--text-secondary);cursor:pointer;transition:all 0.15s;"
            onmouseover="this.style.borderColor='var(--brand-accent)';this.style.color='var(--brand-accent)'"
            onmouseout="this.style.borderColor='var(--border-color)';this.style.color='var(--text-secondary)'">
            ${q}
        </button>`).join('');

    container.innerHTML = `
        <div style="text-align:center;padding:20px 0 16px;">
            <div style="font-size:36px;margin-bottom:8px;">💊</div>
            <p style="font-size:13px;color:var(--text-secondary);margin:0;">
                Busca una patología infecciosa para ver la antibioterapia empírica recomendada
            </p>
        </div>
        <div style="font-size:11px;font-weight:700;color:var(--text-tertiary);
                    text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">
            Búsquedas frecuentes
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
            ${quickChips}
        </div>`;
}

function abQuickSearch(term) {
    const input = document.getElementById('abSearchInput');
    if (input) { input.value = term; abSearch(); }
}

function abSearch() {
    const query  = document.getElementById('abSearchInput')?.value || '';
    const results = _abSearch(query);
    const container = document.getElementById('abContent');
    if (!container) return;

    _abSelectedDisease = null;
    _abSelectedSubtype = null;

    if (!query.trim() || query.length < 2) {
        _abShowInitial();
        return;
    }

    if (!results.length) {
        container.innerHTML = `
            <div style="text-align:center;padding:30px 20px;color:var(--text-tertiary);">
                <div style="font-size:32px;margin-bottom:10px;">🔍</div>
                <p style="font-size:13px;margin:0;">
                    Sin resultados para "<strong>${query}</strong>".<br>
                    Prueba: neumonia, sepsis, meningitis, itu…
                </p>
            </div>`;
        return;
    }

    const categoryIcons = {};
    ANTIBIOTIC_DB.forEach(d => { categoryIcons[d.category] = d.icon; });

    container.innerHTML = results.map(({ disease }) => `
        <div onclick="abSelectDisease('${disease.id}')"
            style="background:var(--bg-secondary);border:1px solid var(--border-color);
                   border-radius:var(--radius-md);padding:14px 16px;cursor:pointer;
                   margin-bottom:8px;display:flex;align-items:center;gap:12px;
                   transition:border-color 0.15s;"
            onmouseover="this.style.borderColor='var(--brand-accent)'"
            onmouseout="this.style.borderColor='var(--border-color)'">
            <span style="font-size:22px;flex-shrink:0;">${disease.icon}</span>
            <div style="flex:1;min-width:0;">
                <p style="font-size:13px;font-weight:700;color:var(--text-primary);
                           margin:0 0 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    ${disease.name}
                </p>
                <p style="font-size:11px;color:var(--text-tertiary);margin:0;">
                    ${disease.category} · ${disease.subtypes.length} contexto${disease.subtypes.length !== 1 ? 's' : ''}
                </p>
            </div>
            <span style="color:var(--brand-accent);font-size:18px;flex-shrink:0;">→</span>
        </div>`).join('');
}

// === FORMULARIO PRINCIPAL ===

function createAntibioticsForm() {
    return `
<div style="padding:0;">
    <div style="background:#22c55e11;border-left:4px solid #22c55e;padding:12px 16px;
                border-radius:8px;margin-bottom:16px;">
        <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">
            <strong>💊 Guía Antibiótica Empírica</strong> — Sanford Guide 2024 · IDSA · ATS · ESCMID.
            Uso clínico: ajustar siempre según antibiograma, función renal y alergias del paciente.
        </p>
    </div>

    <!-- BÚSQUEDA -->
    <div style="position:relative;margin-bottom:16px;">
        <div style="position:absolute;left:12px;top:50%;transform:translateY(-50%);
                    color:var(--text-tertiary);pointer-events:none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
            </svg>
        </div>
        <input type="text" id="abSearchInput"
            placeholder="Buscar patología: neumonia, sepsis, meningitis…"
            oninput="abSearch()"
            autocomplete="off"
            style="width:100%;padding:13px 16px 13px 40px;
                   background:var(--bg-secondary);border:1.5px solid var(--border-color);
                   border-radius:var(--radius-lg);font-size:14px;color:var(--text-primary);
                   box-sizing:border-box;outline:none;transition:border-color 0.15s;"
            onfocus="this.style.borderColor='var(--brand-accent)'"
            onblur="this.style.borderColor='var(--border-color)'">
    </div>

    <!-- CONTENIDO DINÁMICO -->
    <div id="abContent"></div>
</div>`;
}

