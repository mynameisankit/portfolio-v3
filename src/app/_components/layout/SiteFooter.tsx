'use client';

import { useEffect, useState } from 'react';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import type { PortfolioContent } from '@/data/portfolio/content';

export function SiteFooter({ content }: { content: PortfolioContent }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = Math.min(window.scrollY / Math.max(scrollableHeight, 1), 1);
      setProgress(nextProgress);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const circumference = 2 * Math.PI * 15;

  return (
    <footer className="site-footer flex items-center justify-center gap-10 pt-[22px] px-[5%] pb-28 [border-top:1px_solid_var(--border)] font-mono text-[14px] text-muted-foreground uppercase max-[521px]:flex-wrap max-[521px]:gap-x-6 max-[521px]:gap-y-3">
      <span>{content.name}</span>
      <Link href="/manage">
        <Text>Manage content</Text>
      </Link>
      <Link href="#top" className="group/footer-top inline-flex items-center gap-2">
        <span className="relative grid size-8 place-items-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
            <circle
              className="text-border"
              cx="18"
              cy="18"
              fill="none"
              r="15"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              className="text-primary transition-[stroke-dashoffset] duration-150 motion-reduce:transition-none"
              cx="18"
              cy="18"
              fill="none"
              r="15"
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              strokeWidth="1.5"
            />
          </svg>
          <span
            className="text-primary transition-transform duration-200 group-hover/footer-top:-translate-y-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          >
            ↑
          </span>
        </span>
        <Text>Back to top</Text>
      </Link>
    </footer>
  );
}
