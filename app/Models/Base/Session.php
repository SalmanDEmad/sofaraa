<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Session
 * 
 * @property string $id
 * @property string|null $user_id
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property string $payload
 * @property int $last_activity
 * 
 * @property User|null $user
 *
 * @package App\Models\Base
 */
class Session extends Model
{
    protected $table = 'sessions';
    public $incrementing = false;
    public $timestamps = false;

    protected $casts = [
        'last_activity' => 'int'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
