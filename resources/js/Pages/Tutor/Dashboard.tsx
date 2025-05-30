import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link, useRemember } from '@inertiajs/react';
import { Radio, Upload, PenLine, Users, Activity } from 'lucide-react';

const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useRemember(false, "dashboardSidebarCollapsed");

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <DashboardLayout activeLink="#dashboard" isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar}>
      <main className="flex-1 p-6 md:p-10 bg-[#fdf7ee] text-[#402a13] transition-all duration-300">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <Link
            href={route('livestream.create')}
            className="bg-white border border-[#e6dcc6] shadow-sm rounded-xl p-6 flex flex-col items-center justify-center hover:bg-[#fff8ee] transition"
          >
            <Radio className="text-[#a67c52]" size={40} />
            <h3 className="text-lg font-semibold mt-4">Start Livestream</h3>
            <p className="text-sm text-center mt-1">Go live and engage with your students in real-time.</p>
          </Link>

          <Link
            href={route('video.create')}
            className="bg-white border border-[#e6dcc6] shadow-sm rounded-xl p-6 flex flex-col items-center justify-center hover:bg-[#fff8ee] transition"
          >
            <Upload className="text-[#a67c52]" size={40} />
            <h3 className="text-lg font-semibold mt-4">Upload Video</h3>
            <p className="text-sm text-center mt-1">Add pre-recorded lessons for students to view anytime.</p>
          </Link>

          <div className="bg-white border border-[#e6dcc6] shadow-sm rounded-xl p-6 flex flex-col items-center justify-center">
            <Users className="text-[#a67c52]" size={40} />
            <h3 className="text-lg font-semibold mt-4">My Students</h3>
            <p className="text-sm text-center mt-1">View and manage enrolled students.</p>
          </div>

          <Link
            href={route('blog.create')} // <- Change this to your actual blog creation route
            className="bg-white border border-[#e6dcc6] shadow-sm rounded-xl p-6 flex flex-col items-center justify-center hover:bg-[#fff8ee] transition"
          >
            <PenLine className="text-[#a67c52]" size={40} />
            <h3 className="text-lg font-semibold mt-4">Post a Blog</h3>
            <p className="text-sm text-center mt-1">Create and share the latest news and updates.</p>
          </Link>
        </div>

        {/* Activity Feed Placeholder */}
        <div className="bg-white border border-[#e6dcc6] shadow-sm rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Activity className="text-[#a67c52] mr-2" />
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Student Ahmed submitted quiz for "Fiqh Basics"</li>
            <li>You uploaded new video to "Seerah 101"</li>
            <li>Livestream started for "Ramadan Workshop" at 4:00 PM</li>
          </ul>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
