<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'message',
        'sender_type',
        'student_id',
        'admin_id',
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}
