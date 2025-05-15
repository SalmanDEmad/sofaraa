<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Base\Subject as BaseSubject;
use Illuminate\Database\Eloquent\Builder;

class Subject extends BaseSubject
{
    use HasFactory;

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    public $timestamps = false;

    public function scopeActive(Builder $query, bool $yes = true): void {
        $query->where('is_active', $yes);
    }
}
