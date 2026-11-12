const ICON_CATEGORIES = [
  {
    id: 'animals',
    name: 'בעלי חיים',
    icon: '🦁',
    icons: ['🦁','🐼','🦊','🐶','🐱','🐰','🐻','🐨','🐵','🦄','🐬','🦅','🦉','🐢','🐧','🦖','🦋','🐝','🐘','🦒','זברה','🦓','🐺','🦩','🐳','🦔','🐸','🐑','🦌']
  },
  {
    id: 'vehicles',
    name: 'כלי תחבורה',
    icon: '🚀',
    icons: ['🚀','🚗','✈️','🏎️','🚁','🚲','🚂','⛵','🛸','🏍️','🚜','🚢','🛹','🛵','🚒','🚑','🚓','🚊','🚤','🛰️','🛩️','🚠','🛴','🚌','🚚']
  },
  {
    id: 'food',
    name: 'מאכלים ופירות',
    icon: '🍎',
    icons: ['🍎','🍓','🍇','🍉','🍌','🍒','🥑','🍍','🍊','🥞','🥐','🍕','🍟','🍦','🧁','🍩','🍪','🍫','🍿','🥨','🎂','🥗','🥕','🥪']
  },
  {
    id: 'sports',
    name: 'ספורט וכדורים',
    icon: '⚽',
    icons: ['⚽','🏀','🏈','🎾','🏐','⚾','🏓','🏸','🎳','🎯','🏆','🥇','🛹','⛳','🥋','🎿','⛸️']
  },
  {
    id: 'music',
    name: 'כלי נגינה ומוזיקה',
    icon: '🎵',
    icons: ['🎸','🎻','🎹','🎺','🎷','🥁','🪘','🪕','🪗','📯','🪈','🔔','🎵','🎶','🎼','📻','🎤','🪇']
  },
  {
    id: 'gems',
    name: 'יהלומים וסמלים',
    icon: '💎',
    icons: ['💎','⭐','👑','🪐','🔥','⚡','🌈','🔮','🌟','🎨','🎮','🧩','💡','🛡️','✨','🕶️','🎖️','🪄','🌺','🌻','🍀','💫','⚜️','📚']
  }
];

const ALL_STUDENT_ICONS = ICON_CATEGORIES.flatMap(c => c.icons);

function renderStudentIconHtml(icon, name = '') {
  if (icon && !icon.startsWith('flag:')) {
    return `<span class="icon-glyph">${icon}</span>`;
  }
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const fallback = ALL_STUDENT_ICONS[Math.abs(hash) % ALL_STUDENT_ICONS.length];
  return `<span class="icon-glyph">${fallback}</span>`;
}
window.renderStudentIconHtml = renderStudentIconHtml;

function renderStudentAvatarHtml(name, size = 58) {
  const photos = (window.AppStore && window.AppStore.getStudentPhotos) ? window.AppStore.getStudentPhotos() : {};
  const photo = photos[name];
  if (photo) {
    return `<div class="student-avatar-circle" style="width:${size}px;height:${size}px;"><img src="${photo}" alt="${name}" class="student-avatar-img" /></div>`;
  }
  const icons = (window.AppStore && window.AppStore.getStudentIcons) ? window.AppStore.getStudentIcons() : {};
  const icon = icons[name] || '';
  const iconHtml = renderStudentIconHtml(icon, name);
  return `<div class="student-avatar-circle icon-mode" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.52)}px;">${iconHtml}</div>`;
}
window.renderStudentAvatarHtml = renderStudentAvatarHtml;

