import React, { useState, useRef, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
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

type Course = {
  id: number;
  name: string;
  description: string;
  semester: number;
  category: { id: number; name: string } | null;
};

type Category = {
  id: number;
  name: string;
};

type Props = {
  courses: Course[];
  categories: Category[];
  semesters: number[];
};

export default function CoursePage() {
  const { courses, categories: initialCategories, semesters } = usePage<Props>().props;

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCourse, setEditCourse] = useState<Partial<Course> | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // Autofocus for modals
  const categoryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showCategoryModal && categoryInputRef.current) {
      categoryInputRef.current.focus();
    }
  }, [showCategoryModal]);

  // Add Course Form
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.courses.store'), {
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
        onSuccess: () => {
          Inertia.reload({ only: ['courses'] });
        },
      });
    }
  };

  // Add Category Modal
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryError(null);
    Inertia.post(
      route('categories.store'),
      { name: newCategoryName },
      {
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

  // Edit Course Modal
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
      onSuccess: () => {
        setShowEditModal(false);
        Inertia.reload({ only: ['courses'] });
      },
    });
  };

  return (
    <AdminLayout activeLink="#courses">
      <div className="p-6 max-w-4xl mx-auto text-right">
        <h1 className="text-2xl font-bold mb-6">إدارة الدورات</h1>

        <div className="flex flex-wrap justify-end gap-3 mb-6">
          <PrimaryButton onClick={() => setShowCategoryModal(true)}>
            + إضافة فئة جديدة
          </PrimaryButton>
          <SecondaryButton onClick={() => setShowForm(!showForm)}>
            {showForm ? 'إغلاق النموذج' : '+ إضافة دورة جديدة'}
          </SecondaryButton>
        </div>

        {/* Category Modal */}
        <Modal show={showCategoryModal} onClose={() => setShowCategoryModal(false)}>
          <div className="p-6 w-full text-right mx-auto">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 text-center">إضافة فئة جديدة</h2>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <InputLabel htmlFor="category" value="اسم الفئة" className="mb-1" />
                <TextInput
                  id="category"
                  ref={categoryInputRef}
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full text-right"
                  autoFocus
                />
                {categoryError && <InputError message={categoryError} className="mt-2" />}
              </div>
              <div className="flex justify-between mt-4">
                <SecondaryButton type="button" onClick={() => setShowCategoryModal(false)}>إلغاء</SecondaryButton>
                <PrimaryButton type="submit">إضافة</PrimaryButton>
              </div>
            </form>
          </div>
        </Modal>

        {/* Edit Course Modal */}
        <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
          {editCourse && (
            <div className="p-6 w-full text-right mx-auto">
              <h2 className="text-xl font-bold mb-4 border-b pb-2 text-center">تعديل الدورة</h2>
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
                <div>
                  <InputLabel htmlFor="edit-semester" value="الفصل الدراسي" />
                  <select
                    id="edit-semester"
                    value={editCourse.semester ?? semesters[0]}
                    onChange={e => setEditCourse({ ...editCourse, semester: Number(e.target.value) })}
                    className="w-full p-2 border rounded"
                  >
                    {semesters.map(sem => (
                      <option key={sem} value={sem}>الفصل {sem}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <InputLabel htmlFor="edit-category" value="الفئة" />
                  <select
                    id="edit-category"
                    value={editCourse.category?.id ?? ''}
                    onChange={e => setEditCourse({ ...editCourse, category: { id: Number(e.target.value), name: categories.find(cat => cat.id === Number(e.target.value))?.name ?? '' } })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر فئة</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between mt-4">
                  <SecondaryButton type="button" onClick={() => setShowEditModal(false)}>إلغاء</SecondaryButton>
                  <PrimaryButton type="submit">تحديث</PrimaryButton>
                </div>
              </form>
            </div>
          )}
        </Modal>

        {/* Add Course Form */}
        {showForm && (
          <form onSubmit={submit} className="bg-gray-50 p-6 rounded-lg shadow mb-8 space-y-4 border">
            <div>
              <InputLabel htmlFor="name" value="اسم الدورة" />
              <TextInput
                id="name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                className="w-full"
                required
              />
              <InputError message={errors.name} />
            </div>
            <div>
              <InputLabel htmlFor="description" value="الوصف" />
              <TextArea
                id="description"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <InputLabel htmlFor="category_id" value="الفئة" />
              <select
                id="category_id"
                value={data.category_id}
                onChange={e => setData('category_id', Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <InputError message={errors.category_id} />
            </div>
            <div>
              <InputLabel htmlFor="semester" value="الفصل الدراسي" />
              <select
                id="semester"
                value={data.semester}
                onChange={e => setData('semester', Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                {semesters.map(sem => (
                  <option key={sem} value={sem}>الفصل {sem}</option>
                ))}
              </select>
              <InputError message={errors.semester} />
            </div>
            <div className="flex justify-end">
              <PrimaryButton disabled={processing} type="submit">
                {processing ? '...جاري الإضافة' : 'إضافة الدورة'}
              </PrimaryButton>
            </div>
          </form>
        )}

        {/* Course Table */}
        <h2 className="text-xl font-semibold mb-2 mt-10">الدورات الحالية</h2>
        {courses.length === 0 ? (
          <p className="text-gray-600">لا توجد دورات حتى الآن.</p>
        ) : (
          <div className="overflow-x-auto rounded border bg-white shadow-sm">
            <table className="min-w-[650px] w-full text-right">
              <thead>
                <tr className="bg-gray-100 text-sm border-b">
                  <th className="p-3 font-semibold">الاسم</th>
                  <th className="p-3 font-semibold">الوصف</th>
                  <th className="p-3 font-semibold">الفئة</th>
                  <th className="p-3 font-semibold">الفصل</th>
                  <th className="p-3 font-semibold">تحرير</th>
                  <th className="p-3 font-semibold">حذف</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-2">{course.name}</td>
                    <td className="p-2 max-w-xs truncate" title={course.description}>{course.description}</td>
                    <td className="p-2">{course.category?.name ?? '—'}</td>
                    <td className="p-2">{course.semester}</td>
                    <td className="p-2 whitespace-nowrap">
                      <PrimaryButton className="px-3 py-1 text-sm" onClick={() => handleEditClick(course)} type="button">
                        تحرير
                      </PrimaryButton>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
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
      </div>
    </AdminLayout>
  );
}