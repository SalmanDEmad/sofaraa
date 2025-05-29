<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Allow all authenticated users for now
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:blogs,slug',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'image_url' => 'nullable|url',
            'status' => 'in:draft,published,archived',
            'published_at' => 'nullable|date',
            'read_time' => 'nullable|integer|min:1',
            'is_featured' => 'boolean',
        ];
    }
}
