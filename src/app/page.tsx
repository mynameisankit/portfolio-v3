import { Contact } from '@/app/_components/contact/Contact';
import { Experience } from '@/app/_components/experience/Experience';
import { PixelHero } from '@/app/_components/hero/PixelHero';
import { SiteFooter } from '@/app/_components/layout/SiteFooter';
import { SiteHeader } from '@/app/_components/layout/SiteHeader';
import { ProjectCanvas } from '@/app/_components/projects/ProjectCanvas';
import { Skills } from '@/app/_components/skills/Skills';
import { getPortfolio } from '@/data/portfolio/repository';

export default async function Home() {
  const portfolio = await getPortfolio();

  return (
    <div className="site-shell w-full lg:w-[50%] my-0 mx-auto" id="top">
      <a
        href="#main-content"
        className="skip-link absolute top-[-100px] bg-primary text-primary-foreground p-3 z-100 focus:top-[10px]"
      >
        Skip to content
      </a>
      <SiteHeader content={portfolio} />
      <main id="main-content">
        <PixelHero content={portfolio} />
        <ProjectCanvas content={portfolio} />
        <Experience content={portfolio} />
        <Skills groups={portfolio.skills} />
        <Contact content={portfolio} />
      </main>
      <SiteFooter content={portfolio} />
    </div>
  );
}
