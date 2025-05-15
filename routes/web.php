<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\SelectRoleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LivestreamController;
use App\Http\Controllers\MailingListController;
use App\Http\Controllers\VideoController;
use App\Http\Middleware\HasRole;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

if (config("app.mailing_only")) {
    Route::get("/", [MailingListController::class, "index"]);
    Route::post("/mailing-list", [MailingListController::class, "store"])->name("mailing-list.store");
    Route::fallback(function() { return redirect("/"); });
    return;
}



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth'])->group(function () {

    Route::resource('/dashboard', DashboardController::class);

    Route::resource('/profile', ProfileController::class)->only([
        'edit', 'update', 'destroy'
    ]);

    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/livestream', LivestreamController::class);
    Route::resource('/video', VideoController::class);


    // Route::resource('')

});


Route::get('/cart', function (Request $request) {
    $plan = $request->query('plan');

    // Fetch cart items based on the plan from the database
    $cartItems = []; // Replace with your actual data fetching logic
    switch ($plan) {
        case 'basic':
            $cartItems = [
                // Add items for the basic plan
            ];
            break;
        case 'standard':
            $cartItems = [
                // Add items for the standard plan
            ];
            break;
        case 'premium':
            $cartItems = [
                // Add items for the premium plan
            ];
            break;
        default:
            $cartItems = [];
            break;
    }

    return Inertia::render('Cart', [
        'plan' => $plan,
        'cartItems' => $cartItems
    ]);
})->middleware(['auth', 'verified'])->name('cart');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/upload', function () {
        return Inertia::render('Upload');
    })->name('upload');

});

Route::get('/about', function () {
    return Inertia::render('AboutUs');
})->name('about');

Route::get('/tutors', function () {
    return Inertia::render('Tutors');
})->name('tutors');

Route::get('/subjects', function () {
    return Inertia::render('Subjects');
})->name('subjects');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::fallback(function () {
    return Inertia::render('404');
});

require __DIR__.'/auth.php';
