<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Language
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|User[] $users_where_primary_language
 * @property Collection|Video[] $videos
 * @property Collection|User[] $users
 *
 * @package App\Models\Base
 */
class Language extends Model
{
    protected $table = 'languages';
    public $timestamps = false;

    public function users_where_primary_language(): HasMany
    {
        return $this->hasMany(User::class, 'primary_language_id');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_languages', 'subject_id')
                    ->withPivot('id');
    }
}
