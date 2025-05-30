<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image_url',
        'author_id',
        'status',
        'published_at',
        'read_time',
        'is_featured',
    ];

        public function author()
        {
            return $this->belongsTo(User::class, 'author_id');
        }

}

