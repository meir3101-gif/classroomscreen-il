// Web Audio API Sound Effects for Classroomscreen IL
const SoundFX = (() => {
  let ctx = null;

  function getContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  function playTone(freq, type = 'sine', duration = 0.2, volume = 0.25, delay = 0) {
    const audio = getContext();
    if (!audio) return;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const startTime = audio.currentTime + delay;

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(audio.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  function playSweep(startFreq, endFreq, type = 'sine', duration = 0.16, volume = 0.18, delay = 0) {
    const audio = getContext();
    if (!audio) return;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const startTime = audio.currentTime + delay;

    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, endFreq), startTime + duration);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(audio.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  return {
    pop() {
      playTone(520, 'sine', 0.08, 0.15, 0);
    },
    tick() {
      playTone(800, 'triangle', 0.04, 0.08, 0);
    },
    bell() {
      playTone(523.25, 'sine', 0.35, 0.3, 0);
      playTone(659.25, 'sine', 0.35, 0.3, 0.14);
      playTone(783.99, 'sine', 0.4, 0.3, 0.28);
      playTone(1046.5, 'sine', 0.85, 0.35, 0.42);
    },
    diamondAward(pts = 1) {
      // Snappy sparkling crystal chime + high shimmer
      const baseNotes = pts >= 2
        ? [783.99, 987.77, 1174.66, 1567.98] // G5 B5 D6 G6
        : [880, 1174.66, 1567.98];           // A5 D6 G6
      baseNotes.forEach((n, i) => {
        playTone(n, 'triangle', 0.18, 0.22, i * 0.05);
        playTone(n * 2, 'sine', 0.22, 0.08, i * 0.05 + 0.02);
      });
      // Final crystal sparkle ring
      playTone(2093, 'sine', 0.38, 0.12, baseNotes.length * 0.05);
    },
    allClassAward() {
      const chord = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      chord.forEach((n, i) => {
        playTone(n, 'triangle', 0.28, 0.2, i * 0.045);
        playTone(n * 1.5, 'sine', 0.22, 0.06, i * 0.045 + 0.03);
      });
    },
    deduct() {
      playSweep(330, 190, 'sine', 0.16, 0.16, 0);
    },
    undo() {
      playTone(660, 'sine', 0.09, 0.14, 0);
      playTone(493.88, 'sine', 0.13, 0.14, 0.06);
    },
    alarm() {
      this.bell();
      setTimeout(() => this.bell(), 950);
    },
    fanfare() {
      // Triumphant stadium victory fanfare with harmony
      const melody = [
        { f: 523.25, d: 0.14, t: 0 },
        { f: 523.25, d: 0.14, t: 0.14 },
        { f: 523.25, d: 0.14, t: 0.28 },
        { f: 659.25, d: 0.22, t: 0.42 },
        { f: 587.33, d: 0.14, t: 0.64 },
        { f: 659.25, d: 0.14, t: 0.78 },
        { f: 783.99, d: 0.55, t: 0.92 },
        { f: 1046.5, d: 0.65, t: 1.05 }
      ];
      melody.forEach(m => {
        playTone(m.f, 'triangle', m.d, 0.22, m.t);
        playTone(m.f * 0.5, 'sine', m.d, 0.12, m.t);
      });
    },
    hushAlert() {
      playTone(440, 'sine', 0.25, 0.22, 0);
      playTone(349.23, 'sine', 0.4, 0.22, 0.22);
    }
  };
})();