// ============================================
// CLINICALC IV CALCULATOR — MOTOR + FORMULARIO
// ID 29 | Categoría: critico
// ============================================

// === ESTADO GLOBAL ===
let _ivSelectedDrug = null;
let _ivSelectedIndicationIdx = 0;
let _ivDropFactor = 20;

// === CONVERSIONES ===
function _ivAmountToMg(value, unit) {
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    switch (unit) {
        case 'g':   return v * 1000;
        case 'mg':  return v;
        case 'µg':  return v / 1000;
        case 'UI':  return v;   // UI treated as base unit (same math)
        case 'mEq': return v;   // mEq treated as base unit
        default:    return v;
    }
}

function _ivDoseToBasePerMin(value, unit, weightKg) {
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    const w = parseFloat(weightKg) || 1;
    switch (unit) {
        case 'µg/kg/min': return v * w / 1000;
        case 'µg/kg/hr':  return v * w / 1000 / 60;
        case 'µg/min':    return v / 1000;
        case 'µg/hr':     return v / 1000 / 60;
        case 'mg/kg/min': return v * w;
        case 'mg/kg/hr':  return v * w / 60;
        case 'mg/min':    return v;
        case 'mg/hr':     return v / 60;
        case 'g/hr':      return v * 1000 / 60;
        case 'g/min':     return v * 1000;
        case 'UI/hr':     return v / 60;
        case 'UI/min':    return v;
        case 'mEq/hr':    return v / 60;
        default:          return v;
    }
}

function _ivWeightToKg(value, unit) {
    const v = parseFloat(value);
    if (isNaN(v) || v <= 0) return null;
    return unit === 'lb' ? v / 2.20462 : v;
}

function _ivRound(n, dec = 2) {
    return Math.round(n * Math.pow(10, dec)) / Math.pow(10, dec);
}