function startConfettiAnimation(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiPieces = [];
  const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6', '#38bdf8', '#fef08a'];

  for (let i = 0; i < 90; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: 8 + Math.random() * 8,
      h: 6 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: 2 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 3,
      rot: Math.random() * 360,
      vrot: (Math.random() - 0.5) * 8
    });
  }

  const render = () => {
    if (!document.getElementById(canvasId)) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(p => {
      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.vrot;
      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    requestAnimationFrame(render);
  };
  render();
}

function openGrandPodium(top1, top2, top3, categoryLeadersHtml = '') {
  let overlay = document.getElementById('grand-podium-fullscreen');
  if (overlay) overlay.remove();

  overlay = document.createElement('div');
  overlay.id = 'grand-podium-fullscreen';
  overlay.className = 'grand-podium-overlay';

  function renderWinnerAvatar(student, size) {
    if (!student) return '';
    const photos = (window.AppStore && window.AppStore.getStudentPhotos) ? window.AppStore.getStudentPhotos() : {};
    const photo = photos[student.name];
    if (photo) {
      return `<div class="grand-podium-photo-circle" style="width:${size}px;height:${size}px;"><img src="${photo}" alt="${student.name}" /></div>`;
    }
    const icons = (window.AppStore && window.AppStore.getStudentIcons) ? window.AppStore.getStudentIcons() : {};
    const icon = icons[student.name] || '';
    const glyph = window.renderStudentIconHtml ? window.renderStudentIconHtml(icon, student.name) : '⭐';
    return `<div class="grand-podium-photo-circle icon-mode" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.52)}px;">${glyph}</div>`;
  }

  overlay.innerHTML = `
    <canvas id="grand-podium-confetti" class="grand-confetti-canvas"></canvas>
    <div class="grand-podium-content">
      <div class="grand-podium-topbar">
        <button class="grand-podium-close-btn" data-act="close-grand-podium">✕ חזור למסך הכיתה</button>
      </div>
      <div class="grand-podium-header">
        <h1 class="grand-podium-title">🎉 מצעד אלופי הכיתה! 💎</h1>
        <p class="grand-podium-subtitle">מצטייני היום שצברו הכי הרבה יהלומים בכיתה</p>
      </div>

      <div class="grand-podium-stage">
        ${top2 ? `
          <div class="grand-podium-col second">
            <div class="grand-winner-header">
              <span class="grand-medal">🥈</span>
              ${renderWinnerAvatar(top2, 90)}
              <div class="grand-winner-name">${top2.name}</div>
            </div>
            <div class="grand-pedestal silver">
              <div class="grand-rank-badge">2</div>
              <div class="grand-score-badge">💎 ${top2.score}</div>
              <div class="grand-score-sub">יהלומים היום</div>
            </div>
          </div>
        ` : '<div class="grand-podium-col second empty"></div>'}

        <div class="grand-podium-col first">
          <div class="grand-winner-header">
            <div class="grand-crown">👑</div>
            <span class="grand-medal first">🥇</span>
            ${renderWinnerAvatar(top1, 116)}
            <div class="grand-winner-name first">${top1.name}</div>
          </div>
          <div class="grand-pedestal gold">
            <div class="grand-rank-badge first">1</div>
            <div class="grand-score-badge first">💎 ${top1.score}</div>
            <div class="grand-score-sub first">אלוף/ת היהלומים! 🏆</div>
          </div>
        </div>

        ${top3 ? `
          <div class="grand-podium-col third">
            <div class="grand-winner-header">
              <span class="grand-medal">🥉</span>
              ${renderWinnerAvatar(top3, 90)}
              <div class="grand-winner-name">${top3.name}</div>
            </div>
            <div class="grand-pedestal bronze">
              <div class="grand-rank-badge">3</div>
              <div class="grand-score-badge">💎 ${top3.score}</div>
              <div class="grand-score-sub">יהלומים היום</div>
            </div>
          </div>
        ` : '<div class="grand-podium-col third empty"></div>'}
      </div>

      ${categoryLeadersHtml ? `
        <div class="grand-category-leaders">
          ${categoryLeadersHtml}
        </div>
      ` : ''}
    </div>
  `;

  document.body.appendChild(overlay);
  SoundFX.fanfare();
  startConfettiAnimation('grand-podium-confetti');

  const closeFn = () => {
    overlay.remove();
    document.removeEventListener('keydown', keyHandler);
  };
  const keyHandler = (e) => {
    if (e.key === 'Escape') closeFn();
  };
  document.addEventListener('keydown', keyHandler);

  overlay.querySelector('[data-act="close-grand-podium"]').addEventListener('click', closeFn);
}
window.openGrandPodium = openGrandPodium;

const DEFAULT_WEEKLY_SCHEDULE = {
  0: [
    { time: '08:00', num: '1', subject: 'תפילת בוקר ומפגש', teacher: 'מחנך', topic: '', done: false },
    { time: '08:45', num: '2', subject: 'עברית ולשון', teacher: 'מיכל', topic: '', done: false },
    { time: '09:45', num: 'הפסקה', subject: 'ארוחת עשר והפסקה', teacher: '', topic: '', done: false },
    { time: '10:15', num: '3', subject: 'חשבון והנדסה', teacher: 'רונית', topic: '', done: false },
    { time: '11:15', num: '4', subject: 'תורה ומורשת', teacher: 'דוד', topic: '', done: false },
    { time: '12:00', num: '5', subject: 'חינוך גופני', teacher: 'יוסי', topic: '', done: false }
  ],
  1: [
    { time: '08:00', num: '1', subject: 'תפילה ומפגש בוקר', teacher: 'מחנך', topic: '', done: false },
    { time: '08:45', num: '2', subject: 'חשבון והנדסה', teacher: 'רונית', topic: '', done: false },
    { time: '09:45', num: 'הפסקה', subject: 'הפסקה פעילה', teacher: '', topic: '', done: false },
    { time: '10:15', num: '3', subject: 'אנגלית', teacher: 'שרה', topic: '', done: false },
    { time: '11:15', num: '4', subject: 'מדעים וטבע', teacher: 'דנה', topic: '', done: false },
    { time: '12:00', num: '5', subject: 'אמנות ויצירה', teacher: 'אורלי', topic: '', done: false }
  ],
  2: [
    { time: '08:00', num: '1', subject: 'תפילה וקריאה מונחית', teacher: 'מחנך', topic: '', done: false },
    { time: '08:45', num: '2', subject: 'עברית וכתיבה', teacher: 'מיכל', topic: '', done: false },
    { time: '09:45', num: 'הפסקה', subject: 'הפסקת בוקר', teacher: '', topic: '', done: false },
    { time: '10:15', num: '3', subject: 'חשבון', teacher: 'רונית', topic: '', done: false },
    { time: '11:15', num: '4', subject: 'שירה וזמרה', teacher: 'נועם', topic: '', done: false },
    { time: '12:00', num: '5', subject: 'מולדת וארץ ישראל', teacher: 'דוד', topic: '', done: false }
  ],
  3: [
    { time: '08:00', num: '1', subject: 'תפילת שחרית ומפגש', teacher: 'מחנך', topic: '', done: false },
    { time: '08:45', num: '2', subject: 'אנגלית', teacher: 'שרה', topic: '', done: false },
    { time: '09:45', num: 'הפסקה', subject: 'ארוחת עשר', teacher: '', topic: '', done: false },
    { time: '10:15', num: '3', subject: 'תנ"ך ומורשת', teacher: 'דוד', topic: '', done: false },
    { time: '11:15', num: '4', subject: 'חינוך גופני', teacher: 'יוסי', topic: '', done: false },
    { time: '12:00', num: '5', subject: 'הבעה ושפה', teacher: 'מיכל', topic: '', done: false }
  ],
  4: [
    { time: '08:00', num: '1', subject: 'תפילה ושיחת בוקר', teacher: 'מחנך', topic: '', done: false },
    { time: '08:45', num: '2', subject: 'חשבון והנדסה', teacher: 'רונית', topic: '', done: false },
    { time: '09:45', num: 'הפסקה', subject: 'הפסקה', teacher: '', topic: '', done: false },
    { time: '10:15', num: '3', subject: 'מחשבים וטכנולוגיה', teacher: 'אלעד', topic: '', done: false },
    { time: '11:15', num: '4', subject: 'מדעים', teacher: 'דנה', topic: '', done: false },
    { time: '12:00', num: '5', subject: 'סיכום שבוע ומעגל', teacher: 'מחנך', topic: '', done: false }
  ],
  5: [
    { time: '08:00', num: '1', subject: 'תפילה ומפגש קבלת שבת', teacher: 'מחנך', topic: '', done: false },
    { time: '08:45', num: '2', subject: 'פרשת השבוע ומורשת', teacher: 'דוד', topic: '', done: false },
    { time: '09:45', num: 'הפסקה', subject: 'הפסקה', teacher: '', topic: '', done: false },
    { time: '10:15', num: '3', subject: 'עונג שבת וחידות', teacher: 'מחנך', topic: '', done: false },
    { time: '11:00', num: '4', subject: 'חלוקת תעודות ושבת שלום', teacher: 'מחנך', topic: '', done: false }
  ]
};

function renderScoreboardAndPoints(body, state, saveState, defaultTab = 'teams') {
  let activeTab = state.activeTab ?? defaultTab;
  let selectedClassId = state.classId ?? window.AppStore.getSelectedClassId();
  let scoreMode = state.scoreMode ?? 'daily'; // 'daily' or 'total'
  let searchQuery = '';
  let selectedStudentForAward = null;
  let selectedStudentForIcon = null;
  let activeIconCategory = 'animals';
  let targetStudentForUpload = null;

  const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];
  let teams = state.teams ?? [
    { name: 'קבוצה א׳', score: 0 },
    { name: 'קבוצה ב׳', score: 0 }
  ];

  // Student points map: { [studentName]: { daily: number, total: number, breakdown: { [reason]: number } } }
  let studentScores = window.AppStore.getStudentScores ? window.AppStore.getStudentScores() : (state.studentScores ?? {});
  // Student avatar icons map: { [studentName]: string }
  let studentIcons = window.AppStore.getStudentIcons ? window.AppStore.getStudentIcons() : (state.studentIcons ?? {});
  // Student photos map: { [studentName]: base64DataUrl }
  let studentPhotos = window.AppStore.getStudentPhotos ? window.AppStore.getStudentPhotos() : (state.studentPhotos ?? {});
  // Class goals map: { [classId]: { target: number, prize: string, teamTarget: number, teamPrize: string } }
  let classGoals = window.AppStore.getClassGoals ? window.AppStore.getClassGoals() : (state.classGoals ?? {});

  function getStudentIcon(name) {
    return studentIcons[name] || '';
  }

  function getStudentPhoto(name) {
    return studentPhotos[name] || '';
  }

  function getCurGoal() {
    if (!classGoals[selectedClassId]) {
      classGoals[selectedClassId] = {
        target: 100,
        prize: '🍕 מסיבת פיצה כיתתית',
        teamTarget: 25,
        teamPrize: '🏆 גביע השבוע'
      };
    }
    return classGoals[selectedClassId];
  }

  const BEHAVIORS = [
    { id: 'ready', icon: '🎒', title: 'מוכנות לשיעור', pts: 1 },
    { id: 'task', icon: '📝', title: 'ביצוע מטלה', pts: 2 },
    { id: 'listen', icon: '👂', title: 'הקשבה והשתתפות', pts: 1 },
    { id: 'help', icon: '🤝', title: 'עזרה לחבר', pts: 2 },
    { id: 'polite', icon: '💬', title: 'דיבור בנימוס', pts: 1 },
    { id: 'order', icon: '🧹', title: 'סדר וארגון', pts: 1 },
    { id: 'excel', icon: '💎', title: 'הצטיינות מיוחדת', pts: 3 },
    { id: 'behavior', icon: '⚡', title: 'התנהגות מופתית', pts: 2 },
    { id: 'free', icon: '➕', title: 'יהלום בונוס חופשי', pts: 1 },
    { id: 'penalty', icon: '➖', title: 'בירור / משמעת (-1)', pts: -1 }
  ];

  body.innerHTML = `
  <input type="file" accept="image/*" data-el="sp-photo-file-input" style="display:none;" />
  <div style="display:flex;flex-direction:column;height:100%;gap:8px;position:relative;">
    <div style="display:flex;gap:4px;background:rgba(0,0,0,0.05);padding:3px;border-radius:10px;">
      <button class="rand-tab ${activeTab === 'teams' ? 'active' : ''}" data-sptab="teams" style="flex:1;">👥 ניקוד קבוצות</button>
      <button class="rand-tab ${activeTab === 'students' ? 'active' : ''}" data-sptab="students" style="flex:1;">💎 יהלומים (אישי)</button>
    </div>

    <!-- 1. TEAMS VIEW -->
    <div data-el="teams-view" class="${activeTab === 'teams' ? '' : 'hidden'}" style="display:flex;flex-direction:column;height:100%;gap:8px;">
      <div data-el="team-goal-banner" class="team-goal-banner"></div>
      <div class="scoreboard-teams" data-el="teams-container"></div>
      <div style="display:flex;justify-content:space-between;gap:8px;margin-top:auto;">
        <button class="small-btn" data-act="add-team">+ הוסף קבוצה</button>
        <button class="secondary-btn" data-act="reset-scores" style="padding:4px 10px;font-size:0.8rem;">↺ איפוס ניקוד קבוצות</button>
      </div>
    </div>

    <!-- 2. STUDENTS INDIVIDUAL POINTS VIEW (DIAMONDS) -->
    <div data-el="students-view" class="sp-container ${activeTab === 'students' ? '' : 'hidden'}">
      <div class="sp-toolbar">
        <select data-el="sp-class-sel" style="max-width:130px;padding:5px 8px;border-radius:8px;border:1px solid #cbd5e1;font-weight:600;font-size:0.8rem;"></select>
        <input type="text" class="sp-search" data-el="sp-search" placeholder="🔍 חיפוש תלמיד..." />
        <div style="display:flex;gap:3px;">
          <button class="sp-mode-pill ${scoreMode === 'daily' ? 'active' : ''}" data-mode="daily" title="הצג יהלומים שנצברו היום">היום</button>
          <button class="sp-mode-pill ${scoreMode === 'total' ? 'active' : ''}" data-mode="total" title="הצג סך כל היהלומים המצטבר">מצטבר</button>
        </div>
      </div>

      <!-- Class Goal Progress Banner -->
      <div data-el="class-goal-banner" class="class-goal-banner"></div>

      <div style="display:flex;align-items:center;justify-content:space-between;padding:0 2px;flex-wrap:wrap;gap:4px;">
        <div style="display:flex;gap:4px;flex-wrap:wrap;">
          <button class="small-btn" data-act="open-podium" style="background:linear-gradient(135deg,#0284c7,#0369a1);color:#fff;font-weight:800;border:none;box-shadow:0 2px 8px rgba(2,132,199,0.25);">🏆 מצעד אלופים</button>
          <button class="small-btn" data-act="open-all-drawer" style="background:#e0f2fe;color:#0369a1;font-weight:800;border:1px solid #bae6fd;">✨ הוסף לכולם</button>
          <button class="small-btn" data-act="toggle-sidebar-view" style="font-weight:700;">📌 סרגל צדי</button>
        </div>
        <div style="display:flex;gap:4px;">
          <button class="small-btn" data-act="randomize-all-icons" title="חלק סמלים אקראיים ומגוונים לכל התלמידים" style="font-size:0.75rem;">🎲 הגרל סמלים</button>
          <button class="small-btn" data-act="reset-daily" style="font-size:0.75rem;">↺ איפוס יומי</button>
        </div>
      </div>
      <div class="sp-grid" data-el="students-grid"></div>

      <!-- Award Drawer (Opens on clicking student) -->
      <div data-el="award-drawer" class="sp-drawer hidden">
        <div class="sp-drawer-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <div data-el="drawer-avatar" style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:50%;overflow:hidden;background:#f0f9ff;border:2px solid #bae6fd;"></div>
            <div>
              <div data-el="drawer-title" style="font-weight:800;font-size:0.95rem;color:var(--text-dark);"></div>
              <div style="font-size:0.75rem;color:var(--text-muted);">בחר חיזוק להענקת יהלומים</div>
            </div>
          </div>
          <div style="display:flex;gap:4px;align-items:center;">
            <button class="small-btn" data-act="upload-photo-from-drawer" style="font-size:0.75rem;padding:3px 8px;" title="העלה תמונה מהמחשב">📷 תמונה</button>
            <button class="small-btn danger hidden" data-el="remove-photo-btn" data-act="remove-photo-from-drawer" style="font-size:0.75rem;padding:3px 8px;color:#dc2626;" title="מחק תמונה">🗑️</button>
            <button class="small-btn" data-act="open-icon-from-drawer" style="font-size:0.75rem;padding:3px 8px;">🎨 סמל</button>
            <button class="small-btn" data-act="close-drawer" style="padding:2px 8px;">✕</button>
          </div>
        </div>
        <div class="sp-behavior-grid">
          ${BEHAVIORS.map(b => `
            <button class="sp-behavior-btn" data-behavior="${b.id}" data-pts="${b.pts}">
              <span style="font-size:1.25rem;">${b.icon}</span>
              <span>${b.title}</span>
              <span class="sp-pts-tag" style="${b.pts < 0 ? 'background:#fee2e2;color:#dc2626;' : 'background:#e0f2fe;color:#0284c7;'}">
                ${b.pts > 0 ? '+' + b.pts : b.pts} 💎
              </span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Award All Class Drawer -->
      <div data-el="award-all-drawer" class="sp-drawer hidden">
        <div class="sp-drawer-header">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:1.3rem;">✨</span>
            <div>
              <div style="font-weight:800;font-size:0.95rem;color:var(--text-dark);">הענקת יהלומים לכל הכיתה בבת אחת</div>
              <div style="font-size:0.75rem;color:var(--text-muted);">בחר חיזוק שיוענק מיידית לכל תלמידי הכיתה</div>
            </div>
          </div>
          <button class="small-btn" data-act="close-all-drawer" style="padding:2px 8px;">✕</button>
        </div>
        <div class="sp-behavior-grid">
          <button class="sp-behavior-btn" data-all-pts="1" data-all-title="הקשבה והשתתפות כיתתית">
            <span style="font-size:1.25rem;">👂</span>
            <span>הקשבה והשתתפות כיתתית</span>
            <span class="sp-pts-tag">+1 💎</span>
          </button>
          <button class="sp-behavior-btn" data-all-pts="2" data-all-title="ביצוע משימה כיתתית">
            <span style="font-size:1.25rem;">📝</span>
            <span>ביצוע משימה כיתתית</span>
            <span class="sp-pts-tag">+2 💎</span>
          </button>
          <button class="sp-behavior-btn" data-all-pts="2" data-all-title="אווירה נעימה ושיתוף פעולה">
            <span style="font-size:1.25rem;">🤝</span>
            <span>אווירה נעימה ושיתוף פעולה</span>
            <span class="sp-pts-tag">+2 💎</span>
          </button>
          <button class="sp-behavior-btn" data-all-pts="3" data-all-title="מאמץ כיתתי מיוחד">
            <span style="font-size:1.25rem;">💎</span>
            <span>מאמץ כיתתי מיוחד</span>
            <span class="sp-pts-tag">+3 💎</span>
          </button>
        </div>
      </div>

      <!-- Icon Picker Drawer -->
      <div data-el="icon-picker-drawer" class="sp-drawer hidden">
        <div class="sp-drawer-header">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:1.3rem;">🎨</span>
            <span data-el="icon-picker-title" style="font-weight:800;font-size:0.95rem;color:var(--text-dark);">בחירת סמל לתלמיד</span>
          </div>
          <div style="display:flex;gap:4px;align-items:center;">
            <button class="small-btn" data-act="random-icon-one" title="הגרל סמל אקראי לתלמיד זה" style="font-size:0.75rem;">🎲 הגרל סמל</button>
            <button class="small-btn" data-act="close-icon-picker" style="padding:2px 8px;">✕</button>
          </div>
        </div>
        <div class="sp-icon-cat-bar" data-el="icon-cat-bar">
          ${ICON_CATEGORIES.map(c => `
            <button class="sp-icon-cat-btn ${c.id === 'animals' ? 'active' : ''}" data-cat="${c.id}">
              <span>${c.icon}</span>
              <span>${c.name}</span>
            </button>
          `).join('')}
        </div>
        <div class="sp-icon-grid" data-el="icon-grid"></div>
      </div>
    </div>
  </div>
  `;

  // Hidden photo file input
  const fileInput = body.querySelector('[data-el="sp-photo-file-input"]');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file || !targetStudentForUpload) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 160;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
        const dataUrl = canvas.toDataURL('image/webp', 0.82);
        studentPhotos[targetStudentForUpload] = dataUrl;
        if (window.AppStore && window.AppStore.setStudentPhotos) {
          window.AppStore.setStudentPhotos(studentPhotos);
        }
        state.studentPhotos = studentPhotos;
        saveState();
        SoundFX.pop();
        fileInput.value = '';
        renderStudentsGrid();
        if (selectedStudentForAward === targetStudentForUpload) {
          drawerAvatar.innerHTML = `<img src="${dataUrl}" class="sp-drawer-img-circle" />`;
          body.querySelector('[data-el="remove-photo-btn"]')?.classList.remove('hidden');
        }
        targetStudentForUpload = null;
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

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
      else {
        renderClassGoalBanner();
        renderStudentsGrid();
      }
    });
  });

  // 1. TEAMS LOGIC
  const teamsContainer = body.querySelector('[data-el="teams-container"]');
  function renderTeamsBoard() {
    renderTeamGoalBanner();
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
        if (step > 0) {
          SoundFX.pop();
          const curG = getCurGoal();
          if (teams[i].score >= (curG.teamTarget || 25)) {
            SoundFX.bell();
          }
        }
        renderTeamsBoard();
      });
    });
  }

  function renderTeamGoalBanner() {
    const banner = body.querySelector('[data-el="team-goal-banner"]');
    if (!banner) return;
    const curGoal = getCurGoal();
    banner.innerHTML = `
      <div class="team-goal-card">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:1.15rem;">🏆</span>
            <span style="font-weight:800;font-size:0.84rem;">יעד קבוצה מנצחת: ${curGoal.teamTarget || 25} נק'</span>
            <span class="team-goal-prize-badge">פרס: ${curGoal.teamPrize || '🏆 גביע השבוע'}</span>
          </div>
          <button class="class-goal-edit-btn" data-act="edit-team-goal" title="עריכת יעד ופרס לקבוצות">✏️ ערוך יעד</button>
        </div>
      </div>
    `;

    banner.querySelector('[data-act="edit-team-goal"]')?.addEventListener('click', () => {
      const newTargetStr = prompt('יעד נקודות לקבוצה מנצחת:', curGoal.teamTarget || 25);
      if (newTargetStr === null) return;
      const newTarget = parseInt(newTargetStr, 10);
      if (isNaN(newTarget) || newTarget <= 0) return;
      const newPrize = prompt('מה הפרס לקבוצה המנצחת?', curGoal.teamPrize || '🏆 גביע השבוע');
      if (newPrize === null) return;
      curGoal.teamTarget = newTarget;
      curGoal.teamPrize = newPrize.trim() || 'גביע';
      classGoals[selectedClassId] = curGoal;
      if (window.AppStore && window.AppStore.setClassGoals) {
        window.AppStore.setClassGoals(classGoals);
      }
      state.classGoals = classGoals;
      saveState();
      renderTeamGoalBanner();
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
  const awardAllDrawer = body.querySelector('[data-el="award-all-drawer"]');
  const drawerTitle = body.querySelector('[data-el="drawer-title"]');
  const drawerAvatar = body.querySelector('[data-el="drawer-avatar"]');
  const iconPickerDrawer = body.querySelector('[data-el="icon-picker-drawer"]');
  const iconPickerTitle = body.querySelector('[data-el="icon-picker-title"]');
  const iconGrid = body.querySelector('[data-el="icon-grid"]');

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

  function renderClassGoalBanner() {
    const banner = body.querySelector('[data-el="class-goal-banner"]');
    if (!banner) return;
    const curGoal = getCurGoal();
    const students = getStudentsList();
    const currentScores = window.AppStore.getStudentScores ? window.AppStore.getStudentScores() : studentScores;
    let sumPoints = 0;
    students.forEach(n => {
      const sc = currentScores[n];
      if (sc) {
        sumPoints += (scoreMode === 'daily' ? sc.daily : sc.total);
      }
    });

    const target = Math.max(1, curGoal.target || 100);
    const percent = Math.min(100, Math.round((sumPoints / target) * 100));
    const isReached = sumPoints >= target;

    banner.innerHTML = `
      <div class="arena-goal-card ${isReached ? 'reached' : ''}">
        <div class="diamond-jar-widget" title="צנצנת היהלומים הכיתתית: ${percent}% מהיעד">
          <div class="diamond-jar-lid"></div>
          <div class="diamond-jar-body">
            <div class="diamond-jar-fill" style="height: ${Math.max(8, percent)}%;">
              <div class="diamond-jar-gems">
                ${percent >= 15 ? '<span>💎</span>' : ''}
                ${percent >= 45 ? '<span>💎</span>' : ''}
                ${percent >= 75 ? '<span>💎</span>' : ''}
              </div>
            </div>
            <div class="diamond-jar-percent">${percent}%</div>
          </div>
        </div>
        <div class="arena-goal-main">
          <div class="class-goal-top">
            <div class="class-goal-title-group">
              <span class="class-goal-icon">${isReached ? '🎉' : '🎯'}</span>
              <span class="class-goal-title">יעד כיתתי:</span>
              <span class="class-goal-prize" title="הפרס שהכיתה תזכה בו">${curGoal.prize || '🍕 מסיבת פיצה כיתתית'}</span>
            </div>
            <button class="class-goal-edit-btn" data-act="edit-class-goal" title="עריכת יעד ופרס">✏️ ערוך יעד</button>
          </div>
          <div class="class-goal-progress-bar arena-lightbar">
            <div class="class-goal-progress-fill" style="width: ${percent}%;"></div>
          </div>
          <div class="class-goal-bottom">
            <span class="class-goal-count">💎 ${sumPoints} / ${target}</span>
            ${isReached ? `<span class="class-goal-badge success">✨ היעד הושג! מגיע לכם הפרס! 🎁</span>` : `<span class="class-goal-badge">עוד ${Math.max(0, target - sumPoints)} 💎 לפרס</span>`}
          </div>
        </div>
      </div>
    `;

    banner.querySelector('[data-act="edit-class-goal"]')?.addEventListener('click', () => {
      const newTargetStr = prompt('כמות יהלומים להשגת היעד הכיתתי:', curGoal.target || 100);
      if (newTargetStr === null) return;
      const newTarget = parseInt(newTargetStr, 10);
      if (isNaN(newTarget) || newTarget <= 0) {
        alert('נא להזין מספר חיובי תקין');
        return;
      }
      const newPrize = prompt('מה הפרס שהכיתה רוצה להשיג? (למשל: 🍕 מסיבת פיצה / 🎬 צפייה בסרט / ⚽ יציאה למגרש):', curGoal.prize || '🍕 מסיבת פיצה כיתתית');
      if (newPrize === null) return;
      curGoal.target = newTarget;
      curGoal.prize = newPrize.trim() || 'פרס כיתתי';
      classGoals[selectedClassId] = curGoal;
      if (window.AppStore && window.AppStore.setClassGoals) {
        window.AppStore.setClassGoals(classGoals);
      }
      state.classGoals = classGoals;
      saveState();
      renderClassGoalBanner();
    });
  }

  function renderStudentsGrid() {
    renderClassGoalBanner();
    const students = getStudentsList();
    const filtered = searchQuery.trim() 
      ? students.filter(n => n.includes(searchQuery.trim())) 
      : students;

    if (filtered.length === 0) {
      studentsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:24px;color:var(--text-muted);font-weight:600;">לא נמצאו תלמידים</div>`;
      return;
    }

    function getHaloTierClass(scoreVal) {
      if (scoreVal >= 10) return 'halo-high';
      if (scoreVal >= 5) return 'halo-mid';
      if (scoreVal >= 1) return 'halo-low';
      return 'halo-none';
    }

    function renderStudentBubbleHtml(name, rank = 0) {
      const sc = getStudentScore(name);
      const scoreVal = scoreMode === 'daily' ? sc.daily : sc.total;
      const icon = getStudentIcon(name);
      const photo = getStudentPhoto(name);
      const iconHtml = renderStudentIconHtml(icon, name);
      const haloClass = getHaloTierClass(scoreVal);
      const rankClass = rank > 0 ? `rank-${rank} is-top-leader` : '';
      const medalMap = { 1: '🥇', 2: '🥈', 3: '🥉' };

      return `
        <div class="sp-student-bubble ${rankClass} ${haloClass}" data-student="${name}">
          ${rank === 1 ? '<div class="arena-live-crown" title="מוביל/ת הכיתה!">👑</div>' : ''}
          ${rank > 0 ? `<div class="arena-rank-medal" title="מקום ${rank}">${medalMap[rank]}</div>` : ''}
          <div class="sp-card-tools-bar">
            <button class="sp-card-tool-btn" data-act="upload-photo" data-student="${name}" title="העלה תמונה מהמחשב">📷</button>
            <button class="sp-card-tool-btn" data-act="pick-icon" data-student="${name}" title="בחר סמל לתלמיד">🎨</button>
          </div>
          <div class="sp-bubble-avatar-wrap">
            <div class="sp-bubble-avatar ${photo ? 'has-custom-photo' : ''}" data-act="open-drawer" data-student="${name}" title="לחץ להענקת יהלומים ל-${name}">
              ${photo ? `<img src="${photo}" alt="${name}" class="sp-bubble-photo-img" />` : iconHtml}
            </div>
            <span class="sp-bubble-badge" title="יהלומים">💎 ${scoreVal}</span>
          </div>
          <div class="sp-bubble-name" title="${name}">${name}</div>
        </div>
      `;
    }

    const isSearching = Boolean(searchQuery.trim());
    let top3Names = [];
    if (!isSearching) {
      top3Names = students
        .map(name => {
          const sc = getStudentScore(name);
          return { name, score: scoreMode === 'daily' ? sc.daily : sc.total };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(item => item.name);
    }

    let html = '';
    if (top3Names.length > 0) {
      // Arrange in podium-like arch: 2nd - 1st - 3rd
      const orderedTop = [];
      if (top3Names[1]) orderedTop.push({ name: top3Names[1], rank: 2 });
      orderedTop.push({ name: top3Names[0], rank: 1 });
      if (top3Names[2]) orderedTop.push({ name: top3Names[2], rank: 3 });

      html += `
        <div class="arena-top3-section">
          <div class="arena-section-pill">⭐ מובילי הכיתה</div>
          <div class="arena-top3-stage">
            ${orderedTop.map(t => renderStudentBubbleHtml(t.name, t.rank)).join('')}
          </div>
        </div>
      `;
    }

    const remainingStudents = isSearching
      ? filtered
      : filtered.filter(n => !top3Names.includes(n));

    if (remainingStudents.length > 0) {
      html += remainingStudents.map(name => renderStudentBubbleHtml(name, 0)).join('');
    }

    studentsGrid.innerHTML = html;

    studentsGrid.querySelectorAll('.sp-student-bubble').forEach(card => {
      card.addEventListener('click', (e) => {
        const sName = card.dataset.student;
        if (e.target.closest('[data-act="upload-photo"]')) {
          e.stopPropagation();
          targetStudentForUpload = sName;
          fileInput.click();
          return;
        }
        if (e.target.closest('[data-act="pick-icon"]')) {
          e.stopPropagation();
          openIconPicker(sName);
          return;
        }
        selectedStudentForAward = sName;
        drawerTitle.textContent = selectedStudentForAward;
        const curPhoto = getStudentPhoto(selectedStudentForAward);
        if (curPhoto) {
          drawerAvatar.innerHTML = `<img src="${curPhoto}" class="sp-drawer-img-circle" />`;
          body.querySelector('[data-el="remove-photo-btn"]')?.classList.remove('hidden');
        } else {
          drawerAvatar.innerHTML = renderStudentIconHtml(getStudentIcon(selectedStudentForAward), selectedStudentForAward);
          body.querySelector('[data-el="remove-photo-btn"]')?.classList.add('hidden');
        }
        iconPickerDrawer.classList.add('hidden');
        awardAllDrawer.classList.add('hidden');
        awardDrawer.classList.remove('hidden');
      });
    });
  }

  // AWARD ALL CLASS
  body.querySelector('[data-act="open-all-drawer"]')?.addEventListener('click', () => {
    awardDrawer.classList.add('hidden');
    iconPickerDrawer.classList.add('hidden');
    awardAllDrawer.classList.remove('hidden');
  });

  body.querySelector('[data-act="close-all-drawer"]')?.addEventListener('click', () => {
    awardAllDrawer.classList.add('hidden');
  });

  awardAllDrawer.querySelectorAll('[data-all-pts]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pts = parseInt(btn.dataset.allPts, 10);
      const title = btn.dataset.allTitle;
      window.AppStore.addDiamondsToAll(pts, title, e.currentTarget);
      SoundFX.bell();
      studentScores = window.AppStore.getStudentScores();
      state.studentScores = studentScores;
      saveState();
      awardAllDrawer.classList.add('hidden');
      renderStudentsGrid();
    });
  });

  // TOGGLE SIDEBAR
  body.querySelector('[data-act="toggle-sidebar-view"]')?.addEventListener('click', () => {
    window.AppStore.toggleStudentsSidebar();
  });

  // ICON PICKER LOGIC
  function openIconPicker(studentName) {
    selectedStudentForIcon = studentName;
    iconPickerTitle.textContent = `בחירת סמל: ${studentName}`;
    awardDrawer.classList.add('hidden');
    awardAllDrawer.classList.add('hidden');
    renderIconGrid();
    iconPickerDrawer.classList.remove('hidden');
  }

  function renderIconGrid() {
    const cat = ICON_CATEGORIES.find(c => c.id === activeIconCategory) || ICON_CATEGORIES[0];
    iconGrid.innerHTML = cat.icons.map(ic => `
      <button class="sp-icon-pick-btn" data-icon="${ic}">${ic}</button>
    `).join('');

    iconGrid.querySelectorAll('.sp-icon-pick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!selectedStudentForIcon) return;
        studentIcons[selectedStudentForIcon] = btn.dataset.icon;
        if (window.AppStore.setStudentIcons) {
          window.AppStore.setStudentIcons(studentIcons);
        }
        state.studentIcons = studentIcons;
        saveState();
        SoundFX.pop();
        iconPickerDrawer.classList.add('hidden');
        selectedStudentForIcon = null;
        renderStudentsGrid();
      });
    });
  }

  // Category tab switching in icon picker
  body.querySelectorAll('.sp-icon-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeIconCategory = btn.dataset.cat;
      body.querySelectorAll('.sp-icon-cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === activeIconCategory));
      renderIconGrid();
    });
  });

  // Randomize icon for single student
  body.querySelector('[data-act="random-icon-one"]').addEventListener('click', () => {
    if (!selectedStudentForIcon) return;
    const randomIcon = ALL_STUDENT_ICONS[Math.floor(Math.random() * ALL_STUDENT_ICONS.length)];
    studentIcons[selectedStudentForIcon] = randomIcon;
    if (window.AppStore.setStudentIcons) {
      window.AppStore.setStudentIcons(studentIcons);
    }
    state.studentIcons = studentIcons;
    saveState();
    SoundFX.pop();
    iconPickerDrawer.classList.add('hidden');
    selectedStudentForIcon = null;
    renderStudentsGrid();
  });

  // Randomize icons for ALL students in class
  body.querySelector('[data-act="randomize-all-icons"]').addEventListener('click', () => {
    const students = getStudentsList();
    if (students.length === 0) return;
    if (confirm('האם להגריל סמלים מגוונים לכל תלמידי הכיתה?')) {
      const shuffled = [...ALL_STUDENT_ICONS].sort(() => 0.5 - Math.random());
      students.forEach((name, i) => {
        studentIcons[name] = shuffled[i % shuffled.length];
      });
      if (window.AppStore.setStudentIcons) {
        window.AppStore.setStudentIcons(studentIcons);
      }
      state.studentIcons = studentIcons;
      saveState();
      SoundFX.pop();
      renderStudentsGrid();
    }
  });

  body.querySelector('[data-act="close-icon-picker"]').addEventListener('click', () => {
    iconPickerDrawer.classList.add('hidden');
    selectedStudentForIcon = null;
  });

  body.querySelector('[data-act="open-icon-from-drawer"]').addEventListener('click', () => {
    if (!selectedStudentForAward) return;
    openIconPicker(selectedStudentForAward);
  });

  // Upload/Remove photo from drawer
  body.querySelector('[data-act="upload-photo-from-drawer"]')?.addEventListener('click', () => {
    if (!selectedStudentForAward) return;
    targetStudentForUpload = selectedStudentForAward;
    fileInput.click();
  });

  body.querySelector('[data-act="remove-photo-from-drawer"]')?.addEventListener('click', () => {
    if (!selectedStudentForAward) return;
    delete studentPhotos[selectedStudentForAward];
    if (window.AppStore && window.AppStore.setStudentPhotos) {
      window.AppStore.setStudentPhotos(studentPhotos);
    }
    state.studentPhotos = studentPhotos;
    saveState();
    SoundFX.pop();
    drawerAvatar.innerHTML = renderStudentIconHtml(getStudentIcon(selectedStudentForAward), selectedStudentForAward);
    body.querySelector('[data-el="remove-photo-btn"]')?.classList.add('hidden');
    renderStudentsGrid();
  });

  // Mode toggle (Daily vs Total)
  body.querySelectorAll('.sp-mode-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      scoreMode = btn.dataset.mode;
      state.scoreMode = scoreMode;
      saveState();
      body.querySelectorAll('.sp-mode-pill').forEach(b => b.classList.toggle('active', b.dataset.mode === scoreMode));
      renderClassGoalBanner();
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
    renderClassGoalBanner();
    renderStudentsGrid();
  });

  body.querySelector('[data-act="close-drawer"]').addEventListener('click', () => {
    awardDrawer.classList.add('hidden');
    selectedStudentForAward = null;
  });

  // Award points clicked
  awardDrawer.querySelectorAll('.sp-behavior-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!selectedStudentForAward) return;
      const bId = btn.dataset.behavior;
      const pts = parseInt(btn.dataset.pts, 10);
      
      window.AppStore.addDiamondsToStudent(selectedStudentForAward, pts, bId, e.currentTarget);
      studentScores = window.AppStore.getStudentScores();
      state.studentScores = studentScores;
      saveState();

      if (pts > 0) {
        SoundFX.bell();
      } else {
        SoundFX.pop();
      }
      awardDrawer.classList.add('hidden');
      renderStudentsGrid();
    });
  });

  // Reset daily points manually
  body.querySelector('[data-act="reset-daily"]').addEventListener('click', () => {
    if (confirm('האם לאפס את היהלומים היומיים של כל התלמידים? (הניקוד המצטבר יישמר)')) {
      Object.values(studentScores).forEach(sc => {
        sc.daily = 0;
      });
      if (window.AppStore.setStudentScores) {
        window.AppStore.setStudentScores(studentScores);
      }
      state.studentScores = studentScores;
      saveState();
      renderStudentsGrid();
    }
  });

  // Grand Celebration Podium
  body.querySelector('[data-act="open-podium"]').addEventListener('click', () => {
    const students = getStudentsList();
    if (students.length === 0) return;

    const sorted = [...students].map(name => {
      const sc = getStudentScore(name);
      return { 
        name, 
        score: sc.daily, 
        total: sc.total, 
        breakdown: sc.breakdown || {}, 
        icon: getStudentIcon(name),
        photo: getStudentPhoto(name)
      };
    }).sort((a, b) => b.score - a.score);

    const top1 = sorted[0] && sorted[0].score > 0 ? sorted[0] : null;
    const top2 = sorted[1] && sorted[1].score > 0 ? sorted[1] : null;
    const top3 = sorted[2] && sorted[2].score > 0 ? sorted[2] : null;

    if (!top1) {
      alert('עדיין לא נצברו יהלומים היום. הענק יהלומים לתלמידים ולאחר מכן לחץ על מצעד אלופי היהלומים!');
      return;
    }

    // Check top category achievers
    const helpLeader = [...students].map(n => ({ name: n, cnt: (studentScores[n]?.breakdown?.help || 0) })).sort((a,b)=>b.cnt-a.cnt)[0];
    const readyLeader = [...students].map(n => ({ name: n, cnt: (studentScores[n]?.breakdown?.ready || 0) })).sort((a,b)=>b.cnt-a.cnt)[0];

    let catLeadersText = '';
    if (helpLeader && helpLeader.cnt > 0) {
      catLeadersText += `🤝 <b>אלופ/ת העזרה:</b> ${helpLeader.name} (${helpLeader.cnt} פעמים) &nbsp;•&nbsp; `;
    }
    if (readyLeader && readyLeader.cnt > 0) {
      catLeadersText += `🎒 <b>אלופ/ת המוכנות:</b> ${readyLeader.name} (${readyLeader.cnt} פעמים)`;
    }

    // Open Grand Fullscreen Podium with classroom background & confetti
    openGrandPodium(top1, top2, top3, catLeadersText);
  });

  // Escape key support for full-screen points arena
  const escHandler = (e) => {
    if (e.key !== 'Escape') return;
    if (!document.body.contains(body)) {
      document.removeEventListener('keydown', escHandler);
      return;
    }
    if (document.getElementById('grand-podium-fullscreen')) return;
    if (!awardDrawer.classList.contains('hidden')) {
      awardDrawer.classList.add('hidden');
      return;
    }
    if (!awardAllDrawer.classList.contains('hidden')) {
      awardAllDrawer.classList.add('hidden');
      return;
    }
    if (!iconPickerDrawer.classList.contains('hidden')) {
      iconPickerDrawer.classList.add('hidden');
      return;
    }
    const win = body.closest('.widget-window[data-type="student-points"]');
    if (win) {
      document.removeEventListener('keydown', escHandler);
      win.querySelector('[data-wact="close"]')?.click();
    }
  };
  document.addEventListener('keydown', escHandler);

  // Init
  populateClassSelect();
  if (activeTab === 'teams') renderTeamsBoard();
  else {
    renderClassGoalBanner();
    renderStudentsGrid();
  }
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
ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
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
defaultW: 200,
defaultH: 350,
render(body, state, saveState) {
let activeLight = state.activeLight ?? 'green';
const labels = {
red: '🛑 עצור! הקשבה למורה',
yellow: '⚠️ התארגנות / שיח שקט',
green: '✅ עבודה פעילה בכיתה'
};
body.innerHTML = `
<div class="frameless-tool-wrapper">
  <div class="tool-hud-strip">
    <button class="tool-hud-btn" data-wdrag title="גרור להזזת הרמזור">✋</button>
    <button class="tool-hud-btn close-hud" data-wclose title="סגור רמזור">✕</button>
  </div>
  <div class="traffic-light-casing" data-wdrag>
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
bulb.addEventListener('click', (e) => {
e.stopPropagation();
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
defaultW: 250,
defaultH: 260,
render(body, state, saveState) {
const modes = {
silence: { icon: '🤫', title: 'דממה מוחלטת', sub: 'עובדים לבד בשקט מוחלט' },
whisper: { icon: '🔉', title: 'עבודה בלחישה', sub: 'מותר לדבר בקול נמוך' },
neighbor: { icon: '💬', title: 'שאל חבר קרוב', sub: 'התייעצות עם השכן' },
together: { icon: '👥', title: 'עבודה בקבוצות', sub: 'שיתוף פעולה קבוצתי' }
};
let current = state.mode ?? 'silence';

body.innerHTML = `
<div class="frameless-tool-wrapper">
  <div class="tool-hud-strip">
    <button class="tool-hud-btn" data-wdrag title="גרור להזזת הסמל">✋</button>
    <button class="tool-hud-btn close-hud" data-wclose title="סגור סמל">✕</button>
  </div>
  <div class="frameless-work-symbol-card" data-act="cycle" title="לחץ להחלפת סמל עבודה">
    <div class="ws-big-icon" data-el="icon"></div>
    <div class="ws-big-title" data-el="title"></div>
    <div class="ws-big-sub" data-el="sub"></div>
  </div>
  <div class="frameless-ws-pills">
    ${Object.entries(modes).map(([k, v]) => `
      <button class="ws-mini-pill ${k === current ? 'active' : ''}" data-mode="${k}" title="${v.title}">${v.icon}</button>
    `).join('')}
  </div>
</div>
`;

function updateView() {
  const m = modes[current] || modes.silence;
  body.querySelector('[data-el="icon"]').textContent = m.icon;
  body.querySelector('[data-el="title"]').textContent = m.title;
  body.querySelector('[data-el="sub"]').textContent = m.sub;
  body.querySelectorAll('.ws-mini-pill').forEach(b => b.classList.toggle('active', b.dataset.mode === current));
}

body.querySelector('[data-act="cycle"]').addEventListener('click', () => {
  const keys = Object.keys(modes);
  const nextIdx = (keys.indexOf(current) + 1) % keys.length;
  current = keys[nextIdx];
  state.mode = current;
  saveState();
  SoundFX.pop();
  updateView();
});

body.querySelectorAll('.ws-mini-pill').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
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
title: 'גלגל המזל',
icon: '🎡',
defaultW: 420,
defaultH: 420,
render(body, state, saveState) {
let mode = state.mode ?? 'wheel';
let selectedClassId = state.classId ?? window.AppStore.getSelectedClassId();
let excludedNames = new Set(state.excluded || []);
let includedStudents = state.included ? new Set(state.included) : null;
let spinning = false;
let wheelAngle = 0;
let showSettings = false;

body.innerHTML = `
<div class="frameless-wheel-wrapper">
  <!-- Floating Action Buttons Strip (HUD) -->
  <div class="wheel-hud-strip">
    <button class="wheel-hud-btn" data-wdrag title="גרור להזזת הגלגל">✋</button>
    <button class="wheel-hud-btn" data-act="toggle-settings" title="הגדרות וסימון משתתפים">⚙️</button>
    <button class="wheel-hud-btn close-hud" data-wclose title="סגור גלגל">✕</button>
  </div>

  <!-- The Wheel Arena -->
  <div class="wheel-stage" data-act="stage-click">
    <!-- Top Pointer Arrow -->
    <div class="wheel-pointer-arrow"></div>

    <!-- Large High-Res Canvas -->
    <canvas data-el="wheel-canvas" width="340" height="340" class="wheel-canvas-large"></canvas>

    <!-- Center SPIN Button Hub -->
    <button class="wheel-center-hub" data-act="spin-hub" title="לחץ לסיבוב הגלגל!">
      <span class="hub-icon">🎲</span>
      <span class="hub-text">סובב!</span>
    </button>
  </div>

  <!-- Floating Winner Celebration Card -->
  <div data-el="winner-overlay" class="wheel-winner-overlay hidden">
    <div class="winner-trophy-badge">🏆 הזוכה בהגרלה!</div>
    <div data-el="winner-name-display" class="winner-name-text"></div>
    <div class="winner-btns-row">
      <button class="small-btn primary-btn" data-act="spin-again">סובב שוב 🎲</button>
      <button class="small-btn" data-act="close-winner">✕ סגור</button>
    </div>
  </div>

  <!-- Floating Settings Panel (Frosted Glass Popover) -->
  <div data-el="settings-popover" class="wheel-settings-popover hidden">
    <div class="settings-popover-header">
      <div style="display:flex;align-items:center;gap:6px;">
        <span>⚙️</span>
        <span style="font-weight:800;font-size:0.85rem;">הגדרות גלגל המזל</span>
      </div>
      <button class="mini-icon-btn" data-act="close-settings">✕</button>
    </div>

    <div style="display:flex;flex-direction:column;gap:3px;">
      <label style="font-size:0.75rem;font-weight:700;color:var(--text-muted);">בחירת כיתה:</label>
      <select data-el="class-select" class="sidebar-class-sel"></select>
    </div>

    <!-- Mode Selector -->
    <div class="randomizer-tabs" style="margin:4px 0;">
      <button class="rand-tab ${mode === 'wheel' ? 'active' : ''}" data-mode="wheel">🎡 גלגל מזל</button>
      <button class="rand-tab ${mode === 'card' ? 'active' : ''}" data-mode="card">🎴 כרטיס</button>
    </div>

    <!-- Roster Checklist -->
    <div class="settings-roster-section">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:4px;margin-bottom:4px;">
        <span style="font-size:0.76rem;font-weight:800;">תלמידים משתתפים (<span data-el="roster-count">0</span>)</span>
        <div style="display:flex;gap:3px;">
          <button class="mini-icon-btn" data-act="select-all" style="font-size:0.68rem;">סמן הכל</button>
          <button class="mini-icon-btn" data-act="deselect-all" style="font-size:0.68rem;">נקה</button>
        </div>
      </div>
      <div class="rand-students-checklist" data-el="students-checklist"></div>
    </div>

    <!-- Settings options -->
    <div style="display:flex;flex-direction:column;gap:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.3);">
      <label style="font-size:0.75rem;display:flex;align-items:center;gap:6px;cursor:pointer;font-weight:600;">
        <input type="checkbox" data-el="no-repeat" ${state.noRepeat ? 'checked' : ''} />
        <span>ללא חזרה (הוצא זוכה מהסבב)</span>
      </label>
      <button class="secondary-btn" data-act="reset-pool" style="font-size:0.72rem;padding:4px 8px;">
        איפוס סבב הגרלה (<span data-el="excluded-count">0</span>)
      </button>
    </div>
  </div>

  <!-- Card Mode Fallback Overlay if user switches to card mode -->
  <div data-el="card-view" class="wheel-card-mode-overlay ${mode === 'card' ? '' : 'hidden'}">
    <div style="font-size:0.9rem;font-weight:700;color:var(--text-muted);">התלמיד/ה שנבחר/ה:</div>
    <div class="winner-name" data-el="card-winner" style="font-size:1.8rem;font-weight:900;color:#4f46e5;margin:12px 0;">לחץ להגרלה!</div>
    <button class="primary-btn" data-act="card-spin-btn" style="padding:8px 24px;border-radius:999px;">🎲 הגרל!</button>
  </div>
</div>
`;

const selectEl = body.querySelector('[data-el="class-select"]');
const wheelCanvas = body.querySelector('[data-el="wheel-canvas"]');
const wCtx = wheelCanvas.getContext('2d');
const winnerOverlay = body.querySelector('[data-el="winner-overlay"]');
const winnerNameDisplay = body.querySelector('[data-el="winner-name-display"]');
const cardWinnerEl = body.querySelector('[data-el="card-winner"]');
const noRepeatCb = body.querySelector('[data-el="no-repeat"]');
const rosterCountEl = body.querySelector('[data-el="roster-count"]');
const excludedCountEl = body.querySelector('[data-el="excluded-count"]');
const settingsPopover = body.querySelector('[data-el="settings-popover"]');
const checklistEl = body.querySelector('[data-el="students-checklist"]');
const cardView = body.querySelector('[data-el="card-view"]');

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

const palette = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#14b8a6', '#f97316', '#3b82f6', '#ef4444', '#84cc16'];

function drawWheel() {
  const names = getActiveStudents();
  const dpr = window.devicePixelRatio || 2;
  const size = 340;
  wheelCanvas.width = size * dpr;
  wheelCanvas.height = size * dpr;
  wheelCanvas.style.width = `${size}px`;
  wheelCanvas.style.height = `${size}px`;

  wCtx.save();
  wCtx.scale(dpr, dpr);
  wCtx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 12;

  if (names.length === 0) {
    wCtx.beginPath();
    wCtx.arc(cx, cy, r, 0, Math.PI * 2);
    wCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    wCtx.fill();
    wCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    wCtx.lineWidth = 3;
    wCtx.stroke();
    wCtx.fillStyle = '#0f172a';
    wCtx.font = 'bold 14px Heebo, sans-serif';
    wCtx.textAlign = 'center';
    wCtx.fillText('אין תלמידים מסומנים', cx, cy);
    wCtx.restore();
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
    wCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    wCtx.lineWidth = 2;
    wCtx.stroke();

    // Text along slice
    wCtx.save();
    wCtx.translate(cx, cy);
    wCtx.rotate(start + arc / 2);
    wCtx.textAlign = 'right';
    wCtx.fillStyle = '#ffffff';
    wCtx.font = 'bold 13px Heebo, sans-serif';
    wCtx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    wCtx.shadowBlur = 3;
    wCtx.fillText(name.slice(0, 14), r - 16, 5);
    wCtx.restore();
  });

  // Outer Decorative Ring
  wCtx.beginPath();
  wCtx.arc(cx, cy, r, 0, Math.PI * 2);
  wCtx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
  wCtx.lineWidth = 5;
  wCtx.stroke();

  // Outer Studs
  const studCount = Math.min(24, Math.max(12, names.length * 2));
  for (let s = 0; s < studCount; s++) {
    const a = s * (Math.PI * 2 / studCount);
    const sx = cx + (r + 1) * Math.cos(a);
    const sy = cy + (r + 1) * Math.sin(a);
    wCtx.beginPath();
    wCtx.arc(sx, sy, 2.5, 0, Math.PI * 2);
    wCtx.fillStyle = '#ffffff';
    wCtx.fill();
  }

  wCtx.restore();
}

function startSpin() {
  if (spinning) return;
  const names = getActiveStudents();
  if (!names.length) {
    showSettings = true;
    settingsPopover.classList.remove('hidden');
    alert('יש לסמן לפחות תלמיד אחד להגרלה ברשימת המשתתפים!');
    return;
  }
  winnerOverlay.classList.add('hidden');
  spinning = true;

  if (mode === 'wheel') {
    const spinDuration = 2400;
    const startAngle = wheelAngle;
    const extraSpins = (Math.PI * 2) * (5 + Math.random() * 3);
    const startTime = performance.now();
    let lastTickSlice = -1;

    function animate(now) {
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
        requestAnimationFrame(animate);
      } else {
        spinning = false;
        // Pointer is at top: 3 * Math.PI / 2
        const normalized = (3 * Math.PI / 2 - (wheelAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const idx = Math.floor(normalized / arc) % names.length;
        const winner = names[idx];
        
        winnerNameDisplay.textContent = winner;
        winnerOverlay.classList.remove('hidden');
        SoundFX.fanfare();

        if (noRepeatCb.checked) {
          excludedNames.add(winner);
          state.excluded = Array.from(excludedNames);
          excludedCountEl.textContent = excludedNames.size;
          saveState();
        }
      }
    }
    requestAnimationFrame(animate);
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
}

// Bind Spin Triggers
body.querySelector('[data-act="spin-hub"]').addEventListener('click', (e) => {
  e.stopPropagation();
  startSpin();
});

body.querySelector('[data-act="stage-click"]').addEventListener('click', (e) => {
  if (e.target.closest('.wheel-hud-strip, .wheel-winner-overlay, .wheel-settings-popover, .wheel-center-hub')) return;
  startSpin();
});

body.querySelector('[data-act="spin-again"]').addEventListener('click', () => {
  winnerOverlay.classList.add('hidden');
  startSpin();
});

body.querySelector('[data-act="close-winner"]').addEventListener('click', () => {
  winnerOverlay.classList.add('hidden');
});

body.querySelector('[data-act="card-spin-btn"]')?.addEventListener('click', () => {
  startSpin();
});

// Settings & HUD triggers
body.querySelector('[data-act="toggle-settings"]').addEventListener('click', () => {
  showSettings = !showSettings;
  settingsPopover.classList.toggle('hidden', !showSettings);
});

body.querySelector('[data-act="close-settings"]').addEventListener('click', () => {
  showSettings = false;
  settingsPopover.classList.add('hidden');
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

body.querySelectorAll('.rand-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    mode = tab.dataset.mode;
    state.mode = mode;
    saveState();
    body.querySelectorAll('.rand-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
    cardView.classList.toggle('hidden', mode !== 'card');
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
  winnerOverlay.classList.add('hidden');
  cardWinnerEl.textContent = 'לחץ להגרלה!';
  drawWheel();
});

populateClasses();
drawWheel();
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
defaultW: 280,
defaultH: 220,
render(body, state, saveState) {
let diceCount = state.diceCount ?? 2;
let values = state.values ?? [4, 6];
const diceFaces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

body.innerHTML = `
<div class="frameless-tool-wrapper">
  <div class="tool-hud-strip">
    <button class="tool-hud-btn" data-wdrag title="גרור להזזת הקוביות">✋</button>
    <button class="tool-hud-btn" data-act="toggle-dice-count" title="שנה מספר קוביות (1-3)">🎲 ${diceCount}</button>
    <button class="tool-hud-btn close-hud" data-wclose title="סגור קוביות">✕</button>
  </div>
  <div class="frameless-dice-stage" data-act="roll" title="לחץ על הקוביות להטלה!">
    <div class="dice-stage" data-el="stage"></div>
    <div class="dice-sum-pill" data-el="sum"></div>
  </div>
</div>
`;
const stage = body.querySelector('[data-el="stage"]');
const sumEl = body.querySelector('[data-el="sum"]');
const countBtn = body.querySelector('[data-act="toggle-dice-count"]');

function renderDice(rolling = false) {
  stage.innerHTML = values.map(v => `
    <div class="die-cube ${rolling ? 'rolling' : ''}" title="${v}">${diceFaces[v] || v}</div>
  `).join('');
  const total = values.reduce((a, b) => a + b, 0);
  sumEl.textContent = `סך הכל: ${total}`;
}

function roll() {
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

body.querySelector('[data-act="roll"]').addEventListener('click', roll);
countBtn.addEventListener('click', () => {
  diceCount = (diceCount % 3) + 1;
  state.diceCount = diceCount;
  countBtn.textContent = `🎲 ${diceCount}`;
  roll();
});

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
    title: 'יהלומים - ניקוד אישי',
    icon: '💎',
    defaultW: 510,
    defaultH: 540,
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
title: 'מערכת שעות שבועית (הגדרה ועריכה)',
icon: '📋',
defaultW: 420,
defaultH: 440,
render(body, state, saveState) {
const DAY_NAMES = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];
const todayDayIdx = Math.min(5, Math.max(0, new Date().getDay()));
let selectedDay = state.selectedDay ?? todayDayIdx;
let weekly = (window.AppStore.getWeeklySchedule ? window.AppStore.getWeeklySchedule() : state.weeklySchedule) || JSON.parse(JSON.stringify(DEFAULT_WEEKLY_SCHEDULE));

body.innerHTML = `
<div class="tt-wrapper">
  <div style="background:rgba(2,132,199,0.08);border:1px solid rgba(2,132,199,0.2);padding:6px 10px;border-radius:10px;font-size:0.78rem;color:#0369a1;display:flex;align-items:center;gap:6px;">
    <span>📋</span>
    <span><b>הגדרת מערכת שבועית:</b> השיעורים שתוסיף כאן יסונכרנו אוטומטית לווידג'ט <b>'סדר יום'</b>.</span>
  </div>
  <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:6px;">
    <div class="tt-day-tabs" data-el="day-tabs"></div>
    <button class="small-btn" data-act="jump-today" style="font-size:0.74rem;padding:2px 8px;">היום</button>
  </div>
  <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px;font-size:0.82rem;">
    <span data-el="day-heading" style="font-weight:800;color:var(--text-dark);"></span>
    <span style="font-size:0.75rem;color:var(--text-muted);">עריכה ישירה של שיעורי היום</span>
  </div>
  <div class="timetable-list" data-el="list"></div>
  <div style="display:flex;gap:6px;margin-top:auto;padding-top:4px;">
    <button class="small-btn" data-act="add-period" style="flex:1;background:#0284c7;color:#fff;font-weight:700;">+ הוסף שיעור ליום ${DAY_NAMES[selectedDay]}</button>
    <button class="small-btn" data-act="reset-day" style="font-size:0.75rem;">↺ שחזר ברירת מחדל</button>
  </div>
</div>
`;

const tabsContainer = body.querySelector('[data-el="day-tabs"]');
const dayHeadingEl = body.querySelector('[data-el="day-heading"]');
const listEl = body.querySelector('[data-el="list"]');
const addPeriodBtn = body.querySelector('[data-act="add-period"]');

function saveSchedule() {
  state.weeklySchedule = weekly;
  saveState();
  if (window.AppStore.setWeeklySchedule) {
    window.AppStore.setWeeklySchedule(weekly);
  }
}

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
      addPeriodBtn.textContent = `+ הוסף שיעור ליום ${DAY_NAMES[selectedDay]}`;
      renderDayTabs();
      renderSchedule();
    });
  });
}

function renderSchedule() {
  const isToday = selectedDay === todayDayIdx;
  dayHeadingEl.textContent = `עריכת יום ${DAY_NAMES[selectedDay]} ${isToday ? '• (היום)' : ''}`;
  const currentList = weekly[selectedDay] || [];

  if (currentList.length === 0) {
    listEl.innerHTML = `<div style="text-align:center;padding:24px;color:var(--text-muted);font-weight:600;">אין שיעורים מוגדרים ליום זה.<br>לחץ על 'הוסף שיעור' למטה כדי להתחיל!</div>`;
    return;
  }

  listEl.innerHTML = currentList.map((item, i) => `
    <div class="tt-card" style="padding:6px 8px;display:flex;align-items:center;gap:6px;">
      <input type="text" data-edit-num="${i}" value="${item.num || (i + 1)}" style="width:34px;text-align:center;font-weight:800;border:1px solid #cbd5e1;border-radius:6px;padding:3px;" title="מס' שיעור" />
      <input type="text" data-edit-time="${i}" value="${item.time || ''}" style="width:52px;text-align:center;font-size:0.8rem;border:1px solid #cbd5e1;border-radius:6px;padding:3px;direction:ltr;" title="שעה" />
      <input type="text" data-edit-sub="${i}" value="${item.subject || ''}" placeholder="מקצוע/נושא" style="flex:1;font-weight:700;border:1px solid #cbd5e1;border-radius:6px;padding:3px 6px;" />
      <input type="text" data-edit-teacher="${i}" value="${item.teacher || ''}" placeholder="מורה" style="width:65px;font-size:0.8rem;border:1px solid #cbd5e1;border-radius:6px;padding:3px 6px;" />
      <button data-del="${i}" style="border:none;background:transparent;cursor:pointer;color:#ef4444;font-size:1rem;padding:0 4px;" title="מחק שיעור">✕</button>
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
}

