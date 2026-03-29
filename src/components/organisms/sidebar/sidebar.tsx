'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from '@/components/atoms/icons';
import { Smiley } from '@/components/atoms/smiley';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavItem } from '@/types';

export const archiveNavItems: NavItem[] = [
  {
    title: 'TB-303',
    url: '/dashboard/tb303',
    icon: 'KeyboardMusicSharp',
  },
];

export const otherNavItems: NavItem[] = [
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: 'SettingsCog',
    items: [
      {
        title: 'Avatar',
        url: '/dashboard/settings/avatar',
        icon: 'UserSharp',
      },
      {
        title: 'Password',
        url: '/dashboard/settings/password',
        icon: 'LockSharp',
      },
    ],
  },
];

interface NavMenuItemProps {
  item: NavItem;
  pathname: string;
}

function NavMenuItem({ item, pathname }: NavMenuItemProps) {
  const Icon = Icons[item.icon];

  if (item.items && item.items.length > 0) {
    return (
      <Collapsible
        asChild
        defaultOpen={pathname.startsWith(item.url)}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title}>
              {Icon && <Icon className="size-5!" />}
              <span className="text-base">{item.title}</span>
              <Icons.ChevronRight className="ml-auto size-5! transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map(subItem => {
                const SubIcon = subItem.icon ? Icons[subItem.icon] : null;
                return (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={pathname === subItem.url}
                    >
                      <Link href={subItem.url}>
                        {SubIcon && <SubIcon className="size-5!" />}
                        <span className="text-base">{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        isActive={pathname === item.url}
      >
        <Link href={item.url}>
          {Icon && <Icon className="size-5!" />}
          <span className="text-base">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <UISidebar collapsible="icon">
      <SidebarHeader>
        <Link
          href="/"
          aria-label="Go to homepage"
          className="flex items-center gap-2"
        >
          <Smiley />
          {open && <h1 className="text-[1.5rem] font-bold">Acid Archive</h1>}
        </Link>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Archive</SidebarGroupLabel>
          <SidebarMenu>
            {archiveNavItems.map(item => (
              <NavMenuItem key={item.title} item={item} pathname={pathname} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarMenu>
            {otherNavItems.map(item => (
              <NavMenuItem key={item.title} item={item} pathname={pathname} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </UISidebar>
  );
}
