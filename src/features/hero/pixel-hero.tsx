'use client';
import { Button } from '@/components/ui/button';
import { Text } from '@/features/localization/text';
import type { PortfolioContent } from '@/features/portfolio/content';

import { usePixelHero } from './use-pixel-hero';

export function PixelHero({ content }: { content: PortfolioContent }) {
  const { canvasRef, running, reduced, generation, run, reset } = usePixelHero();
  const runLabel = running ? 'Pause' : 'Run';
  return (
    <section className="hero" aria-labelledby="hero-name">
      <p className="eyebrow">
        {<Text>{content.role}</Text>} <Text>{'at'}</Text> {content.company}
      </p>
      <h1 id="hero-name" className="sr-only">
        {content.name}
      </h1>
      <canvas
        ref={canvasRef}
        className="pixel-canvas"
        role="img"
        aria-label={`${content.name} in pixel lettering`}
      >
        {content.name}
      </canvas>
      <div className="hero-bottom">
        <div>
          <p className="hero-title">{<Text>{content.headline}</Text>}</p>
          <p className="hero-subtitle">{<Text>{content.subtitle}</Text>}</p>
        </div>
        <div className="hero-controls">
          <Button variant="ghost" className="button primary" onClick={run} aria-pressed={running}>
            {<Text>{reduced ? 'Step' : runLabel}</Text>}
            <span aria-hidden="true">{running ? 'Ⅱ' : '↗'}</span>
          </Button>
          <Button variant="ghost" className="button" onClick={reset}>
            <Text>{'Reset'}</Text>
          </Button>
        </div>
      </div>
      <div className="hero-meta">
        <span>
          {<Text>{reduced ? 'Step through the simulation' : 'Move across the lettering'}</Text>}
        </span>
        <output aria-live="off">
          {<Text>{generation ? 'Life' : 'Name'}</Text>}
          {' / '}
          <Text>{'Generation'}</Text> {String(generation).padStart(3, '0')}
        </output>
      </div>
    </section>
  );
}
