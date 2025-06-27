<?php

namespace App\Models;

use App\Models\Base\Course as BaseCourse;
use Parables\Cuid\CuidAsPrimaryKey;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Category;

class Course extends BaseCourse
{
    use CuidAsPrimaryKey;

    protected $fillable = [
        'tutor_id',
        'subject_id',
        'name',
        'description',
        'price',
        'status',
        'semester',     // Add this if not present in BaseCourse
    ];

    // Define the relationship to Category
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
