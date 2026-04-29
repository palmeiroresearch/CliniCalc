// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// Fúngicas: Invasivas, Profundas y Superficiales (5)
// Fuentes: IDSA 2016/2024 · ESCMID/ECMM 2018/2022 · DHHS 2024 · Sanford Guide 2024
// ============================================

const ANTIBIOTIC_DATA_FUNGAL = [

{
  id: 'aspergilosis-invasiva',
  name: 'Aspergilosis Pulmonar Invasiva (IPA)',
  aliases: ['aspergilosis', 'aspergillus', 'aspergillus fumigatus', 'ipa', 'aspergilosis invasiva', 'halo sign', 'galactomanano', 'neutropenia hongo', 'mould neutropenia'],
  category: 'Fúngicas Invasivas',
  icon: '🍄',
  subtypes: [
    {
      id: 'ipa-neutropenico-trasplante',
      name: 'Inmunodeprimido Clásico (Neutropenia / Trasplante MO)',
      context: 'Principal factor de riesgo: neutropenia prolongada (<500/µL >10 días) y trasplante alogénico de MO. TC tórax: nódulos con signo del halo, cavitación en angioinvasión. Galactomanano sérico y en BAL como biomarcador.',
      treatment: {
        firstLine: [
          { drug: 'Voriconazol', dose: '6 mg/kg c/12h IV × 2 dosis carga → 4 mg/kg c/12h IV → transición VO 200-300 mg c/12h', route: 'IV → VO', duration: '≥6-12 semanas (hasta resolución radiológica + recuperación inmune)', note: 'Primera línea con mayor evidencia. Monitorizar niveles séricos (objetivo 1-5.5 mg/L). Hepatotoxicidad, alucinaciones visuales, fotosensibilidad.' },
          { drug: 'Isavuconazol', dose: '200 mg c/8h × 6 dosis carga (48h) → 200 mg/día', route: 'IV/VO', duration: '≥6-12 semanas', note: 'Alternativa a voriconazol. Mejor tolerabilidad (sin prolongación QT, menos hepatotoxicidad). Perfil de interacciones similar.' }
        ],
        secondLine: [
          { drug: 'Anfotericina B liposomal', dose: '3-5 mg/kg/día', route: 'IV', duration: '≥6-12 semanas', note: 'Si resistencia a azoles (mutación cyp51A), intolerancia o interacciones que impiden voriconazol.' },
          { drug: 'Caspofungina', dose: '70 mg día 1 → 50 mg/día', route: 'IV', duration: 'Hasta mejoría clínica → cambio a azol', note: 'Como terapia de rescate en monoterapia o combinación con azol en IPA refractaria.' }
        ],
        allergyAlternatives: [
          { drug: 'Posaconazol', allergyTo: 'Voriconazol + Isavuconazol (interacciones o intolerancia)', dose: '300 mg c/12h × 2 dosis carga → 300 mg/día (comp. liberación prolongada)', route: 'VO', duration: '≥6-12 semanas', note: 'Solo formulación de liberación prolongada o IV. No suspensión oral (absorción errática).' }
        ],
        notes: 'Retirar o reducir inmunosupresión si posible. G-CSF para acortar duración de neutropenia. No se recomienda terapia combinada de rutina (voriconazol + equinocandina) fuera de casos refractarios. Galactomanano sérico como marcador de respuesta (debe negativizarse). Duración total guiada por TC seriado y recuperación inmune.',
        source: 'IDSA 2016 · ESCMID/ECMM 2018 · ECIL-6 2018 · Sanford Guide 2024'
      }
    },
    {
      id: 'ipa-uci-no-neutropenico',
      name: 'UCI / No Neutropénico (UCIASP)',
      context: 'Aspergilosis adquirida en UCI: EPOC grave, corticoides sistémicos, cirrosis avanzada, COVID-19 grave (CAPA). Diagnóstico difícil — galactomanano en BAL + TC + clínica. Mortalidad >50%.',
      treatment: {
        firstLine: [
          { drug: 'Voriconazol', dose: '6 mg/kg c/12h × 2 dosis → 4 mg/kg c/12h IV', route: 'IV → VO cuando posible', duration: '≥6-12 semanas según respuesta', note: 'Misma pauta que en neutropénico. Monitorizar niveles. Interacciones con sedantes y anestésicos frecuentes en UCI.' },
          { drug: 'Isavuconazol', dose: '200 mg c/8h × 6 dosis → 200 mg/día', route: 'IV/VO', duration: '≥6-12 semanas', note: 'Preferible en UCI por mejor perfil de interacciones y sin prolongación QT (pacientes polimedicados).' }
        ],
        secondLine: [
          { drug: 'Anfotericina B liposomal', dose: '3-5 mg/kg/día IV', route: 'IV', duration: '≥6-12 semanas', note: 'Si azoles contraindicados o resistencia (Aspergillus terreus y algunas cepas de A. fumigatus con resistencia adquirida).' }
        ],
        allergyAlternatives: [
          { drug: 'Caspofungina', allergyTo: 'Azoles + AnfB (intolerancia múltiple)', dose: '70 mg → 50 mg/día IV', route: 'IV', duration: 'Hasta posibilidad de azoles o AnfB', note: 'Actividad inferior a azoles en IPA — preferir si otras opciones imposibles.' }
        ],
        notes: 'CAPA (COVID-19 Associated Pulmonary Aspergillosis): alta sospecha en COVID-19 grave con VM + galactomanano BAL ≥1 o cultivo positivo. Reducir corticoides si clínicamente posible. Vigilar resistencia a azoles (A. fumigatus TR34/L98H — prevalente en algunas regiones europeas). Test de sensibilidad antifúngica en todos los aislamientos.',
        source: 'ISHAM/ESCMID 2022 (CAPA) · IDSA 2016 · ECMM 2021 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'mucormicosis',
  name: 'Mucormicosis (Zigomicosis)',
  aliases: ['mucormicosis', 'zigomicosis', 'mucor', 'rhizopus', 'hongo negro', 'rinosinusal hongo', 'hongo diabetico', 'hongo cetoacidosis', 'mucor nasal', 'necrosis nasal hongo'],
  category: 'Fúngicas Invasivas',
  icon: '🍄',
  subtypes: [
    {
      id: 'mucormicosis-rinocerebral',
      name: 'Rinosinusal / Rinocerebral (Diabético / DKA)',
      context: 'Diabetes mal controlada / DKA es el principal FR. Triángulo: fiebre + necrosis nasal o palatina negra + oftalmoplegia/proptosis. TC/RMN urgentes. Mortalidad >50% si no se actúa en horas.',
      treatment: {
        firstLine: [
          { drug: 'Anfotericina B liposomal', dose: '5-10 mg/kg/día', route: 'IV', duration: 'Hasta estabilización clínica-radiológica (semanas) → step-down a posaconazol', note: '⚠️ PRIMERA LÍNEA ÚNICA. La dosis alta (5-10 mg/kg) es esencial — dosis bajas son insuficientes. La mucormicosis es inherentemente resistente a voriconazol, fluconazol y equinocandinas.' }
        ],
        secondLine: [
          { drug: 'Isavuconazol', dose: '200 mg c/8h × 6 dosis → 200 mg/día', route: 'IV/VO', duration: 'Step-down desde AnfB o si intolerancia', note: 'Aprobado para mucormicosis. Alternativa razonable como step-down oral o si AnfB no tolerada.' },
          { drug: 'Posaconazol', dose: '300 mg c/12h × 2 dosis → 300 mg/día (comp. LP) o 200 mg c/8h (suspensión)', route: 'VO/IV', duration: 'Step-down desde AnfB tras estabilización', note: 'Otra opción de mantenimiento oral. Monitorizar niveles (objetivo >0.7 mg/L).' }
        ],
        allergyAlternatives: [
          { drug: 'Anfotericina B desoxicolato', allergyTo: 'AnfB liposomal (no disponible)', dose: '1-1.5 mg/kg/día', route: 'IV', duration: 'Hasta disponibilidad de formulación liposomal', note: 'Mayor nefrotoxicidad — hidratación agresiva, monitorizar creatinina diariamente. Preferir siempre formulación liposomal si disponible.' }
        ],
        notes: '🔴 TRATAMIENTO QUIRÚRGICO URGENTE ES OBLIGATORIO: desbridamiento agresivo y repetido de todo tejido necrótico (nasal, sinusal, orbitario, palatino) en 24-48h. Sin cirugía, el antifúngico solo es insuficiente. CONTROL METABÓLICO URGENTE: corrección de la DKA es coadyuvante esencial. No usar corticoides. Eliminar deferoxamina si el paciente la recibe (quelante que aumenta el hierro disponible para el hongo).',
        source: 'ECMM 2021 · IDSA · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'mucormicosis-pulmonar',
      name: 'Pulmonar / Diseminada (Neutropénico / Trasplante)',
      context: 'Segunda forma más frecuente. Neutropenia prolongada, trasplante de MO, hemopatías. Puede coexistir con aspergilosis (diagnóstico diferencial difícil). TC: múltiples nódulos, signo del halo inverso.',
      treatment: {
        firstLine: [
          { drug: 'Anfotericina B liposomal', dose: '5-10 mg/kg/día', route: 'IV', duration: 'Hasta respuesta clínica → step-down a isavuconazol/posaconazol VO', note: 'Misma pauta que rinocerebral. La dosis alta es esencial. Monitorizar función renal.' }
        ],
        secondLine: [
          { drug: 'Isavuconazol', dose: '200 mg c/8h × 6 dosis → 200 mg/día', route: 'VO/IV', duration: 'Step-down desde AnfB hasta resolución (meses)', note: 'Step-down una vez estabilizado hemodinámicamente y con tolerancia oral.' }
        ],
        allergyAlternatives: [
          { drug: 'Posaconazol LP', allergyTo: 'Isavuconazol', dose: '300 mg c/12h × 2 → 300 mg/día', route: 'VO/IV', duration: 'Step-down hasta resolución' }
        ],
        notes: 'Cirugía si lesión pulmonar localizada (lobectomía/wedge resection) — mejora la supervivencia. Reducir inmunosupresión si posible. G-CSF para recuperar la neutropenia. La diseminación a SNC conlleva mortalidad casi universal. Galactomanano puede ser negativo (diferencia con aspergilosis). PCR/metagenómica en BAL cada vez más útil.',
        source: 'ECMM 2021 · IDSA · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'micosis-profundas',
  name: 'Micosis Profundas Endémicas',
  aliases: ['histoplasmosis', 'coccidioidomicosis', 'blastomicosis', 'micosis profundas', 'micosis sistemicas', 'histoplasma', 'coccidioides', 'blastomyces', 'hongo endemico', 'viajero fiebre hongo', 'paracoccidioidomicosis'],
  category: 'Fúngicas Invasivas',
  icon: '🍄',
  subtypes: [
    {
      id: 'histoplasmosis',
      name: 'Histoplasmosis (Histoplasma capsulatum)',
      context: 'Endémica en valles del Ohio-Mississippi (USA) y América Latina. Inhalación de esporas en suelos con guano (cuevas, aves). Desde síndrome gripal leve hasta diseminada grave en inmunodeprimidos.',
      treatment: {
        firstLine: [
          { drug: 'Itraconazol', dose: '200 mg c/8h × 3 días → 200 mg c/12h', route: 'VO (cápsulas con comida grasa o solución oral en ayunas)', duration: '6-12 semanas (pulmonar aguda) · 12 meses (diseminada crónica)', note: 'Primera línea en formas leve-moderadas. Monitorizar niveles (objetivo >1 mg/L). Múltiples interacciones.' },
          { drug: 'Anfotericina B liposomal', dose: '3 mg/kg/día', route: 'IV', duration: '1-2 semanas → step-down a itraconazol', note: 'Formas graves/diseminadas o con disfunción orgánica. Más rápido comienzo de acción.' }
        ],
        secondLine: [
          { drug: 'Fluconazol', dose: '400-800 mg/día', route: 'VO/IV', duration: '12 meses', note: 'Inferior al itraconazol — solo si intolerancia o interacciones que impiden itraconazol.' }
        ],
        allergyAlternatives: [
          { drug: 'Voriconazol', allergyTo: 'Itraconazol (intolerancia)', dose: '200 mg c/12h', route: 'VO', duration: '12 meses', note: 'Menor evidencia que itraconazol pero eficaz. Útil si SNC afectado (mejor penetración).' }
        ],
        notes: 'Antígeno urinario de Histoplasma: sensibilidad >90% en formas diseminadas, útil también en BAL. VIH/SIDA: mantenimiento con itraconazol indefinido si CD4 <150 (suspender al alcanzar CD4 >150 ×6m con TAR). Meningitis por Histoplasma: AnfB liposomal 5mg/kg/d × 4-6 semanas → itraconazol × ≥12 meses.',
        source: 'IDSA 2007 (actualizado) · CDC · Sanford Guide 2024'
      }
    },
    {
      id: 'coccidioidomicosis',
      name: 'Coccidioidomicosis (Coccidioides immitis / posadasii)',
      context: 'Endémica en desiertos del suroeste de EE.UU., México y América Latina (zonas áridas). 60% asintomática. Formas graves en inmunodeprimidos, embarazadas, afrodescendientes y filipinos.',
      treatment: {
        firstLine: [
          { drug: 'Fluconazol', dose: '400-800 mg/día', route: 'VO/IV', duration: '3-6 meses (pulmonar leve) · Indefinida (meníngea)', note: 'Primera línea por su penetración en LCR y disponibilidad. Meningitis coccidioidal: fluconazol TODA LA VIDA.' },
          { drug: 'Itraconazol', dose: '200 mg c/12h', route: 'VO', duration: '3-6 meses (pulmonar) · Indefinida si diseminada', note: 'Alternativa a fluconazol en formas no meníngeas. Mejor para lesiones osteoarticulares.' }
        ],
        secondLine: [
          { drug: 'Anfotericina B liposomal', dose: '3-5 mg/kg/día', route: 'IV', duration: '2-4 semanas → azol oral', note: 'Formas graves, shock o meningitis refractaria. No penetra bien en LCR (uso intratecal solo como rescate extremo).' }
        ],
        allergyAlternatives: [
          { drug: 'Posaconazol LP', allergyTo: 'Fluconazol + itraconazol', dose: '300 mg/día', route: 'VO', duration: 'Individualizada', note: 'Evidencia limitada pero eficaz en casos refractarios.' }
        ],
        notes: '⚠️ MENINGITIS COCCIDIOIDAL: tratamiento INDEFINIDO (fluconazol 400mg/d de por vida) — la suspensión lleva a recaída mortal. Embarazo: AnfB (azoles teratogénicos). Vigilar IC (fluconazol inhibe CYP2C9). Serología (IgM/IgG por fijación de complemento) como marcador de respuesta.',
        source: 'IDSA 2016 · CDC · Sanford Guide 2024'
      }
    },
    {
      id: 'blastomicosis',
      name: 'Blastomicosis (Blastomyces dermatitidis)',
      context: 'Endémica en cuenca del Mississippi-Ohio y Gran Lagos (USA/Canadá). Lesiones pulmonares + cutáneas verrugosas características. Puede diseminarse a hueso, SNC y próstata.',
      treatment: {
        firstLine: [
          { drug: 'Itraconazol', dose: '200 mg c/8h × 3 días → 200 mg c/12h', route: 'VO', duration: '6-12 meses', note: 'Primera línea en formas leve-moderadas. Monitorizar niveles séricos (objetivo >1 mg/L).' },
          { drug: 'Anfotericina B liposomal', dose: '3-5 mg/kg/día', route: 'IV', duration: '1-2 semanas → itraconazol 6-12 meses', note: 'Formas graves, diseminadas, afectación SNC o embarazo.' }
        ],
        secondLine: [
          { drug: 'Voriconazol', dose: '400 mg c/12h × 2 dosis carga → 200 mg c/12h', route: 'VO/IV', duration: '12 meses', note: 'Preferido si afectación del SNC (mejor penetración en LCR que itraconazol). También útil en osteoarticular.' }
        ],
        allergyAlternatives: [
          { drug: 'Fluconazol', allergyTo: 'Itraconazol + voriconazol', dose: '400-800 mg/día', route: 'VO', duration: '6-12 meses', note: 'Eficacia inferior a itraconazol — solo si no hay alternativa.' }
        ],
        notes: 'Antígeno urinario de Blastomyces (sensibilidad ~90%). Afectación prostática frecuente — itraconazol tiene buena penetración. Embarazo: AnfB (teratogenicidad de azoles). Duración ≥12 meses si SNC o inmunodeprimido.',
        source: 'IDSA 2008 (actualizado) · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'micosis-superficiales',
  name: 'Infecciones Fúngicas Superficiales',
  aliases: ['candidiasis oral', 'candidiasis vaginal', 'muguet', 'aftas', 'tinea', 'tiña', 'dermatofitosis', 'onicomicosis', 'pitiriasis versicolor', 'hongos piel', 'hongos uñas', 'pie de atleta', 'tinea pedis', 'tinea corporis', 'tinea capitis'],
  category: 'Fúngicas Superficiales',
  icon: '🔬',
  subtypes: [
    {
      id: 'candidiasis-mucocutanea',
      name: 'Candidiasis Orofaríngea (Muguet) y Vulvovaginal',
      context: 'Muguet: placas blancas despegables en mucosa oral. Vulvovaginal: flujo blanco grumoso + prurito + eritema. Factores de riesgo: antibióticos, corticoides, diabetes, VIH, prótesis dental.',
      treatment: {
        firstLine: [
          { drug: 'Fluconazol (orofaríngea)', dose: '100-200 mg/día', route: 'VO', duration: '7-14 días', note: 'Primera línea sistémica. Superior a nistatina tópica en eficacia.' },
          { drug: 'Fluconazol (vulvovaginal no complicada)', dose: '150 mg dosis única', route: 'VO', duration: 'Dosis única', note: 'Cómodo y eficaz. Alternativa tópica: clotrimazol óvulo 500mg dosis única o crema × 3-7d.' }
        ],
        secondLine: [
          { drug: 'Nistatina suspensión (orofaríngea leve)', dose: '500.000 UI c/6h — retener en boca 2 minutos antes de tragar', route: 'Tópico oral', duration: '7-14 días', note: 'Solo en formas muy leves o cuando no es posible fluconazol sistémico.' },
          { drug: 'Fluconazol 150mg semanal (vulvovaginal recurrente)', dose: '150 mg/semana', route: 'VO', duration: '6 meses (supresión)', note: 'Si ≥4 episodios/año. Reducir dosis gradualmente al finalizar.' }
        ],
        allergyAlternatives: [
          { drug: 'Itraconazol (orofaríngea resistente)', allergyTo: 'Fluconazol / Candida resistente', dose: '200 mg/día solución oral', route: 'VO en ayunas', duration: '7-14 días', note: 'C. glabrata y C. krusei son frecuentemente resistentes a fluconazol — usar equinocandina IV si grave.' }
        ],
        notes: 'Candidiasis refractaria: pensar en C. glabrata o C. krusei — cultivo y sensibilidad. Inmunosupr: fluconazol profiláctico si mucositis intensa post-quimio. Higiene bucal y retirada de prótesis dental nocturna. Candida cutánea intertriginosa: clotrimazol crema c/12h × 2-4 semanas.',
        source: 'IDSA 2016 · ESCMID 2012 · Sanford Guide 2024'
      }
    },
    {
      id: 'dermatofitosis',
      name: 'Dermatofitosis / Tinea (Trichophyton, Microsporum, Epidermophyton)',
      context: 'Tinea pedis (pie de atleta), corporis/cruris (tiña corporal/inguinal), capitis (cuero cabelludo — niños), unguium (onicomicosis — uñas). Diagnóstico: microscopía KOH o cultivo en caso dudoso.',
      treatment: {
        firstLine: [
          { drug: 'Terbinafina tópica 1% (tinea pedis / corporis / cruris)', dose: 'Aplicar 1-2 veces/día', route: 'Tópico', duration: '1-2 semanas (corporis) · 2-4 semanas (pedis)', note: 'Mayor eficacia que azoles tópicos en dermatofitos. Fungicida (no fungistático).' },
          { drug: 'Terbinafina oral (onicomicosis)', dose: '250 mg/día', route: 'VO', duration: '6 semanas (uñas manos) · 12 semanas (uñas pies)', note: 'Primera línea en onicomicosis por dermatofitos. Hepatotoxicidad rara — transaminasas basales si hepatopatía previa.' }
        ],
        secondLine: [
          { drug: 'Itraconazol (onicomicosis — pauta pulsos)', dose: '200 mg c/12h × 7 días al mes', route: 'VO', duration: '2 meses (manos) · 3 meses (pies)', note: 'Pauta en pulsos. Útil si fallo a terbinafina o C. albicans concomitante.' },
          { drug: 'Griseofulvina (tinea capitis — niños)', dose: '10-20 mg/kg/día (micronizada)', route: 'VO con comida grasa', duration: '6-8 semanas', note: 'Clásico para tinea capitis pediátrica por Microsporum. Terbinafina superior para Trichophyton.' },
          { drug: 'Fluconazol (tinea capitis)', dose: '3-6 mg/kg/día (máx 150 mg/día)', route: 'VO', duration: '3-6 semanas', note: 'Alternativa si intolerancia a griseofulvina o terbinafina.' }
        ],
        allergyAlternatives: [
          { drug: 'Clotrimazol crema 1% o Miconazol crema 2%', allergyTo: 'Terbinafina tópica', dose: '2 veces/día', route: 'Tópico', duration: '4 semanas', note: 'Azoles tópicos: fungistáticos, requieren mayor duración que terbinafina.' }
        ],
        notes: 'Tinea capitis: añadir champú de ketoconazol o selenio sulfuro para reducir contagio. Tratar contactos domésticos asintomáticos con champú antifúngico. Onicomicosis: eficacia del tratamiento oral ~50-70% (confirmar con cultivo antes de tratar — solo 50% de las "onicomicosis" son fúngicas). Amorolfina o ciclopirox laca como alternativa tópica en onicomicosis leve.',
        source: 'IDSA · ESCMID 2022 · Sanford Guide 2024'
      }
    },
    {
      id: 'pitiriasis-versicolor',
      name: 'Pitiriasis Versicolor (Malassezia furfur)',
      context: 'Máculas hipo o hiperpigmentadas con fina descamación en tronco y espalda. Climas cálidos-húmedos. Diagnóstico: luz de Wood (fluorescencia amarillo-verdosa) o KOH (espagueti con albóndigas). No contagiosa.',
      treatment: {
        firstLine: [
          { drug: 'Ketoconazol champú 2%', dose: 'Aplicar en la lesión, dejar 5-10 min, aclarar — diariamente', route: 'Tópico', duration: '3-7 días consecutivos', note: 'Cómodo y eficaz. También champú de sulfuro de selenio 2.5%.' },
          { drug: 'Fluconazol', dose: '400 mg dosis única VO; o 200 mg × 2 dosis separadas 1 semana', route: 'VO', duration: '1-2 semanas', note: 'Muy eficaz en dosis única o dos dosis. Cómodo para el paciente.' }
        ],
        secondLine: [
          { drug: 'Itraconazol', dose: '200 mg/día', route: 'VO', duration: '5-7 días', note: 'Alternativa oral eficaz si fluconazol no disponible.' },
          { drug: 'Clotrimazol crema / solución tópica', dose: '2 veces/día', route: 'Tópico', duration: '2-4 semanas', note: 'Si afectación extensa el tópico es menos práctico que la pauta oral.' }
        ],
        allergyAlternatives: [
          { drug: 'Ciclopirox gel / crema', allergyTo: 'Azoles tópicos', dose: '2 veces/día', route: 'Tópico', duration: '2-4 semanas' }
        ],
        notes: 'La repigmentación es lenta (semanas-meses) aunque el hongo esté erradicado — advertir al paciente. Recurrencia muy frecuente (verano/calor). Profilaxis con fluconazol 400mg mensual o champú de ketoconazol mensual en veranos. NO tratar a los contactos (no es contagiosa).',
        source: 'IDSA · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'pcp-no-vih',
  name: 'Pneumocystis jirovecii (PCP) — No VIH',
  aliases: ['pcp', 'pneumocystis', 'pneumocystis jirovecii', 'pneumocystis carinii', 'pcp trasplante', 'pcp corticoides', 'pcp oncologico', 'infiltrado intersticial hongo', 'neumonía pneumocystis no vih'],
  category: 'Fúngicas Invasivas',
  icon: '🫁',
  subtypes: [
    {
      id: 'pcp-trasplante-inmunosupr',
      name: 'Trasplante de Órgano Sólido / Trasplante de MO',
      context: 'Pico de incidencia: 1-6 meses post-trasplante. Presentación más aguda que en VIH (días en lugar de semanas). Fiebre + disnea rápidamente progresiva + SatO2↓ + Rx/TC: vidrio deslustrado bilateral.',
      treatment: {
        firstLine: [
          { drug: 'TMP/SMX', dose: '15-20 mg/kg/día (parte TMP) en 3-4 dosis', route: 'IV (formas moderadas-graves) → VO si mejoría', duration: '21 días', note: 'Primera línea universal igual que en VIH. La reducción de inmunosupresión es coadyuvante esencial.' }
        ],
        secondLine: [
          { drug: 'Pentamidina isetionato', dose: '4 mg/kg/día IV', route: 'IV', duration: '21 días', note: 'Si alergia o intolerancia a TMP/SMX. Hipoglucemia, hipotensión, nefrotoxicidad — monitorizar glucemia.' },
          { drug: 'Atovaquona + Azitromicina', dose: 'Atovaquona 750 mg c/12h + Azitromicina 500 mg/día VO', route: 'VO', duration: '21 días', note: 'Solo formas LEVES (PaO2 >70). Menos eficaz en formas graves.' },
          { drug: 'Primaquina + Clindamicina', dose: 'Primaquina 30 mg/día + Clindamicina 600 mg c/6h IV', route: 'IV/VO', duration: '21 días', note: 'Alternativa razonable. Descartar déficit de G6PD antes de usar primaquina.' }
        ],
        allergyAlternatives: [
          { drug: 'Atovaquona', allergyTo: 'TMP/SMX + pentamidina (formas leves)', dose: '750 mg c/12h con comida grasa', route: 'VO', duration: '21 días' }
        ],
        notes: 'Corticosteroides en PCP no VIH: MENOR evidencia que en VIH — considerar si PaO2 <70 mmHg o gradiente A-a >35 (muchos centros los usan igualmente por analogía). Reducir inmunosupresión si posible (balancear riesgo de rechazo). Profilaxis post-PCP indefinida. β-D-glucano elevado (>80 pg/mL) apoya el diagnóstico.',
        source: 'IDSA 2009 · AST 2019 · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'pcp-corticoides-oncologico',
      name: 'Corticoides Sistémicos / Biológicos / Oncológico',
      context: 'Prednisona >20mg/día × >4 semanas, rituximab, inhibidores de checkpoint, quimioterapia (fludarabina, ciclofosfamida). Presentación aguda similar a trasplante.',
      treatment: {
        firstLine: [
          { drug: 'TMP/SMX', dose: '15-20 mg/kg/día (parte TMP) en 3-4 dosis', route: 'IV → VO si mejoría', duration: '21 días', note: 'Misma pauta. Reducir/suspender inmunosupresor causante si posible.' }
        ],
        secondLine: [
          { drug: 'Pentamidina isetionato', dose: '4 mg/kg/día', route: 'IV', duration: '21 días', note: 'Si intolerancia a TMP/SMX' },
          { drug: 'Primaquina + Clindamicina', dose: 'Primaquina 30 mg/día + Clindamicina 600-900 mg c/6-8h', route: 'IV/VO', duration: '21 días' }
        ],
        allergyAlternatives: [
          { drug: 'Atovaquona', allergyTo: 'TMP/SMX (formas leves-moderadas)', dose: '750 mg c/12h VO con comida grasa', route: 'VO', duration: '21 días' }
        ],
        notes: 'PROFILAXIS obligatoria: TMP/SMX 1 comprimido DS (160/800 mg) 3 días/semana o diariamente en: corticoides >20mg × >4 semanas, rituximab × 6-12 meses post-infusión, análogos de purina (fludarabina × 6-12 meses), inhibidores checkpoint (variable). Alternativa profilaxis: dapsona 100mg/d o atovaquona 1500mg/d si alergia a sulfonamidas.',
        source: 'IDSA 2009 · ASCO 2020 · ESMO · Sanford Guide 2024'
      }
    }
  ]
}

]; // fin ANTIBIOTIC_DATA_FUNGAL
