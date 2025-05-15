<?php

namespace App\Models;

use App\Models\Base\TutorFollower as BaseTutorFollower;

class TutorFollower extends BaseTutorFollower
{
	protected $fillable = [
		'tutor_id',
		'student_id',
		'status'
	];
}
