// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// Base de datos: 20 patologías infecciosas
// Fuentes: Sanford Guide 2024 · IDSA · ATS · ESCMID
// ============================================

const ANTIBIOTIC_DATA_CORE = [

// ════════════════════════════════════════════
// RESPIRATORIO
// ════════════════════════════════════════════
{
  id: 'nac',
  name: 'Neumonía Adquirida en la Comunidad (NAC)',
  aliases: ['neumonia', 'bronconeumonia', 'neumonia bacteriana', 'neumonia comunitaria', 'pulmonía', 'nac', 'cap', 'pulmon', 'respiratorio', 'pneumonia', 'neumococo'],
  category: 'Respiratorio',
  icon: '🫁',
  subtypes: [
    {
      id: 'nac-leve',
      name: 'Leve — Ambulatoria (CURB-65: 0-1, PSI I-II)',
      context: 'Sin criterios de hospitalización. Sin comorbilidades significativas.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina', dose: '500 mg c/8h', route: 'VO', duration: '5 días' },
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '5-7 días', note: 'Si comorbilidades o sospecha de atípicos' }
        ],
        secondLine: [
          { drug: 'Azitromicina', dose: '500 mg/día', route: 'VO', duration: '3-5 días', note: 'Monoterapia si neumonía atípica probable (Mycoplasma, Chlamydophila)' },
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '5-7 días' }
        ],
        allergyAlternatives: [
          { drug: 'Levofloxacino', allergyTo: 'β-lactámicos', dose: '750 mg/día', route: 'VO', duration: '5 días' },
          { drug: 'Moxifloxacino', allergyTo: 'β-lactámicos', dose: '400 mg/día', route: 'VO', duration: '5 días' }
        ],
        notes: 'No cubrir Pseudomonas empíricamente en NAC leve sin factores de riesgo. Evaluar vacunación antineumocócica y antigripal.',
        source: 'IDSA/ATS 2019 · Sanford Guide 2024'
      }
    },
    {
      id: 'nac-moderada',
      name: 'Moderada — Hospitalizada (CURB-65: 2, PSI III-IV)',
      context: 'Requiere hospitalización. Sin criterios de UCI.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '1 g/200 mg c/8h', route: 'IV', duration: '5-7 días', note: '+ Azitromicina 500 mg/día VO/IV (cobertura atípicos)' },
          { drug: 'Ceftriaxona', dose: '1-2 g/día', route: 'IV', duration: '5-7 días', note: '+ Azitromicina 500 mg/día IV/VO' }
        ],
        secondLine: [
          { drug: 'Levofloxacino', dose: '750 mg/día', route: 'IV/VO', duration: '5-7 días', note: 'Monoterapia respiratoria; no combinar con azitromicina' },
          { drug: 'Moxifloxacino', dose: '400 mg/día', route: 'IV/VO', duration: '5-7 días' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam', allergyTo: 'β-lactámicos (alergia severa)', dose: '2 g c/8h', route: 'IV', duration: '5-7 días', note: '+ Levofloxacino 750 mg/día IV' }
        ],
        notes: 'Desescalar a VO en 48-72h si mejoría clínica. CURB-65 ≥3 o PSI ≥V → evaluar UCI.',
        source: 'IDSA/ATS 2019 · SEPAR 2023 · Sanford Guide 2024'
      }
    },
    {
      id: 'nac-grave',
      name: 'Grave — UCI (CURB-65: ≥3, PSI V)',
      context: 'Requiere UCI. Hipoxemia severa, shock o fallo multiorgánico.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona 2 g/día IV + Azitromicina 500 mg/día IV', dose: 'Ver detalle', route: 'IV', duration: '7-10 días', note: 'Esquema estándar sin riesgo Pseudomonas' },
          { drug: 'Ceftriaxona 2 g/día IV + Levofloxacino 750 mg/día IV', dose: 'Ver detalle', route: 'IV', duration: '7-10 días', note: 'Alternativa si contraindicación a macrólidos (QT largo)' }
        ],
        secondLine: [
          { drug: 'Piperacilina-Tazobactam + Levofloxacino', dose: '4,5 g c/6h + 750 mg/día', route: 'IV', duration: '7-10 días', note: 'Si riesgo Pseudomonas: EPOC grave, bronquiectasias, inmunodepresión, antibióticos recientes' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Levofloxacino', allergyTo: 'β-lactámicos (alergia severa)', dose: '2 g c/8h + 750 mg/día', route: 'IV', duration: '7-10 días' }
        ],
        notes: 'Añadir Vancomicina o Linezolid si factores de riesgo MRSA (gripe previa, residencia, diálisis, MRSA previo). Hemocultivos x2 y urinario Legionella + neumococo.',
        source: 'IDSA/ATS 2019 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'hap',
  name: 'Neumonía Intrahospitalaria (HAP)',
  aliases: ['hap', 'nosocomial', 'hospitalaria', 'neumonia hospital', 'intrahospitalaria'],
  category: 'Respiratorio',
  icon: '🏥',
  subtypes: [
    {
      id: 'hap-sin-mdr',
      name: 'Sin factores de riesgo MDR',
      context: 'Hospitalización <5 días, sin antibióticos recientes, sin inmunosupresión.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6h', route: 'IV', duration: '7 días' },
          { drug: 'Ceftriaxona', dose: '2 g/día', route: 'IV', duration: '7 días' }
        ],
        secondLine: [
          { drug: 'Levofloxacino', dose: '750 mg/día', route: 'IV/VO', duration: '7 días' },
          { drug: 'Ertapenem', dose: '1 g/día', route: 'IV', duration: '7 días', note: 'Si alergia a penicilina o enterobacterias ESBL confirmadas' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Levofloxacino', allergyTo: 'β-lactámicos', dose: '2 g c/8h + 750 mg/día', route: 'IV', duration: '7 días' }
        ],
        notes: 'Desescalar a las 48-72h según antibiograma. Duración mínima 7 días si buena respuesta.',
        source: 'ATS/IDSA 2016 · Sanford Guide 2024'
      }
    },
    {
      id: 'hap-con-mdr',
      name: 'Con factores de riesgo MDR',
      context: 'Antibióticos IV en últimos 90 días, hospitalización >5 días, UCI, diálisis, shock séptico, o ARDS.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam + Amikacina', dose: '4,5 g c/6h + 15-20 mg/kg/día', route: 'IV', duration: '7-14 días', note: 'Cobertura antipseudomonas de doble vía' },
          { drug: 'Meropenem + Amikacina', dose: '1-2 g c/8h + 15-20 mg/kg/día', route: 'IV', duration: '7-14 días', note: 'Si riesgo ESBL o fallo de betalactámico previo' }
        ],
        secondLine: [
          { drug: '+ Vancomicina', dose: '15-20 mg/kg c/8-12h', route: 'IV', duration: 'Hasta desescalada', note: 'Añadir si riesgo MRSA (colonización previa, antibióticos IV recientes)' },
          { drug: '+ Linezolid', dose: '600 mg c/12h', route: 'IV/VO', duration: 'Hasta desescalada', note: 'Alternativa a Vancomicina si MRSA; mejor penetración pulmonar' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Amikacina + Vancomicina', allergyTo: 'β-lactámicos', dose: 'Dosis habituales', route: 'IV', duration: '7-14 días' }
        ],
        notes: 'Desescalar SIEMPRE al identificar microorganismo y antibiograma. Duración según respuesta clínica y PCT.',
        source: 'ATS/IDSA 2016 · ESCMID 2023 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'vap',
  name: 'Neumonía Asociada al Ventilador (VAP/NAVM)',
  aliases: ['vap', 'navm', 'ventilador', 'entubado', 'vm', 'neumonía ventilador'],
  category: 'Respiratorio',
  icon: '🫁',
  subtypes: [
    {
      id: 'vap-early',
      name: 'Early onset — Inicio temprano (<5 días de VM)',
      context: 'Sin antibióticos previos recientes, sin colonización por MDR conocida.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona', dose: '2 g/día', route: 'IV', duration: '7-8 días' },
          { drug: 'Ampicilina-Sulbactam', dose: '3 g c/6h', route: 'IV', duration: '7-8 días' }
        ],
        secondLine: [
          { drug: 'Levofloxacino', dose: '750 mg/día', route: 'IV', duration: '7-8 días' },
          { drug: 'Ertapenem', dose: '1 g/día', route: 'IV', duration: '7-8 días' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Levofloxacino', allergyTo: 'β-lactámicos', dose: '2 g c/8h + 750 mg/día', route: 'IV', duration: '7-8 días' }
        ],
        notes: 'Solicitar cultivo de BAL o mini-BAL antes de iniciar antibiótico. Duración mínima 7 días si buena respuesta clínica.',
        source: 'ATS/IDSA 2016 · Sanford Guide 2024'
      }
    },
    {
      id: 'vap-late',
      name: 'Late onset — Inicio tardío (≥5 días de VM)',
      context: 'Alto riesgo de MDR: Pseudomonas, Acinetobacter, MRSA. Antibióticos previos o larga estancia.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam + Amikacina', dose: '4,5 g c/6h + 15-20 mg/kg/día', route: 'IV', duration: '7-14 días', note: 'Doble cobertura antipseudomonas obligatoria' },
          { drug: 'Cefepima + Amikacina', dose: '2 g c/8h + 15-20 mg/kg/día', route: 'IV', duration: '7-14 días' }
        ],
        secondLine: [
          { drug: 'Meropenem + Amikacina', dose: '2 g c/8h + 15-20 mg/kg/día', route: 'IV', duration: '7-14 días', note: 'Si fracaso previo o ESBL confirmado' },
          { drug: '+ Vancomicina o Linezolid', dose: '15-20 mg/kg c/12h ó 600 mg c/12h', route: 'IV', duration: 'Según cultivos', note: 'Añadir si MRSA riesgo o prevalencia >20% en UCI' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Amikacina + Linezolid', allergyTo: 'β-lactámicos', dose: 'Dosis habituales', route: 'IV', duration: '7-14 días' }
        ],
        notes: 'Si Acinetobacter XDR: Meropenem + Colistina + Rifampicina. Desescalada obligatoria según antibiograma a las 48-72h.',
        source: 'ATS/IDSA 2016 · ESCMID 2023 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'epoc-infecciosa',
  name: 'EPOC Exacerbada — Etiología Infecciosa',
  aliases: ['epoc', 'copd', 'exacerbacion', 'bronquitis cronica', 'enfisema', 'agudizacion epoc'],
  category: 'Respiratorio',
  icon: '🫁',
  subtypes: [
    {
      id: 'epoc-leve',
      name: 'Leve-Moderada (Anthonisen I-II, sin ingreso)',
      context: 'Aumento de disnea, expectoración y purulencia. Sin criterios de hospitalización.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '5-7 días' },
          { drug: 'Azitromicina', dose: '500 mg/día', route: 'VO', duration: '3-5 días' }
        ],
        secondLine: [
          { drug: 'Levofloxacino', dose: '500 mg/día', route: 'VO', duration: '5 días' },
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '7 días' }
        ],
        allergyAlternatives: [
          { drug: 'Doxiciclina', allergyTo: 'β-lactámicos y macrólidos', dose: '100 mg c/12h', route: 'VO', duration: '7 días' },
          { drug: 'TMP/SMX', allergyTo: 'β-lactámicos', dose: '160/800 mg c/12h', route: 'VO', duration: '7 días' }
        ],
        notes: 'Siempre añadir broncodilatadores de acción corta y corticosteroides sistémicos (Prednisona 40 mg/d × 5 días). Antibiótico solo si esputo purulento.',
        source: 'GOLD 2024 · SEPAR · Sanford Guide 2024'
      }
    },
    {
      id: 'epoc-grave',
      name: 'Grave — Hospitalizada (FEV1 <30%, UCI, VM)',
      context: 'Insuficiencia respiratoria, acidosis respiratoria, necesidad de VM. Riesgo Pseudomonas.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6h', route: 'IV', duration: '7-10 días', note: 'Si riesgo Pseudomonas: EPOC grave, corticoides crónicos, FEV1 <30%' },
          { drug: 'Levofloxacino', dose: '750 mg/día', route: 'IV', duration: '7 días', note: 'Si no riesgo Pseudomonas confirmado' }
        ],
        secondLine: [
          { drug: 'Cefepima + Amikacina', dose: '2 g c/8h + 15 mg/kg/día', route: 'IV', duration: '7-10 días', note: 'Si fracaso de primera línea' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Levofloxacino', allergyTo: 'penicilinas', dose: '2 g c/8h + 750 mg/día', route: 'IV', duration: '7 días' }
        ],
        notes: 'VNI (CPAP/BiPAP) de elección antes de intubación. Fisioterapia respiratoria. Evaluar oxigenoterapia de alto flujo.',
        source: 'GOLD 2024 · SEPAR · ATS/IDSA · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'influenza',
  name: 'Influenza (Gripe) — Tratamiento Antiviral',
  aliases: ['gripe', 'influenza', 'flu', 'influenza a', 'influenza b', 'h1n1', 'oseltamivir'],
  category: 'Respiratorio',
  icon: '🦠',
  subtypes: [
    {
      id: 'influenza-leve',
      name: 'Sin comorbilidades — Ambulatoria (<48h síntomas)',
      context: 'Adulto sano sin factores de riesgo. Mayor beneficio si inicio <48h desde síntomas.',
      treatment: {
        firstLine: [
          { drug: 'Oseltamivir', dose: '75 mg c/12h', route: 'VO', duration: '5 días' },
          { drug: 'Baloxavir', dose: '40 mg (peso 40-80 kg) / 80 mg (>80 kg)', route: 'VO', duration: 'Dosis única', note: 'No usar en embarazo ni inmunodeprimidos' }
        ],
        secondLine: [
          { drug: 'Zanamivir', dose: '10 mg c/12h inhalado', route: 'Inhalada', duration: '5 días', note: 'Contraindicado en asma/EPOC (broncoespasmo)' }
        ],
        allergyAlternatives: [
          { drug: 'Baloxavir', allergyTo: 'Oseltamivir', dose: '40-80 mg según peso', route: 'VO', duration: 'Dosis única' }
        ],
        notes: 'Tratamiento empírico justificado en temporada epidémica sin esperar confirmación. Inicio tardío (>48h) puede beneficiar si enfermedad grave o progresiva.',
        source: 'IDSA 2019 · CDC 2024 · Sanford Guide 2024'
      }
    },
    {
      id: 'influenza-grave',
      name: 'Alto riesgo / Grave — Hospitalizada (UCI)',
      context: '>65 años, embarazo, inmunodepresión, obesidad mórbida, enfermedad crónica, hipoxia.',
      treatment: {
        firstLine: [
          { drug: 'Oseltamivir', dose: '75 mg c/12h', route: 'VO/SNG', duration: '5-10 días', note: 'Extender hasta 10 días o más en inmunodeprimidos. Doble dosis (150 mg c/12h) en obesidad mórbida y/o VM.' },
          { drug: 'Peramivir', dose: '600 mg', route: 'IV', duration: 'Dosis única (puede repetirse)', note: 'Usar si no tolera vía oral (íleo, cirugía GI)' }
        ],
        secondLine: [
          { drug: 'Oseltamivir 150 mg c/12h', dose: 'Dosis doble', route: 'VO/SNG', duration: '10 días', note: 'En SDRA por influenza o inmunodepresión grave' }
        ],
        allergyAlternatives: [
          { drug: 'Peramivir IV', allergyTo: 'Oseltamivir (intolerancia)', dose: '600 mg/día', route: 'IV', duration: '5-10 días' }
        ],
        notes: 'Añadir antibiótico si sospecha de sobreinfección bacteriana (Staphylococcus aureus, Streptococcus pneumoniae). La coinfección bacteriana es causa frecuente de muerte en influenza grave.',
        source: 'IDSA 2019 · OMS · Sanford Guide 2024'
      }
    }
  ]
},

