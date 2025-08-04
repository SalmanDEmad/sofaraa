<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class StudentChatPageController extends Controller
{
    public function index()
    {
        $studentId = Auth::id(); // current logged in student

        $messages = Message::where('student_id', $studentId)
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('Student/Messages', [
            'messages' => $messages,
            'studentId' => $studentId,  // pass studentId to frontend
        ]);
    }
}