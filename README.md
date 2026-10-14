# BioGenLab Suite • Simulador Integral de Biotecnología y Genética

Plataforma interactiva unificada que compila y armoniza los 4 episodios de estudio para el Grado en Biotecnología y Fundamentos de Aplicaciones Biotecnológicas (FAB), integrando los 13 problemas oficiales de examen del documento Word.

---

## 🔬 Estructura de la Suite

1. **Episodio I: Genética y Genómica (Del Nucleótido al Genoma)**
   - Química del ADN, enlaces fosfodiéster y N-glucosídico.
   - Leyes de Erwin Chargaff y simulador dinámico de proporciones de bases.
   - Termociclador y desnaturalización térmica de puentes de hidrógeno.
   - Electroforesis en gel de agarosa con tinción UV (Bromuro de Etidio vs SYBR Safe).
   - Compactación de cromatina: del nucleosoma (11 nm) al cromosoma metafásico (1400 nm).
   - Secuenciación de Sanger del cromosoma del melón.
   - Fracciones del genoma humano (3.200 Mb) y elementos transponibles.
   - **Ejercicios Oficiales:** Sanger Examen 28 Octubre 2024, Problema 1 y Problema 2.

2. **Episodio II: De la Mutación al Fenotipo (Expresión, Splicing y Regulación)**
   - Transcripción génica con ARN polimerasa (lectura 3'→5', síntesis 5'→3' con Uracilo).
   - Arquitectura del gen eucariota: promotores, enhancers, 5' UTR, exones e intrones.
   - Laboratorio de splicing alternativo, caperuza 5' Cap y cola 3' Poli-A.
   - Mutaciones puntuales: silenciosas, missense, nonsense proximal/distal y frameshift.
   - Mosaicismo somático en estado embrionario de 2 blastómeros vs mutaciones germinales.
   - Protocolo agronómico de sandías triploides (3n) con colchicina.
   - Metodología TILLING (no-OGM) y epimutación natural *Cnr* en tomate (Manning et al., 2006).
   - **Ejercicios Oficiales:** Ejercicio 1 (secuencia codificante), Problema 3, Problema 4, Problema 5 (poliploidía) y Problema 6 (reordenaciones cromosómicas).

3. **Episodio III: Marcadores Moleculares y Diversidad Genética**
   - Endonucleasas de restricción bacterianas: EcoRI, PstI y HaeIII.
   - Protocolo RFLP y Southern Blot con membranas de nylon y sondas marcadas.
   - PCR cuantitativa y cálculo de amplificación exponencial ($2^n$).
   - Secuenciación masiva de nueva generación (NGS) Illumina y detección de SNPs.
   - Regla de oro de la Selección Asistida por Marcadores (MAS).
   - **Ejercicios Oficiales:** Ejercicio 2 (RAPD paternidad), Problema 7 (diversidad vegetal), Problema 8 (RAPD conejos y consanguinidad) y Problema 9 (PCR diagnóstico viral).

4. **Episodio IV: Cultivo In Vitro y Biotecnología Vegetal**
   - Medios de cultivo (sales, sacarosa, agar, vitaminas y fitohormonas), autoclave y fitotrón.
   - Transformación genética por *Agrobacterium tumefaciens* (plásmido Ti) y biobalística (maíz MON810).
   - Micropropagación clonal en 5 fases (Fase 0 a Fase 4 de aclimatación).
   - Morfogénesis vegetal: organogénesis directa/indirecta vs embriogénesis somática (2,4-D).
   - **Test Oficial de Examen:** 11 preguntas tipo test oficiales (a a k) con retroalimentación inmediata.

---

## 🛠️ Tecnologías Empleadas

- **HTML5 & CSS3** con diseño Glassmorphism y temas reactivos.
- **Tailwind CSS** para estilización moderna y responsive.
- **KaTeX** para renderizado matemático y tipográfico de fórmulas químicas, temperaturas y ecuaciones.
- **Web Audio API** para síntesis sonora en tiempo real sin dependencias externas.
- **LocalStorage** para persistencia de Bio-XP, rangos, módulos superados y respuestas de examen.

---

Desarrollado para pair-programming y preparación de exámenes universitarios oficiales de Biotecnología.
