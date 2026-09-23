import Link from 'next/link';

import { getCategory, type Post, postPath } from './model';

export function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <article className={`blog-tile blog-variant-${index % 4}`}>
      <Link href={postPath(post)} className="blog-card">
        {index % 4 !== 3 && (
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
          <p className="eyebrow">{getCategory(post.category)?.label}</p>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <div className="blog-meta">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                timeZone: 'UTC',
              })}
            </time>
            <span>{post.minutes} min read</span>
          </div>
          {post.sample && <span className="blog-sample">Sample post</span>}
        </div>
      </Link>
    </article>
  );
}