// ════════════════════════════════════════════
// URINARIO
// ════════════════════════════════════════════
{
  id: 'cistitis',
  name: 'ITU no Complicada — Cistitis',
  aliases: ['cistitis', 'itu', 'itu baja', 'infeccion urinaria', 'orina', 'urinaria', 'disuria', 'urocultivo'],
  category: 'Urinario',
  icon: '🔬',
  subtypes: [
    {
      id: 'cistitis-mujer',
      name: 'Mujer no embarazada',
      context: 'Disuria, frecuencia, urgencia. Sin fiebre, sin flanco dolor. Sin embarazo.',
      treatment: {
        firstLine: [
          { drug: 'Fosfomicina trometamol', dose: '3 g', route: 'VO', duration: 'Dosis única', note: 'Primera elección OMS/IDSA por bajo impacto en microbiota y resistencias' },
          { drug: 'Nitrofurantoína macrocristales', dose: '100 mg c/12h', route: 'VO', duration: '5 días', note: 'No usar si eGFR <30 ml/min (ineficaz)' }
        ],
        secondLine: [
          { drug: 'TMP/SMX', dose: '160/800 mg c/12h', route: 'VO', duration: '3 días', note: 'Solo si resistencia local <20%. En España: resistencia E. coli ~20-25%, usar con precaución' },
          { drug: 'Amoxicilina-Clavulánico', dose: '500/125 mg c/8h', route: 'VO', duration: '7 días' }
        ],
        allergyAlternatives: [
          { drug: 'Ciprofloxacino', allergyTo: 'Todos los anteriores', dose: '250 mg c/12h', route: 'VO', duration: '3 días', note: '⚠️ No como primera línea (OMS). Resistencias crecientes. Reservar para pielonefritis.' }
        ],
        notes: '⚠️ Las fluoroquinolonas NO se recomiendan como primera línea en cistitis no complicada (OMS 2017, IDSA 2011). Reservarlas para infecciones más graves.',
        source: 'IDSA 2011 · OMS 2017 · EAU 2024 · Sanford Guide 2024'
      }
    },
    {
      id: 'cistitis-embarazo',
      name: 'Embarazada (bacteriuria asintomática o cistitis)',
      context: 'Tratar SIEMPRE, incluso bacteriuria asintomática. Riesgo de pielonefritis y parto prematuro.',
      treatment: {
        firstLine: [
          { drug: 'Fosfomicina trometamol', dose: '3 g', route: 'VO', duration: 'Dosis única', note: 'Mayor seguridad en embarazo. Categoría B FDA.' },
          { drug: 'Nitrofurantoína', dose: '100 mg c/12h', route: 'VO', duration: '5 días', note: 'Contraindicada en el 3er trimestre (riesgo hemólisis neonatal)' }
        ],
        secondLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '500/125 mg c/8h', route: 'VO', duration: '7 días', note: 'Si susceptibilidad confirmada' },
          { drug: 'Cefalexina', dose: '500 mg c/6h', route: 'VO', duration: '7 días' }
        ],
        allergyAlternatives: [
          { drug: 'Cefalexina', allergyTo: 'Penicilinas (alergia leve)', dose: '500 mg c/6h', route: 'VO', duration: '7 días' }
        ],
        notes: '⚠️ Evitar TMP/SMX en 1er trimestre (folato antagonista) y en el 3er trimestre. Evitar fluoroquinolonas (teratogénicas en animales). Urocultivo de control a la semana.',
        source: 'ACOG 2020 · IDSA 2011 · EAU 2024 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'pielonefritis',
  name: 'Pielonefritis Aguda',
  aliases: ['pielonefritis', 'riñon', 'pna', 'itu alta', 'flanco', 'cvam', 'fiebre orina'],
  category: 'Urinario',
  icon: '🔬',
  subtypes: [
    {
      id: 'pielonefritis-ambulatoria',
      name: 'Ambulatoria — Leve-Moderada',
      context: 'Fiebre, dolor lumbar, náuseas. Sin sepsis. Candidata a tratamiento oral.',
      treatment: {
        firstLine: [
          { drug: 'Ciprofloxacino', dose: '500 mg c/12h', route: 'VO', duration: '7 días', note: 'Solo si resistencia local fluoroquinolonas <10%' },
          { drug: 'Levofloxacino', dose: '750 mg/día', route: 'VO', duration: '5 días' }
        ],
        secondLine: [
          { drug: 'TMP/SMX', dose: '160/800 mg c/12h', route: 'VO', duration: '14 días', note: 'Si sensible en antibiograma' },
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '10-14 días', note: 'Menor eficacia que FQ; solo si sensible' }
        ],
        allergyAlternatives: [
          { drug: 'Cefpodoxima proxetilo', allergyTo: 'Fluoroquinolonas', dose: '200 mg c/12h', route: 'VO', duration: '10 días' }
        ],
        notes: 'Urocultivo previo al antibiótico. Ajustar según antibiograma. Si no mejoría en 48-72h → hospitalización.',
        source: 'IDSA 2011 · EAU 2024 · Sanford Guide 2024'
      }
    },
    {
      id: 'pielonefritis-hospitalizada',
      name: 'Hospitalizada — Grave o con sepsis',
      context: 'Sepsis, vómitos incoercibles, insuficiencia renal, embarazo, inmunosupresión, anomalía urológica.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona', dose: '2 g/día', route: 'IV', duration: '7-14 días', note: 'Desescalar a VO en 48-72h si mejoría' },
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6h', route: 'IV', duration: '7-14 días', note: 'Si factores de riesgo MDR o ESBL' }
        ],
        secondLine: [
          { drug: 'Ertapenem', dose: '1 g/día', route: 'IV', duration: '7-14 días', note: 'Si ESBL confirmada o alta sospecha' },
          { drug: 'Meropenem', dose: '1 g c/8h', route: 'IV', duration: '7-14 días', note: 'Reservar para KPC o MDR grave' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Amikacina', allergyTo: 'β-lactámicos', dose: '2 g c/8h + 15 mg/kg/día', route: 'IV', duration: '7-14 días' }
        ],
        notes: 'Hemocultivos x2 antes de antibiótico. Descartar litiasis obstructiva (eco/TC) urgente. Si uropatía obstructiva → drenaje urgente.',
        source: 'IDSA 2011 · EAU 2024 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'itu-complicada',
  name: 'ITU Complicada / CAUTI',
  aliases: ['itu complicada', 'cauti', 'sonda vesical', 'foley', 'cateter urinario', 'itu hombre', 'uropatia'],
  category: 'Urinario',
  icon: '🔬',
  subtypes: [
    {
      id: 'itu-complicada-sin-sonda',
      name: 'ITU Complicada — Sin sonda (hombre, anatómica, litiasis)',
      context: 'Hombre, embarazo, anomalía urológica, litiasis, inmunosupresión, diabetes.',
      treatment: {
        firstLine: [
          { drug: 'Ciprofloxacino', dose: '500 mg c/12h', route: 'VO', duration: '10-14 días' },
          { drug: 'Ceftriaxona', dose: '2 g/día', route: 'IV', duration: '10-14 días', note: 'Si requiere ingreso o no tolera VO' }
        ],
        secondLine: [
          { drug: 'Levofloxacino', dose: '750 mg/día', route: 'IV/VO', duration: '7-10 días' },
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6h', route: 'IV', duration: '10-14 días', note: 'Si ESBL riesgo o fracaso previo' }
        ],
        allergyAlternatives: [
          { drug: 'Ertapenem', allergyTo: 'penicilinas (ESBL)', dose: '1 g/día', route: 'IV', duration: '10-14 días' }
        ],
        notes: 'Considerar siempre el factor complicante: en litiasis obstructiva el antibiótico NO es suficiente sin drenaje. Duración mínima 10 días en hombre.',
        source: 'EAU 2024 · IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'itu-cauti',
      name: 'CAUTI — Asociada a Catéter Urinario',
      context: 'Infección en paciente con sonda uretral ≥2 días. Síntomas sistémicos (fiebre, escalofríos).',
      treatment: {
        firstLine: [
          { drug: 'Retirar o cambiar sonda SIEMPRE', dose: '—', route: 'Procedimiento', duration: 'Inmediato', note: 'Paso clave antes de iniciar antibiótico' },
          { drug: 'Ciprofloxacino', dose: '500 mg c/12h', route: 'VO', duration: '7 días (sin síntomas sistémicos)' },
          { drug: 'Ceftriaxona', dose: '2 g/día', route: 'IV', duration: '7-14 días', note: 'Si fiebre, sepsis o factores MDR' }
        ],
        secondLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6h', route: 'IV', duration: '7-14 días', note: 'Si MDR riesgo' },
          { drug: 'Ertapenem', dose: '1 g/día', route: 'IV', duration: '7-14 días', note: 'Si ESBL confirmada' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam', allergyTo: 'β-lactámicos', dose: '2 g c/8h', route: 'IV', duration: '7-14 días' }
        ],
        notes: '⚠️ NO tratar bacteriuria asintomática asociada a sonda (excepto embarazo o cirugía urológica inminente). Nitrofurantoína NO es válida en CAUTI (no alcanza parénquima renal).',
        source: 'IDSA 2010 · EAU 2024 · Sanford Guide 2024'
      }
    }
  ]
},

// ════════════════════════════════════════════
// ABDOMINAL
// ════════════════════════════════════════════
{
  id: 'infeccion-intraabdominal',
  name: 'Infección Intraabdominal',
  aliases: ['intraabdominal', 'peritonitis', 'absceso abdominal', 'abdomen', 'perforación', 'apendicitis', 'diverticulitis'],
  category: 'Abdominal',
  icon: '🏥',
  subtypes: [
    {
      id: 'iia-leve',
      name: 'Leve-Moderada (peritonitis localizada, no grave)',
      context: 'Apendicitis perforada, diverticulitis complicada leve, absceso localizado. Sin sepsis grave.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '1 g/200 mg c/8h', route: 'IV', duration: '4-7 días', note: 'Post-control del foco quirúrgico/drenaje' },
          { drug: 'Ceftriaxona + Metronidazol', dose: '2 g/día + 500 mg c/8h', route: 'IV', duration: '4-7 días' }
        ],
        secondLine: [
          { drug: 'Ertapenem', dose: '1 g/día', route: 'IV', duration: '4-7 días', note: 'Si alergia a penicilina o enterobacterias ESBL' },
          { drug: 'Ciprofloxacino + Metronidazol', dose: '400 mg c/12h + 500 mg c/8h', route: 'IV', duration: '4-7 días' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Metronidazol', allergyTo: 'β-lactámicos', dose: '2 g c/8h + 500 mg c/8h', route: 'IV', duration: '4-7 días' }
        ],
        notes: 'El CONTROL DEL FOCO (cirugía o drenaje percutáneo) es OBLIGATORIO. Los antibióticos solos no resuelven la infección sin drenaje del foco.',
        source: 'IDSA 2010 · WSES 2021 · Sanford Guide 2024'
      }
    },
    {
      id: 'iia-grave',
      name: 'Grave / Sepsis Abdominal',
      context: 'Peritonitis difusa, shock séptico de origen abdominal, postquirúrgico, MDR riesgo.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6h', route: 'IV', duration: '7-14 días' },
          { drug: 'Meropenem', dose: '1-2 g c/8h', route: 'IV', duration: '7-14 días', note: 'Si MDR riesgo, fracaso previo, o Bacteroides fragilis resistente' }
        ],
        secondLine: [
          { drug: '+ Fluconazol', dose: '400 mg/día', route: 'IV', duration: 'Según evolución', note: 'Añadir si riesgo de Candida: NPT, cirugía GI previa, inmunodepresión, fallo renal' },
          { drug: '+ Vancomicina o Ampicilina', dose: 'Dosis habituales', route: 'IV', duration: 'Según cultivos', note: 'Si Enterococcus o peritonitis posquirúrgica' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Metronidazol + Vancomicina', allergyTo: 'β-lactámicos', dose: 'Dosis habituales', route: 'IV', duration: '7-14 días' }
        ],
        notes: 'Duración según respuesta clínica y PCT. Desescalar obligatorio al conocer antibiograma.',
        source: 'IDSA 2010 · WSES 2021 · Sanford Guide 2024'
      }
    },
    {
      id: 'peritonitis-terciaria',
      name: 'Peritonitis Terciaria (persistente/recurrente)',
      context: 'Peritonitis que persiste o recae ≥48h tras cirugía. Flora MDR, Candida y Enterococcus habituales.',
      treatment: {
        firstLine: [
          { drug: 'Meropenem + Vancomicina + Micafungina', dose: '2 g c/8h + 15 mg/kg c/12h + 100 mg/día', route: 'IV', duration: 'Hasta control clínico' }
        ],
        secondLine: [
          { drug: 'Ceftazidima-Avibactam + Metronidazol', dose: '2,5 g c/8h + 500 mg c/8h', route: 'IV', duration: 'Hasta control', note: 'Si KPC o ESBL con fracaso a carbapenems' }
        ],
        allergyAlternatives: [
          { drug: 'Colistina + Anidulafungina + Linezolid', allergyTo: 'múltiples', dose: 'Dosis habituales', route: 'IV', duration: 'Individualizado' }
        ],
        notes: 'Derivar a unidad de referencia. Cultivos dirigidos obligatorios. Alta mortalidad (40-60%). Considerar TAC para identificar colecciones no drenadas.',
        source: 'WSES 2021 · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'colecistitis',
  name: 'Colecistitis Aguda',
  aliases: ['colecistitis', 'vesicula', 'vesicula biliar', 'coledocolitiasis', 'colangitis', 'biliar', 'tokyo'],
  category: 'Abdominal',
  icon: '🫘',
  subtypes: [
    {
      id: 'colecistitis-grado-1-2',
      name: 'Grado I-II (Leve-Moderada)',
      context: 'Sin disfunción orgánica. Tokyo Grade I-II. Candidato a colecistectomía.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '1g/200mg c/8h', route: 'IV', duration: '24-48h post-cirugía' },
          { drug: 'Ceftriaxona', dose: '2g/día', route: 'IV', duration: '24-48h post-cirugía', note: '+ Metronidazol 500mg c/8h IV si contaminación biliar' }
        ],
        secondLine: [
          { drug: 'Ciprofloxacino', dose: '400mg c/12h', route: 'IV', duration: '24-48h post-cirugía', note: '+ Metronidazol 500mg c/8h IV' },
          { drug: 'Ertapenem', dose: '1g/día', route: 'IV', duration: '24-48h post-cirugía', note: 'Si alergia a penicilinas y cefalosporinas' }
        ],
        allergyAlternatives: [
          { drug: 'Ciprofloxacino + Metronidazol', allergyTo: 'β-lactámicos', dose: 'Cipro 400mg c/12h + Metro 500mg c/8h', route: 'IV', duration: '24-48h post-cirugía' }
        ],
        notes: 'Colecistectomía laparoscópica preferiblemente en las primeras 24-72h. Los antibióticos se suspenden 24h tras la cirugía si no hay contaminación peritoneal.',
        source: 'Tokyo Guidelines 2018 · WSES 2020 · Sanford Guide 2024'
      }
    },
    {
      id: 'colecistitis-grado-3',
      name: 'Grado III (Severa) — Disfunción orgánica',
      context: 'Disfunción de al menos un órgano. Tokyo Grade III. Alto riesgo quirúrgico.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: '5-7 días' },
          { drug: 'Meropenem', dose: '1g c/8h', route: 'IV', duration: '5-7 días', note: 'Si riesgo de MDR o fallo previo a otras pautas' }
        ],
        secondLine: [
          { drug: 'Cefepima + Metronidazol', dose: 'Cefepima 2g c/8h + Metro 500mg c/8h', route: 'IV', duration: '5-7 días' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Metronidazol', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Aztreonam 2g c/8h + Metro 500mg c/8h', route: 'IV', duration: '5-7 días' }
        ],
        notes: 'Si no candidato quirúrgico urgente: drenaje biliar percutáneo (colecistostomía) como puente. Añadir Fluconazol 400mg/d si inmunosupr. o candida riesgo.',
        source: 'Tokyo Guidelines 2018 · WSES 2020 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'clostridium-difficile',
  name: 'Infección por Clostridioides difficile (CDI)',
  aliases: ['clostridium', 'clostridioides', 'cdi', 'cdiff', 'diarrea antibioticos', 'pseudomembranosa', 'colitis', 'metronidazol colitis'],
  category: 'Abdominal',
  icon: '🦠',
  subtypes: [
    {
      id: 'cdi-leve',
      name: 'Primer episodio — Leve-Moderada',
      context: 'Leucocitos ≤15.000, creatinina normal, sin complicaciones.',
      treatment: {
        firstLine: [
          { drug: 'Fidaxomicina', dose: '200 mg c/12h', route: 'VO', duration: '10 días', note: 'Superior a Vancomicina en recurrencias. Primera elección IDSA 2021.' },
          { drug: 'Vancomicina VO', dose: '125 mg c/6h', route: 'VO', duration: '10 días', note: 'Alternativa eficaz si no disponible fidaxomicina' }
        ],
        secondLine: [
          { drug: 'Metronidazol', dose: '500 mg c/8h', route: 'VO', duration: '10 días', note: '⚠️ Solo si no hay otra opción. Menor eficacia que Vancomicina/Fidaxomicina (IDSA 2021).' }
        ],
        allergyAlternatives: [
          { drug: 'Rifaximina', allergyTo: 'Vancomicina y Fidaxomicina', dose: '400 mg c/8h', route: 'VO', duration: '20 días', note: 'Evidencia limitada; uso compasivo' }
        ],
        notes: '⚠️ SUSPENDER el antibiótico causante si es posible. No usar Vancomicina IV (no alcanza lumen intestinal). Medidas de aislamiento de contacto.',
        source: 'IDSA/SHEA 2021 · ESCMID 2021 · Sanford Guide 2024'
      }
    },
    {
      id: 'cdi-grave',
      name: 'Grave / Complicada',
      context: 'Leucocitos >15.000, creatinina >1,5× basal, hipotensión, íleo, megacolon tóxico.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina VO', dose: '125-500 mg c/6h', route: 'VO', duration: '10-14 días', note: 'Dosis alta (500 mg c/6h) si íleo o megacolon' },
          { drug: 'Fidaxomicina', dose: '200 mg c/12h', route: 'VO', duration: '10 días', note: 'Si tolera vía oral' }
        ],
        secondLine: [
          { drug: 'Vancomicina enema + Metronidazol IV', dose: '500 mg en 100 ml SF c/6h + 500 mg c/8h', route: 'Rectal + IV', duration: '10-14 días', note: 'Si íleo completo: Vancomicina no llega al ciego por vía oral' }
        ],
        allergyAlternatives: [
          { drug: 'Metronidazol IV + Vancomicina enema', allergyTo: 'Contexto de íleo', dose: 'Dosis habituales', route: 'IV + Rectal', duration: '10-14 días' }
        ],
        notes: '⚠️ Cirugía urgente (colectomía) si megacolon tóxico o peritonitis. Considerar Bezlotoxumab 10 mg/kg IV (anticuerpo anti-toxina B) si ≥2 factores de riesgo de recurrencia.',
        source: 'IDSA/SHEA 2021 · Sanford Guide 2024'
      }
    },
    {
      id: 'cdi-recurrente',
      name: 'Recurrente (≥1 episodio previo)',
      context: 'Recaída dentro de 8 semanas del episodio inicial. Mayor riesgo en >65 años, inmunosuprimidos.',
      treatment: {
        firstLine: [
          { drug: 'Fidaxomicina', dose: '200 mg c/12h', route: 'VO', duration: '10 días', note: 'Superior a Vancomicina en prevención de nuevas recurrencias' },
          { drug: 'Vancomicina VO en pauta descendente', dose: '125 mg c/6h × 7d → c/12h × 7d → c/día × 7d → c/48-72h × 8 semanas', route: 'VO', duration: '6-8 semanas totales' }
        ],
        secondLine: [
          { drug: 'Trasplante de Microbiota Fecal (FMT)', dose: '—', route: 'Colonoscopia/SNG', duration: '1-2 sesiones', note: 'Indicado si ≥3 recurrencias. Eficacia >80-90% (primera elección en recurrencia múltiple).' }
        ],
        allergyAlternatives: [
          { drug: 'Ridinilazole', allergyTo: 'En investigación', dose: 'No disponible comercialmente en todos los países', route: 'VO', duration: '10 días' }
        ],
        notes: '⚠️ Bezlotoxumab 10 mg/kg IV (dosis única) con el antibiótico si alto riesgo de recurrencia (>65 años, inmunodepresión, CDI grave previa, cepa 027).',
        source: 'IDSA/SHEA 2021 · ESCMID 2021 · Sanford Guide 2024'
      }
    }
  ]
},

