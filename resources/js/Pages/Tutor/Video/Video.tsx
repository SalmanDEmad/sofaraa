import React, { useState, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import { Inertia } from '@inertiajs/inertia';

type Video = {
  id: string;
  title: string;
  description?: string;
  youtube_link: string;
  course: {
    id: string;
    name: string;
    semester: number;
  };
};

type Course = {
  id: string;
  name: string;
  semester: number;
};

type Props = {
  videos: Video[];
  courses: Course[];
};

export default function VideoPage({ videos, courses }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [searchCourse, setSearchCourse] = useState('');
  const [searchSemester, setSearchSemester] = useState('');

  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
    youtube_link: '',
    course_id: courses.length > 0 ? courses[0].id : '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.videos.store'), {
      onSuccess: () => {
        setShowModal(false);
        reset();
        Inertia.visit(window.location.href);
      },
      onError: () => {
        console.error("❌ فشل الرفع");
      },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا الفيديو؟')) {
      Inertia.delete(route('admin.videos.destroy', id), {
        onSuccess: () => Inertia.visit(window.location.href),
      });
    }
  };

  const filteredVideos = useMemo(() => {
    return videos.filter((v) =>
      (!searchCourse || v.course.id === searchCourse) &&
      (!searchSemester || v.course.semester.toString() === searchSemester)
    );
  }, [videos, searchCourse, searchSemester]);

  return (
    <AdminLayout activeLink="#videos">
      <div className="p-4 md:p-10">
        {/* Header and Filters: row-reverse for RTL */}
        <div className="flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-right">الفيديوهات</h2>
          <div className="flex flex-col sm:flex-row-reverse gap-4 w-full md:w-auto">
            <PrimaryButton onClick={() => setShowModal(true)} className="w-full sm:w-auto">
              + رفع فيديو
            </PrimaryButton>
            <div className="w-full sm:w-48">
              <InputLabel htmlFor="filterCourse" value="تصفية حسب الدورة" />
              <select
                id="filterCourse"
                value={searchCourse}
                onChange={(e) => setSearchCourse(e.target.value)}
                className="block w-full rounded border-gray-300 shadow-sm"
              >
                <option value="">الكل</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-48">
              <InputLabel htmlFor="filterSemester" value="تصفية حسب الفصل" />
              <select
                id="filterSemester"
                value={searchSemester}
                onChange={(e) => setSearchSemester(e.target.value)}
                className="block w-full rounded border-gray-300 shadow-sm"
              >
                <option value="">الكل</option>
                {[...new Set(courses.map((c) => c.semester))].map((s) => (
                  <option key={s} value={s}>
                    الفصل {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Video Cards */}
        {filteredVideos.length === 0 ? (
          <div className="text-center text-gray-400 py-20 text-lg font-medium">
            لا يوجد فيديوهات حالياً.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map(video => (
              <div
                key={video.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="w-full aspect-video bg-gray-100">
                  <iframe
                    className="w-full h-full"
                    src={video.youtube_link.replace('watch?v=', 'embed/')}
                    title={video.title}
                    allowFullScreen
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-1 text-right">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 text-right">{video.description}</p>
                  <div className="flex flex-col items-end mb-2 mt-auto">
                    <span className="text-xs text-gray-500">
                      الدورة: <strong>{video.course.name}</strong> (الفصل {video.course.semester})
                    </span>
                  </div>
                  <SecondaryButton
                    className="mt-2 w-full"
                    onClick={() => handleDelete(video.id)}
                  >
                    حذف
                  </SecondaryButton>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <form onSubmit={submit} className="p-6 space-y-4 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-2 text-right">رفع فيديو جديد</h2>

            <div>
              <InputLabel htmlFor="title" value="العنوان" />
              <TextInput
                id="title"
                className="mt-1 block w-full"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                required
              />
              <InputError message={errors.title} className="mt-1" />
            </div>

            <div>
              <InputLabel htmlFor="description" value="الوصف" />
              <TextArea
                id="description"
                className="mt-1 block w-full"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
              />
              <InputError message={errors.description} className="mt-1" />
            </div>

            <div>
              <InputLabel htmlFor="youtube_link" value="رابط يوتيوب" />
              <TextInput
                id="youtube_link"
                className="mt-1 block w-full"
                value={data.youtube_link}
                onChange={e => setData('youtube_link', e.target.value)}
                required
              />
              <InputError message={errors.youtube_link} className="mt-1" />
            </div>

            <div>
              <InputLabel htmlFor="course_id" value="اختر الدورة" />
              <select
                id="course_id"
                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                value={data.course_id}
                onChange={e => setData('course_id', e.target.value)}
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} (فصل {course.semester})
                  </option>
                ))}
              </select>
              <InputError message={errors.course_id} className="mt-1" />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <SecondaryButton onClick={() => setShowModal(false)} type="button">
                إلغاء
              </SecondaryButton>
              <PrimaryButton disabled={processing}>رفع</PrimaryButton>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}