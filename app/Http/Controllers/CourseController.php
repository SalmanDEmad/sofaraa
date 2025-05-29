<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = [
            [
                'id' => 1,
                'title' => 'القدوة والأخلاق',
                'description' => 'مقدمة عن الأخلاق الإسلامية وتطبيقاتها.',
                'image' => 'https://picsum.photos/seed/1/300/180',
                'is_active' => true,
            ],
            [
                'id' => 2,
                'title' => 'الفقه للمبتدئين',
                'description' => 'شرح مبسط لأهم أبواب الفقه.',
                'image' => 'https://picsum.photos/seed/2/300/180',
                'is_active' => true,
            ],
            // ... add more as needed
        ];

        return Inertia::render('Tutor/Courses/Index', [
            'courses' => $courses
        ]);
    }

public function show($id)
{
    // Each course now contains chapters with episodes
    $courses = [
        [
            'id' => 1,
            'title' => 'القدوة والأخلاق',
            'description' => 'مقدمة عن الأخلاق الإسلامية وتطبيقاتها.',
            'image' => 'https://picsum.photos/seed/1/300/180',
            'is_active' => true,
            'chapters' => [
                [
                    'id' => 1,
                    'title' => 'مقدمة عن الأخلاق',
                    'episodes' => [
                        ['title' => 'الحلقة ١', 'video' => 'https://customer-oqyikqxugvwgs240.cloudflarestream.com/8224be91c774fcbd9fb853043f6c2a64/manifest/video.m3u8'],
                        ['title' => 'الحلقة ٢', 'video' => 'https://customer-oqyikqxugvwgs240.cloudflarestream.com/b5c6caf49f2fa93a0143c5f10dfc7fd2/manifest/video.m3u8'],
                    ]
                ],
                [
                    'id' => 2,
                    'title' => 'نماذج من القدوة',
                    'episodes' => [
                        ['title' => 'الحلقة ٣', 'video' => 'https://www.youtube.com/watch?v=YHkFhN4xTdc'],
                        ['title' => 'الحلقة ٤', 'video' => 'https://www.youtube.com/watch?v=YHkFhN4xTdc'],
                    ]
                ],
            ],
        ],
        [
            'id' => 2,
            'title' => 'الفقه للمبتدئين',
            'description' => 'شرح مبسط لأهم أبواب الفقه.',
            'image' => 'https://picsum.photos/seed/2/300/180',
            'is_active' => true,
            'chapters' => [
                [
                    'id' => 1,
                    'title' => 'الطهارة والصلاة',
                    'episodes' => [
                        ['title' => 'الحلقة ١', 'video' => 'https://www.youtube.com/watch?v=YHkFhN4xTdc'],
                        ['title' => 'الحلقة ٢', 'video' => 'https://www.youtube.com/watch?v=YHkFhN4xTdc'],
                    ]
                ],
                // ...more chapters
            ],
        ],
        // ... add more courses
    ];

    $course = collect($courses)->firstWhere('id', (int)$id);

    if (!$course) {
        abort(404);
    }

    return Inertia::render('Tutor/Courses/Show', [
        'course' => $course
    ]);
}
}
