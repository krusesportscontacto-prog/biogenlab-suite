// ==========================================================================
// BIOGENLAB SUITE - NÚCLEO DE APLICACIÓN Y SISTEMA INTERACTIVO (app.js)
// Gestión de Estado, Audio Web-Audio, Enrutador, Simuladores y KaTeX
// ==========================================================================

// --------------------------------------------------------------------------
// 1. MOTOR DE AUDIO SINTETIZADO (Web Audio API - Cero dependencias externas)
// --------------------------------------------------------------------------
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  beep(freq = 440, type = 'sine', duration = 0.08, vol = 0.08) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  click() {
    this.beep(520, 'sine', 0.04, 0.04);
  }

  success() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.beep(freq, 'triangle', 0.15, 0.07);
        }, idx * 60);
      });
    } catch (e) {}
  }

  error() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      this.beep(220, 'sawtooth', 0.15, 0.08);
      setTimeout(() => this.beep(165, 'sawtooth', 0.2, 0.08), 80);
    } catch (e) {}
  }

  fanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => this.beep(freq, 'sine', 0.25, 0.1), idx * 90);
      });
    } catch (e) {}
  }
}

const SFX = new SoundEffects();

// --------------------------------------------------------------------------
// 2. ESTADO GLOBAL PERSISTENTE Y REACTIVO (localStorage)
// --------------------------------------------------------------------------
const STORAGE_KEY = 'biogenlab_suite_v1';

const defaultState = {
  xp: 0,
  completedModules: [],
  answeredQuiz: {},       // { [questionKey]: selectedOptionIndex }
  examExercises: {},      // { [exerciseId]: boolean }
  sound: true
};

let AppState = { ...defaultState };

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      AppState = { ...defaultState, ...parsed };
      SFX.enabled = AppState.sound !== false;
    }
  } catch (e) {
    console.warn('Error loading state from localStorage:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState));
  } catch (e) {}
}

function resetProgress() {
  if (confirm('¿Estás seguro de que deseas reiniciar todo el progreso y XP acumulados?')) {
    AppState = { ...defaultState };
    saveState();
    updateGlobalHUD();
    renderTopicCardsProgress();
    if (currentView.startsWith('tema')) {
      initTopicQuiz(currentView);
    }
    SFX.beep(300, 'sine', 0.3, 0.1);
    alert('Progreso reiniciado correctamente.');
  }
}

function toggleSound() {
  SFX.init();
  AppState.sound = !AppState.sound;
  SFX.enabled = AppState.sound;
  saveState();
  updateSoundButton();
  if (SFX.enabled) SFX.click();
}

function updateSoundButton() {
  const btn = document.getElementById('btn-sound-toggle');
  if (!btn) return;
  if (AppState.sound) {
    btn.innerHTML = '🔊 <span class="hidden sm:inline">Sonido: ON</span>';
    btn.classList.add('text-cyan-400', 'border-cyan-500/40');
    btn.classList.remove('text-slate-500', 'border-slate-800');
  } else {
    btn.innerHTML = '🔇 <span class="hidden sm:inline">Sonido: OFF</span>';
    btn.classList.add('text-slate-500', 'border-slate-800');
    btn.classList.remove('text-cyan-400', 'border-cyan-500/40');
  }
}

// --------------------------------------------------------------------------
// 3. PUNTUACIÓN IDEMPOTENTE Y RANGOS CIENTÍFICOS
// --------------------------------------------------------------------------
function addXP(amount, moduleKey = null) {
  if (moduleKey) {
    if (AppState.completedModules.includes(moduleKey)) {
      return; // Ya puntuado previamente, evita explotación
    }
    AppState.completedModules.push(moduleKey);
    const badge = document.getElementById(`badge-${moduleKey}`);
    if (badge) {
      badge.innerHTML = '✅ Dominado';
      badge.className = 'text-xs text-emerald-400 font-bold';
    }
  }
  AppState.xp += amount;
  saveState();
  updateGlobalHUD();
  renderTopicCardsProgress();
  SFX.success();
}

function calculateRank(xp, pct) {
  if (pct >= 95 || xp >= 2400) return 'Catedrático de Honor en Biotecnología Molecular';
  if (pct >= 75 || xp >= 1700) return 'Investigador Senior BioGenLab';
  if (pct >= 50 || xp >= 1100) return 'Especialista en Biotecnología y Marcadores';
  if (pct >= 30 || xp >= 600) return 'Analista Genómico y Splicing';
  if (pct >= 15 || xp >= 250) return 'Técnico de Electroforesis y PCR';
  return 'Aprendiz Novel de Laboratorio';
}

function updateGlobalHUD() {
  const xpEl = document.getElementById('global-xp');
  const rankEl = document.getElementById('global-rank');
  const masteryBar = document.getElementById('global-mastery-bar');
  const masteryPct = document.getElementById('global-mastery-pct');

  const totalItems = 28 + 30 + 30 + 28 + 11 + 13 + 18; // 158 ítems evaluables
  const answeredCount = Object.keys(AppState.answeredQuiz).length;
  const examCount = Object.keys(AppState.examExercises).length;
  const modCount = AppState.completedModules.length;

  const totalCompleted = answeredCount + examCount + modCount;
  const pct = Math.min(100, Math.round((totalCompleted / totalItems) * 100));

  if (xpEl) xpEl.textContent = `${AppState.xp} XP`;
  if (rankEl) rankEl.textContent = calculateRank(AppState.xp, pct);
  if (masteryBar) masteryBar.style.width = `${pct}%`;
  if (masteryPct) masteryPct.textContent = `${pct}%`;
}

// --------------------------------------------------------------------------
// 4. ENRUTADOR DE VISTAS (SPA Navigation)
// --------------------------------------------------------------------------
let currentView = 'dashboard';
const VALID_VIEWS = ['dashboard', 'tema1', 'tema2', 'tema3', 'tema4', 'exam-workshop', 'codex'];

function switchView(viewId, subtab = null) {
  if (!VALID_VIEWS.includes(viewId)) viewId = 'dashboard';
  currentView = viewId;
  SFX.click();

  VALID_VIEWS.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.classList.add('hidden');
  });

  const activeView = document.getElementById(`view-${viewId}`);
  if (activeView) activeView.classList.remove('hidden');

  // Breadcrumbs
  updateBreadcrumbs(viewId);

  // Subtab if requested
  if (subtab && viewId.startsWith('tema')) {
    switchTopicTab(viewId, subtab);
  } else if (viewId.startsWith('tema')) {
    switchTopicTab(viewId, 'hub');
  }

  // Trigger KaTeX rendering
  renderMath();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateBreadcrumbs(viewId) {
  const bc = document.getElementById('global-breadcrumbs');
  if (!bc) return;

  const names = {
    'dashboard': 'Panel Principal',
    'tema1': 'Tema 1: Genética y Genómica',
    'tema2': 'Tema 2: De la Mutación al Fenotipo',
    'tema3': 'Tema 3: Marcadores y Diversidad',
    'tema4': 'Tema 4: Cultivo In Vitro',
    'exam-workshop': 'Taller de Ejercicios de Examen (Word)',
    'codex': 'Códice Científico Universal'
  };

  if (viewId === 'dashboard') {
    bc.innerHTML = `<span>🏛️ Panel Principal</span>`;
  } else {
    bc.innerHTML = `
      <button onclick="switchView('dashboard')" class="text-slate-400 hover:text-cyan-400 transition">🏛️ Inicio</button>
      <span class="text-slate-600">/</span>
      <span class="text-cyan-300 font-semibold">${names[viewId]}</span>
    `;
  }
}

