function renderScoreboardAndPoints(body, state, saveState, defaultTab = 'teams') {
let activeTab = state.activeTab ?? defaultTab;
let selectedClassId = state.classId ?? window.AppStore.getSelectedClassId();
let scoreMode = state.scoreMode ?? 'daily'; // 'daily' or 'total'
let searchQuery = '';
let selectedStudentForAward = null;

const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];
let teams = state.teams ?? [
{ name: 'קבוצה א׳', score: 0 },
{ name: 'קבוצה ב׳', score: 0 }
];

// Student points map: { [studentName]: { daily: number, total: number, breakdown: { [reason]: number } } }
let studentScores = state.studentScores ?? {};

const BEHAVIORS = [
{ id: 'ready', icon: '🎒', title: 'מוכנות לשיעור', pts: 1 },
{ id: 'task', icon: '📝', title: 'ביצוע מטלה', pts: 1 },
{ id: 'listen', icon: '👂', title: 'הקשבה והשתתפות', pts: 1 },
{ id: 'help', icon: '🤝', title: 'עזרה לחבר', pts: 2 },
{ id: 'polite', icon: '💬', title: 'דיבור בנימוס', pts: 1 },
{ id: 'order', icon: '🧹', title: 'סדר וארגון', pts: 1 },
{ id: 'excel', icon: '⭐', title: 'מצוינות והשקעה', pts: 2 },
{ id: 'free', icon: '➕', title: 'נקודת חיזוק חופשית', pts: 1 },
{ id: 'penalty', icon: '➖', title: 'בירור/משמעת (-1)', pts: -1 }
];

body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:8px;position:relative;">
  <div style="display:flex;gap:4px;background:rgba(0,0,0,0.05);padding:3px;border-radius:10px;">
    <button class="rand-tab ${activeTab === 'teams' ? 'active' : ''}" data-sptab="teams" style="flex:1;">👥 ניקוד קבוצות</button>
    <button class="rand-tab ${activeTab === 'students' ? 'active' : ''}" data-sptab="students" style="flex:1;">⭐ כוכבי הכיתה (אישי)</button>
  </div>

  <!-- 1. TEAMS VIEW -->
  <div data-el="teams-view" class="${activeTab === 'teams' ? '' : 'hidden'}" style="display:flex;flex-direction:column;height:100%;gap:10px;">
    <div class="scoreboard-teams" data-el="teams-container"></div>
    <div style="display:flex;justify-content:space-between;gap:8px;margin-top:auto;">
      <button class="small-btn" data-act="add-team">+ הוסף קבוצה</button>
      <button class="secondary-btn" data-act="reset-scores" style="padding:4px 10px;font-size:0.8rem;">↺ איפוס ניקוד קבוצות</button>
    </div>
  </div>

  <!-- 2. STUDENTS INDIVIDUAL POINTS VIEW -->
  <div data-el="students-view" class="sp-container ${activeTab === 'students' ? '' : 'hidden'}">
    <div class="sp-toolbar">
      <select data-el="sp-class-sel" style="max-width:140px;padding:5px 8px;border-radius:8px;border:1px solid #cbd5e1;font-weight:600;font-size:0.8rem;"></select>
      <input type="text" class="sp-search" data-el="sp-search" placeholder="🔍 חיפוש תלמיד..." />
      <div style="display:flex;gap:3px;">
        <button class="sp-mode-pill ${scoreMode === 'daily' ? 'active' : ''}" data-mode="daily" title="הצג ניקוד שנצבר היום">היום</button>
        <button class="sp-mode-pill ${scoreMode === 'total' ? 'active' : ''}" data-mode="total" title="הצג ניקוד מצטבר כולל">מצטבר</button>
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 2px;">
      <button class="small-btn" data-act="open-podium" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;font-weight:800;border:none;">🏆 מצעד מצטייני היום</button>
      <button class="small-btn" data-act="reset-daily" style="font-size:0.75rem;">↺ איפוס יומי</button>
    </div>
    <div class="sp-grid" data-el="students-grid"></div>

    <!-- Award Drawer (Opens on clicking student) -->
    <div data-el="award-drawer" class="sp-drawer hidden">
      <div class="sp-drawer-header">
        <span data-el="drawer-title" style="font-weight:800;font-size:0.95rem;color:var(--text-dark);"></span>
        <button class="small-btn" data-act="close-drawer" style="padding:2px 8px;">✕</button>
      </div>
      <div class="sp-behavior-grid">
        ${BEHAVIORS.map(b => `
          <button class="sp-behavior-btn" data-behavior="${b.id}" data-pts="${b.pts}">
            <span style="font-size:1.2rem;">${b.icon}</span>
            <span>${b.title}</span>
            <span class="sp-pts-tag" style="${b.pts < 0 ? 'background:#fee2e2;color:#dc2626;' : ''}">${b.pts > 0 ? '+' + b.pts : b.pts}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Podium Celebratory Overlay -->
    <div data-el="podium-overlay" class="sp-podium-overlay hidden">
      <button class="small-btn" data-act="close-podium" style="position:absolute;top:10px;left:10px;background:rgba(255,255,255,0.2);color:#fff;border:none;">✕ סגור</button>
      <div class="sp-podium-title">🎉 מצעד כוכבי הכיתה! 🎉</div>
      <div style="font-size:0.85rem;color:#fef08a;margin-bottom:6px;">מצטייני היום שצברו הכי הרבה נקודות</div>
      <div class="sp-podium-steps" data-el="podium-steps"></div>
      <div data-el="podium-category-leaders" style="font-size:0.8rem;text-align:center;margin-top:6px;max-width:90%;"></div>
    </div>
  </div>
</div>
`;

// TAB TOGGLING
body.querySelectorAll('[data-sptab]').forEach(btn => {
  btn.addEventListener('click', () => {
    activeTab = btn.dataset.sptab;
    state.activeTab = activeTab;
    saveState();
    body.querySelectorAll('[data-sptab]').forEach(b => b.classList.toggle('active', b.dataset.sptab === activeTab));
    body.querySelector('[data-el="teams-view"]').classList.toggle('hidden', activeTab !== 'teams');
    body.querySelector('[data-el="students-view"]').classList.toggle('hidden', activeTab !== 'students');
    if (activeTab === 'teams') renderTeamsBoard();
    else renderStudentsGrid();
  });
});

// 1. TEAMS LOGIC
const teamsContainer = body.querySelector('[data-el="teams-container"]');
function renderTeamsBoard() {
  teamsContainer.innerHTML = teams.map((t, idx) => `
    <div class="team-column" style="border-top-color:${colors[idx % colors.length]}">
      <input class="team-name-input" data-idx="${idx}" value="${t.name}" />
      <div class="team-score-val">${t.score}</div>
      <div class="team-score-btns">
        <button class="score-step-btn plus" data-step="1" data-idx="${idx}">+1</button>
        <button class="score-step-btn minus" data-step="-1" data-idx="${idx}">-1</button>
      </div>
    </div>
  `).join('');

  teamsContainer.querySelectorAll('.team-name-input').forEach(inp => {
    inp.addEventListener('change', () => {
      teams[inp.dataset.idx].name = inp.value;
      state.teams = teams;
      saveState();
    });
  });
  teamsContainer.querySelectorAll('.score-step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.idx, 10);
      const step = parseInt(btn.dataset.step, 10);
      teams[i].score += step;
      state.teams = teams;
      saveState();
      if (step > 0) SoundFX.pop();
      renderTeamsBoard();
    });
  });
}

body.querySelector('[data-act="add-team"]').addEventListener('click', () => {
  if (teams.length >= 6) return;
  teams.push({ name: `קבוצה ${teams.length + 1}`, score: 0 });
  state.teams = teams;
  saveState();
  renderTeamsBoard();
});

body.querySelector('[data-act="reset-scores"]').addEventListener('click', () => {
  if (confirm('האם לאפס את ניקוד כל הקבוצות?')) {
    teams.forEach(t => t.score = 0);
    state.teams = teams;
    saveState();
    renderTeamsBoard();
  }
});

// 2. STUDENTS LOGIC
const classSel = body.querySelector('[data-el="sp-class-sel"]');
const searchInput = body.querySelector('[data-el="sp-search"]');
const studentsGrid = body.querySelector('[data-el="students-grid"]');
const awardDrawer = body.querySelector('[data-el="award-drawer"]');
const drawerTitle = body.querySelector('[data-el="drawer-title"]');
const podiumOverlay = body.querySelector('[data-el="podium-overlay"]');
const podiumSteps = body.querySelector('[data-el="podium-steps"]');
const categoryLeadersEl = body.querySelector('[data-el="podium-category-leaders"]');

function populateClassSelect() {
  const lists = window.AppStore.getClassLists();
  classSel.innerHTML = lists.map(c => `<option value="${c.id}" ${c.id === selectedClassId ? 'selected' : ''}>${c.name} (${c.students.length})</option>`).join('');
}

function getStudentsList() {
  const lists = window.AppStore.getClassLists();
  const found = lists.find(c => c.id === selectedClassId) || lists[0];
  return (found ? found.students : []).filter(Boolean);
}

function getStudentScore(name) {
  if (!studentScores[name]) {
    studentScores[name] = { daily: 0, total: 0, breakdown: {} };
  }
  return studentScores[name];
}

function renderStudentsGrid() {
  const students = getStudentsList();
  const filtered = searchQuery.trim() 
    ? students.filter(n => n.includes(searchQuery.trim())) 
    : students;

  if (filtered.length === 0) {
    studentsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--text-muted);font-weight:600;">לא נמצאו תלמידים</div>`;
    return;
  }

  studentsGrid.innerHTML = filtered.map(name => {
    const sc = getStudentScore(name);
    const scoreVal = scoreMode === 'daily' ? sc.daily : sc.total;
    const initial = name.charAt(0);
    return `
      <div class="sp-card" data-student="${name}">
        <div class="sp-avatar">${initial}</div>
        <div class="sp-name" title="${name}">${name}</div>
        <div class="sp-score">⭐ ${scoreVal}</div>
      </div>
    `;
  }).join('');

  studentsGrid.querySelectorAll('.sp-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedStudentForAward = card.dataset.student;
      drawerTitle.textContent = `חיזוק והענקת נקודות: ${selectedStudentForAward}`;
      awardDrawer.classList.remove('hidden');
    });
  });
}

// Mode toggle (Daily vs Total)
body.querySelectorAll('.sp-mode-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    scoreMode = btn.dataset.mode;
    state.scoreMode = scoreMode;
    saveState();
    body.querySelectorAll('.sp-mode-pill').forEach(b => b.classList.toggle('active', b.dataset.mode === scoreMode));
    renderStudentsGrid();
  });
});

searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value;
  renderStudentsGrid();
});

classSel.addEventListener('change', () => {
  selectedClassId = classSel.value;
  state.classId = selectedClassId;
  saveState();
  renderStudentsGrid();
});

body.querySelector('[data-act="close-drawer"]').addEventListener('click', () => {
  awardDrawer.classList.add('hidden');
  selectedStudentForAward = null;
});

