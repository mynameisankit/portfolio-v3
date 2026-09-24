import Image from 'next/image';

import Link from '@/features/localization/link';
import { LocalizedDate, Text } from '@/features/localization/text';

import { getCategory, type Post, postPath } from './model';

export function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <article className={`blog-tile blog-variant-${index % 4}`}>
      <Link
        href={postPath(post)}
        preview={{ title: post.title, description: post.description, image: post.cover?.url }}
        className="blog-card"
      >
        {post.cover && (
          <Image
            className="blog-cover"
            src={post.cover.url}
            alt={post.cover.alt}
            width={900}
            height={600}
            style={{ width: '100%', height: 'auto' }}
          />
        )}
        {post.sample && index % 4 !== 3 && (
          <div className={`blog-art blog-art-${post.category}`} aria-hidden="true">
            {post.category === 'technical' ? (
              <code>
                const view = describe(state);
                <br />
                render(view);
              </code>
            ) : (
              <span>
                {post.category === 'travelling' ? 'Photo placeholder' : 'PAUSE / EXPLORE'}
              </span>
            )}
          </div>
        )}
        <div className="blog-card-content">
          <p className="eyebrow">{<Text>{getCategory(post.category)?.label}</Text>}</p>
          <h2>
            <Text>{post.title}</Text>
          </h2>
          <p>
            <Text>{post.description}</Text>
          </p>
          <div className="blog-meta">
            <LocalizedDate value={post.date} />
            <span>
              {post.minutes} <Text>{'min read'}</Text>
            </span>
          </div>
          {post.sample && (
            <span className="blog-sample">
              <Text>{'Sample post'}</Text>
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
