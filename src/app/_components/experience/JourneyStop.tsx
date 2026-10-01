'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { Text } from '@/app/_components/localization/Text';
import type { CareerEntry } from '@/data/experience/model';
import { cn } from '@/lib/utils';

export function JourneyStop({ entry }: { entry: CareerEntry }) {
  const stopRef = useRef<HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stop = stopRef.current;
    if (!stop) {
      return;
    }

    const observer = new IntersectionObserver(
      ([observerEntry]) => setIsVisible(observerEntry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(stop);

    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={stopRef}
      className="journey-stop relative [padding:0_0_36px_30px] [border-left:1px_solid_var(--border)] after:absolute after:top-0 after:bottom-0 after:left-[-1px] after:w-px after:origin-top after:bg-primary after:[transform:var(--timeline-progress)] after:transition-transform after:duration-700 after:ease-out motion-reduce:after:transition-none [&:last-child]:pb-0 [&:last-child]:[border-color:transparent] [&[data-visible]_.journey-marker]:bg-primary [&[data-visible]_.journey-marker]:border-primary [&[data-visible]_.journey-marker]:shadow-[0_0_0_4px_color-mix(in_srgb,_var(--primary)_10%,_transparent)] [&[data-current]_.journey-marker]:shadow-[0_0_0_5px_color-mix(in_srgb,_var(--primary)_18%,_transparent)] [&[data-current]_.journey-card]:border-primary/60 [&[data-current]_.journey-current]:inline-flex [&[data-current]_.journey-current]:items-center [&[data-current]_.journey-current]:gap-1.5 [&[data-current]_.journey-current]:rounded-full [&[data-current]_.journey-current]:bg-primary/10 [&[data-current]_.journey-current]:px-2 [&[data-current]_.journey-current]:py-0.5 max-[761px]:pl-[22px]"
      data-current={entry.current || undefined}
      data-visible={isVisible || undefined}
      style={{ '--timeline-progress': isVisible ? 'scaleY(1)' : 'scaleY(0)' } as CSSProperties}
    >
      <span
        className={cn(
          'journey-marker absolute left-[-6px] top-[5px] w-[11px] h-[11px] [border:2px_solid_var(--muted-foreground)] rounded-full bg-background',
          entry.current && 'motion-safe:[animation:journey-current-glow_2s_ease-in-out_infinite]',
        )}
        aria-hidden="true"
      />
      <div className="journey-period flex flex-wrap items-center gap-3 mb-[14px] font-mono text-[12px] leading-[1.6] text-muted-foreground min-[2560px]:text-[14px]">
        <span>
          <Text>{entry.period}</Text>
        </span>
        {entry.current && (
          <span className="journey-current text-primary">
            <span
              className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <Text>Current</Text>
          </span>
        )}
      </div>
      <article
        className="journey-card p-6 bg-card border border-border rounded-[10px] max-[761px]:p-5"
        aria-labelledby={`career-${entry.id}`}
      >
        <header>
          <h3
            className="text-[28px] font-medium tracking-[-0.7px] leading-[1.2] min-[2560px]:text-[31px]"
            id={`career-${entry.id}`}
          >
            {entry.organization}
          </h3>
          <p className="journey-role mt-2 text-[17px] min-[2560px]:text-[18px]">
            <Text>{entry.role}</Text>
          </p>
          <p className="journey-location mt-[3px] text-[12px] text-muted-foreground">
            {entry.location}
          </p>
        </header>
        <p className="journey-summary mt-5 text-muted-foreground text-[16px] leading-[1.75] min-[2560px]:text-[17px]">
          <Text>{entry.summary}</Text>
        </p>
        {!!entry.highlights.length && (
          <details
            className="journey-details group/journey mt-5 border-t border-border"
            open={entry.current}
          >
            <summary className="flex justify-between items-center gap-3 pt-4 px-0 pb-0 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-[13px] text-primary min-[2560px]:text-[15px]">
              <Text>Technical highlights</Text>
              <span
                className="journey-details-icon text-[20px] transition-transform duration-180 group-open/journey:rotate-45 motion-reduce:transition-none"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <ul className="space-y-3 pl-[17px] mt-[18px] text-muted-foreground text-[14px] leading-[1.75] min-[2560px]:text-[15px]">
              {entry.highlights.map((highlight) => (
                <li key={highlight}>
                  <Text>{highlight}</Text>
                </li>
              ))}
            </ul>
          </details>
        )}
      </article>
    </li>
  );
}
