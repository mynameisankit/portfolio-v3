import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { ConditionalRenderer } from '@/app/_components/ui/ConditionalRenderer';
import { ContentLanguageNotice } from '@/app/blogs/_components/article/ContentLanguageNotice';
import { getCategory, type Post } from '@/data/blog/model';
import { TableOfContents } from './TableOfContents';

export function BlogArticle({ post, children }: { post: Post; children: ReactNode }) {
  return (
    <article className="blog-reader w-full pb-[45px] [&_.eyebrow]:mt-[30px] [&_>_div_>_p:not(.eyebrow)]:text-[19px] [&_>_div_>_p:not(.eyebrow)]:leading-[1.85] [&_>_div_>_p:not(.eyebrow)]:mb-[25px] [&_.blog-lede]:text-muted-foreground [&_pre]:p-[22px] [&_pre]:[overflow:auto] [&_pre]:bg-card [&_pre]:border [&_pre]:border-border [&_pre]:rounded-md [&_blockquote]:my-6 [&_blockquote]:mx-0 [&_blockquote]:pl-5 [&_blockquote]:[border-left:3px_solid_var(--primary)] [&_blockquote]:text-muted-foreground [&_h4]:scroll-mt-24 [&_h5]:scroll-mt-24 [&_h6]:scroll-mt-24 [&_h4]:mt-6 [&_h4]:mb-3 [&_h4]:font-medium [&_h5]:mt-6 [&_h5]:mb-3 [&_h5]:font-medium [&_h6]:mt-6 [&_h6]:mb-3 [&_h6]:font-medium [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24 [&_h2]:mt-8 [&_h2]:mx-0 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mx-0 [&_h3]:mb-4 [&_li]:[margin-block:8px] [&_figcaption]:text-[13px] [&_figcaption]:text-muted-foreground [&_figure]:my-7 [&_figure]:mx-0 [&_p_a]:text-primary [&_p_a]:[text-decoration:underline]">
      <figure className="m-0!">
        <div className="relative h-56 w-full sm:h-80 lg:h-[28rem] 2xl:h-[34rem]">
          <Image
            src={post.cover.url}
            alt={post.cover.alt}
            fill
            loading="eager"
            className="object-cover [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
            sizes="(min-width: 2560px) 50vw, (min-width: 1024px) 60vw, 100vw"
          />
        </div>
        <ConditionalRenderer shouldRender={!!post.cover.caption}>
          <figcaption className="px-[5%]">{post.cover.caption}</figcaption>
        </ConditionalRenderer>
      </figure>
      <div className="px-[5%]">
        <Link href={`/blogs/${post.category}`}>
          ← <Text>{getCategory(post.category)?.label}</Text>
        </Link>
        <p className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
          {post.minutes} <Text>min read</Text>
        </p>
        <h1 className="text-[clamp(32px,_5vw,_48px)] tracking-[-1px] leading-[1.2] font-normal mt-4 mx-0 mb-6">
          <Text>{post.title}</Text>
        </h1>
        <ConditionalRenderer shouldRender={!!post.description}>
          <p className="blog-lede">
            <Text>{post.description}</Text>
          </p>
        </ConditionalRenderer>
        <ContentLanguageNotice sources={[post.title, post.description, ...post.body]} />
        <TableOfContents headings={post.headings} />
        {children}
        <hr className="border-0 [border-top:1px_solid_var(--border)] my-[35px] mx-0" />
        <Link href="/blogs">
          <Text>Browse all writing</Text>
        </Link>
      </div>
    </article>
  );
}
