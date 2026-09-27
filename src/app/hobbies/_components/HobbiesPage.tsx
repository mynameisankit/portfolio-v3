import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { GamingLibrary } from '@/app/hobbies/_components/gaming/GamingLibrary';
import type { GameLibrary } from '@/data/gaming/model';
import { HobbyPlaceholder } from './HobbyPlaceholder';

export function HobbiesPage({ library }: { library: GameLibrary }) {
  return (
    <main id="main-content" className="hobbies-page pt-14 px-[5%] pb-20">
      <header className="hobbies-heading [&_>_p:not(.eyebrow)]:text-muted-foreground [&_nav_a]:text-primary [&_nav_a]:[text-underline-offset:5px] [&_nav_a]:[text-decoration:underline] [&_nav_a]:py-2 [&_nav_a]:px-0">
        <p className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
          <Text>Outside work</Text>
        </p>
        <h1 className="text-[clamp(42px,_7vw,_76px)] font-medium tracking-[-2.5px] leading-[1.1] my-[18px] mx-0">
          <Text>Hobbies.</Text>
        </h1>
        <p>
          <Text>Travelling, gaming, running and hiking.</Text>
        </p>
        <nav className="flex flex-wrap [gap:12px_28px] mt-7" aria-label="Hobby sections">
          <Link href="#travelling">
            <Text>Travelling</Text>
          </Link>
          <Link href="#gaming">
            <Text>Gaming</Text>
          </Link>
          <Link href="#running-hiking">
            <Text>Running &amp; Hiking</Text>
          </Link>
        </nav>
      </header>
      <HobbyPlaceholder
        id="travelling"
        title="Travelling"
        description="Places, photos and notes from the road."
      />
      <GamingLibrary library={library} />
      <HobbyPlaceholder
        id="running-hiking"
        title="Running & Hiking"
        description="Routes, trails and time outdoors."
      />
    </main>
  );
}