// Award points clicked
awardDrawer.querySelectorAll('.sp-behavior-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!selectedStudentForAward) return;
    const bId = btn.dataset.behavior;
    const pts = parseInt(btn.dataset.pts, 10);
    const sc = getStudentScore(selectedStudentForAward);
    
    sc.daily = Math.max(0, sc.daily + pts);
    sc.total = Math.max(0, sc.total + pts);
    if (!sc.breakdown) sc.breakdown = {};
    sc.breakdown[bId] = (sc.breakdown[bId] || 0) + 1;

    state.studentScores = studentScores;
    saveState();

    if (pts > 0) {
      SoundFX.pop();
    }
    awardDrawer.classList.add('hidden');
    renderStudentsGrid();
  });
});

// Reset daily points
body.querySelector('[data-act="reset-daily"]').addEventListener('click', () => {
  if (confirm('האם לאפס את הניקוד היומי של כל התלמידים? (הניקוד המצטבר יישמר)')) {
    Object.values(studentScores).forEach(sc => {
      sc.daily = 0;
    });
    state.studentScores = studentScores;
    saveState();
    renderStudentsGrid();
  }
});

// Celebration Podium
body.querySelector('[data-act="open-podium"]').addEventListener('click', () => {
  const students = getStudentsList();
  if (students.length === 0) return;

  const sorted = [...students].map(name => {
    const sc = getStudentScore(name);
    return { name, score: sc.daily, total: sc.total, breakdown: sc.breakdown || {} };
  }).sort((a, b) => b.score - a.score);

  const top1 = sorted[0] && sorted[0].score > 0 ? sorted[0] : null;
  const top2 = sorted[1] && sorted[1].score > 0 ? sorted[1] : null;
  const top3 = sorted[2] && sorted[2].score > 0 ? sorted[2] : null;

  if (!top1) {
    alert('עדיין לא נצברו נקודות היום. הענק נקודות לתלמידים ולאחר מכן לחץ על מצעד המצטיינים!');
    return;
  }

  podiumSteps.innerHTML = `
    ${top2 ? `
      <div class="sp-step second">
        <div style="font-size:1.4rem;">🥈</div>
        <div style="font-weight:800;font-size:0.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85px;">${top2.name}</div>
        <div style="font-weight:900;font-size:1.1rem;color:#f8fafc;">${top2.score}</div>
        <div style="font-size:0.7rem;opacity:0.8;">נקודות</div>
      </div>
    ` : '<div class="sp-step second" style="opacity:0.2;"></div>'}

    <div class="sp-step first">
      <div style="font-size:1.8rem;">👑 🥇</div>
      <div style="font-weight:900;font-size:0.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85px;">${top1.name}</div>
      <div style="font-weight:900;font-size:1.3rem;color:#fef08a;">${top1.score}</div>
      <div style="font-size:0.7rem;opacity:0.9;">כוכב/ת היום!</div>
    </div>

    ${top3 ? `
      <div class="sp-step third">
        <div style="font-size:1.2rem;">🥉</div>
        <div style="font-weight:800;font-size:0.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85px;">${top3.name}</div>
        <div style="font-weight:900;font-size:1rem;color:#f8fafc;">${top3.score}</div>
        <div style="font-size:0.7rem;opacity:0.8;">נקודות</div>
      </div>
    ` : '<div class="sp-step third" style="opacity:0.2;"></div>'}
  `;

  // Check top category achievers
  const helpLeader = [...students].map(n => ({ name: n, cnt: (studentScores[n]?.breakdown?.help || 0) })).sort((a,b)=>b.cnt-a.cnt)[0];
  const readyLeader = [...students].map(n => ({ name: n, cnt: (studentScores[n]?.breakdown?.ready || 0) })).sort((a,b)=>b.cnt-a.cnt)[0];

  let catLeadersText = '';
  if (helpLeader && helpLeader.cnt > 0) {
    catLeadersText += `🤝 <b>אלופ/ת העזרה לחבר:</b> ${helpLeader.name} (${helpLeader.cnt} פעמים) &nbsp; `;
  }
  if (readyLeader && readyLeader.cnt > 0) {
    catLeadersText += `🎒 <b>אלופ/ת המוכנות:</b> ${readyLeader.name} (${readyLeader.cnt} פעמים)`;
  }
  categoryLeadersEl.innerHTML = catLeadersText;

  SoundFX.fanfare();
  podiumOverlay.classList.remove('hidden');
});

body.querySelector('[data-act="close-podium"]').addEventListener('click', () => {
  podiumOverlay.classList.add('hidden');
});

// Init
populateClassSelect();
if (activeTab === 'teams') renderTeamsBoard();
else renderStudentsGrid();
}

