const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = 'c:/Users/alejo.COMPU_DE_ALEJO/Desktop/biogenlab-suite';

console.log('=== VALIDATING BIOGENLAB SUITE ===');

// 1. Validate JS syntax of scripts
['quiz-data.js', 'exam-problems.js', 'app.js'].forEach(f => {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  try {
    new vm.Script(code);
    console.log(`[OK] Syntax check passed for: ${f}`);
  } catch(e) {
    console.error(`[ERROR] Syntax error in ${f}:`, e.message);
  }
});

// 2. Validate index.html
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

// Check duplicate IDs
const idRegex = /\bid=["']([^"']+)["']/g;
const idCounts = {};
let m;
while ((m = idRegex.exec(html)) !== null) {
  idCounts[m[1]] = (idCounts[m[1]] || 0) + 1;
}
const dups = Object.keys(idCounts).filter(id => idCounts[id] > 1);
if (dups.length > 0) {
  console.log('[WARN] Duplicate IDs in index.html:', dups);
} else {
  console.log('[OK] No duplicate IDs in index.html.');
}

// Check handlers in index.html
const handlerRegex = /\bon([a-z]+)=["']([^"']+)["']/gi;
const appJsCode = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');
const missingFns = new Set();
while ((m = handlerRegex.exec(html)) !== null) {
  const expr = m[2].trim();
  const matchFn = expr.match(/^([a-zA-Z0-9_$]+)\s*\(/);
  if (matchFn) {
    const fnName = matchFn[1];
    const fnDefRegex = new RegExp(`(?:function\\s+${fnName}\\b|\\b${fnName}\\s*=\\s*function|\\b${fnName}\\s*=\\s*\\(|window\\.${fnName}\\s*=)`);
    if (!fnDefRegex.test(appJsCode) && !['alert', 'confirm', 'prompt'].includes(fnName)) {
      missingFns.add(`${fnName} in on${m[1]}="${expr}"`);
    }
  }
}
if (missingFns.size > 0) {
  console.log('[ERROR] Unmatched event handlers:', Array.from(missingFns));
} else {
  console.log('[OK] All HTML event handlers match declared functions in app.js.');
}

console.log('Validation complete!');
