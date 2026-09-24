import { ImageIcon } from 'lucide-react';

import { Text } from '@/features/localization/text';

export function HobbyPlaceholder({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <section className="hobby-section" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>
        <Text>{title}</Text>
      </h2>
      <p>
        <Text>{description}</Text>
      </p>
      <div className="hobby-placeholder">
        <ImageIcon size={28} aria-hidden="true" />
        <span>
          <Text>{'Photos and stories coming soon.'}</Text>
        </span>
      </div>
    </section>
  );
}