// Subtab navigation within a topic
function switchTopicTab(topicKey, tabKey) {
  SFX.click();
  const subtabs = {
    tema1: ['hub', 'sub1', 'sub2', 'sub3', 'sub4', 'arena', 'exercises'],
    tema2: ['hub', 'sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'arena', 'exercises'],
    tema3: ['hub', 'sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'arena', 'exercises'],
    tema4: ['hub', 'sub1', 'sub2', 'sub3', 'sub4', 'arena', 'test-oficial']
  };

  const list = subtabs[topicKey] || [];
  list.forEach(tab => {
    const sec = document.getElementById(`${topicKey}-sec-${tab}`);
    const btn = document.getElementById(`${topicKey}-tab-${tab}`);
    if (sec) sec.classList.add('hidden');
    if (btn) {
      btn.classList.remove('bg-cyan-500', 'bg-emerald-500', 'bg-indigo-500', 'bg-lime-500', 'text-slate-950', 'text-white');
      btn.classList.add('text-slate-300');
    }
  });

  const activeSec = document.getElementById(`${topicKey}-sec-${tabKey}`);
  const activeBtn = document.getElementById(`${topicKey}-tab-${tabKey}`);
  if (activeSec) activeSec.classList.remove('hidden');

  if (activeBtn) {
    activeBtn.classList.remove('text-slate-300');
    const colorClass = topicKey === 'tema1' ? 'bg-cyan-500 text-slate-950' :
                       topicKey === 'tema2' ? 'bg-emerald-500 text-slate-950' :
                       topicKey === 'tema3' ? 'bg-indigo-500 text-white' :
                       'bg-lime-500 text-slate-950';
    activeBtn.className += ` ${colorClass}`;
  }

  renderMath();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------------------------------------------------------------
// 5. MOTOR DE RENDERIZADO MATEMÁTICO (KaTeX)
// --------------------------------------------------------------------------
function renderMath() {
  if (typeof renderMathInElement === 'function') {
    try {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX render warning:', e);
    }
  }
}

// --------------------------------------------------------------------------
// 6. MOTOR DE QUIZ ARENA (Unificado para los 4 Temas)
// --------------------------------------------------------------------------
let quizStates = {
  tema1: { list: [], filtered: [], currentIdx: 0, subFilter: 'all' },
  tema2: { list: [], filtered: [], currentIdx: 0, subFilter: 'all' },
  tema3: { list: [], filtered: [], currentIdx: 0, subFilter: 'all' },
  tema4: { list: [], filtered: [], currentIdx: 0, subFilter: 'all' }
};

function initTopicQuiz(topicKey) {
  if (!window.BIOGENLAB_QUIZ_DATA || !window.BIOGENLAB_QUIZ_DATA[topicKey]) return;
  quizStates[topicKey].list = window.BIOGENLAB_QUIZ_DATA[topicKey];
  quizStates[topicKey].filtered = [...quizStates[topicKey].list];
  quizStates[topicKey].currentIdx = 0;
  renderQuizQuestion(topicKey);
}

function filterQuizBySub(topicKey, sub) {
  quizStates[topicKey].subFilter = sub;
  if (sub === 'all') {
    quizStates[topicKey].filtered = [...quizStates[topicKey].list];
  } else {
    quizStates[topicKey].filtered = quizStates[topicKey].list.filter(q => q.sub === sub);
  }
  quizStates[topicKey].currentIdx = 0;
  renderQuizQuestion(topicKey);
}

function renderQuizQuestion(topicKey) {
  const container = document.getElementById(`${topicKey}-quiz-container`);
  if (!container) return;

  const state = quizStates[topicKey];
  if (!state.filtered.length) {
    container.innerHTML = `<div class="p-6 text-center text-slate-400">No hay preguntas disponibles para este subtema.</div>`;
    return;
  }

  const q = state.filtered[state.currentIdx];
  const questionKey = `${topicKey}_q${q.id}`;
  const savedAnswer = AppState.answeredQuiz[questionKey];
  const isAnswered = savedAnswer !== undefined;

  let optionsHtml = '';
  q.options.forEach((opt, idx) => {
    let btnClass = 'w-full text-left p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs sm:text-sm text-slate-200 transition flex items-start gap-3';
    let disabledAttr = '';

    if (isAnswered) {
      disabledAttr = 'disabled';
      if (idx === q.correct) {
        btnClass = 'w-full text-left p-4 rounded-xl bg-emerald-950/60 border-2 border-emerald-500 text-xs sm:text-sm text-emerald-100 flex items-start gap-3 font-medium';
      } else if (idx === savedAnswer) {
        btnClass = 'w-full text-left p-4 rounded-xl bg-rose-950/60 border-2 border-rose-500 text-xs sm:text-sm text-rose-200 flex items-start gap-3';
      } else {
        btnClass = 'w-full text-left p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs sm:text-sm text-slate-500 flex items-start gap-3 opacity-60';
      }
    }

    optionsHtml += `
      <button onclick="handleAnswerSelection('${topicKey}', ${q.id}, ${idx})" id="${topicKey}-opt-${idx}" ${disabledAttr} class="${btnClass}">
        <span class="w-6 h-6 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center font-mono-code font-bold text-xs shrink-0">${String.fromCharCode(65 + idx)}</span>
        <span class="leading-relaxed">${opt}</span>
      </button>
    `;
  });

  const rationaleClass = isAnswered
    ? (savedAnswer === q.correct ? 'p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm' : 'p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs sm:text-sm')
    : 'hidden';
  const rationaleContent = isAnswered
    ? (savedAnswer === q.correct ? `✅ <strong>¡Respuesta Exacta!</strong> ${q.exp}` : `❌ <strong>Revisión Necesaria:</strong> ${q.exp}`)
    : '';

  // Count answered in this topic
  const answeredInTopic = state.list.filter(item => AppState.answeredQuiz[`${topicKey}_q${item.id}`] !== undefined).length;

  container.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono-code font-bold text-xs">Subtema ${q.sub}</span>
        <span class="text-xs text-slate-400 font-mono-code">Pregunta ${state.currentIdx + 1} de ${state.filtered.length}</span>
      </div>
      <span class="text-xs ${isAnswered ? 'text-emerald-400 font-bold' : 'text-slate-500'}">${isAnswered ? '✅ Ya evaluada' : '⏳ Sin responder'}</span>
    </div>

    <h3 class="text-base sm:text-lg font-bold text-white leading-snug pt-1">${q.q}</h3>

    <div class="space-y-2.5">
      ${optionsHtml}
    </div>

    <div id="${topicKey}-rationale" class="${rationaleClass}">
      ${rationaleContent}
    </div>

    <div class="flex items-center justify-between pt-4 border-t border-slate-800">
      <button onclick="navigateQuiz('${topicKey}', -1)" class="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold ${state.currentIdx === 0 ? 'opacity-40 pointer-events-none' : ''}">← Anterior</button>
      <span class="text-xs text-slate-400 font-mono-code">Completadas: ${answeredInTopic} / ${state.list.length}</span>
      <button onclick="navigateQuiz('${topicKey}', 1)" class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold ${state.currentIdx === state.filtered.length - 1 ? 'opacity-40 pointer-events-none' : ''}">Siguiente →</button>
    </div>
  `;

  renderMath();
}

function handleAnswerSelection(topicKey, qId, selectedIdx) {
  const state = quizStates[topicKey];
  const q = state.filtered[state.currentIdx];
  const questionKey = `${topicKey}_q${qId}`;

  AppState.answeredQuiz[questionKey] = selectedIdx;

  if (selectedIdx === q.correct) {
    SFX.success();
    addXP(25);
  } else {
    SFX.error();
    saveState();
  }

  renderQuizQuestion(topicKey);
}

function navigateQuiz(topicKey, dir) {
  const state = quizStates[topicKey];
  const nextIdx = state.currentIdx + dir;
  if (nextIdx >= 0 && nextIdx < state.filtered.length) {
    state.currentIdx = nextIdx;
    renderQuizQuestion(topicKey);
    SFX.click();
  }
}

// --------------------------------------------------------------------------
// 7. GLOSARIO Y CÓDICE CIENTÍFICO UNIFICADO
// --------------------------------------------------------------------------
function renderCodex(filterTopic = 'all', searchQuery = '') {
  const container = document.getElementById('codex-grid');
  if (!container || !window.BIOGENLAB_CODEX_DATA) return;

  const q = searchQuery.toLowerCase().trim();
  const entries = window.BIOGENLAB_CODEX_DATA.filter(item => {
    const matchTopic = (filterTopic === 'all') || (item.topic == filterTopic);
    const matchSearch = !q || item.term.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q);
    return matchTopic && matchSearch;
  });

  if (!entries.length) {
    container.innerHTML = `<div class="col-span-full p-8 text-center text-slate-500">No se encontraron términos coincidentes.</div>`;
    return;
  }

  container.innerHTML = entries.map(item => {
    const tagColors = {
      1: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      2: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      3: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      4: 'bg-lime-500/20 text-lime-300 border-lime-500/30'
    };

    return `
      <div class="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-[10px] uppercase font-mono-code font-bold px-2 py-0.5 rounded border ${tagColors[item.topic] || 'bg-slate-800 text-slate-400'}">${item.topicName}</span>
            <span class="text-[10px] font-mono-code text-slate-500">${item.tag}</span>
          </div>
          <h4 class="text-base font-bold text-white mb-2">${item.term}</h4>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${item.desc}</p>
        </div>
      </div>
    `;
  }).join('');

  renderMath();
}

function handleCodexSearch() {
  const searchInput = document.getElementById('codex-search-input');
  const filterSelect = document.getElementById('codex-topic-filter');
  const q = searchInput ? searchInput.value : '';
  const topic = filterSelect ? filterSelect.value : 'all';
  renderCodex(topic, q);
}

// --------------------------------------------------------------------------
// 8. TALLER DE EJERCICIOS DE EXAMEN (WORD DOCUMENT)
// --------------------------------------------------------------------------
function renderExamWorkshop() {
  const container = document.getElementById('exam-problems-list');
  if (!container || !window.EXAM_PROBLEMS) return;

  container.innerHTML = window.EXAM_PROBLEMS.map((prob, idx) => {
    const isCompleted = AppState.examExercises[prob.id] === true;
    const badgeColors = {
      tema1: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      tema2: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      tema3: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      tema4: 'bg-lime-500/20 text-lime-300 border-lime-500/30'
    };

    return `
      <div class="glass-panel p-6 rounded-2xl border ${isCompleted ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'} transition mb-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded border font-mono-code font-bold text-xs ${badgeColors[prob.topicId]}">${prob.number}</span>
            <span class="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono-code text-xs">${prob.badge}</span>
            <span class="text-xs font-semibold text-amber-400 font-mono-code">+${prob.xp} XP</span>
          </div>
          <span class="text-xs font-bold ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}">
            ${isCompleted ? '✅ Resuelto y Verificado' : '⏳ Pendiente de Resolver'}
          </span>
        </div>

        <h3 class="text-lg font-bold text-white mb-3">${prob.title}</h3>

        <div class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 whitespace-pre-line bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          ${prob.description}
        </div>

        <!-- Renderizado de solucion interactiva / acordeón -->
        <div class="space-y-3">
          <button onclick="toggleExamSolution('${prob.id}')" id="btn-sol-${prob.id}" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 transition flex items-center gap-2">
            <span>👁️ Mostrar Solución Oficial y Explicación Paso a Paso</span>
          </button>

          <div id="sol-box-${prob.id}" class="hidden p-5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3">
            ${formatExamSolution(prob)}
            
            <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span class="text-xs text-slate-400">¿Has asimilado este ejercicio oficial de examen?</span>
              <button onclick="markExamCompleted('${prob.id}', ${prob.xp})" class="px-4 py-2 rounded-xl ${isCompleted ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'} text-xs font-bold transition">
                ${isCompleted ? '✔️ Ejercicio Ya Superado' : '🎯 Marcar como Superado (+XP)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  renderMath();
}

function formatExamSolution(prob) {
  if (!prob.solution) return '';
  let html = '';
  Object.keys(prob.solution).forEach(k => {
    html += `<div class="mb-3">${prob.solution[k]}</div>`;
  });
  return html;
}

function toggleExamSolution(id) {
  const box = document.getElementById(`sol-box-${id}`);
  const btn = document.getElementById(`btn-sol-${id}`);
  if (!box || !btn) return;
  const isHidden = box.classList.contains('hidden');
  if (isHidden) {
    box.classList.remove('hidden');
    btn.innerHTML = '<span>🙈 Ocultar Solución Oficial</span>';
    renderMath();
  } else {
    box.classList.add('hidden');
    btn.innerHTML = '<span>👁️ Mostrar Solución Oficial y Explicación Paso a Paso</span>';
  }
}

function markExamCompleted(id, xp) {
  if (AppState.examExercises[id]) return;
  AppState.examExercises[id] = true;
  AppState.xp += xp;
  saveState();
  updateGlobalHUD();
  renderExamWorkshop();
  renderTema4OfficialTest();
  SFX.fanfare();
}

// --------------------------------------------------------------------------
// 9. CARDS DEL DASHBOARD Y PROGRESO GENERAL
// --------------------------------------------------------------------------
function renderTopicCardsProgress() {
  const topics = [
    { key: 'tema1', totalQ: 28, labs: 4 },
    { key: 'tema2', totalQ: 30, labs: 5 },
    { key: 'tema3', totalQ: 30, labs: 5 },
    { key: 'tema4', totalQ: 28, labs: 4 }
  ];

  topics.forEach(t => {
    let answered = 0;
    for (let i = 1; i <= t.totalQ; i++) {
      if (AppState.answeredQuiz[`${t.key}_q${i}`] !== undefined) answered++;
    }
    const completedLabs = AppState.completedModules.filter(m => m.startsWith(t.key)).length;
    const totalItems = t.totalQ + t.labs;
    const pct = Math.min(100, Math.round(((answered + completedLabs) / totalItems) * 100));

    const bar = document.getElementById(`card-bar-${t.key}`);
    const pctEl = document.getElementById(`card-pct-${t.key}`);
    if (bar) bar.style.width = `${pct}%`;
    if (pctEl) pctEl.textContent = `${pct}%`;
  });
}

// --------------------------------------------------------------------------
// 10. SIMULADORES ESPECÍFICOS DE CADA TEMA
// --------------------------------------------------------------------------

// --- TEMA 1 SIMS ---
function inspectDnaChem(key) {
  const box = document.getElementById('dna-chem-output');
  if (!box) return;
  const info = {
    miescher: `
      <div class="font-bold text-cyan-300">🧪 Friedrich Miescher (1871) y el aislamiento de la "Nucleína"</div>
      <p class="text-slate-300 mt-1">Aisló del núcleo de las <strong>células de pus</strong> una sustancia ácida rica en <strong>fósforo</strong> a la que llamó <strong>"nucleína"</strong>. De ese término procede directamente el nombre actual de <strong>ácido nucleico</strong>.</p>
    `,
    ngluc: `
      <div class="font-bold text-emerald-300">🔗 Enlace N-glucosídico (Intranucleotídico)</div>
      <p class="text-slate-300 mt-1">Es el enlace químico covalente que une directamente la <strong>base nitrogenada</strong> (purina de doble anillo A/G o pirimidina de un anillo C/T) con el carbono 1' de la <strong>pentosa (azúcar)</strong>.</p>
    `,
    fosfo: `
      <div class="font-bold text-amber-300">⛓️ Enlace Éster / Fosfodiéster (Polimerización)</div>
      <p class="text-slate-300 mt-1">Une el <strong>grupo fosfato</strong> con el <strong>azúcar de nucleótidos consecutivos</strong>, formando el <strong>esqueleto o eje azúcar-fosfato</strong> situado en los lados externos de la doble hélice (con carga negativa neta).</p>
    `,
    hbonds: `
      <div class="font-bold text-purple-300">🧲 Puentes de Hidrógeno y Hebras Antiparalelas (Watson y Crick)</div>
      <p class="text-slate-300 mt-1">Las bases se dirigen hacia el centro perpendiculares al eje: <strong>Adenina y Timina se unen por 2 puentes de H ($A=T$)</strong>; <strong>Guanina y Citosina por 3 puentes de H ($G\\equiv C$)</strong>. Las cadenas son antiparalelas: una va <strong>$5'\\text{P} \\rightarrow 3'\\text{OH}$</strong> y la complementaria <strong>$3'\\text{OH} \\rightarrow 5'\\text{P}$</strong>.</p>
    `
  };
  box.innerHTML = info[key];
  renderMath();
  SFX.click();
}

function updateThermalSim() {
  const slider = document.getElementById('temp-slider');
  const badge = document.getElementById('temp-badge');
  const view = document.getElementById('thermal-strand-view');
  if (!slider || !badge || !view) return;
  const temp = parseInt(slider.value, 10);

  if (temp < 65) {
    badge.textContent = `${temp} °C (Doble Hélice Hibridada)`;
    badge.className = 'px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono-code font-bold text-xs';
    view.innerHTML = `
      <div class="text-emerald-300 font-mono-code text-xs sm:text-sm">5'P — A — T — G — C — C — T — A — 3'OH  (Especie A)</div>
      <div class="text-slate-500 font-mono-code text-xs sm:text-sm">      ‖   ‖   ≡   ≡   ≡   ‖   ‖        (Puentes de H intactos)</div>
      <div class="text-cyan-300 font-mono-code text-xs sm:text-sm">3'OH— T — A — C — G — G — A — T — 5'P  (Complementaria)</div>
      <p class="text-slate-400 font-sans pt-2 text-xs">🔄 <strong>Hibridar = re-naturalizar:</strong> Al enfriarse, las hebras complementarias (incluso de especies distintas gracias a la universalidad del ADN) vuelven a unirse por puentes de hidrógeno.</p>
    `;
  } else if (temp < 92) {
    badge.textContent = `${temp} °C (Apertura Parcial)`;
    badge.className = 'px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono-code font-bold text-xs';
    view.innerHTML = `
      <div class="text-emerald-300 font-mono-code text-xs sm:text-sm">5'P — A   T   G — C — C   T   A — 3'OH</div>
      <div class="text-amber-400 font-mono-code text-xs sm:text-sm">      ·   ·   ≡   ≡   ≡   ·   ·  (Los pares A=T de 2 puentes se abren antes que G≡C de 3 puentes)</div>
      <div class="text-cyan-300 font-mono-code text-xs sm:text-sm">3'OH— T   A   C — G — G   A   T — 5'P</div>
    `;
  } else {
    badge.textContent = `${temp} °C (¡Desnaturalización Térmica!)`;
    badge.className = 'px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-mono-code font-bold text-xs';
    view.innerHTML = `
      <div class="text-emerald-300 pb-2 font-mono-code text-xs sm:text-sm">5'P — A — T — G — C — C — T — A — 3'OH  (Hebra 1 separada)</div>
      <div class="text-rose-400 text-xs font-sans">🔥 Alrededor de <strong>100 °C</strong> se rompen los puentes de hidrógeno (pero NO los enlaces fosfodiéster). Esta apertura también es el 1º paso indispensable en la replicación celular por las ADN polimerasas.</div>
      <div class="text-cyan-300 pt-2 font-mono-code text-xs sm:text-sm">3'OH— T — A — C — G — G — A — T — 5'P  (Hebra 2 separada)</div>
    `;
  }
}

function updateChargaffCalc() {
  const slider = document.getElementById('chg-slider');
  if (!slider) return;
  const a = parseInt(slider.value, 10);
  const t = a;
  const gcTotal = 100 - (a + t);
  const g = gcTotal / 2;
  const c = g;

  const aVal = document.getElementById('chg-a-val');
  if (aVal) aVal.textContent = `${a}%`;

  const breakdown = document.getElementById('chg-breakdown');
  if (breakdown) {
    breakdown.innerHTML = `
      <div class="p-2 rounded bg-slate-950 border border-slate-800 text-cyan-300">Adenina (A): <strong>${a}%</strong></div>
      <div class="p-2 rounded bg-slate-950 border border-slate-800 text-cyan-300">Timina (T = A): <strong>${t}%</strong></div>
      <div class="p-2 rounded bg-slate-950 border border-slate-800 text-purple-300">Guanina (G): <strong>${g}%</strong></div>
      <div class="p-2 rounded bg-slate-950 border border-slate-800 text-purple-300">Citosina (C = G): <strong>${c}%</strong></div>
    `;
  }

  const exp = document.getElementById('chg-explanation');
  if (exp) {
    exp.innerHTML = `
      <p>• <strong>Suma de Purinas $(A + G)$:</strong> ${a}% + ${g}% = <strong>50%</strong>.</p>
      <p>• <strong>Suma de Pirimidinas $(T + C)$:</strong> ${t}% + ${c}% = <strong>50%</strong>. Se cumple siempre $(A+G) = (T+C)$.</p>
      <p>• <strong>Proporción específica $(A+T)$ vs $(G+C)$:</strong> $(A+T) = ${a+t}\\%$ frente a $(G+C) = ${gcTotal}\\%$. Esta proporción es <strong>idéntica en todas las células de los individuos de una misma especie, pero varía al cambiar de especie</strong>.</p>
    `;
  }
  renderMath();
}

function verifyChargaffChallenge() {
  addXP(50, 'tema1_sub1');
  const exp = document.getElementById('chg-explanation');
  if (exp && !exp.innerHTML.includes('¡Dominio de Subtema 1')) {
    exp.innerHTML += `<div class="mt-2 p-2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">🎉 ¡Dominio de Subtema 1 registrado! (+50 XP)</div>`;
  }
}

let currentGelDye = 'etbr';
function toggleGelDye() {
  currentGelDye = currentGelDye === 'etbr' ? 'sybr' : 'etbr';
  const btn = document.getElementById('btn-dye');
  const bands = ['sample-band-large', 'sample-band-med', 'sample-band-small'];
  if (currentGelDye === 'sybr') {
    if (btn) {
      btn.textContent = '🎨 Colorante: SYBR Safe (Verde UV)';
      btn.className = 'px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-300 font-bold rounded-xl transition';
    }
    bands.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.className = 'h-2 rounded bg-emerald-400 sybr-glow transition-all duration-700';
    });
  } else {
    if (btn) {
      btn.textContent = '🎨 Colorante: Bromuro de Etidio (Luz UV)';
      btn.className = 'px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-rose-300 font-bold rounded-xl transition';
    }
    bands.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.className = 'h-2 rounded bg-rose-500 uv-glow transition-all duration-700';
    });
  }
  SFX.click();
}

