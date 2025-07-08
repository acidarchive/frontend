import Image from 'next/image';

export interface AvatarProps {
  image?: string;
  username: string;
}

export function Avatar({ image, username }: AvatarProps) {
  if (image) {
    return (
      <Image
        className="size-8 rounded-full object-cover"
        src={image}
        alt={username}
        width={48}
        height={48}
      />
    );
  }

  return (
    <div className="size-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-semibold text-sm" />
  );
}
