<?php

namespace App\Http\Controllers;

use App\Core\LivestreamService;
use App\Http\Requests\StoreLivestreamRequest;
use App\Http\Requests\UpdateLivestreamRequest;
use App\Models\Livestream;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LivestreamController extends Controller
{
    private LivestreamService $livestreamService;

    function __construct() {
        $this->livestreamService = new LivestreamService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        switch($request->user()->role_id) {
            case User::ADMIN:
                return Inertia::render("Admin/Livestream/IndexLivestream");
            case User::TUTOR:
                return Inertia::render("Tutor/Livestream/IndexLivestream");
            case User::STUDENT:
                return Inertia::render("Tutor/Livestream/IndexLivestream");
            default:
                return Inertia::render("404");
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        switch(auth()->guard()->user()->role_id) {
            case User::ADMIN:
                return Inertia::render("Admin/Livestream/CreateLivestream");
            case User::TUTOR:
                return Inertia::render("Tutor/Livestream/CreateLivestream");
            default:
                return Inertia::render("404");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLivestreamRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Livestream $livestream)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Livestream $livestream)
    {

        if ($request->user()->id != $livestream->tutor_id) {
            return Inertia::render("404");
        }

        $render = "404";

        switch($request->user()->role_id) {
            case User::ADMIN:
               $render = "Admin/Livestream/EditLivestream";
            case User::TUTOR:
                $render = "Tutor/Livestream/CreateLivestream";
            default:
                return Inertia::render("404");
        }


        $additionalData = $this->livestreamService->additionalData();

        return Inertia::render($render, [
            "data" => $livestream,
            "additionalData" => $additionalData
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLivestreamRequest $request, Livestream $livestream)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Livestream $livestream)
    {
        //
    }
}
