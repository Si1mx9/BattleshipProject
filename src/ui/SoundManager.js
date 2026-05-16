class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      this.enabled = false;
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  _tone(freq, duration, type = 'sawtooth', gain = 0.3, delay = 0) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gainNode.gain.setValueAtTime(gain, t);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + duration);
  }

  playHit() {
    this._tone(200, 0.3, 'sawtooth', 0.4);
    this._tone(100, 0.4, 'square', 0.2, 0.05);
  }

  playMiss() {
    this._tone(300, 0.12, 'sine', 0.12);
    this._tone(250, 0.15, 'sine', 0.08, 0.06);
  }

  playSunk() {
    this._tone(150, 0.5, 'sawtooth', 0.4);
    this._tone(80, 0.7, 'sawtooth', 0.3, 0.15);
    this._tone(60, 0.9, 'sawtooth', 0.2, 0.3);
  }

  playGameOver(won) {
    if (won) {
      [523, 659, 784, 1047].forEach((f, i) => this._tone(f, 0.3, 'sine', 0.25, i * 0.15));
    } else {
      [400, 350, 300, 200].forEach((f, i) => this._tone(f, 0.4, 'sawtooth', 0.2, i * 0.2));
    }
  }

  playPlace() {
    this._tone(440, 0.08, 'sine', 0.2);
    this._tone(660, 0.08, 'sine', 0.2, 0.08);
  }

  playClick() {
    this._tone(800, 0.05, 'sine', 0.1);
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

export default new SoundManager();
