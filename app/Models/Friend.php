<?php

namespace App\Models;

use App\Models\Base\Friend as BaseFriend;

class Friend extends BaseFriend
{
	protected $fillable = [
		'user_id',
		'friend_id',
		'status'
	];
}
