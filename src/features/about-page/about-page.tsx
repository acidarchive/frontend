import Link from 'next/link';

import { Icons } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const CAMBRIDGE_PAPER_URL =
  'https://www.cambridge.org/core/journals/organised-sound/article/acid-patterns-how-people-are-sharing-a-visual-notation-system-for-the-roland-tb303-to-create-and-recreate-acid-house-music/1FE37195243684AD6B6912FAE99E99E0';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">What This Is</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-muted-foreground">
          <p>
            A home for your patterns. Back them up privately, share them with
            the world, and dig through what others have programmed into their
            machines.
          </p>
          <p>
            Right now it&apos;s all about the TB-303 and the acid pattern sheet.
            For years the community has been sharing these patterns - scattered
            across forums, blog posts, youtube videos etc. Brilliant stuff, but
            fragmented, and a fair bit of it has already vanished. This is an
            attempt to pull it all into one place. There&apos;s even{' '}
            <a
              className="underline"
              href={CAMBRIDGE_PAPER_URL}
              target="_blank"
              rel="noopener noreferrer external"
            >
              a Cambridge paper on how the community uses it
            </a>{' '}
            if you&apos;re curious.
          </p>
        </div>
      </section>

      <Separator className="my-12" />
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Why This Exists</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-muted-foreground">
          <p>
            TB-303, TR-606, TR-808, TR-909. These boxes changed music forever.
            Acid house, techno, electro, hip-hop - all built on patterns banged
            out on these machines.
          </p>
          <p>
            But they&apos;re getting old. The 303 only holds 64 patterns in
            memory. No export, no backup, no cloud. When the battery dies or the
            CPU gives up, those patterns are gone. It happens more than
            you&apos;d think.
          </p>
          <p>
            I learned this the hard way when my RE-303&apos;s CPU died and took
            a pile of good patterns with it. If it happened to me, it&apos;s
            happening to everyone still running these machines. So here we are -
            somewhere to keep them safe, and somewhere to share the ones worth
            sharing.
          </p>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Help To Get Us Going</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-muted-foreground mb-6">
          <p>
            If you&apos;re getting something out of this and fancy chucking a
            few quid in the tip jar, it&apos;s hugely appreciated and keeps new
            features coming.
          </p>
          <p>
            If you do decide to donate,{' '}
            <strong className="text-foreground">
              drop your username in the Ko-fi message
            </strong>
            . I&apos;m planning to put together a supporters list down the line,
            and I&apos;d love to include you on it.
          </p>
        </div>
        <Button asChild>
          <Link href="https://ko-fi.com/303808909">
            Buy me a coffee
            <Icons.Coffee />
          </Link>
        </Button>
      </section>

      <Separator className="my-12" />

      <div className="text-center pt-8 space-y-2">
        <p className="text-muted-foreground">
          Found a bug? Got a feature idea? Want to help out with code, design or
          anything else? Just want to say hi?
        </p>
        <a
          href="mailto:info@acidarchive.com"
          className="underline inline-block mt-2"
        >
          info@acidarchive.com
        </a>
      </div>
    </div>
  );
}
