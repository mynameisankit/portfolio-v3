'use client';
import { Text } from '@/app/_components/localization/Text';
import { type Category, type Post } from '@/data/blog/model';
import { ArchiveCategories } from './ArchiveCategories';
import { ArchiveIntro } from './ArchiveIntro';
import { ArchiveResults } from './ArchiveResults';
import { ArchiveSearch } from './ArchiveSearch';
import { BlogPagination } from './Pagination';
import { useBlogArchive } from './useBlogArchive';

export function BlogArchive({ posts, category }: { posts: Post[]; category?: Category }) {
  const archive = useBlogArchive(posts, category);

  return (
    <section className="blog-archive py-10 px-[5%]">
      <ArchiveIntro selected={archive.selected} />
      {posts.some((post) => post.isSample) && (
        <p className="blog-notice text-muted-foreground font-mono text-[12px] leading-[1.6] my-5 mx-0">
          <Text>Layout preview — these articles are sample content.</Text>
        </p>
      )}
      <ArchiveSearch query={archive.query} updateSearch={archive.updateSearch} />
      <ArchiveCategories
        posts={posts}
        selected={archive.selected}
        categoryHref={archive.categoryHref}
      />
      <ArchiveResults {...archive} />
      <BlogPagination page={archive.page} pages={archive.pages} onChange={archive.changePage} />
    </section>
  );
}
