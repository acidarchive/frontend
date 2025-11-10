import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero */}
      <section className="flex flex-col gap-16 px-8 py-12 text-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="inline-block px-3 py-1 border border-border bg-secondary/20 text-xs font-mono mb-8">
            Digital Music Heritage Project
          </div>
          <h1 className="mb-0 text-balance font-medium text-5xl md:text-7xl">
            Preserving Visual Notation Systems for Classic Step Sequencers
          </h1>
          <p className="mt-0 mb-0 text-balance text-lg text-muted-foreground">
            A digital archive dedicated to the step-sequence patterns of iconic
            drum machines and synthesizers from the early 1980s
          </p>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/auth/signup">Create Free Account</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/random">View Random Pattern</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* How Preservation Works */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Preservation Works</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Two ways to participate in saving electronic music history
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 border">
            <h3 className="text-2xl font-bold mb-4">Save Your Own Patterns</h3>
            <p className="text-muted-foreground mb-6">
              Document your sequences using the community&apos;s visual notation
              system. Protect your creative work from hardware failure and
              memory loss.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">
                  Create permanent backups
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">
                  Share your sequences with the global community
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">
                  Contribute to a living archive for future generations
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="bg-muted/50 rounded-lg p-8 border relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Discover Iconic Sequences</h3>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
            <p className="text-muted-foreground mb-6">
              Access recreations of legendary acid basslines and drum patterns
              that shaped electronic music history.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-muted-foreground/50 font-bold">•</span>
                <span className="text-muted-foreground">
                  Explore patterns from classic acid house and techno tracks
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-muted-foreground/50 font-bold">•</span>
                <span className="text-muted-foreground">
                  Learn the sequences that defined entire genres
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-muted-foreground/50 font-bold">•</span>
                <span className="text-muted-foreground">
                  View cultural context, track info, and artist stories
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Supported devices */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Supported Devices
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>TB-303</div>
                <Badge className="w-fit">Available Now</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Bass Line synthesizer (1981-1984). The sound of acid house.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>TR-606</div>
                <Badge variant="secondary" className="w-fit">
                  Coming Soon
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Drumatix (1981-1984). <br />
                TB-303&apos;s rhythm companion.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>TR-808</div>
                <Badge variant="secondary" className="w-fit">
                  Coming Soon
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Rhythm Composer (1980-1983). <br />
                The legendary booming kick that defined hip-hop.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>TR-909</div>
                <Badge variant="secondary" className="w-fit">
                  Coming Soon
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Rhythm Composer (1983-1984). <br />
                The heartbeat of techno.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Why This Matters */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          More Than Just Backup
        </h2>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-muted-foreground">
          <p>
            These machines changed music forever, but their memory is fragile.
            Hardware failure, time, and accidents mean creative work can vanish
            instantly.
          </p>
          <p>
            The visual notation system emerged organically from bedroom
            producers sharing sequences on forums and in magazines. It&apos;s a
            grassroots preservation effort that deserves a permanent home.
          </p>
          <p>
            By archiving these patterns, we&apos;re documenting an entire
            musical language—one that shaped acid house, techno, electro, and
            countless other genres.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join the Preservation Effort
          </h2>
          <p className="text-muted-foreground mb-6">
            Whether you&apos;re backing up your studio work or transcribing
            historical patterns, every contribution strengthens this archive.
            Help ensure that this knowledge remains accessible for future
            generations of musicians, researchers, and enthusiasts.
          </p>
          <Button asChild size="lg">
            <Link href="/auth/signup">Create Free Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
