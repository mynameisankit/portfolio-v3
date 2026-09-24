import { Contact } from '@/features/contact/contact';
import { Experience } from '@/features/experience/experience';
import { PixelHero } from '@/features/hero/pixel-hero';
import { SiteFooter } from '@/features/layout/site-footer';
import { SiteHeader } from '@/features/layout/site-header';
import { getPortfolio } from '@/features/portfolio/repository';
import { ProjectCanvas } from '@/features/projects/project-canvas';
export default async function Home() {
  const portfolio = await getPortfolio();
  return (
    <div className="site-shell" id="top">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader content={portfolio} />
      <main id="main-content">
        <PixelHero content={portfolio} />
        <ProjectCanvas content={portfolio} />
        <Experience content={portfolio} />
        <Contact content={portfolio} />
      </main>
      <SiteFooter content={portfolio} />
    </div>
  );
}
