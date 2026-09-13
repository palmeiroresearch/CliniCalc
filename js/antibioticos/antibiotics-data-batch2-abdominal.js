// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// Lote 2 — Abdominal / Obstétrico (6)
// Fuentes: AASLD · EASL · ACOG · IDSA · Sanford Guide 2024
// ============================================

const ANTIBIOTIC_DATA_BATCH2_ABDOMINAL = [

{
  id: 'peritonitis-bacteriana-espontanea',
  name: 'Peritonitis Bacteriana Espontánea (PBE)',
  aliases: ['pbe', 'peritonitis espontanea', 'ascitis infectada', 'liquido ascitico infectado', 'spontaneous bacterial peritonitis', 'cirrosis ascitis fiebre'],
  category: 'Abdominal',
  icon: '💧',
  subtypes: [
    {
      id: 'pbe-diagnostica',
      name: 'Episodio agudo (PMN ≥250 cél/mm³ en líquido ascítico)',
      context: 'Paciente cirrótico con ascitis, PMN ≥250/mm³ en paracentesis diagnóstica, sin foco quirúrgico intraabdominal evidente.',
      treatment: {
        firstLine: [
          { drug: 'Cefotaxima', dose: '2 g c/8h', route: 'IV', duration: '5 días' },
          { drug: 'Ceftriaxona', dose: '1-2 g/día', route: 'IV', duration: '5 días' }
        ],
        secondLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '1 g/200 mg c/8h', route: 'IV', duration: '5-7 días', note: 'PBE no nosocomial, no grave' },
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/8h', route: 'IV', duration: '7 días', note: 'PBE nosocomial o riesgo de multirresistencia' }
        ],
        allergyAlternatives: [
          { drug: 'Ciprofloxacino', allergyTo: 'β-lactámicos', dose: '400 mg c/12h IV → 500 mg c/12h VO', route: 'IV/VO', duration: '5-7 días', note: 'Solo si no ha recibido profilaxis previa con quinolonas y baja tasa local de resistencia' }
        ],
        notes: 'Administrar Albúmina IV 1,5 g/kg el día 1 y 1 g/kg el día 3 si creatinina ≥1 mg/dL, BUN ≥30 mg/dL o bilirrubina ≥4 mg/dL (previene síndrome hepatorrenal). Repetir paracentesis a las 48h si mala respuesta clínica para descartar peritonitis secundaria o fracaso terapéutico.',
        source: 'AASLD 2021 · EASL Guidelines 2018'
      }
    },
    {
      id: 'pbe-profilaxis',
      name: 'Profilaxis (secundaria indefinida o 1ria en hemorragia digestiva)',
      context: 'Antecedente de PBE (profilaxis secundaria indefinida) o cirrótico con hemorragia digestiva alta (profilaxis primaria transitoria).',
      treatment: {
        firstLine: [
          { drug: 'Norfloxacino', dose: '400 mg/día', route: 'VO', duration: 'Indefinido (profilaxis secundaria)' },
          { drug: 'Ceftriaxona', dose: '1 g/día', route: 'IV', duration: '7 días', note: 'Profilaxis primaria durante hemorragia digestiva alta cirrótica' }
        ],
        secondLine: [
          { drug: 'Trimetoprim-Sulfametoxazol', dose: '800/160 mg/día', route: 'VO', duration: 'Indefinido' }
        ],
        notes: 'Suspender profilaxis secundaria si resolución sostenida de la ascitis o trasplante hepático.',
        source: 'AASLD 2021'
      }
    }
  ]
},

{
  id: 'diverticulitis-aguda',
  name: 'Diverticulitis Aguda',
  aliases: ['diverticulitis', 'diverticulo inflamado', 'sigmoiditis', 'enfermedad diverticular'],
  category: 'Abdominal',
  icon: '🫘',
  subtypes: [
    {
      id: 'diverticulitis-no-complicada',
      name: 'No complicada — Ambulatoria',
      context: 'Sin absceso, perforación ni peritonitis. Tolera vía oral, sin comorbilidad relevante.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '4-7 días' }
        ],
        secondLine: [
          { drug: 'Ciprofloxacino + Metronidazol', dose: '500 mg c/12h + 500 mg c/8h', route: 'VO', duration: '4-7 días' }
        ],
        allergyAlternatives: [
          { drug: 'Ciprofloxacino + Metronidazol', allergyTo: 'β-lactámicos', dose: '500 mg c/12h + 500 mg c/8h', route: 'VO', duration: '4-7 días' }
        ],
        notes: 'En casos muy seleccionados sin comorbilidad ni signos sistémicos, guías recientes (AGA 2021) permiten manejo sin antibiótico con seguimiento estrecho — valorar individualmente.',
        source: 'AGA 2021 · IDSA/SIS 2010'
      }
    },
    {
      id: 'diverticulitis-complicada',
      name: 'Complicada — Absceso / Perforación',
      context: 'Absceso pericólico, perforación libre o peritonitis generalizada. Requiere hospitalización.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6-8h', route: 'IV', duration: '4-7 días tras control del foco' },
          { drug: 'Ceftriaxona + Metronidazol', dose: '2 g/día + 500 mg c/8h', route: 'IV', duration: '4-7 días tras control del foco' }
        ],
        secondLine: [
          { drug: 'Meropenem', dose: '1 g c/8h', route: 'IV', duration: '4-7 días', note: 'Sepsis grave, exposición antibiótica reciente o riesgo de multirresistencia' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Metronidazol', allergyTo: 'β-lactámicos (alergia severa)', dose: '2 g c/8h + 500 mg c/8h', route: 'IV', duration: '4-7 días' }
        ],
        notes: 'Absceso ≥4 cm → drenaje percutáneo guiado por imagen. Perforación libre/peritonitis difusa → cirugía urgente. Duración de antibiótico contada desde el control adecuado del foco, no desde el inicio.',
        source: 'IDSA/SIS 2010 · WSES 2020'
      }
    }
  ]
},

