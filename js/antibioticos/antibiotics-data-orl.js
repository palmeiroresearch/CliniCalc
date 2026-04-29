// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// ORL: Oído, Nariz, Garganta y Vía Aérea Superior (9)
// Fuentes: IDSA · ESCMID · Sanford Guide 2024 · SEOM
// ============================================

const ANTIBIOTIC_DATA_ORL = [

{
  id: 'faringitis-bacteriana',
  name: 'Faringitis / Amigdalitis Bacteriana',
  aliases: ['faringitis', 'amigdalitis', 'anginas', 'garganta', 'streptococcus garganta', 'strep throat', 'centor', 'fiebre garganta', 'exudado faringeo', 'streptococo beta'],
  category: 'ORL',
  icon: '🦷',
  subtypes: [
    {
      id: 'faringitis-leve-moderada',
      name: 'Leve-Moderada (Centor / McIsaac 2-3)',
      context: 'Exudado amigdalar + fiebre + adenopatías cervicales + ausencia de tos. Streptococcus pyogenes (GAS) es la causa bacteriana más frecuente (15-30% de faringitis).',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina', dose: '500 mg c/8h o 1g c/12h', route: 'VO', duration: '10 días', note: 'Primera elección. Confirmar con test rápido de Ag o cultivo antes de tratar si score 2-3.' },
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '10 días', note: 'Si sospecha de resistencia o amigdalitis recurrente' }
        ],
        secondLine: [
          { drug: 'Penicilina V (Fenoximetilpenicilina)', dose: '500 mg c/12h', route: 'VO', duration: '10 días', note: 'Opción clásica. Menor espectro — preferible si el GAS es confirmado.' },
          { drug: 'Azitromicina', dose: '500 mg/día', route: 'VO', duration: '3-5 días', note: 'Solo si alergia a penicilina Y sensibilidad confirmada (resistencia GAS a macrólidos ~15-30%)' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos', dose: '300 mg c/8h', route: 'VO', duration: '10 días', note: 'Mejor cobertura GAS que macrólidos en caso de resistencia' },
          { drug: 'Cefalexina', allergyTo: 'Penicilina (alergia no severa)', dose: '500 mg c/12h', route: 'VO', duration: '10 días' }
        ],
        notes: 'La mayoría de faringitis son virales — NO tratar si score Centor <2 o test Ag negativo. El tratamiento previene la fiebre reumática y reduce la duración 1-2 días. Mononucleosis (VEB): amoxicilina causa exantema — descartar antes de tratar.',
        source: 'IDSA 2012 · ESCMID 2023 · Sanford Guide 2024'
      }
    },
    {
      id: 'faringitis-grave-recurrente',
      name: 'Grave / Recurrente (Centor 4 o >6 episodios/año)',
      context: 'Fiebre alta >39°C, disfagia intensa, exudado purulento bilateral. O amigdalitis recurrente con criterios quirúrgicos.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '10 días', note: 'Mayor cobertura en amigdalitis recurrente (bacterias productoras de β-lactamasas en las criptas)' },
          { drug: 'Penicilina G benzatínica', dose: '1.2 MU IM', route: 'IM', duration: 'Dosis única', note: 'Si dudas de adherencia. Dolorosa — preferir VO si posible.' }
        ],
        secondLine: [
          { drug: 'Clindamicina', dose: '300 mg c/8h', route: 'VO', duration: '10 días', note: 'Alternativa en amigdalitis recurrente o fracaso de penicilina' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos', dose: '300 mg c/8h', route: 'VO', duration: '10 días' },
          { drug: 'Azitromicina', allergyTo: 'β-lactámicos (si GAS sensible)', dose: '500 mg/día', route: 'VO', duration: '5 días' }
        ],
        notes: 'Criterios de amigdalectomía (Paradise): ≥7 episodios/año, o ≥5 × 2 años, o ≥3 × 3 años, con exudado, fiebre >38.3°C, adenopatías o test positivo. Derivar a ORL si recurrencia frecuente.',
        source: 'IDSA 2012 · ESCMID 2023 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'absceso-periamigdalino',
  name: 'Absceso Periamigdalino',
  aliases: ['absceso periamigdalino', 'periamigdalino', 'absceso amigdala', 'absceso tonsilar', 'trismo', 'disfagia grave', 'voz en patata', 'angina ludwig'],
  category: 'ORL',
  icon: '🦷',
  subtypes: [
    {
      id: 'periamigdalino-medico',
      name: 'Médico — Celulitis periamigdalina (sin colección)',
      context: 'Inflamación periamigdalina sin fluctuación clara. Estadio inicial. Trismo leve. Puerta de entrada para drenaje si no mejora en 24-48h.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '1g/200mg c/8h', route: 'IV → 875/125 mg c/12h VO', duration: '10-14 días total', note: 'Cubrir estreptococos y anaerobios orales (polimicrobiano típico)' },
          { drug: 'Penicilina G + Metronidazol', dose: 'Penicilina G 2 MU c/4h IV + Metronidazol 500mg c/8h IV', route: 'IV', duration: '3-5 días IV → completar VO', note: 'Si ingreso hospitalario' }
        ],
        secondLine: [
          { drug: 'Clindamicina', dose: '600 mg c/8h IV → 300 mg c/8h VO', route: 'IV/VO', duration: '10-14 días', note: 'Excelente cobertura polimicrobiana + anaerobios. Alternativa si alergia β-lactámicos.' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos', dose: '600 mg c/8h IV → 300 mg c/8h VO', route: 'IV/VO', duration: '10-14 días' }
        ],
        notes: 'Añadir dexametasona 8-10 mg IV dosis única para reducir edema y dolor. Si no mejora en 24-48h → drenaje. Analgesia IV y nutrición parenteral si disfagia severa.',
        source: 'IDSA · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'periamigdalino-drenaje',
      name: 'Absceso Formado — Drenaje + Antibiótico',
      context: 'Fluctuación palpable, desviación de la úvula, voz "en patata", trismo marcado. Requiere drenaje (aspiración con aguja o incisión).',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '1g/200mg c/8h IV → 875/125 mg c/12h VO', route: 'IV/VO', duration: '10-14 días', note: 'SIEMPRE complementario al drenaje — el antibiótico solo no es suficiente' },
          { drug: 'Clindamicina', dose: '600 mg c/8h IV → 300 mg c/8h VO', route: 'IV/VO', duration: '10-14 días', note: 'Cobertura anaerobios superior a penicilina sola' }
        ],
        secondLine: [
          { drug: 'Ampicilina-Sulbactam', dose: '3g c/6h IV', route: 'IV', duration: '5-7 días IV → completar VO', note: 'Si hospitalización requerida por extensión o sepsis' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina + Metronidazol', allergyTo: 'β-lactámicos', dose: 'Clinda 300mg c/8h + Metro 500mg c/8h', route: 'VO', duration: '10-14 días' }
        ],
        notes: 'DRENAJE OBLIGATORIO. Técnica: aspiración con aguja o incisión-drenaje bajo anestesia local. Amigdalectomía en el mismo acto (quinsy tonsillectomy) si ≥2 episodios. Vigilar extensión a espacios profundos del cuello (Ludwig, parafaríngeo).',
        source: 'IDSA · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'sinusitis-aguda',
  name: 'Sinusitis Bacteriana Aguda',
  aliases: ['sinusitis', 'sinusitis aguda', 'sinusitis bacteriana', 'rinosinusitis', 'sinusitis maxilar', 'sinusitis frontal', 'sinusitis etmoidal', 'dolor facial fiebre', 'moco purulento'],
  category: 'ORL',
  icon: '👃',
  subtypes: [
    {
      id: 'sinusitis-leve-moderada',
      name: 'Leve-Moderada — Criterios de Wohl/IDSA',
      context: 'Síntomas >10 días sin mejoría, o inicio grave (fiebre >39°C + rinorrea purulenta ≥3-4 días), o empeoramiento tras mejoría inicial. S. pneumoniae, H. influenzae y M. catarrhalis.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h o 500/125 mg c/8h', route: 'VO', duration: '5-7 días', note: 'Primera elección. Cobertura H. influenzae β-lactamasa+ y neumococo resistente.' },
          { drug: 'Amoxicilina', dose: '500 mg c/8h (alta dosis: 1g c/8h en zonas alta resistencia)', route: 'VO', duration: '5-7 días', note: 'Solo si bajo riesgo de resistencia y sin complicaciones' }
        ],
        secondLine: [
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '5-7 días', note: 'Si alergia a β-lactámicos o fracaso previo' },
          { drug: 'Cefuroxima axetilo', dose: '250-500 mg c/12h', route: 'VO', duration: '5-7 días' }
        ],
        allergyAlternatives: [
          { drug: 'Levofloxacino', allergyTo: 'β-lactámicos', dose: '500 mg/día', route: 'VO', duration: '5 días', note: 'Reservar para fracasos o alergia — evitar uso indiscriminado de fluoroquinolonas en sinusitis leve' },
          { drug: 'Doxiciclina', allergyTo: 'β-lactámicos', dose: '100 mg c/12h', route: 'VO', duration: '5-7 días' }
        ],
        notes: 'Waterwash nasal (irrigación salina) + corticoide nasal (fluticasona) como coadyuvantes. NO descongestionantes sistémicos. Criterios de derivación urgente: edema periorbitario, cefalea intensa, diplopia, rigidez de nuca (extensión intracraneal).',
        source: 'IDSA 2012 · ESCMID 2020 · Sanford Guide 2024'
      }
    },
    {
      id: 'sinusitis-grave-complicada',
      name: 'Grave / Complicada (extensión orbital o intracraneal)',
      context: 'Edema periorbitario, proptosis, oftalmoplejía, cefalea intensa, alteración de consciencia. Urgencia médico-quirúrgica.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona + Metronidazol', dose: 'Ceftriaxona 2g/d IV + Metronidazol 500mg c/8h IV', route: 'IV', duration: '14-21 días', note: 'Cobertura Gram+ y anaerobios (sinusitis frontal etmoidal complicada)' },
          { drug: 'Amoxicilina-Clavulánico', dose: '2g/200mg c/8h IV', route: 'IV', duration: '14-21 días', note: 'Alternativa si microbiología disponible' }
        ],
        secondLine: [
          { drug: 'Vancomicina + Piperacilina-Tazobactam', dose: 'Vanco 15mg/kg c/12h + PipTazo 4.5g c/6h IV', route: 'IV', duration: '14-21 días', note: 'Si extensión intracraneal con absceso o MRSA riesgo' }
        ],
        allergyAlternatives: [
          { drug: 'Levofloxacino + Metronidazol', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Levo 750mg/d + Metro 500mg c/8h', route: 'IV', duration: '14-21 días' }
        ],
        notes: 'TC urgente para delimitar extensión. Drenaje quirúrgico (endoscópico o abierto) si absceso subperióstico, absceso orbitario o intracraneal. Consulta urgente a oftalmología y neurocirugía. Dexametasona si edema cerebral.',
        source: 'IDSA · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'otitis-media-aguda',
  name: 'Otitis Media Aguda (OMA)',
  aliases: ['otitis media', 'oma', 'otitis media aguda', 'otitis media bacteriana', 'otalgia fiebre', 'oído dolor', 'supuración oído', 'otorrea'],
  category: 'ORL',
  icon: '👂',
  subtypes: [
    {
      id: 'oma-sin-factores-riesgo',
      name: 'Sin factores de riesgo (>2 años, sin complicaciones)',
      context: 'Otalgia aguda + fiebre + abombamiento timpánico. S. pneumoniae, H. influenzae y M. catarrhalis. En >2 años sin factores de riesgo: observación 48-72h si síntomas leves.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina', dose: '500 mg c/8h (adultos); 80-90 mg/kg/día c/8h (niños)', route: 'VO', duration: '5-7 días (adultos); 10 días (niños <2a o grave)', note: 'Si moderada-grave o no mejora en 48-72h de observación' },
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h (adultos); 90/6.4 mg/kg/día (niños)', route: 'VO', duration: '5-7 días', note: 'Si fracaso de amoxicilina, otorrea o exposición reciente a antibióticos (<1 mes)' }
        ],
        secondLine: [
          { drug: 'Cefuroxima axetilo', dose: '250-500 mg c/12h', route: 'VO', duration: '5-7 días', note: 'Alternativa si intolerancia a amoxicilina-clavulánico' }
        ],
        allergyAlternatives: [
          { drug: 'Azitromicina', allergyTo: 'β-lactámicos', dose: '500 mg/día', route: 'VO', duration: '3-5 días', note: 'Menor eficacia frente a H. influenzae. Solo si alergia confirmada.' },
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos (neumococo resistente)', dose: '300 mg c/8h', route: 'VO', duration: '10 días', note: 'No cubre H. influenzae — solo si neumococo es el patógeno confirmado' }
        ],
        notes: 'En adultos >2 años con síntomas leves: considerar observación 48-72h con analgesia (ibuprofeno). Miringotomía si OMA recurrente (≥3/6 meses o ≥4/año). El calor local y el ibuprofeno son los mejores analgésicos.',
        source: 'IDSA · AAP 2022 · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'oma-grave-factores-riesgo',
      name: 'Grave / Con factores de riesgo (<2 años, otorrea, bilateral, inmunosupr.)',
      context: 'Fiebre alta >39°C, otalgia intensa, <2 años, OMA bilateral, otorrea o inmunosupresión. Tratamiento antibiótico siempre (sin periodo de observación).',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h (adultos); 90/6.4 mg/kg/día (niños)', route: 'VO', duration: '10 días', note: 'Primera elección en OMA grave o con factores de riesgo. No esperar.' },
          { drug: 'Ceftriaxona', dose: '50 mg/kg/día (máx 1g) IM/IV', route: 'IM/IV', duration: '3 días', note: 'Si vómitos o no tolera VO. 3 dosis consecutivas en OMA resistente.' }
        ],
        secondLine: [
          { drug: 'Ceftriaxona IM × 3 días', dose: '50 mg/kg/día (máx 1g)', route: 'IM', duration: '3 días', note: 'En fracaso de amoxicilina oral — neumococo resistente probable' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos', dose: '300 mg c/8h', route: 'VO', duration: '10 días', note: 'No cubre H. influenzae — solo si neumococo confirmado' }
        ],
        notes: 'Mastoiditis aguda: complicación a descartar si dolor retroauricular + edema + desplazamiento del pabellón. Derivación urgente si parálisis facial, vértigo o signos de extensión intracraneal.',
        source: 'IDSA · AAP 2022 · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'otitis-externa',
  name: 'Otitis Externa Aguda',
  aliases: ['otitis externa', 'oido externo', 'oido del nadador', 'otitis nadador', 'conducto auditivo', 'pseudomonas oido', 'otitis maligna', 'otitis necrotizante', 'diabetico oido'],
  category: 'ORL',
  icon: '👂',
  subtypes: [
    {
      id: 'otitis-externa-difusa',
      name: 'Difusa (Oído del Nadador)',
      context: 'Otalgia + prurito + conducto eritematoso y edematoso + otorrea. Pseudomonas aeruginosa y S. aureus más frecuentes. No fiebre ni afectación del cartílago.',
      treatment: {
        firstLine: [
          { drug: 'Ciprofloxacino tópico 0.3%', dose: '3-4 gotas c/12h', route: 'Tópico ótico', duration: '7 días', note: 'Primera elección. Eficacia equivalente a combinaciones con corticoide sin los riesgos de los aminoglucósidos.' },
          { drug: 'Ciprofloxacino 0.3% + Dexametasona 0.1%', dose: '4 gotas c/12h', route: 'Tópico ótico', duration: '7 días', note: 'Combinación: reduce el edema más rápido. Primera elección en muchos protocolos.' }
        ],
        secondLine: [
          { drug: 'Ácido acético 2% (solución de Burow)', dose: '3-5 gotas c/6-8h', route: 'Tópico ótico', duration: '7 días', note: 'Acidifica el conducto — inhibe crecimiento bacteriano. Eficaz en casos leves-moderados sin otorrea purulenta.' }
        ],
        allergyAlternatives: [
          { drug: 'Neomicina + Polimixina B + Hidrocortisona', allergyTo: 'Fluoroquinolonas tópicas', dose: '3-4 gotas c/6-8h', route: 'Tópico ótico', duration: '7 días', note: 'NO usar si sospecha de perforación timpánica (ototóxico)' }
        ],
        notes: 'Limpieza del conducto antes de las gotas (fundamental para eficacia). Mecha si edema severo ocluye el conducto. Antibiótico sistémico NO necesario en formas no complicadas. Evitar agua en el conducto durante el tratamiento.',
        source: 'AAO-HNS 2014 · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'otitis-externa-maligna',
      name: 'Maligna / Necrotizante (Otitis Externa Invasiva)',
      context: 'Diabético o inmunosupr. con otalgia intensa + otorrea + tejido de granulación en el conducto. Pseudomonas aeruginosa. Puede extenderse a base del cráneo y nervios craneales.',
      treatment: {
        firstLine: [
          { drug: 'Ciprofloxacino', dose: '750 mg c/12h', route: 'VO', duration: '6-8 semanas', note: 'Tratamiento de elección. Excelente penetración ósea y actividad anti-Pseudomonas. TC/RMN basal para estadificar extensión.' },
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: '4-6 semanas', note: 'Si grave, extensión a base del cráneo, o fracaso de ciprofloxacino oral' }
        ],
        secondLine: [
          { drug: 'Cefepima + Tobramicina', dose: 'Cefepima 2g c/8h IV + Tobramicina 5-7mg/kg/d IV', route: 'IV', duration: '6-8 semanas', note: 'Si resistencia a ciprofloxacino o fracaso previo' }
        ],
        allergyAlternatives: [
          { drug: 'Ceftazidima', allergyTo: 'Fluoroquinolonas + PipTazo', dose: '2g c/8h IV', route: 'IV', duration: '6-8 semanas', note: 'Cobertura antipseudomonas alternativa' }
        ],
        notes: 'Desbridamiento quirúrgico del tejido necrótico. TC/RMN seriado para evaluar respuesta. Parálisis facial = extensión de mal pronóstico (nervio VII en canal de Falopio). Galium-67 o PET para seguimiento de erradicación ósea. Control glucémico estricto obligatorio.',
        source: 'AAO-HNS · IDSA · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'bronquitis-aguda',
  name: 'Bronquitis Aguda',
  aliases: ['bronquitis', 'bronquitis aguda', 'tos aguda', 'tos con flemas', 'tos productiva', 'catarro bronquial', 'traqueobronquitis', 'tos 3 semanas'],
  category: 'ORL',
  icon: '🌬️',
  subtypes: [
    {
      id: 'bronquitis-adulto-sano',
      name: 'Adulto Inmunocompetente sin Comorbilidades',
      context: 'Tos aguda (<3 semanas) con o sin expectoración, en adulto previamente sano, sin criterios de neumonía (sin fiebre alta, sin crepitantes, SatO2 normal). Etiología vírica en >90% de casos.',
      treatment: {
        firstLine: [
          { drug: 'Tratamiento sintomático — SIN antibiótico', dose: 'Analgésicos/antipiréticos (paracetamol/ibuprofeno) + hidratación + miel (si tos nocturna)', route: 'VO', duration: '7-14 días (evolución natural)', note: '⚠️ Los antibióticos NO reducen la duración ni la gravedad de la bronquitis aguda vírica. Solo reducen el tiempo de tos en 0.5 días con alto coste en efectos adversos y resistencias.' }
        ],
        secondLine: [
          { drug: 'Azitromicina', dose: '500 mg/día', route: 'VO', duration: '3-5 días', note: 'SOLO si: sospecha de Mycoplasma o Chlamydophila pneumoniae (tos persistente >3 sem, afebril, sin esputo purulento) O síntomas epidémicos de coqueluche (tos paroxística + estridor)' },
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '5-7 días', note: 'Si Mycoplasma/Chlamydophila sospechado y contraindicación a macrólidos' }
        ],
        allergyAlternatives: [
          { drug: 'Doxiciclina', allergyTo: 'Macrólidos', dose: '100 mg c/12h', route: 'VO', duration: '5-7 días' }
        ],
        notes: 'Descartar neumonía si: FC >100, FR >24, Temp >38°C, crepitantes o dullness a la percusión. El esputo amarillo/verde NO indica infección bacteriana — es normal en infecciones virales. Evitar antitusivos con codeína (dependencia, sedación). Bromhexina o carbocisteína si expectoración densa.',
        source: 'NICE 2023 · ESCMID 2016 · Cochrane · Sanford Guide 2024'
      }
    },
    {
      id: 'bronquitis-epoc-comorbilidades',
      name: 'EPOC / Comorbilidades Significativas',
      context: 'Bronquitis aguda en paciente con EPOC, IC, DM, inmunosupresión o edad avanzada. Mayor riesgo de progresión y etiología bacteriana secundaria.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '5-7 días', note: 'Si hay criterios de Anthonisen (cambio en volumen, color o consistencia del esputo + disnea)' },
          { drug: 'Azitromicina', dose: '500 mg/día', route: 'VO', duration: '3-5 días', note: 'Alternativa si leve o como cobertura de atípicos' }
        ],
        secondLine: [
          { drug: 'Levofloxacino', dose: '500 mg/día', route: 'VO', duration: '5-7 días', note: 'Si alto riesgo de neumococo resistente o fracaso previo' }
        ],
        allergyAlternatives: [
          { drug: 'Doxiciclina', allergyTo: 'β-lactámicos y macrólidos', dose: '100 mg c/12h', route: 'VO', duration: '5-7 días' }
        ],
        notes: 'En EPOC: ver también entrada específica de "EPOC exacerbada infecciosa". El umbral para tratar con antibiótico es menor en pacientes con comorbilidades. Añadir broncodilatadores y corticosteroides inhalados si hay obstrucción bronquial.',
        source: 'GOLD 2024 · NICE · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'epiglotitis-aguda',
  name: 'Epiglotitis Aguda',
  aliases: ['epiglotitis', 'epiglotis', 'stridor adulto', 'disfagia grave rapida', 'vía aérea comprometida', 'haemophilus influenzae', 'supra glottitis', 'supraglotitis'],
  category: 'ORL',
  icon: '🚨',
  subtypes: [
    {
      id: 'epiglotitis-adulto',
      name: 'Adulto — Presentación Subaguda',
      context: 'Adultos: inicio más gradual que en niños. Fiebre + odinofagia intensa + disfagia + babeo. La vía aérea está en riesgo. H. influenzae tipo b (aunque la vacunación la ha reducido), Streptococcus, S. aureus.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona', dose: '2g/día', route: 'IV', duration: '7-10 días', note: 'Primera línea. Cobertura H. influenzae, estreptococos y neumococo.' },
          { drug: 'Cefotaxima', dose: '2g c/8h', route: 'IV', duration: '7-10 días', note: 'Alternativa equivalente a ceftriaxona' }
        ],
        secondLine: [
          { drug: 'Ampicilina-Sulbactam', dose: '3g c/6h', route: 'IV', duration: '7-10 días', note: 'Añade cobertura de anaerobios si sospecha de suprainfección' },
          { drug: '+ Vancomicina', dose: '15 mg/kg c/12h', route: 'IV', duration: 'Añadir si sospecha S. aureus (adictos IV, post-influenza)', note: 'Ajustar según hemocultivos' }
        ],
        allergyAlternatives: [
          { drug: 'Levofloxacino', allergyTo: 'β-lactámicos (alergia severa)', dose: '750 mg/día', route: 'IV', duration: '7-10 días' }
        ],
        notes: '⚠️ URGENCIA DE VÍA AÉREA. No realizar examen orofaríngeo sin preparación para intubación urgente. Si dificultad respiratoria: intubación endotraqueal bajo laringoscopia directa o fibroendoscopia. Traqueotomía de emergencia si no intubable. Dexametasona 0.5-0.6 mg/kg/dosis IV (reduce edema).',
        source: 'IDSA · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'epiglotitis-pediatrica',
      name: 'Pediátrica — Urgencia Vía Aérea',
      context: 'Niño con vacunación incompleta o no vacunado. Inicio hiperagudo: fiebre alta + estridor + posición en trípode + babeo + ansiedad. Mortalidad alta sin manejo inmediato.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona', dose: '50-100 mg/kg/día (máx 2g/día)', route: 'IV', duration: '7-10 días', note: 'Iniciar TRAS asegurar la vía aérea. Nunca antes.' },
          { drug: 'Cefotaxima', dose: '200 mg/kg/día c/6h (máx 8g/día)', route: 'IV', duration: '7-10 días' }
        ],
        secondLine: [
          { drug: 'Ampicilina-Sulbactam', dose: '200 mg/kg/día c/6h', route: 'IV', duration: '7-10 días' }
        ],
        allergyAlternatives: [
          { drug: 'Cloranfenicol', allergyTo: 'β-lactámicos (niños, alergia severa)', dose: '50-100 mg/kg/día c/6h', route: 'IV', duration: '7-10 días', note: 'Solo si no hay alternativa — riesgo anemia aplásica' }
        ],
        notes: '🔴 PROTOCOLO DE VÍA AÉREA PRIMERO: (1) No explorar la garganta. (2) Llamar a anestesia + ORL + UCI pediátrica. (3) Intubación nasotraqueal en quirófano con cirujano listo para traqueotomía. (4) Antibiótico DESPUÉS de asegurar vía aérea. Profilaxis contactos: Rifampicina 20 mg/kg/día × 4 días.',
        source: 'IDSA · AAP · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'angina-ludwig',
  name: 'Angina de Ludwig / Infección Espacio Profundo Cuello',
  aliases: ['angina de ludwig', 'ludwig', 'infeccion cuello profundo', 'espacio submandibular', 'flegmon cuello', 'celulitis cuello', 'absceso parafaringeo', 'absceso retrofaringeo', 'mediastinitis descendente', 'cuello infeccion grave'],
  category: 'ORL',
  icon: '🚨',
  subtypes: [
    {
      id: 'ludwig-submandibular',
      name: 'Angina de Ludwig (Espacio Submandibular)',
      context: 'Celulitis bilateral del piso de la boca y espacio submandibular. Origen dental (2º molar inferior) en 80%. Trismo + disfagia + elevación del suelo de la boca + induración dura sin fluctuación. Riesgo de obstrucción aguda de la vía aérea.',
      treatment: {
        firstLine: [
          { drug: 'Ampicilina-Sulbactam', dose: '3g c/6h', route: 'IV', duration: '14-21 días (IV hasta mejoría clínica → VO)', note: 'Cobertura polimicrobiana (estreptococos, anaerobios orales, enterobacterias). Primera elección.' },
          { drug: 'Penicilina G + Metronidazol', dose: 'Penicilina G 4 MU c/4h + Metronidazol 500mg c/8h', route: 'IV', duration: '14-21 días', note: 'Alternativa clásica con excelente cobertura anaerobios' }
        ],
        secondLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: '14-21 días', note: 'Si extensión al mediastino o sepsis severa (mediastinitis descendente necrotizante)' },
          { drug: '+ Vancomicina', dose: '15-20 mg/kg c/12h', route: 'IV', duration: 'Añadir si MRSA sospechado o no mejora en 48h' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina + Metronidazol + Aztreonam', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Clinda 600mg c/8h + Metro 500mg c/8h + Aztreonam 2g c/8h', route: 'IV', duration: '14-21 días' }
        ],
        notes: '⚠️ VÍA AÉREA PRIMERO. La intubación de urgencia puede ser imposible por trismo — planificar intubación fibroendoscópica despierto o traqueotomía bajo anestesia local. Drenaje quirúrgico urgente (no esperar fluctuación). Extracción dental del foco. Dexametasona reduce el edema. Si extensión al mediastino: mortalidad >40% — cirugía torácia urgente.',
        source: 'IDSA · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'absceso-espacio-profundo-cuello',
      name: 'Otros Espacios Profundos (Parafaríngeo / Retrofaríngeo)',
      context: 'Infección de los espacios parafaríngeo o retrofaríngeo. Origen amigdalar, dental o yatrogénico. Fiebre + disfagia + rigidez cervical + abombamiento de la pared faríngea posterior.',
      treatment: {
        firstLine: [
          { drug: 'Ampicilina-Sulbactam', dose: '3g c/6h', route: 'IV', duration: '14-21 días', note: 'Complementario al drenaje quirúrgico obligatorio' },
          { drug: 'Clindamicina + Ceftriaxona', dose: 'Clinda 600mg c/8h + Ceftriaxona 2g/d', route: 'IV', duration: '14-21 días', note: 'Cobertura estreptococos + anaerobios + Gram-negativos' }
        ],
        secondLine: [
          { drug: 'Meropenem', dose: '1g c/8h', route: 'IV', duration: '14-21 días', note: 'Si extensión mediastínica o MDR' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina + Aztreonam', allergyTo: 'β-lactámicos', dose: 'Clinda 600mg c/8h + Aztreonam 2g c/8h', route: 'IV', duration: '14-21 días' }
        ],
        notes: 'TC cervical + torácico urgente para descartar extensión mediastínica (mediastinitis descendente necrotizante — mortalidad 40-60%). Drenaje endoscópico o quirúrgico. Vigilar síndrome de Lemierre (tromboflebitis séptica de la yugular interna por Fusobacterium necrophorum — añadir anticoagulación si confirma).',
        source: 'IDSA · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'mastoiditis-aguda',
  name: 'Mastoiditis Aguda',
  aliases: ['mastoiditis', 'mastoideo', 'dolor retroauricular', 'desplazamiento pabellon auricular', 'edema retroauricular', 'complicacion otitis', 'mastoides'],
  category: 'ORL',
  icon: '👂',
  subtypes: [
    {
      id: 'mastoiditis-sin-complicaciones',
      name: 'Sin Complicaciones Intracraneales',
      context: 'Complicación de OMA. Dolor y edema retroauricular + desplazamiento del pabellón auricular hacia adelante + fiebre. S. pneumoniae, S. pyogenes, S. aureus, H. influenzae.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona', dose: '2g/día (adultos); 50-100 mg/kg/día (niños)', route: 'IV', duration: '7-14 días IV → completar VO según mejoría', note: 'Primera elección. Buena penetración ósea y cobertura de patógenos habituales.' },
          { drug: 'Amoxicilina-Clavulánico', dose: '2g/200mg c/8h IV', route: 'IV', duration: '7-14 días IV', note: 'Alternativa si ceftriaxona no disponible' }
        ],
        secondLine: [
          { drug: '+ Vancomicina', dose: '15-20 mg/kg c/12h', route: 'IV', duration: 'Añadir si MRSA sospechado o no mejora' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos', dose: '600 mg c/8h IV → 300 mg c/8h VO', route: 'IV/VO', duration: '14 días' }
        ],
        notes: 'TC de hueso temporal urgente. Miringotomía + drenaje con tubo de ventilación. Si absceso subperióstico: drenaje quirúrgico. Mastoidectomía si no mejora en 24-48h de antibióticos IV o si absceso extenso.',
        source: 'IDSA · AAP · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'mastoiditis-complicaciones-intracraneales',
      name: 'Con Complicaciones Intracraneales (Absceso, Trombosis, Meningitis)',
      context: 'Absceso epidural/subdural, meningitis, trombosis del seno sigmoideo o tromboflebitis del seno cavernoso. Alta mortalidad sin tratamiento agresivo urgente.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona + Metronidazol + Vancomicina', dose: 'Ceftriaxona 2g c/12h + Metronidazol 500mg c/8h + Vancomicina 15-20mg/kg c/12h', route: 'IV', duration: '4-6 semanas', note: 'Cobertura amplia — Gram+, Gram-, anaerobios y MRSA' }
        ],
        secondLine: [
          { drug: 'Meropenem + Vancomicina', dose: 'Meropenem 2g c/8h + Vancomicina 15-20mg/kg c/12h', route: 'IV', duration: '4-6 semanas', note: 'Si MDR o fracaso previo' }
        ],
        allergyAlternatives: [
          { drug: 'Levofloxacino + Metronidazol + Vancomicina', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Levo 750mg/d + Metro 500mg c/8h + Vanco 15mg/kg c/12h', route: 'IV', duration: '4-6 semanas' }
        ],
        notes: 'Neurocirugía urgente para drenaje de abscesos intracraneales. Mastoidectomía + drenaje del seno sigmoideo si trombosis. Anticoagulación (HBPM) si trombosis del seno venoso. Duración total del tratamiento: mínimo 4-6 semanas. RMN craneal seriada para seguimiento.',
        source: 'IDSA · AAP · ESCMID · Sanford Guide 2024'
      }
    }
  ]
}

]; // fin ANTIBIOTIC_DATA_ORL