// === MOTOR PRINCIPAL ===
function _ivCalculate() {
    const drug = _ivSelectedDrug;
    if (!drug) return null;

    const amount    = _ivAmountToMg(
        document.getElementById('ivAmount')?.value,
        document.getElementById('ivAmountUnit')?.value || drug.defaultAmountUnit
    );
    const volume    = parseFloat(document.getElementById('ivVolume')?.value);
    const dose      = parseFloat(document.getElementById('ivDose')?.value);
    const doseUnit  = document.getElementById('ivDoseUnit')?.value || drug.defaultDoseUnit;
    const weightRaw = document.getElementById('ivWeight')?.value;
    const weightUnit= document.getElementById('ivWeightUnit')?.value || 'kg';
    const weightKg  = _ivWeightToKg(weightRaw, weightUnit);

    if (!amount || !volume || isNaN(dose) || dose <= 0) return null;
    if (drug.weightBased && (!weightKg || weightKg <= 0)) return null;

    const concentration = amount / volume;
    if (concentration <= 0) return null;

    const indic   = drug.indications[_ivSelectedIndicationIdx];
    const concUnit = ['UI','mEq'].includes(drug.defaultAmountUnit)
        ? drug.defaultAmountUnit + '/ml' : 'mg/ml';
    const concDisplay = _ivRound(concentration, 3);

    // ── PROTOCOLO DE DOSIS TOTAL (ej. alteplase ACV) ──────────────────────
    // Unidades "mg/kg" = dosis TOTAL, no tasa. Se distribuye según el campo
    // protocol { bolusPct, infusionPct, infusionDurationMin }.
    if (doseUnit === 'mg/kg' && indic?.protocol) {
        const rawTotalMg  = dose * (weightKg || 1);
        const capApplied  = indic.maxTotalMg && rawTotalMg > indic.maxTotalMg;
        const totalDoseMg = capApplied ? indic.maxTotalMg : _ivRound(rawTotalMg, 1);

        const bolusMg    = _ivRound(totalDoseMg * indic.protocol.bolusPct  / 100, 1);
        const infuseMg   = _ivRound(totalDoseMg * indic.protocol.infusionPct / 100, 1);
        const infuseDurHr = indic.protocol.infusionDurationMin / 60;
        const rateMlHr   = _ivRound((infuseMg / infuseDurHr) / concentration, 2);
        const rateGttMin = _ivRound(rateMlHr * _ivDropFactor / 60, 1);

        return {
            rateMlHr, rateMlMinR: _ivRound(rateMlHr / 60, 3), rateGttMin,
            concDisplay, concUnit, concentration, rangeStatus: 'ok', indic,
            protocol: {
                totalDoseMg, bolusMg, infuseMg,
                infusionDurationMin: indic.protocol.infusionDurationMin,
                capApplied, rawTotalMg: _ivRound(rawTotalMg, 1),
                maxTotalMg: indic.maxTotalMg
            }
        };
    }

    // ── INFUSIÓN CONTINUA ESTÁNDAR ─────────────────────────────────────────
    let dosePerMin = _ivDoseToBasePerMin(dose, doseUnit, weightKg || 1);
    if (dosePerMin === null || dosePerMin <= 0) return null;

    // Cap de dosis total para fármacos peso-dependientes con límite absoluto
    // (ej. levetiracetam 60 mg/kg MAX 4500 mg, fenitoína 15-20 mg/kg MAX 1500 mg)
    let capInfo = null;
    if (indic?.maxTotalMg && drug.weightBased && weightKg) {
        // Convertir dosePerMin a mg/hr para comparar con el cap expresado en mg totales.
        // Para cargas (dosis única en N minutos), el comparador es:
        //   totalMg_si_dura_1h = dosePerMin × 60
        // Si eso supera maxTotalMg el rate ya estaría por encima del cap.
        const projectedMgHr = dosePerMin * 60;
        if (projectedMgHr > indic.maxTotalMg) {
            const capFactor  = indic.maxTotalMg / projectedMgHr;
            capInfo = {
                projectedMgHr: _ivRound(projectedMgHr, 1),
                maxTotalMg:    indic.maxTotalMg,
                weightKg:      _ivRound(weightKg, 1)
            };
            dosePerMin = dosePerMin * capFactor;
        }
    }

    const rateMlMin  = dosePerMin / concentration;
    const rateMlHr   = _ivRound(rateMlMin * 60, 2);
    const rateMlMinR = _ivRound(rateMlMin, 3);
    const rateGttMin = _ivRound(rateMlHr * _ivDropFactor / 60, 1);

    // Verificar rango
    let rangeStatus = null;
    if (indic && typeof indic.doseMin === 'number' && indic.doseUnit === doseUnit) {
        if (dose < indic.doseMin)      rangeStatus = 'below';
        else if (dose > indic.doseMax) rangeStatus = 'above';
        else                           rangeStatus = 'ok';
    }

    return {
        rateMlHr, rateMlMinR, rateGttMin, concDisplay, concUnit,
        concentration, rangeStatus, indic, capInfo
    };
}

