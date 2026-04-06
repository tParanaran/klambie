'use client';
import BottomNavbar from '@/views/pages/dashboard/components/bottomNavbar';
import SideNavbar from '@/views/pages/dashboard/components/sideNavbar';
import TopNavbar from '@/views/pages/dashboard/components/topNavbar';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen bg-dashboard overflow-hidden">
      <aside className="w-20 hidden bg-black/90 text-light md:block">
        <SideNavbar />
      </aside>
      <div className="flex flex-col w-full max-w-7xl mx-auto">
        <TopNavbar />
        <BottomNavbar />
        <div className="flex-1 overflow-y-auto scrollbar-hide"> {children}</div>
      </div>
    </main>
  );
}
