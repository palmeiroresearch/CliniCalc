// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// Lote 2 — Tropicales / Bioterrorismo (5)
// Fuentes: OMS/PAHO · CDC · DNDi · Sanford Guide 2024
// ============================================

const ANTIBIOTIC_DATA_TROPICAL2 = [

{
  id: 'dengue',
  name: 'Dengue',
  aliases: ['fiebre dengue', 'dengue hemorragico', 'arbovirosis', 'fiebre rompehuesos'],
  category: 'Tropicales / Importadas',
  icon: '🦟',
  subtypes: [
    {
      id: 'dengue-sin-alarma',
      name: 'Sin signos de alarma',
      context: 'Fiebre + 2 criterios (náuseas/vómitos, exantema, mialgias/artralgias, prueba del torniquete positiva, leucopenia) sin signos de alarma. Manejo ambulatorio.',
      treatment: {
        firstLine: [
          { drug: 'Paracetamol', dose: '500-1000 mg c/6-8h (máx. 3 g/día)', route: 'VO', duration: 'Según fiebre/dolor', note: 'NO usar AINEs (ibuprofeno, ácido acetilsalicílico) — riesgo de sangrado' }
        ],
        notes: 'No existe antiviral específico. Hidratación oral abundante, reposo, control ambulatorio de hematocrito y plaquetas cada 24-48h. Educar en signos de alarma para reconsulta inmediata (dolor abdominal intenso, vómitos persistentes, sangrado, letargia).',
        source: 'OMS 2009 · PAHO Dengue Guidelines'
      }
    },
    {
      id: 'dengue-con-alarma-grave',
      name: 'Con signos de alarma / Dengue grave',
      context: 'Dolor abdominal intenso, vómitos persistentes, acumulación de líquidos, sangrado de mucosas, letargia, hepatomegalia, aumento del hematocrito con caída rápida de plaquetas, o shock/extravasación grave de plasma.',
      treatment: {
        firstLine: [
          { drug: 'Fluidoterapia IV con cristaloides (Ringer lactato/SSN 0,9%)', dose: 'Guiada por hematocrito seriado y estado hemodinámico', route: 'IV', duration: 'Según evolución (fase crítica 24-48h)' }
        ],
        notes: 'Hospitalización obligatoria. Monitorización estrecha de hematocrito, plaquetas, diuresis y signos de shock. Transfusión de hemoderivados solo si sangrado significativo (no profilácticamente por trombocitopenia aislada). UCI si shock por dengue o fallo orgánico. No hay tratamiento antibiótico ni antiviral específico.',
        source: 'OMS 2009 · PAHO Dengue Guidelines'
      }
    }
  ]
},

{
  id: 'fiebre-tifoidea',
  name: 'Fiebre Tifoidea (Salmonella typhi)',
  aliases: ['tifoidea', 'salmonella typhi', 'fiebre enterica', 'typhoid fever'],
  category: 'Tropicales / Importadas',
  icon: '🦠',
  subtypes: [
    {
      id: 'tifoidea-no-complicada',
      name: 'No complicada',
      context: 'Fiebre prolongada, dolor abdominal, cefalea, en paciente procedente de zona endémica o con viaje reciente, sin signos de gravedad.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona', dose: '2 g/día', route: 'IV', duration: '7-14 días' },
          { drug: 'Cefixima', dose: '400 mg c/12h', route: 'VO', duration: '7-14 días', note: 'Alternativa oral en zonas con resistencia a fluoroquinolonas' }
        ],
        secondLine: [
          { drug: 'Azitromicina', dose: '500 mg/día', route: 'VO', duration: '5-7 días', note: 'Buena opción si alta tasa local de resistencia a quinolonas' }
        ],
        allergyAlternatives: [
          { drug: 'Ciprofloxacino', allergyTo: 'β-lactámicos', dose: '500 mg c/12h', route: 'VO', duration: '7-10 días', note: 'Usar solo si se confirma o es muy probable la sensibilidad — resistencia a fluoroquinolonas ampliamente diseminada (sur de Asia)' }
        ],
        notes: 'Evitar antipiréticos con efecto antiplaquetario si hay sospecha de complicación hemorrágica intestinal. Confirmar con hemocultivo/cultivo de médula ósea cuando sea posible.',
        source: 'OMS · IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'tifoidea-grave',
      name: 'Grave / complicada (shock, perforación, encefalopatía)',
      context: 'Fiebre tifoidea con shock séptico, delirio/encefalopatía tifoídica o perforación intestinal.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona + Dexametasona', dose: '2 g/día IV + 3 mg/kg dosis inicial luego 1 mg/kg c/6h x8 dosis', route: 'IV', duration: 'Ceftriaxona 10-14 días' }
        ],
        notes: 'La Dexametasona reduce la mortalidad en fiebre tifoídica grave con delirio/shock/obnubilación (ensayo clásico de Hoffman). Perforación intestinal → manejo quirúrgico urgente además del antibiótico.',
        source: 'Hoffman et al. NEJM · OMS'
      }
    }
  ]
},

