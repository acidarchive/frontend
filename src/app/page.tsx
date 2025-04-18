import { MainLayout } from '@/app/components/layouts/main-layout';
import { pattern, PatternTB303 } from '@/app/components/organisms/pattern';

export default function HomePage() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <PatternTB303 pattern={pattern} />
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
