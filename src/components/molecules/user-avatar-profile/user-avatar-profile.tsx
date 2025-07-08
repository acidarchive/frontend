import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  user?: AuthUser;
}

export type AuthUser = {
  username: string;
  email?: string;
  name?: string;
  image?: string;
  isAdmin: boolean;
};

export function UserAvatarProfile({
  className,
  showInfo = false,
  user,
}: UserAvatarProfileProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className={className}>
        <AvatarImage src={user?.image || ''} alt={user?.username || ''} />
        <AvatarFallback className="rounded-lg">
          {user?.username?.slice(0, 2)?.toUpperCase() || 'AA'}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{user?.username || ''}</span>
          <span className="truncate text-xs"></span>
        </div>
      )}
    </div>
  );
}
