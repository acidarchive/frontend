'use client';

import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';

import { Loader } from '@/components/atoms/loader';
import { PatternTB303Viewer } from '@/components/organisms/pattern-tb303-viewer';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { fetchPatternTB303 } from '@/dal';
const PatternPreviewContext = createContext<(id: string) => void>(() => {});

export function usePatternPreview() {
  return useContext(PatternPreviewContext);
}

interface PatternTB303PreviewProps {
  patternId: string;
  open: boolean;
  onClose: () => void;
}
function PatternTB303Preview({
  patternId,
  open,
  onClose,
}: PatternTB303PreviewProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['/v1/patterns/tb303', patternId],
    queryFn: () => fetchPatternTB303(patternId),
    enabled: !!patternId,
  });

  return (
    <Sheet open={open} onOpenChange={open => !open && onClose()}>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        className="w-200 sm:max-w-200 pt-4"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <Loader />
        ) : (
          data && (
            <div className="w-fit mx-auto">
              <PatternTB303Viewer data={data} />
            </div>
          )
        )}
      </SheetContent>
    </Sheet>
  );
}

interface PatternPreviewProviderProps {
  children: React.ReactNode;
}
export function PatternPreviewProvider({
  children,
}: PatternPreviewProviderProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <PatternPreviewContext.Provider value={setSelectedId}>
      {children}
      <PatternTB303Preview
        patternId={selectedId ?? ''}
        open={selectedId !== null}
        onClose={() => setSelectedId(null)}
      />
    </PatternPreviewContext.Provider>
  );
}
