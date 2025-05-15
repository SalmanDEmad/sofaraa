<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ParentsChild
 * 
 * @property int $id
 * @property string $parent_id
 * @property string $child_id
 * @property int|null $relation
 * @property int $status
 * 
 * @property User $parent
 * @property User $child
 *
 * @package App\Models\Base
 */
class ParentsChild extends Model
{
    protected $table = 'parents_children';
    public $timestamps = false;

    protected $casts = [
        'relation' => 'int',
        'status' => 'int'
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function child(): BelongsTo
    {
        return $this->belongsTo(User::class, 'child_id');
    }
}
