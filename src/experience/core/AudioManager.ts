// =============================================================================
// AudioManager — central Web Audio API engine for Island of Memory
// Features:
// - Procedural zero-dependency ambient soundscapes for Shore, Forum, Dino & Amphitheatre
// - Automatic crossfading (2.5s) between territorial soundscapes
// - Automatic tab focus dimming (visibilitychange & blur/focus)
// - Dynamic ducking (-8dB) when reading case studies or discovering seals
// - Seamless synchronization with useAudioStore
// =============================================================================

import { useAudioStore } from '@/stores/useAudioStore';
import { stemAudioEngine } from '@/experience/zones/amphitheatre/StemAudioEngine';

type ZoneAudioId = 'shore' | 'forum' | 'sanctuary' | 'amphitheatre';

class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private duckingGain: GainNode | null = null;
  private visibilityGain: GainNode | null = null;

  // Zone ambient channels
  private zoneGains: Record<ZoneAudioId, GainNode | null> = {
    shore: null,
    forum: null,
    sanctuary: null,
    amphitheatre: null,
  };

  private currentZone: ZoneAudioId = 'shore';
  private initialized = false;
  private isTabVisible = true;

  constructor() {
    if (typeof window !== 'undefined') {
      // 1. Tab visibility & blur handling
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
      window.addEventListener('blur', () => this.setTabFocus(false));
      window.addEventListener('focus', () => this.setTabFocus(true));

      // 2. Subscribe to audio store changes (mute, ducking, zone)
      useAudioStore.subscribe((state) => {
        this.syncState(state);
      });
    }
  }

  private handleVisibilityChange = () => {
    this.setTabFocus(!document.hidden);
  };

  private setTabFocus(focused: boolean) {
    this.isTabVisible = focused;
    if (!this.ctx || !this.visibilityGain) return;

    const t = this.ctx.currentTime;
    const target = focused ? 1.0 : 0.0;
    this.visibilityGain.gain.cancelScheduledValues(t);
    this.visibilityGain.gain.linearRampToValueAtTime(target, t + (focused ? 0.3 : 0.15));
  }

  private syncState(state: { enabled: boolean; isMuted: boolean; isDucked: boolean; currentZone: ZoneAudioId }) {
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Master volume / mute
    if (this.masterGain) {
      const targetVol = state.enabled && !state.isMuted ? 0.5 : 0.0;
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.linearRampToValueAtTime(targetVol, t + 0.15);
    }

    // Ducking (when reading drawer / modal)
    if (this.duckingGain) {
      const duckTarget = state.isDucked ? 0.35 : 1.0; // -9dB duck
      this.duckingGain.gain.cancelScheduledValues(t);
      this.duckingGain.gain.linearRampToValueAtTime(duckTarget, t + 0.25);
    }

    // Zone transition
    if (state.currentZone !== this.currentZone) {
      this.transitionToZone(state.currentZone);
    }
  }

  /** Initialize AudioContext and procedural sound generators */
  async init(): Promise<void> {
    if (this.initialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output pipeline: Zone Gains -> Ducking -> Visibility -> Master -> Destination
      this.visibilityGain = this.ctx.createGain();
      this.visibilityGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.visibilityGain.connect(this.ctx.destination);

      this.masterGain = this.ctx.createGain();
      const initialVol = useAudioStore.getState().enabled && !useAudioStore.getState().isMuted ? 0.5 : 0.0;
      this.masterGain.gain.setValueAtTime(initialVol, this.ctx.currentTime);
      this.masterGain.connect(this.visibilityGain);

      this.duckingGain = this.ctx.createGain();
      this.duckingGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.duckingGain.connect(this.masterGain);

      // Create individual zone channel gain nodes
      (['shore', 'forum', 'sanctuary', 'amphitheatre'] as ZoneAudioId[]).forEach((z) => {
        if (!this.ctx || !this.duckingGain) return;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(z === this.currentZone ? 0.4 : 0.0, this.ctx.currentTime);
        gain.connect(this.duckingGain);
        this.zoneGains[z] = gain;
      });

      // Build procedural generators
      this.createShoreSoundscape();
      this.createForumSoundscape();
      this.createSanctuarySoundscape();

      // Amphitheatre stem synthesizer starts in sync
      stemAudioEngine.init();

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      this.initialized = true;
      console.log('[AudioManager] Procedural audio pipeline online.');
    } catch (e) {
      console.warn('[AudioManager] Failed to initialize AudioContext:', e);
    }
  }

  /** Transition soundscape to a new zone with smooth 2.5s crossfade */
  transitionToZone(zoneId: ZoneAudioId): void {
    this.currentZone = zoneId;
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const fadeDuration = 2.5;

    (['shore', 'forum', 'sanctuary', 'amphitheatre'] as ZoneAudioId[]).forEach((z) => {
      const gain = this.zoneGains[z];
      if (!gain || !this.ctx) return;

      const target = z === zoneId ? 0.4 : 0.0;
      gain.gain.cancelScheduledValues(t);
      gain.gain.linearRampToValueAtTime(target, t + fadeDuration);
    });
  }

  /** Generate continuous pink-noise buffer */
  private createNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 2.0; // 2 seconds looping buffer
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  /** Shore: Rhythmic coastal waves + ocean surf */
  private createShoreSoundscape(): void {
    if (!this.ctx || !this.zoneGains.shore) return;

    const noiseBuffer = this.createNoiseBuffer();
    if (!noiseBuffer) return;

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Resonant lowpass filter modulated by wave LFO
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.2, this.ctx.currentTime);

    // LFO: 0.18Hz (wave swell period ~5.5s)
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(320, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noiseSource.connect(filter);
    filter.connect(this.zoneGains.shore);

    noiseSource.start();
    lfo.start();
  }

  /** Forum: Resonant data hum + stone room tone */
  private createForumSoundscape(): void {
    if (!this.ctx || !this.zoneGains.forum) return;

    // Low sub sine hum (60Hz & 120Hz harmonic)
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(60, this.ctx.currentTime);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    subOsc.connect(subGain);
    subGain.connect(this.zoneGains.forum);
    subOsc.start();

    // High electrical air tone (840Hz subtle chime)
    const airFilter = this.ctx.createBiquadFilter();
    airFilter.type = 'bandpass';
    airFilter.frequency.setValueAtTime(840, this.ctx.currentTime);
    airFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    const noiseBuffer = this.createNoiseBuffer();
    if (noiseBuffer) {
      const airNoise = this.ctx.createBufferSource();
      airNoise.buffer = noiseBuffer;
      airNoise.loop = true;

      const airGain = this.ctx.createGain();
      airGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

      airNoise.connect(airFilter);
      airFilter.connect(airGain);
      airGain.connect(this.zoneGains.forum);
      airNoise.start();
    }
  }

  /** Dino Sanctuary: Primeval canyon breeze & bioluminescent mist pulse */
  private createSanctuarySoundscape(): void {
    if (!this.ctx || !this.zoneGains.sanctuary) return;

    // Mysterious chord drone (F# / C# / G#)
    const chordNotes = [92.5, 138.59, 207.65]; // F#2, C#3, G#3
    chordNotes.forEach((freq, idx) => {
      if (!this.ctx || !this.zoneGains.sanctuary) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.detune.setValueAtTime((idx - 1) * 7, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.zoneGains.sanctuary);
      osc.start();
    });
  }

  /** Play welcome initiation chime */
  playWelcomeChime(): void {
    if (!this.ctx || !this.masterGain) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const t = this.ctx.currentTime + i * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 1.25);
    });
  }

  dispose(): void {
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.initialized = false;
  }
}

export const audioManager = new AudioManager();
