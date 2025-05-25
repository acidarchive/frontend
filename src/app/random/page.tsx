import { MainLayout } from '@/app/components/layouts/main-layout';
import { PatternTB303 } from '@/app/components/organisms/pattern';

export default async function PatternPage() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/v1/patterns/tb303/random`,
    {
      cache: 'no-store',
    },
  );
  const response = await data.json();

  return (
    <MainLayout>
      <div className="w-full max-w-3xl px-4 sm:px-6">
        <PatternTB303 pattern={response.data} />
      </div>
    </MainLayout>
  );
}
