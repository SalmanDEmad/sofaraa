<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the announcements.
     */
    public function index()
    {
        $announcements = Announcement::orderByDesc('is_pinned')
            ->orderByDesc('announced_at')
            ->get();

        return Inertia::render('Tutor/Announcements', [
            'announcements' => $announcements,
        ]);
    }

    /**
     * Display announcements for students.
     */
    public function studentView()
    {
        $pinned = Announcement::where('is_pinned', true)
                    ->orderByDesc('announced_at')
                    ->take(4)
                    ->get();

        $unpinned = Announcement::where('is_pinned', false)
                    ->orderByDesc('announced_at')
                    ->get();

        return Inertia::render('Student/Announcements', [
            'pinned' => $pinned,
            'unpinned' => $unpinned,
        ]);
    }

    /**
     * Show the form for creating a new announcement.
     */
    public function create()
    {
        return Inertia::render('Admin/CreateAnnouncement');
    }

    /**
     * Store a newly created announcement in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_pinned' => 'boolean',
            'announced_at' => 'nullable|date',
        ]);

        $validated['announced_at'] = $validated['announced_at'] ?? now();

        Announcement::create($validated);

        return redirect()->route('admin.announcements.index')
                         ->with('success', 'تم نشر الإعلان بنجاح.');
    }

    /**
     * Show the form for editing the specified announcement.
     */
    public function edit(Announcement $announcement)
    {
        return Inertia::render('Admin/EditAnnouncement', [
            'announcement' => $announcement,
        ]);
    }

    /**
     * Update the specified announcement in storage.
     */
    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_pinned' => 'boolean',
            'announced_at' => 'nullable|date',
        ]);

        $announcement->update($validated);

        return redirect()->route('admin.announcements.index')
                         ->with('success', 'تم تحديث الإعلان بنجاح.');
    }

    /**
     * Remove the specified announcement from storage.
     */
    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return redirect()->route('admin.announcements.index')
                         ->with('success', 'تم حذف الإعلان.');
    }
}