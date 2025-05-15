<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Base\User as BaseUser;
use Illuminate\Notifications\Notifiable;
use Parables\Cuid\CuidAsPrimaryKey;

class User extends BaseUser
{
    use HasFactory, Notifiable;
    use CuidAsPrimaryKey;

    /**
     * The "type" of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    protected $with = ['primary_subject'];

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
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

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