function runGelSimulation() {
  const fb = document.getElementById('gel-sim-feedback');
  if (fb) {
    fb.innerHTML = `✅ <strong>¡Electroforesis y Revelado UV Completados!</strong> El ADN (con carga negativa por sus grupos fosfato) migró hacia el <strong>ánodo (+)</strong> a través del tamiz de agarosa/poliacrilamida. Comparando con el <strong>marcador "ladder"</strong>, tu muestra contiene 3 bandas de <strong>10.000 pb, 1.000 pb (1 kb) y 200 pb</strong> teñidas con ${currentGelDye === 'etbr' ? 'Bromuro de Etidio' : 'SYBR Safe'} bajo luz ultravioleta. (+50 XP)`;
    fb.className = 'text-xs text-emerald-200 bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/40';
  }
  addXP(50, 'tema1_sub2');
}

function inspectChromatinLevel(lvl) {
  const box = document.getElementById('chromatin-scale-box');
  if (!box) return;
  const levels = {
    '2nm': `<strong>Doble hélice de ADN ($2\\text{ nm}$):</strong> Hebra desnuda bicatenaria antes de asociarse con las proteínas básicas histonas.`,
    '11nm': `<strong>Nucleosoma ("Cuentas en un collar"):</strong> Primer nivel básico de empaquetamiento. El ADN se enrolla alrededor de un "carrete" u <strong>octámero formado por 8 moléculas de histonas</strong> (más la histona <strong>H1</strong> que fija la vuelta).`,
    '30nm': `<strong>Fibra de $30\\text{ nm}$ (Solenoide):</strong> Los nucleosomas se empaquetan enrollándose en una espiral densa sobre sí mismos.`,
    '300_700nm': `<strong>Bucles/Asas ($300\\text{ nm}$) y Espiral Condensada ($700\\text{ nm}$):</strong> Las espirales se pliegan formando asas ancladas a un andamiaje proteico ($300\\text{ nm}$) que se enrollan aún más ($700\\text{ nm}$).`,
    '1400nm': `<strong>Cromosoma en Metafase ($1400\\text{ nm}$):</strong> Grado de máxima compactación de la cromatina, visible al microscopio óptico durante la división celular (mitosis y meiosis).`
  };
  box.innerHTML = levels[lvl];
  renderMath();
  SFX.click();
}

