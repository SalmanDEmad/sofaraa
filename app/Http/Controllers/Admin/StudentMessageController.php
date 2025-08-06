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
        // Method 1: Using withCount with proper relationship (Recommended)
        $students = User::where('role_id', 1)
            ->withCount(['studentMessages as unreadCount' => function ($query) {
                $query->whereNull('read_at');
            }])
            ->get(['id', 'name']);

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

    // Alternative method if the relationship doesn't handle type casting properly
    public function indexAlternative()
    {
        // Method 2: Using selectRaw with proper subquery
        $students = User::where('role_id', 1)
            ->selectRaw('id, name, (
                SELECT COUNT(*) 
                FROM messages 
                WHERE CAST(messages.student_id AS TEXT) = CAST(users.id AS TEXT)
                AND messages.read_at IS NULL
            ) as unread_count')
            ->get();

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

    // Method 3: Load students separately and then get counts
    public function indexSeparate()
    {
        // Get all students first
        $students = User::where('role_id', 1)
            ->get(['id', 'name']);

        // Add unread count to each student
        $students->each(function ($student) {
            $student->unreadCount = Message::whereRaw('CAST(student_id AS TEXT) = ?', [$student->id])
                ->whereNull('read_at')
                ->count();
        });

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
}