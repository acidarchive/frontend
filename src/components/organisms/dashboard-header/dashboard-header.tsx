import { ModeToggle } from '@/components/atoms/mode-toggle/mode-toggle';
import { Breadcrumbs } from '@/components/molecules/breadcrumbs';
import { UserNavigation } from '@/components/molecules/user-navigation';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2 px-4">
        <div className="hidden md:flex"></div>
        <ModeToggle />
        <UserNavigation />
      </div>
    </header>
  );
}
