'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/context/user-context';

export default function AvatarPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="flex-none">
        <h3 className="text-lg font-medium">Avatar</h3>
        <p className="text-muted-foreground text-sm">
          Update your profile picture.
        </p>
      </div>
      <Separator className="my-6 flex-none" />
      <div className="flex-1 overflow-y-auto pb-4 lg:max-w-xl">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage
                src={user?.image}
                alt={user?.name ?? user?.username}
              />
              <AvatarFallback className="text-lg">
              {user?.username?.slice(0, 2).toUpperCase() ?? 'AA'}
            </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">
                {user?.name ?? user?.username}
              </p>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Upload new picture
            </Button>
            <Button variant="ghost" disabled>
              Remove
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            Avatar upload coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
