<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        return Inertia::render('Tutor/Courses/Course', [
            'courses' => Course::with('category')->latest()->get(),
            'categories' => Category::all(),
            'semesters' => range(1, 8),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'semester'    => 'required|integer|between:1,8',
        ]);

        $validated['tutor_id'] = Auth::id();
        $validated['category_id'] = intval($validated['category_id']);
        $validated['semester'] = intval($validated['semester']);

        Course::create($validated);

        return redirect()->route('admin.courses.index')
                         ->with('success', 'تم إنشاء الدورة بنجاح');
    }

    public function edit($id)
    {
        return Inertia::render('Tutor/Courses/EditCourse', [
            'course'     => Course::findOrFail($id),
            'categories' => Category::all(),
            'semesters'  => range(1, 8),
        ]);
    }

    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'semester'    => 'required|integer|between:1,8',
        ]);

        $validated['category_id'] = intval($validated['category_id']);
        $validated['semester'] = intval($validated['semester']);

        $course->update($validated);

        return redirect()->route('admin.courses.index')
                         ->with('success', 'تم تحديث الدورة بنجاح');
    }

    public function destroy($id)
    {
        Course::findOrFail($id)->delete();

        return redirect()->route('admin.courses.index')
                         ->with('success', 'تم حذف الدورة بنجاح');
    }
}