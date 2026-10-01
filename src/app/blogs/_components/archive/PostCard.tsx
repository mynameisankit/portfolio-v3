import Image from 'next/image';
import Link from '@/app/_components/localization/Link';
import { LocalizedDate } from '@/app/_components/localization/LocalizedDate';
import { Text } from '@/app/_components/localization/Text';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import { getCategory, type Post, postPath } from '@/data/blog/model';
import { cn } from '@/lib/utils';

export function PostCard({
  post,
  index,
  isList = false,
}: {
  post: Post;
  index: number;
  isList?: boolean;
}) {
  return (
    <article
      className={cn(
        'blog-tile',
        isList
          ? 'w-full'
          : 'group-data-[ready=true]/archive:mb-[22px] group-data-[ready=true]/archive:w-[calc((100%-44px)/3)] max-[801px]:group-data-[ready=true]/archive:w-[calc((100%-22px)/2)] max-[521px]:group-data-[ready=true]/archive:w-full',
      )}
    >
      <Link
        href={postPath(post)}
        preview={{ title: post.title, description: post.description, image: post.cover?.url }}
        className={cn(
          'blog-card group/post block overflow-hidden',
          isList ? 'border-t border-border' : 'rounded-lg border border-border bg-card',
        )}
      >
        <ConditionalRenderer shouldRender={!!post.cover}>
          <Image
            className={cn('blog-cover h-auto w-full', isList && 'hidden')}
            src={post.cover?.url ?? ''}
            alt={post.cover?.alt ?? ''}
            width={900}
            height={600}
            loading="lazy"
            placeholder={post.cover?.lqip ? 'blur' : 'empty'}
            blurDataURL={post.cover?.lqip ?? undefined}
          />
        </ConditionalRenderer>
        {post.isSample && index % 4 !== 3 && (
          <div
            className={cn(
              'blog-art grid place-items-center border-b border-border bg-secondary p-5',
              ['min-h-[170px]', 'min-h-[230px]', 'min-h-[125px]', 'min-h-[170px]'][index % 4],
              isList && 'hidden',
              post.category === 'travelling' &&
                'bg-[linear-gradient(150deg,transparent_49%,var(--border)_50%,var(--secondary)_76%),linear-gradient(35deg,var(--secondary)_40%,var(--border)_41%,var(--background)_75%)]',
              post.category === 'video-games' &&
                'bg-[repeating-linear-gradient(0deg,transparent,transparent_17px,var(--border)_18px),var(--secondary)]',
            )}
            aria-hidden="true"
          >
            {post.category === 'technical' && (
              <code className="font-mono text-[12px] leading-[1.9] text-primary wrap-anywhere">
                const view = describe(state);
                <br />
                render(view);
              </code>
            )}
            {post.category !== 'technical' && (
              <span
                className={cn(
                  'font-mono text-[12px]',
                  post.category === 'video-games' && 'bg-background p-3 text-primary',
                )}
              >
                {post.category === 'travelling' ? 'Photo placeholder' : 'PAUSE / EXPLORE'}
              </span>
            )}
          </div>
        )}
        <div
          className={cn(
            'blog-card-content flex flex-col gap-3',
            isList ? 'py-[22px]' : 'p-5',
            !isList && index % 4 === 3 && 'py-[30px]',
          )}
        >
          <p className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
            <Text>{getCategory(post.category)?.label}</Text>
          </p>
          <h2
            className={cn(
              'font-normal tracking-[-0.4px] group-hover/post:text-primary',
              !isList && index % 4 === 3
                ? 'text-[27px] leading-[1.3]'
                : 'text-[22px] leading-[1.35]',
            )}
          >
            <Text>{post.title}</Text>
          </h2>
          <p className="text-[14px] text-muted-foreground">
            <Text>{post.description}</Text>
          </p>
          <div className="blog-meta flex flex-wrap [gap:8px_14px] font-mono text-[11px] leading-[1.6] text-muted-foreground">
            <LocalizedDate value={post.date} />
            <span>
              {post.minutes} <Text>min read</Text>
            </span>
          </div>
          {post.isSample && (
            <span className="blog-sample font-mono text-[11px] leading-[1.5] text-muted-foreground">
              <Text>Sample post</Text>
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
