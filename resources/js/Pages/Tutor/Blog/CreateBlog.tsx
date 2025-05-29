import { useForm, router } from '@inertiajs/react';
import React from 'react';

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  read_time: number | '';
  is_featured: boolean;
}

export default function CreateBlog() {
  const { data, setData, post, processing, errors } = useForm<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    status: 'draft',
    published_at: '',
    read_time: '',
    is_featured: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('blog.store'), {
      onSuccess: () => router.visit(route('blog.index')),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post a Blog</h1>

      <input
        type="text"
        value={data.title}
        onChange={(e) => setData('title', e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

      <textarea
        value={data.content}
        onChange={(e) => setData('content', e.target.value)}
        placeholder="Content"
        className="w-full p-2 border rounded"
        rows={6}
      />
      {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}

      <textarea
        value={data.excerpt}
        onChange={(e) => setData('excerpt', e.target.value)}
        placeholder="Short excerpt (optional)"
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        value={data.image_url}
        onChange={(e) => setData('image_url', e.target.value)}
        placeholder="Image URL"
        className="w-full p-2 border rounded"
      />

      <select
        value={data.status}
        onChange={(e) => setData('status', e.target.value as BlogFormData['status'])}
        className="w-full p-2 border rounded"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>

      <input
        type="datetime-local"
        value={data.published_at}
        onChange={(e) => setData('published_at', e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        value={data.read_time}
        onChange={(e) => setData('read_time', Number(e.target.value))}
        placeholder="Estimated read time (mins)"
        className="w-full p-2 border rounded"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.is_featured}
          onChange={(e) => setData('is_featured', e.target.checked)}
        />
        Feature this post
      </label>

      <button
        type="submit"
        disabled={processing}
        className="bg-[#a67c52] hover:bg-[#855d3e] text-white py-2 px-6 rounded"
      >
        {processing ? 'Posting...' : 'Post Blog'}
      </button>
    </form>
  );
}