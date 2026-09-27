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
  '#skills': { title: 'Skills', description: 'The tools and practices behind my work.' },
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
  const isInternal =
    href.startsWith('/') || href.startsWith('#') || url.hostname === 'ankitkumar.fyi';
  const internalDestination = destinations[url.hash] ?? destinations[url.pathname];
  const known = isInternal ? internalDestination : undefined;
  const isGithub = url.hostname === 'github.com';
  const parts = url.pathname.split('/').filter(Boolean);
  const githubTitle = parts.join(' / ') || 'GitHub';
  const title = known?.title ?? (isGithub ? githubTitle : url.hostname);
  const fallbackImage = isInternal ? '/favicon.svg' : '';
  const githubImage = `https://opengraph.githubassets.com/portfolio/${parts[0]}/${parts[1]}`;
  const image = isGithub && parts.length >= 2 ? githubImage : fallbackImage;

  return {
    title: supplied?.title ?? title,
    description:
      supplied?.description ?? known?.description ?? (isGithub ? 'GitHub ↗' : url.pathname),
    image: supplied?.image ?? image,
    fallbackImage: supplied?.fallbackImage || '/favicon.svg',
    hostname: isInternal ? 'ankitkumar.fyi' : url.hostname,
  };
}

export function getPreviewImage(image: string) {
  if (!image) {
    return '';
  }

  return new URL(image, window.location.origin).href;
}
