import type { Metadata } from 'next';
import Link from '@/app/_components/localization/Link';
import { Button } from '@/app/_components/ui/Button';

export const metadata: Metadata = {
  title: 'Content Studio | Ankit',
  manifest: '/editor.webmanifest',
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: 'Ankit Studio', statusBarStyle: 'default' },
};

export default function ManagePage() {
  const studioUrl =
    process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3333/studio/' : '/studio/';

  return (
    <main className="manage-page max-w-165 my-0 mx-auto pt-10 px-6 pb-20 [&_>_a:first-child]:text-muted-foreground [&_>_a:first-child]:text-[14px] [&_.eyebrow]:mt-14 [&_>_p:not(.eyebrow)]:text-muted-foreground [&_>_p:not(.eyebrow)]:mb-6 [&_section_p]:text-muted-foreground [&_section_p]:mb-6">
      <Link href="/">← Portfolio</Link>
      <p className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
        Content Studio
      </p>
      <h1 className="text-[clamp(38px,_8vw,_58px)] leading-[1.1] tracking-[-2px] mt-4 mx-0 mb-6 font-medium">
        A place to write
        <br />
        and update.
      </h1>
      <p>
        Edit your portfolio, career journey, and blog posts. Sign in with your Sanity account to
        continue.
      </p>
      <Button asChild size="lg">
        <Link href={studioUrl}>Open editor ↗</Link>
      </Button>
      <section
        className="[border-top:1px_solid_var(--border)] mt-12 pt-6"
        aria-labelledby="install-title"
      >
        <h2 className="text-[20px] mb-4" id="install-title">
          Keep it on your home screen
        </h2>
        <p>
          On iPhone, open this page in Safari, tap Share, then Add to Home Screen. On Android, use
          Install app or Add to Home screen in your browser menu.
        </p>
        <p>
          The editor needs an internet connection. After publishing, rebuild and deploy the
          portfolio to show your changes publicly.
        </p>
      </section>
    </main>
  );
}
