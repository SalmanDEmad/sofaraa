import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link, useRemember } from '@inertiajs/react';
import { Radio, Upload } from 'lucide-react';

const CreateLivestream = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useRemember(false, "dashboardSidebarCollapsed");

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <DashboardLayout activeLink='#livestream' isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar}>
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
        }`}
      >
        <div className="p-8 flex w-full gap-2">
          <h1 className="text-3xl">Create Livestream</h1>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default CreateLivestream;
