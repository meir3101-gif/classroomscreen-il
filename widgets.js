const WAZE_3D_MAP = {
  'waze:jewish-boy': 'assets/waze-3d/jewish-boy.jpg',
  'waze:jewish-girl': 'assets/waze-3d/jewish-girl.jpg',
  'waze:tefillin': 'assets/waze-3d/tefillin.jpg',
  'waze:siddur': 'assets/waze-3d/siddur.jpg',
  'waze:shabbat-candles': 'assets/waze-3d/shabbat-candles.jpg',
  'waze:chanukiah': 'assets/waze-3d/chanukiah.jpg',
  'waze:sefer-torah': 'assets/waze-3d/sefer-torah.jpg',
  'waze:challah': 'assets/waze-3d/challah.jpg',
  'waze:kiddush-cup': 'assets/waze-3d/kiddush-cup.jpg',
  'waze:pomegranate': 'assets/waze-3d/pomegranate.jpg',
  'waze:dates': 'assets/waze-3d/dates.jpg',
  'waze:wheat': 'assets/waze-3d/wheat.jpg',
  'waze:barley': 'assets/waze-3d/barley.jpg',
  'waze:four-species': 'assets/waze-3d/four-species.jpg',
  'waze:olive': 'assets/waze-3d/olive.jpg',
  'waze:star-of-david': 'assets/waze-3d/star-of-david.jpg',
  'waze:round-matzah': 'assets/waze-3d/round-matzah.jpg',
  'waze:tool-clock': 'assets/waze-3d/tool-clock.jpg',
  'waze:tool-stopwatch': 'assets/waze-3d/tool-stopwatch.jpg',
  'waze:tool-visual-timer': 'assets/waze-3d/tool-visual-timer.jpg',
  'waze:tool-traffic-light': 'assets/waze-3d/tool-traffic-light.jpg',
  'waze:tool-wheel': 'assets/waze-3d/tool-wheel.jpg',
  'waze:tool-symbols': 'assets/waze-3d/tool-symbols.jpg',
  'waze:tool-background': 'assets/waze-3d/tool-background.jpg',
  'waze:tool-video': 'assets/waze-3d/tool-video.jpg',
  'waze:tool-webcam': 'assets/waze-3d/tool-webcam.jpg',
  'waze:tool-calendar': 'assets/waze-3d/tool-calendar.jpg',
  'waze:tool-agenda': 'assets/waze-3d/tool-agenda.jpg',
  'waze:tool-timetable': 'assets/waze-3d/tool-timetable.jpg',
  'waze:tool-poll': 'assets/waze-3d/tool-poll.jpg',
  'waze:tool-embed': 'assets/waze-3d/tool-embed.jpg',
  'waze:animal-lion': 'assets/waze-3d/animal-lion.jpg',
  'waze:animal-dolphin': 'assets/waze-3d/animal-dolphin.jpg',
  'waze:animal-eagle': 'assets/waze-3d/animal-eagle.jpg',
  'waze:vehicle-rocket': 'assets/waze-3d/vehicle-rocket.jpg',
  'waze:sport-soccer': 'assets/waze-3d/sport-soccer.jpg',
  'waze:music-guitar': 'assets/waze-3d/music-guitar.jpg',
  'waze:mood-cool': 'assets/waze-3d/mood-cool.jpg',
  'waze:mood-ninja': 'assets/waze-3d/mood-ninja.jpg',
  'waze:mood-king': 'assets/waze-3d/mood-king.jpg',
  'waze:mood-headphones': 'assets/waze-3d/mood-headphones.jpg',
  'waze:mood-star': 'assets/waze-3d/mood-star.jpg',
  'waze:mood-astronaut': 'assets/waze-3d/mood-astronaut.jpg',
  'waze:mood-superhero': 'assets/waze-3d/mood-superhero.jpg',
  'waze:mood-wizard': 'assets/waze-3d/mood-wizard.jpg',
  'waze:mood-detective': 'assets/waze-3d/mood-detective.jpg',
  'waze:mood-chef': 'assets/waze-3d/mood-chef.jpg',
  'waze:mood-pirate': 'assets/waze-3d/mood-pirate.jpg',
  'waze:diamond-cyan': 'assets/waze-3d/diamond-cyan.jpg',
  'waze:diamond-legend': 'assets/waze-3d/diamond-legend.jpg',
  'waze:trophy-crown': 'assets/waze-3d/trophy-crown.jpg',
  'waze:dice': 'assets/waze-3d/dice.jpg',
  'waze:birthday-cake': 'assets/waze-3d/birthday-cake.jpg',
  'waze:shop-chair': 'assets/waze-3d/shop-chair.jpg',
  'waze:shop-ticket': 'assets/waze-3d/shop-ticket.jpg',
  'waze:shop-palette': 'assets/waze-3d/shop-palette.jpg',
  'waze:star-shield': 'assets/waze-3d/star-shield.jpg',
  'waze:tool-timer': 'assets/waze-3d/tool-timer.jpg',
  'waze:tool-text-draw': 'assets/waze-3d/tool-text-draw.jpg',
  'waze:tool-groups': 'assets/waze-3d/tool-groups.jpg'
};

const WAZE_DEFAULT_MOOD_KEYS = [
  'waze:jewish-boy',
  'waze:jewish-girl',
  'waze:mood-cool',
  'waze:mood-ninja',
  'waze:mood-king',
  'waze:mood-headphones',
  'waze:mood-star',
  'waze:mood-astronaut',
  'waze:mood-superhero',
  'waze:mood-wizard',
  'waze:mood-detective',
  'waze:mood-chef',
  'waze:mood-pirate',
  'waze:animal-lion',
  'waze:animal-dolphin',
  'waze:animal-eagle',
  'waze:vehicle-rocket',
  'waze:sport-soccer',
  'waze:music-guitar'
];

function renderWaze3DDiamond(isLegend = false, size = 18) {
  const src = isLegend ? 'assets/waze-3d/diamond-legend.jpg' : 'assets/waze-3d/diamond-cyan.jpg';
  return `<span class="waze-3d-gem-disc" style="width:${size}px;height:${size}px;"><img src="${src}" alt="💎" class="waze-3d-crop-img" /></span>`;
}
window.renderWaze3DDiamond = renderWaze3DDiamond;

function renderWaze3DMedallion(assetKey = 'trophy-crown', size = 22) {
  const cleanKey = String(assetKey).replace(/^waze:/, '');
  const src = WAZE_3D_MAP['waze:' + cleanKey] || `assets/waze-3d/${cleanKey}.jpg`;
  return `<span class="waze-3d-gem-disc" style="width:${size}px;height:${size}px;"><img src="${src}" alt="" class="waze-3d-crop-img" /></span>`;
}
window.renderWaze3DMedallion = renderWaze3DMedallion;

const ICON_CATEGORIES = [
  {
    id: 'waze3d',
    name: 'דמויות Waze 3D',
    icon: 'waze:mood-cool',
    icons: [
      'waze:jewish-boy',
      'waze:jewish-girl',
      'waze:mood-cool',
      'waze:mood-ninja',
      'waze:mood-king',
      'waze:mood-headphones',
      'waze:mood-star',
      'waze:mood-astronaut',
      'waze:mood-superhero',
      'waze:mood-wizard',
      'waze:mood-detective',
      'waze:mood-chef',
      'waze:mood-pirate'
    ]
  },
  {
    id: 'judaica',
    name: 'יהדות ושבעת המינים 3D',
    icon: 'waze:star-of-david',
    icons: [
      'waze:jewish-boy',
      'waze:jewish-girl',
      'waze:star-of-david',
      'waze:tefillin',
      'waze:siddur',
      'waze:sefer-torah',
      'waze:shabbat-candles',
      'waze:challah',
      'waze:kiddush-cup',
      'waze:chanukiah',
      'waze:four-species',
      'waze:round-matzah',
      'waze:pomegranate',
      'waze:dates',
      'waze:wheat',
      'waze:barley',
      'waze:olive'
    ]
  },
  {
    id: 'animals_sports',
    name: 'חיות, חלל, ספורט ומוזיקה 3D',
    icon: 'waze:animal-lion',
    icons: [
      'waze:animal-lion',
      'waze:animal-eagle',
      'waze:animal-dolphin',
      'waze:vehicle-rocket',
      'waze:sport-soccer',
      'waze:music-guitar',
      'waze:mood-astronaut',
      'waze:mood-superhero',
      'waze:mood-ninja',
      'waze:mood-pirate',
      'waze:mood-wizard',
      'waze:mood-detective',
      'waze:mood-chef',
      'waze:mood-headphones',
      'waze:tool-embed'
    ]
  },
  {
    id: 'gems',
    name: 'יהלומים ופרסים 3D',
    icon: 'waze:diamond-cyan',
    icons: [
      'waze:diamond-cyan',
      'waze:diamond-legend',
      'waze:trophy-crown',
      'waze:star-shield',
      'waze:shop-ticket',
      'waze:shop-chair',
      'waze:shop-palette',
      'waze:birthday-cake',
      'waze:dice',
      'waze:tool-wheel',
      'waze:tool-timer',
      'waze:tool-clock',
      'waze:tool-stopwatch',
      'waze:tool-visual-timer',
      'waze:tool-traffic-light',
      'waze:tool-symbols',
      'waze:tool-calendar',
      'waze:tool-agenda',
      'waze:tool-timetable',
      'waze:tool-poll',
      'waze:tool-embed',
      'waze:tool-background',
      'waze:tool-video',
      'waze:tool-webcam',
      'waze:tool-text-draw',
      'waze:tool-groups'
    ]
  }
];

const ALL_STUDENT_ICONS = ICON_CATEGORIES.flatMap(c => c.icons);

