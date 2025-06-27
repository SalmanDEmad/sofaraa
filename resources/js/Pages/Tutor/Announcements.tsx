import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Trash2, ChevronDown, ChevronUp, PlusCircle, X } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  description: string;
  announced_at: string;
  is_pinned: boolean;
}

interface Props {
  announcements: Announcement[];
}

export default function AdminAnnouncements({ announcements }: Props) {
  const {
    data,
    setData,
    post,
    delete: destroy,
    patch,
    reset,
    processing,
    errors,
  } = useForm({
    title: '',
    description: '',
    is_pinned: false,
    announced_at: new Date().toISOString().split('T')[0],
  });

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.announcements.store'), {
      onSuccess: () => {
        reset();
        setModalOpen(false);
      },
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا الإعلان؟')) {
      destroy(route('admin.announcements.destroy', id));
    }
  };

  const togglePin = (announcement: Announcement) => {
    patch(route('admin.announcements.update', announcement.id), {
      ...announcement,
      is_pinned: !announcement.is_pinned,
    });
  };

  const pinnedAnnouncements = announcements.filter((a) => a.is_pinned);
  const otherAnnouncements = announcements.filter((a) => !a.is_pinned);

  return (
    <AdminLayout activeLink="#announcements">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-right">📢 إدارة الإعلانات</h1>
          <button
            className="flex items-center gap-2 bg-[#402a13] text-white px-4 py-2 rounded hover:bg-[#5c3c1a]"
            onClick={() => setModalOpen(true)}
          >
            <PlusCircle className="w-5 h-5" /> إعلان جديد
          </button>
        </div>

        {pinnedAnnouncements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {pinnedAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-yellow-100 p-5 rounded-xl shadow text-right border"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#402a13] text-lg">{announcement.title}</h3>
                    <p className="text-sm text-[#4b2e24] mt-1">{announcement.description}</p>
                    <p className="text-xs text-[#a38c74] mt-2">📅 {announcement.announced_at}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePin(announcement)}
                      className="text-xs bg-gray-300 px-2 py-1 rounded"
                    >
                      إلغاء التثبيت
                    </button>
                    <button
                      onClick={() => {
                        setEditModalOpen(true);
                        setEditingAnnouncementId(announcement.id);
                        setData({
                          title: announcement.title,
                          description: announcement.description,
                          is_pinned: announcement.is_pinned,
                          announced_at: announcement.announced_at,
                        });
                      }}
                      className="text-blue-600 hover:text-blue-800 text-xs bg-blue-100 px-2 py-1 rounded"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="text-red-600 hover:text-red-800"
                      title="حذف الإعلان"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-[#f6eddc] rounded-xl shadow border border-[#e6dcc6] text-right overflow-hidden">
          {otherAnnouncements.map((announcement) => (
            <div key={announcement.id} className="border-t border-[#e6dcc6]">
              <button
                onClick={() => toggleAccordion(announcement.id)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-[#f1e6cf]"
              >
                <div>
                  <h2 className="font-bold text-[#402a13]">{announcement.title}</h2>
                  <p className="text-xs text-[#a38c74]">📅 {announcement.announced_at}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(announcement);
                    }}
                    className={`text-sm px-2 py-1 rounded ${announcement.is_pinned ? 'bg-yellow-400' : 'bg-gray-300'}`}
                  >
                    {announcement.is_pinned ? 'إلغاء التثبيت' : 'تثبيت'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditModalOpen(true);
                      setEditingAnnouncementId(announcement.id);
                      setData({
                        title: announcement.title,
                        description: announcement.description,
                        is_pinned: announcement.is_pinned,
                        announced_at: announcement.announced_at,
                      });
                    }}
                    className="text-blue-600 hover:text-blue-800 text-xs bg-blue-100 px-2 py-1 rounded"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(announcement.id);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {expandedId === announcement.id ? (
                    <ChevronUp className="w-5 h-5 text-[#6b4c33]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6b4c33]" />
                  )}
                </div>
              </button>
              {expandedId === announcement.id && (
                <div className="px-6 pb-4 text-sm text-[#4b2e24]">
                  <p>{announcement.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Create Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
              <button className="absolute top-3 left-3" onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-bold mb-4 text-right">إعلان جديد</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 text-right">العنوان</label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.title && <div className="text-red-500 text-sm text-right mt-1">{errors.title}</div>}
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-right">المحتوى</label>
                  <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows={3}
                  />
                  {errors.description && <div className="text-red-500 text-sm text-right mt-1">{errors.description}</div>}
                </div>

                <div className="mb-4 flex justify-between items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.is_pinned}
                      onChange={(e) => setData('is_pinned', e.target.checked)}
                    />
                    <span>تثبيت الإعلان</span>
                  </label>
                  <input
                    type="date"
                    value={data.announced_at}
                    onChange={(e) => setData('announced_at', e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="bg-[#402a13] text-white px-6 py-2 rounded hover:bg-[#5c3c1a]"
                >
                  نشر
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
              <button className="absolute top-3 left-3" onClick={() => setEditModalOpen(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-xl font-bold mb-4 text-right">تعديل الإعلان</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editingAnnouncementId !== null) {
                    patch(route('admin.announcements.update', editingAnnouncementId), {
                      preserveScroll: true,
                      onSuccess: () => {
                        reset();
                        setEditModalOpen(false);
                        setEditingAnnouncementId(null);
                      },
                    });
                  }
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1 text-right">العنوان</label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                  />
                  {errors.title && <div className="text-red-500 text-sm text-right mt-1">{errors.title}</div>}
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-right">المحتوى</label>
                  <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    rows={3}
                  />
                  {errors.description && <div className="text-red-500 text-sm text-right mt-1">{errors.description}</div>}
                </div>

                <div className="mb-4 flex justify-between items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.is_pinned}
                      onChange={(e) => setData('is_pinned', e.target.checked)}
                    />
                    <span>تثبيت الإعلان</span>
                  </label>
                  <input
                    type="date"
                    value={data.announced_at}
                    onChange={(e) => setData('announced_at', e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="bg-[#402a13] text-white px-6 py-2 rounded hover:bg-[#5c3c1a]"
                >
                  حفظ التعديلات
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}