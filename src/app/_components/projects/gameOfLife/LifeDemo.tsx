'use client';
import { useState } from 'react';
import { Text } from '@/app/_components/localization/Text';
import { Button } from '@/app/_components/ui/Button';
import { nextGeneration } from '@/lib/life/life';
import { gliderSeed } from '@/lib/life/lifePatterns';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

export function LifeDemo() {
  const [cells, setCells] = useState<Uint8Array>(() => gliderSeed());
  const [generation, setGeneration] = useState(0);

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
            setCells(nextGeneration(cells, 16, 8));
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
            setGeneration(0);
          }}
          aria-label="Reset Game of Life"
        >
          <RotateCcw size={14} />
          <span>
            <Text>Reset</Text>
          </span>
        </Button>
        <output className="ml-auto font-mono text-[12px] uppercase" aria-live="polite">
          <Text>Gen</Text>
          {String(generation).padStart(3, '0')}
        </output>
      </div>
    </>
  );
}
