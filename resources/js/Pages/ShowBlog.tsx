// resources/js/Pages/Blog/ShowBlog.tsx

import { PageProps } from '@/types'
import { Head } from '@inertiajs/react'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'

type Blog = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  author_id: string
  status: string
  published_at: string
  read_time: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

interface Props extends PageProps {
  blog: Blog
}

export default function ShowBlog({ blog }: Props) {
  return (
    <main>
      <Head title={blog.title} />
      <Header activeLink="#blogs" />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">{blog.title}</h1>

        {blog.image_url && (
          <img
            src={blog.image_url}
            alt={blog.title}
            className="rounded-xl max-h-[500px] w-full object-cover"
          />
        )}

        <div className="text-sm text-gray-500">
          Published on {new Date(blog.published_at).toLocaleDateString()} • {blog.read_time} min read
        </div>

        <div className="prose max-w-none">
          <p>{blog.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
      <Footer />
    </main>
  )
}