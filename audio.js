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
    alarm() {
      this.bell();
      setTimeout(() => this.bell(), 950);
    },
    fanfare() {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((n, i) => playTone(n, 'triangle', 0.28, 0.25, i * 0.1));
    },
    hushAlert() {
      playTone(440, 'sine', 0.25, 0.22, 0);
      playTone(349.23, 'sine', 0.4, 0.22, 0.22);
    }
  };
})();