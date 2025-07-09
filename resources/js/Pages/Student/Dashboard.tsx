import { useState } from 'react';
import {
  LibraryBig, CircleCheckBig, CalendarDays, Megaphone, PlusCircle, FileText, UserCog2, Star
} from 'lucide-react';
import StudentLayout from '@/Layouts/StudentLayout';

interface Course {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  is_new?: boolean;
}

interface Assignment {
  id: string;
  title: string;
  due: string;
  is_late?: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: number;
}

interface Props {
  user: User;
}

const Dashboard = ({ user }: Props) => {
  const courses: Course[] = [
    {
      id: '1',
      name: 'دورة التجربة',
      description: 'هذه دورة تجريبية لعرض الوظائف.',
      is_active: true,
      is_new: true,
    },
    {
      id: '2',
      name: 'دورة ثانية',
      description: 'وصف مختصر للدورة الثانية.',
      is_active: false,
    },
  ];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'واجب الأسبوع الأول',
      due: '٢٥ أبريل ٢٠٢٥',
      is_late: true,
    },
  ];

  const nextClass = {
    title: 'فقه العبادات',
    date: '٢٥ أبريل، الساعة ١٠:٠٠ صباحاً',
  };

  // Simulated profile completion %
  const profileProgress = 80;

  return (
    <StudentLayout activeLink="#dashboard">
      <main className="flex-1 bg-[#f7f8fa] min-h-screen px-2 md:px-0">
        <div className="max-w-6xl mx-auto py-8">

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-8 justify-end">
            <button className="flex items-center gap-2 bg-[#e6f2ed] text-[#20836f] px-4 py-2 rounded-lg shadow hover:bg-[#cde9de] transition font-semibold">
              <PlusCircle className="w-5 h-5" /> انضم إلى دورة
            </button>
            <button className="flex items-center gap-2 bg-[#e6f2ed] text-[#20836f] px-4 py-2 rounded-lg shadow hover:bg-[#cde9de] transition font-semibold">
              <FileText className="w-5 h-5" /> تحميل شهادة
            </button>
            <button className="flex items-center gap-2 bg-[#e6f2ed] text-[#20836f] px-4 py-2 rounded-lg shadow hover:bg-[#cde9de] transition font-semibold">
              <UserCog2 className="w-5 h-5" /> دعم فني
            </button>
            {assignments.length > 0 && (
              <button className="flex items-center gap-2 bg-[#f8e6e6] text-[#e76262] px-4 py-2 rounded-lg shadow hover:bg-[#f6caca] transition font-semibold">
                <FileText className="w-5 h-5" /> واجبات متأخرة
              </button>
            )}
          </div>

          {/* Reminder */}
          {profileProgress < 100 && (
            <div className="bg-[#fdf8e3] border-l-4 border-[#20836f] text-[#6e6532] p-4 mb-6 rounded-lg flex items-center gap-2">
              <Star className="w-6 h-6 text-[#f6c700]" />
              <span>يرجى إكمال ملفك الشخصي للحصول على تجربة أفضل ({profileProgress}%)</span>
            </div>
          )}

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: <LibraryBig className="w-9 h-9 text-[#20836f] mb-2" />,
                label: 'الدورات المسجلة',
                value: courses.length,
              },
              {
                icon: <CircleCheckBig className="w-9 h-9 text-[#20836f] mb-2" />,
                label: 'الدورات المكتملة',
                value: 2,
              },
              {
                icon: <CalendarDays className="w-9 h-9 text-[#20836f] mb-2" />,
                label: 'الحصص القادمة',
                value: 3,
              },
              {
                icon: <Megaphone className="w-9 h-9 text-[#20836f] mb-2" />,
                label: 'نسبة الحضور',
                value: '95%',
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e0e0e0] p-4 rounded-xl shadow flex flex-col items-center transition hover:-translate-y-1 hover:shadow-lg duration-200"
              >
                {card.icon}
                <p className="text-xs text-[#224957] font-medium">{card.label}</p>
                <p className="text-2xl font-bold text-[#224957] mt-1">{card.value}</p>
              </div>
            ))}
          </div>

          {/* دوراتي */}
          <div className="flex flex-row-reverse items-center gap-2 mb-4">
            <span className="block w-2 h-5 rounded-lg bg-[#20836f]"></span>
            <h2 className="text-xl font-bold text-[#224957]">دوراتي</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-6 rounded-xl shadow border border-[#e0e0e0] flex flex-col items-end hover:shadow-lg hover:border-[#20836f] transition"
              >
                <div className="flex flex-row-reverse items-center gap-2 mb-2 w-full justify-between">
                  <h3 className="font-bold text-lg text-[#224957]">{course.name}</h3>
                  {course.is_new && (
                    <span className="inline-block bg-[#fdf6cc] text-[#c7a620] px-3 py-1 rounded-full text-xs font-bold">جديد</span>
                  )}
                </div>
                <p className="text-sm text-[#20836f] mt-1 mb-4 text-right">{course.description}</p>
                <button className="bg-[#20836f] text-white px-5 py-2 rounded-lg hover:bg-[#166854] transition font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a7d8cc] duration-150">
                  استكمال
                </button>
              </div>
            ))}
          </div>

          {/* الحصص القادمة */}
          <div className="flex flex-row items-center gap-2 mb-4">
            <span className="block w-2 h-5 rounded-lg bg-[#20836f]"></span>
            <h2 className="text-xl font-bold text-[#224957]">الحصص القادمة</h2>
          </div>
          <div className="bg-white p-5 rounded-xl shadow border border-[#e0e0e0] max-w-sm ml-0 md:ml-auto text-right flex flex-col items-end hover:shadow-lg hover:border-[#20836f] transition">
            <h3 className="font-bold text-[#224957]">{nextClass.title}</h3>
            <p className="text-sm text-[#20836f] mt-1">{nextClass.date}</p>
          </div>

          {/* Late Assignments */}
          {assignments.length > 0 && (
            <div className="mt-10">
              <div className="flex flex-row-reverse items-center gap-2 mb-4">
                <span className="block w-2 h-5 rounded-lg bg-[#e76262]"></span>
                <h2 className="text-xl font-bold text-[#e76262]">الواجبات المتأخرة</h2>
              </div>
              <div className="bg-[#f8e6e6] border border-[#f3c6c6] p-5 rounded-xl shadow max-w-xl ml-auto flex flex-col items-end">
                {assignments.map((a) => (
                  <div key={a.id} className="mb-2 w-full flex flex-row-reverse items-center justify-between">
                    <span className="font-semibold text-[#e76262]">{a.title}</span>
                    <span className="text-xs text-[#e76262] bg-[#fff0f1] px-3 py-1 rounded">تأخر التسليم • {a.due}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </StudentLayout>
  );
};

export default Dashboard;
