'use client';
import Image from 'next/image';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { useCopy } from '@/app/_components/localization/useCopy';
import type { Post } from '@/data/blog/model';
import { translateRichBody } from './translateRichBody.utils';
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
        block: {
          h2: ({ value, children }) => (
            <h2 id={`section-${value._key}`} className="scroll-mt-24">
              {children}
            </h2>
          ),
          h3: ({ value, children }) => (
            <h3 id={`section-${value._key}`} className="scroll-mt-24">
              {children}
            </h3>
          ),
          h4: ({ value, children }) => (
            <h4 id={`section-${value._key}`} className="scroll-mt-24">
              {children}
            </h4>
          ),
          h5: ({ value, children }) => (
            <h5 id={`section-${value._key}`} className="scroll-mt-24">
              {children}
            </h5>
          ),
          h6: ({ value, children }) => (
            <h6 id={`section-${value._key}`} className="scroll-mt-24">
              {children}
            </h6>
          ),
        },
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
                    loading="lazy"
                    placeholder={typeof value.lqip === 'string' && value.lqip ? 'blur' : 'empty'}
                    blurDataURL={typeof value.lqip === 'string' ? value.lqip : undefined}
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
