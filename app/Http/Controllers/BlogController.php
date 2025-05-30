<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        switch ($user->role_id) {
            case User::ADMIN:
                $blogs = Blog::all();
                return Inertia::render("Admin/Blog/IndexBlog", [
                    "blogs" => $blogs
                ]);
            case User::TUTOR:
                $blogs = Blog::where("author_id", $user->id)->get();
                return Inertia::render("Tutor/Blog/IndexBlog", [
                    "blogs" => $blogs
                ]);
            default:
                return Inertia::render("404");
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();

        switch ($user->role_id) {
            case User::ADMIN:
                return Inertia::render("Admin/Blog/CreateBlog");
            case User::TUTOR:
                return Inertia::render("Tutor/Blog/CreateBlog");
            default:
                return Inertia::render("404");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogRequest $request)
    {
        $user = auth()->user();

        Blog::create([
            'title'         => $request->title,
            'slug'          => Str::slug($request->title) . '-' . uniqid(),
            'excerpt'       => $request->excerpt,
            'content'       => $request->content,
            'image_url'     => $request->image_url,
            'author_id'     => $user->id,
            'status'        => $request->status ?? 'draft',
            'published_at'  => $request->published_at,
            'read_time'     => $request->read_time,
            'is_featured'   => $request->is_featured ?? false,
        ]);

        return redirect()->route('blog.index')->with('success', 'Blog posted successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        return Inertia::render("Blog/EditBlog", [
            "blog" => $blog
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        $blog->update([
            'title'         => $request->title,
            'slug'          => Str::slug($request->title) . '-' . uniqid(),
            'excerpt'       => $request->excerpt,
            'content'       => $request->content,
            'image_url'     => $request->image_url,
            'status'        => $request->status,
            'published_at'  => $request->published_at,
            'read_time'     => $request->read_time,
            'is_featured'   => $request->is_featured,
        ]);

        return redirect()->route('blog.index')->with('success', 'Blog updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();

        return redirect()->route('blog.index')->with('success', 'Blog deleted.');
    }
}