function renderStudentIconHtml(icon, name = '') {
  if (icon && WAZE_3D_MAP[icon]) {
    return `<img src="${WAZE_3D_MAP[icon]}" alt="${name}" class="waze-3d-avatar-img" />`;
  }
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const defaultWazeKey = WAZE_DEFAULT_MOOD_KEYS[Math.abs(hash) % WAZE_DEFAULT_MOOD_KEYS.length];
  return `<img src="${WAZE_3D_MAP[defaultWazeKey]}" alt="${name}" class="waze-3d-avatar-img" />`;
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
              <span class="grand-medal">${renderWaze3DMedallion('star-shield', 38)}</span>
              ${renderWinnerAvatar(top2, 90)}
              <div class="grand-winner-name">${top2.name}</div>
            </div>
            <div class="grand-pedestal silver">
              <div class="grand-rank-badge">2</div>
              <div class="grand-score-badge" style="display:inline-flex;align-items:center;gap:5px;">${renderWaze3DDiamond(top2.score >= 30, 20)} <span>${top2.score}</span></div>
              <div class="grand-score-sub">יהלומים היום</div>
            </div>
          </div>
        ` : '<div class="grand-podium-col second empty"></div>'}

        <div class="grand-podium-col first">
          <div class="grand-winner-header">
            <div class="grand-crown">${renderWaze3DMedallion('trophy-crown', 48)}</div>
            ${renderWinnerAvatar(top1, 116)}
            <div class="grand-winner-name first">${top1.name}</div>
          </div>
          <div class="grand-pedestal gold">
            <div class="grand-rank-badge first">1</div>
            <div class="grand-score-badge first" style="display:inline-flex;align-items:center;gap:5px;">${renderWaze3DDiamond(true, 22)} <span>${top1.score}</span></div>
            <div class="grand-score-sub first">אלוף/ת היהלומים!</div>
          </div>
        </div>

        ${top3 ? `
          <div class="grand-podium-col third">
            <div class="grand-winner-header">
              <span class="grand-medal">${renderWaze3DMedallion('diamond-cyan', 36)}</span>
              ${renderWinnerAvatar(top3, 90)}
              <div class="grand-winner-name">${top3.name}</div>
            </div>
            <div class="grand-pedestal bronze">
              <div class="grand-rank-badge">3</div>
              <div class="grand-score-badge" style="display:inline-flex;align-items:center;gap:5px;">${renderWaze3DDiamond(top3.score >= 30, 20)} <span>${top3.score}</span></div>
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
  let activeIconCategory = 'waze3d';
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

  const DEFAULT_SHOP_ITEMS = [
    { id: 'sh-friend', icon: 'waze:shop-chair', title: 'לשבת ליד חבר ליום אחד', cost: 20 },
    { id: 'sh-assistant', icon: 'waze:trophy-crown', title: 'עוזר/ת המורה ליום שלם', cost: 30 },
    { id: 'sh-skip-q', icon: 'waze:shop-ticket', title: 'דילוג על שאלה אחת בתרגול', cost: 25 },
    { id: 'sh-board', icon: 'waze:shop-palette', title: 'ציור או כתיבה חופשית על הלוח', cost: 15 },
    { id: 'sh-game', icon: 'waze:dice', title: 'בחירת משחק כיתתי של 5 דקות', cost: 35 },
    { id: 'sh-letter', icon: 'waze:star-shield', title: 'מכתב מחמאה אישי להורים', cost: 40 },
    { id: 'sh-corner', icon: 'waze:mood-headphones', title: '10 דקות בפינה השקטה / יצירה', cost: 15 },
    { id: 'sh-duty', icon: 'waze:mood-king', title: 'בחירת תורנות מועדפת ליום אחד', cost: 20 }
  ];

  let shopItems = (window.AppStore && window.AppStore.getShopItems && window.AppStore.getShopItems()) || state.shopItems || [...DEFAULT_SHOP_ITEMS];
  let selectedShopBuyer = '';
  let showAddShopForm = false;

  const BEHAVIORS = [
    { id: 'prayer', icon: 'waze:siddur', title: 'תפילה וברכות', pts: 2 },
    { id: 'torah', icon: 'waze:sefer-torah', title: 'לימוד תורה ופרשה', pts: 2 },
    { id: 'ready', icon: 'waze:mood-astronaut', title: 'מוכנות לשיעור', pts: 1 },
    { id: 'task', icon: 'waze:shop-ticket', title: 'ביצוע מטלה', pts: 2 },
    { id: 'listen', icon: 'waze:mood-headphones', title: 'הקשבה והשתתפות', pts: 1 },
    { id: 'help', icon: 'waze:tool-groups', title: 'עזרה לחבר', pts: 2 },
    { id: 'polite', icon: 'waze:mood-cool', title: 'דיבור בנימוס', pts: 1 },
    { id: 'order', icon: 'waze:mood-king', title: 'סדר וארגון', pts: 1 },
    { id: 'excel', icon: 'waze:diamond-legend', title: 'הצטיינות מיוחדת', pts: 3 },
    { id: 'behavior', icon: 'waze:star-shield', title: 'התנהגות מופתית', pts: 2 },
    { id: 'free', icon: 'waze:diamond-cyan', title: 'בונוס חופשי', pts: 1 },
    { id: 'penalty', icon: 'waze:mood-pirate', title: 'בירור / משמעת (-1)', pts: -1 }
  ];

  body.innerHTML = `
  <input type="file" accept="image/*" data-el="sp-photo-file-input" style="display:none;" />
  <div style="display:flex;flex-direction:column;height:100%;gap:8px;position:relative;">
    <div style="display:flex;gap:8px;justify-content:center;padding:4px;">
      <button class="rand-tab waze-pill-tab ${activeTab === 'teams' ? 'active' : ''}" data-sptab="teams">${renderWaze3DMedallion('tool-groups', 20)} <span>קבוצות</span></button>
      <button class="rand-tab waze-pill-tab ${activeTab === 'students' ? 'active' : ''}" data-sptab="students">${renderWaze3DDiamond(false, 20)} <span>יהלומים</span></button>
      <button class="rand-tab waze-pill-tab ${activeTab === 'shop' ? 'active' : ''}" data-sptab="shop">${renderWaze3DMedallion('trophy-crown', 20)} <span>חנות</span></button>
    </div>

    <!-- 1. TEAMS VIEW -->
    <div data-el="teams-view" class="${activeTab === 'teams' ? '' : 'hidden'}" style="display:flex;flex-direction:column;height:100%;gap:8px;">
      <div data-el="team-goal-banner" class="team-goal-banner"></div>
      <div class="scoreboard-teams" data-el="teams-container"></div>
      <div style="display:flex;justify-content:space-between;gap:8px;margin-top:auto;">
        <button class="small-btn" data-act="add-team">+ קבוצה</button>
        <button class="secondary-btn" data-act="reset-scores" style="padding:4px 10px;font-size:0.8rem;">↺ איפוס</button>
      </div>
    </div>

    <!-- 2. STUDENTS INDIVIDUAL POINTS VIEW (DIAMONDS) -->
    <div data-el="students-view" class="sp-container ${activeTab === 'students' ? '' : 'hidden'}">
      <div class="sp-toolbar">
        <select data-el="sp-class-sel" style="max-width:130px;padding:5px 8px;border-radius:12px;border:1px solid #cbd5e1;font-weight:700;font-size:0.8rem;"></select>
        <input type="text" class="sp-search" data-el="sp-search" placeholder="🔍 חיפוש..." />
        <div style="display:flex;gap:5px;">
          <button class="sp-mode-pill ${scoreMode === 'daily' ? 'active' : ''}" data-mode="daily" title="הצג יהלומים שנצברו היום">היום</button>
          <button class="sp-mode-pill ${scoreMode === 'total' ? 'active' : ''}" data-mode="total" title="הצג סך כל היהלומים המצטבר">מצטבר</button>
        </div>
      </div>

      <!-- Class Goal Progress Banner -->
      <div data-el="class-goal-banner" class="class-goal-banner"></div>

      <div style="display:flex;align-items:center;justify-content:space-between;padding:0 2px;flex-wrap:wrap;gap:6px;">
        <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
          <button class="small-btn waze-action-pill" data-act="open-podium" style="background:#ffffff;color:#0f172a;font-weight:900;">${renderWaze3DMedallion('trophy-crown', 22)} <span>מצעד</span></button>
          <button class="small-btn waze-action-pill" data-act="open-all-drawer" style="background:#ffffff;color:#0284c7;font-weight:900;">${renderWaze3DDiamond(false, 20)} <span>+ לכולם</span></button>
          <button class="small-btn waze-action-pill" data-act="open-deduct-all-drawer" style="background:#fff1f2;color:#e11d48;font-weight:900;"><span>− לכולם</span></button>
          <button class="small-btn waze-action-pill" data-act="undo-score" title="בטל את פעולת הניקוד האחרונה" style="font-weight:900;background:#fef9c3;color:#92400e;" disabled>↩</button>
          <button class="small-btn waze-action-pill" data-act="toggle-sidebar-view" style="font-weight:800;background:#ffffff;color:#334155;">${renderWaze3DDiamond(false, 18)} <span>סרגל</span></button>
        </div>
        <div style="display:flex;gap:6px;align-items:center;">
          <button class="small-btn waze-action-pill" data-act="randomize-all-icons" title="חלק דמויות Waze 3D אקראיות לכל התלמידים" style="background:#ffffff;color:#0f172a;">${renderWaze3DMedallion('dice', 20)} <span>הגרל דמויות</span></button>
          <button class="small-btn waze-action-pill" data-act="reset-daily" style="background:#ffffff;color:#475569;">↺ איפוס יומי</button>
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
            <button class="small-btn" data-act="upload-photo-from-drawer" style="font-size:0.75rem;padding:3px 8px;display:inline-flex;align-items:center;gap:4px;" title="העלה תמונה מהמחשב">${renderWaze3DMedallion('tool-webcam', 18)} <span>תמונה</span></button>
            <button class="small-btn danger hidden" data-el="remove-photo-btn" data-act="remove-photo-from-drawer" style="font-size:0.75rem;padding:3px 8px;color:#dc2626;" title="מחק תמונה">מחק תמונה</button>
            <button class="small-btn" data-act="open-icon-from-drawer" style="font-size:0.75rem;padding:3px 8px;display:inline-flex;align-items:center;gap:4px;">${renderWaze3DMedallion('shop-palette', 18)} <span>סמל</span></button>
            <button class="small-btn" data-act="close-drawer" style="padding:2px 8px;">✕</button>
          </div>
        </div>
        <div class="sp-behavior-grid">
          ${BEHAVIORS.map(b => `
            <button class="sp-behavior-btn" data-behavior="${b.id}" data-pts="${b.pts}">
              ${WAZE_3D_MAP[b.icon] ? renderWaze3DMedallion(b.icon, 28) : `<span style="font-size:1.25rem;">${b.icon}</span>`}
              <span>${b.title}</span>
              <span class="sp-pts-tag" style="display:inline-flex;align-items:center;gap:4px;${b.pts < 0 ? 'background:#fee2e2;color:#dc2626;' : 'background:#e0f2fe;color:#0284c7;'}">
                ${renderWaze3DDiamond(b.pts >= 3, 14)}
                <span>${b.pts > 0 ? '+' + b.pts : b.pts}</span>
              </span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Award / Deduct All Class Drawer -->
      <div data-el="award-all-drawer" class="sp-drawer hidden">
        <div class="sp-drawer-header">
          <div style="display:flex;align-items:center;gap:6px;">
            <span data-el="all-drawer-icon">${renderWaze3DDiamond(true, 24)}</span>
            <div>
              <div data-el="all-drawer-title" style="font-weight:800;font-size:0.95rem;color:var(--text-dark);">הענקת יהלומים לכל הכיתה בבת אחת</div>
              <div data-el="all-drawer-sub" style="font-size:0.75rem;color:var(--text-muted);">בחר חיזוק שיוענק מיידית לכל תלמידי הכיתה</div>
            </div>
          </div>
          <button class="small-btn" data-act="close-all-drawer" style="padding:2px 8px;">✕</button>
        </div>
        <div class="sp-behavior-grid">
          <button class="sp-behavior-btn" data-all-kind="positive" data-all-pts="1" data-all-title="הקשבה והשתתפות כיתתית">
            ${renderWaze3DMedallion('mood-headphones', 28)}
            <span>הקשבה והשתתפות כיתתית</span>
            <span class="sp-pts-tag" style="display:inline-flex;align-items:center;gap:4px;background:#e0f2fe;color:#0284c7;">${renderWaze3DDiamond(false, 14)} <span>+1</span></span>
          </button>
          <button class="sp-behavior-btn" data-all-kind="positive" data-all-pts="2" data-all-title="ביצוע משימה כיתתית">
            ${renderWaze3DMedallion('shop-ticket', 28)}
            <span>ביצוע משימה כיתתית</span>
            <span class="sp-pts-tag" style="display:inline-flex;align-items:center;gap:4px;background:#e0f2fe;color:#0284c7;">${renderWaze3DDiamond(false, 14)} <span>+2</span></span>
          </button>
          <button class="sp-behavior-btn" data-all-kind="positive" data-all-pts="2" data-all-title="אווירה נעימה ושיתוף פעולה">
            ${renderWaze3DMedallion('tool-groups', 28)}
            <span>אווירה נעימה ושיתוף פעולה</span>
            <span class="sp-pts-tag" style="display:inline-flex;align-items:center;gap:4px;background:#e0f2fe;color:#0284c7;">${renderWaze3DDiamond(false, 14)} <span>+2</span></span>
          </button>
          <button class="sp-behavior-btn" data-all-kind="positive" data-all-pts="3" data-all-title="מאמץ כיתתי מיוחד">
            ${renderWaze3DMedallion('trophy-crown', 28)}
            <span>מאמץ כיתתי מיוחד</span>
            <span class="sp-pts-tag" style="display:inline-flex;align-items:center;gap:4px;background:#e0f2fe;color:#0284c7;">${renderWaze3DDiamond(true, 14)} <span>+3</span></span>
          </button>
          <button class="sp-behavior-btn hidden" data-all-kind="negative" data-all-pts="-1" data-all-title="רעש / חוסר הקשבה כיתתי">
            ${renderWaze3DMedallion('mood-pirate', 28)}
            <span>רעש / חוסר הקשבה</span>
            <span class="sp-pts-tag" style="display:inline-flex;align-items:center;gap:4px;background:#fee2e2;color:#dc2626;">${renderWaze3DDiamond(false, 14)} <span>-1</span></span>
          </button>
          <button class="sp-behavior-btn hidden" data-all-kind="negative" data-all-pts="-2" data-all-title="הפרעה / אי עמידה במשימה">
            ${renderWaze3DMedallion('tool-traffic-light', 28)}
            <span>אי עמידה במשימה / הפרעה</span>
            <span class="sp-pts-tag" style="display:inline-flex;align-items:center;gap:4px;background:#fee2e2;color:#dc2626;">${renderWaze3DDiamond(false, 14)} <span>-2</span></span>
          </button>
          <button class="sp-behavior-btn hidden" data-all-kind="negative" data-all-pts="-1" data-all-title="הורדה כיתתית כללית">
            ${renderWaze3DMedallion('mood-detective', 28)}
            <span>הורדת יהלום לכל הכיתה</span>
            <span class="sp-pts-tag" style="display:inline-flex;align-items:center;gap:4px;background:#fee2e2;color:#dc2626;">${renderWaze3DDiamond(false, 14)} <span>-1</span></span>
          </button>
          <button class="sp-behavior-btn hidden" data-all-kind="negative" data-all-pts="-3" data-all-title="הורדת 3 יהלומים לכל הכיתה">
            ${renderWaze3DMedallion('mood-ninja', 28)}
            <span>הורדת 3 יהלומים לכולם</span>
            <span class="sp-pts-tag" style="display:inline-flex;align-items:center;gap:4px;background:#fee2e2;color:#dc2626;">${renderWaze3DDiamond(false, 14)} <span>-3</span></span>
          </button>
        </div>
      </div>

      <!-- Icon Picker Drawer -->
      <div data-el="icon-picker-drawer" class="sp-drawer hidden">
        <div class="sp-drawer-header">
          <div style="display:flex;align-items:center;gap:6px;">
            ${renderWaze3DMedallion('shop-palette', 24)}
            <span data-el="icon-picker-title" style="font-weight:800;font-size:0.95rem;color:var(--text-dark);">בחירת סמל תלת-ממד לתלמיד</span>
          </div>
          <div style="display:flex;gap:4px;align-items:center;">
            <button class="small-btn" data-act="random-icon-one" title="הגרל סמל אקראי לתלמיד זה" style="font-size:0.75rem;display:inline-flex;align-items:center;gap:4px;">${renderWaze3DMedallion('dice', 18)} <span>הגרל סמל</span></button>
            <button class="small-btn" data-act="close-icon-picker" style="padding:2px 8px;">✕</button>
          </div>
        </div>
        <div class="sp-icon-cat-bar" data-el="icon-cat-bar">
          ${ICON_CATEGORIES.map(c => `
            <button class="sp-icon-cat-btn ${c.id === 'waze3d' ? 'active' : ''}" data-cat="${c.id}" style="display:inline-flex;align-items:center;gap:5px;">
              ${renderWaze3DMedallion(c.icon, 20)}
              <span>${c.name}</span>
            </button>
          `).join('')}
        </div>
        <div class="sp-icon-grid" data-el="icon-grid"></div>
      </div>
    </div>

    <!-- 3. DIAMOND SHOP VIEW -->
    <div data-el="shop-view" class="sp-shop-container ${activeTab === 'shop' ? '' : 'hidden'}"></div>
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
      body.querySelector('[data-el="shop-view"]')?.classList.toggle('hidden', activeTab !== 'shop');
      if (activeTab === 'teams') renderTeamsBoard();
      else if (activeTab === 'shop') renderShopView();
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
                ${percent >= 15 ? renderWaze3DDiamond(false, 16) : ''}
                ${percent >= 45 ? renderWaze3DDiamond(true, 16) : ''}
                ${percent >= 75 ? renderWaze3DDiamond(false, 16) : ''}
              </div>
            </div>
            <div class="diamond-jar-percent">${percent}%</div>
          </div>
        </div>
        <div class="arena-goal-main">
          <div class="class-goal-top">
            <div class="class-goal-title-group">
              ${isReached ? renderWaze3DMedallion('trophy-crown', 24) : renderWaze3DDiamond(false, 22)}
              <span class="class-goal-prize" title="הפרס שהכיתה תזכה בו">${curGoal.prize || '🍕 מסיבת פיצה כיתתית'}</span>
            </div>
            <button class="class-goal-edit-btn" data-act="edit-class-goal" title="עריכת יעד ופרס">✏️ יעד</button>
          </div>
          <div class="class-goal-progress-bar arena-lightbar">
            <div class="class-goal-progress-fill" style="width: ${percent}%;"></div>
          </div>
          <div class="class-goal-bottom">
            <span class="class-goal-count" style="display:inline-flex;align-items:center;gap:4px;">${renderWaze3DDiamond(false, 15)} <span>${sumPoints} / ${target}</span></span>
            ${isReached ? `<span class="class-goal-badge success">✨ היעד הושג!</span>` : `<span class="class-goal-badge">נותרו ${Math.max(0, target - sumPoints)}</span>`}
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
      if (scoreVal >= 30) return 'halo-legend';
      if (scoreVal >= 10) return 'halo-high';
      if (scoreVal >= 5) return 'halo-mid';
      if (scoreVal >= 1) return 'halo-low';
      return 'halo-none';
    }

    function renderStudentBubbleHtml(name) {
      const sc = getStudentScore(name);
      const scoreVal = scoreMode === 'daily' ? sc.daily : sc.total;
      const icon = getStudentIcon(name);
      const photo = getStudentPhoto(name);
      const iconHtml = renderStudentIconHtml(icon, name);
      const haloClass = getHaloTierClass(scoreVal);

      return `
        <div class="sp-student-bubble ${haloClass}" data-student="${name}">
          <div class="sp-card-tools-bar">
            <button class="sp-card-tool-btn" data-act="upload-photo" data-student="${name}" title="העלה תמונה מהמחשב" style="padding:2px;">${renderWaze3DMedallion('tool-webcam', 20)}</button>
            <button class="sp-card-tool-btn" data-act="pick-icon" data-student="${name}" title="בחר סמל לתלמיד" style="padding:2px;">${renderWaze3DMedallion('shop-palette', 20)}</button>
          </div>
          <div class="sp-bubble-avatar-wrap">
            <div class="sp-bubble-avatar ${photo ? 'has-custom-photo' : ''}" data-act="open-drawer" data-student="${name}" title="לחץ להענקת יהלומים ל-${name}">
              ${photo ? `<img src="${photo}" alt="${name}" class="sp-bubble-photo-img" />` : iconHtml}
            </div>
            <span class="sp-bubble-badge ${scoreVal >= 30 ? 'legend-badge' : ''}" title="יהלומים">${renderWaze3DDiamond(scoreVal >= 30, 17)} <span>${scoreVal}</span></span>
          </div>
          <div class="sp-bubble-name" title="${name}">${name}</div>
        </div>
      `;
    }

    studentsGrid.innerHTML = filtered.map(name => renderStudentBubbleHtml(name)).join('');

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
    syncUndoButtonState();
  }

  function syncUndoButtonState() {
    const undoBtn = body.querySelector('[data-act="undo-score"]');
    if (!undoBtn) return;
    const canUndo = !!(window.AppStore && window.AppStore.canUndoScore && window.AppStore.canUndoScore());
    undoBtn.disabled = !canUndo;
    undoBtn.style.opacity = canUndo ? '1' : '0.45';
    undoBtn.style.cursor = canUndo ? 'pointer' : 'not-allowed';
  }

  // UNDO LAST SCORE ACTION
  body.querySelector('[data-act="undo-score"]')?.addEventListener('click', () => {
    if (!window.AppStore || !window.AppStore.undoLastScore) return;
    const undone = window.AppStore.undoLastScore();
    if (!undone) return;
    studentScores = window.AppStore.getStudentScores();
    state.studentScores = studentScores;
    saveState();
    if (SoundFX.undo) SoundFX.undo();
    else SoundFX.pop();
    renderStudentsGrid();
  });

  function openAllClassDrawer(mode = 'positive') {
    awardDrawer.classList.add('hidden');
    iconPickerDrawer.classList.add('hidden');
    const isNeg = mode === 'negative';
    const iconEl = awardAllDrawer.querySelector('[data-el="all-drawer-icon"]');
    const titleEl = awardAllDrawer.querySelector('[data-el="all-drawer-title"]');
    const subEl = awardAllDrawer.querySelector('[data-el="all-drawer-sub"]');
    if (iconEl) iconEl.textContent = isNeg ? '➖' : '✨';
    if (titleEl) titleEl.textContent = isNeg ? 'הורדת יהלומים לכל הכיתה' : 'הענקת יהלומים לכל הכיתה בבת אחת';
    if (subEl) subEl.textContent = isNeg ? 'בחר סיבה להורדת יהלומים לכל תלמידי הכיתה (בלי אפקט)' : 'בחר חיזוק שיוענק מיידית לכל תלמידי הכיתה';
    awardAllDrawer.querySelectorAll('[data-all-kind]').forEach(b => {
      b.classList.toggle('hidden', b.dataset.allKind !== mode);
    });
    awardAllDrawer.classList.remove('hidden');
  }

  // AWARD / DEDUCT ALL CLASS
  body.querySelector('[data-act="open-all-drawer"]')?.addEventListener('click', () => {
    openAllClassDrawer('positive');
  });

  body.querySelector('[data-act="open-deduct-all-drawer"]')?.addEventListener('click', () => {
    openAllClassDrawer('negative');
  });

  body.querySelector('[data-act="close-all-drawer"]')?.addEventListener('click', () => {
    awardAllDrawer.classList.add('hidden');
  });

  awardAllDrawer.querySelectorAll('[data-all-pts]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pts = parseInt(btn.dataset.allPts, 10);
      const title = btn.dataset.allTitle;
      window.AppStore.addDiamondsToAll(pts, title, e.currentTarget, selectedClassId);
      if (pts > 0) {
        if (SoundFX.allClassAward) SoundFX.allClassAward();
        else SoundFX.bell();
      } else {
        if (SoundFX.deduct) SoundFX.deduct();
        else SoundFX.pop();
      }
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
      <button class="sp-icon-pick-btn" data-icon="${ic}">
        ${WAZE_3D_MAP[ic] ? `<span class="waze-3d-gem-disc" style="width:42px;height:42px;"><img src="${WAZE_3D_MAP[ic]}" class="waze-3d-crop-img" alt="" /></span>` : ic}
      </button>
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
    const randomIcon = WAZE_DEFAULT_MOOD_KEYS[Math.floor(Math.random() * WAZE_DEFAULT_MOOD_KEYS.length)];
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
    if (confirm('האם להגריל דמויות Waze 3D מגוונות לכל תלמידי הכיתה?')) {
      const shuffled = [...WAZE_DEFAULT_MOOD_KEYS].sort(() => 0.5 - Math.random());
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
        if (SoundFX.diamondAward) SoundFX.diamondAward(pts);
        else SoundFX.bell();
      } else {
        if (SoundFX.deduct) SoundFX.deduct();
        else SoundFX.pop();
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

  // 3. DIAMOND SHOP LOGIC
  const shopView = body.querySelector('[data-el="shop-view"]');
  const SHOP_EMOJI_CHOICES = [
    'waze:shop-ticket',
    'waze:shop-chair',
    'waze:trophy-crown',
    'waze:shop-palette',
    'waze:dice',
    'waze:tool-wheel',
    'waze:star-shield',
    'waze:diamond-legend',
    'waze:birthday-cake',
    'waze:kiddush-cup',
    'waze:challah',
    'waze:pomegranate',
    'waze:sefer-torah',
    'waze:siddur',
    'waze:mood-king',
    'waze:mood-superhero'
  ];

  function saveShopItemsList() {
    state.shopItems = shopItems;
    if (window.AppStore && window.AppStore.setShopItems) {
      window.AppStore.setShopItems(shopItems);
    } else {
      saveState();
    }
  }

  function openShopVoucherModal(studentName, item, remainingTotal) {
    const existing = document.getElementById('shop-voucher-fullscreen');
    if (existing) existing.remove();
    const photo = getStudentPhoto(studentName);
    const iconHtml = renderStudentIconHtml(getStudentIcon(studentName), studentName);
    const todayStr = new Date().toLocaleDateString('he-IL');

    const overlay = document.createElement('div');
    overlay.id = 'shop-voucher-fullscreen';
    overlay.className = 'shop-voucher-overlay';
    overlay.innerHTML = `
      <div class="shop-voucher-card">
        <div class="shop-voucher-ribbon">🎟️ שובר הטבה כיתתי רשמי</div>
        <div class="shop-voucher-student">
          <div class="sp-bubble-avatar ${photo ? 'has-custom-photo' : ''}" style="width:74px;height:74px;font-size:2.1rem;cursor:default;">
            ${photo ? `<img src="${photo}" class="sp-bubble-photo-img" alt="${studentName}" />` : iconHtml}
          </div>
          <div class="shop-voucher-student-name">${studentName}</div>
        </div>
        <div class="shop-voucher-prize-box">
          <div class="shop-voucher-prize-icon">${WAZE_3D_MAP[item.icon] ? renderWaze3DMedallion(item.icon, 56) : (item.icon || '🎁')}</div>
          <div class="shop-voucher-prize-title">${item.title}</div>
          <div class="shop-voucher-cost-tag">נרכש ב-${item.cost} 💎 • יתרה מצטברת: ${remainingTotal} 💎</div>
        </div>
        <div class="shop-voucher-footer">
          <span>📅 תאריך מימוש: ${todayStr}</span>
          <button class="primary-btn" data-act="close-voucher" style="padding:8px 24px;border-radius:999px;font-weight:800;">🎉 איזה כיף! סגור שובר</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    if (typeof triggerConfetti === 'function') triggerConfetti();
    if (typeof SoundFX !== 'undefined') {
      if (SoundFX.fanfare) SoundFX.fanfare();
      else if (SoundFX.diamondAward) SoundFX.diamondAward(5);
    }
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('[data-act="close-voucher"]')) {
        overlay.remove();
      }
    });
  }

  function renderShopView() {
    if (!shopView) return;
    const students = getStudentsList();
    if (selectedShopBuyer && !students.includes(selectedShopBuyer)) {
      selectedShopBuyer = '';
    }
    const buyerScoreObj = selectedShopBuyer ? getStudentScore(selectedShopBuyer) : null;
    const buyerTotal = buyerScoreObj ? (buyerScoreObj.total || 0) : 0;

    shopView.innerHTML = `
      <div class="shop-header-banner">
        <div class="shop-header-right">
          <div class="shop-title-row">
            ${renderWaze3DMedallion('trophy-crown', 32)}
            <div style="font-weight:900;font-size:1.05rem;color:#0f172a;">חנות היהלומים</div>
          </div>
        </div>
        <div class="shop-header-actions">
          <button class="small-btn shop-add-custom-btn" data-act="toggle-add-shop-item">
            ${showAddShopForm ? '✕ סגור' : '+ הטבה חדשה'}
          </button>
          <button class="small-btn waze-action-pill" data-act="undo-shop-purchase" title="בטל רכישה אחרונה" style="background:#fef9c3;color:#92400e;font-weight:900;border:none;" ${!(window.AppStore && window.AppStore.canUndoScore && window.AppStore.canUndoScore()) ? 'disabled style="opacity:0.45;"' : ''}>↩</button>
        </div>
      </div>

      ${showAddShopForm ? `
        <div class="shop-custom-form-card">
          <div style="font-weight:800;font-size:0.9rem;color:#0f172a;margin-bottom:6px;">✨ הוספת הטבה חדשה משלך לחנות הכיתתית (בחר סמל 3D):</div>
          <div class="shop-emoji-picker-row" data-el="shop-emoji-row">
            ${SHOP_EMOJI_CHOICES.map((em, idx) => `
              <button type="button" class="shop-emoji-chip ${idx === 0 ? 'active' : ''}" data-emoji="${em}" style="padding:3px;border-radius:50%;">${renderWaze3DMedallion(em, 30)}</button>
            `).join('')}
          </div>
          <div class="shop-custom-inputs-row">
            <input type="hidden" data-el="custom-shop-icon" class="shop-input-icon" value="waze:shop-ticket" />
            <input type="text" data-el="custom-shop-title" class="shop-input-title" placeholder="שם ההטבה (למשל: בחירת מדבקה / זמן מחשב / פתיחת השיעור בחידה)..." />
            <div style="display:flex;align-items:center;gap:4px;background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:0 8px;">
              ${renderWaze3DDiamond(false, 16)}
              <input type="number" data-el="custom-shop-cost" class="shop-input-cost" value="20" min="1" max="500" />
            </div>
            <button type="button" class="primary-btn" data-act="save-custom-shop-item" style="padding:7px 16px;border-radius:10px;font-weight:800;white-space:nowrap;">💾 הוסף לחנות</button>
          </div>
        </div>
      ` : ''}

      <div class="shop-buyer-bar">
        <div style="font-weight:900;font-size:0.86rem;color:#0f172a;white-space:nowrap;">קונה:</div>
        <div class="shop-students-strip">
          ${students.map(name => {
            const sc = getStudentScore(name);
            const tot = sc.total || 0;
            const isSel = selectedShopBuyer === name;
            const photo = getStudentPhoto(name);
            const iconHtml = renderStudentIconHtml(getStudentIcon(name), name);
            return `
              <button class="shop-student-pill ${isSel ? 'active' : ''}" data-buyer="${name}">
                <span class="shop-pill-avatar">
                  ${photo ? `<img src="${photo}" alt="${name}" />` : iconHtml}
                </span>
                <span class="shop-pill-name">${name}</span>
                <span class="shop-pill-balance">${renderWaze3DDiamond(tot >= 30, 15)} <span>${tot}</span></span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div class="shop-items-grid">
        ${shopItems.map((item, idx) => {
          const canBuy = selectedShopBuyer && buyerTotal >= item.cost;
          const itemIconHtml = WAZE_3D_MAP[item.icon]
            ? renderWaze3DMedallion(item.icon, 54)
            : renderWaze3DMedallion('shop-ticket', 54);
          return `
            <div class="shop-item-card ${canBuy ? 'can-afford' : ''}" data-shop-idx="${idx}">
              <div class="shop-item-card-tools">
                <button class="shop-card-tool" data-act="edit-shop-item" data-idx="${idx}" title="ערוך הטבה או מחיר">✏️</button>
                <button class="shop-card-tool danger" data-act="delete-shop-item" data-idx="${idx}" title="מחק הטבה מהחנות">🗑️</button>
              </div>
              <div class="shop-item-icon">${itemIconHtml}</div>
              <div class="shop-item-title">${item.title}</div>
              <button class="shop-buy-btn ${canBuy ? 'ready' : 'locked'}" data-act="buy-shop-item" data-idx="${idx}" ${!canBuy ? 'disabled' : ''}>
                ${renderWaze3DDiamond(item.cost >= 30, 17)}
                <span>${item.cost}</span>
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    shopView.querySelector('[data-act="toggle-add-shop-item"]')?.addEventListener('click', () => {
      showAddShopForm = !showAddShopForm;
      renderShopView();
    });

    shopView.querySelector('[data-act="undo-shop-purchase"]')?.addEventListener('click', () => {
      if (!window.AppStore || !window.AppStore.undoLastScore) return;
      const undone = window.AppStore.undoLastScore();
      if (!undone) return;
      studentScores = window.AppStore.getStudentScores();
      state.studentScores = studentScores;
      saveState();
      if (SoundFX.undo) SoundFX.undo();
      renderShopView();
    });

    shopView.querySelectorAll('.shop-emoji-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        shopView.querySelectorAll('.shop-emoji-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const iconInp = shopView.querySelector('[data-el="custom-shop-icon"]');
        if (iconInp) iconInp.value = chip.dataset.emoji;
      });
    });

    shopView.querySelector('[data-act="save-custom-shop-item"]')?.addEventListener('click', () => {
      const iconVal = (shopView.querySelector('[data-el="custom-shop-icon"]')?.value || '🎁').trim() || '🎁';
      const titleVal = (shopView.querySelector('[data-el="custom-shop-title"]')?.value || '').trim();
      const costVal = parseInt(shopView.querySelector('[data-el="custom-shop-cost"]')?.value || '20', 10);
      if (!titleVal) {
        alert('נא להזין שם להטבה החדשה');
        return;
      }
      if (isNaN(costVal) || costVal <= 0) {
        alert('נא להזין מחיר חיובי ביהלומים');
        return;
      }
      shopItems.push({
        id: 'sh-custom-' + Date.now(),
        icon: iconVal,
        title: titleVal,
        cost: costVal
      });
      saveShopItemsList();
      showAddShopForm = false;
      if (SoundFX.pop) SoundFX.pop();
      renderShopView();
    });

    shopView.querySelectorAll('.shop-student-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const bName = btn.dataset.buyer;
        selectedShopBuyer = (selectedShopBuyer === bName) ? '' : bName;
        if (SoundFX.pop) SoundFX.pop();
        renderShopView();
      });
    });

    shopView.querySelectorAll('[data-act="edit-shop-item"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx, 10);
        const item = shopItems[idx];
        if (!item) return;
        const newTitle = prompt('שם ההטבה בחנות:', item.title);
        if (newTitle === null) return;
        const newCostStr = prompt('מחיר ביהלומים (💎):', item.cost);
        if (newCostStr === null) return;
        const newCost = parseInt(newCostStr, 10);
        if (isNaN(newCost) || newCost <= 0) return;
        item.title = newTitle.trim() || item.title;
        item.cost = newCost;
        saveShopItemsList();
        renderShopView();
      });
    });

    shopView.querySelectorAll('[data-act="delete-shop-item"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx, 10);
        const item = shopItems[idx];
        if (!item) return;
        if (confirm(`האם להסיר את "${item.title}" מחנות היהלומים?`)) {
          shopItems.splice(idx, 1);
          saveShopItemsList();
          renderShopView();
        }
      });
    });

    shopView.querySelectorAll('[data-act="buy-shop-item"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!selectedShopBuyer) return;
        const idx = parseInt(btn.dataset.idx, 10);
        const item = shopItems[idx];
        if (!item) return;
        const ok = window.AppStore.redeemStudentDiamonds(selectedShopBuyer, item.cost, item.title);
        if (!ok) {
          alert('אין מספיק יהלומים מצטברים לרכישת הטבה זו.');
          return;
        }
        studentScores = window.AppStore.getStudentScores();
        state.studentScores = studentScores;
        saveState();
        const rem = (studentScores[selectedShopBuyer]?.total) || 0;
        renderShopView();
        openShopVoucherModal(selectedShopBuyer, item, rem);
      });
    });
  }

  const onScoresUpdated = (ev) => {
    if (!document.body.contains(body)) {
      window.removeEventListener('cs:scores-updated', onScoresUpdated);
      return;
    }
    studentScores = (window.AppStore && window.AppStore.getStudentScores) ? window.AppStore.getStudentScores() : (ev.detail || studentScores);
    state.studentScores = studentScores;
    if (activeTab === 'students') {
      renderClassGoalBanner();
      renderStudentsGrid();
    } else if (activeTab === 'shop') {
      renderShopView();
    }
  };
  window.addEventListener('cs:scores-updated', onScoresUpdated);

  // Init
  populateClassSelect();
  if (activeTab === 'teams') renderTeamsBoard();
  else if (activeTab === 'shop') renderShopView();
  else {
    renderClassGoalBanner();
    renderStudentsGrid();
  }
}

