<?php

namespace App\Models;

use App\Models\Base\Review as BaseReview;

class Review extends BaseReview
{
	protected $fillable = [
		'stars',
		'content',
		'language_id',
		'tutor_id',
		'reviewed_by_id'
	];
}
