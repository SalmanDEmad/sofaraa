<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\Subject;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Livestream
 * 
 * @property string $id
 * @property string $tutor_id
 * @property int|null $subject_id
 * @property string|null $thumbnail
 * @property string $title
 * @property string|null $description
 * @property int|null $price
 * @property string|null $url
 * @property Carbon $stream_at
 * @property int $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User $tutor
 * @property Subject|null $subject
 *
 * @package App\Models\Base
 */
class Livestream extends Model
{
    protected $table = 'livestreams';
    public $incrementing = false;

    protected $casts = [
        'subject_id' => 'int',
        'price' => 'int',
        'stream_at' => 'datetime',
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
}
