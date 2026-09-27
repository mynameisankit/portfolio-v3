import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import type { PortfolioContent } from '@/data/portfolio/content';

export function SiteFooter({ content }: { content: PortfolioContent }) {
  return (
    <footer className="site-footer py-[22px] px-[5%] [border-top:1px_solid_var(--border)] flex justify-between gap-5 font-mono text-[12px] text-muted-foreground uppercase">
      <span>{content.name}</span>
      <Link href="/manage">
        <Text>Manage content</Text>
      </Link>
      <Link href="#top">
        <Text>Back to top ↑</Text>
      </Link>
    </footer>
  );
}
