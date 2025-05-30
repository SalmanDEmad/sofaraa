<?php

namespace App\Http\Controllers;

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

    function __construct()
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
                $courses = Course::all();
                return Inertia::render("Admin/Video/IndexCourse");
            case User::TUTOR:
                $courses = Course::where("tutor_id", $user->id)->get();
                return Inertia::render("Tutor/Video/IndexCourse", [
                    "courses" => $courses
                ]);
            case User::STUDENT:
                $courses = Course::all();
                return Inertia::render("Student/Video/IndexCourse");
            default:
                return Inertia::render("404");
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->guard()->user();

        $linkForUpload = $this->videoService->getSignedLinkForUpload();

        switch ($user->role_id) {
            case User::ADMIN:
                $courses = Course::all();
                return Inertia::render("Admin/Video/CreateVideo");
            case User::TUTOR:
                $courses = Course::where("tutor_id", $user->id)->get();
                return Inertia::render("Tutor/Video/CreateVideo", [
                    "courses" => $courses
                ]);
            default:
                return Inertia::render("404");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVideoRequest $request)
    {
        $user = auth()->guard()->user();

        switch ($user->role_id) {
            case User::ADMIN:
                $courses = Course::all();
                return Inertia::render("Admin/Video/IndexCourse");
            case User::TUTOR:
                $courses = Course::where("tutor_id", $user->id)->get();
                return Inertia::render("Tutor/Video/IndexCourse", [
                    "courses" => $courses
                ]);
            default:
                return Inertia::render("404");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVideoRequest $request, Video $video)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        //
    }

    /**
     * Upload the video using the service
     */
    public function upload()
    {
        $this->videoService->performUpload();
    }
}
