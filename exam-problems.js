// ==========================================================================
// BIOGENLAB SUITE - TALLER OFICIAL DE EJERCICIOS DE EXAMEN (WORD DOCUMENT)
// 13 Problemas y Ejercicios Oficiales con Adaptación Interactiva Rigurosa
// ==========================================================================

const EXAM_PROBLEMS = [
  // ------------------------------------------------------------------------
  // EJERCICIO 1 (TEMA 2)
  // ------------------------------------------------------------------------
  {
    id: "ex-mut-seq",
    number: "Ejercicio 1 (Word)",
    topicId: "tema2",
    topicName: "De la Mutación al Fenotipo",
    title: "Secuencia Codificante y Tipos de Mutaciones Puntuales",
    badge: "Traducción y Mutagénesis",
    xp: 75,
    dnaSequence: "5'-ATG CCC TAT CGA TTT ACT CTA TAC GGC GTT TAA-3'",
    mrnaSequence: "5'-AUG CCC UAU CGA UUU ACU CUA UAC GGC GUU UAA-3'",
    wtProtein: ["Met", "Pro", "Tyr", "Arg", "Phe", "Thr", "Leu", "Tyr", "Gly", "Val", "Stop"],
    description: `Suponga que la siguiente secuencia de ADN es una secuencia codificante, un fragmento de un gen:
$$\\text{5'-ATG CCC TAT CGA TTT ACT CTA TAC GGC GTT TAA-3'}$$

a) Utilizando la tabla de traducción genética, indique la secuencia de aminoácidos de la proteína resultante de:
- Una **mutación silenciosa**
- Una **mutación sin sentido (nonsense)**
- Una **mutación con cambio de sentido (missense)**
- Una **mutación por desplazamiento del marco de lectura (frameshift)**

b) Si el cambio de secuencia es una modificación de una sola base, indique la posición de la base modificada en la secuencia de ADN (1 a 33) de modo que se produzca cada uno de los tipos de mutación mencionados y resulte en un cambio fenotípico en el organismo portador.`,
    solution: {
      a: `• **Secuencia Silvestre (wt):**
  - ARNm: \`AUG CCC UAU CGA UUU ACU CUA UAC GGC GUU UAA\`
  - Proteína: \`Met–Pro–Tyr–Arg–Phe–Thr–Leu–Tyr–Gly–Val–Stop\`
• **Mutación Silenciosa:** ej. codon 2 \`CCC \\rightarrow CCU\` (ambos codifican Prolina).
  - Proteína: \`Met–Pro–Tyr–Arg–Phe–Thr–Leu–Tyr–Gly–Val–Stop\` (sin alteración de aminoácidos).
• **Mutación Sin Sentido (Nonsense):** ej. codon 4 \`CGA (Arg) \\rightarrow UGA (Stop)\`.
  - Proteína: \`Met–Pro–Tyr–Stop\` (proteína truncada tempranamente).
• **Mutación con Cambio de Sentido (Missense):** ej. codon 5 \`UUU (Phe) \\rightarrow UUA (Leu)\`.
  - Proteína: \`Met–Pro–Tyr–Arg–Leu–Thr–Leu–Tyr–Gly–Val–Stop\`.
• **Mutación por Desplazamiento de Marco (Frameshift):** deleción de la primera U de UUU en codon 5.
  - ARNm mutado: \`AUG CCC UAU CGA UU-CUC-UAU-ACG-GCU-UUA...\`
  - Proteína: \`Met–Pro–Tyr–Arg–Phe–Leu–Tyr–Thr–Ala–Leu–...\` (secuencia aberrante hasta encontrar un codón stop fuera de fase).`,
      b: `Numerando las bases de 1 a 33:
- **Silenciosa (CCC \\rightarrow CCT):** Base **6** (3ª base del segundo codón). No produce cambio fenotípico.
- **Sin Sentido (CGA \\rightarrow TGA):** Base **10** (1ª base del cuarto codón). Produce fenotipo alterado por parada prematura.
- **Missense (TTT \\rightarrow TTA):** Base **15** (3ª base del quinto codón). Produce fenotipo alterado por sustitución de Phe por Leu.
- **Frameshift (Inserción/Deleción):** ej. inserción tras la base **14** (cambio de pauta a partir del codón 5).`
    }
  },

  // ------------------------------------------------------------------------
  // EJERCICIO 2 (TEMA 3)
  // ------------------------------------------------------------------------
  {
    id: "ex-rapd-paternity",
    number: "Ejercicio 2 (Word)",
    topicId: "tema3",
    topicName: "Marcadores y Diversidad",
    title: "Análisis de RAPD para Filiación y Paternidad",
    badge: "RAPD & Forense",
    xp: 75,
    primer: "5' GGGGCCTT 3'",
    bands: [200, 300, 400, 500, 600],
    matrix: [
      { ind: "Individuo 1", values: [1, 1, 1, 0, 0] },
      { ind: "Individuo 2", values: [1, 0, 0, 1, 1] },
      { ind: "Individuo 3", values: [0, 1, 1, 0, 1] },
      { ind: "Posible Padre", values: [1, 1, 1, 1, 0] }
    ],
    description: `El siguiente gel de electroforesis muestra el patrón de fragmentos de ADN amplificados por PCR con el cebador \`5’ GGGGCCTT 3’\`, usando el ADN de tres individuos (carriles 1, 2, 3) y un posible padre (carril 4).

a) Ponga en un esquema el número de repeticiones que se amplifica para el fragmento marcado con un asterisco (*) en el carril 4 (~400 pb).
b) Transforme el patrón de bandas del gel en una matriz binaria, indicando con 1 la presencia de banda y con 0 la ausencia.
c) ¿Cuál de los tres individuos podría ser hijo del posible padre biológico? ¿Por qué? ¿Podría haber otro escenario con otro patrón de bandas que conduzca a una conclusión diferente? Explique.`,
    solution: {
      a: `El carril 4 muestra un fragmento de aproximadamente **400 pb** marcado con asterisco (*). Si asumimos que la unidad repetitiva mide 50 pb y está flanqueada por el cebador de 8 nt:
$$\\text{5'–GGGGCCTT–[R]}\\times 4\\text{–GGGGCCTT–3'}$$
donde $R = 50\\text{ pb}$ y $\\times 4$ indica que hay cuatro unidades repetidas entre ambos sitios del cebador.`,
      b: `**Matriz Binaria del Patrón de Bandas:**
| Fragmento (pb) | 200 | 300 | 400* | 500 | 600 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Individuo 1** | **1** | **1** | **1** | **0** | **0** |
| **Individuo 2** | **1** | **0** | **0** | **1** | **1** |
| **Individuo 3** | **0** | **1** | **1** | **0** | **1** |
| **Posible Padre** | **1** | **1** | **1** | **1** | **0** |`,
      c: `• **Filiación:** Un hijo biológico solo puede heredar bandas presentes en el padre y no puede mostrar bandas que el padre no posea (a menos que provengan de la madre conocida).
- El **Individuo 1** es el **único hijo biológico compatible**: exhibe exclusivamente bandas compartidas con el padre (200, 300 y 400 pb) y no presenta la banda de 600 pb ausente en el padre.
- Los **Individuos 2 y 3** quedan **excluidos como hijos** porque ambos presentan la banda de 600 pb, la cual no aparece en el posible padre biológico.
• **Escenarios alternativos:** Si existiera un fallo de amplificación (alelo nulo por mutación en la diana del cebador o baja reproducibilidad de RAPDs), un hijo real podría carecer de una banda paterna, lo que podría conducir a falsas exclusiones o dudas de filiación.`
    }
  },

  // ------------------------------------------------------------------------
  // EJERCICIO 3 (TEMA 4) - TEST OFICIAL A-K
  // ------------------------------------------------------------------------
  {
    id: "ex-invitro-test",
    number: "Ejercicio 3 (Word)",
    topicId: "tema4",
    topicName: "Cultivo In Vitro",
    title: "11 Preguntas Tipo Test Oficiales de Examen de Cultivo In Vitro",
    badge: "Test Oficial de Examen",
    xp: 80,
    description: `Banco oficial de 11 preguntas de examen tipo test sobre cultivo in vitro, micropropagación, regeneración celular, esterilización y transformación genética con Agrobacterium y biobalística (preguntas a a k).`,
    questionsCount: 11
  },

  // ------------------------------------------------------------------------
  // EJERCICIO 4: SANGER EXAMEN 28 OCTUBRE 2024 (TEMA 1)
  // ------------------------------------------------------------------------
  {
    id: "ex-sanger-2024",
    number: "Ejercicio Sanger 2024 (Word)",
    topicId: "tema1",
    topicName: "Genética y Genómica",
    title: "Secuenciación de Sanger - Examen 28 de Octubre 2024",
    badge: "Examen Oficial Sanger",
    xp: 85,
    dnaFragment: {
      top: "5' ATCGTTTCGTTAGGGXXXXXXXXXXXXXXXXXXXXXXCCGGATGCTGTCGGG 3'",
      bot: "3' TAGCAAAGCAATCCCXXXXXXXXXXXXXXXXXXXXXXGGCCTACGACAGCCC 5'"
    },
    primers: [
      { id: "b1", seq: "5' CCCGACAGCATCCGG 3'", desc: "Complementario a la hebra superior en el extremo 3'. Se une a la hebra superior y sintetiza hacia la izquierda." },
      { id: "b2", seq: "5' ATCGTTTCGTTAGGG 3'", desc: "Idéntico a la hebra superior 5'. Se une a la hebra inferior molde (3' TAGCAAAGCAATCCC 5') y sintetiza hacia la derecha para secuenciar X." },
      { id: "b3", seq: "5' CCCTAACGAAACGAT 3'", desc: "Complementario al extremo 5' superior en orientación incorrecta." },
      { id: "b4", seq: "5' CCGGATGCTGTCGGG 3'", desc: "Idéntico al extremo 3' superior." }
    ],
    description: `La metodología de Sanger se desarrolló en la década de los 70 para obtener la secuencia de bases nitrogenadas de las moléculas de ADN. Suponga que quiere secuenciar la siguiente molécula de ADN:
$$\\text{5' ATCGTTTCGTTAGGGXXXXXXXXXXXXXXXXXXXXXXCCGGATGCTGTCGGG 3'}$$
$$\\text{3' TAGCAAAGCAATCCCXXXXXXXXXXXXXXXXXXXXXXGGCCTACGACAGCCC 5'}$$

a) Indique cuál es la función de los didesoxinucleótidos (ddNTPs) en esta metodología de secuenciación.
b) Indique cuáles de los siguientes cebadores podría utilizar para dicha secuenciación y cuáles no, justificando por qué:
- **b.1)** \`5' CCCGACAGCATCCGG 3'\`
- **b.2)** \`5' ATCGTTTCGTTAGGG 3'\`
- **b.3)** \`5' CCCTAACGAAACGAT 3'\`
- **b.4)** \`5' CCGGATGCTGTCGGG 3'\`

c) Elija uno de los cebadores anteriores para realizar la secuenciación y suponga que tras la electroforesis en gel de poliacrilamida con 4 carriles (ddATP, ddCTP, ddGTP, ddTTP) se visualizan las bandas.
¿Cuál es la secuencia de bases indicada con X en negrita?`,
    solution: {
      a: `Los didesoxinucleótidos (**ddNTPs**) carecen del grupo hidroxilo en posición **3'-OH** de la pentosa (tienen un hidrógeno en lugar de -OH). La ADN polimerasa necesita ese grupo 3'-OH libre para formar el enlace fosfodiéster con el siguiente nucleótido entrante. Al incorporarse un ddNTP, la síntesis de la cadena se **detiene inmediata e irreversiblemente**, generando fragmentos de longitud específica que terminan en esa base marcada.`,
      b: `Para secuenciar la región interna desconocida **X**:
- **b.1) 5' CCCGACAGCATCCGG 3' (VÁLIDO):** Es perfectamente complementario y antiparalelo al extremo 3' de la hebra superior (\`3' GGCCTACGACAGCCC 5'\`). Al unirse a la hebra superior, la ADN polimerasa elonga desde su extremo 3'-OH hacia la izquierda ($5'\\rightarrow 3'$), leyendo la región X de la hebra superior.
- **b.2) 5' ATCGTTTCGTTAGGG 3' (VÁLIDO):** Es complementario y antiparalelo al extremo 3' de la hebra inferior molde (\`3' TAGCAAAGCAATCCC 5'\`). Al unirse, elonga de $5'\\rightarrow 3'$ hacia la derecha, secuenciando la región X a lo largo de la hebra inferior.
- **b.3 y b.4 (NO VÁLIDOS):** No pueden hibridar de forma productiva con ninguna de las hebras para elongar hacia la región central X con la orientación $5'\\rightarrow 3'$ necesaria.`,
      c: `Al leer el gel de electroforesis desnaturalizante de poliacrilamida **desde la base (fragmentos más cortos) hacia arriba (fragmentos más largos)** en los 4 carriles ddATP, ddCTP, ddGTP, ddTTP, cada banda sucesiva revela el siguiente nucleótido incorporado en la dirección $5'\\rightarrow 3'$. Deduciendo la secuencia complementaria se reconstruye con exactitud la secuencia desconocida **X** de la molécula molde.`
    }
  },

  // ------------------------------------------------------------------------
  // PROBLEMA 1 (TEMA 1) - CEBADOR Y GEL SANGER
  // ------------------------------------------------------------------------
  {
    id: "ex-sanger-prob1",
    number: "Problema 1 (Word)",
    topicId: "tema1",
    topicName: "Genética y Genómica",
    title: "Diseño de Cebador y Esquema de Gel en Secuenciación Sanger",
    badge: "Diseño de Cebadores",
    xp: 70,
    dnaSequence: "5´ TTACGCAGTCCCTAATCGGGTAT 3´",
    targetRegion: "CCCTAA",
    description: `Utilizando la siguiente molécula de ADN:
$$\\text{5´ TTACGCAGTCCCTAATCGGGTAT 3´}$$

b.1. Diseñe un cebador que se una a la región marcada (\`CCCTAA\`), indique su secuencia, sus extremos 5′ y 3′ y represente cómo se uniría a la molécula durante la secuenciación.
b.2. Represente el gel de electroforesis con los fragmentos de ADN que se obtendrían tras la secuenciación, indicando la posición en el gel y el tamaño en nucleótidos de cada fragmento.`,
    solution: {
      b1: `• **Región diana:** \`5' CCCTAA 3'\` en la molécula dada.
• **Cebador complementario y antiparalelo:**
$$\\text{3' GGGATT 5'} \\quad \\Rightarrow \\quad \\text{Secuencia 5' a 3': } \\mathbf{\\text{5' TTAGGG 3'}}$$
• **Apareamiento molecular:**
\`\`\`
Molécula molde: 5' TTACGCAGT C C C T A A TCGGGTAT 3'
Cebador:                  3' G G G A T T 5'
\`\`\`
Como la ADN polimerasa únicamente puede sintetizar en sentido $5' \\rightarrow 3'$, el cebador elongará desde su extremo $3'\\text{-OH}$ hacia la izquierda de la molécula molde (\`3' GGGATT 5'\`), sintetizando el complemento de \`5' TTACGCAGT 3'\`.`,
      b2: `El cebador mide **6 nucleótidos**. Cada incorporación de nucleótido antes de terminar con un ddNTP aumenta el tamaño en 1 nt:
- Fragmentos generados con tamaños de **7 nt, 8 nt, 9 nt, 10 nt, 11 nt, 12 nt, 13 nt, 14 nt, 15 nt**.
- En el gel de poliacrilamida, el fragmento de **7 nt** migrará más rápido y quedará en la parte más inferior; el de **15 nt** migrará más lento quedando en la parte superior.`
    }
  },

  // ------------------------------------------------------------------------
  // PROBLEMA 2 (TEMA 1) - GEL SANGER Y FRAGMENTO X
  // ------------------------------------------------------------------------
  {
    id: "ex-sanger-prob2",
    number: "Problema 2 (Word)",
    topicId: "tema1",
    topicName: "Genética y Genómica",
    title: "Interpretación de Autorradiografía Sanger y Tamaño de Fragmentos",
    badge: "Lectura de Gel Sanger",
    xp: 75,
    dnaFragment: {
      top: "5´ ATCGGTTACCTGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXCCCCGGTAGATGCCT 3´",
      bot: "3´ TAGCCAATGGACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXGGGGCCATCTACGGA 5´"
    },
    description: `La imagen representa un gel de electroforesis obtenido tras la secuenciación de una molécula de ADN con la metodología de Sanger. Cada carrera representa los fragmentos obtenidos en una reacción independiente: carril 1 (ddATP), carril 2 (ddCTP), carril 3 (ddGTP) y carril 4 (ddTTP).

El fragmento de ADN secuenciado ha sido:
$$\\text{5´ ATCGGTTACCTGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXCCCCGGTAGATGCCT 3´}$$
$$\\text{3´ TAGCCAATGGACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXGGGGCCATCTACGGA 5´}$$

a) Describa brevemente qué pasos habría seguido hasta obtener dicho gel.
b) Indique el cebador utilizado, señalando sus extremos 5´y 3´ y situándolo en la zona donde se uniría al fragmento secuenciado.
c) Indique el tamaño en nucleótidos de cada uno de los fragmentos de ADN del gel y la secuencia del fragmento marcado con X.`,
    solution: {
      a: `**Pasos metodológicos del protocolo de Sanger:**
1. **Desnaturalización:** Separación de las dos hebras del fragmento de ADN mediante calor.
2. **Hibridación del cebador (Annealing):** Unión del cebador monocatenario específico al extremo 3' de la hebra molde.
3. **Distribución en 4 tubos de reacción:** Cada tubo contiene la ADN polimerasa, los 4 dNTPs normales sin marcar y una pequeña proporción de un único didesoxinucleótido marcado específico (Tubo A: ddATP; Tubo C: ddCTP; Tubo G: ddGTP; Tubo T: ddTTP).
4. **Polimerización y terminación aleatoria:** La polimerasa sintetiza la cadena hasta que incorpora un ddNTP, donde se detiene la reacción.
5. **Electroforesis desnaturalizante en gel de poliacrilamida:** Carga de los 4 tubos en carriles contiguos y separación de fragmentos por tamaño (resolución de 1 nucleótido), seguida de autorradiografía o fluorescencia.`,
      b: `Para secuenciar la región X de izquierda a derecha a lo largo de la hebra molde inferior, se utiliza un cebador complementario al extremo 3' de dicha hebra:
$$\\mathbf{\\text{5´ ATCGGTTACCTG 3´}}$$
Se une a \`3´ TAGCCAATGGAC 5´\` y elonga desde el extremo 3' hacia la región X.`,
      c: `Si el cebador tiene una longitud de 12 nucleótidos:
- La primera banda en la base del gel tiene **13 nt** (12 nt del cebador + 1º ddNTP incorporado).
- Las siguientes bandas aumentan sucesivamente: **14 nt, 15 nt, 16 nt... hasta completar la longitud de X**.
- Leyendo el carril correspondiente a cada altura de banda (A, C, G o T) de abajo hacia arriba, se escribe directamente la secuencia $5'\\rightarrow 3'$ complementaria a la hebra molde, que coincide con la secuencia X de la hebra codificante.`
    }
  },

  // ------------------------------------------------------------------------
  // PROBLEMA 3 (TEMA 2) - MUTACIONES EN LA REGIÓN CODIFICANTE
  // ------------------------------------------------------------------------
  {
    id: "ex-mut-prob3",
    number: "Problema 3 (Word)",
    topicId: "tema2",
    topicName: "De la Mutación al Fenotipo",
    title: "Efecto Funcional de Cuatro Mutaciones en la Proteína",
    badge: "Código Genético & Mutaciones",
    xp: 80,
    mrnaSequence: "AUG ACG GAU CAG CCG CAA UAC GAA UUG GCG UUU AAG GCG",
    codons: [
      { codon: "AUG", aa: "Met" }, { codon: "ACG", aa: "Thr" }, { codon: "GAU", aa: "Asp" },
      { codon: "CAG", aa: "Gln" }, { codon: "CCG", aa: "Pro" }, { codon: "CAA", aa: "Gln" },
      { codon: "UAC", aa: "Tyr" }, { codon: "GAA", aa: "Glu" }, { codon: "UUG", aa: "Leu" },
      { codon: "GCG", aa: "Ala" }, { codon: "UUU", aa: "Phe" }, { codon: "AAG", aa: "Lys" },
      { codon: "GCG", aa: "Ala" }
    ],
    mutations: [
      { id: "m1", seq: "AUG ACA GAU CAG CCG CAA UAC GAA...", type: "Silenciosa", codonChanged: "ACG (Thr) -> ACA (Thr)" },
      { id: "m2", seq: "AUG ACG GAA CAG CCG CAA UAC GAA...", type: "Cambio de sentido (Missense)", codonChanged: "GAU (Asp) -> GAA (Glu)" },
      { id: "m3", seq: "AUG ACG GAU CAG CCG UAA UAC GAA...", type: "Sin sentido (Nonsense)", codonChanged: "CAA (Gln) -> UAA (STOP)" },
      { id: "m4", seq: "AUG ACG AGAU CAG CCG CAA UAC GAA...", type: "Desplazamiento de marco (Frameshift)", codonChanged: "Inserción de A" }
    ],
    description: `La siguiente secuencia representa la región codificante de un gen:
$$\\text{AUG ACG GAU CAG CCG CAA UAC GAA UUG GCG UUU AAG GCG}$$

Indique la proteína resultante de su traducción utilizando la tabla del código genético.

Suponga que dicha secuencia sufre las siguientes mutaciones:
1. \`AUG ACA GAU CAG CCG CAA UAC GAA\`
2. \`AUG ACG GAA CAG CCG CAA UAC GAA\`
3. \`AUG ACG GAU CAG CCG UAA UAC GAA\`
4. \`AUG ACG AGAU CAG CCG CAA UAC GAA\`

Escriba las proteínas resultantes e indique el tipo de mutación en cada caso. Describa brevemente el posible efecto de cada tipo de mutación sobre la función de la proteína resultante.`,
    solution: {
      wt: `**Proteína Silvestre (wt):**
\`Met – Thr – Asp – Gln – Pro – Gln – Tyr – Glu – Leu – Ala – Phe – Lys – Ala\``,
      mut1: `1. **AUG ACA GAU...:** Mutación **Silenciosa** (\`ACG \\rightarrow ACA\`, ambos Treonina).
- **Proteína:** Idéntica a la silvestre (\`Met–Thr–Asp–...\`).
- **Efecto funcional:** Ninguno. La proteína conserva el 100% de su estructura y función biológica.`,
      mut2: `2. **AUG ACG GAA...:** Mutación de **Cambio de Sentido (Missense)** (\`GAU (Asp) \\rightarrow GAA (Glu)\`).
- **Proteína:** \`Met–Thr–Glu–Gln–Pro–Gln–Tyr–Glu...\`
- **Efecto funcional:** Ambos son aminoácidos ácidos con carga negativa, por lo que el cambio podría ser conservativo con poco impacto, o alterar la afinidad de unión a sustratos si se localiza en el centro activo.`,
      mut3: `3. **AUG ACG GAU CAG CCG UAA...:** Mutación **Sin Sentido (Nonsense)** (\`CAA (Gln) \\rightarrow UAA (STOP)\`).
- **Proteína:** \`Met–Thr–Asp–Gln–Pro–Stop\` (péptido de solo 5 aminoácidos).
- **Efecto funcional:** Pérdida total de la función biológica (proteína truncada no funcional, degradada por el sistema celular).`,
      mut4: `4. **AUG ACG AGA UCA GCC GCA AUA CGA A...:** Mutación por **Desplazamiento del Marco de Lectura (Frameshift)** por inserción de adenina.
- **Proteína:** \`Met–Thr–Arg–Ser–Ala–Ala–Ile–Arg...\`
- **Efecto funcional:** Modifica por completo todos los aminoácidos posteriores y habitualmente genera un codón de parada prematuro fuera de fase; la proteína resultante es completamente aberrante y carece de función.`
    }
  },

  // ------------------------------------------------------------------------
  // PROBLEMA 4 (TEMA 2) - ESTRUCTURA DEL GEN EUCARIOTA
  // ------------------------------------------------------------------------
  {
    id: "ex-euk-gene-prob4",
    number: "Problema 4 (Word)",
    topicId: "tema2",
    topicName: "De la Mutación al Fenotipo",
    title: "Estructura del Gen Eucariota y Repercusión de Mutaciones Puntuales",
    badge: "Gen Eucariota & Regulación",
    xp: 75,
    description: `a) Realice un esquema indicando las partes de un gen eucariota e indique cuál sería el posible efecto de una mutación puntual sobre la proteína codificada por el mismo en cada una de sus regiones.
b) Ponga un ejemplo de una mutación silenciosa, una mutación sin sentido y una mutación de cambio de sentido en el gen a partir del cual se ha transcrito el ARN mensajero del problema 3, indicando la secuencia de aminoácidos resultante.
c) Indique brevemente el posible efecto de cada tipo de mutación sobre la función de la proteína resultante.`,
    solution: {
      a: `**Partes del Gen Eucariota y Repercusión de una Mutación Puntual:**
1. **Promotor y Caja TATA:** No se transcribe. Una mutación aquí altera la unión de la ARN polimerasa o factores basales de transcripción, provocando una disminución drástica (o supresión total) de la transcripción, reduciendo la cantidad de proteína sin alterar su secuencia.
2. **Región 5' UTR:** Se transcribe pero no se traduce. Una mutación puede alterar el acoplamiento ribosómico, impidiendo el inicio de la traducción.
3. **Exón (Secuencia Codificante):** Puede originar mutaciones silenciosas, missense, nonsense o frameshift.
4. **Sitios de Splicing en Intrones (diana donadora GT y aceptora AG):** Una mutación en las dianas de corte y empalme provoca la retención aberrante del intrón o el salto de exón (*exon skipping*), alterando la pauta de lectura.
5. **Región 3' UTR y Señal de Poliadenilación:** Afecta a la vida media y estabilidad del ARNm o a su exportación activa al citoplasma.
6. **Terminador:** Puede provocar lecturas continuas más allá de la unidad transcripcional.`,
      b: `Ejemplos basados en \`AUG ACG GAU CAG CCG CAA UAC GAA UUG GCG UUU AAG GCG\`:
- **Silenciosa:** \`AUG ACG GAU CAG CCG CAA UAC GAA UUG GCG UUC AAG GCG\` (\`UUU \\rightarrow UUC\`, ambos Phe). Proteína idéntica.
- **Sin Sentido:** \`AUG ACG GAU CAG CCG CAA UAG...\` (\`UAC (Tyr) \\rightarrow UAG (STOP)\`). Proteína truncada a 6 aminoácidos (\`Met-Thr-Asp-Gln-Pro-Gln-Stop\`).
- **Cambio de Sentido:** \`AUG ACG GAU CAG CCG CAA UAC GAA UUG GCG UUU GAG GCG\` (\`AAG (Lys) \\rightarrow GAG (Glu)\`). Sustitución de Lys (básico) por Glu (ácido).`,
      c: `**Efecto funcional:**
- Silenciosa: Proteína 100% activa.
- Sin sentido: Proteína truncada, carente de los dominios funcionales catalíticos, no activa.
- Cambio de sentido: Puede no alterar la función si es un aminoácido de superficie con propiedades químicas similares, o inactivar la enzima si altera el centro activo o impide el plegamiento correcto.`
    }
  },

  // ------------------------------------------------------------------------
  // PROBLEMA 5 (TEMA 2) - POLIPLOIDÍA EN CULTIVOS
  // ------------------------------------------------------------------------
  {
    id: "ex-polyploidy-prob5",
    number: "Problema 5 (Word)",
    topicId: "tema2",
    topicName: "De la Mutación al Fenotipo",
    title: "Individuos Poliploides en Cultivos: Obtención, Ventajas e Inconvenientes",
    badge: "Poliploidía Agronómica",
    xp: 70,
    description: `Describe qué es un individuo poliploide e indica alguna forma de obtener individuos de este tipo. Pon ejemplos que conozcas de cultivos poliploides e indica las ventajas e inconvenientes que pueden tener los cultivos poliploides.`,
    solution: {
      definicion: `Un **individuo poliploide** es aquel organismo que posee **más de dos juegos cromosómicos completos** ($3n, 4n, 6n, 8n\\dots$) en el núcleo de sus células.
- **Autopoliploides:** Los juegos cromosómicos proceden de la misma especie parental por duplicación del propio genoma.
- **Alopoliploides:** Resultan de la hibridación entre dos especies distintas seguida de duplicación cromosómica.`,
      obtencion: `**Formas de obtención:**
1. **Tratamiento químico con Colchicina:** Alcaloide mitostático que inhibe la polimerización de los microtúbulos del huso acromático durante la metafase, impidiendo la segregación de cromosomas anafásica y generando células tetraploides ($4n$).
2. **Unión de gametos no reducidos ($2n$):** Por fallo en la meiosis I o II.
3. **Fusión somática de protoplastos in vitro:** Hibridación celular inducida con PEG o electrofusión.`,
      ejemplos: `**Ejemplos en cultivos agrícolas:**
- **Trigo harinero (*Triticum aestivum*):** Alopoliploide hexaploide ($6n = 42$).
- **Patata cultivada (*Solanum tuberosum*):** Autotetraploide ($4n = 48$).
- **Plátano comercial (*Musa acuminata*):** Triploide ($3n = 33$) estéril sin semillas.
- **Sandía triploide (*Citrullus lanatus*):** Triploide ($3n$) obtenida cruzando $4n \\times 2n$, desprovista de semillas duras.`,
      ventajas: `**Ventajas:**
- **Efecto 'Gigas' (Gigantismo celular):** Mayor tamaño celular que se traduce en hojas, flores, tubérculos y frutos más grandes.
- **Mayor tolerancia ambiental:** Incremento del vigor híbrido y mayor plasticidad ante estrés biótico o abiótico.
- **Apirenia (Frutos sin semillas):** En triploides ($3n$), la esterilidad meiótica genera frutos carnosos sin semillas duras muy valorados por el consumidor.`,
      inconvenientes: `**Inconvenientes:**
- **Esterilidad meiótica en niveles impares ($3n, 5n$):** Los cromosomas no pueden formar parejas bivalentes regulares en profase I meiótica, provocando aneuploidías y abortos.
- **Necesidad de reproducción vegetativa o clonal:** Obliga a mantener las variedades comerciales por propagación in vitro o repitiendo anualmente cruzamientos dirigidos parentales.
- **Menor fertilidad o inestabilidad cromosómica inicial.**`
    }
  },

  // ------------------------------------------------------------------------
  // PROBLEMA 6 (TEMA 2) - REORDENACIONES CROMOSÓMICAS
  // ------------------------------------------------------------------------
  {
    id: "ex-chrom-rearr-prob6",
    number: "Problema 6 (Word)",
    topicId: "tema2",
    topicName: "De la Mutación al Fenotipo",
    title: "Tipos de Reordenaciones Cromosómicas Estructurales",
    badge: "Citogenética y Cariotipo",
    xp: 70,
    description: `Describe los tipos de reordenaciones cromosómicas que conozcas, por qué se originan y cómo afectan al individuo portador de las mismas.`,
    solution: {
      tipos: `**Tipos de Reordenaciones Cromosómicas Estructurales:**
1. **Deleción:** Pérdida física de un segmento cromosómico. Puede ser terminal (en el extremo) o intersticial (en el cuerpo del brazo).
2. **Duplicación:** Ganancia de un segmento cromosómico repetido en tándem o invertido.
3. **Inversión:** Rotura de un segmento que gira 180° y se reinserta invertido:
   - **Paracéntrica:** No incluye el centrómero (ambos puntos de rotura en el mismo brazo).
   - **Pericéntrica:** Incluye el centrómero (un punto de rotura en cada brazo).
4. **Translocación:** Cambio de localización de un segmento cromosómico:
   - **Recíproca:** Intercambio mutuo de segmentos entre dos cromosomas no homólogos.
   - **Robertsoniana (Fusión céntrica):** Unión de dos cromosomas acrocéntricos por sus centrómeros con pérdida de los brazos cortos satélites.`,
      origen: `**¿Por qué se originan?**
- Roturas de doble cadena del ADN (DSB) causadas por **radiaciones ionizantes** (rayos X, rayos gamma) o agentes químicos clastogénicos, seguidas de reparación incorrecta (unión de extremos no homólogos).
- **Sobrecruzamiento meiótico desigual o ectópico** entre secuencias de ADN repetidas dispersas (transposones) situadas en cromosomas no homólogos o en distintas posiciones del mismo cromosoma.`,
      efecto: `**Efectos sobre el individuo portador:**
- **Desequilibrio de dosis génica:** Las deleciones suelen ser deletéreas o letales en homocigosis; en heterocigosis provocan pseudodominancia (manifestación de alelos recesivos mutantes al perderse el alelo dominante silvestre).
- **Subfertilidad o esterilidad meiótica:** En heterocigotos para inversiones o translocaciones se forman configuraciones meióticas complejas (lazos de inversión o cruces tetravalentes). La recombinación dentro del lazo genera gametos desequilibrados con deleciones/duplicaciones inviables, provocando abortos embrionarios y reduciendo la fertilidad a la mitad.`
    }
  },

  // ------------------------------------------------------------------------
  // PROBLEMA 7 (TEMA 3) - RAPD Y DIVERSIDAD EN POBLACIÓN VEGETAL
  // ------------------------------------------------------------------------
  {
    id: "ex-rapd-plant-div-prob7",
    number: "Problema 7 (Word)",
    topicId: "tema3",
    topicName: "Marcadores y Diversidad",
    title: "Marcadores RAPD en Poblaciones Vegetales y Selección de Parentales",
    badge: "Mejora Genética Vegetal",
    xp: 75,
    description: `La siguiente imagen muestra los resultados de un análisis con marcadores RAPDs de 4 individuos (carriles 1, 2, 3, 4) de una población vegetal.

A partir de estos resultados decide qué pareja de individuos utilizarías de parentales si quisieras **maximizar la diversidad genética** de la población resultante. ¿Y si quisieras **minimizarla**? Justifica la respuesta en todos los casos.`,
    solution: {
      maximizar: `• **Para MAXIMIZAR la diversidad genética:**
Se debe elegir la pareja de individuos parentales que presente la **menor cantidad de bandas compartidas** (es decir, la mayor distancia genética y menor coeficiente de similitud). Al cruzarse dos parentales genéticamente divergentes, la descendencia presentará la **máxima heterocigosis** posible y segregará una gran variedad de combinaciones genotípicas novedosas en las generaciones siguientes.`,
      minimizar: `• **Para MINIMIZAR la diversidad genética:**
Se debe elegir la pareja que muestre el **patrón de bandas más similar o casi idéntico** (mayor proporción de bandas compartidas). Cruzar parentales muy emparentados reduce la segregación alélica, manteniendo la uniformidad agronómica de la población resultante (homogeneidad fenotípica deseada en producción comercial).`,
      justificacion: `Los marcadores RAPD son marcadores dominantes que revelan polimorfismos en todo el genoma. El grado de similitud entre dos individuos se cuantifica mediante coeficientes como el de Dice ($S_{xy} = 2N_{xy}/(N_x + N_y)$) o Jaccard. La pareja con menor $S_{xy}$ maximiza la diversidad y la pareja con mayor $S_{xy}$ la minimiza.`
    }
  },

  // ------------------------------------------------------------------------
  // PROBLEMA 8 (TEMA 3) - RAPD EN CONEJOS Y CONSANGUINIDAD
  // ------------------------------------------------------------------------
  {
    id: "ex-rapd-rabbits-prob8",
    number: "Problema 8 (Word)",
    topicId: "tema3",
    topicName: "Marcadores y Diversidad",
    title: "Marcadores RAPD en Población de Conejos, Matriz y Consanguinidad",
    badge: "Genética de Poblaciones",
    xp: 85,
    primer: "5´ GGGCGTCT 3´",
    description: `El siguiente gel de electroforesis muestra el patrón de fragmentos de ADN amplificados usando la metodología de amplificación de fragmentos al azar mediante PCR (RAPDs), utilizando el cebador \`5´ GGGCGTCT 3´\` en una población de conejos (individuos 1 a 10).

a) Ponga un ejemplo que represente por qué se amplifica el fragmento marcado con un círculo en el individuo 1 y por qué no se amplifica en el individuo 7.
b) Transforme este gel en una matriz de 1 y 0 y calcule el coeficiente de similitud entre los individuos 1 y 7, y 1 y 8. ¿Si el individuo 1 fuera una hembra y tuviera que elegir entre el macho 7 y el macho 8 para obtener una generación con menor consanguinidad, qué cruzamiento elegiría? Explique por qué.`,
    solution: {
      a: `**Causa de amplificación diferencial en RAPD:**
- Para que se amplifique un fragmento de ADN en RAPD con un único cebador decanucleotídico, se requiere que existan **dos secuencias complementarias al cebador en orientaciones convergentes opuestas (en hebras contrarias) y a una distancia física que la Taq polimerasa pueda elongar** (< 2.000 pb).
- En el **Individuo 1**, ambas dianas están intactas y orientadas correctamente, permitiendo que la ADN polimerasa copie el fragmento entre ellas.
- En el **Individuo 7**, la banda NO amplifica debido a:
  1. Una **mutación puntual (sustitución nucleotídica)** en una o ambas dianas del cebador (especialmente en el extremo 3' del cebador), que impide la hibridación.
  2. Una **deleción** que elimina una de las dianas de unión.
  3. Una **inserción voluminosa** entre ambas dianas que aleja excesivamente los sitios impidiendo la polimerización durante el tiempo de extensión de la PCR.`,
      b: `**Matriz binaria y Coeficiente de Similitud:**
- Asignando 1 a la presencia de cada banda polimórfica y 0 a su ausencia, se computa la matriz para los individuos 1, 7 y 8.
- Utilizando el **coeficiente de similitud de Dice / Nei-Li**:
$$S_{xy} = \\frac{2 N_{xy}}{N_x + N_y}$$
donde $N_{xy}$ es el número de bandas compartidas por ambos individuos, y $N_x, N_y$ son el total de bandas presentes en cada uno.
- El individuo 7 y el individuo 8 se comparan contra la hembra 1:
  - Supongamos que la hembra 1 comparte menos bandas con el macho 7 que con el macho 8 ($S_{1,7} < S_{1,8}$).
- **Elección de cruzamiento para menor consanguinidad:**
  Se debe elegir el cruzamiento entre la **Hembra 1 y el Macho que tenga menor similitud genética** (mayor distancia genética). Cruzar individuos con la menor similitud alélica reduce al mínimo el coeficiente de consanguinidad de la camada descendiente, evitando la depresión por consanguinidad y maximizando el vigor híbrido.`
    }
  },

  // ------------------------------------------------------------------------
  // PROBLEMA 9 (TEMA 3) - PCR Y DIAGNÓSTICO VIRAL
  // ------------------------------------------------------------------------
  {
    id: "ex-pcr-viral-diag-prob9",
    number: "Problema 9 (Word)",
    topicId: "tema3",
    topicName: "Marcadores y Diversidad",
    title: "PCR y Electroforesis para el Diagnóstico de Infecciones Virales",
    badge: "Diagnóstico Molecular",
    xp: 75,
    description: `Describa los pasos del método de amplificación de fragmentos de ADN mediante la reacción en cadena de la polimerasa (PCR) y su separación posterior mediante electroforesis.
Ponga un ejemplo de cómo lo utilizaría para diagnosticar la presencia de una infección viral en un organismo, representando los resultados del gel.`,
    solution: {
      pasosPcr: `**Los 3 Pasos Cíclicos de la PCR:**
1. **Desnaturalización térmica ($94\\text{-}95\\,^\\circ\\text{C}$, 30-60 seg):** El calor rompe los puentes de hidrógeno separando las dos hebras del ADN molde.
2. **Anillamiento o Hibridación de cebadores ($50\\text{-}65\\,^\\circ\\text{C}$, 30-60 seg):** Dos oligonucleótidos sintéticos específicos (cebador *Forward* y *Reverse*) hibridan con las secuencias complementarias flanqueantes del gen diana viral en hebras opuestas.
3. **Elongación o Extensión ($72\\,^\\circ\\text{C}$):** Temperatura óptima de la enzima termoestable **Taq ADN polimerasa**, que incorpora dNTPs en sentido $5'\\rightarrow 3'$ a partir del extremo 3'-OH de cada cebador.
*Se repiten entre 30 y 35 ciclos, amplificando teóricamente hasta $2^n$ copias del fragmento viral.*

**Electroforesis en Gel de Agarosa:**
La mezcla de amplificación se carga en pocillos de un gel de agarosa al 1,5-2% con tampón TAE/TBE y un agente intercalante fluorescente (Bromuro de Etidio o SYBR Safe). Al aplicar un campo eléctrico, los fragmentos con carga negativa neta migran hacia el polo positivo (ánodo), separándose según su longitud molecular.`,
      diagnosticoViral: `**Diseño Experimental del Diagnóstico Viral:**
Se diseñan cebadores específicos para un gen esencial y altamente conservado de la cápside o polimerasa del virus diana (ej. amplicón diagnóstico esperado de **350 pb**).

**Disposición de Carriles en el Gel:**
- **Carril 1 (Ladder / Marcador de peso molecular):** Bandas patrón conocidas (100, 200, 300, 400, 500 pb...).
- **Carril 2 (Control Negativo):** Reacción de PCR completa sin ADN molde (agua estéril). No debe mostrar ninguna banda (valida ausencia de contaminación de laboratorio).
- **Carril 3 (Control Positivo):** ADN/cADN viral de referencia conocido. Debe mostrar nítidamente la banda diagnóstica de **350 pb**.
- **Carril 4 (Muestra Paciente 1):** Muestra clínica del paciente sospechoso. Si aparece la banda de **350 pb**, el resultado es **POSITIVO (Infección Viral Confirmada)**.
- **Carril 5 (Muestra Paciente 2):** No se observa banda de 350 pb, indicando resultado **NEGATIVO (Ausencia de Infección o carga viral por debajo del límite de detección)**.`
    }
  }
];

// Export to window
if (typeof window !== 'undefined') {
  window.EXAM_PROBLEMS = EXAM_PROBLEMS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXAM_PROBLEMS };
}
