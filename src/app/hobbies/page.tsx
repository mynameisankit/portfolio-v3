import type { Metadata } from 'next';
import { SiteFooter } from '@/app/_components/layout/SiteFooter';
import { SiteHeader } from '@/app/_components/layout/SiteHeader';
import { HobbiesPage } from '@/app/hobbies/_components/HobbiesPage';
import { getGameLibrary } from '@/data/gaming/repository';
import { getPortfolio } from '@/data/portfolio/repository';

export const metadata: Metadata = {
  title: 'Hobbies',
  description: 'Travelling, gaming, running and hiking outside work.',
  alternates: { canonical: '/hobbies' },
};

export default async function Page() {
  const [portfolio, library] = await Promise.all([getPortfolio(), getGameLibrary()]);

  return (
    <div className="site-shell w-full lg:w-[60%] min-[2560px]:w-[50%] my-0 mx-auto" id="top">
      <SiteHeader content={portfolio} />
      <HobbiesPage library={library} />
      <SiteFooter content={portfolio} />
    </div>
  );
}
