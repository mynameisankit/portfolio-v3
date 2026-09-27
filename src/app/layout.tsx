import './globals.css';
import type { Metadata, Viewport } from 'next';
import { LocalizationProvider } from '@/app/_components/localization/Provider';
import { ServiceWorkerRegistration } from '@/app/_components/pwa/ServiceWorkerRegistration';
import { getTranslations } from '@/localization/repository';

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
