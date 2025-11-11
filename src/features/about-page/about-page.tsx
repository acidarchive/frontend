import {
  BookOpen,
  Code,
  Coffee,
  Github,
  Heart,
  Mail,
  MessageSquare,
  Palette,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4">
          About the Project
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Preserving Music History, One Pattern at a Time
        </h1>
        <p className="text-xl text-muted-foreground">
          A project dedicated to saving the sequences that shaped electronic
          music
        </p>
      </div>

      {/* The Story Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Why Acid Archive Exists</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-4 text-muted-foreground">
          <p>
            My RE-303 CPU died and took a bunch of good patterns with it. Just
            like that—sequences I&apos;d spent hours refining, vanished.
          </p>
          <p>
            That&apos;s when it hit me: if this happened to me, it&apos;s
            happening to everyone. These machines are nearly 40 years old.
            Batteries die. Memory fails. Patterns get lost—and there&apos;s no
            undo button.
          </p>
          <p>
            But this isn&apos;t just about individual loss—it&apos;s about
            cultural heritage. The TB-303, TR-808, TR-909, and TR-606
            didn&apos;t just make sounds; they shaped entire genres. Acid house,
            techno, electro, hip-hop—all built on the backs of these boxes. The
            patterns people created on them are the building blocks of
            electronic music as we know it.
          </p>
          <p>
            The visual notation system for sharing TB-303 patterns emerged
            organically from bedroom producers in the late &apos;80s and early
            They&apos;d scribble sequences on napkins, share them in magazines,
            post them on early internet forums. It was a grassroots preservation
            effort that deserves a permanent home.
          </p>
          <p>
            Acid Archive exists because we needed a place to preserve these
            patterns before they&apos;re lost forever. A tool that&apos;s free,
            accessible, and built for the community that still keeps these
            machines alive.
          </p>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Mission Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">What We&apos;re Building</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Preservation Tool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A free, accessible way for anyone to backup their patterns using
                the community&apos;s visual notation system. Your sequences,
                preserved forever.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Historical Archive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Documenting iconic patterns that shaped acid house, techno, and
                electronic music culture. Each pattern with its story and
                context.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Community Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A space where pattern knowledge can be shared, discovered, and
                preserved for future generations of electronic music producers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Built in the Margins Section */}
      <section className="mb-16">
        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Built in the Margins</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Acid Archive is built in my free time, between work and life.
              There&apos;s no venture capital, no corporate backing — I just
              care about preserving this music history and have the skills to
              build something about it.
            </p>
            <p>
              This means updates come when they come. Development happens in
              tides. It&apos;s slow, but it&apos;s real, and it&apos;s built
              without compromise.
            </p>
            <div className="pt-4">
              <p className="text-sm font-medium">Current Tech Stack:</p>
              <p className="text-sm">
                Next.js • TypeScript • shadcn/ui • Rust • Actix Web
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Get Involved Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Help Preserve Music History</h2>
        <p className="text-muted-foreground mb-8">
          Whether you code, design, document, or just love these
          machines—there&apos;s a way you can contribute to preserving
          electronic music heritage.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Code Contributors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Can you code? The project needs developers. Whether it&apos;s
                bug fixes, new features, or device support—contributions are
                welcome.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://github.com/acidarchive"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Design & UX
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Have an eye for design? Help make pattern preservation beautiful
                and intuitive. UI, UX, graphics—all needed.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:info@acidarchive.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Historical Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Know the history? Help curate the archive with pattern
                documentation, track info, and cultural context from the acid
                house era.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:info@acidarchive.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contribute Knowledge
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Testing & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Use the tool, break things, tell us what&apos;s missing. Your
                feedback shapes the roadmap and makes this better for everyone.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:info@acidarchive.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Share Feedback
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Roadmap Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">What&apos;s Coming</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Badge variant="default" className="min-w-20 justify-center">
              Live Now
            </Badge>
            <div>
              <p className="font-semibold">TB-303 Support</p>
              <p className="text-sm text-muted-foreground">
                Archive your TB-303 patterns
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Badge variant="secondary" className="min-w-20 justify-center">
              Soon
            </Badge>
            <div>
              <p className="font-semibold">
                TR-606, TR-808, and TR-909 Support
              </p>
              <p className="text-sm text-muted-foreground">
                Expanding to iconic drum machines
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Badge variant="secondary" className="min-w-20 justify-center">
              Soon
            </Badge>
            <div>
              <p className="font-semibold">User Pages</p>
              <p className="text-sm text-muted-foreground">
                Share your patterns with the community
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Badge variant="outline" className="min-w-20 justify-center">
              Future
            </Badge>
            <div>
              <p className="font-semibold">Pattern Search</p>
              <p className="text-sm text-muted-foreground">
                Explore all public patterns
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Badge variant="outline" className="min-w-20 justify-center">
              Future
            </Badge>
            <div>
              <p className="font-semibold">Community Features</p>
              <p className="text-sm text-muted-foreground">
                Pattern sharing, comments, and more
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="text-center pt-8 border-t">
        <p className="text-muted-foreground mb-4">
          Questions, ideas, or just want to say hi?
        </p>
        <Button variant="outline" asChild>
          <a href="mailto:info@acidarchive.com">
            <Mail className="mr-2 h-4 w-4" />
            Get in Touch
          </a>
        </Button>
      </div>
    </div>
  );
}
