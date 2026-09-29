// =============================================================================
// Ticker — requestAnimationFrame loop manager
// =============================================================================

type TickCallback = (delta: number, elapsed: number) => void;

/**
 * Centralized RAF loop. All per-frame updates subscribe here.
 * Pure TypeScript — no React dependency.
 */
class Ticker {
  private callbacks: Map<string, TickCallback> = new Map();
  private animationFrameId: number | null = null;
  private lastTime: number = 0;
  private elapsed: number = 0;
  private _running: boolean = false;

  get running(): boolean {
    return this._running;
  }

  /** Start the loop */
  start(): void {
    if (this._running) return;
    this._running = true;
    this.lastTime = performance.now();
    this.tick(this.lastTime);
  }

  /** Stop the loop */
  stop(): void {
    this._running = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /** Register a callback by key (prevents duplicates) */
  add(key: string, callback: TickCallback): void {
    this.callbacks.set(key, callback);
  }

  /** Remove a callback by key */
  remove(key: string): void {
    this.callbacks.delete(key);
  }

  /** Reset all state */
  dispose(): void {
    this.stop();
    this.callbacks.clear();
    this.elapsed = 0;
  }

  private tick = (now: number): void => {
    if (!this._running) return;

    const delta = Math.min((now - this.lastTime) / 1000, 0.1); // Cap at 100ms (10fps floor)
    this.lastTime = now;
    this.elapsed += delta;

    for (const callback of this.callbacks.values()) {
      callback(delta, this.elapsed);
    }

    this.animationFrameId = requestAnimationFrame(this.tick);
  };
}

/** Singleton ticker instance */
export const ticker = new Ticker();
