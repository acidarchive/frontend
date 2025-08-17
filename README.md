# Acid Archive Frontend

A digital archive for documenting and preserving TB-303 pattern charts using
visual pattern notation. Think of it as a backup and sharing platform for
pattern documentation.

## Features

- Document TB-303 patterns using visual grid notation
- Archive and organize your pattern charts
- Browse and search the pattern library
- Share patterns with other users
- Export patterns for MIDI playback
- Random pattern discovery

## Tech Stack

- Next.js 15 with React 19
- TypeScript
- Tailwind CSS
- AWS Cognito authentication
- Web MIDI API integration

## Development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

## Scripts

- `pnpm dev` - Development server
- `pnpm build` - Production build
- `pnpm test` - Run tests
- `pnpm lint` - Lint code
- `pnpm storybook` - Component development

## MIDI

Export documented patterns to TB-303 or compatible hardware via USB/MIDI. Enable
browser MIDI permissions when prompted.
