import { heroColumns, heroRows } from './heroConfig';

export type Point = { x: number; y: number };

function displace(point: Point, pointer: Point | null, size: number): Point {
  if (!pointer) {
    return point;
  }
  const dx = point.x - pointer.x;
  const dy = point.y - pointer.y;
  const distance = Math.hypot(dx, dy);
  const radius = size * 9;
  if (distance === 0 || distance >= radius) {
    return point;
  }
  const force = (1 - distance / radius) * size * 4;

  return { x: point.x + (dx / distance) * force, y: point.y + (dy / distance) * force };
}

export function createPixelRenderer(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const viewport = { width: 0, height: 0 };

  return {
    resize() {
      const bounds = canvas.getBoundingClientRect();
      Object.assign(viewport, { width: bounds.width, height: bounds.height });
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * ratio);
      canvas.height = Math.round(bounds.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    },
    draw(cells: Uint8Array, pointer: Point | null) {
      const { width, height } = viewport;
      if (!width) {
        return;
      }
      context.clearRect(0, 0, width, height);
      const size = Math.min(width / heroColumns, height / heroRows);
      const origin = { x: (width - heroColumns * size) / 2, y: (height - heroRows * size) / 2 };
      const styles = getComputedStyle(canvas);
      const pixel = styles.getPropertyValue('--pixel').trim() || '#c5afff';
      const grid = styles.getPropertyValue('--hero-grid').trim() || '#30273d';
      cells.forEach((cell, index) => {
        const column = index % heroColumns;
        const row = Math.floor(index / heroColumns);
        const point = { x: origin.x + column * size, y: origin.y + row * size };
        if (!cell) {
          if (column % 3 === 0 && row % 3 === 0) {
            context.fillStyle = grid;
            context.fillRect(point.x, point.y, 1, 1);
          }

          return;
        }
        const position = displace(point, pointer, size);
        context.fillStyle = pixel;
        context.fillRect(position.x, position.y, Math.max(1, size * 0.8), Math.max(1, size * 0.8));
      });
    },
  };
}
