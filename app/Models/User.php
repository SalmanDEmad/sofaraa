<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Base\User as BaseUser;
use Illuminate\Notifications\Notifiable;
use Parables\Cuid\CuidAsPrimaryKey;
use App\Models\Message; // Add this line

class User extends BaseUser
{
    use HasFactory, Notifiable;
    use CuidAsPrimaryKey;

    protected $keyType = 'string';
    protected $with = ['primary_subject'];
    public $incrementing = false;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // role
    final public const STUDENT = 1;
    final public const TUTOR = 2;
    final public const PARENT = 3;
    final public const ADMIN = 4;

    // gender
    final public const MALE = 1;
    final public const FEMALE = 2;

    public function hasRole(int $role) {
        if ($this->role == null) return false;
        return $this->role == $this::ADMIN || $this->role == $role;
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // 👇 Add this relationship
    public function messages()
    {
        return $this->hasMany(Message::class, 'user_id');
    }

    public function studentMessages()
{
    return $this->hasMany(\App\Models\Message::class, 'student_id');
}

}
