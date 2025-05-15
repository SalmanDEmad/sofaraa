<?php

namespace App\Models;

use App\Models\Base\Language as BaseLanguage;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Language extends BaseLanguage
{
    use HasFactory;

    public $incrementing = true;

    protected $fillable = [
        'name'
    ];
}
