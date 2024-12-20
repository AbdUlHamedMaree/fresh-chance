import { Sidebar } from '@/components/layout/dashboard/sidebar';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: SidebarNavProps) {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      {/* Main Content */}
      <div className='flex-1 p-8 container'>{children}</div>
    </div>
  );
}
