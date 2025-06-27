<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Core\VideoService;
use App\Http\Requests\StoreVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Models\Course;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoController extends Controller
{
    private VideoService $videoService;

    public function __construct()
    {
        $this->videoService = new VideoService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->guard()->user();

        switch ($user->role_id) {
            case User::ADMIN:
                return Inertia::render("Admin/Video/Video", [ // 💥 now correctly rendering Admin UI
                    'videos' => Video::with('course')->get(),
                    'courses' => Course::all(),
                ]);

            case User::TUTOR:
                $courses = Course::where("tutor_id", $user->id)->get();
                $courseIds = $courses->pluck('id');

                return Inertia::render("Tutor/Video/Video", [
                    'videos' => Video::with('course')->whereIn('course_id', $courseIds)->get(),
                    'courses' => $courses,
                ]);

            case User::STUDENT:
                return Inertia::render("Student/Video/IndexCourse", [
                    'courses' => Course::all(),
                ]);

            default:
                return Inertia::render("404");
        }
    }

    /**
     * Store a newly created video.
     */
    public function store(StoreVideoRequest $request)
    {
        Video::create([
            'title' => $request->title,
            'description' => $request->description,
            'youtube_link' => $request->youtube_link,
            'course_id' => $request->course_id,
        ]);

        return redirect()->back()->with('success', 'Video uploaded!');
    }

    /**
     * Remove the specified video.
     */
    public function destroy(Video $video)
    {
        $video->delete();
        return redirect()->back()->with('success', 'Video deleted!');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->guard()->user();

        switch ($user->role_id) {
            case User::ADMIN:
                return Inertia::render("Admin/Video/CreateVideo", [
                    "courses" => Course::all(),
                ]);

            case User::TUTOR:
                $courses = Course::where("tutor_id", $user->id)->get();
                return Inertia::render("Tutor/Video/CreateVideo", [
                    "courses" => $courses,
                ]);

            default:
                return Inertia::render("404");
        }
    }

    /**
     * Upload handler (if using custom service like Cloudflare, etc.)
     */
    public function upload()
    {
        $this->videoService->performUpload();
    }
}