const HEBREW_DAYS_GEMATRIA = [
  'א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ז׳', 'ח׳', 'ט׳', 'י׳',
  'י״א', 'י״ב', 'י״ג', 'י״ד', 'ט״ו', 'ט״ז', 'י״ז', 'י״ח', 'י״ט', 'כ׳',
  'כ״א', 'כ״ב', 'כ״ג', 'כ״ד', 'כ״ה', 'כ״ו', 'כ״ז', 'כ״ח', 'כ״ט', 'ל׳'
];

const HEBREW_MONTHS_LIST = [
  'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר', 'אדר א׳', 'אדר ב׳',
  'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול'
];

function normalizeHebMonthName(rawMonth = '') {
  const m = String(rawMonth).trim().replace(/['׳]/g, '׳');
  if (!m) return '';
  if (m.includes('חשוון') || m.includes('חשון')) return 'חשוון';
  if (m.includes('סיוון') || m.includes('סיון')) return 'סיוון';
  if (m.includes('אדר א')) return 'אדר א׳';
  if (m.includes('אדר ב')) return 'אדר ב׳';
  if (m.includes('אדר')) return 'אדר';
  const found = HEBREW_MONTHS_LIST.find(hm => m.includes(hm));
  return found || m;
}

function isSameHebrewMonth(m1, m2) {
  const a = normalizeHebMonthName(m1);
  const b = normalizeHebMonthName(m2);
  if (!a || !b) return false;
  if (a === b) return true;
  if ((a === 'אדר' && (b === 'אדר א׳' || b === 'אדר ב׳')) ||
      (b === 'אדר' && (a === 'אדר א׳' || a === 'אדר ב׳'))) {
    return true;
  }
  return false;
}

function getHebrewDateInfo(dateObj = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).formatToParts(dateObj);
    const dayVal = parts.find(p => p.type === 'day')?.value || '1';
    const monthVal = parts.find(p => p.type === 'month')?.value || 'תשרי';
    const yearVal = parts.find(p => p.type === 'year')?.value || '';
    const dayNum = parseInt(dayVal.replace(/\D/g, ''), 10) || 1;
    const dayGematria = HEBREW_DAYS_GEMATRIA[Math.max(0, Math.min(29, dayNum - 1))] || dayVal;
    const normMonth = normalizeHebMonthName(monthVal);
    return {
      dayNum,
      dayGematria,
      month: normMonth,
      year: yearVal,
      shortDisplay: `${dayGematria} ב${normMonth}`,
      fullDisplay: `${dayGematria} ב${normMonth}`
    };
  } catch (e) {
    return {
      dayNum: 1,
      dayGematria: 'א׳',
      month: 'תשרי',
      year: '',
      shortDisplay: 'א׳ בתשרי',
      fullDisplay: 'א׳ בתשרי'
    };
  }
}

function parseSavedHebrewBirthday(val) {
  if (!val) return null;
  if (typeof val === 'object' && val.hebDay && val.hebMonth) {
    return {
      hebDay: val.hebDay,
      hebMonth: normalizeHebMonthName(val.hebMonth),
      gregDate: val.gregDate || ''
    };
  }
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!trimmed) return null;
    // Check if it looks like "י״ד בניסן" or "א׳ תשרי"
    for (const hm of HEBREW_MONTHS_LIST) {
      if (trimmed.includes(hm)) {
        const dayPart = trimmed.replace(hm, '').replace(/\s+ב$/, '').replace(/\s+/g, '').replace(/ב$/, '');
        const matchedDay = HEBREW_DAYS_GEMATRIA.find(d => dayPart.includes(d)) || dayPart || 'א׳';
        return { hebDay: matchedDay, hebMonth: hm, gregDate: '' };
      }
    }
    return { hebDay: '', hebMonth: '', gregDate: trimmed };
  }
  return null;
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
silence: { wazeKey: 'mood-headphones', title: 'דממה מוחלטת', sub: 'עובדים לבד בשקט מוחלט' },
whisper: { wazeKey: 'tool-symbols', title: 'עבודה בלחישה', sub: 'מותר לדבר בקול נמוך' },
neighbor: { wazeKey: 'mood-cool', title: 'שאל חבר קרוב', sub: 'התייעצות עם השכן' },
together: { wazeKey: 'tool-groups', title: 'עבודה בקבוצות', sub: 'שיתוף פעולה קבוצתי' }
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
      <button class="ws-mini-pill ${k === current ? 'active' : ''}" data-mode="${k}" title="${v.title}" style="padding:3px;">${renderWaze3DMedallion(v.wazeKey, 26)}</button>
    `).join('')}
  </div>
</div>
`;

