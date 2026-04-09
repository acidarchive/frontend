import { PatternCard } from '@/components/molecules/pattern-card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PublicTB303PatternsList } from '@/types/api';

interface PublicPatternListProps {
  data: PublicTB303PatternsList;
  currentPage: number;
  limit: number;
}

export function PublicPatternList({ data, currentPage, limit }: PublicPatternListProps) {
  const offset = (currentPage - 1) * limit;
  const hasPrevious = currentPage > 1;
  const hasNext = offset + limit < data.total;

  return (
    <div className="container mx-auto px-4 py-8 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map(pattern => (
          <PatternCard key={pattern.pattern_id} pattern={pattern} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-8">
        <Pagination>
          <PaginationContent>
            {hasPrevious && (
              <PaginationItem>
                <PaginationPrevious href={`/?page=${currentPage - 1}`} />
              </PaginationItem>
            )}
            {hasNext && (
              <PaginationItem>
                <PaginationNext href={`/?page=${currentPage + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
