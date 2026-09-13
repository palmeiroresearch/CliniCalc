// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// Lote 2 — Neurológico / Oftalmológico (5)
// Fuentes: IDSA · AANS/CNS · EVS Study · Sanford Guide 2024
// ============================================

const ANTIBIOTIC_DATA_BATCH2_NEURO = [

{
  id: 'absceso-cerebral',
  name: 'Absceso Cerebral',
  aliases: ['absceso encefalico', 'absceso intracraneal', 'brain abscess'],
  category: 'SNC',
  icon: '🧠',
  subtypes: [
    {
      id: 'absceso-cerebral-otogeno-sinusal',
      name: 'Origen otógeno o sinusal',
      context: 'Foco contiguo: otitis media/mastoiditis crónica o sinusitis (frontal/etmoidal) complicada.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona + Metronidazol', dose: '2 g c/12h + 500 mg c/8h', route: 'IV', duration: '6-8 semanas' }
        ],
        secondLine: [
          { drug: 'Meropenem', dose: '2 g c/8h', route: 'IV', duration: '6-8 semanas', note: 'Alternativa en monoterapia de amplio espectro' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Vancomicina + Metronidazol', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Ver detalle', route: 'IV', duration: '6-8 semanas' }
        ],
        notes: 'Drenaje neuroquirúrgico (aspiración estereotáctica o escisión) casi siempre necesario junto al antibiótico, salvo abscesos <2,5 cm en paciente estable con buena respuesta clínica.',
        source: 'IDSA 2014 · AANS/CNS Guidelines'
      }
    },
    {
      id: 'absceso-cerebral-hematogeno',
      name: 'Origen hematógeno / endocarditis',
      context: 'Diseminación hematógena desde endocarditis, cardiopatía congénita cianótica o foco a distancia desconocido.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Ceftriaxona + Metronidazol', dose: '15-20 mg/kg c/8-12h + 2 g c/12h + 500 mg c/8h', route: 'IV', duration: '6-8 semanas' }
        ],
        notes: 'Ajustar Vancomicina por niveles séricos. Buscar y tratar el foco embolígeno primario (ecocardiograma).',
        source: 'IDSA 2014'
      }
    },
    {
      id: 'absceso-cerebral-postquirurgico',
      name: 'Postquirúrgico / postraumático',
      context: 'Absceso tras neurocirugía o traumatismo craneoencefálico penetrante.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Cefepime', dose: '15-20 mg/kg c/8-12h + 2 g c/8h', route: 'IV', duration: '6-8 semanas', note: 'Cobertura de Staphylococcus (incl. SAMR) y Pseudomonas' }
        ],
        secondLine: [
          { drug: 'Vancomicina + Meropenem', dose: '15-20 mg/kg c/8-12h + 2 g c/8h', route: 'IV', duration: '6-8 semanas' }
        ],
        notes: 'Duración total guiada por respuesta radiológica seriada (RM), no solo por tiempo fijo.',
        source: 'IDSA 2014'
      }
    }
  ]
},

