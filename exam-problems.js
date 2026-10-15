// ==========================================================================
// BIOGENLAB SUITE - COMPENDIO DE CASOS PRÁCTICOS Y PROBLEMAS EXPERIMENTALES
// 13 Casos Prácticos y Problemas Experimentales con Evaluación Interactiva Activa
// ==========================================================================

const EXAM_PROBLEMS = [
  {
    "id": "ex-mut-seq",
    "number": "Caso Práctico 1",
    "topicId": "tema2",
    "topicName": "De la Mutación al Fenotipo",
    "title": "Secuencia Codificante y Tipos de Mutaciones Puntuales",
    "badge": "Traducción y Mutagénesis",
    "xp": 75,
    "dnaSequence": "5'-ATG CCC TAT CGA TTT ACT CTA TAC GGC GTT TAA-3'",
    "mrnaSequence": "5'-AUG CCC UAU CGA UUU ACU CUA UAC GGC GUU UAA-3'",
    "wtProtein": [
      "Met",
      "Pro",
      "Tyr",
      "Arg",
      "Phe",
      "Thr",
      "Leu",
      "Tyr",
      "Gly",
      "Val",
      "Stop"
    ],
    "description": "Suponga que la siguiente secuencia de ADN es una secuencia codificante, un fragmento de un gen:\n$$\\text{5'-ATG CCC TAT CGA TTT ACT CTA TAC GGC GTT TAA-3'}$$\n\na) Utilizando la tabla de traducción genética, indique la secuencia de aminoácidos de la proteína resultante de:\n- Una **mutación silenciosa**\n- Una **mutación sin sentido (nonsense)**\n- Una **mutación con cambio de sentido (missense)**\n- Una **mutación por desplazamiento del marco de lectura (frameshift)**\n\nb) Si el cambio de secuencia es una modificación de una sola base, indique la posición de la base modificada en la secuencia de ADN (1 a 33) de modo que se produzca cada uno de los tipos de mutación mencionados y resulte en un cambio fenotípico en el organismo portador.",
    "interactiveEvaluation": {
      "question": "Si introducimos una mutación en la base 10 sustituyendo C por T (transformando el codón 4 de CGA a TGA/UGA), ¿qué tipo exacto de mutación se produce y cuál es su impacto sobre la proteína resultante?",
      "options": [
        "Mutación por desplazamiento de pauta (frameshift): altera todas las fases de lectura posteriores sin parar la traducción.",
        "Mutación silenciosa: no altera el aminoácido y la proteína conserva el 100% de su actividad catalítica.",
        "Mutación de cambio de sentido (missense): sustituye Arginina por Leucina con plegamiento ligeramente alterado.",
        "Mutación sin sentido (nonsense): genera un codón de parada prematuro (Stop), produciendo un péptido truncado de solo 3 aminoácidos no funcional."
      ],
      "correct": 3,
      "feedbackCorrect": "¡Excelente deducción! El codón CGA codifica Arginina; al mutar la base 10 (C→T), se convierte en el triplete de terminación TGA (UGA en el ARNm), lo que detiene abruptamente la traducción en el ribosoma originando un péptido truncado (Met-Pro-Tyr-Stop) completamente inactivo.",
      "feedbackIncorrect": "Revisa el código genético: CGA es el cuarto codón. Al cambiar la primera base (C→T) se genera TGA, que en el ARNm es UGA (uno de los 3 codones de parada universales: UAA, UAG, UGA)."
    },
    "solution": {
      "a": "• **Secuencia Silvestre (wt):**\n  - ARNm: `AUG CCC UAU CGA UUU ACU CUA UAC GGC GUU UAA`\n  - Proteína: `Met–Pro–Tyr–Arg–Phe–Thr–Leu–Tyr–Gly–Val–Stop`\n• **Mutación Silenciosa:** ej. codon 2 `CCC \\rightarrow CCU` (ambos codifican Prolina).\n  - Proteína: `Met–Pro–Tyr–Arg–Phe–Thr–Leu–Tyr–Gly–Val–Stop` (sin alteración de aminoácidos).\n• **Mutación Sin Sentido (Nonsense):** ej. codon 4 `CGA (Arg) \\rightarrow UGA (Stop)`.\n  - Proteína: `Met–Pro–Tyr–Stop` (proteína truncada tempranamente).\n• **Mutación con Cambio de Sentido (Missense):** ej. codon 5 `UUU (Phe) \\rightarrow UUA (Leu)`.\n  - Proteína: `Met–Pro–Tyr–Arg–Leu–Thr–Leu–Tyr–Gly–Val–Stop`.\n• **Mutación por Desplazamiento de Marco (Frameshift):** deleción de la primera U de UUU en codon 5.\n  - ARNm mutado: `AUG CCC UAU CGA UU-CUC-UAU-ACG-GCU-UUA...`\n  - Proteína: `Met–Pro–Tyr–Arg–Phe–Leu–Tyr–Thr–Ala–Leu–...` (secuencia aberrante hasta encontrar un codón stop fuera de fase).",
      "b": "Numerando las bases de 1 a 33:\n- **Silenciosa (CCC → CCT):** Base **6** (3ª base del segundo codón). No produce cambio fenotípico.\n- **Sin Sentido (CGA → TGA):** Base **10** (1ª base del cuarto codón). Produce fenotipo alterado por parada prematura.\n- **Missense (TTT → TTA):** Base **15** (3ª base del quinto codón). Produce fenotipo alterado por sustitución de Phe por Leu.\n- **Frameshift (Inserción/Deleción):** ej. inserción tras la base **14** (cambio de pauta a partir del codón 5)."
    }
  },
  {
    "id": "ex-rapd-paternity",
    "number": "Caso Práctico 2",
    "topicId": "tema3",
    "topicName": "Marcadores y Diversidad",
    "title": "Análisis de RAPD para Filiación y Paternidad",
    "badge": "RAPD & Forense",
    "xp": 75,
    "primer": "5' GGGGCCTT 3'",
    "bands": [
      200,
      300,
      400,
      500,
      600
    ],
    "matrix": [
      {
        "ind": "Individuo 1",
        "values": [
          1,
          1,
          1,
          0,
          0
        ]
      },
      {
        "ind": "Individuo 2",
        "values": [
          1,
          0,
          0,
          1,
          1
        ]
      },
      {
        "ind": "Individuo 3",
        "values": [
          0,
          1,
          1,
          0,
          1
        ]
      },
      {
        "ind": "Posible Padre",
        "values": [
          1,
          1,
          1,
          1,
          0
        ]
      }
    ],
    "description": "El siguiente gel de electroforesis muestra el patrón de fragmentos de ADN amplificados por PCR con el cebador `5’ GGGGCCTT 3’`, usando el ADN de tres individuos (carriles 1, 2, 3) y un posible padre (carril 4).\n\na) Ponga en un esquema el número de repeticiones que se amplifica para el fragmento marcado con un asterisco (*) en el carril 4 (~400 pb).\nb) Transforme el patrón de bandas del gel en una matriz binaria, indicando con 1 la presencia de banda y con 0 la ausencia.\nc) ¿Cuál de los tres individuos podría ser hijo del posible padre biológico? ¿Por qué? ¿Podría haber otro escenario con otro patrón de bandas que conduzca a una conclusión diferente? Explique.",
    "interactiveEvaluation": {
      "question": "Analizando la matriz binaria de presencia/ausencia de bandas (carriles 1 a 4), ¿cuál de los tres individuos evaluados es el ÚNICO compatible como hijo biológico del posible padre?",
      "options": [
        "Individuo 3: Porque posee las dos bandas intermedias de 300 y 400 pb.",
        "Individuo 2: Porque comparte la banda pesada de 500 pb con el padre biológico.",
        "Ninguno de los tres: El padre tiene 4 bandas y ningún hijo puede tener menos bandas que el padre.",
        "Individuo 1: Solo presenta bandas compartidas con el padre (200, 300 y 400 pb) y no tiene bandas de 600 pb ausentes en el progenitor."
      ],
      "correct": 3,
      "feedbackCorrect": "¡Correcto! En genética forense con marcadores dominantes como RAPD, un hijo biológico solo puede heredar bandas presentes en el progenitor. Los individuos 2 y 3 quedan taxativamente excluidos porque ambos presentan una banda de 600 pb que el presunto padre NO posee.",
      "feedbackIncorrect": "Fíjate en las bandas excluyentes: los Individuos 2 y 3 poseen una banda de 600 pb. ¿De dónde podría haber salido esa banda si el padre no la tiene? El Individuo 1 es el único que no tiene bandas ajenas al padre."
    },
    "solution": {
      "a": "El carril 4 muestra un fragmento de aproximadamente **400 pb** marcado con asterisco (*). Si asumimos que la unidad repetitiva mide 50 pb y está flanqueada por el cebador de 8 nt:\n$$\\text{5'–GGGGCCTT–[R]}\\times 4\\text{–GGGGCCTT–3'}$$\ndonde $R = 50\\text{ pb}$ y $\\times 4$ indica que hay cuatro unidades repetidas entre ambos sitios del cebador.",
      "b": "**Matriz Binaria del Patrón de Bandas:**\n| Fragmento (pb) | 200 | 300 | 400* | 500 | 600 |\n| :--- | :---: | :---: | :---: | :---: | :---: |\n| **Individuo 1** | **1** | **1** | **1** | **0** | **0** |\n| **Individuo 2** | **1** | **0** | **0** | **1** | **1** |\n| **Individuo 3** | **0** | **1** | **1** | **0** | **1** |\n| **Posible Padre** | **1** | **1** | **1** | **1** | **0** |",
      "c": "• **Filiación:** Un hijo biológico solo puede heredar bandas presentes en el padre y no puede mostrar bandas que el padre no posea (a menos que provengan de la madre conocida).\n- El **Individuo 1** es el **único hijo biológico compatible**: exhibe exclusivamente bandas compartidas con el padre (200, 300 y 400 pb) y no presenta la banda de 600 pb ausente en el padre.\n- Los **Individuos 2 y 3** quedan **excluidos como hijos** porque ambos presentan la banda de 600 pb, la cual no aparece en el posible padre biológico.\n• **Escenarios alternativos:** Si existiera un fallo de amplificación (alelo nulo por mutación en la diana del cebador o baja reproducibilidad de RAPDs), un hijo real podría carecer de una banda paterna, lo que podría conducir a falsas exclusiones o dudas de filiación."
    }
  },
  {
    "id": "ex-invitro-test",
    "number": "Caso Práctico 3",
    "topicId": "tema4",
    "topicName": "Cultivo In Vitro",
    "title": "Banco Oficial de Preguntas de Examen de Cultivo In Vitro",
    "badge": "Evaluación Oficial In Vitro",
    "xp": 80,
    "description": "Banco oficial de 11 preguntas de examen sobre cultivo in vitro, micropropagación, regeneración celular, esterilización y transformación genética con Agrobacterium y biobalística (preguntas a a k).",
    "interactiveEvaluation": {
      "question": "En un protocolo estandarizado de micropropagación comercial, ¿cuál de las siguientes combinaciones de fases, fitohormonas y condiciones es estrictamente correcta según la metodología oficial?",
      "options": [
        "La Fase 4 (Aclimatación) consiste en transferir inmediatamente los brotes a pleno sol en tierra seca sin periodo de adaptación.",
        "La variación somaclonal solo se produce en semillas silvestres y nunca ocurre en cultivos de tejidos in vitro.",
        "La Fase 2 requiere altas concentraciones de auxinas para elongar tallos, y la Fase 3 requiere citoquininas para formar la cofia radicular.",
        "La Fase 2 (Multiplicación) requiere citoquininas para inducir brotes, y la Fase 3 (Enraizamiento) requiere auxinas para la emisión de raíces adventicias."
      ],
      "correct": 3,
      "feedbackCorrect": "¡Exacto! La Fase 2 de multiplicación se basa en la ruptura de la dominancia apical mediante citoquininas (como BA o Kinetina) para multiplicar brotes axilares o adventicios, mientras que la Fase 3 de enraizamiento requiere auxinas (como IBA o NAA) para inducir primordios radiculares.",
      "feedbackIncorrect": "Recuerda el balance auxinas/citoquininas: las citoquininas inducen la división celular y brotes aéreos, mientras que las auxinas inducen raíces adventicias."
    },
    "solution": {
      "summary": "Este bloque evalúa los 11 puntos críticos de la convocatoria oficial:\n1. **Definición de Explante:** Fragmento vegetal aséptico capaz de regenerar.\n2. **Esterilización:** Autoclave a 121 °C (1 atm, 20 min).\n3. **Fitotrón:** Control de temperatura, humedad y fotoperiodo.\n4. **Meristemos:** Tejido libre de virus para saneamiento.\n5. **Agrobacterium:** Vector biológico con plásmido Ti y T-DNA.\n6. **Biobalística:** Aceleración de micropartículas de oro con ADN.\n7. **MON810:** Maíz transgénico Bt cultivado en España (129.081 ha en 2016).\n8. **Fases de Micropropagación:** Fase 0 (Saneamiento) ➔ Fase 1 (Establecimiento) ➔ Fase 2 (Multiplicación) ➔ Fase 3 (Enraizamiento) ➔ Fase 4 (Aclimatación).\n9. **Totipotencia:** Capacidad de desdiferenciación y reorganización.\n10. **Organogénesis vs Embriogénesis:** Unipolar independiente vs Bipolar sincronizado con 4 fases (globular, corazón, torpedo, cotiledonar).\n11. **Variación Somaclonal:** Comprobación obligatoria por citometría de flujo y marcadores moleculares."
    }
  },
  {
    "id": "ex-sanger-2024",
    "number": "Caso Práctico 4",
    "topicId": "tema1",
    "topicName": "Genética y Genómica",
    "title": "Secuenciación de Sanger - Examen 28 de Octubre 2024",
    "badge": "Examen Oficial Sanger",
    "xp": 85,
    "dnaFragment": {
      "top": "5' ATCGTTTCGTTAGGGXXXXXXXXXXXXXXXXXXXXXXCCGGATGCTGTCGGG 3'",
      "bot": "3' TAGCAAAGCAATCCCXXXXXXXXXXXXXXXXXXXXXXGGCCTACGACAGCCC 5'"
    },
    "primers": [
      {
        "id": "b1",
        "seq": "5' CCCGACAGCATCCGG 3'",
        "desc": "Complementario a la hebra superior en el extremo 3'. Se une a la hebra superior y sintetiza hacia la izquierda."
      },
      {
        "id": "b2",
        "seq": "5' ATCGTTTCGTTAGGG 3'",
        "desc": "Idéntico a la hebra superior 5'. Se une a la hebra inferior molde (3' TAGCAAAGCAATCCC 5') y sintetiza hacia la derecha para secuenciar X."
      },
      {
        "id": "b3",
        "seq": "5' CCCTAACGAAACGAT 3'",
        "desc": "Complementario al extremo 5' superior en orientación incorrecta."
      },
      {
        "id": "b4",
        "seq": "5' CCGGATGCTGTCGGG 3'",
        "desc": "Idéntico al extremo 3' superior."
      }
    ],
    "description": "La metodología de Sanger se desarrolló en la década de los 70 para obtener la secuencia de bases nitrogenadas de las moléculas de ADN. Suponga que quiere secuenciar la siguiente molécula de ADN:\n$$\\text{5' ATCGTTTCGTTAGGGXXXXXXXXXXXXXXXXXXXXXXCCGGATGCTGTCGGG 3'}$$\n$$\\text{3' TAGCAAAGCAATCCCXXXXXXXXXXXXXXXXXXXXXXGGCCTACGACAGCCC 5'}$$\n\na) Indique cuál es la función de los didesoxinucleótidos (ddNTPs) en esta metodología de secuenciación.\nb) Indique cuáles de los siguientes cebadores podría utilizar para dicha secuenciación y cuáles no, justificando por qué:\n- **b.1)** `5' CCCGACAGCATCCGG 3'`\n- **b.2)** `5' ATCGTTTCGTTAGGG 3'`\n- **b.3)** `5' CCCTAACGAAACGAT 3'`\n- **b.4)** `5' CCGGATGCTGTCGGG 3'`\n\nc) Elija uno de los cebadores anteriores para realizar la secuenciación y deduzca la orientación del gel.",
    "interactiveEvaluation": {
      "question": "Para secuenciar la región interna X elongando hacia la derecha a lo largo de la hebra inferior molde (3' TAGCAAAGCAATCCC... 5'), ¿cuál de los cuatro cebadores propuestos es el VÁLIDO?",
      "options": [
        "b.2) 5' ATCGTTTCGTTAGGG 3' (hibrida de forma complementaria y antiparalela con el extremo 3' de la hebra inferior y su extremo 3'-OH elonga hacia la derecha atravesando X).",
        "b.3) 5' CCCTAACGAAACGAT 3' (porque tiene mayor porcentaje de guaninas y citosinas).",
        "b.4) 5' CCGGATGCTGTCGGG 3' (porque se une al extremo 5' de la hebra inferior).",
        "Ninguno de los anteriores es válido porque los cebadores deben ser de ARN bicatenario."
      ],
      "correct": 0,
      "feedbackCorrect": "¡Perfecto! El cebador b.2 (5' ATCGTTTCGTTAGGG 3') es perfectamente complementario a 3' TAGCAAAGCAATCCC 5'. Al unirse a la hebra inferior, su extremo 3'-OH libre apunta hacia la derecha, permitiendo a la polimerasa sintetizar de 5' a 3' cruzando toda la región X desconocida.",
      "feedbackIncorrect": "Comprueba el principio de antiparalelismo: para leer la hebra inferior de izquierda a derecha (hacia su extremo 5'), el cebador debe unirse a su extremo 3' (3' TAGCAAAGCAATCCC 5') y apuntar con su 3'-OH hacia la derecha."
    },
    "solution": {
      "a": "Los didesoxinucleótidos (**ddNTPs**) carecen del grupo hidroxilo en posición **3'-OH** de la pentosa (tienen un hidrógeno en lugar de -OH). La ADN polimerasa necesita ese grupo 3'-OH libre para formar el enlace fosfodiéster con el siguiente nucleótido entrante. Al incorporarse un ddNTP, la síntesis de la cadena se **detiene inmediata e irreversiblemente**, generando fragmentos de longitud específica que terminan en esa base marcada.",
      "b": "Para secuenciar la región interna desconocida **X**:\n- **b.1) 5' CCCGACAGCATCCGG 3' (VÁLIDO):** Es perfectamente complementario y antiparalelo al extremo 3' de la hebra superior (`3' GGCCTACGACAGCCC 5'`). Al unirse a la hebra superior, la ADN polimerasa elonga desde su extremo 3'-OH hacia la izquierda ($5'\\rightarrow 3'$), leyendo la región X de la hebra superior.\n- **b.2) 5' ATCGTTTCGTTAGGG 3' (VÁLIDO):** Es complementario y antiparalelo al extremo 3' de la hebra inferior molde (`3' TAGCAAAGCAATCCC 5'`). Al unirse, elonga de $5'\\rightarrow 3'$ hacia la derecha, secuenciando la región X a lo largo de la hebra inferior.\n- **b.3 y b.4 (NO VÁLIDOS):** No pueden hibridar de forma productiva con ninguna de las hebras para elongar hacia la región central X con la orientación $5'\\rightarrow 3'$ necesaria.",
      "c": "Al leer el gel de electroforesis desnaturalizante de poliacrilamida **desde la base (fragmentos más cortos) hacia arriba (fragmentos más largos)** en los 4 carriles ddATP, ddCTP, ddGTP, ddTTP, cada banda sucesiva revela el siguiente nucleótido incorporado en la dirección $5'\\rightarrow 3'$. Deduciendo la secuencia complementaria se reconstruye con exactitud la secuencia desconocida **X** de la molécula molde."
    }
  },
  {
    "id": "ex-sanger-prob1",
    "number": "Caso Práctico 5",
    "topicId": "tema1",
    "topicName": "Genética y Genómica",
    "title": "Diseño de Cebador y Esquema de Gel en Secuenciación Sanger",
    "badge": "Diseño de Cebadores",
    "xp": 75,
    "dnaSequence": "5´ TTACGCAGTCCCTAATCGGGTAT 3´",
    "targetRegion": "CCCTAA",
    "description": "Utilizando la siguiente molécula de ADN:\n$$\\text{5´ TTACGCAGTCCCTAATCGGGTAT 3´}$$\n\nb.1. Diseñe un cebador que se una a la región marcada (`CCCTAA`), indique su secuencia, sus extremos 5′ y 3′ y represente cómo se uniría a la molécula durante la secuenciación.\nb.2. Represente el gel de electroforesis con los fragmentos de ADN que se obtendrían tras la secuenciación, indicando la posición en el gel y el tamaño en nucleótidos de cada fragmento.",
    "interactiveEvaluation": {
      "question": "Para la región diana 5'-CCCTAA-3' en la hebra dada, ¿cuál es la secuencia correcta del cebador escrito formalmente en dirección 5' a 3'?",
      "options": [
        "3'- T T A G G G - 5'",
        "5'- T T A G G G - 3'",
        "5'- C C C T A A - 3'",
        "5'- G G G A T T - 3'"
      ],
      "correct": 1,
      "feedbackCorrect": "¡Correcto! La secuencia complementaria a 5'-CCCTAA-3' es 3'-GGGATT-5'. Al escribirla en la convención estándar obligatoria de biología molecular 5' a 3', invertimos el orden obteniendo 5'-TTAGGG-3'.",
      "feedbackIncorrect": "Atención a la polaridad: la hebra molde tiene 5'-CCCTAA-3'. La hebra complementaria es 3'-GGGATT-5'. Todo cebador en biología molecular debe enunciarse en dirección 5' a 3', es decir, 5'-TTAGGG-3'."
    },
    "solution": {
      "b1": "• **Región diana:** `5' CCCTAA 3'` en la molécula dada.\n• **Cebador complementario y antiparalelo:**\n$$\\text{3' GGGATT 5'} \\quad \\Rightarrow \\quad \\text{Secuencia 5' a 3': } \\mathbf{\\text{5' TTAGGG 3'}}$$\n• **Apareamiento molecular:**\n```\nMolécula molde: 5' TTACGCAGT C C C T A A TCGGGTAT 3'\nCebador:                  3' G G G A T T 5'\n```\nComo la ADN polimerasa únicamente puede sintetizar en sentido $5' \\rightarrow 3'$, el cebador elongará desde su extremo $3'\\text{-OH}$ hacia la izquierda de la molécula molde (`3' GGGATT 5'`), sintetizando el complemento de `5' TTACGCAGT 3'`.",
      "b2": "El cebador mide **6 nucleótidos**. Cada incorporación de nucleótido antes de terminar con un ddNTP aumenta el tamaño en 1 nt:\n- Fragmentos generados con tamaños de **7 nt, 8 nt, 9 nt, 10 nt, 11 nt, 12 nt, 13 nt, 14 nt, 15 nt**.\n- En el gel de poliacrilamida, el fragmento de **7 nt** migrará más rápido y quedará en la parte más inferior; el de **15 nt** migrará más lento quedando en la parte superior."
    }
  },
  {
    "id": "ex-sanger-prob2",
    "number": "Caso Práctico 6",
    "topicId": "tema1",
    "topicName": "Genética y Genómica",
    "title": "Interpretación de Autorradiografía Sanger y Tamaño de Fragmentos",
    "badge": "Lectura de Gel Sanger",
    "xp": 75,
    "dnaFragment": {
      "top": "5´ ATCGGTTACCTGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXCCCCGGTAGATGCCT 3´",
      "bot": "3´ TAGCCAATGGACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXGGGGCCATCTACGGA 5´"
    },
    "description": "La imagen representa un gel de electroforesis obtenido tras la secuenciación de una molécula de ADN con la metodología de Sanger. Cada carrera representa los fragmentos obtenidos en una reacción independiente: carril 1 (ddATP), carril 2 (ddCTP), carril 3 (ddGTP) y carril 4 (ddTTP).\n\na) Describa brevemente qué pasos habría seguido hasta obtener dicho gel.\nb) Indique el cebador utilizado, señalando sus extremos 5´y 3´ y situándolo en la zona donde se uniría al fragmento secuenciado.\nc) Indique el tamaño en nucleótidos de cada uno de los fragmentos de ADN del gel y la secuencia del fragmento marcado con X.",
    "interactiveEvaluation": {
      "question": "Si el cebador utilizado mide 12 nucleótidos y la primera banda inferior aparece en el carril de ddATP, ¿cuántos nucleótidos tiene ese fragmento y en qué extremo del gel se localiza?",
      "options": [
        "12 nucleótidos, en la parte superior junto a los pocillos de carga.",
        "24 nucleótidos, en el centro exacto del gel.",
        "13 nucleótidos, y se localiza en la base del gel (cerca del polo positivo/ánodo) por ser el fragmento de menor peso molecular.",
        "1 nucleótido, en el polo negativo (cátodo)."
      ],
      "correct": 2,
      "feedbackCorrect": "¡Exacto! El fragmento más corto está formado por los 12 nucleótidos del cebador más el primer ddNTP incorporado (ddATP en este caso), totalizando 13 nt. Al ser el más ligero, migra a máxima velocidad hacia el ánodo (+), situándose en la base del gel.",
      "feedbackIncorrect": "Recuerda que el cebador no migra solo (no tiene terminador marcado); la banda más baja detectable corresponde al cebador (12 nt) + 1 ddNTP incorporado = 13 nt, situada en el fondo del gel."
    },
    "solution": {
      "a": "**Pasos metodológicos del protocolo de Sanger:**\n1. **Desnaturalización:** Separación de las dos hebras del fragmento de ADN mediante calor.\n2. **Hibridación del cebador (Annealing):** Unión del cebador monocatenario específico al extremo 3' de la hebra molde.\n3. **Distribución en 4 tubos de reacción:** Cada tubo contiene la ADN polimerasa, los 4 dNTPs normales sin marcar y una pequeña proporción de un único didesoxinucleótido marcado específico (Tubo A: ddATP; Tubo C: ddCTP; Tubo G: ddGTP; Tubo T: ddTTP).\n4. **Polimerización y terminación aleatoria:** La polimerasa sintetiza la cadena hasta que incorpora un ddNTP, donde se detiene la reacción.\n5. **Electroforesis desnaturalizante en gel de poliacrilamida:** Carga de los 4 tubos en carriles contiguos y separación de fragmentos por tamaño (resolución de 1 nucleótido), seguida de autorradiografía o fluorescencia.",
      "b": "Para secuenciar la región X de izquierda a derecha a lo largo de la hebra molde inferior, se utiliza un cebador complementario al extremo 3' de dicha hebra:\n$$\\mathbf{\\text{5´ ATCGGTTACCTG 3´}}$$\nSe une a `3´ TAGCCAATGGAC 5´` y elonga desde el extremo 3' hacia la región X.",
      "c": "Si el cebador tiene una longitud de 12 nucleótidos:\n- La primera banda en la base del gel tiene **13 nt** (12 nt del cebador + 1º ddNTP incorporado).\n- Las siguientes bandas aumentan sucesivamente: **14 nt, 15 nt, 16 nt... hasta completar la longitud de X**.\n- Leyendo el carril correspondiente a cada altura de banda (A, C, G o T) de abajo hacia arriba, se escribe directamente la secuencia $5'\\rightarrow 3'$ complementaria a la hebra molde, que coincide con la secuencia X de la hebra codificante."
    }
  },
  {
    "id": "ex-mut-prob3",
    "number": "Caso Práctico 7",
    "topicId": "tema2",
    "topicName": "De la Mutación al Fenotipo",
    "title": "Efecto Funcional de Cuatro Mutaciones en la Proteína",
    "badge": "Código Genético & Mutaciones",
    "xp": 80,
    "mrnaSequence": "AUG ACG GAU CAG CCG CAA UAC GAA UUG GCG UUU AAG GCG",
    "codons": [
      {
        "codon": "AUG",
        "aa": "Met"
      },
      {
        "codon": "ACG",
        "aa": "Thr"
      },
      {
        "codon": "GAU",
        "aa": "Asp"
      },
      {
        "codon": "CAG",
        "aa": "Gln"
      },
      {
        "codon": "CCG",
        "aa": "Pro"
      },
      {
        "codon": "CAA",
        "aa": "Gln"
      },
      {
        "codon": "UAC",
        "aa": "Tyr"
      },
      {
        "codon": "GAA",
        "aa": "Glu"
      },
      {
        "codon": "UUG",
        "aa": "Leu"
      },
      {
        "codon": "GCG",
        "aa": "Ala"
      },
      {
        "codon": "UUU",
        "aa": "Phe"
      },
      {
        "codon": "AAG",
        "aa": "Lys"
      },
      {
        "codon": "GCG",
        "aa": "Ala"
      }
    ],
    "description": "La siguiente secuencia representa la región codificante de un gen:\n$$\\text{AUG ACG GAU CAG CCG CAA UAC GAA UUG GCG UUU AAG GCG}$$\n\nIndique la proteína resultante de su traducción utilizando la tabla del código genético.\n\nSuponga que dicha secuencia sufre las siguientes mutaciones:\n1. `AUG ACA GAU CAG CCG CAA UAC GAA`\n2. `AUG ACG GAA CAG CCG CAA UAC GAA`\n3. `AUG ACG GAU CAG CCG UAA UAC GAA`\n4. `AUG ACG AGAU CAG CCG CAA UAC GAA`\n\nEscriba las proteínas resultantes e indique el tipo de mutación en cada caso. Describa brevemente el posible efecto de cada tipo de mutación sobre la función de la proteína resultante.",
    "interactiveEvaluation": {
      "question": "En la mutación 3 (AUG ACG GAU CAG CCG UAA...), el codón 6 pasa de CAA (Glutamina) a UAA. ¿Cuál es el resultado exacto de esta mutación?",
      "options": [
        "Mutación sin sentido (nonsense): genera un codón Stop en la posición 6, produciendo un péptido de solo 5 aminoácidos y pérdida total de función.",
        "Mutación por inversión cromosómica en el brazo corto.",
        "Mutación silenciosa: la glutamina sigue incorporándose por titubeo del ARNt.",
        "Mutación missense: sustituye Glutamina por Asparagina con funcionalidad reducida al 50%."
      ],
      "correct": 0,
      "feedbackCorrect": "¡Muy bien! UAA es el codón de terminación Ocre (Stop). Al aparecer en el sexto triplete, la traducción finaliza de inmediato, generando un fragmento de solo 5 aminoácidos (Met-Thr-Asp-Gln-Pro-Stop) que carece por completo de la estructura y función biológica.",
      "feedbackIncorrect": "UAA, UAG y UGA son codones que no codifican ningún aminoácido; son reconocidos por factores de liberación proteica que provocan la disociación del ribosoma."
    },
    "solution": {
      "wt": "**Proteína Silvestre (wt):**\n`Met – Thr – Asp – Gln – Pro – Gln – Tyr – Glu – Leu – Ala – Phe – Lys – Ala`",
      "mut1": "1. **AUG ACA GAU...:** Mutación **Silenciosa** (`ACG \\rightarrow ACA`, ambos Treonina).\n- **Proteína:** Idéntica a la silvestre (`Met–Thr–Asp–...`).\n- **Efecto funcional:** Ninguno. La proteína conserva el 100% de su estructura y función biológica.",
      "mut2": "2. **AUG ACG GAA...:** Mutación de **Cambio de Sentido (Missense)** (`GAU (Asp) \\rightarrow GAA (Glu)`).\n- **Proteína:** `Met–Thr–Glu–Gln–Pro–Gln–Tyr–Glu...`\n- **Efecto funcional:** Ambos son aminoácidos ácidos con carga negativa, por lo que el cambio podría ser conservativo con poco impacto, o alterar la afinidad de unión a sustratos si se localiza en el centro activo.",
      "mut3": "3. **AUG ACG GAU CAG CCG UAA...:** Mutación **Sin Sentido (Nonsense)** (`CAA (Gln) \\rightarrow UAA (STOP)`).\n- **Proteína:** `Met–Thr–Asp–Gln–Pro–Stop` (péptido de solo 5 aminoácidos).\n- **Efecto funcional:** Pérdida total de la función biológica (proteína truncada no funcional, degradada por el sistema celular).",
      "mut4": "4. **AUG ACG AGA UCA GCC GCA AUA CGA A...:** Mutación por **Desplazamiento del Marco de Lectura (Frameshift)** por inserción de adenina.\n- **Proteína:** `Met–Thr–Arg–Ser–Ala–Ala–Ile–Arg...`\n- **Efecto funcional:** Modifica por completo todos los aminoácidos posteriores y habitualmente genera un codón de parada prematuro fuera de fase; la proteína resultante es completamente aberrante y carece de función."
    }
  },
  {
    "id": "ex-euk-gene-prob4",
    "number": "Caso Práctico 8",
    "topicId": "tema2",
    "topicName": "De la Mutación al Fenotipo",
    "title": "Estructura del Gen Eucariota y Repercusión de Mutaciones Puntuales",
    "badge": "Gen Eucariota & Regulación",
    "xp": 75,
    "description": "a) Realice un esquema indicando las partes de un gen eucariota e indique cuál sería el posible efecto de una mutación puntual sobre la proteína codificada por el mismo en cada una de sus regiones.\nb) Ponga un ejemplo de una mutación silenciosa, una mutación sin sentido y una mutación de cambio de sentido en el gen a partir del cual se ha transcrito el ARN mensajero del problema 3, indicando la secuencia de aminoácidos resultante.\nc) Indique brevemente el posible efecto de cada tipo de mutación sobre la función de la proteína resultante.",
    "interactiveEvaluation": {
      "question": "¿Qué efecto molecular produce una mutación puntual localizada en la secuencia promotora o en la caja TATA de un gen eucariota?",
      "options": [
        "Provoca la escisión del centrómero en el cromosoma metafásico.",
        "Altera la afinidad de unión de la ARN polimerasa o factores de transcripción basales, disminuyendo o aboliendo la tasa de transcripción del gen sin alterar la secuencia de aminoácidos codificada.",
        "Cambia la cola de poli-A por una serie de citosinas.",
        "Origina un codón Stop prematuro en la proteína."
      ],
      "correct": 1,
      "feedbackCorrect": "¡Exacto! El promotor y la caja TATA no se transcriben ni traducen; su función es actuar como diana de reconocimiento para la maquinaria transcripcional. Una mutación en esta región altera la cantidad de transcrito producido pero no la secuencia codificante del exón.",
      "feedbackIncorrect": "El promotor se sitúa aguas arriba del punto de inicio (+1). Como no forma parte del ARN maduro traducido, no altera los codones directamente, sino la tasa de síntesis de ARNm."
    },
    "solution": {
      "a": "**Partes del Gen Eucariota y Repercusión de una Mutación Puntual:**\n1. **Promotor y Caja TATA:** No se transcribe. Una mutación aquí altera la unión de la ARN polimerasa o factores basales de transcripción, provocando una disminución drástica (o supresión total) de la transcripción, reduciendo la cantidad de proteína sin alterar su secuencia.\n2. **Región 5' UTR:** Se transcribe pero no se traduce. Una mutación puede alterar el acoplamiento ribosómico, impidiendo el inicio de la traducción.\n3. **Exón (Secuencia Codificante):** Puede originar mutaciones silenciosas, missense, nonsense o frameshift.\n4. **Sitios de Splicing en Intrones (diana donadora GT y aceptora AG):** Una mutación en las dianas de corte y empalme provoca la retención aberrante del intrón o el salto de exón (*exon skipping*), alterando la pauta de lectura.\n5. **Región 3' UTR y Señal de Poliadenilación:** Afecta a la vida media y estabilidad del ARNm o a su exportación activa al citoplasma.\n6. **Terminador:** Puede provocar lecturas continuas más allá de la unidad transcripcional.",
      "b": "Ejemplos basados en `AUG ACG GAU CAG CCG CAA UAC GAA UUG GCG UUU AAG GCG`:\n- **Silenciosa:** `AUG ACG GAU CAG CCG CAA UAC GAA UUG GCG UUC AAG GCG` (`UUU \\rightarrow UUC`, ambos Phe). Proteína idéntica.\n- **Sin Sentido:** `AUG ACG GAU CAG CCG CAA UAG...` (`UAC (Tyr) \\rightarrow UAG (STOP)`). Proteína truncada a 6 aminoácidos (`Met-Thr-Asp-Gln-Pro-Gln-Stop`).\n- **Cambio de Sentido:** `AUG ACG GAU CAG CCG CAA UAC GAA UUG GCG UUU GAG GCG` (`AAG (Lys) \\rightarrow GAG (Glu)`). Sustitución de Lys (básico) por Glu (ácido).",
      "c": "**Efecto funcional:**\n- Silenciosa: Proteína 100% activa.\n- Sin sentido: Proteína truncada, carente de los dominios funcionales catalíticos, no activa.\n- Cambio de sentido: Puede no alterar la función si es un aminoácido de superficie con propiedades químicas similares, o inactivar la enzima si altera el centro activo o impide el plegamiento correcto."
    }
  },
  {
    "id": "ex-polyploidy-prob5",
    "number": "Caso Práctico 9",
    "topicId": "tema2",
    "topicName": "De la Mutación al Fenotipo",
    "title": "Individuos Poliploides en Cultivos: Obtención, Ventajas e Inconvenientes",
    "badge": "Poliploidía Agronómica",
    "xp": 70,
    "description": "Describe qué es un individuo poliploide e indica alguna forma de obtener individuos de este tipo. Pon ejemplos que conozcas de cultivos poliploides e indica las ventajas e inconvenientes que pueden tener los cultivos poliploides.",
    "interactiveEvaluation": {
      "question": "¿Por qué las sandías triploides (3n) carecen de semillas duras comerciales y cómo se obtienen en los centros de mejora?",
      "options": [
        "Porque carecen de polen debido a una deleción robertsoniana en el cromosoma 1.",
        "Son mutantes transgénicos creados con biobalística que no sintetizan endospermo.",
        "Se obtienen cruzando una planta tetraploide (4n, gametos 2n) con una diploide (2n, gametos 1n); al ser 3n, en la meiosis los cromosomas no pueden segregarse de forma equilibrada, originando aborto embrionario de las semillas.",
        "Se obtienen tratando semillas diploides con citoquininas en la fase de aclimatación."
      ],
      "correct": 2,
      "feedbackCorrect": "¡Totalmente correcto! El cruce de un tetraploide (4n) por un diploide (2n) genera progenie triploide (3n). Al tener tres juegos cromosómicos homólogos, es imposible formar parejas bivalentes regulares durante la profase I de la meiosis, generando gametos aneuploides inviables y abortando las semillas (apirenia).",
      "feedbackIncorrect": "Recuerda que la triploidía implica un número impar de juegos cromosómicos (3n). Las células no pueden repartir 3 juegos entre 2 células hijas en la meiosis sin causar desequilibrios cromosómicos letales."
    },
    "solution": {
      "definicion": "Un **individuo poliploide** es aquel organismo que posee **más de dos juegos cromosómicos completos** ($3n, 4n, 6n, 8n\\dots$) en el núcleo de sus células.\n- **Autopoliploides:** Los juegos cromosómicos proceden de la misma especie parental por duplicación del propio genoma.\n- **Alopoliploides:** Resultan de la hibridación entre dos especies distintas seguida de duplicación cromosómica.",
      "obtencion": "**Formas de obtención:**\n1. **Tratamiento químico con Colchicina:** Alcaloide mitostático que inhibe la polimerización de los microtúbulos del huso acromático durante la metafase, impidiendo la segregación de cromosomas anafásica y generando células tetraploides ($4n$).\n2. **Unión de gametos no reducidos ($2n$):** Por fallo en la meiosis I o II.\n3. **Fusión somática de protoplastos in vitro:** Hibridación celular inducida con PEG o electrofusión.",
      "ejemplos": "**Ejemplos en cultivos agrícolas:**\n- **Trigo harinero (*Triticum aestivum*):** Alopoliploide hexaploide ($6n = 42$).\n- **Patata cultivada (*Solanum tuberosum*):** Autotetraploide ($4n = 48$).\n- **Plátano comercial (*Musa acuminata*):** Triploide ($3n = 33$) estéril sin semillas.\n- **Sandía triploide (*Citrullus lanatus*):** Triploide ($3n$) obtenida cruzando $4n \\times 2n$, desprovista de semillas duras.",
      "ventajas": "**Ventajas:**\n- **Efecto 'Gigas' (Gigantismo celular):** Mayor tamaño celular que se traduce en hojas, flores, tubérculos y frutos más grandes.\n- **Mayor tolerancia ambiental:** Incremento del vigor híbrido y mayor plasticidad ante estrés biótico o abiótico.\n- **Apirenia (Frutos sin semillas):** En triploides ($3n$), la esterilidad meiótica genera frutos carnosos sin semillas duras muy valorados por el consumidor.",
      "inconvenientes": "**Inconvenientes:**\n- **Esterilidad meiótica en niveles impares ($3n, 5n$):** Los cromosomas no pueden formar parejas bivalentes regulares en profase I meiótica, provocando aneuploidías y abortos.\n- **Necesidad de reproducción vegetativa o clonal:** Obliga a mantener las variedades comerciales por propagación in vitro o repitiendo anualmente cruzamientos dirigidos parentales.\n- **Menor fertilidad o inestabilidad cromosómica inicial.**"
    }
  },
  {
    "id": "ex-chrom-rearr-prob6",
    "number": "Caso Práctico 10",
    "topicId": "tema2",
    "topicName": "De la Mutación al Fenotipo",
    "title": "Tipos de Reordenaciones Cromosómicas Estructurales",
    "badge": "Citogenética y Cariotipo",
    "xp": 70,
    "description": "Describe los tipos de reordenaciones cromosómicas que conozcas, por qué se originan y cómo afectan al individuo portador de las mismas.",
    "interactiveEvaluation": {
      "question": "¿Qué ocurre con un fragmento cromosómico acéntrico (que ha perdido el centrómero por deleción) durante la división celular?",
      "options": [
        "Forma un anillo plasmídico superenrollado viable.",
        "Se fusiona inmediatamente con el nucleosoma H1.",
        "Se duplica espontáneamente con colchicina.",
        "No puede asociarse a los microtúbulos del huso mitótico mediante el cinetocoro y se pierde irreversiblemente en el citoplasma durante la anafase."
      ],
      "correct": 3,
      "feedbackCorrect": "¡Exacto! El centrómero es la región donde se ensambla el complejo proteico del cinetocoro. Sin centrómero, los microtúbulos no pueden remolcar el fragmento hacia los polos durante la anafase, por lo que queda rezagado y se degrada en el citoplasma.",
      "feedbackIncorrect": "El centrómero es imprescindible para la segregación celular meiótica y mitótica. Cualquier segmento sin centrómero (acéntrico) no se segrega y se pierde."
    },
    "solution": {
      "tipos": "**Tipos de Reordenaciones Cromosómicas Estructurales:**\n1. **Deleción:** Pérdida física de un segmento cromosómico. Puede ser terminal (en el extremo) o intersticial (en el cuerpo del brazo).\n2. **Duplicación:** Ganancia de un segmento cromosómico repetido en tándem o invertido.\n3. **Inversión:** Rotura de un segmento que gira 180° y se reinserta invertido:\n   - **Paracéntrica:** No incluye el centrómero (ambos puntos de rotura en el mismo brazo).\n   - **Pericéntrica:** Incluye el centrómero (un punto de rotura en cada brazo).\n4. **Translocación:** Cambio de localización de un segmento cromosómico:\n   - **Recíproca:** Intercambio mutuo de segmentos entre dos cromosomas no homólogos.\n   - **Robertsoniana (Fusión céntrica):** Unión de dos cromosomas acrocéntricos por sus centrómeros con pérdida de los brazos cortos satélites.",
      "origen": "**¿Por qué se originan?**\n- Roturas de doble cadena del ADN (DSB) causadas por **radiaciones ionizantes** (rayos X, rayos gamma) o agentes químicos clastogénicos, seguidas de reparación incorrecta (unión de extremos no homólogos).\n- **Sobrecruzamiento meiótico desigual o ectópico** entre secuencias de ADN repetidas dispersas (transposones) situadas en cromosomas no homólogos o en distintas posiciones del mismo cromosoma.",
      "efecto": "**Efectos sobre el individuo portador:**\n- **Desequilibrio de dosis génica:** Las deleciones suelen ser deletéreas o letales en homocigosis; en heterocigosis provocan pseudodominancia (manifestación de alelos recesivos mutantes al perderse el alelo dominante silvestre).\n- **Subfertilidad o esterilidad meiótica:** En heterocigotos para inversiones o translocaciones se forman configuraciones meióticas complejas (lazos de inversión o cruces tetravalentes). La recombinación dentro del lazo genera gametos desequilibrados con deleciones/duplicaciones inviables, provocando abortos embrionarios y reduciendo la fertilidad a la mitad."
    }
  },
  {
    "id": "ex-rapd-plant-div-prob7",
    "number": "Caso Práctico 11",
    "topicId": "tema3",
    "topicName": "Marcadores y Diversidad",
    "title": "Marcadores RAPD en Poblaciones Vegetales y Selección de Parentales",
    "badge": "Mejora Genética Vegetal",
    "xp": 75,
    "description": "La siguiente imagen muestra los resultados de un análisis con marcadores RAPDs de 4 individuos (carriles 1, 2, 3, 4) de una población vegetal.\n\nA partir de estos resultados decide qué pareja de individuos utilizarías de parentales si quisieras **maximizar la diversidad genética** de la población resultante. ¿Y si quisieras **minimizarla**? Justifica la respuesta en todos los casos.",
    "interactiveEvaluation": {
      "question": "En un programa de mejora que persigue MAXIMIZAR la diversidad genética y heterocigosis de la descendencia mediante marcadores moleculares RAPD, ¿qué criterio de selección de parentales debe aplicarse?",
      "options": [
        "Seleccionar parentales con patrones de bandas idénticos en todas las calles para asegurar consanguinidad.",
        "Cruzar solo plantas tetraploides con plásmidos Ti.",
        "Elegir únicamente plantas que no muestren ninguna banda amplificada.",
        "Seleccionar la pareja de parentales que comparta el menor número de bandas (máxima distancia genética y divergencia alélica)."
      ],
      "correct": 3,
      "feedbackCorrect": "¡Correcto! Cuanto menor sea el número de bandas compartidas entre dos parentales (menor coeficiente de similitud de Dice o Jaccard), mayor es su distancia genética. Al cruzarlos, la progenie F1 presentará la máxima heterocigosis y segregará una gran diversidad de combinaciones genotípicas novedosas.",
      "feedbackIncorrect": "Para maximizar la diversidad se busca heterosis (vigor híbrido) cruzando genotipos lo más distintos posible, es decir, con el menor número de bandas RAPD comunes."
    },
    "solution": {
      "maximizar": "• **Para MAXIMIZAR la diversidad genética:**\nSe debe elegir la pareja de individuos parentales que presente la **menor cantidad de bandas compartidas** (es decir, la mayor distancia genética y menor coeficiente de similitud). Al cruzarse dos parentales genéticamente divergentes, la descendencia presentará la **máxima heterocigosis** posible y segregará una gran variedad de combinaciones genotípicas novedosas en las generaciones siguientes.",
      "minimizar": "• **Para MINIMIZAR la diversidad genética:**\nSe debe elegir la pareja que muestre el **patrón de bandas más similar o casi idéntico** (mayor proporción de bandas compartidas). Cruzar parentales muy emparentados reduce la segregación alélica, manteniendo la uniformidad agronómica de la población resultante (homogeneidad fenotípica deseada en producción comercial).",
      "justificacion": "Los marcadores RAPD son marcadores dominantes que revelan polimorfismos en todo el genoma. El grado de similitud entre dos individuos se cuantifica mediante coeficientes como el de Dice ($S_{xy} = 2N_{xy}/(N_x + N_y)$) o Jaccard. La pareja con menor $S_{xy}$ maximiza la diversidad y la pareja con mayor $S_{xy}$ la minimiza."
    }
  },
  {
    "id": "ex-rapd-rabbits-prob8",
    "number": "Caso Práctico 12",
    "topicId": "tema3",
    "topicName": "Marcadores y Diversidad",
    "title": "Marcadores RAPD en Población de Conejos, Matriz y Consanguinidad",
    "badge": "Genética de Poblaciones",
    "xp": 85,
    "primer": "5´ GGGCGTCT 3´",
    "description": "El siguiente gel de electroforesis muestra el patrón de fragmentos de ADN amplificados usando la metodología de amplificación de fragmentos al azar mediante PCR (RAPDs), utilizando el cebador `5´ GGGCGTCT 3´` en una población de conejos (individuos 1 a 10).\n\na) Ponga un ejemplo que represente por qué se amplifica el fragmento marcado con un círculo en el individuo 1 y por qué no se amplifica en el individuo 7.\nb) Transforme este gel en una matriz de 1 y 0 y calcule el coeficiente de similitud entre los individuos 1 y 7, y 1 y 8. ¿Si el individuo 1 fuera una hembra y tuviera que elegir entre el macho 7 y el macho 8 para obtener una generación con menor consanguinidad, qué cruzamiento elegiría? Explique por qué.",
    "interactiveEvaluation": {
      "question": "¿Por qué un fragmento determinado amplifica en el Individuo 1 pero NO amplifica en el Individuo 7 al usar un único cebador de RAPD?",
      "options": [
        "Porque en el Individuo 7 ha ocurrido una mutación puntual o deleción en una de las dianas de unión del cebador que impide el anillamiento y la polimerización.",
        "Porque el Individuo 7 no tiene polimerasa celular.",
        "Porque en el Individuo 7 el ADN migra hacia el cátodo negativo.",
        "Porque el cebador solo reconoce ADN de plantas y no de mamíferos."
      ],
      "correct": 0,
      "feedbackCorrect": "¡Muy bien! En RAPD, para que se produzca amplificación se requiere que existan dos sitios complementarios al cebador en orientaciones opuestas y a corta distancia. Una simple mutación de un solo nucleótido en el extremo 3' de la diana impide la hibridación del cebador, aboliendo por completo la amplificación de la banda.",
      "feedbackIncorrect": "En los marcadores moleculares basados en PCR, la presencia o ausencia de banda refleja la integridad de las secuencias diana reconocidas por los cebadores."
    },
    "solution": {
      "a": "**Causa de amplificación diferencial en RAPD:**\n- Para que se amplifique un fragmento de ADN en RAPD con un único cebador decanucleotídico, se requiere que existan **dos secuencias complementarias al cebador en orientaciones convergentes opuestas (en hebras contrarias) y a una distancia física que la Taq polimerasa pueda elongar** (< 2.000 pb).\n- En el **Individuo 1**, ambas dianas están intactas y orientadas correctamente, permitiendo que la ADN polimerasa copie el fragmento entre ellas.\n- En el **Individuo 7**, la banda NO amplifica debido a:\n  1. Una **mutación puntual (sustitución nucleotídica)** en una o ambas dianas del cebador (especialmente en el extremo 3' del cebador), que impide la hibridación.\n  2. Una **deleción** que elimina una de las dianas de unión.\n  3. Una **inserción voluminosa** entre ambas dianas que aleja excesivamente los sitios impidiendo la polimerización durante el tiempo de extensión de la PCR.",
      "b": "**Matriz binaria y Coeficiente de Similitud:**\n- Asignando 1 a la presencia de cada banda polimórfica y 0 a su ausencia, se computa la matriz para los individuos 1, 7 y 8.\n- Utilizando el **coeficiente de similitud de Dice / Nei-Li**:\n$$S_{xy} = \\frac{2 N_{xy}}{N_x + N_y}$$\ndonde $N_{xy}$ es el número de bandas compartidas por ambos individuos, y $N_x, N_y$ son el total de bandas presentes en cada uno.\n- El individuo 7 y el individuo 8 se comparan contra la hembra 1:\n  - Supongamos que la hembra 1 comparte menos bandas con el macho 7 que con el macho 8 ($S_{1,7} < S_{1,8}$).\n- **Elección de cruzamiento para menor consanguinidad:**\n  Se debe elegir el cruzamiento entre la **Hembra 1 y el Macho que tenga menor similitud genética** (mayor distancia genética). Cruzar individuos con la menor similitud alélica reduce al mínimo el coeficiente de consanguinidad de la camada descendiente, evitando la depresión por consanguinidad y maximizando el vigor híbrido."
    }
  },
  {
    "id": "ex-pcr-viral-diag-prob9",
    "number": "Caso Práctico 13",
    "topicId": "tema3",
    "topicName": "Marcadores y Diversidad",
    "title": "PCR y Electroforesis para el Diagnóstico de Infecciones Virales",
    "badge": "Diagnóstico Molecular",
    "xp": 75,
    "description": "Describa los pasos del método de amplificación de fragmentos de ADN mediante la reacción en cadena de la polimerasa (PCR) y su separación posterior mediante electroforesis.\nPonga un ejemplo de cómo lo utilizaría para diagnosticar la presencia de una infección viral en un organismo, representando los resultados del gel.",
    "interactiveEvaluation": {
      "question": "En un protocolo de diagnóstico viral por PCR, ¿cuál es el papel indispensable del control negativo (blanco sin ADN molde) en el gel de electroforesis?",
      "options": [
        "Servir como estándar de peso molecular para calibrar el tamaño del amplicón.",
        "Verificar que la enzima Taq polimerasa ha alcanzado los 95 °C.",
        "Confirmar que los reactivos y el agua de la reacción están libres de contaminación por ADN viral o amplicones previos.",
        "Teñir el gel de agarosa con azul de bromofenol."
      ],
      "correct": 2,
      "feedbackCorrect": "¡Exacto! El control negativo (blanco con todos los reactivos excepto ADN molde) debe resultar completamente limpio sin ninguna banda. Si apareciera una banda en el blanco, indicaría contaminación cruzada de los reactivos y todo el ensayo quedaría invalidado.",
      "feedbackIncorrect": "El control negativo contiene todos los componentes de la PCR menos el ADN molde. Su ausencia de banda descarta falsos positivos por contaminación accidental de laboratorio."
    },
    "solution": {
      "pasosPcr": "**Los 3 Pasos Cíclicos de la PCR:**\n1. **Desnaturalización térmica (94-95 °C$, 30-60 seg):** El calor rompe los puentes de hidrógeno separando las dos hebras del ADN molde.\n2. **Anillamiento o Hibridación de cebadores (50-65 °C$, 30-60 seg):** Dos oligonucleótidos sintéticos específicos (cebador *Forward* y *Reverse*) hibridan con las secuencias complementarias flanqueantes del gen diana viral en hebras opuestas.\n3. **Elongación o Extensión (72 °C$):** Temperatura óptima de la enzima termoestable **Taq ADN polimerasa**, que incorpora dNTPs en sentido $5'\\rightarrow 3'$ a partir del extremo 3'-OH de cada cebador.\n*Se repiten entre 30 y 35 ciclos, amplificando teóricamente hasta $2^n$ copias del fragmento viral.*\n\n**Electroforesis en Gel de Agarosa:**\nLa mezcla de amplificación se carga en pocillos de un gel de agarosa al 1,5-2% con tampón TAE/TBE y un agente intercalante fluorescente (Bromuro de Etidio o SYBR Safe). Al aplicar un campo eléctrico, los fragmentos con carga negativa neta migran hacia el polo positivo (ánodo), separándose según su longitud molecular.",
      "diagnosticoViral": "**Diseño Experimental del Diagnóstico Viral:**\nSe diseñan cebadores específicos para un gen esencial y altamente conservado de la cápside o polimerasa del virus diana (ej. amplicón diagnóstico esperado de **350 pb**).\n\n**Disposición de Carriles en el Gel:**\n- **Carril 1 (Ladder / Marcador de peso molecular):** Bandas patrón conocidas (100, 200, 300, 400, 500 pb...).\n- **Carril 2 (Control Negativo):** Reacción de PCR completa sin ADN molde (agua estéril). No debe mostrar ninguna banda (valida ausencia de contaminación de laboratorio).\n- **Carril 3 (Control Positivo):** ADN/cADN viral de referencia conocido. Debe mostrar nítidamente la banda diagnóstica de **350 pb**.\n- **Carril 4 (Muestra Paciente 1):** Muestra clínica del paciente sospechoso. Si aparece la banda de **350 pb**, el resultado es **POSITIVO (Infección Viral Confirmada)**.\n- **Carril 5 (Muestra Paciente 2):** No se observa banda de 350 pb, indicando resultado **NEGATIVO (Ausencia de Infección o carga viral por debajo del límite de detección)**."
    }
  }
];

if (typeof window !== 'undefined') {
  window.EXAM_PROBLEMS = EXAM_PROBLEMS;
}