function updateView() {
  const m = modes[current] || modes.silence;
  body.querySelector('[data-el="icon"]').innerHTML = renderWaze3DMedallion(m.wazeKey, 76);
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
title: 'סקר והצבעה כיתתית',
icon: '📊',
defaultW: 410,
defaultH: 320,
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
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:8px;">
<input type="text" data-el="q" value="${escHtml(question)}" style="width:100%;padding:8px 10px;border-radius:10px;border:1px solid #cbd5e1;font-weight:800;font-size:0.95rem;" />
<div class="poll-bars" data-el="bars"></div>
<div style="display:flex;gap:5px;justify-content:space-between;flex-wrap:wrap;">
<button class="small-btn" data-preset="smiley">😊 הבנה</button>
<button class="small-btn" data-preset="yesno">כן/לא</button>
<button class="small-btn" data-preset="abcd">א/ב/ג/ד</button>
<button class="secondary-btn" data-act="reset" style="padding:4px 8px;font-size:0.76rem;">איפוס</button>
</div>
</div>
`;
const qInput = body.querySelector('[data-el="q"]');
const barsEl = body.querySelector('[data-el="bars"]');
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
defaultW: 440,
defaultH: 290,
render(body, state, saveState) {
const defaultHtml = `<h3>🎯 משימת השיעור:</h3><ul><li>פתחו את המחברת בעמוד 24</li><li>קראו את הקטע וענו על שאלות 1–3</li><li>בסיום – בדקו עם החבר לשולחן</li></ul>`;
const HIGHLIGHT_COLORS = [
  { label: 'צהוב מרקר', color: '#fef08a', border: '#eab308' },
  { label: 'ירוק מרקר', color: '#bbf7d0', border: '#22c55e' },
  { label: 'תכלת מרקר', color: '#bae6fd', border: '#0ea5e9' },
  { label: 'ורוד מרקר', color: '#fbcfe8', border: '#ec4899' },
  { label: 'כתום מרקר', color: '#fed7aa', border: '#f97316' }
];
let activeMarkerColor = null;
body.innerHTML = `
<div class="text-toolbar" style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">
<button class="fmt-btn" data-cmd="bold" title="הדגשה"><b>B</b></button>
<button class="fmt-btn" data-cmd="underline" title="קו תחתון"><u>U</u></button>
<button class="fmt-btn" data-cmd="insertUnorderedList" title="רשימת תבליטים">• רשימה</button>
<button class="fmt-btn" data-size="1.05rem">א-</button>
<button class="fmt-btn" data-size="1.35rem">א+</button>
<button class="fmt-btn" data-size="1.75rem">א++</button>
<input type="color" data-el="color" value="#0f172a" title="צבע טקסט" style="width:24px;height:24px;border:none;background:none;cursor:pointer;" />
<span style="width:1px;height:18px;background:#cbd5e1;margin:0 2px;"></span>
<span style="font-size:0.74rem;font-weight:800;color:#475569;">🖍️ מרקר:</span>
${HIGHLIGHT_COLORS.map(h => `
  <button type="button" class="text-marker-swatch" data-hl="${h.color}" title="${h.label} (סמן טקסט או הפעל מרקר רציף)" style="width:20px;height:20px;border-radius:50%;background:${h.color};border:2px solid ${h.border};cursor:pointer;box-shadow:0 2px 0 rgba(15,23,42,0.15);transition:transform 0.14s ease;"></button>
`).join('')}
<button type="button" class="fmt-btn" data-act="clear-hl" title="הסר מרקר מטקסט מסומן" style="font-size:0.72rem;padding:2px 6px;">🧹 נקה מרקר</button>
</div>
<div class="rich-text-area" contenteditable="true" data-el="editor">${state.html ?? defaultHtml}</div>
`;
const editor = body.querySelector('[data-el="editor"]');
if (state.fontSize) editor.style.fontSize = state.fontSize;

function applyHighlightToSelection(color) {
  editor.focus();
  if (!document.execCommand('hiliteColor', false, color)) {
    document.execCommand('backColor', false, color);
  }
  state.html = editor.innerHTML;
  saveState();
}

body.querySelectorAll('[data-hl]').forEach(btn => {
  btn.addEventListener('mousedown', (e) => {
    e.preventDefault(); // preserve text selection inside editor
  });
  btn.addEventListener('click', () => {
    const color = btn.dataset.hl;
    const sel = window.getSelection();
    const hasSelection = sel && !sel.isCollapsed && editor.contains(sel.anchorNode);
    if (hasSelection) {
      applyHighlightToSelection(color);
    } else {
      activeMarkerColor = (activeMarkerColor === color) ? null : color;
      body.querySelectorAll('.text-marker-swatch').forEach(b => {
        b.style.transform = (b.dataset.hl === activeMarkerColor) ? 'scale(1.25) translateY(-2px)' : '';
        b.style.outline = (b.dataset.hl === activeMarkerColor) ? '2px solid #0f172a' : 'none';
      });
    }
  });
});

const clearHlBtn = body.querySelector('[data-act="clear-hl"]');
clearHlBtn.addEventListener('mousedown', (e) => e.preventDefault());
clearHlBtn.addEventListener('click', () => {
  activeMarkerColor = null;
  body.querySelectorAll('.text-marker-swatch').forEach(b => {
    b.style.transform = '';
    b.style.outline = 'none';
  });
  applyHighlightToSelection('transparent');
});

editor.addEventListener('mouseup', () => {
  if (!activeMarkerColor) return;
  const sel = window.getSelection();
  if (sel && !sel.isCollapsed && editor.contains(sel.anchorNode)) {
    applyHighlightToSelection(activeMarkerColor);
  }
});

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
title: 'לוח שנה עברי ולועזי',
icon: '📅',
defaultW: 390,
defaultH: 360,
render(body) {
let viewDate = new Date();
body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:6px;">
  <div style="display:flex;align-items:center;justify-content:space-between;gap:4px;">
    <button class="small-btn" data-act="prev">◀</button>
    <div style="text-align:center;">
      <div data-el="heb-month-title" style="font-weight:900;font-size:0.98rem;color:var(--primary);"></div>
      <div data-el="month-title" style="font-weight:700;font-size:0.74rem;color:var(--text-muted);"></div>
    </div>
    <button class="small-btn" data-act="next">▶</button>
  </div>
  <div style="display:grid;grid-template-columns:repeat(7,1fr);text-align:center;font-weight:800;font-size:0.76rem;color:var(--primary);">
    <span>א׳</span><span>ב׳</span><span>ג׳</span><span>ד׳</span><span>ה׳</span><span>ו׳</span><span>ש׳</span>
  </div>
  <div data-el="days" style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;flex:1;text-align:center;"></div>
</div>
`;
const hebTitleEl = body.querySelector('[data-el="heb-month-title"]');
const titleEl = body.querySelector('[data-el="month-title"]');
const daysEl = body.querySelector('[data-el="days"]');
function renderCal() {
  const y = viewDate.getFullYear();
  const m = viewDate.getMonth();
  titleEl.textContent = viewDate.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' });
  const firstDate = new Date(y, m, 1);
  const lastDate = new Date(y, m + 1, 0);
  const firstHeb = getHebrewDateInfo(firstDate);
  const lastHeb = getHebrewDateInfo(lastDate);
  hebTitleEl.textContent = firstHeb.month === lastHeb.month
    ? `${firstHeb.month} ${firstHeb.year}`
    : `${firstHeb.month} – ${lastHeb.month} ${lastHeb.year}`;

  const bdaysMap = (window.AppStore && window.AppStore.getStudentBirthdays) ? window.AppStore.getStudentBirthdays() : {};
  const firstDay = firstDate.getDay();
  const daysInMonth = lastDate.getDate();
  const today = new Date();
  let html = '';
  for (let i = 0; i < firstDay; i++) html += `<div></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(y, m, d);
    const heb = getHebrewDateInfo(cellDate);
    const isToday = d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
    const celebrants = Object.entries(bdaysMap).filter(([, val]) => {
      const parsed = parseSavedHebrewBirthday(val);
      return parsed && parsed.hebDay === heb.dayGematria && isSameHebrewMonth(parsed.hebMonth, heb.month);
    }).map(([name]) => name);
    const hasBday = celebrants.length > 0;
    html += `
      <div title="${heb.shortDisplay}${hasBday ? ' • 🎂 יום הולדת: ' + celebrants.join(', ') : ''}" style="display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:8px;padding:2px;position:relative;${isToday ? 'background:var(--primary);color:#fff;box-shadow:0 2px 8px rgba(79,70,229,0.35);' : (hasBday ? 'background:#fef3c7;border:1px solid #f59e0b;' : 'background:rgba(0,0,0,0.03);')}">
        <span style="font-weight:900;font-size:0.82rem;line-height:1.1;">${heb.dayGematria}</span>
        <span style="font-size:0.64rem;opacity:0.72;line-height:1;">${d}</span>
        ${hasBday ? `<span style="position:absolute;top:1px;left:2px;font-size:0.62rem;">🎂</span>` : ''}
      </div>
    `;
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
const onBdaysUpdated = () => {
  if (!document.body.contains(body)) {
    window.removeEventListener('cs:birthdays-updated', onBdaysUpdated);
    return;
  }
  renderCal();
};
window.addEventListener('cs:birthdays-updated', onBdaysUpdated);
return () => window.removeEventListener('cs:birthdays-updated', onBdaysUpdated);
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
defaultW: 380,
defaultH: 340,
render(body) {
const stickers = [
{ wazeKey: 'trophy-crown', text: 'אלופים! כל הכבוד!' },
{ wazeKey: 'star-shield', text: 'עבודה נהדרת!' },
{ wazeKey: 'mood-king', text: 'הקשבה מצוינת!' },
{ wazeKey: 'mood-astronaut', text: 'התקדמות מדהימה!' },
{ wazeKey: 'diamond-legend', text: 'כיתה מצטיינת!' },
{ wazeKey: 'mood-superhero', text: 'גיבורי הכיתה!' },
{ wazeKey: 'shabbat-candles', text: 'שבת שלום ומבורך!' },
{ wazeKey: 'challah', text: 'עונג שבת קודש!' },
{ wazeKey: 'kiddush-cup', text: 'יישר כוח עצום!' },
{ wazeKey: 'sefer-torah', text: 'כתר תורה!' },
{ wazeKey: 'pomegranate', text: 'מלאים מצוות כרימון!' },
{ wazeKey: 'chanukiah', text: 'אור גדול בכיתה!' }
];
body.innerHTML = `
<div class="stickers-grid">
${stickers.map((s, i) => `
<button class="sticker-badge-btn" data-idx="${i}">
<span class="sticker-emoji">${renderWaze3DMedallion(s.wazeKey, 40)}</span>
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
<div>${renderWaze3DMedallion(s.wazeKey, 108)}</div>
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
defaultW: 560,
defaultH: 430,
render(body, state, saveState) {
let url = state.url ?? 'https://he.wikipedia.org/wiki/עמוד_ראשי';
const EMBED_MARKERS = [
  { label: 'מרקר צהוב', rgba: 'rgba(250, 204, 21, 0.42)', solid: '#facc15' },
  { label: 'מרקר ירוק', rgba: 'rgba(74, 222, 128, 0.42)', solid: '#4ade80' },
  { label: 'מרקר תכלת', rgba: 'rgba(56, 189, 248, 0.42)', solid: '#38bdf8' },
  { label: 'מרקר ורוד', rgba: 'rgba(244, 114, 182, 0.42)', solid: '#f472b6' },
  { label: 'מרקר כתום', rgba: 'rgba(251, 146, 60, 0.42)', solid: '#fb923c' }
];
let markerMode = false;
let isEraser = false;
let straightLine = true;
let activeColor = EMBED_MARKERS[0].rgba;

body.innerHTML = `
<div style="display:flex;flex-direction:column;height:100%;gap:8px;">
  <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
    <input type="text" data-el="url" value="${url}" placeholder="הדבק כתובת אתר להצגה..." style="flex:1;min-width:160px;padding:6px 10px;border-radius:12px;border:2px solid #cbd5e1;direction:ltr;font-size:0.84rem;font-weight:700;" />
    <button class="primary-btn" data-act="go" style="padding:5px 12px;">פתח</button>
    <button class="small-btn" data-act="toggle-marker" style="background:#fef9c3;color:#854d0e;border-color:#fde047 !important;">🖍️ מרקר על האתר</button>
  </div>
  <div data-el="marker-bar" class="hidden" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;background:#f8fafc;padding:6px 10px;border-radius:16px;border:2px solid #e2e8f0;">
    <span style="font-size:0.76rem;font-weight:900;color:#334155;">צבע מרקר:</span>
    ${EMBED_MARKERS.map((m, idx) => `
      <button type="button" class="embed-marker-dot ${idx === 0 ? 'active' : ''}" data-rgba="${m.rgba}" title="${m.label}" style="width:22px;height:22px;border-radius:50%;background:${m.solid};border:2.5px solid #ffffff;box-shadow:0 2px 0 #cbd5e1;cursor:pointer;${idx === 0 ? 'outline:2px solid #0f172a;transform:scale(1.15);' : ''}"></button>
    `).join('')}
    <button type="button" class="small-btn" data-act="toggle-straight" title="קו מרקר ישר אוטומטית לשורות טקסט" style="font-size:0.74rem;padding:3px 9px;background:#e0f2fe;color:#0369a1;">📏 קו ישר: פעיל</button>
    <button type="button" class="small-btn" data-act="marker-eraser" style="font-size:0.74rem;padding:3px 9px;">🧹 מחק</button>
    <button type="button" class="small-btn" data-act="marker-clear" style="font-size:0.74rem;padding:3px 9px;">🗑️ נקה הכל</button>
    <span style="font-size:0.72rem;color:#64748b;margin-right:auto;">💡 כבה את המרקר כדי לגלול באתר</span>
  </div>
  <div data-el="stage" style="flex:1;position:relative;width:100%;border:2px solid #cbd5e1;border-radius:16px;background:#fff;overflow:hidden;">
    <iframe data-el="iframe" src="${url}" style="width:100%;height:100%;border:none;background:#fff;display:block;"></iframe>
    <canvas data-el="hl-canvas" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;cursor:crosshair;z-index:5;"></canvas>
  </div>
</div>
`;
const inp = body.querySelector('[data-el="url"]');
const iframe = body.querySelector('[data-el="iframe"]');
const stage = body.querySelector('[data-el="stage"]');
const canvas = body.querySelector('[data-el="hl-canvas"]');
const ctx = canvas.getContext('2d');
const toggleMarkerBtn = body.querySelector('[data-act="toggle-marker"]');
const markerBar = body.querySelector('[data-el="marker-bar"]');
const straightBtn = body.querySelector('[data-act="toggle-straight"]');
const eraserBtn = body.querySelector('[data-act="marker-eraser"]');

let drawing = false;
let startX = 0;
let startY = 0;
let snapshotImg = null;

function resizeEmbedCanvas() {
  const rect = stage.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;
  const prevUrl = state.highlightDataUrl || (canvas.width > 0 ? canvas.toDataURL() : null);
  canvas.width = rect.width;
  canvas.height = rect.height;
  if (prevUrl) {
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = prevUrl;
  }
}
setTimeout(resizeEmbedCanvas, 60);
const ro = new ResizeObserver(() => resizeEmbedCanvas());
ro.observe(stage);

body.querySelector('[data-act="go"]').addEventListener('click', () => {
  let u = inp.value.trim();
  if (u && !/^https?:\/\//i.test(u)) u = 'https://' + u;
  iframe.src = u;
  state.url = u;
  saveState();
});

toggleMarkerBtn.addEventListener('click', () => {
  markerMode = !markerMode;
  canvas.style.pointerEvents = markerMode ? 'auto' : 'none';
  markerBar.classList.toggle('hidden', !markerMode);
  toggleMarkerBtn.innerHTML = markerMode ? '👆 חזור לגלילה באתר' : '🖍️ מרקר על האתר';
  toggleMarkerBtn.style.background = markerMode ? '#dcfce7' : '#fef9c3';
  toggleMarkerBtn.style.color = markerMode ? '#166534' : '#854d0e';
});

body.querySelectorAll('.embed-marker-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    isEraser = false;
    eraserBtn.style.background = '';
    activeColor = dot.dataset.rgba;
    body.querySelectorAll('.embed-marker-dot').forEach(d => {
      d.style.outline = 'none';
      d.style.transform = '';
    });
    dot.style.outline = '2px solid #0f172a';
    dot.style.transform = 'scale(1.15)';
  });
});

straightBtn.addEventListener('click', () => {
  straightLine = !straightLine;
  straightBtn.textContent = straightLine ? '📏 קו ישר: פעיל' : '〰️ קו חופשי';
  straightBtn.style.background = straightLine ? '#e0f2fe' : '#f1f5f9';
});

eraserBtn.addEventListener('click', () => {
  isEraser = !isEraser;
  eraserBtn.style.background = isEraser ? '#fee2e2' : '';
});

body.querySelector('[data-act="marker-clear"]').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  state.highlightDataUrl = null;
  saveState();
});

canvas.addEventListener('pointerdown', (e) => {
  if (!markerMode) return;
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;
  snapshotImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(startX, startY);
});

canvas.addEventListener('pointermove', (e) => {
  if (!drawing || !markerMode) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (isEraser) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 30;
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (straightLine) {
    // Restore pre-stroke canvas so highlighter doesn't stack alpha opacity while dragging!
    if (snapshotImg) ctx.putImageData(snapshotImg, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, startY); // horizontal straight text highlight line
    ctx.stroke();
  } else {
    if (snapshotImg) ctx.putImageData(snapshotImg, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = 22;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
});

window.addEventListener('pointerup', () => {
  if (!drawing) return;
  drawing = false;
  ctx.globalCompositeOperation = 'source-over';
  state.highlightDataUrl = canvas.toDataURL();
  saveState();
});

return () => ro.disconnect();
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
  { id: 'computer', title: 'תורן מחשב', icon: renderWaze3DMedallion('tool-webcam', 24) },
  { id: 'cleaning', title: 'תורן ניקיון', icon: renderWaze3DMedallion('star-shield', 24) },
  { id: 'chairs', title: 'תורן הרמת כיסאות', icon: renderWaze3DMedallion('shop-chair', 24) },
  { id: 'board', title: 'תורן לוח', icon: renderWaze3DMedallion('tool-text-draw', 24) },
  { id: 'errands', title: 'תורן שליחויות', icon: renderWaze3DMedallion('mood-superhero', 24) }
];

const HEBREW_DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

// Load global persistent duty roster state so closing/reopening the widget never resets rounds or history!
const globalDutyState = (window.AppStore && typeof window.AppStore.getDutyRosterState === 'function')
  ? window.AppStore.getDutyRosterState()
  : {};
if (globalDutyState && typeof globalDutyState === 'object' && Object.keys(globalDutyState).length > 0) {
  Object.assign(state, globalDutyState);
}

function saveDutyState() {
  if (window.AppStore && typeof window.AppStore.setDutyRosterState === 'function') {
    window.AppStore.setDutyRosterState({
      classId: state.classId,
      dayOff: state.dayOff,
      rolePools: state.rolePools,
      roleRounds: state.roleRounds,
      roleHistory: state.roleHistory,
      globalRound: state.globalRound,
      globalServed: state.globalServed,
      assignments: state.assignments,
      substitutes: state.substitutes,
      lastAssignedDate: state.lastAssignedDate,
      forceDutyToday: state.forceDutyToday
    });
  } else {
    saveState();
  }
}

if (state.dayOff === undefined) state.dayOff = 2; // יום שלישי כברירת מחדל
if (!state.rolePools || typeof state.rolePools !== 'object') state.rolePools = {};
if (!state.roleRounds || typeof state.roleRounds !== 'object') state.roleRounds = {};
if (!state.roleHistory || typeof state.roleHistory !== 'object') state.roleHistory = {};
if (typeof state.globalRound !== 'number') state.globalRound = 1;
if (!Array.isArray(state.globalServed)) state.globalServed = [];
DUTY_ROLES.forEach(r => {
  if (!Array.isArray(state.rolePools[r.id])) state.rolePools[r.id] = [];
  if (!Array.isArray(state.roleHistory[r.id])) state.roleHistory[r.id] = [];
  if (typeof state.roleRounds[r.id] !== 'number') state.roleRounds[r.id] = 1;
});
if (!state.assignments) state.assignments = {};
if (!state.substitutes) state.substitutes = {};

let showSettings = false;
let activeModalRole = null;
let justReplacedRole = null;

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

  // Clean up globalServed and roleHistory for students still in the class
  state.globalServed = (state.globalServed || []).filter(s => allStudents.includes(s));

  const assignedToday = [];
  const newAssignments = {};

  DUTY_ROLES.forEach(role => {
    let history = (state.roleHistory[role.id] || []).filter(s => allStudents.includes(s));

    // 1. Best candidates: students who haven't served ANY duty in the current global round AND haven't done this role in its round AND aren't assigned today
    let candidates = allStudents.filter(s =>
      !assignedToday.includes(s) &&
      !state.globalServed.includes(s) &&
      !history.includes(s)
    );

    // 2. If none, students who haven't served ANY duty in the current global round and aren't assigned today
    if (candidates.length === 0) {
      candidates = allStudents.filter(s =>
        !assignedToday.includes(s) &&
        !state.globalServed.includes(s)
      );
    }

    // 3. If every available student has already been a duty officer in the current global round -> start a NEW global round!
    if (candidates.length === 0) {
      state.globalRound = (state.globalRound || 1) + 1;
      state.globalServed = [];
      // Now pick someone who hasn't done this specific role yet (if possible)
      candidates = allStudents.filter(s =>
        !assignedToday.includes(s) &&
        !history.includes(s)
      );
    }

    // 4. If all students have already done this specific role too -> start a new round for this role
    if (candidates.length === 0) {
      state.roleRounds[role.id] = (state.roleRounds[role.id] || 1) + 1;
      history = [];
      candidates = allStudents.filter(s => !assignedToday.includes(s));
    }

    // 5. Fallback if class has fewer than 5 students total
    if (candidates.length === 0) {
      candidates = [...allStudents];
    }

    const shuffled = shuffle(candidates);
    const chosenStudent = shuffled[0] || '';
    newAssignments[role.id] = chosenStudent;

    if (chosenStudent) {
      assignedToday.push(chosenStudent);
      if (!state.globalServed.includes(chosenStudent)) {
        state.globalServed.push(chosenStudent);
      }
      if (!history.includes(chosenStudent)) {
        history.push(chosenStudent);
      }
    }
    state.roleHistory[role.id] = history;
    // Update rolePools to reflect remaining students who haven't done this role in this round
    state.rolePools[role.id] = allStudents.filter(s => !history.includes(s));
  });

  state.assignments = newAssignments;
  state.substitutes = {};
  state.lastAssignedDate = todayStr;
  state.forceDutyToday = false;
  saveDutyState();
}

function replaceDuty(roleId, newStudent) {
  const curStudent = state.assignments[roleId];
  if (!curStudent || !newStudent || curStudent === newStudent) return;

  if (!Array.isArray(state.roleHistory[roleId])) state.roleHistory[roleId] = [];
  if (!Array.isArray(state.globalServed)) state.globalServed = [];

  // The absent student didn't actually serve today -> remove them from globalServed & roleHistory so they get their turn next!
  state.globalServed = state.globalServed.filter(s => s !== curStudent);
  state.roleHistory[roleId] = state.roleHistory[roleId].filter(s => s !== curStudent);

  // Mark the substitute student as having served
  if (!state.globalServed.includes(newStudent)) {
    state.globalServed.push(newStudent);
  }
  if (!state.roleHistory[roleId].includes(newStudent)) {
    state.roleHistory[roleId].push(newStudent);
  }

  const allStudents = getClassStudents();
  state.rolePools[roleId] = allStudents.filter(s => !state.roleHistory[roleId].includes(s));

  state.assignments[roleId] = newStudent;
  state.substitutes[roleId] = {
    original: curStudent,
    sub: newStudent,
    time: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
  };
  saveDutyState();
}

function drawRandomSubstitute(roleId) {
  const curStudent = state.assignments ? state.assignments[roleId] : '';
  const allStudents = getClassStudents();
  const assignedOthers = Object.values(state.assignments || {}).filter(s => s && s !== curStudent);
  const history = state.roleHistory?.[roleId] || [];
  const globalServed = state.globalServed || [];

  // 1. Prefer students who haven't served ANY duty in this global round AND aren't on another duty today
  let candidates = allStudents.filter(s =>
    s !== curStudent &&
    !assignedOthers.includes(s) &&
    !globalServed.includes(s)
  );
  // 2. Fallback: students who haven't done this specific role yet and aren't on another duty today
  if (candidates.length === 0) {
    candidates = allStudents.filter(s =>
      s !== curStudent &&
      !assignedOthers.includes(s) &&
      !history.includes(s)
    );
  }
  // 3. Fallback: any student in class not on another duty today
  if (candidates.length === 0) {
    candidates = allStudents.filter(s => s !== curStudent && !assignedOthers.includes(s));
  }
  // 4. Final fallback: anyone else in class
  if (candidates.length === 0) {
    candidates = allStudents.filter(s => s !== curStudent);
  }
  if (candidates.length === 0) return null;

  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  replaceDuty(roleId, picked);
  return picked;
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
        <div class="duty-round-pill" title="אף תלמיד לא ישובץ שוב עד שכל תלמידי הכיתה יהיו תורנים בסבב">
          <span>סבב ${state.globalRound || 1} • נותרו ${Math.max(0, totalStudents - (state.globalServed || []).filter(s => allStudents.includes(s)).length)}/${totalStudents}</span>
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
            <button class="duty-mini-btn" data-act="next-day-rotation" style="background:#e0f2fe;color:#0284c7;font-weight:800;">⏭️ תורנים חדשים (הבא בסבב)</button>
            <button class="duty-mini-btn" data-act="reroll-today">🎲 ערבב מחדש להיום</button>
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
              <div class="duty-role-item ${sub ? 'is-substitute' : ''} ${justReplacedRole === role.id ? 'duty-just-replaced' : ''}">
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
                <div class="duty-row-actions">
                  <button class="duty-replace-btn duty-random-btn" data-act="random-sub" data-role="${role.id}" title="הגרל תורן מחליף (הנוכחי יחזור לסבב)">
                    ${renderWaze3DMedallion('dice', 16)} <span>הגרל</span>
                  </button>
                  <button class="duty-replace-btn" data-act="open-sub" data-role="${role.id}" title="בחר מחליף ידנית">
                    🔄
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="duty-footer">
          <button class="duty-reward-btn" data-act="reward-duty" title="הענק נקודת יהלום לכל תורני היום">
            ${renderWaze3DDiamond(false, 18)} <span>+1 לתורנים</span>
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
      state.roleHistory = {};
      state.globalRound = 1;
      state.globalServed = [];
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
      saveDutyState();
      renderUI();
    });
  }

  const nextDayBtn = body.querySelector('[data-act="next-day-rotation"]');
  if (nextDayBtn) {
    nextDayBtn.addEventListener('click', () => {
      performDailyRotation(true);
      if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
      renderUI();
    });
  }

  const rerollBtn = body.querySelector('[data-act="reroll-today"]');
  if (rerollBtn) {
    rerollBtn.addEventListener('click', () => {
      // Remove today's current assignments from globalServed/roleHistory before re-drawing today so today's replaced students aren't skipped!
      const curAssigned = Object.entries(state.assignments || {});
      curAssigned.forEach(([rId, stName]) => {
        if (!stName) return;
        state.globalServed = (state.globalServed || []).filter(s => s !== stName);
        if (Array.isArray(state.roleHistory?.[rId])) {
          state.roleHistory[rId] = state.roleHistory[rId].filter(s => s !== stName);
        }
      });
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
        state.roleHistory = {};
        state.globalRound = 1;
        state.globalServed = [];
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

  body.querySelectorAll('[data-act="random-sub"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const roleId = btn.dataset.role;
      const picked = drawRandomSubstitute(roleId);
      if (picked) {
        justReplacedRole = roleId;
        if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
        renderUI();
        setTimeout(() => {
          justReplacedRole = null;
        }, 1200);
      } else {
        alert('לא נמצאו תלמידים פנויים להחלפה.');
      }
    });
  });

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
      const roleId = activeModalRole;
      const subCandidate = drawRandomSubstitute(roleId);
      if (subCandidate) {
        justReplacedRole = roleId;
        activeModalRole = null;
        if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
        renderUI();
        setTimeout(() => { justReplacedRole = null; }, 1200);
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
        const roleId = activeModalRole;
        replaceDuty(roleId, sel.value);
        justReplacedRole = roleId;
        activeModalRole = null;
        if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
        renderUI();
        setTimeout(() => { justReplacedRole = null; }, 1200);
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
},
'emotion-checkin': {
  title: 'מד רגשות ושיח בוקר',
  icon: '💛',
  defaultW: 560,
  defaultH: 540,
  render(body, state, saveState) {
    const EMOTIONS = [
      { id: 'happy', icon: renderWaze3DMedallion('mood-cool', 26), label: 'שמח/ה ורגוע/ה', short: 'שמח/ה', color: '#10b981', glow: 'rgba(16, 185, 129, 0.75)', bg: '#ecfdf5' },
      { id: 'excited', icon: renderWaze3DMedallion('mood-star', 26), label: 'נרגש/ת ומלא/ת אנרגיה', short: 'נרגש/ת', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.8)', bg: '#fffbeb' },
      { id: 'tired', icon: renderWaze3DMedallion('mood-headphones', 26), label: 'עייף/ה היום', short: 'עייף/ה', color: '#6366f1', glow: 'rgba(99, 102, 241, 0.75)', bg: '#eef2ff' },
      { id: 'confused', icon: renderWaze3DMedallion('mood-detective', 26), label: 'מהורהר/ת או מוטרד/ת', short: 'מהורהר/ת', color: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.75)', bg: '#f0f9ff' },
      { id: 'share', icon: renderWaze3DMedallion('mood-superhero', 26), label: 'רוצה לשתף!', short: 'רוצה לשתף!', color: '#ec4899', glow: 'rgba(236, 72, 153, 0.88)', bg: '#fdf2f8' }
    ];

    const MORNING_QUESTIONS = [
      'משהו קטן ששימח אותי השבוע או הבוקר הוא...',
      'למי בכיתה הייתי רוצה להגיד תודה היום, ועל מה?',
      'מתי הרגשתי גאווה בעצמי לאחרונה?',
      'מה עוזר לי להירגע ולהרגיש טוב כשקצת קשה לי?',
      'מעשה טוב שעשיתי או שראיתי חבר/ה עושה השבוע',
      'דבר אחד שאני מצפה לו במיוחד היום או השבוע',
      'אם הרגש שלי הבוקר היה מזג אוויר – איזה מזג אוויר הוא היה?',
      'מה נותן לי כוח ואנרגיה בבוקר?',
      'מחמאה שהייתי רוצה לתת לחבר או חברה בכיתה',
      'משהו חדש שלמדתי לאחרונה וסיקרן אותי',
      'איך אפשר לעזור לחבר/ה שנראה שקצת עצוב לו היום?',
      'רגע מצחיק או כיפי שהיה לי בימים האחרונים'
    ];

    const todayStr = new Date().toLocaleDateString('sv-SE');
    if (state.lastEmotionDate !== todayStr) {
      state.studentEmotions = {};
      state.sharedToday = {};
      state.lastEmotionDate = todayStr;
      state.questionIdx = Math.floor(Math.random() * MORNING_QUESTIONS.length);
      saveState();
    }

    if (!state.studentEmotions || typeof state.studentEmotions !== 'object') state.studentEmotions = {};
    if (!state.sharedToday || typeof state.sharedToday !== 'object') state.sharedToday = {};
    if (typeof state.questionIdx !== 'number') state.questionIdx = 0;

    let selectedClassId = state.classId || (window.AppStore && window.AppStore.getSelectedClassId ? window.AppStore.getSelectedClassId() : null);
    let activeFilter = 'all';
    let selectedStudent = null;
    let spotlightStudent = null;

    function getClassLists() {
      return (window.AppStore && window.AppStore.getClassLists) ? window.AppStore.getClassLists() : [];
    }

    function getStudents() {
      const lists = getClassLists();
      const found = lists.find(c => c.id === selectedClassId) || lists[0];
      return (found ? found.students : []).filter(Boolean);
    }

    function getStudentAvatarInner(name) {
      const photos = (window.AppStore && window.AppStore.getStudentPhotos) ? window.AppStore.getStudentPhotos() : {};
      const icons = (window.AppStore && window.AppStore.getStudentIcons) ? window.AppStore.getStudentIcons() : {};
      if (photos[name]) {
        return `<img src="${photos[name]}" alt="${name}" class="sp-bubble-photo-img" />`;
      }
      return window.renderStudentIconHtml ? window.renderStudentIconHtml(icons[name], name) : '⭐';
    }

    function computeWeatherSummary(students) {
      const counts = { happy: 0, excited: 0, tired: 0, confused: 0, share: 0 };
      let totalChecked = 0;
      students.forEach(s => {
        const em = state.studentEmotions[s];
        if (em && counts[em] !== undefined) {
          counts[em]++;
          totalChecked++;
        }
      });
      let weatherText = '🌤️ בוקר חדש בכיתה – לחצו על תלמיד לבחירת רגש';
      if (totalChecked > 0) {
        if (counts.share >= 3) weatherText = '🙋‍♂️ בוקר של שיתופים ושיח כיתתי!';
        else if (counts.excited >= counts.happy && counts.excited > 0) weatherText = '🌈 מזג אוויר כיתתי: אנרגטי ונרגש!';
        else if (counts.happy >= totalChecked * 0.4) weatherText = '☀️ מזג אוויר כיתתי: שמשי, שמח ורגוע!';
        else if (counts.tired >= totalChecked * 0.4) weatherText = '☁️ מזג אוויר כיתתי: רגוע ושקט (קצת עייפים הבוקר)';
        else weatherText = '🌤️ מזג אוויר כיתתי: מגוון ופתוח להקשבה';
      }
      return { counts, totalChecked, weatherText };
    }

    function renderUI() {
      const lists = getClassLists();
      const students = getStudents();
      const { counts, totalChecked, weatherText } = computeWeatherSummary(students);
      const curQuestion = MORNING_QUESTIONS[state.questionIdx % MORNING_QUESTIONS.length];

      const filteredStudents = activeFilter === 'all'
        ? students
        : students.filter(s => state.studentEmotions[s] === activeFilter);

      body.innerHTML = `
        <div class="em-arena-container">
          <!-- Top Bar: Class selector, Weather Summary & Reset -->
          <div class="em-top-toolbar">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <select data-el="em-class-sel" class="em-class-sel">
                ${lists.map(c => `<option value="${c.id}" ${c.id === selectedClassId ? 'selected' : ''}>${c.name} (${c.students.length})</option>`).join('')}
              </select>
              <span class="em-weather-pill">${weatherText}</span>
              <span class="em-count-pill">שיתפו היום: <b>${totalChecked} / ${students.length}</b></span>
            </div>
            <button class="small-btn" data-act="reset-emotions" style="font-weight:700;">↺ איפוס בוקר חדש</button>
          </div>

          <!-- Part 3: Daily Emotional Question & Sharing Spotlight -->
          <div class="em-question-card">
            <div class="em-question-main">
              <div class="em-question-badge">💬 שאלת הבוקר לשיח רגשי</div>
              <div class="em-question-text">"${curQuestion}"</div>
            </div>
            <div class="em-question-actions">
              <button class="em-action-btn secondary" data-act="next-question" title="הגרל שאלת שיח אחרת">🎲 החלף שאלה</button>
              <button class="em-action-btn primary" data-act="pick-sharer" title="הגרל תלמיד לשיתוף (עדיפות למי שסימן 'רוצה לשתף!')">🙋‍♂️ הגרל תלמיד לשיתוף (${counts.share > 0 ? `${counts.share} רוצים לשתף` : 'מהכיתה'})</button>
            </div>
          </div>

          ${spotlightStudent ? (() => {
            const emObj = EMOTIONS.find(e => e.id === state.studentEmotions[spotlightStudent]);
            const alreadyRewarded = Boolean(state.sharedToday[spotlightStudent]);
            return `
              <div class="em-spotlight-banner">
                <div class="em-spotlight-left">
                  <div class="em-spotlight-avatar" style="border-color:${emObj ? emObj.color : '#ec4899'};">
                    ${getStudentAvatarInner(spotlightStudent)}
                  </div>
                  <div>
                    <div class="em-spotlight-name">🎤 הבמה של ${spotlightStudent}!</div>
                    <div class="em-spotlight-sub">${emObj ? `${emObj.icon} ${emObj.label}` : 'משתף/ת בשאלת הבוקר'}</div>
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <button class="em-reward-share-btn ${alreadyRewarded ? 'rewarded' : ''}" data-act="reward-sharer" data-student="${spotlightStudent}">
                    ${alreadyRewarded ? '✓ הוענק יהלום על שיתוף!' : '💎 פרגן יהלום על שיתוף (+1)'}
                  </button>
                  <button class="small-btn" data-act="close-spotlight">✕</button>
                </div>
              </div>
            `;
          })() : ''}

          <!-- Part 1: Emotion Bubbles Filter Strip -->
          <div class="em-filter-strip">
            <button class="em-filter-pill ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">
              <span>✨ כל הכיתה</span>
              <span class="em-pill-num">${students.length}</span>
            </button>
            ${EMOTIONS.map(em => `
              <button class="em-filter-pill ${activeFilter === em.id ? 'active' : ''}" data-filter="${em.id}" style="--em-color:${em.color};">
                <span style="font-size:1.15rem;">${em.icon}</span>
                <span>${em.short}</span>
                <span class="em-pill-num">${counts[em.id] || 0}</span>
              </button>
            `).join('')}
          </div>

          <!-- Students Emotion Map Grid -->
          <div class="sp-grid em-students-grid">
            ${filteredStudents.length === 0 ? `
              <div style="grid-column:1/-1;text-align:center;padding:28px;color:#fff;font-weight:700;text-shadow:0 2px 6px rgba(0,0,0,0.4);">
                אין תלמידים בקטגוריה זו כרגע
              </div>
            ` : filteredStudents.map(name => {
              const emId = state.studentEmotions[name];
              const emObj = EMOTIONS.find(e => e.id === emId);
              const hasPhoto = Boolean(window.AppStore && window.AppStore.getStudentPhotos && window.AppStore.getStudentPhotos()[name]);
              return `
                <div class="sp-student-bubble em-student-card ${emObj ? 'has-emotion' : ''} ${emId === 'share' ? 'wants-to-share' : ''}" data-student="${name}" style="${emObj ? `--em-color:${emObj.color};--em-glow:${emObj.glow};` : ''}">
                  <div class="sp-bubble-avatar-wrap">
                    <div class="sp-bubble-avatar ${hasPhoto ? 'has-custom-photo' : ''}">
                      ${getStudentAvatarInner(name)}
                    </div>
                    ${emObj ? `
                      <span class="em-student-badge" style="background:${emObj.color};">${emObj.icon} ${emObj.short}</span>
                    ` : `
                      <span class="em-student-badge empty">איך אני מרגיש/ה?</span>
                    `}
                  </div>
                  <div class="sp-bubble-name" title="${name}">${name}</div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Emotion Picker Drawer (Opens on clicking a student) -->
          <div class="sp-drawer em-picker-drawer ${selectedStudent ? '' : 'hidden'}">
            ${selectedStudent ? (() => {
              const curEm = state.studentEmotions[selectedStudent];
              const alreadyRewarded = Boolean(state.sharedToday[selectedStudent]);
              return `
                <div class="sp-drawer-header">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <div style="width:44px;height:44px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#f0f9ff;border:2px solid #38bdf8;font-size:1.5rem;">
                      ${getStudentAvatarInner(selectedStudent)}
                    </div>
                    <div>
                      <div style="font-weight:900;font-size:1rem;color:var(--text-dark);">איך ${selectedStudent} מרגיש/ה הבוקר?</div>
                      <div style="font-size:0.78rem;color:var(--text-muted);">בחר/י רגש או סמן/י שרוצה לשתף בכיתה</div>
                    </div>
                  </div>
                  <div style="display:flex;gap:6px;align-items:center;">
                    <button class="em-reward-share-btn small ${alreadyRewarded ? 'rewarded' : ''}" data-act="reward-sharer" data-student="${selectedStudent}">
                      ${alreadyRewarded ? '✓ קיבל/ה יהלום' : '💎 +1 על שיתוף'}
                    </button>
                    ${curEm ? `<button class="small-btn" data-act="clear-student-em" style="font-size:0.75rem;">נקה בחירה</button>` : ''}
                    <button class="small-btn" data-act="close-em-drawer" style="padding:2px 8px;">✕</button>
                  </div>
                </div>
                <div class="em-choices-grid">
                  ${EMOTIONS.map(em => `
                    <button class="em-choice-btn ${curEm === em.id ? 'selected' : ''}" data-em="${em.id}" style="--em-color:${em.color};--em-bg:${em.bg};">
                      <span class="em-choice-icon">${em.icon}</span>
                      <span class="em-choice-label">${em.label}</span>
                    </button>
                  `).join('')}
                </div>
              `;
            })() : ''}
          </div>
        </div>
      `;

      bindEmotionEvents();
    }

    function bindEmotionEvents() {
      body.querySelector('[data-el="em-class-sel"]')?.addEventListener('change', (e) => {
        selectedClassId = e.target.value;
        state.classId = selectedClassId;
        selectedStudent = null;
        spotlightStudent = null;
        saveState();
        renderUI();
      });

      body.querySelector('[data-act="reset-emotions"]')?.addEventListener('click', () => {
        if (confirm('האם לאפס את לוח הרגשות לבוקר חדש?')) {
          state.studentEmotions = {};
          state.sharedToday = {};
          selectedStudent = null;
          spotlightStudent = null;
          saveState();
          if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
          renderUI();
        }
      });

      body.querySelector('[data-act="next-question"]')?.addEventListener('click', () => {
        state.questionIdx = (state.questionIdx + 1) % MORNING_QUESTIONS.length;
        saveState();
        if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
        renderUI();
      });

      body.querySelector('[data-act="pick-sharer"]')?.addEventListener('click', () => {
        const students = getStudents();
        if (students.length === 0) return;
        const sharers = students.filter(s => state.studentEmotions[s] === 'share' && !state.sharedToday[s]);
        const allSharers = students.filter(s => state.studentEmotions[s] === 'share');
        const pool = sharers.length > 0 ? sharers : (allSharers.length > 0 ? allSharers : students);
        spotlightStudent = pool[Math.floor(Math.random() * pool.length)];
        selectedStudent = null;
        if (typeof SoundFX !== 'undefined' && SoundFX.diamondAward) SoundFX.diamondAward(1);
        renderUI();
      });

      body.querySelector('[data-act="close-spotlight"]')?.addEventListener('click', () => {
        spotlightStudent = null;
        renderUI();
      });

      body.querySelectorAll('[data-act="reward-sharer"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const stName = btn.dataset.student;
          if (!stName) return;
          if (window.AppStore && window.AppStore.addDiamondsToStudent) {
            window.AppStore.addDiamondsToStudent(stName, 1, 'שיתוף בשיח רגשי', btn);
          }
          state.sharedToday[stName] = true;
          saveState();
          if (typeof SoundFX !== 'undefined' && SoundFX.diamondAward) SoundFX.diamondAward(1);
          renderUI();
        });
      });

      body.querySelectorAll('.em-filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          activeFilter = pill.dataset.filter;
          renderUI();
        });
      });

      body.querySelectorAll('.em-student-card').forEach(card => {
        card.addEventListener('click', () => {
          selectedStudent = card.dataset.student;
          renderUI();
        });
      });

      body.querySelector('[data-act="close-em-drawer"]')?.addEventListener('click', () => {
        selectedStudent = null;
        renderUI();
      });

      body.querySelector('[data-act="clear-student-em"]')?.addEventListener('click', () => {
        if (selectedStudent) {
          delete state.studentEmotions[selectedStudent];
          selectedStudent = null;
          saveState();
          renderUI();
        }
      });

      body.querySelectorAll('.em-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (!selectedStudent) return;
          const chosenEm = btn.dataset.em;
          const stName = selectedStudent;
          state.studentEmotions[stName] = chosenEm;
          selectedStudent = null;
          saveState();
          if (typeof SoundFX !== 'undefined' && SoundFX.diamondAward) SoundFX.diamondAward(1);
          renderUI();
          const targetCard = body.querySelector(`.em-student-card[data-student="${CSS.escape(stName)}"] .sp-bubble-avatar`);
          if (targetCard) {
            targetCard.classList.add('sp-pop-zoom-active');
            setTimeout(() => targetCard.classList.remove('sp-pop-zoom-active'), 800);
          }
        });
      });
    }

    const escEmotionHandler = (e) => {
      if (e.key !== 'Escape') return;
      if (!document.body.contains(body)) {
        document.removeEventListener('keydown', escEmotionHandler);
        return;
      }
      if (selectedStudent) {
        selectedStudent = null;
        renderUI();
        return;
      }
      if (spotlightStudent) {
        spotlightStudent = null;
        renderUI();
        return;
      }
      const win = body.closest('.widget-window[data-type="emotion-checkin"]');
      if (win) {
        document.removeEventListener('keydown', escEmotionHandler);
        win.querySelector('[data-wact="close"]')?.click();
      }
    };
    document.addEventListener('keydown', escEmotionHandler);

    renderUI();
  }
},

