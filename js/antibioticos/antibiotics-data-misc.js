// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// Misceláneos: GI, Cardio, Piel menor, Neurológico, Diálisis (9)
// Fuentes: IDSA · ACG · ESC · ESCMID · Sanford Guide 2024
// ============================================

const ANTIBIOTIC_DATA_MISC = [

{
  id: 'gastroenteritis',
  name: 'Gastroenteritis Infecciosa',
  aliases: ['gastroenteritis', 'diarrea aguda', 'diarrea infecciosa', 'salmonella', 'campylobacter', 'shigella', 'giardia', 'giardiasis', 'cryptosporidium', 'diarrea viajero', 'fiebre tifoidea', 'intoxicacion alimentaria'],
  category: 'Gastrointestinal',
  icon: '🦠',
  subtypes: [
    {
      id: 'gastroenteritis-bacteriana',
      name: 'Bacteriana (Salmonella, Campylobacter, Shigella)',
      context: 'Diarrea aguda ± sangre, fiebre, náuseas. La mayoría autolimitada (3-7 días). Antibióticos solo indicados en casos específicos — el uso indiscriminado selecciona resistencias.',
      treatment: {
        firstLine: [
          { drug: 'Rehidratación oral / IV — PRIMERO', dose: 'SRO OMS o suero fisiológico IV si deshidratación grave', route: 'VO / IV', duration: 'Hasta tolerancia oral y deshidratación corregida', note: 'El tratamiento principal de toda gastroenteritis es la reposición hídrica. Los antibióticos son un complemento selectivo.' },
          { drug: 'Azitromicina (Campylobacter / Shigella / Fiebre tifoidea leve)', dose: '500 mg/día', route: 'VO', duration: '3-5 días (Campylobacter/Shigella) · 7 días (S. typhi)', note: 'Primera línea empírica para diarrea infecciosa bacteriana que requiera tratamiento. Menor resistencia que fluoroquinolonas.' },
          { drug: 'Ciprofloxacino (Shigella / Salmonella / Viajero grave)', dose: '500 mg c/12h', route: 'VO', duration: '3 días (Shigella) · 5-7 días (Salmonella)' , note: 'Solo si resistencia a azitromicina descartada localmente (<10%). Resistencia creciente en Campylobacter.' }
        ],
        secondLine: [
          { drug: 'Ceftriaxona (Fiebre tifoidea grave / Salmonella con bacteriemia)', dose: '2g/día', route: 'IV', duration: '10-14 días', note: 'Salmonella typhi grave o bacteriémica, inmunodeprimidos, extremos de edad.' }
        ],
        allergyAlternatives: [
          { drug: 'Doxiciclina (Vibrio cholerae)', allergyTo: 'Azitromicina + fluoroquinolonas', dose: '300 mg dosis única o 100 mg c/12h × 3d', route: 'VO', duration: '1-3 días', note: 'Cólera: acorta la duración de la diarrea y reduce la excreción del vibrión.' }
        ],
        notes: '⚠️ STEC O157 (E. coli productora de toxina Shiga): NO antibióticos — aumentan el riesgo de Síndrome Hemolítico Urémico. Salmonella no tifoidea sin factores de riesgo: NO tratar (prolonga la excreción fecal). Indicaciones de antibiótico: diarrea con sangre + fiebre, viajero con diarrea moderada-grave, inmunodeprimidos, >70 años, prótesis vasculares.',
        source: 'IDSA 2017 · ESCMID 2014 · ACG · Sanford Guide 2024'
      }
    },
    {
      id: 'gastroenteritis-parasitaria',
      name: 'Parasitaria (Giardia, Cryptosporidium, Entamoeba)',
      context: 'Diarrea crónica/subaguda, malabsorción, distensión. Giardia: diarrea espumosa + flatulencia + pérdida de peso. Cryptosporidium: severo en inmunodeprimidos. E. histolytica: disentería amebiana.',
      treatment: {
        firstLine: [
          { drug: 'Metronidazol (Giardia)', dose: '500 mg c/8h', route: 'VO', duration: '5-7 días', note: 'Primera línea para giardiasis. Alternativa: Tinidazol 2g dosis única (más cómodo, misma eficacia).' },
          { drug: 'Nitazoxanida (Cryptosporidium / Giardia)', dose: '500 mg c/12h', route: 'VO con comida', duration: '3 días', note: 'Cryptosporidium en inmunocompetente. En VIH: el TAR es el tratamiento definitivo — nitazoxanida como coadyuvante.' },
          { drug: 'Metronidazol + Paromomicina (E. histolytica)', dose: 'Metronidazol 750 mg c/8h × 7-10d → Paromomicina 25-35 mg/kg/día × 7d', route: 'VO', duration: '7-10d + 7d', note: 'Metronidazol elimina trofozoítos tisulares; paromomicina elimina quistes luminales. AMBOS obligatorios para prevenir recaída.' }
        ],
        secondLine: [
          { drug: 'Tinidazol (Giardia / Entamoeba)', dose: '2g dosis única (Giardia) · 2g/día × 3d (Entamoeba)', route: 'VO', duration: '1-3 días', note: 'Más cómodo que metronidazol. Misma eficacia o superior.' }
        ],
        allergyAlternatives: [
          { drug: 'Albendazol (Giardia)', allergyTo: 'Metronidazol/tinidazol', dose: '400 mg/día', route: 'VO', duration: '5 días', note: 'Alternativa con menor evidencia que metronidazol.' }
        ],
        notes: 'Giardia: tratar también a los contactos sintomáticos (familia, guardería). Cryptosporidium en VIH: TAR eficaz es el tratamiento definitivo (CD4 >100 → auto-resolución). Coproparasitológico × 3 muestras para diagnóstico. Higiene de manos y agua potable como prevención.',
        source: 'IDSA 2017 · WHO · Sanford Guide 2024'
      }
    },
    {
      id: 'helicobacter-pylori',
      name: 'H. pylori — Úlcera Péptica (Erradicación)',
      context: 'H. pylori en úlcera gastroduodenal activa o cicatricial, dispepsia funcional, linfoma MALT, o síntomas de infección. Diagnóstico: test del aliento C13/C14, antígeno en heces o biopsia endoscópica.',
      treatment: {
        firstLine: [
          { drug: 'Terapia Cuádruple Concomitante (14 días)', dose: 'IBP (omeprazol 20mg c/12h) + Amoxicilina 1g c/12h + Claritromicina 500mg c/12h + Metronidazol 500mg c/12h', route: 'VO', duration: '14 días (NO 7 días — la duración corta falla más)', note: 'Primera línea en España y Europa. Tasa de erradicación ~90%. La resistencia a claritromicina y metronidazol es alta en muchas regiones — conocer epidemiología local.' },
          { drug: 'Terapia Cuádruple con Bismuto (PBMT)', dose: 'IBP + Bismuto subcitrato 120mg c/6h + Metronidazol 500mg c/8h + Tetraciclina 500mg c/6h', route: 'VO', duration: '10-14 días', note: 'Alternativa válida especialmente si alta resistencia local a claritromicina. Kits comerciales: Pylera® (3 cáps c/8h + IBP).' }
        ],
        secondLine: [
          { drug: 'Terapia de Rescate con Levofloxacino', dose: 'IBP c/12h + Levofloxacino 500mg/día + Amoxicilina 1g c/12h', route: 'VO', duration: '14 días', note: 'Tras fracaso de primera línea. Resistencia a levofloxacino creciente (>15% en Europa) — usar como 2ª o 3ª línea.' },
          { drug: 'Terapia Cuádruple con Rifabutina', dose: 'IBP c/12h + Amoxicilina 1g c/12h + Rifabutina 150mg c/12h', route: 'VO', duration: '10 días', note: 'Tercera línea tras 2 fracasos previos. Mielosupresión con rifabutina — hemograma de control.' }
        ],
        allergyAlternatives: [
          { drug: 'Claritromicina + Metronidazol + IBP (sin amoxicilina)', allergyTo: 'Amoxicilina / Penicilinas', dose: 'IBP c/12h + Claritromicina 500mg c/12h + Metronidazol 500mg c/8h', route: 'VO', duration: '14 días', note: 'Triple terapia clásica si alergia a amoxicilina. Menor eficacia que la cuádruple.' }
        ],
        notes: 'Confirmar erradicación SIEMPRE con test del aliento C13/C14 o antígeno en heces ≥4 semanas post-tratamiento (y ≥2 semanas sin IBP). Si fracaso: cultivo + antibiograma antes del 3er intento. IBP: dosis doble mejora la eficacia. Omeprazol sustituible por pantoprazol, esomeprazol o rabeprazol.',
        source: 'ACG/CAG 2022 · European Registry on H. pylori (Hp-EuReg) · Maastricht VI 2022 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'pericarditis-infecciosa',
  name: 'Pericarditis Infecciosa',
  aliases: ['pericarditis', 'pericarditis viral', 'pericarditis bacteriana', 'derrame pericardico', 'dolor toracico pleuritico', 'frote pericardico', 'pericarditis purolenta', 'tamponade'],
  category: 'Cardiovascular',
  icon: '❤️',
  subtypes: [
    {
      id: 'pericarditis-viral-idiopatica',
      name: 'Viral / Idiopática (90% de los casos)',
      context: 'Dolor torácico pleurítico + frote pericárdico + cambios difusos del ST + derrame pericárdico. Coxsackievirus, echovirus, influenza, VHH-6 más frecuentes. La mayoría autolimitada.',
      treatment: {
        firstLine: [
          { drug: 'Ibuprofeno + Colchicina', dose: 'Ibuprofeno 600 mg c/8h (con comida) + Colchicina 0.5 mg c/12h', route: 'VO', duration: 'Ibuprofeno 2-4 semanas (pauta decreciente) · Colchicina 3 meses', note: 'Primera línea. La colchicina REDUCE A LA MITAD el riesgo de recurrencia (COPE trial). No suspender bruscamente el AINE.' },
          { drug: 'AAS + Colchicina', dose: 'AAS 750-1000 mg c/8h + Colchicina 0.5 mg c/12h', route: 'VO', duration: 'AAS 2-4 semanas decreciente · Colchicina 3 meses', note: 'Alternativa al ibuprofeno. Preferir AAS si infarto reciente o necesidad de antiagregación. Gastroprotección con IBP siempre.' }
        ],
        secondLine: [
          { drug: 'Corticoides (solo si refractaria a AINE + colchicina)', dose: 'Prednisona 0.2-0.5 mg/kg/día', route: 'VO', duration: '2-4 semanas con pauta decreciente lenta', note: 'ÚLTIMA OPCIÓN. Los corticoides aumentan el riesgo de recurrencia si se usan como primera línea o a dosis altas. Solo si contraindicación a AINE o enfermedad sistémica inflamatoria subyacente.' }
        ],
        allergyAlternatives: [
          { drug: 'Colchicina monoterapia', allergyTo: 'AINE + AAS (úlcera, ERC, anticoagulación)', dose: '0.5 mg c/12h', route: 'VO', duration: '3 meses', note: 'Si contraindicación a ambos AINE y AAS. Menor evidencia.' }
        ],
        notes: 'REPOSO hasta resolución de síntomas e inflamación (PCR normal). Atletas: restricción de ejercicio 3 meses post-resolución (riesgo de miocarditis asociada y arritmias). Pericardiocentesis si tamponade o derrame grande con signos hemodinámicos. Ecocardiograma obligatorio. Alta troponina = miocarditis asociada — manejo más restrictivo.',
        source: 'ESC 2015 · ESC 2022 Update · Sanford Guide 2024'
      }
    },
    {
      id: 'pericarditis-bacteriana-purulenta',
      name: 'Purulenta / Bacteriana (Urgencia)',
      context: 'Rara (<1% pericarditis). S. aureus, neumococo, Gram-negativos. Fiebre alta + toxicidad sistémica + rápido desarrollo de tamponade. Alta mortalidad sin tratamiento.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Ceftriaxona', dose: 'Vancomicina 15-20 mg/kg c/12h IV + Ceftriaxona 2g c/12h IV', route: 'IV', duration: '4-6 semanas', note: 'Cobertura empírica amplia (MRSA + Gram-). Ajustar según hemocultivos y cultivo de líquido pericárdico.' },
          { drug: 'Cloxacilina + Ceftriaxona', dose: 'Cloxacilina 2g c/4h IV + Ceftriaxona 2g/d IV', route: 'IV', duration: '4-6 semanas', note: 'Si MRSA menos probable y MSSA confirmado.' }
        ],
        secondLine: [
          { drug: 'Piperacilina-Tazobactam + Vancomicina', dose: '4.5g c/6h IV + Vancomicina 15mg/kg c/12h', route: 'IV', duration: '4-6 semanas', note: 'Si gram-negativos o inmunodeprimido.' }
        ],
        allergyAlternatives: [
          { drug: 'Daptomicina + Aztreonam', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Dapto 6mg/kg/d IV + Aztreonam 2g c/8h IV', route: 'IV', duration: '4-6 semanas' }
        ],
        notes: 'PERICARDIOCENTESIS URGENTE: diagnóstica (cultivo de líquido) y terapéutica. Drenaje quirúrgico (pericardiectomía/ventana) en la mayoría — el pericardio purulento tiende a tabicarse y no drena bien por punción. La constricción pericárdica es una complicación tardía frecuente.',
        source: 'ESC 2015 · IDSA · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'miocarditis-viral',
  name: 'Miocarditis Viral',
  aliases: ['miocarditis', 'miocarditis viral', 'miocarditis fulminante', 'insuficiencia cardiaca aguda joven', 'troponina elevada viral', 'carditis viral', 'miocarditis covid', 'miocarditis post-covid'],
  category: 'Cardiovascular',
  icon: '❤️',
  subtypes: [
    {
      id: 'miocarditis-aguda',
      name: 'Miocarditis Aguda / Subaguda',
      context: 'Dolor torácico + disnea + troponina elevada + disfunción sistólica nueva en contexto vírico reciente (coxsackievirus, parvovirus B19, adenovirus, VHH-6, SARS-CoV-2). RMN cardíaca (secuencias T2 y LGE): diagnóstico de referencia.',
      treatment: {
        firstLine: [
          { drug: 'Tratamiento de soporte (IC aguda)', dose: 'IECA/ARA-II + betabloqueante si FEVI reducida + diuréticos si congestión', route: 'VO/IV', duration: 'Indefinido según FEVI', note: 'La mayoría de miocarditis virales se recuperan solas — el tratamiento es de la IC resultante. Los antivirales NO tienen indicación rutinaria.' },
          { drug: 'Reposo absoluto', dose: 'Restricción actividad física intensa hasta normalización de troponina y FEVI', route: '—', duration: '3-6 meses (o hasta recuperación de FEVI)', note: 'El ejercicio durante la fase inflamatoria aumenta el riesgo de arritmias y muerte súbita. Atletas: 3-6 meses mínimo de restricción deportiva.' }
        ],
        secondLine: [
          { drug: 'Antiviral (casos seleccionados)', dose: 'Aciclovir/Ganciclovir si VHS/CMV demostrado por PCR en biopsia · Oseltamivir si influenza', route: 'IV/VO', duration: '14-21 días (VHS/CMV) · 5 días (influenza)', note: 'Solo si virus específico demostrado en biopsia endomiocárdica. No hay evidencia para uso empírico.' },
          { drug: 'Inmunosupresión (miocarditis autoinmune/granulomatosa)', dose: 'Prednisona 1-2 mg/kg/día', route: 'VO', duration: 'Meses con pauta decreciente según respuesta', note: 'Solo si biopsia demuestra infiltrado linfocítico (miocarditis autoinmune) o granulomatosa (sarcoidosis). Contraindicado en infección vírica activa.' }
        ],
        allergyAlternatives: [
          { drug: 'Asistencia mecánica circulatoria (LVAD/ECMO)', allergyTo: 'Miocarditis fulminante con shock cardiogénico', dose: 'ECMO veno-arterial o Impella según disponibilidad', route: 'Intervención', duration: 'Puente a recuperación (días-semanas)', note: 'La miocarditis fulminante puede recuperar completamente la función si el paciente sobrevive la fase aguda con soporte mecánico.' }
        ],
        notes: 'Biopsia endomiocárdica: considerar si: FEVI <50% que no mejora, arritmias ventriculares graves, bloqueo AV nuevo o IC fulminante. La mayoría de miocarditis víricas se recuperan en semanas-meses. Seguimiento con RMN cardíaca a los 6 meses. Causa frecuente de MCDilat en jóvenes. Post-COVID/vacuna mRNA: miocarditis leve-moderada, generalmente autolimitada.',
        source: 'ESC 2013 · ESC Position Statement 2022 · AHA/ACC · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'paroniquia',
  name: 'Paroniquia (Perionixis)',
  aliases: ['paroniquia', 'perionixis', 'infeccion uña', 'infeccion pliegue ungueal', 'paroniquía aguda', 'paroniquia cronica', 'dedo inflamado uña', 'pus uña'],
  category: 'Piel / Tejidos Blandos',
  icon: '🤚',
  subtypes: [
    {
      id: 'paroniquia-aguda',
      name: 'Aguda (Bacteriana — S. aureus, Estreptococo)',
      context: 'Inflamación dolorosa del pliegue ungueal lateral/proximal de instauración aguda. Fluctuación = colección purulenta. Trauma, mordedura de uñas o manipulación como desencadenante.',
      treatment: {
        firstLine: [
          { drug: 'Drenaje + Amoxicilina-Clavulánico', dose: 'AmoxiClav 875/125 mg c/12h VO (si celulitis extensa)', route: 'VO', duration: '5-7 días', note: 'El drenaje ES el tratamiento principal — sin drenaje el antibiótico es insuficiente. Antibiótico solo si hay celulitis que se extiende más allá del pliegue.' },
          { drug: 'Solo drenaje (sin antibiótico) si no hay celulitis', dose: 'Incisión con hoja n°11 o aguja bajo anestesia local', route: 'Local', duration: 'Única', note: 'La mayoría de paroniquia aguda fluctuante solo necesita drenaje, cura local y calor húmedo — sin antibiótico.' }
        ],
        secondLine: [
          { drug: 'Clindamicina (si MRSA probable)', dose: '300 mg c/8h', route: 'VO', duration: '5-7 días', note: 'Si factores de riesgo MRSA (herida por mordedura, MRSA previo, adicto a drogas IV).' },
          { drug: 'TMP/SMX (si MRSA probable)', dose: '1DS c/12h', route: 'VO', duration: '5-7 días' }
        ],
        allergyAlternatives: [
          { drug: 'Cefalexina', allergyTo: 'Amoxicilina (alergia no severa)', dose: '500 mg c/6h', route: 'VO', duration: '5-7 días' }
        ],
        notes: 'Calor húmedo 3-4 veces/día + curas locales con antiséptico. Si no drena con incisión: marsupialización del pliegue. Evitar manipulación de cutículas y morderse las uñas como prevención. Afectación del espacio periungueal completo: considerar panadizo.',
        source: 'IDSA · Sanford Guide 2024 · UpToDate'
      }
    },
    {
      id: 'paroniquia-cronica',
      name: 'Crónica (Fúngica — Candida spp.)',
      context: 'Pliegue ungueal eritematoso, engrosado, sin pus, con distrofia ungueal de evolución >6 semanas. Manos inmersas en agua (cocina, limpieza). Candida albicans es el agente más frecuente.',
      treatment: {
        firstLine: [
          { drug: 'Clotrimazol crema 1% o Miconazol crema 2%', dose: 'Aplicar 2 veces/día en el pliegue ungueal', route: 'Tópico', duration: '2-4 semanas', note: 'Primera línea en formas leves. Mantener las manos secas — fundamental para el éxito.' },
          { drug: 'Fluconazol', dose: '150 mg/semana', route: 'VO', duration: '4-6 semanas', note: 'Si fallo tópico o afectación extensa. Monitorizar función hepática si uso prolongado.' }
        ],
        secondLine: [
          { drug: 'Itraconazol', dose: '200 mg/día', route: 'VO', duration: '4-6 semanas', note: 'Si resistencia a fluconazol o C. glabrata/C. krusei.' }
        ],
        allergyAlternatives: [
          { drug: 'Ciclopirox laca ungueal', allergyTo: 'Azoles tópicos', dose: 'Aplicar 1 vez/día en pliegue y uña', route: 'Tópico', duration: '3-6 meses' }
        ],
        notes: 'La medida más importante es MANTENER LAS MANOS SECAS: guantes de algodón bajo guantes de goma si manos en agua, secar bien entre los dedos. El uso de jabones irritantes y detergentes agrava el problema. Si bacteriana secundaria (S. aureus): añadir antibiótico tópico (mupirocina) o sistémico. Recidiva frecuente si no se elimina la humedad.',
        source: 'IDSA · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'panadizo',
  name: 'Panadizo / Felón Digital',
  aliases: ['panadizo', 'felon', 'felón digital', 'panadizo herpético', 'herpes dedo', 'infeccion pulpejo dedo', 'pulpejo dedo inflamado', 'whitlow', 'herpetic whitlow', 'panadizo bacteriano'],
  category: 'Piel / Tejidos Blandos',
  icon: '🤚',
  subtypes: [
    {
      id: 'panadizo-bacteriano',
      name: 'Bacteriano (Felón Digital — S. aureus)',
      context: 'Infección del espacio pulpar distal del dedo (compartimento cerrado). Dolor pulsátil intenso + tensión + eritema + tumefacción del pulpejo. Puede progresar a osteomielitis o tendovaginitis.',
      treatment: {
        firstLine: [
          { drug: 'Drenaje quirúrgico + Amoxicilina-Clavulánico', dose: 'Cirugía local + AmoxiClav 875/125 mg c/12h VO', route: 'Quirúrgico + VO', duration: '7-10 días (antibiótico)', note: 'El DRENAJE QUIRÚRGICO es el tratamiento definitivo. Sin drenaje: necrosis isquémica del pulpejo, tendovaginitis o osteomielitis. Incisión lateral bajo anestesia de bloqueo digital.' }
        ],
        secondLine: [
          { drug: 'Clindamicina (si MRSA probable)', dose: '300 mg c/8h', route: 'VO', duration: '7-10 días', note: 'Si herida por mordedura, MRSA previo o no mejora con amox-clav.' },
          { drug: 'TMP/SMX', dose: '1DS c/12h', route: 'VO', duration: '7-10 días', note: 'Alternativa MRSA si clindamicina no disponible.' }
        ],
        allergyAlternatives: [
          { drug: 'Cefalexina', allergyTo: 'Amoxicilina (no severa)', dose: '500 mg c/6h', route: 'VO', duration: '7-10 días' }
        ],
        notes: 'Si sospecha de extensión a tendovaina (flexión pasiva dolorosa + dolor a la palpación de toda la vaina): urgencia quirúrgica (tendovaginitis séptica). Elevación + antibiótico IV y drenaje urgente en tendovaginitis. Radiografía para descartar cuerpo extraño y osteomielitis.',
        source: 'IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'panadizo-herpetico',
      name: 'Herpético (VHS-1/VHS-2 — Sanitarios, Niños)',
      context: 'Vesículas dolorosas agrupadas en el pulpejo + edema + fiebre. Frecuente en dentistas, médicos, enfermeras (VHS-1 oral del paciente). Niños que se chupan los dedos. Diagnóstico clínico.',
      treatment: {
        firstLine: [
          { drug: 'Aciclovir', dose: '400 mg c/8h', route: 'VO', duration: '7-10 días', note: 'Acorta la duración y previene la diseminación. Iniciar en los primeros 48-72h desde el inicio de las vesículas.' },
          { drug: 'Valaciclovir', dose: '1g c/12h', route: 'VO', duration: '7-10 días', note: 'Alternativa más cómoda (2 tomas/día). Misma eficacia.' }
        ],
        secondLine: [
          { drug: 'Foscarnet', dose: '40 mg/kg c/8h', route: 'IV', duration: '7-10 días', note: 'Resistencia a aciclovir en inmunodeprimido (VIH con CD4 bajo, trasplante).' }
        ],
        allergyAlternatives: [
          { drug: 'Famciclovir', allergyTo: 'Aciclovir/valaciclovir', dose: '250 mg c/8h', route: 'VO', duration: '7-10 días' }
        ],
        notes: '⚠️ NO INCIDIR el panadizo herpético (disemina el virus y puede causar encefalitis). La diferencia con el bacteriano es clave: vesículas (herpético) vs. pústula tensa (bacteriano). Guantes impermeables SIEMPRE en sanitarios que contacten con mucosas orales. El panadizo herpético recidiva — profilaxis con valaciclovir 500mg/día si >6 episodios/año.',
        source: 'IDSA · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'empiema-subdural',
  name: 'Empiema / Absceso Subdural o Epidural Intracraneal',
  aliases: ['empiema subdural', 'absceso subdural', 'empiema epidural', 'absceso epidural cerebral', 'empiema intracraneal', 'sinusitis complicada snc', 'focalidad neurologica fiebre sinusitis', 'coleccion intracraneal'],
  category: 'SNC',
  icon: '🧠',
  subtypes: [
    {
      id: 'empiema-subdural-post-sinusitis',
      name: 'Post-Sinusal / Post-Ótico (Origen Contiguo)',
      context: 'Complicación grave de sinusitis frontal o mastoiditis. Jóvenes varones predominantemente. Fiebre + cefalea intensa + signos meníngeos + focalidad neurológica + convulsiones. TC/RMN urgente. Colección subdural o epidural hiperdensa.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona + Metronidazol + Vancomicina', dose: 'Ceftriaxona 2g c/12h IV + Metronidazol 500 mg c/8h IV + Vancomicina 15-20 mg/kg c/12h IV', route: 'IV', duration: '4-8 semanas', note: 'Cobertura empírica amplia: estreptococos (incluyendo MRSA), anaerobios y Gram-. Ajustar según cultivo intraoperatorio.' }
        ],
        secondLine: [
          { drug: 'Meropenem + Vancomicina', dose: 'Meropenem 2g c/8h + Vancomicina 15-20mg/kg c/12h IV', route: 'IV', duration: '4-8 semanas', note: 'Si MDR o no mejoría con la pauta inicial.' }
        ],
        allergyAlternatives: [
          { drug: 'Levofloxacino + Metronidazol + Linezolid', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Levo 750mg/d + Metro 500mg c/8h + Linezolid 600mg c/12h IV', route: 'IV', duration: '4-8 semanas' }
        ],
        notes: '🔴 CIRUGÍA URGENTE (craniotomía o trépanos con drenaje) en casi todos los casos — el empiema subdural no drena por punción. Antibiótico iniciado antes de cirugía pero NO retardar la cirugía. Anticonvulsivantes profilácticos (levetiracetam). Dexametasona si edema cerebral. Tratar el foco de origen (sinusitis frontal, mastoiditis) simultáneamente. Mortalidad 10-40% incluso con tratamiento.',
        source: 'IDSA · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'empiema-subdural-postquirurgico',
      name: 'Post-Quirúrgico / Post-Traumático',
      context: 'Cirugía craneal, derivación ventricular, traumatismo craneoencefálico penetrante. S. aureus, S. epidermidis, Gram-negativos. Fiebre + disfunción de derivación + signos neurológicos.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Cefepima', dose: 'Vancomicina 15-20 mg/kg c/8-12h IV + Cefepima 2g c/8h IV', route: 'IV', duration: '4-8 semanas', note: 'Cobertura MRSA + Pseudomonas post-quirúrgico.' },
          { drug: 'Vancomicina + Meropenem', dose: 'Vancomicina 15-20 mg/kg c/12h + Meropenem 2g c/8h IV', route: 'IV', duration: '4-8 semanas', note: 'Si MDR o Gram- resistentes.' }
        ],
        secondLine: [
          { drug: '+ Rifampicina', dose: '300-450 mg c/12h VO (añadir a pauta base)', route: 'VO', duration: '4-8 semanas', note: 'Añadir si S. aureus o SCN en infección de material protésico (derivación): penetración en biofilm y efecto sinérgico.' }
        ],
        allergyAlternatives: [
          { drug: 'Linezolid + Aztreonam', allergyTo: 'Vancomicina + cefalosporinas', dose: 'Linezolid 600mg c/12h + Aztreonam 2g c/8h IV', route: 'IV', duration: '4-8 semanas' }
        ],
        notes: 'Retirar/revisar derivaciones o material extraño. Cultivo intraoperatorio imprescindible para guiar el tratamiento definitivo. Considerar vancomicina intratecal (10-20 mg/d) si ventriculitis asociada. La duración de 4-8 semanas depende de la resolución radiológica y clínica.',
        source: 'IDSA · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'trombosis-seno-cavernoso',
  name: 'Trombosis Séptica del Seno Cavernoso',
  aliases: ['trombosis seno cavernoso', 'seno cavernoso', 'oftalmoplejia fiebre', 'proptosis fiebre', 'trombosis septica', 'exoftalmos bilateral fiebre', 'cavernous sinus thrombosis', 'tsc'],
  category: 'SNC',
  icon: '🧠',
  subtypes: [
    {
      id: 'tsc-sinusitis-dental',
      name: 'Por Sinusitis / Dental (Origen Facial / Paranasal)',
      context: 'Oftalmoplejía dolorosa + proptosis bilateral + edema periorbitario bilateral + fiebre alta + sepsis. Foco: sinusitis esfenoidal, etmoidal o dental. Triángulo peligroso de la cara. S. aureus (MRSA), Streptococcus, anaerobios. RMN cerebral + venografía urgente.',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina + Piperacilina-Tazobactam + Metronidazol', dose: 'Vancomicina 15-20 mg/kg c/12h IV + PipTazo 4.5g c/6h IV + Metronidazol 500mg c/8h IV', route: 'IV', duration: '3-6 semanas', note: 'Cobertura máxima empírica. MRSA + Gram- + anaerobios. Ajustar según hemocultivos y cultivo de foco.' }
        ],
        secondLine: [
          { drug: 'Vancomicina + Meropenem', dose: 'Vancomicina 15-20mg/kg c/12h + Meropenem 2g c/8h IV', route: 'IV', duration: '3-6 semanas', note: 'Si MDR o sin mejoría en 48-72h.' }
        ],
        allergyAlternatives: [
          { drug: 'Linezolid + Aztreonam + Metronidazol', allergyTo: 'β-lactámicos (alergia severa)', dose: 'Linezolid 600mg c/12h + Aztreonam 2g c/8h + Metro 500mg c/8h IV', route: 'IV', duration: '3-6 semanas' }
        ],
        notes: '⚠️ ANTICOAGULACIÓN: controvertida pero la mayoría de expertos la recomiendan (HBPM o heparina IV) para prevenir propagación del trombo y embolia séptica. Drenaje quirúrgico del foco primario (sinusitis esfenoidal: drenaje endoscópico urgente). Extracción dental si foco odontogénico. Mortalidad 20-30% incluso con tratamiento agresivo. Complicaciones: meningitis, absceso cerebral, arteria carótida interna.',
        source: 'IDSA · UpToDate · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'peritonitis-dialisis',
  name: 'Peritonitis en Diálisis Peritoneal',
  aliases: ['peritonitis dialisis peritoneal', 'dp peritonitis', 'peritoneal dialysis peritonitis', 'liquido turbio dialisis', 'infeccion dp', 'cateter tenckhoff infeccion', 'dpca peritonitis'],
  category: 'Gastrointestinal',
  icon: '🫘',
  subtypes: [
    {
      id: 'peritonitis-dp-inicial',
      name: 'Empírica Inicial (Gram+, Gram- y Hongos)',
      context: 'Líquido de diálisis turbio + dolor abdominal + recuento de leucocitos en LP >100/µL (>50% PMN). La mayoría por S. epidermidis, S. aureus, Gram-. Diagnóstico: recuento celular + cultivo de LP (volumen grande en botella de hemocultivo).',
      treatment: {
        firstLine: [
          { drug: 'Vancomicina IP + Ceftazidima IP (terapia empírica)', dose: 'Vancomicina: 15-30 mg/kg en bolsa de DP (una vez cada 5-7 días según niveles residuales) + Ceftazidima 1.5 g/bolsa de DP una vez al día (dwell mínimo 6h)', route: 'Intraperitoneal (IP)', duration: '14-21 días según patógeno', note: 'Vía IP tiene concentraciones locales muy superiores a la vía IV. Tiempo de permanencia (dwell) ≥6 horas para máxima absorción.' }
        ],
        secondLine: [
          { drug: 'Cefalotina IP + Ceftazidima IP (zonas baja prevalencia MRSA)', dose: 'Cefalotina 500 mg/L en cada intercambio (mantenimiento) o 1g/L en primer intercambio + Ceftazidima 1g/L', route: 'IP', duration: '14-21 días', note: 'Alternativa a vancomicina si baja prevalencia de MRSA en el centro. Preferida en guías internacionales para preservar vancomicina.' }
        ],
        allergyAlternatives: [
          { drug: 'Gentamicina IP (si alergia cefalosporinas)', allergyTo: 'Cefalosporinas', dose: '0.6 mg/kg/bolsa una vez al día', route: 'IP', duration: '14-21 días', note: 'Precaución en pacientes con función renal residual: ototoxicidad y nefrotoxicidad.' }
        ],
        notes: 'Ajuste del antibiótico según cultivo de LP a las 48-72h. RETIRAR CATÉTER si: no mejora en 5 días con tratamiento correcto, peritonitis por hongos (Candida — RETIRAR SIEMPRE + fluconazol/micafungina), peritonitis refractaria, peritonitis polimicrobiana (sugestiva de perforación intestinal — cirugía), infección del túnel catéter asociada.',
        source: 'ISPD Guidelines 2022 · Sanford Guide 2024'
      }
    },
    {
      id: 'peritonitis-dp-dirigida',
      name: 'Dirigida por Cultivo (S. aureus / Gram- / Candida)',
      context: 'Tratamiento específico una vez disponible el cultivo del líquido peritoneal (48-72h).',
      treatment: {
        firstLine: [
          { drug: 'Cloxacilina IP (S. aureus MSSA)', dose: '125 mg/L en cada intercambio', route: 'IP', duration: '21 días', note: 'DESESCALAR de vancomicina a cloxacilina IP si MSSA confirmado — siempre que sea posible.' },
          { drug: 'Vancomicina IP (S. aureus MRSA / SCN resistente)', dose: '15-30 mg/kg IP cada 5-7 días (ajustar por niveles)', route: 'IP', duration: '21 días' },
          { drug: 'Ceftazidima IP (P. aeruginosa)', dose: '1-1.5 g/bolsa una vez al día', route: 'IP', duration: '21 días', note: 'Pseudomonas: siempre 21 días mínimo + considerar retirada de catéter si no respuesta precoz.' }
        ],
        secondLine: [
          { drug: 'Micafungina IV + Retirada del Catéter (Candida)', dose: 'Micafungina 100-150 mg/día IV', route: 'IV', duration: '14 días desde hemocultivo/LP negativo', note: 'Candida peritonitis: RETIRAR CATÉTER INMEDIATAMENTE. Fluconazol 400mg/d si C. albicans sensible y estable.' }
        ],
        allergyAlternatives: [
          { drug: 'Imipenem/Cilastatina IP (Gram- multirresistente)', allergyTo: 'Ceftazidima (resistencia)', dose: '250 mg/L en intercambios prolongados', route: 'IP', duration: '21 días' }
        ],
        notes: 'Los cultivos negativos con respuesta clínica: continuar empírica 14 días. Las peritonitis por hongos tienen mortalidad del 20-30% — retirada del catéter urgente. Tras resolución: puede reinsertarse un nuevo catéter de DP en 4-6 semanas si no hay peritonitis fúngica.',
        source: 'ISPD Guidelines 2022 · Sanford Guide 2024'
      }
    }
  ]
}

]; // fin ANTIBIOTIC_DATA_MISC
