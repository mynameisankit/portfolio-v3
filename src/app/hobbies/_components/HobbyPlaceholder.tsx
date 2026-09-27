import { Text } from '@/app/_components/localization/Text';
import { ImageIcon } from 'lucide-react';

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
    <section
      className="hobby-section [&_>_p]:text-muted-foreground mt-14 pt-9 [border-top:1px_solid_var(--border)] [scroll-margin-top:24px] [&_>_h2]:text-[clamp(28px,_4vw,_42px)] [&_>_h2]:font-medium [&_>_h2]:tracking-[-1px] [&_>_h2]:mb-[14px]"
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <h2 id={`${id}-title`}>
        <Text>{title}</Text>
      </h2>
      <p>
        <Text>{description}</Text>
      </p>
      <div className="hobby-placeholder mt-6 min-h-45 p-7 flex flex-col gap-4 items-center justify-center bg-card border border-dashed border-border rounded-[10px] text-muted-foreground text-center">
        <ImageIcon size={28} aria-hidden="true" />
        <span>
          <Text>Photos and stories coming soon.</Text>
        </span>
      </div>
    </section>
  );
}
