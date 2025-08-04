<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Events\MessageSent;

class MessageSendController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'sender_type' => 'required|in:student,admin',
            'student_id' => 'required|exists:users,id',
            'admin_id' => 'nullable|exists:users,id',
        ]);

        if ($validated['sender_type'] === 'student') {
            $validated['admin_id'] = null;
        }

        $newMessage = Message::create([
            'message' => $validated['message'],
            'sender_type' => $validated['sender_type'],
            'student_id' => $validated['student_id'],
            'admin_id' => $validated['admin_id'],
            'read_at' => null,
        ]);

        broadcast(new MessageSent($newMessage))->toOthers();

        return response()->json([
            'status' => 'Message sent',
            'message' => $newMessage,
        ]);
    }
}
