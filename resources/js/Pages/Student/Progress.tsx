import { useState, useEffect } from 'react';
import {
  BarChart3,
  CalendarCheck2,
  GraduationCap,
  PercentCircle,
  FileCheck2,
  Star,
  ClipboardList
} from 'lucide-react';
import DashboardLayout from '@/Layouts/StudentLayout';

const Progress = () => {
  const semesterData = [
    { semester: 'الفصل الأول', grade: 'A', percentage: 92 },
    { semester: 'الفصل الثاني', grade: 'B+', percentage: 88 },
    { semester: 'الفصل الثالث', grade: 'A-', percentage: 90 },
    { semester: 'الفصل الرابع', grade: 'A+', percentage: 97 },
  ];

  const [animatedPercents, setAnimatedPercents] = useState(Array(semesterData.length).fill(0));

  useEffect(() => {
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animations: number[] = [];

    semesterData.forEach((sem, i) => {
      const start = 0;
      const end = sem.percentage;
      const duration = 1000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(t);
        const value = Math.round(start + (end - start) * eased);

        setAnimatedPercents((prev) => {
          const newArr = [...prev];
          newArr[i] = value;
          return newArr;
        });

        if (t < 1) {
          animations[i] = requestAnimationFrame(animate);
        }
      };

      animations[i] = requestAnimationFrame(animate);
    });

    return () => {
      animations.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  const attendanceRate = 94;
  const totalCourses = 12;
  const coursesCompleted = 10;
  const topSubjects = ['تفسير 101', 'فقه 102', 'حديث 201'];
  const certificates = ['أساسيات العقيدة', 'مقدمة في الفقه'];

  return (
    <DashboardLayout activeLink="#progress">
      <main className="flex-1 bg-beige-50 min-h-screen">
        <div className="bg-[#fdf7ee] min-h-screen text-brown-800 py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-right">تقدمي ودرجاتي</h1>

            {/* 1. Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-[#5e3c26] text-white p-5 rounded-xl shadow text-center space-y-2">
                <GraduationCap className="mx-auto w-8 h-8" />
                <p className="text-sm">عدد الدورات</p>
                <p className="text-2xl font-bold">{totalCourses}</p>
              </div>
              <div className="bg-[#d3a661] text-white p-5 rounded-xl shadow text-center space-y-2">
                <BarChart3 className="mx-auto w-8 h-8" />
                <p className="text-sm">الدورات المكتملة</p>
                <p className="text-2xl font-bold">{coursesCompleted}</p>
              </div>
              <div className="bg-[#5e3c26] text-white p-5 rounded-xl shadow text-center space-y-2">
                <CalendarCheck2 className="mx-auto w-8 h-8" />
                <p className="text-sm">نسبة الحضور</p>
                <p className="text-2xl font-bold">{attendanceRate}%</p>
              </div>
              <div className="bg-[#d3a661] text-white p-5 rounded-xl shadow text-center space-y-2">
                <PercentCircle className="mx-auto w-8 h-8" />
                <p className="text-sm">المعدل العام</p>
                <p className="text-2xl font-bold">91.75%</p>
              </div>
            </div>

            {/* 2. Semester Grades */}
            <h2 className="text-xl font-semibold mb-4 text-right">تفاصيل الفصول</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {semesterData.map((sem, idx) => (
                <div
                  key={idx}
                  className="bg-[#f6eddc] border border-[#e6dcc6] p-5 rounded-xl shadow text-right"
                >
                  <h3 className="font-bold text-lg text-[#402a13]">{sem.semester}</h3>
                  <p className="text-sm text-[#6b4c33] mt-1 mb-2">الدرجة: {sem.grade}</p>
                  <div className="w-full bg-[#e6dcc6] rounded-full h-4">
                    <div
                      className="bg-[#5e3c26] h-4 rounded-full text-xs text-white text-center transition-all duration-500"
                      style={{ width: `${animatedPercents[idx]}%` }}
                    >
                      {animatedPercents[idx]}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Top Subjects & Certificates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-[#f6eddc] p-5 rounded-xl shadow border border-[#e6dcc6] text-right">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 justify-end">
                  <Star className="w-5 h-5 text-yellow-600" />
                  أفضل المواد
                </h3>
                <ul className="list-disc pr-5 text-[#4b2e24] text-sm space-y-1">
                  {topSubjects.map((subj, idx) => (
                    <li key={idx}>{subj}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#f6eddc] p-5 rounded-xl shadow border border-[#e6dcc6] text-right">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 justify-end">
                  <FileCheck2 className="w-5 h-5 text-green-700" />
                  الشهادات المحصلة
                </h3>
                <ul className="list-disc pr-5 text-[#4b2e24] text-sm space-y-1">
                  {certificates.map((cert, idx) => (
                    <li key={idx}>{cert}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. Teacher Notes */}
            <div className="bg-[#f6eddc] p-5 rounded-xl shadow border border-[#e6dcc6] text-right">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 justify-end">
                <ClipboardList className="w-5 h-5 text-blue-700" />
                ملاحظات من المعلمين
              </h3>
              <p className="text-sm text-[#4b2e24]">
                ✦ أداء ممتاز في الحضور والتفاعل داخل الصف.<br />
                ✦ يُنصح بمراجعة دروس الحديث للحصول على نتائج أفضل.
              </p>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Progress;