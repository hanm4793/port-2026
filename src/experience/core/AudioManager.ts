// =============================================================================
// Audio Manager — Web Audio API wrapper, per-zone ambient
// =============================================================================

import { useAudioStore } from '@/stores/useAudioStore';
import { AUDIO_CROSSFADE_MS } from '@/lib/constants';

/**
 * Manages ambient audio per zone using Web Audio API.
 * Audio is user-initiated — never autoplay.
 * Pure TypeScript.
 */
class AudioManager {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeSources: Map<string, { source: AudioBufferSourceNode; gain: GainNode }> =
    new Map();
  private audioCache: Map<string, AudioBuffer> = new Map();

  /** Create AudioContext (must be called after user gesture) */
  init(): void {
    if (this.context) return;

    this.context = new AudioContext();
    this.masterGain = this.context.createGain();
    this.masterGain.connect(this.context.destination);
    this.masterGain.gain.value = useAudioStore.getState().masterVolume;

    // Subscribe to volume changes
    useAudioStore.subscribe((state) => {
      if (this.masterGain) {
        this.masterGain.gain.value = state.enabled ? state.masterVolume : 0;
      }
    });
  }

  /** Resume audio context after user gesture */
  async resume(): Promise<void> {
    if (this.context?.state === 'suspended') {
      await this.context.resume();
    }
  }

  /** Load an audio file and cache the buffer */
  async loadAudio(id: string, url: string): Promise<void> {
    if (this.audioCache.has(id) || !this.context) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      this.audioCache.set(id, audioBuffer);
    } catch (error) {
      console.warn(`[AudioManager] Failed to load audio: ${id}`, error);
    }
  }

  /** Play ambient audio for a zone with crossfade */
  playZoneAudio(audioId: string): void {
    if (!this.context || !this.masterGain) return;

    const buffer = this.audioCache.get(audioId);
    if (!buffer) return;

    // Fade out all current sources
    for (const [id, entry] of this.activeSources) {
      if (id !== audioId) {
        this.fadeOut(entry.gain, () => {
          entry.source.stop();
          this.activeSources.delete(id);
        });
      }
    }

    // Don't restart if already playing
    if (this.activeSources.has(audioId)) return;

    // Create new source
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const gain = this.context.createGain();
    gain.gain.value = 0;
    source.connect(gain);
    gain.connect(this.masterGain);
    source.start();

    // Fade in
    gain.gain.linearRampToValueAtTime(1, this.context.currentTime + AUDIO_CROSSFADE_MS / 1000);

    this.activeSources.set(audioId, { source, gain });
    useAudioStore.getState().setCurrentZoneAudio(audioId);
  }

  private fadeOut(gain: GainNode, onComplete: () => void): void {
    if (!this.context) return;

    gain.gain.linearRampToValueAtTime(0, this.context.currentTime + AUDIO_CROSSFADE_MS / 1000);
    setTimeout(onComplete, AUDIO_CROSSFADE_MS);
  }

  dispose(): void {
    for (const entry of this.activeSources.values()) {
      entry.source.stop();
    }
    this.activeSources.clear();
    this.audioCache.clear();
    this.context?.close();
    this.context = null;
    this.masterGain = null;
  }
}

export const audioManager = new AudioManager();
