// ==========================================================================
// BIOGENLAB SUITE - COMPENDIO Y BIBLIOTECA DE ESTUDIO OFICIAL
// Fuentes Teóricas Originales de la Asignatura Adaptadas con Imágenes Originales
// ==========================================================================

window.STUDY_SOURCES = {
  tema1: {
    id: "tema1",
    volume: "Volumen 1",
    title: "Tema 1: Genética y Genómica en la Biotecnología",
    subtitle: "Fundamentos y Aplicaciones Biotecnológicas",
    badge: "Tema 1 • Genómica Fundamental",
    color: "cyan",
    summary: "Estudio riguroso de la estructura primaria y secundaria del ADN, las leyes de Chargaff, la electroforesis en gel, el empaquetamiento de la cromatina en nucleosomas, la secuenciación clásica de Sanger y de nueva generación (NGS), la paradoja del valor C y la organización del genoma humano (3.200 Mb).",
    sections: [
      {
        id: "t1_sec1",
        number: "1.1",
        title: "La Naturaleza del ADN: Estructura Primaria y Secundaria",
        content: `
          <p class="leading-relaxed text-slate-300">
            <strong>Miescher en 1871</strong> aisló del núcleo de las células de pus una sustancia ácida rica en fósforo que denominó <em>"nucleína"</em>. El término moderno <strong>ácido nucleico</strong> procede históricamente de la nucleína propuesta por Miescher.
          </p>
          <h4 class="text-sm font-bold text-cyan-300 mt-3 mb-1">La Polimerización</h4>
          <p class="leading-relaxed text-slate-300">
            Los nucleótidos son las unidades monoméricas estructurales de los polinucleótidos. Los ácidos nucleicos son macromoléculas formadas por polimerización en cadenas lineales de nucleótidos. Cada nucleótido está constituido por una pentosa (desoxirribosa en el ADN), un grupo fosfato y una base nitrogenada:
          </p>
          <ul class="list-disc pl-5 space-y-1 text-slate-300 mt-2">
            <li><strong>Enlace N-glucosídico:</strong> Une el carbono $1'$ de la desoxirribosa con el nitrógeno de la base nitrogenada (N9 en purinas, N1 en pirimidinas).</li>
            <li><strong>Enlace éster (fosfodiéster):</strong> Une el grupo fosfato con el carbono $5'$ de su propio azúcar y mediante enlace fosfodiéster con el grupo hidroxilo ($-\\text{OH}$) del carbono $3'$ del nucleótido adyacente.</li>
            <li><strong>Bases Púricas (Purinas):</strong> Con anillo doble bicíclico. Incluyen la <strong>Adenina (A)</strong> y la <strong>Guanina (G)</strong>.</li>
            <li><strong>Bases Pirimidínicas (Pirimidinas):</strong> Con anillo simple monocíclico. Incluyen la <strong>Citosina (C)</strong> y la <strong>Timina (T)</strong> en el ADN.</li>
          </ul>
        `,
        images: [
          {
            src: "assets/images/tema1_fig1_nucleotido.jpeg",
            caption: "Figura 1: Estructura química de un nucleótido. Detalle del enlace éster (fosfato-azúcar) y el enlace N-glucosídico (azúcar-base nitrogenada)."
          },
          {
            src: "assets/images/tema1_fig2_bases.jpeg",
            caption: "Figura 2: Fórmulas de las bases púricas (Adenina, Guanina) y pirimidínicas (Citosina, Timina)."
          }
        ]
      },
      {
        id: "t1_sec2",
        number: "1.2",
        title: "Universalidad, Desnaturalización y Renaturalización (Hibridación)",
        content: `
          <p class="leading-relaxed text-slate-300">
            El ADN es una <strong>molécula universal</strong>, lo que significa que su estructura físico-química y composición básica son idénticas en todos los reinos biológicos. Por ello, no importa de qué especie o tejido proceda el ADN: dos hebras independientes pueden <strong>unirse o hibridarse</strong> siempre que sus bases nitrogenadas sean complementarias y estén dispuestas de manera adecuada.
          </p>
          <div class="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 my-3 text-cyan-200">
            <strong>Principio Fundamental: Hibridar = Re-naturalizar</strong><br>
            Las moléculas bicatenarias (bicordales) de ADN pueden <strong>desnaturalizarse</strong> (separarse en sus dos hebras complementarias monocatenarias) mediante la aplicación de calor (≈100 °C) que rompe los puentes de hidrógeno sin romper los enlaces covalentes fosfodiéster. Al disminuir gradualmente la temperatura, las hebras complementarias vuelven a emparejarse (<strong>re-naturalización o hibridación</strong>).
          </div>
          <p class="leading-relaxed text-slate-300">
            Las células utilizan enzimas ADN polimerasas para replicarse; el paso preliminar de cualquier replicación, transcripción o amplificación por PCR exige la desnaturalización o apertura de la doble hélice del ADN.
          </p>
        `,
        images: []
      },
      {
        id: "t1_sec3",
        number: "1.3",
        title: "Dos Cadenas Antiparalelas y las Leyes de Chargaff",
        content: `
          <p class="leading-relaxed text-slate-300">
            A finales de los años 40, Erwin Chargaff descubrió las regularidades estequiométricas universales del ADN bicatenario:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-slate-300 my-2">
            <li>La proporción de <strong>Adenina es siempre igual a la de Timina</strong> ($A = T$).</li>
            <li>La proporción de <strong>Guanina es siempre igual a la de Citosina</strong> ($G = C$).</li>
            <li>La proporción de bases púricas es igual a la de bases pirimidínicas: $$(A+G) = (T+C) = 50\\%$$</li>
            <li>Sin embargo, <strong>la relación $(A+T)/(G+C)$ es característica de cada organismo</strong>. La cantidad de pares AT no tiene por qué ser igual a la de pares GC; esta proporción es idéntica en todas las células de los individuos de una misma especie, pero varía al comparar distintas especies.</li>
          </ul>
          <h4 class="text-sm font-bold text-cyan-300 mt-3 mb-1">Estructura Secundaria de Doble Hélice</h4>
          <p class="leading-relaxed text-slate-300">
            El ADN es una <strong>doble hélice dextrógira</strong> con las bases nitrogenadas dirigidas hacia el interior, perpendiculares al eje longitudinal de la molécula, y el esqueleto azúcar-fosfato hacia el exterior en contacto con el medio acuoso.
          </p>
          <p class="leading-relaxed text-slate-300">
            El apareamiento específico se mantiene gracias a los <strong>puentes de hidrógeno</strong>: <strong>2 puentes entre A y T ($A=T$)</strong> y <strong>3 puentes entre G y C ($G\\equiv C$)</strong> (lo que confiere mayor estabilidad térmica a secuencias ricas en GC). Las dos cadenas son <strong>antiparalelas</strong>: una hebra discurre en sentido $5'\\text{P}\\rightarrow 3'\\text{OH}$ y la complementaria en sentido inverso $3'\\text{OH}\\rightarrow 5'\\text{P}$.
          </p>
        `,
        images: [
          {
            src: "assets/images/tema1_fig3_doble_helice.png",
            caption: "Figura 3: Modelo de doble hélice antiparalela del ADN. Emparejamiento de bases nitrogenadas (A=T y G≡C) mediante puentes de hidrógeno y esqueleto azúcar-fosfato 5' a 3'."
          }
        ]
      },
      {
        id: "t1_sec4",
        number: "1.4",
        title: "Electroforesis en Gel: Fundamento Físico y Revelado",
        content: `
          <p class="leading-relaxed text-slate-300">
            La <strong>electroforesis en gel</strong> es la técnica analítica y preparativa estándar para separar fragmentos de ácidos nucleicos según su <strong>tamaño molecular y carga eléctrica</strong>.
          </p>
          <ul class="list-disc pl-5 space-y-1 text-slate-300 my-2">
            <li><strong>Carga Negativa Neta:</strong> El esqueleto de ADN posee una carga negativa uniforme constante por longitud aportada por los grupos fosfato ($PO_4^{3-}$).</li>
            <li><strong>Migración hacia el Ánodo:</strong> Al sumergir el gel en un tampón conductor (TAE o TBE) y aplicar una diferencia de potencial eléctrico, el ADN migra desde el polo negativo (<strong>cátodo</strong>) hacia el polo positivo (<strong>ánodo</strong>) — regla de laboratorio <em>"run to the red"</em>.</li>
            <li><strong>Tamiz Molecular:</strong> La matriz de agarosa fundida actúa como un filtro poroso tridimensional. Los fragmentos pequeños experimentan poca fricción y viajan rápido y lejos; los fragmentos grandes sufren mayor resistencia estérica y quedan retenidos cerca del pocillo.</li>
            <li><strong>Visualización Fluorescente bajo UV:</strong> El ADN es incoloro en luz visible. Al finalizar la corrida, se tiñe con un agente intercalante como el <strong>Bromuro de Etidio (EtBr)</strong> o <strong>SYBR Safe</strong>, los cuales al excitarse con radiación ultravioleta emiten fluorescencia visible permitiendo comparar las bandas con un marcador de peso molecular o <em>"ladder"</em> de referencia.</li>
          </ul>
        `,
        images: []
      },
      {
        id: "t1_sec5",
        number: "1.5",
        title: "Empaquetamiento del ADN y Organización de la Cromatina",
        content: `
          <p class="leading-relaxed text-slate-300">
            En células eucariotas, una molécula de ADN desplegada alcanzaría casi 2 metros de longitud. Para albergarse en el núcleo celular (de pocos micrómetros de diámetro), el ADN se asocia con proteínas básicas ricas en lisina y arginina llamadas <strong>histonas</strong>, constituyendo la <strong>cromatina</strong>.
          </p>
          <h4 class="text-sm font-bold text-cyan-300 mt-3 mb-1">Niveles Jerárquicos de Compactación (Figura 1)</h4>
          <ol class="list-decimal pl-5 space-y-1.5 text-slate-300 my-2">
            <li><strong>Doble hélice de ADN desnuda ($2\\text{ nm}$):</strong> La fibra bicatenaria pura.</li>
            <li><strong>Nucleosoma y fibra de $11\\text{ nm}$ ("Cuentas en un collar"):</strong> Unidad fundamental. El ADN da $\\approx 1.65$ vueltas alrededor de un <strong>octámero central de histonas</strong> (formado por 2 copias de H2A, H2B, H3 y H4). La histona enlazadora <strong>H1</strong> se asocia externamente fijando la entrada y salida de la hebra.</li>
            <li><strong>Fibra de $30\\text{ nm}$ (Solenoide):</strong> Enrollamiento helicoidal compacto de los nucleosomas.</li>
            <li><strong>Bucles o Asas radiales ($300\\text{ nm}$):</strong> Anclaje de la fibra de 30 nm a un andamiaje proteico nuclear no histónico.</li>
            <li><strong>Espiral condensada ($700\\text{ nm}$):</strong> Plegamiento sucesivo de las asas.</li>
            <li><strong>Cromosoma metafásico ($1400\\text{ nm}$):</strong> Nivel de condensación máxima alcanzado durante la mitosis y meiosis, observable al microscopio óptico.</li>
          </ol>
          <h4 class="text-sm font-bold text-cyan-300 mt-3 mb-1">Eucromatina vs. Heterocromatina</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
            <div class="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs">
              <strong class="text-emerald-300 block mb-1">🔓 Eucromatina</strong>
              Forma descondensada, abierta y relajada. Corresponde a la fracción <strong>transcripcionalmente activa</strong> donde la ARN polimerasa y los factores de transcripción pueden acceder a los promotores.
            </div>
            <div class="p-3 rounded-xl bg-slate-900 border border-rose-500/40 text-xs">
              <strong class="text-rose-300 block mb-1">🔒 Heterocromatina</strong>
              Forma altamente condensada e inactiva transcripcionalmente. Se divide en:
              <ul class="list-disc pl-4 mt-1 space-y-1">
                <li><strong>Constitutiva:</strong> Siempre compacta en todos los tipos celulares (centrómeros y telómeros).</li>
                <li><strong>Facultativa:</strong> Alterna entre compacta o relajada según el desarrollo celular. Ejemplo clásico: la inactivación al azar de uno de los cromosomas X en las células somáticas femeninas de mamíferos, formando el <strong>corpúsculo de Barr</strong>.</li>
              </ul>
            </div>
          </div>
        `,
        images: [
          {
            src: "assets/images/tema1_fig4_cromatina.jpeg",
            caption: "Figura 4: Empaquetamiento escalonado del ADN desde la doble hélice (2 nm) hasta el cromosoma metafásico (1400 nm), pasando por el octámero de histonas H1, nucleosoma (11 nm), solenoide (30 nm) y bucles (300-700 nm)."
          }
        ]
      },
      {
        id: "t1_sec6",
        number: "1.6",
        title: "El Método de Secuenciación de Sanger (1970s) y NGS",
        content: `
          <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs my-2">
            <strong>📌 Pregunta Clave de Examen Oficial:</strong> <em>"Sanger publicó en los años 70 la base conceptual para todos los métodos de secuenciación que se desarrollaron después"</em> (incluyendo la secuenciación masiva de nueva generación NGS).
          </div>
          <p class="leading-relaxed text-slate-300">
            El método enzimático de Sanger se basa en la síntesis de una cadena complementaria usando dos tipos de sustratos nucleotídicos:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-slate-300 my-2">
            <li><strong>Desoxirribonucleótidos normales (dNTPs: dATP, dTTP, dCTP, dGTP):</strong> Poseen un grupo hidroxilo ($-\\text{OH}$) en el carbono $3'$ de la desoxirribosa, imprescindible para formar el siguiente enlace fosfodiéster.</li>
            <li><strong>Didesoxirribonucleótidos (ddNTPs: ddATP, ddTTP, ddCTP, ddGTP):</strong> Son análogos modificados que <strong>carecen del grupo hidroxilo en el carbono $3'$</strong> (tienen un hidrógeno $-\\text{H}$ en lugar de $-\\text{OH}$). Actúan como <strong>terminadores irreversibles de cadena</strong> o <em>"nucleótidos fallidos/errores"</em>: cuando la polimerasa incorpora un ddNTP, no puede añadir ningún nucleótido más y la elongación se detiene.</li>
          </ul>
          <h4 class="text-sm font-bold text-cyan-300 mt-3 mb-1">Fragmentación y Cobertura 10x</h4>
          <p class="leading-relaxed text-slate-300">
            Para secuenciar cromosomas extensos, el ADN se fragmenta en trozos pequeños de $\\approx 1.000\\text{ nucleótidos}$ ($1\\text{ kilobase, } 1\\text{ kb}$).
            Recuerda las unidades:
          </p>
          <ul class="list-disc pl-5 space-y-1 text-slate-300 my-2">
            <li>$1\\text{ kb} = 1.000\\text{ nucleótidos (o pb)}$.</li>
            <li>$1\\text{ Megabase (1 Mb)} = 1.000\\text{ kb} = 1.000.000\\text{ nucleótidos}$.</li>
          </ul>
          <p class="leading-relaxed text-slate-300">
            <strong>Cobertura $10\\text{x}$ (10-fold coverage):</strong> Como la ADN polimerasa comete errores durante la síntesis in vitro, secuenciar cada fragmento una sola vez arrojaría una tasa inaceptable de error. Por ello, se obtienen al menos <strong>10 copias físicas del cromosoma</strong> y se secuencia cada posición un mínimo de 10 veces de forma redundante para ensamblar la secuencia consenso por solapamiento informático.
          </p>
        `,
        images: []
      },
      {
        id: "t1_sec7",
        number: "1.7",
        title: "Protocolo Detallado de Sanger: El Caso del Cromosoma del Melón",
        content: `
          <p class="leading-relaxed text-slate-300">
            Imaginemos que partimos de un cromosoma de melón. Seleccionamos un fragmento bicatenario purificado de $\\approx 1\\text{ kb}$:
          </p>
          <ol class="list-decimal pl-5 space-y-2 text-slate-300 my-3">
            <li><strong>Desnaturalización:</strong> Se calienta el fragmento a $\\approx 100\\,^\\circ\\text{C}$ para separar sus dos hebras complementarias.</li>
            <li><strong>Adición del cebador (primer):</strong> Se hibrida un oligonucleótido corto sintético en el extremo $3'$ de la hebra molde (uniéndose de forma complementaria al extremo $5'$ inicial). <em>Regla de examen: el cebador siempre debe diseñarse y escribirse en dirección $5'\\rightarrow 3'$, en secuencia complementaria e invertida</em>.</li>
            <li><strong>Preparación de los 4 tubos de reacción:</strong> La mezcla (ADN molde, primer, polimerasa y los cuatro dNTPs normales) se reparte en cuatro tubos independientes, añadiendo a cada uno una pequeña proporción de un ddNTP específico:
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-code my-2 text-center">
                <span class="p-2 rounded bg-slate-900 border border-blue-500/40 text-blue-300">Tubo 1: +ddATP</span>
                <span class="p-2 rounded bg-slate-900 border border-amber-500/40 text-amber-300">Tubo 2: +ddTTP</span>
                <span class="p-2 rounded bg-slate-900 border border-rose-500/40 text-rose-300">Tubo 3: +ddCTP</span>
                <span class="p-2 rounded bg-slate-900 border border-emerald-500/40 text-emerald-300">Tubo 4: +ddGTP</span>
              </div>
            </li>
            <li><strong>Extensión y Terminación:</strong> La polimerasa elonga desde el $3'\\text{-OH}$ del primer hasta que incorpora aleatoriamente un ddNTP, generando una colección de fragmentos de diferentes longitudes que terminan en la base correspondiente al tubo.</li>
            <li><strong>Electroforesis en Gel de Alta Resolución:</strong> Los 4 tubos se cargan en 4 carriles paralelos en un gel desnaturalizante de poliacrilamida. <strong>El gel se lee siempre de abajo hacia arriba</strong> (el fragmento más corto, de menor peso molecular, viaja más rápido hacia el ánodo y corresponde al primer nucleótido añadido tras el cebador).</li>
          </ol>
          <p class="leading-relaxed text-slate-300">
            En los secuenciadores capilares modernos, cada ddNTP lleva un fluorocromo diferente: <strong>Guanina (verde)</strong>, <strong>Timina (amarillo)</strong>, <strong>Citosina (rojo)</strong> y <strong>Adenina (azul)</strong>, leyéndose en un único capilar automatizado con detector láser.
          </p>
        `,
        images: []
      },
      {
        id: "t1_sec8",
        number: "1.8",
        title: "La Paradoja del Valor C y el Tamaño Cromosómico",
        content: `
          <p class="leading-relaxed text-slate-300">
            El número de cromosomas ($2n$) y la cantidad total de ADN por genoma haploide (denominado <strong>valor C</strong>) varían drásticamente entre especies y <strong>no guardan ninguna relación con la complejidad evolutiva del organismo ni con el número de genes codificantes</strong>.
          </p>
          <div class="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/40 my-3 text-purple-200">
            <strong>Ejemplo Clásico de Examen: Los ciervos del género <em>Muntiacus</em></strong><br>
            Existen dos especies morfológicamente casi idénticas ("especies gemelas"):
            <ul class="list-disc pl-5 mt-1 space-y-0.5">
              <li><em>Muntiacus muntjak</em> (ciervo de la India): posee solo <strong>$2n = 6$ cromosomas</strong> en hembras ($2n=7$ en machos), con cromosomas gigantes producto de fusiones en tándem masivas.</li>
              <li><em>Muntiacus reevesi</em> (ciervo chino): posee <strong>$2n = 46$ cromosomas</strong> pequeños.</li>
            </ul>
            Ambas especies tienen un fenotipo y complejidad prácticamente idénticos a pesar de la descomunal diferencia cromosómica.
          </div>
          <p class="leading-relaxed text-slate-300 font-bold uppercase text-amber-300">
            LOS DIFERENTES TAMAÑOS DE LOS GENOMAS NO SE EXPLICAN POR UN NÚMERO DISTINTO DE GENES. UN MAYOR TAMAÑO Y COMPLEJIDAD DEL GENOMA NO EXPLICA TOTALMENTE LA COMPLEJIDAD BIOLÓGICA DE LOS ORGANISMOS.
          </p>
        `,
        images: []
      },
      {
        id: "t1_sec9",
        number: "1.9",
        title: "Estructura del Genoma Humano ($3.200\\text{ Mb}$)",
        content: `
          <p class="leading-relaxed text-slate-300">
            El genoma haploide humano consta de aproximadamente <strong>$3.200\\text{ Mb}$</strong> ($3.2\\times 10^9\\text{ pb}$). Su reparto estructural revela que la inmensa mayoría de la secuencia no codifica proteínas:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
            <div class="bg-slate-900 p-4 rounded-xl border border-cyan-500/40 space-y-2">
              <span class="text-cyan-300 font-bold text-sm block">1. Secuencias Relacionadas con Genes ($1.200\\text{ Mb}$)</span>
              <div>• <strong>Exones codificantes de proteínas:</strong> Solo <strong>$48\\text{ Mb}$ (apenas el $\\approx 1.5\\%$ del genoma total)</strong>.</div>
              <div>• <strong>Intrones y regiones UTR:</strong> Gran parte del resto de los $1.200\\text{ Mb}$.</div>
              <div>• <strong>Seudogenes ("falsos genes"):</strong> Secuencias originadas por duplicación que acumularon mutaciones y perdieron su capacidad transcripcional, sirviendo como reservorio evolutivo.</div>
              <div>• <strong>Fragmentos de genes.</strong></div>
            </div>
            <div class="bg-slate-900 p-4 rounded-xl border border-purple-500/40 space-y-2">
              <span class="text-purple-300 font-bold text-sm block">2. ADN Intergénico y Repetitivo ($2.000\\text{ Mb}$)</span>
              <div>• <strong>Retrotransposones LINE (Long Interspersed):</strong> $640\\text{ Mb}$.</div>
              <div>• <strong>Retrotransposones SINE (incluyendo elementos Alu):</strong> $420\\text{ Mb}$.</div>
              <div>• <strong>Retroelementos con LTR (Long Terminal Repeats):</strong> $250\\text{ Mb}$.</div>
              <div>• <strong>Transposones de ADN (corte y pega):</strong> $90\\text{ Mb}$.</div>
              <div>• <strong>Microsatélites y minisatélites (VNTRs/STRs):</strong> $90\\text{ Mb}$.</div>
              <div>• <strong>Otras regiones intergénicas y ADN diverso:</strong> $\\approx 1.110\\text{ Mb}$.</div>
            </div>
          </div>
        `,
        images: [
          {
            src: "assets/images/tema1_fig5_sanger.png",
            caption: "Figura 5: Distribución cuantitativa del Genoma Humano (3.200 Mb). Detalle de los 1.200 Mb relacionados con genes (exones 48 Mb, intrones, seudogenes) frente a los 2.000 Mb de ADN intergénico repetitivo (LINE, SINE, LTR, transposones, microsatélites)."
          }
        ]
      },
      {
        id: "t1_sec10",
        number: "1.10",
        title: "Estructura del Gen Eucariota y Procesamiento de Splicing",
        content: `
          <p class="leading-relaxed text-slate-300">
            A diferencia de los procariotas, los genes eucariotas son discontinuos o "genes en mosaico", formados por la alternancia de:
          </p>
          <ul class="list-disc pl-5 space-y-1 text-slate-300 my-2">
            <li><strong>Exones:</strong> Regiones codificantes conservadas en el ARNm maduro que determinarán la secuencia de aminoácidos de la proteína.</li>
            <li><strong>Intrones:</strong> Regiones intermedias no codificantes que se transcriben en el transcrito primario de pre-ARNm pero son escindidas y degradadas en el núcleo celular mediante el complejo de <strong>splicing (corte y empalme)</strong>. Los intrones nunca viajan al citoplasma.</li>
          </ul>
          <p class="leading-relaxed text-slate-300">
            El <strong>splicing alternativo</strong> permite combinar exones en distintas configuraciones a partir de un único transcrito primario, generando múltiples isoformas de proteínas con funciones distintas en diferentes tejidos o momentos del desarrollo.
          </p>
          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-700 my-3 text-slate-300 text-xs italic">
            "Los genes, piedra angular del desarrollo y funcionamiento de los organismos, no pueden explicar por sí solos qué hace a las vacas vacas, y al maíz maíz. Los mismos genes se han manifestado en organismos tan diferentes como ratón y medusa. Es más, nuevos hallazgos han puesto en claro que es el exquisito control por el genoma de la actividad de cada gen y no los genes per se lo que más importa."
          </div>
        `,
        images: [
          {
            src: "assets/images/tema1_fig6_genoma_humano.png",
            caption: "Figura 6: Estructura del gen eucariota. Transcripción de exones e intrones, proceso de empalme (splicing) y generación del ARNm maduro con caperuza 5' y cola poli-A en 3'."
          }
        ]
      }
    ]
  },

  tema2: {
    id: "tema2",
    volume: "Volumen 2",
    title: "Tema 2: De la Mutación al Fenotipo",
    subtitle: "Regulación Génica, Mutagénesis, Reordenaciones Cromosómicas y Epigenética",
    badge: "Tema 2 • Variación y Función",
    color: "emerald",
    summary: "Análisis exhaustivo del concepto de gen, transcripción, traducción, regulación por silenciadores y potenciadores, transcriptómica celular, clasificación de mutaciones puntuales y sus 7 consecuencias estructurales en proteínas, mosaicismo somático vs línea germinal, alteraciones cromosómicas, poliploidía vegetal y animal, mutaciones espontáneas (tautómeros y desaminación), mutagénesis inducida (EMS y TILLING) y epigenética (metilación de ADN, modificaciones de histonas H3-K9 y epimutante Cnr).",
    sections: [
      {
        id: "t2_sec1",
        number: "2.1",
        title: "Concepto de Gen, Transcripción y Traducción",
        content: `
          <p class="leading-relaxed text-slate-300">
            <strong>Concepto de gen:</strong> Fragmento de ADN que da lugar a un producto funcional (ARN o proteína). <strong>El ADN se transcribe a ARN y se traduce a proteínas</strong>. Los genes son los responsables del fenotipo: el genotipo, a través del proceso coordinado de expresión génica, determina el fenotipo celular y organismal.
          </p>
          <div class="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 my-3 text-xs text-slate-200">
            <strong>¿Por qué existen distintos fenotipos si todas las células de un organismo pluricelular tienen los mismos genes?</strong><br>
            Aunque el genoma es idéntico en un $\\approx 99\\%$ en todas las células de un individuo (por ejemplo, entre la raíz y el fruto de un tomate), los <strong>transcriptomas son completamente distintos</strong>: cada tejido expresa un conjunto diferencial de genes según sus necesidades biológicas y especialización funcional.
          </div>
          <h4 class="text-sm font-bold text-emerald-400 mt-3 mb-1">El Proceso de Transcripción</h4>
          <p class="leading-relaxed text-slate-300">
            Llevado a cabo por la <strong>ARN polimerasa (transcriptasa)</strong>. Reconoce la secuencia promotora o <strong>promotor</strong> (esencial para el inicio de la transcripción; el promotor regula pero <em>no se transcribe</em>). La enzima sintetiza un transcrito de ARN monocatenario en dirección <strong>$5'\\rightarrow 3'$</strong> usando como molde la cadena inferior complementaria de ADN:
          </p>
          <ul class="list-disc pl-5 space-y-1 text-slate-300 my-2">
            <li>A del ADN se empareja con <strong>U (uracilo)</strong> en el ARN.</li>
            <li>T del ADN se empareja con <strong>A</strong> en el ARN.</li>
            <li>C se empareja con <strong>G</strong>; y G se empareja con <strong>C</strong>.</li>
          </ul>
        `,
        images: []
      },
      {
        id: "t2_sec2",
        number: "2.2",
        title: "Traducción del ARNm y Código Genético Degenerado",
        content: `
          <p class="leading-relaxed text-slate-300">
            Una vez procesado y maduro, el ARNm es exportado al citoplasma, donde se ensambla con el ribosoma:
          </p>
          <ul class="list-disc pl-5 space-y-1 text-slate-300 my-2">
            <li>El ribosoma se acopla en la región <strong>$5'\\text{ UTR}$</strong> y comienza la traducción a partir del codón de inicio ($5'\\text{-AUG-3'}$, que codifica Metionina) en el exón 1, continuando triplete a triplete hasta alcanzar el codón de parada o Stop (UAA, UAG o UGA) en el último exón.</li>
            <li>Si el ribosoma no reconoce correctamente el extremo $5'$, no puede iniciar la traducción; y si falta el extremo $3'$ poliadenilado, interpreta que el ARNm está degradado y se inhibe.</li>
            <li><strong>Código genético degenerado:</strong> Existen 64 codones posibles para 20 aminoácidos estándar. Varios codones sinónimos codifican el mismo aminoácido, lo que explica por qué muchas mutaciones en la tercera base de un codón son <strong>mutaciones silenciosas</strong> sin repercusión en la proteína.</li>
          </ul>
        `,
        images: []
      },
      {
        id: "t2_sec3",
        number: "2.3",
        title: "Estructura del Gen Eucariota y Regiones Reguladoras",
        content: `
          <p class="leading-relaxed text-slate-300">
            La complejidad de control de un gen depende del número y disposición de sus elementos reguladores no codificantes:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-slate-300 my-2">
            <li><strong>Potenciadores aguas arriba (Upstream Enhancers):</strong> Secuencias reguladoras a distancia que incrementan intensamente la tasa de transcripción interactuando con proteínas activadoras.</li>
            <li><strong>Promotor y Caja TATA:</strong> Región inmediatamente anterior al sitio de inicio ($+1$) requerida para fijar los factores basales de transcripción y la ARN polimerasa.</li>
            <li><strong>Regiones UTR (Untranslated Regions):</strong> La región <strong>$5'\\text{ UTR}$</strong> (con la caperuza $5'\\text{ Cap}$) y la <strong>$3'\\text{ UTR}$</strong> (con la señal de poliadenilación) <em>sí se transcriben pero no se traducen</em>; regulan la estabilidad del mensajero y la afinidad ribosómica.</li>
            <li><strong>Exones e Intrones:</strong> Regiones codificantes y secuencias intermedias eliminadas en el splicing nuclear.</li>
            <li><strong>Cola Poli-A ($3'$):</strong> Cola de adeninas añadida post-transcripcionalmente en el extremo $3'$ que protege al ARNm de la degradación por exonucleasas citoplasmáticas.</li>
          </ul>
        `,
        images: [
          {
            src: "assets/images/tema2_fig1_gen_eucariota.jpeg",
            caption: "Figura 7: Anatomía molecular de un gen eucariota. Upstream enhancers, promotor con TATA box, 5' UTR, exones e intrones, 3' UTR y cola poli-A."
          }
        ]
      },
      {
        id: "t2_sec4",
        number: "2.4",
        title: "Mutaciones Puntuales en Exones y Consecuencias Estructurales en Proteínas",
        content: `
          <p class="leading-relaxed text-slate-300">
            Las mutaciones génicas puntuales son alteraciones de una o pocas bases en la secuencia nucleotídica:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 my-3 text-xs">
            <div class="p-3 rounded-xl bg-slate-900 border border-emerald-500/40">
              <strong class="text-emerald-300 block mb-1">1. Mutación Silenciosa</strong>
              Cambio de base que origina un codón sinónimo. Ej. $AGG \\rightarrow CGG$ (ambos codifican Arginina). La secuencia de aminoácidos permanece intacta y no altera la función ni el fenotipo.
            </div>
            <div class="p-3 rounded-xl bg-slate-900 border border-amber-500/40">
              <strong class="text-amber-300 block mb-1">2. Cambio de Sentido (Missense)</strong>
              Aparece un triplete que codifica para un aminoácido de diferente naturaleza química. Puede alterar el plegamiento, estabilidad o actividad biológica de la proteína.
            </div>
            <div class="p-3 rounded-xl bg-slate-900 border border-rose-500/40">
              <strong class="text-rose-300 block mb-1">3. Sin Sentido (Nonsense)</strong>
              Genera un codón de parada prematuro (Stop: UAG, UAA o UGA). Si ocurre al inicio, la proteína no se sintetiza; si ocurre en posición intermedia, genera una <strong>proteína truncada</strong> incompleta y no funcional.
            </div>
          </div>
          <h4 class="text-sm font-bold text-emerald-400 mt-4 mb-1">Los 7 Efectos Estructurales en Proteínas (Figura 1)</h4>
          <p class="leading-relaxed text-slate-300">
            Según se ilustra en los modelos cristalográficos de referencia, las mutaciones pueden desestabilizar la proteína mediante 7 mecanismos:
          </p>
          <ol class="list-decimal pl-5 space-y-1 text-slate-300 my-2">
            <li><strong>Truncamiento por codón Stop (Stop codon - truncation):</strong> Pérdida de dominios funcionales enteros por parada prematura.</li>
            <li><strong>Mal plegamiento (Misfolding):</strong> Pérdida de la conformación nativa terciaria por sustitución de residuos hidrofóbicos/hidrofílicos.</li>
            <li><strong>Alteración del centro activo (Active site alteration):</strong> Pérdida de la catálisis enzimática por modificación de aminoácidos clave del bolsillo catalítico.</li>
            <li><strong>Pérdida de unión a metales (Metal binding):</strong> Destrucción de motivos como dedos de zinc o coordinación de $Mg^{2+}/Fe^{2+}$.</li>
            <li><strong>Alteración de unión a ligandos (Ligand binding):</strong> Imposibilidad de unir cofactores, hormonas o sustratos.</li>
            <li><strong>Impedimento de dimerización (No dimerization):</strong> Fracaso en el ensamblaje de complejos cuaternarios homodiméricos o heterodiméricos.</li>
            <li><strong>Pérdida de unión al ADN (DNA binding):</strong> Inactivación de factores de transcripción con dominios hélice-giro-hélice o cremallera de leucina.</li>
          </ol>
        `,
        images: [
          {
            src: "assets/images/tema2_fig2_splicing.jpeg",
            caption: "Figura 8: Modelos tridimensionales de los 7 efectos estructurales producidos por mutaciones en proteínas: truncamiento, mal plegamiento, centro activo, unión a metales, ligandos, dimerización y unión a ADN."
          },
          {
            src: "assets/images/tema2_fig4_mutaciones_puntuales.jpeg",
            caption: "Figura 9: Mutación puntual por sustitución de bases en el ADN original frente al ADN mutado."
          }
        ]
      },
      {
        id: "t2_sec5",
        number: "2.5",
        title: "Mutaciones Somáticas vs. Germinales y Mosaicismo",
        content: `
          <p class="leading-relaxed text-slate-300">
            El destino biológico de una mutación depende críticamente de la estirpe celular en la que se origina:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
            <div class="bg-slate-900 p-4 rounded-xl border border-cyan-500/40 space-y-2">
              <strong class="text-cyan-300 block text-sm">Mutación Somática y Mosaicismo</strong>
              <p>Afecta a las células somáticas no reproductoras. Por mitosis, todas las células descendientes heredarán la mutación (<strong>herencia celular</strong>), originando un <strong>individuo mosaico</strong> con dos líneas genéticas distintas.</p>
              <p>• <em>Momento de aparición:</em> Cuanto antes ocurra en el desarrollo embrionario, mayor será la proporción de tejidos afectados. Si ocurre en el estado de 2 blastómeros (1ª división del cigoto), <strong>la mitad exacta del individuo adulto tendrá el genotipo mutado y la otra mitad el silvestre</strong>.</p>
              <p>• <em>Transmisión a la descendencia:</em> En <strong>animales con reproducción sexual</strong>, las mutaciones somáticas <strong>NUNCA se transmiten a la progenie</strong>. En cambio, en <strong>plantas con propagación vegetativa</strong> (tubérculos, bulbos, esquejes), si la mutación afecta a meristemos de órganos multiplicadores, <strong>SÍ se transmite y perpetúa a la descendencia clonal sin necesidad de gametos</strong>.</p>
            </div>
            <div class="bg-slate-900 p-4 rounded-xl border border-purple-500/40 space-y-2">
              <strong class="text-purple-300 block text-sm">Mutación en la Línea Germinal</strong>
              <p>Afecta a las células madre precursoras de los gametos (óvulos y espermatozoides). No suele manifestarse fenotípicamente en el propio individuo parental, pero <strong>se transmite a la siguiente generación con probabilidad mendeliana</strong>, incorporándose al genoma de todas las células del descendiente.</p>
              <p>Constituyen la base y motor fundamental de la <strong>evolución biológica</strong> y la variabilidad genética poblacional.</p>
            </div>
          </div>
        `,
        images: []
      },
      {
        id: "t2_sec6",
        number: "2.6",
        title: "Reordenaciones Cromosómicas Estructurales",
        content: `
          <p class="leading-relaxed text-slate-300">
            Las alteraciones cromosómicas estructurales afectan a fragmentos grandes de los cromosomas:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-slate-300 my-2">
            <li><strong>Deleción o deficiencia:</strong> Pérdida física de un segmento cromosómico. <em>Dato de examen:</em> Los cromosomas contienen centrómeros y telómeros; si por deleción un fragmento pierde el centrómero o el telómero, no puede segregarse en la mitosis/meiosis y <strong>se pierde irreversiblemente en el citoplasma ("bye bye cromosoma")</strong>.</li>
            <li><strong>Duplicación:</strong> Repetición de un segmento cromosómico. Fuente de familias génicas y seudogenes.</li>
            <li><strong>Inversión:</strong> Rotura y giro de 180° de un segmento. Puede ser paracéntrica (no incluye centrómero) o pericéntrica (incluye centrómero).</li>
            <li><strong>Translocación recíproca:</strong> Intercambio de segmentos entre cromosomas no homólogos.</li>
            <li><strong>Translocación Robertsoniana:</strong> Fusión de dos cromosomas acrocéntricos por sus centrómeros, originando un único cromosoma metacéntrico con pérdida de los brazos cortos satélites.</li>
          </ul>
        `,
        images: [
          {
            src: "assets/images/tema2_fig12_reordenaciones_cromosomicas.jpeg",
            caption: "Figura 10: Clasificación de reordenaciones cromosómicas estructurales: A) Deleción, B) Duplicación, C) Inversión, D) Translocación recíproca, E) Translocación robertsoniana."
          }
        ]
      },
      {
        id: "t2_sec7",
        number: "2.7",
        title: "Poliploidía: Mecanismos, Sandías Triploides y Colchicina",
        content: `
          <p class="leading-relaxed text-slate-300">
            La <strong>poliploidía</strong> consiste en la presencia de más de dos juegos cromosómicos completos ($>2n$). En animales es casi invariablemente letal, pero en el reino vegetal es extraordinariamente común y tolerada, confiriendo ventajas agronómicas como el <strong>"efecto giga" (frutos, flores y hojas de mayor tamaño)</strong>.
          </p>
          <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs my-2">
            <strong>Ejemplo Clásico de Examen: Sandías sin semillas (Triploides $3n$)</strong><br>
            Se obtienen cruzando una planta tetraploide madre ($4n$, que produce gametos diploides $2n$) con una planta diploide polinizadora ($2n$, que produce gametos haploides $1n$). La descendencia es triploide ($3n$). Durante la meiosis en la flor, los tres juegos homólogos no pueden aparearse de forma equilibrada, los gametos son aneuploides inviables, las semillas abortan y el fruto carece de semillas duras. Se propagan por vía vegetativa o repitiendo el cruce parental.
          </div>
          <h4 class="text-sm font-bold text-emerald-400 mt-3 mb-1">Métodos de Poliploidización Artificial</h4>
          <ul class="list-disc pl-5 space-y-1 text-slate-300 my-2">
            <li><strong>Duplicación con Colchicina:</strong> Alcaloide extraído de <em>Colchicum autumnale</em> que despolimeriza los microtúbulos e inhibe la formación del huso mitótico. Las cromátidas se duplican en fase S pero no se segregan, duplicando el juego de cromosomas ($2n\\rightarrow 4n$).</li>
            <li><strong>Fusión de Protoplastos:</strong> Digestión enzimática de paredes celulares y fusión química (PEG) o eléctrica de dos protoplastos somáticos.</li>
            <li><strong>Gametos no reducidos ($2n$):</strong> Fallos meióticos naturales donde no se produce la reducción cromosómica.</li>
          </ul>
        `,
        images: [
          {
            src: "assets/images/tema2_fig5_mosaicismo.png",
            caption: "Figura 11: Métodos de obtención de poliploides: aplicación de colchicina a meristemos (2x a 4x), electrofusión de protoplastos y cruce con parentales productores de gametos no reducidos 2n."
          }
        ]
      },
      {
        id: "t2_sec8",
        number: "2.8",
        title: "Mutaciones Espontáneas e Inducidas (Tautómeros, EMS y TILLING)",
        content: `
          <p class="leading-relaxed text-slate-300">
            <strong>Mutaciones espontáneas por cambios tautoméricos:</strong> Las bases nitrogenadas existen en formas isoméricas tautoméricas en equilibrio: la forma ceto/amino habitual frente a la forma rara enol/imino. Como postularon Watson y Crick, cuando una base se encuentra transitoriamente en su forma tautomérica rara durante la replicación, empareja erróneamente (por ejemplo, la Guanina enol empareja con Timina en vez de Citosina), originando tras una segunda replicación una transición permanente.
          </p>
          <p class="leading-relaxed text-slate-300">
            <strong>Desaminación y Daño Oxidativo:</strong> La desaminación espontánea de la citosina la convierte en <strong>uracilo</strong>; si no se repara, el uracilo empareja con adenina, provocando una transición de un par $GC \\rightarrow AT$. El daño por radicales libres de oxígeno genera 8-oxi-guanina, que empareja erróneamente con adenina.
          </p>
          <h4 class="text-sm font-bold text-emerald-400 mt-3 mb-1">El EMS y la Tecnología TILLING</h4>
          <p class="leading-relaxed text-slate-300">
            El <strong>Etil Metanosulfonato (EMS)</strong> es un agente químico alquilante potente que transfiere grupos etilo a los nucleótidos (alquilando el O6 de la guanina), provocando mutaciones puntuales masivas por sustitución de bases ($GC\\rightarrow AT$).
          </p>
          <div class="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 my-3 text-xs text-slate-200">
            <strong>Plataforma TILLING (Targeting Induced Local Lesions IN Genomes):</strong><br>
            Técnica de genética inversa que combina la mutagénesis química con EMS en semillas ($M_1$) con el cribado molecular de alto rendimiento en generaciones posteriores ($M_2, M_3, M_4$) para identificar mutaciones puntuales útiles en genes diana <strong>sin recurrir a la transgénesis (OGM)</strong>.
          </div>
        `,
        images: [
          {
            src: "assets/images/tema2_fig9_sandias_colchicina.jpeg",
            caption: "Figura 12: Cambios tautoméricos de bases: replicación con forma enol rara de guanina y generación de mutantes por transición en segunda generación."
          },
          {
            src: "assets/images/tema2_fig10_huso_mitotico.jpeg",
            caption: "Figura 13: Desaminación oxidativa de citosina a uracilo y daño oxidativo por radicales de oxígeno."
          },
          {
            src: "assets/images/tema2_fig13_tilling_flujo.jpeg",
            caption: "Figura 14: Agentes mutagénicos químicos y físicos: análogos de bases (5-bromouracilo), intercalantes (proflavina, naranja de acridina) y dímeros de timina inducidos por UV."
          },
          {
            src: "assets/images/tema2_fig14_tilling_gel.jpeg",
            caption: "Figura 15: Flujo de trabajo del protocolo TILLING con EMS: mutagénesis en semillas M1, propagación M2/M3, extracción de ADN y detección molecular con fenotipado agronómico."
          }
        ]
      },
      {
        id: "t2_sec9",
        number: "2.9",
        title: "Epigenética: Modificaciones de Histonas, Metilación y Tomate Cnr",
        content: `
          <p class="leading-relaxed text-slate-300">
            Se denominan <strong>modificaciones epigenéticas</strong> a todos los cambios heredables en la estructura y función de la cromatina que <strong>no alteran la secuencia de nucleótidos del ADN</strong> (del griego <em>epi</em>, "por encima").
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-slate-300 my-2">
            <li><strong>Acetilación vs. Desacetilación de Histonas:</strong> La adición de grupos acetilo por HATs relaja la cromatina y favorece la transcripción (eucromatina); la eliminación de acetilos por <strong>HDAC (histona desacetilasas)</strong> compacta la cromatina reprimiendo la expresión.</li>
            <li><strong>Metilación de Histona H3 en Lisina 9 (H3-K9):</strong> Modificación represora clave. La histona H3-K9 metilada recluta a la proteína HP1, la cual atrae a la enzima <strong>DNMT (ADN metiltransferasa)</strong> que metila directamente las citosinas del ADN circundante.</li>
            <li><strong>Bucle de Represión Cruzada:</strong> El ADN metilado se une a la proteína <strong>MeCP2</strong>, que a su vez recluta a la enzima <strong>HDAC</strong>, cerrando un círculo vicioso que condensa permanentemente la heterocromatina.</li>
          </ul>
          <div class="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 my-3 text-rose-200 text-xs">
            <strong>Caso Oficial de Examen: Epimutante de Tomate Cnr (Colorless non-ripening)</strong><br>
            Descubierto por Manning et al. (2006). El mutante produce frutos sin pigmentación roja licopénica y con pericarpio duro y harinoso. Se demostró que se trata de una <strong>epimutación natural</strong>: la secuencia de nucleótidos del gen estaba intacta, pero la <strong>zona promotora del epialelo Cnr se encontraba hipermetilada</strong>, silenciando completamente su expresión. Además, la epimutación presenta reversiones espontáneas con sectores de color rojo normal en el mismo fruto.
          </div>
        `,
        images: [
          {
            src: "assets/images/tema2_fig15_epimutacion_cnr.jpeg",
            caption: "Figura 16: Interacción epigenética: la metilación de histona H3-K9 recluta a la ADN metiltransferasa (DNMT), induciendo la metilación del ADN."
          },
          {
            src: "assets/images/tema2_fig3_cap_polya.jpeg",
            caption: "Figura 17: Bucle represor: la proteína MeCP2 se une al ADN metilado y recluta a la histona desacetilasa (HDAC), induciendo la desacetilación de histonas y compactación de la cromatina."
          }
        ]
      }
    ]
  },

  tema3: {
    id: "tema3",
    volume: "Volumen 3",
    title: "Tema 3: Los Marcadores Moleculares y el Estudio de la Diversidad Genética",
    subtitle: "RFLPs, PCR, Secuenciación Masiva Illumina y Selección Asistida por Marcadores (MAS)",
    badge: "Tema 3 • Marcadores y Mejora",
    color: "indigo",
    summary: "Guía completa sobre huellas genéticas, endonucleasas de restricción bacterianas y tipos de corte (cohesivos EcoRI/PstI vs romos HaeIII), RFLPs de Botstein et al. (1980) con Southern blot e hibridación con sondas marcadas, amplificación diagnóstica por PCR, tecnología Illumina (flow cell, clusters por bridge amplification y secuenciación por síntesis), aplicaciones en biodiversidad, control de pureza varietal y cartografía genética mediante Selección Asistida por Marcadores (MAS).",
    sections: [
      {
        id: "t3_sec1",
        number: "3.1",
        title: "Huellas Genéticas y Perfiles de ADN",
        content: `
          <p class="leading-relaxed text-slate-300">
            Las <strong>huellas genéticas o perfiles de ADN</strong> son patrones únicos de fragmentos de ADN que permiten identificar de forma inequívoca a un individuo. Cada persona o variedad vegetal, salvo los gemelos idénticos o clones monocigóticos, exhibe un patrón exclusivo de bandas.
          </p>
          <h4 class="text-sm font-bold text-indigo-400 mt-3 mb-1">Las 4 Etapas del Proceso Básico</h4>
          <ol class="list-decimal pl-5 space-y-1 text-slate-300 my-2">
            <li><strong>Extracción del ADN:</strong> Aislamiento y purificación de una muestra biológica (sangre, saliva, hojas tiernas, raíces).</li>
            <li><strong>Fragmentación específica:</strong> Mediante digestión con enzimas de restricción (RFLPs) o amplificación dirigida por PCR de regiones variables (microsatélites STRs, VNTRs o RAPDs).</li>
            <li><strong>Separación electroforética:</strong> Migración en gel de agarosa o poliacrilamida donde los fragmentos se ordenan por tamaño molecular.</li>
            <li><strong>Visualización y Detección:</strong> Revelado mediante tinción fluorescente o hibridación con sondas marcadas radiactiva o químicamente.</li>
          </ol>
        `,
        images: []
      },
      {
        id: "t3_sec2",
        number: "3.2",
        title: "Enzimas de Restricción: Mecanismo y Tipos de Corte",
        content: `
          <p class="leading-relaxed text-slate-300">
            Las <strong>enzimas de restricción (endonucleasas de restricción)</strong> son proteínas bacterianas descubiertas como mecanismo inmunitario defensivo natural para degradar el ADN de fagos víricos invasores. Cada enzima reconoce una secuencia corta específica (generalmente de 4 a 8 pb), normalmente <strong>palindrómica</strong> (se lee igual en ambas hebras en dirección $5'\\rightarrow 3'$).
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs">
            <div class="p-3.5 rounded-xl bg-slate-900 border border-indigo-500/40">
              <strong class="text-indigo-300 block mb-1">✂️ Cortes Escalonados (Extremos Cohesivos o "Pegajosos")</strong>
              Cortan las dos hebras en posiciones desfasadas, dejando colas monocatenarias expuestas que facilitan la ligación con otros fragmentos complementarios.
              <ul class="list-disc pl-4 mt-2 space-y-1 font-mono-code text-[11px]">
                <li><strong>EcoRI:</strong> Reconoce $5'\\text{-GAATTC-3'}$ y corta entre G y A ($5'\\text{-G}\\downarrow\\text{AATTC-3'}$), dejando extremos cohesivos $5'$ salientes.</li>
                <li><strong>PstI:</strong> Reconoce $5'\\text{-CTGCAG-3'}$ y corta entre A y G ($5'\\text{-CTGCA}\\downarrow\\text{G-3'}$), dejando extremos cohesivos $3'$ salientes.</li>
              </ul>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-900 border border-amber-500/40">
              <strong class="text-amber-300 block mb-1">✂️ Cortes Rectos (Extremos Romos)</strong>
              Cortan en el mismo punto simétrico de ambas hebras sin dejar bases monocatenarias libres.
              <ul class="list-disc pl-4 mt-2 space-y-1 font-mono-code text-[11px]">
                <li><strong>HaeIII:</strong> Reconoce $5'\\text{-GGCC-3'}$ y corta en el centro ($5'\\text{-GG}\\downarrow\\text{CC-3'}$). Son más difíciles de clonar por ligación simple.</li>
              </ul>
            </div>
          </div>
          <p class="leading-relaxed text-slate-300">
            <strong>Detección de polimorfismos:</strong> Si una mutación puntual altera un solo nucleótido de la secuencia diana, la enzima ya no puede cortar, alterando la longitud de los fragmentos resultantes entre diferentes individuos.
          </p>
        `,
        images: [
          {
            src: "assets/images/tema3_fig1_enzimas_restriccion.png",
            caption: "Figura 18: Tipos de cortes producidos por enzimas de restricción: cortes escalonados (extremos cohesivos en EcoRI y PstI) vs cortes rectos (extremos romos en HaeIII)."
          }
        ]
      },
      {
        id: "t3_sec3",
        number: "3.3",
        title: "Marcadores RFLP (Botstein et al., 1980) y Southern Blot",
        content: `
          <p class="leading-relaxed text-slate-300">
            Los <strong>RFLPs (Restriction Fragment Length Polymorphisms)</strong> fueron descritos por Botstein y colaboradores en 1980 como los <strong>primeros marcadores moleculares basados en el análisis directo del ADN</strong>.
          </p>
          <h4 class="text-sm font-bold text-indigo-400 mt-3 mb-1">El Protocolo Oficial de 5 Pasos</h4>
          <ol class="list-decimal pl-5 space-y-2 text-slate-300 my-2">
            <li><strong>Aislamiento de ADN genómico:</strong> Extracción de muestras de individuos A y B.</li>
            <li><strong>Digestión con restrictasa:</strong> El ADN se incuba con la enzima de restricción, generando millones de fragmentos de diferentes tamaños.</li>
            <li><strong>Electroforesis y Southern Blot:</strong> Los fragmentos se separan en gel de agarosa (formando un frotis continuo o <em>smear</em>) y se desnaturalizan en medio alcalino para transferirlos por capilaridad a una membrana sólida de nylon o nitrocelulosa.</li>
            <li><strong>Hibridación con sonda marcada:</strong> Se aplica una sonda de ADN monocatenario radiactivo o fluorescente complementaria al gen de interés, que hibrida exclusivamente con los fragmentos diana.</li>
            <li><strong>Revelado e Interpretación Alélica:</strong> En la autorradiografía se observan patrones claros de bandas según el genotipo:
              <ul class="list-disc pl-5 mt-1 space-y-0.5">
                <li><strong>Alelo A (Homocigoto AA):</strong> Conserva las dianas internas de corte; la sonda detecta un <strong>fragmento corto</strong> (banda inferior rápida).</li>
                <li><strong>Alelo B (Homocigoto BB):</strong> Ha perdido la diana intermedia por mutación; el corte genera un <strong>fragmento largo</strong> (banda superior lenta).</li>
                <li><strong>Heterocigoto AB:</strong> Exhibe <strong>ambas bandas simultáneamente</strong> (una de cada cromosoma homólogo).</li>
              </ul>
            </li>
          </ol>
        `,
        images: [
          {
            src: "assets/images/tema3_fig2_rflp_southern.png",
            caption: "Figura 19: Esquema clásico de RFLPs (Botstein et al., 1980): digestión con enzimas de restricción, electroforesis, transferencia Southern blot, hibridación con sonda y patrón electroforético de genotipos AA, BB y AB."
          }
        ]
      },
      {
        id: "t3_sec4",
        number: "3.4",
        title: "Detección de Polimorfismos mediante PCR y Diagnóstico Viral",
        content: `
          <p class="leading-relaxed text-slate-300">
            A diferencia de RFLP, la <strong>Reacción en Cadena de la Polimerasa (PCR)</strong> permite amplificar exponencialmente secuencias específicas sin requerir grandes cantidades de ADN ni Southern blot.
          </p>
          <div class="p-3.5 rounded-xl bg-slate-900 border border-indigo-500/40 my-3 text-xs text-slate-200">
            <strong>Requisito Fundamental de la PCR:</strong> Para realizar una PCR dirigida es imprescindible conocer previamente la secuencia de los extremos del fragmento a amplificar, con el fin de sintetizar oligonucleótidos cebadores (primers A y B) complementarios y específicos. En cambio, técnicas como <strong>RAPD</strong> utilizan cebadores aleatorios cortos de 8-10 nt sin conocer la secuencia previa.
          </div>
          <h4 class="text-sm font-bold text-indigo-400 mt-3 mb-1">Reactivos y Ciclos Térmicos en Termociclador</h4>
          <ul class="list-disc pl-5 space-y-1 text-slate-300 my-2">
            <li><strong>Reactivos:</strong> ADN molde, cebadores específicos Forward y Reverse, ADN polimerasa termoestable (Taq) y desoxirribonucleótidos trifosfato (dNTPs) en tampón con $Mg^{2+}$.</li>
            <li><strong>Los 3 Pasos del Ciclo Térmico (típicamente 30-35 ciclos):</strong>
              <ol class="list-decimal pl-5 mt-1 space-y-0.5">
                <li><strong>Desnaturalización (95 °C):</strong> Separación de las dos hebras molde.</li>
                <li><strong>Hibridación o Annealing (30–60 °C, ≈2 min):</strong> Alineamiento de los cebadores en sus secuencias complementarias.</li>
                <li><strong>Polimerización o Extensión (72 °C):</strong> Temperatura óptima en la que la polimerasa sintetiza la nueva cadena complementaria.</li>
              </ol>
            </li>
            <li><strong>Amplificación exponencial:</strong> En cada ciclo el número de moléculas diana se duplica teóricamente: $2^n$ (tras 1 ciclo hay 2 moléculas; tras 2 hay 4; tras 30 ciclos hay más de mil millones de copias).</li>
          </ul>
        `,
        images: []
      },
      {
        id: "t3_sec5",
        number: "3.5",
        title: "Tecnología Illumina para Identificación Masiva de SNPs",
        content: `
          <p class="leading-relaxed text-slate-300">
            Los <strong>SNPs (Single Nucleotide Polymorphisms)</strong> son variaciones de una sola base nucleotídica (ej. $A \\leftrightarrow G$) sumamente abundantes en los genomas. La plataforma <strong>Illumina</strong> es la tecnología de secuenciación masiva en paralelo más utilizada a nivel mundial para el estudio simultáneo de millones de SNPs.
          </p>
          <h4 class="text-sm font-bold text-indigo-400 mt-3 mb-1">Las 5 Fases del Proceso Illumina</h4>
          <ol class="list-decimal pl-5 space-y-2 text-slate-300 my-2">
            <li><strong>Fragmentación y Adaptadores:</strong> El ADN genómico se fragmenta en trozos pequeños y se ligan adaptadores sintéticos conocidos a ambos extremos.</li>
            <li><strong>Fijación en la Celda de Flujo (Flow Cell):</strong> Los fragmentos con adaptadores se inyectan en una lámina de vidrio que contiene una alfombra densa de oligonucleótidos anclados complementarios a los adaptadores.</li>
            <li><strong>Amplificación por Puente (Bridge Amplification):</strong> Cada fragmento se dobla sobre la superficie formando un "puente" con un oligonucleótido vecino, generando tras múltiples ciclos de amplificación local una colonia clonal o <strong>cluster de copias idénticas</strong> en el mismo punto físico de la flow cell.</li>
            <li><strong>Secuenciación por Síntesis (SBS):</strong> Se añaden simultáneamente los 4 dNTPs reversibles, cada uno marcado con un fluorocromo de color específico:
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-code text-center my-2">
                <span class="p-1.5 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-300">A ➔ Verde</span>
                <span class="p-1.5 rounded bg-rose-950 border border-rose-500/50 text-rose-300">T ➔ Rojo</span>
                <span class="p-1.5 rounded bg-blue-950 border border-blue-500/50 text-blue-300">C ➔ Azul</span>
                <span class="p-1.5 rounded bg-amber-950 border border-amber-500/50 text-amber-300">G ➔ Amarillo</span>
              </div>
              La polimerasa incorpora únicamente un nucleótido por ciclo debido a un bloqueador químico reversible. Un láser de alta resolución fotografía el color emitido por cada cluster; luego se elimina químicamente el fluorocromo y el bloqueador, repitiéndose el ciclo para leer base a base en millones de clusters en paralelo.
            </li>
            <li><strong>Detección Bioinformática de SNPs:</strong> Un software alinea las lecturas frente al genoma de referencia y detecta variaciones puntuales en cada posición alélica.</li>
          </ol>
        `,
        images: []
      },
      {
        id: "t3_sec6",
        number: "3.6",
        title: "Aplicaciones: Biodiversidad, Pureza Varietal y Selección Asistida (MAS)",
        content: `
          <p class="leading-relaxed text-slate-300">
            Los marcadores moleculares han revolucionado tanto la biología de la conservación como los programas de mejora genética:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-slate-300 my-2">
            <li><strong>Conservación de Poblaciones Naturales:</strong> Permiten cuantificar la heterocigosidad y estructuración de poblaciones fragmentadas, seleccionando aquellas reservas biológicas con mayor diversidad alélica para maximizar su potencial adaptativo ante el cambio global.</li>
            <li><strong>Control de Pureza Varietal y Variedades Protegidas:</strong> Tradicionalmente la certificación de semillas y plantas se basaba en descriptores morfológicos o fisiológicos. Sin embargo, estos presentan graves limitaciones: número restringido de caracteres, fuerte influencia ambiental y dependencia del estadio de desarrollo adulto. Los marcadores moleculares de ADN resuelven estas limitaciones de forma inmediata, objetiva e independiente del ambiente.</li>
            <li><strong>Mapeo Genético y Selección Asistida por Marcadores (MAS):</strong> Un mapa genético representa la distribución lineal de genes y marcadores a lo largo de los cromosomas (grupos de ligamiento). Si un marcador molecular está fuertemente <strong>ligado genéticamente</strong> a un gen de interés agronómico (por ejemplo, resistencia a hongos o tolerancia a sequía), ambos <strong>segregarán juntos durante la meiosis</strong> con mínima probabilidad de recombinación por sobrecruzamiento. De este modo, la detección en plántulas recién germinadas de la banda del marcador permite seleccionar indirectamente y con total precisión las plantas que poseen el gen de interés, reduciendo años de cultivo en campo.</li>
          </ul>
        `,
        images: [
          {
            src: "assets/images/tema3_fig3_illumina.jpeg",
            caption: "Figura 20: Control de pureza varietal y huellas genéticas en frutos de tomate comerciales y tradicionales."
          },
          {
            src: "assets/images/tema3_fig4_mas_seleccion.jpeg",
            caption: "Figura 21: Cartografía genética y grupos de ligamiento (LG I a LG VI) utilizados en programas de mejora asistida por marcadores moleculares (MAS)."
          }
        ]
      }
    ]
  },

  tema4: {
    id: "tema4",
    volume: "Volumen 4",
    title: "Tema 4: Cultivos In-Vitro y Morfogénesis Vegetal",
    subtitle: "Asepsia, Transformación Genética, Micropropagación y Vías Morfogénicas",
    badge: "Tema 4 • Biotecnología Vegetal",
    color: "lime",
    summary: "Manual completo sobre cultivo in vitro de explantes vegetales, requerimientos asépticos (autoclave y fitotrón), cultivo de meristemos, métodos de transformación genética (Agrobacterium tumefaciens y biobalística), cultivo comercial del maíz transgénico MON810, micropropagación y sus 5 fases, variación somaclonal, totipotencia celular, rutas de morfogénesis (organogénesis unipolar vs embriogénesis somática bipolar) y tabla oficial de reguladores de crecimiento (auxinas y citoquininas).",
    sections: [
      {
        id: "t4_sec1",
        number: "4.1",
        title: "Concepto de Cultivo In Vitro y Requerimientos de Laboratorio",
        content: `
          <p class="leading-relaxed text-slate-300">
            Por <strong>cultivo in vitro de tejidos vegetales</strong> se entiende el cultivo aséptico de cualquier parte de la planta llamada <strong>explante</strong> (hojas, tallos, ápices meristemáticos, raíces, cotiledones) o de células aisladas y <strong>protoplastos</strong> (células a las que se ha eliminado enzimáticamente la pared celulósica) bajo condiciones rigurosamente controladas de luz, temperatura y nutrientes en medios artificiales.
          </p>
          <h4 class="text-sm font-bold text-lime-400 mt-3 mb-1">Infraestructura y Materiales Indispensables</h4>
          <ul class="list-disc pl-5 space-y-1 text-slate-300 my-2">
            <li><strong>Material Vegetal:</strong> Explantes seleccionados procedentes de plantas donantes sanas y vigorosas.</li>
            <li><strong>Recipientes:</strong> Tubos, matraces o frascos de vidrio/plástico con diseño que garantice volumen adecuado y ventilación estéril.</li>
            <li><strong>Medios de Cultivo (ej. Murashige & Skoog - MS):</strong> Formulado con sales minerales (macro y micronutrientes), sacarosa (como fuente de carbono y energía para tejidos heterótrofos), agua purificada, vitaminas y reguladores del crecimiento (fitohormonas). El soporte físico suele ser gelificante (agar).</li>
            <li><strong>Zona de Asepsia:</strong> Cabinas de flujo laminar vertical u horizontal con filtros HEPA para manipulación estéril.</li>
            <li><strong>Autoclave:</strong> Similar a una "lavadora de alta presión de laboratorio"; esteriliza medios e instrumental mediante vapor saturado a alta presión ($121\\,^\\circ\\text{C}$ durante 15–20 minutos a $1\\text{ atm}$ de sobrepresión).</li>
            <li><strong>Fitotrón o Cámara de Cultivo:</strong> Recinto climatizado para regular de forma automatizada la <strong>temperatura</strong> (típicamente $22\\text{–}25\\,^\\circ\\text{C}$), <strong>humedad relativa</strong> ($70\\text{–}80\\%$) y el <strong>fotoperiodo</strong> (ciclos luz/oscuridad, ej. 16 h luz / 8 h oscuridad).</li>
          </ul>
        `,
        images: []
      },
      {
        id: "t4_sec2",
        number: "4.2",
        title: "Cultivo de Meristemos y Rescate de Embriones",
        content: `
          <p class="leading-relaxed text-slate-300">
            <strong>Saneamiento de Plantas mediante Cultivo de Meristemos:</strong> Los meristemos apicales (domos celulares de menos de $0.2\\text{–}0.5\\text{ mm}$) carecen de tejido vascular diferenciado (xilema y floema) y presentan una tasa de división mitótica tan elevada que los virus no logran colonizarlos. El aislamiento y cultivo in vitro del ápice meristemático, en ocasiones combinado con termoterapia de la planta madre, permite <strong>obtener plantas libres de virus</strong> a partir de genotipos infectados de gran valor agrícola.
          </p>
          <p class="leading-relaxed text-slate-300">
            <strong>Rescate de Embriones:</strong> En cruzamientos intermorfos o intergenéricos orientados a la mejora genética (por ejemplo, cruce de variedades cultivadas con especies silvestres resistentes), el endospermo puede abortar antes de completar el desarrollo de la semilla. El rescate del embrión inmaduro y su cultivo in vitro permite sortear el aborto y regenerar plantas híbridas fértiles o conservarlas en bancos de germoplasma.
          </p>
        `,
        images: []
      },
      {
        id: "t4_sec3",
        number: "4.3",
        title: "Transformación Genética Vegetal: Agrobacterium vs. Biobalística",
        content: `
          <p class="leading-relaxed text-slate-300">
            La <strong>transformación genética</strong> permite transferir e integrar genes foráneos (transgenes) de cualquier especie en el genoma vegetal para conferir nuevas características agronómicas (resistencia a plagas, herbicidas, tolerancia a salinidad o valor nutricional).
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
            <div class="bg-slate-900 p-4 rounded-xl border border-emerald-500/40 space-y-2">
              <strong class="text-emerald-300 block text-sm">1. Transformación por <em>Agrobacterium tumefaciens</em></strong>
              <p>Bacteriófago del suelo que causa la "agalla de la corona". Posee el <strong>plásmido Ti (Tumor inducing)</strong>. Mediante ingeniería genética se desactiva su virulencia tumorigénica y se reemplaza el <strong>T-DNA (ADN de transferencia)</strong> por el gen de interés y un gen marcador de selección.</p>
              <p>• La bacteria transfiere de forma natural el T-DNA recombinante al núcleo de la célula vegetal, donde se integra de forma limpia en el cromosoma.</p>
            </div>
            <div class="bg-slate-900 p-4 rounded-xl border border-amber-500/40 space-y-2">
              <strong class="text-amber-300 block text-sm">2. Biobalística (Cañón de Partículas)</strong>
              <p>Método físico directo. Microproyectiles esféricos de oro o tungsteno de alta densidad ($1\\text{–}3\\,\\mu\\text{m}$) se recubren con el ADN recombinante que contiene el transgen.</p>
              <p>• Se disparan a gran velocidad mediante descargas de helio a alta presión contra suspensiones celulares o callos vegetales, penetrando físicamente la pared celular e integrándose en el genoma nuclear o cloroplástico.</p>
            </div>
          </div>
          <div class="p-3.5 rounded-xl bg-lime-950/40 border border-lime-500/40 my-3 text-lime-200 text-xs">
            <strong>Dato de Examen: Maíz Transgénico MON810 en España</strong><br>
            En 2016 se cultivaron en España <strong>$129.081\\text{ hectáreas}$ con el maíz transgénico MON810</strong> (creado por Monsanto), resistente al taladro del maíz mediante la expresión de la endotoxina Bt de <em>Bacillus thuringiensis</em>. Esta cifra supuso un incremento del $19.8\\%$ respecto a 2015 según ISAAA. <em>Advertencia de bioseguridad:</em> Se recomienda estrictamente no introducir transgénicos en los centros de origen de las especies cultivadas para prevenir la hibridación y escape génico hacia poblaciones silvestres emparentadas.
          </div>
        `,
        images: [
          {
            src: "assets/images/tema4_fig1_instalaciones_invitro.png",
            caption: "Figura 22: Construcción de un plásmido recombinante: digestión con enzimas de restricción del plásmido y del gen diana, y posterior unión covalente mediante ADN ligasa."
          },
          {
            src: "assets/images/tema4_fig4_agrobacterium.jpeg",
            caption: "Figura 23: Ciclo de transformación genética mediada por Agrobacterium tumefaciens: inserción del gen foráneo en el T-DNA del plásmido Ti, inoculación celular, regeneración in vitro y planta transgénica."
          },
          {
            src: "assets/images/tema4_fig5_biobalistica.png",
            caption: "Figura 24: Transformación vegetal por biobalística: bombardeo de partículas de oro recubiertas de ADN sobre explantes, multiplicación de callos transgénicos y regeneración de plántulas."
          }
        ]
      },
      {
        id: "t4_sec4",
        number: "4.4",
        title: "Micropropagación y sus 5 Fases Secuenciales (Fase 0 a Fase 4)",
        content: `
          <p class="leading-relaxed text-slate-300">
            La <strong>micropropagación</strong> es la multiplicación clonal masiva de plantas in vitro. Sus ventajas comerciales frente a la propagación vegetativa tradicional en campo son contundentes:
          </p>
          <ul class="list-disc pl-5 space-y-1 text-slate-300 my-2">
            <li><strong>Mayor tasa de multiplicación:</strong> Multiplica exponencialmente el número de plantas por unidad de tiempo.</li>
            <li><strong>Ahorro de espacio:</strong> Almacena millones de plántulas en estanterías climatizadas reducidas.</li>
            <li><strong>Control sanitario riguroso:</strong> Garantiza material certificado libre de patógenos y virus.</li>
            <li><strong>Planificación continua:</strong> Producción industrial independiente de las estaciones y el clima.</li>
            <li><em>Ejemplos comerciales:</em> Plantas ornamentales (orquídeas, claveles), portainjertos de árboles frutales (pies para injerto de melocotonero adaptados a suelos calizos o estrés hídrico), berenjena y zanahoria.</li>
          </ul>
          <h4 class="text-sm font-bold text-lime-400 mt-4 mb-1">Las 5 Fases Obligatorias (Figura 3)</h4>
          <ol class="list-decimal pl-5 space-y-2 text-slate-300 my-2">
            <li><strong>Fase 0: Selección y Preparación de la Planta Madre:</strong> Elección de genotipos élite con características diferenciales de mercado. Análisis de sanidad vegetal y tratamientos de saneamiento (meristemos + termoterapia).</li>
            <li><strong>Fase 1: Establecimiento del Cultivo In Vitro:</strong> Desinfección superficial de las yemas o explantes con hipoclorito de sodio/etanol. Si la asepsia falla, aparecerán colonias bacterianas o fúngicas en pocos días.</li>
            <li><strong>Fase 2: Multiplicación de Brotes:</strong> Inducción de nuevos brotes mediante la adición de <strong>citoquininas</strong> al medio de cultivo o regeneración adventicia repetida en ciclos sucesivos.</li>
            <li><strong>Fase 3: Enraizamiento:</strong> Transferencia de los brotes elongados a un medio suplementado con <strong>auxinas (como IBA o NAA)</strong> para inducir el sistema radicular adventicio.</li>
            <li><strong>Fase 4: Aclimatación:</strong> Paso crucial para evitar la muerte de la planta. Se transfieren las plantas enraizadas a sustrato in vivo en invernadero, reduciendo gradualmente la humedad ambiental (inicialmente bajo campanas o nebulización) para forzar a la planta a sintetizar cutícula cérea, regular la apertura estomática y activar la fotosíntesis autónoma.</li>
          </ol>
          <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-700 my-3 text-xs text-slate-300">
            <strong>Variación Somaclonal:</strong> Mutaciones genéticas o cromosómicas no deseadas que pueden surgir durante el cultivo in vitro (especialmente al pasar por fase de callo desdiferenciado). Debe controlarse la fidelidad clonal de las plantas comerciales mediante <strong>citometría de flujo</strong> (para verificar la constancia en el número cromosómico) y <strong>marcadores moleculares de ADN</strong>.
          </div>
        `,
        images: [
          {
            src: "assets/images/tema4_fig6_micropropagacion.jpeg",
            caption: "Figura 25: Diagrama esquemático oficial de las fases de un proceso de micropropagación (Figura 3): Planta seleccionada ➔ Análisis ➔ Saneamiento ➔ Establecimiento in vitro ➔ Multiplicación ➔ Enraizamiento ➔ Aclimatación."
          }
        ]
      },
      {
        id: "t4_sec5",
        number: "4.5",
        title: "Morfogénesis Vegetal: Ruta Organogénica vs. Ruta Embriogénica",
        content: `
          <p class="leading-relaxed text-slate-300">
            La <strong>morfogénesis</strong> es la génesis o diferenciación de nuevos órganos y estructuras funcionales a partir de células o tejidos. Es posible gracias a la <strong>totipotencia celular</strong>: la asombrosa plasticidad que permite a células somáticas diferenciadas desdiferenciarse y reorganizarse bajo estímulos hormonales específicos para formar una planta completa.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
            <div class="p-4 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-2">
              <strong class="text-cyan-300 block text-sm">1. Vía Organogénica (Unipolar)</strong>
              <p>Se diferencian meristemos que dan lugar a <strong>tallos o raíces de forma independiente</strong>. Los tallos deben posteriormente aislarse e inducirse a enraizar en un paso secundario.</p>
              <p>• <strong>Directa:</strong> Los brotes surgen directamente de las células del tejido del explante (ej. cotiledones de calabacín).</p>
              <p>• <strong>Indirecta:</strong> Requiere una fase intermedia de proliferación celular desorganizada llamada <strong>callo</strong>, a partir del cual se diferencian los meristemos (ej. hojas de berenjena).</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2">
              <strong class="text-emerald-300 block text-sm">2. Vía Embriogénica (Bipolar)</strong>
              <p>Se generan <strong>embriones somáticos (ES)</strong> a partir de células somáticas. Al igual que los embriones cigóticos derivados de la fecundación, los embriones somáticos son <strong>estructuras bipolares completas</strong> que poseen simultáneamente un ápice caulinar y una radícula conectada a un cilindro vascular cerrado.</p>
              <p>• Pasan por las mismas etapas ontogenéticas: <strong>globular $\\rightarrow$ corazón $\\rightarrow$ torpedo $\\rightarrow$ cotiledonar</strong>.</p>
              <p>• Al germinar, emiten tallo y raíz de manera sincronizada igual que una semilla real.</p>
            </div>
          </div>
          <h4 class="text-sm font-bold text-lime-400 mt-4 mb-1">Reguladores de Crecimiento: Auxinas vs. Citoquininas (Figura 2)</h4>
          <p class="leading-relaxed text-slate-300">
            El balance hormonal añadido al medio determina el destino morfogénico del explante:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 font-mono-code text-xs">
            <div class="bg-slate-900 p-3.5 rounded-xl border border-amber-500/40 space-y-1">
              <span class="text-amber-300 font-bold block border-b border-slate-800 pb-1">TIPO AUXINA (4 reguladores oficiales)</span>
              <div>• Ácido 3-indolacético (<strong>IAA</strong>)</div>
              <div>• Ácido 1-naftalenacético (<strong>NAA</strong>)</div>
              <div>• Ácido 3-indolbutírico (<strong>IBA</strong>)</div>
              <div>• Ácido 2,4-diclorofenoxiacético (<strong>2,4-D</strong>: clave para inducir embriogénesis somática)</div>
            </div>
            <div class="bg-slate-900 p-3.5 rounded-xl border border-cyan-500/40 space-y-1">
              <span class="text-cyan-300 font-bold block border-b border-slate-800 pb-1">TIPO CITOQUININA (5 reguladores oficiales)</span>
              <div>• Zeatina (<strong>Z</strong>)</div>
              <div>• 6-Bencil aminopurina (<strong>BA</strong>)</div>
              <div>• Isopentil adenina (<strong>IP</strong>)</div>
              <div>• Kinetina (<strong>K</strong>)</div>
              <div>• Tidiazurón (<strong>TDZ</strong>)</div>
            </div>
          </div>
        `,
        images: [
          {
            src: "assets/images/tema4_fig2_medios_nutritivos.png",
            caption: "Figura 26: Regeneración de berenjena por vía organogénica a partir de explantes de hoja (A) y embriones somáticos obtenidos a partir de raíces de zanahoria por vía embriogénica (B)."
          },
          {
            src: "assets/images/tema4_fig7_balanza_hormonal.jpeg",
            caption: "Figura 27: Tabla oficial de reguladores de crecimiento de tipo auxina (IAA, NAA, IBA, 2,4-D) y de tipo citoquinina (Z, BA, IP, K, TDZ) frecuentemente utilizados en micropropagación."
          },
          {
            src: "assets/images/tema4_fig8_embriogenesis.jpeg",
            caption: "Figura 28: Comparación morfogénica: A) Callo embriogénico, B) Embriones de zanahoria germinados a las 3 semanas, C) Callo con yemas en pimiento, D) Planta desarrollada a partir de callo organogénico."
          },
          {
            src: "assets/images/tema4_fig3_protoplastos.jpeg",
            caption: "Figura 29: Organogénesis directa (A) en cotiledones de calabacín e indirecta (B) a través de callo en berenjena."
          },
          {
            src: "assets/images/tema4_fig9_fases_embrion.png",
            caption: "Figura 30: Esquema de clasificación general de la morfogénesis vegetal: embriogénesis (directa e indirecta) frente a organogénesis (directa e indirecta)."
          }
        ]
      }
    ]
  }
};