// === ACTUALIZAR RESULTADO EN VIVO ===
function updateIVCalc() {
    const out = document.getElementById('ivResult');
    if (!out) return;

    const r = _ivCalculate();

    // Actualizar el texto de rango según la unidad seleccionada actualmente
    const rangeEl      = document.getElementById('ivDoseRange');
    const currentUnit  = document.getElementById('ivDoseUnit')?.value;
    if (rangeEl && r?.indic) {
        if (currentUnit === r.indic.doseUnit && typeof r.indic.doseMin === 'number') {
            rangeEl.style.color = 'var(--text-tertiary)';
            rangeEl.textContent = `Rango recomendado: ${r.indic.doseMin}–${r.indic.doseMax} ${r.indic.doseUnit}`;
        } else if (currentUnit && r.indic.doseUnit && currentUnit !== r.indic.doseUnit) {
            rangeEl.style.color = '#f59e0b';
            rangeEl.textContent = `⚠️ Unidad cambiada — el rango oficial es en ${r.indic.doseUnit}`;
        } else {
            rangeEl.textContent = '';
        }
    }

    if (!r) {
        out.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-tertiary);font-size:13px;">
            Completa los campos para ver el resultado</div>`;
        return;
    }

    const rangeHtml = r.rangeStatus ? (() => {
        const map = {
            ok:    { color: '#22c55e', icon: '✓', label: 'Dentro del rango recomendado' },
            below: { color: '#f59e0b', icon: '↓', label: 'Por debajo del rango recomendado' },
            above: { color: '#ef4444', icon: '↑', label: 'Por encima del rango recomendado' },
        };
        const m = map[r.rangeStatus];
        return `<div style="background:${m.color}18;border:1px solid ${m.color}44;border-radius:8px;
                    padding:8px 12px;display:flex;align-items:center;gap:8px;margin-top:10px;">
            <span style="color:${m.color};font-weight:800;font-size:16px;">${m.icon}</span>
            <span style="font-size:12px;color:${m.color};font-weight:600;">${m.label}</span>
            <span style="font-size:11px;color:var(--text-tertiary);margin-left:auto;">
                ${r.indic.doseMin}–${r.indic.doseMax} ${r.indic.doseUnit}</span>
        </div>`;
    })() : '';

    const dropFactors = [10,15,20,60];
    const dropLabels  = { 10:'macrogotero', 15:'estándar', 20:'normogotero', 60:'microgotero' };
    const dropHtml = dropFactors.map(f => {
        const gtt = _ivRound(r.rateMlHr * f / 60, 1);
        const active = f === _ivDropFactor;
        return `<button type="button" onclick="setIVDropFactor(${f})"
            style="flex:1;padding:8px 4px;border-radius:8px;font-size:12px;font-weight:700;
                   border:2px solid ${active ? 'var(--brand-accent)' : 'var(--border-color)'};
                   background:${active ? 'var(--brand-accent)' : 'var(--bg-secondary)'};
                   color:${active ? 'var(--brand-primary-dark)' : 'var(--text-secondary)'};cursor:pointer;">
            ${f} gtt<br><span style="font-size:10px;font-weight:400;">${gtt} gtt/min</span>
        </button>`;
    }).join('');

    const pearlHtml = r.indic?.pearl ? `
        <div style="background:#f59e0b11;border-left:3px solid #f59e0b;padding:12px 14px;
                    border-radius:0 8px 8px 0;margin-top:12px;">
            <p style="font-size:11px;font-weight:700;color:#f59e0b;margin:0 0 4px;">💡 Perla clínica</p>
            <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">${r.indic.pearl}</p>
        </div>` : '';

    const alertHtml = r.indic?.alert ? `
        <div style="background:#ef444411;border-left:3px solid #ef4444;padding:12px 14px;
                    border-radius:0 8px 8px 0;margin-top:8px;">
            <p style="font-size:12px;color:#ef4444;margin:0;font-weight:600;line-height:1.6;">${r.indic.alert}</p>
        </div>` : '';

    // Aviso de cap de dosis total (fármacos con maxTotalMg, ej. levetiracetam, fenitoína)
    const capHtml = r.capInfo ? `
        <div style="background:#7c3aed18;border:2px solid #7c3aed;border-radius:var(--radius-md);
                    padding:12px 14px;margin-bottom:12px;">
            <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">
                ⚠️ Cap de Dosis Aplicado Automáticamente
            </p>
            <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">
                Dosis calculada por peso: <strong>${r.capInfo.projectedMgHr} mg/hr</strong> →
                limitada a <strong>${r.capInfo.maxTotalMg} mg</strong> (máximo absoluto).<br>
                La tasa mostrada ya refleja el límite.
            </p>
        </div>` : '';

    // Output especial para fármacos con protocolo (alteplase ACV, etc.)
    let protocolHtml = '';
    let mainRateHtml = '';

    if (r.protocol) {
        const capBanner = r.protocol.capApplied ? `
            <div style="background:#7c3aed18;border:2px solid #7c3aed;border-radius:var(--radius-md);
                        padding:12px 14px;margin-bottom:12px;">
                <p style="font-size:12px;font-weight:700;color:#7c3aed;margin:0 0 4px;">
                    ✓ Cap de 90 mg aplicado (paciente >100 kg)
                </p>
                <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">
                    Dosis calculada por peso: <strong>${r.protocol.rawTotalMg} mg</strong>
                    (${r.protocol.rawTotalMg / r.protocol.weightKg || '?'} mg/kg × peso) →
                    limitada al máximo de <strong>${r.protocol.maxTotalMg} mg</strong>.
                    La calculadora usa automáticamente ${r.protocol.maxTotalMg} mg.
                </p>
            </div>` : '';

        protocolHtml = `
            ${capBanner}
            <div style="background:var(--bg-secondary);border:1px solid var(--border-color);
                        border-radius:var(--radius-lg);padding:16px;margin-bottom:12px;">
                <div style="font-size:12px;font-weight:700;color:var(--text-tertiary);
                            text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">
                    Distribución de la Dosis Total: ${r.protocol.totalDoseMg} mg
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                    <div style="background:var(--bg-card);border:1px solid var(--border-color);
                                border-radius:var(--radius-md);padding:12px;text-align:center;">
                        <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:4px;">
                            BOLO IV (1 min)
                        </div>
                        <div style="font-size:24px;font-weight:800;color:var(--text-primary);">
                            ${r.protocol.bolusMg}
                        </div>
                        <div style="font-size:12px;color:var(--text-secondary);">mg en 1 minuto</div>
                    </div>
                    <div style="background:linear-gradient(135deg,var(--brand-accent-dark),var(--brand-accent));
                                border-radius:var(--radius-md);padding:12px;text-align:center;">
                        <div style="font-size:11px;color:var(--brand-primary-dark);margin-bottom:4px;opacity:0.8;">
                            INFUSIÓN (${r.protocol.infusionDurationMin} min)
                        </div>
                        <div style="font-size:24px;font-weight:800;color:var(--brand-primary-dark);">
                            ${r.rateMlHr}
                        </div>
                        <div style="font-size:12px;color:var(--brand-primary-dark);opacity:0.9;">
                            ml/hr · ${r.protocol.infuseMg} mg total
                        </div>
                    </div>
                </div>
            </div>`;

        mainRateHtml = `
            <div style="background:var(--bg-secondary);border:1px solid var(--border-color);
                        border-radius:var(--radius-md);padding:12px 14px;margin-bottom:12px;">
                <span style="font-size:12px;color:var(--text-tertiary);">Concentración: </span>
                <span style="font-size:13px;font-weight:700;color:var(--text-primary);">
                    ${r.concDisplay} ${r.concUnit}</span>
            </div>`;
    } else {
        mainRateHtml = `
            <div style="background:linear-gradient(135deg,var(--brand-accent-dark),var(--brand-accent));
                        padding:20px;border-radius:var(--radius-lg);color:var(--brand-primary-dark);margin-bottom:12px;">
                <div style="font-size:12px;font-weight:600;margin-bottom:8px;opacity:0.8;">TASA DE INFUSIÓN</div>
                <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:4px;">
                    <span style="font-size:42px;font-weight:800;">${r.rateMlHr}</span>
                    <span style="font-size:18px;font-weight:600;">ml/hr</span>
                </div>
                <div style="font-size:13px;opacity:0.85;">${r.rateMlMinR} ml/min</div>
            </div>
            <div style="background:var(--bg-secondary);border:1px solid var(--border-color);
                        border-radius:var(--radius-md);padding:12px 14px;margin-bottom:12px;">
                <span style="font-size:12px;color:var(--text-tertiary);">Concentración: </span>
                <span style="font-size:13px;font-weight:700;color:var(--text-primary);">
                    ${r.concDisplay} ${r.concUnit}</span>
            </div>`;
    }

    out.innerHTML = `
        ${capHtml}
        ${mainRateHtml}
        ${protocolHtml}

        <div style="background:var(--bg-secondary);border:1px solid var(--border-color);
                    border-radius:var(--radius-md);padding:14px;margin-bottom:12px;">
            <div style="font-size:12px;font-weight:700;color:var(--text-tertiary);margin-bottom:10px;
                        text-transform:uppercase;letter-spacing:0.05em;">Factor de Goteo (gtt/ml)</div>
            <div style="display:flex;gap:6px;">${dropHtml}</div>
            <div style="font-size:11px;color:var(--text-tertiary);margin-top:6px;text-align:center;">
                ${dropLabels[_ivDropFactor]} · ${_ivDropFactor} gtt/ml
            </div>
        </div>

        ${rangeHtml}
        ${alertHtml}
        ${pearlHtml}
    `;
}

function setIVDropFactor(f) {
    _ivDropFactor = f;
    updateIVCalc();
}

// === SELECTOR DE FÁRMACO ===
function showIVDrugSelector() {
    const isDesktop = window.innerWidth > 640;
    const overlay = document.createElement('div');
    overlay.className = 'reorder-modal-overlay';
    overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.6);
        backdrop-filter:blur(4px);z-index:10000;display:flex;
        align-items:${isDesktop ? 'center' : 'flex-end'};justify-content:center;
        animation:fadeIn 0.2s ease;padding:${isDesktop ? '20px' : '0'};`;

    // Build flat drug list with sticky section headers
    let listHtml = '';
    for (const cat of IV_DRUG_CATEGORIES) {
        const drugs = getDrugsByCategory(cat.id);
        if (!drugs.length) continue;
        listHtml += `
            <div style="padding:8px 16px 6px;font-size:11px;font-weight:700;color:var(--text-tertiary);
                        text-transform:uppercase;letter-spacing:0.06em;background:var(--bg-secondary);
                        border-bottom:1px solid var(--border-color);position:sticky;top:0;z-index:1;">
                ${cat.icon}&nbsp; ${cat.label}
            </div>`;
        listHtml += drugs.map(d => `
            <div onclick="selectIVDrug('${d.id}');this.closest('.iv-drug-overlay').remove();"
                style="padding:13px 16px 13px 24px;cursor:pointer;border-bottom:1px solid var(--border-color);
                       font-size:14px;color:var(--text-primary);"
                onmouseover="this.style.background='var(--bg-secondary)'"
                onmouseout="this.style.background=''">
                ${d.name}
            </div>`).join('');
    }

    const borderRadius = isDesktop ? 'var(--radius-xl)' : 'var(--radius-xl) var(--radius-xl) 0 0';
    const animation    = isDesktop ? 'scaleIn 0.2s ease' : 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)';
    const maxHeight    = isDesktop ? '75vh' : '85vh';
    const width        = isDesktop ? '420px' : '100%';

    overlay.classList.add('iv-drug-overlay');
    overlay.innerHTML = `
        <div style="background:var(--bg-card);border-radius:${borderRadius};
                    width:${width};max-width:560px;max-height:${maxHeight};
                    display:flex;flex-direction:column;box-shadow:var(--shadow-xl);
                    animation:${animation};">
            <div style="padding:16px 20px;border-bottom:1px solid var(--border-color);
                        display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">
                <h3 style="font-size:16px;font-weight:700;margin:0;">💊 Seleccionar Fármaco</h3>
                <button onclick="this.closest('.iv-drug-overlay').remove()"
                    style="background:var(--bg-secondary);border:none;width:32px;height:32px;
                           border-radius:8px;cursor:pointer;font-size:18px;display:flex;
                           align-items:center;justify-content:center;color:var(--text-secondary);">✕</button>
            </div>
            <div style="overflow-y:auto;flex:1;">${listHtml}</div>
        </div>`;
    overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
    document.body.appendChild(overlay);
}

