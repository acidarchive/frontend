import { Icons } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const CAMBRIDGE_PAPER_URL =
  'https://www.cambridge.org/core/journals/organised-sound/article/acid-patterns-how-people-are-sharing-a-visual-notation-system-for-the-roland-tb303-to-create-and-recreate-acid-house-music/1FE37195243684AD6B6912FAE99E99E0';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Why This Exists</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-muted-foreground">
          <p>
            TB-303, TR-606, TR-808, TR-909 changed music forever. Acid house,
            techno, electro, hip-hop, all built on patterns created on these
            boxes.
          </p>
          <p>
            But they&apos;re nearly 40 years old. Batteries die. Memory fails.
            Patterns vanish.
          </p>
          <p>
            I learned this the hard way. My RE-303 CPU died and took a bunch of
            good patterns with it. If it happened to me, it&apos;s happening to
            everyone still using these machines.
          </p>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">What This Is</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-muted-foreground">
          <p>
            A place to back up your patterns privately, and share them publicly
            for others to explore.
          </p>
          <p>
            The visual notation system behind this has been documented
            academically -&nbsp;
            <a
              className="underline"
              href={CAMBRIDGE_PAPER_URL}
              target="_blank"
              rel="noopener noreferrer external"
            >
              a Cambridge paper on acid patterns
            </a>
            &nbsp; if you&apos;re curious.
          </p>
        </div>
      </section>

      <Separator className="my-12" />

      <div className="text-center pt-8">
        <p className="text-muted-foreground mb-4">
          Questions, ideas, or just want to say hi?
        </p>
        <Button variant="outline" asChild>
          <a href="mailto:info@acidarchive.com">
            <Icons.MailSharp className="size-6" />
            Get in Touch
          </a>
        </Button>
      </div>
    </div>
  );
}
