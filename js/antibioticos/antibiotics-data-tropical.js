// ============================================
// CLINICALC — GUÍA ANTIBIÓTICA
// Tropicales, Zoonosis y Bioterrorismo (11)
// Fuentes: WHO · CDC · IDSA · Sanford Guide 2024 · MSF Guidelines
// ============================================

const ANTIBIOTIC_DATA_TROPICAL = [

{
  id: 'malaria',
  name: 'Paludismo / Malaria',
  aliases: ['malaria', 'paludismo', 'plasmodium', 'plasmodium falciparum', 'plasmodium vivax', 'fiebre terciana', 'fiebre cuartana', 'artesunato', 'cloroquina', 'viajero fiebre', 'frottis sangre'],
  category: 'Tropicales / Importadas',
  icon: '🦟',
  subtypes: [
    {
      id: 'malaria-falciparum-no-complicada',
      name: 'P. falciparum No Complicada — Zona con Resistencia a Cloroquina',
      context: 'Fiebre + escalofríos + sudoración cada 48h + posible ictericia. Gota gruesa + extensión sangre obligatorias. La mayoría de P. falciparum importado es resistente a cloroquina.',
      treatment: {
        firstLine: [
          { drug: 'Artemether-Lumefantrina (Coartem®)', dose: '4 comp c/12h × 3 días (>35 kg)', route: 'VO con comida o leche grasa', duration: '3 días (6 dosis)', note: 'Primera línea WHO para P. falciparum no complicado. Tomar con comida para maximizar la absorción de lumefantrina.' },
          { drug: 'Atovaquona-Proguanil (Malarone®)', dose: '4 comp/día', route: 'VO con comida', duration: '3 días', note: 'Alternativa equivalente. Muy bien tolerada. Útil en viajeros porque también sirve de profilaxis.' }
        ],
        secondLine: [
          { drug: 'Dihidroartemisinina-Piperaquina (DHA-PQP)', dose: '3-4 comp/día según peso', route: 'VO', duration: '3 días', note: 'Si no disponibles las anteriores. Disponible en algunos países europeos.' }
        ],
        allergyAlternatives: [
          { drug: 'Quinina + Doxiciclina', allergyTo: 'Artemisininas / atovaquona', dose: 'Quinina 542 mg c/8h VO × 7d + Doxiciclina 100 mg c/12h × 7d', route: 'VO', duration: '7 días', note: 'Menos cómodo pero eficaz. Quinina causa cinconismo (tinnitus, cefalea, náuseas).' }
        ],
        notes: 'Control de gota gruesa a las 24-48h para confirmar aclaramiento parasitario. Hospitalizar siempre que sea posible para las primeras 24h (riesgo de progresión a grave). P. falciparum puede deteriorarse rápidamente — vigilancia estrecha.',
        source: 'WHO Guidelines Malaria 2023 · CDC · Sanford Guide 2024'
      }
    },
    {
      id: 'malaria-grave',
      name: 'Malaria Grave / Complicada (P. falciparum)',
      context: 'Criterios de gravedad: alteración de consciencia, convulsiones, anemia grave (Hb<7), IRA, hipoglucemia, shock, hemorragia, parasitemia >5%. UCI obligatoria.',
      treatment: {
        firstLine: [
          { drug: 'Artesunato IV', dose: '2.4 mg/kg IV en t=0, t=12h, t=24h → luego cada 24h', route: 'IV (infusión lenta 3-4 min)', duration: 'Hasta tolerar VO → completar con artemether-lumefantrina VO × 3d', note: 'PRIMERA LÍNEA ABSOLUTA en malaria grave. Superior a quinina IV (AQUAMAT, SEAQUAMAT trials). Solicitar con urgencia a farmacia hospitalaria / centros de referencia.' }
        ],
        secondLine: [
          { drug: 'Quinina IV + Doxiciclina', dose: 'Quinina 20 mg/kg en 4h (carga) → 10 mg/kg c/8h infusión lenta (4h) + Doxiciclina 100 mg c/12h IV', route: 'IV', duration: '7 días total (quinina 7d)', note: 'Si artesunato no disponible. Monitorizar QTc (quinina alarga QT). Hipoglucemia frecuente con quinina — glucosa horaria.' }
        ],
        allergyAlternatives: [
          { drug: 'Artemetér IM', allergyTo: 'Artesunato IV no disponible', dose: '3.2 mg/kg IM (carga) → 1.6 mg/kg/d IM', route: 'IM', duration: 'Hasta tolerar VO → artemether-lumefantrina VO', note: 'Inferior al artesunato IV pero mejor que la quinina en estudios pediátricos.' }
        ],
        notes: 'MALARIA CEREBRAL: protección vía aérea si GCS <10. NO corticoides (aumentan mortalidad). Exsanguinotransfusión si parasitemia >10-15% + grave. Hipoglucemia frecuente — dextrosa IV continua. Hemofiltración si IRA. Transfusión si Hb <7.',
        source: 'WHO Guidelines Malaria 2023 · CDC · Sanford Guide 2024'
      }
    },
    {
      id: 'malaria-vivax-ovale',
      name: 'P. vivax / P. ovale (con Hipnozoítos Hepáticos)',
      context: 'Fiebre terciaria benigna. Requiere tratamiento radical para eliminar hipnozoítos hepáticos y prevenir recaídas (hasta 3-5 años post-infección).',
      treatment: {
        firstLine: [
          { drug: 'Cloroquina + Primaquina', dose: 'Cloroquina: 600 mg → 300 mg en 6h → 300 mg/día × 2d. Primaquina: 15-30 mg/día × 14d', route: 'VO', duration: 'Cloroquina 3d + Primaquina 14d', note: '⚠️ DESCARTAR DÉFICIT DE G6PD antes de primaquina (hemólisis grave). Primaquina CONTRAINDICADA en embarazo (usar solo cloroquina y derivar para primaquina posparto).' }
        ],
        secondLine: [
          { drug: 'Artemether-Lumefantrina + Primaquina', dose: 'ArtemLumef pauta estándar × 3d + Primaquina 15-30 mg/d × 14d', route: 'VO', duration: '3d + 14d', note: 'Si cloroquina no disponible o sospecha de resistencia (P. vivax resistente a cloroquina en Papua Nueva Guinea y algunas zonas de América del Sur).' },
          { drug: 'Tafenoquina (Krintafel®)', dose: '300 mg dosis única', route: 'VO el día 1-3 del tratamiento esquizonticida', duration: 'Dosis única', note: 'Nueva alternativa para la cura radical — mayor adherencia. Solo si G6PD normal.' }
        ],
        allergyAlternatives: [
          { drug: 'Solo esquizonticida (cloroquina/artemisina) sin cura radical', allergyTo: 'Déficit G6PD (no dar primaquina)', dose: 'Cloroquina pauta estándar', route: 'VO', duration: '3 días', note: 'Sin primaquina, el paciente PUEDE RECAER. Explicar y seguimiento estrecho.' }
        ],
        notes: 'Resistencia a cloroquina en P. vivax emergente en algunas zonas (Oceanía, Sudamérica). Primaquina en embarazo está contraindicada — tratar solo con cloroquina y reservar la cura radical para posparto.',
        source: 'WHO Guidelines Malaria 2023 · CDC · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'leptospirosis',
  name: 'Leptospirosis',
  aliases: ['leptospirosis', 'leptospira', 'enfermedad de weil', 'weil', 'ictericia fiebre mialgias', 'contacto agua animales fiebre', 'leptospira interrogans', 'jaundice fever cattle'],
  category: 'Zoonosis',
  icon: '🐀',
  subtypes: [
    {
      id: 'leptospirosis-leve',
      name: 'Leve (Fase Leptospirémica, <7 días)',
      context: 'Fiebre brusca + mialgias (gemelos) + cefalea intensa + conjuntivitis. Exposición a agua dulce/animales. La mayoría se autolimita pero el tratamiento acorta la duración.',
      treatment: {
        firstLine: [
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '7 días', note: 'Primera línea en formas ambulatorias leves. También sirve como profilaxis post-exposición (200 mg semana única).' },
          { drug: 'Amoxicilina', dose: '500 mg c/8h', route: 'VO', duration: '7 días', note: 'Alternativa si contraindicación a doxiciclina (embarazo, niños). Similar eficacia en formas leves.' }
        ],
        secondLine: [
          { drug: 'Azitromicina', dose: '500 mg/día', route: 'VO', duration: '5-7 días', note: 'Si intolerancia a doxiciclina y amoxicilina. Menor evidencia.' }
        ],
        allergyAlternatives: [
          { drug: 'Ampicilina', allergyTo: 'Doxiciclina (embarazo)', dose: '500-750 mg c/6h', route: 'VO', duration: '7 días' }
        ],
        notes: 'Profilaxis post-exposición: doxiciclina 200 mg VO dosis única (tras exposición a inundaciones o contacto de riesgo). Diagnóstico: serología MAT (>1:800) o PCR en sangre (primeros 7 días) o orina.',
        source: 'WHO · IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'leptospirosis-grave',
      name: 'Grave — Enfermedad de Weil (Ictericia + IRA + Hemorragia)',
      context: 'Ictericia hemorrágica + IRA (nefritis tubulointersticial) + trombocitopenia + hemorragias + uveítis tardía. Mortalidad 5-40%. UCI obligatoria.',
      treatment: {
        firstLine: [
          { drug: 'Penicilina G', dose: '1.5 MU c/6h', route: 'IV', duration: '7 días', note: 'Estándar clásico en la enfermedad de Weil. Iniciar sin esperar confirmación si sospecha clínica alta.' },
          { drug: 'Ceftriaxona', dose: '1g/día', route: 'IV', duration: '7 días', note: 'No inferior a penicilina. Cómodo en monodosis diaria. Primera elección si penicilina no disponible.' }
        ],
        secondLine: [
          { drug: 'Ampicilina', dose: '1g c/6h', route: 'IV', duration: '7 días', note: 'Alternativa a penicilina G si no disponible.' }
        ],
        allergyAlternatives: [
          { drug: 'Doxiciclina IV', allergyTo: 'β-lactámicos', dose: '100 mg c/12h', route: 'IV', duration: '7 días' }
        ],
        notes: 'Hemodiálisis si IRA grave. Plaquetas si <20.000 o hemorragia activa. La uveítis puede aparecer semanas después de la curación — seguimiento oftalmológico. Declaración obligatoria. Desinfección de equipos y ropas.',
        source: 'WHO · IDSA · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'enfermedad-lyme',
  name: 'Enfermedad de Lyme (Borreliosis)',
  aliases: ['lyme', 'borrelia', 'enfermedad de lyme', 'borreliosis', 'eritema migratorio', 'garrapata fiebre', 'artritis garrapata', 'neuroborreliosis', 'borrelia burgdorferi', 'tick fever'],
  category: 'Zoonosis',
  icon: '🦟',
  subtypes: [
    {
      id: 'lyme-estadio-i',
      name: 'Estadio I — Eritema Migratorio Localizado',
      context: 'Macular eritematosa expansiva (≥5 cm) con aclaramiento central ("ojo de buey") en el lugar de la picadura, días-semanas después. Puede acompañarse de síntomas flu-like. Diagnóstico CLÍNICO — serología puede ser negativa.',
      treatment: {
        firstLine: [
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '10-21 días', note: 'Primera elección. También activa frente a Anaplasma (coinfección frecuente con la garrapata Ixodes).' },
          { drug: 'Amoxicilina', dose: '500 mg c/8h', route: 'VO', duration: '14-21 días', note: 'Alternativa preferida en embarazadas y niños <8 años.' }
        ],
        secondLine: [
          { drug: 'Cefuroxima axetilo', dose: '500 mg c/12h', route: 'VO', duration: '14-21 días', note: 'Alternativa si contraindicación a doxiciclina y amoxicilina.' }
        ],
        allergyAlternatives: [
          { drug: 'Azitromicina', allergyTo: 'β-lactámicos + doxiciclina', dose: '500 mg/día', route: 'VO', duration: '5-7 días', note: 'Inferior en eficacia — mayor tasa de recurrencia. Solo si no hay otra alternativa.' }
        ],
        notes: 'Profilaxis post-picadura (garrapata ≥36h enganchada en zona endémica): doxiciclina 200 mg dosis única VO ≤72h post-retirada. El tratamiento del eritema migratorio previene las manifestaciones tardías (artritis, carditis, neurológicas).',
        source: 'IDSA 2006 (actualizado) · ESCMID 2019 · Sanford Guide 2024'
      }
    },
    {
      id: 'lyme-estadio-ii-iii',
      name: 'Estadio II-III — Diseminado (Neuroborreliosis, Artritis, Carditis)',
      context: 'Semanas-meses post-picadura. Neuroborreliosis: meningitis linfocítica, parálisis facial, radiculopatía. Artritis: monoartritis rodilla migratoria. Carditis: bloqueo AV (a veces completo). Serología ELISA + confirmación Western Blot.',
      treatment: {
        firstLine: [
          { drug: 'Ceftriaxona', dose: '2g/día', route: 'IV', duration: '14-28 días', note: 'Para neuroborreliosis (meningitis, encefalitis, mielitis), carditis con BAV grado II-III, o artritis refractaria al tratamiento oral.' },
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '28 días', note: 'Artritis de Lyme sin afectación neurológica grave o carditis leve (BAV 1er grado). Tan eficaz como IV en artritis.' }
        ],
        secondLine: [
          { drug: 'Penicilina G', dose: '18-24 MU/d infusión continua o c/4h', route: 'IV', duration: '14-28 días', note: 'Alternativa a ceftriaxona en neuroborreliosis.' }
        ],
        allergyAlternatives: [
          { drug: 'Doxiciclina IV', allergyTo: 'β-lactámicos (neuroborreliosis grave)', dose: '100 mg c/12h', route: 'IV', duration: '14-28 días', note: 'Buena penetración en LCR. Alternativa válida.' }
        ],
        notes: 'BAV por carditis de Lyme: marcapasos temporal si BAV III grado → puede revertir con el antibiótico (no implantar definitivo sin esperar). Síndrome post-Lyme: síntomas persistentes tras tratamiento correcto — NO relacioado con infección activa y NO se beneficia de antibióticos prolongados. Neuroborreliosis: LCR con linfocitosis + proteínas elevadas + anticuerpos específicos.',
        source: 'IDSA 2006 (actualizado) · ESCMID 2019 · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'rickettsiosis',
  name: 'Rickettsiosis (Fiebre Manchada / Tifus)',
  aliases: ['rickettsia', 'rickettsiosis', 'fiebre manchada', 'fiebre del boton mediterraneo', 'tifus', 'rocky mountain spotted fever', 'exantema garrapata', 'exantema fiebre viaje', 'fiebre petequial'],
  category: 'Zoonosis',
  icon: '🦟',
  subtypes: [
    {
      id: 'rickettsiosis-fiebre-manchada',
      name: 'Fiebre Manchada (R. rickettsii / R. conorii)',
      context: 'Tríada: fiebre + exantema maculopapular (incluyendo palmas y plantas) + antecedente de picadura de garrapata. Eschar negra en punto de inoculación (R. conorii). Trombocitopenia + hiponatremia. INICIAR ANTIBIÓTICO SIN ESPERAR CONFIRMACIÓN.',
      treatment: {
        firstLine: [
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO/IV', duration: '5-7 días o hasta 48h afebril (mínimo 5-7 días)', note: '⚠️ PRIMERA LÍNEA ÚNICA — ES UNA EMERGENCIA. No esperar confirmación serológica. El retraso >5 días del diagnóstico multiplica la mortalidad por 3.' }
        ],
        secondLine: [
          { drug: 'Cloranfenicol', dose: '500 mg c/6h', route: 'IV/VO', duration: '7 días', note: 'SOLO en embarazadas o niños muy pequeños si doxiciclina contraindicada. La AAP también avala doxiciclina en niños dada la gravedad potencial de la fiebre manchada.' }
        ],
        allergyAlternatives: [
          { drug: 'Doxiciclina (usar de todas formas)', allergyTo: 'Otras alternativas son inferiores', dose: '100 mg c/12h IV', route: 'IV', duration: '7 días', note: 'La doxiciclina es el único tratamiento fiable — incluso en niños el riesgo de la enfermedad supera el riesgo de tinción dental.' }
        ],
        notes: 'RMSF (R. rickettsii) sin tratar: mortalidad 20-25%. Con doxiciclina precoz: <5%. La serología (IFA) es negativa en la primera semana — NO esperar. Trombopenia severa + fracaso multiorgánico = UCI. Las petequias en palmas/plantas son diagnósticas.',
        source: 'CDC · IDSA · AAP · Sanford Guide 2024'
      }
    },
    {
      id: 'rickettsiosis-tifus',
      name: 'Fiebre Tifus (R. typhi — Tifus Murino)',
      context: 'Exposición a pulgas de ratas. Fiebre + cefalea + exantema maculopapular central (no siempre petequial). Más leve que fiebre manchada. Distribución global (zonas tropicales y portuarias).',
      treatment: {
        firstLine: [
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '7 días o 48h afebril', note: 'Mismo tratamiento que otras rickettsiosis. Respuesta rápida en 24-48h.' }
        ],
        secondLine: [
          { drug: 'Azitromicina', dose: '500 mg/día', route: 'VO', duration: '5-7 días', note: 'Alternativa en embarazo o pediatría. Buena eficacia demostrada en tifus murino.' }
        ],
        allergyAlternatives: [
          { drug: 'Cloranfenicol', allergyTo: 'Doxiciclina + azitromicina', dose: '500 mg c/6h', route: 'VO/IV', duration: '7 días' }
        ],
        notes: 'Anaplasma phagocytophilum (anaplasmosis) y Ehrlichia (ehrlichiosis) responden igualmente a doxiciclina — mismo tratamiento. Rickettsia africae (África subsahariana), R. akari (ricketsialpox): también doxiciclina. Diagnóstico: PCR en sangre (primeros 7d) o serología IFA (convalecencia).',
        source: 'CDC · IDSA · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'brucelosis',
  name: 'Brucelosis',
  aliases: ['brucelosis', 'brucella', 'fiebre ondulante', 'fiebre de malta', 'brucella melitensis', 'artritis brucela', 'espondilodiscitis brucela', 'ganado fiebre', 'queso sin pasteurizar fiebre'],
  category: 'Zoonosis',
  icon: '🐄',
  subtypes: [
    {
      id: 'brucelosis-no-complicada',
      name: 'No Complicada (Sin Focalización Orgánica)',
      context: 'Fiebre ondulante + sudoración nocturna + mialgias + hepatoesplenomegalia. Exposición a animales/productos lácteos no pasteurizados. Hemocultivos positivos (gold standard). Diagnóstico también por serología (Rosa de Bengala + SAT).',
      treatment: {
        firstLine: [
          { drug: 'Doxiciclina + Rifampicina', dose: 'Doxiciclina 100 mg c/12h + Rifampicina 600-900 mg/día', route: 'VO', duration: '6 semanas', note: 'Pauta más cómoda (toda VO). Tasa de recaída ligeramente mayor que con gentamicina.' },
          { drug: 'Doxiciclina + Gentamicina', dose: 'Doxiciclina 100 mg c/12h VO + Gentamicina 5 mg/kg/día IM × 7-10 días', route: 'VO + IM/IV', duration: 'Doxiciclina 6 semanas + Gentamicina 7-10 días', note: 'Superior en tasa de curación. Preferible en formas moderadas-graves.' }
        ],
        secondLine: [
          { drug: 'TMP/SMX + Rifampicina', dose: 'TMP/SMX 1DS c/12h + Rifampicina 600 mg/día', route: 'VO', duration: '6 semanas', note: 'Alternativa si contraindicación a doxiciclina (niños <8a, embarazo 2º-3er trim).' }
        ],
        allergyAlternatives: [
          { drug: 'Ciprofloxacino + Rifampicina', allergyTo: 'Doxiciclina + TMP/SMX', dose: 'Cipro 500 mg c/12h + Rifampicina 600 mg/día VO', route: 'VO', duration: '6 semanas', note: 'Mayor tasa de recaída. Solo si no hay otra alternativa.' }
        ],
        notes: 'La monoterapia tiene alta tasa de recaída — SIEMPRE terapia combinada. La rifampicina induce metabolismo de otros fármacos (interacciones con anticonceptivos, warfarina, TAR). Control serológico al mes, 3 y 6 meses. Brucelosis laboral (veterinarios): misma pauta + notificación ocupacional.',
        source: 'IDSA · WHO · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'brucelosis-complicada',
      name: 'Complicada (Espondilodiscitis, Endocarditis, Neurobrucelosis)',
      context: 'Espondilodiscitis (30% brucelosis focal): lumbalgia + fiebre + RMN con destrucción discal L4-L5. Endocarditis (<2%): alta mortalidad sin cirugía. Neurobrucelosis: meningitis/encefalitis.',
      treatment: {
        firstLine: [
          { drug: 'Doxiciclina + Rifampicina + Cotrimoxazol', dose: 'Doxy 100mg c/12h + Rifamp 600-900mg/d + TMP/SMX 1DS c/12h', route: 'VO', duration: '3-6 meses (espondilodiscitis) · 6-18 meses (endocarditis)', note: 'Triple terapia para formas graves con focalización. Endocarditis: añadir cirugía casi siempre.' }
        ],
        secondLine: [
          { drug: 'Doxiciclina + Gentamicina + Rifampicina', dose: 'Doxy 100mg c/12h + Genta 5mg/kg/d × 14-21d + Rifamp 600mg/d', route: 'VO + IV', duration: '3-6 meses (espondilodiscitis)', note: 'Añadir gentamicina el primer mes en espondilodiscitis grave o endocarditis.' }
        ],
        allergyAlternatives: [
          { drug: 'Ciprofloxacino + Rifampicina + TMP/SMX', allergyTo: 'Doxiciclina', dose: 'Cipro 500mg c/12h + Rifamp 600mg/d + TMP/SMX 1DS c/12h', route: 'VO', duration: '3-6 meses' }
        ],
        notes: 'Endocarditis brucélica: cirugía (sustitución valvular) en la mayoría por fallo de esterilización con antibióticos solos. Duración: hasta serología negativa + VSG normalizada. Neurobrucelosis: penetración intratecal de doxiciclina + TMP/SMX + rifampicina. RMN columna para evaluar respuesta en espondilodiscitis.',
        source: 'IDSA · WHO · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'fiebre-q',
  name: 'Fiebre Q (Coxiella burnetii)',
  aliases: ['fiebre q', 'coxiella', 'coxiella burnetii', 'fiebre q aguda', 'fiebre q cronica', 'endocarditis coxiella', 'hepatitis atipica fiebre', 'ganadero neumonía'],
  category: 'Zoonosis',
  icon: '🐑',
  subtypes: [
    {
      id: 'fiebre-q-aguda',
      name: 'Aguda (Hepatitis / Neumonía Atípica)',
      context: 'Exposición a ganado (parto ovino/caprino), productos animales, parturientas. Fiebre + cefalea intensa + hepatitis (transaminasas) o neumonía atípica. La mayoría autolimitada — tratar para acortar duración.',
      treatment: {
        firstLine: [
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '14-21 días', note: 'Primera línea. Iniciar ante sospecha clínica — serología puede tardar semanas en positivizarse.' }
        ],
        secondLine: [
          { drug: 'Fluoroquinolona (Ciprofloxacino o Levofloxacino)', dose: 'Cipro 500 mg c/12h o Levo 500 mg/día', route: 'VO', duration: '14-21 días', note: 'Alternativa si contraindicación a doxiciclina.' },
          { drug: 'Cotrimoxazol', dose: '1DS (160/800mg) c/12h', route: 'VO', duration: '14-21 días', note: 'Opción en embarazo (evitar doxiciclina en 2º-3er trimestre). Riesgo ictericia neonatal en 3er trim.' }
        ],
        allergyAlternatives: [
          { drug: 'Cloroquina (fiebre Q con hepatitis granulomatosa)', allergyTo: 'Doxiciclina (control serológico previo)', dose: '200 mg c/8h', route: 'VO', duration: '12 meses', note: 'La cloroquina alcaliniza los fagolisosomas donde vive C. burnetii — potencia la doxiciclina en formas crónicas.' }
        ],
        notes: 'Cribado serológico a los 3 y 6 meses post-fiebre Q aguda (IgG fase I) para detectar progresión a crónica. Pacientes de riesgo para forma crónica: valvulopatía, aneurisma aórtico, inmunosupr., embarazo — seguimiento serológico obligatorio × 2 años.',
        source: 'ECMM/ESCMID 2017 · IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'fiebre-q-cronica',
      name: 'Crónica (Endocarditis / Infección Vascular)',
      context: 'IgG fase I ≥1:800 (>12 meses) ± endocarditis o infección vascular. Endocarditis en valvulopatía previa (hasta 65%). Alta mortalidad sin tratamiento. Puede presentarse años después de la infección aguda.',
      treatment: {
        firstLine: [
          { drug: 'Doxiciclina + Hidroxicloroquina', dose: 'Doxiciclina 100 mg c/12h + Hidroxicloroquina 200 mg c/8h (ajustar por niveles)', route: 'VO', duration: '≥18 meses (endocarditis) · ≥12 meses (otras formas crónicas)', note: 'La hidroxicloroquina alcaliniza el fagolisosoma y potencia la bactericidia de la doxiciclina. Monitorizar niveles de hidroxicloroquina y oftalmología (retinopía). Serología de control c/3 meses.' }
        ],
        secondLine: [
          { drug: 'Doxiciclina + Fluoroquinolona', dose: 'Doxiciclina 100 mg c/12h + Ciprofloxacino 500 mg c/12h o Ofloxacino 200 mg c/8h', route: 'VO', duration: '≥18 meses', note: 'Si intolerancia a cloroquinas. Inferior en eficacia bactericida.' }
        ],
        allergyAlternatives: [
          { drug: 'Fluoroquinolona + Rifampicina', allergyTo: 'Doxiciclina + hidroxicloroquina', dose: 'Cipro 500mg c/12h + Rifamp 300mg c/12h', route: 'VO', duration: '≥18 meses' }
        ],
        notes: 'Criterio de curación: IgG fase I <1:200 en 2 determinaciones consecutivas separadas 6 meses. Cirugía si endocarditis + IC o vegetaciones grandes. Embarazada con fiebre Q crónica: TMP/SMX 1DS/d durante todo el embarazo. Duración hasta años en algunos casos — individualizar.',
        source: 'ECMM/ESCMID 2017 · IDSA · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'rabia-pep',
  name: 'Rabia — Profilaxis Post-Exposición (PEP)',
  aliases: ['rabia', 'pep rabia', 'mordedura animal', 'mordedura perro', 'mordedura murcielago', 'profilaxis rabia', 'vacuna rabia', 'inmunoglobulina rabia', 'lyssavirus'],
  category: 'Zoonosis',
  icon: '🐕',
  subtypes: [
    {
      id: 'rabia-pep-no-vacunado',
      name: 'PEP en No Vacunado Previamente',
      context: 'Exposición de categoría II-III (OMS): mordedura con penetración, arañazo con sangrado, contacto mucosas/herida abierta con saliva de animal sospechoso. Mortalidad 100% una vez establecidos los síntomas — la PEP debe iniciarse en horas.',
      treatment: {
        firstLine: [
          { drug: 'Lavado inmediato de la herida', dose: 'Agua y jabón abundante ≥15 minutos + antiséptico (yodo povidona o alcohol 70%)', route: 'Tópico', duration: 'Inmediato (PASO 1 — reduce el virus)', note: '⚠️ EL LAVADO INMEDIATO ES EL PRIMER TRATAMIENTO — reduce la carga viral hasta 100 veces. No suturar la herida inicialmente si es posible.' },
          { drug: 'Inmunoglobulina Antirrábica Humana (IGAH) + Vacuna Antirrábica', dose: 'IGAH: 20 UI/kg (máximo) infiltrada en y alrededor de la herida; resto IM en sitio distante a la vacuna. Vacuna: 1 dosis IM en deltoides días 0, 3, 7, 14 (esquema 4 dosis)', route: 'IM + local', duration: 'Esquema días 0-3-7-14', note: 'IGAH y vacuna deben administrarse en la misma visita (día 0) en sitios anatómicos distintos. Si la IGAH no está disponible el día 0, se puede administrar hasta 7 días después del inicio de la vacunación.' }
        ],
        secondLine: [
          { drug: 'Inmunoglobulina Antirrábica de origen equino', dose: '40 UI/kg (purificada) o 80 UI/kg (sin purificar) — previa prueba de hipersensibilidad', route: 'Local + IM', duration: 'Dosis única', note: 'Si no hay IGAH humana disponible. Requiere test de sensibilidad previo.' }
        ],
        allergyAlternatives: [
          { drug: 'Protocolo reducido (3 dosis) en inmunocompetentes', allergyTo: 'Múltiples dosis no toleradas', dose: 'Vacuna días 0, 3, 7 (OMS actualización 2018)', route: 'IM', duration: '3 dosis', note: 'WHO 2018 actualiza a 3 dosis en inmunocompetentes. Requiere IGAH el día 0. Consultar protocolo local.' }
        ],
        notes: '🔴 URGENCIA MÉDICA. No hay tratamiento eficaz una vez aparecen síntomas (encefalitis rábica = mortal). La vacuna antirrábica NO está contraindicada en embarazo. Evaluar siempre el animal: si es posible observar al perro/gato ×10 días (si sano al día 10 = no infectado). Murciélagos, zorros, mapaches = alto riesgo aunque no haya mordedura visible.',
        source: 'WHO 2018 PEP · CDC · ACIP · Sanford Guide 2024'
      }
    },
    {
      id: 'rabia-pep-vacunado',
      name: 'PEP en Vacunado Previamente (Booster)',
      context: 'Vacunación previa completa (pre-exposición o PEP completa anterior). Serie de vacunación incompleta NO se considera "vacunado" — tratar como no vacunado.',
      treatment: {
        firstLine: [
          { drug: 'Lavado de herida + Vacuna Antirrábica (2 dosis)', dose: 'Vacuna 1 dosis IM deltoides días 0 y 3 únicamente', route: 'IM', duration: '2 dosis (días 0 y 3)', note: 'NO necesita IGAH. La memoria inmunológica genera respuesta anamnésica rápida.' }
        ],
        secondLine: [],
        allergyAlternatives: [
          { drug: 'Vacuna intradérmica (0.1 ml)', allergyTo: 'Vía IM (alternativa en recursos limitados)', dose: '0.1 ml ID días 0 y 3', route: 'ID', duration: '2 dosis', note: 'Solo si el personal está entrenado en técnica intradérmica. Misma eficacia.' }
        ],
        notes: 'Lavado de la herida igualmente obligatorio. Si hay dudas sobre la completitud de la vacunación previa → tratar como no vacunado. Profilaxis pre-exposición (viajeros a zonas endémicas): 3 dosis IM días 0, 7, 21-28; revacunación en 1-3 años según nivel de riesgo.',
        source: 'WHO 2018 · CDC · ACIP · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'tetanos',
  name: 'Tétanos',
  aliases: ['tetanos', 'tétanos', 'clostridium tetani', 'trismo', 'espasmo muscular tetanos', 'herida sucia fiebre', 'opistotonus', 'toxoide tetanico', 'profilaxis tetanos'],
  category: 'Prevención / Toxinas',
  icon: '💉',
  subtypes: [
    {
      id: 'tetanos-profilaxis',
      name: 'Profilaxis Post-Herida',
      context: 'Heridas sucias (tierra, heces, saliva), puntiformes profundas, con tejido desvitalizado, quemaduras. Evaluar estado vacunal del paciente.',
      treatment: {
        firstLine: [
          { drug: 'Toxoide Tetánico (Td/Tdap) — paciente correctamente vacunado (última dosis <5 años)', dose: 'NADA necesario si última dosis <5 años y herida limpia. Toxoide 1 dosis si última dosis >5 años y herida sucia', route: 'IM deltoides', duration: 'Dosis única si necesaria', note: 'Si vacunación completa (<10 años): solo toxoide. Si <5 años: nada para herida limpia.' },
          { drug: 'Toxoide Tetánico + Inmunoglobulina Antitetánica Humana (IGAT) — No vacunado / vacunación incompleta / desconocida + herida sucia', dose: 'Td/Tdap 1 dosis IM + IGAT 250 UI IM en sitio contralateral (500 UI si herida muy contaminada o >24h de evolución)', route: 'IM (sitios separados)', duration: 'Dosis única + iniciar serie si no completada', note: 'Iniciar/completar serie de vacunación completa (0, 1-2 meses, 6-12 meses). Considerar Tdap (con tosferina) en adultos nunca vacunados.' }
        ],
        secondLine: [],
        allergyAlternatives: [
          { drug: 'Inmunoglobulina Antitetánica de origen equino', allergyTo: 'IGAT humana no disponible', dose: '1500-3000 UI IM + dosis de prueba previa', route: 'IM', duration: 'Dosis única', note: 'Prueba de sensibilidad obligatoria. Riesgo de reacción anafiláctica.' }
        ],
        notes: 'Limpiar y desbridar la herida siempre. La profilaxis del tétanos depende del estado vacunal y el tipo de herida. Las heridas de guerra, mordeduras y lesiones por aplastamiento tienen máximo riesgo.',
        source: 'ACIP 2021 · CDC · Sanford Guide 2024 · CAV-AEP'
      }
    },
    {
      id: 'tetanos-establecido',
      name: 'Tétanos Establecido — Tratamiento',
      context: 'Trismo + opistótonos + espasmos musculares dolorosos generalizados desencadenados por estímulos. Disfunción autonómica (HTA/hipotensión, taquicardia/bradicardia). Urgencia de UCI.',
      treatment: {
        firstLine: [
          { drug: 'Inmunoglobulina Antitetánica Humana (IGAT)', dose: '500-3000 UI IM (infiltrar parte alrededor de la herida)', route: 'IM', duration: 'Dosis única URGENTE (neutraliza la toxina circulante — no la unida al SNC)', note: 'Primera prioridad — antes de manipular la herida para evitar liberar más toxina.' },
          { drug: 'Metronidazol', dose: '500 mg c/8h', route: 'IV', duration: '10-14 días', note: 'Antibiótico de elección para eliminar C. tetani de la herida. Superior a penicilina (la penicilina antagoniza el GABA igual que la toxina tetánica).' },
          { drug: 'Desbridamiento de la herida', dose: 'Bajo sedación', route: 'Quirúrgico', duration: 'Única vez', note: 'Elimina el foco de producción de toxina. Retardar hasta que la IGAT haya neutralizado la toxina libre.' }
        ],
        secondLine: [
          { drug: 'Diacepam (control de espasmos)', dose: '10-30 mg/hr IV infusión continua; titulado', route: 'IV', duration: 'Hasta control de espasmos', note: 'BZD de primera elección para espasmos musculares. Dosis muy altas pueden ser necesarias. Baclofen intratecal en casos refractarios.' }
        ],
        allergyAlternatives: [
          { drug: 'Penicilina G (si no hay metronidazol)', allergyTo: 'Metronidazol no disponible', dose: '2-4 MU c/4-6h IV', route: 'IV', duration: '10-14 días', note: 'Inferior al metronidazol teóricamente pero clínicamente aceptable si es la única opción.' }
        ],
        notes: 'UCI SIEMPRE. Vía aérea: intubación electiva precoz antes de que los espasmos la comprometan. Magnesio IV (control autonómico). Labetalol si HTA. Nutrición parenteral (disfagia). Vacunación completa ANTES del alta (la enfermedad NO genera inmunidad duradera).',
        source: 'WHO · CDC · SEUP · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'anthrax',
  name: 'Ántrax / Carbunco (Bacillus anthracis)',
  aliases: ['anthrax', 'antrax', 'carbunco', 'bacillus anthracis', 'espora carbunco', 'bioterrorismo', 'exposicion esporas', 'pústula maligna', 'carbunco cutaneo', 'carbunco pulmonar'],
  category: 'Bioterrorismo / Emergencias',
  icon: '⚠️',
  subtypes: [
    {
      id: 'anthrax-cutaneo',
      name: 'Cutáneo (Pústula Maligna)',
      context: 'Forma más frecuente y menos grave. Pápula → vesícula → escara negra indolora + edema gelatinoso extenso. Contacto con animales infectados o cuero. Sin tratamiento puede diseminarse.',
      treatment: {
        firstLine: [
          { drug: 'Ciprofloxacino', dose: '500 mg c/12h', route: 'VO', duration: '7-10 días (natural) · 60 días si exposición por bioterrorismo', note: 'Si bioterrorismo confirmado: 60 días (esporas pueden germinar semanas). En adquisición natural: 7-10 días suficientes.' },
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '7-10 días (natural) · 60 días (bioterrorismo)', note: 'Igual de eficaz. Alternativa si intolerancia a fluoroquinolonas.' }
        ],
        secondLine: [
          { drug: 'Amoxicilina', dose: '500 mg c/8h', route: 'VO', duration: '60 días (si cepa sensible documentada)', note: 'Solo si cepa confirmada sensible a penicilinas (algunas cepas de bioterrorismo son resistentes). No usar empíricamente en bioterrorismo.' }
        ],
        allergyAlternatives: [
          { drug: 'Clindamicina', allergyTo: 'Fluoroquinolonas + doxiciclina', dose: '300 mg c/8h', route: 'VO', duration: '60 días', note: 'Además inhibe la producción de toxinas — añadir siempre en formas graves (sistémico o inhalado).' }
        ],
        notes: 'La escara cutánea no debe desbridarse (disemina el proceso). Anticoagulación si edema masivo compresivo. Notificación URGENTE a salud pública si sospecha de bioterrorismo.',
        source: 'CDC · IDSA · Sanford Guide 2024'
      }
    },
    {
      id: 'anthrax-inhalado',
      name: 'Inhalado / Sistémico (Bioterrorismo — Alta Mortalidad)',
      context: 'Inhalación de esporas. Fase prodrómica flu-like → mediastinitis hemorrágica + sepsis. Radiografía: ensanchamiento mediastínico. Mortalidad >80% si no se trata precozmente. EMERGENCIA DE SALUD PÚBLICA.',
      treatment: {
        firstLine: [
          { drug: 'Ciprofloxacino + Clindamicina + Raxibacumab o Obiltoxaximab', dose: 'Cipro 400 mg c/8-12h IV + Clindamicina 900 mg c/8h IV + Anticuerpo antitoxina (si disponible)', route: 'IV', duration: '60 días (completar VO cuando mejore)', note: 'Terapia combinada obligatoria. La clindamicina y la linezolid inhiben la síntesis proteica de la toxina además del efecto bactericida. Anticuerpos monoclonales antitoxina si disponibles.' },
          { drug: 'Ciprofloxacino + Clindamicina (sin anticuerpo)', dose: 'Cipro 400 mg c/8h IV + Clindamicina 900 mg c/8h IV', route: 'IV', duration: '60 días', note: 'Alternativa si anticuerpos no disponibles. Añadir un tercer agente activo si posible (meropenem, linezolid).' }
        ],
        secondLine: [
          { drug: 'Doxiciclina + Clindamicina + Meropenem', dose: 'Doxy 100mg c/12h IV + Clinda 900mg c/8h + Meropenem 2g c/8h IV', route: 'IV', duration: '60 días', note: 'Si resistencia confirmada a ciprofloxacino (cepas de laboratorio). Meropenem inhibe la pared bacteriana con alta eficacia.' }
        ],
        allergyAlternatives: [
          { drug: 'Linezolid + Meropenem', allergyTo: 'Ciprofloxacino + clindamicina', dose: 'Linezolid 600mg c/12h + Meropenem 2g c/8h IV', route: 'IV', duration: '60 días' }
        ],
        notes: '🔴 NOTIFICACIÓN URGENTE A SALUD PÚBLICA. Profilaxis post-exposición: ciprofloxacino 500mg c/12h VO × 60 días + vacuna (si disponible) para contactos. La descontaminación de la zona de exposición es esencial. Ántrax gastrointestinal: mismo esquema IV que inhalado.',
        source: 'CDC · IDSA · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'tularemia',
  name: 'Tularemia (Francisella tularensis)',
  aliases: ['tularemia', 'francisella', 'francisella tularensis', 'ulceroglandular', 'liebre fiebre', 'garrapata linfonodo', 'hunter fever', 'rabbit fever', 'bioterrorismo tularemia'],
  category: 'Zoonosis',
  icon: '🐇',
  subtypes: [
    {
      id: 'tularemia-ulceroglandular',
      name: 'Ulceroglandular / Glandular (Forma Más Frecuente)',
      context: 'Úlcera cutánea en el punto de inoculación + adenopatía regional supurativa. Exposición a conejos, liebres, garrapatas. Fiebre + malestar general. Diagnóstico: serología o cultivo (nivel de bioseguridad alto).',
      treatment: {
        firstLine: [
          { drug: 'Doxiciclina', dose: '100 mg c/12h', route: 'VO', duration: '14-21 días', note: 'Primera línea en formas leves-moderadas. Tasa de recaída mayor que con aminoglucósidos — alargar hasta 21 días para minimizarla.' },
          { drug: 'Ciprofloxacino', dose: '500 mg c/12h', route: 'VO', duration: '14 días', note: 'Alternativa eficaz con menor tasa de recaída que doxiciclina según algunos estudios. Puede usarse en embarazo.' }
        ],
        secondLine: [
          { drug: 'Gentamicina', dose: '5 mg/kg/día', route: 'IV/IM', duration: '10 días', note: 'En formas moderadas-graves que requieren hospitalización. También primera opción en algunos protocolos europeos.' }
        ],
        allergyAlternatives: [
          { drug: 'Estreptomicina', allergyTo: 'Gentamicina', dose: '7.5-10 mg/kg c/12h IM', route: 'IM', duration: '10 días', note: 'Estándar histórico. Actualmente escasa disponibilidad.' }
        ],
        notes: 'El drenaje de las adenopatías supurativas puede acortar el curso. Incubar 1-21 días (media 3-5). Las adenopatías pueden persistir semanas incluso con tratamiento correcto. Notificación obligatoria.',
        source: 'CDC · IDSA · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'tularemia-pulmonar',
      name: 'Pulmonar / Tifoidea (Grave)',
      context: 'Formas graves: neumonía tularémica (inhalación) o forma tifoidea sistémica sin puerta de entrada identificable. Alta mortalidad sin tratamiento. Bioterrorismo: inhalación de aerosoles.',
      treatment: {
        firstLine: [
          { drug: 'Gentamicina', dose: '5 mg/kg/día', route: 'IV', duration: '10-14 días', note: 'Primera línea en formas graves. Monitorizar niveles y función renal.' },
          { drug: 'Estreptomicina', dose: '7.5-10 mg/kg c/12h IM', route: 'IM', duration: '10-14 días', note: 'Histórico estándar de referencia — igualmente eficaz.' }
        ],
        secondLine: [
          { drug: 'Ciprofloxacino IV', dose: '400 mg c/12h', route: 'IV', duration: '10-14 días → completar VO hasta 21 días', note: 'Buena alternativa IV con conversión posterior a VO para completar el tratamiento.' }
        ],
        allergyAlternatives: [
          { drug: 'Doxiciclina IV', allergyTo: 'Aminoglucósidos + fluoroquinolonas', dose: '100 mg c/12h', route: 'IV', duration: '14-21 días', note: 'Mayor tasa de recaída que aminoglucósidos — vigilar respuesta clínica.' }
        ],
        notes: 'Profilaxis post-exposición (bioterrorismo): doxiciclina 100mg c/12h o ciprofloxacino 500mg c/12h × 14 días. Aislamiento respiratorio durante las primeras 48h de tratamiento (contagio por aerosol). La neumonía tularémica puede semejar otras neumonías atípicas — incluirla en el diagnóstico diferencial en viajeros/cazadores.',
        source: 'CDC · IDSA · ESCMID · Sanford Guide 2024'
      }
    }
  ]
},

{
  id: 'leishmaniasis-visceral',
  name: 'Leishmaniasis Visceral (Kala-azar)',
  aliases: ['leishmaniasis', 'leishmania', 'kala azar', 'kala-azar', 'leishmaniosis visceral', 'esplenomegalia fiebre tropico', 'leishmania donovani', 'leishmania infantum', 'pancitopenia fiebre viaje'],
  category: 'Tropicales / Importadas',
  icon: '🦟',
  subtypes: [
    {
      id: 'leishmaniasis-inmunocompetente',
      name: 'Inmunocompetente',
      context: 'Fiebre irregular prolongada + esplenomegalia masiva + pancitopenia + pérdida de peso. India, África oriental, Mediterráneo, América Latina. Diagnóstico: aspirado esplénico/medular/ganglionar + microscopia o PCR Leishmania.',
      treatment: {
        firstLine: [
          { drug: 'Anfotericina B liposomal', dose: '3 mg/kg/día días 1-5, 14 y 21 (total 21 mg/kg)', route: 'IV', duration: '10-21 días (según esquema)', note: 'Primera línea en países desarrollados y regiones de alta resistencia a antimoniales. Muy eficaz (>95%) con buen perfil de seguridad. Pauta alternativa: 10 mg/kg/día × 2d (algunos centros).' },
          { drug: 'Miltefosina', dose: '2.5 mg/kg/día (máx 150 mg/día) en 2 tomas', route: 'VO con comida', duration: '28 días', note: 'Único tratamiento oral disponible. Disponibilidad limitada en algunos países. Contraindicado en embarazo y lactancia (teratogénico).' }
        ],
        secondLine: [
          { drug: 'Antimoniato de meglumina (Glucantime®)', dose: '20 mg/kg/día IM o IV lenta', route: 'IM/IV', duration: '28-30 días', note: 'Primera línea histórica. Alta resistencia en la India (>60% en Bihar). Cardiotoxicidad (QT), hepatotoxicidad y pancreatitis — monitorización ECG y enzimas.' },
          { drug: 'Anfotericina B desoxicolato', dose: '0.75-1 mg/kg/día en días alternos', route: 'IV', duration: '15-20 dosis', note: 'Si AnfB liposomal no disponible. Mayor nefrotoxicidad — hidratación intensiva.' }
        ],
        allergyAlternatives: [
          { drug: 'Paromomicina (Aminosidina)', allergyTo: 'AnfB + antimoniales + miltefosina', dose: '15-20 mg/kg/día IM', route: 'IM', duration: '21 días', note: 'Disponible en India. Ototoxicidad — evaluar audiometría. Menor eficacia que las anteriores en Europa.' }
        ],
        notes: 'Test de curación: aspirado a los 6 meses o serología decreciente. Recaída: 5-15% en inmunocompetentes. Declaración obligatoria. Profilaxis en perros (área mediterránea): collar de deltametrina + vacuna canina.',
        source: 'WHO 2022 · IDSA · ESCMID · Sanford Guide 2024'
      }
    },
    {
      id: 'leishmaniasis-vih',
      name: 'Coinfección VIH / Inmunosupr. (Alto Riesgo de Recaída)',
      context: 'CD4 <200/µL habitual. Presentación atípica frecuente (pulmón, piel, tubo digestivo). Alta tasa de recaída (>50% al año). Diagnóstico más difícil — serología puede ser negativa.',
      treatment: {
        firstLine: [
          { drug: 'Anfotericina B liposomal (inducción)', dose: '3-4 mg/kg/día días 1-5, 10, 17, 24, 31, 38 (total ~40 mg/kg)', route: 'IV', duration: 'Pauta de inducción intensificada (8-10 dosis)', note: 'La dosis total es mayor que en inmunocompetentes dada la alta tasa de recaída.' }
        ],
        secondLine: [
          { drug: 'Anfotericina B liposomal (mantenimiento)', dose: '3-5 mg/kg cada 2-4 semanas', route: 'IV', duration: 'Indefinida hasta CD4 >200/µL × 6 meses con TAR', note: 'El mantenimiento profiláctico reduce la tasa de recaída a ~25%. Retirar cuando CD4 >200 sostenido.' },
          { drug: 'Miltefosina + AnfB liposomal (combinación)', dose: 'Miltefosina 2.5 mg/kg/día × 28d + AnfB liposomal 3mg/kg/d × 5d', route: 'VO + IV', duration: '28 días combinado', note: 'Terapia combinada para reducir recaídas en coinfección VIH. En evaluación clínica.' }
        ],
        allergyAlternatives: [
          { drug: 'Antimoniato de meglumina', allergyTo: 'AnfB liposomal no disponible', dose: '20 mg/kg/día IM × 28d → mantenimiento c/4 sem', route: 'IM', duration: 'Inducción + mantenimiento hasta CD4 >200', note: 'Cardiotoxicidad frecuente con pentamidina y antimoniales en VIH — monitorizar ECG.' }
        ],
        notes: 'Iniciar TAR siempre (esperar 2-4 semanas si posible para evitar SIRI). La recuperación del CD4 es la mejor "profilaxis" a largo plazo. PCR Leishmania en sangre como marcador de respuesta y recaída. Búsqueda activa en todos los pacientes VIH de zona endémica con esplenomegalia o pancitopenia.',
        source: 'WHO 2022 · DHHS OI Guidelines 2024 · ESCMID · Sanford Guide 2024'
      }
    }
  ]
}

]; // fin ANTIBIOTIC_DATA_TROPICAL
