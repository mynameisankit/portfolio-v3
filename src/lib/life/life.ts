const offsets = [-1, 0, 1].flatMap((y) =>
  [-1, 0, 1].filter((x) => x !== 0 || y !== 0).map((x) => ({ x, y })),
);

export function nextGeneration(cells: Uint8Array, width: number, height: number): Uint8Array {
  return cells.map((cell, index) => {
    const x = index % width;
    const y = Math.floor(index / width);
    const neighbors = offsets.reduce((total, offset) => {
      const column = x + offset.x;
      const row = y + offset.y;
      const inside = column >= 0 && column < width && row >= 0 && row < height;
      return total + (inside ? cells[row * width + column] : 0);
    }, 0);
    return neighbors === 3 || (cell === 1 && neighbors === 2) ? 1 : 0;
  });
}
