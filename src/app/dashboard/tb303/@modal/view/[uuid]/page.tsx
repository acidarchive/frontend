'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

import { ViewPattern } from '@/features/pattern-tb303-editor';

interface ViewPatternModalProps {
  params: Promise<{ uuid: string }>;
}

export default function ViewPatternModal({ params }: ViewPatternModalProps) {
  const router = useRouter();
  const { uuid } = use(params);

  const handleClose = () => {
    router.back();
  };

  return <ViewPattern patternId={uuid} onClose={handleClose} />;
}
