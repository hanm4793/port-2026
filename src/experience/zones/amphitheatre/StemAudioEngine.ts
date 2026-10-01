// =============================================================================
// StemAudioEngine — real-time procedural Web Audio synthesizer for Amphitheatre
// Generates 3 synchronized musical stems (Rhythm, Harmony, Vocals) and
// acoustic lyre chimes using pure Web Audio API oscillators and filters.
// Connected directly into AudioManager's Amphitheatre channel (no separate master).
// =============================================================================

import type { AudioStemId } from './amphitheatreConfig';

class StemAudioEngine {
  private ctx: AudioContext | null = null;
  private outputNode: AudioNode | null = null;
  private isRunning = false;
  private isMuted = false;

  // Master and stem gain nodes
  private subMasterGain: GainNode | null = null;
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

  /** Initialize or re-attach to an existing AudioContext & destination node */
  init(sharedContext?: AudioContext, destination?: AudioNode): void {
    if (this.isRunning && this.ctx && this.ctx.state === 'running') {
      return;
    }

    try {
      if (sharedContext) {
        this.ctx = sharedContext;
      } else if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }

      this.outputNode = destination || this.ctx.destination;

      // Sub-master output for stems
      this.subMasterGain = this.ctx.createGain();
      this.subMasterGain.gain.setValueAtTime(this.isMuted ? 0.0 : 0.6, this.ctx.currentTime);
      this.subMasterGain.connect(this.outputNode);

      // Create stem channel gain nodes
      (['rhythm', 'harmony', 'vocals'] as AudioStemId[]).forEach((id) => {
        if (!this.ctx || !this.subMasterGain) return;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(this.activeState[id] ? 0.45 : 0.0, this.ctx.currentTime);
        gain.connect(this.subMasterGain);
        this.stemGains[id] = gain;
      });

      this.startGenerators();
      this.isRunning = true;
      console.log('[StemAudioEngine] Synthesizer online and attached to zone channel.');
    } catch (e) {
      console.warn('[StemAudioEngine] Web Audio initialization failed:', e);
    }
  }

  /** Connect to an external gain channel (e.g. AudioManager.zoneGains.amphitheatre) */
  connectTo(node: AudioNode): void {
    this.outputNode = node;
    if (this.subMasterGain) {
      try {
        this.subMasterGain.disconnect();
        this.subMasterGain.connect(node);
      } catch (e) {
        console.warn('[StemAudioEngine] Reconnect failed:', e);
      }
    }
  }

  /** Start procedural musical generators */
  private startGenerators(): void {
    if (!this.ctx) return;

    // 1. HARMONY STEM: Continuous warm analog pad (Dm9 chord: D3, F3, A3, C4, E4)
    this.startHarmonyPad();

    // 2. RHYTHM STEM: Repeating subterranean pulse (1.6s interval)
    if (this.rhythmTimer) clearInterval(this.rhythmTimer);
    this.rhythmTimer = window.setInterval(() => {
      this.triggerRhythmPulse();
    }, 1600);
    this.triggerRhythmPulse();

    // 3. VOCALS / LEAD STEM: Ancient Dorian melodic motif (every 3.2s)
    const melodyNotes = [293.66, 349.23, 440.0, 392.0, 329.63]; // D4, F4, A4, G4, E4
    let noteIdx = 0;
    if (this.melodyTimer) clearInterval(this.melodyTimer);
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
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);
    filter.connect(this.stemGains.harmony);

    chordFrequencies.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.detune.setValueAtTime((idx - 1.5) * 8, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
    });
  }

  /** Rhythm: deep resonant bass kick & sub-frequency thud */
  private triggerRhythmPulse(): void {
    if (!this.ctx || !this.stemGains.rhythm || !this.activeState.rhythm || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(130, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.4);

    gain.gain.setValueAtTime(0.85, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

    osc.connect(gain);
    gain.connect(this.stemGains.rhythm);

    osc.start(t);
    osc.stop(t + 0.85);
  }

  /** Vocals / Lead: resonant flute-like melodic chime */
  private triggerMelodyNote(freq: number): void {
    if (!this.ctx || !this.stemGains.vocals || !this.activeState.vocals || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, t);
    filter.Q.setValueAtTime(3.5, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.stemGains.vocals);

    osc.start(t);
    osc.stop(t + 1.55);
  }

  /** Subtle optical dial tick when entering interactive proximity or reticle lock */
  playHoverTick(): void {
    if (!this.ctx || this.isMuted || this.ctx.state !== 'running') return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1480, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.04);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.subMasterGain || this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.045);
    } catch {
      // Audio errors are non-critical
    }
  }

  /** Resonant harmonic chime when discovering a Memory Seal */
  playSealUnlockChime(): void {
    if (!this.ctx || this.isMuted || this.ctx.state !== 'running') return;

    const chords = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chords.forEach((freq, idx) => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime + idx * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

      osc.connect(gain);
      gain.connect(this.subMasterGain || this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.25);
    });
  }

  /** Play a rich harp/lyre arpeggio chime when central lyre is clicked */
  playLyreChime(): void {
    if (!this.ctx || this.isMuted || this.ctx.state !== 'running') return;

    const notes = [440.0, 523.25, 659.25, 783.99, 880.0]; // A4, C5, E5, G5, A5
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.4, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);

      osc.connect(gain);
      gain.connect(this.subMasterGain || this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.85);
    });
  }

  /** Toggle stem on/off with smooth gain ramp */
  toggleStem(id: AudioStemId): boolean {
    this.activeState[id] = !this.activeState[id];

    if (this.ctx && this.stemGains[id]) {
      const targetGain = this.activeState[id] ? 0.45 : 0.0;
      const gainNode = this.stemGains[id]!;
      gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.15);
    }
    return this.activeState[id];
  }

  isStemActive(id: AudioStemId): boolean {
    return this.activeState[id];
  }

  dispose(): void {
    if (this.rhythmTimer) clearInterval(this.rhythmTimer);
    if (this.melodyTimer) clearInterval(this.melodyTimer);
    this.isRunning = false;
  }
}

export const stemAudioEngine = new StemAudioEngine();
