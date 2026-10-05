import './globals.css';
import type { Metadata, Viewport } from 'next';
import { InitialAnchorScroll } from '@/app/_components/layout/InitialAnchorScroll';
import { LocalizationProvider } from '@/app/_components/localization/Provider';
import { ServiceWorkerRegistration } from '@/app/_components/pwa/ServiceWorkerRegistration';
import { siteConfig } from '@/config/siteConfig';
import { getTranslations } from '@/localization/repository';

export const viewport: Viewport = { themeColor: '#15121e' };
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: '%s | Ankit Kumar' },
  description: siteConfig.description,
  applicationName: 'ankitkumar.fyi',
  keywords: [
    'Ankit Kumar',
    'Software Engineer',
    'Frontend Engineer',
    'React',
    'TypeScript',
    'Web development',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'ankitkumar.fyi',
    title: siteConfig.title,
    description: siteConfig.description,
    locale: 'en_US',
  },
  twitter: { card: 'summary', title: siteConfig.title, description: siteConfig.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: { icon: '/favicon.svg', apple: '/icons/apple-touch-icon.png' },
  appleWebApp: { capable: true, title: 'Ankit', statusBarStyle: 'default' },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const translations = await getTranslations();

  return (
    <html lang="en" data-theme="dark">
      <body>
        <LocalizationProvider translations={translations}>
          <InitialAnchorScroll />
          {children}
          <ServiceWorkerRegistration />
        </LocalizationProvider>
      </body>
    </html>
  );
}