{
  id: 'corioamnionitis',
  name: 'Corioamnionitis',
  aliases: ['infeccion intraamniotica', 'fiebre intraparto', 'corioamnionitis clinica'],
  category: 'Obstétrico',
  icon: '🤰',
  subtypes: [
    {
      id: 'corioamnionitis-anteparto',
      name: 'Diagnóstico anteparto / intraparto',
      context: 'Fiebre materna intraparto + taquicardia fetal/materna, leucorrea purulenta o sensibilidad uterina, sin trabajo de parto activo confirmado aún.',
      treatment: {
        firstLine: [
          { drug: 'Ampicilina + Gentamicina', dose: '2 g c/6h IV + 5 mg/kg/día IV', route: 'IV', duration: 'Hasta el parto + 24-48h postparto afebril' }
        ],
        secondLine: [
          { drug: 'Cefoxitina', dose: '2 g c/6h', route: 'IV', duration: 'Hasta el parto + 24-48h postparto', note: 'Monoterapia alternativa' },
          { drug: 'Ampicilina-Sulbactam', dose: '3 g c/6h', route: 'IV', duration: 'Hasta el parto + 24-48h postparto' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina + Gentamicina', allergyTo: 'penicilinas', dose: '900 mg c/8h + 5 mg/kg/día', route: 'IV', duration: 'Hasta el parto + 24-48h postparto' }
        ],
        notes: 'No retrasar el parto para completar antibioterapia. La vía del parto es obstétrica, no depende del tratamiento antibiótico.',
        source: 'ACOG Committee Opinion 712 (2023)'
      }
    },
    {
      id: 'corioamnionitis-cesarea',
      name: 'Parto por cesárea',
      context: 'Corioamnionitis con resolución de la gestación mediante cesárea.',
      treatment: {
        firstLine: [
          { drug: 'Añadir Clindamicina o Metronidazol', dose: '900 mg c/8h o 500 mg c/8h', route: 'IV', duration: '1 dosis adicional postparto', note: 'Sumar al esquema Ampicilina + Gentamicina para cobertura anaerobia de la histerotomía' }
        ],
        notes: 'La dosis única postparto adicional reduce el riesgo de endometritis e infección de la herida quirúrgica.',
        source: 'ACOG Committee Opinion 712 (2023)'
      }
    }
  ]
},

{
  id: 'endometritis-postparto',
  name: 'Endometritis Postparto',
  aliases: ['endometritis puerperal', 'infeccion puerperal', 'fiebre puerperal'],
  category: 'Obstétrico',
  icon: '🤰',
  subtypes: [
    {
      id: 'endometritis-vaginal',
      name: 'Post-parto vaginal',
      context: 'Fiebre puerperal, útero subinvolucionado y doloroso, loquios fétidos tras parto vaginal.',
      treatment: {
        firstLine: [
          { drug: 'Ampicilina-Sulbactam', dose: '3 g c/6h', route: 'IV', duration: 'Hasta 24-48h afebril' }
        ],
        secondLine: [
          { drug: 'Clindamicina + Gentamicina', dose: '900 mg c/8h + 5 mg/kg/día', route: 'IV', duration: 'Hasta 24-48h afebril' }
        ],
        notes: 'No suele requerirse continuar antibiótico oral tras el alta si la evolución IV fue favorable.',
        source: 'ACOG · IDSA 2023'
      }
    },
    {
      id: 'endometritis-cesarea',
      name: 'Post-cesárea',
      context: 'Endometritis tras cesárea — mayor riesgo, requiere cobertura anaerobia obligada.',
      treatment: {
        firstLine: [
          { drug: 'Clindamicina + Gentamicina', dose: '900 mg c/8h + 5 mg/kg/día', route: 'IV', duration: 'Hasta 24-48h afebril' }
        ],
        secondLine: [
          { drug: 'Añadir Ampicilina', dose: '2 g c/6h', route: 'IV', duration: 'Si no hay respuesta a las 48-72h', note: 'Cobertura de Enterococcus' }
        ],
        notes: 'Esquema Clindamicina + Gentamicina es el estándar de referencia (mayor evidencia) para endometritis post-cesárea.',
        source: 'ACOG · IDSA 2023'
      }
    }
  ]
},

{
  id: 'aborto-septico',
  name: 'Aborto Séptico',
  aliases: ['aborto infectado', 'aborto complicado infeccion', 'sepsis obstetrica'],
  category: 'Obstétrico',
  icon: '🤰',
  subtypes: [
    {
      id: 'aborto-septico-sin-shock',
      name: 'Sin shock séptico',
      context: 'Fiebre, sensibilidad uterina y/o restos ovulares infectados tras aborto espontáneo o provocado, hemodinámicamente estable.',
      treatment: {
        firstLine: [
          { drug: 'Clindamicina + Gentamicina', dose: '900 mg c/8h + 5 mg/kg/día', route: 'IV', duration: 'Hasta 24-48h afebril' }
        ],
        secondLine: [
          { drug: 'Ampicilina-Sulbactam', dose: '3 g c/6h', route: 'IV', duration: 'Hasta 24-48h afebril' }
        ],
        notes: 'Evacuación uterina (legrado/AMEU) urgente además del antibiótico — el foco no se controla solo con fármacos.',
        source: 'ACOG · OMS 2015'
      }
    },
    {
      id: 'aborto-septico-con-shock',
      name: 'Con shock séptico',
      context: 'Aborto séptico con inestabilidad hemodinámica, sospecha de perforación uterina o mionecrosis por Clostridium.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam + Gentamicina', dose: '4,5 g c/6h + 5 mg/kg/día', route: 'IV', duration: 'Individualizar según respuesta' },
          { drug: 'Clindamicina + Gentamicina + Ampicilina (triple)', dose: '900 mg c/8h + 5 mg/kg/día + 2 g c/6h', route: 'IV', duration: 'Individualizar según respuesta' }
        ],
        notes: 'Evacuación uterina/quirúrgica emergente + reanimación por sepsis (paquete de la primera hora). Considerar histerectomía si mionecrosis o foco no controlable.',
        source: 'ACOG · Surviving Sepsis Campaign 2021'
      }
    }
  ]
},

