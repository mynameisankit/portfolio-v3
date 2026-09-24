import Link from '@/features/localization/link';
import { Text } from '@/features/localization/text';
import type { PortfolioContent } from '@/features/portfolio/content';
export function SiteFooter({ content }: { content: PortfolioContent }) {
  return (
    <footer className="site-footer">
      <span>{content.name}</span>
      <Link href="/manage">
        <Text>{'Manage content'}</Text>
      </Link>
      <Link href="#top">
        <Text>{'Back to top ↑'}</Text>
      </Link>
    </footer>
  );
}
