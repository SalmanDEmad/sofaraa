<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class TutorFollower
 * 
 * @property int $id
 * @property string $tutor_id
 * @property string $student_id
 * @property int $status
 * 
 * @property User $tutor
 * @property User $student
 *
 * @package App\Models\Base
 */
class TutorFollower extends Model
{
    protected $table = 'tutor_followers';
    public $timestamps = false;

    protected $casts = [
        'status' => 'int'
    ];

    public function tutor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
