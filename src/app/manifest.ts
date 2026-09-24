import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Ankit Kumar — Portfolio',
    short_name: 'Ankit',
    description: 'Web interfaces, frontend infrastructure, and writing.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#15121e',
    theme_color: '#15121e',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Writing', url: '/blogs' },
      { name: 'Edit content', url: '/manage' },
    ],
  };
}
