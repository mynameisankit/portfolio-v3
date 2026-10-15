'use client';

import { useEffect, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import type { PortfolioContent } from '@/data/portfolio/content';
import { ExternalLink } from 'lucide-react';

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
    <footer className="site-footer flex flex-col items-center gap-4 pt-[22px] px-[5%] pb-28 [border-top:1px_solid_var(--border)] font-mono text-[14px] text-muted-foreground uppercase">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <Link
          href="https://www.linkedin.com/in/mynameisankit/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl px-2 transition-colors hover:bg-button-hover hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none"
        >
          <FaLinkedinIn size={20} aria-hidden="true" />
          <span>LinkedIn</span>
          <ExternalLink size={12} aria-hidden="true" className="text-muted-foreground" />
          <span className="sr-only">
            <Text>(opens in a new tab)</Text>
          </span>
        </Link>
        <Link
          href="https://www.instagram.com/bizzare.kumar/"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl px-2 transition-colors hover:bg-button-hover hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none"
        >
          <FaInstagram size={20} aria-hidden="true" />
          <span>Instagram</span>
          <ExternalLink size={12} aria-hidden="true" className="text-muted-foreground" />
          <span className="sr-only">
            <Text>(opens in a new tab)</Text>
          </span>
        </Link>
        <Link
          href={content.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-xl px-2 transition-colors hover:bg-button-hover hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none"
        >
          <FaGithub size={20} aria-hidden="true" />
          <span>GitHub</span>
          <ExternalLink size={12} aria-hidden="true" className="text-muted-foreground" />
          <span className="sr-only">
            <Text>(opens in a new tab)</Text>
          </span>
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 max-[521px]:gap-x-6">
        <span>{content.name}</span>
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
      </div>
    </footer>
  );
}
