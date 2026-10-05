import { nextGeneration } from '@/lib/life/life.utils';
import { nameSeed } from '@/lib/life/lifePatterns.utils';
import { heroColumns, heroRows } from './heroConfig';

export type LifeSnapshot = { cells: Uint8Array; generation: number; isRunning: boolean };

export function createLifePlayer(onChange: (snapshot: LifeSnapshot) => void) {
  const state: LifeSnapshot & { frame: number; lastFrame: number } = {
    cells: nameSeed(),
    generation: 0,
    isRunning: false,
    frame: 0,
    lastFrame: 0,
  };
  const publish = () =>
    onChange({ cells: state.cells, generation: state.generation, isRunning: state.isRunning });
  const cancel = () => {
    state.isRunning = false;
    cancelAnimationFrame(state.frame);
  };
  const step = () => {
    state.cells = nextGeneration(state.cells, heroColumns, heroRows);
    state.generation += 1;
    publish();
  };
  const tick = (time: number) => {
    if (!state.isRunning) {
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
      if (state.isRunning) {
        cancel();
        publish();

        return;
      }
      state.isRunning = true;
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
