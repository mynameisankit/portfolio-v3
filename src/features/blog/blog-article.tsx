import { ContentLanguageNotice } from '@/features/localization/content-language-notice';
import Link from '@/features/localization/link';
import { Text } from '@/features/localization/text';

import { ArticleBody } from './article-body';
import { getCategory, type Post } from './model';
export function BlogArticle({ post }: { post: Post }) {
  return (
    <article className="blog-reader">
      <Link href={`/blogs/${post.category}`}>
        ← {<Text>{getCategory(post.category)?.label}</Text>}
      </Link>
      <p className="eyebrow">
        {post.sample ? 'Sample article · ' : ''}
        {post.minutes} <Text>{'min read'}</Text>
      </p>
      <h1>
        <Text>{post.title}</Text>
      </h1>
      <p className="blog-lede">
        <Text>{post.description}</Text>
      </p>
      <ContentLanguageNotice sources={[post.title, post.description, ...post.body]} />
      <ArticleBody post={post} />
      <hr />
      <Link href="/blogs">
        <Text>{'Browse all writing ↗'}</Text>
      </Link>
    </article>
  );
}
