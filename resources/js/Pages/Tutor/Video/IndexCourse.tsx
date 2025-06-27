import DashboardLayout from '@/Layouts/AdminLayout';
import { Link, useRemember } from '@inertiajs/react';
import { Radio, Upload } from 'lucide-react';
import { ReactNode } from 'react';

interface DashboardProps {
  activeLink: string;
  children: ReactNode;
  isCollapsed?: boolean;
  toggleSidebar?: () => void;
}

const CreateCourse = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useRemember(false, "dashboardSidebarCollapsed");

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <DashboardLayout activeLink='#Course'>
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
        }`}
      >
        <div className="p-8 flex w-full gap-2">
          <h1 className="text-3xl">Your Courses</h1>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default CreateCourse;