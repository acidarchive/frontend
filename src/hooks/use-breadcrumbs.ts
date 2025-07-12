'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [{ title: 'Dashboard', link: '/dashboard' }],
  '/dashboard/tb303': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'TB-303', link: '/dashboard/tb303' },
  ],
  '/dashboard/tb303/add': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'TB-303', link: '/dashboard/tb303' },
    { title: 'Add new pattern', link: '/dashboard/tb303/add' },
  ],
  '/dashboard/tr606': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'TR-606', link: '/dashboard/tr606' },
  ],
};

const dynamicRouteHandlers: {
  regex: RegExp;
  handler: (pathname: string, matches: RegExpMatchArray) => BreadcrumbItem[];
}[] = [
  {
    regex: /^\/dashboard\/(tb303|tr606)\/([^/]+)\/edit$/,
    handler: (pathname, matches) => {
      const model = matches[1];
      const modelName = model === 'tb303' ? 'TB-303' : 'TR-606';

      return [
        { title: 'Dashboard', link: '/dashboard' },
        { title: modelName, link: `/dashboard/${model}` },
        { title: 'Edit pattern', link: pathname },
      ];
    },
  },
];

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    for (const dynamicRoute of dynamicRouteHandlers) {
      const matches = pathname.match(dynamicRoute.regex);
      if (matches) {
        return dynamicRoute.handler(pathname, matches);
      }
    }

    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path,
      };
    });
  }, [pathname]);

  return breadcrumbs;
}
