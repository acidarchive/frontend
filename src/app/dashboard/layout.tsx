import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/organisms/app-sidebar';
import { DashboardHeader } from '@/components/organisms/dashboard-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Acid Archive Dashboard',
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
