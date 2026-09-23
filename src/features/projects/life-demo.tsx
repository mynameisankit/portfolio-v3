'use client';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { nextGeneration } from '@/lib/life/life';
import { gliderSeed } from '@/lib/life/life-patterns';
export function LifeDemo() {
  const [cells, setCells] = useState<Uint8Array>(() => gliderSeed());
  const [generation, setGeneration] = useState(0);
  return (
    <>
      <div
        className="life-grid"
        role="img"
        aria-label={`Game of Life preview, generation ${generation}, ${cells.reduce(
          (a, b) => a + b,
          0,
        )} live cells`}
      >
        {Array.from(cells, (cell, i) => (
          <span key={i} className={cell ? 'life-cell alive' : 'life-cell'} aria-hidden="true" />
        ))}
      </div>
      <div className="life-controls">
        <Button
          variant="ghost"
          onClick={() => {
            setCells(nextGeneration(cells, 16, 8));
            setGeneration(generation + 1);
          }}
        >
          Step <span aria-hidden="true">→</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setCells(gliderSeed());
            setGeneration(0);
          }}
          aria-label="Reset Game of Life"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </Button>
        <output aria-live="polite">Gen {String(generation).padStart(3, '0')}</output>
      </div>
    </>
  );
}
