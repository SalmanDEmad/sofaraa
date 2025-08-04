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
        // Fetch all students (role_id = 1) with unread message count
        $students = User::where('role_id', 1)
            ->withCount(['studentMessages as unreadCount' => function ($query) {
                $query->whereNull('read_at'); // works if your messages table has 'read_at'
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
}