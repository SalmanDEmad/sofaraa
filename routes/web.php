<?php

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Controllers
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\SelectRoleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LivestreamController;
use App\Http\Controllers\MailingListController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PublicBlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Admin\CourseController as AdminCourseController;
use App\Http\Controllers\Admin\VideoController as AdminVideoController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\StudentVideoController;
use App\Http\Controllers\StudentMessageController;

// ----- MAILING ONLY MODE -----
if (config("app.mailing_only")) {
    Route::get("/", [MailingListController::class, "index"]);
    Route::post("/mailing-list", [MailingListController::class, "store"])->name("mailing-list.store");
    Route::fallback(fn() => redirect("/"));
    return;
}

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/about', fn() => Inertia::render('AboutUs'))->name('about');
Route::get('/tutors', fn() => Inertia::render('Tutors'))->name('tutors');
Route::get('/subjects', fn() => Inertia::render('Subjects'))->name('subjects');
Route::get('/contact', fn() => Inertia::render('Contact'))->name('contact');

// Public Blog
Route::get('blogs', [PublicBlogController::class, 'index'])->name('public.blog.index');
Route::get('blogs/{slug}', [PublicBlogController::class, 'show'])->name('public.blog.show');

// PDF Viewer
Route::get('/view-pdf/{filename}', function ($filename) {
    $encoded = rawurlencode($filename);
    $pdfUrl = asset("pdf/$encoded");
    return Inertia::render('PdfViewer', ['pdfUrl' => $pdfUrl]);
});

// 404 Fallback
Route::fallback(fn() => Inertia::render('404'));

/*
|--------------------------------------------------------------------------
| Authenticated User Routes (Students, Tutors, Admins)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () {
    // --- Student Messages (chat) ---
    Route::get('/student-messages/{student_id}', [StudentMessageController::class, 'index']);
    Route::post('/student-messages', [StudentMessageController::class, 'store']);

    // --- Dashboard & Profile ---
    Route::resource('/dashboard', DashboardController::class);

    // Profile (show/edit/update/destroy)
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- Course, Video, Blog (General/Student Facing) ---
    Route::resource('/livestream', LivestreamController::class);
    Route::resource('/courses', CategoryController::class); // Adjust if you want "CourseController" not "CategoryController"
    Route::resource('/video', VideoController::class);
    Route::resource('/blog', BlogController::class);

    // --- Student Specific Pages ---
    Route::get('/student/videos', [StudentVideoController::class, 'index'])->name('student.videos');
    Route::get('/progress', fn() => Inertia::render('Student/Progress'))->name('progress.index');
    Route::get('/quizzes', fn() => Inertia::render('Student/Quizzes'))->name('quizzes.index');

    // --- Cart (Authenticated & Verified) ---
    Route::get('/cart', function (Request $request) {
        $plan = $request->query('plan');
        return Inertia::render('Cart', [
            'plan' => $plan,
            'cartItems' => [], // Fill with logic as needed
        ]);
    })->middleware('verified')->name('cart');

    // --- File upload (students/tutors) ---
    Route::get('/upload', fn() => Inertia::render('Upload'))->name('upload');

    /*
    |--------------------------------------------------------------------------
    | Admin Routes (also under 'auth' middleware)
    |--------------------------------------------------------------------------
    */
    // Announcements
    Route::resource('/admin/announcements', AnnouncementController::class)->names('admin.announcements');
    Route::get('/announcements', [AnnouncementController::class, 'studentView'])->name('student.announcements');

    // Students management
    Route::get('/admin/students', [StudentController::class, 'index'])->name('admin.students.index');
    Route::delete('/admin/students/{id}', [StudentController::class, 'destroy'])->name('admin.students.destroy');
    Route::patch('/admin/students/{id}/toggle-ban', [StudentController::class, 'toggleBan'])->name('admin.students.toggle-ban');

    // Categories
    Route::get('/admin/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::delete('/admin/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    // Admin Courses & Videos (separate from general)
    Route::resource('/admin/courses', AdminCourseController::class)->names('admin.courses');
    Route::resource('/admin/videos', AdminVideoController::class)->names('admin.videos');
});

/*
|--------------------------------------------------------------------------
| Auth Scaffolding (login/register/etc)
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';