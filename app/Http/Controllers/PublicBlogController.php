<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicBlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::where('status', 'published')
            ->latest('published_at')
            ->with('author:id,name') // Load only author's name
            ->get(['id', 'title', 'slug', 'excerpt', 'published_at', 'read_time', 'image_url', 'author_id']);
            
            

        return Inertia::render('PublicBlog/Index', [
            'blogs' => $blogs
        ]);
    }

    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)
            ->where('status', 'published')
            ->with('author')
            ->firstOrFail();

        return Inertia::render('ShowBlog', [
            'blog' => $blog
        ]);
    }
}