function selectIVDrug(drugId) {
    const drug = getDrugById(drugId);
    if (!drug) return;
    _ivSelectedDrug = drug;
    _ivSelectedIndicationIdx = 0;

    // Update drug button
    const btn = document.getElementById('ivDrugBtn');
    if (btn) {
        btn.innerHTML = `<span style="font-size:13px;font-weight:700;color:var(--brand-accent);">${drug.name}</span>
            <span style="font-size:11px;color:var(--text-tertiary);">· ${drug.category} · toca para cambiar</span>`;
    }

    // Populate default concentration fields
    const amountEl = document.getElementById('ivAmount');
    const volEl    = document.getElementById('ivVolume');
    const unitEl   = document.getElementById('ivAmountUnit');
    const doseUnitEl = document.getElementById('ivDoseUnit');
    const weightRow  = document.getElementById('ivWeightRow');

    if (amountEl)   amountEl.value = drug.defaultAmount;
    if (volEl)      volEl.value    = drug.defaultVolume;

    if (unitEl) {
        unitEl.innerHTML = drug.amountUnits.map(u =>
            `<option value="${u}" ${u === drug.defaultAmountUnit ? 'selected' : ''}>${u}</option>`
        ).join('');
    }

    if (doseUnitEl) {
        doseUnitEl.innerHTML = drug.doseUnits.map(u =>
            `<option value="${u}" ${u === drug.defaultDoseUnit ? 'selected' : ''}>${u}</option>`
        ).join('');
    }

    // Show/hide weight
    if (weightRow) weightRow.style.display = drug.weightBased ? 'flex' : 'none';

    // Build indication select
    const indicSelect = document.getElementById('ivIndication');
    if (indicSelect) {
        indicSelect.innerHTML = drug.indications.map((ind, i) =>
            `<option value="${i}">${ind.name}</option>`
        ).join('');
        indicSelect.style.display = 'block';
        document.getElementById('ivIndicationRow').style.display = 'flex';
    }

    selectIVIndication(0);
}