function inspectChromatinType(type) {
  const box = document.getElementById('chromatin-type-box');
  if (!box) return;
  if (type === 'eu') {
    box.innerHTML = `<strong class="text-emerald-300">🔓 Eucromatina:</strong> Forma menos condensada, desespiralizada y relajada del ADN. Corresponde a la fracción <strong>transcripcionalmente activa</strong>, donde la maquinaria enzimática puede acceder para sintetizar ARNm.`;
  } else if (type === 'const') {
    box.innerHTML = `<strong class="text-rose-300">🔒 Heterocromatina Constitutiva:</strong> Se mantiene <strong>siempre compacta y silenciada en todos los tipos celulares</strong> de un organismo (por ejemplo, en las regiones pericentroméricas y en los <strong>centrómeros y telómeros</strong> de los cromosomas).`;
  } else {
    box.innerHTML = `<strong class="text-purple-300">🌗 Heterocromatina Facultativa (Corpúsculo de Barr):</strong> Puede <strong>alternar reversiblemente</strong> entre un estado compacto o relajado según la estirpe celular o momento del desarrollo. Ejemplo clásico: la <strong>inactivación de uno de los cromosomas X en las células somáticas de las hembras de mamíferos, formando el corpúsculo de Barr</strong>.`;
  }
  SFX.click();
}

const targetSangerSynthesized = ['A', 'C', 'T', 'G', 'C', 'A'];
let userSangerSeq = [];

function addSangerBase(base) {
  if (userSangerSeq.length >= targetSangerSynthesized.length) return;
  const expected = targetSangerSynthesized[userSangerSeq.length];
  const fb = document.getElementById('sanger-feedback');

  if (base === expected) {
    userSangerSeq.push(base);
    const seqEl = document.getElementById('sanger-built-seq');
    if (seqEl) seqEl.textContent = `5'- ${userSangerSeq.join('')} -3'`;
    SFX.click();

    if (userSangerSeq.length === targetSangerSynthesized.length) {
      if (fb) {
        fb.className = 'p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-200';
        fb.innerHTML = `
          🎉 <strong>¡Secuenciación de Sanger Perfecta! (+50 XP)</strong><br>
          • <strong>ADN Sintetizado (leído de abajo a arriba, $5'\\rightarrow 3'$):</strong> <span class="font-mono-code font-bold">5'- ACTGCA -3'</span><br>
          • <strong>Cadena Molde Original del Melón ($3'\\rightarrow 5'$):</strong> <span class="font-mono-code font-bold">3'- TGACGT -5'</span> (escrita $5'\\rightarrow 3'$: <span class="font-mono-code font-bold">5'- TGCAGT -3'</span>).
        `;
      }
      addXP(50, 'tema1_sub3');
      renderMath();
    } else {
      if (fb) {
        fb.className = 'p-3 rounded-lg bg-slate-950 border border-emerald-500/30 text-emerald-300';
        fb.innerHTML = `✅ Correcto (${userSangerSeq.length}/6). Sube a la siguiente banda superior (${5 + userSangerSeq.length + 1} nt).`;
      }
    }
  } else {
    SFX.error();
    if (fb) {
      fb.className = 'p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-200';
      fb.innerHTML = `⚠️ Error de lectura: Estás leyendo la banda nº ${userSangerSeq.length + 1} desde abajo (${6 + userSangerSeq.length} nt). Mira qué tubo tiene la banda en esa fila.`;
    }
  }
}

function resetSangerGel() {
  userSangerSeq = [];
  const seqEl = document.getElementById('sanger-built-seq');
  if (seqEl) seqEl.textContent = `5'- `;
  const fb = document.getElementById('sanger-feedback');
  if (fb) {
    fb.className = 'p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300';
    fb.innerHTML = 'Empieza por la banda más baja (6 nt = 5 nt del primer + 1º ddNTP). ¿En qué carril está?';
  }
}

function inspectHumanGenomeBranch(branch) {
  const box = document.getElementById('genome-branch-detail');
  if (!box) return;
  if (branch === 'genes') {
    box.innerHTML = `
      <div class="font-bold text-emerald-300">🟢 Genes y secuencias relacionadas con genes: <strong>1.200 Mb</strong> (de $3.200\\text{ Mb}$)</div>
      <ul class="list-disc list-inside text-slate-300 space-y-1 mt-1 text-xs sm:text-sm">
        <li><strong>Exones (codificantes):</strong> solo <strong>48 Mb</strong> (¡apenas el 1,5% del genoma humano total!).</li>
        <li><strong>Secuencias relacionadas con genes:</strong> <strong>1.152 Mb</strong> (Seudogenes, Fragmentos de genes, Intrones y RNT).</li>
      </ul>
    `;
  } else {
    box.innerHTML = `
      <div class="font-bold text-rose-300">🔴 DNA Intergénico: <strong>2.000 Mb</strong> (de $3.200\\text{ Mb}$)</div>
      <ul class="list-disc list-inside text-slate-300 space-y-1 mt-1 text-xs sm:text-sm">
        <li><strong>Repeticiones en todo el genoma (1.400 Mb):</strong> LINE (640 Mb), SINE (420 Mb), LTR (250 Mb), Transposones de ADN (90 Mb).</li>
        <li><strong>Otras regiones intergénicas (600 Mb):</strong> Microsatélites (90 Mb) y diversos (510 Mb).</li>
      </ul>
    `;
  }
  renderMath();
  SFX.click();
}

function simGenomeElement(type) {
  const box = document.getElementById('sub4-sim-output');
  if (!box) return;
  if (type === 'transposon') {
    box.innerHTML = `
      <div class="font-bold text-rose-300">🦗 Transposones ("Genes Saltarines")</div>
      <p class="text-slate-300 text-xs sm:text-sm mt-1">Fragmentos de ADN no traducibles en el ADN intergénico que se mueven por el genoma, pudiendo provocar reordenaciones o mutaciones al insertarse.</p>
    `;
  } else if (type === 'pseudogene') {
    box.innerHTML = `
      <div class="font-bold text-amber-300">🏺 Seudogenes ("Falsos Genes")</div>
      <p class="text-slate-300 text-xs sm:text-sm mt-1">Secuencias muy similares a genes funcionales que perdieron su capacidad de expresión por mutaciones deletéreas. Actúan como reservorio génico evolutivo.</p>
    `;
  } else if (type === 'repertoire') {
    box.innerHTML = `
      <div class="font-bold text-emerald-300">📈 Repertorio Génico y Potencial Evolutivo</div>
      <p class="text-slate-300 text-xs sm:text-sm mt-1">Un mayor repertorio confiere mayor plasticidad para evolucionar ante nuevas presiones bióticas o climáticas.</p>
    `;
  } else {
    box.innerHTML = `
      <div class="font-bold text-cyan-300">🧩 Estructura Fragmentada del Gen Eucariota</div>
      <p class="text-slate-300 text-xs sm:text-sm mt-1">Exones (codificantes maduros), Intrones (eliminados por splicing con 5' Cap y 3' Poli-A) y regiones reguladoras flanqueantes.</p>
    `;
    addXP(50, 'tema1_sub4');
  }
  SFX.click();
}

// --- TEMA 2 SIMS ---
const dnaCoding =   ['A', 'T', 'G', 'C', 'G', 'G', 'T', 'A', 'C'];
const dnaTemplate = ['T', 'A', 'C', 'G', 'C', 'C', 'A', 'T', 'G'];
const expectedRna = ['A', 'U', 'G', 'C', 'G', 'G', 'U', 'A', 'C'];
let currentRnaIndex = 0;