{
  id: 'espondilodiscitis',
  name: 'Espondilodiscitis / Osteomielitis Vertebral',
  aliases: ['discitis', 'osteomielitis vertebral', 'espondilitis infecciosa', 'infeccion columna'],
  category: 'Osteoarticular',
  icon: '🦴',
  subtypes: [
    {
      id: 'espondilodiscitis-nativa',
      name: 'Piógena nativa (sin instrumentación)',
      context: 'Dolor de espalda persistente + fiebre/RFA elevados + hallazgos en RM, sin material protésico. Idealmente confirmar microbiología (hemocultivos/biopsia) antes de iniciar, salvo sepsis o déficit neurológico.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Ceftriaxona', dose: '15-20 mg/kg c/8-12h + 2 g/día', route: 'IV', duration: '6 semanas (mínimo)' }
        ],
        secondLine: [
          { drug: 'Vancomicina + Ciprofloxacino', dose: '15-20 mg/kg c/8-12h + 400 mg c/12h', route: 'IV', duration: '6 semanas' }
        ],
        notes: 'Staphylococcus aureus es el patógeno más frecuente. Diferir antibiótico empírico 24-48h si el paciente está estable, para maximizar rendimiento de biopsia/cultivo — no aplica si sepsis o compromiso neurológico agudo.',
        source: 'IDSA Native Vertebral Osteomyelitis 2015'
      }
    },
    {
      id: 'espondilodiscitis-instrumentada',
      name: 'Postquirúrgica / instrumentada',
      context: 'Infección de columna con material de osteosíntesis (tornillos, barras, jaulas intersomáticas).',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Cefepime', dose: '15-20 mg/kg c/8-12h + 2 g c/8h', route: 'IV', duration: '6 semanas, seguido de supresión oral prolongada si se retiene el material' }
        ],
        notes: 'Añadir Rifampicina 300-450 mg c/12h VO como adyuvante si el organismo es sensible y se retiene el hardware (mejora la penetración en biofilm). Valorar retirada de material si fracaso terapéutico.',
        source: 'IDSA 2015 · Infección Osteoarticular Asociada a Implantes'
      }
    }
  ]
},

{
  id: 'infeccion-derivacion-ventricular',
  name: 'Infección de Derivación Ventricular (VP shunt)',
  aliases: ['infeccion valvula derivacion', 'ventriculitis por derivacion', 'shunt infection', 'infeccion valvula ventriculoperitoneal'],
  category: 'SNC',
  icon: '🧠',
  subtypes: [
    {
      id: 'derivacion-precoz',
      name: 'Temprana (≤6 meses de la cirugía)',
      context: 'Fiebre, signos meníngeos o disfunción de la válvula en el postoperatorio reciente — habitualmente Staphylococcus epidermidis o S. aureus.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Cefepime', dose: '15-20 mg/kg c/8-12h + 2 g c/8h', route: 'IV', duration: '10-14 días tras cultivo LCR negativo o retiro del sistema' }
        ],
        secondLine: [
          { drug: 'Vancomicina + Meropenem', dose: '15-20 mg/kg c/8-12h + 2 g c/8h', route: 'IV', duration: '10-14 días' }
        ],
        notes: 'Retiro/externalización del sistema de derivación es la norma junto con el antibiótico sistémico; considerar Vancomicina o Gentamicina intraventricular si mala respuesta o infección por gramnegativos.',
        source: 'IDSA Healthcare-Associated Ventriculitis/Meningitis 2017'
      }
    },
    {
      id: 'derivacion-tardia',
      name: 'Tardía (>6 meses de la cirugía)',
      context: 'Infección de derivación de instauración más insidiosa, meses o años tras la colocación.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Cefepime', dose: '15-20 mg/kg c/8-12h + 2 g c/8h', route: 'IV', duration: '10-14 días, más prolongado (≥3 semanas) si bacilos gramnegativos' }
        ],
        notes: 'Ajustar según cultivo de LCR/punta del catéter. La reinserción de una nueva derivación se realiza tras negativización de cultivos.',
        source: 'IDSA 2017'
      }
    }
  ]
},

