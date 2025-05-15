<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\Course;
use App\Models\Friend;
use App\Models\Language;
use App\Models\Livestream;
use App\Models\ParentsChild;
use App\Models\Session;
use App\Models\Subject;
use App\Models\TutorFollower;
use App\Models\Video;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class User
 * 
 * @property string $id
 * @property int $role_id
 * @property string $name
 * @property int|null $gender
 * @property string|null $profile_image
 * @property int|null $primary_subject_id
 * @property int|null $primary_language_id
 * @property string|null $description
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Subject|null $primary_subject
 * @property Language|null $primary_language
 * @property Collection|Session[] $sessions
 * @property Collection|Subject[] $subjects_where_requested_by
 * @property Collection|Livestream[] $livestreams_where_tutor
 * @property Collection|Course[] $courses_where_tutor
 * @property Collection|Video[] $videos_where_tutor
 * @property Collection|Language[] $languages
 * @property Collection|ParentsChild[] $parents_children_where_parent
 * @property Collection|ParentsChild[] $parents_children_where_child
 * @property Collection|TutorFollower[] $tutor_followers_where_tutor
 * @property Collection|TutorFollower[] $tutor_followers_where_student
 * @property Collection|Friend[] $friends
 * @property Collection|Friend[] $friends_where_friend
 *
 * @package App\Models\Base
 */
class User extends \Illuminate\Foundation\Auth\User
{
    protected $table = 'users';
    public $incrementing = false;

    protected $casts = [
        'role_id' => 'int',
        'gender' => 'int',
        'primary_subject_id' => 'int',
        'primary_language_id' => 'int',
        'email_verified_at' => 'datetime'
    ];

    public function primary_subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class, 'primary_subject_id');
    }

    public function primary_language(): BelongsTo
    {
        return $this->belongsTo(Language::class, 'primary_language_id');
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(Session::class);
    }

    public function subjects_where_requested_by(): HasMany
    {
        return $this->hasMany(Subject::class, 'requested_by_id');
    }

    public function livestreams_where_tutor(): HasMany
    {
        return $this->hasMany(Livestream::class, 'tutor_id');
    }

    public function courses_where_tutor(): HasMany
    {
        return $this->hasMany(Course::class, 'tutor_id');
    }

    public function videos_where_tutor(): HasMany
    {
        return $this->hasMany(Video::class, 'tutor_id');
    }

    public function languages(): BelongsToMany
    {
        return $this->belongsToMany(Language::class, 'user_languages', 'user_id', 'subject_id')
                    ->withPivot('id');
    }

    public function parents_children_where_parent(): HasMany
    {
        return $this->hasMany(ParentsChild::class, 'parent_id');
    }

    public function parents_children_where_child(): HasMany
    {
        return $this->hasMany(ParentsChild::class, 'child_id');
    }

    public function tutor_followers_where_tutor(): HasMany
    {
        return $this->hasMany(TutorFollower::class, 'tutor_id');
    }

    public function tutor_followers_where_student(): HasMany
    {
        return $this->hasMany(TutorFollower::class, 'student_id');
    }

    public function friends(): HasMany
    {
        return $this->hasMany(Friend::class);
    }

    public function friends_where_friend(): HasMany
    {
        return $this->hasMany(Friend::class, 'friend_id');
    }
}
