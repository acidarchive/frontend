import { listPublicPatternsTB303Server } from '@/dal';
import { PublicPatternList } from '@/features/public-pattern-list/public-pattern-list';

const LIMIT = 30;

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { page } = await searchParams;
  const currentPage = page ? Number.parseInt(page, 10) : 1;
  const offset = (currentPage - 1) * LIMIT;
  const data = await listPublicPatternsTB303Server(LIMIT, offset);

  return <PublicPatternList data={data} currentPage={currentPage} limit={LIMIT} />;
}
