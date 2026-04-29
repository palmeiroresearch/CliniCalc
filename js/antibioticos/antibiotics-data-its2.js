// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// ITS Adicionales + VIH Oportunistas (4)
// Fuentes: CDC STI 2021 · DHHS OI Guidelines 2024 · WHO · IDSA · Sanford Guide 2024
// ============================================

const ANTIBIOTIC_DATA_ITS2 = [

{
  id: 'tricomoniasis',
  name: 'Tricomoniasis',
  aliases: ['tricomoniasis', 'trichomonas', 'trichomonas vaginalis', 'protozoo vaginal', 'its protozoo', 'flujo vaginal maloliente', 'vulvovaginitis'],
  category: 'ITS',
  icon: '🦠',
  subtypes: [
    {
      id: 'tricomoniasis-adulto',
      name: 'Adulto No Embarazada',
      context: 'ITS más prevalente a nivel mundial. Flujo vaginal espumoso amarillo-verdoso + prurito + eritema vulvar. Puede ser asintomática (50-70%). Diagnóstico: microscopía en fresco, NAAT o test rápido Ag.',
      treatment: {
        firstLine: [
          { drug: 'Metronidazol', dose: '2g', route: 'VO dosis única', duration: 'Dosis única', note: 'Primera elección. Tratar siempre a la pareja sexual simultáneamente. Evitar alcohol 24h.' },
          { drug: 'Tinidazol', dose: '2g', route: 'VO dosis única', duration: 'Dosis única', note: 'Igual de eficaz que metronidazol. Mejor tolerancia GI. Menos prescrito por disponibilidad.' }
        ],
        secondLine: [
          { drug: 'Metronidazol', dose: '500 mg c/12h', route: 'VO', duration: '7 días', note: 'Si fracaso de dosis única o recurrencia. Mayor tasa de erradicación en hombres con esta pauta.' },
          { drug: 'Tinidazol', dose: '2g/día', route: 'VO', duration: '7 días', note: 'Si fracaso de dosis única — mejor penetración tisular que metronidazol en recurrencias' }
        ],
        allergyAlternatives: [
          { drug: 'Secnidazol', allergyTo: 'Metronidazol / Tinidazol (intolerancia)', dose: '2g', route: 'VO dosis única', duration: 'Dosis única', note: 'Disponible en algunos países. Mismo mecanismo — nitroimidazol de vida media larga.' }
        ],
        notes: 'Tratar SIEMPRE a ambas parejas sexuales. Abstinencia sexual hasta que ambos estén asintomáticos (7 días post-dosis única o hasta fin de pauta). Cribado de otras ITS concomitantes (VIH, gonorrea, clamidia). Recurrencia frecuente — considerar resistencia si falla segunda pauta.',
        source: 'CDC STI Guidelines 2021 · WHO 2016 · IUSTI 2021 · Sanford Guide 2024'
      }
    },
    {
      id: 'tricomoniasis-embarazo',
      name: 'Embarazo',
      context: 'Asociada a parto prematuro, rotura prematura de membranas y bajo peso al nacer. Tratar siempre. Segura en todos los trimestres.',
      treatment: {
        firstLine: [
          { drug: 'Metronidazol', dose: '2g', route: 'VO dosis única', duration: 'Dosis única', note: 'Seguro en todos los trimestres (categoría B). Antes se evitaba en 1er trimestre — evidencia actual no avala esa restricción (CDC 2021).' }
        ],
        secondLine: [
          { drug: 'Metronidazol', dose: '500 mg c/12h', route: 'VO', duration: '7 días', note: 'Si fracaso de dosis única' }
        ],
        allergyAlternatives: [
          { drug: 'Secnidazol', allergyTo: 'Metronidazol', dose: '2g', route: 'VO dosis única', duration: 'Dosis única' }
        ],
        notes: 'Tinidazol NO recomendado en embarazo (datos insuficientes de seguridad). La lactancia materna es posible — suspender 12-24h tras la dosis única de metronidazol si preocupa. Tratar a la pareja.',
        source: 'CDC STI Guidelines 2021 · ACOG · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'eip-pid',
  name: 'Enfermedad Inflamatoria Pélvica (EIP / PID)',
  aliases: ['eip', 'pid', 'enfermedad inflamatoria pelvica', 'salpingitis', 'endometritis', 'anexitis', 'dolor pelvico fiebre mujer', 'infeccion pelvica', 'dolor adnexal'],
  category: 'ITS',
  icon: '🦠',
  subtypes: [
    {
      id: 'eip-leve-ambulatoria',
      name: 'Leve-Moderada — Ambulatoria',
      context: 'Dolor pélvico bilateral + dolor a la movilización cervical + fiebre ≤38.5°C + flujo vaginal purulento. Sin criterios de hospitalización. N. gonorrhoeae, C. trachomatis, anaerobios y flora vaginal.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona + Doxiciclina + Metronidazol', dose: 'Ceftriaxona 500 mg IM dosis única + Doxiciclina 100 mg c/12h VO + Metronidazol 500 mg c/12h VO', route: 'IM + VO', duration: '14 días (doxiciclina + metronidazol)', note: 'Pauta de referencia CDC 2021. Cubre gonorrea, clamidia y anaerobios.' },
          { drug: 'Cefoxitina + Doxiciclina', dose: 'Cefoxitina 2g IM dosis única + Probenecid 1g VO + Doxiciclina 100 mg c/12h VO', route: 'IM + VO', duration: '14 días (doxiciclina)', note: 'Alternativa si no hay ceftriaxona disponible' }
        ],
        secondLine: [
          { drug: 'Levofloxacino + Metronidazol', dose: 'Levofloxacino 500 mg/día + Metronidazol 500 mg c/12h', route: 'VO', duration: '14 días', note: 'Solo si descartada gonorrea resistente a fluoroquinolonas (resistencia >5% en muchas regiones — usar con precaución)' }
        ],
        allergyAlternatives: [
          { drug: 'Azitromicina + Metronidazol', allergyTo: 'Doxiciclina + cefalosporinas (embarazo o intolerancia)', dose: 'Azitromicina 1g VO/sem × 2 sem + Metronidazol 500 mg c/12h × 14 días', route: 'VO', duration: '14 días', note: 'Evidencia limitada — solo si no hay alternativa' }
        ],
        notes: 'Revisión en 72h obligatoria para confirmar mejoría. Ausencia de mejora = hospitalizar. Tratar siempre a la pareja sexual de los últimos 60 días. Descartar DIU como foco (no siempre retirar — valorar individualmente). Cribado VIH y otras ITS.',
        source: 'CDC STI Guidelines 2021 · IUSTI 2020 · Sanford Guide 2024'
      }
    },
    {
      id: 'eip-grave-hospitalaria',
      name: 'Grave — Hospitalaria (fiebre >38.5°C, absceso, peritonitis, fracaso ambulatorio)',
      context: 'Criterios de hospitalización: fiebre alta, absceso tubo-ovárico, náuseas/vómitos que impiden VO, fracaso del tratamiento ambulatorio, embarazo, incapacidad de descartar urgencia quirúrgica.',
      treatment: {
        firstLine: [
          { drug: 'Cefoxitina + Doxiciclina', dose: 'Cefoxitina 2g c/6h IV + Doxiciclina 100 mg c/12h IV/VO', route: 'IV', duration: 'Hasta 24h afebril y mejoría clínica → completar 14 días VO', note: 'Estándar de referencia. Cambio a doxiciclina VO al mejorar — misma eficacia que IV.' },
          { drug: 'Clindamicina + Gentamicina', dose: 'Clindamicina 900 mg c/8h IV + Gentamicina 5-7 mg/kg/día IV', route: 'IV', duration: 'Hasta 24h afebril → Doxiciclina 100mg c/12h VO 14 días', note: 'Alternativa con excelente cobertura anaerobios + Gram-negativos' }
        ],
        secondLine: [
          { drug: 'Ampicilina-Sulbactam + Doxiciclina', dose: 'AmpSulbactam 3g c/6h IV + Doxiciclina 100 mg c/12h', route: 'IV', duration: '14 días total', note: 'Si polimicrobiana o no mejoría con pauta estándar' }
        ],
        allergyAlternatives: [
          { drug: 'Levofloxacino + Metronidazol', allergyTo: 'β-lactámicos + clindamicina', dose: 'Levofloxacino 500 mg/día IV + Metronidazol 500 mg c/8h IV', route: 'IV', duration: '14 días', note: 'Solo si resistencia a fluoroquinolonas descartada' }
        ],
        notes: 'Si absceso tubo-ovárico → ver entrada específica. La mejoría clínica debe ocurrir en 72h — si no, revisar diagnóstico y considerar drenaje. Alta con doxiciclina VO para completar 14 días.',
        source: 'CDC STI Guidelines 2021 · IUSTI 2020 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'absceso-tubo-ovarico',
  name: 'Absceso Tubo-Ovárico (ATO)',
  aliases: ['absceso tubo-ovarico', 'ato', 'absceso ovarico', 'absceso pelvico femenino', 'absceso anexial', 'piosalpinx', 'tubo ovarico'],
  category: 'ITS',
  icon: '🦠',
  subtypes: [
    {
      id: 'ato-medico',
      name: 'Médico — Sin Rotura (ATO íntegro)',
      context: 'Complicación grave de EIP. Masa anexial con fiebre alta + leucocitosis + dolor pélvico intenso. Diagnóstico por ECO o TC. La mayoría responden al tratamiento médico sin cirugía.',
      treatment: {
        firstLine: [
          { drug: 'Clindamicina + Gentamicina', dose: 'Clindamicina 900 mg c/8h IV + Gentamicina 5-7 mg/kg/día IV', route: 'IV', duration: '14-21 días total (IV hasta 48-72h afebril → VO Clindamicina 450mg c/8h)', note: 'Primera elección. Mejor cobertura anaerobios que cefalosporinas + doxiciclina.' },
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: '14-21 días', note: 'Alternativa con amplia cobertura polimicrobiana. Añadir Doxiciclina 100mg c/12h para cobertura de Chlamydia.' }
        ],
        secondLine: [
          { drug: 'Ampicilina + Gentamicina + Metronidazol', dose: 'Ampicilina 2g c/4h IV + Gentamicina 5mg/kg/d + Metronidazol 500mg c/8h IV', route: 'IV', duration: '14-21 días', note: 'Triple terapia clásica con triple cobertura' }
        ],
        allergyAlternatives: [
          { drug: 'Meropenem + Doxiciclina', allergyTo: 'Penicilinas y clindamicina', dose: 'Meropenem 1g c/8h + Doxiciclina 100mg c/12h IV', route: 'IV', duration: '14-21 días' }
        ],
        notes: 'Evaluación clínica cada 48-72h. Si no mejoría en 72h → drenaje (percutáneo guiado por imagen o quirúrgico). TC para confirmar integridad del absceso antes de alta. Completar 14-21 días totales de antibiótico incluso si se drena.',
        source: 'CDC STI Guidelines 2021 · ACOG · IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'ato-roto',
      name: 'Roto / Peritonitis Pélvica — Urgencia Quirúrgica',
      context: 'Rotura del ATO con peritonitis generalizada. Dolor súbito intenso + sepsis + abdomen en tabla. Mortalidad significativa sin intervención urgente.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: '14-21 días post-cirugía', note: 'CIRUGÍA URGENTE (lavado peritoneal + salpingo-ooforectomía). Antibiótico preoperatorio y postoperatorio.' },
          { drug: 'Clindamicina + Gentamicina + Ampicilina', dose: 'Clinda 900mg c/8h + Genta 5mg/kg/d + Ampicilina 2g c/4h IV', route: 'IV', duration: '14-21 días post-cirugía', note: 'Triple terapia si PipTazo no disponible' }
        ],
        secondLine: [
          { drug: 'Meropenem', dose: '1g c/8h', route: 'IV', duration: '14-21 días', note: 'Si sepsis grave, MDR o fracaso previo' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Metronidazol + Vancomicina', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Aztreonam 2g c/8h + Metro 500mg c/8h + Vanco 15mg/kg c/12h', route: 'IV', duration: '14-21 días' }
        ],
        notes: '🔴 CIRUGÍA URGENTE. El drenaje percutáneo no es suficiente si hay rotura con peritonitis generalizada. UCI si shock séptico. Hemocultivos antes de antibióticos. El pronóstico empeora significativamente con el retraso quirúrgico.',
        source: 'CDC · ACOG · IDSA · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'vih-infecciones-oportunistas',
  name: 'VIH — Infecciones Oportunistas',
  aliases: ['vih', 'hiv', 'sida', 'aids', 'infecciones oportunistas', 'cd4', 'inmunodeficiencia', 'toxoplasmosis', 'pcp', 'pneumocystis', 'criptococo', 'cmv', 'mac', 'mycobacterium avium', 'candida esofagica', 'oportunista vih'],
  category: 'Inmunocomprometido',
  icon: '🧬',
  subtypes: [
    {
      id: 'vih-toxoplasmosis',
      name: 'Toxoplasmosis Cerebral (CD4 <100/µL)',
      context: 'Cefalea + fiebre + focalidad neurológica + convulsiones en paciente VIH con CD4 <100. RMN: lesiones en anillo múltiples. Diagnóstico presuntivo si Ag Toxoplasma+ y respuesta al tratamiento en 10-14d.',
      treatment: {
        firstLine: [
          { drug: 'Pirimetamina + Sulfadiazina + Ácido folínico', dose: 'Pirimetamina: 200 mg carga VO → 75 mg/día · Sulfadiazina: 1-1.5 g c/6h VO · Ácido folínico: 10-25 mg/día', route: 'VO', duration: '6 semanas (inducción) → mantenimiento hasta CD4 >200 ×6m con TAR', note: 'AÑADIR ácido folínico siempre (previene mielosupresión de la pirimetamina)' }
        ],
        secondLine: [
          { drug: 'Pirimetamina + Clindamicina + Ácido folínico', dose: 'Pirimetamina: 200 mg carga → 75 mg/día · Clindamicina: 600 mg c/6h IV/VO · Ácido folínico: 10-25 mg/día', route: 'IV/VO', duration: '6 semanas → mantenimiento', note: 'Si alergia o intolerancia a sulfadiazina' },
          { drug: 'TMP/SMX', dose: '5 mg/kg (de TMP) c/12h', route: 'IV/VO', duration: '6 semanas', note: 'Alternativa si no hay pirimetamina. Inferior en eficacia pero mejor tolerada.' }
        ],
        allergyAlternatives: [
          { drug: 'Atovaquona + Pirimetamina o Sulfadiazina', allergyTo: 'Sulfadiazina + clindamicina', dose: 'Atovaquona: 1500 mg c/12h VO (con comida grasa)', route: 'VO', duration: '6 semanas', note: 'Datos limitados — solo si no hay alternativa' }
        ],
        notes: 'Iniciar TAR en 2-4 semanas (no inmediatamente — riesgo SIRI). Dexametasona 4-8 mg c/6h si efecto de masa o edema cerebral. Si no hay mejoría en 10-14d → biopsia cerebral (descartar linfoma primario SNC). Profilaxis secundaria: TMP/SMX 1DS/día hasta CD4 >200 ×6m.',
        source: 'DHHS OI Guidelines 2024 · WHO 2021 · IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'vih-pcp',
      name: 'Pneumocystis jirovecii (PCP) (CD4 <200/µL)',
      context: 'Disnea progresiva + tos seca + fiebre subaguda en semanas. Rx tórax: infiltrados intersticiales bilaterales. LDH elevada. SatO2 puede ser normal en reposo pero cae con el ejercicio (prueba del pasillo).',
      treatment: {
        firstLine: [
          { drug: 'TMP/SMX', dose: '15-20 mg/kg/día (parte TMP) en 3-4 dosis', route: 'IV (grave) o VO (leve)', duration: '21 días', note: 'Primera línea universal. IV si PaO2 <70 mmHg o gradiente A-a >35. VO si leve-moderada.' }
        ],
        secondLine: [
          { drug: 'Pentamidina isetionato', dose: '4 mg/kg/día IV', route: 'IV', duration: '21 días', note: 'Si alergia o fracaso a TMP/SMX. Hipoglucemia, hipotensión, nefrotoxicidad — monitorizar.' },
          { drug: 'Atovaquona', dose: '750 mg c/12h con comida grasa', route: 'VO', duration: '21 días', note: 'Solo formas LEVES. No usar si PaO2 <60 mmHg.' },
          { drug: 'Primaquina + Clindamicina', dose: 'Primaquina 30 mg/día + Clindamicina 600-900 mg c/6-8h IV', route: 'IV/VO', duration: '21 días', note: 'Alternativa razonable si alergia a sulfonamidas. Descartar déficit G6PD antes de primaquina.' }
        ],
        allergyAlternatives: [
          { drug: 'Atovaquona', allergyTo: 'TMP/SMX + pentamidina (formas leves)', dose: '750 mg c/12h', route: 'VO', duration: '21 días' }
        ],
        notes: 'CORTICOIDES si PaO2 <70 mmHg o gradiente A-a >35: Prednisona 40 mg c/12h × 5d → 40 mg/d × 5d → 20 mg/d × 11d (iniciar dentro de las primeras 72h). Iniciar TAR a las 2-4 semanas (no antes — riesgo SIRI, especialmente en PCP grave). Profilaxis: TMP/SMX 1DS/día cuando CD4 <200.',
        source: 'DHHS OI Guidelines 2024 · IDSA · WHO · Sanford Guide 2024'
      }
    },
    {
      id: 'vih-criptococosis',
      name: 'Criptococosis Meníngea (CD4 <100/µL)',
      context: 'Meningitis subaguda (semanas) con cefalea + fiebre ± signos meníngeos. LCR: pleocitosis mínima, glucosa baja, tinta china+ (50-80%), Ag Cryptococcus+. La presión de apertura elevada es clave.',
      treatment: {
        firstLine: [
          { drug: 'Anfotericina B liposomal + Flucitosina', dose: 'AnfB liposomal 3-4 mg/kg/día IV + Flucitosina 25 mg/kg c/6h VO', route: 'IV + VO', duration: '2 semanas inducción', note: 'Pauta estándar de referencia. Flucitosina mejora significativamente la erradicación fúngica.' }
        ],
        secondLine: [
          { drug: 'Anfotericina B desoxicolato + Flucitosina', dose: 'AnfB 0.7-1 mg/kg/día IV + Flucitosina 25 mg/kg c/6h VO', route: 'IV', duration: '2 semanas', note: 'Si no hay formulación liposomal. Mayor nefrotoxicidad — hidratación intensiva.' },
          { drug: 'Fluconazol + Flucitosina', dose: 'Fluconazol 1200 mg/día + Flucitosina 25 mg/kg c/6h', route: 'VO', duration: '2 semanas', note: 'Solo si AnfB no disponible. Inferior en fungicida.' }
        ],
        allergyAlternatives: [
          { drug: 'Anfotericina B liposomal monoterapia', allergyTo: 'Flucitosina (leucopenia severa, ERC avanzada)', dose: '3-4 mg/kg/día IV', route: 'IV', duration: '4 semanas', note: 'Extender inducción a 4 sem si no hay flucitosina' }
        ],
        notes: '⚠️ PRESIÓN INTRACRANEAL: PL terapéutica DIARIA hasta normalización de presión (<20 cmH2O). NO corticoides (aumentan mortalidad). Consolidación: Fluconazol 400 mg/día × 8 semanas. Mantenimiento: Fluconazol 200 mg/día hasta CD4 >200 ×6m con TAR. Iniciar TAR a las 4-6 semanas (no antes).',
        source: 'DHHS OI Guidelines 2024 · WHO 2022 · IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'vih-cmv',
      name: 'CMV — Retinitis (CD4 <50/µL)',
      context: 'Disminución de visión unilateral + miodesopsias + escotomas. Fondo de ojo: exudados blanquecinos con hemorragias perivasculares ("queso con tomate"). También: colitis, esofagitis, encefalitis.',
      treatment: {
        firstLine: [
          { drug: 'Valganciclovir', dose: '900 mg c/12h', route: 'VO', duration: '14-21 días (inducción) → 900 mg/día mantenimiento', note: 'Primera línea en retinitis no amenazante para la visión. Misma biodisponibilidad que ganciclovir IV.' },
          { drug: 'Ganciclovir', dose: '5 mg/kg c/12h', route: 'IV', duration: '14-21 días → valganciclovir 900mg/d VO mantenimiento', note: 'Si lesión amenazante para la visión (zona I, cerca de fóvea/nervio óptico) o incapacidad de VO.' }
        ],
        secondLine: [
          { drug: 'Foscarnet', dose: '60 mg/kg c/8h o 90 mg/kg c/12h IV', route: 'IV', duration: '14-21 días → mantenimiento 90-120 mg/kg/día', note: 'Si resistencia a ganciclovir (UL97 mutación) o mielotoxicidad grave. Nefrotóxico — hidratación 1L SF antes de cada dosis.' },
          { drug: 'Cidofovir', dose: '5 mg/kg IV semanal × 2 → quincenal', route: 'IV', duration: 'Individualizado', note: 'Tercera línea. Alta nefrotoxicidad — siempre con probenecid e hidratación intensa.' }
        ],
        allergyAlternatives: [
          { drug: 'Foscarnet', allergyTo: 'Ganciclovir (neutropenia severa)', dose: '90 mg/kg c/12h IV', route: 'IV', duration: '14-21 días' }
        ],
        notes: 'Interconsulta urgente a Oftalmología. Implante intravítreo de ganciclovir si lesión amenazante para la visión. Iniciar TAR en 2 semanas. Retirar mantenimiento cuando CD4 >100/µL × 3-6 meses con TAR y sin actividad CMV. CMV colitis: valganciclovir VO si tolera, ganciclovir IV si grave.',
        source: 'DHHS OI Guidelines 2024 · IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'vih-mac',
      name: 'MAC — Mycobacterium avium Complex (CD4 <50/µL)',
      context: 'Fiebre prolongada + sudoración nocturna + pérdida de peso + diarrea + hepatoesplenomegalia + adenopatías. Hemocultivos en micobacterias (confirmación). LDH y FA elevadas.',
      treatment: {
        firstLine: [
          { drug: 'Azitromicina + Etambutol', dose: 'Azitromicina 500-600 mg/día VO + Etambutol 15 mg/kg/día VO', route: 'VO', duration: 'Mínimo 12 meses (hasta CD4 >100 ×6m con TAR)', note: 'Pauta estándar. Añadir Rifabutina 300 mg/día si enfermedad grave o sin respuesta en 4-8 semanas.' }
        ],
        secondLine: [
          { drug: 'Claritromicina + Etambutol', dose: 'Claritromicina 500 mg c/12h VO + Etambutol 15 mg/kg/día VO', route: 'VO', duration: 'Mínimo 12 meses', note: 'Si intolerancia a azitromicina. Más interacciones con inhibidores de proteasa del TAR.' }
        ],
        allergyAlternatives: [
          { drug: 'Moxifloxacino + Etambutol + Rifabutina', allergyTo: 'Macrólidos', dose: 'Moxi 400mg/d + Etambutol 15mg/kg/d + Rifabutina 300mg/d', route: 'VO', duration: 'Mínimo 12 meses', note: 'Solo si resistencia o alergia confirmada a macrólidos' }
        ],
        notes: 'Inicio del TAR en 2 semanas (no inmediatamente — riesgo SIRI grave con MAC). Profilaxis primaria: Azitromicina 1200 mg/semana si CD4 <50/µL (suspender al alcanzar CD4 >100 × 3m). Antibiograma de sensibilidad en caso de fallo terapéutico.',
        source: 'DHHS OI Guidelines 2024 · WHO · IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'vih-candida-esofagica',
      name: 'Candidiasis Esofágica (CD4 <100/µL)',
      context: 'Disfagia + odinofagia ± muguet oral. Diagnóstico clínico si muguet concomitante + respuesta a fluconazol en 48-72h (sin endoscopia). Endoscopia si no mejora o incierto.',
      treatment: {
        firstLine: [
          { drug: 'Fluconazol', dose: '200 mg carga → 100-200 mg/día', route: 'VO', duration: '14-21 días', note: 'Primera línea. Alta tasa de éxito (>90%). Si tolera VO.' },
          { drug: 'Fluconazol IV', dose: '200-400 mg/día', route: 'IV', duration: '14-21 días', note: 'Si no tolera VO por odinofagia severa — misma eficacia' }
        ],
        secondLine: [
          { drug: 'Itraconazol solución oral', dose: '200 mg/día', route: 'VO', duration: '14-21 días', note: 'Si fracaso a fluconazol (resistencia adquirida por exposiciones repetidas). Tomar en ayunas.' },
          { drug: 'Micafungina', dose: '150 mg/día', route: 'IV', duration: '14-21 días', note: 'Si C. glabrata/C. krusei o fracaso de azoles' },
          { drug: 'Voriconazol', dose: '200 mg c/12h', route: 'VO/IV', duration: '14-21 días', note: 'Si C. krusei (resistente a fluconazol) o fracaso a itraconazol' }
        ],
        allergyAlternatives: [
          { drug: 'Caspofungina o Anidulafungina', allergyTo: 'Azoles (múltiples)', dose: 'Caspo 70mg→50mg/d IV o Anidula 200mg→100mg/d IV', route: 'IV', duration: '14-21 días' }
        ],
        notes: 'El muguet oral asociado tratar con fluconazol 100-200 mg/día (misma pauta o reducir dosis). La resistencia a fluconazol aumenta con exposición repetida — rotar a azol diferente o equinocandina si ≥2 episodios en el año. TAR reduce la incidencia — objetivo CD4 >200.',
        source: 'DHHS OI Guidelines 2024 · ESCMID · Sanford Guide 2024'
      }
    }
  ]
}

]; // fin ANTIBIOTIC_DATA_ITS2
