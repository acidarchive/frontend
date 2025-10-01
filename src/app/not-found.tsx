'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';

import { FuzzyText, FuzzyTextProps } from '@/components/atoms/fuzzy-text';

export default function NotFoundPage() {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? 'oklch(0.985 0 0)' : 'oklch(0.145 0 0)';
  const textProps: Omit<FuzzyTextProps, 'children'> = {
    fontWeight: 900,
    enableHover: true,
    baseIntensity: 0.18,
    hoverIntensity: 0.5,
    color: textColor,
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4 sm:p-8 bg-background">
      <div className="relative w-full flex items-center justify-center px-4 sm:px-12">
        <div className="flex flex-col items-center gap-8">
          <FuzzyText fontSize="clamp(5rem, 12vw, 8.5rem)" {...textProps}>
            404
          </FuzzyText>
          <FuzzyText fontSize="clamp(2.5rem, 6vw, 4.5rem)" {...textProps}>
            Not Found
          </FuzzyText>
          <Link href="/">
            {' '}
            <FuzzyText fontSize="clamp(1.5rem, 3vw, 2.5rem)" {...textProps}>
              &lt; Back
            </FuzzyText>
          </Link>
        </div>
      </div>
    </div>
  );
}
