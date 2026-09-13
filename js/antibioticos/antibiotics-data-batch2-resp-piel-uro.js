// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// Lote 2 — Respiratorio / Piel / Urológico / Cardiovascular (6)
// Fuentes: IDSA · ATS · CDC · Sanford Guide 2024
// ============================================

const ANTIBIOTIC_DATA_BATCH2_MISC = [

{
  id: 'neumonia-aspirativa',
  name: 'Neumonía por Aspiración',
  aliases: ['neumonia aspiracion', 'broncoaspiracion', 'aspiration pneumonia', 'neumonitis aspirativa'],
  category: 'Respiratorio',
  icon: '🫁',
  subtypes: [
    {
      id: 'aspirativa-comunitaria',
      name: 'Comunitaria',
      context: 'Aspiración en el domicilio/comunidad (disfagia, alteración de conciencia, ACV, alcoholismo). Tratar como NAC salvo signos de absceso/empiema.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h VO o 1 g/200 mg c/8h IV', route: 'VO/IV', duration: '5-7 días' }
        ],
        secondLine: [
          { drug: 'Ceftriaxona + Metronidazol', dose: '2 g/día + 500 mg c/8h', route: 'IV', duration: '5-7 días', note: 'Añadir Metronidazol/Clindamicina si sospecha de absceso pulmonar o esputo pútrido' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos', dose: '600 mg c/8h', route: 'IV/VO', duration: '5-7 días' }
        ],
        notes: 'La cobertura anaerobia rutinaria no es necesaria en toda aspiración comunitaria (IDSA/ATS 2019) — reservarla para mala higiene dental, absceso o empiema.',
        source: 'IDSA/ATS 2019'
      }
    },
    {
      id: 'aspirativa-nosocomial',
      name: 'Nosocomial / paciente hospitalizado',
      context: 'Aspiración en paciente hospitalizado, con disfagia crónica, sonda nasogástrica o ventilación mecánica — mayor riesgo de anaerobios y patógenos nosocomiales.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6-8h', route: 'IV', duration: '7 días' }
        ],
        secondLine: [
          { drug: 'Ceftriaxona + Clindamicina', dose: '2 g/día + 600 mg c/8h', route: 'IV', duration: '7 días' }
        ],
        notes: 'Si factores de riesgo para Pseudomonas/multirresistencia (hospitalización prolongada, antibióticos recientes), tratar según protocolo de HAP/VAP institucional.',
        source: 'IDSA/ATS 2019 · HAP/VAP Guidelines'
      }
    }
  ]
},

{
  id: 'empiema-pleural',
  name: 'Empiema Pleural',
  aliases: ['empiema', 'derrame pleural infectado', 'pleuritis purulenta'],
  category: 'Respiratorio',
  icon: '🫁',
  subtypes: [
    {
      id: 'empiema-exudativo',
      name: 'Fase exudativa / fibrinopurulenta',
      context: 'Derrame paraneumónico complicado o empiema en fase temprana — líquido pleural con pH<7,2, glucosa baja o cultivo/Gram positivo.',
      treatment: {
        firstLine: [
          { drug: 'Ampicilina-Sulbactam', dose: '3 g c/6h', route: 'IV', duration: '2-4 semanas (individualizar según drenaje y respuesta)' },
          { drug: 'Ceftriaxona + Metronidazol', dose: '2 g/día + 500 mg c/8h', route: 'IV', duration: '2-4 semanas' }
        ],
        secondLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6-8h', route: 'IV', duration: '2-4 semanas', note: 'Origen nosocomial o postquirúrgico' }
        ],
        notes: 'Tubo de drenaje torácico obligatorio si empiema franco/pus. Considerar fibrinolíticos intrapleurales (alteplasa + DNasa) si loculado y mala evacuación.',
        source: 'ACCP/BTS Pleural Infection Guidelines'
      }
    },
    {
      id: 'empiema-organizado',
      name: 'Fase organizada (loculado / crónico)',
      context: 'Empiema crónico con paquipleuritis o loculación extensa, mala respuesta a drenaje simple.',
      treatment: {
        firstLine: [
          { drug: 'Antibiótico dirigido por cultivo pleural', dose: 'Según antibiograma', route: 'IV → VO', duration: '4-6 semanas' }
        ],
        notes: 'Suele requerir cirugía (VATS con decorticación) además de antibioterapia prolongada — la sola antibioterapia rara vez resuelve esta fase.',
        source: 'ACCP/BTS Pleural Infection Guidelines'
      }
    }
  ]
},

