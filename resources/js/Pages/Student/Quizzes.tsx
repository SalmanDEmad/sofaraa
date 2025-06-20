import DashboardLayout from '@/Layouts/DashboardLayout';
import { FileQuestion } from 'lucide-react';

const Quizzes = () => {
  const quizzes = [
    {
      id: 1,
      title: 'اختبار التفسير - الوحدة ١',
      dueDate: '٢٠ يونيو ٢٠٢٥',
      status: 'مكتمل',
      grade: '٨٥%',
    },
    {
      id: 2,
      title: 'واجب الفقه - الطهارة',
      dueDate: '٢٣ يونيو ٢٠٢٥',
      status: 'قيد التسليم',
      grade: '-',
    },
  ];

  return (
    <DashboardLayout activeLink="#quizzes">
      <main className="flex-1 bg-beige-50 min-h-screen">
        <div className="bg-[#fdf7ee] min-h-screen text-brown-800 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-right">الاختبارات والواجبات</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-[#f6eddc] p-5 rounded-xl shadow border border-[#e6dcc6] text-right"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-[#402a13]">{quiz.title}</h3>
                    <FileQuestion className="w-6 h-6 text-[#6b4c33]" />
                  </div>
                  <p className="text-sm text-[#6b4c33]">الموعد النهائي: {quiz.dueDate}</p>
                  <p className="text-sm text-[#6b4c33]">الحالة: {quiz.status}</p>
                  <p className="text-sm text-[#6b4c33] font-semibold mt-1">الدرجة: {quiz.grade}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Quizzes;