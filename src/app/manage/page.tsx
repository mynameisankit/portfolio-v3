import './manage.css';

import type { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import Link from '@/features/localization/link';

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
    <main className="manage-page">
      <Link href="/">← Portfolio</Link>
      <p className="eyebrow">Content Studio</p>
      <h1>
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
      <section aria-labelledby="install-title">
        <h2 id="install-title">Keep it on your home screen</h2>
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
