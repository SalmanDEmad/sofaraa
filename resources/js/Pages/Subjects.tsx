import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Define props for Subjects component
interface Subject {
  name: string;
  totalCourses: number;
  liveSessions: number;
  imageUrl: string;
}

const Subjects: React.FC<{ auth?: any }> = ({ auth }) => {
  return (
    <>
      <Header activeLink="#subjects" userName={auth?.user?.name} />
      <main className="bg-[#fdf7ee] text-[#402a13] min-h-screen flex flex-col">
        <div className="flex-1 p-8 lg:mx-32">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            محاور وأقسام الأكاديمية
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subjects.map((subject, idx) => (
              <div
                key={idx}
                className="bg-[#f6eddc] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <img
                  src={subject.imageUrl}
                  alt={subject.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2">{subject.name}</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[#d3a661] text-white text-xs px-2 py-1 rounded-full">
                      عدد الدورات: {subject.totalCourses}
                    </span>
                    <span className="bg-[#402a13] text-white text-xs px-2 py-1 rounded-full">
                      الجلسات المباشرة: {subject.liveSessions}
                    </span>
                  </div>
                  <p className="text-[#6b4c33] text-sm">
                    تفاصيل إضافية حول هذا المحور سنوفرها قريباً.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const subjects: Subject[] = [
  {
    name: 'تصميم وتطوير المناهج التعليمية المتخصصة',
    totalCourses: 12,
    liveSessions: 4,
    imageUrl: 'https://via.placeholder.com/600x300?text=منهج+تعليمي'
  },
  {
    name: 'بيئة تعليمية محفزة ومبتكرة',
    totalCourses: 8,
    liveSessions: 3,
    imageUrl: 'https://via.placeholder.com/600x300?text=بيئة+تعليمية'
  },
  {
    name: 'الجانب التطبيقي والميداني',
    totalCourses: 10,
    liveSessions: 5,
    imageUrl: 'https://via.placeholder.com/600x300?text=تدريب+ميداني'
  },
  {
    name: 'الشراكات والتعاونات الاستراتيجية',
    totalCourses: 6,
    liveSessions: 2,
    imageUrl: 'https://via.placeholder.com/600x300?text=شراكات'
  },
  {
    name: 'البحث العلمي والدراسات المتخصصة',
    totalCourses: 5,
    liveSessions: 1,
    imageUrl: 'https://via.placeholder.com/600x300?text=بحث+علمي'
  },
];

export default Subjects;