const WIDGET_REGISTRY = {
'timer': {
title: 'טיימר ספירה לאחור',
icon: '⏳',
defaultW: 330,
defaultH: 260,
render(body, state, saveState) {
let totalSeconds = state.totalSeconds ?? 300;
let remaining = state.remaining ?? totalSeconds;
let running = false;
let interval = null;
body.innerHTML = `
<div class="timer-display-wrap">
  <div class="timer-hero-card">
    <div class="time-digits" data-el="digits">05:00</div>
    <div class="timer-sublabel">ספירה לאחור</div>
  </div>
  <div class="timer-presets">
    <button class="preset-chip ${totalSeconds === 60 ? 'active' : ''}" data-sec="60">דקה</button>
    <button class="preset-chip ${totalSeconds === 180 ? 'active' : ''}" data-sec="180">3 דק'</button>
    <button class="preset-chip ${totalSeconds === 300 ? 'active' : ''}" data-sec="300">5 דק'</button>
    <button class="preset-chip ${totalSeconds === 600 ? 'active' : ''}" data-sec="600">10 דק'</button>
    <button class="preset-chip ${totalSeconds === 900 ? 'active' : ''}" data-sec="900">15 דק'</button>
  </div>
  <div class="timer-controls">
    <button class="timer-action-btn" data-act="minus30" title="הורד 30 שניות">-30ש'</button>
    <button class="timer-play-btn" data-act="toggle">
      <span class="btn-icon">▶</span>
      <span class="btn-text">הפעל</span>
    </button>
    <button class="timer-action-btn" data-act="reset" title="אפס טיימר">
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      <span>איפוס</span>
    </button>
    <button class="timer-action-btn" data-act="plus60" title="הוסף דקה">+1ד'</button>
  </div>
</div>
`;
const digitsEl = body.querySelector('[data-el="digits"]');
const toggleBtn = body.querySelector('[data-act="toggle"]');
const btnIcon = toggleBtn.querySelector('.btn-icon');
const btnText = toggleBtn.querySelector('.btn-text');
function formatTime(sec) {
const m = Math.floor(sec / 60);
const s = sec % 60;
return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
function updateUI() {
digitsEl.textContent = formatTime(remaining);
digitsEl.style.color = remaining <= 10 && remaining > 0 ? '#ef4444' : '';
toggleBtn.classList.toggle('running', running);
btnIcon.textContent = running ? '⏸' : '▶';
btnText.textContent = running ? 'השהה' : 'הפעל';
}
function stopTimer() {
running = false;
if (interval) clearInterval(interval);
interval = null;
updateUI();
}
body.querySelectorAll('.preset-chip').forEach(btn => {
btn.addEventListener('click', () => {
stopTimer();
body.querySelectorAll('.preset-chip').forEach(b => b.classList.remove('active'));
btn.classList.add('active');
totalSeconds = parseInt(btn.dataset.sec, 10);
remaining = totalSeconds;
state.totalSeconds = totalSeconds;
state.remaining = remaining;
saveState();
updateUI();
});
});
toggleBtn.addEventListener('click', () => {
if (running) {
stopTimer();
} else {
if (remaining <= 0) remaining = totalSeconds;
running = true;
updateUI();
interval = setInterval(() => {
if (remaining > 0) {
remaining--;
if (remaining <= 5 && remaining > 0) SoundFX.tick();
updateUI();
} else {
stopTimer();
SoundFX.alarm();
}
}, 1000);
}
});
body.querySelector('[data-act="reset"]').addEventListener('click', () => {
stopTimer();
remaining = totalSeconds;
updateUI();
});
body.querySelector('[data-act="plus60"]').addEventListener('click', () => {
remaining += 60;
totalSeconds = Math.max(totalSeconds, remaining);
updateUI();
});
body.querySelector('[data-act="minus30"]').addEventListener('click', () => {
remaining = Math.max(0, remaining - 30);
updateUI();
});
updateUI();
return () => stopTimer();
}
},
'visual-timer': {
title: 'טיימר ויזואלי',
icon: '⭕',
defaultW: 300,
defaultH: 330,
render(body, state, saveState) {
let total = state.total ?? 300;
let rem = state.rem ?? total;
let running = false;
let timerId = null;
const radius = 68;
const circumference = 2 * Math.PI * radius;
body.innerHTML = `
<div class="timer-display-wrap">
  <div class="visual-timer-svg-wrap">
    <svg class="visual-timer-svg" viewBox="0 0 160 160">
      <defs>
        <linearGradient id="vtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4f46e5" />
          <stop offset="100%" stop-color="#06b6d4" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="80" r="${radius}" fill="none" stroke="rgba(148,163,184,0.18)" stroke-width="12" />
      <circle data-el="arc" cx="80" cy="80" r="${radius}" fill="none" stroke="url(#vtGrad)" stroke-width="12"
        stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="0" />
    </svg>
    <div class="vt-center-content">
      <div class="vt-center-text" data-el="txt">05:00</div>
      <div class="vt-sublabel">זמן נותר</div>
    </div>
  </div>
  <div class="timer-presets">
    <button class="preset-chip ${total === 120 ? 'active' : ''}" data-m="2">2 דק'</button>
    <button class="preset-chip ${total === 300 ? 'active' : ''}" data-m="5">5 דק'</button>
    <button class="preset-chip ${total === 600 ? 'active' : ''}" data-m="10">10 דק'</button>
    <button class="preset-chip ${total === 900 ? 'active' : ''}" data-m="15">15 דק'</button>
    <button class="preset-chip ${total === 1200 ? 'active' : ''}" data-m="20">20 דק'</button>
  </div>
  <div class="timer-controls">
    <button class="timer-play-btn" data-act="play">
      <span class="btn-icon">▶</span>
      <span class="btn-text">הפעל</span>
    </button>
    <button class="timer-action-btn" data-act="reset">
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      <span>איפוס</span>
    </button>
  </div>
</div>
`;
const arc = body.querySelector('[data-el="arc"]');
const txt = body.querySelector('[data-el="txt"]');
const playBtn = body.querySelector('[data-act="play"]');
const btnIcon = playBtn.querySelector('.btn-icon');
const btnText = playBtn.querySelector('.btn-text');
function renderRing() {
const m = Math.floor(rem / 60);
const s = rem % 60;
txt.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
const ratio = total > 0 ? rem / total : 0;
arc.style.strokeDashoffset = `${circumference * (1 - ratio)}`;
if (ratio > 0.4) arc.style.stroke = 'url(#vtGrad)';
else if (ratio > 0.15) arc.style.stroke = '#f59e0b';
else arc.style.stroke = '#ef4444';
playBtn.classList.toggle('running', running);
btnIcon.textContent = running ? '⏸' : '▶';
btnText.textContent = running ? 'השהה' : 'הפעל';
}
function stop() {
running = false;
if (timerId) clearInterval(timerId);
timerId = null;
renderRing();
}
body.querySelectorAll('.preset-chip').forEach(b => {
b.addEventListener('click', () => {
stop();
body.querySelectorAll('.preset-chip').forEach(x => x.classList.remove('active'));
b.classList.add('active');
total = parseInt(b.dataset.m, 10) * 60;
rem = total;
state.total = total;
state.rem = rem;
saveState();
renderRing();
});
});
playBtn.addEventListener('click', () => {
if (running) {
stop();
} else {
if (rem <= 0) rem = total;
running = true;
renderRing();
timerId = setInterval(() => {
if (rem > 0) {
rem--;
renderRing();
} else {
stop();
SoundFX.alarm();
}
}, 1000);
}
});
body.querySelector('[data-act="reset"]').addEventListener('click', () => {
stop();
rem = total;
renderRing();
});
renderRing();
return () => stop();
}
},
'stopwatch': {
title: 'שעון עצר (סטופר)',
icon: '⏱️',
defaultW: 320,
defaultH: 270,
render(body) {
let elapsedMs = 0;
let running = false;
let lastTick = 0;
let rafId = null;
let laps = [];
body.innerHTML = `
<div class="timer-display-wrap">
  <div class="timer-hero-card">
    <div class="time-digits" data-el="sw-digits" style="font-size:3.1rem">00:00.0</div>
    <div class="timer-sublabel">שעון עצר</div>
  </div>
  <div class="timer-controls">
    <button class="timer-play-btn" data-act="start">
      <span class="btn-icon">▶</span>
      <span class="btn-text">התחל</span>
    </button>
    <button class="timer-action-btn" data-act="lap">
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
      <span>הקפה</span>
    </button>
    <button class="timer-action-btn" data-act="reset">
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      <span>איפוס</span>
    </button>
  </div>
  <div data-el="laps" class="sw-laps-box"></div>
</div>
`;
const digits = body.querySelector('[data-el="sw-digits"]');
const startBtn = body.querySelector('[data-act="start"]');
const btnIcon = startBtn.querySelector('.btn-icon');
const btnText = startBtn.querySelector('.btn-text');
const lapsBox = body.querySelector('[data-el="laps"]');
function formatMs(ms) {
const totalSec = Math.floor(ms / 1000);
const m = Math.floor(totalSec / 60);
const s = totalSec % 60;
const tenths = Math.floor((ms % 1000) / 100);
return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${tenths}`;
}
function loop(now) {
if (!running) return;
elapsedMs += now - lastTick;
lastTick = now;
digits.textContent = formatMs(elapsedMs);
rafId = requestAnimationFrame(loop);
}
startBtn.addEventListener('click', () => {
if (running) {
running = false;
cancelAnimationFrame(rafId);
startBtn.classList.remove('running');
btnIcon.textContent = '▶';
btnText.textContent = 'המשך';
} else {
running = true;
lastTick = performance.now();
startBtn.classList.add('running');
btnIcon.textContent = '⏸';
btnText.textContent = 'עצור';
rafId = requestAnimationFrame(loop);
}
});
body.querySelector('[data-act="lap"]').addEventListener('click', () => {
if (elapsedMs === 0) return;
laps.unshift(`הקפה ${laps.length + 1}: ${formatMs(elapsedMs)}`);
lapsBox.innerHTML = laps.map(l => `<div class="sw-lap-row">${l}</div>`).join('');
});
body.querySelector('[data-act="reset"]').addEventListener('click', () => {
running = false;
cancelAnimationFrame(rafId);
elapsedMs = 0;
laps = [];
digits.textContent = '00:00.0';
startBtn.classList.remove('running');
btnIcon.textContent = '▶';
btnText.textContent = 'התחל';
lapsBox.innerHTML = '';
});
return () => cancelAnimationFrame(rafId);
}
},
'clock': {
title: 'שעון ותאריך',
icon: '🕒',
defaultW: 290,
defaultH: 290,
render(body, state, saveState) {
let showAnalog = state.showAnalog ?? true;
body.innerHTML = `
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:8px;">
<canvas data-el="analog" width="130" height="130" class="${showAnalog ? '' : 'hidden'}"></canvas>
<div data-el="digital" class="time-digits" style="font-size:2.3rem"></div>
<div data-el="hebrew-date" style="font-size:0.88rem;font-weight:700;color:var(--primary);text-align:center;"></div>
<button class="small-btn" data-act="toggle-mode">החלף תצוגה (אנלוגי/דיגיטלי)</button>
</div>
`;
const canvas = body.querySelector('[data-el="analog"]');
const ctx = canvas.getContext('2d');
const digitalEl = body.querySelector('[data-el="digital"]');
const dateEl = body.querySelector('[data-el="hebrew-date"]');
function drawClock() {
const now = new Date();
digitalEl.textContent = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
try {
const heb = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
const greg = now.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' });
dateEl.textContent = `${greg} | ${heb}`;
} catch (e) {
dateEl.textContent = now.toLocaleDateString('he-IL');
}
if (showAnalog) {
const r = 60;
ctx.clearRect(0, 0, 130, 130);
ctx.save();
ctx.translate(65, 65);
ctx.beginPath();
ctx.arc(0, 0, r, 0, Math.PI * 2);
ctx.fillStyle = '#ffffff';
ctx.fill();
ctx.lineWidth = 4;
ctx.strokeStyle = '#4f46e5';
ctx.stroke();
for (let i = 0; i < 12; i++) {
const ang = (i * Math.PI) / 6;
ctx.beginPath();
ctx.moveTo(Math.cos(ang) * (r - 8), Math.sin(ang) * (r - 8));
ctx.lineTo(Math.cos(ang) * (r - 3), Math.sin(ang) * (r - 3));
ctx.lineWidth = 2;
ctx.strokeStyle = '#334155';
ctx.stroke();
}
const hr = now.getHours() % 12;
const min = now.getMinutes();
const sec = now.getSeconds();
const hrAng = ((hr + min / 60) * Math.PI) / 6 - Math.PI / 2;
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(Math.cos(hrAng) * 32, Math.sin(hrAng) * 32);
ctx.lineWidth = 4;
ctx.strokeStyle = '#0f172a';
ctx.lineCap = 'round';
ctx.stroke();
const minAng = ((min + sec / 60) * Math.PI) / 30 - Math.PI / 2;
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(Math.cos(minAng) * 46, Math.sin(minAng) * 46);
ctx.lineWidth = 3;
ctx.strokeStyle = '#334155';
ctx.stroke();
const secAng = (sec * Math.PI) / 30 - Math.PI / 2;
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(Math.cos(secAng) * 50, Math.sin(secAng) * 50);
ctx.lineWidth = 1.5;
ctx.strokeStyle = '#ef4444';
ctx.stroke();
ctx.restore();
}
}
body.querySelector('[data-act="toggle-mode"]').addEventListener('click', () => {
showAnalog = !showAnalog;
state.showAnalog = showAnalog;
canvas.classList.toggle('hidden', !showAnalog);
saveState();
drawClock();
});
drawClock();
const id = setInterval(drawClock, 1000);
return () => clearInterval(id);
}
},
'traffic-light': {
title: 'רמזור כיתתי',
icon: '🚦',
defaultW: 220,
defaultH: 350,
render(body, state, saveState) {
let activeLight = state.activeLight ?? 'green';
const labels = {
red: '🛑 עצור! הקשבה למורה',
yellow: '⚠️ התארגנות / שיח שקט',
green: '✅ עבודה פעילה בכיתה'
};
body.innerHTML = `
<div class="traffic-light-layout">
  <div class="traffic-light-casing">
    <div class="tl-bulb red ${activeLight === 'red' ? 'active' : ''}" data-color="red" title="אדום - עצור והקשב">
      <div class="tl-glare"></div>
    </div>
    <div class="tl-bulb yellow ${activeLight === 'yellow' ? 'active' : ''}" data-color="yellow" title="צהוב - התארגנות">
      <div class="tl-glare"></div>
    </div>
    <div class="tl-bulb green ${activeLight === 'green' ? 'active' : ''}" data-color="green" title="ירוק - עבודה פעילה">
      <div class="tl-glare"></div>
    </div>
  </div>
  <div class="tl-caption-capsule" data-el="caption">${labels[activeLight] || 'בחר אור ברמזור'}</div>
</div>
`;
const caption = body.querySelector('[data-el="caption"]');
body.querySelectorAll('.tl-bulb').forEach(bulb => {
bulb.addEventListener('click', () => {
const color = bulb.dataset.color;
activeLight = activeLight === color ? null : color;
state.activeLight = activeLight;
saveState();
SoundFX.pop();
body.querySelectorAll('.tl-bulb').forEach(b => b.classList.toggle('active', b.dataset.color === activeLight));
caption.textContent = labels[activeLight] || 'בחר אור ברמזור';
});
});
}
},
'work-symbols': {
title: 'סמלי עבודה',
icon: '🤫',
defaultW: 320,
defaultH: 280,
render(body, state, saveState) {
const modes = {
silence: { icon: '🤫', title: 'דממה מוחלטת', sub: 'עובדים לבד בשקט מוחלט' },
whisper: { icon: '🔉', title: 'עבודה בלחישה', sub: 'מותר לדבר בקול נמוך מאוד' },
neighbor: { icon: '💬', title: 'שאל חבר קרוב', sub: 'התייעצות בזוגות עם השכן לשולחן' },
together: { icon: '👥', title: 'עבודה בקבוצות', sub: 'שיתוף פעולה ושיח קבוצתי פורה' }
};
let current = state.mode ?? 'silence';
body.innerHTML = `
<div class="work-symbols-wrap">
  <div class="ws-active-display">
    <div class="ws-big-icon" data-el="icon"></div>
    <div class="ws-big-title" data-el="title"></div>
    <div class="ws-big-sub" data-el="sub"></div>
  </div>
  <div class="ws-selector">
    ${Object.entries(modes).map(([k, v]) => `
    <button class="ws-btn ${k === current ? 'active' : ''}" data-mode="${k}">
      <span class="ws-btn-icon">${v.icon}</span>
      <span class="ws-btn-text">${v.title.split(' ')[0]}</span>
    </button>
    `).join('')}
  </div>
</div>
`;
function updateView() {
const m = modes[current] || modes.silence;
body.querySelector('[data-el="icon"]').textContent = m.icon;
body.querySelector('[data-el="title"]').textContent = m.title;
body.querySelector('[data-el="sub"]').textContent = m.sub;
body.querySelectorAll('.ws-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === current));
}
body.querySelectorAll('.ws-btn').forEach(btn => {
btn.addEventListener('click', () => {
current = btn.dataset.mode;
state.mode = current;
saveState();
SoundFX.pop();
updateView();
});
});
updateView();
}
},
'random-name': {
title: 'הגרלת שם וגלגל מזל',
icon: '🎡',
defaultW: 360,
defaultH: 390,
render(body, state, saveState) {
let mode = state.mode ?? 'wheel';
let selectedClassId = state.classId ?? window.AppStore.getSelectedClassId();
let excludedNames = new Set(state.excluded || []);
let includedStudents = state.included ? new Set(state.included) : null;
let spinning = false;
let wheelAngle = 0;
let showRosterPanel = false;
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:8px;">
<div style="display:flex;gap:6px;align-items:center;">
<select data-el="class-select" style="flex:1;padding:6px;border-radius:8px;border:1px solid #cbd5e1;font-weight:600;"></select>
<button class="small-btn" data-act="toggle-roster" title="סמן מי מהתלמידים משתתף בהגרלה">👥 משתתפים (<span data-el="roster-count">0</span>)</button>
<button class="small-btn" data-act="edit-lists" title="ערוך רשימת תלמידים">✏️ שמות</button>
</div>
<div data-el="selection-panel" class="rand-selection-panel hidden">
  <div class="rand-sel-header">
    <span>בחירת תלמידים להגרלה:</span>
    <div style="display:flex;gap:4px;">
      <button class="small-btn" data-act="select-all" style="padding:2px 8px;font-size:0.75rem;">סמן הכל</button>
      <button class="small-btn" data-act="deselect-all" style="padding:2px 8px;font-size:0.75rem;">נקה הכל</button>
    </div>
  </div>
  <div class="rand-students-checklist" data-el="students-checklist"></div>
</div>
<div class="randomizer-tabs">
<button class="rand-tab ${mode === 'wheel' ? 'active' : ''}" data-mode="wheel">🎡 גלגל מזל</button>
<button class="rand-tab ${mode === 'card' ? 'active' : ''}" data-mode="card">🎴 כרטיס הגרלה</button>
</div>
<div data-el="wheel-view" class="wheel-canvas-wrap ${mode === 'wheel' ? '' : 'hidden'}">
<canvas data-el="wheel-canvas" width="200" height="200"></canvas>
<div data-el="wheel-winner" style="font-weight:900;font-size:1.15rem;color:var(--primary);min-height:24px;margin-top:4px;"></div>
</div>
<div data-el="card-view" class="winner-card-box ${mode === 'card' ? '' : 'hidden'}">
<div style="font-size:0.85rem;opacity:0.85;">התלמיד/ה שנבחר/ה:</div>
<div class="winner-name" data-el="card-winner">לחץ להגרלה!</div>
</div>
<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:auto;">
<label style="font-size:0.78rem;display:flex;align-items:center;gap:4px;cursor:pointer;">
<input type="checkbox" data-el="no-repeat" ${state.noRepeat ? 'checked' : ''} />
ללא חזרה (<span data-el="excluded-count">${excludedNames.size}</span>)
</label>
<button class="secondary-btn" data-act="reset-pool" style="padding:5px 8px;font-size:0.76rem;">איפוס</button>
<button class="primary-btn" data-act="spin" style="flex:1;">🎲 הגרל תלמיד!</button>
</div>
</div>
`;
const selectEl = body.querySelector('[data-el="class-select"]');
const wheelCanvas = body.querySelector('[data-el="wheel-canvas"]');
const wCtx = wheelCanvas.getContext('2d');
const wheelWinnerEl = body.querySelector('[data-el="wheel-winner"]');
const cardWinnerEl = body.querySelector('[data-el="card-winner"]');
const noRepeatCb = body.querySelector('[data-el="no-repeat"]');
const rosterCountEl = body.querySelector('[data-el="roster-count"]');
const excludedCountEl = body.querySelector('[data-el="excluded-count"]');
const selectionPanel = body.querySelector('[data-el="selection-panel"]');
const checklistEl = body.querySelector('[data-el="students-checklist"]');
function getClassStudents() {
const lists = window.AppStore.getClassLists();
const found = lists.find(c => c.id === selectedClassId) || lists[0];
return (found ? found.students : ['דניאל', 'נועה', 'איתי', 'מאיה', 'יונתן', 'שירה']).filter(Boolean);
}
function populateClasses() {
const lists = window.AppStore.getClassLists();
selectEl.innerHTML = lists.map(c => `<option value="${c.id}" ${c.id === selectedClassId ? 'selected' : ''}>${c.name} (${c.students.length})</option>`).join('');
const allStudents = getClassStudents();
if (!includedStudents) {
  includedStudents = new Set(allStudents);
}
renderChecklist();
}
function renderChecklist() {
const allStudents = getClassStudents();
checklistEl.innerHTML = allStudents.map(name => {
  const isChecked = includedStudents.has(name);
  return `
    <label class="roster-chip ${isChecked ? '' : 'excluded'}">
      <input type="checkbox" data-student="${name}" ${isChecked ? 'checked' : ''} />
      <span>${name}</span>
    </label>
  `;
}).join('');
rosterCountEl.textContent = `${includedStudents.size}/${allStudents.length}`;
checklistEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', () => {
    const student = cb.dataset.student;
    if (cb.checked) {
      includedStudents.add(student);
    } else {
      includedStudents.delete(student);
    }
    state.included = Array.from(includedStudents);
    saveState();
    rosterCountEl.textContent = `${includedStudents.size}/${allStudents.length}`;
    cb.closest('.roster-chip').classList.toggle('excluded', !cb.checked);
    drawWheel();
  });
});
}
function getActiveStudents() {
const all = getClassStudents();
let list = includedStudents ? all.filter(n => includedStudents.has(n)) : all;
if (noRepeatCb.checked) {
const filtered = list.filter(n => !excludedNames.has(n));
return filtered.length > 0 ? filtered : list;
}
return list;
}
const palette = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6', '#f97316'];
function drawWheel() {
const names = getActiveStudents();
const cx = 100, cy = 100, r = 92;
wCtx.clearRect(0, 0, 200, 200);
if (names.length === 0) {
  wCtx.beginPath();
  wCtx.arc(cx, cy, r, 0, Math.PI * 2);
  wCtx.fillStyle = '#f1f5f9';
  wCtx.fill();
  wCtx.strokeStyle = '#cbd5e1';
  wCtx.stroke();
  wCtx.fillStyle = '#64748b';
  wCtx.font = 'bold 12px Heebo, sans-serif';
  wCtx.textAlign = 'center';
  wCtx.fillText('אין תלמידים מסומנים', cx, cy + 4);
  return;
}
const arc = (Math.PI * 2) / names.length;
names.forEach((name, i) => {
const start = wheelAngle + i * arc;
const end = start + arc;
wCtx.beginPath();
wCtx.moveTo(cx, cy);
wCtx.arc(cx, cy, r, start, end);
wCtx.closePath();
wCtx.fillStyle = palette[i % palette.length];
wCtx.fill();
wCtx.strokeStyle = '#ffffff';
wCtx.lineWidth = 1.5;
wCtx.stroke();
wCtx.save();
wCtx.translate(cx, cy);
wCtx.rotate(start + arc / 2);
wCtx.textAlign = 'right';
wCtx.fillStyle = '#ffffff';
wCtx.font = 'bold 11px Heebo, sans-serif';
wCtx.fillText(name.slice(0, 12), r - 10, 4);
wCtx.restore();
});
wCtx.beginPath();
wCtx.moveTo(198, 92);
wCtx.lineTo(198, 108);
wCtx.lineTo(180, 100);
wCtx.closePath();
wCtx.fillStyle = '#0f172a';
wCtx.fill();
}
populateClasses();
drawWheel();
body.querySelector('[data-act="toggle-roster"]').addEventListener('click', () => {
showRosterPanel = !showRosterPanel;
selectionPanel.classList.toggle('hidden', !showRosterPanel);
});
body.querySelector('[data-act="select-all"]').addEventListener('click', () => {
const all = getClassStudents();
includedStudents = new Set(all);
state.included = Array.from(includedStudents);
saveState();
renderChecklist();
drawWheel();
});
body.querySelector('[data-act="deselect-all"]').addEventListener('click', () => {
includedStudents.clear();
state.included = [];
saveState();
renderChecklist();
drawWheel();
});
selectEl.addEventListener('change', () => {
selectedClassId = selectEl.value;
state.classId = selectedClassId;
excludedNames.clear();
state.excluded = [];
includedStudents = null;
state.included = null;
saveState();
populateClasses();
drawWheel();
});
body.querySelector('[data-act="edit-lists"]').addEventListener('click', () => {
window.AppStore.openStudentsModal(selectedClassId, () => {
includedStudents = null;
populateClasses();
drawWheel();
});
});
body.querySelectorAll('.rand-tab').forEach(tab => {
tab.addEventListener('click', () => {
mode = tab.dataset.mode;
state.mode = mode;
saveState();
body.querySelectorAll('.rand-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
body.querySelector('[data-el="wheel-view"]').classList.toggle('hidden', mode !== 'wheel');
body.querySelector('[data-el="card-view"]').classList.toggle('hidden', mode !== 'card');
drawWheel();
});
});
noRepeatCb.addEventListener('change', () => {
state.noRepeat = noRepeatCb.checked;
saveState();
drawWheel();
});
body.querySelector('[data-act="reset-pool"]').addEventListener('click', () => {
excludedNames.clear();
state.excluded = [];
saveState();
excludedCountEl.textContent = '0';
wheelWinnerEl.textContent = '';
cardWinnerEl.textContent = 'לחץ להגרלה!';
drawWheel();
});
body.querySelector('[data-act="spin"]').addEventListener('click', () => {
if (spinning) return;
const names = getActiveStudents();
if (!names.length) {
  alert('יש לסמן לפחות תלמיד אחד להגרלה ברשימת המשתתפים!');
  return;
}
spinning = true;
if (mode === 'wheel') {
const spinDuration = 2200;
const startAngle = wheelAngle;
const extraSpins = (Math.PI * 2) * (4 + Math.random() * 3);
const startTime = performance.now();
let lastTickSlice = -1;
function animateWheel(now) {
const t = Math.min(1, (now - startTime) / spinDuration);
const easeOut = 1 - Math.pow(1 - t, 3);
wheelAngle = startAngle + extraSpins * easeOut;
drawWheel();
const arc = (Math.PI * 2) / names.length;
const currentSlice = Math.floor((wheelAngle % (Math.PI * 2)) / arc);
if (currentSlice !== lastTickSlice) {
lastTickSlice = currentSlice;
SoundFX.tick();
}
if (t < 1) {
requestAnimationFrame(animateWheel);
} else {
spinning = false;
const norm = ((Math.PI * 2) - (wheelAngle % (Math.PI * 2))) % (Math.PI * 2);
const idx = Math.floor(norm / arc) % names.length;
const winner = names[idx];
wheelWinnerEl.textContent = `🎉 נבחר/ה: ${winner}!`;
SoundFX.fanfare();
if (noRepeatCb.checked) {
excludedNames.add(winner);
state.excluded = Array.from(excludedNames);
excludedCountEl.textContent = excludedNames.size;
saveState();
}
}
}
requestAnimationFrame(animateWheel);
} else {
let count = 0;
const maxSteps = 18;
const iv = setInterval(() => {
const pick = names[Math.floor(Math.random() * names.length)];
cardWinnerEl.textContent = pick;
SoundFX.tick();
count++;
if (count >= maxSteps) {
clearInterval(iv);
spinning = false;
const finalWinner = names[Math.floor(Math.random() * names.length)];
cardWinnerEl.textContent = `🎉 ${finalWinner}`;
SoundFX.fanfare();
if (noRepeatCb.checked) {
excludedNames.add(finalWinner);
state.excluded = Array.from(excludedNames);
excludedCountEl.textContent = excludedNames.size;
saveState();
}
}
}, 90);
}
});
}
},
'group-maker': {
title: 'מחלק לקבוצות עבודה',
icon: '👥',
defaultW: 430,
defaultH: 360,
render(body, state, saveState) {
let groupCount = state.groupCount ?? 4;
let groups = state.groups ?? [];
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;">
<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
<select data-el="cls" style="flex:1;padding:6px;border-radius:8px;border:1px solid #cbd5e1;font-weight:600;"></select>
<label style="font-size:0.84rem;font-weight:700;">מס' קבוצות:</label>
<input type="number" data-el="gcount" min="2" max="12" value="${groupCount}" style="width:56px;padding:5px;border-radius:8px;border:1px solid #cbd5e1;text-align:center;font-weight:700;" />
<button class="primary-btn" data-act="generate">🔀 חלק לקבוצות</button>
</div>
<div class="groups-grid" data-el="grid"></div>
</div>
`;
const clsSel = body.querySelector('[data-el="cls"]');
const gCountInput = body.querySelector('[data-el="gcount"]');
const grid = body.querySelector('[data-el="grid"]');
function loadClasses() {
const lists = window.AppStore.getClassLists();
clsSel.innerHTML = lists.map(c => `<option value="${c.id}">${c.name} (${c.students.length})</option>`).join('');
}
function renderGroups() {
if (!groups.length) {
grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:30px;">לחץ על "חלק לקבוצות" להגרלה אוטומטית</div>`;
return;
}
grid.innerHTML = groups.map((g, i) => `
<div class="group-card">
<h5>קבוצה ${i + 1} (${g.length})</h5>
<ul>${g.map(s => `<li>• ${s}</li>`).join('')}</ul>
</div>
`).join('');
}
body.querySelector('[data-act="generate"]').addEventListener('click', () => {
const lists = window.AppStore.getClassLists();
const found = lists.find(c => c.id === clsSel.value) || lists[0];
const students = [...(found ? found.students : [])];
for (let i = students.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[students[i], students[j]] = [students[j], students[i]];
}
groupCount = Math.max(2, Math.min(12, parseInt(gCountInput.value, 10) || 4));
groups = Array.from({ length: groupCount }, () => []);
students.forEach((student, idx) => {
groups[idx % groupCount].push(student);
});
state.groupCount = groupCount;
state.groups = groups;
saveState();
SoundFX.fanfare();
renderGroups();
});
loadClasses();
renderGroups();
}
},
'noise-meter': {
title: 'מד רעש כיתתי (מיקרופון)',
icon: '🎙️',
defaultW: 340,
defaultH: 250,
render(body, state, saveState) {
let threshold = state.threshold ?? 65;
let alertAudio = state.alertAudio ?? true;
let stream = null;
let audioCtx = null;
let analyser = null;
let rafId = null;
let lastAlertTime = 0;
body.innerHTML = `
<div class="noise-meter-wrap">
<div class="noise-status-banner quiet" data-el="banner">😊 שקט נעים בכיתה</div>
<div class="noise-gauge-bar">
<div class="noise-threshold-marker" data-el="marker" style="right:${threshold}%"></div>
<div class="noise-gauge-fill" data-el="fill"></div>
</div>
<div style="display:flex;align-items:center;gap:10px;font-size:0.84rem;font-weight:700;">
<span>סף רעש מותר:</span>
<input type="range" data-el="thresh" min="25" max="90" value="${threshold}" style="flex:1;" />
<span data-el="thresh-val">${threshold}%</span>
</div>
<div style="display:flex;justify-content:space-between;align-items:center;">
<label style="font-size:0.8rem;display:flex;align-items:center;gap:4px;">
<input type="checkbox" data-el="bell-cb" ${alertAudio ? 'checked' : ''} />
צליל התראה כשרועש
</label>
<button class="small-btn" data-act="mic-start">🎙️ הפעל מיקרופון</button>
</div>
</div>
`;
const banner = body.querySelector('[data-el="banner"]');
const fill = body.querySelector('[data-el="fill"]');
const marker = body.querySelector('[data-el="marker"]');
const threshInput = body.querySelector('[data-el="thresh"]');
const threshVal = body.querySelector('[data-el="thresh-val"]');
const bellCb = body.querySelector('[data-el="bell-cb"]');
const micBtn = body.querySelector('[data-act="mic-start"]');
threshInput.addEventListener('input', () => {
threshold = parseInt(threshInput.value, 10);
threshVal.textContent = `${threshold}%`;
marker.style.right = `${threshold}%`;
state.threshold = threshold;
saveState();
});
bellCb.addEventListener('change', () => {
alertAudio = bellCb.checked;
state.alertAudio = alertAudio;
saveState();
});
function updateLevel(level) {
fill.style.width = `${level}%`;
if (level > threshold) {
banner.className = 'noise-status-banner loud';
banner.textContent = '🤫 ששש... רמת הרעש גבוהה מדי!';
const now = Date.now();
if (alertAudio && now - lastAlertTime > 3000) {
lastAlertTime = now;
SoundFX.hushAlert();
}
} else {
banner.className = 'noise-status-banner quiet';
banner.textContent = '😊 שקט נעים בכיתה';
}
}
async function startMic() {
try {
stream = await navigator.mediaDevices.getUserMedia({ audio: true });
const AC = window.AudioContext || window.webkitAudioContext;
audioCtx = new AC();
const source = audioCtx.createMediaStreamSource(stream);
analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;
source.connect(analyser);
const data = new Uint8Array(analyser.frequencyBinCount);
micBtn.textContent = '🟢 מיקרופון פעיל';
function tick() {
analyser.getByteFrequencyData(data);
let sum = 0;
for (let i = 0; i < data.length; i++) sum += data[i];
const avg = sum / data.length;
const level = Math.min(100, Math.round((avg / 120) * 100));
updateLevel(level);
rafId = requestAnimationFrame(tick);
}
tick();
} catch (err) {
micBtn.textContent = 'דמו פעיל (ללא מיקרופון)';
function simTick() {
const simLevel = Math.round(25 + Math.sin(Date.now() / 700) * 18 + Math.random() * 15);
updateLevel(simLevel);
rafId = requestAnimationFrame(simTick);
}
simTick();
}
}
micBtn.addEventListener('click', startMic);
startMic();
return () => {
if (rafId) cancelAnimationFrame(rafId);
if (stream) stream.getTracks().forEach(t => t.stop());
if (audioCtx) audioCtx.close().catch(() => {});
};
}
},
'dice': {
title: 'הטלת קוביות',
icon: '🎲',
defaultW: 300,
defaultH: 240,
render(body, state, saveState) {
let diceCount = state.diceCount ?? 2;
let values = state.values ?? [4, 6];
const diceFaces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;justify-content:space-between;">
<div class="dice-stage" data-el="stage"></div>
<div style="text-align:center;font-weight:800;font-size:1rem;" data-el="sum"></div>
<div style="display:flex;gap:8px;align-items:center;justify-content:center;">
<select data-el="count" style="padding:6px 10px;border-radius:8px;border:1px solid #cbd5e1;font-weight:700;">
<option value="1" ${diceCount === 1 ? 'selected' : ''}>קובייה 1</option>
<option value="2" ${diceCount === 2 ? 'selected' : ''}>2 קוביות</option>
<option value="3" ${diceCount === 3 ? 'selected' : ''}>3 קוביות</option>
</select>
<button class="primary-btn" data-act="roll" style="flex:1;">🎲 הטל קוביות!</button>
</div>
</div>
`;
const stage = body.querySelector('[data-el="stage"]');
const sumEl = body.querySelector('[data-el="sum"]');
const countSel = body.querySelector('[data-el="count"]');
function renderDice(rolling = false) {
stage.innerHTML = values.map(v => `
<div class="die-cube ${rolling ? 'rolling' : ''}" title="${v}">${diceFaces[v] || v}</div>
`).join('');
const total = values.reduce((a, b) => a + b, 0);
sumEl.textContent = `סך הכל: ${total} (${values.join(' + ')})`;
}
function roll() {
diceCount = parseInt(countSel.value, 10);
values = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
renderDice(true);
SoundFX.tick();
setTimeout(() => {
values = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
state.diceCount = diceCount;
state.values = values;
saveState();
SoundFX.pop();
renderDice(false);
}, 420);
}
countSel.addEventListener('change', roll);
body.querySelector('[data-act="roll"]').addEventListener('click', roll);
renderDice(false);
}
},
'scoreboard': {
title: 'לוח תוצאות וניקוד',
icon: '🏆',
defaultW: 410,
defaultH: 370,
render(body, state, saveState) {
renderScoreboardAndPoints(body, state, saveState, state.activeTab || 'teams');
}
},
'student-points': {
title: 'כוכבי הכיתה - ניקוד אישי',
icon: '⭐',
defaultW: 420,
defaultH: 390,
render(body, state, saveState) {
renderScoreboardAndPoints(body, state, saveState, state.activeTab || 'students');
}
},
'poll': {
title: 'סקר והצבעה כיתתית (חי מהנייד)',
icon: '📊',
defaultW: 410,
defaultH: 340,
render(body, state, saveState) {
const randomToken = (bytes) => Array.from(crypto.getRandomValues(new Uint8Array(bytes)), b => b.toString(16).padStart(2, '0')).join('');
const escHtml = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Legacy 5-char ids are guessable – upgrade them together with a secret owner key.
if (!state.pollOwnerKey || !state.pollId || state.pollId.length < 12) {
state.pollId = 'p' + randomToken(8);
state.pollOwnerKey = randomToken(24);
saveState();
}
let pollId = state.pollId;
const pollOwnerKey = state.pollOwnerKey;
let question = state.question ?? 'איך הבנתם את החומר בשיעור היום?';
let options = state.options ?? [
{ label: '😊 הבנתי מצוין!', votes: 0 },
{ label: '🤔 הבנתי חלקית', votes: 0 },
{ label: '🙋 צריך חזרה נוספת', votes: 0 }
];
let showQR = false;
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:8px;">
<input type="text" data-el="q" value="${escHtml(question)}" style="width:100%;padding:8px 10px;border-radius:10px;border:1px solid #cbd5e1;font-weight:800;font-size:0.95rem;" />
<div class="poll-bars" data-el="bars"></div>
<div data-el="qr-box" class="hidden" style="display:flex;align-items:center;justify-content:center;gap:12px;background:#f8fafc;padding:8px;border-radius:12px;border:1px solid #e2e8f0;">
<img data-el="qr-img" style="width:90px;height:90px;border-radius:8px;" alt="QR" />
<div style="font-size:0.8rem;line-height:1.4;">
<div style="font-weight:800;color:var(--primary);">הצבעת תלמידים בזמן אמת:</div>
<div>סרקו או היכנסו לקישור:</div>
<a data-el="vote-link" href="/vote/${pollId}" target="_blank" style="direction:ltr;display:inline-block;font-weight:700;color:#2563eb;word-break:break-all;"></a>
</div>
</div>
<div style="display:flex;gap:5px;justify-content:space-between;flex-wrap:wrap;">
<button class="small-btn" data-preset="smiley">😊 הבנה</button>
<button class="small-btn" data-preset="yesno">כן/לא</button>
<button class="small-btn" data-preset="abcd">א/ב/ג/ד</button>
<button class="small-btn" data-act="toggle-qr" style="background:#dbeafe;color:#1e40af;">📱 הצבעה מהנייד</button>
<button class="secondary-btn" data-act="reset" style="padding:4px 8px;font-size:0.76rem;">איפוס</button>
</div>
</div>
`;
const qInput = body.querySelector('[data-el="q"]');
const barsEl = body.querySelector('[data-el="bars"]');
const qrBox = body.querySelector('[data-el="qr-box"]');
const qrImg = body.querySelector('[data-el="qr-img"]');
const voteLink = body.querySelector('[data-el="vote-link"]');
async function pushPollToServer() {
try {
await fetch(`/api/polls/${pollId}`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ question: qInput.value, options, ownerKey: pollOwnerKey })
});
} catch (_) {}
}
function renderPoll() {
const total = options.reduce((s, o) => s + o.votes, 0);
barsEl.innerHTML = options.map((o, i) => {
const pct = total > 0 ? Math.round((o.votes / total) * 100) : 0;
return `
<div class="poll-option-row">
<button class="poll-vote-btn" data-idx="${i}">+ ${escHtml(o.label)}</button>
<div class="poll-bar-track">
<div class="poll-bar-fill" style="width:${pct}%"></div>
</div>
<div class="poll-count-label">${o.votes} (${pct}%)</div>
</div>
`;
}).join('');
barsEl.querySelectorAll('.poll-vote-btn').forEach(btn => {
btn.addEventListener('click', () => {
options[btn.dataset.idx].votes++;
state.options = options;
saveState();
SoundFX.pop();
renderPoll();
pushPollToServer();
});
});
}
qInput.addEventListener('input', () => {
state.question = qInput.value;
saveState();
pushPollToServer();
});
body.querySelector('[data-act="toggle-qr"]').addEventListener('click', () => {
showQR = !showQR;
qrBox.classList.toggle('hidden', !showQR);
if (showQR) {
const fullUrl = `${window.location.origin}/vote/${pollId}`;
voteLink.textContent = fullUrl;
voteLink.href = fullUrl;
qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(fullUrl)}`;
pushPollToServer();
}
});
body.querySelectorAll('[data-preset]').forEach(btn => {
btn.addEventListener('click', () => {
const p = btn.dataset.preset;
if (p === 'smiley') {
options = [
{ label: '😊 הבנתי מצוין', votes: 0 },
{ label: '😐 הבנתי חלקית', votes: 0 },
{ label: '😟 צריך עזרה', votes: 0 }
];
} else if (p === 'yesno') {
options = [
{ label: '👍 מסכים / כן', votes: 0 },
{ label: '👎 לא מסכים / לא', votes: 0 }
];
} else {
options = [
{ label: 'תשובה א׳', votes: 0 },
{ label: 'תשובה ב׳', votes: 0 },
{ label: 'תשובה ג׳', votes: 0 },
{ label: 'תשובה ד׳', votes: 0 }
];
}
state.options = options;
saveState();
renderPoll();
pushPollToServer();
});
});
body.querySelector('[data-act="reset"]').addEventListener('click', () => {
options.forEach(o => o.votes = 0);
state.options = options;
saveState();
renderPoll();
pushPollToServer();
});
const pollInterval = setInterval(async () => {
try {
const res = await fetch(`/api/polls/${pollId}`);
if (!res.ok) return;
const data = await res.json();
if (data.poll && Array.isArray(data.poll.options)) {
const oldTotal = options.reduce((s, o) => s + o.votes, 0);
const newTotal = data.poll.options.reduce((s, o) => s + o.votes, 0);
if (newTotal !== oldTotal) {
options = data.poll.options;
state.options = options;
SoundFX.pop();
renderPoll();
}
}
} catch (_) {}
}, 2500);
renderPoll();
pushPollToServer();
return () => clearInterval(pollInterval);
}
},
'text': {
title: 'תיבת טקסט והנחיות לשיעור',
icon: '📝',
defaultW: 410,
defaultH: 270,
render(body, state, saveState) {
const defaultHtml = `<h3>🎯 משימת השיעור:</h3><ul><li>פתחו את המחברת בעמוד 24</li><li>קראו את הקטע וענו על שאלות 1–3</li><li>בסיום – בדקו עם החבר לשולחן</li></ul>`;
body.innerHTML = `
<div class="text-toolbar">
<button class="fmt-btn" data-cmd="bold" title="הדגשה"><b>B</b></button>
<button class="fmt-btn" data-cmd="underline" title="קו תחתון"><u>U</u></button>
<button class="fmt-btn" data-cmd="insertUnorderedList" title="רשימת תבליטים">• רשימה</button>
<button class="fmt-btn" data-size="1.05rem">א-</button>
<button class="fmt-btn" data-size="1.35rem">א+</button>
<button class="fmt-btn" data-size="1.75rem">א++</button>
<input type="color" data-el="color" value="#0f172a" title="צבע טקסט" style="width:26px;height:26px;border:none;background:none;cursor:pointer;" />
</div>
<div class="rich-text-area" contenteditable="true" data-el="editor">${state.html ?? defaultHtml}</div>
`;
const editor = body.querySelector('[data-el="editor"]');
if (state.fontSize) editor.style.fontSize = state.fontSize;
body.querySelectorAll('[data-cmd]').forEach(btn => {
btn.addEventListener('click', () => {
document.execCommand(btn.dataset.cmd, false, null);
editor.focus();
});
});
body.querySelectorAll('[data-size]').forEach(btn => {
btn.addEventListener('click', () => {
editor.style.fontSize = btn.dataset.size;
state.fontSize = btn.dataset.size;
saveState();
});
});
body.querySelector('[data-el="color"]').addEventListener('input', (e) => {
document.execCommand('foreColor', false, e.target.value);
});
editor.addEventListener('input', () => {
state.html = editor.innerHTML;
saveState();
});
}
},
'draw': {
title: 'לוח ציור ושרטוט',
icon: '🎨',
defaultW: 440,
defaultH: 340,
render(body, state, saveState) {
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:8px;">
<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
<input type="color" data-el="color" value="#4f46e5" style="width:28px;height:28px;border:none;" />
<select data-el="size" style="padding:4px 8px;border-radius:6px;border:1px solid #cbd5e1;">
<option value="2">עט דק</option>
<option value="5" selected>טוש רגיל</option>
<option value="12">טוש עבה</option>
</select>
<button class="small-btn" data-act="eraser">🧹 מחק</button>
<button class="small-btn" data-act="grid">📏 משבצות</button>
<button class="small-btn" data-act="clear">🗑️ נקה</button>
</div>
<div style="flex:1;position:relative;background:#ffffff;border-radius:12px;border:1px solid #cbd5e1;overflow:hidden;" data-el="wrap">
<canvas data-el="cv" style="width:100%;height:100%;cursor:crosshair;display:block;"></canvas>
</div>
</div>
`;
const wrap = body.querySelector('[data-el="wrap"]');
const canvas = body.querySelector('[data-el="cv"]');
const ctx = canvas.getContext('2d');
const colorInp = body.querySelector('[data-el="color"]');
const sizeSel = body.querySelector('[data-el="size"]');
let erasing = false;
let drawing = false;
let showGrid = false;
function resizeCanvas() {
const rect = wrap.getBoundingClientRect();
if (rect.width === 0) return;
const temp = canvas.toDataURL();
canvas.width = rect.width;
canvas.height = rect.height;
if (state.dataUrl || temp) {
const img = new Image();
img.onload = () => ctx.drawImage(img, 0, 0);
img.src = state.dataUrl || temp;
}
}
setTimeout(resizeCanvas, 50);
function getPos(e) {
const r = canvas.getBoundingClientRect();
const clientX = e.touches ? e.touches[0].clientX : e.clientX;
const clientY = e.touches ? e.touches[0].clientY : e.clientY;
return { x: clientX - r.left, y: clientY - r.top };
}
canvas.addEventListener('pointerdown', (e) => {
drawing = true;
const p = getPos(e);
ctx.beginPath();
ctx.moveTo(p.x, p.y);
});
canvas.addEventListener('pointermove', (e) => {
if (!drawing) return;
const p = getPos(e);
ctx.lineTo(p.x, p.y);
ctx.strokeStyle = erasing ? '#ffffff' : colorInp.value;
ctx.lineWidth = erasing ? 24 : parseInt(sizeSel.value, 10);
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.stroke();
});
window.addEventListener('pointerup', () => {
if (drawing) {
drawing = false;
state.dataUrl = canvas.toDataURL();
saveState();
}
});
body.querySelector('[data-act="eraser"]').addEventListener('click', (e) => {
erasing = !erasing;
e.currentTarget.style.background = erasing ? '#fee2e2' : '';
});
colorInp.addEventListener('input', () => { erasing = false; });
body.querySelector('[data-act="grid"]').addEventListener('click', () => {
showGrid = !showGrid;
wrap.style.backgroundImage = showGrid
? 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)'
: 'none';
wrap.style.backgroundSize = '22px 22px';
});
body.querySelector('[data-act="clear"]').addEventListener('click', () => {
ctx.clearRect(0, 0, canvas.width, canvas.height);
state.dataUrl = null;
saveState();
});
}
},
'qr': {
title: 'מחולל קוד QR לתלמידים',
icon: '📱',
defaultW: 270,
defaultH: 310,
render(body, state, saveState) {
let url = state.url ?? 'https://he.wikipedia.org';
body.innerHTML = `
<div style="display:flex;flex-direction:column;align-items:center;justify-content:space-between;height:100%;gap:10px;">
<input type="text" data-el="url" value="${url}" placeholder="הדבק קישור לאתר (URL)..."
style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid #cbd5e1;direction:ltr;font-size:0.84rem;" />
<div style="background:#fff;padding:12px;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,0.08);display:flex;align-items:center;justify-content:center;">
<img data-el="qr-img" alt="QR Code" style="width:150px;height:150px;display:block;" />
</div>
<div style="font-size:0.78rem;color:var(--text-muted);text-align:center;">סרקו עם מצלמת הטלפון לכניסה מהירה</div>
</div>
`;
const inp = body.querySelector('[data-el="url"]');
const img = body.querySelector('[data-el="qr-img"]');
function updateQR() {
const val = inp.value.trim() || 'https://classroomscreen.com';
img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(val)}`;
}
inp.addEventListener('input', () => {
state.url = inp.value;
saveState();
updateQR();
});
updateQR();
}
},
'timetable': {
title: 'מערכת שעות שבועית',
icon: '📋',
defaultW: 360,
defaultH: 380,
render(body, state, saveState) {
const DAY_NAMES = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
const todayDayIdx = Math.min(5, Math.max(0, new Date().getDay()));
let selectedDay = state.selectedDay ?? todayDayIdx;
let isEditMode = false;

const DEFAULT_WEEKLY = {
0: [
  { time: '08:00', num: '1', subject: 'תפילת בוקר ומפגש', teacher: 'מחנכת', done: false },
  { time: '08:45', num: '2', subject: 'עברית ושפה', teacher: 'מיכל', done: false },
  { time: '09:45', num: 'הפסקה', subject: 'ארוחת עשר והפסקה', teacher: '', done: false },
  { time: '10:15', num: '3', subject: 'חשבון והנדסה', teacher: 'רונית', done: false },
  { time: '11:15', num: '4', subject: 'תנ"ך ומורשת', teacher: 'דוד', done: false },
  { time: '12:00', num: '5', subject: 'חינוך גופני (ספורט)', teacher: 'יוסי', done: false }
],
1: [
  { time: '08:00', num: '1', subject: 'מפגש בוקר ושיח', teacher: 'מחנכת', done: false },
  { time: '08:45', num: '2', subject: 'חשבון והנדסה', teacher: 'רונית', done: false },
  { time: '09:45', num: 'הפסקה', subject: 'הפסקה פעילה', teacher: '', done: false },
  { time: '10:15', num: '3', subject: 'אנגלית', teacher: 'שרה', done: false },
  { time: '11:15', num: '4', subject: 'מדעים וטכנולוגיה', teacher: 'דנה', done: false },
  { time: '12:00', num: '5', subject: 'אמנות ויצירה', teacher: 'אורלי', done: false }
],
2: [
  { time: '08:00', num: '1', subject: 'קריאה מונחית', teacher: 'מיכל', done: false },
  { time: '08:45', num: '2', subject: 'עברית וכתיבה', teacher: 'מיכל', done: false },
  { time: '09:45', num: 'הפסקה', subject: 'הפסקת בוקר', teacher: '', done: false },
  { time: '10:15', num: '3', subject: 'חשבון', teacher: 'רונית', done: false },
  { time: '11:15', num: '4', subject: 'מוזיקה ושירה', teacher: 'נועם', done: false },
  { time: '12:00', num: '5', subject: 'גאוגרפיה ומולדת', teacher: 'דוד', done: false }
],
3: [
  { time: '08:00', num: '1', subject: 'מפגש בוקר', teacher: 'מחנכת', done: false },
  { time: '08:45', num: '2', subject: 'אנגלית', teacher: 'שרה', done: false },
  { time: '09:45', num: 'הפסקה', subject: 'ארוחת עשר', teacher: '', done: false },
  { time: '10:15', num: '3', subject: 'תנ"ך', teacher: 'דוד', done: false },
  { time: '11:15', num: '4', subject: 'חינוך גופני', teacher: 'יוסי', done: false },
  { time: '12:00', num: '5', subject: 'שפה והבעה', teacher: 'מיכל', done: false }
],
4: [
  { time: '08:00', num: '1', subject: 'כישורי חיים ושיח', teacher: 'מחנכת', done: false },
  { time: '08:45', num: '2', subject: 'חשבון', teacher: 'רונית', done: false },
  { time: '09:45', num: 'הפסקה', subject: 'הפסקה', teacher: '', done: false },
  { time: '10:15', num: '3', subject: 'מחשבים ורובוטיקה', teacher: 'אלעד', done: false },
  { time: '11:15', num: '4', subject: 'מדעים', teacher: 'דנה', done: false },
  { time: '12:00', num: '5', subject: 'סיכום שבוע ומעגל', teacher: 'מחנכת', done: false }
],
5: [
  { time: '08:00', num: '1', subject: 'קבלת שבת ושיח חגיגי', teacher: 'מחנכת', done: false },
  { time: '08:45', num: '2', subject: 'פרשת השבוע ומורשת', teacher: 'דוד', done: false },
  { time: '09:45', num: 'הפסקה', subject: 'הפסקה', teacher: '', done: false },
  { time: '10:15', num: '3', subject: 'משחקי חברה וחידות', teacher: 'מחנכת', done: false },
  { time: '11:00', num: '4', subject: 'חלוקת תעודות ושבת שלום', teacher: 'מחנכת', done: false }
]
};

let weekly = state.weeklySchedule || JSON.parse(JSON.stringify(DEFAULT_WEEKLY));

body.innerHTML = `
<div class="tt-wrapper">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
    <div class="tt-day-tabs" data-el="day-tabs"></div>
    <button class="small-btn" data-act="toggle-edit" title="ערוך את המערכת">✏️ עריכה</button>
  </div>
  <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px;font-size:0.8rem;color:var(--text-muted);">
    <span data-el="day-heading" style="font-weight:700;color:var(--text-dark);"></span>
    <button class="small-btn" data-act="jump-today" style="font-size:0.74rem;padding:2px 8px;">חזור להיום</button>
  </div>
  <div class="timetable-list" data-el="list"></div>
  <div data-el="edit-controls" class="hidden" style="display:flex;gap:6px;margin-top:auto;">
    <button class="small-btn" data-act="add-period" style="flex:1;">+ הוסף שיעור ליום זה</button>
    <button class="small-btn" data-act="reset-day" style="font-size:0.75rem;">↺ שחזר ברירת מחדל</button>
  </div>
</div>
`;

const tabsContainer = body.querySelector('[data-el="day-tabs"]');
const dayHeadingEl = body.querySelector('[data-el="day-heading"]');
const listEl = body.querySelector('[data-el="list"]');
const editControls = body.querySelector('[data-el="edit-controls"]');
const toggleEditBtn = body.querySelector('[data-act="toggle-edit"]');
const jumpTodayBtn = body.querySelector('[data-act="jump-today"]');

function renderDayTabs() {
tabsContainer.innerHTML = DAY_NAMES.map((name, idx) => {
  const isSelected = idx === selectedDay;
  const isToday = idx === todayDayIdx;
  return `
    <button class="tt-day-tab ${isSelected ? 'active' : ''}" data-day="${idx}">
      ${name}
      ${isToday ? '<span class="tt-today-dot" title="היום"></span>' : ''}
    </button>
  `;
}).join('');

tabsContainer.querySelectorAll('.tt-day-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedDay = parseInt(btn.dataset.day, 10);
    state.selectedDay = selectedDay;
    saveState();
    renderDayTabs();
    renderSchedule();
  });
});
}

function renderSchedule() {
const isToday = selectedDay === todayDayIdx;
dayHeadingEl.textContent = `מערכת יום ${DAY_NAMES[selectedDay]} ${isToday ? '• (היום)' : ''}`;
const currentList = weekly[selectedDay] || [];

if (isEditMode) {
  editControls.classList.remove('hidden');
  toggleEditBtn.textContent = '✓ שמור וסיים';
  toggleEditBtn.style.background = '#10b981';
  toggleEditBtn.style.color = '#fff';
  listEl.innerHTML = currentList.map((item, i) => `
    <div class="tt-card" style="padding:6px 8px;">
      <input type="text" data-edit-num="${i}" value="${item.num || (i + 1)}" style="width:36px;text-align:center;font-weight:700;border:1px solid #cbd5e1;border-radius:6px;padding:3px;" title="מס' שיעור" />
      <input type="text" data-edit-time="${i}" value="${item.time || ''}" style="width:50px;text-align:center;font-size:0.8rem;border:1px solid #cbd5e1;border-radius:6px;padding:3px;direction:ltr;" title="שעה" />
      <input type="text" data-edit-sub="${i}" value="${item.subject || ''}" placeholder="מקצוע/נושא" style="flex:1;font-weight:700;border:1px solid #cbd5e1;border-radius:6px;padding:3px 6px;" />
      <input type="text" data-edit-teacher="${i}" value="${item.teacher || ''}" placeholder="מורה" style="width:65px;font-size:0.8rem;border:1px solid #cbd5e1;border-radius:6px;padding:3px 6px;" />
      <button data-del="${i}" style="border:none;background:transparent;cursor:pointer;color:#ef4444;font-size:0.9rem;" title="מחק שיעור">✕</button>
    </div>
  `).join('');

  listEl.querySelectorAll('[data-edit-num]').forEach(inp => {
    inp.addEventListener('change', () => { currentList[inp.dataset.editNum].num = inp.value; saveSchedule(); });
  });
  listEl.querySelectorAll('[data-edit-time]').forEach(inp => {
    inp.addEventListener('change', () => { currentList[inp.dataset.editTime].time = inp.value; saveSchedule(); });
  });
  listEl.querySelectorAll('[data-edit-sub]').forEach(inp => {
    inp.addEventListener('change', () => { currentList[inp.dataset.editSub].subject = inp.value; saveSchedule(); });
  });
  listEl.querySelectorAll('[data-edit-teacher]').forEach(inp => {
    inp.addEventListener('change', () => { currentList[inp.dataset.editTeacher].teacher = inp.value; saveSchedule(); });
  });
  listEl.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentList.splice(parseInt(btn.dataset.del, 10), 1);
      saveSchedule();
      renderSchedule();
    });
  });
} else {
  editControls.classList.add('hidden');
  toggleEditBtn.textContent = '✏️ עריכה';
  toggleEditBtn.style.background = '';
  toggleEditBtn.style.color = '';
  if (currentList.length === 0) {
    listEl.innerHTML = `
      <div style="text-align:center;padding:24px 12px;color:var(--text-muted);font-weight:600;">
        אין שיעורים מוגדרים ליום זה.<br>
        <button class="small-btn" data-act="start-add" style="margin-top:8px;">+ הוסף שיעור ראשון</button>
      </div>
    `;
    const startAdd = listEl.querySelector('[data-act="start-add"]');
    if (startAdd) startAdd.addEventListener('click', () => { isEditMode = true; renderSchedule(); });
    return;
  }
  listEl.innerHTML = currentList.map((item, i) => `
    <div class="tt-card ${item.done ? 'done' : ''}">
      <input type="checkbox" data-check="${i}" ${item.done ? 'checked' : ''} style="cursor:pointer;" />
      <span class="tt-period-badge">${item.num || (i + 1)}</span>
      <div style="display:flex;flex-direction:column;flex:1;">
        <span class="tt-sub-text">${item.subject}</span>
        ${item.teacher ? `<span class="tt-teacher-tag">מורה: ${item.teacher}</span>` : ''}
      </div>
      ${item.time ? `<span style="font-size:0.78rem;font-weight:700;color:var(--text-muted);direction:ltr;">${item.time}</span>` : ''}
    </div>
  `).join('');

  listEl.querySelectorAll('[data-check]').forEach(cb => {
    cb.addEventListener('change', () => {
      currentList[cb.dataset.check].done = cb.checked;
      saveSchedule();
      renderSchedule();
    });
  });
}
}

function saveSchedule() {
state.weeklySchedule = weekly;
saveState();
}

toggleEditBtn.addEventListener('click', () => {
isEditMode = !isEditMode;
renderSchedule();
});

jumpTodayBtn.addEventListener('click', () => {
selectedDay = todayDayIdx;
state.selectedDay = selectedDay;
saveState();
renderDayTabs();
renderSchedule();
});

body.querySelector('[data-act="add-period"]').addEventListener('click', () => {
const currentList = weekly[selectedDay] || [];
currentList.push({
  num: String(currentList.length + 1),
  time: '12:45',
  subject: 'שיעור חדש',
  teacher: '',
  done: false
});
weekly[selectedDay] = currentList;
saveSchedule();
renderSchedule();
});

body.querySelector('[data-act="reset-day"]').addEventListener('click', () => {
if (confirm(`האם לשחזר את מערכת יום ${DAY_NAMES[selectedDay]} לברירת המחדל המקורית?`)) {
  weekly[selectedDay] = JSON.parse(JSON.stringify(DEFAULT_WEEKLY[selectedDay] || []));
  saveSchedule();
  renderSchedule();
}
});

renderDayTabs();
renderSchedule();
}
},
'calendar': {
title: 'לוח שנה כיתתי',
icon: '📅',
defaultW: 320,
defaultH: 300,
render(body) {
let viewDate = new Date();
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:8px;">
<div style="display:flex;align-items:center;justify-content:space-between;">
<button class="small-btn" data-act="prev">◀</button>
<div data-el="month-title" style="font-weight:800;font-size:1rem;"></div>
<button class="small-btn" data-act="next">▶</button>
</div>
<div style="display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:800;font-size:0.78rem;color:var(--primary);">
<span>א׳</span><span>ב׳</span><span>ג׳</span><span>ד׳</span><span>ה׳</span><span>ו׳</span><span>ש׳</span>
</div>
<div data-el="days" style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;flex:1;text-align:center;"></div>
</div>
`;
const titleEl = body.querySelector('[data-el="month-title"]');
const daysEl = body.querySelector('[data-el="days"]');
function renderCal() {
const y = viewDate.getFullYear();
const m = viewDate.getMonth();
titleEl.textContent = viewDate.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' });
const firstDay = new Date(y, m, 1).getDay();
const daysInMonth = new Date(y, m + 1, 0).getDate();
const today = new Date();
let html = '';
for (let i = 0; i < firstDay; i++) html += `<div></div>`;
for (let d = 1; d <= daysInMonth; d++) {
const isToday = d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
html += `<div style="display:flex;align-items:center;justify-content:center;border-radius:8px;font-weight:700;font-size:0.85rem;${isToday ? 'background:var(--primary);color:#fff;' : 'background:rgba(0,0,0,0.03);'}">${d}</div>`;
}
daysEl.innerHTML = html;
}
body.querySelector('[data-act="prev"]').addEventListener('click', () => {
viewDate.setMonth(viewDate.getMonth() - 1);
renderCal();
});
body.querySelector('[data-act="next"]').addEventListener('click', () => {
viewDate.setMonth(viewDate.getMonth() + 1);
renderCal();
});
renderCal();
}
},
'countdown': {
title: 'ספירה לאחור לאירוע',
icon: '🎉',
defaultW: 300,
defaultH: 230,
render(body, state, saveState) {
let eventName = state.eventName ?? 'הטיול השנתי! 🎒';
let targetDate = state.targetDate ?? new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
body.innerHTML = `
<div style="display:flex;flex-direction:column;align-items:center;justify-content:space-between;height:100%;text-align:center;">
<input type="text" data-el="name" value="${eventName}" style="width:100%;text-align:center;font-weight:800;font-size:1.05rem;border:none;background:rgba(0,0,0,0.04);padding:6px;border-radius:8px;" />
<div style="background:linear-gradient(135deg,#4f46e5,#0ea5e9);color:#fff;padding:14px 24px;border-radius:18px;width:100%;">
<div data-el="days" style="font-size:2.6rem;font-weight:900;line-height:1;">14</div>
<div style="font-size:0.9rem;font-weight:700;">ימים נותרו</div>
</div>
<input type="date" data-el="date" value="${targetDate}" style="padding:5px 10px;border-radius:8px;border:1px solid #cbd5e1;font-size:0.85rem;" />
</div>
`;
const nameInp = body.querySelector('[data-el="name"]');
const dateInp = body.querySelector('[data-el="date"]');
const daysEl = body.querySelector('[data-el="days"]');
function calc() {
const diff = new Date(dateInp.value) - new Date();
const d = Math.max(0, Math.ceil(diff / 86400000));
daysEl.textContent = d;
}
nameInp.addEventListener('input', () => {
state.eventName = nameInp.value;
saveState();
});
dateInp.addEventListener('change', () => {
state.targetDate = dateInp.value;
saveState();
calc();
});
calc();
}
},
'stickers': {
title: 'מדבקות וחיזוקים לכיתה',
icon: '⭐',
defaultW: 320,
defaultH: 260,
render(body) {
const stickers = [
{ emoji: '🏆', text: 'אלופים! כל הכבוד!' },
{ emoji: '🌟', text: 'עבודה נהדרת!' },
{ emoji: '👏', text: 'הקשבה מצוינת!' },
{ emoji: '🚀', text: 'התקדמות מדהימה!' },
{ emoji: '💎', text: 'כיתה מצטיינת!' },
{ emoji: '❤️', text: 'גאה בכם מאוד!' }
];
body.innerHTML = `
<div class="stickers-grid">
${stickers.map((s, i) => `
<button class="sticker-badge-btn" data-idx="${i}">
<span class="sticker-emoji">${s.emoji}</span>
<span class="sticker-text">${s.text}</span>
</button>
`).join('')}
</div>
`;
body.querySelectorAll('.sticker-badge-btn').forEach(btn => {
btn.addEventListener('click', () => {
const s = stickers[btn.dataset.idx];
SoundFX.fanfare();
const toast = document.createElement('div');
toast.className = 'floating-praise-toast';
toast.innerHTML = `
<div style="font-size:4.5rem;">${s.emoji}</div>
<div style="font-size:2rem;font-weight:900;color:var(--primary);margin-top:8px;">${s.text}</div>
`;
document.body.appendChild(toast);
setTimeout(() => toast.remove(), 1900);
});
});
}
},
'image': {
title: 'תמונה על הלוח',
icon: '🖼️',
defaultW: 350,
defaultH: 300,
render(body, state, saveState) {
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:8px;">
<div style="display:flex;gap:6px;">
<label class="small-btn" style="cursor:pointer;">📁 העלה מהמחשב<input type="file" accept="image/*" hidden data-el="file" /></label>
<input type="text" data-el="url" placeholder="או הדבק קישור לתמונה..." style="flex:1;padding:4px 8px;border-radius:8px;border:1px solid #cbd5e1;font-size:0.82rem;" />
</div>
<div style="flex:1;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.03);border-radius:12px;overflow:hidden;">
<img data-el="img" src="${state.src || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80'}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;" />
</div>
</div>
`;
const img = body.querySelector('[data-el="img"]');
const fileInp = body.querySelector('[data-el="file"]');
const urlInp = body.querySelector('[data-el="url"]');
fileInp.addEventListener('change', (e) => {
const file = e.target.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = () => {
img.src = reader.result;
state.src = reader.result;
saveState();
};
reader.readAsDataURL(file);
});
urlInp.addEventListener('change', () => {
if (urlInp.value.trim()) {
img.src = urlInp.value.trim();
state.src = urlInp.value.trim();
saveState();
}
});
}
},
'video': {
title: 'סרטון יוטיוב',
icon: '▶️',
defaultW: 420,
defaultH: 320,
render(body, state, saveState) {
let videoId = state.videoId ?? 'jfKfPfyJRdk';
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:8px;">
<div style="display:flex;gap:6px;">
<input type="text" data-el="yt" placeholder="הדבק קישור לסרטון יוטיוב..." style="flex:1;padding:6px 10px;border-radius:8px;border:1px solid #cbd5e1;font-size:0.84rem;" />
<button class="primary-btn" data-act="load" style="padding:6px 12px;">טען</button>
</div>
<div style="flex:1;border-radius:12px;overflow:hidden;background:#000;">
<iframe data-el="frame" width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
</div>
</div>
`;
const inp = body.querySelector('[data-el="yt"]');
const frame = body.querySelector('[data-el="frame"]');
function extractId(url) {
const m = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
return m ? m[1] : url.trim();
}
body.querySelector('[data-act="load"]').addEventListener('click', () => {
const id = extractId(inp.value);
if (id) {
videoId = id;
state.videoId = videoId;
saveState();
frame.src = `https://www.youtube.com/embed/${videoId}`;
}
});
}
},
'webcam': {
title: 'מצלמת רשת / מסמכים',
icon: '📷',
defaultW: 360,
defaultH: 290,
render(body) {
let stream = null;
let mirrored = true;
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:8px;">
<div style="flex:1;background:#0f172a;border-radius:12px;overflow:hidden;display:flex;align-items:center;justify-content:center;position:relative;">
<video data-el="vid" autoplay playsinline style="width:100%;height:100%;object-fit:cover;transform:scaleX(-1);"></video>
<div data-el="msg" style="position:absolute;color:#fff;font-size:0.85rem;text-align:center;padding:12px;">לחץ להפעלת מצלמה</div>
</div>
<div style="display:flex;gap:8px;justify-content:center;">
<button class="primary-btn" data-act="start">📷 הפעל מצלמה</button>
<button class="secondary-btn" data-act="mirror">⇄ היפוך מראה</button>
</div>
</div>
`;
const vid = body.querySelector('[data-el="vid"]');
const msg = body.querySelector('[data-el="msg"]');
body.querySelector('[data-act="start"]').addEventListener('click', async () => {
try {
stream = await navigator.mediaDevices.getUserMedia({ video: true });
vid.srcObject = stream;
msg.style.display = 'none';
} catch (e) {
msg.textContent = 'לא נמצאה מצלמה זמינה או שההרשאה נחסמה בדפדפן';
}
});
body.querySelector('[data-act="mirror"]').addEventListener('click', () => {
mirrored = !mirrored;
vid.style.transform = mirrored ? 'scaleX(-1)' : 'scaleX(1)';
});
return () => {
if (stream) stream.getTracks().forEach(t => t.stop());
};
}
},
'embed': {
title: 'הטמעת אתר או קישור',
icon: '🌐',
defaultW: 440,
defaultH: 340,
render(body, state, saveState) {
let url = state.url ?? 'https://he.wikipedia.org/wiki/עמוד_ראשי';
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:8px;">
<div style="display:flex;gap:6px;">
<input type="text" data-el="url" value="${url}" placeholder="הדבק כתובת אתר להצגה..." style="flex:1;padding:6px 10px;border-radius:8px;border:1px solid #cbd5e1;direction:ltr;font-size:0.84rem;" />
<button class="primary-btn" data-act="go">פתח</button>
</div>
<iframe data-el="iframe" src="${url}" style="flex:1;width:100%;border:1px solid #cbd5e1;border-radius:10px;background:#fff;"></iframe>
</div>
`;
const inp = body.querySelector('[data-el="url"]');
const iframe = body.querySelector('[data-el="iframe"]');
body.querySelector('[data-act="go"]').addEventListener('click', () => {
let u = inp.value.trim();
if (u && !/^https?:\/\//i.test(u)) u = 'https://' + u;
iframe.src = u;
state.url = u;
saveState();
});
}
}
};