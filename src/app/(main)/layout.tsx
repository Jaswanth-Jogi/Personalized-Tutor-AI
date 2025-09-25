import type { PropsWithChildren } from 'react';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarInset } from '@/components/ui/sidebar';
import { getSubjects } from '@/lib/actions';
import { Home, Book } from 'lucide-react';
import { Logo } from '@/app/components/layout/logo';
import { Header } from '@/app/components/layout/header';

export default async function MainLayout({ children }: PropsWithChildren) {
  const subjects = await getSubjects();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <Logo />
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/" tooltip="Dashboard">
                <Home />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            {subjects.map((subject) => (
              <SidebarMenuItem key={subject.id}>
                <SidebarMenuButton href={`/subjects/${encodeURIComponent(subject.name)}`} tooltip={subject.name}>
                  <Book />
                  {subject.name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:py-12">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
