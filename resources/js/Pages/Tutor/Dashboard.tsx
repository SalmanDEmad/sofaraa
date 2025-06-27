import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useRemember } from '@inertiajs/react';
import { Radio, Upload, PenLine, Users, Activity } from 'lucide-react';

const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useRemember(false, "dashboardSidebarCollapsed");

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <AdminLayout
      activeLink="#dashboard"
    >
      <main className="flex-1 p-6 md:p-10 bg-[#fdf7ee] text-[#402a13] transition-all duration-300">
        <h1 className="text-3xl font-bold mb-6 text-right">لوحة التحكم</h1>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <Link
            href={route('livestream.create')}
            className="bg-white border border-[#e6dcc6] shadow-sm rounded-xl p-6 flex flex-col items-center justify-center hover:bg-[#fff8ee] transition"
          >
            <Radio className="text-[#a67c52]" size={40} />
            <h3 className="text-lg font-semibold mt-4">بدء بث مباشر</h3>
            <p className="text-sm text-center mt-1">تواصل مباشرة مع طلابك في الوقت الحقيقي.</p>
          </Link>

          <Link
            href={route('video.create')}
            className="bg-white border border-[#e6dcc6] shadow-sm rounded-xl p-6 flex flex-col items-center justify-center hover:bg-[#fff8ee] transition"
          >
            <Upload className="text-[#a67c52]" size={40} />
            <h3 className="text-lg font-semibold mt-4">رفع فيديو</h3>
            <p className="text-sm text-center mt-1">أضف دروسًا مسجلة ليستفيد منها الطلاب في أي وقت.</p>
          </Link>

          <div className="bg-white border border-[#e6dcc6] shadow-sm rounded-xl p-6 flex flex-col items-center justify-center">
            <Users className="text-[#a67c52]" size={40} />
            <h3 className="text-lg font-semibold mt-4">طلابي</h3>
            <p className="text-sm text-center mt-1">إدارة الطلاب المسجلين في الدورات.</p>
          </div>

          <Link
            href={route('blog.create')}
            className="bg-white border border-[#e6dcc6] shadow-sm rounded-xl p-6 flex flex-col items-center justify-center hover:bg-[#fff8ee] transition"
          >
            <PenLine className="text-[#a67c52]" size={40} />
            <h3 className="text-lg font-semibold mt-4">نشر تدوينة</h3>
            <p className="text-sm text-center mt-1">شارك آخر الأخبار والتحديثات بسهولة.</p>
          </Link>
        </div>

        {/* Activity Feed */}
        <div className="bg-white border border-[#e6dcc6] shadow-sm rounded-xl p-6 text-right">
          <div className="flex items-center mb-4 justify-end">
            <h2 className="text-xl font-semibold ml-2">النشاطات الأخيرة</h2>
            <Activity className="text-[#a67c52]" />
          </div>
          <ul className="list-disc pr-5 text-sm space-y-1 text-[#4b2e24]">
            <li>الطالب أحمد قدم اختبار "فقه العبادات"</li>
            <li>قمت برفع فيديو جديد لدورة "السيرة ١٠١"</li>
            <li>تم بدء بث مباشر لدورة "ورشة رمضان" الساعة ٤:٠٠ مساءً</li>
          </ul>
        </div>
      </main>
    </AdminLayout>
  );
};

export default Dashboard;