import { Plus } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { PageContainer } from '@/components/layouts/page-container';
import { Button } from '@/components/ui/button';
import { getTB303PatternsList } from '@/dal/tb303-pattern';
import { TB303PatternsList } from '@/features/tb303-patterns-list';

interface SearchParams {
  page?: string;
  page_size?: string;
  sort_column?: string;
  sort_direction?: string;
  search?: string;
  is_public?: string;
  [key: string]: string | undefined;
}

interface TB303ListPageProps {
  searchParams: Promise<SearchParams>;
}

function parseSearchParams(searchParams: Record<string, string | undefined>) {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.page_size) || 10;
  const sortColumn = searchParams.sort_column || undefined;
  const sortDirection = searchParams.sort_direction as
    | 'ascending'
    | 'descending'
    | undefined;
  const search = searchParams.search || undefined;
  const isPublic = searchParams.is_public
    ? searchParams.is_public === 'true'
    : undefined;

  return {
    page,
    pageSize,
    sortColumn,
    sortDirection,
    search,
    isPublic,
  };
}

export default async function TB303ListPage({
  searchParams,
}: TB303ListPageProps) {
  const resolvedSearchParams = await searchParams;
  const { page, pageSize, sortColumn, sortDirection, search, isPublic } =
    parseSearchParams(resolvedSearchParams);

  const data = await getTB303PatternsList(
    {
      page,
      page_size: pageSize,
      sort_column: sortColumn,
      sort_direction: sortDirection,
      search,
      is_public: isPublic,
    },
    { cookies },
  );

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              TB-303 Patterns
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of the tb-303 patterns you have created.
            </p>
          </div>
          <Link href="/dashboard/tb303/add">
            <Button>
              <Plus className="h-4 w-4" />
              Add Pattern
            </Button>
          </Link>
        </div>

        <TB303PatternsList
          data={data?.records}
          totalPages={data?.total_pages || 0}
        />
      </div>
    </PageContainer>
  );
}
