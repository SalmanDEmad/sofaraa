import { useState } from 'react';
import { LibraryBig, CircleCheckBig, CalendarDays, Megaphone } from 'lucide-react';
import DashboardLayout from '@/Layouts/DashboardLayout';

interface Course {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: number; // 1=طالب، 2=داعية، 4=مدير
}

const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  const courses: Course[] = [
    {
      id: '1',
      name: 'دورة التجربة',
      description: 'هذه دورة تجريبية لعرض الوظائف.',
      is_active: true,
    },
    {
      id: '2',
      name: 'دورة ثانية',
      description: 'وصف مختصر للدورة الثانية.',
      is_active: false,
    },
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      role: 1,
    },
    {
      id: '2',
      name: 'سارة علي',
      email: 'sara@example.com',
      role: 4,
    },
  ];

  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');

  const addCourse = () => {
    alert(`تم إضافة دورة جديدة: ${newCourseName}`);
  };

  return (
    <DashboardLayout activeLink="#dashboard" isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar}>
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
        } bg-beige-50 min-h-screen`}
      >
        <div className="bg-[#fdf7ee] min-h-screen text-brown-800 py-10 px-4">
          <div className="max-w-6xl mx-auto">

            <h1 className="text-3xl font-bold mb-6 text-right">مرحباً، أحمد</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-[#5e3c26] text-white p-5 rounded-xl shadow text-center space-y-3">
                <LibraryBig className="mx-auto w-12 h-12 text-white" />
                <p className="text-sm">الدورات المسجلة</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <div className="bg-[#d3a661] text-white p-5 rounded-xl shadow text-center space-y-3">
                <CircleCheckBig className="mx-auto w-12 h-12 text-white" />
                <p className="text-sm">الدورات المكتملة</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="bg-[#5e3c26] text-white p-5 rounded-xl shadow text-center space-y-3">
                <CalendarDays className="mx-auto w-12 h-12 text-white" />
                <p className="text-sm">الحصص القادمة</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="bg-[#5e3c26] text-white p-5 rounded-xl shadow text-center space-y-3">
                <Megaphone className="mx-auto w-12 h-12 text-white" />
                <p className="text-sm">نسبة الحضور</p>
                <p className="text-2xl font-bold">95%</p>
              </div>
            </div>

            {/* Courses Section */}
            <h2 className="text-xl font-semibold mb-4 text-right">دوراتي</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {courses.map((course) => (
                <div key={course.id} className="bg-[#f6eddc] p-5 rounded-xl shadow border border-[#e6dcc6]">
                  <h3 className="font-bold text-lg text-[#402a13] text-right">{course.name}</h3>
                  <p className="text-sm text-[#6b4c33] mt-1 mb-4 text-right">{course.description}</p>
                  <div className="text-right">
                    <button className="bg-[#4a3b2a] text-white px-4 py-2 rounded hover:bg-[#3a2e22]">
                      استكمال
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Classes */}
            <h2 className="text-xl font-semibold mb-4 text-right">الحصص القادمة</h2>
            <div className="bg-[#f6eddc] p-4 rounded-xl shadow border border-[#e6dcc6] max-w-sm ml-auto text-right">
              <h3 className="font-bold text-[#402a13]">فقه العبادات</h3>
              <p className="text-sm text-[#6b4c33] mt-1">٢٥ أبريل، الساعة ١٠:٠٠ صباحاً</p>
            </div>

          </div>
        </div>

      </main>
    </DashboardLayout>
  );
};

export default Dashboard;