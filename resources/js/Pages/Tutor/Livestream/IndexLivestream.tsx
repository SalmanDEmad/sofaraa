import { useEffect, useRef, useState, useMemo } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Hls from 'hls.js';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
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
          { title: 'الحلقة ١', video: 'https://customer-oqyikqxugvwgs240.cloudflarestream.com/8224be91c774fcbd9fb853043f6c2a64/manifest/video.m3u8' },
          { title: 'الحلقة ٢', video: 'https://customer-oqyikqxugvwgs240.cloudflarestream.com/b5c6caf49f2fa93a0143c5f10dfc7fd2/manifest/video.m3u8' },
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
  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsInstance = useRef<Hls | null>(null);
  // const plyrInstance = useRef<Plyr | null>(null);

  const selectedCourse = useMemo(() => courseData.find((c) => c.id === selectedCourseId), [selectedCourseId]);
  const selectedChapter = useMemo(() => selectedCourse?.chapters.find((ch) => ch.id === selectedChapterId), [selectedCourse, selectedChapterId]);
  const selectedEpisode = useMemo(() => selectedChapter?.episodes[selectedEpisodeIndex], [selectedChapter, selectedEpisodeIndex]);

  // console.log("SELECTED COURSE: ", selectedCourse);
  // console.log("SELECTED CHAPTER: ", selectedChapter);
  // console.log("SELECTED EPISODE: ", selectedEpisode);


  useEffect(() => {
  // console.log("EFFECT: ", videoRef, selectedEpisode);

    if (!videoRef.current || !selectedEpisode?.video) return;

    const video = videoRef.current;
    // console.log("video: ", video);

    const source = selectedEpisode.video;
    // console.log("source: ", source)
    const isHLS = source.endsWith('.m3u8');

    // console.log("isHLS: ", isHLS);

    // Destroy previous Plyr instance if exists
    // if (plyrInstance.current) {
    //   plyrInstance.current.destroy();
    // }

    // Destroy previous HLS instance if exists
    if (hlsInstance.current) {
      hlsInstance.current.destroy();
      hlsInstance.current = null;
    }

    // Initialize Plyr
    // plyrInstance.current = new Plyr(video, {
    //   controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    // });

    console.log("Hls.isSupported: ", Hls.isSupported());

    if (isHLS && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(videoRef.current);

      // hls.on(Hls.Events.MANIFEST_PARSED, function () {
      //   (videoRef.current!.plyr).play();
      // });

      // hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      //   // hls.loadSource(playingSrc);

      //   hls.on(Hls.Events.MANIFEST_PARSED, () => {
      //     // setHlsInstance(hls);
      //   });
      //   hls.on(Hls.Events.FRAG_PARSING_METADATA, (_event, data) => {
      //     console.log("Data", { _event, data });
      //   });
      // });


      hlsInstance.current = hls;
    } else {
      video.src = source;
    }

    return () => {
      // plyrInstance.current?.destroy();
      hlsInstance.current?.destroy();
    };
  }, [selectedCourse, selectedChapter, selectedEpisode?.video]);

  return (
    <DashboardLayout
      activeLink="#Course"
      isCollapsed={isSidebarCollapsed}
      toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
    >
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
                  className="w-full h-full rounded-xl plyr"
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
    </DashboardLayout>
  );
}