'help-queue': {
  title: 'תור עזרה שקט',
  icon: '✋',
  defaultW: 480,
  defaultH: 520,
  render(body, state, saveState) {
    let selectedClassId = state.classId ?? window.AppStore.getSelectedClassId();
    if (!Array.isArray(state.queue)) state.queue = [];

    function getStudents() {
      const lists = window.AppStore.getClassLists() || [];
      const found = lists.find(c => c.id === selectedClassId) || lists[0];
      return (found ? found.students : []).filter(Boolean);
    }

    function renderAvatarSmall(name) {
      const photos = (window.AppStore && window.AppStore.getStudentPhotos) ? window.AppStore.getStudentPhotos() : {};
      const icons = (window.AppStore && window.AppStore.getStudentIcons) ? window.AppStore.getStudentIcons() : {};
      if (photos[name]) return `<img src="${photos[name]}" class="hq-avatar-img" alt="${name}" />`;
      return renderStudentIconHtml(icons[name] || '', name);
    }

    function renderUI() {
      const students = getStudents();
      const queue = state.queue || [];
      const waitingNames = new Set(queue.map(q => q.name));

      body.innerHTML = `
        <div class="hq-wrap">
          <div class="hq-header-bar">
            <div>
              <div style="font-weight:800;font-size:0.95rem;display:flex;align-items:center;gap:6px;">${renderWaze3DMedallion('mood-superhero', 24)} <span>תור ממתינים לעזרה (${queue.length})</span></div>
              <div style="font-size:0.75rem;color:var(--text-muted);">לחצו על שמכם להצטרפות לתור בלי להרים יד ולהתעייף</div>
            </div>
            ${queue.length > 0 ? `<button class="small-btn danger" data-act="clear-hq" style="font-size:0.75rem;">נקה תור</button>` : ''}
          </div>

          <div class="hq-queue-list">
            ${queue.length === 0 ? `
              <div class="hq-empty-state">אף תלמיד לא ממתין כרגע לעזרה – עבודה עצמית שקטה וזורמת!</div>
            ` : queue.map((item, idx) => `
              <div class="hq-queue-item ${idx === 0 ? 'first-in-line' : ''}">
                <span class="hq-rank-badge">#${idx + 1}</span>
                <div class="hq-student-avatar">${renderAvatarSmall(item.name)}</div>
                <div class="hq-student-info">
                  <div class="hq-student-name">${item.name}</div>
                  <div class="hq-student-time">${idx === 0 ? 'בתור עכשיו אצל המורה' : 'ממתין/ה בתור'}</div>
                </div>
                <div class="hq-item-actions">
                  <button class="small-btn hq-peer-btn" data-act="peer-help" data-idx="${idx}" title="חבר עזר לתלמיד" style="display:inline-flex;align-items:center;gap:4px;">${renderWaze3DDiamond(false, 15)} <span>+1 חבר עזר</span></button>
                  <button class="small-btn hq-done-btn" data-act="done-help" data-idx="${idx}">✓ טופל</button>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="hq-students-picker-title">לחץ על הסמל שלך כדי להצטרף לתור:</div>
          <div class="hq-students-grid">
            ${students.map(name => {
              const isWaiting = waitingNames.has(name);
              const pos = queue.findIndex(q => q.name === name) + 1;
              return `
                <button class="hq-student-chip ${isWaiting ? 'in-queue' : ''}" data-student="${name}">
                  <span class="hq-chip-avatar">${renderAvatarSmall(name)}</span>
                  <span class="hq-chip-name">${name}</span>
                  ${isWaiting ? `<span class="hq-chip-pos">#${pos}</span>` : ''}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;

      body.querySelector('[data-act="clear-hq"]')?.addEventListener('click', () => {
        state.queue = [];
        saveState();
        renderUI();
      });

      body.querySelectorAll('[data-act="done-help"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx, 10);
          state.queue.splice(idx, 1);
          saveState();
          if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
          renderUI();
        });
      });

      body.querySelectorAll('[data-act="peer-help"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.dataset.idx, 10);
          const item = state.queue[idx];
          if (!item) return;
          const helperName = prompt(`מי החבר/ה שעזר/ה ל-${item.name}? (יקבל +2 💎 על עזרה לחבר):`);
          if (helperName && helperName.trim()) {
            const matched = students.find(s => s.includes(helperName.trim())) || helperName.trim();
            window.AppStore.addDiamondsToStudent(matched, 2, 'help', e.currentTarget);
          }
          state.queue.splice(idx, 1);
          saveState();
          renderUI();
        });
      });

      body.querySelectorAll('.hq-student-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const sName = chip.dataset.student;
          const existingIdx = state.queue.findIndex(q => q.name === sName);
          if (existingIdx >= 0) {
            state.queue.splice(existingIdx, 1);
          } else {
            state.queue.push({ name: sName, ts: Date.now() });
            if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
          }
          saveState();
          renderUI();
        });
      });
    }

    renderUI();
  }
},

