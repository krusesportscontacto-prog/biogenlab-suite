// ========================================================
// BIOGENLAB SUITE - BASE DE DATOS UNIFICADA DE QUIZ Y CÓDICE
// ========================================================

const BIOGENLAB_QUIZ_DATA = {
  "tema1": [
    {
      "id": 1,
      "sub": 1,
      "q": "¿Quién aisló por primera vez el ADN en 1871, de qué muestra biológica lo obtuvo y qué nombre le dio?",
      "options": [
        "Frederick Sanger en 1871 a partir de cromosomas de melón, llamándolo 'polinucleótido'.",
        "Erwin Chargaff en 1871 a partir de bacterias, llamándolo 'cromatina constitutiva'.",
        "Watson y Crick en 1871 a partir de eritrocitos, llamándolo 'octámero de histonas'.",
        "Friedrich Miescher en 1871 aisló del núcleo de las células de pus una sustancia ácida rica en fósforo a la que llamó 'nucleína' (de donde procede el nombre de ácido nucleico)."
      ],
      "correct": 3,
      "exp": "En 1871, Miescher aisló del núcleo de las células de pus una sustancia ácida rica en fósforo llamada 'nucleína', término del cual deriva 'ácido nucleico'."
    },
    {
      "id": 2,
      "sub": 1,
      "q": "En la estructura monomérica y polimérica de los ácidos nucleicos, ¿qué unen exactamente el enlace N-glucosídico y el enlace éster (fosfodiéster)?",
      "options": [
        "El enlace N-glucosídico une la base nitrogenada con la pentosa (azúcar), mientras que el enlace éster (fosfodiéster) une el grupo fosfato con el azúcar de nucleótidos consecutivos, formando el esqueleto o eje azúcar-fosfato.",
        "Ambos enlaces son puentes de hidrógeno débiles que se rompen a 37 °C.",
        "El enlace N-glucosídico une dos bases nitrogenadas entre sí y el enlace fosfodiéster une dos grupos fosfato.",
        "El enlace N-glucosídico une las histonas al ADN y el enlace fosfodiéster une los puentes de hidrógeno."
      ],
      "correct": 0,
      "exp": "El enlace N-glucosídico une la base nitrogenada con la pentosa; el enlace éster (fosfodiéster) une el grupo fosfato con el azúcar de nucleótidos consecutivos conformando el eje azúcar-fosfato."
    },
    {
      "id": 3,
      "sub": 1,
      "q": "¿Qué significa que el ADN es universal y en qué consisten la desnaturalización térmica y la hibridación?",
      "options": [
        "Que todos los seres vivos tienen exactamente la misma secuencia de genes; la desnaturalización rompe los enlaces fosfodiéster a 100 °C.",
        "Que su estructura y composición química son idénticas en todos los organismos vivos (pudiendo hibridarse con ADN de otra especie si hay complementariedad); el calor (~100 °C) rompe los puentes de hidrógeno separando las dos hebras (desnaturalización), y al enfriarse vuelven a unirse (hibridar = re-naturalizar).",
        "Que el ADN nunca puede abrirse ni siquiera durante la replicación por las ADN polimerasas.",
        "Que la hibridación consiste en sustituir todas las timinas por uracilos a 100 °C."
      ],
      "correct": 1,
      "exp": "La universalidad permite que hebras complementarias de distintas especies hibriden. El calor (~100 °C) desnaturaliza la doble hélice rompiendo los puentes de hidrógeno, y al enfriarse se re-naturalizan (hibridar = re-naturalizar)."
    },
    {
      "id": 4,
      "sub": 1,
      "q": "¿Qué establecen exactamente las Leyes de Erwin Chargaff para el ADN de doble hebra y qué ocurre al comparar distintas especies?",
      "options": [
        "Que A=T, G=C y la suma de bases púricas es igual a la de pirimidínicas (A+G = T+C); sin embargo, la proporción entre (A+T) y (G+C) es propia de cada especie (idéntica en todas las células de los individuos de una misma especie, pero varía al cambiar de especie).",
        "Que la cantidad de Adenina siempre es igual a la de Citosina en cualquier organismo.",
        "Que existen el triple de purinas que de pirimidinas en los eucariotas superiores.",
        "Que A=G y T=C, siendo la proporción (A+T)/(G+C) idéntica en todas las especies del planeta."
      ],
      "correct": 0,
      "exp": "Chargaff demostró que A=T, G=C y (A+G)=(T+C), mientras que la relación (A+T) vs (G+C) es constante dentro de una misma especie pero varía de una especie a otra."
    },
    {
      "id": 5,
      "sub": 1,
      "q": "Si en una muestra de ADN bicatenario de una especie el porcentaje de Citosina (C) es del 18%, ¿cuál será el porcentaje de Guanina (G), Adenina (A) y Timina (T)?",
      "options": [
        "G = 18%, A = 18%, T = 46%.",
        "G = 18%, A = 32%, T = 32%.",
        "G = 25%, A = 25%, T = 32%.",
        "G = 32%, A = 18%, T = 32%."
      ],
      "correct": 1,
      "exp": "Por Chargaff: si C = 18%, entonces G = 18% (sumando G+C = 36%). El 64% restante corresponde a (A+T), por lo que A = 32% y T = 32%."
    },
    {
      "id": 6,
      "sub": 1,
      "q": "Según el modelo de doble hélice de Watson y Crick, ¿cómo se disponen espacialmente los componentes y qué significa que las dos cadenas son antiparalelas?",
      "options": [
        "Las bases nitrogenadas quedan hacia el exterior y los fosfatos en el centro; ambas hebras corren en dirección 5'P → 3'OH en el mismo sentido.",
        "El extremo 5' siempre porta el grupo hidroxilo libre y el extremo 3' porta el grupo fosfato.",
        "Las bases nitrogenadas se dirigen hacia el centro perpendiculares al eje longitudinal y el esqueleto azúcar-fosfato va por los lados externos; son antiparalelas porque una hebra lleva la secuencia 5'P → 3'OH y la otra 3'OH → 5'P.",
        "Las hebras se unen por enlaces covalentes entre Adenina y Guanina."
      ],
      "correct": 2,
      "exp": "Las bases van hacia el interior perpendiculares al eje longitudinal y el eje azúcar-fosfato por fuera; el antiparalelismo implica que una hebra va 5'P → 3'OH y la otra 3'OH → 5'P."
    },
    {
      "id": 7,
      "sub": 1,
      "q": "¿Cuáles son las bases púricas y cuáles las pirimidínicas, y cuántos puentes de hidrógeno se forman en cada par complementario?",
      "options": [
        "Purinas (doble anillo): Adenina (A) y Guanina (G); Pirimidinas (un anillo): Citosina (C) y Timina (T). El par A-T se une mediante 2 puentes de hidrógeno y el par G-C mediante 3 puentes de hidrógeno.",
        "Tanto A-T como G-C se unen mediante 4 puentes de hidrógeno.",
        "Purinas: Citosina y Timina; Pirimidinas: Adenina y Guanina. A-T tiene 3 puentes y G-C tiene 2 puentes.",
        "La Timina es una purina de doble anillo que se une a la Citosina."
      ],
      "correct": 0,
      "exp": "Adenina y Guanina son purinas; Citosina y Timina son pirimidinas. El par A-T forma 2 puentes de hidrógeno y el par G-C forma 3 puentes de hidrógeno."
    },
    {
      "id": 8,
      "sub": 2,
      "q": "¿Cuál es el fundamento físico-químico por el que los fragmentos de ADN migran en una electroforesis en gel y hacia qué electrodo se desplazan?",
      "options": [
        "El ADN es eléctricamente neutro y se desplaza por gravedad desde el ánodo hacia el cátodo.",
        "Como el ADN posee carga eléctrica negativa neta (debido a los grupos fosfato de su esqueleto), al aplicar corriente en un tampón salino migra hacia el polo positivo (ánodo).",
        "El ADN tiene carga positiva debido a las histonas y migra hacia el polo negativo (cátodo).",
        "Solo migran los fragmentos que contienen uracilo hacia el polo negativo."
      ],
      "correct": 1,
      "exp": "Los grupos fosfato del esqueleto confieren al ADN una carga eléctrica negativa neta, por lo que migra hacia el polo positivo (ánodo)."
    },
    {
      "id": 9,
      "sub": 2,
      "q": "En una electroforesis en gel de agarosa o poliacrilamida, ¿cómo actúa el tamiz molecular sobre los fragmentos de distinto tamaño?",
      "options": [
        "Los fragmentos más pequeños se desplazan más rápido y avanzan más lejos; los fragmentos más grandes encuentran mayor resistencia y avanzan más lentamente, quedando más cerca del pocillo de origen.",
        "El tamiz destruye los fragmentos menores de 1.000 pb.",
        "Todos los fragmentos avanzan a la misma velocidad independientemente de su longitud en pares de bases.",
        "Los fragmentos más grandes avanzan más rápido y llegan al final del gel, mientras que los pequeños quedan retenidos en el pocillo."
      ],
      "correct": 0,
      "exp": "La matriz porosa del gel actúa como tamiz molecular: los fragmentos pequeños avanzan más rápido y más lejos; los grandes encuentran mayor resistencia y quedan cerca del pocillo."
    },
    {
      "id": 10,
      "sub": 2,
      "q": "¿Cómo se visualizan las bandas de ADN al finalizar la electroforesis y cómo se estima su tamaño exacto?",
      "options": [
        "A simple vista bajo luz blanca y pesando el gel en una balanza analítica.",
        "Añadiendo colchicina al gel para que las bandas se vuelvan azules al sol.",
        "Calentando el gel a 100 °C hasta que los fragmentos emitan radiación gamma.",
        "Tiñendo el gel con un colorante intercalante fluorescente (como bromuro de etidio o SYBR Safe) que permite visualizar las bandas bajo luz ultravioleta (UV), y comparándolas con un marcador de peso molecular o 'ladder' de referencia calibrado."
      ],
      "correct": 3,
      "exp": "Se tiñe con un agente intercalante fluorescente (bromuro de etidio o SYBR Safe) visible bajo luz UV, y se compara con un marcador de peso molecular ('ladder')."
    },
    {
      "id": 11,
      "sub": 2,
      "q": "¿Qué es el nucleosoma y qué proteínas lo conforman?",
      "options": [
        "Es una agrupación de ocho ribosomas en el citoplasma.",
        "Es un complejo de ARN polimerasa y cuatro lípidos nucleares.",
        "Es el primer nivel básico de empaquetamiento de la cromatina eucariota: consiste en un segmento de ADN enrollado alrededor de un 'carrete' u octámero formado por ocho moléculas de proteínas básicas llamadas histonas (asemejándose a 'cuentas en un collar').",
        "Es el conjunto de centrómeros y telómeros exclusivos de las bacterias."
      ],
      "correct": 2,
      "exp": "El nucleosoma es la unidad básica de empaquetamiento ('cuentas en un collar'): ADN enrollado alrededor de un octámero de 8 moléculas de histonas (proteínas básicas)."
    },
    {
      "id": 12,
      "sub": 2,
      "q": "Ordena de menor a mayor grado de compactación los niveles de empaquetamiento del ADN mostrados en el Subtema 2 (texto y Figura 1):",
      "options": [
        "Solenoide (2 nm) → Nucleosoma (300 nm) → Doble hélice (1400 nm).",
        "Doble hélice de ADN (2 nm) → Nucleosomas ('cuentas en un collar') → Espiral / Solenoide (30 nm) → Asas / Bucles (300 nm) → Espiral condensada (700 nm) → Cromosoma en metafase (1400 nm).",
        "Cromosoma (1400 nm) → Solenoide (30 nm) → Doble hélice (2 nm) → Asas (300 nm).",
        "Octámero (1400 nm) → Hebra simple (30 nm) → Cromátida (2 nm)."
      ],
      "correct": 1,
      "exp": "La escala de condensación va desde la doble hélice de 2 nm → nucleosomas → fibra/solenoide de 30 nm → asas de 300 nm → 700 nm → cromosoma metafásico de 1400 nm."
    },
    {
      "id": 13,
      "sub": 2,
      "q": "¿Qué diferencia funcional y estructural existe entre la Eucromatina y la Heterocromatina?",
      "options": [
        "La eucromatina es la forma menos condensada, desespiralizada y relajada, siendo transcripcionalmente activa (accesible para sintetizar ARNm); la heterocromatina es la forma más condensada, compacta y transcripcionalmente inactiva o silenciada.",
        "La eucromatina carece de histonas y solo existe en procariotas.",
        "Ambas tienen exactamente el mismo nivel de condensación y transcripción.",
        "La eucromatina está altamente condensada e inactiva; la heterocromatina está relajada y se transcribe activamente."
      ],
      "correct": 0,
      "exp": "La eucromatina está relajada y es transcripcionalmente activa; la heterocromatina está altamente condensada y es transcripcionalmente inactiva o silenciada."
    },
    {
      "id": 14,
      "sub": 2,
      "q": "Distingue con rigor entre Heterocromatina Constitutiva y Heterocromatina Facultativa e indica sus ejemplos clásicos:",
      "options": [
        "La constitutiva forma el corpúsculo de Barr y la facultativa forma los telómeros en todas las células.",
        "Ambas se transcriben masivamente durante la metafase mitótica.",
        "La facultativa nunca puede revertir su estado y solo aparece en gametos masculinos.",
        "La Constitutiva se mantiene siempre compacta y silenciada en todos los tipos celulares (ej. regiones pericentroméricas, centrómeros y telómeros); la Facultativa puede alternar reversiblemente entre estado compacto o relajado según la estirpe celular o desarrollo (ej. inactivación de un cromosoma X en hembras de mamíferos formando el corpúsculo de Barr)."
      ],
      "correct": 3,
      "exp": "Constitutiva: siempre silenciada en todas las células (centrómeros, telómeros, regiones pericentroméricas). Facultativa: reversible según estirpe o desarrollo (ej. corpúsculo de Barr por inactivación de un cromosoma X en hembras de mamíferos)."
    },
    {
      "id": 15,
      "sub": 3,
      "q": "¿Qué hito histórico destacó Frederick Sanger en la década de 1970 y qué diferencia química exacta existe entre un dNTP normal y un ddNTP terminador?",
      "options": [
        "Sanger descubrió la nucleína; los ddNTPs tienen dos grupos fosfato extra en el carbono 5'.",
        "Sanger publicó la base para todos los métodos de secuenciación que se desarrollaron después. Los dNTPs normales tienen un grupo hidroxilo (-OH) en el carbono 3', mientras que los ddNTPs (didesoxinucleótidos) carecen del grupo -OH en el carbono 3' (poseen solo un H), actuando como terminadores de cadena o nucleótidos 'fallidos'.",
        "Los dNTPs normales detienen la síntesis y los ddNTPs permiten elongar la cadena indefinidamente.",
        "Los ddNTPs carecen de base nitrogenada y por eso aceleran a la ADN polimerasa."
      ],
      "correct": 1,
      "exp": "Dato clave de examen: Sanger publicó la base para todos los métodos posteriores. Los ddNTPs carecen del 3'-OH libre (solo tienen un H en 3'), impidiendo que la ADN polimerasa continúe la elongación."
    },
    {
      "id": 16,
      "sub": 3,
      "q": "¿A cuántos nucleótidos equivalen 1 kilobase (1 kb) y 1 megabase (1 Mb), y por qué se aplica una cobertura de al menos 10x al secuenciar?",
      "options": [
        "1 kb = 1.000.000 nt; la cobertura 10x solo se utiliza para degradar intrones.",
        "1 kb = 100 nt y 1 Mb = 10.000 nt; se secuencia 10 veces porque el gel solo tiene 10 pocillos.",
        "1 kb = 1.000 nucleótidos (o pb) y 1 Mb = 1.000 kb = 1.000.000 nucleótidos. Se secuencia cada fragmento al menos 10 veces (cobertura 10x, usando 10 copias físicas del cromosoma fragmentadas en piezas de ~1 kb) porque la ADN polimerasa puede cometer errores y la redundancia mejora la precisión de consenso.",
        "No es necesario fragmentar cromosomas grandes en el método clásico de Sanger."
      ],
      "correct": 2,
      "exp": "1 kb = 1.000 nt; 1 Mb = 1.000 kb = 1.000.000 nt. La cobertura 10x (10 copias físicas del cromosoma fragmentadas a ~1 kb) corrige los errores de síntesis de la ADN polimerasa."
    },
    {
      "id": 17,
      "sub": 3,
      "q": "En el ejemplo práctico de secuenciación de un fragmento de 1 kb del cromosoma del melón, ¿qué reglas rigen el diseño y unión del primer (cebador)?",
      "options": [
        "El primer es un didesoxinucleótido que carece de extremo 3'-OH libre.",
        "Tras desnaturalizar con calor (100 °C), el primer se hibrida en el extremo 3' de la hebra molde; siempre se describe en dirección 5'→3', debe diseñarse con la secuencia complementaria e invertida respecto a la hebra a secuenciar, y es imprescindible conocer de antemano el extremo inicial del fragmento para encargar su síntesis.",
        "La ADN polimerasa inicia la síntesis sin necesidad de primer ni de extremo 3'-OH.",
        "El primer se une al extremo 5' de la hebra molde, se escribe en dirección 3'→5' y no requiere conocer ninguna secuencia previa."
      ],
      "correct": 1,
      "exp": "El primer se hibrida en el extremo 3' del molde, aporta el 3'-OH libre para la ADN polimerasa, se diseña complementario e invertido conociendo de antemano el extremo inicial, y siempre se escribe en dirección 5'→3'."
    },
    {
      "id": 18,
      "sub": 3,
      "q": "Si el extremo 3' conocido de la hebra molde del cromosoma del melón es 3'- ATGCCG -5', ¿cuál será la secuencia del primer escrita correctamente según la regla de nomenclatura universal?",
      "options": [
        "5'- ATGCCG -3'",
        "5'- CGGCAT -3'",
        "5'- TACGGC -3'",
        "3'- TACGGC -5'"
      ],
      "correct": 2,
      "exp": "Si la hebra molde en su extremo 3' es 3'-ATGCCG-5', la hebra complementaria que se aparea antiparalelamente en dirección 5'→3' es 5'-TACGGC-3'."
    },
    {
      "id": 19,
      "sub": 3,
      "q": "¿Cómo se leen las bandas de los 4 carriles (ddATP, ddTTP, ddCTP, ddGTP) en el gel de electroforesis de Sanger y cómo se calcula la longitud de cada fragmento?",
      "options": [
        "Se leen desde arriba (cerca del pocillo) hacia abajo; la longitud no incluye al primer.",
        "Como los fragmentos más cortos avanzan más rápido hacia el polo positivo (+), se lee desde la parte inferior (más rápida/corta) hacia la superior (más lenta/larga) para deducir la secuencia sintetizada (5'→3'). Para saber el número de nucleótidos de un fragmento se suman los nucleótidos del primer más los añadidos hasta el terminador ddNTP.",
        "Los fragmentos más largos migran al fondo del gel porque tienen más probabilidad de incorporar ddNTPs.",
        "Se leen de izquierda a derecha sin importar la altura de las bandas."
      ],
      "correct": 1,
      "exp": "Se lee de abajo (más corto/rápido) hacia arriba (más largo/lento). El tamaño total de cada fragmento es: nucleótidos del primer + nucleótidos añadidos hasta el ddNTP terminador."
    },
    {
      "id": 20,
      "sub": 3,
      "q": "En los secuenciadores automáticos modernos por electroforesis capilar, ¿con qué color de fluorocromo se marca cada uno de los cuatro ddNTPs?",
      "options": [
        "Guanina (G): verde; Timina (T): amarillo; Citosina (C): rojo; Adenina (A): azul (permitiendo realizar la reacción en un único tubo y leer el cromatograma con láser en una sola carrera).",
        "Guanina: azul, Timina: rojo, Citosina: verde, Adenina: amarillo.",
        "Todos los ddNTPs se marcan con bromuro de etidio de color naranja.",
        "Guanina: negro, Timina: violeta, Citosina: blanco, Adenina: gris."
      ],
      "correct": 0,
      "exp": "Colores estándar del cromatograma en electroforesis capilar: Guanina (G) = verde, Timina (T) = amarillo, Citosina (C) = rojo, Adenina (A) = azul."
    },
    {
      "id": 21,
      "sub": 3,
      "q": "¿Qué demuestra la comparación entre las especies gemelas de ciervos Muntiacus muntjak y Muntiacus reevesi respecto a la paradoja del valor C?",
      "options": [
        "Que el tamaño del genoma depende exclusivamente del número de exones.",
        "Que Muntiacus muntjak es un organismo procariota haploide.",
        "Que no existe relación entre el número de cromosomas (2n) y la complejidad evolutiva ni la cantidad total de ADN: son especies gemelas morfológicamente casi idénticas, pero Muntiacus muntjak tiene 2n = 6 (hembras) / 7 (machos) y Muntiacus reevesi tiene 2n = 46.",
        "Que a mayor número de cromosomas, el ciervo tiene el triple de tamaño corporal y diez veces más genes."
      ],
      "correct": 2,
      "exp": "Los ciervos gemelos Muntiacus muntjak (2n = 6 en hembras / 7 en machos) y Muntiacus reevesi (2n = 46) son morfológicamente casi idénticos, ilustrando que el número cromosómico y el tamaño genómico no determinan la complejidad evolutiva."
    },
    {
      "id": 22,
      "sub": 3,
      "q": "Según el esquema de distribución del Genoma Humano (3.200 Mb totales) del Subtema 3, ¿qué proporción corresponde a exones codificantes, secuencias relacionadas y ADN intergénico?",
      "options": [
        "1.600 Mb son exones y 1.600 Mb son microsatélites.",
        "Los exones ocupan 1.400 Mb y los elementos LINE solo 48 Mb.",
        "De los 3.200 Mb totales: 1.200 Mb son 'Genes y secuencias relacionadas' (de los cuales solo 48 Mb son Exones y 1.152 Mb son secuencias relacionadas: seudogenes, fragmentos de genes, intrones/RNT) y 2.000 Mb son 'DNA intergénico' (1.400 Mb de repeticiones como LINE 640 Mb, SINE 420 Mb, LTR 250 Mb, Transposones 90 Mb; y 600 Mb de otras regiones como Microsatélites 90 Mb y Diversos 510 Mb).",
        "3.000 Mb son exones codificantes y solo 200 Mb son ADN intergénico."
      ],
      "correct": 2,
      "exp": "Cifras exactas del esquema: Genoma humano = 3.200 Mb -> Genes y secuencias relacionadas (1.200 Mb: Exones 48 Mb + Relacionadas 1.152 Mb) + DNA intergénico (2.000 Mb: Repeticiones 1.400 Mb [LINE 640, SINE 420, LTR 250, Transposones DNA 90] + Otras 600 Mb [Microsatélites 90, Diversos 510])."
    },
    {
      "id": 23,
      "sub": 4,
      "q": "¿Qué es el ADN intergénico y qué importancia tiene dentro del genoma?",
      "options": [
        "Es ADN contaminante que entra en la célula durante la electroforesis.",
        "Es el conjunto de promotores que se traducen en el ribosoma.",
        "Es la fracción de exones que codifica enzimas metabólicas en bacterias.",
        "Es la gran parte del genoma constituida por fragmentos que no se transcriben ni se traducen; aunque no codifican proteínas, tienen relevancia estructural, organizativa y evolutiva, siendo muchos de ellos restos acumulados a lo largo de millones de años de evolución."
      ],
      "correct": 3,
      "exp": "El ADN intergénico no se transcribe ni se traduce, pero posee relevancia estructural, organizativa y evolutiva."
    },
    {
      "id": 24,
      "sub": 4,
      "q": "¿Qué son los transposones (elementos transponibles) y qué efecto pueden causar en el genoma?",
      "options": [
        "Son fragmentos de ADN no traducibles que conservan la capacidad de moverse ('saltar') de una región a otra del genoma, pudiendo provocar reordenaciones o mutaciones al insertarse.",
        "Son genes que viajan de los ribosomas al exterior celular.",
        "Son proteínas histónicas que empaquetan el corpúsculo de Barr.",
        "Son didesoxinucleótidos marcados con fluorocromos verdes."
      ],
      "correct": 0,
      "exp": "Los transposones son fragmentos de ADN no traducibles capaces de moverse ('saltar') por el genoma, causando reordenaciones o mutaciones al insertarse."
    },
    {
      "id": 25,
      "sub": 4,
      "q": "¿Qué son los seudogenes ('falsos genes') y por qué participan activamente en la evolución a pesar de no expresarse?",
      "options": [
        "Son secuencias nucleotídicas muy similares a genes funcionales que, por acumulación de mutaciones deletéreas, han perdido su capacidad de expresión; sin embargo, participan activamente en la evolución porque actúan como reservorio génico y pueden originar nuevas variantes funcionales por recombinación.",
        "Son intrones que se traducen en el citoplasma de las bacterias.",
        "Son cromosomas enteros inactivados que nunca sufren recombinación.",
        "Son moléculas de ARN de transferencia sin anticodón."
      ],
      "correct": 0,
      "exp": "Los seudogenes perdieron su expresión por mutaciones deletéreas, pero actúan como reservorio génico evolutivo capaz de originar nuevas variantes funcionales mediante recombinación."
    },
    {
      "id": 26,
      "sub": 4,
      "q": "¿Por qué se considera que una especie con un mayor repertorio génico posee mayor potencial y plasticidad para evolucionar?",
      "options": [
        "Porque carece de ADN intergénico y de intrones.",
        "Porque impide por completo cualquier mutación o recombinación en su genoma.",
        "Porque aumenta la probabilidad estadística de que ocurran mutaciones útiles ante nuevas presiones ambientales.",
        "Porque sus células se dividen sin necesidad de ADN polimerasa."
      ],
      "correct": 2,
      "exp": "Un mayor repertorio génico incrementa la probabilidad estadística de que surjan mutaciones útiles frente a nuevas presiones ambientales."
    },
    {
      "id": 27,
      "sub": 4,
      "q": "¿Qué tres elementos integran la estructura fragmentada o en mosaico de los genes en eucariotas según el Subtema 4?",
      "options": [
        "dNTPs, ddNTPs y primers.",
        "Octámeros, solenoides y corpúsculos de Barr.",
        "LINE, SINE y microsatélites.",
        "Exones (regiones codificantes que permanecen en el ARNm maduro y se traducen), Intrones (secuencias no codificantes intercaladas que se transcriben en el pre-ARNm pero se eliminan en el splicing) y Secuencias reguladoras flanqueantes (promotores, enhancers, terminadores) que controlan cuándo, dónde y con qué intensidad se expresa cada gen."
      ],
      "correct": 3,
      "exp": "Los genes eucariotas en mosaico constan de exones codificantes, intrones no codificantes (eliminados en el splicing) y secuencias reguladoras flanqueantes (promotores, enhancers, terminadores)."
    },
    {
      "id": 28,
      "sub": 4,
      "q": "Según la conclusión final del Subtema 4 (que compara vacas, maíz, ratón y medusa), ¿qué es lo que realmente explica las diferencias entre organismos tan distintos si comparten muchos de los mismos genes?",
      "options": [
        "La temperatura a la que se desnaturaliza el ADN en cada tejido.",
        "El exquisito control por el genoma de la actividad de cada gen (regulación génica espacio-temporal) y no los genes per se.",
        "El número total de enlaces N-glucosídicos por nucleótido.",
        "Que el ratón utiliza ADN y la medusa utiliza exclusivamente proteínas como material hereditario."
      ],
      "correct": 1,
      "exp": "'Los mismos genes se han manifestado en organismos tan diferentes como ratón y medusa... es el exquisito control por el genoma de la actividad de cada gen y no los genes per se lo que más importa.'"
    }
  ],
  "tema2": [
    {
      "id": 1,
      "sub": 1,
      "q": "¿Cómo se define rigurosamente un gen y cuál es la causa de que células con idéntico repertorio génico presenten distintos fenotipos en un organismo pluricelular?",
      "options": [
        "Un gen es cualquier secuencia de ARN mensajero; la diferenciación celular ocurre porque cada tejido elimina físicamente los genes que no necesita durante la mitosis.",
        "Un gen es una proteína reguladora; la diferenciación celular depende exclusivamente de mutaciones somáticas programadas en cada órgano.",
        "Un gen es un fragmento de ADN que da lugar a un producto funcional; los distintos tipos celulares se deben a la expresión génica diferencial (no todos los genes están activos en todas las células ni en todo momento).",
        "Un gen es el conjunto de promotores de un cromosoma; los distintos fenotipos se deben a que las células somáticas tienen genomas que difieren en más de un 50%."
      ],
      "correct": 2,
      "exp": "Según el Subtema 1, un gen es un fragmento de ADN que da lugar a un producto funcional, y la diferenciación celular se explica por la expresión génica diferencial."
    },
    {
      "id": 2,
      "sub": 1,
      "q": "Durante el proceso de transcripción llevado a cabo por la ARN polimerasa (transcriptasa), ¿qué papel cumple el promotor y en qué dirección se sintetiza el ARN?",
      "options": [
        "El promotor traduce directamente la proteína en el núcleo y la síntesis de ARN es bidireccional usando desoxirribonucleótidos.",
        "El promotor NO se transcribe, pero es indispensable para que la ARN polimerasa se una con precisión al ADN; el ARN monocatenario se sintetiza en dirección 5'→3' usando como molde la cadena inferior (3'→5').",
        "El promotor se transcribe íntegramente para formar el primer exón y la síntesis ocurre en dirección 3'→5' usando la hebra superior 5'→3'.",
        "El promotor es escindido por los ribosomas y la ARN polimerasa copia ambas hebras del ADN simultáneamente."
      ],
      "correct": 1,
      "exp": "El promotor NO se transcribe, pero es esencial para la unión precisa de la ARN polimerasa, que sintetiza ARN monocatenario 5'→3' leyendo la hebra molde inferior 3'→5' e incorporando ribonucleótidos trifosfato."
    },
    {
      "id": 3,
      "sub": 1,
      "q": "En el control de calidad durante la traducción del ARNm en el citoplasma, ¿qué sucede exactamente si el ribosoma NO reconoce el extremo 3' del mensajero?",
      "options": [
        "El ribosoma traduce el ARNm en sentido inverso desde el último exón hacia la región 5' UTR.",
        "El ribosoma interpreta que la molécula de ARNm está rota o degradada y aborta la traducción.",
        "El ribosoma sintetiza él mismo una nueva cola poli-A para reparar el extremo 3' antes de iniciar.",
        "El ribosoma continúa traduciendo indefinidamente hasta agotar los ARN de transferencia del citoplasma."
      ],
      "correct": 1,
      "exp": "Control de calidad ribosómico: si no reconoce el extremo 5' no puede iniciar la traducción; si no reconoce el extremo 3' interpreta que el ARNm está roto o degradado y aborta la traducción."
    },
    {
      "id": 4,
      "sub": 1,
      "q": "¿Por qué se afirma que el código genético es degenerado y qué implicación tiene esto frente a las mutaciones?",
      "options": [
        "Porque existen 20 combinaciones de tripletes para 64 aminoácidos, haciendo que cualquier cambio nucleotídico trunque la proteína.",
        "Porque los codones se degradan rápidamente en el núcleo, impidiendo que las mutaciones pasen al citoplasma.",
        "Porque un mismo codón puede codificar simultáneamente cinco aminoácidos distintos en la misma célula.",
        "Porque existen 64 combinaciones posibles de tripletes para codificar 20 aminoácidos (varios codones distintos codifican el mismo aminoácido), lo que explica la existencia de mutaciones silenciosas."
      ],
      "correct": 3,
      "exp": "Hay 64 combinaciones de tripletes para 20 aminoácidos; dado que varios codones codifican el mismo aminoácido, el código es degenerado, explicando las mutaciones silenciosas."
    },
    {
      "id": 5,
      "sub": 1,
      "q": "¿Cómo actúan los silenciadores (silencers) y los potenciadores (enhancers) sobre la expresión de un gen?",
      "options": [
        "Los silenciadores degradan intrones en el citoplasma y los potenciadores unen aminoácidos en el ribosoma.",
        "Los potenciadores bloquean la ARN polimerasa y los silenciadores estimulan el inicio de la traducción en la 3' UTR.",
        "Los silenciadores disminuyen o bloquean la expresión al unirse a factores de represión y los potenciadores aumentan sensiblemente la tasa de transcripción; ambos pueden actuar a gran distancia del promotor mediante el plegamiento tridimensional de la cromatina.",
        "Ambos deben situarse obligatoriamente dentro del primer intrón y se traducen como parte de la proteína madura."
      ],
      "correct": 2,
      "exp": "Silencers y enhancers regulan la tasa de transcripción y pueden localizarse a gran distancia del promotor actuando mediante el plegamiento tridimensional de la cromatina."
    },
    {
      "id": 6,
      "sub": 1,
      "q": "¿Qué demuestra la secuenciación transcriptómica al comparar las células de la raíz y las células del fruto del tomate?",
      "options": [
        "Que aunque el ADN de las células de la raíz y del fruto es idéntico en un 99%, sus transcriptomas son completamente dispares porque cada órgano expresa patrones específicos de genes adaptados a su función fisiológica.",
        "Que tanto el genoma como el transcriptoma son 100% idénticos en la raíz, el tallo, la hoja y el fruto en cualquier instante.",
        "Que el genoma (ADN) de la raíz y del fruto solo comparte un 10% de similitud genética.",
        "Que las células de la raíz carecen de ARN mensajero y solo transcriben intrones."
      ],
      "correct": 0,
      "exp": "El ADN de raíz y fruto de tomate es idéntico en un 99%, pero sus transcriptomas (todos los transcritos de ARN en un instante concreto) son completamente dispares."
    },
    {
      "id": 7,
      "sub": 2,
      "q": "En la estructura de un gen eucariota, ¿cuál es la diferencia funcional y de localización entre las regiones 5' UTR y 3' UTR?",
      "options": [
        "La 5' UTR se sitúa detrás del terminador y la 3' UTR precede al promotor y a la caja TATA.",
        "Ambas se transcriben a ARN pero NO se traducen: la 5' UTR (antes del codón ATG) regula el acoplamiento y reconocimiento del ribosoma, y la 3' UTR (tras el codón de parada y antes del terminador) contiene señales que determinan la estabilidad, vida media y localización subcelular del transcrito.",
        "La 5' UTR y la 3' UTR son escindidas y degradadas en el núcleo junto con los intrones durante el splicing.",
        "Ambas regiones se traducen a proteína pero no se transcriben a ARN."
      ],
      "correct": 1,
      "exp": "Las regiones UTR se transcriben pero NO se traducen. La 5' UTR regula el acoplamiento del ribosoma y la 3' UTR determina la estabilidad, vida media y localización subcelular del ARNm."
    },
    {
      "id": 8,
      "sub": 2,
      "q": "¿Qué ocurre con los exones, los intrones y el terminador durante la transcripción y el procesamiento nuclear (splicing)?",
      "options": [
        "Los exones son regiones no codificantes situadas antes del promotor y los intrones codifican los dominios catalíticos.",
        "El terminador se transcribe y traduce; los intrones viajan al citoplasma y los exones se degradan en el núcleo.",
        "Tanto intrones como exones se exportan al citoplasma y es el ribosoma quien corta los intrones.",
        "El terminador marca el final físico y no se transcribe; los intrones se transcriben a pre-ARNm pero son escindidos enzimáticamente y degradados en el núcleo (nunca viajan al citoplasma); los exones (entre ATG y TGA) se ligan covalentemente y se traducen."
      ],
      "correct": 3,
      "exp": "Los intrones se escinden y degradan en el núcleo (nunca salen al citoplasma), los exones se ligan covalentemente para formar el ARNm maduro, y el terminador no se transcribe."
    },
    {
      "id": 9,
      "sub": 2,
      "q": "¿En qué organismos se cumple estrictamente el antiguo dogma de 'un gen = una proteína' y qué mecanismo lo modificó de raíz en eucariotas superiores?",
      "options": [
        "Solo se cumple en mamíferos; fue modificado por la duplicación cromosómica con colchicina.",
        "Solo se cumple estrictamente en organismos biológicamente simples como bacterias o determinados virus; en eucariotas superiores existe el splicing alternativo, que combina distintos conjuntos de exones para generar múltiples variantes de ARNm e isoformas de proteínas.",
        "Se cumple en todos los eucariotas salvo cuando sufren epimutaciones por metilación de histonas.",
        "Se cumple en plantas poliploides como el maíz y el trigo, pero no en bacterias."
      ],
      "correct": 1,
      "exp": "El antiguo dogma 'un gen = una proteína' solo se cumple estrictamente en organismos simples como bacterias o determinados virus; en eucariotas superiores el splicing alternativo genera múltiples isoformas proteicas de un solo gen."
    },
    {
      "id": 10,
      "sub": 2,
      "q": "Según la regla de complejidad biológica explicada en el Subtema 2 (comparando la especie humana con el maíz), ¿qué determina realmente la complejidad estructural y funcional de un organismo?",
      "options": [
        "La cantidad de uracilo presente en las hebras de su ADN nuclear.",
        "Exclusivamente el tamaño total en pares de bases de su genoma haploide.",
        "El número, variedad y organización modular de sus exones y eventos de procesamiento alternativo (splicing alternativo), y no el tamaño total de su genoma.",
        "La longitud en nucleótidos de sus regiones promotoras y terminadoras."
      ],
      "correct": 2,
      "exp": "La complejidad biológica no está determinada por el tamaño total del genoma, sino por el número, variedad y organización modular de sus exones y eventos de splicing alternativo (el humano tiene más variantes de splicing que el maíz pese a tener tamaños genómicos globales no muy dispares)."
    },
    {
      "id": 11,
      "sub": 2,
      "q": "¿Por qué es tan importante proteger el extremo 3' del ARN mensajero y cuáles son las TRES funciones vitales de la cola poli-A?",
      "options": [
        "Porque el extremo 3' se une al centrómero; la cola poli-A está formada por residuos de guanina que impiden el splicing.",
        "Porque el extremo 3' contiene el codón de inicio ATG; la cola poli-A: 1) transcribe intrones, 2) metila histonas, y 3) bloquea a los ribosomas.",
        "Porque el extremo 3' es el más susceptible al ataque por ribonucleasas; la cola poli-A: 1) protege frente a exonucleasas citoplasmáticas, 2) facilita la exportación activa del núcleo al citoplasma, y 3) favorece el inicio eficiente de la traducción ribosómica.",
        "Porque sin cola poli-A el ADN se desamina a uracilo dentro de la mitocondria."
      ],
      "correct": 2,
      "exp": "El extremo 3' es el punto más susceptible al ataque enzimático por ribonucleasas; la cola poli-A (residuos de adenina) protege frente a exonucleasas citoplasmáticas, facilita la exportación nuclear y favorece el inicio eficiente de la traducción."
    },
    {
      "id": 12,
      "sub": 2,
      "q": "Observando el esquema del gen eucariota (Figura 1 del Subtema 2), ¿qué modificación se observa en el extremo 5' del transcrito primario y del ARNm maduro además de la cola 3' poli-A?",
      "options": [
        "La presencia de la caperuza 5' (5' cap) precediendo a la región 5' UTR.",
        "Una secuencia terminadora traducida en el citoplasma.",
        "La caja TATA exportada junto con los intrones al citoplasma.",
        "Un centrómero acéntrico unido al promotor."
      ],
      "correct": 0,
      "exp": "En la Figura 1 del Subtema 2 se muestra cómo el transcrito inicial en el núcleo y el ARNm final en el citoplasma portan el '5' cap' en el extremo 5' y la '3' Poly-A tail (AAAAA)' en el extremo 3'."
    },
    {
      "id": 13,
      "sub": 3,
      "q": "En genética de poblaciones y evolución, ¿cuál es la diferencia entre el papel de la mutación y el de la recombinación meiótica?",
      "options": [
        "La mutación solo ocurre durante la profase I de la meiosis y la recombinación solo en células somáticas.",
        "La recombinación meiótica es la fuente primaria de nuevos alelos y la mutación es un proceso secundario que solo ocurre en bacterias.",
        "Ambas reducen la variabilidad genética hasta fijar un único fenotipo idéntico.",
        "La mutación constituye la fuente primaria e indispensable de variabilidad genética, mientras que la recombinación meiótica actúa como fuente secundaria al barajar y generar nuevas combinaciones alélicas a partir de las variantes previamente generadas por mutación."
      ],
      "correct": 3,
      "exp": "La mutación es la fuente primaria e indispensable de variabilidad genética; la recombinación meiótica es la fuente secundaria que baraja las variantes previamente creadas por mutación."
    },
    {
      "id": 14,
      "sub": 3,
      "q": "¿Puede una mutación situada fuera de los exones (por ejemplo, en promotores, regiones UTR o intrones) causar una alteración patológica del fenotipo?",
      "options": [
        "No, cualquier mutación fuera de los exones es 100% inocua porque esas regiones nunca cumplen funciones reguladoras.",
        "Sí, porque puede alterar la afinidad de unión de factores de transcripción, alterar el procesamiento del ARN o inhibir por completo la transcripción, desencadenando una alteración patológica del fenotipo.",
        "No, porque la ADN polimerasa nunca replica los promotores ni los intrones.",
        "Solo si transforma directamente un intrón en un centrómero tetraploide."
      ],
      "correct": 1,
      "exp": "Cualquier mutación en regiones no codificantes reguladoras (promotores, regiones UTR o intrones) puede alterar la unión de factores de transcripción, el procesamiento del ARN o inhibir la transcripción."
    },
    {
      "id": 15,
      "sub": 3,
      "q": "Relaciona correctamente los ejemplos y efectos de las mutaciones puntuales en exones descritos en el Subtema 3:",
      "options": [
        "Todas las mutaciones missense introducen un codón de parada UAG al final del intrón 2.",
        "AGG → CGG es una mutación sin sentido que trunca la proteína; CAG → UAG es una mutación silenciosa que mantiene la Arginina.",
        "AGG → CGG es una mutación silenciosa (ambos codifican Arginina, sin alterar la proteína); la missense cambia la naturaleza química del aminoácido alterando la conformación; y CAG (Glutamina) → UAG (STOP) es una mutación sin sentido (nonsense) que introduce un codón de parada prematuro.",
        "Las mutaciones silenciosas eliminan por completo la síntesis de ARNm cuando ocurren cerca del codón de inicio."
      ],
      "correct": 2,
      "exp": "En el Subtema 3 se ejemplifica la mutación silenciosa con AGG → CGG (Arginina) y la mutación sin sentido (nonsense) con CAG (Glutamina) → UAG (STOP)."
    },
    {
      "id": 16,
      "sub": 3,
      "q": "En una mutación sin sentido (nonsense), ¿qué diferencia existe según el codón de parada prematuro aparezca muy próximo al inicio de la pauta de lectura o en posiciones intermedias/avanzadas?",
      "options": [
        "Si aparece cerca del inicio se convierte automáticamente en una mutación silenciosa.",
        "En ambos casos la proteína mantiene el 100% de su actividad biológica gracias a la cola poli-A.",
        "Si aparece muy próximo al inicio de la pauta de lectura, la síntesis se bloquea y la proteína ni siquiera llega a producirse; si aparece en posiciones intermedias o avanzadas, se produce una proteína truncada más corta e incompleta, generalmente sin funcionalidad biológica.",
        "Si aparece al inicio se produce una proteína el doble de grande; si aparece al final se duplica el cromosoma."
      ],
      "correct": 2,
      "exp": "Próxima al inicio: bloquea la síntesis y la proteína no llega a producirse. Intermedia/avanzada: origina una proteína truncada más corta e incompleta sin funcionalidad."
    },
    {
      "id": 17,
      "sub": 3,
      "q": "Si una mutación somática ocurre justo tras la primera división del cigoto (estado de 2 blastómeros), ¿qué ocurrirá en el organismo adulto?",
      "options": [
        "Solo el 1% de las células adultas portará la mutación.",
        "La mutación desaparecerá porque los blastómeros no se dividen por mitosis.",
        "El 100% de sus células somáticas y germinales serán mutantes.",
        "Será un individuo mosaico en el que el 50% de las células del organismo adulto portarán el genotipo mutante y el otro 50% el genotipo silvestre."
      ],
      "correct": 3,
      "exp": "Al ocurrir en una de las dos células del estado de 2 blastómeros, la clonación mitótica hará que el 50% de las células del adulto sean mutantes y el 50% silvestres."
    },
    {
      "id": 18,
      "sub": 3,
      "q": "Compara la transmisión a la descendencia de las mutaciones somáticas en animales frente a vegetales, y el papel de las mutaciones germinales:",
      "options": [
        "Las mutaciones somáticas se transmiten por gametos en animales, pero nunca se transmiten en plantas reproducidas por esquejes.",
        "En animales con reproducción sexual estricta las somáticas NO se transmiten (se extinguen con el individuo); en vegetales con reproducción asexual/vegetativa SÍ se transmiten si afectan a meristemos que formarán tubérculos, bulbos, esquejes o estolones. Las germinales se transmiten por fecundación a todas las células de la descendencia y tienen trascendencia evolutiva.",
        "Tanto en animales como en plantas las mutaciones somáticas son las únicas que impulsan la evolución filogenética por selección natural.",
        "Las mutaciones germinales solo afectan al progenitor y nunca pasan a los óvulos ni espermatozoides."
      ],
      "correct": 1,
      "exp": "En animales las mutaciones somáticas se extinguen con el individuo; en plantas con reproducción vegetativa se perpetúan clonalmente si afectan a meristemos de tubérculos, bulbos, esquejes o estolones. Las germinales pasan a toda la descendencia y son clave en la evolución."
    },
    {
      "id": 19,
      "sub": 4,
      "q": "¿Qué funciones cumplen el centrómero y los telómeros, y qué ocurre cuando un fragmento cromosómico se rompe y carece de ellos (fragmento acéntrico)?",
      "options": [
        "El centrómero ancla las fibras del huso acromático mediante el cinetocoro y los telómeros protegen los extremos del desgaste enzimático y evitan fusiones anómalas; un fragmento sin centrómero (acéntrico) o sin telómero no puede alinearse ni segregarse y se pierde en el citoplasma ('bye bye cromosoma').",
        "El centrómero transcribe ARN y el telómero traduce proteínas; un fragmento acéntrico se duplica indefinidamente.",
        "El centrómero protege los extremos y el telómero une el huso acromático; el fragmento acéntrico viaja al retículo endoplasmático.",
        "Los fragmentos acéntricos provocan automáticamente tetraploidía en todas las células hijas."
      ],
      "correct": 0,
      "exp": "Sin centrómero (fragmento acéntrico) o telómero, el fragmento es incapaz de alinearse y segregarse en la división celular, perdiéndose irremediablemente en el citoplasma ('bye bye cromosoma')."
    },
    {
      "id": 20,
      "sub": 4,
      "q": "¿Cómo afecta la poliploidía (>2n) al reino animal en comparación con el reino vegetal?",
      "options": [
        "En plantas reduce drásticamente el volumen celular haciendo que los frutos sean microscópicos.",
        "Es letal tanto en el 100% de las plantas como de los animales.",
        "En el reino animal suele ser letal en etapas embrionarias o inviable fisiológicamente; en el reino vegetal se tolera excepcionalmente bien, confiriendo vigor híbrido, ventajas adaptativas y órganos, flores, frutos y semillas de mayor tamaño (efecto de gigantismo).",
        "En animales confiere vigor híbrido y gigantismo, mientras que en plantas es siempre letal en fase embrionaria."
      ],
      "correct": 2,
      "exp": "En animales la poliploidía suele ser letal o inviable; en plantas confiere vigor híbrido y gigantismo (mayor volumen celular y frutos más grandes)."
    },
    {
      "id": 21,
      "sub": 4,
      "q": "¿Por qué los organismos triploides (3n), como la sandía sin semillas, son estériles?",
      "options": [
        "Porque la colchicina destruye permanentemente las flores de la planta triploide impidiendo la polinización.",
        "Porque carecen por completo de centrómeros y telómeros en sus células somáticas.",
        "Porque sus gametos son tetraploides (4n) y no pueden salir de la antera.",
        "Porque durante la profase I de la meiosis, los tres juegos de cromosomas homólogos no pueden aparearse de forma equilibrada en parejas bivalentes, produciendo una segregación meiótica caótica con aneuploidías inviables que conllevan el aborto de las semillas."
      ],
      "correct": 3,
      "exp": "La infertilidad de los triploides (3n) radica en la profase I de la meiosis: los 3 juegos homólogos no pueden aparearse equilibradamente en bivalentes, causando segregación caótica, aneuploidías inviables y aborto de semillas."
    },
    {
      "id": 22,
      "sub": 4,
      "q": "¿Cómo se produce comercialmente una sandía triploide (3n) sin semillas y cómo se propaga?",
      "options": [
        "Eliminando los intrones de la sandía mediante una translocación robertsoniana.",
        "Cruzando una planta tetraploide (4n, que genera gametos 2n) con una planta diploide silvestre (2n, que genera gametos 1n) para obtener un embrión 3n; al ser estéril por vía sexual, se propaga mediante clonación vegetativa o cultivo in vitro.",
        "Cruzando dos plantas haploides (1n x 1n) y propagándola mediante semillas fértiles convencionales.",
        "Aplicando EMS directamente sobre el fruto maduro de una sandía diploide en el supermercado."
      ],
      "correct": 1,
      "exp": "Se cruza una sandía tetraploide (4n, gametos 2n) con una diploide silvestre (2n, gametos 1n) obteniendo el embrión 3n; se propaga por clonación vegetativa o cultivo in vitro."
    },
    {
      "id": 23,
      "sub": 4,
      "q": "¿Cuál es el mecanismo de acción exacto de la colchicina para inducir tetraploidía (4n) y en qué cultivos tiene gran importancia económica?",
      "options": [
        "Es un agente alquilante que induce transiciones G/C a A/T durante la profase II meiótica.",
        "Es un alcaloide mitostático que despolimeriza los microtúbulos del huso acromático, bloqueando la mitosis en metafase para que los cromosomas ya duplicados no se separen y queden confinados en una sola célula tetraploide (4n); se aplica en manzana, cereza, pera, sandía, zarzamora y variedades de trigo.",
        "Es una enzima que suelda dos núcleos en interfase; se usa exclusivamente en bacterias.",
        "Es una histona desacetilasa que compacta el solenoide en el tomate Cnr."
      ],
      "correct": 1,
      "exp": "La colchicina es un alcaloide mitostático que despolimeriza los microtúbulos del huso acromático bloqueando la mitosis en metafase. Destaca en variedades selectas de manzana, cereza, pera, sandía, zarzamora y trigo."
    },
    {
      "id": 24,
      "sub": 4,
      "q": "Según los esquemas citogenéticos y biotecnológicos del Subtema 4 (Figuras 1 y 2), ¿qué cinco alteraciones estructurales cromosómicas y qué tres métodos de obtención de poliploides se representan?",
      "options": [
        "Cinco alteraciones: Silenciosa, Missense, Nonsense, Splicing y Capping. Tres métodos: PCR, TILLING y Epigenética.",
        "Cinco alteraciones: Deleción, Duplicación, Inversión, Translocación y Translocación robertsoniana. Tres métodos: Duplicación con colchicina, Fusión de protoplastos y Gametos no reducidos.",
        "Cinco alteraciones: Ceto, Enol, Amino, Imino y Uracilo. Tres métodos: Mitosis, Meiosis y Bipartición.",
        "Solo se representa la deleción terminal y el injerto radicular."
      ],
      "correct": 1,
      "exp": "La Figura 1 muestra: A) Deleción, B) Duplicación, C) Inversión, D) Translocación y E) Translocación robertsoniana. La Figura 2 muestra: Duplicación con colchicina (2x→4x), Fusión de protoplastos (2x+2x→4x) y Gametos no reducidos (2x × 2x)."
    },
    {
      "id": 25,
      "sub": 5,
      "q": "¿Qué son los tautómeros de las bases nitrogenadas y qué emparejamientos anómalos describieron Watson y Crick durante la replicación del ADN?",
      "options": [
        "Son ribonucleótidos de uracilo que se insertan en los telómeros en la primera generación celular.",
        "Son formas isoméricas que difieren en la posición de átomos de H y dobles enlaces: las formas ceto y amino son las normales y estables, mientras que las formas enol e imino son raras y transitorias. La adenina en forma imino se aparea erróneamente con la citosina, y la timina en forma enol con la guanina, fijando transiciones tras un segundo ciclo de replicación.",
        "Son dímeros de pirimidina causados por rayos gamma que provocan deleciones de cromosomas enteros.",
        "Son bases metiladas que impiden la unión de la ARN polimerasa; la forma ceto es rara y la forma enol es la normal."
      ],
      "correct": 1,
      "exp": "Las formas normales son ceto/amino y las raras transitorias son enol/imino. A-imino empareja erróneamente con C, y T-enol con G (o G-enol con T), consolidando transiciones tras un segundo ciclo de replicación."
    },
    {
      "id": 26,
      "sub": 5,
      "q": "¿Qué ocurre en la desaminación espontánea de la citosina y en el daño oxidativo sobre la guanina?",
      "options": [
        "La uracilo-ADN glicosilasa elimina todas las adeninas del genoma produciendo fragmentos acéntricos.",
        "La citosina se convierte en timina directamente y la guanina se transforma en citosina.",
        "El daño oxidativo metila la lisina 9 de la histona 3 sin alterar las bases nitrogenadas.",
        "La pérdida del grupo amino convierte la citosina en uracilo: si la uracilo-ADN glicosilasa no lo repara antes de la replicación, el U empareja con A y tras una 2ª ronda el par G-C se transforma irreversiblemente en A-T. Por su parte, los radicales libres oxidan la guanina a 8-oxo-guanina, que se aparea erróneamente con adenina."
      ],
      "correct": 3,
      "exp": "La desaminación de citosina genera uracilo (si no actúa la uracilo-ADN glicosilasa, fija una transición G-C → A-T tras dos rondas). Las especies reactivas de oxígeno oxidan la guanina a 8-oxo-guanina, que empareja con adenina."
    },
    {
      "id": 27,
      "sub": 5,
      "q": "Clasifica correctamente los agentes mutagénicos físicos y los tres tipos de agentes químicos del Subtema 5:",
      "options": [
        "El 5-bromouracilo es una radiación ionizante que rompe el huso acromático en metafase.",
        "Físicos: radiaciones ionizantes (rayos X, rayos gamma) y radiación UV. Químicos: 1) Análogos de bases (como el 5-bromouracilo), 2) Agentes intercalantes (compuestos planos que provocan inserciones o deleciones - indels), y 3) Agentes alquilantes (transfieren grupos alquilo, como el EMS).",
        "Físicos: EMS y colchicina. Químicos: rayos X, rayos gamma y luz ultravioleta.",
        "Los agentes intercalantes como el EMS solo producen poliploidía sin tocar las bases del ADN."
      ],
      "correct": 1,
      "exp": "Agentes físicos: rayos X, rayos gamma y UV. Agentes químicos: análogos de bases (5-bromouracilo), intercalantes (causan indels) y alquilantes (EMS)."
    },
    {
      "id": 28,
      "sub": 5,
      "q": "¿En qué consiste la metodología TILLING (Targeting Induced Local Lesions IN Genomes) y cuál es su gran ventaja comercial?",
      "options": [
        "Es una técnica de genética inversa que combina la mutagénesis química masiva con EMS (induciendo transiciones G/C → A/T) con un cribado molecular de alta sensibilidad (PCR y digestión enzimática o secuenciación dirigida) para identificar mutaciones puntuales en genes de interés. Su gran ventaja comercial es que las nuevas variedades NO son OGM (no recurre a transgénesis), evitando barreras regulatorias.",
        "Es un método para clonar sandías triploides mediante fusión de protoplastos sin usar PCR.",
        "Es una técnica de transgénesis clásica que inserta genes bacterianos con pistola génica; produce organismos OGM.",
        "Es el silenciamiento epigenético del promotor mediante la enzima uracilo-ADN glicosilasa."
      ],
      "correct": 0,
      "exp": "TILLING combina mutagénesis química con EMS y cribado molecular por PCR/digestión o secuenciación (genética inversa), obteniendo variedades mejoradas que NO son OGM."
    },
    {
      "id": 29,
      "sub": 5,
      "q": "¿Cómo interactúan la metilación de la histona H3-K9, la metilación del ADN (MeCP2) y la desacetilación de histonas (HDAC) para reprimir la transcripción?",
      "options": [
        "La acetilación de histonas recluta a MeCP2 para degradar los exones en el núcleo.",
        "La metilación de H3-K9 promueve metiltransferasas que metilan las citosinas del ADN; recíprocamente, la metilación del ADN (a la que se une MeCP2 reclutando HDAC) induce la desacetilación de histonas, retirando grupos acetilo y aumentando la carga positiva de las histonas, lo que las compacta fuertemente contra el ADN e impide la transcripción.",
        "Alteran irreversiblemente la secuencia primaria de nucleótidos del ADN sustituyendo citosinas por timinas.",
        "La metilación de H3-K9 elimina la carga positiva de las histonas y abre la cromatina para activar la ARN polimerasa."
      ],
      "correct": 1,
      "exp": "Las modificaciones epigenéticas no alteran la secuencia primaria del ADN: H3-K9 promueve la metilación de citosinas, y el ADN metilado (vía MeCP2 y HDAC) induce la desacetilación de histonas, aumentando su carga positiva y compactando la cromatina."
    },
    {
      "id": 30,
      "sub": 5,
      "q": "¿Qué descubrieron Manning et al. (2006) sobre el mutante de tomate Cnr (Colorless non-ripening) y por qué presenta sectores rojos de reversión?",
      "options": [
        "Que el tomate Cnr había perdido sus telómeros por exposición a 5-bromouracilo.",
        "Que es un mutante triploide (3n) inducido con colchicina cuyos frutos carecen de semillas.",
        "Que se debía a una mutación sin sentido CAG → UAG en el exón 3 irreversible.",
        "Que no era una mutación en la secuencia de nucleótidos, sino una epimutación natural por hipermetilación masiva en el promotor de un gen de un factor de transcripción clave para la maduración (dando frutos descoloridos amarillentos/blanquecinos y pericarpio harinoso); al ser dinámicas y reversibles, presenta sectores rojos por eventos de desmetilación natural."
      ],
      "correct": 3,
      "exp": "Manning et al. (2006) demostraron que el fenotipo Cnr (frutos descoloridos y pericarpio harinoso) se debe a una epimutación natural (hipermetilación del promotor) dinámica y reversible, que origina sectores rojos por desmetilación espontánea."
    }
  ],
  "tema3": [
    {
      "id": 1,
      "sub": 1,
      "q": "¿Qué son las huellas genéticas (DNA fingerprinting) y cuál es la única excepción biológica en la que dos individuos comparten el mismo patrón de bandas?",
      "options": [
        "Son descriptores morfológicos del color de la flor que cambian según el clima y el suelo.",
        "Son patrones reproducibles y característicos de fragmentos de ADN que permiten identificar de manera inequívoca a un individuo determinado; salvo en el caso de los gemelos monocigóticos (idénticos), cada individuo posee un patrón de bandas exclusivo.",
        "Son perfiles de ARN ribosómico idénticos en todos los hermanos de una misma familia.",
        "Son secuencias exclusivas de los virus bacteriófagos que no existen en plantas ni animales."
      ],
      "correct": 1,
      "exp": "Salvo en el caso de los gemelos monocigóticos (idénticos), cada individuo de una especie posee un patrón de bandas exclusivo en su huella genética (DNA fingerprinting)."
    },
    {
      "id": 2,
      "sub": 1,
      "q": "¿Cuáles son las 4 etapas ordenadas del proceso básico de obtención de una huella genética?",
      "options": [
        "1) Inactivación del corpúsculo de Barr, 2) Transcripción inversa, 3) Ligación roma y 4) Cultivo in vitro.",
        "1) Extracción y purificación del ADN, 2) Generación de fragmentos polimórficos (mediante restrictasas para RFLPs o PCR de microsatélites VNTRs/STRs), 3) Separación de los fragmentos por electroforesis en gel (agarosa o poliacrilamida), y 4) Visualización y detección (tinción fluorescente o hibridación con sondas marcadas).",
        "1) Secuenciación de proteínas, 2) Desaminación de citosinas, 3) Centrifugación y 4) Microscopía óptica.",
        "1) Fusión de protoplastos, 2) Adición de colchicina, 3) Splicing nuclear y 4) Traducción ribosómica."
      ],
      "correct": 1,
      "exp": "Las 4 etapas son: 1) Extracción y purificación del ADN, 2) Generación de fragmentos polimórficos (RFLPs o PCR de VNTRs/STRs), 3) Separación por electroforesis en gel de agarosa o poliacrilamida, y 4) Visualización y detección."
    },
    {
      "id": 3,
      "sub": 1,
      "q": "¿Cuál es el origen y la función biológica original de las enzimas de restricción (restrictasas), qué enlace químico cortan y cómo son sus secuencias diana?",
      "options": [
        "Son enzimas víricas que sintetizan telómeros en los extremos de los cromosomas eucariotas.",
        "Son enzimas humanas que cortan enlaces peptídicos en secuencias aleatorias de ARN mensajero.",
        "Son lípidos vegetales que rompen únicamente los enlaces N-glucosídicos a 100 °C.",
        "Son proteínas de origen bacteriano que actúan como un sistema inmunitario primitivo o mecanismo de defensa para degradar el ADN invasor de virus bacteriófagos; reconocen secuencias diana específicas y cortas en el ADN bicatenario, típicamente palindrómicas (se leen igual 5'→3' en ambas cadenas), y cortan los enlaces fosfodiéster."
      ],
      "correct": 3,
      "exp": "Las restrictasas son endonucleasas bacterianas de defensa frente a bacteriófagos; reconocen dianas específicas bicatenarias típicamente palindrómicas y cortan enlaces fosfodiéster."
    },
    {
      "id": 4,
      "sub": 1,
      "q": "¿Qué diferencia existe entre las enzimas de restricción que generan extremos cohesivos (pegajosos) y las que generan extremos romos (rectos)?",
      "options": [
        "Las de extremos romos dejan largas colas monocatenarias muy fáciles de unir por puentes de hidrógeno, y las cohesivas cortan en el eje de simetría.",
        "Ambas dejan exactamente el mismo tipo de colas monocatenarias de 6 nucleótidos.",
        "Las de extremos cohesivos cortan las dos hebras de forma asimétrica o escalonada dejando colas monocatenarias expuestas que pueden aparearse espontáneamente por puentes de H con otro fragmento cortado con la misma enzima; las de extremos romos cortan ambas hebras simétricamente en la misma posición sin dejar nucleótidos monocatenarios libres (siendo más difíciles de religar).",
        "Las de extremos cohesivos solo cortan ARN monocatenario y las de extremos romos solo cortan proteínas histónicas."
      ],
      "correct": 2,
      "exp": "Los cortes escalonados dejan colas monocatenarias (extremos cohesivos o pegajosos) fáciles de aparear por puentes de H; los cortes simétricos dejan extremos romos sin bases desemparejadas, más difíciles de religar."
    },
    {
      "id": 5,
      "sub": 1,
      "q": "Indica la secuencia diana exacta y el punto de corte preciso de las enzimas EcoRI, PstI y HaeIII según el Subtema 1:",
      "options": [
        "EcoRI reconoce 5'-GAATTC-3' y corta entre G y A (cohesivo); PstI reconoce 5'-CTGCAG-3' y corta entre A y G (cohesivo); HaeIII reconoce 5'-GGCC-3' y corta simétricamente en el centro entre G y C (extremo romo).",
        "Las tres enzimas reconocen la caja TATA y producen extremos cohesivos de 10 nucleótidos.",
        "EcoRI corta en el centro de 5'-GGCC-3' (romo); HaeIII corta 5'-GAATTC-3' (cohesivo).",
        "EcoRI reconoce 5'-CTGCAG-3', PstI reconoce 5'-GGCC-3' y HaeIII reconoce 5'-GAATTC-3'."
      ],
      "correct": 0,
      "exp": "EcoRI: 5'-G↓AATTC-3' (cohesivo); PstI: 5'-CTGCA↓G-3' (cohesivo); HaeIII: 5'-GG↓CC-3' (extremo romo)."
    },
    {
      "id": 6,
      "sub": 1,
      "q": "¿Cuáles son las tres grandes aplicaciones de las enzimas de restricción destacadas en el Subtema 1?",
      "options": [
        "Secuenciación transcriptómica de ARN, splicing alternativo y adición de cola poli-A.",
        "1) Ingeniería genética y clonación molecular (escindir genes y ligarlos en vectores plasmídicos o víricos), 2) Análisis de polimorfismos RFLP para identificación genética, y 3) Mapeo genético y diagnóstico molecular.",
        "Únicamente la degradación completa del ADN en muestras forenses para impedir su análisis.",
        "Poliploidización con colchicina, desmetilación del tomate Cnr y síntesis de ribosomas."
      ],
      "correct": 1,
      "exp": "Sus 3 aplicaciones clave son: ingeniería genética y clonación molecular en vectores plasmídicos/víricos, análisis de polimorfismos RFLP, y mapeo genético y diagnóstico molecular."
    },
    {
      "id": 7,
      "sub": 2,
      "q": "¿Qué significan las siglas RFLP y qué hito histórico representan dentro de la genética molecular?",
      "options": [
        "Random Amplification of Polymorphic DNA; es una técnica de PCR que no utiliza enzimas de restricción.",
        "Rapid Fragment Ligation Process; fueron los últimos marcadores creados tras la plataforma Illumina.",
        "Ribosomal Fluorescent Labeling Protocol; son marcadores exclusivos de proteínas vegetales.",
        "Restriction Fragment Length Polymorphisms (Polimorfismo en la Longitud de los Fragmentos de Restricción, Botstein et al., 1980); fueron los primeros marcadores moleculares basados en el análisis directo del ADN."
      ],
      "correct": 3,
      "exp": "Los RFLPs (Restriction Fragment Length Polymorphisms, Botstein et al., 1980) fueron los primeros marcadores moleculares basados en el análisis directo del ADN."
    },
    {
      "id": 8,
      "sub": 2,
      "q": "¿Cuál es la causa molecular de que dos individuos de la misma especie presenten fragmentos de restricción de diferente longitud (RFLP)?",
      "options": [
        "Que uno de los individuos posee ribosomas más grandes que el otro.",
        "Si entre dos individuos existe una mutación puntual o una inserción/deleción en la secuencia diana de restricción, la enzima ya no reconocerá el sitio y no ocurrirá el corte (o bien se generará un nuevo sitio de corte), produciendo fragmentos de longitudes diferentes.",
        "Que el tampón de electroforesis cambia la secuencia primaria de bases del ADN.",
        "Que la enzima Taq polimerasa se inactiva a 72 °C en uno de los individuos."
      ],
      "correct": 1,
      "exp": "Una mutación puntual o una inserción/deleción (indel) que elimine o cree una diana de restricción modifica los puntos de corte enzimático y, por tanto, la longitud de los fragmentos resultantes."
    },
    {
      "id": 9,
      "sub": 2,
      "q": "En el protocolo de RFLP, ¿por qué es necesario realizar la transferencia de Southern Blot tras la electroforesis del ADN genómico digerido?",
      "options": [
        "Para transformar el ADN en proteínas antes de teñirlo con colchicina.",
        "Porque el gel de agarosa es irrompible y solo tiene dos fragmentos visibles a simple vista.",
        "Debido a la fragilidad del gel de agarosa y a que la gran masa de millones de fragmentos digeridos forma un frotis continuo, el ADN se desnaturaliza y se transfiere capilarmente a una membrana sólida y resistente (de nylon o nitrocelulosa) para poder hibridarlo con una sonda específica.",
        "Para amplificar exponencialmente los fragmentos mediante 35 ciclos a 95 °C."
      ],
      "correct": 2,
      "exp": "La digestión del genoma completo genera millones de piezas que se ven como un frotis continuo en un gel frágil; el Southern blot desnaturaliza y transfiere capilarmente el ADN a una membrana resistente de nylon o nitrocelulosa."
    },
    {
      "id": 10,
      "sub": 2,
      "q": "¿Qué es una sonda molecular en la técnica de Southern Blot y cómo actúa sobre la membrana de nylon o nitrocelulosa?",
      "options": [
        "Es un colorante inespecífico que tiñe por igual los millones de fragmentos del genoma.",
        "Es un anticuerpo monoclonal que reconoce aminoácidos de arginina en el citoplasma.",
        "Es una secuencia corta y conocida de ADN de hebra simple, marcada radiactiva o químicamente con fluorescencia, que se aparea e hibrida únicamente con aquellos fragmentos inmovilizados en la membrana que posean secuencia complementaria a la región génica de interés.",
        "Es una enzima de restricción que corta la membrana de nitrocelulosa en tiras iguales."
      ],
      "correct": 2,
      "exp": "La sonda es una secuencia corta y conocida de ADN monocatenario marcada radiactiva o fluorescentemente que hibrida de forma específica por complementariedad de bases con los fragmentos de la región de interés."
    },
    {
      "id": 11,
      "sub": 2,
      "q": "Al revelar la placa de un análisis RFLP para un locus bialélico con los alelos A y B, ¿cómo se interpretan los patrones de bandas de los genotipos AA, BB y AB?",
      "options": [
        "AA (homocigoto para el alelo A) muestra una sola banda; BB (homocigoto para el alelo B) muestra una sola banda de longitud alternativa; y AB (heterocigoto) posee una copia con la diana intacta y otra con la diana modificada, manifestando conjuntamente ambas bandas en el gel.",
        "El heterocigoto AB no muestra ninguna banda porque las sondas se anulan entre sí.",
        "Los homocigotos AA muestran cuatro bandas y los heterocigotos AB muestran una sola banda intermedia.",
        "Tanto AA como BB y AB muestran exactamente una única banda idéntica porque RFLP es un marcador dominante."
      ],
      "correct": 0,
      "exp": "Los RFLPs son codominantes: los homocigotos AA y BB muestran cada uno su banda característica, mientras que el heterocigoto AB manifiesta conjuntamente ambas bandas."
    },
    {
      "id": 12,
      "sub": 2,
      "q": "En el esquema clásico de RFLP de Botstein et al. (1980) (Figura 1 del Subtema 2), el alelo A tiene 3 sitios de corte (E-E-E) y el alelo B ha perdido el sitio central (E---E). ¿Qué banda migra más abajo en el gel?",
      "options": [
        "Ambas bandas migran a la misma altura independientemente de dónde corte la restrictasa.",
        "La banda del alelo B migra más abajo porque al perder el sitio de corte el fragmento es más grande y pesado.",
        "Ninguna de las bandas migra porque la sonda impide el paso de la corriente eléctrica.",
        "La banda del alelo A migra más abajo (más lejos del origen) porque el corte en la diana intermedia genera un fragmento más corto donde hibrida la sonda, mientras que la banda del alelo B queda más arriba por ser un fragmento más largo."
      ],
      "correct": 3,
      "exp": "En la Figura 1 del Subtema 2 se observa claramente que el alelo A (con el sitio de corte central intacto) produce un fragmento más corto que avanza más rápido hasta la parte inferior del gel, mientras que el alelo B queda más arriba."
    },
    {
      "id": 13,
      "sub": 3,
      "q": "¿Qué diferencias fundamentales existen entre el método clásico de RFLP, la técnica RAPD y la PCR estándar dirigida en cuanto a cantidad de ADN y conocimiento previo de la secuencia?",
      "options": [
        "RFLP requiere cantidades mínimas de ADN degradado; RAPD exige secuenciar primero todo el cromosoma.",
        "RFLP requiere grandes cantidades de ADN de alto peso molecular y no exige conocer la secuencia previa (usa sondas homólogas); las técnicas de PCR parten de cantidades mínimas de muestra: RAPD amplifica fragmentos arbitrarios sin conocer a priori la secuencia de la especie diana, mientras que la PCR estándar dirigida sí requiere conocer previamente la secuencia de los extremos para diseñar los primers.",
        "La PCR estándar no puede utilizarse para detectar ADN viral por su baja sensibilidad.",
        "Tanto RFLP como RAPD requieren diseñar dos primers específicos de 50 nucleótidos conociendo el genoma de referencia."
      ],
      "correct": 1,
      "exp": "RFLP exige mucho ADN de alto peso molecular; las técnicas PCR usan muestras mínimas: RAPD no requiere conocer la secuencia previa, mientras que la PCR estándar dirigida exige conocer la secuencia de los extremos para diseñar los primers A y B."
    },
    {
      "id": 14,
      "sub": 3,
      "q": "¿Cuáles son los 5 componentes indispensables en la mezcla y equipo de una Reacción en Cadena de la Polimerasa (PCR)?",
      "options": [
        "ADN molde, didesoxinucleótidos terminadores (ddNTPs), histonas H1 y ARN polimerasa.",
        "ARN mensajero, enzima EcoRI, membrana de nitrocelulosa, sonda radiactiva y bromuro de etidio.",
        "1) ADN molde, 2) Cebadores (primers) A y B orientados en sentidos opuestos, 3) ADN polimerasa termoestable (ej. Taq polimerasa), 4) dNTPs (dATP, dTTP, dCTP, dGTP) como ladrillos y fuente de energía, y 5) Termociclador.",
        "Un único primer, uracilo trifosfato (UTP), ligasa bacteriana y cámara de flujo Illumina."
      ],
      "correct": 2,
      "exp": "Los 5 elementos indispensables son: ADN molde, primers A y B opuestos, ADN polimerasa termoestable (Taq), los cuatro dNTPs normales y el termociclador."
    },
    {
      "id": 15,
      "sub": 3,
      "q": "Indica las temperaturas y funciones exactas de las 3 etapas que componen cada ciclo térmico de la PCR:",
      "options": [
        "Las tres etapas se realizan a una temperatura constante de 72 °C durante 35 horas.",
        "1) Corte con restrictasa a 60 °C, 2) Transferencia capilar a 72 °C, y 3) Hibridación de sonda a 95 °C.",
        "1) Desnaturalización térmica a 95 °C (separa las dos hebras rompiendo puentes de H), 2) Hibridación o anillamiento de cebadores a 30-60 °C durante aprox. 2 minutos (unión de los primers A y B), y 3) Polimerización o elongación a 72 °C (temperatura óptima de la polimerasa para sintetizar en dirección 5'→3' desde el 3'-OH del primer).",
        "1) Desnaturalización a 37 °C, 2) Anillamiento a 100 °C, y 3) Elongación a 20 °C."
      ],
      "correct": 2,
      "exp": "El ciclo térmico consta de: 1) Desnaturalización (95 °C), 2) Hibridación/anillamiento de primers (30-60 °C durante ~2 min), y 3) Polimerización/elongación (72 °C, síntesis 5'→3' desde el 3'-OH libre)."
    },
    {
      "id": 16,
      "sub": 3,
      "q": "¿Qué ley matemática sigue la cinética de amplificación de la PCR, cuántas moléculas se obtienen en los ciclos 1, 2, 3 y 35, y qué puede ocurrirle a la enzima a 95 °C?",
      "options": [
        "En el ciclo 1 se obtienen 100 copias y en el ciclo 35 se detiene por falta de uracilo.",
        "Tras 35 ciclos se obtienen exactamente 1.000 copias y la enzima multiplica su actividad con el calor de 95 °C.",
        "Sigue una progresión lineal (2n): tras 35 ciclos se obtienen 70 copias.",
        "Sigue una progresión exponencial (2^n): Ciclo 1 = 2 moléculas, Ciclo 2 = 4, Ciclo 3 = 8, y tras 35 ciclos se obtienen teóricamente más de 34.000 millones de copias idénticas. En cada ciclo a 95 °C la enzima puede sufrir una pérdida progresiva de actividad, pudiendo requerir suplementar con polimerasa adicional en ensayos muy prolongados."
      ],
      "correct": 3,
      "exp": "La amplificación es exponencial (2^n): 2, 4, 8... y >34.000 millones de copias tras 35 ciclos. Los calentamientos repetidos a 95 °C causan pérdida progresiva de actividad enzimática."
    },
    {
      "id": 17,
      "sub": 3,
      "q": "En el diseño de una PCR diagnóstica o de análisis de polimorfismos, ¿qué elemento confiere la especificidad a la técnica y qué determina la longitud final del fragmento amplificado (amplicón)?",
      "options": [
        "La longitud del amplicón depende exclusivamente del tamaño de los pocillos del gel de agarosa.",
        "Los cebadores (primers) son el elemento clave que confiere especificidad a la técnica (ej. discriminar cepas de virus); la distancia física entre los dos primers A y B determina la longitud final del fragmento sintetizado (ej. 0,5 kb, 2 kb).",
        "La especificidad la da el termociclador y la longitud depende del tiempo de incubación a 95 °C.",
        "La Taq polimerasa decide al azar dónde empezar y terminar según la concentración de magnesio."
      ],
      "correct": 1,
      "exp": "Los primers confieren la especificidad de unión, y la distancia entre los primers A y B delimita la longitud exacta del amplicón resultante."
    },
    {
      "id": 18,
      "sub": 3,
      "q": "Para diagnosticar de forma sensible la presencia de un virus en plantas o animales cuando su material genético está en cantidades mínimas, ¿cuál es la técnica de elección según el Subtema 3?",
      "options": [
        "La Reacción en Cadena de la Polimerasa (PCR), ya que permite generar millones de copias del material genético viral a partir de cantidades mínimas de muestra.",
        "Descriptores morfológicos visuales en semillas secas.",
        "La digestión directa sin amplificación mediante HaeIII.",
        "La inducción de poliploidía mediante colchicina."
      ],
      "correct": 0,
      "exp": "La PCR es la técnica de elección para el diagnóstico sensible de ADN viral porque multiplica exponencialmente su material genético hasta generar miles de millones de copias visualizables."
    },
    {
      "id": 19,
      "sub": 4,
      "q": "¿Qué son los SNPs (Single Nucleotide Polymorphisms) y qué relevancia tienen en los genomas eucariotas?",
      "options": [
        "Son fragmentos de ARN ribosómico que carecen de variabilidad entre individuos.",
        "Son secuencias palindrómicas de 6 bases donde corta la enzima EcoRI en todos los individuos por igual.",
        "Constituyen la fuente más abundante de variabilidad genética en los genomas eucariotas, y consisten en variaciones de una única base nitrogenada en la secuencia del ADN (ej. una transición A ↔ G o transversión) en una posición cromosómica concreta entre individuos de una misma población o especie.",
        "Son duplicaciones de cromosomas enteros que solo aparecen en bacterias."
      ],
      "correct": 2,
      "exp": "Los SNPs son variaciones de un solo nucleótido (transiciones o transversiones) y constituyen la fuente más abundante de variabilidad genética en genomas eucariotas."
    },
    {
      "id": 20,
      "sub": 4,
      "q": "En las Fases 1 y 2 de la secuenciación masiva Illumina, ¿cómo se prepara el ADN genómico y cómo se ancla a la celda de flujo (Flow Cell)?",
      "options": [
        "Se digiere con HaeIII y se transfiere por capilaridad a una membrana de nitrocelulosa.",
        "Se introduce el cromosoma entero intacto en un gel de poliacrilamida sin ningún adaptador.",
        "Se une a histonas H3-K9 para formar nucleosomas dentro del termociclador.",
        "El ADN genómico se fragmenta físicamente en millones de piezas pequeñas y en sus extremos se ligan enzimáticamente adaptadores sintéticos conocidos; luego se introduce en una cámara de vidrio microscópica (flow cell) recubierta de oligonucleótidos fijados complementarios a los adaptadores, donde cada fragmento se ancla por hibridación en un punto discreto."
      ],
      "correct": 3,
      "exp": "Fase 1: fragmentación física y ligación enzimática de adaptadores sintéticos conocidos en los extremos. Fase 2: anclaje por hibridación en la superficie de la Flow Cell recubierta de oligonucleótidos complementarios."
    },
    {
      "id": 21,
      "sub": 4,
      "q": "¿En qué consiste la Fase 3 de Illumina denominada 'Amplificación por puente' (Bridge Amplification) y qué es un cluster?",
      "options": [
        "Es el paso de corriente eléctrica entre el cátodo y el ánodo en un gel de agarosa.",
        "Los fragmentos anclados en la flow cell se pliegan formando una estructura en 'puente' con oligonucleótidos adyacentes de la placa y sufren una amplificación clonal local mediante polimerasas; tras varios ciclos, en cada punto discreto del chip se genera una colonia con miles de copias idénticas de un único fragmento original denominada cluster.",
        "Consiste en unir dos cromosomas homólogos en la profase I meiótica mediante quiasmas.",
        "Es la unión de dos cebadores mediante enlaces peptídicos en disolución libre."
      ],
      "correct": 1,
      "exp": "En la amplificación por puente, cada fragmento anclado se pliega sobre oligonucleótidos adyacentes de la Flow Cell y se multiplica localmente hasta formar un cluster (colonia clonal con miles de copias idénticas)."
    },
    {
      "id": 22,
      "sub": 4,
      "q": "En la Fase 4 de Illumina (Secuenciación por síntesis), ¿por qué la ADN polimerasa incorpora únicamente UN nucleótido por ciclo en cada molécula del cluster y cómo puede continuar en el ciclo siguiente?",
      "options": [
        "Porque la temperatura sube a 100 °C después de cada segundo para inactivar la polimerasa.",
        "Porque los 4 dNTPs marcados con fluorocromos poseen un grupo bloqueador reversible en su extremo 3' que detiene la síntesis tras incorporar un solo nucleótido; una vez que el sistema óptico registra el color emitido por cada cluster, se escinde químicamente tanto el fluorocromo como el grupo bloqueador, se lava y se inicia el siguiente ciclo.",
        "Porque utiliza didesoxinucleótidos de Sanger irreversibles que destruyen la cadena para siempre.",
        "Porque solo se añade un tipo de nucleótido cada día sin ningún grupo bloqueador."
      ],
      "correct": 1,
      "exp": "La clave química de Illumina es el bloqueador reversible en el extremo 3' de los dNTPs fluorescentes: detiene la síntesis tras añadir 1 base para leer su color, y luego se escinde químicamente junto al fluorocromo para permitir el siguiente ciclo."
    },
    {
      "id": 23,
      "sub": 4,
      "q": "Según el Subtema 4, ¿qué esquema de colores de fluorocromos se asigna a las cuatro bases en la secuenciación por síntesis de Illumina?",
      "options": [
        "Adenina: negro, Timina: blanco, Citosina: gris, Guanina: marrón.",
        "Adenina: naranja, Timina: violeta, Citosina: rosa, Guanina: turquesa.",
        "Todas las bases emiten en el mismo color ultravioleta y se distinguen por su peso.",
        "Adenina (A): verde, Timina (T): rojo, Citosina (C): azul, Guanina (G): amarillo."
      ],
      "correct": 3,
      "exp": "En el Subtema 4 se especifica para Illumina: Adenina (A) = verde, Timina (T) = rojo, Citosina (C) = azul, Guanina (G) = amarillo."
    },
    {
      "id": 24,
      "sub": 4,
      "q": "¿Cómo se lleva a cabo la Fase 5 (Detección bioinformática de SNPs) tras finalizar la lectura óptica de la Flow Cell?",
      "options": [
        "Imprimiendo fotografías en papel y midiendo las bandas con una regla milimetrada.",
        "Contando el número total de cromosomas metafásicos teñidos con Giemsa.",
        "Hibridando el ordenador con una sonda radiactiva de nitrocelulosa.",
        "Un software bioinformático alinea las millones de secuencias leídas frente a un genoma de referencia; en cualquier posición en la que un individuo o población muestre de manera estadísticamente consistente una base distinta (por ejemplo, una A en vez de una G), el programa identifica y anota automáticamente un SNP."
      ],
      "correct": 3,
      "exp": "El software alinea masivamente los millones de lecturas frente al genoma de referencia e identifica automáticamente los SNPs allí donde aparece de forma consistente una base alternativa."
    },
    {
      "id": 25,
      "sub": 5,
      "q": "En los programas de conservación de recursos fitogenéticos y bancos de germoplasma, ¿en qué consiste el 'criterio de representatividad' y qué papel juegan los marcadores moleculares?",
      "options": [
        "Consiste en eliminar todos los alelos recesivos mediante mutagénesis con EMS.",
        "Consiste en conservar únicamente un individuo homocigoto idéntico de cada continente.",
        "Las áreas protegidas o bancos de germoplasma deben albergar la mayor diversidad genética global posible, maximizando la heterocigosidad y la riqueza alélica para garantizar la capacidad adaptativa y potencial evolutivo ante cambios climáticos y patógenos; los marcadores permiten cuantificar objetivamente la variabilidad intrapoblacional e interpoblacional.",
        "Consiste en seleccionar solo las plantas con flores más grandes mediante descriptores visuales."
      ],
      "correct": 2,
      "exp": "El criterio de representatividad busca maximizar la heterocigosidad y la riqueza alélica global; los marcadores moleculares cuantifican objetivamente la variabilidad intrapoblacional e interpoblacional para priorizar poblaciones únicas."
    },
    {
      "id": 26,
      "sub": 5,
      "q": "¿Cuáles son las TRES grandes limitaciones de los descriptores clásicos (morfológicos y fisiológicos) en el control de la pureza varietal y derechos de obtentor?",
      "options": [
        "Requieren secuenciadores Illumina y sondas radiactivas en el campo.",
        "1) Presentan un número muy limitado de variantes discriminantes, 2) Sufren una fuerte influencia ambiental (variando según el clima o el suelo), y 3) Dependen estrictamente del estadio ontogenético de la planta (obligando a esperar meses o años hasta que la planta adulta produzca flores o frutos).",
        "Son demasiado baratos, se analizan en semillas recién germinadas y no les afecta el clima.",
        "Alteran la secuencia del ADN de la planta y provocan esterilidad triploide."
      ],
      "correct": 1,
      "exp": "Los descriptores morfológicos/fisiológicos tienen pocas variantes discriminantes, están fuertemente influidos por el ambiente y dependen del estadio de desarrollo (ontogenético) de la planta."
    },
    {
      "id": 27,
      "sub": 5,
      "q": "¿Qué ventajas decisivas aportan los marcadores moleculares (de proteínas y, predominantemente, de ADN) frente a los descriptores morfológicos para proteger variedades registradas bajo derechos de obtentor?",
      "options": [
        "1) Son neutros frente a la presión ambiental, 2) No dependen del órgano o tejido analizado ni del estado de desarrollo (pueden determinarse en plántulas recién germinadas), y 3) Ofrecen un poder de discriminación prácticamente ilimitado frente a fraudes.",
        "Son visibles a simple vista en el campo sin necesidad de extraer muestras biológicas.",
        "Cambian de patrón según la estación del año y solo pueden medirse en frutos maduros.",
        "Modifican el sabor del fruto para que sea más dulce."
      ],
      "correct": 0,
      "exp": "Los marcadores moleculares son neutros frente al ambiente, independientes del tejido y estadio ontogenético (evaluables en plántulas recién germinadas) y poseen un poder de discriminación casi ilimitado."
    },
    {
      "id": 28,
      "sub": 5,
      "q": "¿Qué es un mapa genético y qué significa exactamente que un marcador molecular y un gen de interés agronómico están 'estrechamente ligados'?",
      "options": [
        "Significa que ambos tienen una frecuencia de recombinación del 99% en cada meiosis.",
        "Un mapa genético muestra la distribución lineal ordenada de genes y marcadores a lo largo de los cromosomas; estar estrechamente ligados significa que el marcador y el gen diana se localizan tan próximos físicamente en el mismo cromosoma que tienden a segregarse juntos durante los sobrecruzamientos de la meiosis, con una frecuencia de recombinación mínima.",
        "Significa que el marcador impide la transcripción del gen diana mediante metilación de histonas.",
        "Es un mapa geográfico de bancos de semillas; estar ligados significa que están en cromosomas distintos."
      ],
      "correct": 1,
      "exp": "El ligamiento genético implica proximidad física en el mismo cromosoma, de modo que marcador y gen se segregan juntos en la meiosis con una frecuencia de recombinación mínima."
    },
    {
      "id": 29,
      "sub": 5,
      "q": "¿Cuál es el fundamento y la gran ventaja operativa de la Selección Asistida por Marcadores (MAS, Marker-Assisted Selection) en mejora genética?",
      "options": [
        "Sustituye por completo la necesidad de que exista ligamiento genético en el cromosoma.",
        "Consiste en exponer miles de árboles adultos a una plaga letal durante 10 años en el campo.",
        "Consiste en insertar el marcador dentro del genoma mediante bacterias Agrobacterium.",
        "Cuando un marcador molecular está fuertemente ligado a un gen de interés, la selección directa del marcador en el laboratorio equivale a la selección indirecta del gen deseado; permite analizar miles de plántulas jóvenes extrayendo ADN de una porción de hoja y descartar en pocos días las que no portan el alelo deseado, sin esperar a que crezcan, maduren o sean expuestas a la plaga."
      ],
      "correct": 3,
      "exp": "En MAS, seleccionar directamente el marcador ligado equivale a seleccionar indirectamente el gen de interés, permitiendo cribar miles de plántulas jóvenes en pocos días a partir de una porción de hoja."
    },
    {
      "id": 30,
      "sub": 5,
      "q": "Enuncia la 'Regla de oro' de la Selección Asistida por Marcadores (MAS):",
      "options": [
        "Cuanto más lejos estén el marcador y el gen en cromosomas distintos, más fiable será la selección.",
        "Solo pueden usarse marcadores situados en el ADN mitocondrial.",
        "Cuanto más corta sea la distancia física y genética entre el marcador molecular y el gen diana, menor será la tasa de recombinación y más eficiente y fiable será la selección asistida.",
        "Todo marcador debe cortarse obligatoriamente con HaeIII para generar extremos romos."
      ],
      "correct": 2,
      "exp": "Regla de oro del MAS: cuanto más corta sea la distancia física y genética entre el marcador molecular y el gen diana, menor será la tasa de recombinación y más eficiente y fiable será la selección asistida."
    }
  ],
  "tema4": [
    {
      "id": 1,
      "sub": 1,
      "q": "¿Qué se entiende por cultivo in vitro de tejidos vegetales, qué es un explante y qué son los protoplastos?",
      "options": [
        "Los explantes son bacterias simbióticas y los protoplastos son cloroplastos aislados.",
        "Es el cultivo de cualquier parte de la planta (explante: hojas, tallos, raíces, meristemos, etc.) bajo condiciones controladas de luz, temperatura y nutrientes en un medio de cultivo en condiciones asépticas. Los protoplastos son células a las que se les ha eliminado la pared celular, permitiendo realizar fusiones celulares o de orgánulos.",
        "Es el cultivo exclusivo de raíces en oscuridad sin nutrientes ni asepsia.",
        "Es el cultivo de semillas en campo abierto; los protoplastos son paredes celulares lignificadas."
      ],
      "correct": 1,
      "exp": "El cultivo in vitro cultiva explantes (hojas, tallos, raíces, meristemos...) en condiciones controladas y asépticas; los protoplastos son células sin pared celular aptas para fusiones celulares o de orgánulos."
    },
    {
      "id": 2,
      "sub": 1,
      "q": "¿Cuáles son los 6 elementos e instalaciones fundamentales que se necesitan en el laboratorio para llevar a cabo el cultivo in vitro?",
      "options": [
        "Secuenciadores Illumina, sondas radiactivas y nitrógeno líquido.",
        "Tierra de jardín, macetas de barro, invernadero abierto, abono orgánico, agua de lluvia y luz solar.",
        "Únicamente un termociclador PCR y una cubeta de electroforesis de agarosa.",
        "1) Material vegetal (explantes sanos y seleccionados), 2) Recipientes adecuados, 3) Medios de cultivo nutritivos, 4) Zona de manipulación en asepsia (cabinas de flujo laminar), 5) Fitotrón o cámara de cultivo, y 6) Aparataje de esterilización/limpieza (autoclaves, filtros y desinfectantes)."
      ],
      "correct": 3,
      "exp": "Se requieren: material vegetal sano, recipientes, medios de cultivo, cabinas de flujo laminar (asepsia), fitotrón y aparataje de esterilización (autoclaves, filtros, desinfectantes)."
    },
    {
      "id": 3,
      "sub": 1,
      "q": "¿Qué componentes esenciales incorpora la preparación de un medio de cultivo vegetal in vitro y por qué es indispensable la sacarosa?",
      "options": [
        "Solo agua del grifo y arena; la sacarosa sirve únicamente como conservante contra hongos.",
        "Únicamente hormonas animales y antibióticos sin ninguna fuente de carbono.",
        "Sales minerales (macro y micronutrientes esenciales), Sacarosa (como fuente de carbono y energía para los explantes), Agua de máxima pureza (destilada/desionizada), y Agar / Vitaminas / Reguladores de crecimiento (agentes gelificantes, suplementos vitamínicos y fitohormonas).",
        "ADN polimerasa, dNTPs y bromuro de etidio."
      ],
      "correct": 2,
      "exp": "Los medios incorporan sales minerales (macro y micronutrientes), sacarosa (fuente de carbono y energía), agua pura (destilada/desionizada), agar (gelificante), vitaminas y reguladores de crecimiento."
    },
    {
      "id": 4,
      "sub": 1,
      "q": "Al seleccionar los recipientes de cultivo in vitro, ¿qué cuatro factores deben considerarse y por qué son importantes las tapas?",
      "options": [
        "Deben estar sellados al vacío herméticamente sin permitir nunca el paso de gases.",
        "Color, precio, peso y opacidad total para impedir cualquier intercambio de gases.",
        "Material (cristal o plástico), Volumen (adaptado al tipo y tamaño del explante), Forma (ergonómica y funcional) y Ventilación (tapas con permeabilidad controlada para permitir el intercambio de gases).",
        "Deben estar abiertos completamente al aire del laboratorio sin tapa."
      ],
      "correct": 2,
      "exp": "Se consideran Material (cristal/plástico), Volumen, Forma y Ventilación (tapas con permeabilidad controlada para el intercambio gaseoso)."
    },
    {
      "id": 5,
      "sub": 1,
      "q": "¿Qué es un fitotrón (cámara de cultivo) y qué tres parámetros ambientales controla estrictamente?",
      "options": [
        "Es la cabina donde se esterilizan las herramientas con vapor a alta presión.",
        "Es el habitáculo acondicionado para el cultivo de las plantas que controla estrictamente: Temperatura (adaptada a las necesidades fisiológicas), Humedad (niveles constantes para prevenir la deshidratación) y Fotoperiodo (alternancia de horas de luz y oscuridad con intensidad adecuada).",
        "Es un microscopio electrónico para contar cromosomas.",
        "Es una centrífuga refrigerada que controla pH, salinidad y presión osmótica."
      ],
      "correct": 1,
      "exp": "El fitotrón controla estrictamente Temperatura, Humedad constante y Fotoperiodo (alternancia luz/oscuridad e intensidad)."
    },
    {
      "id": 6,
      "sub": 1,
      "q": "¿Qué equipo se utiliza para esterilizar los medios y materiales de cultivo y con qué analogía se describe en el Subtema 1?",
      "options": [
        "Un baño ultrasónico con alcohol de 70° a temperatura ambiente.",
        "La cabina de flujo laminar, descrita como un 'horno microondas doméstico'.",
        "El fitotrón, que esteriliza a -80 °C en seco.",
        "La autoclave, que funciona de manera similar a una 'lavadora de laboratorio', esterilizando los materiales mediante vapor a alta presión y temperatura."
      ],
      "correct": 3,
      "exp": "La autoclave funciona como una 'lavadora de laboratorio', esterilizando mediante vapor a alta presión y temperatura."
    },
    {
      "id": 7,
      "sub": 2,
      "q": "¿En qué consiste la técnica del 'rescate de embriones' descrita en el Subtema 2 y cuándo se aplica en mejora genética?",
      "options": [
        "En extraer embriones de semillas secas comerciales que germinan sin problemas en el campo.",
        "Al cruzar dos plantas (ej. una con resistencia a virus y otra con frutos de alta calidad), a veces el cruce no prospera porque el embrión aborta antes de desarrollarse; entonces el embrión se recupera in vitro (rescate de embriones) y se conserva en un banco de germoplasma para estudios o futuros intentos de regeneración.",
        "En aplicar termoterapia a semillas adultas de maíz MON810.",
        "En destruir el embrión zigótico mediante biobalística para obtener hojas sin raíces."
      ],
      "correct": 1,
      "exp": "El rescate de embriones permite recuperar in vitro embriones procedentes de cruces de mejora (ej. resistencia a virus × alta calidad de fruto) que de otro modo abortarían antes de desarrollarse."
    },
    {
      "id": 8,
      "sub": 2,
      "q": "Describe el mecanismo de transformación genética vegetal mediado por la bacteria Agrobacterium tumefaciens (texto y Figura 1 del Subtema 2):",
      "options": [
        "La bacteria degrada el núcleo de la planta y lo sustituye por su propio cromosoma circular completo.",
        "Consiste en disparar bacterias muertas a alta velocidad mediante helio comprimido.",
        "Agrobacterium tumefaciens actúa como un vector biológico natural: se extrae su plásmido Ti, se corta la región T-DNA con una restrictasa y se inserta el gen foráneo; el plásmido Ti recombinante se reintroduce en la bacteria, la cual transfiere e integra el T-DNA con el gen foráneo en el cromosoma de la célula vegetal cultivada in vitro, regenerando una planta clonada transgénica.",
        "Solo funciona fusionando protoplastos sin necesidad de plásmidos ni de T-DNA."
      ],
      "correct": 2,
      "exp": "Agrobacterium tumefaciens es un vector biológico natural que transfiere la región T-DNA de su plásmido Ti recombinante al cromosoma de la célula vegetal."
    },
    {
      "id": 9,
      "sub": 2,
      "q": "¿En qué consiste el método de transformación genética por 'Cañón de partículas' (Biobalística)?",
      "options": [
        "En usar ultrasonidos para eliminar los cloroplastos de la hoja.",
        "En sumergir las hojas en colchicina durante 48 horas.",
        "En el bombardeo de tejidos o células vegetales con micropartículas recubiertas de ADN que codifica los genes deseados, las cuales penetran en la célula e integran el ADN en los cromosomas nucleares, regenerando luego la planta a partir del callo.",
        "En infectar las raíces con virus bacteriófagos en medio líquido."
      ],
      "correct": 2,
      "exp": "La biobalística (cañón de partículas) bombardea los explantes con micropartículas recubiertas de ADN para integrarlo en el genoma nuclear vegetal."
    },
    {
      "id": 10,
      "sub": 2,
      "q": "Dentro de las aplicaciones de la Biotecnología Vegetal, ¿qué diferencia existe entre estreses bióticos y abióticos, y qué son la fitorremediación, las plantas-vacuna y las plantas biorreactores?",
      "options": [
        "Las plantas biorreactores solo sirven para producir madera para papel.",
        "La fitorremediación consiste en curar virosis mediante termoterapia en meristemos.",
        "Bióticos son la sequía y las heladas; abióticos son los virus y hongos.",
        "Estreses bióticos son plagas, hongos, virus y bacterias; estreses abióticos son sequía, salinidad y heladas. La fitorremediación limpia suelos contaminados; las plantas-vacuna producen antígenos; y las plantas como biorreactores producen metabolitos secundarios y proteínas de interés farmacéutico o industrial."
      ],
      "correct": 3,
      "exp": "Bióticos: plagas, hongos, virus, bacterias. Abióticos: sequía, salinidad, heladas. Fitorremediación: limpieza de suelos contaminados. Plantas-vacuna: antígenos. Biorreactores: metabolitos secundarios y proteínas farmacéuticas/industriales."
    },
    {
      "id": 11,
      "sub": 2,
      "q": "Según los datos oficiales del Subtema 2 (informe ISAAA), ¿cuántas hectáreas de transgénicos se cultivaron en España en 2016, qué variedad se cultivó y qué variación supuso respecto a 2015?",
      "options": [
        "En 2016 se cultivaron en España 129.081 hectáreas con el maíz transgénico MON810 (creado por la multinacional Monsanto), lo que representó un aumento del 19,8% respecto a la extensión cultivada en 2015 según el balance anual de ISAAA.",
        "Se cultivaron 1.000.000 de hectáreas de tomate Cnr transgénico.",
        "Se cultivaron 5.000 hectáreas de soja transgénica, un 50% menos que en 2015.",
        "En España está prohibido cualquier cultivo transgénico desde el año 2000."
      ],
      "correct": 0,
      "exp": "En 2016 se cultivaron en España 129.081 ha de maíz transgénico MON810 (Monsanto), un aumento del 19,8% respecto a 2015 según ISAAA."
    },
    {
      "id": 12,
      "sub": 2,
      "q": "¿Cuál es el criterio de bioseguridad ambiental fundamental mencionado al final del Subtema 2 respecto a los cultivos transgénicos?",
      "options": [
        "Cultivarlos exclusivamente en los centros de origen biodiverso para que se crucen con todas las especies silvestres.",
        "Es bueno no introducir transgénicos en las zonas de origen de los cultivos donde pueden hibridar con plantas silvestres relacionadas.",
        "Regar los cultivos transgénicos únicamente con antibióticos.",
        "Cosechar las plantas antes de que realicen la fotosíntesis."
      ],
      "correct": 1,
      "exp": "Criterio de bioseguridad ambiental: no introducir transgénicos en las zonas de origen de los cultivos donde puedan hibridar con plantas silvestres relacionadas."
    },
    {
      "id": 13,
      "sub": 3,
      "q": "[Pregunta de Examen Subtema 3] ¿En qué consiste la micropropagación, para qué se utiliza a escala comercial y qué ventajas tiene respecto a la propagación vegetativa tradicional?",
      "options": [
        "Es más lenta que la propagación in vivo y requiere miles de hectáreas de suelo agrícola.",
        "Consiste en cruzar polen de distintas especies para obtener híbridos heterogéneos en grandes campos.",
        "Consiste en la obtención in vitro de clones (plantas genotípicamente idénticas a la planta de partida). Se usa comercialmente en ornamentales (orquídeas, clavel) y portainjertos de frutales (pies de melocotonero). Ventajas: 1) Mayor tasa de multiplicación en el mismo tiempo (acorta tiempo e incrementa rendimiento), 2) Gran cantidad de plantas en espacio reducido, 3) Control del estado sanitario, y 4) Mejor planificación y distribución.",
        "Solo sirve para obtener semillas sexuales con alta variabilidad genética."
      ],
      "correct": 2,
      "exp": "La micropropagación produce clones genotípicamente idénticos in vitro (ej. orquídeas, clavel, portainjertos de melocotonero), ofreciendo mayor tasa de multiplicación, ahorro de espacio, control sanitario y mejor planificación."
    },
    {
      "id": 14,
      "sub": 3,
      "q": "[Pregunta de Examen Subtema 3] ¿Qué es la totipotencia celular y qué dos grandes factores influyen decisivamente en la capacidad de regeneración in vitro?",
      "options": [
        "Todos los genotipos de todas las especies responden exactamente igual al mismo medio de cultivo.",
        "Es la capacidad de las bacterias para infectar hojas; depende solo de la sacarosa.",
        "La totipotencia es la capacidad de las células vegetales para, bajo condiciones determinadas, desdiferenciarse y reorganizarse de nuevo para formar una planta completa (por vía organogénica o embriogénica). Los dos factores clave son: 1) El balance adecuado de reguladores de crecimiento (auxinas y citoquininas) y 2) El genotipo de la planta (control multigénico).",
        "Es la muerte celular programada; depende solo del tamaño del frasco de vidrio."
      ],
      "correct": 2,
      "exp": "La totipotencia celular permite a las células vegetales desdiferenciarse y regenerar una planta completa. Depende del balance hormonal (auxinas/citoquininas) y del genotipo (control multigénico, requiriendo desarrollo empírico de protocolos)."
    },
    {
      "id": 15,
      "sub": 3,
      "q": "[Pregunta de Examen Subtema 3] En la Fase 0 de la micropropagación, ¿por qué se analizan los materiales de partida y cómo se realiza el saneamiento si la planta madre tiene virus?",
      "options": [
        "Se sanea añadiendo 2,4-D a las raíces de la planta en el campo.",
        "Si tiene virus se aplica autoclave directamente a la planta viva a 121 °C.",
        "No es necesario analizar la planta madre porque el agar mata todos los virus automáticamente.",
        "Se analizan para determinar su estado sanitario y descartar que sean portadoras de virosis u otras enfermedades. Si están infectadas, se procede al saneamiento mediante el cultivo de meristemos, combinado en algunos casos con tratamientos térmicos (termoterapia) de la planta original."
      ],
      "correct": 3,
      "exp": "En la Fase 0 se analiza el estado sanitario para descartar virosis; el saneamiento libre de virus se realiza mediante cultivo de meristemos combinado en algunos casos con termoterapia."
    },
    {
      "id": 16,
      "sub": 3,
      "q": "¿Qué se realiza en la Fase 1 (Establecimiento del cultivo in vitro) y qué ocurre si la desinfección del material no se ha realizado correctamente?",
      "options": [
        "Se bombardea la yema con micropartículas de oro.",
        "Se desinfectan las yemas de la planta sana procedente de campo o invernadero antes de introducirlas en los recipientes con medio de cultivo; si la desinfección no se ha realizado correctamente, aparecerán a los pocos días hongos y/o bacterias en el medio.",
        "Se trasplanta directamente al campo; si falla, la planta florece antes de tiempo.",
        "Se induce el enraizamiento con auxinas en túneles de riego."
      ],
      "correct": 1,
      "exp": "En la Fase 1 se desinfectan las yemas e introducen in vitro; una desinfección deficiente se detecta porque a los pocos días proliferan hongos y/o bacterias en el medio."
    },
    {
      "id": 17,
      "sub": 3,
      "q": "[Pregunta de Examen Subtema 3] En la Fase 2 (Multiplicación), ¿qué reguladores se añaden para generar nuevos brotes, qué es la variación somaclonal y con qué dos técnicas se comprueba la fidelidad genética de los clones?",
      "options": [
        "Se añaden citoquininas para generar nuevos brotes y aumentar la tasa de multiplicación. Si se usa regeneración adventicia con formación previa de callo, aumenta la probabilidad de variación somaclonal (cambios genéticos derivados del cultivo in vitro). La similitud con la planta inicial se comprueba mediante citometría de flujo (cambios en el número de cromosomas) y marcadores moleculares (cambios en el ADN).",
        "Se añade etileno; la variación somaclonal se mide con un termómetro.",
        "La formación de callo garantiza al 100% que jamás ocurrirá variación somaclonal.",
        "La citometría de flujo sirve para desinfectar hongos y bacterias del medio."
      ],
      "correct": 0,
      "exp": "Las citoquininas estimulan la brotación en Fase 2. El paso por callo incrementa la variación somaclonal, la cual se controla mediante citometría de flujo (ploidía/número cromosómico) y marcadores moleculares (ADN)."
    },
    {
      "id": 18,
      "sub": 3,
      "q": "¿Cómo se lleva a cabo la Fase 3 (Enraizamiento) de las plantas obtenidas en la fase de multiplicación?",
      "options": [
        "Cortando el meristemo apical y aplicando termoterapia.",
        "Transfiriendo las plantas a un medio de cultivo distinto que contenga reguladores de crecimiento de tipo auxina que induzcan la formación de raíces, o bien enraizándolas durante la aclimatación en túneles de enraizado utilizando auxinas en la solución de riego.",
        "Manteniendo los brotes en oscuridad total sin hormonas ni nutrientes durante un año.",
        "Transfiriendo las plantas a un medio con altas dosis de citoquininas para inhibir las raíces."
      ],
      "correct": 1,
      "exp": "El enraizamiento (Fase 3) se induce transfiriendo a un medio con auxinas o en túneles de enraizado aplicando auxinas en la solución de riego."
    },
    {
      "id": 19,
      "sub": 3,
      "q": "[Pregunta de Examen Subtema 3] ¿En qué consiste la Fase 4 (Aclimatación) y por qué moriría una planta si se pasa directamente de in vitro a condiciones in vivo?",
      "options": [
        "Consiste en añadir más sacarosa y agar en el campo abierto.",
        "Consiste en meter la planta en la autoclave; moriría por exceso de fotosíntesis in vitro.",
        "Las plantas in vitro ya tienen regulación estomática perfecta y máxima fotosíntesis dentro del tubo.",
        "La transferencia directa in vitro → in vivo causaría la muerte de la planta porque in vitro vive con humedad y temperatura muy controladas y nutrición suministrada. La aclimatación cambia paulatinamente las condiciones ambientales y nutricionales (cubriéndolas al inicio con vasos o campanas para mantener la humedad) para que la planta aumente su capacidad fotosintética, ejerza la regulación estomática y se fortalezca."
      ],
      "correct": 3,
      "exp": "La aclimatación adapta paulatinamente la plántula (usando inicialmente vasos o campanas de humedad) para que active su regulación estomática y aumente su capacidad fotosintética antes de ir a campo o invernadero."
    },
    {
      "id": 20,
      "sub": 3,
      "q": "Según la tabla de la Figura 2 del Subtema 3, clasifica correctamente cuáles de estos reguladores son Auxinas y cuáles son Citoquininas:",
      "options": [
        "El 2,4-D es una citoquinina y el TDZ es una auxina de enraizamiento.",
        "Tipo auxina: Ácido 3-indolacético (IAA), Ácido 1-naftalenacético (NAA), Ácido 3-indolbutírico (IBA) y Ácido 2,4-diclorofenoxiacético (2,4-D). Tipo citoquinina: Zeatina (Z), 6-Bencil aminopurina (BA), Isopentil adenina (IP), Kinetina (K) y Tidiazurón (TDZ).",
        "Auxinas: Zeatina, Kinetina y BA. Citoquininas: IAA, NAA, IBA y 2,4-D.",
        "Todos son citoquininas sintéticas salvo la sacarosa."
      ],
      "correct": 1,
      "exp": "Auxinas: IAA, NAA, IBA y 2,4-D. Citoquininas: Zeatina (Z), 6-Bencil aminopurina (BA), Isopentil adenina (IP), Kinetina (K) y Tidiazurón (TDZ)."
    },
    {
      "id": 21,
      "sub": 4,
      "q": "¿Cómo se define la morfogénesis en cultivo in vitro y a qué hace referencia el término 'regeneración adventicia'?",
      "options": [
        "La regeneración adventicia solo ocurre a partir de embriones cigóticos obtenidos por fecundación.",
        "La morfogénesis es la formación o génesis de órganos y comprende el crecimiento y la diferenciación celular. La regeneración adventicia es la que se produce a partir de un lugar que no es el común en el desarrollo de una planta (ej. un segmento de hoja), y en cultivo in vitro generalmente hace referencia a meristemos adventicios obtenidos por la vía organogénica.",
        "Morfogénesis es la senescencia foliar; regeneración adventicia es la germinación normal de una semilla.",
        "Morfogénesis es la lisis enzimática de la pared celular para obtener protoplastos."
      ],
      "correct": 1,
      "exp": "Morfogénesis es la génesis de órganos (crecimiento + diferenciación). Regeneración adventicia ocurre en un lugar no común (ej. segmento de hoja) y suele referirse a meristemos adventicios por vía organogénica."
    },
    {
      "id": 22,
      "sub": 4,
      "q": "¿Qué es la organogénesis y qué es la embriogénesis somática en cultivo in vitro?",
      "options": [
        "En la organogénesis se diferencian meristemos a partir de las células o tejidos cultivados (un meristemo apical da lugar a una planta). En la embriogénesis se generan embriones somáticos (ES) a partir de células somáticas en cultivo, que siguen las mismas etapas que los embriones cigóticos pero NO son el resultado de la fecundación de los gametos.",
        "Ambas rutas son idénticas y requieren los mismos medios de cultivo en todas sus fases.",
        "Los embriones somáticos son haploides porque proceden de la unión de dos granos de polen.",
        "La organogénesis produce embriones cigóticos por fecundación; la embriogénesis produce únicamente raíces aisladas."
      ],
      "correct": 0,
      "exp": "Organogénesis diferencia meristemos (tallos/raíces); embriogénesis somática genera embriones somáticos (ES) a partir de células somáticas sin fecundación de gametos."
    },
    {
      "id": 23,
      "sub": 4,
      "q": "¿Cuál es la diferencia fundamental para distinguir experimentalmente la organogénesis de la embriogénesis somática?",
      "options": [
        "En la organogénesis el tallo y la raíz nacen a la vez; en la embriogénesis nacen por separado.",
        "En la organogénesis los brotes pasan por las fases de corazón y torpedo.",
        "En la embriogénesis nunca se forma radícula.",
        "En la organogénesis la producción de tallos y raíces es independiente (primero se induce el tallo y posteriormente requiere una inducción separada para generar las raíces); en la embriogénesis, los embriones somáticos germinan dando lugar a un tallo y una radícula simultáneamente, al igual que ocurre con una semilla."
      ],
      "correct": 3,
      "exp": "Diferencia clave: en organogénesis la formación de tallos y raíces es independiente (secuencial); en embriogénesis somática el embrión germina dando tallo y radícula simultáneamente (estructura bipolar como una semilla)."
    },
    {
      "id": 24,
      "sub": 4,
      "q": "¿Cuándo se dice que un proceso morfogenético (organogénico o embriogénico) es DIRECTO y cuándo es INDIRECTO?",
      "options": [
        "Directo significa enraizar en tierra e indirecto enraizar en agar.",
        "Directo cuando usa luz solar e indirecto cuando usa lámparas fluorescentes en el fitotrón.",
        "Es directo cuando los tallos o embriones se producen directamente a partir de los tejidos de partida del explante; es indirecto cuando la regeneración de tallos o embriones se produce tras un crecimiento desorganizado previo del tejido que denominamos callo (en la embriogénesis es más frecuente el proceso indirecto, aunque también puede ser directo).",
        "En la embriogénesis somática está demostrado que jamás puede existir una vía indirecta con callo."
      ],
      "correct": 2,
      "exp": "Directo: directamente desde el tejido del explante sin callo. Indirecto: pasando previamente por una fase proliferativa desorganizada de callo."
    },
    {
      "id": 25,
      "sub": 4,
      "q": "¿Con qué reguladores de crecimiento se suele inducir la organogénesis y con cuál en concreto se suele inducir la embriogénesis somática?",
      "options": [
        "Organogénesis con ácido giberélico; embriogénesis únicamente con zeatina.",
        "Ambas se inducen exclusivamente con agua destilada y sacarosa sin fitohormonas.",
        "Para inducir organogénesis se suelen utilizar reguladores de tipo auxina combinados con reguladores de tipo citoquinina; para inducir embriogénesis se suelen utilizar auxinas y en concreto el 2,4-D (ácido 2,4-diclorofenoxiacético), estableciendo las concentraciones empíricamente.",
        "La embriogénesis se induce con colchicina y la organogénesis con EMS."
      ],
      "correct": 2,
      "exp": "Organogénesis: combinación de auxina + citoquinina. Embriogénesis somática: auxinas, y en concreto el 2,4-D (ácido 2,4-diclorofenoxiacético)."
    },
    {
      "id": 26,
      "sub": 4,
      "q": "¿Cuáles son, en orden cronológico exacto, las 4 fases de desarrollo embrionario por las que pasa un embrión somático antes de germinar?",
      "options": [
        "1. Fase globular → 2. Fase de corazón → 3. Fase de torpedo → 4. Fase cotiledonar (al igual que un embrión cigótico, hasta germinar originando una planta completa).",
        "1. Fase de callo, 2. Fase de meristemo, 3. Fase de estolón y 4. Fase de tubérculo.",
        "1. Fase cotiledonar → 2. Fase de torpedo → 3. Fase globular → 4. Fase de corazón.",
        "1. Fase de semilla, 2. Fase de hoja, 3. Fase de flor y 4. Fase de fruto."
      ],
      "correct": 0,
      "exp": "Las 4 etapas del desarrollo embrionario somático (y cigótico) son: 1. Fase globular, 2. Fase de corazón, 3. Fase de torpedo y 4. Fase cotiledonar."
    },
    {
      "id": 27,
      "sub": 4,
      "q": "Según las fotografías experimentales del Subtema 4 (Figuras 1 y 2), relaciona cada especie vegetal con el ejemplo morfogenético ilustrado:",
      "options": [
        "Zanahoria: organogénesis directa; Calabacín: embriogénesis indirecta.",
        "El pimiento se regenera sin pasar por callo y el calabacín solo forma raíces.",
        "Todas las fotografías corresponden a maíz transgénico MON810.",
        "Zanahoria: callo embriogénico y embriones somáticos germinados tras 3 semanas; Pimiento: organogénesis indirecta (callo con yemas obtenido de explante de cotiledón y planta desarrollada para cortar y enraizar); Calabacín: organogénesis directa a partir de cotiledones; Berenjena: organogénesis indirecta a partir de cotiledones."
      ],
      "correct": 3,
      "exp": "Figura 1: A-B) Callo embriogénico y embriones germinados de zanahoria (3 semanas); C-D) Organogénesis en cotiledón de pimiento vía callo. Figura 2: Organogénesis directa en cotiledón de calabacín (A) e indirecta en berenjena (B)."
    },
    {
      "id": 28,
      "sub": 4,
      "q": "¿Por qué los medios y condiciones necesarios para conseguir plantas completas por organogénesis o por embriogénesis son muy distintos tras la inducción inicial?",
      "options": [
        "Porque la embriogénesis requiere añadir bacterias Agrobacterium en cada etapa.",
        "Porque los embriones somáticos no necesitan nutrientes ni luz para germinar.",
        "Porque la organogénesis ocurre fuera de los frascos de cultivo.",
        "Porque no son procesos similares: en la organogénesis se forma un meristemo apical que requiere condiciones para crecer y dar tallos que luego deben aislarse y enraizarse por separado; mientras que en la embriogénesis los embriones necesitan desarrollarse pasando por las 4 fases (globular, corazón, torpedo y cotiledonar) hasta germinar como una planta completa."
      ],
      "correct": 3,
      "exp": "En organogénesis hay que elongar los tallos desde el meristemo apical y luego inducir su enraizamiento separadamente; en embriogénesis hay que acompañar la maduración del embrión por sus 4 etapas hasta su germinación bipolar."
    }
  ],
  "tema4OfficialTest": [
    {
      "id": 101,
      "sub": 3,
      "letter": "a",
      "q": "La micropropagación de plantas tiene como finalidad:",
      "options": [
        "Obtener plantas de interés agrícola",
        "Obtener plantas de interés ornamental",
        "Obtener plantas de interés forestal",
        "Todas las anteriores"
      ],
      "correct": 3,
      "exp": "La micropropagación in vitro permite multiplicar masivamente clones de élite en el ámbito agrícola (frutales, hortícolas), ornamental (orquídeas, claveles) y forestal (eucalipto, coníferas)."
    },
    {
      "id": 102,
      "sub": 3,
      "letter": "b",
      "q": "En la etapa de establecimiento de un cultivo in vitro:",
      "options": [
        "Se eliminan los microorganismos presentes",
        "Se seleccionan los explantes",
        "Se esterilizan los explantes",
        "Todas las anteriores"
      ],
      "correct": 3,
      "exp": "La fase 1 (establecimiento) incluye la selección rigurosa del explante inicial, su desinfección superficial con agentes esterilizantes y la eliminación de contaminantes fúngicos y bacterianos."
    },
    {
      "id": 103,
      "sub": 4,
      "letter": "c",
      "q": "En la transformación genética in vitro podemos regenerar plantas a partir de:",
      "options": [
        "Meristemos",
        "Protoplastos",
        "Células embrionarias",
        "Todas las anteriores"
      ],
      "correct": 3,
      "exp": "Gracias a la totipotencia vegetal, la regeneración in vitro es factible a partir de meristemos, protoplastos (mediante fusión o electroporación) y células de callo o embriones somáticos."
    },
    {
      "id": 104,
      "sub": 1,
      "letter": "d",
      "q": "Para la esterilización de los cultivos y medios se utiliza:",
      "options": [
        "Autoclave",
        "Mechero",
        "Microondas",
        "Ninguna de las anteriores"
      ],
      "correct": 0,
      "exp": "La autoclave es el equipo esencial de esterilización por calor húmedo (vapor a alta presión y temperatura, típicamente 121 °C durante 15-20 minutos) para medios y material de laboratorio."
    },
    {
      "id": 105,
      "sub": 1,
      "letter": "e",
      "q": "Una de las siguientes técnicas de cultivo in vitro es:",
      "options": [
        "Cultivo de tejidos",
        "Cultivo de órganos",
        "Cultivo de células",
        "Todas las anteriores"
      ],
      "correct": 3,
      "exp": "El cultivo in vitro engloba el cultivo celular (suspensiones celulares y protoplastos), el cultivo de tejidos (callo) y el cultivo de órganos (yemas, meristemos, anteras, raíces, embriones)."
    },
    {
      "id": 106,
      "sub": 2,
      "letter": "f",
      "q": "Una de las siguientes técnicas de transformación de plantas con ayuda de bacterias lleva el nombre de una bacteria:",
      "options": [
        "Agrobacterium tumefaciens",
        "Bacillus thuringiensis",
        "Escherichia coli",
        "Ninguna de las anteriores"
      ],
      "correct": 0,
      "exp": "Agrobacterium tumefaciens es el fitopatógeno natural cuyo plásmido Ti se modifica para transferir el T-DNA portador del gen exógeno al genoma vegetal."
    },
    {
      "id": 107,
      "sub": 2,
      "letter": "g",
      "q": "Una de las siguientes técnicas de transformación de plantas con ayuda de virus lleva el nombre de una familia de virus:",
      "options": [
        "Caulimovirus",
        "Baculovirus",
        "Adenovirus",
        "Ninguna de las anteriores"
      ],
      "correct": 0,
      "exp": "Los Caulimovirus (como el virus del mosaico de la coliflor, CaMV, del que procede el célebre promotor constitutivo 35S) son virus de plantas utilizados como vectores."
    },
    {
      "id": 108,
      "sub": 2,
      "letter": "h",
      "q": "Una de las siguientes técnicas de transformación genética es útil para obtener el chivato (por ejemplo, el gen gus o el gen gfp):",
      "options": [
        "Biobalística",
        "Electroporación",
        "Transformación con Agrobacterium",
        "Todas las anteriores"
      ],
      "correct": 3,
      "exp": "Los genes reporteros o 'chivatos' (GUS que produce color azul con X-Gluc, o GFP que emite fluorescencia verde) pueden introducirse por biobalística, electroporación o Agrobacterium."
    },
    {
      "id": 109,
      "sub": 2,
      "letter": "i",
      "q": "Una de las siguientes técnicas de transformación genética es útil para obtener plantas transgénicas:",
      "options": [
        "Biobalística",
        "Electroporación",
        "Transformación con Agrobacterium",
        "Todas las anteriores"
      ],
      "correct": 3,
      "exp": "Tanto la transformación biológica con Agrobacterium como los métodos físicos directos (biobalística con cañón de partículas y electroporación) generan plantas transgénicas."
    },
    {
      "id": 110,
      "sub": 2,
      "letter": "j",
      "q": "La biobalística, biolística o disparo de genes es una técnica de transformación genética:",
      "options": [
        "Solo útil para plantas dicotiledóneas",
        "Solo útil para plantas monocotiledóneas",
        "Solo útil para plantas ornamentales",
        "Es útil para plantas monocotiledóneas y dicotiledóneas"
      ],
      "correct": 3,
      "exp": "La biobalística es un método físico universal que supera la barrera de hospedador de Agrobacterium, siendo plenamente aplicable tanto a monocotiledóneas (cereales) como a dicotiledóneas."
    },
    {
      "id": 111,
      "sub": 2,
      "letter": "k",
      "q": "La transformación genética con ayuda de bacterias como Agrobacterium tumefaciens tiene entre otras aplicaciones:",
      "options": [
        "Obtener plantas transgénicas",
        "Obtener plantas ornamentales",
        "Obtener plantas forestales",
        "Todas las anteriores"
      ],
      "correct": 3,
      "exp": "Agrobacterium tumefaciens se emplea comercialmente para generar plantas transgénicas con resistencia a plagas/herbicidas, así como variedades ornamentales con colores novedosos y especies forestales con madera mejorada."
    }
  ]
};

