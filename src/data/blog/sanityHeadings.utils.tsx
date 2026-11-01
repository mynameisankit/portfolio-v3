import type { ArticleHeading, Post } from './model';

export function getSanityHeadings(body: NonNullable<Post['richBody']>): ArticleHeading[] {
  return body.flatMap((block) => {
    if (
      block._type !== 'block' ||
      typeof block.style !== 'string' ||
      !/^h[2-6]$/.test(block.style) ||
      typeof block._key !== 'string' ||
      !Array.isArray(block.children)
    ) {
      return [];
    }
    const text = block.children
      .map((span: unknown) => {
        if (span && typeof span === 'object' && 'text' in span && typeof span.text === 'string') {
          return span.text;
        }

        return '';
      })
      .join('');

    return [{ id: `section-${block._key}`, text, depth: Number(block.style.slice(1)) }];
  });
}
