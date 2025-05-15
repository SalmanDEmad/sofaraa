<?php

namespace App\Models;

use App\Models\Base\Course as BaseCourse;
use Parables\Cuid\CuidAsPrimaryKey;

class Course extends BaseCourse
{
    use CuidAsPrimaryKey;

    protected $fillable = [
        'tutor_id',
        'subject_id',
        'name',
        'description',
        'price',
        'status'
    ];
}
