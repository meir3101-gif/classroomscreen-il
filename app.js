const BACKGROUNDS = {
nature: [
{ name: 'הרי הגליל בזריחה', value: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=80")' },
{ name: 'חוף ים שקט', value: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80")' },
{ name: 'יער אורנים ירוק', value: 'url("https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&auto=format&fit=crop&q=80")' },
{ name: 'שמיים זרועי כוכבים', value: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&auto=format&fit=crop&q=80")' },
{ name: 'שדה פרחים באביב', value: 'url("https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&auto=format&fit=crop&q=80")' },
{ name: 'מדבר ושקיעה', value: 'url("https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&auto=format&fit=crop&q=80")' }
],
classroom: [
{ name: 'שולחן כתיבה ולימודים', value: 'url("https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&auto=format&fit=crop&q=80")' },
{ name: 'ספרייה עשירה', value: 'url("https://images.unsplash.com/photo-1507842229356-51c61504d3ab?w=1920&auto=format&fit=crop&q=80")' },
{ name: 'לוח גיר קלאסי', value: 'url("https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1920&auto=format&fit=crop&q=80")' },
{ name: 'מדע וחלל', value: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=80")' }
],
colors: [
{ name: 'כחול אינדיגו רגוע', value: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)' },
{ name: 'טורקיז וים', value: 'linear-gradient(135deg, #0f766e 0%, #0ea5e9 100%)' },
{ name: 'זריחה חמימה', value: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #f59e0b 100%)' },
{ name: 'ירוק לוח כיתה', value: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)' },
{ name: 'סגול פסטל רך', value: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #c084fc 100%)' },
{ name: 'אפור כהה נקי', value: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)' }
]
};
const DEFAULT_STUDENTS = [
'נועה לוי', 'דניאל כהן', 'איתי מזרחי', 'מאיה אברהם', 'יונתן פרץ',
'שירה חדד', 'אורי ביטון', 'תמר דהן', 'עידו כץ', 'רוני גבאי',
'גיא שפירא', 'יעל אלון', 'עומר סגל', 'ליאור מלכה', 'אגם רוזן', 'נדב שטרן'
];
const STORAGE_KEY = 'classroomscreen_il_state_v1';
function getWidgetHeaderCapsule(type) {
  const map = {
    'timer': { cls: 'capsule-coral', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>' },
    'visual-timer': { cls: 'capsule-indigo', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>' },
    'stopwatch': { cls: 'capsule-violet', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="12" y1="14" y2="8"/><circle cx="12" cy="14" r="8"/></svg>' },
    'clock': { cls: 'capsule-slate', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' },
    'traffic-light': { cls: 'capsule-emerald', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="18" x="8" y="3" rx="4"/><circle cx="12" cy="7" r="1.5" fill="#ef4444"/><circle cx="12" cy="12" r="1.5" fill="#f59e0b"/><circle cx="12" cy="17" r="1.5" fill="#10b981"/></svg>' },
    'work-symbols': { cls: 'capsule-yellow', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" x2="16" y1="9" y2="9"/><line x1="8" x2="13" y1="13" y2="13"/></svg>' },
    'random-name': { cls: 'capsule-pink', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="2.5"/></svg>' },
    'group-maker': { cls: 'capsule-mint', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    'noise-meter': { cls: 'capsule-teal', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>' },
    'dice': { cls: 'capsule-amber', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="3"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="16" cy="16" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>' },
    'scoreboard': { cls: 'capsule-gold', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>' },
    'student-points': { cls: 'capsule-cyan', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/></svg>' },
    'poll': { cls: 'capsule-royal', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 16v-4"/><path d="M11 16V8"/><path d="M15 16v-8"/><path d="M19 16v-6"/></svg>' },
    'text': { cls: 'capsule-blue', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>' },
    'draw': { cls: 'capsule-purple', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M18 10l-4-4"/><path d="m20.5 7.5-3-3a2.12 2.12 0 0 0-3 0l-1.5 1.5 6 6 1.5-1.5a2.12 2.12 0 0 0 0-3Z"/></svg>' },
    'qr': { cls: 'capsule-indigo', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="6" height="6" x="3" y="3" rx="1.5"/><rect width="6" height="6" x="15" y="3" rx="1.5"/><rect width="6" height="6" x="3" y="15" rx="1.5"/><path d="M21 15h-3a2 2 0 0 0-2 2v4"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/></svg>' },
    'daily-agenda': { cls: 'capsule-indigo', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/></svg>' },
    'timetable': { cls: 'capsule-blue', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>' },
    'calendar': { cls: 'capsule-emerald', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><circle cx="12" cy="15" r="2"/></svg>' },
    'countdown': { cls: 'capsule-amber', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
    'stickers': { cls: 'capsule-gold', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>' },
    'image': { cls: 'capsule-sky', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>' },
    'video': { cls: 'capsule-coral', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="4.5" rx="3"/><polygon points="10 9 15 12 10 15 10 9" fill="currentColor"/></svg>' },
    'webcam': { cls: 'capsule-teal', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="d 14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>' },
    'embed': { cls: 'capsule-slate', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' }
  };
  const item = map[type] || { cls: 'capsule-slate', svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>' };
  return `<span class="w-header-capsule ${item.cls}">${item.svg}</span>`;
}

class ClassroomApp {
constructor() {
this.topZ = 20;
this.activeCleanups = new Map();
this.user = null;
this.googleClientId = '';
this.syncTimeout = null;
this.loadLocalState();
this.initDOM();
this.renderScreenTabs();
this.applyCurrentScreen();
this.initAnnotationCanvas();
this.initAuthAndCloudSync();
}
getDefaultWorkspaceData() {
return {
activeScreenId: 'scr-1',
selectedClassId: 'cls-1',
classLists: [
{ id: 'cls-1', name: "כיתה ה'1", students: [...DEFAULT_STUDENTS] },
{ id: 'cls-2', name: "כיתה ו'2", students: ['אדם', 'אביב', 'אלה', 'בן', 'גלי', 'דור', 'הילה', 'זוהר', 'חן', 'טל', 'יובל', 'כרמל'] }
],
screens: [
{
id: 'scr-1',
name: 'מסך 1 - שיעור פתיחה',
background: BACKGROUNDS.nature[0].value,
widgets: [
{
id: 'w-welcome-text',
type: 'text',
x: Math.max(40, window.innerWidth - 470),
y: 80,
w: 420,
h: 265,
theme: 'light',
state: {
html: `<h3>👋 בוקר טוב וברוכים הבאים לכיתה!</h3><ul><li>הוציאו מחברת וכלי כתיבה על השולחן</li><li>שימו לב לרמזור הכיתתי ולסמל העבודה</li><li>נתחיל בעוד מספר דקות – בהצלחה לכולם! 🌟</li></ul>`
}
},
{
id: 'w-init-timer',
type: 'timer',
x: Math.max(40, Math.floor(window.innerWidth / 2 - 170)),
y: 80,
w: 330,
h: 255,
theme: 'light',
state: { totalSeconds: 300, remaining: 300 }
},
{
id: 'w-init-traffic',
type: 'traffic-light',
x: 40,
y: 80,
w: 210,
h: 345,
theme: 'light',
state: { activeLight: 'green' }
},
{
id: 'w-init-symbols',
type: 'work-symbols',
x: Math.max(40, Math.floor(window.innerWidth / 2 - 170)),
y: 355,
w: 330,
h: 270,
theme: 'light',
state: { mode: 'together' }
}
]
}
]
};
}
loadLocalState() {
try {
const raw = localStorage.getItem(STORAGE_KEY);
if (raw) {
this.data = JSON.parse(raw);
if (this.data && Array.isArray(this.data.screens) && this.data.screens.length > 0) {
return;
}
}
} catch (e) {
console.warn('Could not load saved state:', e);
}
this.data = this.getDefaultWorkspaceData();
}
saveState() {
try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
} catch (e) {
console.warn('Could not persist local state:', e);
}
this.scheduleCloudSync();
}
async initAuthAndCloudSync() {
const loginBtn = document.getElementById('btn-google-login');
const logoutBtn = document.getElementById('btn-logout');
const authModal = document.getElementById('modal-google-auth');
loginBtn.addEventListener('click', () => {
authModal.classList.remove('hidden');
this.renderOfficialGoogleButton();
});
logoutBtn.addEventListener('click', async () => {
try {
await fetch('/api/auth/logout', { method: 'POST' });
} catch (_) {}
this.user = null;
this.updateAuthUI();
});
try {
const [cfgRes, meRes] = await Promise.all([
fetch('/api/config'),
fetch('/api/auth/me')
]);
if (cfgRes.ok) {
const cfg = await cfgRes.json();
this.googleClientId = cfg.googleClientId || '';
}
if (meRes.ok) {
const me = await meRes.json();
if (me.authenticated && me.user) {
this.user = me.user;
if (me.workspace && Array.isArray(me.workspace.screens) && me.workspace.screens.length > 0) {
this.data = me.workspace;
localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
this.renderScreenTabs();
this.applyCurrentScreen();
} else {
this.scheduleCloudSync(true);
}
}
}
this.updateAuthUI();
} catch (e) {
this.updateCloudPill('local', 'מצב לא מקוון');
}
}
renderOfficialGoogleButton(attempt = 0) {
const wrap = document.getElementById('g-id-button-wrapper');
const target = document.getElementById('g-id-signin-btn');
const notice = document.getElementById('g-auth-not-configured');
if (!this.googleClientId) {
wrap.classList.add('hidden');
notice.classList.remove('hidden');
return;
}
notice.classList.add('hidden');
if (!window.google || !window.google.accounts) {
// The Google script loads asynchronously – retry for a few seconds.
wrap.classList.add('hidden');
if (attempt < 20) setTimeout(() => this.renderOfficialGoogleButton(attempt + 1), 250);
return;
}
wrap.classList.remove('hidden');
target.innerHTML = '';
window.google.accounts.id.initialize({
client_id: this.googleClientId,
callback: (response) => {
if (response.credential) {
this.loginWithGoogleCredential(response.credential);
}
}
});
window.google.accounts.id.renderButton(target, {
theme: 'outline',
size: 'large',
text: 'signin_with',
shape: 'pill',
locale: 'he'
});
}
async loginWithGoogleCredential(credential) {
try {
const res = await fetch('/api/auth/google', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
credential,
initialWorkspace: this.data
})
});
const result = await res.json();
if (result.ok) {
this.onAuthSuccess(result);
} else {
alert(result.error || 'שגיאה בהתחברות עם Google');
}
} catch (e) {
alert('שגיאת תקשורת עם השרת');
}
}
onAuthSuccess(result) {
this.user = result.user;
document.getElementById('modal-google-auth').classList.add('hidden');
SoundFX.fanfare();
if (result.workspace && Array.isArray(result.workspace.screens) && result.workspace.screens.length > 0) {
this.data = result.workspace;
localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
this.renderScreenTabs();
this.applyCurrentScreen();
} else {
this.scheduleCloudSync(true);
}
this.updateAuthUI();
}
updateAuthUI() {
const loginBtn = document.getElementById('btn-google-login');
const profilePill = document.getElementById('user-profile-pill');
const avatarImg = document.getElementById('user-avatar-img');
const nameEl = document.getElementById('user-display-name');
if (this.user) {
loginBtn.classList.add('hidden');
profilePill.classList.remove('hidden');
avatarImg.src = this.user.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(this.user.name)}`;
nameEl.textContent = this.user.name;
nameEl.title = `${this.user.name} (${this.user.email})`;
this.updateCloudPill('synced', 'נשמר בענן');
} else {
loginBtn.classList.remove('hidden');
profilePill.classList.add('hidden');
this.updateCloudPill('local', 'שמירה מקומית');
}
}
updateCloudPill(state, text) {
const pill = document.getElementById('cloud-sync-pill');
const icon = document.getElementById('cloud-sync-icon');
const txt = document.getElementById('cloud-sync-text');
if (!pill) return;
pill.classList.remove('synced', 'syncing');
if (state === 'synced') {
pill.classList.add('synced');
icon.textContent = '☁️✓';
} else if (state === 'syncing') {
pill.classList.add('syncing');
icon.textContent = '🔄';
} else {
icon.textContent = '☁️';
}
txt.textContent = text;
}
scheduleCloudSync(immediate = false) {
if (!this.user) return;
if (this.syncTimeout) clearTimeout(this.syncTimeout);
this.updateCloudPill('syncing', 'שומר בענן...');
const doSync = async () => {
try {
const res = await fetch('/api/workspace', {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(this.data)
});
if (res.ok) {
this.updateCloudPill('synced', 'נשמר בענן');
} else if (res.status === 401) {
this.user = null;
this.updateAuthUI();
this.updateCloudPill('local', 'ההתחברות פגה – התחבר שוב');
} else if (res.status === 413) {
this.updateCloudPill('local', 'המסך גדול מדי לשמירה בענן');
} else {
this.updateCloudPill('local', 'שגיאת סנכרון');
}
} catch (e) {
this.updateCloudPill('local', 'שגיאת סנכרון');
}
};
if (immediate) {
doSync();
} else {
this.syncTimeout = setTimeout(doSync, 600);
}
}
get currentScreen() {
return this.data.screens.find(s => s.id === this.data.activeScreenId) || this.data.screens[0];
}
initDOM() {
this.workspace = document.getElementById('workspace');
this.bgLayer = document.getElementById('background-layer');
this.screensTabsEl = document.getElementById('screens-tabs');
this.drawerEl = document.getElementById('more-widgets-drawer');
document.querySelectorAll('[data-widget]').forEach(btn => {
btn.addEventListener('click', () => {
const type = btn.dataset.widget;
this.addWidget(type);
this.drawerEl.classList.add('hidden');
});
});
document.querySelector('[data-action="background"]').addEventListener('click', () => {
this.openBackgroundModal();
});
document.getElementById('btn-more-widgets').addEventListener('click', () => {
this.drawerEl.classList.toggle('hidden');
});
document.getElementById('btn-close-drawer').addEventListener('click', () => {
this.drawerEl.classList.add('hidden');
});
const dockEl = document.getElementById('bottom-dock');
const restoreDockBtn = document.getElementById('btn-restore-dock');
document.getElementById('btn-toggle-dock').addEventListener('click', () => {
dockEl.classList.add('hidden');
this.drawerEl.classList.add('hidden');
restoreDockBtn.classList.remove('hidden');
});
restoreDockBtn.addEventListener('click', () => {
dockEl.classList.remove('hidden');
restoreDockBtn.classList.add('hidden');
});
document.getElementById('btn-add-screen').addEventListener('click', () => this.addScreen());
document.getElementById('btn-clear-widgets').addEventListener('click', () => {
if (this.currentScreen.widgets.length === 0) return;
if (confirm('האם לנקות את כל הווידג׳טים מהמסך הנוכחי?')) {
this.currentScreen.widgets = [];
this.saveState();
this.applyCurrentScreen();
}
});
document.getElementById('btn-fullscreen').addEventListener('click', () => {
if (!document.fullscreenElement) {
document.documentElement.requestFullscreen().catch(() => {});
} else {
document.exitFullscreen().catch(() => {});
}
});
document.getElementById('btn-student-lists').addEventListener('click', () => {
this.openStudentsModal();
});
document.getElementById('btn-templates').addEventListener('click', () => {
document.getElementById('modal-templates').classList.remove('hidden');
});
document.querySelectorAll('.template-card').forEach(card => {
card.addEventListener('click', () => {
this.applyTemplate(card.dataset.template);
document.getElementById('modal-templates').classList.add('hidden');
});
});
document.querySelectorAll('[data-close]').forEach(btn => {
btn.addEventListener('click', () => {
document.getElementById(btn.dataset.close).classList.add('hidden');
});
});

const toggleSidebarBtn = document.getElementById('btn-toggle-sidebar');
if (toggleSidebarBtn) {
toggleSidebarBtn.addEventListener('click', () => {
this.toggleStudentsSidebar();
});
}
window.addEventListener('cs:scores-updated', () => {
this.renderStudentsSidebar();
});
window.addEventListener('cs:icons-updated', () => {
this.renderStudentsSidebar();
});

window.AppStore = {
getClassLists: () => this.data.classLists,
getSelectedClassId: () => this.data.selectedClassId,
openStudentsModal: (classId, onUpdate) => this.openStudentsModal(classId, onUpdate),
getWeeklySchedule: () => this.data.weeklySchedule,
setWeeklySchedule: (sched) => {
  this.data.weeklySchedule = sched;
  this.saveState();
  window.dispatchEvent(new CustomEvent('cs:schedule-updated', { detail: sched }));
},
getStudentScores: () => this.data.studentScores || {},
setStudentScores: (scores) => {
  this.data.studentScores = scores;
  this.saveState();
  window.dispatchEvent(new CustomEvent('cs:scores-updated', { detail: scores }));
},
getStudentIcons: () => this.data.studentIcons || {},
setStudentIcons: (icons) => {
  this.data.studentIcons = icons;
  this.saveState();
  window.dispatchEvent(new CustomEvent('cs:icons-updated', { detail: icons }));
},
addDiamondsToStudent: (name, pts = 1, reason = 'חיזוק') => {
  if (!this.data.studentScores) this.data.studentScores = {};
  const sc = this.data.studentScores[name] || { daily: 0, total: 0, breakdown: {} };
  sc.daily = Math.max(0, sc.daily + pts);
  sc.total = Math.max(0, sc.total + pts);
  if (!sc.breakdown) sc.breakdown = {};
  sc.breakdown[reason] = (sc.breakdown[reason] || 0) + 1;
  this.data.studentScores[name] = sc;
  this.saveState();
  window.dispatchEvent(new CustomEvent('cs:scores-updated', { detail: this.data.studentScores }));
  this.renderStudentsSidebar();
},
addDiamondsToAll: (pts = 1, reason = 'חיזוק כיתתי') => {
  if (!this.data.studentScores) this.data.studentScores = {};
  const currentClass = this.data.classLists.find(c => c.id === this.data.selectedClassId) || this.data.classLists[0];
  const students = (currentClass ? currentClass.students : []).filter(Boolean);
  students.forEach(name => {
    const sc = this.data.studentScores[name] || { daily: 0, total: 0, breakdown: {} };
    sc.daily = Math.max(0, sc.daily + pts);
    sc.total = Math.max(0, sc.total + pts);
    if (!sc.breakdown) sc.breakdown = {};
    sc.breakdown[reason] = (sc.breakdown[reason] || 0) + 1;
    this.data.studentScores[name] = sc;
  });
  this.saveState();
  window.dispatchEvent(new CustomEvent('cs:scores-updated', { detail: this.data.studentScores }));
  this.renderStudentsSidebar();
},
toggleStudentsSidebar: (show) => {
  this.toggleStudentsSidebar(show);
}
};
this.initBackgroundModalEvents();
this.initStudentModalEvents();
}

toggleStudentsSidebar(forceState) {
  const sidebar = document.getElementById('students-sidebar');
  if (!sidebar) return;
  const isHidden = forceState !== undefined ? !forceState : !sidebar.classList.contains('hidden');
  sidebar.classList.toggle('hidden', isHidden);
  const toggleBtn = document.getElementById('btn-toggle-sidebar');
  if (toggleBtn) toggleBtn.classList.toggle('active', !isHidden);
  if (!isHidden) {
    this.renderStudentsSidebar();
  }
}

renderStudentsSidebar() {
  const sidebar = document.getElementById('students-sidebar');
  if (!sidebar || sidebar.classList.contains('hidden')) return;

  const classLists = this.data.classLists || [];
  const currentClass = classLists.find(c => c.id === this.data.selectedClassId) || classLists[0];
  const students = (currentClass ? currentClass.students : []).filter(Boolean);
  const scores = this.data.studentScores || {};

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div class="sidebar-header-top">
        <div style="display:flex;align-items:center;gap:5px;">
          <span style="font-size:1.15rem;">💎</span>
          <span style="font-weight:800;font-size:0.88rem;color:var(--text-dark);">ניקוד כיתתי</span>
        </div>
        <div style="display:flex;gap:4px;align-items:center;">
          <button class="mini-icon-btn" data-act="sidebar-all" title="הוסף נקודה לכל תלמידי הכיתה בבת אחת">+כולם</button>
          <button class="mini-icon-btn" data-act="sidebar-close" title="סגור סרגל">✕</button>
        </div>
      </div>
      ${classLists.length > 0 ? `
        <div class="sidebar-class-picker-wrap">
          <select class="sidebar-class-sel" title="בחר כיתה">
            ${classLists.map(c => `
              <option value="${c.id}" ${c.id === (currentClass ? currentClass.id : '') ? 'selected' : ''}>${c.name}</option>
            `).join('')}
          </select>
        </div>
      ` : ''}
    </div>
    <div class="sidebar-students-scroll">
      ${students.length === 0 ? `
        <div style="font-size:0.8rem;color:var(--text-muted);text-align:center;padding:16px 8px;">
          אין תלמידים בכיתה זו
        </div>
      ` : students.map(name => {
        const sc = scores[name] || { daily: 0, total: 0 };
        return `
          <div class="sidebar-student-row" data-student="${name}">
            <span class="sidebar-student-name" title="${name}">${name}</span>
            <div class="sidebar-actions-group">
              <span class="sidebar-student-score" title="יהלומים יומיים">💎 ${sc.daily}</span>
              <button class="sidebar-score-btn plus" data-student="${name}" data-action="plus" title="הוסף נקודה">+</button>
              <button class="sidebar-score-btn minus" data-student="${name}" data-action="minus" title="הורד נקודה">-</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  sidebar.querySelector('.sidebar-class-sel')?.addEventListener('change', (e) => {
    this.data.selectedClassId = e.target.value;
    this.saveState();
    this.renderStudentsSidebar();
    window.dispatchEvent(new CustomEvent('cs:class-changed', { detail: { classId: e.target.value } }));
  });

  sidebar.querySelector('[data-act="sidebar-close"]')?.addEventListener('click', () => {
    this.toggleStudentsSidebar(false);
  });

  sidebar.querySelector('[data-act="sidebar-all"]')?.addEventListener('click', () => {
    window.AppStore.addDiamondsToAll(1, 'חיזוק כיתתי');
    SoundFX.bell();
    this.showFloatingAward(sidebar, 'לכל הכיתה +1 💎', 'positive');
  });

  sidebar.querySelectorAll('.sidebar-score-btn.plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const studentName = btn.dataset.student;
      window.AppStore.addDiamondsToStudent(studentName, 1, 'חיזוק מהיר');
      SoundFX.bell();
      this.showFloatingAward(btn, '+1 💎', 'positive');
    });
  });

  sidebar.querySelectorAll('.sidebar-score-btn.minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const studentName = btn.dataset.student;
      window.AppStore.addDiamondsToStudent(studentName, -1, 'הפחתה');
      SoundFX.pop();
      this.showFloatingAward(btn, '-1 💎', 'negative');
    });
  });
}

showFloatingAward(targetEl, text, type = 'positive') {
  const floater = document.createElement('div');
  floater.className = `floating-award-pill ${type}`;
  floater.textContent = text;
  document.body.appendChild(floater);
  const rect = targetEl.getBoundingClientRect();
  floater.style.left = `${rect.left + rect.width / 2}px`;
  floater.style.top = `${rect.top}px`;
  setTimeout(() => floater.remove(), 900);
}
renderScreenTabs() {
this.screensTabsEl.innerHTML = this.data.screens.map(scr => `
<button class="screen-tab ${scr.id === this.currentScreen.id ? 'active' : ''}" data-scrid="${scr.id}" title="לחיצה כפולה לשינוי שם המסך">
<span class="tab-name">${scr.name}</span>
${this.data.screens.length > 1 ? `<span class="tab-close" data-delscr="${scr.id}">✕</span>` : ''}
</button>
`).join('');
this.screensTabsEl.querySelectorAll('.screen-tab').forEach(tab => {
tab.addEventListener('click', (e) => {
if (e.target.dataset.delscr) {
e.stopPropagation();
this.deleteScreen(e.target.dataset.delscr);
return;
}
this.switchScreen(tab.dataset.scrid);
});
tab.addEventListener('dblclick', () => {
const scr = this.data.screens.find(s => s.id === tab.dataset.scrid);
if (!scr) return;
const newName = prompt('שם חדש למסך:', scr.name);
if (newName && newName.trim()) {
scr.name = newName.trim();
this.saveState();
this.renderScreenTabs();
}
});
});
}
addScreen() {
const num = this.data.screens.length + 1;
const bgPool = BACKGROUNDS.nature;
const newScr = {
id: 'scr-' + Date.now(),
name: `מסך ${num}`,
background: bgPool[(num - 1) % bgPool.length].value,
widgets: []
};
this.data.screens.push(newScr);
this.data.activeScreenId = newScr.id;
this.saveState();
this.renderScreenTabs();
this.applyCurrentScreen();
}
deleteScreen(id) {
if (this.data.screens.length <= 1) return;
this.data.screens = this.data.screens.filter(s => s.id !== id);
if (this.data.activeScreenId === id) {
this.data.activeScreenId = this.data.screens[0].id;
}
this.saveState();
this.renderScreenTabs();
this.applyCurrentScreen();
}
switchScreen(id) {
if (this.data.activeScreenId === id) return;
this.data.activeScreenId = id;
this.saveState();
this.renderScreenTabs();
this.applyCurrentScreen();
}
applyCurrentScreen() {
this.activeCleanups.forEach(fn => {
if (typeof fn === 'function') fn();
});
this.activeCleanups.clear();
const scr = this.currentScreen;
if (scr.background.startsWith('url(')) {
this.bgLayer.style.background = '';
this.bgLayer.style.backgroundImage = scr.background;
} else {
this.bgLayer.style.backgroundImage = '';
this.bgLayer.style.background = scr.background;
}
this.workspace.innerHTML = '';
scr.widgets.forEach(wData => this.mountWidget(wData));
}
addWidget(type, customOverrides = {}) {
const def = WIDGET_REGISTRY[type];
if (!def) return;
const count = this.currentScreen.widgets.length;
const offset = (count % 7) * 28;
const w = customOverrides.w || def.defaultW || 320;
const h = customOverrides.h || def.defaultH || 260;
const x = customOverrides.x ?? Math.max(30, Math.min(window.innerWidth - w - 40, Math.floor((window.innerWidth - w) / 2) + offset - 60));
const y = customOverrides.y ?? Math.max(68, Math.min(window.innerHeight - h - 100, 95 + offset));
const wData = {
id: 'w-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
type,
x,
y,
w,
h,
theme: customOverrides.theme || 'light',
minimized: false,
state: customOverrides.state || {}
};
this.currentScreen.widgets.push(wData);
this.saveState();
SoundFX.pop();
this.mountWidget(wData);
}

mountWidget(wData) {
const def = WIDGET_REGISTRY[wData.type];
if (!def) return;
const win = document.createElement('section');
win.className = `widget-window ${wData.theme === 'dark' ? 'theme-dark' : wData.theme === 'glass' ? 'theme-glass' : ''} ${wData.minimized ? 'minimized' : ''}`;
win.dataset.id = wData.id;
win.dataset.type = wData.type;
win.style.left = `${wData.x}px`;
win.style.top = `${wData.y}px`;
win.style.width = `${wData.w}px`;
win.style.height = `${wData.h}px`;
win.style.zIndex = ++this.topZ;
win.innerHTML = `
<header class="widget-header">
<div class="widget-title-group">
${getWidgetHeaderCapsule(wData.type)}
<span class="w-title-text">${def.title}</span>
</div>
<div class="widget-controls">
<button class="w-ctrl-btn" data-wact="theme" title="שנה ערכת נושא (בהיר/כהה/שקוף)">
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
</button>
<button class="w-ctrl-btn" data-wact="min" title="מזער/הגדל חלון">
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
</button>
<button class="w-ctrl-btn close-btn" data-wact="close" title="סגור כלי">
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
</button>
</div>
</header>
<div class="widget-body"></div>
<div class="widget-resize-handle" title="גרור לשינוי גודל"></div>
`;
this.workspace.appendChild(win);
const bodyEl = win.querySelector('.widget-body');
const cleanup = def.render(bodyEl, wData.state, () => this.saveState());
if (cleanup) this.activeCleanups.set(wData.id, cleanup);
win.addEventListener('pointerdown', () => {
document.querySelectorAll('.widget-window').forEach(el => el.classList.remove('active-widget'));
win.classList.add('active-widget');
win.style.zIndex = ++this.topZ;
});
win.querySelector('[data-wact="theme"]').addEventListener('click', (e) => {
e.stopPropagation();
const order = ['light', 'dark', 'glass'];
const next = order[(order.indexOf(wData.theme || 'light') + 1) % order.length];
wData.theme = next;
win.classList.remove('theme-dark', 'theme-glass');
if (next === 'dark') win.classList.add('theme-dark');
if (next === 'glass') win.classList.add('theme-glass');
this.saveState();
});
win.querySelector('[data-wact="min"]').addEventListener('click', (e) => {
e.stopPropagation();
wData.minimized = !wData.minimized;
win.classList.toggle('minimized', wData.minimized);
this.saveState();
});
win.querySelector('[data-wact="close"]').addEventListener('click', (e) => {
e.stopPropagation();
if (this.activeCleanups.has(wData.id)) {
this.activeCleanups.get(wData.id)();
this.activeCleanups.delete(wData.id);
}
this.currentScreen.widgets = this.currentScreen.widgets.filter(w => w.id !== wData.id);
this.saveState();
win.remove();
});
win.querySelectorAll('[data-wclose]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (this.activeCleanups.has(wData.id)) {
      this.activeCleanups.get(wData.id)();
      this.activeCleanups.delete(wData.id);
    }
    this.currentScreen.widgets = this.currentScreen.widgets.filter(w => w.id !== wData.id);
    this.saveState();
    win.remove();
  });
});
const dragHandles = win.querySelectorAll('.widget-header, [data-wdrag]');
dragHandles.forEach(header => {
  header.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.widget-controls, button, select, input')) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = wData.x;
    const origY = wData.y;
    const onMove = (ev) => {
      wData.x = Math.max(0, Math.min(window.innerWidth - 80, origX + (ev.clientX - startX)));
      wData.y = Math.max(54, Math.min(window.innerHeight - 60, origY + (ev.clientY - startY)));
      win.style.left = `${wData.x}px`;
      win.style.top = `${wData.y}px`;
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      this.saveState();
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  });
});
const resizeHandle = win.querySelector('.widget-resize-handle');
resizeHandle.addEventListener('pointerdown', (e) => {
e.preventDefault();
e.stopPropagation();
const startX = e.clientX;
const startY = e.clientY;
const origW = wData.w;
const origH = wData.h;
const origX = wData.x;
const onMove = (ev) => {
const dx = ev.clientX - startX;
const dy = ev.clientY - startY;
const newW = Math.max(200, origW - dx);
const newH = Math.max(150, origH + dy);
wData.x = origX + (origW - newW);
wData.w = newW;
wData.h = newH;
win.style.left = `${wData.x}px`;
win.style.width = `${wData.w}px`;
win.style.height = `${wData.h}px`;
};
const onUp = () => {
window.removeEventListener('pointermove', onMove);
window.removeEventListener('pointerup', onUp);
this.saveState();
};
window.addEventListener('pointermove', onMove);
window.addEventListener('pointerup', onUp);
});
}
applyTemplate(templateKey) {
const W = window.innerWidth;
this.currentScreen.widgets = [];
if (templateKey === 'morning') {
this.currentScreen.background = BACKGROUNDS.nature[0].value;
this.addWidget('clock', { x: W - 330, y: 75, w: 290, h: 290 });
this.addWidget('timetable', { x: Math.floor(W / 2 - 170), y: 75, w: 340, h: 350 });
this.addWidget('text', {
x: 40, y: 75, w: 380, h: 290,
state: { html: `<h3>☀️ בוקר טוב תלמידים יקרים!</h3><ul><li>מה שלומכם הבוקר?</li><li>בדקו את מערכת השעות להיום</li><li>משימת פתיחה: כתבו במחברת דבר אחד משמח שקרה לכם השבוע</li></ul>` }
});
} else if (templateKey === 'independent') {
this.currentScreen.background = BACKGROUNDS.classroom[0].value;
this.addWidget('visual-timer', { x: W - 330, y: 80, w: 290, h: 310, state: { total: 600, rem: 600 } });
this.addWidget('work-symbols', { x: Math.floor(W / 2 - 160), y: 80, w: 310, h: 270, state: { mode: 'silence' } });
this.addWidget('noise-meter', { x: Math.floor(W / 2 - 160), y: 365, w: 340, h: 245 });
this.addWidget('traffic-light', { x: 40, y: 80, w: 210, h: 340, state: { activeLight: 'red' } });
} else if (templateKey === 'groupwork') {
this.currentScreen.background = BACKGROUNDS.colors[1].value;
this.addWidget('group-maker', { x: W - 470, y: 80, w: 430, h: 370 });
this.addWidget('timer', { x: Math.floor(W / 2 - 220), y: 80, w: 320, h: 250, state: { totalSeconds: 900, remaining: 900 } });
this.addWidget('work-symbols', { x: 40, y: 80, w: 310, h: 270, state: { mode: 'together' } });
this.addWidget('noise-meter', { x: 40, y: 365, w: 340, h: 245 });
} else if (templateKey === 'game') {
this.currentScreen.background = BACKGROUNDS.colors[0].value;
this.addWidget('random-name', { x: W - 390, y: 80, w: 350, h: 370 });
this.addWidget('scoreboard', { x: Math.floor(W / 2 - 200), y: 80, w: 390, h: 265 });
this.addWidget('dice', { x: 40, y: 80, w: 300, h: 240 });
this.addWidget('stickers', { x: 40, y: 335, w: 320, h: 260 });
} else if (templateKey === 'discussion') {
this.currentScreen.background = BACKGROUNDS.classroom[1].value;
this.addWidget('poll', { x: W - 420, y: 80, w: 380, h: 320 });
this.addWidget('random-name', { x: Math.floor(W / 2 - 180), y: 80, w: 350, h: 360, state: { mode: 'card' } });
this.addWidget('draw', { x: 40, y: 80, w: 410, h: 340 });
}
this.saveState();
this.applyCurrentScreen();
}
openBackgroundModal() {
document.getElementById('modal-background').classList.remove('hidden');
this.renderBgCategory('nature');
}
initBackgroundModalEvents() {
const tabs = document.querySelectorAll('.bg-tab');
const customSection = document.getElementById('bg-custom-section');
const gridEl = document.getElementById('bg-picker-grid');
tabs.forEach(tab => {
tab.addEventListener('click', () => {
tabs.forEach(t => t.classList.remove('active'));
tab.classList.add('active');
const cat = tab.dataset.bgtab;
if (cat === 'custom') {
gridEl.classList.add('hidden');
customSection.classList.remove('hidden');
} else {
customSection.classList.add('hidden');
gridEl.classList.remove('hidden');
this.renderBgCategory(cat);
}
});
});
document.getElementById('bg-file-input').addEventListener('change', (e) => {
const file = e.target.files[0];
if (!file) return;
const reader = new FileReader();
reader.onload = () => {
this.setBackground(`url("${reader.result}")`);
document.getElementById('modal-background').classList.add('hidden');
};
reader.readAsDataURL(file);
});
document.getElementById('btn-apply-bg-url').addEventListener('click', () => {
const url = document.getElementById('bg-url-input').value.trim();
if (url) {
this.setBackground(`url("${url}")`);
document.getElementById('modal-background').classList.add('hidden');
}
});
}
renderBgCategory(category) {
const gridEl = document.getElementById('bg-picker-grid');
const items = BACKGROUNDS[category] || [];
gridEl.innerHTML = items.map((item, idx) => {
const style = item.value.startsWith('url(') ? `background-image:${item.value}` : `background:${item.value}`;
return `
<div class="bg-thumb" data-idx="${idx}" data-cat="${category}" style="${style}">
<span>${item.name}</span>
</div>
`;
}).join('');
gridEl.querySelectorAll('.bg-thumb').forEach(thumb => {
thumb.addEventListener('click', () => {
const chosen = BACKGROUNDS[thumb.dataset.cat][thumb.dataset.idx];
this.setBackground(chosen.value);
});
});
}
setBackground(bgValue) {
this.currentScreen.background = bgValue;
this.saveState();
if (bgValue.startsWith('url(')) {
this.bgLayer.style.background = '';
this.bgLayer.style.backgroundImage = bgValue;
} else {
this.bgLayer.style.backgroundImage = '';
this.bgLayer.style.background = bgValue;
}
}
openStudentsModal(classId, onUpdateCallback) {
this.onStudentModalCloseCallback = onUpdateCallback;
this.editingClassId = classId || this.data.selectedClassId || this.data.classLists[0].id;
document.getElementById('modal-students').classList.remove('hidden');
this.renderStudentModalUI();
}
initStudentModalEvents() {
const nameInput = document.getElementById('current-class-name');
const textarea = document.getElementById('student-names-textarea');
const badge = document.getElementById('student-count-badge');
textarea.addEventListener('input', () => {
const lines = textarea.value.split('\n').map(s => s.trim()).filter(Boolean);
badge.textContent = `${lines.length} תלמידים`;
});
document.getElementById('btn-new-class-list').addEventListener('click', () => {
const newCls = {
id: 'cls-' + Date.now(),
name: `כיתה חדשה ${this.data.classLists.length + 1}`,
students: ['תלמיד 1', 'תלמיד 2', 'תלמיד 3']
};
this.data.classLists.push(newCls);
this.editingClassId = newCls.id;
this.saveState();
this.renderStudentModalUI();
});
document.getElementById('btn-load-sample-students').addEventListener('click', () => {
textarea.value = DEFAULT_STUDENTS.join('\n');
badge.textContent = `${DEFAULT_STUDENTS.length} תלמידים`;
});
document.getElementById('btn-delete-class-list').addEventListener('click', () => {
if (this.data.classLists.length <= 1) {
alert('חייבת להישאר לפחות רשימת כיתה אחת.');
return;
}
this.data.classLists = this.data.classLists.filter(c => c.id !== this.editingClassId);
this.editingClassId = this.data.classLists[0].id;
this.saveState();
this.renderStudentModalUI();
});
document.getElementById('btn-save-student-list').addEventListener('click', () => {
const cls = this.data.classLists.find(c => c.id === this.editingClassId);
if (cls) {
cls.name = nameInput.value.trim() || 'כיתה';
cls.students = textarea.value.split('\n').map(s => s.trim()).filter(Boolean);
this.data.selectedClassId = cls.id;
this.saveState();
SoundFX.pop();
this.renderStudentModalUI();
if (this.onStudentModalCloseCallback) this.onStudentModalCloseCallback();
document.getElementById('modal-students').classList.add('hidden');
}
});
}
renderStudentModalUI() {
const navEl = document.getElementById('class-lists-nav');
const nameInput = document.getElementById('current-class-name');
const textarea = document.getElementById('student-names-textarea');
const badge = document.getElementById('student-count-badge');
const current = this.data.classLists.find(c => c.id === this.editingClassId) || this.data.classLists[0];
this.editingClassId = current.id;
navEl.innerHTML = this.data.classLists.map(c => `
<button class="class-nav-item ${c.id === current.id ? 'active' : ''}" data-cid="${c.id}">
${c.name} (${c.students.length})
</button>
`).join('');
navEl.querySelectorAll('.class-nav-item').forEach(btn => {
btn.addEventListener('click', () => {
this.editingClassId = btn.dataset.cid;
this.renderStudentModalUI();
});
});
nameInput.value = current.name;
textarea.value = current.students.join('\n');
badge.textContent = `${current.students.length} תלמידים`;
}
initAnnotationCanvas() {
const canvas = document.getElementById('annotation-canvas');
const ctx = canvas.getContext('2d');
const toolbar = document.getElementById('annotation-toolbar');
const toggleBtn = document.getElementById('btn-annotate-toggle');
const colorInput = document.getElementById('anno-color');
const sizeSelect = document.getElementById('anno-size');
const eraserBtn = document.getElementById('btn-anno-eraser');
let isAnnotating = false;
let isDrawing = false;
let isEraser = false;
const resize = () => {
const saved = canvas.toDataURL();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const img = new Image();
img.onload = () => ctx.drawImage(img, 0, 0);
img.src = saved;
};
window.addEventListener('resize', resize);
resize();
const setMode = (active) => {
isAnnotating = active;
canvas.classList.toggle('active', active);
toolbar.classList.toggle('hidden', !active);
toggleBtn.classList.toggle('active-mode', active);
};
toggleBtn.addEventListener('click', () => setMode(!isAnnotating));
document.getElementById('btn-anno-done').addEventListener('click', () => setMode(false));
document.querySelectorAll('#anno-color-presets .color-dot').forEach(dot => {
dot.addEventListener('click', () => {
isEraser = false;
eraserBtn.classList.remove('active-mode');
colorInput.value = dot.dataset.color;
document.querySelectorAll('#anno-color-presets .color-dot').forEach(d => d.classList.remove('active'));
dot.classList.add('active');
});
});
colorInput.addEventListener('input', () => {
isEraser = false;
eraserBtn.classList.remove('active-mode');
});
eraserBtn.addEventListener('click', () => {
isEraser = !isEraser;
eraserBtn.classList.toggle('active-mode', isEraser);
});
document.getElementById('btn-anno-clear').addEventListener('click', () => {
ctx.clearRect(0, 0, canvas.width, canvas.height);
});
canvas.addEventListener('pointerdown', (e) => {
if (!isAnnotating) return;
isDrawing = true;
ctx.beginPath();
ctx.moveTo(e.clientX, e.clientY);
});
canvas.addEventListener('pointermove', (e) => {
if (!isDrawing || !isAnnotating) return;
ctx.lineTo(e.clientX, e.clientY);
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
if (isEraser) {
ctx.globalCompositeOperation = 'destination-out';
ctx.lineWidth = 32;
} else {
ctx.globalCompositeOperation = 'source-over';
ctx.strokeStyle = colorInput.value;
ctx.lineWidth = parseInt(sizeSelect.value, 10);
}
ctx.stroke();
});
window.addEventListener('pointerup', () => {
isDrawing = false;
ctx.globalCompositeOperation = 'source-over';
});
}
}
window.addEventListener('DOMContentLoaded', () => {
window.classroomApp = new ClassroomApp();
});