function renderSub1Strands() {
  const codingRow = document.getElementById('dna-coding-row');
  const templateRow = document.getElementById('dna-template-row');
  const rnaRow = document.getElementById('rna-synth-row');
  if (!codingRow || !templateRow || !rnaRow) return;

  codingRow.innerHTML = '';
  templateRow.innerHTML = '';
  rnaRow.innerHTML = '';

  dnaCoding.forEach(b => {
    codingRow.innerHTML += `<span class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-slate-800 text-slate-400 font-mono-code text-xs font-bold">${b}</span>`;
  });

  dnaTemplate.forEach((b, idx) => {
    const highlight = idx === currentRnaIndex ? 'ring-2 ring-cyan-400 bg-cyan-500/20 text-white font-bold' : 'bg-slate-800 text-cyan-300';
    templateRow.innerHTML += `<span class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded font-mono-code text-xs ${highlight}">${b}</span>`;
  });

  expectedRna.forEach((b, idx) => {
    if (idx < currentRnaIndex) {
      rnaRow.innerHTML += `<span class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-emerald-500 text-slate-950 font-bold font-mono-code text-xs">${b}</span>`;
    } else if (idx === currentRnaIndex) {
      rnaRow.innerHTML += `<span class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded border border-dashed border-emerald-400 text-emerald-400 font-mono-code text-xs animate-pulse">?</span>`;
    } else {
      rnaRow.innerHTML += `<span class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded bg-slate-950 text-slate-700 font-mono-code text-xs">·</span>`;
    }
  });

  const statusEl = document.getElementById('sub1-status');
  if (statusEl) statusEl.textContent = `Progreso: ${currentRnaIndex}/${expectedRna.length} bases`;
}

function addRnaBase(base) {
  if (currentRnaIndex >= expectedRna.length) return;
  const fb = document.getElementById('sub1-feedback');
  const targetTemplate = dnaTemplate[currentRnaIndex];
  const correctRna = expectedRna[currentRnaIndex];

  if (base === 'T') {
    SFX.error();
    if (fb) {
      fb.innerHTML = `❌ <strong>¡Error bioquímico!</strong> En el ARN no existe la Timina (T); el <strong>Uracilo (U)</strong> reemplaza a la timina para emparejarse con la Adenina del ADN.`;
      fb.className = 'text-xs font-medium text-rose-300 bg-rose-950/40 p-3 rounded-lg border border-rose-500/40';
    }
    return;
  }

  if (base === correctRna) {
    currentRnaIndex++;
    renderSub1Strands();
    SFX.click();
    if (currentRnaIndex === expectedRna.length) {
      if (fb) {
        fb.innerHTML = `🎉 <strong>¡Transcripción 5'→3' completada con éxito!</strong> La ARN polimerasa se unió al promotor, leyó la hebra molde 3'→5' e incorporó ribonucleótidos generando <strong>AUG</strong> y <strong>CGG (Arginina)</strong>. (+50 XP)`;
        fb.className = 'text-xs font-medium text-emerald-300 bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/40';
      }
      addXP(50, 'tema2_sub1');
    } else {
      if (fb) {
        fb.innerHTML = `✅ Correcto: La base <strong>${targetTemplate}</strong> del molde se empareja con <strong>${base}</strong> en el ARNm (5'→3').`;
        fb.className = 'text-xs font-medium text-emerald-300 bg-slate-900 p-3 rounded-lg border border-emerald-500/30';
      }
    }
  } else {
    SFX.error();
    if (fb) {
      fb.innerHTML = `⚠️ En el molde hay una <strong>${targetTemplate}</strong>. Recuerda las reglas: A→U, T→A, C→G, G→C.`;
      fb.className = 'text-xs font-medium text-amber-300 bg-amber-950/40 p-3 rounded-lg border border-amber-500/40';
    }
  }
}

function resetSub1Lab() {
  currentRnaIndex = 0;
  renderSub1Strands();
}

function updateRegSimulator() {
  const enh = document.getElementById('chk-enhancer')?.checked;
  const sil = document.getElementById('chk-silencer')?.checked;
  const utr5 = document.getElementById('chk-5utr')?.checked;
  const end3 = document.getElementById('chk-3end')?.checked;
  const out = document.getElementById('reg-sim-output');
  if (!out) return;

  if (sil) {
    out.className = 'p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs space-y-1 text-rose-200';
    out.innerHTML = `<strong>🛑 Transcripción Bloqueada por Silenciador:</strong> Los represores bloquean la ARN polimerasa impidiendo la transcripción.`;
    return;
  }
  if (!utr5) {
    out.className = 'p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs space-y-1 text-amber-200';
    out.innerHTML = `<strong>⚠️ Fallo de Inicio en 5' UTR:</strong> El ribosoma no reconoce el extremo 5' y no puede acoplarse para iniciar la traducción.`;
    return;
  }
  if (!end3) {
    out.className = 'p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs space-y-1 text-rose-200';
    out.innerHTML = `<strong>🚨 Aborto Ribosómico (Extremo 3' dañado):</strong> El ribosoma interpreta que el ARNm está roto y aborta la síntesis.`;
    return;
  }

  if (enh) {
    out.className = 'p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs space-y-1 text-emerald-200';
    out.innerHTML = `<strong>🚀 Expresión Génica Máxima:</strong> El potenciador distante estimula la tasa transcripcional por plegamiento 3D de cromatina. (+25 XP)`;
    addXP(25, 'tema2_reg');
  } else {
    out.className = 'p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs space-y-1 text-cyan-200';
    out.innerHTML = `<strong>✔️ Expresión Basal:</strong> Sin enhancer, la transcripción es basal pero se traduce con normalidad.`;
  }
}

function inspectTomatoOrgan(organ) {
  const box = document.getElementById('tomato-transcriptome-box');
  if (!box) return;
  if (organ === 'raiz') {
    box.innerHTML = `<div class="font-bold text-amber-300">🌱 Células de Raíz:</div><p class="text-slate-300 text-xs sm:text-sm">ADN 99% idéntico. Transcribe intensamente genes de absorción mineral y silencia genes de fotosíntesis y maduración.</p>`;
  } else if (organ === 'hoja') {
    box.innerHTML = `<div class="font-bold text-emerald-300">🍃 Células de Hoja:</div><p class="text-slate-300 text-xs sm:text-sm">ADN 99% idéntico. Transcribe activamente genes fotosintéticos y transporte vascular.</p>`;
  } else {
    box.innerHTML = `<div class="font-bold text-rose-400">🍅 Células de Fruto:</div><p class="text-slate-300 text-xs sm:text-sm">ADN 99% idéntico. Transcribe masivamente genes de licopeno, azúcares y ablandamiento del fruto.</p>`;
  }
  SFX.click();
}

const spliceState = { I1: true, I2: true, E1: true, E2: true, E3: true, PA: false };

function toggleSpliceUnit(key) {
  spliceState[key] = !spliceState[key];
  const btn = document.getElementById(`sp-${key}`);
  if (!btn) return;
  SFX.click();

  if (key.startsWith('I')) {
    if (spliceState[key]) {
      btn.textContent = `Intrón ${key[1]} (Presente en pre-ARNm)`;
      btn.className = 'px-3 py-2 rounded-lg font-mono-code font-bold text-xs bg-rose-500/20 border border-rose-500 text-rose-300';
    } else {
      btn.textContent = `Intrón ${key[1]} (✂️ Escindido)`;
      btn.className = 'px-3 py-2 rounded-lg font-mono-code font-bold text-xs bg-slate-900 border border-slate-700 text-slate-500 line-through';
    }
  } else if (key.startsWith('E')) {
    if (spliceState[key]) {
      btn.textContent = `Exón ${key[1]} (Incluido)`;
      btn.className = 'px-3 py-2 rounded-lg font-mono-code font-bold text-xs bg-emerald-500 text-slate-950';
    } else {
      btn.textContent = `Exón ${key[1]} (Omitido - Splicing Alt.)`;
      btn.className = 'px-3 py-2 rounded-lg font-mono-code font-bold text-xs bg-slate-900 border border-emerald-500/40 text-emerald-400';
    }
  } else if (key === 'PA') {
    if (spliceState.PA) {
      btn.textContent = `+ Cola 3' Poli-A (AAAAA Añadida)`;
      btn.className = 'px-3 py-2 rounded-lg font-mono-code font-bold text-xs bg-purple-500 text-slate-950';
    } else {
      btn.textContent = `+ Cola 3' Poli-A (Sin añadir)`;
      btn.className = 'px-3 py-2 rounded-lg font-mono-code font-bold text-xs bg-slate-800 border border-slate-600 text-slate-300';
    }
  }
}

function exportMrnaToCytoplasm() {
  const res = document.getElementById('splicing-result');
  if (!res) return;

  if (spliceState.I1 || spliceState.I2) {
    SFX.error();
    res.className = 'p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200';
    res.innerHTML = `❌ <strong>Error Nuclear:</strong> ¡ARNm con intrones! Los intrones nunca viajan al citoplasma; son escindidos y degradados en el núcleo.`;
    return;
  }
  if (!spliceState.PA) {
    SFX.error();
    res.className = 'p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200';
    res.innerHTML = `⚠️ <strong>ARNm Degradado:</strong> Falta la cola 3' Poli-A para proteger el extremo 3' frente a exonucleasas citoplasmáticas.`;
    return;
  }
  if (!spliceState.E1 || !spliceState.E3) {
    SFX.error();
    res.className = 'p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200';
    res.innerHTML = `⚠️ <strong>Falta Codón de Inicio o de Parada:</strong> Necesitas conservar el Exón 1 (ATG) y el Exón 3 (TGA).`;
    return;
  }

  const isoform = spliceState.E2 ? 'Isoforma A Completa (Exón 1 + Exón 2 + Exón 3)' : 'Isoforma B Alternativa (Exón 1 + Exón 3)';
  res.className = 'p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200';
  res.innerHTML = `🎉 <strong>¡Splicing y Exportación Exitosos!</strong> Has generado la <strong>${isoform}</strong> con 5' Cap y 3' Poli-A. (+50 XP)`;
  addXP(50, 'tema2_sub2');
}

