import { YoutubePlayer } from '@/app/components/atoms/youtube-player';
import { MainLayout } from '@/app/components/layouts/main-layout';
import { Comments } from '@/app/components/organisms/comments';
import { PatternTB303 } from '@/app/components/organisms/pattern';
import { PatternDetails } from '@/app/components/organisms/pattern-details';

export default async function PatternPage() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/v1/patterns/tb303/random`,
  );
  const response = await data.json();

  return (
    <MainLayout>
      <main>
        <div className="pt-16"></div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="lg:col-start-3 lg:row-end-1">
              <PatternDetails />
            </div>

            <div className="-mx-4 sm:mx-0 lg:col-span-2 lg:row-span-2 lg:row-end-2 flex flex-col gap-y-8">
              <PatternTB303 pattern={response.data} />
              <div>
                <Comments />
              </div>
            </div>

            <div className="lg:col-start-3">
              <h2 className="text-sm/6 font-semibold text-gray-900 mb-4">
                Videos
              </h2>
              <YoutubePlayer />
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