body.querySelector('[data-act="jump-today"]').addEventListener('click', () => {
  selectedDay = todayDayIdx;
  state.selectedDay = selectedDay;
  saveState();
  addPeriodBtn.textContent = `+ הוסף שיעור ליום ${DAY_NAMES[selectedDay]}`;
  renderDayTabs();
  renderSchedule();
});

addPeriodBtn.addEventListener('click', () => {
  const currentList = weekly[selectedDay] || [];
  currentList.push({
    num: String(currentList.length + 1),
    time: '12:45',
    subject: 'שיעור חדש',
    teacher: '',
    topic: '',
    done: false
  });
  weekly[selectedDay] = currentList;
  saveSchedule();
  renderSchedule();
});

body.querySelector('[data-act="reset-day"]').addEventListener('click', () => {
  if (confirm(`האם לשחזר את מערכת יום ${DAY_NAMES[selectedDay]} לברירת המחדל המקורית?`)) {
    weekly[selectedDay] = JSON.parse(JSON.stringify(DEFAULT_WEEKLY_SCHEDULE[selectedDay] || []));
    saveSchedule();
    renderSchedule();
  }
});

renderDayTabs();
renderSchedule();
}
},
'daily-agenda': {
title: 'סדר יום כיתתי',
icon: '📅',
defaultW: 420,
defaultH: 460,
render(body, state, saveState) {
  const DAY_NAMES = ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי'];
  const rawDay = new Date().getDay();
  const todayDayIdx = rawDay === 6 ? 0 : Math.min(5, Math.max(0, rawDay));

  let viewMode = state.viewMode || 'current'; // 'current' | 'all'
  let focusedPeriodIdx = state.focusedPeriodIdx ?? null;
  let customTopics = state.customTopics ?? {}; // { [day]: { [periodIdx]: topicString } }
  let doneState = state.doneState ?? {}; // { [day]: { [periodIdx]: boolean } }

  function getMasterSchedule() {
    const fromStore = window.AppStore.getWeeklySchedule ? window.AppStore.getWeeklySchedule() : null;
    return fromStore || DEFAULT_WEEKLY_SCHEDULE;
  }

  function parseTimeInMinutes(timeStr) {
    if (!timeStr) return null;
    const parts = timeStr.trim().split(':');
    if (parts.length < 2) return null;
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    if (isNaN(h) || isNaN(m)) return null;
    return h * 60 + m;
  }

  function calculateAutoCurrentIndex(list) {
    if (!list || list.length === 0) return 0;
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < list.length; i++) {
      const curMin = parseTimeInMinutes(list[i].time);
      if (curMin === null) continue;
      const nextMin = (i < list.length - 1) ? parseTimeInMinutes(list[i + 1].time) : (curMin + 45);
      if (nextMin !== null && nowMin >= curMin && nowMin < nextMin) {
        return i;
      }
    }
    const firstMin = parseTimeInMinutes(list[0].time);
    if (firstMin !== null && nowMin < firstMin) return 0;
    const firstUncompleted = list.findIndex((_, idx) => !(doneState[todayDayIdx] && doneState[todayDayIdx][idx]));
    return firstUncompleted !== -1 ? firstUncompleted : 0;
  }

  function render() {
    const weekly = getMasterSchedule();
    const currentList = weekly[todayDayIdx] || [];
    if (!customTopics[todayDayIdx]) customTopics[todayDayIdx] = {};
    if (!doneState[todayDayIdx]) doneState[todayDayIdx] = {};

    const autoCurrentIdx = calculateAutoCurrentIndex(currentList);
    let activeIdx = (focusedPeriodIdx !== null && focusedPeriodIdx >= 0 && focusedPeriodIdx < currentList.length)
      ? focusedPeriodIdx
      : autoCurrentIdx;

    body.innerHTML = `
      <div class="agenda-container">
        <!-- Top Controls Bar -->
        <div class="agenda-top-bar">
          <div class="agenda-day-badge">
            <span class="agenda-calendar-icon">📅</span>
            <span class="agenda-day-title">${DAY_NAMES[todayDayIdx]} (היום)</span>
          </div>
          <div class="agenda-mode-toggle">
            <button class="agenda-mode-btn ${viewMode === 'current' ? 'active' : ''}" data-mode="current">
              🎯 שיעור עכשיו
            </button>
            <button class="agenda-mode-btn ${viewMode === 'all' ? 'active' : ''}" data-mode="all">
              📋 כל היום (${currentList.length})
            </button>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="agenda-content-area">
          ${currentList.length === 0 ? `
            <div class="agenda-empty-state">
              <div style="font-size:2rem;margin-bottom:6px;">📚</div>
              <div style="font-weight:700;font-size:0.95rem;">אין שיעורים מוגדרים להיום במערכת השבועית</div>
              <div style="font-size:0.8rem;color:var(--text-muted);margin-top:4px;">
                פתח את כלי 'מערכת שעות שבועית' כדי להזין את מערכת השעות של הכיתה
              </div>
            </div>
          ` : (viewMode === 'current' ? renderCurrentLessonView(currentList, activeIdx, autoCurrentIdx) : renderAllLessonsView(currentList, autoCurrentIdx))}
        </div>
      </div>
    `;

    // Event handlers for mode toggle
    body.querySelectorAll('.agenda-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        viewMode = btn.dataset.mode;
        state.viewMode = viewMode;
        saveState();
        render();
      });
    });

    if (viewMode === 'current') {
      bindCurrentLessonEvents(currentList, activeIdx);
    } else {
      bindAllLessonsEvents(currentList);
    }
  }

  function renderCurrentLessonView(list, activeIdx, autoCurrentIdx) {
    const item = list[activeIdx] || list[0];
    const isDone = doneState[todayDayIdx][activeIdx] ?? item.done;
    const topic = customTopics[todayDayIdx][activeIdx] ?? item.topic ?? '';
    const nextItem = list[activeIdx + 1];
    const isAutoActive = activeIdx === autoCurrentIdx;

    return `
      <div class="agenda-spotlight-card ${isDone ? 'is-completed' : ''}">
        <!-- Spotlight Header: Nav & Period Info -->
        <div class="spotlight-header-row">
          <div style="display:flex;align-items:center;gap:6px;">
            <span class="spotlight-num-badge">${item.num ? `שיעור ${item.num}` : `שיעור ${activeIdx + 1}`}</span>
            <span class="spotlight-time-badge">⏱️ ${item.time || 'שעה לא נקבעה'}</span>
            ${isAutoActive ? `<span class="spotlight-live-pill"><span class="live-pulse-dot"></span>שיעור פעיל כעת</span>` : ''}
          </div>
          <div class="spotlight-nav-actions">
            <button class="spotlight-nav-btn" data-act="prev" ${activeIdx <= 0 ? 'disabled' : ''} title="שיעור קודם">▶</button>
            <select class="spotlight-period-select" title="קפוץ לשיעור">
              ${list.map((it, idx) => `
                <option value="${idx}" ${idx === activeIdx ? 'selected' : ''}>
                  ${it.num ? `${it.num}.` : `${idx + 1}.`} ${it.subject || 'שיעור'} (${it.time || ''})
                </option>
              `).join('')}
            </select>
            <button class="spotlight-nav-btn" data-act="next" ${activeIdx >= list.length - 1 ? 'disabled' : ''} title="שיעור הבא">◀</button>
          </div>
        </div>

        <!-- Spotlight Subject & Teacher -->
        <div class="spotlight-main-info">
          <div class="spotlight-subject-title">${item.subject || 'שיעור ללא שם'}</div>
          ${item.teacher ? `<div class="spotlight-teacher-pill">👨‍🏫 מורה: <strong>${item.teacher}</strong></div>` : ''}
        </div>

        <!-- Spotlight Topic Section (Inline Editable) -->
        <div class="spotlight-topic-box">
          <div class="spotlight-topic-header">
            <span>✍️ מה נלמד בשיעור זה:</span>
            <span class="spotlight-save-hint">נשמר אוטומטית</span>
          </div>
          <input type="text" class="spotlight-topic-field" data-idx="${activeIdx}" 
            placeholder="לדוגמה: כפל שלם בשבר, עמודים 34-36..." value="${topic}" />
        </div>

        <!-- Spotlight Completion & Next Up -->
        <div class="spotlight-footer-row">
          <button class="spotlight-done-toggle-btn ${isDone ? 'checked' : ''}" data-act="toggle-done" data-idx="${activeIdx}">
            ${isDone ? '✓ שיעור זה הסתיים (לחץ לביטול)' : '○ סמן שיעור זה כהסתיים'}
          </button>
          <div class="spotlight-next-lesson-teaser">
            ${nextItem ? `
              <span>הבא בתור: <strong>${nextItem.num ? `${nextItem.num}.` : ''} ${nextItem.subject}</strong> (${nextItem.time || ''})</span>
            ` : `
              <span>🎉 סוף יום הלימודים</span>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function renderAllLessonsView(list, autoCurrentIdx) {
    return `
      <div class="agenda-all-list">
        ${list.map((item, i) => {
          const isDone = doneState[todayDayIdx][i] ?? item.done;
          const topic = customTopics[todayDayIdx][i] ?? item.topic ?? '';
          const isAutoActive = i === autoCurrentIdx;
          return `
            <div class="agenda-item-card ${isDone ? 'done' : ''} ${isAutoActive ? 'is-current-active' : ''}">
              <div class="agenda-card-top-row">
                <div style="display:flex;align-items:center;gap:7px;">
                  <input type="checkbox" class="agenda-checkbox" data-idx="${i}" ${isDone ? 'checked' : ''} title="סמן שיעור שהסתיים" />
                  <span class="tt-period-badge">${item.num || (i + 1)}</span>
                  <span class="tt-time-badge">${item.time || ''}</span>
                  <span class="tt-subject-title">${item.subject || ''}</span>
                  ${item.teacher ? `<span class="tt-teacher-tag">${item.teacher}</span>` : ''}
                  ${isAutoActive ? `<span class="agenda-mini-now">עכשיו ⏱️</span>` : ''}
                </div>
                <button class="agenda-focus-btn" data-focus="${i}" title="הצג שיעור זה בלבד במסך">
                  🎯 התמקד
                </button>
              </div>
              <div class="agenda-topic-row">
                <span class="agenda-topic-label">מה נלמד:</span>
                <input type="text" class="agenda-topic-input" data-topic-idx="${i}" 
                  placeholder="הוסף נושא לשיעור (לדוגמה: כפל שלם בשבר)..." value="${topic}" />
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function bindCurrentLessonEvents(list, activeIdx) {
    body.querySelector('[data-act="prev"]')?.addEventListener('click', () => {
      if (activeIdx > 0) {
        focusedPeriodIdx = activeIdx - 1;
        state.focusedPeriodIdx = focusedPeriodIdx;
        saveState();
        render();
      }
    });

    body.querySelector('[data-act="next"]')?.addEventListener('click', () => {
      if (activeIdx < list.length - 1) {
        focusedPeriodIdx = activeIdx + 1;
        state.focusedPeriodIdx = focusedPeriodIdx;
        saveState();
        render();
      }
    });

    body.querySelector('.spotlight-period-select')?.addEventListener('change', (e) => {
      focusedPeriodIdx = parseInt(e.target.value, 10);
      state.focusedPeriodIdx = focusedPeriodIdx;
      saveState();
      render();
    });

    body.querySelector('.spotlight-topic-field')?.addEventListener('input', (e) => {
      const val = e.target.value;
      customTopics[todayDayIdx][activeIdx] = val;
      state.customTopics = customTopics;
      saveState();
    });

    body.querySelector('[data-act="toggle-done"]')?.addEventListener('click', () => {
      const cur = !(doneState[todayDayIdx][activeIdx] ?? list[activeIdx].done);
      doneState[todayDayIdx][activeIdx] = cur;
      state.doneState = doneState;
      saveState();
      SoundFX.pop();
      render();
    });
  }

  function bindAllLessonsEvents(list) {
    body.querySelectorAll('.agenda-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const idx = cb.dataset.idx;
        doneState[todayDayIdx][idx] = cb.checked;
        state.doneState = doneState;
        saveState();
        cb.closest('.agenda-item-card').classList.toggle('done', cb.checked);
        if (cb.checked) SoundFX.pop();
      });
    });

    body.querySelectorAll('.agenda-topic-input').forEach(inp => {
      inp.addEventListener('input', () => {
        const idx = inp.dataset.topicIdx;
        customTopics[todayDayIdx][idx] = inp.value;
        state.customTopics = customTopics;
        saveState();
      });
    });

    body.querySelectorAll('[data-focus]').forEach(btn => {
      btn.addEventListener('click', () => {
        focusedPeriodIdx = parseInt(btn.dataset.focus, 10);
        viewMode = 'current';
        state.viewMode = viewMode;
        state.focusedPeriodIdx = focusedPeriodIdx;
        saveState();
        render();
      });
    });
  }

  render();

  const updateHandler = () => {
    render();
  };
  window.addEventListener('cs:schedule-updated', updateHandler);
  return () => {
    window.removeEventListener('cs:schedule-updated', updateHandler);
  };
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
},
'duty-roster': {
title: 'תורנים כיתתיים',
icon: '🌟',
defaultW: 290,
defaultH: 450,
defaultX: 20,
defaultY: 70,
render(body, state, saveState) {
const DUTY_ROLES = [
  { id: 'computer', title: 'תורן מחשב', icon: '💻' },
  { id: 'cleaning', title: 'תורן ניקיון', icon: '🧹' },
  { id: 'chairs', title: 'תורן הרמת כיסאות', icon: '🪑' },
  { id: 'board', title: 'תורן לוח', icon: '🖍️' },
  { id: 'errands', title: 'תורן שליחויות', icon: '🏃' }
];

const HEBREW_DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

if (state.dayOff === undefined) state.dayOff = 2; // יום שלישי כברירת מחדל
if (!state.rolePools || typeof state.rolePools !== 'object') state.rolePools = {};
if (!state.roleRounds || typeof state.roleRounds !== 'object') state.roleRounds = {};
DUTY_ROLES.forEach(r => {
  if (!Array.isArray(state.rolePools[r.id])) state.rolePools[r.id] = [];
  if (typeof state.roleRounds[r.id] !== 'number') state.roleRounds[r.id] = 1;
});
if (!state.assignments) state.assignments = {};
if (!state.substitutes) state.substitutes = {};

let showSettings = false;
let activeModalRole = null;

function getClassStudents() {
  if (window.AppStore && typeof window.AppStore.getClassLists === 'function') {
    const lists = window.AppStore.getClassLists() || [];
    const selId = state.classId || (window.AppStore.getSelectedClassId ? window.AppStore.getSelectedClassId() : null);
    const cls = lists.find(c => c.id === selId) || lists[0];
    if (cls && Array.isArray(cls.students)) {
      return cls.students.filter(s => s && s.trim());
    }
  }
  return [];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function performDailyRotation(force = false) {
  const now = new Date();
  const todayStr = now.toLocaleDateString('sv-SE');
  const todayDayOfWeek = now.getDay();
  const isDayOff = state.dayOff !== -1 && todayDayOfWeek === state.dayOff;

  if (isDayOff && !state.forceDutyToday && !force) {
    return;
  }

  const assignedCount = Object.keys(state.assignments || {}).filter(k => state.assignments[k]).length;
  if (!force && state.lastAssignedDate === todayStr && assignedCount >= DUTY_ROLES.length) {
    return;
  }

  const allStudents = getClassStudents();
  if (allStudents.length === 0) return;

  const assignedToday = [];
  const newAssignments = {};

  DUTY_ROLES.forEach(role => {
    // Keep only active students for this role
    let pool = (state.rolePools[role.id] || []).filter(s => allStudents.includes(s));

    // Try finding the first candidate in this role's queue not yet assigned to another duty today
    let chosenIdx = pool.findIndex(s => !assignedToday.includes(s));

    if (chosenIdx === -1) {
      // Round complete for this specific role! Start a new cycle for this role
      state.roleRounds[role.id] = (state.roleRounds[role.id] || 0) + 1;
      const unassignedInClass = allStudents.filter(s => !assignedToday.includes(s));
      const alreadyAssigned = allStudents.filter(s => assignedToday.includes(s));
      pool = [...shuffle(unassignedInClass), ...shuffle(alreadyAssigned)];
      chosenIdx = pool.findIndex(s => !assignedToday.includes(s));
      if (chosenIdx === -1) chosenIdx = 0; // fallback if fewer students than roles
    }

    const chosenStudent = pool.splice(chosenIdx, 1)[0] || '';
    state.rolePools[role.id] = pool;
    newAssignments[role.id] = chosenStudent;
    if (chosenStudent) assignedToday.push(chosenStudent);
  });

  state.assignments = newAssignments;
  state.substitutes = {};
  state.lastAssignedDate = todayStr;
  state.forceDutyToday = false;
  saveState();
}

function replaceDuty(roleId, newStudent) {
  const curStudent = state.assignments[roleId];
  if (!curStudent || !newStudent || curStudent === newStudent) return;

  if (!state.rolePools[roleId]) state.rolePools[roleId] = [];
  // Return the absent student to the front of this role's round queue so they get their turn next time
  if (!state.rolePools[roleId].includes(curStudent)) {
    state.rolePools[roleId].unshift(curStudent);
  }

  // Remove the replacement student from this role's pool so they don't get assigned again soon
  state.rolePools[roleId] = state.rolePools[roleId].filter(s => s !== newStudent);

  state.assignments[roleId] = newStudent;
  state.substitutes[roleId] = {
    original: curStudent,
    sub: newStudent,
    time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
  };
  saveState();
}

performDailyRotation(false);

function renderUI() {
  const now = new Date();
  const dayName = HEBREW_DAYS[now.getDay()];
  const isDayOff = state.dayOff !== -1 && now.getDay() === state.dayOff && !state.forceDutyToday;
  const allStudents = getClassStudents();
  const lists = (window.AppStore && window.AppStore.getClassLists) ? window.AppStore.getClassLists() : [];
  const currentClassId = state.classId || (window.AppStore && window.AppStore.getSelectedClassId ? window.AppStore.getSelectedClassId() : null);
  const totalStudents = allStudents.length;

  body.innerHTML = `
    <div class="duty-container">
      <div class="duty-header-bar">
        <div class="duty-day-pill">
          <span class="duty-day-icon">📅</span>
          <span>יום ${dayName}</span>
        </div>
        <div class="duty-round-pill" title="סבב תורנויות כיתתי אישי לכל תפקיד">
          <span>סבב נפרד לכל תפקיד</span>
        </div>
        <button class="duty-icon-btn ${showSettings ? 'active' : ''}" data-act="toggle-settings" title="הגדרות תורנות ויום חופשי">
          ⚙️
        </button>
      </div>

      ${showSettings ? `
        <div class="duty-settings-panel">
          <div class="duty-setting-row">
            <label>כיתה:</label>
            <select data-el="class-sel">
              ${lists.map(c => `<option value="${c.id}" ${c.id === currentClassId ? 'selected' : ''}>${c.name} (${c.students.length})</option>`).join('')}
            </select>
          </div>
          <div class="duty-setting-row">
            <label>יום חופשי למורה:</label>
            <select data-el="dayoff-sel">
              <option value="-1" ${state.dayOff === -1 ? 'selected' : ''}>ללא יום חופשי</option>
              <option value="0" ${state.dayOff === 0 ? 'selected' : ''}>יום ראשון</option>
              <option value="1" ${state.dayOff === 1 ? 'selected' : ''}>יום שני</option>
              <option value="2" ${state.dayOff === 2 ? 'selected' : ''}>יום שלישי (ברירת מחדל)</option>
              <option value="3" ${state.dayOff === 3 ? 'selected' : ''}>יום רביעי</option>
              <option value="4" ${state.dayOff === 4 ? 'selected' : ''}>יום חמישי</option>
              <option value="5" ${state.dayOff === 5 ? 'selected' : ''}>יום שישי</option>
            </select>
          </div>
          <div class="duty-settings-actions">
            <button class="duty-mini-btn" data-act="reroll-today">🎲 ערבב תורנים להיום</button>
            <button class="duty-mini-btn danger" data-act="reset-cycle">🔄 איפוס כל הסבבים</button>
          </div>
        </div>
      ` : ''}

      ${isDayOff ? `
        <div class="duty-day-off-card">
          <div class="duty-day-off-icon">🏖️</div>
          <div class="duty-day-off-title">היום החופשי של המורה!</div>
          <div class="duty-day-off-desc">ביום זה אין תורנויות כיתתיות. הסבב מושהה וימשיך אוטומטית ביום הלימודים הבא.</div>
          <button class="duty-force-btn" data-act="force-today">⚡ הפעל תורנויות בכל זאת להיום</button>
        </div>
      ` : totalStudents === 0 ? `
        <div class="duty-empty-card">
          <div style="font-size:1.8rem;margin-bottom:6px;">👥</div>
          <div>אין תלמידים בכיתה שנבחרה.</div>
          <div style="font-size:0.8rem;opacity:0.8;margin-top:4px;">הוסף תלמידים דרך כפתור "רשימת תלמידים" בסרגל העליון.</div>
        </div>
      ` : `
        <div class="duty-roles-list">
          ${DUTY_ROLES.map(role => {
            const student = state.assignments ? state.assignments[role.id] : '';
            const sub = state.substitutes ? state.substitutes[role.id] : null;
            const rolePool = state.rolePools[role.id] || [];
            const roundNum = state.roleRounds[role.id] || 1;
            return `
              <div class="duty-role-item ${sub ? 'is-substitute' : ''}">
                <div class="duty-role-info">
                  <span class="duty-role-icon">${role.icon}</span>
                  <div class="duty-role-texts">
                    <span class="duty-role-title">${role.title}</span>
                    <span class="duty-role-round-badge">סבב ${roundNum} • נותרו ${rolePool.length}</span>
                  </div>
                </div>
                <div class="duty-student-area">
                  <span class="duty-student-name">${student || '—'}</span>
                  ${sub ? `<span class="duty-sub-tag" title="מחליף את ${sub.original}">מחליף</span>` : ''}
                </div>
                <button class="duty-replace-btn" data-act="open-sub" data-role="${role.id}" title="החלף תורן אם התלמיד נעדר">
                  🔄 החלף
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <div class="duty-footer">
          <button class="duty-reward-btn" data-act="reward-duty" title="הענק נקודת יהלום לכל תורני היום">
            💎 פרגן יהלום לכל התורנים
          </button>
        </div>
      `}

      ${activeModalRole ? renderSubModal(activeModalRole) : ''}
    </div>
  `;

  bindEvents();
}

function renderSubModal(roleId) {
  const role = DUTY_ROLES.find(r => r.id === roleId) || { title: 'תורן' };
  const curStudent = state.assignments ? state.assignments[roleId] : '';
  const allStudents = getClassStudents();
  const pool = state.rolePools[roleId] || [];
  const assigned = Object.values(state.assignments || {});
  const otherStudents = allStudents.filter(s => s !== curStudent);

  return `
    <div class="duty-modal-overlay">
      <div class="duty-modal-card">
        <div class="duty-modal-header">
          <h4>🔄 החלפת ${role.title}</h4>
          <button class="duty-modal-close" data-act="close-sub">✕</button>
        </div>
        <p class="duty-modal-desc">
          התלמיד <strong>${curStudent}</strong> נעדר היום?
          <br>
          הוא יוחלף להיום בלבד ויחזור לראש הסבב של <strong>${role.title}</strong> בהמשך כדי שלא יפסיד את תורו!
        </p>

        <button class="duty-modal-quick-btn" data-act="quick-random-sub">
          🎲 הגרל מחליף מסבב ${role.title} (${pool.length} ממתינים בסבב)
        </button>

        <div style="font-size:0.8rem;font-weight:700;margin:10px 0 4px;color:inherit;">או בחר תלמיד מחליף:</div>
        <select class="duty-modal-select" data-el="sub-select">
          ${otherStudents.map(s => {
            const inP = pool.includes(s) ? ` (בסבב ${role.title})` : '';
            const isAssigned = assigned.includes(s) ? ' (תורן אחר)' : '';
            return `<option value="${s}">${s}${inP}${isAssigned}</option>`;
          }).join('')}
        </select>

        <div class="duty-modal-buttons">
          <button class="duty-modal-btn primary" data-act="confirm-sub">✓ אשר החלפה</button>
          <button class="duty-modal-btn secondary" data-act="close-sub">ביטול</button>
        </div>
      </div>
    </div>
  `;
}

function bindEvents() {
  const toggleBtn = body.querySelector('[data-act="toggle-settings"]');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      showSettings = !showSettings;
      renderUI();
    });
  }

  const classSel = body.querySelector('[data-el="class-sel"]');
  if (classSel) {
    classSel.addEventListener('change', (e) => {
      state.classId = e.target.value;
      state.rolePools = {};
      state.roleRounds = {};
      state.assignments = {};
      state.substitutes = {};
      performDailyRotation(true);
      renderUI();
    });
  }

  const dayoffSel = body.querySelector('[data-el="dayoff-sel"]');
  if (dayoffSel) {
    dayoffSel.addEventListener('change', (e) => {
      state.dayOff = parseInt(e.target.value, 10);
      saveState();
      renderUI();
    });
  }

  const rerollBtn = body.querySelector('[data-act="reroll-today"]');
  if (rerollBtn) {
    rerollBtn.addEventListener('click', () => {
      performDailyRotation(true);
      if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
      renderUI();
    });
  }

  const resetBtn = body.querySelector('[data-act="reset-cycle"]');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('לאפס את כל הסבבים של כל התורנויות ולהתחיל סבב 1 מחדש?')) {
        state.rolePools = {};
        state.roleRounds = {};
        state.assignments = {};
        state.substitutes = {};
        state.lastAssignedDate = '';
        performDailyRotation(true);
        if (typeof SoundFX !== 'undefined' && SoundFX.fanfare) SoundFX.fanfare();
        renderUI();
      }
    });
  }

  const forceBtn = body.querySelector('[data-act="force-today"]');
  if (forceBtn) {
    forceBtn.addEventListener('click', () => {
      state.forceDutyToday = true;
      performDailyRotation(true);
      if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
      renderUI();
    });
  }

  body.querySelectorAll('[data-act="open-sub"]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeModalRole = btn.dataset.role;
      renderUI();
    });
  });

  const closeSubBtns = body.querySelectorAll('[data-act="close-sub"]');
  closeSubBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeModalRole = null;
      renderUI();
    });
  });

  const quickRandomBtn = body.querySelector('[data-act="quick-random-sub"]');
  if (quickRandomBtn && activeModalRole) {
    quickRandomBtn.addEventListener('click', () => {
      const curStudent = state.assignments[activeModalRole];
      const allStudents = getClassStudents();
      const assigned = Object.values(state.assignments || {}).filter(s => s !== curStudent);
      const pool = (state.rolePools[activeModalRole] || []).filter(s => s !== curStudent && !assigned.includes(s));
      let subCandidate = pool.length > 0 ? pool[0] : null;
      if (!subCandidate) {
        const available = allStudents.filter(s => s !== curStudent && !assigned.includes(s));
        if (available.length > 0) {
          subCandidate = available[Math.floor(Math.random() * available.length)];
        }
      }
      if (subCandidate) {
        replaceDuty(activeModalRole, subCandidate);
        activeModalRole = null;
        if (typeof SoundFX !== 'undefined' && SoundFX.tap) SoundFX.tap();
        renderUI();
      } else {
        alert('לא נמצאו תלמידים פנויים להחלפה.');
      }
    });
  }

  const confirmSubBtn = body.querySelector('[data-act="confirm-sub"]');
  if (confirmSubBtn && activeModalRole) {
    confirmSubBtn.addEventListener('click', () => {
      const sel = body.querySelector('[data-el="sub-select"]');
      if (sel && sel.value) {
        replaceDuty(activeModalRole, sel.value);
        activeModalRole = null;
        if (typeof SoundFX !== 'undefined' && SoundFX.tap) SoundFX.tap();
        renderUI();
      }
    });
  }

  const rewardBtn = body.querySelector('[data-act="reward-duty"]');
  if (rewardBtn) {
    rewardBtn.addEventListener('click', () => {
      if (window.AppStore && window.AppStore.addDiamondsToStudent) {
        const dutyStudents = Object.values(state.assignments || {}).filter(Boolean);
        if (dutyStudents.length === 0) return;
        dutyStudents.forEach(st => {
          window.AppStore.addDiamondsToStudent(st, 1, 'תורנות כיתה');
        });
        if (typeof SoundFX !== 'undefined' && SoundFX.fanfare) SoundFX.fanfare();
        rewardBtn.textContent = '✓ נקודות יהלום הוענקו!';
        rewardBtn.style.background = 'rgba(16, 185, 129, 0.4)';
        setTimeout(() => { renderUI(); }, 1400);
      }
    });
  }
}

renderUI();
}
}
};