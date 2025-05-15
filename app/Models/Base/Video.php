<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\Course;
use App\Models\Language;
use App\Models\Subject;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Video
 * 
 * @property string $id
 * @property string $tutor_id
 * @property int|null $subject_id
 * @property string|null $course_id
 * @property int|null $language_id
 * @property string|null $thumbnail
 * @property string $title
 * @property string|null $description
 * @property string|null $url
 * @property int $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User $tutor
 * @property Subject|null $subject
 * @property Course|null $course
 * @property Language|null $language
 *
 * @package App\Models\Base
 */
class Video extends Model
{
    protected $table = 'videos';
    public $incrementing = false;

    protected $casts = [
        'subject_id' => 'int',
        'language_id' => 'int',
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

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function language(): BelongsTo
    {
        return $this->belongsTo(Language::class);
    }
}
