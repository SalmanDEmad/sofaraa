<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\Language;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class UserLanguage
 * 
 * @property int $id
 * @property string $user_id
 * @property int $subject_id
 * 
 * @property User $user
 * @property Language $subject
 *
 * @package App\Models\Base
 */
class UserLanguage extends Model
{
    protected $table = 'user_languages';
    public $timestamps = false;

    protected $casts = [
        'subject_id' => 'int'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Language::class, 'subject_id');
    }
}