// ════════════════════════════════════════════
// PIEL Y TEJIDOS BLANDOS
// ════════════════════════════════════════════
{
  id: 'celulitis-erisipela',
  name: 'Celulitis / Erisipela',
  aliases: ['celulitis', 'erisipela', 'piel', 'tejidos blandos', 'infeccion piel', 'eritema', 'fascitis'],
  category: 'Piel y Tejidos Blandos',
  icon: '🩹',
  subtypes: [
    {
      id: 'celulitis-leve',
      name: 'Leve — Ambulatoria (sin factores complicantes)',
      context: 'Eritema, calor, edema sin absceso. Sin sistémica. Sin MRSA riesgo. S. pyogenes o S. aureus MSSA probable.',
      treatment: {
        firstLine: [
          { drug: 'Cefalexina', dose: '500 mg c/6h', route: 'VO', duration: '5-7 días' },
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '5-7 días' }
        ],
        secondLine: [
          { drug: 'Clindamicina', dose: '300-450 mg c/8h', route: 'VO', duration: '5-7 días', note: 'Si MRSA comunitario posible o alergia a β-lactámicos' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos', dose: '300-450 mg c/8h', route: 'VO', duration: '5-7 días' },
          { drug: 'TMP/SMX + Amoxicilina', allergyTo: 'β-lactámicos (MRSA + Streptococcus)', dose: '160/800 mg c/12h + 500 mg c/8h', route: 'VO', duration: '5-7 días' }
        ],
        notes: 'Elevar extremidad. Si no mejora en 48h → hospitalizar. Marcar bordes del eritema con bolígrafo para monitorizar progresión.',
        source: 'IDSA 2014 · Sanford Guide 2024'
      }
    },
    {
      id: 'celulitis-moderada',
      name: 'Moderada-Grave — Hospitalizada (con factores de riesgo)',
      context: 'Fiebre alta, afectación sistémica, DM, inmunosupresión, linfedema, fallo de tratamiento oral.',
      treatment: {
        firstLine: [
          { drug: 'Cefazolina', dose: '2 g c/8h', route: 'IV', duration: '5-10 días', note: 'MSSA probable. Desescalar a VO en 48-72h.' },
          { drug: 'Cloxacilina', dose: '1-2 g c/6h', route: 'IV', duration: '5-10 días' }
        ],
        secondLine: [
          { drug: 'Vancomicina', dose: '15-20 mg/kg c/12h', route: 'IV', duration: 'Hasta mejoría → VO', note: 'Si MRSA riesgo: celulitis purulenta, herida por punción, MRSA previo, antibióticos recientes' },
          { drug: 'Daptomicina', dose: '6 mg/kg/día', route: 'IV', duration: '5-10 días', note: 'Alternativa a Vancomicina en MRSA' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina IV', allergyTo: 'β-lactámicos', dose: '600-900 mg c/8h', route: 'IV', duration: '5-10 días', note: 'Comprobar sensibilidad (resistencia inductible D-test)' }
        ],
        notes: 'Desescalada a VO tras 48h de mejoría clínica (afebril, eritema estabilizado). Si MRSA confirmado: TMP/SMX o Doxiciclina VO en ambulatorio.',
        source: 'IDSA 2014 · Sanford Guide 2024'
      }
    },
    {
      id: 'fascitis-necrotizante',
      name: 'Fascitis Necrotizante — Urgencia Quirúrgica',
      context: 'Dolor desproporcionado, crepitación, gas en TC, rápida progresión, fallo orgánico. EMERGENCIA.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam + Clindamicina', dose: '4,5 g c/6h + 600-900 mg c/8h', route: 'IV', duration: 'Hasta cierre quirúrgico + 2-5 días', note: 'Clindamicina inhibe síntesis de toxinas (Streptococcus grupo A)' },
          { drug: '+ Vancomicina', dose: '15-20 mg/kg c/12h', route: 'IV', duration: 'Hasta conocer MRSA', note: 'Añadir empíricamente hasta cultivos' }
        ],
        secondLine: [
          { drug: 'Meropenem + Clindamicina + Vancomicina', dose: 'Dosis habituales', route: 'IV', duration: 'Hasta cierre', note: 'Si MDR riesgo o Vibrio/Aeromonas (exposición marina)' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Clindamicina + Vancomicina', allergyTo: 'penicilinas', dose: 'Dosis habituales', route: 'IV', duration: 'Hasta cierre' }
        ],
        notes: '🚨 DESBRIDAMIENTO QUIRÚRGICO URGENTE. El antibiótico es adyuvante. Sin cirugía precoz: mortalidad >70%. LRINEC score ≥6 → alta sospecha. Considerar IGIV en Streptococcus grupo A.',
        source: 'IDSA 2014 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'pie-diabetico',
  name: 'Pie Diabético Infectado',
  aliases: ['pie diabetico', 'pie diabético', 'diabetes pie', 'ulcera pie', 'osteomielitis pie', 'gangrena diabetica'],
  category: 'Piel y Tejidos Blandos',
  icon: '🩹',
  subtypes: [
    {
      id: 'pie-diabetico-leve',
      name: 'Leve — Ambulatoria (IDSA: infección superficial)',
      context: 'Úlcera <2 cm eritema, sin afectación sistémica, sin isquemia significativa.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '7-14 días' },
          { drug: 'Cefalexina + Metronidazol', dose: '500 mg c/6h + 500 mg c/8h', route: 'VO', duration: '7-14 días', note: 'Si sospecha de anaerobios' }
        ],
        secondLine: [
          { drug: 'TMP/SMX', dose: '160/800 mg c/12h', route: 'VO', duration: '7-14 días', note: 'Si MRSA riesgo: antibióticos previos, infección purulenta' },
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '7-14 días', note: 'Si MRSA riesgo y TMP/SMX contraindicado' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos', dose: '300-450 mg c/8h', route: 'VO', duration: '7-14 días' }
        ],
        notes: 'Descartar osteomielitis (exploración con sonda ósea, RX y RMN). Cuidado local de la herida esencial. Derivar a Cirugía Vascular si isquemia.',
        source: 'IDSA 2012 · IWGDF 2023 · Sanford Guide 2024'
      }
    },
    {
      id: 'pie-diabetico-grave',
      name: 'Moderado-Grave — Hospitalizado (osteomielitis, isquemia)',
      context: 'Celulitis >2 cm, afectación profunda, osteomielitis, isquemia, crepitación, sepsis.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6h', route: 'IV', duration: '2-4 semanas (osteomielitis)', note: 'Cobertura polimicrobiana: Gram+, Gram-, anaerobios' },
          { drug: 'Ampicilina-Sulbactam', dose: '3 g c/6h', route: 'IV', duration: '2-4 semanas' }
        ],
        secondLine: [
          { drug: '+ Vancomicina', dose: '15-20 mg/kg c/12h', route: 'IV', duration: 'Hasta conocer MRSA', note: 'Añadir si MRSA riesgo o no respuesta' },
          { drug: 'Daptomicina (osteomielitis MRSA)', dose: '6 mg/kg/día', route: 'IV', duration: '4-6 semanas' }
        ],
        allergyAlternatives: [
          { drug: 'Meropenem + Vancomicina', allergyTo: 'penicilinas', dose: '1 g c/8h + 15 mg/kg c/12h', route: 'IV', duration: '2-4 semanas' }
        ],
        notes: 'Osteomielitis → mínimo 4-6 semanas IV/VO secuencial. Revascularización urgente si isquemia crítica. Cirugía: desbridamiento ± resección ósea. RMN para delimitación.',
        source: 'IDSA 2012 · IWGDF 2023 · Sanford Guide 2024'
      }
    }
  ]
},