const BIOGENLAB_CODEX_DATA = [
  {
    "topic": 1,
    "topicName": "Genética y Genómica",
    "tag": "Historia",
    "term": "Friedrich Miescher (1871) y la Nucleína",
    "desc": "Aisló por primera vez en 1871 del núcleo de células de pus (leucocitos) una sustancia ácida rica en fósforo y nitrógeno a la que denominó 'nucleína', término que dio origen a 'ácido nucleico'."
  },
  {
    "topic": 1,
    "topicName": "Genética y Genómica",
    "tag": "Bioquímica",
    "term": "Enlace N-glucosídico vs Enlace Fosfodiéster",
    "desc": "El enlace N-glucosídico une la base nitrogenada con el C1' de la pentosa formando el nucleósido. El enlace fosfodiéster une el grupo fosfato de un nucleótido al C3'-OH del azúcar siguiente, formando el esqueleto azúcar-fosfato antiparalelo con carga negativa neta."
  },
  {
    "topic": 1,
    "topicName": "Genética y Genómica",
    "tag": "Leyes",
    "term": "Leyes de Erwin Chargaff",
    "desc": "En el ADN bicatenario se cumple estrictamente que %A = %T y %G = %C, por lo que la suma de purinas es igual a la de pirimidinas: (A+G) = (T+C) = 50%. La proporción específica (A+T)/(G+C) es constante dentro de una misma especie pero varía entre especies."
  },
  {
    "topic": 1,
    "topicName": "Genética y Genómica",
    "tag": "Laboratorio",
    "term": "Electroforesis en Gel y Colorantes Fluorescentes",
    "desc": "Técnica que separa moléculas de ADN por tamaño molecular a través de una matriz porosa (agarosa o poliacrilamida). El ADN migra hacia el polo positivo (ánodo) por sus fosfatos negativos. Se visualiza con Bromuro de Etidio (EtBr) o SYBR Safe bajo luz ultravioleta."
  },
  {
    "topic": 1,
    "topicName": "Genética y Genómica",
    "tag": "Cromatina",
    "term": "Nucleosoma y Niveles de Compactación",
    "desc": "Primer nivel de empaquetamiento: fibra de 11 nm formada por octámero de histonas (2x H2A, H2B, H3, H4) enrollado por 146 pb de ADN y sellado por H1. Progresa a solenoide (30 nm), bucles sobre andamiaje proteico (300 nm), espiral condensada (700 nm) y cromosoma metafásico (1400 nm)."
  },
  {
    "topic": 1,
    "topicName": "Genética y Genómica",
    "tag": "Epigenética",
    "term": "Eucromatina vs Heterocromatina (Constitutiva y Facultativa)",
    "desc": "La eucromatina está descondensada y es transcripcionalmente activa. La heterocromatina constitutiva está siempre condensada en centrómeros y telómeros. La heterocromatina facultativa alterna reversiblemente según el tejido (ej. Corpúsculo de Barr: inactivación de un cromosoma X en hembras de mamíferos)."
  },
  {
    "topic": 1,
    "topicName": "Genética y Genómica",
    "tag": "Secuenciación",
    "term": "Metodología de Sanger (ddNTPs)",
    "desc": "Método enzimático de secuenciación basado en el uso de 2',3'-dideoxinucleótidos trifosfato (ddNTPs). Al carecer del grupo 3'-OH libre, impiden la formación del enlace fosfodiéster, terminando abruptamente la cadena en la base correspondiente. La lectura de bandas de abajo hacia arriba en el gel da la secuencia sintetizada 5' a 3'."
  },
  {
    "topic": 1,
    "topicName": "Genética y Genómica",
    "tag": "Genómica",
    "term": "Genoma Humano (3.200 Mb) y Elementos Móviles",
    "desc": "El genoma nuclear humano contiene 3.200 Mb. Solo el 1,5% (48 Mb) corresponde a exones codificantes de proteínas. El resto comprende intrones y regiones no traducidas (1.152 Mb) y ADN intergénico (2.000 Mb) rico en transposones (LINE, SINE, LTR, transposones de ADN) y microsatélites."
  },
  {
    "topic": 2,
    "topicName": "De la Mutación al Fenotipo",
    "tag": "Expresión",
    "term": "Transcripción y Polaridad Enzimática",
    "desc": "La ARN polimerasa lee la hebra molde de ADN en sentido 3' → 5' y sintetiza la molécula de ARNm en sentido 5' → 3', incorporando ribonucleótidos complementarios (A→U, T→A, C→G, G→C). La hebra codificante de ADN tiene la misma secuencia que el ARNm (cambiando T por U)."
  },
  {
    "topic": 2,
    "topicName": "De la Mutación al Fenotipo",
    "tag": "Gen Eucariota",
    "term": "Estructura del Gen Eucariota en Mosaico",
    "desc": "Comprende: Promotor y caja TATA (aguas arriba, 5'), región 5' UTR, Exones (codificantes), Intrones (no codificantes, eliminados por splicing), región 3' UTR, señal de poliadenilación y Terminador. Los Enhancers y Silencers modulan a distancia la tasa transcripcional."
  },
  {
    "topic": 2,
    "topicName": "De la Mutación al Fenotipo",
    "tag": "Procesamiento",
    "term": "Splicing, Caperuza 5' Cap y Cola 3' Poli-A",
    "desc": "El corte y empalme (splicing) nuclear retira intrones y empalma exones. El 5' Cap (7-metilguanosina) permite el reconocimiento ribosómico. La cola 3' Poli-A (residuos A) protege contra exonucleasas citoplasmáticas y facilita la exportación activa al citoplasma."
  },
  {
    "topic": 2,
    "topicName": "De la Mutación al Fenotipo",
    "tag": "Mutaciones",
    "term": "Mutaciones Puntuales (Silenciosa, Missense, Nonsense, Frameshift)",
    "desc": "Silenciosa: codón sinónimo sin cambio de aminoácido. Missense: cambio de aminoácido que puede alterar el centro activo o conformación. Nonsense: codón de parada prematuro (UAA, UAG, UGA) originando proteína truncada no funcional. Frameshift: inserción o deleción de nucleótidos no múltiplo de 3 que altera todo el marco de lectura."
  },
  {
    "topic": 2,
    "topicName": "De la Mutación al Fenotipo",
    "tag": "Desarrollo",
    "term": "Mosaicismo Somático vs Mutación Germinal",
    "desc": "La mutación germinal ocurre en gametos o precursores y se transmite al 100% de las células del descendiente (impacto evolutivo). La mutación somática ocurre en el cigoto o blastómeros durante el desarrollo, dando un organismo mosaico con parches celulares genéticamente distintos."
  },
  {
    "topic": 2,
    "topicName": "De la Mutación al Fenotipo",
    "tag": "Biotecnología",
    "term": "Sandías Triploides y Colchicina",
    "desc": "La colchicina bloquea el huso mitótico generando plantas tetraploides (4n). Al cruzarlas con diploides silvestres (2n), se obtienen embriones triploides (3n). En profase I meiótica, los 3 juegos cromosómicos segregan caóticamente provocando esterilidad y frutos sin semillas (apirenia)."
  },
  {
    "topic": 2,
    "topicName": "De la Mutación al Fenotipo",
    "tag": "Genética Inversa",
    "term": "TILLING (Targeting Induced Local Lesions IN Genomes)",
    "desc": "Metodología no-OGM que induce mutaciones puntuales masivas con EMS (Etil metanosulfonato) en semillas y criba mutantes en genes específicos por PCR y digestión/secuenciación, obteniendo variedades comerciales sin restricciones regulatorias de transgénicos."
  },
  {
    "topic": 2,
    "topicName": "De la Mutación al Fenotipo",
    "tag": "Epigenética",
    "term": "Epimutante Tomate Cnr (Colorless non-ripening)",
    "desc": "Descrito por Manning et al. (2006). Frutos incapaces de madurar por hipermetilación del promotor de un factor de transcripción clave. La metilación de ADN y desacetilación de histonas (mediadas por MeCP2 y HDAC) compactan la cromatina; muestra manchas rojas por reversiones espontáneas."
  },
  {
    "topic": 3,
    "topicName": "Marcadores y Diversidad",
    "tag": "Enzimas",
    "term": "Endonucleasas de Restricción (EcoRI, PstI, HaeIII)",
    "desc": "Enzimas bacterianas que reconocen secuencias palindrómicas específicas. EcoRI y PstI cortan de forma escalonada produciendo extremos cohesivos o pegajosos monocatenarios. HaeIII corta en el eje de simetría generando extremos romos."
  },
  {
    "topic": 3,
    "topicName": "Marcadores y Diversidad",
    "tag": "Técnicas",
    "term": "RFLP (Restriction Fragment Length Polymorphism) y Southern Blot",
    "desc": "Detección de variaciones en dianas de restricción. El ADN digerido se separa por tamaño en gel, se transfiere a membrana de nylon/nitrocelulosa (Southern blot) y se hibrida con una sonda marcada específica. Marcador codominante."
  },
  {
    "topic": 3,
    "topicName": "Marcadores y Diversidad",
    "tag": "PCR",
    "term": "Reacción en Cadena de la Polimerasa (PCR)",
    "desc": "Amplificación exponencial in vitro delimitada por dos cebadores específicos. Ciclos de 3 fases: 1) Desnaturalización térmica (94-95 °C), 2) Anillamiento de cebadores (50-65 °C), 3) Extensión por Taq polimerasa a 72 °C. En 'n' ciclos se generan hasta 2^n copias."
  },
  {
    "topic": 3,
    "topicName": "Marcadores y Diversidad",
    "tag": "Polimorfismos",
    "term": "RAPD (Random Amplified Polymorphic DNA)",
    "desc": "Marcadores dominantes generados por PCR con un único cebador decanucleotídico arbitrario que amplifica fragmentos al azar donde existen dianas complementarias en orientación convergente. Útiles para filiación, diversidad genética y consanguinidad."
  },
  {
    "topic": 3,
    "topicName": "Marcadores y Diversidad",
    "tag": "NGS",
    "term": "Secuenciación Masiva Illumina y Detección de SNPs",
    "desc": "Secuenciación por síntesis en microceldas con terminadores reversibles fluorescentes de 4 colores (C=Azul, T=Rojo, A=Verde, G=Amarillo). Permite identificar variaciones de una sola base (SNPs) de alto rendimiento en todo el genoma."
  },
  {
    "topic": 3,
    "topicName": "Marcadores y Diversidad",
    "tag": "Mejora",
    "term": "Selección Asistida por Marcadores (MAS)",
    "desc": "Regla de oro: cuanto más estrechamente ligado esté el marcador molecular al gen de interés agronómico (menor distancia en cM), menor será la tasa de recombinación meiótica y mayor la fiabilidad de seleccionar plántulas tempranas sin esperar al desarrollo fenotípico."
  },
  {
    "topic": 4,
    "topicName": "Cultivo In Vitro",
    "tag": "Fundamentos",
    "term": "Explante, Protoplasto y Totipotencia",
    "desc": "Explante: fragmento de órgano o tejido vegetal aislado para cultivo in vitro. Protoplasto: célula vegetal a la que se le ha retirado la pared celular enzimáticamente. Totipotencia celular: capacidad de una célula vegetal somática de regenerar una planta completa y fértil."
  },
  {
    "topic": 4,
    "topicName": "Cultivo In Vitro",
    "tag": "Equipamiento",
    "term": "Autoclave, Cabina Laminar y Fitotrón",
    "desc": "Autoclave: esterilización por vapor a presión y temperatura (121 °C). Cabina de flujo laminar: aire filtrado estéril con filtros HEPA para manipulación aséptica. Fitotrón: cámara climatizada que regula con precisión temperatura, humedad relativa y fotoperiodo luz/oscuridad."
  },
  {
    "topic": 4,
    "topicName": "Cultivo In Vitro",
    "tag": "Transformación",
    "term": "Agrobacterium tumefaciens y Plásmido Ti",
    "desc": "Bacteria del suelo capaz de transferir naturalmente su T-DNA al genoma de la célula vegetal. En biotecnología vegetal, los oncogenes del plásmido Ti se sustituyen por el gen de interés y un gen de selección para obtener plantas transgénicas estables."
  },
  {
    "topic": 4,
    "topicName": "Cultivo In Vitro",
    "tag": "Transformación",
    "term": "Biobalística (Particle Gun) y Maíz MON810",
    "desc": "Método físico directo que dispara microproyectiles de oro o tungsteno recubiertos de ADN. Aplicable a monocotiledóneas y dicotiledóneas. Permitió desarrollar variedades transgénicas como el maíz MON810 (portador del gen Cry1Ab de Bacillus thuringiensis resistente al taladro del maíz)."
  },
  {
    "topic": 4,
    "topicName": "Cultivo In Vitro",
    "tag": "Micropropagación",
    "term": "Las 5 Fases de la Micropropagación (Fases 0 a 4)",
    "desc": "Fase 0: Selección sanitaria y preparación de la planta madre. Fase 1: Desinfección y establecimiento aséptico del explante. Fase 2: Multiplicación de brotes con citoquininas y control de variación somaclonal. Fase 3: Enraizamiento con auxinas. Fase 4: Aclimatación progresiva a condiciones ex vitro."
  },
  {
    "topic": 4,
    "topicName": "Cultivo In Vitro",
    "tag": "Morfogénesis",
    "term": "Organogénesis vs Embriogénesis Somática",
    "desc": "Organogénesis: desarrollo unipolar sucesivo de órganos (primero tallos inducidos por citoquininas, luego raíces inducidas por auxinas). Embriogénesis somática: desarrollo bipolar simultáneo de tallo y radícula a partir de células somáticas mediante las fases globular, corazón, torpedo y cotiledonar, frecuentemente inducida por 2,4-D."
  }
];

// Exposición explícita a window para compatibilidad global en navegadores
if (typeof window !== 'undefined') {
  window.BIOGENLAB_QUIZ_DATA = BIOGENLAB_QUIZ_DATA;
  window.BIOGENLAB_CODEX_DATA = BIOGENLAB_CODEX_DATA;
}
