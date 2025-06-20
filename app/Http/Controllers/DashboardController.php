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
    $user = $request->user(); // Get the currently logged-in user

    switch ($user->role_id) {
        case User::ADMIN:
            return Inertia::render("Admin/Dashboard", [
                'user' => $user,
            ]);
        case User::TUTOR:
            return Inertia::render("Tutor/Dashboard", [
                'user' => $user,
            ]);
        case User::STUDENT:
            return Inertia::render("Student/Dashboard", [
                'user' => $user,
            ]);
        case User::PARENT:
            return Inertia::render("Parent/Dashboard", [
                'user' => $user,
            ]);
        default:
            abort(403); // or redirect to a default page
    }
}
}
