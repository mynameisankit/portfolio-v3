import { SiteFooter } from '@/app/_components/layout/SiteFooter';
import { SiteHeader } from '@/app/_components/layout/SiteHeader';
import { getPortfolio } from '@/data/portfolio/repository';

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const portfolio = await getPortfolio();

  return (
    <div className="site-shell w-full lg:w-[60%] min-[2560px]:w-[50%] my-0 mx-auto" id="top">
      <a
        href="#main-content"
        className="skip-link absolute top-[-100px] bg-primary text-primary-foreground p-3 z-100 focus:top-[10px]"
      >
        Skip to content
      </a>
      <SiteHeader content={portfolio} />
      <main id="main-content">{children}</main>
      <SiteFooter content={portfolio} />
    </div>
  );
}
