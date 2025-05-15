<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Review
 * 
 * @property string $id
 * @property int $stars
 * @property string $content
 * @property int $language_id
 * @property string $tutor_id
 * @property string $reviewed_by_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models\Base
 */
class Review extends Model
{
    protected $table = 'reviews';
    public $incrementing = false;

    protected $casts = [
        'stars' => 'int',
        'language_id' => 'int'
    ];
}
