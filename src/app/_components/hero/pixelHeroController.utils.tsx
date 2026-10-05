import { createLifePlayer, type LifeSnapshot } from './lifePlayer.utils';
import { createPixelRenderer, type Point } from './pixelRenderer.utils';

export type HeroStatus = { isRunning: boolean; generation: number; isReducedMotion: boolean };

export function connectPixelHero(
  canvas: HTMLCanvasElement,
  onStatus: (status: HeroStatus) => void,
) {
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }
  const renderer = createPixelRenderer(canvas, context);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const view: { snapshot: LifeSnapshot | null; pointer: Point | null } = {
    snapshot: null,
    pointer: null,
  };
  const draw = () => {
    if (!view.snapshot) {
      return;
    }
    const pointer = view.snapshot.isRunning || motion.matches ? null : view.pointer;
    renderer.draw(view.snapshot.cells, pointer);
  };
  const player = createLifePlayer((snapshot) => {
    view.snapshot = snapshot;
    draw();
    onStatus({
      isRunning: snapshot.isRunning,
      generation: snapshot.generation,
      isReducedMotion: motion.matches,
    });
  });
  const resize = new ResizeObserver(() => {
    renderer.resize();
    draw();
  });
  const theme = new MutationObserver(draw);
  const move = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    view.pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    if (!view.snapshot?.isRunning) {
      draw();
    }
  };
  const leave = () => {
    view.pointer = null;
    draw();
  };
  const visibility = () => {
    if (document.hidden) {
      player.stop();
    }
  };
  const motionChange = () => player.stop();
  resize.observe(canvas);
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerleave', leave);
  document.addEventListener('visibilitychange', visibility);
  motion.addEventListener('change', motionChange);
  renderer.resize();
  player.reset();

  return {
    run: () => {
      if (motion.matches) {
        return player.step();
      }

      return player.toggle();
    },
    reset: () => {
      view.pointer = null;
      player.reset();
    },
    dispose() {
      player.dispose();
      resize.disconnect();
      theme.disconnect();
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', visibility);
      motion.removeEventListener('change', motionChange);
    },
  };
}
