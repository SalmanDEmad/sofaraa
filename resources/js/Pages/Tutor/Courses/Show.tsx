import { PageProps } from '@/types';
import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';

interface Episode {
  title: string;
  video: string;
}

interface Chapter {
  id: number;
  title: string;
  episodes: Episode[];
}

interface Course {
  id: number;
  title: string;
  image: string;
  chapters: Chapter[];
}

interface ShowProps extends PageProps {
  course: Course;
}

export default function Show({ course }: ShowProps) {
  return (
    <DashboardLayout activeLink="#Course" isCollapsed={false} toggleSidebar={() => {}}>
      <main className="min-h-screen bg-[#fdfdfd] p-6 text-[#1a1a1a]">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow border border-[#eaeaea] p-6">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover rounded-xl mb-6"
          />

          <h1 className="text-2xl font-bold text-[#4b2e24] mb-4">{course.title}</h1>

          {course.chapters.map((chapter) => (
            <div key={chapter.id} className="mb-8">
              <h2 className="text-xl font-semibold text-[#4b2e24] mb-2">{chapter.title}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {chapter.episodes.map((ep, idx) => (
                  <div
                    key={idx}
                    className="bg-[#fdf7ee] border border-[#eae2ca] rounded-lg p-4 text-[#4b2e24]"
                  >
                    <p className="font-bold mb-2">{ep.title}</p>
                    <video
                      src={ep.video}
                      controls
                      className="w-full rounded-lg aspect-video"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
}