import { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Megaphone, ChevronDown, ChevronUp } from 'lucide-react';

const Announcements = () => {
  const pinned = [
    {
      id: 1,
      title: 'تمديد موعد التسليم لواجب الحديث',
      content: 'تم تمديد الموعد النهائي لتسليم واجب الحديث حتى ٢٥ يونيو ٢٠٢٥.',
      date: '٢٠ يونيو ٢٠٢٥',
    },
    {
      id: 2,
      title: 'إجازة رسمية يوم الخميس',
      content: 'سيكون يوم الخميس عطلة رسمية بمناسبة عيد الأضحى.',
      date: '١٨ يونيو ٢٠٢٥',
    },
  ];

  const allAnnouncements = [
    {
      id: 3,
      title: 'إطلاق دورة جديدة في السيرة النبوية',
      content: 'يسرنا الإعلان عن بدء دورة جديدة بعنوان "السيرة النبوية - المرحلة المكية" اعتباراً من ١ يوليو.',
      date: '٢٩ مايو ٢٠٢٥',
    },
    {
      id: 4,
      title: 'إشعار بانقطاع مؤقت في النظام',
      content: 'سيتم إجراء صيانة دورية يوم السبت القادم، وقد يتعذر الوصول لبعض الخدمات خلال الفترة من الساعة ٣ صباحاً وحتى ٧ صباحاً.',
      date: '٢٥ مايو ٢٠٢٥',
    },
    {
      id: 5,
      title: 'فتح باب التسجيل للدورة الصيفية',
      content: 'تم فتح باب التسجيل للدورات الصيفية، يرجى إتمام التسجيل قبل ١٥ يونيو لضمان المقعد.',
      date: '٢٤ مايو ٢٠٢٥',
    },
    {
      id: 6,
      title: 'تحديث جديد في منصة الفيديو',
      content: 'تمت إضافة ميزة تسريع التشغيل حتى ١.٥x ومتابعة من حيث توقفت تلقائيًا.',
      date: '٢٢ مايو ٢٠٢٥',
    },
    {
      id: 7,
      title: 'موعد تسليم واجب التفسير',
      content: 'يرجى تسليم واجب التفسير قبل يوم الاثنين القادم الساعة ١١:٥٩ مساءً.',
      date: '٢٠ مايو ٢٠٢٥',
    },
    {
      id: 8,
      title: 'نتائج الاختبارات الفصلية متاحة الآن',
      content: 'تم رفع نتائج الاختبارات الفصلية في صفحة "تقدمي ودرجاتي".',
      date: '١٩ مايو ٢٠٢٥',
    },
    {
      id: 9,
      title: 'إغلاق مؤقت لمكتبة المصادر',
      content: 'ستكون مكتبة المصادر مغلقة يوم الجمعة للصيانة والتحديث.',
      date: '١٧ مايو ٢٠٢٥',
    },
    {
      id: 10,
      title: 'بدء تقييم المعلمين من الطلاب',
      content: 'نرجو من جميع الطلاب تعبئة نموذج تقييم المعلمين لضمان تطوير جودة التعليم.',
      date: '١٦ مايو ٢٠٢٥',
    },
    {
      id: 11,
      title: 'ورشة عمل حول فن الخطابة',
      content: 'انضموا إلى ورشة مجانية لتعلم مهارات الخطابة والإلقاء يوم الأحد القادم.',
      date: '١٥ مايو ٢٠٢٥',
    },
    {
      id: 12,
      title: 'إضافة مراجعات قصيرة بعد كل فيديو',
      content: 'تمت إضافة مراجعات قصيرة بعد كل مجموعة دروس لتسهيل التحضير للاختبارات.',
      date: '١٣ مايو ٢٠٢٥',
    },
  ];

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <DashboardLayout activeLink="#announcements">
      <main className="flex-1 bg-beige-50 min-h-screen">
        <div className="bg-[#fdf7ee] min-h-screen text-brown-800 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-right">الإعلانات</h1>

            {/* Pinned Announcements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {pinned.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-[#f6eddc] p-5 rounded-xl shadow border border-[#e6dcc6] text-right"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#402a13]">{announcement.title}</h3>
                    <Megaphone className="w-5 h-5 text-[#6b4c33]" />
                  </div>
                  <p className="text-sm text-[#6b4c33]">{announcement.content}</p>
                  <p className="text-xs text-[#a38c74] mt-2">📅 {announcement.date}</p>
                </div>
              ))}
            </div>

            {/* Accordion Section */}
            <div className="bg-[#f6eddc] rounded-xl shadow border border-[#e6dcc6] text-right overflow-hidden">
              {allAnnouncements
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((announcement) => (
                  <div key={announcement.id} className="border-t border-[#e6dcc6]">
                    <button
                      onClick={() => toggleAccordion(announcement.id)}
                      className="w-full px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-[#f1e6cf] focus:outline-none"
                    >
                      <div className="flex flex-col md:flex-row md:gap-4 w-full justify-between items-start md:items-center">
                        <span className="text-[#402a13] font-bold text-sm md:text-base">
                          {announcement.title}
                        </span>
                        <span className="text-xs text-[#a38c74] whitespace-nowrap mt-1 md:mt-0">
                          📅 {announcement.date}
                        </span>
                      </div>
                      <div className="mt-2 md:mt-0">
                        {expandedId === announcement.id ? (
                          <ChevronUp className="w-5 h-5 text-[#6b4c33]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#6b4c33]" />
                        )}
                      </div>
                    </button>
                    {expandedId === announcement.id && (
                      <div className="px-6 pb-4 text-sm text-[#4b2e24]">
                        <p>{announcement.content}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Announcements;