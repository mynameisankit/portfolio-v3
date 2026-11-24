import Image from 'next/image';
import Link from '@/app/_components/localization/Link';
import { LocalizedDate } from '@/app/_components/localization/LocalizedDate';
import { Text } from '@/app/_components/localization/Text';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import { getCategory, type Post, postPath } from '@/data/blog/model';
import { cn } from '@/lib/className.utils';

const COVER_WIDTH = 900;
const COVER_HEIGHT = 600;
const CARD_PATTERN_LENGTH = 4;
const TALL_CARD_POSITION = 3;

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
            width={COVER_WIDTH}
            height={COVER_HEIGHT}
            loading="lazy"
            placeholder={post.cover?.lqip ? 'blur' : 'empty'}
            blurDataURL={post.cover?.lqip ?? undefined}
          />
        </ConditionalRenderer>
        <div
          className={cn(
            'blog-card-content flex flex-col gap-3',
            isList ? 'py-[22px]' : 'p-5',
            !isList && index % CARD_PATTERN_LENGTH === TALL_CARD_POSITION && 'py-[30px]',
          )}
        >
          <p className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
            <Text>{getCategory(post.category)?.label}</Text>
          </p>
          <h2
            className={cn(
              'font-normal tracking-[-0.4px] group-hover/post:text-primary',
              !isList && index % CARD_PATTERN_LENGTH === TALL_CARD_POSITION
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
        </div>
      </Link>
    </article>
  );
}
