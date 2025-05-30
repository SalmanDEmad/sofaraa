import { Link } from '@inertiajs/react'
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'

interface Blog {
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  read_time: number;
  image_url: string;
  author?: {
    name: string;
  };
}

interface Props {
  blogs: Blog[]
}

export default function Index({ blogs }: Props) {
  return (
    <main>
      <Header activeLink="#home" />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-right">الأخبار والتحديثات</h1>
        <div className="space-y-10">
          {blogs.map((blog) => (
            <div
              key={blog.slug}
              className="flex flex-col sm:flex-row items-start gap-6 border-b pb-6"
            >
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full sm:w-48 h-32 sm:h-32 object-cover rounded-xl"
              />

              <div className="flex-1">
                {/* Date and read time */}
                <div className="flex items-center text-sm text-gray-500 gap-3 mb-1">
                  <span>
                    {new Date(blog.published_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="bg-gray-200 text-xs px-2 py-0.5 rounded-full font-medium">
                    {blog.read_time} mins
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-semibold leading-snug mb-1">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="hover:underline text-gray-900"
                  >
                    {blog.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-gray-700 line-clamp-3">
                  {blog.excerpt}
                </p>
              </div>
              {/* Author Name */}
                <p className="text-sm text-gray-600 mt-1">
                By {blog.author?.name || 'Unknown'}
                </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}