import './hobbies-page.css';

import { GamingLibrary } from '@/features/gaming/gaming-library';
import type { GameLibrary } from '@/features/gaming/model';
import Link from '@/features/localization/link';
import { Text } from '@/features/localization/text';

import { HobbyPlaceholder } from './hobby-placeholder';

export function HobbiesPage({ library }: { library: GameLibrary }) {
  return (
    <main id="main-content" className="hobbies-page">
      <header className="hobbies-heading">
        <p className="eyebrow">
          <Text>{'Outside work'}</Text>
        </p>
        <h1>
          <Text>{'Hobbies.'}</Text>
        </h1>
        <p>
          <Text>{'Travelling, gaming, running and hiking.'}</Text>
        </p>
        <nav aria-label="Hobby sections">
          <Link href="#travelling">
            <Text>{'Travelling'}</Text>
          </Link>
          <Link href="#gaming">
            <Text>{'Gaming'}</Text>
          </Link>
          <Link href="#running-hiking">
            <Text>{'Running & Hiking'}</Text>
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
