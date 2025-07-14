import type { TB303Pattern } from '@/api/generated/model';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export interface ReadonlyTB303PatternDetailsProps {
  pattern?: TB303Pattern;
}

export function ReadonlyTB303PatternDetails({
  pattern,
}: ReadonlyTB303PatternDetailsProps) {
  const isPublic = pattern?.is_public;

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              {pattern?.name}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="notes">Visibility</Label>
            {isPublic ? (
              <Badge>Public</Badge>
            ) : (
              <Badge variant={'secondary'}>Private</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
