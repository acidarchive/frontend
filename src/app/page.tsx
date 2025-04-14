import { pattern, PatternTB303 } from '@/app/components/organisms/pattern';

export default function HomePage() {
  return (
    <div className="flex-grow">
      <div className="py-12">
        <main>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <PatternTB303 pattern={pattern} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
