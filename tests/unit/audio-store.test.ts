import { describe, it, expect, beforeEach } from 'vitest';
import { useAudioStore } from '@/stores/useAudioStore';

describe('AudioStore — State Machine & Spatial Logic', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAudioStore.setState({
      hasUserDecided: false,
      enabled: false,
      isMuted: false,
      isDucked: false,
      currentZone: 'shore',
    });
  });

  it('initial state is default-silent until user opts in', () => {
    const state = useAudioStore.getState();
    expect(state.hasUserDecided).toBe(false);
    expect(state.enabled).toBe(false);
    expect(state.isMuted).toBe(false);
    expect(state.currentZone).toBe('shore');
    expect(state.isDucked).toBe(false);
  });

  it('optInSound() enables audio, sets unmuted, and marks user decision', () => {
    useAudioStore.getState().optInSound();
    const state = useAudioStore.getState();
    expect(state.hasUserDecided).toBe(true);
    expect(state.enabled).toBe(true);
    expect(state.isMuted).toBe(false);
  });

  it('optOutSound() silences audio, sets muted, and marks user decision', () => {
    useAudioStore.getState().optOutSound();
    const state = useAudioStore.getState();
    expect(state.hasUserDecided).toBe(true);
    expect(state.enabled).toBe(false);
    expect(state.isMuted).toBe(true);
  });

  it('toggleAudio() flips mute state cleanly', () => {
    useAudioStore.getState().optInSound();
    expect(useAudioStore.getState().isMuted).toBe(false);

    useAudioStore.getState().toggleAudio();
    expect(useAudioStore.getState().isMuted).toBe(true);

    useAudioStore.getState().toggleAudio();
    expect(useAudioStore.getState().isMuted).toBe(false);
  });

  it('setDucked() controls contextual reading attenuation', () => {
    useAudioStore.getState().setDucked(true);
    expect(useAudioStore.getState().isDucked).toBe(true);

    useAudioStore.getState().setDucked(false);
    expect(useAudioStore.getState().isDucked).toBe(false);
  });

  it('setZone() transitions active soundscape territory across zones', () => {
    useAudioStore.getState().setZone('forum');
    expect(useAudioStore.getState().currentZone).toBe('forum');

    useAudioStore.getState().setZone('sanctuary');
    expect(useAudioStore.getState().currentZone).toBe('sanctuary');

    useAudioStore.getState().setZone('amphitheatre');
    expect(useAudioStore.getState().currentZone).toBe('amphitheatre');

    useAudioStore.getState().setZone('shore');
    expect(useAudioStore.getState().currentZone).toBe('shore');
  });
});
