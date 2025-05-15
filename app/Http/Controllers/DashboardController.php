<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLivestreamRequest;
use App\Http\Requests\UpdateLivestreamRequest;
use App\Models\Livestream;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        switch($request->user()->role_id) {
            case User::ADMIN:
                return Inertia::render("Admin/Dashboard");
            case User::TUTOR:
                return Inertia::render("Tutor/Dashboard");
            case User::STUDENT:
                return Inertia::render("Student/Dashboard");
            case User::PARENT:
                return Inertia::render("Parent/Dashboard");
        }
    }

}
