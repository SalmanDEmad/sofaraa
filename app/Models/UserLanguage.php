<?php

namespace App\Models;

use App\Models\Base\UserLanguage as BaseUserLanguage;

class UserLanguage extends BaseUserLanguage
{
	protected $fillable = [
		'user_id',
		'subject_id'
	];
}
