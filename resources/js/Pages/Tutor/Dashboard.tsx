import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link, useRemember } from '@inertiajs/react';
import { Radio, Upload } from 'lucide-react';

const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useRemember(false, "dashboardSidebarCollapsed");

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <DashboardLayout activeLink='#dashboard' isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar}>
      <main
        className={`flex-1 p-8 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
        }`}
      >
        <h1 className="text-3xl">Dashboard</h1>
        <div className="p-8 flex w-full gap-4 justify-center">
          <Link className="cursor-pointer ms-5 bg-red-600 w-full flex items-center justify-center hover:bg-red-500" href={route("livestream.create")}>

            <Radio className=" text-4xl text-white" width={40} height={40} />
            <h1 className="cursor-pointer p-12 text-4xl text-white text-center">Start Livestream</h1>

          </Link>
          <Link className="cursor-pointer ms-5 bg-red-600 w-full flex items-center justify-center hover:bg-red-500" href={route("video.create")}>
            <div className="cursor-pointer bg-red-600 w-full flex items-center justify-center hover:bg-red-500">
              <Upload className="text-4xl text-white" width={40} height={40} />
              <h1 className="cursor-pointer p-12 text-4xl text-white text-center">Upload Video</h1>
            </div>
          </Link>
        </div>

        <div>
          <h1>Your Videos/Livestreams</h1>
        </div>

        <div>
          <h1>Your Students</h1>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