{
  id: 'endoftalmitis',
  name: 'Endoftalmitis',
  aliases: ['infeccion intraocular', 'endophthalmitis', 'infeccion ojo grave'],
  category: 'Oftalmológico',
  icon: '👁️',
  subtypes: [
    {
      id: 'endoftalmitis-postquirurgica',
      name: 'Postquirúrgica (post-cataratas, post-intravítrea)',
      context: 'Dolor ocular, disminución de agudeza visual e hipopión tras cirugía oftálmica reciente — emergencia oftalmológica.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina intravítrea + Ceftazidima intravítrea', dose: '1 mg/0,1 mL + 2,25 mg/0,1 mL', route: 'Intravítrea', duration: 'Dosis única, repetir a las 48-72h si no hay mejoría', note: 'Es el pilar del tratamiento — antibiótico sistémico no ha demostrado beneficio adicional consistente (Endophthalmitis Vitrectomy Study)' }
        ],
        secondLine: [
          { drug: 'Vancomicina fortificada + Ceftazidima fortificada tópicas', dose: 'Colirio fortificado horario', route: 'Tópica', duration: 'Hasta mejoría clínica', note: 'Complemento a la vía intravítrea' }
        ],
        notes: 'Vitrectomía urgente si agudeza visual solo percepción de luz. Manejo siempre coordinado con oftalmología.',
        source: 'Endophthalmitis Vitrectomy Study · AAO Preferred Practice Pattern'
      }
    },
    {
      id: 'endoftalmitis-endogena',
      name: 'Endógena (hematógena)',
      context: 'Diseminación hematógena desde bacteriemia/fungemia o endocarditis a uno o ambos ojos.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Ceftazidima IV', dose: '15-20 mg/kg c/8-12h + 2 g c/8h', route: 'IV', duration: 'Individualizar (habitualmente 2-3 semanas)', note: 'Asociar inyección intravítrea de Vancomicina + Ceftazidima' },
          { drug: 'Anfotericina B liposomal / Voriconazol', dose: 'Según protocolo', route: 'IV', duration: 'Individualizar', note: 'Si sospecha etiología fúngica (Candida) — más frecuente en endógena que postquirúrgica' }
        ],
        notes: 'Buscar y tratar siempre el foco sistémico primario (hemocultivos, ecocardiograma).',
        source: 'AAO Preferred Practice Pattern · IDSA Candidiasis 2016'
      }
    }
  ]
},

{
  id: 'celulitis-orbitaria-periorbitaria',
  name: 'Celulitis Orbitaria / Periorbitaria',
  aliases: ['celulitis preseptal', 'celulitis postseptal', 'infeccion parpado', 'celulitis palpebral'],
  category: 'Oftalmológico',
  icon: '👁️',
  subtypes: [
    {
      id: 'celulitis-periorbitaria-preseptal',
      name: 'Periorbitaria (preseptal)',
      context: 'Edema y eritema palpebral sin proptosis, sin limitación de la motilidad ocular ni dolor con el movimiento — anterior al tabique orbitario.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '7-10 días' }
        ],
        secondLine: [
          { drug: 'Clindamicina', dose: '300-450 mg c/8h', route: 'VO', duration: '7-10 días', note: 'Si riesgo de SAMR comunitario' }
        ],
        allergyAlternatives: [
          { drug: 'Trimetoprim-Sulfametoxazol + Amoxicilina', allergyTo: 'β-lactámicos con reacción no severa', dose: 'Ver detalle', route: 'VO', duration: '7-10 días' }
        ],
        notes: 'Manejo ambulatorio si buen estado general. Reevaluar en 24-48h — cualquier signo de progresión a orbitaria obliga a escalar e imagen urgente.',
        source: 'AAO Preferred Practice Pattern'
      }
    },
    {
      id: 'celulitis-orbitaria-postseptal',
      name: 'Orbitaria (postseptal) — urgencia',
      context: 'Proptosis, oftalmoplejía dolorosa, quemosis y/o disminución de agudeza visual — riesgo de absceso subperióstico, trombosis del seno cavernoso y pérdida visual permanente.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Ceftriaxona + Metronidazol', dose: '15-20 mg/kg c/8-12h + 2 g/día + 500 mg c/8h', route: 'IV', duration: '2-3 semanas (completar VO tras mejoría)', note: 'Metronidazol si origen sinusal (el más frecuente)' }
        ],
        notes: 'TC de órbita/senos urgente. Interconsulta emergente a Oftalmología y ORL — drenaje quirúrgico si absceso subperióstico/orbitario o falta de respuesta en 24-48h.',
        source: 'AAO Preferred Practice Pattern · IDSA'
      }
    }
  ]
}

];