// ════════════════════════════════════════════
// SNC
// ════════════════════════════════════════════
{
  id: 'meningitis-bacteriana',
  name: 'Meningitis Bacteriana Aguda',
  aliases: ['meningitis', 'meningococo', 'neumococo', 'snc', 'lcr', 'puncion lumbar', 'rigidez nuca', 'kernig', 'brudzinski'],
  category: 'SNC',
  icon: '🧠',
  subtypes: [
    {
      id: 'meningitis-adulto-joven',
      name: '<50 años sin comorbilidades (S. pneumoniae, N. meningitidis)',
      context: 'Adulto sano. Fiebre, cefalea intensa, rigidez de nuca, fotofobia.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona + Dexametasona', dose: '2 g c/12h IV + 0,15 mg/kg c/6h IV × 4 días', route: 'IV', duration: 'Ceftriaxona 10-14 días; Dexametasona 4 días', note: '⚠️ Dexametasona ANTES o CON el antibiótico para reducir morbimortalidad (neumococo)' },
          { drug: 'Cefotaxima', dose: '2 g c/4-6h', route: 'IV', duration: '10-14 días', note: 'Alternativa a Ceftriaxona' }
        ],
        secondLine: [
          { drug: '+ Vancomicina', dose: '15-20 mg/kg c/8-12h', route: 'IV', duration: 'Hasta descartar resistencia', note: 'Añadir si S. pneumoniae resistente a penicilina (PRP) probable o regional frecuente' }
        ],
        allergyAlternatives: [
          { drug: 'Meropenem', allergyTo: 'cefalosporinas', dose: '2 g c/8h', route: 'IV', duration: '10-14 días' },
          { drug: 'Cloranfenicol', allergyTo: 'β-lactámicos (alergia severa)', dose: '1 g c/6h', route: 'IV', duration: '10-14 días' }
        ],
        notes: '🚨 NO demorar antibiótico si TC no disponible en <30 min. Hemocultivos x2 antes, luego antibiótico inmediato. PL tras TC si existe focalidad, papiledema o inmunosupresión.',
        source: 'IDSA 2004 · ESCMID 2016 · Sanford Guide 2024'
      }
    },
    {
      id: 'meningitis-mayor-50',
      name: '>50 años / Inmunosuprimido (añadir Listeria)',
      context: 'Listeria monocytogenes es resistente a cefalosporinas. Edad >50, embarazo, trasplante, alcohol, corticoides.',
      treatment: {
        firstLine: [
          { drug: 'Ampicilina + Ceftriaxona + Dexametasona', dose: '2 g c/4h + 2 g c/12h + 0,15 mg/kg c/6h', route: 'IV', duration: 'Ampicilina 21 días (Listeria) / Ceftriaxona 10-14 días', note: 'Ampicilina cubre Listeria; Ceftriaxona cubre neumococo y meningococo' }
        ],
        secondLine: [
          { drug: '+ Vancomicina', dose: '15-20 mg/kg c/8-12h', route: 'IV', duration: 'Hasta antibiograma', note: 'Si S. pneumoniae resistente probable' }
        ],
        allergyAlternatives: [
          { drug: 'TMP/SMX + Meropenem', allergyTo: 'Ampicilina (Listeria)', dose: '5 mg/kg c/6-12h + 2 g c/8h', route: 'IV', duration: '21 días + 10-14 días' }
        ],
        notes: 'TMP/SMX es la alternativa a ampicilina si alergia a penicilina. Listeria es resistente a TODAS las cefalosporinas.',
        source: 'IDSA 2004 · ESCMID 2016 · Sanford Guide 2024'
      }
    },
    {
      id: 'meningitis-posquirurgica',
      name: 'Posquirúrgica / Dispositivo (derivación, shunt)',
      context: 'Postcirugía SNC, derivación ventricular, trauma craneal. S. aureus, Gram-, S. epidermidis.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Cefepima', dose: '15-20 mg/kg c/8-12h + 2 g c/8h', route: 'IV', duration: '10-21 días según microorganismo' },
          { drug: 'Vancomicina + Meropenem', dose: '15-20 mg/kg c/8-12h + 2 g c/8h', route: 'IV', duration: '10-21 días', note: 'Si Gram- MDR o Pseudomonas riesgo' }
        ],
        secondLine: [
          { drug: '+ Rifampicina', dose: '600 mg/día', route: 'IV/VO', duration: 'Igual que antibiótico base', note: 'Añadir a Vancomicina en S. aureus por mejor penetración SNC' }
        ],
        allergyAlternatives: [
          { drug: 'Linezolid + Aztreonam', allergyTo: 'Vancomicina/cefalosporinas', dose: '600 mg c/12h + 2 g c/8h', route: 'IV', duration: '10-21 días' }
        ],
        notes: 'Retirar o externalizar derivación/dispositivo SIEMPRE. Cultivo de LCR a través de la derivación. Considertar vancomicina intratecal (10-20 mg/día) si falta de respuesta.',
        source: 'IDSA 2004 · ESCMID 2016 · Sanford Guide 2024'
      }
    }
  ]
},

