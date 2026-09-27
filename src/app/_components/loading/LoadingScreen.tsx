import { Brand } from '@/app/_components/brand/Brand';
import { Text } from '@/app/_components/localization/Text';

export function LoadingScreen() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid min-h-[70svh] place-items-center bg-background px-6 py-20 text-foreground"
    >
      <div className="flex w-full max-w-xs flex-col items-center gap-8">
        <div aria-hidden="true">
          <Brand />
        </div>
        <div aria-hidden="true" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm bg-primary motion-safe:animate-pulse" />
          <span className="h-2 w-2 rounded-sm bg-primary motion-safe:animate-pulse [animation-delay:150ms]" />
          <span className="h-2 w-2 rounded-sm bg-primary motion-safe:animate-pulse [animation-delay:300ms]" />
        </div>
        <p className="text-sm text-muted-foreground">
          <Text>Loading page…</Text>
        </p>
      </div>
    </div>
  );
}
