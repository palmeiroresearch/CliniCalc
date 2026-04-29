// ============================================
// CLINICALC IV CALCULATOR — FÁRMACOS VASOACTIVOS
// Vasopresores, Inotrópicos, Vasodilatadores, Mixtos (12)
// ============================================

const DRUGS_VASOACTIVE = [

// === VASOPRESORES ===
{
  id: 'norepinefrina',
  name: 'Norepinefrina',
  category: 'Vasopresores',
  weightBased: true,
  defaultAmount: 4, defaultAmountUnit: 'mg', defaultVolume: 250,
  defaultDoseUnit: 'µg/kg/min',
  amountUnits: ['mg', 'µg'],
  doseUnits: ['µg/kg/min', 'µg/kg/hr', 'µg/min'],
  indications: [
    {
      name: 'Shock Séptico',
      doseStart: 0.1, doseMin: 0.01, doseMax: 3.0, doseUnit: 'µg/kg/min',
      pearl: 'Vasopresor de primera línea en shock séptico (Surviving Sepsis 2021). Titular cada 5-15 min hasta PAM ≥65 mmHg. Dosis >1 µg/kg/min con shock refractario → añadir vasopresina como segundo vasopresor, no aumentar norepinefrina indefinidamente.',
      alert: null
    },
    {
      name: 'Shock Distributivo / Vasodilatador',
      doseStart: 0.05, doseMin: 0.01, doseMax: 2.0, doseUnit: 'µg/kg/min',
      pearl: 'Incluye shock anafiláctico refractario a epinefrina IM, síndrome de shock tóxico y shock neurógeno. La vasoconstricción α1 restaura el tono vascular perdido. Verificar siempre volemia antes de escalar la dosis.',
      alert: null
    },
    {
      name: 'Hipotensión Perioperatoria',
      doseStart: 0.05, doseMin: 0.01, doseMax: 0.5, doseUnit: 'µg/kg/min',
      pearl: 'Alternativa a la fenilefrina cuando se desea preservar el efecto inotrópico β1 leve. En hipotensión por anestesia espinal o epidural, corregir la hipovolemia simultáneamente para no enmascarar el origen.',
      alert: null
    }
  ]
},

{
  id: 'vasopresina',
  name: 'Vasopresina',
  category: 'Vasopresores',
  weightBased: false,
  defaultAmount: 20, defaultAmountUnit: 'UI', defaultVolume: 100,
  defaultDoseUnit: 'UI/min',
  amountUnits: ['UI'],
  doseUnits: ['UI/min', 'UI/hr'],
  indications: [
    {
      name: 'Shock Séptico Refractario (coadyuvante)',
      doseStart: 0.03, doseMin: 0.01, doseMax: 0.04, doseUnit: 'UI/min',
      pearl: 'Actúa en receptores V1 independientes de los adrenérgicos — ideal cuando el paciente recibe dosis altas de norepinefrina o presenta taquicardia. DOSIS FIJA: no superar 0.04 UI/min, no mejora la PA y aumenta el riesgo de isquemia coronaria y mesentérica.',
      alert: '⚠️ Dosis fija. No aumentar más allá de 0.04 UI/min aunque no se alcance el objetivo de PAM.'
    },
    {
      name: 'Vasodilatación Refractaria Postcirugía Cardíaca',
      doseStart: 0.03, doseMin: 0.01, doseMax: 0.04, doseUnit: 'UI/min',
      pearl: 'La depleción endógena de vasopresina es frecuente tras circulación extracorpórea (CEC). Particularmente útil en vasodilatación refractaria poscardiotomía donde los receptores adrenérgicos pueden estar desensibilizados.',
      alert: null
    }
  ]
},

{
  id: 'fenilefrina',
  name: 'Fenilefrina',
  category: 'Vasopresores',
  weightBased: true,
  defaultAmount: 100, defaultAmountUnit: 'mg', defaultVolume: 250,
  defaultDoseUnit: 'µg/kg/min',
  amountUnits: ['mg', 'µg'],
  doseUnits: ['µg/kg/min', 'µg/min'],
  indications: [
    {
      name: 'Hipotensión sin Taquicardia (perioperatorio)',
      doseStart: 1.0, doseMin: 0.5, doseMax: 6.0, doseUnit: 'µg/kg/min',
      pearl: 'Agonista α1 puro — eleva la PA sin efecto inotrópico ni cronotrópico, lo que puede causar bradicardia refleja. Primera opción en hipotensión perioperatoria con taquicardia o en cardiomiopatía obstructiva (HOCM) donde el inotropismo está contraindicado.',
      alert: null
    },
    {
      name: 'Hipotensión por Anestesia Espinal',
      doseStart: 50, doseMin: 25, doseMax: 100, doseUnit: 'µg/min',
      pearl: 'Estrategia profiláctica validada en cesárea bajo anestesia espinal. La bradicardia refleja es más frecuente que con vasopresina. Si la FC cae <50 lpm durante la infusión, reducir dosis o considerar efedrina.',
      alert: null
    }
  ]
},

{
  id: 'metaraminol',
  name: 'Metaraminol',
  category: 'Vasopresores',
  weightBased: false,
  defaultAmount: 10, defaultAmountUnit: 'mg', defaultVolume: 100,
  defaultDoseUnit: 'mg/hr',
  amountUnits: ['mg'],
  doseUnits: ['mg/hr', 'µg/min'],
  indications: [
    {
      name: 'Hipotensión Perioperatoria',
      doseStart: 1.0, doseMin: 0.5, doseMax: 5.0, doseUnit: 'mg/hr',
      pearl: 'Simpaticomimético de acción directa e indirecta (libera norepinefrina endógena). La tolerancia puede desarrollarse en infusiones prolongadas por agotamiento de las reservas de catecolaminas. Preferir bolos intermitentes (0.5-2 mg IV) sobre infusión continua en muchos contextos perioperatorios.',
      alert: null
    }
  ]
},

// === INOTRÓPICOS ===
{
  id: 'dobutamina',
  name: 'Dobutamina',
  category: 'Inotrópicos',
  weightBased: true,
  defaultAmount: 250, defaultAmountUnit: 'mg', defaultVolume: 250,
  defaultDoseUnit: 'µg/kg/min',
  amountUnits: ['mg'],
  doseUnits: ['µg/kg/min'],
  indications: [
    {
      name: 'Shock Cardiogénico',
      doseStart: 5.0, doseMin: 2.0, doseMax: 20.0, doseUnit: 'µg/kg/min',
      pearl: 'Inotrópico β1-selectivo de elección en IC aguda con bajo GC y PA conservada. A dosis >10 µg/kg/min predomina el efecto vasodilatador. No combinar con betabloqueantes (antagonismo directo). En falla refractaria, considerar milrinona o levosimendan.',
      alert: null
    },
    {
      name: 'IC Aguda Descompensada',
      doseStart: 3.0, doseMin: 2.0, doseMax: 10.0, doseUnit: 'µg/kg/min',
      pearl: 'En IC crónica descompensada no se recomienda uso rutinario (aumenta mortalidad a largo plazo por arritmias). Usar como puente a trasplante, DAVI o como "inotrópico de último recurso". Monitorizar FC y ECG continuamente.',
      alert: null
    }
  ]
},

{
  id: 'dopamina',
  name: 'Dopamina',
  category: 'Inotrópicos',
  weightBased: true,
  defaultAmount: 200, defaultAmountUnit: 'mg', defaultVolume: 250,
  defaultDoseUnit: 'µg/kg/min',
  amountUnits: ['mg'],
  doseUnits: ['µg/kg/min'],
  indications: [
    {
      name: 'Efecto Cardíaco β (3–10 µg/kg/min)',
      doseStart: 5.0, doseMin: 3.0, doseMax: 10.0, doseUnit: 'µg/kg/min',
      pearl: 'En este rango predomina el efecto inotrópico y cronotrópico β1. La dopamina ha perdido protagonismo frente a la dobutamina (más selectiva) y la norepinefrina en shock. No usar en FA rápida por su efecto cronotrópico.',
      alert: null
    },
    {
      name: 'Efecto Vasopresor α (>10 µg/kg/min)',
      doseStart: 10.0, doseMin: 10.0, doseMax: 20.0, doseUnit: 'µg/kg/min',
      pearl: 'La norepinefrina es superior a la dopamina como vasopresor en shock séptico con menor tasa de arritmias y menor mortalidad (De Backer et al., NEJM 2010). La dopamina vasoactiva se reserva para casos seleccionados (bradicardia concomitante, sin acceso a norepinefrina).',
      alert: '⚠️ "Dosis renal" de dopamina (1-3 µg/kg/min) es un concepto OBSOLETO — estudios controlados demuestran que no previene ni trata la IRA. No usar con ese fin (Guías Surviving Sepsis 2021, KDIGO 2023).'
    }
  ]
},

{
  id: 'milrinona',
  name: 'Milrinona',
  category: 'Inotrópicos',
  weightBased: true,
  defaultAmount: 20, defaultAmountUnit: 'mg', defaultVolume: 100,
  defaultDoseUnit: 'µg/kg/min',
  amountUnits: ['mg'],
  doseUnits: ['µg/kg/min'],
  indications: [
    {
      name: 'IC Avanzada Refractaria a Catecolaminas',
      doseStart: 0.375, doseMin: 0.375, doseMax: 0.75, doseUnit: 'µg/kg/min',
      pearl: 'Inhibidor de PDE3 — mejora contractilidad y reduce poscarga sin activar receptores adrenérgicos (útil en pacientes con betabloqueantes). La carga IV (50 µg/kg en 10 min) frecuentemente se omite por hipotensión. Elimina-ción renal: ajustar en ERC.',
      alert: null
    },
    {
      name: 'Puente a Trasplante / DAVI',
      doseStart: 0.5, doseMin: 0.375, doseMax: 0.75, doseUnit: 'µg/kg/min',
      pearl: 'Perfil hemodinámico favorable para descargar el ventrículo izquierdo (reduce PCWP) en candidatos a trasplante o asistencia mecánica circulatoria. Monitorizar K⁺ (potencia la hipocalemia) y ECG (arritmias ventriculares).',
      alert: null
    }
  ]
},

{
  id: 'levosimendan',
  name: 'Levosimendan',
  category: 'Inotrópicos',
  weightBased: true,
  defaultAmount: 12.5, defaultAmountUnit: 'mg', defaultVolume: 250,
  defaultDoseUnit: 'µg/kg/min',
  amountUnits: ['mg'],
  doseUnits: ['µg/kg/min'],
  indications: [
    {
      name: 'IC Aguda Descompensada',
      doseStart: 0.1, doseMin: 0.05, doseMax: 0.2, doseUnit: 'µg/kg/min',
      pearl: 'Sensibilizador al calcio — mejora la contractilidad sin aumentar el consumo de O₂ miocárdico (ventaja sobre catecolaminas). Vida media del metabolito activo OR-1896 es de 80h → efecto hemodinámico persiste 7-9 días post-infusión. Infusión estándar: 24 horas.',
      alert: null
    }
  ]
},

// === VASODILATADORES ===
{
  id: 'nitroprusiato',
  name: 'Nitroprusiato de Sodio',
  category: 'Vasodilatadores',
  weightBased: true,
  defaultAmount: 50, defaultAmountUnit: 'mg', defaultVolume: 250,
  defaultDoseUnit: 'µg/kg/min',
  amountUnits: ['mg'],
  doseUnits: ['µg/kg/min'],
  indications: [
    {
      name: 'Crisis Hipertensiva Severa',
      doseStart: 0.5, doseMin: 0.3, doseMax: 10.0, doseUnit: 'µg/kg/min',
      pearl: 'Vasodilatador arteriovenoso de acción rapidísima (segundos). Proteger de la luz (envolver el frasco y el equipo). A dosis >2 µg/kg/min por >24-48h: riesgo de toxicidad por tiocianato/cianuro — monitorizar con lactato y niveles de tiocianato en uso prolongado o en falla renal.',
      alert: '⚠️ Proteger estrictamente de la luz. Riesgo de toxicidad por cianuro en infusiones prolongadas o dosis altas.'
    },
    {
      name: 'Reducción de Poscarga (IC Aguda)',
      doseStart: 0.3, doseMin: 0.1, doseMax: 5.0, doseUnit: 'µg/kg/min',
      pearl: 'Potente reductor de poscarga en IC con PA elevada. Combinar con inotrópico si el GC es muy bajo. Usar con precaución en IAM: puede causar "robo coronario" (vasodilatación de vasos sanos que desviía flujo del área isquémica).',
      alert: null
    }
  ]
},

{
  id: 'nitroglicerina',
  name: 'Nitroglicerina',
  category: 'Vasodilatadores',
  weightBased: false,
  defaultAmount: 50, defaultAmountUnit: 'mg', defaultVolume: 250,
  defaultDoseUnit: 'µg/min',
  amountUnits: ['mg'],
  doseUnits: ['µg/min', 'µg/hr'],
  indications: [
    {
      name: 'Angina Inestable / IAM',
      doseStart: 10, doseMin: 5, doseMax: 100, doseUnit: 'µg/min',
      pearl: 'Vasodilatador venoso predominante a dosis bajas (reduce precarga), arterial coronario a dosis moderadas. Contraindicado en hipotensión, infarto de VD y si el paciente tomó inhibidores de PDE5 (sildenafilo, tadalafilo) en las últimas 24-48h.',
      alert: null
    },
    {
      name: 'Edema Agudo de Pulmón (EAP) Hipertensivo',
      doseStart: 20, doseMin: 10, doseMax: 200, doseUnit: 'µg/min',
      pearl: 'En EAP hipertensivo la nitroglicerina en dosis altas (hasta 400 µg/min en algunos protocolos agresivos) reduce rápidamente la precarga y la PA. Monitorizar PA cada 5 min. La tolerancia a nitratos se desarrolla en 12-24h de infusión continua.',
      alert: null
    },
    {
      name: 'Control TA Perioperatorio',
      doseStart: 10, doseMin: 5, doseMax: 100, doseUnit: 'µg/min',
      pearl: 'Útil en cirugía cardíaca para prevenir espasmo de injertos arteriales. Menor riesgo de toxicidad que el nitroprusiato para control perioperatorio de la PA. Preferir en isquemia miocárdica activa por su efecto vasodilatador coronario directo.',
      alert: null
    }
  ]
},

// === MIXTOS ===
{
  id: 'epinefrina',
  name: 'Epinefrina (Adrenalina)',
  category: 'Mixtos',
  weightBased: true,
  defaultAmount: 4, defaultAmountUnit: 'mg', defaultVolume: 250,
  defaultDoseUnit: 'µg/kg/min',
  amountUnits: ['mg', 'µg'],
  doseUnits: ['µg/kg/min', 'µg/min'],
  indications: [
    {
      name: 'Shock Anafiláctico (infusión)',
      doseStart: 0.1, doseMin: 0.05, doseMax: 1.0, doseUnit: 'µg/kg/min',
      pearl: 'La epinefrina IM (0.5 mg en muslo) es el PRIMER tratamiento en anafilaxia. La infusión continua se reserva para casos refractarios o recurrentes tras los bolos IM. Nunca demorar la IM esperando acceso venoso.',
      alert: null
    },
    {
      name: 'Shock Cardiogénico Refractario',
      doseStart: 0.05, doseMin: 0.01, doseMax: 0.5, doseUnit: 'µg/kg/min',
      pearl: 'Combina efecto inotrópico β1, cronotrópico y vasoconstrictor α. Reservar para shock cardiogénico refractario a dobutamina + norepinefrina. Aumenta el consumo de O₂ miocárdico — usar la menor dosis eficaz. Alta arritmo-genecidad.',
      alert: null
    },
    {
      name: 'Bradicardia Refractaria (puente)',
      doseStart: 0.03, doseMin: 0.02, doseMax: 0.1, doseUnit: 'µg/kg/min',
      pearl: 'Puente al marcapasos transcutáneo/transvenoso en bradicardia sintomática refractaria a atropina. La isoprenalina es alternativa preferida en bloqueo AV completo sin hipotensión marcada.',
      alert: null
    }
  ]
},

{
  id: 'isoprenalina',
  name: 'Isoprenalina (Isoproterenol)',
  category: 'Mixtos',
  weightBased: false,
  defaultAmount: 1, defaultAmountUnit: 'mg', defaultVolume: 250,
  defaultDoseUnit: 'µg/min',
  amountUnits: ['mg', 'µg'],
  doseUnits: ['µg/min', 'µg/kg/min'],
  indications: [
    {
      name: 'Bradicardia Refractaria / Bloqueo AV',
      doseStart: 2.0, doseMin: 0.5, doseMax: 10.0, doseUnit: 'µg/min',
      pearl: 'Agonista β puro — aumenta FC y contractilidad sin vasoconstricción. Ideal en bloqueo AV completo como puente a marcapasos: aumenta la frecuencia de escape y la conducción por el nodo AV. Contraindicado en cardiopatía isquémica activa (taquicardia + vasodilatación = robo coronario).',
      alert: null
    },
    {
      name: 'Torsades de Pointes (QT largo)',
      doseStart: 2.0, doseMin: 1.0, doseMax: 8.0, doseUnit: 'µg/min',
      pearl: 'Al aumentar la FC acorta el intervalo QT y suprime los episodios de TdP en QT largo adquirido (especialmente bradicardia-dependiente). Titular hasta FC 90-110 lpm. Es una medida puente hasta identificar y corregir la causa del QT largo.',
      alert: null
    }
  ]
}

];
