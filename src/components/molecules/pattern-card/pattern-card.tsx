import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/date';
import { PublicTB303PatternItem } from '@/types/api';
interface PatternCardProps {
  pattern: PublicTB303PatternItem;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => {
  const date = new Date(pattern.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/patterns/${pattern.pattern_id}`} className="block">
      <Card className="hover:border-primary transition-colors cursor-pointer h-full">
        <CardContent className="flex flex-col justify-between gap-8 min-h-40">
          <div>
            <h3 className="font-semibold text-lg leading-tight text-balance">
              {pattern.name}
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              {formatRelativeTime(date)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarImage
                src={pattern.avatar_url || undefined}
                alt={pattern.username}
              />
              <AvatarFallback className="text-xs" />
            </Avatar>
            <span className="text-sm font-medium">{pattern.username}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
