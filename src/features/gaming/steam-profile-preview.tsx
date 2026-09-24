import Link from '@/features/localization/link';
import { Text } from '@/features/localization/text';

import { steamProfile } from './model';

export function SteamProfilePreview({ avatar }: { avatar: string }) {
  return (
    <Link
      className="gaming-profile"
      href={steamProfile}
      target="_blank"
      rel="noreferrer"
      preview={{ title: 'bizzareKumar', description: 'Recent activity and games', image: avatar }}
    >
      <Text>{'My Steam profile ↗'}</Text>
    </Link>
  );
}
