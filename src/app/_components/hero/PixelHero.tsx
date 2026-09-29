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
      className="hero flex min-h-[calc(100svh-90px)] flex-col justify-center px-[5%] py-10 max-[761px]:min-h-[calc(100svh-140px)]"
      aria-labelledby="hero-name"
    >
      <p className="eyebrow text-center font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground min-[2560px]:text-[14px]">
        <Text>{content.role}</Text> <Text>at</Text> {content.company}
      </p>
      <h1 id="hero-name" className="sr-only">
        {content.name}
      </h1>
      <canvas
        ref={canvasRef}
        className="pixel-canvas block w-[90%] lg:w-[129.6%] lg:max-w-none self-center aspect-[2.8] [touch-action:pan-y] my-5 mx-0 max-[651px]:aspect-[1.7]"
        role="img"
        aria-label={`${content.name} in pixel lettering`}
      >
        {content.name}
      </canvas>
      <div className="hero-bottom flex flex-col items-center gap-6 text-center">
        <div>
          <p className="hero-title text-[29px] tracking-[-0.5px] max-[651px]:text-[26px] min-[2560px]:text-[34px] [html[lang='ja']_&]:tracking-[0]">
            <Text>{content.headline}</Text>
          </p>
          <p className="hero-subtitle text-[19px] text-muted-foreground max-w-140 mx-auto mt-[9px] min-[2560px]:text-[21px]">
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
      <div className="hero-meta flex justify-between gap-4 flex-wrap mt-[26px] font-mono text-[12px] leading-[1.5] uppercase text-muted-foreground min-[2560px]:text-[14px]">
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
