'use client';
import { useState } from 'react';
import { Text } from '@/app/_components/localization/Text';
import { Button } from '@/app/_components/ui/Button';
import { cn } from '@/lib/className.utils';
import { nextGeneration } from '@/lib/life/life.utils';
import { gliderSeed } from '@/lib/life/lifePatterns.utils';
import { RotateCcw } from 'lucide-react';

const INITIAL_GENERATION = 0;
const GRID_COLUMNS = 16;
const GRID_ROWS = 8;
const RESET_ICON_SIZE = 14;
const GENERATION_DIGITS = 3;

export function LifeDemo() {
  const [cells, setCells] = useState<Uint8Array>(() => gliderSeed());
  const [generation, setGeneration] = useState(INITIAL_GENERATION);

  return (
    <>
      <div
        className="life-grid grid grid-cols-16 gap-[3px] p-6 group-[.expanded]/project:mx-auto group-[.expanded]/project:max-w-150"
        role="img"
        aria-label={`Game of Life preview, generation ${generation}, ${cells.reduce(
          (a, b) => a + b,
          0,
        )} live cells`}
      >
        {Array.from(cells, (cell, i) => (
          <span
            key={i}
            className={cn(
              'life-cell aspect-square rounded-xs',
              cell
                ? 'alive bg-primary-foreground'
                : 'bg-[color-mix(in_srgb,var(--primary-foreground)_18%,var(--primary))]',
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="life-controls flex gap-2 items-center pt-0 px-4 pb-[15px]">
        <Button
          variant="simulation"
          size="simulation"
          onClick={() => {
            setCells(nextGeneration(cells, GRID_COLUMNS, GRID_ROWS));
            setGeneration(generation + 1);
          }}
        >
          <Text>Step</Text>
          <span aria-hidden="true">→</span>
        </Button>
        <Button
          variant="simulation"
          size="simulation"
          onClick={() => {
            setCells(gliderSeed());
            setGeneration(INITIAL_GENERATION);
          }}
          aria-label="Reset Game of Life"
        >
          <RotateCcw size={RESET_ICON_SIZE} />
          <span>
            <Text>Reset</Text>
          </span>
        </Button>
        <output className="ml-auto font-mono text-[12px] uppercase" aria-live="polite">
          <Text>Gen</Text>
          {String(generation).padStart(GENERATION_DIGITS, '0')}
        </output>
      </div>
    </>
  );
}
