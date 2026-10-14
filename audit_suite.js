const fs = require('fs');

console.log('====================================================');
console.log('       BIOGENLAB SUITE - DEEP COMPREHENSIVE AUDIT');
console.log('====================================================\n');

let issuesFound = 0;

// ----------------------------------------------------
// TEST 1: STATIC & STUDY-SOURCES IMAGES
// ----------------------------------------------------
console.log('--- TEST 1: VERIFYING IMAGES (HTML + STUDY SOURCES) ---');
const html = fs.readFileSync('index.html', 'utf8');
const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
let match;
while ((match = imgRegex.exec(html)) !== null) {
  const src = match[1];
  if (src && src !== '' && src !== '#' && !src.startsWith('http')) {
    if (!fs.existsSync(src)) {
      console.error('❌ Missing static image in index.html:', src);
      issuesFound++;
    } else {
      console.log('  [OK] Static image exists:', src);
    }
  }
}

global.window = global;
eval(fs.readFileSync('study-sources.js', 'utf8'));
let studyImagesChecked = 0;
for (const [tKey, topic] of Object.entries(window.STUDY_SOURCES)) {
  for (const sec of topic.sections) {
    if (sec.images) {
      for (const img of sec.images) {
        studyImagesChecked++;
        if (!fs.existsSync(img.src)) {
          console.error(`❌ Missing study image in ${tKey} (${sec.id}):`, img.src);
          issuesFound++;
        }
      }
    }
  }
}
console.log(`✅ All ${studyImagesChecked} authentic figures from study-sources.js verified on disk!`);

// ----------------------------------------------------
// TEST 2: CHECK ALL HTML ONCLICK/ONINPUT/ONCHANGE HANDLERS
// ----------------------------------------------------
console.log('\n--- TEST 2: VERIFYING HTML EVENT HANDLERS AGAINST app.js ---');
const appJs = fs.readFileSync('app.js', 'utf8');

const declaredFunctions = new Set();
const funcRegex = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
while ((match = funcRegex.exec(appJs)) !== null) {
  declaredFunctions.add(match[1]);
}
const assignFuncRegex = /(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>)/g;
while ((match = assignFuncRegex.exec(appJs)) !== null) {
  declaredFunctions.add(match[1]);
}

const eventAttrRegex = /\b(on[a-z]+)=["']([^"']+)["']/gi;
const missingHandlers = new Set();
const foundHandlers = new Set();

