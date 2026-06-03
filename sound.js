/**
 * Daily Companion - 音效系统
 * 基于 Web Audio API 的温润悦耳音效
 */

const SoundSystem = {
  ctx: null,
  enabled: true,
  volume: 0.25,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const saved = localStorage.getItem('dc_sound');
    if (saved) {
      const cfg = JSON.parse(saved);
      this.enabled = cfg.enabled !== false;
      this.volume = cfg.volume ?? 0.25;
    }
  },

  save() {
    localStorage.setItem('dc_sound', JSON.stringify({ enabled: this.enabled, volume: this.volume }));
  },

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  toggle() {
    this.enabled = !this.enabled;
    this.save();
    return this.enabled;
  },

  // 柔和「叮」声 — 消息/成功
  playChime(freq = 880, duration = 0.5) {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + duration * 0.3);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(this.volume * 0.4, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + duration);
  },

  // 消息提示音
  playMessage() {
    this.playChime(698.46, 0.4); // F5
    setTimeout(() => this.playChime(880, 0.35), 120); // A5
  },

  // 发送消息音
  playSend() {
    this.playChime(1046.5, 0.25); // C6
  },

  // 完成/成功音
  playSuccess() {
    const t = this.ctx?.currentTime || 0;
    this.playChime(523.25, 0.3);  // C5
    setTimeout(() => this.playChime(659.25, 0.3), 100); // E5
    setTimeout(() => this.playChime(783.99, 0.4), 200); // G5
  },

  // 待办完成音
  playCheck() {
    this.playChime(880, 0.2);
    setTimeout(() => this.playChime(1108.73, 0.25), 80);
  },

  // 弹窗打开音
  playOpen() {
    this.playChime(659.25, 0.2);
  },

  // 弹窗关闭音
  playClose() {
    this.playChime(523.25, 0.2);
  },

  // 错误/警告音
  playError() {
    this.playChime(300, 0.3);
  },

  // 轻柔背景氛围音（单次）
  playAmbient() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.linearRampToValueAtTime(261.63, t + 2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.linearRampToValueAtTime(200, t + 3);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(this.volume * 0.08, t + 1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 4);
  }
};
