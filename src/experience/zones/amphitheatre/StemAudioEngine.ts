// =============================================================================
// StemAudioEngine — real-time procedural Web Audio synthesizer for Amphitheatre
// Generates 3 synchronized musical stems (Rhythm, Harmony, Vocals) and
// acoustic lyre chimes using pure Web Audio API oscillators and filters.
// Zero external file dependencies — plays immediately on interaction.
// =============================================================================

import type { AudioStemId } from './amphitheatreConfig';

class StemAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning = false;

  // Master and stem gain nodes
  private masterGain: GainNode | null = null;
  private stemGains: Record<AudioStemId, GainNode | null> = {
    rhythm: null,
    harmony: null,
    vocals: null,
  };

  // Stem state
  private activeState: Record<AudioStemId, boolean> = {
    rhythm: true,
    harmony: true,
    vocals: true,
  };

  // Intervals for rhythmic loops
  private rhythmTimer: number | null = null;
  private melodyTimer: number | null = null;

  /** Initialize AudioContext and procedural generators */
  init(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create stem channel gain nodes
      (['rhythm', 'harmony', 'vocals'] as AudioStemId[]).forEach((id) => {
        if (!this.ctx || !this.masterGain) return;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(this.activeState[id] ? 0.35 : 0.0, this.ctx.currentTime);
        gain.connect(this.masterGain);
        this.stemGains[id] = gain;
      });

      this.startGenerators();
      this.isRunning = true;
      console.log('[StemAudioEngine] Synthesizer online — 3 stems active.');
    } catch (e) {
      console.warn('[StemAudioEngine] Web Audio API initialization failed:', e);
    }
  }

  /** Start procedural musical generators */
  private startGenerators(): void {
    if (!this.ctx) return;

    // 1. HARMONY STEM: Continuous warm analog pad (Dm9 chord: D3, F3, A3, C4, E4)
    this.startHarmonyPad();

    // 2. RHYTHM STEM: Repeating subterranean pulse (1.6s interval)
    this.rhythmTimer = window.setInterval(() => {
      this.triggerRhythmPulse();
    }, 1600);
    this.triggerRhythmPulse();

    // 3. VOCALS / LEAD STEM: Ancient Dorian melodic motif (every 3.2s)
    const melodyNotes = [293.66, 349.23, 440.0, 392.0, 329.63]; // D4, F4, A4, G4, E4
    let noteIdx = 0;
    this.melodyTimer = window.setInterval(() => {
      this.triggerMelodyNote(melodyNotes[noteIdx % melodyNotes.length]);
      noteIdx++;
    }, 1600);
  }

  /** Harmony: lush ambient analog minor-9th pad */
  private startHarmonyPad(): void {
    if (!this.ctx || !this.stemGains.harmony) return;

    const chordFrequencies = [146.83, 174.61, 220.0, 261.63]; // D3, F3, A3, C4
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);
    filter.connect(this.stemGains.harmony);

    chordFrequencies.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle detune for analog warmth
      osc.detune.setValueAtTime((idx - 1.5) * 6, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
    });
  }

  /** Rhythm: deep resonant bass kick & sub-frequency thud */
  private triggerRhythmPulse(): void {
    if (!this.ctx || !this.stemGains.rhythm || !this.activeState.rhythm) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Frequency drop: 110Hz -> 38Hz (sub kick)
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.35);

    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    osc.connect(gain);
    gain.connect(this.stemGains.rhythm);

    osc.start(t);
    osc.stop(t + 0.75);
  }

  /** Vocals / Lead: resonant flute-like melodic chime */
  private triggerMelodyNote(freq: number): void {
    if (!this.ctx || !this.stemGains.vocals || !this.activeState.vocals) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    // Filter creates breath-like acoustic resonance
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, t);
    filter.Q.setValueAtTime(3.0, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.stemGains.vocals);

    osc.start(t);
    osc.stop(t + 1.45);
  }

  /** Play a rich harp/lyre arpeggio chime when central lyre is clicked */
  playLyreChime(): void {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    const notes = [440.0, 523.25, 659.25, 783.99, 880.0]; // A4, C5, E5, G5, A5
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 1.65);
    });
  }

  /** Toggle stem on/off with smooth gain ramp */
  toggleStem(id: AudioStemId): boolean {
    this.init();
    if (!this.ctx) return false;

    this.activeState[id] = !this.activeState[id];
    const gainNode = this.stemGains[id];
    if (gainNode) {
      const targetGain = this.activeState[id] ? 0.35 : 0.0;
      gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.15);
    }
    return this.activeState[id];
  }

  /** Get stem active state */
  isStemActive(id: AudioStemId): boolean {
    return this.activeState[id];
  }

  dispose(): void {
    if (this.rhythmTimer) clearInterval(this.rhythmTimer);
    if (this.melodyTimer) clearInterval(this.melodyTimer);
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.isRunning = false;
  }
}

export const stemAudioEngine = new StemAudioEngine();
