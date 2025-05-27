<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request): RedirectResponse
    {

        $data = $request->validated();

        $role_id = $data["userType"] == "student" ? User::STUDENT : User::TUTOR;

        $user = User::create([
            'name' => $data["name"],
            'email' => $data["email"],
            'password' => Hash::make($request->password),
        ]);

        // we do this separately because role_id is not a fillable property
        $user->role_id = $role_id;

        $user->save();

        event(new Registered($user));

        Auth::login($user);

    return redirect()->route('dashboard.index');
    }
}