// ════════════════════════════════════════════
// CARDIOVASCULAR / SISTÉMICO
// ════════════════════════════════════════════
{
  id: 'endocarditis',
  name: 'Endocarditis Infecciosa (EI)',
  aliases: ['endocarditis', 'valvula', 'bacteriemia staph', 'válvula protésica', 'pve', 'nve', 'streptococcus valvula', 'viridans'],
  category: 'Cardiovascular',
  icon: '🫀',
  subtypes: [
    {
      id: 'ei-vn-streptococcus',
      name: 'Válvula Nativa — Streptococcus (viridans, bovis)',
      context: 'Streptococcus mitis, oralis, sanguinis, bovis. CMI penicilina ≤0,125 mg/L (muy sensible).',
      treatment: {
        firstLine: [
          { drug: 'Penicilina G', dose: '12-18 MU/día infusión continua', route: 'IV', duration: '4 semanas (con aminoglucósido: 2 semanas)' },
          { drug: 'Ceftriaxona', dose: '2 g/día', route: 'IV', duration: '4 semanas', note: 'Opción de pauta corta: Ceftriaxona + Gentamicina 2 semanas' }
        ],
        secondLine: [
          { drug: 'Amoxicilina', dose: '200 mg/kg/día en infusión continua o fraccionado', route: 'IV', duration: '4 semanas' }
        ],
        allergyAlternatives: [
          { drug: 'Vancomicina', allergyTo: 'β-lactámicos', dose: '15-20 mg/kg c/12h', route: 'IV', duration: '4 semanas' }
        ],
        notes: 'Pautas de 2 semanas (Ceftriaxona + Gentamicina) solo en Streptococcus muy sensibles sin complicaciones. Siempre ETE para descartar absceso.',
        source: 'ESC 2023 · AHA 2023 · Sanford Guide 2024'
      }
    },
    {
      id: 'ei-vn-staphylococcus',
      name: 'Válvula Nativa — Staphylococcus aureus',
      context: 'S. aureus: alta morbimortalidad. EI derecha (ADVP) o izquierda. MSSA vs MRSA clave.',
      treatment: {
        firstLine: [
          { drug: 'Cloxacilina (MSSA)', dose: '2 g c/4h', route: 'IV', duration: '4-6 semanas', note: 'Superior a Vancomicina en MSSA. No añadir Gentamicina de rutina (nefrotóxico sin beneficio).' },
          { drug: 'Vancomicina (MRSA)', dose: '15-20 mg/kg c/8-12h (objetivo AUC 400-600)', route: 'IV', duration: '4-6 semanas' }
        ],
        secondLine: [
          { drug: 'Daptomicina (MRSA EI izquierda)', dose: '8-12 mg/kg/día', route: 'IV', duration: '4-6 semanas', note: '⚠️ No usar en EI pulmonar (inactivado por surfactante)' },
          { drug: 'Cefazolina (MSSA, alergia no grave a penicilina)', dose: '2 g c/8h', route: 'IV', duration: '4-6 semanas' }
        ],
        allergyAlternatives: [
          { drug: 'Daptomicina', allergyTo: 'β-lactámicos (MSSA)', dose: '8-12 mg/kg/día', route: 'IV', duration: '4-6 semanas' }
        ],
        notes: 'Cirugía urgente si: vegetación >10 mm + embolismo, IC por disfunción valvular, absceso, o fallo antibiótico. ETE obligatorio. S. aureus bacteriemia → siempre ecocardiograma.',
        source: 'ESC 2023 · AHA 2023 · Sanford Guide 2024'
      }
    },
    {
      id: 'ei-valvula-protesica',
      name: 'Válvula Protésica (PVE)',
      context: 'Early PVE (<12 meses): S. epidermidis, S. aureus, Gram-. Late PVE (>12m): similar a VN.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Rifampicina + Gentamicina (Early PVE)', dose: '15-20 mg/kg c/12h + 300-450 mg c/8-12h VO + 1 mg/kg c/8h', route: 'IV + VO + IV', duration: '≥6 semanas', note: 'Gentamicina solo las 2 primeras semanas' },
          { drug: 'Régimen según microorganismo (Late PVE)', dose: 'Similar a EI de válvula nativa + Rifampicina', route: 'IV', duration: '≥6 semanas' }
        ],
        secondLine: [
          { drug: 'Cloxacilina + Rifampicina + Gentamicina (PVE MSSA)', dose: '2 g c/4h + 300-450 mg c/12h + 1 mg/kg c/8h', route: 'IV + VO + IV', duration: '≥6 semanas' }
        ],
        allergyAlternatives: [
          { drug: 'Daptomicina + Rifampicina', allergyTo: 'β-lactámicos + Vancomicina intolerancia', dose: '8-12 mg/kg/día + 300-450 mg c/12h', route: 'IV + VO', duration: '≥6 semanas' }
        ],
        notes: 'Rifampicina SIEMPRE en PVE (biofilm). Iniciarla a las 5-7 días (fase bacteriémica) para evitar selección de resistencias. Cirugía frecuentemente necesaria. Equipo multidisciplinar (Endocarditis Team).',
        source: 'ESC 2023 · AHA 2023 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'sepsis-shock-septico',
  name: 'Sepsis / Shock Séptico',
  aliases: ['sepsis', 'shock septico', 'shock', 'bacteriemia', 'septicemia', 'sofa', 'qsofa', 'sepsis grave', 'uci'],
  category: 'Cardiovascular',
  icon: '🚨',
  subtypes: [
    {
      id: 'sepsis-respiratoria',
      name: 'Foco Respiratorio',
      context: 'Sepsis con origen pulmonar probable. Infiltrado en Rx/TC.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam + Azitromicina', dose: '4,5 g c/6h + 500 mg/día', route: 'IV', duration: '7-10 días' },
          { drug: 'Meropenem + Azitromicina', dose: '1-2 g c/8h + 500 mg/día', route: 'IV', duration: '7-10 días', note: 'Si MDR riesgo, ESBL previo, o HAP/VAP' }
        ],
        secondLine: [
          { drug: '+ Vancomicina o Linezolid', dose: 'Dosis habituales', route: 'IV', duration: 'Hasta desescalada', note: 'Si MRSA riesgo: gripe previa, MRSA previo, VM >5d' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Levofloxacino', allergyTo: 'β-lactámicos', dose: '2 g c/8h + 750 mg/día', route: 'IV', duration: '7-10 días' }
        ],
        notes: 'Antibiótico en la PRIMERA HORA del reconocimiento de la sepsis (SSC 2021). Hemocultivos x2 antes. Lactato sérico. Bundle de sepsis: fluidos, antibiótico, cultivos.',
        source: 'SSC 2021 · Sanford Guide 2024'
      }
    },
    {
      id: 'sepsis-urinaria',
      name: 'Foco Urinario (Urosepsis)',
      context: 'Sepsis de origen urinario. Pielonefritis, prostatitis, CAUTI.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona', dose: '2 g/día', route: 'IV', duration: '7-14 días', note: 'Desescalar a VO según antibiograma en 48-72h' },
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6h', route: 'IV', duration: '7-14 días', note: 'Si MDR riesgo, antibióticos previos, hospital reciente' }
        ],
        secondLine: [
          { drug: 'Ertapenem', dose: '1 g/día', route: 'IV', duration: '7-14 días', note: 'Si ESBL confirmada o alta sospecha' },
          { drug: 'Meropenem', dose: '1 g c/8h', route: 'IV', duration: '7-14 días', note: 'Reservar para KPC o fracaso terapéutico' }
        ],
        allergyAlternatives: [
          { drug: 'Amikacina + Aztreonam', allergyTo: 'β-lactámicos', dose: '15-20 mg/kg/día + 2 g c/8h', route: 'IV', duration: '7-14 días' }
        ],
        notes: 'Retirar/cambiar sonda vesical. Descartar obstrucción urológica (eco urgente). Desescalada obligatoria a las 48-72h según antibiograma.',
        source: 'SSC 2021 · EAU 2024 · Sanford Guide 2024'
      }
    },
    {
      id: 'sepsis-abdominal',
      name: 'Foco Abdominal',
      context: 'Sepsis de origen intraabdominal. Peritonitis, absceso, colecistitis, pancreatitis infectada.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6h', route: 'IV', duration: '7-14 días' },
          { drug: 'Meropenem', dose: '1-2 g c/8h', route: 'IV', duration: '7-14 días', note: 'Si MDR riesgo, ESBL previo, peritonitis posquirúrgica' }
        ],
        secondLine: [
          { drug: '+ Fluconazol o Micafungina', dose: '400 mg/día / 100 mg/día', route: 'IV', duration: 'Según cultivos', note: 'Si Candida riesgo: NPT, inmunosupresión, cirugía GI recurrente, hemocultivos previos con Candida' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Metronidazol + Vancomicina', allergyTo: 'β-lactámicos', dose: '2 g c/8h + 500 mg c/8h + 15 mg/kg c/12h', route: 'IV', duration: '7-14 días' }
        ],
        notes: 'Control del foco URGENTE. Sin drenaje/cirugía: los antibióticos son insuficientes. Duración guiada por PCT y respuesta clínica (mínima necesaria).',
        source: 'SSC 2021 · WSES 2021 · Sanford Guide 2024'
      }
    },
    {
      id: 'sepsis-sin-foco',
      name: 'Sin Foco Identificado',
      context: 'Sepsis sin origen claro. Cobertura empírica amplia hasta identificar microorganismo.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam + Vancomicina', dose: '4,5 g c/6h + 15-20 mg/kg c/12h', route: 'IV', duration: 'Desescalar en 48-72h' },
          { drug: 'Meropenem + Vancomicina', dose: '1-2 g c/8h + 15-20 mg/kg c/12h', route: 'IV', duration: 'Hasta identificar foco', note: 'Si MDR riesgo o fracaso previo' }
        ],
        secondLine: [
          { drug: '+ Micafungina', dose: '100 mg/día', route: 'IV', duration: 'Según hemocultivos', note: 'Si Candida riesgo: NPT, inmunosupresión, colonización previa, antibióticos prolongados' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Metronidazol + Vancomicina + Antifúngico', allergyTo: 'β-lactámicos', dose: 'Dosis habituales', route: 'IV', duration: 'Hasta identificar foco' }
        ],
        notes: 'Hemocultivos x2 + urocultivo + Rx tórax + TAC si precisa. Desescalar SIEMPRE en 48-72h. PCT para guiar duración. Duración total mínima eficaz (habitualmente 7-10 días).',
        source: 'SSC 2021 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'candidemia',
  name: 'Candidemia / Infección Fúngica Invasiva',
  aliases: ['candidemia', 'candida', 'hongos', 'fungemia', 'micafungina', 'anidulafungina', 'voriconazol', 'aspergilosis'],
  category: 'Cardiovascular',
  icon: '🦠',
  subtypes: [
    {
      id: 'candidemia-no-neutropenico',
      name: 'Candidemia — No Neutropénico',
      context: 'Candida en hemocultivo. NPT, catéter central, antibióticos prolongados, cirugía GI, UCI prolongada.',
      treatment: {
        firstLine: [
          { drug: 'Micafungina', dose: '100 mg/día', route: 'IV', duration: 'Mínimo 14 días desde 1er hemocultivo negativo' },
          { drug: 'Anidulafungina', dose: '200 mg día 1 → 100 mg/día', route: 'IV', duration: 'Mínimo 14 días desde 1er hemocultivo negativo' }
        ],
        secondLine: [
          { drug: 'Fluconazol', dose: '800 mg carga → 400 mg/día', route: 'IV/VO', duration: '14+ días', note: 'Solo si C. albicans probable, sin azoles previos, paciente estable' }
        ],
        allergyAlternatives: [
          { drug: 'Caspofungina', allergyTo: 'Micafungina/Anidulafungina', dose: '70 mg carga → 50 mg/día', route: 'IV', duration: '14+ días' }
        ],
        notes: '⚠️ Retirar catéter central si posible. Fondo de ojo obligatorio (endoftalmitis). Ecocardiograma transtorácico. Escalar a Fluconazol VO al mejorar si C. albicans sensible.',
        source: 'IDSA 2016 · ESCMID 2012 · Sanford Guide 2024'
      }
    },
    {
      id: 'candidemia-neutropenico',
      name: 'Candidemia — Neutropénico / Inmunodeprimido',
      context: 'Hemato-oncológico, trasplante, neutropenia prolongada. Mayor riesgo de C. krusei, C. glabrata.',
      treatment: {
        firstLine: [
          { drug: 'Micafungina', dose: '100-150 mg/día', route: 'IV', duration: '≥14 días desde 1er hemocultivo negativo + recuperación neutropenia' },
          { drug: 'Caspofungina', dose: '70 mg carga → 50 mg/día', route: 'IV', duration: '≥14 días desde 1er hemocultivo negativo' }
        ],
        secondLine: [
          { drug: 'Voriconazol', dose: '400 mg c/12h × 2 dosis → 200 mg c/12h', route: 'IV/VO', duration: '≥14 días', note: 'Si C. krusei, C. glabrata, o aspergilosis concomitante probable' },
          { drug: 'Liposomal Anfotericina B', dose: '3-5 mg/kg/día', route: 'IV', duration: '≥14 días', note: 'Si resistencia a equinocandinas o toxicidad' }
        ],
        allergyAlternatives: [
          { drug: 'Liposomal Anfotericina B', allergyTo: 'Equinocandinas y azoles', dose: '3-5 mg/kg/día', route: 'IV', duration: '≥14 días' }
        ],
        notes: 'Añadir cobertura empírica fúngica si fiebre persistente >4 días con neutropenia. Buscar siempre foco profundo (TAC tórax, abdomen, senos). Escalar a VO si estabilidad.',
        source: 'IDSA 2016 · ESCMID 2012 · Sanford Guide 2024'
      }
    }
  ]
},

// ════════════════════════════════════════════
// ITS
// ════════════════════════════════════════════
{
  id: 'its',
  name: 'Infecciones de Transmisión Sexual (ITS)',
  aliases: ['its', 'gonorrea', 'sifilis', 'clamidia', 'chlamydia', 'gonococia', 'herpes genital', 'vhs', 'ets'],
  category: 'ITS',
  icon: '🩺',
  subtypes: [
    {
      id: 'its-gonorrea',
      name: 'Gonorrea (Neisseria gonorrhoeae)',
      context: 'Uretritis, cervicitis, proctitis, faringitis gonocócica. Resistencia a fluoroquinolonas frecuente.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona', dose: '500 mg (≤150 kg) / 1 g (>150 kg)', route: 'IM/IV', duration: 'Dosis única', note: '+ Doxiciclina 100 mg c/12h VO × 7d si no se ha descartado Chlamydia concomitante' }
        ],
        secondLine: [
          { drug: 'Cefixima', dose: '800 mg', route: 'VO', duration: 'Dosis única', note: 'Solo si no disponible ceftriaxona IM. Menor eficacia en faringe.' }
        ],
        allergyAlternatives: [
          { drug: 'Gentamicina + Azitromicina', allergyTo: 'cefalosporinas', dose: '240 mg IM + 2 g VO', route: 'IM + VO', duration: 'Dosis única ambas' },
          { drug: 'Espectinomicina', allergyTo: 'cefalosporinas', dose: '2 g IM', route: 'IM', duration: 'Dosis única', note: 'No disponible en todos los países; no efectiva en faringe' }
        ],
        notes: '⚠️ NO usar fluoroquinolonas (resistencia >20% en muchas regiones). Siempre tratar Chlamydia concomitante. Notificación obligatoria y rastreo de contactos.',
        source: 'CDC 2021 · ECDC 2023 · Sanford Guide 2024'
      }
    },
    {
      id: 'its-sifilis',
      name: 'Sífilis (Treponema pallidum)',
      context: 'Primaria (chancro), Secundaria (exantema), Latente (temprana <1año / tardía >1año), Neurosífilis.',
      treatment: {
        firstLine: [
          { drug: 'Bencilpenicilina benzatina (Primaria/Secundaria/Latente temprana)', dose: '2,4 MU', route: 'IM', duration: 'Dosis única' },
          { drug: 'Bencilpenicilina benzatina (Latente tardía/Cardiovascular)', dose: '2,4 MU semanal × 3 semanas', route: 'IM', duration: '3 semanas' },
          { drug: 'Penicilina G IV (Neurosífilis)', dose: '18-24 MU/día en infusión continua o 3-4 MU c/4h', route: 'IV', duration: '10-14 días' }
        ],
        secondLine: [
          { drug: 'Doxiciclina (Primaria/Secundaria, alergia penicilina)', dose: '100 mg c/12h', route: 'VO', duration: '14 días (primaria) / 28 días (latente)' }
        ],
        allergyAlternatives: [
          { drug: 'Doxiciclina', allergyTo: 'Penicilina', dose: '100 mg c/12h', route: 'VO', duration: '14-28 días según estadio', note: '⚠️ En embarazo: desensibilización a penicilina. Doxiciclina contraindicada en embarazo.' }
        ],
        notes: 'Reacción de Jarisch-Herxheimer es frecuente en las primeras 24h (fiebre, escalofríos, cefalea) — no es alergia. Control serológico (VDRL/RPR) a los 3, 6 y 12 meses.',
        source: 'CDC 2021 · ECDC 2023 · Sanford Guide 2024'
      }
    },
    {
      id: 'its-clamidia',
      name: 'Clamidia (Chlamydia trachomatis)',
      context: 'Uretritis, cervicitis, proctitis, linfogranuloma venéreo (LGV). Frecuente coinfección con gonorrea.',
      treatment: {
        firstLine: [
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '7 días (uretritis/cervicitis) · 21 días (LGV/proctitis)' }
        ],
        secondLine: [
          { drug: 'Azitromicina', dose: '1 g', route: 'VO', duration: 'Dosis única', note: 'Menor eficacia que Doxiciclina, especialmente en infección rectal. Usar si adherencia dudosa.' }
        ],
        allergyAlternatives: [
          { drug: 'Azitromicina', allergyTo: 'Doxiciclina (embarazo)', dose: '1 g', route: 'VO', duration: 'Dosis única', note: 'En embarazo: Doxiciclina contraindicada → Azitromicina' },
          { drug: 'Amoxicilina', allergyTo: 'Ambas (embarazo)', dose: '500 mg c/8h', route: 'VO', duration: '7 días' }
        ],
        notes: 'Abstinencia hasta 7 días post-tratamiento y cura de la pareja. Notificación y rastreo de contactos. Repetir cribado a los 3 meses.',
        source: 'CDC 2021 · ECDC 2023 · Sanford Guide 2024'
      }
    },
    {
      id: 'its-herpes-genital',
      name: 'Herpes Genital (VHS-1 / VHS-2)',
      context: 'Vesículas dolorosas genitales/perianales. Primer episodio o recurrente.',
      treatment: {
        firstLine: [
          { drug: 'Valaciclovir (1er episodio)', dose: '1 g c/12h', route: 'VO', duration: '7-10 días' },
          { drug: 'Valaciclovir (recurrente)', dose: '500 mg c/12h', route: 'VO', duration: '3-5 días', note: 'Iniciar al 1er síntoma/pródromos' },
          { drug: 'Valaciclovir (supresor ≥6 episodios/año)', dose: '500 mg/día', route: 'VO', duration: 'Crónico (revisión anual)' }
        ],
        secondLine: [
          { drug: 'Aciclovir', dose: '400 mg c/8h', route: 'VO', duration: '7-10 días (1er ep.) / 2-5 días (recurrente)' }
        ],
        allergyAlternatives: [
          { drug: 'Famciclovir', allergyTo: 'Valaciclovir/Aciclovir (intolerancia)', dose: '250 mg c/8h', route: 'VO', duration: '7-10 días' },
          { drug: 'Aciclovir IV', allergyTo: 'Grave/inmunodeprimido', dose: '5-10 mg/kg c/8h', route: 'IV', duration: '5-7 días', note: 'Inmunodeprimidos, encefalitis, diseminada' }
        ],
        notes: 'El herpes genital es crónico e incurable. El tratamiento supresor reduce transmisión en pareja ~50%. Informar de asintomáticos con capacidad de transmisión.',
        source: 'CDC 2021 · IUSTI 2023 · Sanford Guide 2024'
      }
    }
  ]
},

