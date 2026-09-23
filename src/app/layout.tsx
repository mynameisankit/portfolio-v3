import './globals.css';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Ankit Kumar | Software Engineer',
  description:
    'Software Engineer at Rubrik. Web interfaces, frontend infrastructure, and a few things outside work.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
