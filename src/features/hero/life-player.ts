import { nextGeneration } from '@/lib/life/life';
import { nameSeed } from '@/lib/life/life-patterns';

import { HERO_COLUMNS, HERO_ROWS } from './hero-config';

export type LifeSnapshot = { cells: Uint8Array; generation: number; running: boolean };

export function createLifePlayer(onChange: (snapshot: LifeSnapshot) => void) {
  const state: LifeSnapshot & { frame: number; lastFrame: number } = {
    cells: nameSeed(),
    generation: 0,
    running: false,
    frame: 0,
    lastFrame: 0,
  };
  const publish = () =>
    onChange({ cells: state.cells, generation: state.generation, running: state.running });
  const cancel = () => {
    state.running = false;
    cancelAnimationFrame(state.frame);
  };
  const step = () => {
    state.cells = nextGeneration(state.cells, HERO_COLUMNS, HERO_ROWS);
    state.generation += 1;
    publish();
  };
  const tick = (time: number) => {
    if (!state.running) {
      return;
    }
    if (time - state.lastFrame > 180) {
      step();
      state.lastFrame = time;
    }
    state.frame = requestAnimationFrame(tick);
  };
  return {
    step,
    stop() {
      cancel();
      publish();
    },
    toggle() {
      if (state.running) {
        cancel();
        publish();
        return;
      }
      state.running = true;
      state.lastFrame = 0;
      publish();
      state.frame = requestAnimationFrame(tick);
    },
    reset() {
      cancel();
      state.cells = nameSeed();
      state.generation = 0;
      publish();
    },
    dispose: cancel,
  };
}
