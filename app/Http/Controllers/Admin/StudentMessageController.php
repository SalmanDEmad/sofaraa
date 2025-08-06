<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Message;

class StudentMessageController extends Controller
{
    public function index()
    {
        // This will work after adding the read_at column
        $students = User::where('role_id', 1)
            ->select('id', 'name')
            ->get();

        // Manually add unread count to each student
        foreach ($students as $student) {
            $student->unreadCount = Message::where('student_id', $student->id)
                ->whereNull('read_at') // This will work after migration
                ->count();
        }

        // Load initial messages for the first student (if any)
        $initialMessages = [];
        if ($students->isNotEmpty()) {
            $initialMessages = Message::where('student_id', $students->first()->id)
                ->orderBy('created_at')
                ->get();
        }

        return Inertia::render('Tutor/Messages', [
            'students' => $students,
            'initialMessages' => $initialMessages,
            'userRole' => 'admin',
            'adminId' => auth()->id(),
        ]);
    }

    // Alternative if you used the boolean is_read column
    public function indexWithBooleanColumn()
    {
        $students = User::where('role_id', 1)
            ->select('id', 'name')
            ->get();

        foreach ($students as $student) {
            $student->unreadCount = Message::where('student_id', $student->id)
                ->where('is_read', false) // For boolean column
                ->count();
        }

        $initialMessages = [];
        if ($students->isNotEmpty()) {
            $initialMessages = Message::where('student_id', $students->first()->id)
                ->orderBy('created_at')
                ->get();
        }

        return Inertia::render('Tutor/Messages', [
            'students' => $students,
            'initialMessages' => $initialMessages,
            'userRole' => 'admin',
            'adminId' => auth()->id(),
        ]);
    }
}