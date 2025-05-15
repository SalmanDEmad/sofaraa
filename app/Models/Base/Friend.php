<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Friend
 * 
 * @property int $id
 * @property string $user_id
 * @property string $friend_id
 * @property int $status
 * 
 * @property User $user
 * @property User $friend
 *
 * @package App\Models\Base
 */
class Friend extends Model
{
    protected $table = 'friends';
    public $timestamps = false;

    protected $casts = [
        'status' => 'int'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function friend(): BelongsTo
    {
        return $this->belongsTo(User::class, 'friend_id');
    }
}
