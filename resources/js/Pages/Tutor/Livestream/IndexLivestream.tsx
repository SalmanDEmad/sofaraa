import { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';

const courseData = [
  {
    id: 1,
    title: 'القدوة والأخلاق',
    image: 'https://picsum.photos/seed/1/300/180',
    chapters: [
      {
        id: 1,
        title: 'مقدمة عن الأخلاق',
        episodes: [
          { title: 'الحلقة ١', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
          { title: 'الحلقة ٢', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
        ],
      },
      {
        id: 2,
        title: 'نماذج من القدوة',
        episodes: [
          { title: 'الحلقة ٣', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
          { title: 'الحلقة ٤', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'العقيدة الإسلامية',
    image: 'https://picsum.photos/seed/2/300/180',
    chapters: [
      {
        id: 1,
        title: 'أساسيات التوحيد',
        episodes: [
          { title: 'الحلقة ١', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
          { title: 'الحلقة ٢', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
        ],
      },
      {
        id: 2,
        title: 'الإيمان بالرسل',
        episodes: [
          { title: 'الحلقة ٣', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
          { title: 'الحلقة ٤', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'الفقه والسلوك',
    image: 'https://picsum.photos/seed/3/300/180',
    chapters: [
      {
        id: 1,
        title: 'الطهارة والصلاة',
        episodes: [
          { title: 'الحلقة ١', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
          { title: 'الحلقة ٢', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
        ],
      },
      {
        id: 2,
        title: 'المعاملات اليومية',
        episodes: [
          { title: 'الحلقة ٣', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
          { title: 'الحلقة ٤', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'السيرة النبوية',
    image: 'https://picsum.photos/seed/4/300/180',
    chapters: [
      {
        id: 1,
        title: 'ميلاد النبي ونشأته',
        episodes: [
          { title: 'الحلقة ١', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
          { title: 'الحلقة ٢', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
        ],
      },
      {
        id: 2,
        title: 'غزوات النبي',
        episodes: [
          { title: 'الحلقة ٣', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
          { title: 'الحلقة ٤', video: 'https://www.youtube.com/watch?v=YHkFhN4xTdc' },
        ],
      },
    ],
  },
];

export default function CreateCourse() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(1);
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(1);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number>(0);

  const selectedCourse = courseData.find((c) => c.id === selectedCourseId);
  const selectedChapter = selectedCourse?.chapters.find((ch) => ch.id === selectedChapterId);
  const selectedEpisode = selectedChapter?.episodes[selectedEpisodeIndex];

  return (
    <DashboardLayout
      activeLink="#Course"
      isCollapsed={isSidebarCollapsed}
      toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
    >
      <main className="flex min-h-screen bg-[#fdfdfd]">
        {/* Left Sidebar */}
        <div className="w-1/4 min-w-[240px] max-w-sm bg-white border-e border-[#eaeaea] overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-4 text-[#4b2e24] text-right">الدورات</h2>
          <div className="space-y-4">
            {courseData.map((course) => (
              <div
                key={course.id}
                className={`cursor-pointer rounded overflow-hidden border ${
                  course.id === selectedCourseId ? 'border-[#d3a661]' : 'border-[#eaeaea]'
                }`}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  setSelectedChapterId(course.chapters[0].id);
                  setSelectedEpisodeIndex(0);
                }}
              >
                <img src={course.image} className="w-full h-28 object-cover" />
                <div className="p-2 text-sm text-center font-bold text-[#4b2e24]">{course.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-6">
          {selectedEpisode ? (
            <>
              <div className="mb-6 aspect-video">
                <iframe
                  src={selectedEpisode.video}
                  className="w-full h-full rounded-xl border border-[#ddd]"
                  allowFullScreen
                ></iframe>
              </div>
              <h1 className="text-2xl font-bold text-[#4b2e24] mb-4">{selectedEpisode.title}</h1>

              {/* Episode List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {selectedChapter?.episodes.map((ep, idx) => (
                  <div
                    key={idx}
                    className={`cursor-pointer text-center border rounded-lg p-4 text-[#4b2e24] shadow-sm ${
                      idx === selectedEpisodeIndex ? 'border-[#d3a661] bg-[#f9f5ec]' : 'border-[#eae2ca]'
                    }`}
                    onClick={() => setSelectedEpisodeIndex(idx)}
                  >
                    {ep.title}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-[#666]">لا توجد حلقات متاحة</p>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}