let wmCurrentStep = 0;
function runWatermelonStep(step) {
  const fb = document.getElementById('watermelon-feedback');
  if (step !== wmCurrentStep + 1) {
    if (fb) fb.innerHTML = `⚠️ Debes ejecutar el <strong>Paso ${wmCurrentStep + 1}</strong> primero.`;
    SFX.error();
    return;
  }
  wmCurrentStep = step;
  const btn = document.getElementById(`wm-step-${step}`);
  if (btn) {
    btn.classList.remove('opacity-60', 'border-slate-800');
    btn.classList.add('border-emerald-500', 'bg-emerald-950/20');
  }

  const messages = {
    1: `✅ <strong>Paso 1 (Colchicina):</strong> Despolimeriza microtúbulos del huso acromático, duplicando cromosomas a $4n$.`,
    2: `✅ <strong>Paso 2 (Cruzamiento 4n x 2n):</strong> La planta $4n$ da gametos $2n$; la diploide $2n$ da gametos $1n$.`,
    3: `✅ <strong>Paso 3 (Obtención del Triploide 3n):</strong> Fecundación $2n + 1n = 3n$.`,
    4: `✅ <strong>Paso 4 (Meiosis Caótica = Apirenia):</strong> En profase I los 3 juegos no forman bivalentes equilibrados; se abortan semillas dando sandías sin pepitas.`,
    5: `🎉 <strong>¡Protocolo Agronómico Exitoso! (Paso 5):</strong> Propagación vegetativa/in vitro o repetición del cruce parental. (+50 XP)`
  };

  if (fb) fb.innerHTML = messages[step];
  renderMath();
  SFX.click();
  if (step === 5) addXP(50, 'tema2_sub4');
}

function resetWatermelonSim() {
  wmCurrentStep = 0;
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`wm-step-${i}`);
    if (el) el.className = 'p-3 rounded-xl bg-slate-900 border border-slate-800 text-left opacity-60 hover:bg-slate-800 transition text-xs';
  }
  const step1 = document.getElementById('wm-step-1');
  if (step1) step1.classList.remove('opacity-60');
  const fb = document.getElementById('watermelon-feedback');
  if (fb) fb.innerHTML = 'Pulsa en el <strong>Paso 1</strong> para aplicar colchicina sobre meristemos $2n$.';
}

function showTillingStage(stage) {
  const box = document.getElementById('tilling-output');
  if (!box) return;
  const stages = {
    1: `<strong>Fase 1 ($M_1$ - EMS):</strong> Mutagénesis química alquilante provocando transiciones G/C $\\rightarrow$ A/T.`,
    2: `<strong>Fase 2 ($M_2$ - Extracción):</strong> Autofecundación y aislamiento de ADN de hojas.`,
    3: `<strong>Fase 3 ($M_3$ - Genética Inversa):</strong> Cribado molecular por PCR para hallar mutaciones en el gen de interés.`,
    4: `<strong>Fase 4 ($M_4$ - Variedad No-OGM):</strong> Semillas mejoradas comerciales sin regulación de transgénicos. (+25 XP)`
  };
  box.innerHTML = stages[stage];
  renderMath();
  SFX.click();
  if (stage === 4) addXP(25, 'tema2_sub5');
}

function setEpigeneticState(state) {
  const box = document.getElementById('epigenetic-output');
  if (!box) return;
  if (state === 'active') {
    box.innerHTML = `<div class="font-bold text-emerald-400">🍅 Tomate Maduro (Eucromatina Activa):</div><p class="text-slate-300 text-xs sm:text-sm">Histonas acetiladas y promotor desmetilado: expresión normal del gen de maduración.</p>`;
  } else if (state === 'cnr') {
    box.innerHTML = `<div class="font-bold text-amber-300">🍋 Epimutante Cnr (Manning et al., 2006):</div><p class="text-slate-300 text-xs sm:text-sm">Hipermetilación del promotor, MeCP2 recluta HDAC, desacetilación de histonas y cromatina compactada.</p>`;
  } else {
    box.innerHTML = `<div class="font-bold text-rose-400">🔴 Reversión Somática Espontánea:</div><p class="text-slate-300 text-xs sm:text-sm">Desmetilación estocástica del ADN que recupera sectores rojos en el fruto.</p>`;
  }
  SFX.click();
}

// --- TEMA 3 SIMS ---
let cutEnzymesVisited = new Set();
function cutWithEnzyme(enz) {
  cutEnzymesVisited.add(enz);
  const box = document.getElementById('enzyme-cut-display');
  if (!box) return;
  const data = {
    ecori: `
      <div class="font-bold text-indigo-400 text-xs sm:text-sm">✂️ EcoRI: Reconoce 5'-GAATTC-3', corte escalonado entre G y A (Extremos cohesivos/pegajosos AATTC).</div>
    `,
    psti: `
      <div class="font-bold text-cyan-400 text-xs sm:text-sm">✂️ PstI: Reconoce 5'-CTGCAG-3', corte escalonado entre A y G (Extremos cohesivos CTGCA).</div>
    `,
    haeiii: `
      <div class="font-bold text-amber-400 text-xs sm:text-sm">✂️ HaeIII: Reconoce 5'-GGCC-3', corte simétrico central entre G y C (Extremos Romos sin colas libres).</div>
    `
  };
  box.innerHTML = data[enz];
  SFX.click();
  if (cutEnzymesVisited.size === 3) addXP(50, 'tema3_sub1');
}

let rflpStep = 0;
function runRflpStep(step) {
  const out = document.getElementById('rflp-step-output');
  if (step !== rflpStep + 1) {
    if (out) out.innerHTML = `⚠️ Ejecuta el <strong>Paso ${rflpStep + 1}</strong> primero.`;
    SFX.error();
    return;
  }
  rflpStep = step;
  const btn = document.getElementById(`rflp-btn-${step}`);
  if (btn) {
    btn.classList.remove('opacity-60', 'border-slate-800');
    btn.classList.add('border-cyan-400', 'bg-cyan-950/30');
  }

  const texts = {
    1: `✅ <strong>Paso 1:</strong> Extracción de ADN genómico de alto peso molecular.`,
    2: `✅ <strong>Paso 2:</strong> Digestión enzimática con enzima de restricción en millones de fragmentos.`,
    3: `✅ <strong>Paso 3 (Southern Blot):</strong> Electroforesis y transferencia a membrana de nylon/nitrocelulosa.`,
    4: `✅ <strong>Paso 4 (Hibridación):</strong> Incubación con sonda de ADN marcada monocatenaria.`,
    5: `🎉 <strong>¡Paso 5 (Revelado RFLP):</strong> AA (1 banda corta), BB (1 banda larga), AB (ambas bandas simultáneamente). (+50 XP)`
  };
  if (out) out.innerHTML = texts[step];
  SFX.click();
  if (step === 5) addXP(50, 'tema3_sub2');
}

function resetRflpSim() {
  rflpStep = 0;
  for (let i = 1; i <= 5; i++) {
    const b = document.getElementById(`rflp-btn-${i}`);
    if (b) b.className = 'p-3 rounded-xl bg-slate-900 border border-slate-800 opacity-60 text-left hover:bg-slate-800 transition text-xs';
  }
  const btn1 = document.getElementById('rflp-btn-1');
  if (btn1) btn1.classList.remove('opacity-60');
  const out = document.getElementById('rflp-step-output');
  if (out) out.innerHTML = 'Haz clic en el Paso 1 para comenzar.';
}

function inspectPcrStage(st) {
  const box = document.getElementById('pcr-stage-detail');
  if (!box) return;
  if (st === 1) {
    box.innerHTML = `🔥 <strong>1. Desnaturalización ($95\\,^\\circ\\text{C}$):</strong> Rompe los puentes de H separando las dos hebras.`;
  } else if (st === 2) {
    box.innerHTML = `🧲 <strong>2. Hibridación de cebadores ($50\\text{-}65\\,^\\circ\\text{C}$):</strong> Los primers A y B se unen a sus secuencias complementarias.`;
  } else {
    box.innerHTML = `🚀 <strong>3. Elongación ($72\\,^\\circ\\text{C}$):</strong> La Taq ADN polimerasa añade dNTPs en dirección $5'\\rightarrow 3'$.`;
  }
  renderMath();
  SFX.click();
}

function updatePcrCycles() {
  const slider = document.getElementById('pcr-slider');
  if (!slider) return;
  const n = parseInt(slider.value, 10);
  const cycleNum = document.getElementById('pcr-cycle-num');
  if (cycleNum) cycleNum.textContent = n;
  const copies = Math.pow(2, n);
  const copiesOut = document.getElementById('pcr-copies-out');
  if (copiesOut) copiesOut.textContent = `2^${n} = ${copies.toLocaleString('es-ES')} moléculas`;

  if (n === 35) {
    const detail = document.getElementById('pcr-stage-detail');
    if (detail) detail.innerHTML = `🎉 <strong>¡35 Ciclos Completados! (+50 XP)</strong> Más de 34.000 millones de copias ($2^{35} = 34.359.738.368$).`;
    addXP(50, 'tema3_sub3');
    renderMath();
  }
}

function checkIlluminaSnp(isCorrect) {
  const fb = document.getElementById('illumina-feedback');
  if (isCorrect) {
    if (fb) {
      fb.className = 'p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200';
      fb.innerHTML = `🎉 <strong>¡Lectura de Cluster e Identificación de SNP Exacta! (+50 XP)</strong><br>Destellos Azul-Rojo-Verde-Azul = 5'-CTAC-3'. Detectado SNP (G➔A) en la 3ª posición respecto a la referencia (5'-CTGC-3').`;
    }
    addXP(50, 'tema3_sub4');
  } else {
    SFX.error();
    if (fb) {
      fb.className = 'p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200';
      fb.innerHTML = `❌ El ciclo 3 emitió luz VERDE (Adenina). Sí existe un SNP (G➔A).`;
    }
  }
}

function runMasSelection(choice) {
  const out = document.getElementById('mas-sim-output');
  if (choice === 'close') {
    if (out) {
      out.className = 'bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/40 text-xs text-emerald-200';
      out.innerHTML = `🎉 <strong>¡Regla de Oro del MAS! (+50 XP)</strong> El marcador estrechamente ligado reduce al mínimo la tasa de recombinación meiótica.`;
    }
    addXP(50, 'tema3_sub5');
  } else {
    SFX.error();
    if (out) {
      out.className = 'bg-rose-950/40 p-4 rounded-xl border border-rose-500/40 text-xs text-rose-200';
      out.innerHTML = `⚠️ Marcador distante: alta tasa de sobrecruzamiento meiótico que desliga el marcador del gen diana.`;
    }
  }
}

