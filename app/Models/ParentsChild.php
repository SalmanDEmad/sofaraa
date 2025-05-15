<?php

namespace App\Models;

use App\Models\Base\ParentsChild as BaseParentsChild;

class ParentsChild extends BaseParentsChild
{
	protected $fillable = [
		'parent_id',
		'child_id',
		'relation',
		'status'
	];
}