{
  id: 'enfermedad-chagas',
  name: 'Enfermedad de Chagas',
  aliases: ['tripanosomiasis americana', 'chagas', 'trypanosoma cruzi', 'mal de chagas'],
  category: 'Zoonosis',
  icon: '🦠',
  subtypes: [
    {
      id: 'chagas-fase-aguda',
      name: 'Fase aguda',
      context: 'Infección reciente por Trypanosoma cruzi (vectorial, transfusional, congénita u oral) — fiebre, chagoma/signo de Romaña, o hallazgo parasitológico/serológico agudo.',
      treatment: {
        firstLine: [
          { drug: 'Benznidazol', dose: '5-7 mg/kg/día dividido c/12h', route: 'VO', duration: '60 días' }
        ],
        secondLine: [
          { drug: 'Nifurtimox', dose: '8-10 mg/kg/día dividido c/6-8h', route: 'VO', duration: '60-90 días', note: 'Si intolerancia o contraindicación a Benznidazol' }
        ],
        notes: 'Iniciar tratamiento lo antes posible — la eficacia antiparasitaria es mayor en fase aguda. Monitorizar toxicidad hematológica, hepática y cutánea (frecuente con ambos fármacos).',
        source: 'OMS · PAHO Chagas Guidelines · DNDi'
      }
    },
    {
      id: 'chagas-reactivacion',
      name: 'Reactivación en inmunosuprimido (VIH, trasplante)',
      context: 'Reactivación de infección crónica en paciente con VIH avanzado, trasplante de órgano sólido o inmunosupresión farmacológica — puede cursar con meningoencefalitis o miocarditis grave.',
      treatment: {
        firstLine: [
          { drug: 'Benznidazol', dose: '5-7 mg/kg/día dividido c/12h', route: 'VO', duration: '60 días, iniciar precozmente ante sospecha' }
        ],
        notes: 'En trasplante o inmunosupresión persistente, valorar profilaxis secundaria prolongada tras el tratamiento agudo. Vigilar recuento parasitario (PCR/gota gruesa) para evaluar respuesta.',
        source: 'PAHO Chagas Guidelines'
      }
    }
  ]
},