// --- TEMA 4 SIMS ---
let sub1Selected = new Set();
function toggleMediaComp(key) {
  sub1Selected.add(key);
  const btn = document.getElementById(`m-${key}`);
  if (btn) {
    btn.classList.remove('border-slate-700', 'bg-slate-900');
    btn.classList.add('border-lime-400', 'bg-lime-950/30');
  }
  const descriptions = {
    salts: `✅ <strong>Sales minerales:</strong> Macro y micronutrientes esenciales.`,
    sucrose: `✅ <strong>Sacarosa:</strong> Fuente de carbono y energía para explantes que aún no fotosintetizan a pleno rendimiento.`,
    water: `✅ <strong>Agua de máxima pureza:</strong> Desionizada/destilada estéril.`,
    agar: `✅ <strong>Agar, vitaminas y hormonas:</strong> Soporte gelificante y fitohormonas reguladoras.`,
    autoclave: `✅ <strong>Autoclave:</strong> Esterilización por vapor a alta presión y temperatura (121 °C).`,
    phytotron: `✅ <strong>Fitotrón:</strong> Control de temperatura, fotoperiodo y humedad constante.`
  };
  const out = document.getElementById('sub1-sim-output');
  if (out) out.innerHTML = descriptions[key];
  SFX.click();
  if (sub1Selected.size === 6) {
    if (out) out.innerHTML += `<div class="mt-2 p-2.5 rounded-lg bg-lime-500/20 border border-lime-500/40 text-lime-300 font-bold">🎉 ¡Laboratorio de Cultivo In Vitro 100% Operativo! (+50 XP)</div>`;
    addXP(50, 'tema4_sub1');
  }
}

function resetSub1Sim() {
  sub1Selected.clear();
  ['salts', 'sucrose', 'water', 'agar', 'autoclave', 'phytotron'].forEach(k => {
    const b = document.getElementById(`m-${k}`);
    if (b) b.className = 'p-3 rounded-xl bg-slate-900 border border-slate-700 text-left hover:border-lime-400 transition text-xs';
  });
  const out = document.getElementById('sub1-sim-output');
  if (out) out.innerHTML = 'Haz clic en cada componente para activar la línea de cultivo in vitro.';
}

let currentMpPhase = -1;
function runMicropropPhase(phase) {
  const out = document.getElementById('mp-phase-output');
  if (phase !== currentMpPhase + 1) {
    if (out) out.innerHTML = `⚠️ Debes ejecutar primero la <strong>Fase ${currentMpPhase + 1}</strong>.`;
    SFX.error();
    return;
  }
  currentMpPhase = phase;
  const btn = document.getElementById(`mp-btn-${phase}`);
  if (btn) {
    btn.classList.remove('opacity-60', 'border-slate-800');
    btn.classList.add('border-cyan-400', 'bg-cyan-950/30');
  }

  const texts = {
    0: `✅ <strong>Fase 0:</strong> Selección y saneamiento de planta madre (meristemos + termoterapia).`,
    1: `✅ <strong>Fase 1:</strong> Desinfección y establecimiento aséptico del explante.`,
    2: `✅ <strong>Fase 2:</strong> Multiplicación con citoquininas y control de variación somaclonal por citometría de flujo y marcadores moleculares.`,
    3: `✅ <strong>Fase 3:</strong> Enraizamiento con auxinas (IAA, IBA, NAA).`,
    4: `🎉 <strong>Fase 4:</strong> Aclimatación progresiva con campanas húmedas hasta plena autotrofía. (+50 XP)`
  };
  if (out) out.innerHTML = texts[phase];
  SFX.click();
  if (phase === 4) addXP(50, 'tema4_sub3');
}

function resetMicropropSim() {
  currentMpPhase = -1;
  for (let i = 0; i <= 4; i++) {
    const b = document.getElementById(`mp-btn-${i}`);
    if (b) b.className = 'p-3 rounded-xl bg-slate-900 border border-slate-800 opacity-60 text-left hover:bg-slate-800 transition text-xs';
  }
  const btn0 = document.getElementById('mp-btn-0');
  if (btn0) btn0.classList.remove('opacity-60');
  const out = document.getElementById('mp-phase-output');
  if (out) out.innerHTML = 'Haz clic en la Fase 0 para comenzar la micropropagación.';
}

let morphoVisited = new Set();
function simMorphogenesis(type) {
  morphoVisited.add(type);
  const box = document.getElementById('morpho-sim-output');
  if (!box) return;
  const info = {
    org_dir: `<div class="font-bold text-cyan-300">🌿 Organogénesis Directa:</div><p class="text-slate-300 text-xs sm:text-sm">Tallos diferenciados directamente del explante sin pasar por callo desorganizado.</p>`,
    org_ind: `<div class="font-bold text-cyan-300">🧩 Organogénesis Indirecta:</div><p class="text-slate-300 text-xs sm:text-sm">Pasa previamente por proliferación de callo antes de diferenciar yemas.</p>`,
    emb_ind: `<div class="font-bold text-amber-300">🥕 Embriogénesis Somática (2,4-D):</div><p class="text-slate-300 text-xs sm:text-sm">Generación bipolar de embriones somáticos con tallo y radícula simultáneos a partir de células no gaméticas.</p>`,
    emb_stages: `<div class="font-bold text-emerald-300">🌱 Las 4 Fases del Embrión Somático:</div><p class="text-slate-300 text-xs sm:text-sm">1. Globular ➔ 2. Corazón ➔ 3. Torpedo ➔ 4. Cotiledonar.</p>`
  };
  box.innerHTML = info[type];
  SFX.click();
  if (morphoVisited.size === 4) addXP(50, 'tema4_sub4');
}


// --------------------------------------------------------------------------
// RENDERIZADO DEL TEST OFICIAL DE CULTIVO IN VITRO (PREGUNTAS A - K)
// --------------------------------------------------------------------------
function renderTema4OfficialTest() {
  const container = document.getElementById('tema4-test-oficial-list');
  if (!container || !window.BIOGENLAB_QUIZ_DATA || !window.BIOGENLAB_QUIZ_DATA.tema4OfficialTest) return;

  const questions = window.BIOGENLAB_QUIZ_DATA.tema4OfficialTest;
  container.innerHTML = questions.map((q, idx) => {
    const key = `tema4_test_q${q.id}`;
    const savedAns = AppState.answeredQuiz[key];
    const isAnswered = savedAns !== undefined;

    let optionsHtml = '';
    q.options.forEach((opt, optIdx) => {
      let optClass = 'w-full text-left p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-slate-200 transition flex items-start gap-3 hover:bg-slate-800';
      let disabled = '';
      if (isAnswered) {
        disabled = 'disabled';
        if (optIdx === q.correct) {
          optClass = 'w-full text-left p-3.5 rounded-xl bg-emerald-950/60 border-2 border-emerald-500 text-xs sm:text-sm text-emerald-100 flex items-start gap-3 font-semibold';
        } else if (optIdx === savedAns) {
          optClass = 'w-full text-left p-3.5 rounded-xl bg-rose-950/60 border-2 border-rose-500 text-xs sm:text-sm text-rose-200 flex items-start gap-3';
        } else {
          optClass = 'w-full text-left p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 text-xs sm:text-sm text-slate-500 flex items-start gap-3 opacity-60';
        }
      }

      optionsHtml += `
        <button onclick="handleOfficialTestAnswer(${q.id}, ${optIdx})" ${disabled} class="${optClass}">
          <span class="w-6 h-6 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center font-mono-code font-bold text-xs shrink-0">${optIdx + 1}</span>
          <span class="leading-relaxed">${opt}</span>
        </button>
      `;
    });

    const rationaleHtml = isAnswered
      ? `<div class="${savedAns === q.correct ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/40 border-rose-500/40 text-rose-200'} p-3.5 rounded-xl border text-xs sm:text-sm mt-3">
           <strong>${savedAns === q.correct ? '✅ ¡Correcto (Respuesta ' + (q.correct + 1) + ')!' : '❌ Incorrecto.'}</strong> ${q.exp}
         </div>`
      : '';

    return `
      <div class="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-3">
        <div class="flex items-center justify-between gap-2">
          <span class="px-2.5 py-1 rounded bg-lime-500/20 text-lime-300 font-mono-code font-bold text-xs">Pregunta ${q.letter})</span>
          <span class="text-xs ${isAnswered ? 'text-emerald-400 font-bold' : 'text-slate-500'}">${isAnswered ? '✅ Respondida' : '⏳ Pendiente'}</span>
        </div>
        <h4 class="text-sm sm:text-base font-bold text-white leading-snug">${q.q}</h4>
        <div class="space-y-2 pt-1">
          ${optionsHtml}
        </div>
        ${rationaleHtml}
      </div>
    `;
  }).join('');
}

function handleOfficialTestAnswer(qId, selectedIdx) {
  const questions = window.BIOGENLAB_QUIZ_DATA.tema4OfficialTest;
  const q = questions.find(item => item.id === qId);
  if (!q) return;

  const key = `tema4_test_q${qId}`;
  AppState.answeredQuiz[key] = selectedIdx;

  if (selectedIdx === q.correct) {
    SFX.success();
    addXP(25);
  } else {
    SFX.error();
    saveState();
  }

  renderTema4OfficialTest();
}

// --------------------------------------------------------------------------
// 11. INICIALIZACIÓN GLOBAL DE LA APLICACIÓN
// --------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateGlobalHUD();
  updateSoundButton();
  renderTopicCardsProgress();

  // Initialize quizzes
  ['tema1', 'tema2', 'tema3', 'tema4'].forEach(k => {
    initTopicQuiz(k);
  });

  // Initialize codex
  renderCodex();

  // Initialize exam workshop
  renderExamWorkshop();

  // Initialize default sims
  inspectDnaChem('miescher');
  updateThermalSim();
  updateChargaffCalc();
  inspectChromatinLevel('11nm');
  inspectChromatinType('eu');
  inspectHumanGenomeBranch('genes');
  simGenomeElement('transposon');
  renderSub1Strands();

  // Render KaTeX
  setTimeout(renderMath, 150);
});

