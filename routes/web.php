<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\SelectRoleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LivestreamController;
use App\Http\Controllers\MailingListController;
use App\Http\Controllers\Admin\VideoController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PublicBlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Middleware\HasRole;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\StudentVideoController;
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

    Route::resource('/profile', ProfileController::class)->only(['edit', 'update', 'destroy']);

    Route::resource('/livestream', LivestreamController::class);
    Route::resource('/courses', CourseController::class);
    Route::resource('/video', VideoController::class);
    Route::resource('/blog', BlogController::class);

    Route::get('/student/videos', [StudentVideoController::class, 'index'])->name('student.videos');

    Route::resource('/admin/announcements', AnnouncementController::class)->names('admin.announcements');
    Route::get('/announcements', [AnnouncementController::class, 'studentView'])->name('student.announcements');

    Route::get('/admin/students', [StudentController::class, 'index'])->name('admin.students.index');
    Route::delete('/admin/students/{id}', [StudentController::class, 'destroy'])->name('admin.students.destroy');
    Route::patch('/admin/students/{id}/toggle-ban', [StudentController::class, 'toggleBan'])->name('admin.students.toggle-ban');

    Route::get('/admin/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::delete('/admin/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');


    Route::resource('/admin/courses', \App\Http\Controllers\Admin\CourseController::class)->names('admin.courses');
    Route::resource('/admin/videos', \App\Http\Controllers\Admin\VideoController::class)->names('admin.videos');
    Route::resource('/admin/videos', VideoController::class)->names('admin.videos');
});

Route::get('/view-pdf/{filename}', function ($filename) {
    $encoded = rawurlencode($filename);
    $pdfUrl = asset("pdf/$encoded");

    return Inertia::render('PdfViewer', [
        'pdfUrl' => $pdfUrl,
    ]);
});

Route::get('/progress', function () {
    return Inertia::render('Student/Progress');
})->middleware(['auth'])->name('progress.index');

Route::get('/quizzes', function () {
    return Inertia::render('Student/Quizzes');
})->middleware(['auth'])->name('quizzes.index');

Route::get('blogs', [PublicBlogController::class, 'index'])->name('public.blog.index');
Route::get('blogs/{slug}', [PublicBlogController::class, 'show'])->name('public.blog.show');

Route::get('/cart', function (Request $request) {
    $plan = $request->query('plan');
    $cartItems = [];
    switch ($plan) {
        case 'basic':
            $cartItems = [];
            break;
        case 'standard':
            $cartItems = [];
            break;
        case 'premium':
            $cartItems = [];
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