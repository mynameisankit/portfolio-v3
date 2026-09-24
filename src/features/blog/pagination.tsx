import { Button } from '@/components/ui/button';
import { Text } from '@/features/localization/text';
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
    <nav className="blog-pagination" aria-label="Article pages">
      <Button variant="outline" disabled={page === 1} onClick={() => onChange(page - 1)}>
        <Text>{'← Previous'}</Text>
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
        <Text>{'Next →'}</Text>
      </Button>
    </nav>
  );
}