// --- INSPECT GENE PART (TEMA 2) ---
const genePartsInfo = {
  enhancer: {
    title: 'Upstream Enhancers (Potenciadores aguas arriba)',
    transcribed: 'NO se transcribe',
    translated: 'NO se traduce',
    desc: 'Secuencias reguladoras distantes que aumentan sensiblemente la tasa de transcripción por plegamiento 3D de la cromatina.'
  },
  promoter: {
    title: 'Promotor (incluye Caja TATA)',
    transcribed: 'NO se transcribe',
    translated: 'NO se traduce',
    desc: 'Secuencia esencial aguas arriba indispensable para que la ARN polimerasa reconozca el gen e inicie la transcripción.'
  },
  utr5: {
    title: 'Región 5\' UTR + Caperuza 5\' Cap',
    transcribed: 'SÍ se transcribe a ARN',
    translated: 'NO se traduce a proteína',
    desc: 'Situada entre el inicio de transcripción y el codón ATG. Esencial para el reconocimiento y anclaje del ribosoma.'
  },
  exon1: {
    title: 'Exón 1 (Codón de inicio ATG)',
    transcribed: 'SÍ se transcribe',
    translated: 'SÍ se traduce (Codificante)',
    desc: 'Primer bloque codificante. El ribosoma inicia la traducción en el codón ATG.'
  },
  intron1: {
    title: 'Intrón 1 (Secuencia no codificante intercalada)',
    transcribed: 'SÍ se transcribe a pre-ARNm',
    translated: 'NO se traduce (Escindido en núcleo)',
    desc: 'Secuencia eliminada durante el splicing nuclear por el espliceosoma. Nunca viaja al citoplasma.'
  },
  exon2: {
    title: 'Exón 2 (Módulo codificante alternativo)',
    transcribed: 'SÍ se transcribe',
    translated: 'SÍ se traduce (según patrón de Splicing Alternativo)',
    desc: 'Región codificante que puede incluirse o excluirse para generar diferentes isoformas a partir de un único gen.'
  },
  intron2: {
    title: 'Intrón 2 (Secuencia no codificante intercalada)',
    transcribed: 'SÍ se transcribe a pre-ARNm',
    translated: 'NO se traduce (Escindido en núcleo)',
    desc: 'Eliminado por corte y empalme antes de la exportación celular.'
  },
  exon3: {
    title: 'Exón 3 (Codón de parada TGA)',
    transcribed: 'SÍ se transcribe',
    translated: 'SÍ se traduce (Cierra pauta)',
    desc: 'Último bloque codificante que finaliza con el codón de parada TGA.'
  },
  utr3: {
    title: 'Región 3\' UTR (Untranslated Region 3\')',
    transcribed: 'SÍ se transcribe',
    translated: 'NO se traduce',
    desc: 'Señal determinante para la estabilidad, degradación y localización subcelular del transcrito.'
  },
  terminator: {
    title: 'Terminador',
    transcribed: 'NO se transcribe',
    translated: 'NO se traduce',
    desc: 'Marca el final físico de la unidad transcripcional en el ADN.'
  },
  polya: {
    title: 'Cola 3\' Poli-A (AAAAA)',
    transcribed: 'Añadida postranscripcionalmente en 3\'',
    translated: 'NO se traduce',
    desc: 'Protege frente a exonucleasas citoplasmáticas, facilita la exportación y estimula la traducción ribosómica.'
  }
};

function inspectGenePart(partKey) {
  const info = genePartsInfo[partKey];
  const box = document.getElementById('gene-part-detail');
  if (!box || !info) return;
  box.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h4 class="font-bold text-cyan-300 text-sm">${info.title}</h4>
      <div class="flex gap-2">
        <span class="px-2 py-0.5 rounded bg-slate-800 text-xs font-mono-code text-emerald-300">${info.transcribed}</span>
        <span class="px-2 py-0.5 rounded bg-slate-800 text-xs font-mono-code text-purple-300">${info.translated}</span>
      </div>
    </div>
    <p class="text-slate-300 leading-relaxed text-xs sm:text-sm mt-1">${info.desc}</p>
  `;
  SFX.click();
}

// --- TEST POINT MUTATION (TEMA 2) ---
function testPointMutation(type) {
  const box = document.getElementById('point-mutation-output');
  if (!box) return;
  if (type === 'silent') {
    box.innerHTML = `
      <div class="font-bold text-emerald-400">1. Mutación Silenciosa: <span class="font-mono-code">AGG ➔ CGG</span> (Ambos Arginina)</div>
      <p class="text-slate-300 text-xs sm:text-sm mt-1">• <strong>Mecanismo:</strong> Genera un codón sinónimo por la <strong>degeneración del código genético</strong>. No provoca alteración en la secuencia de aminoácidos ni en la función proteica.</p>
    `;
  } else if (type === 'missense') {
    box.innerHTML = `
      <div class="font-bold text-amber-400">2. Mutación de Cambio de Sentido (Missense)</div>
      <p class="text-slate-300 text-xs sm:text-sm mt-1">• <strong>Mecanismo:</strong> Sustitución que codifica para un aminoácido químicamente distinto, pudiendo provocar mal plegamiento (*misfolding*), alteración del centro activo o pérdida de afinidad.</p>
    `;
  } else if (type === 'nonsense_early') {
    box.innerHTML = `
      <div class="font-bold text-rose-400">3A. Mutación Sin Sentido (Nonsense) Temprana: <span class="font-mono-code">CAG (Gln) ➔ UAG (STOP)</span></div>
      <p class="text-slate-300 text-xs sm:text-sm mt-1">• <strong>Consecuencia:</strong> Al aparecer muy cerca del inicio, la traducción se interrumpe y la proteína prácticamente ni se sintetiza.</p>
    `;
  } else {
    box.innerHTML = `
      <div class="font-bold text-rose-400">3B. Mutación Sin Sentido (Nonsense) Intermedia/Avanzada: <span class="font-mono-code">CAG (Gln) ➔ UAG (STOP)</span></div>
      <p class="text-slate-300 text-xs sm:text-sm mt-1">• <strong>Consecuencia:</strong> Se produce una <strong>proteína truncada</strong> más corta de lo normal que carece de funcionalidad biológica. (+50 XP)</p>
    `;
    addXP(50, 'tema2_sub3');
  }
  SFX.click();
}

// --- SIM EMBRYO MOSAIC (TEMA 2) ---
function simEmbryoMosaic(stage) {
  const box = document.getElementById('mosaic-output');
  if (!box) return;
  if (stage === 'zygote2') {
    box.innerHTML = `
      <div class="font-bold text-cyan-300">🌓 Mutación Somática en 2 Blastómeros (1ª División del Cigoto)</div>
      <p class="text-slate-300 text-xs sm:text-sm mt-1">• Cuanto más temprana en el desarrollo, mayor el tejido afectado: exactamente el <strong>50% de las células del organismo adulto</strong> serán mutantes y el 50% silvestres (individuo mosaico). (+25 XP)</p>
    `;
    addXP(25, 'tema2_mosaic');
  } else if (stage === 'late') {
    box.innerHTML = `
      <div class="font-bold text-slate-200">🔬 Mutación Somática Tardía</div>
      <p class="text-slate-300 text-xs sm:text-sm mt-1">• Solo las células hijas mitóticas derivadas de esa célula somática heredarán la mutación, originando un pequeño sector o parche tisular mutante.</p>
    `;
  } else {
    box.innerHTML = `
      <div class="font-bold text-purple-300">🧬 Mutación Germinal (Gametos)</div>
      <p class="text-slate-300 text-xs sm:text-sm mt-1">• Se transmite a la descendencia y <strong>estará presente en el 100% de las células del nuevo individuo</strong>. Son las mutaciones con trascendencia en la selección natural y evolución.</p>
    `;
  }
  SFX.click();
}

// --- INSPECT TRANSFORM METHOD (TEMA 4) ---
let sub2Visited = new Set();
function inspectTransformMethod(key) {
  sub2Visited.add(key);
  const box = document.getElementById('transform-sim-display');
  if (!box) return;
  const data = {
    agro: `
      <div class="font-bold text-emerald-400 text-sm">🦠 Agrobacterium tumefaciens (Vector Biológico Natural - 7 Pasos)</div>
      <ol class="list-decimal list-inside text-slate-300 space-y-1 text-xs leading-relaxed mt-2">
        <li>Se extrae el plásmido Ti de la bacteria y el T-DNA se corta con enzima de restricción.</li>
        <li>El ADN foráneo con el gen de interés se corta con la misma enzima.</li>
        <li>Se ligan formando un plásmido Ti recombinante.</li>
        <li>Se reintroduce en Agrobacterium tumefaciens.</li>
        <li>La bacteria inserta el T-DNA con el gen foráneo en el cromosoma vegetal.</li>
        <li>Las células vegetales transformadas se cultivan in vitro.</li>
        <li>Se regenera una planta completa transgénica donde todas sus células portan el gen foráneo.</li>
      </ol>
    `,
    biobal: `
      <div class="font-bold text-cyan-400 text-sm">🔫 Biobalística o Cañón de Partículas (Particle Gun Method)</div>
      <ul class="list-disc list-inside text-slate-300 space-y-1 text-xs leading-relaxed mt-2">
        <li><strong>Fundamento:</strong> Bombardeo físico de tejidos vegetales con micropartículas de oro o tungsteno recubiertas de ADN.</li>
        <li><strong>Ventaja:</strong> Supera la barrera de monocotiledóneas (cereales) y dicotiledóneas, integrando el ADN en el genoma nuclear o cloroplástico.</li>
      </ul>
    `,
    rescue: `
      <div class="font-bold text-amber-400 text-sm">🛡️ Rescate de Embriones y Maíz MON810 en España (2016)</div>
      <ul class="list-disc list-inside text-slate-300 space-y-1 text-xs leading-relaxed mt-2">
        <li><strong>Rescate de embriones:</strong> Se aíslan embriones de cruces interespecíficos antes de su aborto y se cultivan in vitro.</li>
        <li><strong>Maíz MON810 (Monsanto):</strong> En España se cultivaron 129.081 hectáreas en 2016 (+19,8% respecto a 2015), resistente al taladro del maíz.</li>
        <li><strong>Bioseguridad:</strong> No introducir transgénicos en zonas de origen silvestre de los cultivos para evitar flujos genéticos indeseados.</li>
      </ul>
    `
  };
  box.innerHTML = data[key];
  SFX.click();
  if (sub2Visited.size === 3) addXP(50, 'tema4_sub2');
}