{
  id: 'absceso-perianal',
  name: 'Absceso Perianal / Perirrectal',
  aliases: ['absceso anal', 'absceso perirrectal', 'fistula perianal infectada'],
  category: 'Abdominal',
  icon: '🩹',
  subtypes: [
    {
      id: 'absceso-perianal-simple',
      name: 'Simple (tras drenaje quirúrgico)',
      context: 'Absceso perianal drenado quirúrgicamente, paciente inmunocompetente, sin celulitis extensa.',
      treatment: {
        firstLine: [
          { drug: 'Ninguno de rutina', dose: '—', route: '—', duration: '—', note: 'El drenaje quirúrgico es el tratamiento definitivo; antibiótico no reduce recurrencia en abscesos simples drenados' }
        ],
        secondLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '5-7 días', note: 'Si celulitis perilesional significativa, signos sistémicos o diabetes' }
        ],
        allergyAlternatives: [
          { drug: 'Ciprofloxacino + Metronidazol', allergyTo: 'β-lactámicos', dose: '500 mg c/12h + 500 mg c/8h', route: 'VO', duration: '5-7 días' }
        ],
        notes: 'Descartar enfermedad de Crohn si absceso recurrente, múltiple o con fístulas complejas.',
        source: 'ASCRS Clinical Practice Guidelines 2016'
      }
    },
    {
      id: 'absceso-perianal-complicado',
      name: 'Complicado (inmunosupresión, Crohn, diabetes, celulitis extensa)',
      context: 'Absceso perianal en paciente inmunocomprometido, con enfermedad de Crohn, diabetes mal controlada o extensión sistémica.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6-8h', route: 'IV', duration: '7-10 días' }
        ],
        secondLine: [
          { drug: 'Ceftriaxona + Metronidazol', dose: '2 g/día + 500 mg c/8h', route: 'IV', duration: '7-10 días' }
        ],
        notes: 'Vigilar signos de fascitis necrotizante perineal (gangrena de Fournier) — emergencia quirúrgica con desbridamiento amplio inmediato.',
        source: 'ASCRS Clinical Practice Guidelines 2016'
      }
    }
  ]
}

];
