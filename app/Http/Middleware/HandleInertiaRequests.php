<?php

namespace App\Http\Middleware;

use App\Models\Language;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $languages = Language::get();
        $subjects = Subject::active()->get();
        $user = $request->user();

        $primary_subject = null;

        if ($user != null) {
            $request->user()->load([
                'primary_subject', 'primary_language'
            ]);
        }

        return [
            ...parent::share($request),
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'info' => fn() => $request->session()->get('info'),
                'warning' => fn() => $request->session()->get('warning'),
                'error' => fn() => $request->session()->get('error'),
            ],
            'auth' => [
                'user' => $user
            ],
            'meta' => [
                'languages' => $languages,
                'subjects' => $subjects
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
