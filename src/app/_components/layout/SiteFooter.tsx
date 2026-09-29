import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import type { PortfolioContent } from '@/data/portfolio/content';

export function SiteFooter({ content }: { content: PortfolioContent }) {
  return (
    <footer className="site-footer flex justify-center gap-10 pt-[22px] px-[5%] pb-28 [border-top:1px_solid_var(--border)] font-mono text-[14px] text-muted-foreground uppercase max-[521px]:flex-wrap max-[521px]:gap-x-6 max-[521px]:gap-y-3">
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
