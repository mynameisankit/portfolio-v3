import type { Post } from './model';

export function translateRichBody(
  body: NonNullable<Post['richBody']>,
  translate: (source: string) => string,
) {
  return body.map((block) => {
    if (block._type !== 'block' || !Array.isArray(block.children)) {
      return block;
    }
    return {
      ...block,
      children: block.children.map((span: unknown) => {
        if (
          !span ||
          typeof span !== 'object' ||
          !('_type' in span) ||
          span._type !== 'span' ||
          !('text' in span) ||
          typeof span.text !== 'string'
        ) {
          return span;
        }
        return { ...span, text: translate(span.text) };
      }),
    };
  });
}
