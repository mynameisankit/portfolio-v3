export type PreviewData = {
  title?: string;
  description?: string;
  image?: string;
  fallbackImage?: string;
};

const destinations: Record<string, PreviewData> = {
  '/': {
    title: 'Ankit Kumar',
    description: 'Web interfaces, frontend infrastructure, and a few things outside work.',
  },
  '#projects': {
    title: 'Selected work',
    description: 'React JSON Renderer and Conway’s Game of Life.',
  },
  '#experience': { title: 'Experience', description: 'The journey so far.' },
  '#top': { title: 'Ankit Kumar', description: 'Back to top ↑' },
  '#travelling': { title: 'Travelling', description: 'Places, photos and notes from the road.' },
  '#gaming': {
    title: 'Gaming',
    description: 'My most-played Steam games, ranked by total playtime.',
  },
  '#running-hiking': {
    title: 'Running & Hiking',
    description: 'Routes, trails and time outdoors.',
  },
  '/blogs': { title: 'Writing', description: 'Technical notes, travelling and video games.' },
  '/hobbies': { title: 'Hobbies', description: 'Travelling, gaming, running and hiking.' },
  '/gaming': { title: 'Hobbies', description: 'Travelling, gaming, running and hiking.' },
  '/manage': { title: 'Content Studio', description: 'Edit portfolio content and blog posts.' },
  '/studio/': { title: 'Content Studio', description: 'Edit portfolio content and blog posts.' },
};

export function getPreviewData(
  href: string,
  supplied?: PreviewData,
): Required<PreviewData> & { hostname: string } {
  const url = new URL(href, 'https://ankitkumar.fyi');
  const internal =
    href.startsWith('/') || href.startsWith('#') || url.hostname === 'ankitkumar.fyi';
  const known = internal ? (destinations[url.hash] ?? destinations[url.pathname]) : undefined;
  const github = url.hostname === 'github.com';
  const parts = url.pathname.split('/').filter(Boolean);
  const title = known?.title ?? (github ? parts.join(' / ') || 'GitHub' : url.hostname);
  const fallbackImage = internal ? '/favicon.svg' : '';
  const image =
    github && parts.length >= 2
      ? `https://opengraph.githubassets.com/portfolio/${parts[0]}/${parts[1]}`
      : fallbackImage;
  return {
    title: supplied?.title ?? title,
    description:
      supplied?.description ?? known?.description ?? (github ? 'GitHub ↗' : url.pathname),
    image: supplied?.image ?? image,
    fallbackImage: supplied?.fallbackImage || '/favicon.svg',
    hostname: internal ? 'ankitkumar.fyi' : url.hostname,
  };
}
