import React, { useState } from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link } from '@inertiajs/react'; // Import Inertia's Link

const courseData = [
  {
    id: 1,
    title: 'القدوة والأخلاق',
    image: 'https://picsum.photos/seed/1/300/180',
    description: 'مقدمة عن الأخلاق ونماذج من القدوة.',
  },
  {
    id: 2,
    title: 'العقيدة الإسلامية',
    image: 'https://picsum.photos/seed/2/300/180',
    description: 'أساسيات التوحيد والإيمان بالرسل.',
  },
  {
    id: 3,
    title: 'الفقه والسلوك',
    image: 'https://picsum.photos/seed/3/300/180',
    description: 'الطهارة، الصلاة والمعاملات اليومية.',
  },
  {
    id: 4,
    title: 'السيرة النبوية',
    image: 'https://picsum.photos/seed/4/300/180',
    description: 'حياة النبي ﷺ والغزوات.',
  },
];

export default function CoursesIndex() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <DashboardLayout
      activeLink="#courses"
      isCollapsed={isSidebarCollapsed}
      toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
    >
      <main className="p-8 min-h-screen bg-[#fdfdfd]">
        <h1 className="text-3xl font-bold mb-6 text-[#4b2e24] text-right">الدورات المتاحة</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseData.map((course) => (
            <Link
              key={course.id}
              href={route('courses.show', course.id)}
              className="cursor-pointer bg-white rounded-xl shadow border border-[#eaeaea] p-4 flex flex-col items-end hover:border-[#d3a661] transition"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-32 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-bold text-[#4b2e24] mb-2">{course.title}</h2>
              <p className="text-[#7d6652] text-sm text-right">{course.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
}
