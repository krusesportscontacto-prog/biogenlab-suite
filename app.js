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
  examAnswers: {},        // { [exerciseId]: selectedOptionIndex }
  sound: true
};

let AppState = { ...defaultState };

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      AppState = { ...defaultState, ...parsed };
      if (!AppState.examAnswers) AppState.examAnswers = {};
      if (!AppState.examExercises) AppState.examExercises = {};
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
    renderExamWorkshop();
    if (typeof switchStudyVolume === 'function') {
      switchStudyVolume(currentStudyVolume);
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
    'exam-workshop': 'Problemas de Convocatoria Oficial',
    'codex': 'Biblioteca de Estudio Oficial'
  };

  if (viewId === 'dashboard') {
    bc.innerHTML = `<span>🏛️ Panel Principal</span>`;
  } else if (viewId === 'exam-workshop' && currentExamFilter && currentExamFilter.startsWith('tema')) {
    const parentName = names[currentExamFilter] || currentExamFilter;
    bc.innerHTML = `
      <button onclick="switchView('dashboard')" class="text-slate-400 hover:text-cyan-400 transition">🏛️ Inicio</button>
      <span class="text-slate-600">/</span>
      <button onclick="switchView('${currentExamFilter}')" class="text-slate-400 hover:text-cyan-400 transition">${parentName}</button>
      <span class="text-slate-600">/</span>
      <span class="text-amber-300 font-semibold">Casos Prácticos de Examen</span>
    `;
  } else {
    bc.innerHTML = `
      <button onclick="switchView('dashboard')" class="text-slate-400 hover:text-cyan-400 transition">🏛️ Inicio</button>
      <span class="text-slate-600">/</span>
      <span class="text-cyan-300 font-semibold">${names[viewId] || viewId}</span>
    `;
  }
}

function openStudyVolume(volumeId) {
  switchView('codex');
  if (typeof switchStudyVolume === 'function') {
    switchStudyVolume(volumeId);
  }
}

let returnViewFromExam = 'dashboard';

function openTopicExamProblems(topicKey) {
  returnViewFromExam = topicKey;
  currentExamFilter = topicKey;
  switchView('exam-workshop');
  renderExamWorkshop();
  SFX.click();
}