{
  id: 'botulismo',
  name: 'Botulismo',
  aliases: ['clostridium botulinum', 'intoxicacion botulinica', 'botulism'],
  category: 'Prevención / Toxinas',
  icon: '⚠️',
  subtypes: [
    {
      id: 'botulismo-alimentario',
      name: 'Transmitido por alimentos',
      context: 'Parálisis flácida descendente simétrica, afectación de pares craneales (diplopía, disfagia, disartria) tras ingesta de alimento contaminado (conservas caseras, enlatados).',
      treatment: {
        firstLine: [
          { drug: 'Antitoxina botulínica equina heptavalente', dose: 'Dosis única según protocolo de salud pública', route: 'IV', duration: 'Administrar lo antes posible, sin esperar confirmación de laboratorio' }
        ],
        notes: 'NO administrar antibióticos: no eliminan la toxina ya liberada y los aminoglucósidos/clindamicina pueden potenciar el bloqueo neuromuscular y empeorar la parálisis. Monitorización respiratoria estrecha en UCI — el soporte ventilatorio es la piedra angular del tratamiento. Notificación obligatoria a salud pública.',
        source: 'CDC Botulism Guidelines'
      }
    },
    {
      id: 'botulismo-herida',
      name: 'De herida',
      context: 'Botulismo secundario a colonización de una herida (clásicamente asociado a uso de drogas inyectables) por Clostridium botulinum.',
      treatment: {
        firstLine: [
          { drug: 'Antitoxina botulínica + Penicilina G', dose: 'Antitoxina según protocolo + Penicilina G 3-4 millones UI c/4h', route: 'IV', duration: 'Penicilina 7-10 días' }
        ],
        secondLine: [
          { drug: 'Metronidazol', dose: '500 mg c/8h', route: 'IV', duration: '7-10 días', note: 'Alternativa a Penicilina G' }
        ],
        notes: 'A diferencia del botulismo alimentario, aquí SÍ está indicado el antibiótico dirigido a erradicar C. botulinum del foco, junto con desbridamiento quirúrgico de la herida y la antitoxina.',
        source: 'CDC Botulism Guidelines'
      }
    }
  ]
},

{
  id: 'peste',
  name: 'Peste (Yersinia pestis)',
  aliases: ['yersinia pestis', 'peste bubonica', 'peste neumonica', 'plague'],
  category: 'Bioterrorismo / Emergencias',
  icon: '🐀',
  subtypes: [
    {
      id: 'peste-bubonica',
      name: 'Bubónica',
      context: 'Fiebre alta de inicio brusco con adenopatía dolorosa (bubón) tras exposición a pulgas/roedores en zona endémica.',
      treatment: {
        firstLine: [
          { drug: 'Estreptomicina', dose: '1 g IM c/12h', route: 'IM', duration: '10 días' },
          { drug: 'Gentamicina', dose: '5 mg/kg/día', route: 'IV/IM', duration: '10 días', note: 'Alternativa más disponible que la Estreptomicina' }
        ],
        secondLine: [
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'IV/VO', duration: '10-14 días' },
          { drug: 'Ciprofloxacino', dose: '400 mg IV c/12h → 500 mg VO c/12h', route: 'IV/VO', duration: '10-14 días' }
        ],
        notes: 'Enfermedad de declaración obligatoria inmediata a salud pública. Aislamiento de gotas hasta descartar forma neumónica o completar 48h de tratamiento eficaz.',
        source: 'CDC Plague Guidelines'
      }
    },
    {
      id: 'peste-neumonica',
      name: 'Neumónica (aislamiento respiratorio estricto)',
      context: 'Forma primaria (inhalación) o secundaria (diseminación hematógena) con neumonía rápidamente progresiva — mortalidad cercana al 100% sin tratamiento en las primeras 24h.',
      treatment: {
        firstLine: [
          { drug: 'Estreptomicina o Gentamicina IV', dose: '1 g IM c/12h o 5 mg/kg/día IV', route: 'IM/IV', duration: '10-14 días', note: 'Iniciar de inmediato ante sospecha clínica, sin esperar confirmación microbiológica' }
        ],
        secondLine: [
          { drug: 'Doxiciclina o Ciprofloxacino IV', dose: '100 mg c/12h o 400 mg c/12h', route: 'IV', duration: '10-14 días' }
        ],
        notes: 'Aislamiento de gotas estricto (no solo estándar) hasta 48h de antibiótico eficaz. Profilaxis postexposición a contactos cercanos con Doxiciclina o Ciprofloxacino durante 7 días. Notificación obligatoria e inmediata — considerar origen bioterrorista si presentación atípica o en área no endémica.',
        source: 'CDC Plague Guidelines · WHO'
      }
    }
  ]
}

];
