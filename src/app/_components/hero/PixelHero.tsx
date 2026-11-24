'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Text } from '@/app/_components/localization/Text';
import { useTheme } from '@/app/_components/theme/useTheme';
import { Button } from '@/app/_components/ui/Button';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import type { PortfolioContent } from '@/data/portfolio/content';
import { usePixelHero } from './usePixelHero';

const OVERLAY_DURATION_MS = 5000;
const WANTED_STARS = 6;
const GENERATION_DIGITS = 3;

function WantedLevel() {
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), OVERLAY_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-100 grid place-items-center isolate pointer-events-none backdrop-blur-[3px] bg-[rgb(8_5_20/12%)] text-[#ffe08a] text-[clamp(2rem,9vw,5rem)] leading-[1.4] [text-shadow:0_0_0.16em_#ff9b49,0_2px_6px_#120b20] animate-[vice-stars-out_600ms_ease-in-out_4.4s_forwards] before:absolute before:inset-0 before:-z-1 before:bg-[radial-gradient(ellipse_at_left_center,#ff204cab,transparent_78%)] after:absolute after:inset-0 after:-z-1 after:bg-[radial-gradient(ellipse_at_right_center,#126dffbf,transparent_78%)] motion-safe:before:animate-[vice-siren_700ms_ease-in-out_infinite_alternate,vice-lights-off_400ms_ease-out_3s_forwards] motion-safe:after:animate-[vice-siren_700ms_ease-in-out_-700ms_infinite_alternate,vice-lights-off_400ms_ease-out_3s_forwards]"
      role="status"
    >
      <span
        className="[grid-area:1/1] animate-[vice-stars-out_350ms_ease-in_3s_forwards]"
        aria-hidden="true"
      >
        {'\u2605'.repeat(WANTED_STARS)}
      </span>
      <div
        className="relative [grid-area:1/1] place-self-stretch opacity-0 [background:radial-gradient(ellipse_at_38%_8%,#dc819138,transparent_56%),linear-gradient(155deg,#ac073d65,#81012770_50%,#36041982)] animate-[vice-wasted-in_450ms_ease-out_3s_forwards]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 670 158"
          className="absolute left-[15.7%] top-[51%] w-[43.6%] h-auto text-[#fbf8fa] portrait:left-[8%] portrait:w-[76%]"
        >
          <title>wasted</title>
          <g
            fill="currentColor"
            fillRule="evenodd"
            stroke="#240610"
            strokeWidth="2"
            strokeLinejoin="round"
            paintOrder="stroke"
          >
            <path d="M2 33H42L52 103L62 33H99L110 103L122 33H162L142 157H90L81 100L72 157H22Z" />
            <path d="M169 49Q169 33 187 33H241Q260 33 260 51V157H187Q169 157 169 139V97Q169 79 186 79H218V65H209V73H169ZM210 111V126H218V111Z" />
            <path d="M270 51Q270 33 289 33H342Q360 33 360 51V73H320V65H310V79H342Q360 79 360 97V139Q360 157 341 157H288Q270 157 270 139V118H310V126H320V111H288Q270 111 270 93Z" />
            <path d="M376 33H417V41H467V72H417V126H426V79H467V139Q467 157 448 157H394Q376 157 376 139V72H367V41H376Z" />
            <path d="M477 51Q477 33 495 33H550Q568 33 568 51V111H518V126H528V118H568V139Q568 157 550 157H495Q477 157 477 139ZM518 65V80H528V65Z" />
            <path d="M628 2H668V157H596Q578 157 578 139V51Q578 33 596 33H628ZM618 65V126H628V65Z" />
          </g>
        </svg>
      </div>
      <span className="sr-only">
        <Text>Six-star wanted level</Text>
      </span>
    </div>,
    document.body,
  );
}

export function PixelHero({ content }: { content: PortfolioContent }) {
  const { canvasRef, isRunning, isReducedMotion, generation, shouldShowWantedLevel, run, reset } =
    usePixelHero();
  const { theme } = useTheme();
  const runLabel = isRunning ? 'Pause' : 'Run';

  return (
    <section
      className="hero [html[data-theme='vice']_&]:[background:radial-gradient(ellipse_at_75%_43%,#ab127455,transparent_55%),radial-gradient(ellipse_at_18%_68%,#007d8550,transparent_48%)] flex min-h-[calc(100svh-90px)] flex-col justify-center px-[5%] py-10 max-[761px]:min-h-[calc(100svh-140px)]"
      aria-labelledby="hero-name"
    >
      <p className="eyebrow [html[data-theme='vice']_&]:text-accent text-center font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground min-[2560px]:text-[14px]">
        <Text>{content.role}</Text> <Text>at</Text> {content.company}
      </p>
      <h1 id="hero-name" className="sr-only">
        {content.name}
      </h1>
      <canvas
        ref={canvasRef}
        className="pixel-canvas [html[data-theme='vice']_&]:[filter:drop-shadow(0_0_4px_#ff32a673)_drop-shadow(0_0_16px_#ac34ff55)] block w-[90%] lg:w-[129.6%] lg:max-w-none self-center aspect-[2.8] [touch-action:pan-y] my-5 mx-0 max-[651px]:aspect-[1.7]"
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
        <div className="flex gap-2">
          <Button onClick={run} aria-pressed={isReducedMotion ? undefined : isRunning}>
            <Text>{isReducedMotion ? 'Step' : runLabel}</Text>
          </Button>
          <Button variant="outline" onClick={reset}>
            <Text>Reset</Text>
          </Button>
        </div>
      </div>
      <div className="hero-meta [html[data-theme='vice']_&]:border-t [html[data-theme='vice']_&]:[border-image:linear-gradient(90deg,var(--accent),#8343ad,var(--primary))_1] [html[data-theme='vice']_&]:pt-3 flex justify-between gap-4 flex-wrap mt-[26px] font-mono text-[12px] leading-[1.5] uppercase text-muted-foreground min-[2560px]:text-[14px]">
        <span>
          <Text>
            {isReducedMotion ? 'Step through the simulation' : 'Move across the lettering'}
          </Text>
        </span>
        <ConditionalRenderer shouldRender={theme === 'vice' && shouldShowWantedLevel}>
          <WantedLevel />
        </ConditionalRenderer>
        <output aria-live="off">
          <Text>{generation ? 'Life' : 'Name'}</Text>
          {' / '}
          <Text>Generation</Text> {String(generation).padStart(GENERATION_DIGITS, '0')}
        </output>
      </div>
    </section>
  );
}
