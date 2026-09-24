import type { Metadata } from 'next';

import { getGameLibrary } from '@/features/gaming/repository';
import { HobbiesPage } from '@/features/hobbies/hobbies-page';
import { SiteFooter } from '@/features/layout/site-footer';
import { SiteHeader } from '@/features/layout/site-header';
import { getPortfolio } from '@/features/portfolio/repository';

export const metadata: Metadata = {
  title: 'Hobbies | Ankit Kumar',
  description: 'Travelling, gaming, running and hiking outside work.',
};

export default async function Page() {
  const [portfolio, library] = await Promise.all([getPortfolio(), getGameLibrary()]);
  return (
    <div className="site-shell" id="top">
      <SiteHeader content={portfolio} />
      <HobbiesPage library={library} />
      <SiteFooter content={portfolio} />
    </div>
  );
}
