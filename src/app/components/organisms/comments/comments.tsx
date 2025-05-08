import { PaperClipIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Image from 'next/image';

const activity = [
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'acid_pilot',
      imageUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment:
      'Dialed in that iconic acid squelch—my 303 is finally screaming like it’s 1988. Can’t believe how close I got to the Stakker Humanoid tone with just a bit of accent tweaking and cutoff automation.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  {
    id: 40,
    type: 'commented',
    person: {
      name: 'tb303ninja',
      imageUrl:
        'https://images.unsplash.com/photo-1546456073-6712f79251bb?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment:
      'Layered my 303 pattern with a punchy 606 kick and instantly got that Stakker vibe—raw and futuristic!',
    date: '2d ago',
    dateTime: '2023-01-24T10:14',
  },
  {
    id: 41,
    type: 'commented',
    person: {
      name: 'humanoid_echoes',
      imageUrl:
        'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment:
      'Been experimenting with long reverb tails on my TB-303 output. It adds a massive atmosphere to even the simplest acid lines—totally reminiscent of the ambient washes in the breakdown of Stakker Humanoid.',
    date: '1d ago',
    dateTime: '2023-01-25T09:30',
  },
  {
    id: 42,
    type: 'commented',
    person: {
      name: 'resonanceDriver',
      imageUrl:
        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment:
      'Tried recreating the Humanoid main riff today—slide timing is tricky, but it’s the secret sauce for making the acid line feel alive.',
    date: '20h ago',
    dateTime: '2023-01-25T20:05',
  },
  {
    id: 43,
    type: 'commented',
    person: {
      name: 'Zena',
      imageUrl:
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment:
      'Live recorded a 303 jam while sampling the “Humanoid” vocal—felt like channeling pure rave energy. I might make a whole EP in this style.',
    date: '12h ago',
    dateTime: '2023-01-26T02:42',
  },
];

export function Comments() {
  return (
    <>
      <h2 className="text-sm/6 font-semibold text-gray-900">Comments</h2>
      <ul role="list" className="mt-6 space-y-6">
        {activity.map((activityItem, activityItemIndex) => (
          <li key={activityItem.id} className="relative flex gap-x-4">
            <div
              className={clsx(
                activityItemIndex === activity.length - 1 ? 'h-6' : '-bottom-6',
                'absolute top-0 left-0 flex w-6 justify-center',
              )}
            >
              <div className="w-px bg-gray-200" />
            </div>
            {activityItem.type === 'commented' ? (
              <>
                <Image
                  src={activityItem.person.imageUrl}
                  alt=""
                  width={24}
                  height={24}
                  className="relative mt-3 size-6 flex-none rounded-full bg-gray-50"
                />
                <div className="flex-auto rounded-md p-3 ring-1 ring-gray-200 ring-inset">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5 text-xs/5 text-gray-500">
                      <span className="font-medium text-gray-900">
                        {activityItem.person.name}
                      </span>{' '}
                      commented
                    </div>
                    <time
                      dateTime={activityItem.dateTime}
                      className="flex-none py-0.5 text-xs/5 text-gray-500"
                    >
                      {activityItem.date}
                    </time>
                  </div>
                  <p className="text-sm/6 text-gray-500">
                    {activityItem.comment}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                  {activityItem.type === 'paid' ? (
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="size-6 text-indigo-600"
                    />
                  ) : (
                    <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                  )}
                </div>
                <p className="flex-auto py-0.5 text-xs/5 text-gray-500">
                  <span className="font-medium text-gray-900">
                    {activityItem.person.name}
                  </span>{' '}
                  {activityItem.type} the invoice.
                </p>
                <time
                  dateTime={activityItem.dateTime}
                  className="flex-none py-0.5 text-xs/5 text-gray-500"
                >
                  {activityItem.date}
                </time>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-x-3">
        <Image
          alt=""
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          width={24}
          height={24}
          className="relative mt-3 size-6 flex-none rounded-full bg-gray-50"
        />
        <form action="#" className="relative flex-auto">
          <div className="overflow-hidden rounded-lg pb-12 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={2}
              placeholder="Add your comment..."
              className="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              defaultValue={''}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pr-2 pl-3">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <button
                  type="button"
                  className="-m-2.5 flex size-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                >
                  <PaperClipIcon aria-hidden="true" className="size-5" />
                  <span className="sr-only">Attach a file</span>
                </button>
              </div>
              <div className="flex items-center"></div>
            </div>
            <button
              type="submit"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