'seating-chart': {
  title: 'מפת הושבה חכמה',
  icon: '🪑',
  defaultW: 680,
  defaultH: 520,
  render(body, state, saveState) {
    let selectedClassId = state.classId ?? window.AppStore.getSelectedClassId();
    let layoutMode = state.layoutMode || 'pairs'; // 'pairs' (2), 'groups' (4), 'rows' (1)
    if (!Array.isArray(state.seatsOrder)) state.seatsOrder = [];
    if (!state.lockedSeats || typeof state.lockedSeats !== 'object') state.lockedSeats = {};
    let swapSourceIndex = null;

    function getStudents() {
      const lists = window.AppStore.getClassLists() || [];
      const found = lists.find(c => c.id === selectedClassId) || lists[0];
      return (found ? found.students : []).filter(Boolean);
    }

    function syncSeatsOrder() {
      const students = getStudents();
      const existing = state.seatsOrder.filter(s => students.includes(s));
      const missing = students.filter(s => !existing.includes(s));
      state.seatsOrder = [...existing, ...missing];
    }

    function shuffleUnlockedSeats() {
      syncSeatsOrder();
      const order = [...state.seatsOrder];
      const unlockedIndices = [];
      const unlockedNames = [];
      order.forEach((name, idx) => {
        if (!state.lockedSeats[name]) {
          unlockedIndices.push(idx);
          unlockedNames.push(name);
        }
      });
      for (let i = unlockedNames.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [unlockedNames[i], unlockedNames[j]] = [unlockedNames[j], unlockedNames[i]];
      }
      unlockedIndices.forEach((seatIdx, i) => {
        order[seatIdx] = unlockedNames[i];
      });
      state.seatsOrder = order;
      swapSourceIndex = null;
      saveState();
      if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
      renderUI();
    }

    function renderAvatar(name) {
      const photos = (window.AppStore && window.AppStore.getStudentPhotos) ? window.AppStore.getStudentPhotos() : {};
      const icons = (window.AppStore && window.AppStore.getStudentIcons) ? window.AppStore.getStudentIcons() : {};
      if (photos[name]) return `<img src="${photos[name]}" class="hq-avatar-img" alt="${name}" />`;
      return renderStudentIconHtml(icons[name] || '', name);
    }

    function renderUI() {
      syncSeatsOrder();
      const order = state.seatsOrder;
      const perDesk = layoutMode === 'groups' ? 4 : (layoutMode === 'rows' ? 1 : 2);
      const desks = [];
      for (let i = 0; i < order.length; i += perDesk) {
        desks.push(order.slice(i, i + perDesk).map((name, offset) => ({ name, seatIdx: i + offset })));
      }

      body.innerHTML = `
        <div class="sc-wrap">
          <div class="sc-toolbar">
            <div style="display:flex;gap:4px;">
              <button class="sp-mode-pill ${layoutMode === 'pairs' ? 'active' : ''}" data-layout="pairs" style="display:inline-flex;align-items:center;gap:4px;">${renderWaze3DMedallion('shop-chair', 18)} <span>זוגות</span></button>
              <button class="sp-mode-pill ${layoutMode === 'groups' ? 'active' : ''}" data-layout="groups" style="display:inline-flex;align-items:center;gap:4px;">${renderWaze3DMedallion('tool-groups', 18)} <span>קבוצות (4)</span></button>
              <button class="sp-mode-pill ${layoutMode === 'rows' ? 'active' : ''}" data-layout="rows">טורים</button>
            </div>
            <div style="display:flex;gap:6px;align-items:center;">
              <span style="font-size:0.74rem;color:var(--text-muted);">${swapSourceIndex !== null ? 'בחר כיסא שני להחלפה' : 'לחץ על שני תלמידים להחלפת מקום'}</span>
              <button class="small-btn" data-act="shuffle-seats" style="background:#e0f2fe;color:#0284c7;font-weight:800;border:1px solid #bae6fd;display:inline-flex;align-items:center;gap:5px;">${renderWaze3DMedallion('dice', 18)} <span>ערבב מקומות</span></button>
            </div>
          </div>

          <div class="sc-front-board" style="display:flex;align-items:center;justify-content:center;gap:8px;">${renderWaze3DMedallion('tool-text-draw', 22)} <span>לוח הכיתה ועמדת המורה</span></div>

          <div class="sc-desks-grid layout-${layoutMode}">
            ${desks.map((desk, dIdx) => `
              <div class="sc-desk-card">
                <div class="sc-desk-header">
                  <span>שולחן ${dIdx + 1}</span>
                  <button class="sc-desk-reward-btn" data-act="reward-desk" data-didx="${dIdx}" title="הענק יהלום לכל יושבי השולחן" style="display:inline-flex;align-items:center;gap:4px;">${renderWaze3DDiamond(false, 15)} <span>+1 לשולחן</span></button>
                </div>
                <div class="sc-desk-seats">
                  ${desk.map(seat => {
                    const isLocked = !!state.lockedSeats[seat.name];
                    const isSwapSel = swapSourceIndex === seat.seatIdx;
                    return `
                      <div class="sc-seat-item ${isLocked ? 'locked' : ''} ${isSwapSel ? 'swap-selected' : ''}" data-seat-idx="${seat.seatIdx}">
                        <button class="sc-lock-btn" data-act="toggle-lock" data-name="${seat.name}" title="${isLocked ? 'בטל נעילת מקום' : 'נעל תלמיד במקום זה בעת ערבוב'}">
                          ${isLocked ? '🔒' : '🔓'}
                        </button>
                        <div class="sc-seat-avatar">${renderAvatar(seat.name)}</div>
                        <div class="sc-seat-name">${seat.name}</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      body.querySelectorAll('[data-layout]').forEach(btn => {
        btn.addEventListener('click', () => {
          layoutMode = btn.dataset.layout;
          state.layoutMode = layoutMode;
          saveState();
          renderUI();
        });
      });

      body.querySelector('[data-act="shuffle-seats"]')?.addEventListener('click', shuffleUnlockedSeats);

      body.querySelectorAll('[data-act="toggle-lock"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const sName = btn.dataset.name;
          state.lockedSeats[sName] = !state.lockedSeats[sName];
          saveState();
          renderUI();
        });
      });

      body.querySelectorAll('[data-act="reward-desk"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const dIdx = parseInt(btn.dataset.didx, 10);
          const desk = desks[dIdx] || [];
          desk.forEach(seat => {
            window.AppStore.addDiamondsToStudent(seat.name, 1, 'order', e.currentTarget);
          });
          if (typeof SoundFX !== 'undefined' && SoundFX.diamondAward) SoundFX.diamondAward(2);
        });
      });

      body.querySelectorAll('.sc-seat-item').forEach(seatEl => {
        seatEl.addEventListener('click', () => {
          const idx = parseInt(seatEl.dataset.seatIdx, 10);
          if (swapSourceIndex === null) {
            swapSourceIndex = idx;
          } else if (swapSourceIndex === idx) {
            swapSourceIndex = null;
          } else {
            const temp = state.seatsOrder[swapSourceIndex];
            state.seatsOrder[swapSourceIndex] = state.seatsOrder[idx];
            state.seatsOrder[idx] = temp;
            swapSourceIndex = null;
            saveState();
            if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
          }
          renderUI();
        });
      });
    }

    renderUI();
  }
},

'brain-break': {
  title: 'הפסקת מוח ונשימה',
  icon: '🧘',
  defaultW: 440,
  defaultH: 430,
  render(body, state, saveState) {
    let tab = state.tab || 'breathe'; // 'breathe' | 'move'
    let breathingActive = false;
    let breatheTimer = null;
    let phaseIndex = 0;
    let moveRemaining = 60;
    let moveInterval = null;

    const CHALLENGES = [
      { icon: renderWaze3DMedallion('mood-astronaut', 52), title: 'מתיחות לשמיים ונשימה', desc: 'עמדו ליד הכיסא, מתחו ידיים גבוה לשמיים על קצות האצבעות ושחררו לאט 5 פעמים.' },
      { icon: renderWaze3DMedallion('mood-cool', 52), title: 'משחק המראה בדממה', desc: 'עמדו מול השותף לשולחן וחקו את התנועות האיטיות שלו בדממה מוחלטת למשך דקה!' },
      { icon: renderWaze3DMedallion('mood-ninja', 52), title: 'אתגר שיווי המשקל השקט', desc: 'עמדו על רגל אחת בשיווי משקל מלא ובדממה – אחרי 30 שניות החליפו רגל!' },
      { icon: renderWaze3DMedallion('mood-headphones', 52), title: 'מקהלת הגשם באצבעות', desc: 'תיפוף עדין של טיפות גשם עם שתי אצבעות על השולחן שהולך ונחלש עד לדממה.' },
      { icon: renderWaze3DMedallion('mood-star', 52), title: 'שחרור כתפיים וצוואר', desc: 'סובבו כתפיים לאחור ברוגע 8 פעמים, עצמו עיניים והניחו ראש על השולחן ל-20 שניות.' }
    ];
    let currentChallengeIdx = state.challengeIdx ?? 0;

    const PHASES = [
      { label: 'שאיפה עמוקה מהאף... 🌿', cls: 'inhale', sec: 4 },
      { label: 'החזקת אוויר... ✨', cls: 'hold', sec: 4 },
      { label: 'נשיפה איטית מהפה... 🫧', cls: 'exhale', sec: 4 }
    ];

    function stopTimers() {
      if (breatheTimer) { clearInterval(breatheTimer); breatheTimer = null; }
      if (moveInterval) { clearInterval(moveInterval); moveInterval = null; }
      breathingActive = false;
    }

    function renderUI() {
      const ch = CHALLENGES[currentChallengeIdx % CHALLENGES.length];
      body.innerHTML = `
        <div class="bb-wrap">
          <div style="display:flex;gap:4px;background:rgba(0,0,0,0.05);padding:3px;border-radius:10px;">
            <button class="rand-tab ${tab === 'breathe' ? 'active' : ''}" data-bbtab="breathe" style="flex:1;">🫧 בועת נשימה ורוגע</button>
            <button class="rand-tab ${tab === 'move' ? 'active' : ''}" data-bbtab="move" style="flex:1;">⚡ התרעננות 60 שניות</button>
          </div>

          ${tab === 'breathe' ? `
            <div class="bb-breathe-stage">
              <div class="bb-orb-container">
                <div class="bb-orb ${breathingActive ? PHASES[phaseIndex].cls : ''}" data-el="bb-orb">
                  <span class="bb-orb-emoji">${renderWaze3DMedallion('mood-astronaut', 54)}</span>
                  <span class="bb-orb-text" data-el="bb-orb-text">${breathingActive ? PHASES[phaseIndex].label : 'לחצו להתחלת נשימה'}</span>
                </div>
              </div>
              <div style="display:flex;gap:8px;justify-content:center;">
                <button class="primary-btn" data-act="toggle-breathe" style="border-radius:999px;padding:8px 22px;font-weight:800;">
                  ${breathingActive ? '⏹️ עצור נשימה' : '▶️ התחל 3 נשימות מרגיעות'}
                </button>
              </div>
            </div>
          ` : `
            <div class="bb-move-stage">
              <div class="bb-challenge-card">
                <div class="bb-challenge-icon">${ch.icon}</div>
                <div class="bb-challenge-title">${ch.title}</div>
                <div class="bb-challenge-desc">${ch.desc}</div>
                <div class="bb-timer-pill" data-el="bb-move-timer">⏱️ ${moveRemaining} שניות</div>
              </div>
              <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;">
                <button class="small-btn" data-act="spin-challenge" style="font-weight:800;">🎲 הגרל תרגיל אחר</button>
                <button class="primary-btn" data-act="toggle-move-timer" style="padding:6px 16px;border-radius:10px;font-weight:800;">
                  ${moveInterval ? '⏸️ עצור טיימר' : '▶️ הפעל 60 שניות'}
                </button>
              </div>
            </div>
          `}
        </div>
      `;

      body.querySelectorAll('[data-bbtab]').forEach(btn => {
        btn.addEventListener('click', () => {
          stopTimers();
          tab = btn.dataset.bbtab;
          state.tab = tab;
          saveState();
          renderUI();
        });
      });

      body.querySelector('[data-act="toggle-breathe"]')?.addEventListener('click', () => {
        if (breathingActive) {
          stopTimers();
          renderUI();
          return;
        }
        breathingActive = true;
        phaseIndex = 0;
        renderUI();
        breatheTimer = setInterval(() => {
          if (!document.body.contains(body)) { stopTimers(); return; }
          phaseIndex = (phaseIndex + 1) % PHASES.length;
          const orb = body.querySelector('[data-el="bb-orb"]');
          const txt = body.querySelector('[data-el="bb-orb-text"]');
          if (orb && txt) {
            orb.className = `bb-orb ${PHASES[phaseIndex].cls}`;
            txt.textContent = PHASES[phaseIndex].label;
          }
        }, 4000);
      });

      body.querySelector('[data-act="spin-challenge"]')?.addEventListener('click', () => {
        stopTimers();
        moveRemaining = 60;
        currentChallengeIdx = (currentChallengeIdx + 1 + Math.floor(Math.random() * (CHALLENGES.length - 1))) % CHALLENGES.length;
        state.challengeIdx = currentChallengeIdx;
        saveState();
        if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
        renderUI();
      });

      body.querySelector('[data-act="toggle-move-timer"]')?.addEventListener('click', () => {
        if (moveInterval) {
          stopTimers();
          renderUI();
          return;
        }
        moveRemaining = 60;
        renderUI();
        moveInterval = setInterval(() => {
          if (!document.body.contains(body)) { stopTimers(); return; }
          moveRemaining--;
          const tEl = body.querySelector('[data-el="bb-move-timer"]');
          if (tEl) tEl.textContent = `⏱️ ${moveRemaining} שניות`;
          if (moveRemaining <= 0) {
            stopTimers();
            if (typeof SoundFX !== 'undefined' && SoundFX.bell) SoundFX.bell();
            moveRemaining = 60;
            renderUI();
          }
        }, 1000);
      });
    }

    renderUI();
    return () => stopTimers();
  }
},

'exit-ticket': {
  title: 'מד הבנה בסוף שיעור',
  icon: '🚦',
  defaultW: 560,
  defaultH: 500,
  render(body, state, saveState) {
    let selectedClassId = state.classId ?? window.AppStore.getSelectedClassId();
    if (!state.understanding || typeof state.understanding !== 'object') state.understanding = {};
    let activeStudent = null;

    const LEVELS = [
      { id: 'green', icon: renderWaze3DMedallion('trophy-crown', 20), title: 'הבנתי מצוין!', sub: 'יכול/ה גם להסביר לחבר', color: '#10b981' },
      { id: 'yellow', icon: renderWaze3DMedallion('mood-detective', 20), title: 'הבנתי חלקית', sub: 'צריך/ה עוד תרגול קטן', color: '#f59e0b' },
      { id: 'red', icon: renderWaze3DMedallion('mood-superhero', 20), title: 'צריך/ה עזרה', sub: 'אשמח להסבר נוסף מהמורה', color: '#ef4444' }
    ];

    function getStudents() {
      const lists = window.AppStore.getClassLists() || [];
      const found = lists.find(c => c.id === selectedClassId) || lists[0];
      return (found ? found.students : []).filter(Boolean);
    }

    function renderUI() {
      const students = getStudents();
      const map = state.understanding || {};

      body.innerHTML = `
        <div class="et-wrap">
          <div class="et-top-bar">
            <span style="font-weight:800;font-size:0.9rem;">🚦 איך הבנתי את החומר בשיעור היום?</span>
            <button class="small-btn" data-act="reset-et" style="font-size:0.75rem;">↺ איפוס מד הבנה</button>
          </div>

          <div class="et-columns">
            ${LEVELS.map(lv => {
              const inLevel = students.filter(s => map[s] === lv.id);
              return `
                <div class="et-col" style="border-top: 4px solid ${lv.color};">
                  <div class="et-col-header">
                    <span>${lv.icon} <b>${lv.title}</b> (${inLevel.length})</span>
                    <div style="font-size:0.7rem;color:var(--text-muted);">${lv.sub}</div>
                  </div>
                  <div class="et-col-students">
                    ${inLevel.map(name => `<span class="et-student-tag">${name}</span>`).join('') || '<span style="font-size:0.74rem;color:#94a3b8;">—</span>'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="et-students-Title" style="font-size:0.78rem;font-weight:700;color:var(--text-muted);">👆 לחץ על שמך ובחר רמת הבנה:</div>
          <div class="et-students-grid">
            ${students.map(name => {
              const cur = LEVELS.find(l => l.id === map[name]);
              return `
                <button class="et-student-btn ${cur ? 'checked-' + cur.id : ''}" data-student="${name}">
                  <span>${cur ? cur.icon : '⚪'}</span>
                  <span>${name}</span>
                </button>
              `;
            }).join('')}
          </div>

          ${activeStudent ? `
            <div class="et-picker-modal">
              <div class="et-picker-card">
                <div style="font-weight:800;margin-bottom:8px;">איך הבנת את השיעור, ${activeStudent}?</div>
                <div style="display:flex;flex-direction:column;gap:6px;">
                  ${LEVELS.map(lv => `
                    <button class="et-choice-btn" data-lv="${lv.id}">
                      <span style="font-size:1.3rem;">${lv.icon}</span>
                      <div style="text-align:right;">
                        <div style="font-weight:800;">${lv.title}</div>
                        <div style="font-size:0.74rem;color:var(--text-muted);">${lv.sub}</div>
                      </div>
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      `;

      body.querySelector('[data-act="reset-et"]')?.addEventListener('click', () => {
        state.understanding = {};
        saveState();
        renderUI();
      });

      body.querySelectorAll('.et-student-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeStudent = btn.dataset.student;
          renderUI();
        });
      });

      body.querySelectorAll('.et-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (!activeStudent) return;
          state.understanding[activeStudent] = btn.dataset.lv;
          activeStudent = null;
          saveState();
          if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
          renderUI();
        });
      });
    }

    renderUI();
  }
},

'birthdays': {
  title: 'לוח ימי הולדת עברי',
  icon: '🎂',
  defaultW: 560,
  defaultH: 520,
  render(body, state, saveState) {
    let selectedClassId = state.classId ?? window.AppStore.getSelectedClassId();
    const globalBdays = (window.AppStore && window.AppStore.getStudentBirthdays) ? window.AppStore.getStudentBirthdays() : {};
    let bdays = { ...(state.bdays || {}), ...globalBdays };
    let viewTab = state.viewTab || 'list'; // 'list' | 'months'
    let editingStudent = null;
    let pickerDay = 'א׳';
    let pickerMonth = 'תשרי';
    let pickerGreg = '';

    const CALENDAR_HEB_MONTHS = [
      'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר',
      'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול'
    ];

    function getStudents() {
      const lists = window.AppStore.getClassLists() || [];
      const found = lists.find(c => c.id === selectedClassId) || lists[0];
      return (found ? found.students : []).filter(Boolean);
    }

    function renderAvatar(name) {
      const photos = (window.AppStore && window.AppStore.getStudentPhotos) ? window.AppStore.getStudentPhotos() : {};
      const icons = (window.AppStore && window.AppStore.getStudentIcons) ? window.AppStore.getStudentIcons() : {};
      if (photos[name]) return `<img src="${photos[name]}" class="hq-avatar-img" alt="${name}" />`;
      return renderStudentIconHtml(icons[name] || '', name);
    }

    function saveBdays() {
      state.bdays = bdays;
      if (window.AppStore && window.AppStore.setStudentBirthdays) {
        window.AppStore.setStudentBirthdays(bdays);
      } else {
        saveState();
      }
    }

    function openBirthdayCelebrationCard(studentName, hebDisplayStr) {
      const existing = document.getElementById('bday-celebration-overlay');
      if (existing) existing.remove();
      const overlay = document.createElement('div');
      overlay.id = 'bday-celebration-overlay';
      overlay.className = 'shop-voucher-overlay';
      overlay.innerHTML = `
        <div class="shop-voucher-card" style="border-color:#ec4899;background:linear-gradient(180deg,#fff 0%,#fdf2f8 100%);">
          <div class="shop-voucher-ribbon" style="background:linear-gradient(135deg,#ec4899,#db2777);">🎂 חגיגת יום הולדת עברי בכיתה! 🎈</div>
          <div class="shop-voucher-student">
            <div class="hq-student-avatar" style="width:82px;height:82px;font-size:2.4rem;border:3px solid #f472b6;">
              ${renderAvatar(studentName)}
            </div>
            <div class="shop-voucher-student-name" style="font-size:1.45rem;color:#be185d;">מזל טוב ל${studentName}! 🎉</div>
          </div>
          <div class="shop-voucher-prize-box" style="border-color:#fbcfe8;">
            <div style="font-size:2.8rem;">🎁💎🎂</div>
            <div class="shop-voucher-prize-title" style="color:#be185d;">יום הולדת שמח! (${hebDisplayStr || 'מזל טוב!'})</div>
            <div class="shop-voucher-cost-tag">קיבלת מתנת יום הולדת כיתתית: <b>+5 יהלומים (💎)</b>!</div>
          </div>
          <button class="primary-btn" data-act="close-bday-card" style="background:linear-gradient(135deg,#ec4899,#db2777);padding:9px 26px;border-radius:999px;font-weight:800;">🥳 מזל טוב! סגור חלון</button>
        </div>
      `;
      document.body.appendChild(overlay);
      if (typeof triggerConfetti === 'function') triggerConfetti();
      if (typeof SoundFX !== 'undefined' && SoundFX.fanfare) SoundFX.fanfare();
      overlay.addEventListener('click', (ev) => {
        if (ev.target === overlay || ev.target.closest('[data-act="close-bday-card"]')) {
          overlay.remove();
        }
      });
    }

    function renderUI() {
      const students = getStudents();
      const todayHeb = getHebrewDateInfo(new Date());

      // Enrich students with their parsed Hebrew birthday status
      const enriched = students.map(name => {
        const parsed = parseSavedHebrewBirthday(bdays[name]);
        const hasHeb = !!(parsed && parsed.hebDay && parsed.hebMonth);
        const isToday = hasHeb && parsed.hebDay === todayHeb.dayGematria && isSameHebrewMonth(parsed.hebMonth, todayHeb.month);
        const isThisMonth = hasHeb && !isToday && isSameHebrewMonth(parsed.hebMonth, todayHeb.month);
        const dayIndex = hasHeb ? HEBREW_DAYS_GEMATRIA.indexOf(parsed.hebDay) : 99;
        return {
          name,
          parsed,
          hasHeb,
          isToday,
          isThisMonth,
          dayIndex: dayIndex >= 0 ? dayIndex : 99,
          displayStr: hasHeb ? `${parsed.hebDay} ב${parsed.hebMonth}` : (parsed?.gregDate || '')
        };
      });

      // Sort so today's celebrants are first, then this Hebrew month's celebrants (by day), then others
      const sortedStudents = [...enriched].sort((a, b) => {
        if (a.isToday !== b.isToday) return a.isToday ? -1 : 1;
        if (a.isThisMonth !== b.isThisMonth) return a.isThisMonth ? -1 : 1;
        if (a.isThisMonth && b.isThisMonth) return a.dayIndex - b.dayIndex;
        return 0;
      });

      const lists = window.AppStore.getClassLists() || [];
      body.innerHTML = `
        <div class="bd-wrap" style="position:relative;">
          <div class="bd-header-banner">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              ${renderWaze3DMedallion('birthday-cake', 30)}
              <div>
                <div style="font-weight:900;font-size:0.96rem;color:#831843;">ימי הולדת עברי</div>
                <div style="font-size:0.76rem;font-weight:800;color:#9d174d;">${todayHeb.shortDisplay} ${todayHeb.year}</div>
              </div>
              ${lists.length > 1 ? `
                <select data-el="bd-class-sel" style="padding:3px 8px;border-radius:10px;border:1px solid #fbcfe8;font-weight:800;font-size:0.76rem;color:#831843;background:#fff;">
                  ${lists.map(c => `<option value="${c.id}" ${c.id === selectedClassId ? 'selected' : ''}>${c.name}</option>`).join('')}
                </select>
              ` : ''}
            </div>
            <div style="display:flex;gap:4px;background:rgba(255,255,255,0.75);padding:3px;border-radius:10px;">
              <button class="sp-mode-pill ${viewTab === 'list' ? 'active' : ''}" data-bdtab="list">תלמידים</button>
              <button class="sp-mode-pill ${viewTab === 'months' ? 'active' : ''}" data-bdtab="months">חודשי השנה</button>
            </div>
          </div>

          ${viewTab === 'list' ? `
            <div class="bd-list">
              ${sortedStudents.map(item => `
                <div class="bd-row ${item.isToday ? 'bd-today' : (item.isThisMonth ? 'bd-month' : '')}">
                  <div class="bd-student-info">
                    <div class="hq-student-avatar">${renderAvatar(item.name)}</div>
                    <div>
                      <div style="display:flex;align-items:center;gap:6px;">
                        <span class="bd-name">${item.name}</span>
                        ${item.isToday ? `<span class="bd-badge-today">חוגג/ת היום!</span>` : (item.isThisMonth ? `<span class="bd-badge-month">${todayHeb.month}</span>` : '')}
                      </div>
                      <div style="display:flex;align-items:center;gap:5px;margin-top:3px;flex-wrap:wrap;">
                        <select class="bd-quick-day-sel" data-student="${item.name}" title="בחר יום בחודש העברי" style="padding:2px 6px;border-radius:8px;border:1.5px solid #cbd5e1;font-weight:800;font-size:0.76rem;background:#fff;color:#0f172a;cursor:pointer;">
                          <option value="" ${!item.hasHeb ? 'selected' : ''}>יום...</option>
                          ${HEBREW_DAYS_GEMATRIA.map(d => `<option value="${d}" ${(item.hasHeb && item.parsed.hebDay === d) ? 'selected' : ''}>${d}</option>`).join('')}
                        </select>
                        <select class="bd-quick-month-sel" data-student="${item.name}" title="בחר חודש עברי" style="padding:2px 6px;border-radius:8px;border:1.5px solid #cbd5e1;font-weight:800;font-size:0.76rem;background:#fff;color:#0f172a;cursor:pointer;">
                          <option value="" ${!item.hasHeb ? 'selected' : ''}>חודש...</option>
                          ${HEBREW_MONTHS_LIST.map(m => `<option value="${m}" ${(item.hasHeb && item.parsed.hebMonth === m) ? 'selected' : ''}>${m}</option>`).join('')}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="bd-actions">
                    <button class="small-btn bd-date-btn" data-act="open-heb-picker" data-student="${item.name}" title="בחר מלוח מלא או המר מתאריך לועזי">
                      📅 ${item.displayStr || 'בחר תאריך'}
                    </button>
                    <button class="small-btn bd-celebrate-btn" data-act="celebrate-bday" data-student="${item.name}" data-heb="${item.displayStr}" title="חגיגת יום הולדת על המסך והענקת 5 יהלומים במתנה!">
                      ${renderWaze3DDiamond(true, 16)} <span>+5</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="bd-months-board">
              ${CALENDAR_HEB_MONTHS.map(mName => {
                const isCurMonth = isSameHebrewMonth(mName, todayHeb.month);
                const monthKids = enriched
                  .filter(it => it.hasHeb && isSameHebrewMonth(it.parsed.hebMonth, mName))
                  .sort((a, b) => a.dayIndex - b.dayIndex);
                return `
                  <div class="bd-month-card ${isCurMonth ? 'current-heb-month' : ''}">
                    <div class="bd-month-card-header">
                      <span>🗓️ חודש ${mName}</span>
                      ${isCurMonth ? `<span class="bd-cur-month-pill">החודש הנוכחי ✨</span>` : `<span style="font-size:0.72rem;opacity:0.75;">(${monthKids.length})</span>`}
                    </div>
                    <div class="bd-month-kids-list">
                      ${monthKids.length === 0
                        ? `<span style="font-size:0.73rem;color:#94a3b8;">אין ימי הולדת רשומים</span>`
                        : monthKids.map(k => `
                          <div class="bd-month-kid-chip ${k.isToday ? 'is-today' : ''}" data-act="open-heb-picker" data-student="${k.name}" title="לחץ לעריכת תאריך">
                            <span class="bd-kid-chip-name">${k.name}</span>
                            <span class="bd-kid-chip-day">${k.parsed.hebDay}</span>
                          </div>
                        `).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      `;

      // Render modal directly into document.body so it is never clipped by a compact widget window!
      const existingModal = document.getElementById('bd-heb-picker-global-overlay');
      if (existingModal) existingModal.remove();

      if (editingStudent) {
        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'bd-heb-picker-global-overlay';
        modalOverlay.className = 'shop-voucher-overlay';
        modalOverlay.innerHTML = `
          <div class="bd-heb-picker-modal" style="max-width:480px;width:94vw;max-height:90vh;overflow-y:auto;direction:rtl;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
              <div style="font-weight:900;font-size:1.05rem;color:#0f172a;">🗓️ בחירת יום הולדת עברי: <span style="color:#db2777;">${editingStudent}</span></div>
              <button class="small-btn" data-act="close-heb-picker" style="padding:2px 8px;">✕</button>
            </div>

            <div class="bd-heb-preview-bar" data-el="bd-preview-text">
              תאריך נבחר: <b>${pickerDay} ב${pickerMonth}</b>
            </div>

            <div style="font-size:0.8rem;font-weight:800;color:#475569;margin-bottom:4px;">1. בחר יום בחודש העברי (א׳ עד ל׳):</div>
            <div class="bd-heb-days-grid">
              ${HEBREW_DAYS_GEMATRIA.map(d => `
                <button type="button" class="bd-heb-day-btn ${pickerDay === d ? 'active' : ''}" data-hday="${d}">${d}</button>
              `).join('')}
            </div>

            <div style="font-size:0.8rem;font-weight:800;color:#475569;margin:10px 0 4px 0;">2. בחר חודש עברי:</div>
            <div class="bd-heb-months-grid">
              ${HEBREW_MONTHS_LIST.map(m => `
                <button type="button" class="bd-heb-month-btn ${pickerMonth === m ? 'active' : ''}" data-hmonth="${m}">${m}</button>
              `).join('')}
            </div>

            <div class="bd-greg-converter-row">
              <span style="font-size:0.76rem;font-weight:700;color:#475569;">🔄 יודע רק תאריך לידה לועזי? בחר והמערכת תמיר לעברי:</span>
              <input type="date" data-el="greg-convert-inp" value="${pickerGreg}" style="padding:4px 8px;border-radius:8px;border:1px solid #cbd5e1;font-size:0.8rem;" />
            </div>

            <div style="display:flex;justify-content:space-between;gap:8px;margin-top:12px;">
              <button type="button" class="small-btn danger" data-act="clear-student-bday" style="font-size:0.78rem;">🗑️ נקה תאריך</button>
              <div style="display:flex;gap:6px;">
                <button type="button" class="small-btn" data-act="close-heb-picker">ביטול</button>
                <button type="button" class="primary-btn" data-act="save-heb-bday" style="padding:7px 20px;border-radius:10px;font-weight:800;">💾 שמור תאריך עברי</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(modalOverlay);

        const updateModalHighlight = () => {
          const prevEl = modalOverlay.querySelector('[data-el="bd-preview-text"]');
          if (prevEl) prevEl.innerHTML = `תאריך נבחר: <b>${pickerDay} ב${pickerMonth}</b>`;
          modalOverlay.querySelectorAll('.bd-heb-day-btn').forEach(b => b.classList.toggle('active', b.dataset.hday === pickerDay));
          modalOverlay.querySelectorAll('.bd-heb-month-btn').forEach(b => b.classList.toggle('active', b.dataset.hmonth === pickerMonth));
        };

        modalOverlay.querySelectorAll('.bd-heb-day-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            pickerDay = btn.dataset.hday;
            updateModalHighlight();
          });
        });

        modalOverlay.querySelectorAll('.bd-heb-month-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            pickerMonth = btn.dataset.hmonth;
            updateModalHighlight();
          });
        });

        modalOverlay.querySelector('[data-el="greg-convert-inp"]')?.addEventListener('change', (e) => {
          const val = e.target.value;
          if (!val) return;
          pickerGreg = val;
          const dObj = new Date(val + 'T12:00:00');
          if (!isNaN(dObj.getTime())) {
            const converted = getHebrewDateInfo(dObj);
            pickerDay = converted.dayGematria;
            pickerMonth = converted.month;
            if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
            updateModalHighlight();
          }
        });

        modalOverlay.querySelectorAll('[data-act="close-heb-picker"]').forEach(btn => {
          btn.addEventListener('click', () => {
            editingStudent = null;
            modalOverlay.remove();
          });
        });

        modalOverlay.addEventListener('click', (ev) => {
          if (ev.target === modalOverlay) {
            editingStudent = null;
            modalOverlay.remove();
          }
        });

        modalOverlay.querySelector('[data-act="clear-student-bday"]')?.addEventListener('click', () => {
          if (!editingStudent) return;
          delete bdays[editingStudent];
          editingStudent = null;
          modalOverlay.remove();
          saveBdays();
          renderUI();
        });

        modalOverlay.querySelector('[data-act="save-heb-bday"]')?.addEventListener('click', () => {
          if (!editingStudent) return;
          bdays[editingStudent] = {
            hebDay: pickerDay,
            hebMonth: pickerMonth,
            gregDate: pickerGreg
          };
          editingStudent = null;
          modalOverlay.remove();
          saveBdays();
          if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
          renderUI();
        });
      }

      body.querySelector('[data-el="bd-class-sel"]')?.addEventListener('change', (e) => {
        selectedClassId = e.target.value;
        state.classId = selectedClassId;
        saveState();
        renderUI();
      });

      // Quick inline day/month dropdowns on each student row — saves immediately on change!
      body.querySelectorAll('.bd-quick-day-sel').forEach(sel => {
        sel.addEventListener('change', () => {
          const sName = sel.dataset.student;
          const newDay = sel.value;
          const existing = parseSavedHebrewBirthday(bdays[sName]);
          if (!newDay) {
            delete bdays[sName];
          } else {
            bdays[sName] = {
              hebDay: newDay,
              hebMonth: (existing && existing.hebMonth) ? existing.hebMonth : todayHeb.month,
              gregDate: (existing && existing.gregDate) ? existing.gregDate : ''
            };
          }
          saveBdays();
          if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
          renderUI();
        });
      });

      body.querySelectorAll('.bd-quick-month-sel').forEach(sel => {
        sel.addEventListener('change', () => {
          const sName = sel.dataset.student;
          const newMonth = sel.value;
          const existing = parseSavedHebrewBirthday(bdays[sName]);
          if (!newMonth) {
            delete bdays[sName];
          } else {
            bdays[sName] = {
              hebDay: (existing && existing.hebDay) ? existing.hebDay : 'א׳',
              hebMonth: newMonth,
              gregDate: (existing && existing.gregDate) ? existing.gregDate : ''
            };
          }
          saveBdays();
          if (typeof SoundFX !== 'undefined' && SoundFX.pop) SoundFX.pop();
          renderUI();
        });
      });

      body.querySelectorAll('[data-bdtab]').forEach(btn => {
        btn.addEventListener('click', () => {
          viewTab = btn.dataset.bdtab;
          state.viewTab = viewTab;
          saveState();
          renderUI();
        });
      });

      body.querySelectorAll('[data-act="open-heb-picker"]').forEach(btn => {
        btn.addEventListener('click', () => {
          const sName = btn.dataset.student;
          editingStudent = sName;
          const existing = parseSavedHebrewBirthday(bdays[sName]);
          pickerDay = (existing && existing.hebDay) ? existing.hebDay : todayHeb.dayGematria;
          pickerMonth = (existing && existing.hebMonth) ? existing.hebMonth : todayHeb.month;
          pickerGreg = (existing && existing.gregDate) ? existing.gregDate : '';
          renderUI();
        });
      });

      body.querySelectorAll('[data-act="celebrate-bday"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const sName = btn.dataset.student;
          const hebStr = btn.dataset.heb || '';
          window.AppStore.addDiamondsToStudent(sName, 5, 'excel', e.currentTarget);
          openBirthdayCelebrationCard(sName, hebStr);
        });
      });
    }

    renderUI();
  }
}
};