<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\Subject;
use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Course
 * 
 * @property string $id
 * @property string $tutor_id
 * @property int|null $subject_id
 * @property string $name
 * @property string|null $description
 * @property int|null $price
 * @property int $status
 * 
 * @property User $tutor
 * @property Subject|null $subject
 * @property Collection|Video[] $videos
 *
 * @package App\Models\Base
 */
class Course extends Model
{
    protected $table = 'courses';
    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'subject_id' => 'int',
        'price' => 'int',
        'status' => 'int'
    ];

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }
}