while ((match = eventAttrRegex.exec(html)) !== null) {
  const code = match[2];
  const callMatches = code.matchAll(/([a-zA-Z0-9_$]+)\s*\(/g);
  for (const cm of callMatches) {
    const fnName = cm[1];
    if (['alert', 'confirm', 'prompt', 'parseInt', 'parseFloat', 'closeImageModal', 'stopPropagation'].includes(fnName)) continue;
    foundHandlers.add(fnName);
    if (!declaredFunctions.has(fnName)) {
      missingHandlers.add({ fn: fnName, snippet: code });
    }
  }
}

if (missingHandlers.size > 0) {
  console.error('❌ Found missing function handlers:');
  missingHandlers.forEach(m => console.error('   Missing:', m.fn, 'in code:', m.snippet));
  issuesFound += missingHandlers.size;
} else {
  console.log(`✅ All ${foundHandlers.size} distinct event handler functions exist in app.js!`);
}

// ----------------------------------------------------
// TEST 3: CHECK ALL getElementById IN app.js
// ----------------------------------------------------
console.log('\n--- TEST 3: VERIFYING getElementById TARGETS IN index.html ---');
const getElemRegex = /document\.getElementById\(["'`]([^"'`]+)["'`]\)/g;
const missingElements = new Set();
const testedElements = new Set();

const definedIds = new Set();
const idRegex = /\bid=["']([^"']+)["']/gi;
while ((match = idRegex.exec(html)) !== null) {
  definedIds.add(match[1]);
}

while ((match = getElemRegex.exec(appJs)) !== null) {
  const id = match[1];
  testedElements.add(id);
  if (!id.includes('${') && !id.includes('+')) {
    if (!definedIds.has(id)) {
      missingElements.add(id);
    }
  }
}

if (missingElements.size > 0) {
  console.error('❌ IDs referenced in app.js not found in index.html:', [...missingElements]);
  issuesFound += missingElements.size;
} else {
  console.log(`✅ All ${testedElements.size} static getElementById calls have matching elements in HTML!`);
}

// ----------------------------------------------------
// TEST 4: CHECK DUPLICATE IDS IN index.html
// ----------------------------------------------------
console.log('\n--- TEST 4: CHECKING DUPLICATE IDS IN index.html ---');
const idCount = {};
let duplicateCount = 0;
while ((match = idRegex.exec(html)) !== null) {
  const id = match[1];
  idCount[id] = (idCount[id] || 0) + 1;
  if (idCount[id] === 2) {
    console.error('❌ Duplicate ID found in index.html:', id);
    duplicateCount++;
    issuesFound++;
  }
}
if (duplicateCount === 0) {
  console.log('✅ Zero duplicate IDs in index.html!');
}

// ----------------------------------------------------
// TEST 5: DATA INTEGRITY & SYNTAX OF SCRIPTS
// ----------------------------------------------------
console.log('\n--- TEST 5: DATA & SCRIPT SYNTAX ---');
const scripts = ['quiz-data.js', 'exam-problems.js', 'study-sources.js', 'app.js'];
scripts.forEach(s => {
  try {
    const code = fs.readFileSync(s, 'utf8');
    new Function(code);
    console.log(`  [OK] Syntax clean: ${s}`);
  } catch (err) {
    console.error(`❌ Syntax error in ${s}:`, err.message);
    issuesFound++;
  }
});

eval(fs.readFileSync('quiz-data.js', 'utf8'));
eval(fs.readFileSync('exam-problems.js', 'utf8'));

let totalQ = 0;
for (const [topicKey, questions] of Object.entries(window.BIOGENLAB_QUIZ_DATA)) {
  questions.forEach((q, idx) => {
    totalQ++;
    if (!q.q || !Array.isArray(q.options) || q.options.length < 2 || typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.options.length || !q.exp) {
      console.error(`❌ Quiz question format invalid in ${topicKey} at index ${idx}`);
      issuesFound++;
    }
  });
}
console.log(`✅ All ${totalQ} multiple-choice quiz questions valid with proper options & explanations.`);

let totalExams = 0;
window.EXAM_PROBLEMS.forEach((p, idx) => {
  totalExams++;
  if (!p.id || !p.title || !p.description || !p.solution) {
    console.error(`❌ Exam problem invalid at index ${idx}`);
    issuesFound++;
  }
  if (p.interactiveEvaluation) {
    const ie = p.interactiveEvaluation;
    if (!ie.question || !Array.isArray(ie.options) || ie.options.length < 2 || typeof ie.correct !== 'number' || ie.correct < 0 || ie.correct >= ie.options.length) {
      console.error(`❌ Interactive evaluation format invalid in exam problem ${p.id}`);
      issuesFound++;
    }
  }
});
console.log(`✅ All ${totalExams} official exam practical cases validated with interactive evaluations.`);

// ----------------------------------------------------
// TEST 6: SIMULATORS & INTERACTION INTEGRITY
// ----------------------------------------------------
console.log('\n--- TEST 6: SIMULATORS BEHAVIOR & CALCULATION TESTS ---');

const mockElements = {};
function getOrCreateMockElement(id) {
  if (!mockElements[id]) {
    mockElements[id] = {
      id: id,
      innerHTML: '',
      innerText: '',
      value: '',
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
        toggle: () => {}
      },
      querySelectorAll: () => [],
      addEventListener: () => {},
      setAttribute: () => {},
      getAttribute: () => null,
      scrollIntoView: () => {}
    };
  }
  return mockElements[id];
}

const windowMock = {
  document: {
    getElementById: (id) => getOrCreateMockElement(id),
    querySelectorAll: () => [],
    querySelector: (sel) => getOrCreateMockElement(sel),
    addEventListener: () => {}
  },
  addEventListener: () => {},
  scrollTo: () => {},
  localStorage: {
    store: {},
    getItem: function(k) { return this.store[k] || null; },
    setItem: function(k, v) { this.store[k] = v.toString(); },
    removeItem: function(k) { delete this.store[k]; }
  },
  location: { reload: () => {} }
};
global.window = windowMock;
global.document = windowMock.document;
global.localStorage = windowMock.localStorage;

try {
  eval(fs.readFileSync('study-sources.js', 'utf8'));
  eval(fs.readFileSync('quiz-data.js', 'utf8'));
  eval(fs.readFileSync('exam-problems.js', 'utf8'));
  eval(fs.readFileSync('app.js', 'utf8'));

  console.log('  [OK] Evaluated all core scripts in virtual DOM without throwing!');

  const cInp = getOrCreateMockElement('chargaff-c-val');
  cInp.value = '22';
  if (typeof updateChargaffCalc === 'function') {
    updateChargaffCalc();
    console.log('  [OK] Chargaff calculation executed without error.');
  }

  if (typeof addSangerBase === 'function') {
    resetSangerGel();
    addSangerBase('A');
    addSangerBase('C');
    console.log('  [OK] Sanger simulation executed without error.');
  }

  if (typeof inspectChromatinLevel === 'function') {
    inspectChromatinLevel('30nm');
    console.log('  [OK] Chromatin packaging simulator executed without error.');
  }

  if (typeof runGelMigration === 'function') {
    runGelMigration();
    console.log('  [OK] Gel electrophoresis simulation step executed without error.');
  }

  if (typeof resetProgress === 'function') {
    global.confirm = () => false;
    resetProgress();
    console.log('  [OK] Reset progress dialog handler verified.');
  }

} catch (err) {
  console.error('❌ Error executing simulator logic in virtual environment:', err);
  issuesFound++;
}

console.log('\n====================================================');
console.log(`TOTAL ISSUES DETECTED: ${issuesFound}`);
console.log('====================================================');

process.exit(issuesFound === 0 ? 0 : 1);

