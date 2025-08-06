import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashboardLayout from '@/Layouts/StudentLayout';
import { Head, Link } from '@inertiajs/react';
import { User } from '@/types'; // Import the global User type

// These interfaces can be extended as needed
interface Course {
  id: number;
  title: string;
  teacher: string;
  image: string;
  progress: number; // 0 to 100
}

// Extend the global User type to include the additional properties
interface ExtendedUser extends User {
  avatar?: string;
  points: number;
  certificates: number;
  completed_courses: number;
  total_courses: number;
  enrolled_courses: Course[];
}

interface Props {
  user: ExtendedUser;
  available_courses: Course[]; // Courses the user can enroll in
}

export default function Profile({ user, available_courses }: Props) {
  return (
    <DashboardLayout activeLink="#profile">
      <AuthenticatedLayout
        user={user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            الملف الشخصي
          </h2>
        }
      >
        <Head title="الملف الشخصي" />

        <div className="py-8 px-4 max-w-6xl mx-auto">
          {/* User Card */}
          <div className="flex items-center bg-white rounded-xl p-6 shadow mb-8">
            <img
              src={user.avatar || '/default-avatar.png'}
              alt="الصورة الشخصية"
              className="w-24 h-24 rounded-full border-4 border-gray-200 mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <div className="flex gap-10 text-center">
                <div>
                  <div className="font-extrabold text-xl">{user.points}</div>
                  <div className="text-xs text-gray-500">نقاط</div>
                </div>
                <div>
                  <div className="font-extrabold text-xl">{user.certificates}</div>
                  <div className="text-xs text-gray-500">الشهادات</div>
                </div>
                <div>
                  <div className="font-extrabold text-xl">{user.completed_courses}</div>
                  <div className="text-xs text-gray-500">المواد المكتملة</div>
                </div>
                <div>
                  <div className="font-extrabold text-xl">{user.total_courses}</div>
                  <div className="text-xs text-gray-500">المواد</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white rounded-xl p-6 shadow mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">المواد التي اشتركت بها</h2>
              {/* Optional: Add search/filter */}
              {/* <input type="text" placeholder="ابحث..." className="border p-2 rounded" /> */}
            </div>
            {user.enrolled_courses.length === 0 ? (
              <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg border border-yellow-200 text-center">
                لم تشترك بأي مادة من المواد حتى الآن
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {user.enrolled_courses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 bg-[#f9f7f3]">
                    <img src={course.image} alt={course.title} className="h-36 w-full object-cover rounded mb-2" />
                    <div className="font-bold text-base">{course.title}</div>
                    <div className="text-sm text-gray-500 mb-2">{course.teacher}</div>
                    <div className="text-xs text-right text-gray-400">مادة</div>
                    <div className="text-xs text-gray-500">مكتمل {course.progress}%</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available Courses */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-bold mb-4">اطلع على المزيد من المواد:</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {available_courses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4 bg-[#f9f7f3]">
                  <img src={course.image} alt={course.title} className="h-36 w-full object-cover rounded mb-2" />
                  <div className="font-bold text-base">{course.title}</div>
                  <div className="text-sm text-gray-500 mb-2">{course.teacher}</div>
                  <div className="text-xs text-right text-gray-400">مادة</div>
                  <Link href={`/courses/${course.id}`} className="text-brown mt-2 inline-block">عرض المادة</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </DashboardLayout>
  );
}