function selectIVIndication(idx) {
    if (!_ivSelectedDrug) return;
    _ivSelectedIndicationIdx = parseInt(idx);
    const indic = _ivSelectedDrug.indications[_ivSelectedIndicationIdx];
    if (!indic) return;

    const doseEl     = document.getElementById('ivDose');
    const doseUnitEl = document.getElementById('ivDoseUnit');
    const rangeEl    = document.getElementById('ivDoseRange');

    if (doseEl)     doseEl.value = indic.doseStart;
    if (doseUnitEl) {
        // Set correct unit for this indication
        Array.from(doseUnitEl.options).forEach(opt => {
            opt.selected = opt.value === indic.doseUnit;
        });
    }
    if (rangeEl) {
        rangeEl.textContent = `Rango recomendado: ${indic.doseMin}–${indic.doseMax} ${indic.doseUnit}`;
    }

    updateIVCalc();
}

// === FORMULARIO ===
function createIVCalculatorForm() {
    return `
<div style="padding:0;">
    <div style="background:#f59e0b11;border-left:4px solid #f59e0b;padding:14px 16px;
                border-radius:8px;margin-bottom:16px;">
        <p style="font-size:12px;color:var(--text-secondary);margin:0;line-height:1.6;">
            <strong>💉 Calculadora de Infusión IV</strong> — Selecciona el fármaco para auto-completar
            concentración y dosis recomendada. Todos los campos son editables. El resultado se actualiza en tiempo real.
        </p>
    </div>

    <!-- SELECTOR DE FÁRMACO -->
    <button type="button" id="ivDrugBtn" onclick="showIVDrugSelector()"
        style="width:100%;padding:16px;background:var(--bg-secondary);border:2px dashed var(--border-color);
               border-radius:var(--radius-lg);cursor:pointer;text-align:left;margin-bottom:16px;
               display:flex;flex-direction:column;gap:4px;transition:border-color var(--transition-fast);"
        onmouseover="this.style.borderColor='var(--brand-accent)'"
        onmouseout="this.style.borderColor='var(--border-color)'">
        <span style="font-size:13px;color:var(--text-tertiary);">🧪 Seleccionar fármaco →</span>
        <span style="font-size:11px;color:var(--text-tertiary);">12 fármacos disponibles</span>
    </button>

    <!-- INDICACIÓN -->
    <div id="ivIndicationRow" style="display:none;flex-direction:column;gap:4px;margin-bottom:14px;">
        <label style="font-size:12px;font-weight:600;color:var(--text-secondary);text-transform:uppercase;
                      letter-spacing:0.05em;">Indicación / Contexto clínico</label>
        <select id="ivIndication" class="form-input"
                onchange="selectIVIndication(this.value)" style="display:none;"></select>
    </div>

    <!-- PESO -->
    <div id="ivWeightRow" style="display:none;align-items:center;gap:10px;margin-bottom:14px;">
        <div style="flex:1;">
            <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);
                          text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Peso corporal</label>
            <input type="number" id="ivWeight" class="form-input" min="1" max="300"
                   placeholder="ej. 70" oninput="updateIVCalc()" style="margin-bottom:0;">
        </div>
        <div style="padding-top:22px;">
            <select id="ivWeightUnit" class="form-input" onchange="updateIVCalc()" style="flex-shrink:0;width:auto;min-width:72px;">
                <option value="kg">kg</option>
                <option value="lb">lb</option>
            </select>
        </div>
    </div>

    <!-- PREPARACIÓN (cantidad + volumen) -->
    <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:10px;
                text-transform:uppercase;letter-spacing:0.05em;">Preparación de la solución</div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
        <div>
            <label style="display:block;font-size:12px;color:var(--text-tertiary);margin-bottom:4px;">
                Cantidad</label>
            <div style="display:flex;gap:6px;">
                <input type="number" id="ivAmount" class="form-input" min="0" step="any"
                       placeholder="ej. 4" oninput="updateIVCalc()" style="margin-bottom:0;flex:1;min-width:0;">
                <select id="ivAmountUnit" class="form-input" onchange="updateIVCalc()" style="flex-shrink:0;width:auto;min-width:72px;">
                    <option value="mg">mg</option>
                </select>
            </div>
        </div>
        <div>
            <label style="display:block;font-size:12px;color:var(--text-tertiary);margin-bottom:4px;">
                Volumen</label>
            <div style="display:flex;align-items:center;gap:6px;">
                <input type="number" id="ivVolume" class="form-input" min="1" max="2000"
                       placeholder="ej. 250" oninput="updateIVCalc()" style="margin-bottom:0;flex:1;min-width:0;">
                <span style="font-size:13px;color:var(--text-secondary);white-space:nowrap;">ml</span>
            </div>
        </div>
    </div>

    <!-- DOSIS -->
    <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:10px;
                text-transform:uppercase;letter-spacing:0.05em;">Dosis prescrita</div>

    <div style="display:grid;grid-template-columns:1fr auto;align-items:end;gap:8px;margin-bottom:4px;">
        <div>
            <input type="number" id="ivDose" class="form-input" min="0" step="any"
                   placeholder="0" oninput="updateIVCalc()" style="margin-bottom:0;font-size:22px;
                   font-weight:700;text-align:center;padding:14px;">
        </div>
        <div>
            <select id="ivDoseUnit" class="form-input" onchange="updateIVCalc()" style="height:54px;">
                <option value="µg/kg/min">µg/kg/min</option>
                <option value="µg/kg/hr">µg/kg/hr</option>
                <option value="µg/min">µg/min</option>
                <option value="µg/hr">µg/hr</option>
                <option value="mg/kg/hr">mg/kg/hr</option>
                <option value="mg/kg/min">mg/kg/min</option>
                <option value="mg/hr">mg/hr</option>
                <option value="mg/min">mg/min</option>
                <option value="g/hr">g/hr</option>
                <option value="UI/hr">UI/hr</option>
                <option value="UI/min">UI/min</option>
                <option value="mEq/hr">mEq/hr</option>
            </select>
        </div>
    </div>
    <div id="ivDoseRange" style="font-size:11px;color:var(--text-tertiary);margin-bottom:16px;
                                  min-height:16px;"></div>

    <!-- RESULTADO (live) -->
    <div id="ivResult">
        <div style="text-align:center;padding:30px;color:var(--text-tertiary);font-size:13px;">
            Selecciona un fármaco e introduce los parámetros para calcular
        </div>
    </div>
</div>`;
}