// Subtab navigation within a topic
function switchTopicTab(topicKey, tabKey) {
  if (tabKey === 'codex') {
    openStudyVolume(topicKey);
    return;
  }
  if (tabKey === 'exercises') {
    openTopicExamProblems(topicKey);
    return;
  }
  SFX.click();
  const subtabs = {
    tema1: ['hub', 'sub1', 'sub2', 'sub3', 'sub4', 'arena'],
    tema2: ['hub', 'sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'arena'],
    tema3: ['hub', 'sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'arena'],
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

  if (tabKey === 'arena') {
    if (!quizStates[topicKey] || !quizStates[topicKey].list || quizStates[topicKey].list.length === 0) {
      initTopicQuiz(topicKey);
    } else {
      renderQuizQuestion(topicKey);
    }
  } else if (tabKey === 'test-oficial' && topicKey === 'tema4') {
    renderTema4OfficialTest();
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

function getBiogenlabQuizData() {
  if (typeof window !== 'undefined' && window.BIOGENLAB_QUIZ_DATA) {
    return window.BIOGENLAB_QUIZ_DATA;
  }
  if (typeof BIOGENLAB_QUIZ_DATA !== 'undefined') {
    return BIOGENLAB_QUIZ_DATA;
  }
  return null;
}

function initTopicQuiz(topicKey) {
  const data = getBiogenlabQuizData();
  if (!data || !data[topicKey]) return;
  quizStates[topicKey].list = data[topicKey];
  quizStates[topicKey].filtered = [...quizStates[topicKey].list];
  quizStates[topicKey].currentIdx = 0;
  renderQuizQuestion(topicKey);
}

function filterQuizBySub(topicKey, sub) {
  if (!quizStates[topicKey] || !quizStates[topicKey].list || quizStates[topicKey].list.length === 0) {
    initTopicQuiz(topicKey);
  }
  quizStates[topicKey].subFilter = sub;
  if (sub === 'all') {
    quizStates[topicKey].filtered = [...(quizStates[topicKey].list || [])];
  } else {
    quizStates[topicKey].filtered = (quizStates[topicKey].list || []).filter(q => q.sub === sub);
  }
  quizStates[topicKey].currentIdx = 0;

  // Actualizar estilos activos de los botones de filtro
  try {
    const allBtns = document.querySelectorAll(`[id^="${topicKey}-qf-"]`);
    allBtns.forEach(btn => {
      btn.classList.remove('bg-amber-500', 'text-slate-950');
      btn.classList.add('bg-slate-800', 'text-slate-300');
    });
    const activeBtn = document.getElementById(`${topicKey}-qf-${sub}`);
    if (activeBtn) {
      activeBtn.classList.remove('bg-slate-800', 'text-slate-300');
      activeBtn.classList.add('bg-amber-500', 'text-slate-950');
    }
  } catch (e) {}

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
// 7. BIBLIOTECA DE ESTUDIO OFICIAL (MANUALES Y FUENTES TEÓRICAS CON IMÁGENES)
// --------------------------------------------------------------------------
let currentStudyVolume = 'tema1';

function switchStudyVolume(volId) {
  if (!window.STUDY_SOURCES || !window.STUDY_SOURCES[volId]) return;
  currentStudyVolume = volId;
  SFX.click();

  ['tema1', 'tema2', 'tema3', 'tema4'].forEach(k => {
    const btn = document.getElementById(`btn-study-vol-${k}`);
    if (btn) {
      if (k === volId) {
        const borderColors = {
          tema1: 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-lg shadow-cyan-500/10',
          tema2: 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-lg shadow-emerald-500/10',
          tema3: 'border-indigo-400 bg-indigo-950/40 text-indigo-300 shadow-lg shadow-indigo-500/10',
          tema4: 'border-lime-400 bg-lime-950/40 text-lime-300 shadow-lg shadow-lime-500/10'
        };
        btn.className = `p-3 rounded-xl border ${borderColors[k] || 'border-cyan-400 bg-cyan-950/40 text-cyan-300'} font-bold text-left transition`;
      } else {
        btn.className = 'p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 font-bold text-left hover:bg-slate-800/90 hover:text-slate-200 transition';
      }
    }
  });

  const searchInput = document.getElementById('study-search-input');
  const q = searchInput ? searchInput.value : '';
  renderStudyVolume(volId, q);
}

function handleStudySearch() {
  const searchInput = document.getElementById('study-search-input');
  const q = searchInput ? searchInput.value.trim() : '';
  renderStudyVolume(currentStudyVolume, q);
}

function renderStudyVolume(volId = currentStudyVolume, searchQuery = '') {
  const container = document.getElementById('study-volume-reader');
  if (!container || !window.STUDY_SOURCES) return;

  const vol = window.STUDY_SOURCES[volId];
  if (!vol) return;

  const q = searchQuery.toLowerCase().trim();

  // Filtrar secciones si hay búsqueda activa
  const sections = vol.sections.filter(sec => {
    if (!q) return true;
    const inTitle = sec.title.toLowerCase().includes(q);
    const inContent = sec.content.toLowerCase().includes(q);
    const inAlert = sec.examAlert && sec.examAlert.toLowerCase().includes(q);
    const inCaptions = sec.images && sec.images.some(img => img.caption.toLowerCase().includes(q));
    return inTitle || inContent || inAlert || inCaptions;
  });

  const themeClasses = {
    cyan: { badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', border: 'border-cyan-500/40', accent: 'text-cyan-300' },
    emerald: { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', border: 'border-emerald-500/40', accent: 'text-emerald-300' },
    indigo: { badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', border: 'border-indigo-500/40', accent: 'text-indigo-300' },
    lime: { badge: 'bg-lime-500/20 text-lime-300 border-lime-500/30', border: 'border-lime-500/40', accent: 'text-lime-300' }
  }[vol.color] || { badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', border: 'border-cyan-500/40', accent: 'text-cyan-300' };

  let html = '';

  // Banner y Ficha del Volumen
  html += `
    <div class="glass-panel p-6 sm:p-8 rounded-3xl border ${themeClasses.border} bg-slate-900/60 shadow-xl space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 rounded-lg border font-mono-code font-bold text-xs ${themeClasses.badge}">${vol.volume}</span>
          <span class="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono-code text-xs">${vol.badge}</span>
        </div>
        <span class="text-xs font-mono-code text-slate-400">${vol.sections.length} Secciones Oficiales • Figuras Originales</span>
      </div>
      <div>
        <h2 class="text-xl sm:text-2xl font-extrabold text-white">${vol.title}</h2>
        <h3 class="text-sm font-semibold ${themeClasses.accent} mt-0.5">${vol.subtitle}</h3>
      </div>
      <p class="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
        ${vol.summary}
      </p>

      <!-- Navegación Rápida por Secciones del Volumen -->
      <div class="pt-3 border-t border-slate-800/80">
        <div class="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider mb-2 font-bold">Índice del Volumen (Acceso Rápido):</div>
        <div class="flex flex-wrap gap-2">
          ${vol.sections.map(sec => `
            <a href="#sec-${sec.id}" class="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition flex items-center gap-1.5">
              <span class="font-mono-code font-bold ${themeClasses.accent}">${sec.number}</span>
              <span class="truncate max-w-[180px]">${sec.title.split(':')[0]}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  if (q) {
    html += `
      <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
        <span class="text-slate-300">Filtro activo: "<strong class="text-cyan-400">${q}</strong>" • Mostrando <strong>${sections.length}</strong> de ${vol.sections.length} secciones en ${vol.volume}.</span>
        <button onclick="document.getElementById('study-search-input').value=''; handleStudySearch();" class="text-cyan-400 hover:underline font-bold">Limpiar filtro</button>
      </div>
    `;
  }

  if (sections.length === 0) {
    html += `
      <div class="p-12 text-center glass-panel rounded-3xl border border-slate-800 space-y-3">
        <span class="text-4xl block">🔍</span>
        <h4 class="text-lg font-bold text-white">No se encontraron secciones coincidentes en ${vol.volume}</h4>
        <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Prueba con otro término científico (ej. "Sanger", "Chargaff", "RFLP", "Agrobacterium", "Poliploidía", "Embriogénesis") o consulta los otros 3 volúmenes.
        </p>
      </div>
    `;
  } else {
    sections.forEach(sec => {
      let imagesHtml = '';
      if (sec.images && sec.images.length > 0) {
        const gridCols = sec.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';
        imagesHtml = `
          <div class="mt-6 pt-5 border-t border-slate-800/80">
            <div class="flex items-center gap-2 mb-3">
              <span class="text-xs font-mono-code font-bold text-cyan-400 uppercase tracking-wider">🔬 Figuras y Diagramas Originales del Temario Oficial</span>
            </div>
            <div class="grid ${gridCols} gap-4">
              ${sec.images.map(img => {
                const encodedCap = encodeURIComponent(img.caption).replace(/'/g, "%27");
                return `
                <div class="study-image-card group cursor-pointer bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-cyan-400 rounded-2xl p-3.5 transition shadow-lg flex flex-col justify-between"
                     data-src="${img.src}"
                     data-caption="${encodedCap}">
                  <!-- Marco con FONDO BLANCO para máximo contraste y legibilidad de fórmulas y diagramas -->
                  <div class="overflow-hidden rounded-xl bg-white flex items-center justify-center p-3 min-h-[190px] border border-slate-200 shadow-inner">
                    <img src="${img.src}" alt="${img.caption.replace(/"/g, '&quot;')}" class="max-h-52 w-auto object-contain transition-transform duration-300 group-hover:scale-105 bg-white" loading="lazy">
                  </div>
                  <div class="mt-3 pt-2.5 border-t border-slate-800 flex items-start gap-2">
                    <span class="text-[11px] sm:text-xs text-slate-200 leading-snug font-medium group-hover:text-cyan-300 transition">${img.caption}</span>
                  </div>
                </div>
              `}).join('')}
            </div>
          </div>
        `;
      }

      let alertHtml = '';
      if (sec.examAlert) {
        alertHtml = `
          <div class="mt-4 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs sm:text-sm space-y-2">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold flex items-center gap-1.5 text-amber-300 font-mono-code uppercase text-[11px]">
                <span>⚡</span> CONCEPTO CLAVE DE EVALUACIÓN OFICIAL
              </span>
              <button onclick="switchView('exam-workshop')" class="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-200 hover:text-slate-950 font-bold text-[11px] font-mono-code transition">
                Ver Problemas Relacionados →
              </button>
            </div>
            <p class="leading-relaxed">${sec.examAlert}</p>
          </div>
        `;
      }

      html += `
        <article id="sec-${sec.id}" class="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 hover:border-slate-700/80 transition space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center font-mono-code font-bold text-xs ${themeClasses.accent}">${sec.number}</span>
              <h3 class="text-base sm:text-lg font-bold text-white">${sec.title}</h3>
            </div>
            <a href="#view-codex" class="text-[11px] font-mono-code text-slate-500 hover:text-cyan-400 transition">↑ Volver Arriba</a>
          </div>

          <div class="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 prose-invert max-w-none">
            ${sec.content}
          </div>

          ${alertHtml}
          ${imagesHtml}
        </article>
      `;
    });
  }

  container.innerHTML = html;
  renderMath();
}

function openImageModal(src, caption) {
  const modal = document.getElementById('image-modal');
  const img = document.getElementById('image-modal-img');
  const cap = document.getElementById('image-modal-caption');
  if (!modal || !img || !cap) return;

  let decoded = caption || '';
  try {
    if (decoded.includes('%')) {
      decoded = decodeURIComponent(decoded);
    }
  } catch(e) {}

  img.src = src;
  cap.textContent = decoded;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  SFX.click();
}

function closeImageModal() {
  const modal = document.getElementById('image-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Delegación global de clic para maximizar imágenes con fondo blanco
document.addEventListener('click', (e) => {
  const card = e.target.closest('.study-image-card');
  if (card) {
    const src = card.getAttribute('data-src');
    const rawCaption = card.getAttribute('data-caption') || '';
    openImageModal(src, rawCaption);
  }
});

// Cerrar modal de imagen con tecla Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeImageModal();
});

// Alias para compatibilidad
function renderCodex() {
  switchStudyVolume(currentStudyVolume);
}

// --------------------------------------------------------------------------
// 8. CASOS PRÁCTICOS DE CONVOCATORIA OFICIAL (EVALUACIÓN INTERACTIVA ACTIVA)
// --------------------------------------------------------------------------
let currentExamFilter = 'all';

function filterExamWorkshop(topicFilter) {
  currentExamFilter = topicFilter;
  if (topicFilter.startsWith('tema')) {
    returnViewFromExam = topicFilter;
  } else {
    returnViewFromExam = 'dashboard';
  }
  renderExamWorkshop();
  updateBreadcrumbs('exam-workshop');
  SFX.click();
}

function renderExamWorkshop() {
  const container = document.getElementById('exam-problems-list');
  if (!container || !window.EXAM_PROBLEMS) return;

  // Actualizar botón dinámico de retorno
  const returnBtn = document.getElementById('btn-exam-return');
  if (returnBtn) {
    if (returnViewFromExam && returnViewFromExam.startsWith('tema')) {
      const topicTitles = {
        tema1: 'Tema 1 (Genética y Genómica)',
        tema2: 'Tema 2 (De la Mutación al Fenotipo)',
        tema3: 'Tema 3 (Marcadores Moleculares)',
        tema4: 'Tema 4 (Cultivos In Vitro)'
      };
      returnBtn.innerHTML = `← Volver a ${topicTitles[returnViewFromExam] || 'Tema'}`;
      returnBtn.setAttribute('onclick', `switchView('${returnViewFromExam}')`);
    } else {
      returnBtn.innerHTML = `← Volver al Panel`;
      returnBtn.setAttribute('onclick', `switchView('dashboard')`);
    }
  }
  updateBreadcrumbs('exam-workshop');

  const allProbs = window.EXAM_PROBLEMS;
  const filtered = currentExamFilter === 'all' 
    ? allProbs 
    : allProbs.filter(p => p.topicId === currentExamFilter);

  // Estadísticas globales
  const total = allProbs.length;
  const completedCount = allProbs.filter(p => AppState.examExercises[p.id] === true).length;
  const earnedXP = allProbs
    .filter(p => AppState.examExercises[p.id] === true)
    .reduce((acc, p) => acc + (p.xp || 75), 0);
  const totalPossibleXP = allProbs.reduce((acc, p) => acc + (p.xp || 75), 0);
  const pct = Math.round((completedCount / total) * 100);

  // Filtros por Asignatura
  const filterCounts = {
    all: allProbs.length,
    tema1: allProbs.filter(p => p.topicId === 'tema1').length,
    tema2: allProbs.filter(p => p.topicId === 'tema2').length,
    tema3: allProbs.filter(p => p.topicId === 'tema3').length,
    tema4: allProbs.filter(p => p.topicId === 'tema4').length
  };

  const topicTabs = [
    { id: 'all', label: 'Todos los Casos', count: filterCounts.all },
    { id: 'tema1', label: 'Tema 1 (Genómica)', count: filterCounts.tema1 },
    { id: 'tema2', label: 'Tema 2 (Mutaciones)', count: filterCounts.tema2 },
    { id: 'tema3', label: 'Tema 3 (Marcadores)', count: filterCounts.tema3 },
    { id: 'tema4', label: 'Tema 4 (In-Vitro)', count: filterCounts.tema4 }
  ];

  let headerHtml = `
    <!-- Barra de Estado y Progreso de Convocatoria -->
    <div class="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/80 mb-6 flex flex-wrap items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono-code font-bold text-amber-400 uppercase tracking-wider">Estado de Convocatoria:</span>
          <span class="text-xs font-bold text-white">${completedCount} de ${total} Casos Superados (${pct}%)</span>
        </div>
        <div class="w-64 h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
          <div class="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500" style="width: ${pct}%"></div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-right">
          <span class="text-[10px] uppercase font-mono-code text-slate-400 block">XP de Convocatoria</span>
          <span class="text-sm font-extrabold text-amber-300 font-mono-code">+${earnedXP} / ${totalPossibleXP} XP</span>
        </div>
        <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-lg">
          ${pct === 100 ? '👑' : '🎯'}
        </div>
      </div>
    </div>

    <!-- Filtros por Asignatura / Tema -->
    <div class="flex flex-wrap gap-2 mb-6">
      ${topicTabs.map(t => {
        const isActive = currentExamFilter === t.id;
        const cls = isActive
          ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/10'
          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white';
        return `
          <button onclick="filterExamWorkshop('${t.id}')" class="px-3.5 py-1.5 rounded-xl border text-xs font-mono-code transition flex items-center gap-1.5 ${cls}">
            <span>${t.label}</span>
            <span class="px-1.5 py-0.2 rounded-md ${isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'} text-[10px]">${t.count}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;

  let cardsHtml = filtered.map((prob) => {
    const isCompleted = AppState.examExercises[prob.id] === true;
    const savedAnswer = AppState.examAnswers ? AppState.examAnswers[prob.id] : undefined;
    const hasAnswered = savedAnswer !== undefined;

    const badgeColors = {
      tema1: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      tema2: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      tema3: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      tema4: 'bg-lime-500/20 text-lime-300 border-lime-500/30'
    }[prob.topicId] || 'bg-amber-500/20 text-amber-300 border-amber-500/30';

    // Bloque de Evaluación Interactiva
    let evalHtml = '';
    if (prob.interactiveEvaluation) {
      const ev = prob.interactiveEvaluation;
      const isCorrect = savedAnswer === ev.correct;

      let optionsListHtml = ev.options.map((opt, optIdx) => {
        let optCls = 'w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-start gap-3 ';
        let disabled = '';

        if (hasAnswered) {
          if (optIdx === ev.correct) {
            optCls += 'bg-emerald-950/70 border-2 border-emerald-400 text-emerald-100 font-semibold shadow-lg shadow-emerald-500/10';
            disabled = 'disabled';
          } else if (optIdx === savedAnswer && !isCorrect) {
            optCls += 'bg-rose-950/70 border-2 border-rose-500 text-rose-200';
            disabled = 'disabled';
          } else {
            optCls += 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60';
            disabled = 'disabled';
          }
        } else {
          optCls += 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 hover:border-amber-400/60 text-slate-200 cursor-pointer';
        }

        const indicator = hasAnswered
          ? (optIdx === ev.correct ? '✓' : (optIdx === savedAnswer ? '✗' : String.fromCharCode(65 + optIdx)))
          : String.fromCharCode(65 + optIdx);

        return `
          <button onclick="submitExamEvaluation('${prob.id}', ${optIdx})" ${disabled} class="${optCls}">
            <span class="w-6 h-6 rounded-lg ${hasAnswered && optIdx === ev.correct ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 border border-slate-700 text-slate-300'} flex items-center justify-center font-mono-code font-bold text-xs shrink-0">${indicator}</span>
            <span class="leading-relaxed flex-1">${opt}</span>
          </button>
        `;
      }).join('');

      let feedbackBoxHtml = '';
      if (hasAnswered) {
        if (isCorrect) {
          feedbackBoxHtml = `
            <div class="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm space-y-1.5 animate-fadeIn">
              <div class="font-bold flex items-center gap-2 text-emerald-300 text-sm">
                <span>🎉</span> ¡Diagnóstico Correcto! (+${prob.xp} XP)
              </div>
              <p class="leading-relaxed">${ev.feedbackCorrect}</p>
            </div>
          `;
        } else {
          feedbackBoxHtml = `
            <div class="p-4 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs sm:text-sm space-y-2 animate-fadeIn">
              <div class="font-bold flex items-center gap-2 text-rose-300 text-sm">
                <span>❌</span> Respuesta Incorrecta
              </div>
              <p class="leading-relaxed">${ev.feedbackIncorrect}</p>
              <div class="pt-2 border-t border-rose-800/50">
                <button onclick="resetExamAnswer('${prob.id}')" class="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs transition">
                  🔄 Reintentar Pregunta
                </button>
              </div>
            </div>
          `;
        }
      }

      evalHtml = `
        <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border ${isCompleted ? 'border-emerald-500/40' : 'border-amber-500/30'} space-y-3.5 my-4">
          <div class="flex items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="text-sm">🎯</span>
              <span class="text-xs font-mono-code font-bold uppercase ${isCompleted ? 'text-emerald-400' : 'text-amber-400'}">Evaluación Activa de Convocatoria</span>
            </div>
            <span class="text-[11px] font-mono-code ${isCompleted ? 'text-emerald-400 font-bold' : 'text-amber-400'}">${isCompleted ? '✓ Verificado' : '⏳ Responde para Desbloquear'}</span>
          </div>

          <div class="text-xs sm:text-sm font-bold text-white leading-snug">
            ${ev.question}
          </div>

          <div class="space-y-2 pt-1">
            ${optionsListHtml}
          </div>

          ${feedbackBoxHtml}
        </div>
      `;
    }

    return `
      <article id="card-${prob.id}" class="glass-panel p-6 sm:p-7 rounded-3xl border ${isCompleted ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'} transition mb-6 shadow-xl">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2.5 py-1 rounded-xl border font-mono-code font-bold text-xs ${badgeColors}">${prob.number}</span>
            <span class="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-mono-code text-xs">${prob.badge}</span>
            <span class="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono-code">+${prob.xp} XP</span>
          </div>
          <span class="text-xs font-bold font-mono-code ${isCompleted ? 'text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-500/40 flex items-center gap-1.5' : 'text-slate-500 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800'}">
            ${isCompleted ? '✅ Caso Superado' : '⏳ Pendiente de Resolver'}
          </span>
        </div>

        <h3 class="text-lg sm:text-xl font-bold text-white mb-3">${prob.title}</h3>

        <div class="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3 whitespace-pre-line bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          ${prob.description}
        </div>

        <!-- Bloque de Evaluación Interactiva -->
        ${evalHtml}

        <!-- Solución Oficial Razonada Paso a Paso -->
        <div class="pt-2">
          <button onclick="toggleExamSolution('${prob.id}')" id="btn-sol-${prob.id}" class="px-4 py-2.5 rounded-xl ${isCompleted ? 'bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300' : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700'} text-xs font-bold transition flex items-center gap-2">
            <span>${isCompleted ? '👁️ Ocultar Solución Oficial Paso a Paso' : '👁️ Mostrar Solución Oficial y Razonamiento'}</span>
          </button>

          <div id="sol-box-${prob.id}" class="${isCompleted ? '' : 'hidden'} p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-4 mt-3">
            <div class="flex items-center gap-2 pb-3 border-b border-slate-800 text-xs font-mono-code font-bold text-cyan-400 uppercase tracking-wider">
              <span>📋</span> Resolución Oficial Docente y Demostración Matemática
            </div>
            ${formatExamSolution(prob)}
            
            <div class="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span class="text-slate-400">¿Asimilado el razonamiento oficial de este caso?</span>
              <button onclick="markExamCompleted('${prob.id}', ${prob.xp})" class="px-4 py-2 rounded-xl ${isCompleted ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'} font-bold transition">
                ${isCompleted ? '✔️ Caso Verificado y Validado' : '🎯 Validar como Superado (+XP)'}
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = headerHtml + cardsHtml;
  renderMath();
}

function submitExamEvaluation(probId, selectedIdx) {
  if (!window.EXAM_PROBLEMS) return;
  const prob = window.EXAM_PROBLEMS.find(p => p.id === probId);
  if (!prob || !prob.interactiveEvaluation) return;

  if (!AppState.examAnswers) AppState.examAnswers = {};
  AppState.examAnswers[probId] = selectedIdx;

  if (selectedIdx === prob.interactiveEvaluation.correct) {
    SFX.fanfare();
    if (!AppState.examExercises[probId]) {
      AppState.examExercises[probId] = true;
      addXP(prob.xp, 'exam_' + probId);
    }
  } else {
    SFX.error();
    saveState();
  }

  renderExamWorkshop();
  renderTopicCardsProgress();
  updateGlobalHUD();

  const card = document.getElementById(`card-${probId}`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function resetExamAnswer(probId) {
  if (AppState.examAnswers) {
    delete AppState.examAnswers[probId];
    saveState();
    renderExamWorkshop();
    const card = document.getElementById(`card-${probId}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function formatExamSolution(prob) {
  if (!prob.solution) return '';
  let html = '';
  Object.keys(prob.solution).forEach(k => {
    html += `<div class="mb-3 space-y-1">${prob.solution[k]}</div>`;
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
    btn.innerHTML = '<span>👁️ Mostrar Solución Oficial y Razonamiento</span>';
  }
}

function markExamCompleted(id, xp) {
  if (AppState.examExercises[id]) return;
  AppState.examExercises[id] = true;
  AppState.xp += xp;
  saveState();
  updateGlobalHUD();
  renderExamWorkshop();
  renderTopicCardsProgress();
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

// ==========================================================================
// SIMULADOR 2A: LABORATORIO PROFESIONAL DE ELECTROFORESIS Y TRANSILUMINADOR UV
// ==========================================================================

const GEL_LADDER_DATA = [
  { size: 10000, label: '10.0 kb', topPct: 15, rf: 0.16, ng: 40, desc: 'Banda superior del ladder ($10.000\\text{ pb}$). Fragmento de gran masa molecular con alta fricción y retención en la red tridimensional de agarosa.' },
  { size: 6000, label: '6.0 kb', topPct: 24, rf: 0.25, ng: 40, desc: 'Fragmento de $6.000\\text{ pb}$ ($6\\text{ kb}$) del marcador estándar.' },
  { size: 4000, label: '4.0 kb', topPct: 33, rf: 0.35, ng: 45, desc: 'Fragmento de $4.000\\text{ pb}$ ($4\\text{ kb}$). Coincide exactamente con el vector linealizado en el Carril 2.' },
  { size: 3000, label: '3.0 kb', topPct: 41, rf: 0.43, ng: 45, desc: 'Fragmento de $3.000\\text{ pb}$ ($3\\text{ kb}$) del marcador estándar.' },
  { size: 2000, label: '2.0 kb', topPct: 50, rf: 0.52, ng: 50, desc: 'Fragmento de $2.000\\text{ pb}$ ($2\\text{ kb}$) del marcador estándar.' },
  { size: 1500, label: '1.5 kb', topPct: 58, rf: 0.60, ng: 50, desc: 'Fragmento de $1.500\\text{ pb}$ ($1.5\\text{ kb}$). Coincide con la banda del inserto clonado en el Carril 2.' },
  { size: 1000, label: '1.0 kb ★', topPct: 66, rf: 0.69, ng: 100, isRef: true, desc: 'Banda de referencia molecular de $1.000\\text{ pb}$ ($1\\text{ kb}$). Posee el doble de masa de ADN ($100\\text{ ng}$) para orientar visualmente el gel.' },
  { size: 500, label: '500 pb', topPct: 80, rf: 0.83, ng: 40, desc: 'Fragmento corto de $500\\text{ pb}$. Migra con rapidez hacia el tercio inferior del gel.' },
  { size: 250, label: '250 pb', topPct: 91, rf: 0.95, ng: 35, desc: 'Banda inferior más rápida del marcador ($250\\text{ pb}$). Migra inmediatamente detrás del frente del colorante de carga.' }
];

const GEL_SAMPLES_DATA = {
  sampleA: [
    { id: 'sa_vector', size: 4000, label: '4.0 kb', topPct: 33, rf: 0.35, ng: 80, isThick: true, lane: 'Carril 2 • Muestra A (Digestión de Plásmido)', name: 'Vector Plasmídico Linealizado', desc: 'Banda de $4.000\\text{ pb}$ resultante de escindir el plásmido recombinante con restrictasas en las dianas que flanquean el inserto.' },
    { id: 'sa_insert', size: 1500, label: '1.5 kb', topPct: 58, rf: 0.60, ng: 50, isThick: false, lane: 'Carril 2 • Muestra A (Digestión de Plásmido)', name: 'Inserto Clonado de ADNc', desc: 'Fragmento liberado de $1.500\\text{ pb}$ ($1.5\\text{ kb}$). Corresponde al gen eucariota de interés introducido en el vector.' }
  ],
  sampleB: [
    { id: 'sb_relaxed', size: 7000, label: '~7.0 kb (aparente)', topPct: 20, rf: 0.21, ng: 35, isThick: false, lane: 'Carril 3 • Muestra B (Plásmido Intacto)', name: 'Forma Circular Relajada (Nicked DNA)', desc: 'Molécula de plásmido circular con una mella o corte fosfodiéster en una sola hebra. Su conformación circular abierta y laxa aumenta la resistencia hidrodinámica, migrando muy lentamente.' },
    { id: 'sb_supercoiled', size: 2000, label: '~2.0 kb (aparente)', topPct: 50, rf: 0.52, ng: 90, isThick: true, lane: 'Carril 3 • Muestra B (Plásmido Intacto)', name: 'Forma Superenrollada (Supercoiled DNA)', desc: 'ADN plasmídico bicatenario cerrado covalentemente con alto grado de superenrollamiento negativo. Al ser sumamente compacto, atraviesa la red de agarosa a gran velocidad (migración aparente $\\approx 2.0\\text{ kb}$ a pesar de tener un peso real de $5.5\\text{ kb}$).' }
  ],
  sampleC: [
    { id: 'sc_pcr', size: 750, label: '750 pb', topPct: 73, rf: 0.76, ng: 70, isThick: true, lane: 'Carril 4 • Muestra C (Producto PCR)', name: 'Amplicón de PCR Específico', desc: 'Fragmento monobanda nítido de $750\\text{ pb}$ sintetizado mediante PCR. Interpola limpiamente entre la banda de $1.000\\text{ pb}$ y la de $500\\text{ pb}$ del marcador.' }
  ]
};

const GelLabState = {
  isRunning: false,
  voltage: 100, // 70, 100, 130
  progress: 1.0, // 0.0 (en pocillos) a 1.0 (migración completa)
  timeElapsedSec: 2400, // 40 minutos en segundos
  totalDurationSec: 2400,
  illumination: 'uv', // 'visible' | 'uv'
  dye: 'etbr', // 'etbr' | 'sybr'
  showRuler: false,
  timerInterval: null,
  selectedBandKey: null,
  challengeSelected: null,
  challengeSolved: false
};

function initGelLab() {
  updateGelDisplays();
  renderGelBands();
}

function updateGelDisplays() {
  const vDisp = document.getElementById('disp-voltage');
  const cDisp = document.getElementById('disp-current');
  const tDisp = document.getElementById('disp-time');
  const sDisp = document.getElementById('disp-status');
  const led = document.getElementById('power-led');
  const btnRun = document.getElementById('btn-run-gel');
  const iconRun = document.getElementById('icon-run-gel');
  const textRun = document.getElementById('text-run-gel');
  const bubCath = document.getElementById('bubbles-cathode-indicator');
  const bubAnod = document.getElementById('bubbles-anode-indicator');

  if (vDisp) vDisp.textContent = `${GelLabState.voltage} V`;

  // mA calculation according to voltage
  let currentMA = 0;
  if (GelLabState.isRunning) {
    if (GelLabState.voltage === 70) currentMA = 46;
    else if (GelLabState.voltage === 100) currentMA = 68;
    else currentMA = 94;
  }
  if (cDisp) cDisp.textContent = `${currentMA} mA`;

  // Format time mm:ss
  const mins = Math.floor(GelLabState.timeElapsedSec / 60);
  const secs = GelLabState.timeElapsedSec % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  if (tDisp) tDisp.textContent = timeStr;

  // Status and LED
  if (sDisp && led) {
    if (GelLabState.isRunning) {
      sDisp.textContent = 'RUNNING';
      sDisp.className = 'text-[11px] font-mono-code font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse';
      led.className = 'w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-lg shadow-emerald-400/80 animate-pulse';
    } else if (GelLabState.progress >= 1.0) {
      sDisp.textContent = 'COMPLETED';
      sDisp.className = 'text-[11px] font-mono-code font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40';
      led.className = 'w-2 h-2 rounded-full bg-cyan-400 inline-block';
    } else {
      sDisp.textContent = 'STANDBY';
      sDisp.className = 'text-[11px] font-mono-code font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400';
      led.className = 'w-2 h-2 rounded-full bg-slate-600 inline-block';
    }
  }

  // Run button state
  if (btnRun && iconRun && textRun) {
    if (GelLabState.isRunning) {
      iconRun.textContent = '⏸️';
      textRun.textContent = 'Pausar';
      btnRun.className = 'col-span-2 sm:col-span-1 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs font-sans rounded-lg flex items-center justify-center gap-1.5 transition shadow-sm';
    } else {
      iconRun.textContent = '▶️';
      textRun.textContent = GelLabState.progress >= 1.0 ? 'Reanudar' : 'Conectar';
      btnRun.className = 'col-span-2 sm:col-span-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-sans rounded-lg flex items-center justify-center gap-1.5 transition shadow-sm';
    }
  }

  // Electrolysis Bubbles
  if (bubCath) {
    if (GelLabState.isRunning) bubCath.classList.remove('hidden');
    else bubCath.classList.add('hidden');
  }
  if (bubAnod) {
    if (GelLabState.isRunning) bubAnod.classList.remove('hidden');
    else bubAnod.classList.add('hidden');
  }

  // Update well fill colors
  for (let w = 1; w <= 4; w++) {
    const wf = document.getElementById(`well-fill-${w}`);
    if (wf) {
      if (GelLabState.progress < 0.1) {
        wf.className = 'w-full h-2 bg-indigo-900 rounded opacity-100 transition-all';
      } else {
        wf.className = 'w-full h-2 bg-slate-900 rounded opacity-40 transition-all';
      }
    }
  }
}

function renderGelBands() {
  const container = document.getElementById('gel-lanes-area');
  if (!container) return;

  const p = Math.min(1.0, Math.max(0.0, GelLabState.progress));
  const isUV = GelLabState.illumination === 'uv';
  const dyeClass = GelLabState.dye === 'sybr' ? 'band-sybr' : 'band-etbr';
  const bandDisplay = isUV ? 'opacity-100' : 'opacity-0';

  // Tracking dye front (Azul de Bromofenol): co-migrates with ~300 bp fragments (~94% top)
  const dyeTop = (4 + (94 - 4) * p);

  // Helper: linear interpolation from well (4%) to final migration Rf (targetPct)
  const getTop = (targetPct) => (4 + (targetPct - 4) * p);

  let html = '';

  // 1. Ladder Scale column on the left (calibrated static axis: 0% to 25% of width)
  GEL_LADDER_DATA.forEach((lad) => {
    html += `
      <div class="absolute left-1.5 sm:left-3 flex items-center gap-1.5 transition-opacity duration-200 ${isUV ? 'opacity-90' : 'opacity-0'} pointer-events-none" style="top: ${lad.topPct}%; transform: translateY(-50%);">
        <span class="text-[10px] sm:text-xs font-mono tabular-nums font-semibold ${lad.isRef ? 'text-amber-300' : 'text-slate-300'} whitespace-nowrap">${lad.label}</span>
        <span class="w-2 sm:w-3.5 h-px bg-slate-600 inline-block"></span>
      </div>
    `;
  });

  // 2. Carril 1: Marcador Ladder bands (centered at 33.3% of width)
  GEL_LADDER_DATA.forEach((lad, idx) => {
    const curTop = getTop(lad.topPct);
    const isSelected = GelLabState.selectedBandKey === `lad_${lad.size}`;
    const heightClass = lad.isRef ? 'h-2 sm:h-2.5' : 'h-1 sm:h-1.5';
    html += `
      <div id="band-lad-${idx}" 
           onclick="inspectGelBand('ladder', ${lad.size})" 
           class="absolute left-[33.3%] -translate-x-1/2 w-8 sm:w-10 ${heightClass} ${dyeClass} ${bandDisplay} ${isSelected ? 'band-highlight' : ''} cursor-pointer transition-all duration-150 hover:brightness-150 z-20"
           style="top: ${curTop}%; transform: translate(-50%, -50%);"
           title="Ladder: ${lad.label} (${lad.size} pb)">
      </div>
    `;
  });

  // 3. Carril 2: Muestra A (Digestión de Plásmido) (centered at 54.1%)
  GEL_SAMPLES_DATA.sampleA.forEach(item => {
    const curTop = getTop(item.topPct);
    const isSelected = GelLabState.selectedBandKey === item.id;
    const heightClass = item.isThick ? 'h-2 sm:h-2.5' : 'h-1 sm:h-1.5';
    html += `
      <div id="band-${item.id}" 
           onclick="inspectGelBand('sampleA', ${item.size})" 
           class="absolute left-[54.1%] -translate-x-1/2 w-10 sm:w-12 ${heightClass} ${dyeClass} ${bandDisplay} ${isSelected ? 'band-highlight' : ''} cursor-pointer transition-all duration-150 hover:brightness-150 z-20"
           style="top: ${curTop}%; transform: translate(-50%, -50%);"
           title="${item.name}: ${item.label}">
      </div>
    `;
  });

  // 4. Carril 3: Muestra B (Plásmido Intacto) (centered at 75.0%)
  GEL_SAMPLES_DATA.sampleB.forEach(item => {
    const curTop = getTop(item.topPct);
    const isSelected = GelLabState.selectedBandKey === item.id;
    const heightClass = item.isThick ? 'h-2 sm:h-2.5' : 'h-1 sm:h-1.5';
    html += `
      <div id="band-${item.id}" 
           onclick="inspectGelBand('sampleB', '${item.id}')" 
           class="absolute left-[75.0%] -translate-x-1/2 w-8 sm:w-10 ${heightClass} ${dyeClass} ${bandDisplay} ${isSelected ? 'band-highlight' : ''} cursor-pointer transition-all duration-150 hover:brightness-150 z-20"
           style="top: ${curTop}%; transform: translate(-50%, -50%);"
           title="${item.name}: ${item.label}">
      </div>
    `;
  });

  // 5. Carril 4: Muestra C (Producto PCR) (centered at 91.6%)
  GEL_SAMPLES_DATA.sampleC.forEach(item => {
    const curTop = getTop(item.topPct);
    const isSelected = GelLabState.selectedBandKey === item.id;
    html += `
      <div id="band-${item.id}" 
           onclick="inspectGelBand('sampleC', ${item.size})" 
           class="absolute left-[91.6%] -translate-x-1/2 w-8 sm:w-10 h-2 sm:h-2.5 ${dyeClass} ${bandDisplay} ${isSelected ? 'band-highlight' : ''} cursor-pointer transition-all duration-150 hover:brightness-150 z-20"
           style="top: ${curTop}%; transform: translate(-50%, -50%);"
           title="${item.name}: ${item.label}">
      </div>
    `;
  });

  // 6. Frente del Colorante de Carga (Azul de Bromofenol)
  if (p > 0.04) {
    const dyeOpacity = isUV ? 'opacity-25' : 'opacity-85';
    const lanesX = ['33.3%', '54.1%', '75.0%', '91.6%'];
    lanesX.forEach(lx => {
      html += `
        <div class="absolute -translate-x-1/2 w-8 sm:w-11 h-2 tracking-dye-front ${dyeOpacity} pointer-events-none transition-all duration-150 z-10"
             style="left: ${lx}; top: ${dyeTop}%; transform: translate(-50%, -50%);">
        </div>
      `;
    });
  }

  container.innerHTML = html;
}

function toggleGelRun() {
  if (GelLabState.isRunning) {
    pauseGelSimulation();
  } else {
    startGelSimulation();
  }
}

function startGelSimulation() {
  if (GelLabState.progress >= 1.0) {
    // Reset to start new run if completed
    GelLabState.progress = 0;
    GelLabState.timeElapsedSec = 0;
  }

  GelLabState.isRunning = true;
  SFX.click();
  updateGelDisplays();

  if (GelLabState.timerInterval) clearInterval(GelLabState.timerInterval);

  GelLabState.timerInterval = setInterval(() => {
    // Progress calculation speed factor based on voltage
    const speedFactor = GelLabState.voltage === 70 ? 10 : (GelLabState.voltage === 100 ? 18 : 28);
    GelLabState.timeElapsedSec += speedFactor;

    if (GelLabState.timeElapsedSec >= GelLabState.totalDurationSec) {
      GelLabState.timeElapsedSec = GelLabState.totalDurationSec;
      GelLabState.progress = 1.0;
      pauseGelSimulation();
      SFX.success();
    } else {
      GelLabState.progress = GelLabState.timeElapsedSec / GelLabState.totalDurationSec;
    }

    updateGelDisplays();
    renderGelBands();
  }, 100);
}

function pauseGelSimulation() {
  GelLabState.isRunning = false;
  if (GelLabState.timerInterval) {
    clearInterval(GelLabState.timerInterval);
    GelLabState.timerInterval = null;
  }
  updateGelDisplays();
  renderGelBands();
  SFX.click();
}

function fastForwardGel() {
  pauseGelSimulation();
  GelLabState.progress = 1.0;
  GelLabState.timeElapsedSec = GelLabState.totalDurationSec;
  updateGelDisplays();
  renderGelBands();
  SFX.success();
}

function resetGelSimulation() {
  pauseGelSimulation();
  GelLabState.progress = 0;
  GelLabState.timeElapsedSec = 0;
  GelLabState.selectedBandKey = null;
  updateGelDisplays();
  renderGelBands();
  SFX.click();

  const insp = document.getElementById('inspect-content');
  const carrier = document.getElementById('inspect-carrier');
  if (insp && carrier) {
    carrier.textContent = 'Pocillos cargados • Listo para correr';
    insp.innerHTML = `<p class="text-slate-400 italic text-[11px]">Las muestras de ADN con glicerol y azul de bromofenol están en el fondo de los pocillos. Pulsa <strong>▶️ Conectar</strong> para iniciar la migración hacia el polo positivo (+).</p>`;
  }
}

function setGelVoltage(v) {
  GelLabState.voltage = v;
  [70, 100, 130].forEach(volt => {
    const b = document.getElementById(`btn-v-${volt}`);
    if (b) {
      if (volt === v) {
        b.className = 'py-1.5 rounded-lg bg-blue-50 border border-blue-400 text-blue-900 font-bold transition shadow-xs';
      } else {
        b.className = 'py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium transition';
      }
    }
  });
  updateGelDisplays();
  SFX.click();
}

function setGelIllumination(mode) {
  GelLabState.illumination = mode;
  const slab = document.getElementById('gel-slab-surface');
  const btnVis = document.getElementById('btn-illum-vis');
  const btnUV = document.getElementById('btn-illum-uv');

  if (mode === 'uv') {
    if (slab) slab.className = 'gel-bed-uv relative rounded-xl p-3 h-[420px] bg-slate-950 ring-1 ring-slate-800 shadow-inner transition-colors duration-500 overflow-hidden select-none';
    if (btnUV) btnUV.className = 'p-2.5 rounded-xl bg-slate-900 text-white border border-slate-800 hover:bg-slate-800 text-left transition shadow-xs';
    if (btnVis) btnVis.className = 'p-2.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 text-left transition shadow-xs';
  } else {
    if (slab) slab.className = 'gel-bed-visible relative rounded-xl p-3 h-[420px] bg-slate-900 ring-1 ring-slate-800 shadow-inner transition-colors duration-500 overflow-hidden select-none';
    if (btnVis) btnVis.className = 'p-2.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-300 hover:bg-blue-100 text-left transition shadow-xs';
    if (btnUV) btnUV.className = 'p-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 text-left transition shadow-xs';
  }

  renderGelBands();
  SFX.click();
}

function setGelFluorophore(dye) {
  GelLabState.dye = dye;
  currentGelDye = dye;
  const btnEtbr = document.getElementById('btn-dye-etbr');
  const btnSybr = document.getElementById('btn-dye-sybr');
  const badge = document.getElementById('gel-safety-badge');

  if (dye === 'sybr') {
    if (btnSybr) btnSybr.className = 'px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold transition hover:bg-emerald-100 shadow-xs';
    if (btnEtbr) btnEtbr.className = 'px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-200 transition';
    if (badge) {
      badge.className = 'px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-sans font-medium flex items-center gap-1.5 shadow-xs';
      badge.innerHTML = '<span>🟢 Bioseguridad: SYBR Safe (No mutagénico)</span>';
    }
  } else {
    if (btnEtbr) btnEtbr.className = 'px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-300 text-orange-900 text-xs font-bold transition hover:bg-orange-100 shadow-xs';
    if (btnSybr) btnSybr.className = 'px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-200 transition';
    if (badge) {
      badge.className = 'px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-sans font-medium flex items-center gap-1.5 shadow-xs';
      badge.innerHTML = '<span>⚠️ Bioseguridad: Bromuro de Etidio (Intercalante)</span>';
    }
  }

  renderGelBands();
  SFX.click();
}

function toggleGelDye() {
  setGelFluorophore(GelLabState.dye === 'etbr' ? 'sybr' : 'etbr');
}

function toggleGelRuler() {
  GelLabState.showRuler = !GelLabState.showRuler;
  const ruler = document.getElementById('gel-ruler-overlay');
  const btn = document.getElementById('btn-toggle-ruler');
  if (ruler) {
    if (GelLabState.showRuler) ruler.classList.remove('hidden');
    else ruler.classList.add('hidden');
  }
  if (btn) {
    btn.className = GelLabState.showRuler 
      ? 'text-xs text-blue-700 font-bold flex items-center gap-1 underline' 
      : 'text-xs text-slate-600 hover:text-slate-900 font-sans font-medium flex items-center gap-1 transition';
  }
  SFX.click();
}

function inspectGelBand(type, key) {
  SFX.click();
  let item = null;
  let carrierText = '';

  if (type === 'ladder') {
    item = GEL_LADDER_DATA.find(x => x.size === key);
    carrierText = 'Carril 1 • Marcador de Peso Molecular 1 kb Plus Ladder';
    GelLabState.selectedBandKey = `lad_${key}`;
  } else if (type === 'sampleA') {
    item = GEL_SAMPLES_DATA.sampleA.find(x => x.size === key);
    carrierText = item ? item.lane : 'Carril 2';
    GelLabState.selectedBandKey = item ? item.id : null;
  } else if (type === 'sampleB') {
    item = GEL_SAMPLES_DATA.sampleB.find(x => x.id === key);
    carrierText = item ? item.lane : 'Carril 3';
    GelLabState.selectedBandKey = key;
  } else if (type === 'sampleC') {
    item = GEL_SAMPLES_DATA.sampleC.find(x => x.size === key);
    carrierText = item ? item.lane : 'Carril 4';
    GelLabState.selectedBandKey = item ? item.id : null;
  }

  if (!item) return;

  renderGelBands();

  const cElem = document.getElementById('inspect-carrier');
  const bElem = document.getElementById('inspect-content');
  if (cElem) cElem.textContent = carrierText;
  if (bElem) {
    bElem.innerHTML = `
      <div class="space-y-1.5 animate-fadeIn">
        <div class="flex items-center justify-between text-xs font-bold text-slate-900">
          <span class="text-blue-900 font-semibold">${item.name || item.label}</span>
          <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono tabular-nums font-bold border border-slate-200">${item.size.toLocaleString()} pb</span>
        </div>
        <div class="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-sans">
          <span>Movilidad Relativa: <strong class="text-slate-900 font-mono tabular-nums">$R_f = ${item.rf.toFixed(2)}$</strong></span>
          <span>Masa estimada: <strong class="text-slate-900 font-mono tabular-nums">~${item.ng} ng</strong></span>
          <span>Emisión: <strong class="${GelLabState.dye === 'sybr' ? 'text-emerald-700' : 'text-orange-700'} font-mono tabular-nums">${GelLabState.dye === 'sybr' ? '530 nm (Verde)' : '605 nm (Naranja)'}</strong></span>
        </div>
        <p class="text-slate-700 text-xs mt-1 leading-relaxed font-sans">${item.desc}</p>
      </div>
    `;
    renderMath();
  }
}

function selectGelChallengeOpt(val) {
  GelLabState.challengeSelected = val;
  ['250', '500', '750', '1500', '4000'].forEach(opt => {
    const b = document.getElementById(`ch-opt-${opt}`);
    if (b) {
      if (opt === val) {
        b.className = 'py-1.5 rounded-lg bg-amber-500 text-white font-bold text-center transition shadow-xs font-mono tabular-nums text-xs';
      } else {
        b.className = 'py-1.5 rounded-lg bg-white hover:bg-amber-100/70 border border-amber-200 text-slate-800 font-semibold text-center transition shadow-xs font-mono tabular-nums text-xs';
      }
    }
  });
  SFX.click();
}

function checkGelChallenge() {
  const fb = document.getElementById('gel-ch-feedback');
  const badge = document.getElementById('gel-challenge-badge');
  if (!fb) return;

  if (!GelLabState.challengeSelected) {
    fb.innerHTML = '<span class="text-amber-400">Selecciona primero un tamaño estimado arriba.</span>';
    SFX.error();
    return;
  }

  if (GelLabState.challengeSelected === '750') {
    fb.innerHTML = '<span class="text-emerald-300 font-bold">🎉 ¡Correcto! Amplicón de 750 pb identificado con éxito. (+50 XP)</span>';
    if (badge) {
      badge.textContent = '✅ Superado';
      badge.className = 'text-[10px] font-bold text-emerald-400';
    }
    SFX.success();
    if (!GelLabState.challengeSolved) {
      GelLabState.challengeSolved = true;
      addXP(50, 'tema1_gel_challenge');
    }
    inspectGelBand('sampleC', 750);
  } else {
    SFX.error();
    const hints = {
      '250': 'Incorrecto: 250 pb es la banda más baja y rápida del marcador (cerca del fondo).',
      '500': 'Incorrecto: La banda del Carril 4 está más arriba (más lenta y grande) que la banda de 500 pb.',
      '1500': 'Incorrecto: 1.5 kb migra en la mitad superior del gel.',
      '4000': 'Incorrecto: 4.0 kb queda muy retenida cerca del pocillo de origen.'
    };
    fb.innerHTML = `<span class="text-rose-400">${hints[GelLabState.challengeSelected] || 'Tamaño incorrecto. Compara la posición con las bandas de 1.000 pb y 500 pb del Carril 1.'}</span>`;
  }
}

function runGelSimulation() {
  fastForwardGel();
  const fb = document.getElementById('gel-sim-feedback');
  if (fb) {
    fb.innerHTML = `
      <div class="flex items-start gap-2">
        <span class="text-emerald-400 text-base">✅</span>
        <div>
          <strong>¡Electroforesis y Revelado UV en Tiempo Real Completados!</strong> El ADN migró hacia el polo positivo (ánodo) según la ley logarítmica de tamizaje molecular. Tu muestra incluye los fragmentos revelados bajo transiluminador con ${GelLabState.dye === 'sybr' ? 'SYBR Safe (530 nm)' : 'Bromuro de Etidio (605 nm)'}. (+50 XP)
        </div>
      </div>
    `;
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
    box.innerHTML = `🔥 <strong>1. Desnaturalización (95 °C):</strong> Rompe los puentes de H separando las dos hebras.`;
  } else if (st === 2) {
    box.innerHTML = `🧲 <strong>2. Hibridación de cebadores (50-65 °C):</strong> Los primers A y B se unen a sus secuencias complementarias.`;
  } else {
    box.innerHTML = `🚀 <strong>3. Elongación (72 °C):</strong> La Taq ADN polimerasa añade dNTPs en dirección $5'\\rightarrow 3'$.`;
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
  const data = getBiogenlabQuizData();
  if (!container || !data || !data.tema4OfficialTest) return;

  const questions = data.tema4OfficialTest;
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
  const data = getBiogenlabQuizData();
  if (!data || !data.tema4OfficialTest) return;
  const questions = data.tema4OfficialTest;
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
  initGelLab();
  inspectChromatinLevel('11nm');
  inspectChromatinType('eu');
  inspectHumanGenomeBranch('genes');
  simGenomeElement('transposon');
  renderSub1Strands();

  // Direct hash routing (e.g., #sub2 or #gel)
  const hash = (window.location.hash || '').toLowerCase();
  if (hash.includes('sub2') || hash.includes('gel') || hash.includes('electroforesis')) {
    switchView('tema1');
    switchTopicTab('tema1', 'sub2');
  }

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
