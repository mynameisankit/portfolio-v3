'use client';
import Image from 'next/image';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { useCopy } from '@/app/_components/localization/useCopy';
import type { Post } from '@/data/blog/model';
import { translateRichBody } from './translateRichBody';
import { PortableText } from '@portabletext/react';

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
          image: ({ value }) => {
            if (typeof value.url === 'string' && value.url.startsWith('https://cdn.sanity.io/')) {
              return (
                <figure>
                  <Image
                    src={value.url}
                    alt={typeof value.alt === 'string' ? value.alt : ''}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                  {value.caption && (
                    <figcaption>
                      <Text>{String(value.caption)}</Text>
                    </figcaption>
                  )}
                </figure>
              );
            }

            return null;
          },
          code: ({ value }) => (
            <pre>
              <code>{String(value.code ?? '')}</code>
            </pre>
          ),
        },
        marks: {
          link: ({ value, children }) => {
            const href = typeof value?.href === 'string' ? value.href : '';

            if (/^(https?:\/\/|mailto:|\/[^/]|#)/.test(href)) {
              return (
                <Link href={href} rel="noreferrer">
                  {children}
                </Link>
              );
            }

            return <span>{children}</span>;
          },
        },
      }}
    />
  );
}
