# Guía Antibiótica — Índice de Patologías
**Total: 67 enfermedades · Última actualización: 2026-04-29**
Fuentes: Sanford Guide 2024 · IDSA · ATS · ESCMID · EAU · Tokyo Guidelines · WHO 2022

---

## 🫁 Respiratorio (7) — `antibiotics-data.js`

| id | Enfermedad | Subtypes |
|----|-----------|---------|
| `nac` | Neumonía Adquirida en la Comunidad (NAC) | Leve ambulatoria · Moderada hospitalizada · Grave UCI |
| `hap` | Neumonía Intrahospitalaria (HAP) | Sin riesgo MDR · Con riesgo MDR |
| `vap` | Neumonía Asociada al Ventilador (VAP) | Early onset (<5d) · Late onset (≥5d) |
| `epoc-infecciosa` | EPOC Exacerbada Infecciosa | Leve-moderada · Grave hospitalizada |
| `influenza` | Influenza (Antiviral) | Sin comorbilidades · Alto riesgo / UCI |
| `absceso-pulmonar` | Absceso Pulmonar | Primario (aspiración/anaerobios) · Secundario (inmunosupr./MDR) |
| `tuberculosis` | Tuberculosis Pulmonar Activa | Fase intensiva (HRZE) · Fase consolidación (HR) · **TB-MDR/XDR (BPaLM)** ← NEW |

**Aliases clave:** bronconeumonía, NAC, HAP, VAP, EPOC, NAVM, gripe, absceso pulmón, TB, BK, BPaLM

---

## 🚰 Urinario (4) — `antibiotics-data.js`

| id | Enfermedad | Subtypes |
|----|-----------|---------|
| `cistitis` | ITU No Complicada (Cistitis) | Mujer no embarazada · Embarazada |
| `pielonefritis` | Pielonefritis Aguda | Ambulatoria · Hospitalizada |
| `itu-complicada` | ITU Complicada / CAUTI | Sin sonda · Con sonda (CAUTI) |
| `prostatitis-aguda` | Prostatitis Bacteriana Aguda | Leve-moderada ambulatoria · Grave / urosepsis |

**Aliases clave:** cistitis, pielonefritis, ITU, CAUTI, sonda vesical, prostatitis, próstata

---

## 🫘 Abdominal (5) — `antibiotics-data.js`

| id | Enfermedad | Subtypes |
|----|-----------|---------|
| `infeccion-intraabdominal` | Infección Intraabdominal | Leve-moderada · Grave/sepsis · Peritonitis terciaria |
| `colecistitis` | Colecistitis Aguda | Grado I-II · Grado III (severa) |
| `clostridium-difficile` | Infección por C. difficile (CDI) | Primer episodio leve · Grave · Recurrente |
| `colangitis-aguda` | Colangitis Aguda | Grado I-II · Grado III (pentada Reynolds) |
| `absceso-hepatico` | Absceso Hepático | Piógeno bacteriano · Amebiano |

**Aliases clave:** peritonitis, colecistitis, C. diff, colangitis, Charcot, absceso hígado, ameba

---

## 🦴 Piel, Tejidos Blandos y Osteoarticular (4) — `antibiotics-data.js`

| id | Enfermedad | Subtypes |
|----|-----------|---------|
| `celulitis-erisipela` | Celulitis / Erisipela | Sin complicantes · Con factores de riesgo · Necrotizante (fascitis) |
| `pie-diabetico` | Pie Diabético Infectado | Leve ambulatorio · Moderado-grave hospitalizado |
| `osteomielitis` | Osteomielitis | Hematógena adulto (vertebral/espondilodiscitis) · Por contigüidad |
| `artritis-septica` | Artritis Séptica | Adulto no gonocócica · Gonocócica diseminada (DGI) |

**Aliases clave:** celulitis, erisipela, fascitis necrotizante, pie diabético, osteomielitis, espondilodiscitis, artritis séptica, monoartritis

---

## 🧠 SNC (2) — `antibiotics-data.js`

| id | Enfermedad | Subtypes |
|----|-----------|---------|
| `meningitis-bacteriana` | Meningitis Bacteriana | <50a sin comorbilidades · >50a/inmunosupr. · Posquirúrgica |
| `encefalitis-viral` | Encefalitis Viral (VHS) | Adulto VHS-1 · Inmunodeprimido (CMV/Toxo/Crypto) |

**Aliases clave:** meningitis, encefalitis, herpes encefalitis, aciclovir urgencia, Kernig, Brudzinski, punción lumbar

---

## ❤️ Cardiovascular / Sistémico (5) — `antibiotics-data.js`

| id | Enfermedad | Subtypes |
|----|-----------|---------|
| `endocarditis` | Endocarditis Infecciosa | VN-Streptococcus · VN-Staphylococcus · Válvula protésica |
| `sepsis-shock-septico` | Sepsis / Shock Séptico | Foco respiratorio · Foco urinario · Foco abdominal · Sin foco |
| `candidemia` | Bacteriemia / Candidemia | Gram+ · Gram- · Candidemia |
| `infeccion-cateter` | Infección de Catéter Central (CRBSI) | Sin complicaciones · Candidemia por catéter |
| `fiebre-neutropenica` | Fiebre Neutropénica | Bajo riesgo (MASCC ≥21) · Alto riesgo (hematológico) |

**Aliases clave:** endocarditis, sepsis, shock séptico, bacteriemia, candidemia, catéter CVC, CRBSI, neutropenia, fiebre neutropénica

---

## 🦠 ITS (1 entrada, 4 subtypes) — `antibiotics-data.js`

| id | Enfermedad | Subtypes |
|----|-----------|---------|
| `its` | Infecciones de Transmisión Sexual | Gonorrea · Sífilis · Clamidia · VHS genital |

