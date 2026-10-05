import type { Metadata } from 'next';
import { SiteFooter } from '@/app/_components/layout/SiteFooter';
import { SiteHeader } from '@/app/_components/layout/SiteHeader';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { getExperiencePage } from '@/data/experience/pageRepository';
import { getPortfolio } from '@/data/portfolio/repository';
import { EngineeringPortfolio } from './_components/EngineeringPortfolio';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Career journey and engineering contributions by Ankit Kumar.',
  alternates: { canonical: '/experience' },
};

export default async function Page() {
  const [portfolio, experience] = await Promise.all([getPortfolio(), getExperiencePage()]);

  return (
    <div className="site-shell w-full lg:w-[60%] min-[2560px]:w-[50%] my-0 mx-auto" id="top">
      <SiteHeader content={portfolio} />
      <main id="main-content">
        <header className="px-[5%] pt-12 pb-4">
          <Link href="/" className="text-sm text-primary hover:underline">
            <Text>Back to home</Text>
          </Link>
          <p className="mt-8 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            /experience
          </p>
          <h1 className="mt-3 text-[clamp(40px,5vw,64px)] font-medium tracking-tight">
            <Text>{experience.title[0]}</Text>
            <br />
            <Text>{experience.title[1]}</Text>
          </h1>
          {experience.intro.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-2xl text-muted-foreground">
              <Text>{paragraph}</Text>
            </p>
          ))}
        </header>
        <EngineeringPortfolio content={experience} career={portfolio.career} />
      </main>
      <SiteFooter content={portfolio} />
    </div>
  );
}
