import React, { useState, useMemo } from 'react';
import { useForm, usePage } from '@inertiajs/react';
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
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">الفيديوهات</h2>
          <PrimaryButton onClick={() => setShowModal(true)}>+ رفع فيديو</PrimaryButton>
        </div>

        <div className="flex gap-4 mb-6">
          <div>
            <InputLabel htmlFor="filterCourse" value="تصفية حسب الدورة" />
            <select
              id="filterCourse"
              value={searchCourse}
              onChange={(e) => setSearchCourse(e.target.value)}
              className="block w-full"
            >
              <option value="">الكل</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <InputLabel htmlFor="filterSemester" value="تصفية حسب الفصل" />
            <select
              id="filterSemester"
              value={searchSemester}
              onChange={(e) => setSearchSemester(e.target.value)}
              className="block w-full"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVideos.map(video => (
            <div key={video.id} className="border p-4 rounded-lg shadow-sm">
              <iframe
                className="w-full h-64"
                src={video.youtube_link.replace('watch?v=', 'embed/')}
                title={video.title}
                allowFullScreen
              />
              <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{video.description}</p>
              <p className="text-sm text-gray-500">
                الدورة: <strong>{video.course.name}</strong> (الفصل {video.course.semester})
              </p>
              <SecondaryButton className="mt-2" onClick={() => handleDelete(video.id)}>
                حذف
              </SecondaryButton>
            </div>
          ))}
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <form onSubmit={submit} className="p-6">
            <h2 className="text-xl font-bold mb-4">رفع فيديو</h2>

            <InputLabel htmlFor="title" value="العنوان" />
            <TextInput id="title" className="mt-1 block w-full" value={data.title} onChange={e => setData('title', e.target.value)} required />
            <InputError message={errors.title} className="mt-1" />

            <InputLabel htmlFor="description" value="الوصف" className="mt-4" />
            <TextArea id="description" className="mt-1 block w-full" value={data.description} onChange={e => setData('description', e.target.value)} />
            <InputError message={errors.description} className="mt-1" />

            <InputLabel htmlFor="youtube_link" value="رابط يوتيوب" className="mt-4" />
            <TextInput id="youtube_link" className="mt-1 block w-full" value={data.youtube_link} onChange={e => setData('youtube_link', e.target.value)} required />
            <InputError message={errors.youtube_link} className="mt-1" />

            <InputLabel htmlFor="course_id" value="اختر الدورة" className="mt-4" />
            <select id="course_id" className="mt-1 block w-full" value={data.course_id} onChange={e => setData('course_id', e.target.value)}>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name} (فصل {course.semester})</option>
              ))}
            </select>
            <InputError message={errors.course_id} className="mt-1" />

            <div className="mt-6 flex justify-end">
              <SecondaryButton onClick={() => setShowModal(false)} className="mr-3">إلغاء</SecondaryButton>
              <PrimaryButton disabled={processing}>رفع</PrimaryButton>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