**Aliases clave:** gonorrea, sífilis, clamidia, herpes genital, ITS, ETS

---

## 🌍 Especiales (2) — `antibiotics-data.js`

| id | Enfermedad | Subtypes |
|----|-----------|---------|
| `covid19-grave` | COVID-19 Grave | Antiviral (Nirmatrelvir/Remdesivir) · Inmunomodulador (UCI) |

*TB se movió a Respiratorio — ver arriba.*

**Aliases clave:** COVID, SARS-CoV-2, Paxlovid, Remdesivir, Dexametasona

---

## 👂👃🦷 ORL / Vía Aérea Superior (9) — `antibiotics-data-orl.js` ← NUEVO LOTE

| id | Enfermedad | Subtypes |
|----|-----------|---------|
| `faringitis-bacteriana` | Faringitis / Amigdalitis Bacteriana | Leve-moderada (Centor 2-3) · Grave/recurrente (Centor 4) |
| `absceso-periamigdalino` | Absceso Periamigdalino | Celulitis periamigdalina · Absceso formado (drenaje) |
| `sinusitis-aguda` | Sinusitis Bacteriana Aguda | Leve-moderada · Grave/complicada |
| `otitis-media-aguda` | Otitis Media Aguda (OMA) | Sin factores de riesgo · Grave / con factores de riesgo |
| `otitis-externa` | Otitis Externa Aguda | Difusa (oído del nadador) · Maligna/necrotizante |
| `bronquitis-aguda` | Bronquitis Aguda | Adulto sano (sin antibiótico) · EPOC/comorbilidades |
| `epiglotitis-aguda` | Epiglotitis Aguda | Adulto (subaguda) · Pediátrica (urgencia vía aérea) |
| `angina-ludwig` | Angina de Ludwig / Espacio Profundo Cuello | Ludwig (submandibular) · Parafaríngeo/Retrofaríngeo |
| `mastoiditis-aguda` | Mastoiditis Aguda | Sin complicaciones · Con complicaciones intracraneales |

**Aliases clave:** faringitis, anginas, amigdalitis, sinusitis, otitis, OMA, bronquitis, epiglotitis, Ludwig, mastoiditis, strep throat, oído del nadador

---

## Patologías del usuario YA CUBIERTAS (no duplicar)

| Pedida | Cubierta en |
|--------|------------|
| Prostatitis | `prostatitis-aguda` |
| ITU asociada a catéter | subtipo CAUTI de `itu-complicada` |
| Absceso hepático | `absceso-hepatico` |
| Fascitis necrotizante | subtipo de `celulitis-erisipela` |
| Encefalitis | `encefalitis-viral` |
| Osteomielitis | `osteomielitis` |
| Candidemia | `candidemia` |
| Gonorrea / Clamidia / Sífilis / Herpes genital | subtypes de `its` |

---

## Próximas adiciones (lotes futuros)

### ✅ Lote 2 — `antibiotics-data-its2.js` (COMPLETADO)
- [x] Tricomoniasis
- [x] Enfermedad Inflamatoria Pélvica (EIP)
- [x] Absceso tubo-ovárico
- [x] VIH — Infecciones oportunistas (6 subtypes: Toxoplasmosis, PCP, Criptococosis, CMV, MAC, Candidiasis esofágica)

### ✅ Lote 3 — `antibiotics-data-fungal.js` (COMPLETADO)
- [x] Aspergilosis Pulmonar Invasiva (neutropénico/trasplante + UCI/CAPA)
- [x] Mucormicosis (rinocerebral + pulmonar/diseminada)
- [x] Micosis profundas (Histoplasmosis · Coccidioidomicosis · Blastomicosis)
- [x] Fúngicas superficiales (Candidiasis oral/vaginal · Dermatofitosis/onicomicosis · Pitiriasis versicolor)
- [x] PCP en no-VIH (trasplante + corticoides/biológicos/oncológico)

### ✅ Lote 4 — `antibiotics-data-tropical.js` (COMPLETADO)
- [x] Paludismo / Malaria (P. falciparum no complicado · grave · P. vivax/ovale con cura radical)
- [x] Leptospirosis (leve · Enfermedad de Weil grave)
- [x] Enfermedad de Lyme (eritema migratorio · diseminado: neuro/artritis/carditis)
- [x] Rickettsiosis (fiebre manchada · tifus murino)
- [x] Brucelosis (no complicada · complicada: espondilodiscitis/endocarditis)
- [x] Fiebre Q (aguda · crónica/endocarditis — BPaLM con hidroxicloroquina)
- [x] Rabia — PEP (no vacunado · vacunado/booster)
- [x] Tétanos (profilaxis post-herida · tétanos establecido)
- [x] Ántrax (cutáneo · inhalado/bioterrorismo)
- [x] Tularemia (ulceroglandular · pulmonar/grave)
- [x] Leishmaniasis visceral (inmunocompetente · coinfección VIH)

### ✅ Lote 5 — `antibiotics-data-misc.js` (COMPLETADO)
- [x] Gastroenteritis bacteriana (Salmonella, Campylobacter, Shigella) + parasitaria (Giardia, Cryptosporidium, E. histolytica) + H. pylori (cuádruple terapia)
- [x] Pericarditis infecciosa (viral/idiopática · bacteriana purulenta)
- [x] Miocarditis viral (aguda/subaguda)
- [x] Paroniquia (aguda bacteriana · crónica fúngica)
- [x] Panadizo / Felón digital (bacteriano · herpético — NO incidir)
- [x] Empiema/Absceso subdural intracraneal (post-sinusal · post-quirúrgico)
- [x] Trombosis séptica del seno cavernoso
- [x] Peritonitis en diálisis peritoneal (empírica IP · dirigida por cultivo)
