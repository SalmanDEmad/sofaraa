<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\Course;
use App\Models\Livestream;
use App\Models\User;
use App\Models\Video;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Subject
 * 
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $image
 * @property bool $is_active
 * @property string|null $requested_by_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User|null $requested_by
 * @property Collection|User[] $users_where_primary_subject
 * @property Collection|Livestream[] $livestreams
 * @property Collection|Course[] $courses
 * @property Collection|Video[] $videos
 *
 * @package App\Models\Base
 */
class Subject extends Model
{
    protected $table = 'subjects';

    protected $casts = [
        'is_active' => 'bool'
    ];

    public function requested_by(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by_id');
    }

    public function users_where_primary_subject(): HasMany
    {
        return $this->hasMany(User::class, 'primary_subject_id');
    }

    public function livestreams(): HasMany
    {
        return $this->hasMany(Livestream::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }
}
