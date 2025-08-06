<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Message;
use Illuminate\Support\Facades\DB;

class StudentMessageController extends Controller
{
    public function index()
    {
        // SOLUTION 1: Manual approach avoiding the relationship entirely
        $students = User::where('role_id', 1)
            ->select('id', 'name')
            ->get();

        // Manually add unread count to each student
        foreach ($students as $student) {
            $student->unreadCount = DB::table('messages')
                ->where('student_id', '=', $student->id)
                ->whereNull('read_at')
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

    // SOLUTION 2: Using raw SQL with explicit casting
    public function indexRaw()
    {
        $students = DB::select("
            SELECT 
                u.id,
                u.name,
                COALESCE(
                    (SELECT COUNT(*) 
                     FROM messages m 
                     WHERE CAST(m.student_id AS TEXT) = CAST(u.id AS TEXT) 
                     AND m.read_at IS NULL), 
                    0
                ) as unreadcount
            FROM users u 
            WHERE u.role_id = 1
        ");

        // Convert to collection for consistency
        $students = collect($students);

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

    // SOLUTION 3: Using Query Builder with proper joins
    public function indexWithJoin()
    {
        $students = DB::table('users')
            ->select('users.id', 'users.name')
            ->selectSub(function ($query) {
                $query->from('messages')
                    ->whereColumn(DB::raw('CAST(messages.student_id AS TEXT)'), DB::raw('CAST(users.id AS TEXT)'))
                    ->whereNull('messages.read_at')
                    ->selectRaw('COUNT(*)');
            }, 'unreadCount')
            ->where('users.role_id', 1)
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

    // DEBUGGING METHOD: Check your column types
    public function debugColumnTypes()
    {
        // Check the actual column types
        $userIdType = DB::select("
            SELECT data_type, character_maximum_length 
            FROM information_schema.columns 
            WHERE table_name = 'users' AND column_name = 'id'
        ");

        $messageStudentIdType = DB::select("
            SELECT data_type, character_maximum_length 
            FROM information_schema.columns 
            WHERE table_name = 'messages' AND column_name = 'student_id'
        ");

        return response()->json([
            'users.id' => $userIdType,
            'messages.student_id' => $messageStudentIdType,
            'sample_user_ids' => User::limit(3)->pluck('id'),
            'sample_message_student_ids' => Message::limit(3)->pluck('student_id')
        ]);
    }
}