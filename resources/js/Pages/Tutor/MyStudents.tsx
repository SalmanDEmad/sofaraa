import { PageProps } from '@/types';
import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Trash2, Ban, ShieldCheck, RefreshCcw } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Student {
    id: number;
    name: string;
    email: string;
    created_at: string;
    role: string;        // Example: "student" or "teacher"
    status: string;      // Example: "active" or "banned"
}

interface Props extends PageProps {
    students: Student[];
}

export default function MyStudents({ students }: Props) {

    const handleDelete = (id: number) => {
        if (confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟')) {
            router.delete(route('admin.students.destroy', id));
        }
    };

    const handleToggleBan = (student: Student) => {
        const action = student.status === 'banned' ? 'رفع الحظر' : 'حظر';
        if (confirm(`هل تريد ${action} هذا المستخدم؟`)) {
            router.patch(route('admin.students.toggle-ban', student.id));
        }
    };

    return (
        <AdminLayout activeLink="#students">
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">👥 قائمة الطلاب</h1>

                <div className="overflow-x-auto rounded shadow border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm text-right">
                        <thead className="bg-gray-100 text-gray-700 font-semibold">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">الاسم</th>
                                <th className="px-4 py-3">البريد الإلكتروني</th>
                                <th className="px-6 py-3">الفصل</th>
                                <th className="px-4 py-3">الحالة</th>
                                <th className="px-4 py-3">تاريخ التسجيل</th>
                                <th className="px-4 py-3">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {students.length > 0 ? (
                                students.map((student, index) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3">{student.name}</td>
                                        <td className="px-4 py-3">{student.email}</td>
                                        <td className="px-6 py-4">1</td>
                                        <td className="px-4 py-3">
                                            {student.status === 'banned' ? (
                                                <span className="text-red-600 font-medium">🚫 محظور</span>
                                            ) : (
                                                <span className="text-green-600 font-medium">✅ نشط</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {new Date(student.created_at).toLocaleDateString('ar-EG')}
                                        </td>
                                        <td className="px-4 py-3 flex gap-2 justify-end">
                                            <button
                                                onClick={() => handleToggleBan(student)}
                                                className="text-yellow-700 hover:text-yellow-900"
                                                title={student.status === 'banned' ? 'إلغاء الحظر' : 'حظر المستخدم'}
                                            >
                                                {student.status === 'banned' ? <RefreshCcw className="w-5 h-5" /> : <Ban className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(student.id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="حذف المستخدم"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-6 text-gray-500">
                                        لا يوجد طلاب حتى الآن
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}