// ════════════════════════════════════════════
// ESPECIALES
// ════════════════════════════════════════════
{
  id: 'tuberculosis',
  name: 'Tuberculosis Pulmonar Activa',
  aliases: ['tuberculosis', 'tb', 'tbc', 'bacilo de koch', 'mycobacterium', 'bk', 'esputo baar', 'isoniazida', 'rifampicina'],
  category: 'Respiratorio',
  icon: '🫁',
  subtypes: [
    {
      id: 'tb-fase-intensiva',
      name: 'Fase Intensiva (primeros 2 meses) — Esquema HRZE',
      context: 'TB pulmonar activa, baciloscopia positiva o cultivo positivo. Sin resistencias conocidas.',
      treatment: {
        firstLine: [
          { drug: 'Isoniacida (H) + Rifampicina (R) + Pirazinamida (Z) + Etambutol (E)', dose: 'H: 5 mg/kg/día (máx 300 mg) · R: 10 mg/kg/día (máx 600 mg) · Z: 25 mg/kg/día · E: 15-20 mg/kg/día', route: 'VO', duration: '2 meses', note: '+ Piridoxina (B6) 25-50 mg/día para prevenir neuropatía por isoniacida' }
        ],
        secondLine: [
          { drug: 'Esquemas de presentación fija combinada', dose: 'Rimstar 4-FDC u otros FDC según peso', route: 'VO', duration: '2 meses', note: 'Mejoría de adherencia con combinaciones fijas (OMS recomendada)' }
        ],
        allergyAlternatives: [
          { drug: 'Moxifloxacino o Levofloxacino (si intolerancia a isoniacida o pirazinamida)', allergyTo: 'H o Z', dose: '400 mg/día / 750 mg/día', route: 'VO', duration: 'Individualizado', note: 'Modificar esquema con especialista en TB' }
        ],
        notes: '⚠️ VIGILAR: hepatotoxicidad (H, R, Z) → transaminasas basales; neuritis óptica (E) → agudeza visual basal; hiperuricemia (Z). DOT (tratamiento directamente observado) recomendado. Declaración obligatoria.',
        source: 'OMS 2022 · SEPAR 2023 · Sanford Guide 2024'
      }
    },
    {
      id: 'tb-fase-consolidacion',
      name: 'Fase de Consolidación (meses 3-6) — Esquema HR',
      context: 'Continuación tras completar fase intensiva con buena respuesta. Baciloscopia negativa.',
      treatment: {
        firstLine: [
          { drug: 'Isoniacida (H) + Rifampicina (R)', dose: 'H: 5 mg/kg/día (máx 300 mg) · R: 10 mg/kg/día (máx 600 mg)', route: 'VO', duration: '4 meses (total: 6 meses)', note: '+ Piridoxina (B6) continuar' }
        ],
        secondLine: [
          { drug: 'Extender a 9 meses (HR × 7 meses)', dose: 'Igual', route: 'VO', duration: '7 meses', note: 'Si cavernación persistente, baciloscopia positiva al mes 2, o inmunodepresión' },
          { drug: 'Régimen corto 4 meses (2HRZE/2HRE)', dose: 'Mismas dosis que fase intensiva', route: 'VO', duration: '4 meses totales', note: 'WHO 2022: opción válida en TB pulmonar no grave, sin cavernación, sin inmunodepresión — solo adultos. Requiere confirmación de sensibilidad.' }
        ],
        allergyAlternatives: [
          { drug: 'Derivar a Unidad TB — TB MDR/XDR', allergyTo: 'múltiples fármacos o resistencia', dose: 'Esquemas individualizados (BPaLM, Bedaquilina, Linezolid)', route: 'VO', duration: '6-24 meses según esquema' }
        ],
        notes: 'Cultivo de control al mes 2. Si positivo → extender o cambiar esquema. TB MDR → ver subtype específico. Siempre con especialista.',
        source: 'WHO 2022 · SEPAR 2023 · Sanford Guide 2024'
      }
    },
    {
      id: 'tb-mdr-xdr',
      name: 'TB-MDR / TB-XDR — Resistencia a Isoniacida + Rifampicina',
      context: 'Resistencia confirmada a H+R (MDR-TB) o adicional a fluoroquinolonas (pre-XDR/XDR-TB). Derivar siempre a Unidad de TB. Tratamiento individualizado.',
      treatment: {
        firstLine: [
          { drug: 'BPaLM: Bedaquilina + Pretomanid + Linezolid + Moxifloxacino', dose: 'Bedaquilina: 400 mg/día × 2 sem → 200 mg 3×/semana · Pretomanid: 200 mg/día · Linezolid: 600 mg/día · Moxifloxacino: 400 mg/día', route: 'VO', duration: '6 meses', note: 'Régimen WHO 2022 preferido para MDR-TB. Moxifloxacino solo si fluoroquinolonas sensibles (no pre-XDR/XDR).' }
        ],
        secondLine: [
          { drug: 'BPaL: Bedaquilina + Pretomanid + Linezolid', dose: 'Sin moxifloxacino si resistencia a fluoroquinolonas confirmada (pre-XDR/XDR-TB)', route: 'VO', duration: '6 meses', note: 'Linezolid puede reducirse a 300 mg/día si toxicidad hematológica (anemia, trombocitopenia).' }
        ],
        allergyAlternatives: [
          { drug: 'Clofazimina + Bedaquilina + Linezolid + Cicloserina', allergyTo: 'Moxifloxacino / Pretomanid no disponible', dose: 'Esquemas de rescate individualizados según antibiograma molecular', route: 'VO', duration: '18-24 meses' }
        ],
        notes: '⚠️ VIGILAR QTc (bedaquilina + moxifloxacino prolongan QT — ECG semanal el primer mes). Linezolid: hemograma semanal (trombocitopenia, anemia, neuropatía). Declaración obligatoria. Manejo SIEMPRE con especialista en TB / unidad de referencia.',
        source: 'WHO 2022 (Consolidated Guidelines on TB) · SEPAR 2023 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'covid19-grave',
  name: 'COVID-19 Grave / Crítico',
  aliases: ['covid', 'covid19', 'coronavirus', 'sars', 'sars-cov2', 'paxlovid', 'nirmatrelvir', 'remdesivir', 'dexametasona'],
  category: 'Respiratorio',
  icon: '🦠',
  subtypes: [
    {
      id: 'covid-antiviral',
      name: 'Enfermedad Temprana — Alto Riesgo (Antiviral, <5-7 días)',
      context: 'Síntomas ≤5-7 días. Factores de riesgo: >65a, inmunodepresión, enfermedad crónica, obesidad. No requiere O₂.',
      treatment: {
        firstLine: [
          { drug: 'Nirmatrelvir/Ritonavir (Paxlovid)', dose: '300/100 mg c/12h', route: 'VO', duration: '5 días', note: 'Ajustar si eGFR 30-60 ml/min: 150/100 mg c/12h. Contraindicado si eGFR <30. ⚠️ Múltiples interacciones por CYP3A4.' },
          { drug: 'Remdesivir', dose: '200 mg IV día 1 → 100 mg/día', route: 'IV', duration: '3 días (ambulatorio)', note: 'Alternativa si no tolera o contraindicación a Paxlovid' }
        ],
        secondLine: [
          { drug: 'Molnupiravir', dose: '800 mg c/12h', route: 'VO', duration: '5 días', note: 'Menor eficacia que Paxlovid. NO usar en embarazo (mutagénico).' }
        ],
        allergyAlternatives: [
          { drug: 'Remdesivir IV', allergyTo: 'Nirmatrelvir/Ritonavir', dose: '200 mg → 100 mg/día', route: 'IV', duration: '3-5 días' }
        ],
        notes: '⚠️ Verificar interacciones de Nirmatrelvir/Ritonavir (estatinas, anticoagulantes, inmunosupresores, antiarrítmicos). Inicio ANTES de 5 días desde síntomas. Mayor beneficio en las primeras 72h.',
        source: 'IDSA 2024 · NIH COVID-19 Treatment Guidelines 2024 · Sanford Guide 2024'
      }
    },
    {
      id: 'covid-inmunomodulador',
      name: 'Hospitalizado con Hipoxia — Inmunomodulador (requiere O₂)',
      context: 'SpO₂ <94% respirando aire ambiente. Hospitalizado. Fase inflamatoria (habitualmente ≥7-10 días de síntomas).',
      treatment: {
        firstLine: [
          { drug: 'Dexametasona', dose: '6 mg/día', route: 'IV/VO', duration: '10 días o hasta alta', note: '⚠️ Solo si requiere O₂ o ventilación mecánica. NO usar si no hay hipoxia (perjudicial en fase temprana).' }
        ],
        secondLine: [
          { drug: '+ Baricitinib', dose: '4 mg/día', route: 'VO', duration: '14 días', note: 'Inhibidor JAK1/2. Añadir si progresión rápida con O₂ de alto flujo o VM. ACTT-2 y COV-BARRIER.' },
          { drug: '+ Tocilizumab', dose: '8 mg/kg IV (máx 800 mg)', route: 'IV', duration: 'Dosis única (repetir en 12-24h si precisa)', note: 'Anti-IL-6. Si marcadores inflamatorios muy elevados (PCR >75 mg/L, IL-6 alta). No combinar con Baricitinib.' }
        ],
        allergyAlternatives: [
          { drug: 'Hidrocortisona', allergyTo: 'Dexametasona (intolerancia)', dose: '200 mg/día infusión continua', route: 'IV', duration: '7 días' }
        ],
        notes: 'Remdesivir (5 días IV) puede añadirse en los primeros 10 días de síntomas si requiere O₂ suplementario sin VM. Anticoagulación profiláctica (HBPM) obligatoria en hospitalizados. Pronación si PaO₂/FiO₂ <150.',
        source: 'IDSA 2024 · NIH COVID-19 2024 · WHO SOLIDARITY 2024 · Sanford Guide 2024'
      }
    }
  ]
},

// ════════════════════════════════════════════
// AMPLIACIÓN
// ════════════════════════════════════════════
{
  id: 'absceso-pulmonar',
  name: 'Absceso Pulmonar',
  aliases: ['absceso pulmonar', 'absceso pulmón', 'absceso pulmonar bacteriano', 'neumonia necrotizante', 'pulmón absceso', 'empiema pleural', 'empiema'],
  category: 'Respiratorio',
  icon: '🫁',
  subtypes: [
    {
      id: 'absceso-pulmonar-primario',
      name: 'Primario — Sin inmunosupresión (aspiración, anaerobios)',
      context: 'Asociado a aspiración, mala higiene dental, alteración de consciencia. Anaerobios orales predominantes.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '1g/200mg c/8h', route: 'IV → VO 875/125mg c/12h', duration: '4-6 semanas total', note: 'Estándar de referencia. Cobertura anaerobios + S. aureus MS' },
          { drug: 'Clindamicina', dose: '600 mg c/8h', route: 'IV → 300mg c/8h VO', duration: '4-6 semanas total', note: 'Histórico de referencia para anaerobios; inferior a amox-clav en algunos estudios' }
        ],
        secondLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: '4-6 semanas', note: 'Si mala respuesta o absceso de gran tamaño' },
          { drug: 'Metronidazol', dose: '500 mg c/8h', route: 'IV/VO', duration: '4-6 semanas', note: 'Siempre combinar con β-lactámico — metronidazol solo es insuficiente (no cubre Streptococcus microaerófilos)' }
        ],
        allergyAlternatives: [
          { drug: 'Meropenem', allergyTo: 'β-lactámicos (alergia severa)', dose: '1g c/8h', route: 'IV', duration: '4-6 semanas' }
        ],
        notes: 'Duración mínima 4-6 semanas (hasta resolución radiológica ≥50%). Drenaje percutáneo si >6 cm o no respuesta a 7-10 días. Broncoscopia si sospecha de cuerpo extraño u obstrucción.',
        source: 'ATS · IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'absceso-pulmonar-secundario',
      name: 'Secundario — Inmunosuprimido o riesgo de MDR/S. aureus',
      context: 'Inmunodeprimido, postobstructivo, S. aureus (especialmente post-influenza), Klebsiella pneumoniae (alcoholismo).',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: '6-8 semanas', note: 'Amplia cobertura incluida Klebsiella y Gram-negativos' },
          { drug: 'Vancomicina', dose: '15-20 mg/kg c/12h', route: 'IV', duration: '6-8 semanas', note: 'Añadir si sospecha S. aureus MRSA (post-influenza, adicto a drogas IV, hemodiálisis)' }
        ],
        secondLine: [
          { drug: 'Linezolid', dose: '600 mg c/12h', route: 'IV/VO', duration: '6-8 semanas', note: 'Alternativa a vancomicina en MRSA con buena penetración pulmonar' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Clindamicina', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Aztreonam 2g c/8h + Clinda 600mg c/8h', route: 'IV', duration: '6-8 semanas' }
        ],
        notes: 'En Klebsiella pneumoniae: Ceftriaxona 2g/d IV como alternativa si sensible. Alta mortalidad en inmunodeprimidos — control TC a las 2-4 semanas. Considerar fúngico (Aspergillus) si neutropénico.',
        source: 'ATS · IDSA · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'prostatitis-aguda',
  name: 'Prostatitis Bacteriana Aguda',
  aliases: ['prostatitis', 'prostata', 'próstata', 'prostatitis aguda', 'prostatitis bacteriana', 'prostate', 'disuria hombre', 'itu hombre fiebre'],
  category: 'Urológico',
  icon: '🫀',
  subtypes: [
    {
      id: 'prostatitis-aguda-leve',
      name: 'Leve-Moderada — Ambulatoria',
      context: 'Síndrome miccional + fiebre + dolor perineal. Sin urosepsis. PSA elevado (no biopsiar hasta resolver).',
      treatment: {
        firstLine: [
          { drug: 'Ciprofloxacino', dose: '500 mg c/12h', route: 'VO', duration: '4 semanas', note: 'Excelente penetración prostática. Primera elección si resistencia local <10%' },
          { drug: 'Levofloxacino', dose: '500 mg/día', route: 'VO', duration: '4 semanas' }
        ],
        secondLine: [
          { drug: 'TMP/SMX', dose: '160/800 mg c/12h', route: 'VO', duration: '4 semanas', note: 'Solo si sensible en antibiograma; penetración prostática aceptable' },
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '4 semanas', note: 'Si Chlamydia trachomatis coinfección sospechada (<35 años)' }
        ],
        allergyAlternatives: [
          { drug: 'Azitromicina', allergyTo: 'Fluoroquinolonas + TMP/SMX', dose: '500 mg/día', route: 'VO', duration: '4 semanas', note: 'Solo si Chlamydia confirmada; cobertura Gram- insuficiente solo con azitromicina' }
        ],
        notes: 'Duración mínima 4 semanas (riesgo de cronicidad si tratamiento corto). Alfa-bloqueantes (tamsulosina) como coadyuvante para aliviar síntomas miccionales. Si retención urinaria: sondaje suprapúbico (NO transuretral).',
        source: 'EAU Guidelines 2024 · Sanford Guide 2024'
      }
    },
    {
      id: 'prostatitis-aguda-grave',
      name: 'Grave — Urosepsis o Retención Urinaria',
      context: 'Fiebre alta, escalofríos, retención urinaria, signos de sepsis. Ingreso hospitalario obligatorio.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona', dose: '2g/día', route: 'IV', duration: '10-14 días IV → completar 4 semanas VO', note: 'Escalada a VO con fluoroquinolona según antibiograma' },
          { drug: 'Ciprofloxacino', dose: '400 mg c/12h', route: 'IV', duration: '10-14 días IV → completar 4 semanas VO' }
        ],
        secondLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: '14 días IV', note: 'Si factores de riesgo MDR o gram-negativos resistentes' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Metronidazol', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Aztreonam 2g c/8h + Metro 500mg c/8h', route: 'IV', duration: '14 días' }
        ],
        notes: 'Hemocultivos y urocultivo ANTES del antibiótico. Desescalada según antibiograma. Drenaje quirúrgico urgente si absceso prostático (ECO/TC confirmatorio).',
        source: 'EAU Guidelines 2024 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'fiebre-neutropenica',
  name: 'Fiebre Neutropénica',
  aliases: ['fiebre neutropenica', 'neutropenia', 'neutropénico', 'quimioterapia infeccion', 'oncologia infeccion', 'mascc', 'cisca', 'neutrofilo', 'aplasia febril', 'inmunosupr fiebre'],
  category: 'Oncológico',
  icon: '🧬',
  subtypes: [
    {
      id: 'neutropenia-bajo-riesgo',
      name: 'Bajo riesgo (MASCC ≥21, neutropenia <7 días esperada)',
      context: 'Tumor sólido, neutropenia corta esperada, sin comorbilidades graves, estable hemodinámicamente.',
      treatment: {
        firstLine: [
          { drug: 'Ciprofloxacino + Amoxicilina-Clavulánico', dose: 'Cipro 500mg c/12h + AmoxClav 875/125mg c/8h', route: 'VO', duration: 'Hasta afebril ≥48h y PMN >500/µL', note: 'Tratamiento ambulatorio si cumple criterios MASCC. Revisión en 24h.' },
          { drug: 'Levofloxacino', dose: '750 mg/día', route: 'VO', duration: 'Hasta afebril ≥48h y PMN >500/µL', note: 'Monoterapia si profilaxis previa con ciprofloxacino' }
        ],
        secondLine: [
          { drug: 'Ceftriaxona + Amikacina', dose: 'Ceftriaxona 2g/d + Amikacina 15mg/kg/d', route: 'IV', duration: 'Hasta afebril ≥48h y PMN >500/µL', note: 'Si ingreso requerido o intolerancia oral' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Vancomicina', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Aztreonam 2g c/8h + Vanco 15mg/kg c/12h', route: 'IV', duration: 'Hasta criterios de resolución' }
        ],
        notes: 'Si no hay foco identificado y persiste fiebre >96h: iniciar antifúngico empírico (Caspofungina 70mg→50mg/d IV o Micafungina 100mg/d IV).',
        source: 'IDSA 2023 · ESMO · MASCC Guidelines · Sanford Guide 2024'
      }
    },
    {
      id: 'neutropenia-alto-riesgo',
      name: 'Alto riesgo (MASCC <21, neutropenia >7 días, hematológico)',
      context: 'Leucemia, linfoma, trasplante de MO. Neutropenia prolongada esperada. Ingreso obligatorio.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: 'Hasta afebril ≥48h y PMN >500/µL' },
          { drug: 'Cefepima', dose: '2g c/8h', route: 'IV', duration: 'Hasta afebril ≥48h y PMN >500/µL', note: 'Alternativa a PipTazo con cobertura anti-Pseudomonas' },
          { drug: 'Meropenem', dose: '1g c/8h', route: 'IV', duration: 'Hasta criterios resolución', note: 'Si inestabilidad hemodinámica, riesgo MDR o fallo previo' }
        ],
        secondLine: [
          { drug: '+ Vancomicina', dose: '15-20 mg/kg c/12h', route: 'IV', duration: 'Añadir si: bacteriemia por Gram+, mucositis grave, infección catéter, inestabilidad', note: 'NO empírica rutinaria — solo si indicación específica' },
          { drug: '+ Micafungina', dose: '100 mg/día', route: 'IV', duration: 'Si fiebre persiste >96h sin foco', note: 'Antifúngico empírico en neutropenia prolongada >4 días' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Metronidazol + Vancomicina', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Aztreonam 2g c/8h + Metro 500mg c/8h + Vanco 15mg/kg c/12h', route: 'IV', duration: 'Hasta criterios de resolución' }
        ],
        notes: 'Hemocultivos periférico + catéter central ANTES del antibiótico. Profilaxis anti-PCP con TMP/SMX en trasplante. Si neumonía: añadir cobertura para Aspergillus (Voriconazol o Isavuconazol).',
        source: 'IDSA 2023 · ESMO · AGIHO · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'osteomielitis',
  name: 'Osteomielitis',
  aliases: ['osteomielitis', 'osteomielítis', 'infección osea', 'infeccion hueso', 'hueso infeccion', 'oseo', 'periostio', 'osteitis', 'espondilodiscitis', 'discitis', 'vertebral'],
  category: 'Osteoarticular',
  icon: '🦴',
  subtypes: [
    {
      id: 'osteomielitis-hematogena-adulto',
      name: 'Hematógena — Adulto (Vertebral / Espondilodiscitis)',
      context: 'S. aureus más frecuente. Inicio insidioso con dolor vertebral + fiebre. RMN columna diagnóstica.',
      treatment: {
        firstLine: [
          { drug: 'Cloxacilina', dose: '2g c/4-6h', route: 'IV', duration: '2-4 sem IV → completar 6 sem total VO', note: 'MSSA confirmado. La penicilina antiestafilocócica es superior a cefalosporinas para S. aureus sensible' },
          { drug: 'Cefazolina', dose: '2g c/8h', route: 'IV', duration: '2-4 sem IV → completar 6 sem total', note: 'Alternativa a cloxacilina si tolerancia/acceso mejor' }
        ],
        secondLine: [
          { drug: 'Vancomicina', dose: '15-20 mg/kg c/12h (objetivo AUC/MIC 400-600)', route: 'IV', duration: '4-6 semanas', note: 'MRSA confirmado o sospechado' },
          { drug: 'Daptomicina', dose: '6-8 mg/kg/día', route: 'IV', duration: '6 semanas', note: 'Alternativa a vancomicina en MRSA; NO si componente pulmonar' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos (MSSA)', dose: '600 mg c/8h IV → 300-450mg c/8h VO', route: 'IV/VO', duration: '6 semanas', note: 'Solo si sensible en antibiograma (verificar inducción de resistencia — test D)' }
        ],
        notes: 'Cultivo de biopsia ósea guiada antes del antibiótico (excepto sepsis). Duración mínima 6 semanas. VO con alta biodisponibilidad (fluoroquinolonas, linezolid, TMP/SMX, clindamicina) puede sustituir IV tras mejoría clínica y normalización de PCR.',
        source: 'IDSA 2012 · ESCMID 2023 · Sanford Guide 2024'
      }
    },
    {
      id: 'osteomielitis-contigua',
      name: 'Por Contigüidad — Post-quirúrgica / Traumática',
      context: 'Cirugía ortopédica, fractura abierta, úlcera crónica. Polimicrobiana frecuente.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: '4-6 semanas', note: 'Cobertura polimicrobiana incluyendo Gram- y anaerobios' },
          { drug: 'Vancomicina + Cefepima', dose: 'Vanco 15mg/kg c/12h + Cefepima 2g c/8h', route: 'IV', duration: '4-6 semanas', note: 'Si MRSA riesgo + cobertura Pseudomonas' }
        ],
        secondLine: [
          { drug: 'Meropenem', dose: '1g c/8h', route: 'IV', duration: '4-6 semanas', note: 'Si MDR o ESBL confirmado' }
        ],
        allergyAlternatives: [
          { drug: 'Linezolid + Aztreonam', allergyTo: 'β-lactámicos (alergia severa, MRSA)', dose: 'Linezolid 600mg c/12h + Aztreonam 2g c/8h', route: 'IV/VO', duration: '6 semanas' }
        ],
        notes: 'Desbridamiento quirúrgico esencial. Si material protésico: conservar si infección precoz y estable; retirar si tardía. Rifampicina (300-450mg c/12h VO) añadir a cualquier pauta si material de osteosíntesis retenido (biofilm).',
        source: 'IDSA 2012 · ESCMID 2023 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'artritis-septica',
  name: 'Artritis Séptica',
  aliases: ['artritis septica', 'artritis bacteriana', 'artritis infecciosa', 'articulacion infeccion', 'sinovitis bacteriana', 'monoartritis febril', 'artrocentesis', 'rodilla inflamada fiebre'],
  category: 'Osteoarticular',
  icon: '🦴',
  subtypes: [
    {
      id: 'artritis-septica-adulto',
      name: 'Adulto — No Gonocócica',
      context: 'S. aureus (50-70%). Inicio agudo: articulación caliente, tumefacta, dolorosa + fiebre. Diagnóstico por artrocentesis urgente.',
      treatment: {
        firstLine: [
          { drug: 'Cloxacilina', dose: '2g c/4-6h', route: 'IV', duration: '2 sem IV → completar 3-4 sem total', note: 'MSSA (S. aureus meticilín-sensible) más frecuente' },
          { drug: 'Cefazolina', dose: '2g c/8h', route: 'IV', duration: '2 sem IV → completar 3-4 sem total', note: 'Alternativa equivalente a cloxacilina' }
        ],
        secondLine: [
          { drug: 'Vancomicina', dose: '15-20 mg/kg c/12h', route: 'IV', duration: '3-4 semanas', note: 'MRSA confirmado, factores de riesgo MRSA, o alergia grave' },
          { drug: 'Daptomicina', dose: '6 mg/kg/día', route: 'IV', duration: '3-4 semanas', note: 'Alternativa si intolerancia o fallo a vancomicina' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos (MSSA, alergia leve)', dose: '600 mg c/8h IV → 300mg c/8h VO', route: 'IV/VO', duration: '3-4 semanas' }
        ],
        notes: 'Artrocentesis urgente + lavado articular diario o quirúrgico. Si Gram- (articulación axial, inmunodeprimido): Ceftriaxona 2g/d IV o Ciprofloxacino 400mg c/12h IV. Duración mínima 3-4 semanas (6 semanas si prótesis).',
        source: 'IDSA · EULAR · Sanford Guide 2024'
      }
    },
    {
      id: 'artritis-gonocócica',
      name: 'Gonocócica Diseminada (DGI)',
      context: 'Adulto joven sexualmente activo. Tríada: poliartritis migratoria → monoartritis + tenosinovitis + lesiones cutáneas.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona', dose: '1g/día', route: 'IV/IM', duration: '7 días (mínimo 24-48h afebril antes de cambio a VO)', note: 'Primera elección siempre. Gonococo con alta resistencia a fluoroquinolonas.' },
          { drug: 'Cefixima', dose: '400 mg c/12h', route: 'VO', duration: 'Completar hasta 7 días desde mejoría', note: 'Cambio a VO tras 24-48h de mejoría clínica y afebril' }
        ],
        secondLine: [
          { drug: 'Azitromicina', dose: '1g VO dosis única', route: 'VO', duration: 'Dosis única adicional', note: 'Siempre añadir para cobertura Chlamydia coinfección' }
        ],
        allergyAlternatives: [
          { drug: 'Espectinomicina', allergyTo: 'Cefalosporinas', dose: '2g c/12h', route: 'IM', duration: '7 días', note: 'Solo disponible en algunos países; no usar en faringitis gonocócica' }
        ],
        notes: 'Tratar siempre la infección genital de base y las parejas sexuales. Cribado para otras ITS (VIH, sífilis). Artrocentesis diagnóstica y terapéutica.',
        source: 'CDC 2021 · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'infeccion-cateter',
  name: 'Infección de Catéter Venoso Central (CRBSI)',
  aliases: ['cateter', 'cvc', 'crbsi', 'infeccion cateter', 'bacteriemia cateter', 'linea central', 'port', 'reservoir', 'hickman', 'picc', 'via central infeccion'],
  category: 'Vascular / UCI',
  icon: '🩹',
  subtypes: [
    {
      id: 'crbsi-sin-complicaciones',
      name: 'Sin complicaciones — Bacteriemia por catéter',
      context: 'Fiebre + bacteriemia con catéter como foco probable. Sin endocarditis ni tromboflebitis séptica.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina', dose: '15-20 mg/kg c/12h (objetivo AUC 400-600)', route: 'IV', duration: '7-14 días desde retirada de catéter', note: 'Primera línea empírica (cobertura MRSA + SCN). Ajustar por niveles.' },
          { drug: 'Daptomicina', dose: '6-8 mg/kg/día', route: 'IV', duration: '7-14 días', note: 'Si intolerancia o fallo a vancomicina; excelente para Gram+' }
        ],
        secondLine: [
          { drug: 'Cloxacilina', dose: '2g c/4-6h', route: 'IV', duration: '7-14 días', note: 'MSSA confirmado — SIEMPRE desescalar de vancomicina a cloxacilina si MSSA' },
          { drug: 'Cefazolina', dose: '2g c/8h', route: 'IV', duration: '7-14 días', note: 'Alternativa a cloxacilina si MSSA' }
        ],
        allergyAlternatives: [
          { drug: 'Linezolid', allergyTo: 'Vancomicina + glucopéptidos', dose: '600 mg c/12h', route: 'IV/VO', duration: '7-14 días', note: 'No inferior a vancomicina. Vigilar trombocitopenia en uso prolongado.' }
        ],
        notes: 'RETIRAR el catéter SIEMPRE (excepción: SCN sin complicaciones si catéter imprescindible — sellar con antibiótico). Si S. aureus: ecocardiograma obligatorio + 14 días mínimo. Hemocultivos de control a las 72h.',
        source: 'IDSA 2009 (actualización 2024) · Sanford Guide 2024'
      }
    },
    {
      id: 'crbsi-candida',
      name: 'Candidemia por Catéter',
      context: 'Nutrición parenteral, antibióticos previos, cirugía abdominal, inmunodepresión.',
      treatment: {
        firstLine: [
          { drug: 'Micafungina', dose: '100 mg/día', route: 'IV', duration: '14 días desde hemocultivo negativo', note: 'Equinocandina de elección. Primera línea en candidemia.' },
          { drug: 'Anidulafungina', dose: '200 mg día 1 → 100 mg/día', route: 'IV', duration: '14 días desde hemocultivo negativo' },
          { drug: 'Caspofungina', dose: '70 mg día 1 → 50 mg/día', route: 'IV', duration: '14 días desde hemocultivo negativo' }
        ],
        secondLine: [
          { drug: 'Fluconazol', dose: '800 mg (12 mg/kg) → 400 mg/día', route: 'IV/VO', duration: '14 días', note: 'Solo si C. albicans probable, paciente estable, sin azoles previos, sensibilidad confirmada' }
        ],
        allergyAlternatives: [
          { drug: 'Voriconazol', allergyTo: 'Equinocandinas', dose: '6 mg/kg c/12h × 2 dosis → 4 mg/kg c/12h', route: 'IV', duration: '14 días', note: 'Si C. krusei o C. glabrata resistente a fluconazol' }
        ],
        notes: 'Retirar el catéter SIEMPRE. Fondo de ojo OBLIGATORIO (descartar endoftalmitis). Ecocardiografía si bacteriemia persistente >72h. Cambio a fluconazol VO posible si cepa sensible y mejoría clínica.',
        source: 'IDSA 2016 (actualización 2024) · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'encefalitis-viral',
  name: 'Encefalitis Viral (VHS)',
  aliases: ['encefalitis', 'encefalitis herpes', 'herpes encefalitis', 'vhs encefalitis', 'hsv encefalitis', 'encefalitis viral', 'meningoencefalitis', 'confusion fiebre convulsion', 'aciclovir urgencia'],
  category: 'SNC',
  icon: '🧠',
  subtypes: [
    {
      id: 'encefalitis-vhs-adulto',
      name: 'Encefalitis Herpética — Adulto (VHS-1)',
      context: 'Urgencia neurológica. Fiebre + alteración de consciencia + focalidad temporal (afasia, convulsiones). Mortalidad >70% sin tratamiento.',
      treatment: {
        firstLine: [
          { drug: 'Aciclovir', dose: '10 mg/kg c/8h (máx 30 mg/kg/día)', route: 'IV (perfusión 1h)', duration: '14-21 días', note: 'INICIAR INMEDIATAMENTE ante sospecha clínica — no esperar confirmación PCR. Ajustar en ERC.' }
        ],
        secondLine: [
          { drug: 'Foscarnet', dose: '60 mg/kg c/8h', route: 'IV', duration: '14-21 días', note: 'Si resistencia a aciclovir (inmunodeprimido, trasplante). Nefrotóxico — hidratación intensiva.' }
        ],
        allergyAlternatives: [
          { drug: 'Cidofovir', allergyTo: 'Aciclovir + Foscarnet', dose: '5 mg/kg semanal × 2 → quincenal', route: 'IV', duration: 'Individualizado', note: 'Solo resistencia confirmada. Alta nefrotoxicidad.' }
        ],
        notes: 'PL con PCR VHS en LCR (S 96%, E 99% — puede ser negativa en las primeras 24-48h). RMN craneal urgente (edema temporal, captación). Si LCR normal y RMN dudosa: NO suspender aciclovir. Añadir Dexametasona 0.15mg/kg c/6h × 4 días si edema cerebral significativo.',
        source: 'IDSA 2020 · ECDC · Sanford Guide 2024'
      }
    },
    {
      id: 'encefalitis-inmunodeprimido',
      name: 'Inmunodeprimido — Cobertura empírica ampliada',
      context: 'VIH, trasplante, corticoides crónicos. Ampliar cobertura: CMV, VZV, Toxoplasma, Cryptococcus.',
      treatment: {
        firstLine: [
          { drug: 'Aciclovir', dose: '10 mg/kg c/8h', route: 'IV', duration: '14-21 días', note: 'VHS/VZV' },
          { drug: '+ Pirimetamina + Sulfadiazina', dose: 'Pirim 200mg carga → 75mg/d + Sulfad 1-1.5g c/6h', route: 'VO', duration: '6 semanas', note: 'Si Toxoplasma: lesiones anulares en RMN, VIH CD4<100' },
          { drug: '+ Anfotericina B liposomal', dose: '3-4 mg/kg/día', route: 'IV', duration: '2 semanas inducción → Fluconazol consolidación', note: 'Si Cryptococcus neoformans (Ag Cryptococcus en LCR o sangre)' }
        ],
        secondLine: [
          { drug: 'Ganciclovir', dose: '5 mg/kg c/12h', route: 'IV', duration: '14-21 días', note: 'CMV-encefalitis (trasplante, VIH avanzado): PCR CMV en LCR' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina + Pirimetamina', allergyTo: 'Sulfadiazina (toxoplasmosis)', dose: 'Clinda 600mg c/6h + Pirim 200mg carga → 75mg/d', route: 'IV/VO', duration: '6 semanas' }
        ],
        notes: 'En VIH sin TAR: iniciar antirretroviral tras 2-4 semanas de tratamiento de la infección oportunista (riesgo SIRI). PL urgente + TC/RMN. Cribado VIH en toda encefalitis de etiología incierta.',
        source: 'IDSA 2020 · WHO · DHHS OI Guidelines 2024 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'colangitis-aguda',
  name: 'Colangitis Aguda',
  aliases: ['colangitis', 'colangitis aguda', 'via biliar', 'colédoco', 'ictericia fiebre dolor', 'charcot triada', 'reynolds penada', 'cepre', 'ercp colangitis', 'obstruccion biliar'],
  category: 'Abdominal',
  icon: '🫘',
  subtypes: [
    {
      id: 'colangitis-leve-moderada',
      name: 'Grado I-II (Leve-Moderada) — Tokyo',
      context: 'Tríada de Charcot: fiebre + ictericia + dolor CSD. Sin disfunción orgánica. Requiere drenaje biliar electivo/urgente.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '1g/200mg c/8h', route: 'IV', duration: '7 días (hasta 24-48h post-drenaje y afebril)', note: 'Buena cobertura enterobacterias y anaerobios biliares' },
          { drug: 'Ceftriaxona + Metronidazol', dose: 'Ceftriaxona 2g/d + Metro 500mg c/8h', route: 'IV', duration: '7 días post-drenaje' }
        ],
        secondLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: '7 días', note: 'Si factores de riesgo MDR, hospitalización reciente o procedimiento biliar previo' },
          { drug: 'Ertapenem', dose: '1g/día', route: 'IV', duration: '7 días', note: 'Si ESBL o alergia a penicilinas + cefalosporinas' }
        ],
        allergyAlternatives: [
          { drug: 'Ciprofloxacino + Metronidazol', allergyTo: 'β-lactámicos', dose: 'Cipro 400mg c/12h + Metro 500mg c/8h', route: 'IV', duration: '7 días', note: 'Si resistencia local a fluoroquinolonas <10%' }
        ],
        notes: 'DRENAJE BILIAR URGENTE es el tratamiento definitivo (CPRE con esfinterotomía). Los antibióticos son complementarios. Colecistectomía diferida si cálculos. Hemocultivos + cultivo de bilis durante la CPRE.',
        source: 'Tokyo Guidelines 2018 · WSES · Sanford Guide 2024'
      }
    },
    {
      id: 'colangitis-grave',
      name: 'Grado III (Grave) — Pentada de Reynolds + Disfunción orgánica',
      context: 'Tríada Charcot + shock + alteración de consciencia. Disfunción de al menos un órgano. Mortalidad >10%.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: 'Hasta hemocultivos negativos y 7 días post-drenaje', note: 'DRENAJE BILIAR EMERGENTE (dentro de las primeras horas)' },
          { drug: 'Meropenem', dose: '1g c/8h', route: 'IV', duration: '7-14 días', note: 'Si MDR, ESBL confirmado, fallo a PipTazo o shock séptico grave' }
        ],
        secondLine: [
          { drug: '+ Vancomicina', dose: '15 mg/kg c/12h', route: 'IV', duration: 'Añadir si riesgo o confirmación Enterococcus VRE' }
        ],
        allergyAlternatives: [
          { drug: 'Aztreonam + Metronidazol', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Aztreonam 2g c/8h + Metro 500mg c/8h', route: 'IV', duration: '7-14 días', note: 'Añadir vancomicina para cobertura Gram+' }
        ],
        notes: 'DRENAJE EMERGENTE (CPRE o drenaje percutáneo) dentro de las primeras 12h. Sin drenaje, los antibióticos son insuficientes. UCI si disfunción orgánica. Mortalidad <5% si drenaje precoz; >40% si drenaje tardío.',
        source: 'Tokyo Guidelines 2018 · WSES · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'absceso-hepatico',
  name: 'Absceso Hepático',
  aliases: ['absceso hepatico', 'absceso hepático', 'absceso higado', 'higado absceso', 'ameba higado', 'amebiasis hepatica', 'pyogenic liver', 'klebsiella hepatico'],
  category: 'Abdominal',
  icon: '🫁',
  subtypes: [
    {
      id: 'absceso-hepatico-piogeno',
      name: 'Piógeno Bacteriano',
      context: 'Enterobacterias (E. coli, Klebsiella), anaerobios. Fiebre + hepatomegalia dolorosa + elevación FA/GGT. Diagnóstico por ECO/TC.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona + Metronidazol', dose: 'Ceftriaxona 2g/d + Metronidazol 500mg c/8h', route: 'IV', duration: '2-4 sem IV → completar 4-6 sem total VO', note: 'Tratamiento estándar. Cambio a Amox-Clav VO si mejoría.' },
          { drug: 'Amoxicilina-Clavulánico', dose: '1g/200mg c/8h IV → 875/125mg c/12h VO', route: 'IV/VO', duration: '4-6 semanas total' }
        ],
        secondLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4.5g c/6h', route: 'IV', duration: '4-6 semanas', note: 'Si sepsis, MDR o klebsiella hipervirulenta (Kp hipermucoso)' },
          { drug: 'Meropenem', dose: '1g c/8h', route: 'IV', duration: '4-6 semanas', note: 'Si ESBL, fallo previo o sepsis grave' }
        ],
        allergyAlternatives: [
          { drug: 'Ciprofloxacino + Metronidazol', allergyTo: 'β-lactámicos', dose: 'Cipro 400mg c/12h + Metro 500mg c/8h', route: 'IV', duration: '4-6 semanas' }
        ],
        notes: 'DRENAJE percutáneo guiado por imagen obligatorio si >3 cm o mala respuesta en 48-72h. Cultivo de la colección. En Klebsiella hipermucoso (K1/K2): bacteriemia frecuente y diseminación ocular (endoftalmitis) — vigilar agudeza visual.',
        source: 'EASL · AGA · Sanford Guide 2024'
      }
    },
    {
      id: 'absceso-hepatico-amebiano',
      name: 'Amebiano (Entamoeba histolytica)',
      context: 'Viaje a zona endémica, alcohol. Absceso único derecho. Serología amebiana positiva. NO drenar si <10 cm y sin complicación.',
      treatment: {
        firstLine: [
          { drug: 'Metronidazol', dose: '750 mg c/8h', route: 'VO/IV', duration: '7-10 días', note: 'Tratamiento tisular (elimina trofozoítos en hígado). Seguir con luminal.' },
          { drug: 'Tinidazol', dose: '2g/día', route: 'VO', duration: '5 días', note: 'Alternativa más cómoda que metronidazol. Misma eficacia.' }
        ],
        secondLine: [
          { drug: 'Paromomicina', dose: '25-35 mg/kg/día en 3 dosis', route: 'VO', duration: '7-10 días', note: 'TRATAMIENTO LUMINAL: administrar SIEMPRE tras metronidazol para erradicar quistes intestinales y prevenir recurrencias' }
        ],
        allergyAlternatives: [
          { drug: 'Cloroquina', allergyTo: 'Metronidazol (intolerancia)', dose: '1g/d × 2d → 500mg/d × 12-21d', route: 'VO', duration: '14-21 días total', note: 'Segunda elección si intolerancia a nitroimidazoles. Eficacia inferior.' }
        ],
        notes: 'Drenaje solo si: riesgo de rotura (>10cm), sin respuesta a 5-7 días, diagnóstico incierto o lóbulo izquierdo (riesgo de rotura pericárdica). Tras el tratamiento tisular SIEMPRE completar con luminal (paromomicina) para erradicar el reservorio intestinal.',
        source: 'EASL · IDSA · WHO · Sanford Guide 2024'
      }
    }
  ]
}

]; // fin ANTIBIOTIC_DATA_CORE
