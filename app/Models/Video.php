<?php

namespace App\Models;

use App\Models\Base\Video as BaseVideo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Parables\Cuid\CuidAsPrimaryKey;

class Video extends BaseVideo
{
    use HasFactory;
    use CuidAsPrimaryKey;

    // status
    final public const NO_VIDEO = 0; // only draft
    final public const UPLOADING = 1;
    final public const PROCESSING = 2;
    final public const FAILED = 3;
    final public const READY = 4;

    // visibility
    final public const PRIVATE = 0;
    final public const UNLISTED = 1;
    final public const PUBLIC = 2;

    /**
     * The "type" of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;
}
