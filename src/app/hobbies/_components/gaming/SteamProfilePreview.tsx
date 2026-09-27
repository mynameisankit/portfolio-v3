import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { steamConfig } from '@/config/steamConfig';

export function SteamProfilePreview({ avatar }: { avatar: string }) {
  return (
    <Link
      className="gaming-profile inline-block text-primary mt-6"
      href={steamConfig.profileUrl}
      target="_blank"
      rel="noreferrer"
      preview={{ title: 'bizzareKumar', description: 'Recent activity and games', image: avatar }}
    >
      <Text>My Steam profile ↗</Text>
    </Link>
  );
}
