import './globals.css';

import type { Metadata, Viewport } from 'next';

import { LocalizationProvider } from '@/features/localization/provider';
import { getTranslations } from '@/features/localization/repository';
import { ServiceWorkerRegistration } from '@/features/pwa/service-worker-registration';
export const viewport: Viewport = { themeColor: '#15121e' };
export const metadata: Metadata = {
  title: 'Ankit Kumar | Software Engineer',
  description:
    'Software Engineer at Rubrik. Web interfaces, frontend infrastructure, and a few things outside work.',
  icons: { icon: '/favicon.svg', apple: '/icons/apple-touch-icon.png' },
  appleWebApp: { capable: true, title: 'Ankit', statusBarStyle: 'default' },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const translations = await getTranslations();
  return (
    <html lang="en" data-theme="dark">
      <body>
        <LocalizationProvider translations={translations}>
          {children}
          <ServiceWorkerRegistration />
        </LocalizationProvider>
      </body>
    </html>
  );
}
