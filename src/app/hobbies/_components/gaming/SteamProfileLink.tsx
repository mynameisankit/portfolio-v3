import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { steamConfig } from '@/config/steamConfig';

export function SteamProfileLink() {
  return (
    <Link
      className="gaming-profile inline-flex items-center gap-1.5 text-primary mt-6"
      href={steamConfig.profileUrl}
      hasExternalIcon
      target="_blank"
      rel="noreferrer"
    >
      <Text>My Steam profile</Text>
    </Link>
  );
}