{
  id: 'mordeduras',
  name: 'Mordeduras (Animal / Humana)',
  aliases: ['mordedura de perro', 'mordedura de gato', 'mordedura humana', 'bite wound', 'herida por mordedura'],
  category: 'Piel y Tejidos Blandos',
  icon: '🐕',
  subtypes: [
    {
      id: 'mordedura-perro-gato',
      name: 'Perro / Gato',
      context: 'Herida por mordedura de perro o gato — riesgo de Pasteurella multocida (especialmente gato), Staphylococcus y Streptococcus.',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '5 días (profilaxis) o 10-14 días (infección establecida)' }
        ],
        secondLine: [
          { drug: 'Clindamicina + Ciprofloxacino', dose: '300 mg c/8h + 500 mg c/12h', route: 'VO', duration: '5-14 días' }
        ],
        allergyAlternatives: [
          { drug: 'Doxiciclina', allergyTo: 'β-lactámicos', dose: '100 mg c/12h', route: 'VO', duration: '5-14 días' }
        ],
        notes: 'No suturar heridas de alto riesgo (mano, punción profunda, >8-12h de evolución). Evaluar profilaxis antitetánica y riesgo de rabia según epidemiología local y estado del animal.',
        source: 'IDSA Skin and Soft Tissue Infections 2014'
      }
    },
    {
      id: 'mordedura-humana',
      name: 'Humana',
      context: 'Mordedura humana — mayor riesgo de infección que la animal (Eikenella corrodens, anaerobios orales, Staphylococcus, Streptococcus).',
      treatment: {
        firstLine: [
          { drug: 'Amoxicilina-Clavulánico', dose: '875/125 mg c/12h', route: 'VO', duration: '5 días (profilaxis) o 10-14 días (infección establecida)' }
        ],
        secondLine: [
          { drug: 'Clindamicina + Ciprofloxacino (o Levofloxacino)', dose: '300 mg c/8h + 500 mg c/12h', route: 'VO', duration: '5-14 días' }
        ],
        notes: 'Herida "en puño cerrado" (fight bite) sobre articulación metacarpofalángica tiene alto riesgo de artritis séptica/tenosinovitis — valorar exploración quirúrgica. Evaluar serologías (VHB, VHC, VIH) según exposición.',
        source: 'IDSA Skin and Soft Tissue Infections 2014'
      }
    }
  ]
},

{
  id: 'impetigo-forunculosis',
  name: 'Impétigo / Forunculosis',
  aliases: ['impetigo', 'forunculo', 'antrax cutaneo', 'furuncle', 'infeccion piel superficial estafilococica'],
  category: 'Piel y Tejidos Blandos',
  icon: '🩹',
  subtypes: [
    {
      id: 'impetigo',
      name: 'Impétigo (no buloso / buloso)',
      context: 'Lesiones costrosas melicéricas (no buloso) o ampollas flácidas (buloso), típicamente por Staphylococcus aureus y/o Streptococcus pyogenes.',
      treatment: {
        firstLine: [
          { drug: 'Mupirocina 2% tópica', dose: 'Aplicar c/8h', route: 'Tópica', duration: '5 días', note: 'De elección si lesiones limitadas y localizadas' }
        ],
        secondLine: [
          { drug: 'Cefalexina', dose: '500 mg c/6h', route: 'VO', duration: '7 días', note: 'Si lesiones extensas o múltiples' },
          { drug: 'Dicloxacilina', dose: '500 mg c/6h', route: 'VO', duration: '7 días' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'β-lactámicos', dose: '300-450 mg c/8h', route: 'VO', duration: '7 días' }
        ],
        notes: 'Considerar cobertura empírica de SAMR comunitario (Clindamicina o TMP-SMX) en zonas de alta prevalencia.',
        source: 'IDSA Skin and Soft Tissue Infections 2014'
      }
    },
    {
      id: 'forunculosis',
      name: 'Forúnculo / Ántrax cutáneo',
      context: 'Nódulo inflamatorio doloroso centrado en folículo piloso (forúnculo) o conglomerado de varios (ántrax cutáneo/carbunco estafilocócico).',
      treatment: {
        firstLine: [
          { drug: 'Incisión y drenaje', dose: '—', route: '—', duration: '—', note: 'Tratamiento definitivo de la mayoría de los abscesos cutáneos simples; antibiótico es adyuvante' }
        ],
        secondLine: [
          { drug: 'Trimetoprim-Sulfametoxazol', dose: '160/800 mg c/12h', route: 'VO', duration: '5-7 días', note: 'Si signos sistémicos, celulitis extensa asociada, inmunosupresión o riesgo de SAMR comunitario' },
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '5-7 días' },
          { drug: 'Cefalexina', dose: '500 mg c/6h', route: 'VO', duration: '5-7 días', note: 'Si bajo riesgo de SAMR / sensibilidad conocida a meticilina' }
        ],
        notes: 'No usar antibiótico como sustituto del drenaje cuando hay colección drenable. Recurrencias múltiples → valorar descolonización (mupirocina nasal + baños de clorhexidina) y cultivo de contactos.',
        source: 'IDSA Skin and Soft Tissue Infections 2014'
      }
    }
  ]
},

