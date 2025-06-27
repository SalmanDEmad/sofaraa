import { useEffect, useRef, useState, useMemo } from 'react';
import StudentLayout from '@/Layouts/StudentLayout';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';

// Assuming video data is coming from props in the future
const courseData = [
  // static example structure for now
  // replace with dynamic API-driven content later
];

export default function StudentVideoPage() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsInstance = useRef<Hls | null>(null);

  const selectedCourse = useMemo(() => courseData.find((c) => c.id === selectedCourseId), [selectedCourseId]);
  const selectedChapter = useMemo(() => selectedCourse?.chapters.find((ch) => ch.id === selectedChapterId), [selectedCourse, selectedChapterId]);
  const selectedEpisode = useMemo(() => selectedChapter?.episodes[selectedEpisodeIndex], [selectedChapter, selectedEpisodeIndex]);

  useEffect(() => {
    if (!videoRef.current || !selectedEpisode?.video) return;

    const video = videoRef.current;
    const source = selectedEpisode.video;
    const isHLS = source.endsWith('.m3u8');

    if (hlsInstance.current) {
      hlsInstance.current.destroy();
      hlsInstance.current = null;
    }

    if (isHLS && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hlsInstance.current = hls;
    } else {
      video.src = source;
    }

    return () => {
      hlsInstance.current?.destroy();
    };
  }, [selectedCourse, selectedChapter, selectedEpisode?.video]);

  return (
    <StudentLayout activeLink="#videos">
      <main className="flex flex-col-reverse lg:flex-row min-h-screen bg-[#fdfdfd] text-[#1a1a1a]">
        <div className="w-full lg:w-1/4 bg-white border-t lg:border-t-0 lg:border-e border-[#eaeaea] p-4 overflow-x-auto lg:overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-[#4b2e24] text-right hidden lg:block">الدورات</h2>
          <div className="flex lg:block gap-4 lg:gap-0">
            {courseData.map((course) => (
              <div
                key={course.id}
                className={`relative cursor-pointer rounded overflow-hidden border transition transform hover:shadow-sm hover:scale-[1.01] min-w-[140px] lg:min-w-full ${
                  course.id === selectedCourseId
                    ? 'border-2 border-[#d3a661] bg-[#fef9f0]'
                    : 'border border-[#eaeaea] bg-white'
                }`}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  setSelectedChapterId(course.chapters[0].id);
                  setSelectedEpisodeIndex(0);
                }}
              >
                {course.id === selectedCourseId && (
                  <div className="absolute top-2 left-2 w-3 h-3 bg-[#d3a661] rounded-full border border-white"></div>
                )}
                <img src={course.image} className="w-full h-24 object-cover" />
                <div className="p-2 text-sm text-center font-bold text-[#4b2e24]">{course.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-6">
          {selectedEpisode ? (
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow border border-[#eaeaea]">
              <div className="aspect-video mb-6">
                <video
                  ref={videoRef}
                  className="w-full h-full rounded-xl"
                  controls
                  playsInline
                />
              </div>

              <h1 className="text-xl lg:text-2xl font-bold text-[#4b2e24] mb-4 text-right">
                {selectedEpisode.title}
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {selectedChapter?.episodes.map((ep, idx) => (
                  <div
                    key={idx}
                    className={`cursor-pointer text-center border rounded-lg p-3 text-[#4b2e24] transition ${
                      idx === selectedEpisodeIndex
                        ? 'border-[#d3a661] bg-[#fdf7ee]'
                        : 'border-[#eae2ca] hover:border-[#d3a661]'
                    }`}
                    onClick={() => setSelectedEpisodeIndex(idx)}
                  >
                    {ep.title}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-[#666] text-lg">لا توجد حلقات متاحة</p>
          )}
        </div>
      </main>
    </StudentLayout>
  );
}