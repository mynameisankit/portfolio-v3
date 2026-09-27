import { Text } from '@/app/_components/localization/Text';
import { Button } from '@/app/_components/ui/Button';

export function BlogPagination({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}) {
  if (pages <= 1) {
    return null;
  }

  return (
    <nav
      className="blog-pagination flex flex-wrap gap-2 justify-center mt-7 mx-0 mb-0 max-[521px]:[&_button]:[padding-inline:10px]"
      aria-label="Article pages"
    >
      <Button variant="outline" disabled={page === 1} onClick={() => onChange(page - 1)}>
        <Text>← Previous</Text>
      </Button>
      {Array.from({ length: pages }, (_, index) => (
        <Button
          key={index}
          variant={page === index + 1 ? 'default' : 'outline'}
          aria-label={`Page ${index + 1}`}
          aria-current={page === index + 1 ? 'page' : undefined}
          onClick={() => onChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
      <Button variant="outline" disabled={page === pages} onClick={() => onChange(page + 1)}>
        <Text>Next →</Text>
      </Button>
    </nav>
  );
}