{
  id: 'epididimitis-orquitis',
  name: 'Epididimitis / Orquitis Aguda',
  aliases: ['epididimitis', 'orquitis', 'dolor testicular infeccioso', 'inflamacion epididimo'],
  category: 'Urológico',
  icon: '🩺',
  subtypes: [
    {
      id: 'epididimitis-joven',
      name: '<35 años (probable etiología por ITS)',
      context: 'Varón sexualmente activo <35 años con dolor testicular unilateral progresivo — sospechar Neisseria gonorrhoeae / Chlamydia trachomatis.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona + Doxiciclina', dose: '500 mg IM dosis única (1 g si ≥150 kg) + 100 mg c/12h VO', route: 'IM + VO', duration: 'Ceftriaxona dosis única + Doxiciclina 10 días' }
        ],
        secondLine: [
          { drug: 'Añadir Levofloxacino', dose: '500 mg/día', route: 'VO', duration: '10 días', note: 'Si también hay riesgo de organismos entéricos (sexo anal insertivo)' }
        ],
        allergyAlternatives: [
          { drug: 'Azitromicina', allergyTo: 'tetraciclinas', dose: '1 g VO dosis única', route: 'VO', duration: 'Dosis única, además de Ceftriaxona' }
        ],
        notes: 'Tratar también a la(s) pareja(s) sexual(es). Reposo, elevación escrotal y AINEs como coadyuvantes. Descartar torsión testicular antes de tratar (eco-doppler urgente si duda diagnóstica).',
        source: 'CDC STI Treatment Guidelines 2021'
      }
    },
    {
      id: 'epididimitis-mayor',
      name: '>35 años (probable etiología entérica)',
      context: 'Varón >35 años, habitualmente asociado a instrumentación urológica reciente, sondaje o hiperplasia prostática benigna — predominan enterobacterias.',
      treatment: {
        firstLine: [
          { drug: 'Levofloxacino', dose: '500 mg/día', route: 'VO', duration: '10 días' }
        ],
        secondLine: [
          { drug: 'Ciprofloxacino', dose: '500 mg c/12h', route: 'VO', duration: '10 días' },
          { drug: 'Trimetoprim-Sulfametoxazol', dose: '160/800 mg c/12h', route: 'VO', duration: '10 días' }
        ],
        notes: 'Urocultivo previo al inicio del tratamiento cuando sea posible.',
        source: 'CDC STI Treatment Guidelines 2021'
      }
    }
  ]
},

{
  id: 'mediastinitis',
  name: 'Mediastinitis',
  aliases: ['infeccion mediastino', 'mediastinitis postesternotomia', 'mediastinitis necrotizante descendente'],
  category: 'Cardiovascular',
  icon: '🫀',
  subtypes: [
    {
      id: 'mediastinitis-postesternotomia',
      name: 'Post-esternotomía (cirugía cardíaca)',
      context: 'Fiebre, dehiscencia esternal o secreción purulenta tras cirugía cardíaca con esternotomía media.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Cefepime', dose: '15-20 mg/kg c/8-12h + 2 g c/8h', route: 'IV', duration: '4-6 semanas, guiado por cultivo y desbridamiento' }
        ],
        secondLine: [
          { drug: 'Vancomicina + Piperacilina-Tazobactam', dose: '15-20 mg/kg c/8-12h + 4,5 g c/6-8h', route: 'IV', duration: '4-6 semanas' }
        ],
        notes: 'Desbridamiento quirúrgico y estabilización esternal (con o sin colgajo muscular) son obligatorios — el antibiótico solo no controla el foco.',
        source: 'STS/IDSA Sternal Wound Infection Guidelines'
      }
    },
    {
      id: 'mediastinitis-descendente',
      name: 'Descendente necrotizante (odontogénica / esofágica)',
      context: 'Extensión de infección profunda del cuello (odontogénica, retrofaríngea) o perforación esofágica hacia el mediastino — polimicrobiana con anaerobios.',
      treatment: {
        firstLine: [
          { drug: 'Piperacilina-Tazobactam', dose: '4,5 g c/6h', route: 'IV', duration: '3-4 semanas' },
          { drug: 'Ampicilina-Sulbactam + Clindamicina', dose: '3 g c/6h + 900 mg c/8h', route: 'IV', duration: '3-4 semanas' }
        ],
        secondLine: [
          { drug: 'Meropenem', dose: '1-2 g c/8h', route: 'IV', duration: '3-4 semanas' }
        ],
        notes: 'Emergencia quirúrgica: drenaje cervical y torácico (a menudo por toracotomía/VATS) urgente — mortalidad elevada si se retrasa el desbridamiento.',
        source: 'IDSA · Sanford Guide 2024'
      }
    }
  ]
}

];
