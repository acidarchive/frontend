import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  username?: string;
  avatarUrl?: string | null;
  className?: string;
}

export function UserAvatar({ username = '', avatarUrl, className }: UserAvatarProps) {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatarUrl ?? ''} alt={username} />
      <AvatarFallback className="rounded-full text-xs font-medium uppercase">
        {username.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
