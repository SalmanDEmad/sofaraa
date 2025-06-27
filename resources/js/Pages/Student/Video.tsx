import { useMemo, useState } from 'react';
import StudentLayout from '@/Layouts/StudentLayout';
import { usePage } from '@inertiajs/react';

// Types
type Course = {
  id: number;
  name: string;
  image?: string;
};

type Video = {
  id: number;
  title: string;
  youtube_link: string;
  course_id: number;
  description?: string;
};

type CourseGroup = {
  id: number;
  name: string;
  image: string;
  episodes: Video[];
};

type Props = {
  courses: Course[];
  videos: Video[];
};

export default function StudentVideoPage() {
  const { courses, videos } = usePage<Props>().props;

  const groupedByCourse: CourseGroup[] = useMemo(() => {
    return courses.map((course) => ({
      id: course.id,
      name: course.name,
      image: course.image || `https://picsum.photos/seed/${course.id}/300/180`,
      episodes: videos
        .filter((video) => video.course_id === course.id)
        .sort((a, b) => a.id - b.id),
    }));
  }, [courses, videos]);

  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(groupedByCourse[0]?.id || null);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number>(0);

  const selectedCourse = useMemo(
    () => groupedByCourse.find((c) => c.id === selectedCourseId),
    [groupedByCourse, selectedCourseId]
  );

  const selectedEpisode = useMemo(
    () => selectedCourse?.episodes[selectedEpisodeIndex],
    [selectedCourse, selectedEpisodeIndex]
  );

  return (
    <StudentLayout activeLink="#videos">
      <main className="flex flex-col lg:grid lg:grid-cols-4 gap-4 p-4 min-h-screen bg-[#fdfdfd] text-[#1a1a1a]">
        {/* Episodes */}
        <div className="lg:col-span-1 order-2 lg:order-1 bg-white border border-[#eaeaea] p-4 rounded">
          <h2 className="text-xl font-bold mb-4 text-[#4b2e24] text-right">الحلقات</h2>
          {selectedCourse?.episodes.length ? (
            <div className="flex flex-col gap-2">
              {selectedCourse.episodes.map((_, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer text-center border rounded-lg py-2 px-4 text-[#4b2e24] transition text-sm lg:text-base ${
                    idx === selectedEpisodeIndex
                      ? 'border-[#d3a661] bg-[#fdf7ee]'
                      : 'border-[#eae2ca] hover:border-[#d3a661]'
                  }`}
                  onClick={() => setSelectedEpisodeIndex(idx)}
                >
                  الحلقة {idx + 1}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#666] text-sm">لا توجد حلقات متاحة</p>
          )}
        </div>

        {/* Video + Courses */}
        <div className="lg:col-span-3 order-1 lg:order-2 flex flex-col gap-6">
          {/* Video */}
          {selectedEpisode && (
            <div className="bg-white p-0 sm:p-4 rounded-xl shadow border border-[#eaeaea]">
              <div className="aspect-video mb-4">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={selectedEpisode.youtube_link.replace('watch?v=', 'embed/')}
                  title={selectedEpisode.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="px-4 sm:px-0">
                <h1 className="text-xl lg:text-2xl font-bold text-[#4b2e24] mb-2 text-right">
                  {selectedEpisode.title}
                </h1>
                {selectedEpisode.description && (
                  <p className="text-right text-[#555] text-sm lg:text-base mb-4">
                    {selectedEpisode.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Courses */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {groupedByCourse.map((course) => (
              <div
                key={course.id}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  setSelectedEpisodeIndex(0);
                }}
                className={`cursor-pointer rounded overflow-hidden border transition hover:shadow-sm hover:scale-[1.01] ${
                  course.id === selectedCourseId
                    ? 'border-2 border-[#d3a661] bg-[#fef9f0]'
                    : 'border border-[#eaeaea] bg-white'
                }`}
              >
                <img src={course.image} className="w-full h-20 object-cover" />
                <div className="p-2 text-center text-sm font-bold text-[#4b2e24] truncate">
                  {course.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </StudentLayout>
  );
}