'use client';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

import Link from '@/features/localization/link';
import { Text, useCopy } from '@/features/localization/text';

import type { Post } from './model';
import { translateRichBody } from './translate-rich-body';

export function ArticleBody({ post }: { post: Post }) {
  const translate = useCopy();
  if (!post.richBody?.length) {
    return (
      <>
        {post.body.map((paragraph) => (
          <p key={paragraph}>
            <Text>{paragraph}</Text>
          </p>
        ))}
      </>
    );
  }
  return (
    <PortableText
      value={translateRichBody(post.richBody, translate)}
      components={{
        types: {
          image: ({ value }) =>
            typeof value.url === 'string' && value.url.startsWith('https://cdn.sanity.io/') ? (
              <figure>
                <Image
                  src={value.url}
                  alt={typeof value.alt === 'string' ? value.alt : ''}
                  width={1200}
                  height={800}
                  style={{ width: '100%', height: 'auto' }}
                />
                {value.caption && (
                  <figcaption>
                    <Text>{String(value.caption)}</Text>
                  </figcaption>
                )}
              </figure>
            ) : null,
          code: ({ value }) => (
            <pre>
              <code>{String(value.code ?? '')}</code>
            </pre>
          ),
        },
        marks: {
          link: ({ value, children }) => {
            const href = typeof value?.href === 'string' ? value.href : '';
            return /^(https?:\/\/|mailto:|\/[^/]|#)/.test(href) ? (
              <Link href={href} rel="noreferrer">
                {children}
              </Link>
            ) : (
              <span>{children}</span>
            );
          },
        },
      }}
    />
  );
}
