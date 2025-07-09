import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { route } from 'ziggy-js';
import { Inertia } from '@inertiajs/inertia';

import AdminLayout from '@/Layouts/AdminLayout';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from '@/Components/SelectInput'; // <--- NEW

type Course = {
  id: number;
  name: string;
  description: string;
  semester: number;
  category: { id: string; name: string };
};

type Category = {
  id: number;
  name: string;
};

type Props = PageProps<{
  courses: Course[];
  categories: Category[];
  semesters: number[];
}>;

export default function CoursePage() {
  const { courses, categories: initialCategories, semesters } = usePage<Props>().props;

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCourse, setEditCourse] = useState<Partial<Course> | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset,
  } = useForm({
    name: '',
    description: '',
    semester: semesters[0] ?? 1,
    category_id: initialCategories[0]?.id ?? 0,
  });

  // --- UX/UI Enhancements ---

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.courses.store'), {
      preserveState: false,
      onSuccess: () => {
        reset();
        setShowForm(false);
        Inertia.reload({ only: ['courses'] });
      },
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد من حذف الدورة؟')) {
      Inertia.delete(route('admin.courses.destroy', id), {
        preserveState: true,
        onSuccess: () => {
          Inertia.reload({ only: ['courses'] });
        },
      });
    }
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryError(null);

    Inertia.post(
      route('categories.store'),
      { name: newCategoryName },
      {
        preserveScroll: true,
        onSuccess: () => {
          setNewCategoryName('');
          setShowCategoryModal(false);
          Inertia.reload({ only: ['categories'] });
        },
        onError: (errors: any) => {
          if (errors.name) setCategoryError(errors.name);
        },
      }
    );
  };

  const handleEditClick = (course: Course) => {
    setEditCourse({
      id: course.id,
      name: course.name,
      description: course.description,
      semester: course.semester,
      category: course.category,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCourse) return;

    const payload = {
      name: editCourse.name ?? '',
      description: editCourse.description ?? '',
      semester: editCourse.semester ?? semesters[0],
      category_id: editCourse.category?.id ?? '',
    };

    Inertia.put(route('admin.courses.update', String(editCourse.id)), payload, {
      preserveScroll: true,
      onSuccess: () => {
        setShowEditModal(false);
        Inertia.reload({ only: ['courses'] });
      },
    });
  };

  return (
    <AdminLayout activeLink="#courses">
      <div className="p-6 max-w-5xl mx-auto text-right">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 bg-white/70 z-10 py-2 rounded-lg shadow-sm border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#114b5f]">إدارة الدورات</h1>
          <div className="flex flex-row-reverse gap-2">
            <PrimaryButton onClick={() => setShowForm((prev) => !prev)}>
              {showForm ? 'إغلاق النموذج' : '➕ إضافة دورة جديدة'}
            </PrimaryButton>
            <SecondaryButton onClick={() => setShowCategoryModal(true)}>
              إضافة فئة جديدة
            </SecondaryButton>
          </div>
        </div>

        {/* Add Category Modal */}
        <Modal show={showCategoryModal} onClose={() => setShowCategoryModal(false)}>
          <div className="p-6 w-full text-right mx-auto">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 text-center text-[#114b5f]">إضافة فئة جديدة</h2>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <InputLabel htmlFor="category" value="اسم الفئة" />
                <TextInput
                  id="category"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full text-right"
                  autoFocus
                />
                {categoryError && <InputError message={categoryError} className="mt-2" />}
              </div>
              <div className="flex justify-between mt-4 gap-2">
                <SecondaryButton type="button" onClick={() => setShowCategoryModal(false)}>إلغاء</SecondaryButton>
                <PrimaryButton type="submit">إضافة</PrimaryButton>
              </div>
            </form>
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
          {editCourse && (
            <div className="p-6 w-full text-right mx-auto">
              <h2 className="text-xl font-bold mb-4 border-b pb-2 text-center text-[#114b5f]">تعديل الدورة</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <InputLabel htmlFor="edit-name" value="اسم الدورة" />
                  <TextInput
                    id="edit-name"
                    value={editCourse.name ?? ''}
                    onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <InputLabel htmlFor="edit-description" value="الوصف" />
                  <TextArea
                    id="edit-description"
                    value={editCourse.description ?? ''}
                    onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between mt-4 gap-2">
                  <SecondaryButton type="button" onClick={() => setShowEditModal(false)}>إلغاء</SecondaryButton>
                  <PrimaryButton type="submit">تحديث</PrimaryButton>
                </div>
              </form>
            </div>
          )}
        </Modal>

        {/* Add Course Form */}
        {showForm && (
          <form onSubmit={submit} className="bg-[#f6fbfa] p-6 rounded-lg shadow border mb-8 space-y-5">
            <div>
              <InputLabel htmlFor="name" value="اسم الدورة" />
              <TextInput
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full"
              />
              <InputError message={errors.name} />
            </div>
            <div>
              <InputLabel htmlFor="description" value="الوصف" />
              <TextArea
                id="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <InputLabel htmlFor="category_id" value="الفئة" />
              <SelectInput
                id="category_id"
                value={data.category_id}
                onChange={(e) => setData('category_id', Number(e.target.value))}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </SelectInput>
              <InputError message={errors.category_id} />
            </div>
            <div>
              <InputLabel htmlFor="semester" value="الفصل الدراسي" />
              <SelectInput
                id="semester"
                value={data.semester}
                onChange={(e) => setData('semester', Number(e.target.value))}
              >
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>الفصل {sem}</option>
                ))}
              </SelectInput>
              <InputError message={errors.semester} />
            </div>
            <div className="text-left">
              <PrimaryButton disabled={processing} type="submit">
                {processing ? '...جاري الإضافة' : 'إضافة الدورة'}
              </PrimaryButton>
            </div>
          </form>
        )}

        {/* Course List Table */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-[#114b5f]">الدورات الحالية</h2>
          {courses.length === 0 ? (
            <p className="text-gray-500 py-10 text-center">لا توجد دورات حتى الآن.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[650px] w-full text-right border rounded-lg bg-white shadow-sm">
                <thead>
                  <tr className="bg-[#e8f4f7] text-[#114b5f] text-sm">
                    <th className="p-2 font-bold">الاسم</th>
                    <th className="p-2 font-bold">الوصف</th>
                    <th className="p-2 font-bold">الفئة</th>
                    <th className="p-2 font-bold">الفصل</th>
                    <th className="p-2 font-bold">تحرير</th>
                    <th className="p-2 font-bold">حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-t hover:bg-[#f2f8fa] text-[#14415c] text-sm">
                      <td className="p-2 font-medium">{course.name}</td>
                      <td
                        className="p-2 max-w-xs truncate"
                        title={course.description}
                        style={{ direction: "rtl" }}
                      >
                        {course.description}
                      </td>
                      <td className="p-2">{course.category?.name ?? '—'}</td>
                      <td className="p-2">{course.semester}</td>
                      <td className="p-2 whitespace-nowrap">
                        <PrimaryButton className="px-3 py-1 text-xs bg-[#e7f4ed] text-[#1a726b] hover:bg-[#d2f5e7]" onClick={() => handleEditClick(course)} type="button">
                          تحرير
                        </PrimaryButton>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="px-3 py-1 rounded text-xs bg-[#ffeaea] hover:bg-[#fbd7d7] text-[#b80000] transition"
                          type="button"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}