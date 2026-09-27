import Link from '@/app/_components/localization/Link';
import { Text } from '@/app/_components/localization/Text';
import { ContentLanguageNotice } from '@/app/blogs/_components/article/ContentLanguageNotice';
import { getCategory, type Post } from '@/data/blog/model';
import { ArticleBody } from './ArticleBody';

export function BlogArticle({ post }: { post: Post }) {
  return (
    <article className="blog-reader max-w-[730px] py-[45px] px-[5%] my-0 mx-auto [&_.eyebrow]:mt-[30px] [&_>_p:not(.eyebrow)]:font-[Georgia,serif] [&_>_p:not(.eyebrow)]:text-[19px] [&_>_p:not(.eyebrow)]:leading-[1.85] [&_>_p:not(.eyebrow)]:mb-[25px] [&_.blog-lede]:text-muted-foreground [&_pre]:p-[22px] [&_pre]:[overflow:auto] [&_pre]:bg-card [&_pre]:border [&_pre]:border-border [&_pre]:rounded-md [&_blockquote]:my-6 [&_blockquote]:mx-0 [&_blockquote]:pl-5 [&_blockquote]:[border-left:3px_solid_var(--primary)] [&_blockquote]:text-muted-foreground [&_h2]:mt-8 [&_h2]:mx-0 [&_h2]:mb-4 [&_h3]:mt-8 [&_h3]:mx-0 [&_h3]:mb-4 [&_li]:[margin-block:8px] [&_figcaption]:text-[13px] [&_figcaption]:text-muted-foreground [&_figure]:my-7 [&_figure]:mx-0 [&_p_a]:text-primary [&_p_a]:[text-decoration:underline]">
      <Link href={`/blogs/${post.category}`}>
        ← <Text>{getCategory(post.category)?.label}</Text>
      </Link>
      <p className="eyebrow font-mono text-[12px] leading-[1.6] tracking-[1.2px] uppercase text-muted-foreground">
        {post.isSample ? 'Sample article · ' : ''}
        {post.minutes} <Text>min read</Text>
      </p>
      <h1 className="text-[clamp(32px,_5vw,_48px)] tracking-[-1px] leading-[1.2] font-normal mt-4 mx-0 mb-6">
        <Text>{post.title}</Text>
      </h1>
      <p className="blog-lede">
        <Text>{post.description}</Text>
      </p>
      <ContentLanguageNotice sources={[post.title, post.description, ...post.body]} />
      <ArticleBody post={post} />
      <hr className="border-0 [border-top:1px_solid_var(--border)] my-[35px] mx-0" />
      <Link href="/blogs">
        <Text>Browse all writing ↗</Text>
      </Link>
    </article>
  );
}
