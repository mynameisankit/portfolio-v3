'use client';
import { Text } from '@/app/_components/localization/Text';
import { Button } from '@/app/_components/ui/Button';
import type { PortfolioContent } from '@/data/portfolio/content';
import { usePixelHero } from './usePixelHero';

export function PixelHero({ content }: { content: PortfolioContent }) {
  const { canvasRef, isRunning, isReducedMotion, generation, run, reset } = usePixelHero();
  const runLabel = isRunning ? 'Pause' : 'Run';

  return (
    <section
      className="hero pt-[38px] px-[5%] pb-6 max-[651px]:pt-[26px]"
      aria-labelledby="hero-name"
    >
      <p className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
        <Text>{content.role}</Text> <Text>at</Text> {content.company}
      </p>
      <h1 id="hero-name" className="sr-only">
        {content.name}
      </h1>
      <canvas
        ref={canvasRef}
        className="pixel-canvas block w-full aspect-[2.25] [touch-action:pan-y] my-5 mx-0 max-[651px]:aspect-[1.7]"
        role="img"
        aria-label={`${content.name} in pixel lettering`}
      >
        {content.name}
      </canvas>
      <div className="hero-bottom flex items-center justify-between gap-8 max-[651px]:flex-col max-[651px]:items-start max-[651px]:gap-[22px]">
        <div>
          <p className="hero-title text-[24px] tracking-[-0.5px] max-[651px]:text-[22px] [html[lang='ja']_&]:tracking-[0]">
            <Text>{content.headline}</Text>
          </p>
          <p className="hero-subtitle text-[16px] text-muted-foreground max-w-140 mt-[9px]">
            <Text>{content.subtitle}</Text>
          </p>
        </div>
        <div className="hero-controls flex gap-2 shrink-0 max-[721px]:[&_.button]:min-w-[95px]">
          <Button
            variant="canvasPrimary"
            size="canvas"
            className="button max-[721px]:min-w-[95px]"
            onClick={run}
            aria-pressed={isRunning}
          >
            <Text>{isReducedMotion ? 'Step' : runLabel}</Text>
            <span aria-hidden="true">{isRunning ? 'Ⅱ' : '↗'}</span>
          </Button>
          <Button
            variant="canvas"
            size="canvas"
            className="button max-[721px]:min-w-[95px]"
            onClick={reset}
          >
            <Text>Reset</Text>
          </Button>
        </div>
      </div>
      <div className="hero-meta flex justify-between gap-4 flex-wrap mt-[26px] font-mono text-[12px] leading-[1.5] uppercase text-muted-foreground">
        <span>
          <Text>
            {isReducedMotion ? 'Step through the simulation' : 'Move across the lettering'}
          </Text>
        </span>
        <output aria-live="off">
          <Text>{generation ? 'Life' : 'Name'}</Text>
          {' / '}
          <Text>Generation</Text> {String(generation).padStart(3, '0')}
        </output>
      </div>
    </section>
  );
}
