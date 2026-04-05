'use client';
import BottomNavbar from '@/views/pages/dashboard/components/bottomNavbar';
import SideNavbar from '@/views/pages/dashboard/components/sideNavbar';
import TopNavbar from '@/views/pages/dashboard/components/topNavbar';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen bg-dashboard">
      <aside className="w-20 hidden bg-black/90 text-light md:block">
        <SideNavbar />
      </aside>

      <div className="flex-1">
        <TopNavbar />
        <BottomNavbar />
        {children}
      </div>
    </main>
  );
}
