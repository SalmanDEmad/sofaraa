<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Video;
use Inertia\Inertia;

class StudentVideoController extends Controller
{
    public function index()
    {
        // Fetch all courses and all videos
        $courses = Course::select('id', 'name', 'image')->get();
        $videos = Video::select('id', 'title', 'youtube_link', 'course_id', 'description')->get();

        return Inertia::render('Student/Video', [
            'courses' => $courses,
            'videos' => $videos,
        ]);
    }
}
