<?php

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ─── Core Controllers ─────────────────────────────────────────────────────────
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\SelectRoleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LivestreamController;
use App\Http\Controllers\MailingListController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PublicBlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\VideoController;

// ─── Admin Controllers ────────────────────────────────────────────────────────
use App\Http\Controllers\Admin\CourseController as AdminCourseController;
use App\Http\Controllers\Admin\VideoController as AdminVideoController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\StudentMessageController;
use App\Http\Controllers\Admin\MessageSendController;

// ─── Student Chat Controllers ─────────────────────────────────────────────────
use App\Http\Controllers\Student\MessageController;
use App\Http\Controllers\Student\MessagesPageController;
use App\Http\Controllers\StudentChatPageController;

// ─── Misc ─────────────────────────────────────────────────────────────────────
use App\Http\Controllers\StudentVideoController;
use App\Events\SomethingHappened;

// ──────────────────────────────────────────────────────────────────────────────
// MAILING-ONLY MODE
// ──────────────────────────────────────────────────────────────────────────────

if (config("app.mailing_only")) {
    Route::get("/", [MailingListController::class, "index"]);
    Route::post("/mailing-list", [MailingListController::class, "store"])->name("mailing-list.store");
    Route::fallback(fn() => redirect("/"));
    return;
}

// ──────────────────────────────────────────────────────────────────────────────
/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/test-broadcast', function () {
    broadcast(new SomethingHappened());
    return 'Broadcast sent!';
});

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

// 404 fallback
Route::fallback(fn() => Inertia::render('404'));

// ──────────────────────────────────────────────────────────────────────────────
/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Student Chat Routes
    |--------------------------------------------------------------------------
    */
    Route::get('/student/messages', [StudentChatPageController::class, 'index'])
        ->name('student.messages');


    Route::post('/student/messages/send', [MessageSendController::class, 'store'])->name('student.messages.send');


    /*
    |--------------------------------------------------------------------------
    | Student Routes
    |--------------------------------------------------------------------------
    */
    Route::get('/student/videos', [StudentVideoController::class, 'index'])->name('student.videos');
    Route::get('/progress', fn() => Inertia::render('Student/Progress'))->name('progress.index');
    Route::get('/quizzes', fn() => Inertia::render('Student/Quizzes'))->name('quizzes.index');

    /*
    |--------------------------------------------------------------------------
    | Profile & Dashboard
    |--------------------------------------------------------------------------
    */
    Route::resource('/dashboard', DashboardController::class);
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /*
    |--------------------------------------------------------------------------
    | General Content (Video, Courses, Blog)
    |--------------------------------------------------------------------------
    */
    Route::resource('/livestream', LivestreamController::class);
    Route::resource('/courses', CategoryController::class);
    Route::resource('/video', VideoController::class);
    Route::resource('/blog', BlogController::class);

    Route::get('/upload', fn() => Inertia::render('Upload'))->name('upload');

    /*
    |--------------------------------------------------------------------------
    | Cart
    |--------------------------------------------------------------------------
    */
    Route::get('/cart', function (Request $request) {
        return Inertia::render('Cart', [
            'plan' => $request->query('plan'),
            'cartItems' => [], // Placeholder
        ]);
    })->middleware('verified')->name('cart');

    /*
    |--------------------------------------------------------------------------
    | Admin Routes
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')->name('admin.')->group(function () {
        // Announcements
        Route::get('/announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
        Route::get('/students', [StudentController::class, 'index'])->name('students.index');
        Route::delete('/students/{id}', [StudentController::class, 'destroy'])->name('students.destroy');
        Route::patch('/students/{id}/toggle-ban', [StudentController::class, 'toggleBan'])->name('students.toggle-ban');

        // Admin Messaging
        Route::get('/messages/{student?}', [StudentMessageController::class, 'index'])->name('messages');

        // Admin Category
        Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');

        // Admin Courses & Videos
        Route::resource('/courses', AdminCourseController::class);
        Route::resource('/videos', AdminVideoController::class);
    });

    // Admin message sending (non-prefixed)
    Route::post('/messages/send', [MessageSendController::class, 'store'])->name('messages.send');

    /*
    |--------------------------------------------------------------------------
    | Shared Routes
    |--------------------------------------------------------------------------
    */
    Route::get('/announcements', [AnnouncementController::class, 'studentView'])->name('student.announcements');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
});

// ──────────────────────────────────────────────────────────────────────────────
/*
|--------------------------------------------------------------------------
| Auth Scaffolding
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';