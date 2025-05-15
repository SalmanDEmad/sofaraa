<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class SelectRoleController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function show(): Response
    {
        return Inertia::render('Auth/SelectRole');
    }

    /**
     * Update the user's profile information.
     */
    public function save(Request $request): RedirectResponse
    {
        if ($request->user()) {
            $request->user()->role = $request->role;
        }

        $request->user()->save();

        return Redirect::route('dashboard');
    }


}
