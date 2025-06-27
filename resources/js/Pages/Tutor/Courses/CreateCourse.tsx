import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Props {
  categories: {
    id: number;
    name: string;
  }[];
  semesters: number[];
}

export default function CreateCourse({ categories, semesters }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
    category_id: '',
    semester: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.courses.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <AdminLayout activeLink="#courses">
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-right">📚 إنشاء دورة جديدة</h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-right">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">عنوان الدورة</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">وصف الدورة</label>
            <textarea
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows={4}
            />
            {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block mb-1 font-medium">الفئة</label>
            <select
              value={data.category_id}
              onChange={(e) => setData('category_id', e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- اختر فئة --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && <div className="text-red-500 text-sm">{errors.category_id}</div>}
          </div>

          {/* Semester Dropdown */}
          <div>
            <label className="block mb-1 font-medium">الفصل الدراسي</label>
            <select
              value={data.semester}
              onChange={(e) => setData('semester', e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">-- اختر الفصل --</option>
              {semesters.map((s) => (
                <option key={s} value={s}>
                  الفصل {s}
                </option>
              ))}
            </select>
            {errors.semester && <div className="text-red-500 text-sm">{errors.semester}</div>}
          </div>

          {/* Submit */}
          <div className="text-left">
            <button
              type="submit"
              disabled={processing}
              className="bg-[#402a13] text-white px-6 py-2 rounded hover:bg-[#5c3c1a]"
            >
              إنشاء الدورة
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}