// =============================================================================
// Input Manager — unified input abstraction
// =============================================================================

import { useInputStore } from '@/stores/useInputStore';

/**
 * Listens to mouse, touch, keyboard, and scroll events.
 * Normalizes input state and writes to Zustand store.
 * Pure TypeScript.
 */
class InputManager {
  private bound: boolean = false;

  init(): void {
    if (this.bound || typeof window === 'undefined') return;
    this.bound = true;

    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('touchstart', this.onTouchStart, { passive: true });
    window.addEventListener('keydown', this.onKeyDown);
  }

  dispose(): void {
    if (!this.bound) return;
    this.bound = false;

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  private onMouseMove = (e: MouseEvent): void => {
    const store = useInputStore.getState();
    store.setPointer(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    );
    if (store.activeDevice !== 'mouse') {
      store.setActiveDevice('mouse');
    }
  };

  private onTouchStart = (): void => {
    const store = useInputStore.getState();
    if (store.activeDevice !== 'touch') {
      store.setActiveDevice('touch');
    }
  };

  private onKeyDown = (): void => {
    const store = useInputStore.getState();
    if (store.activeDevice !== 'keyboard') {
      store.setActiveDevice('keyboard');
    }
  };
}

export const inputManager = new InputManager();
