<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Show list of students (role_id = 1).
     */
    public function index()
    {
        $students = User::where('role_id', 1)->get(['id', 'name', 'email', 'created_at'])->map(function ($student) {
            $student->year = 1; // default value
            return $student;
        });

        return Inertia::render('Tutor/MyStudents', [
            'students' => $students
        ]);
    }

    /**
     * Delete a student.
     */
    public function destroy($id)
    {
        $student = User::where('role_id', 1)->findOrFail($id);
        $student->delete();

        return redirect()->back()->with('success', 'تم حذف الطالب بنجاح.');
    }

    /**
     * Toggle ban status for a student.
     */
    public function toggleBan($id)
    {
        $student = User::where('role_id', 1)->findOrFail($id);
        $student->status = $student->status === 'banned' ? 'active' : 'banned';
        $student->save();

        return redirect()->back()->with('success', 'تم تحديث حالة الطالب.');
    }
}