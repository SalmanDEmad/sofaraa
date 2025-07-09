import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useRemember } from '@inertiajs/react';
import {
  Upload, PenLine, Users, BookOpenCheck, FileQuestion, Layers,
  LifeBuoy, BarChart2, Megaphone, UserCheck, ClipboardList, Settings, Edit
} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useRemember(false, "dashboardSidebarCollapsed");

  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  return (
    <AdminLayout activeLink="#dashboard">
      <main className="flex-1 bg-[#f0f4f8] min-h-screen py-10 px-4 text-navy-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-right">لوحة التحكم</h1>

          {/* Stat/Management Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <Link
              href="#"
              className="bg-white border border-[#c2d4e4] p-5 rounded-xl shadow text-center space-y-3 hover:bg-[#eaf1f8] transition"
            >
              <BookOpenCheck className="mx-auto w-12 h-12 text-[#335c81]" />
              <p className="text-sm">إدارة الدورات</p>
              <p className="text-md font-bold">عرض وتحرير الدورات</p>
            </Link>

            <Link
              href="#"
              className="bg-white border border-[#c2d4e4] p-5 rounded-xl shadow text-center space-y-3 hover:bg-[#eaf1f8] transition"
            >
              <Layers className="mx-auto w-12 h-12 text-[#335c81]" />
              <p className="text-sm">إدارة الفئات</p>
              <p className="text-md font-bold">تصنيف الدورات</p>
            </Link>

            <Link
              href="#"
              className="bg-white border border-[#c2d4e4] p-5 rounded-xl shadow text-center space-y-3 hover:bg-[#eaf1f8] transition"
            >
              <Upload className="mx-auto w-12 h-12 text-[#335c81]" />
              <p className="text-sm">رفع فيديو</p>
              <p className="text-md font-bold">أضف دروساً مسجلة</p>
            </Link>

            <Link
              href="#"
              className="bg-white border border-[#c2d4e4] p-5 rounded-xl shadow text-center space-y-3 hover:bg-[#eaf1f8] transition"
            >
              <Users className="mx-auto w-12 h-12 text-[#335c81]" />
              <p className="text-sm">إدارة الطلاب</p>
              <p className="text-md font-bold">عرض وتحرير الطلاب</p>
            </Link>

            <Link
              href="#"
              className="bg-white border border-[#c2d4e4] p-5 rounded-xl shadow text-center space-y-3 hover:bg-[#eaf1f8] transition"
            >
              <FileQuestion className="mx-auto w-12 h-12 text-[#335c81]" />
              <p className="text-sm">الاختبارات والواجبات</p>
              <p className="text-md font-bold">إنشاء وتقييم</p>
            </Link>

            <Link
              href="#"
              className="bg-white border border-[#c2d4e4] p-5 rounded-xl shadow text-center space-y-3 hover:bg-[#eaf1f8] transition"
            >
              <UserCheck className="mx-auto w-12 h-12 text-[#335c81]" />
              <p className="text-sm">إدارة الحضور</p>
              <p className="text-md font-bold">تتبع حضور الطلاب</p>
            </Link>

            <Link
              href="#"
              className="bg-white border border-[#c2d4e4] p-5 rounded-xl shadow text-center space-y-3 hover:bg-[#eaf1f8] transition"
            >
              <BarChart2 className="mx-auto w-12 h-12 text-[#335c81]" />
              <p className="text-sm">التقارير</p>
              <p className="text-md font-bold">تحليلات النظام</p>
            </Link>

            <Link
              href="#"
              className="bg-white border border-[#c2d4e4] p-5 rounded-xl shadow text-center space-y-3 hover:bg-[#eaf1f8] transition"
            >
              <Megaphone className="mx-auto w-12 h-12 text-[#335c81]" />
              <p className="text-sm">الإعلانات / المدونة</p>
              <p className="text-md font-bold">مشاركة التحديثات</p>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#eaf1f8] border border-[#d4e4ef] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <div className="font-bold text-md text-[#335c81] mb-1">إجراء سريع:</div>
                <div className="text-sm text-[#27405a]">أنشئ اختباراً جديداً أو أضف فيديو بسرعة</div>
              </div>
              <div className="flex gap-2">
                <Link
                  href="#"
                  className="bg-[#335c81] hover:bg-[#3a6ea5] text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
                >
                  <Edit size={18} /> اختبار جديد
                </Link>
                <Link
                  href="#"
                  className="bg-[#d3a661] hover:bg-[#bfa348] text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
                >
                  <Upload size={18} /> فيديو جديد
                </Link>
              </div>
            </div>
            <div className="bg-[#eaf1f8] border border-[#d4e4ef] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-right">
                <div className="font-bold text-md text-[#335c81] mb-1">الدعم الفني</div>
                <div className="text-sm text-[#27405a]">تواصل مع الدعم لأي استفسار أو مشكلة</div>
              </div>
              <Link
                href="#"
                className="bg-[#335c81] hover:bg-[#3a6ea5] text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
              >
                <LifeBuoy size={18} /> الدعم
              </Link>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white border border-[#c2d4e4] shadow p-6 rounded-xl text-right">
            <div className="flex items-center justify-end mb-4">
              <h2 className="text-xl font-semibold ml-2">النشاطات الأخيرة</h2>
              <ClipboardList className="text-[#335c81]" />
            </div>
            <ul className="list-disc pr-5 text-sm space-y-1 text-[#3d4d5c]">
              <li>تم إضافة دورة جديدة "فقه الطهارة".</li>
              <li>الطالب ياسين أرسل طلب تسجيل جديد.</li>
              <li>تم تحديث درجات اختبار "العقيدة ٢٠٢".</li>
              <li>تم نشر إعلان للطلاب حول موعد الاختبار النهائي.</li>
              <li>الطالبة سارة أكملت ٤ فيديوهات من "تاريخ الصحابة".</li>
              <li>تم إضافة فئة "المستوى المتقدم" إلى النظام.</li>
            </ul>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
};

export default Dashboard;