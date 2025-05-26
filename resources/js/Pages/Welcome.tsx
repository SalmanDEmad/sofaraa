import { Head, Link } from '@inertiajs/react';
import Header from '../Components/Header';
import PrimaryButton from '../Components/PrimaryButton';
import { User } from 'lucide-react';
import { useState } from 'react';

interface WelcomeProps {
  auth: any;
}

const courses = [
  {
    title: 'المنهجية العلمية',
    description: 'نؤمن بأهمية الفهم العميق والتحليل الرشيد.',
    bgImage: '/assets/course_img/1.png',
    tagColor: 'bg-blue-600',
  },
  {
    title: 'الاعتدال والوسطية',
    description: 'دعوة بلا غلو ولا تفريط.',
    bgImage: '/assets/course_img/2.png',
    tagColor: 'bg-yellow-700',
  },
  {
    title: 'القدوة والأخلاق',
    description: 'الدعوة بالحال قبل المقال.',
    bgImage: '/assets/course_img/3.png',
    tagColor: 'bg-red-600',
  },
  {
    title: 'الوعي المعاصر',
    description: 'فهم الواقع وتحدياته المتغيرة.',
    bgImage: '/assets/course_img/4.png',
    tagColor: 'bg-green-600',
  },
  {
    title: 'التأثير والتواصل',
    description: 'دعوة مؤثرة بلغة العصر.',
    bgImage: '/assets/course_img/5.png',
    tagColor: 'bg-emerald-600',
  },
];

export default function Welcome({ auth }: WelcomeProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <>
      <Head title="الوعي" />
      <Header activeLink="#home" userName={auth?.user?.name} />

      <main className="bg-white text-black pb-16">
        {/* Hero Section */}
      <section
        id="home"
        className="relative text-center pt-24 pb-48 px-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-vector/beige-islamic-geometric-pattern_363054-473.jpg?w=1800')",
        }}
      >
        <div className="text-center px-4" dir="rtl">
          <h1 className="text-4xl font-extrabold mb-2 text-[#4b2e24]">
            <span className="block">أكاديمية الوعي الدعوي</span>
            <span className="block bg-gradient-to-r from-[#d4af7f] to-[#5e3b1d] text-transparent bg-clip-text">
              تعلم أساسيات الإسلام
            </span>
          </h1>

          <p className="text-lg max-w-xl mx-auto mt-4 text-[#4b2e24]">
            ابدأ رحلتك في طلب المعرفة الإسلامية الأصيلة - بإشراف علمائنا الموثوقين، مجاناً ومتاحة للجميع من أي مكان.
          </p>

          <div className="mt-8">
            <PrimaryButton
              href="#courses"
              className="bg-[#a67c52] text-white hover:bg-[#8c6240]"
            >
              استكشف الدورات
            </PrimaryButton>
          </div>
        </div>

        {/* Floating Info Panel inside hero */}
        <div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 z-30 w-full px-4">
          <div className="bg-[rgba(255,255,255,0.9)] border border-[#e6dcc6] rounded-xl shadow-2xl max-w-6xl mx-auto px-6 py-6" dir="rtl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-center text-[#4b2e24]">
              <div>
                <p className="font-semibold text-lg">٤ فصول دراسية (سنتان)</p>
                <p className="text-sm text-[#7d6652]">مدة البرنامج</p>
              </div>
              <div>
                <p className="font-semibold text-lg">١٢ أسبوعًا</p>
                <p className="text-sm text-[#7d6652]">مدة الفصل الدراسي</p>
              </div>
              <div>
                <p className="font-semibold text-lg">مجاني</p>
                <p className="text-sm text-[#7d6652]">عن بُعد</p>
              </div>
              <div>
                <p className="font-semibold text-lg">١٥ ساعة</p>
                <p className="text-sm text-[#7d6652]">ساعات الأسبوع</p>
              </div>
              <div>
                <p className="font-semibold text-lg">٢٥ أغسطس</p>
                <p className="text-sm text-[#7d6652]">بداية الفصل القادم</p>
              </div>
              <div>
                <Link
                  href="/register"
                  className="inline-block bg-gradient-to-r from-[#caa76b] to-[#4b2e24] text-white font-semibold py-2 px-4 rounded-md shadow hover:opacity-90 transition"
                >
                  سجل الآن
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


{/* Courses Section */}  
        <section className="py-16 px-4 bg-white">
          <h2 className="text-3xl font-bold text-center mb-10 text-black">البرنامج</h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-gray-700">
            برنامج أكاديمية زاد يوفر سبعة مجالات علمية للمشاركين فيه لتعزيز فهمٍ صحيحٍ متدرّجٍ للإسلام مقتَرنٍ بالدلائل وأدوات عصرية وأساليب سهلة وممتع.
          </p>
          <div className="max-w-6xl mx-auto">
<div className="flex flex-col items-center space-y-12">
  {/* Top Row - 3 Cards */}
  <div className="flex gap-12">
    {courses.slice(0, 3).map(({ title, description, bgImage }, index) => (
      <div
        key={title}
        onMouseEnter={() => setHoverIndex(index)}
        onMouseLeave={() => setHoverIndex(null)}
        className={`relative w-60 h-36 rounded-xl border border-gray-200 shadow-md cursor-pointer overflow-hidden transition-transform duration-300 ${
          hoverIndex === index ? 'scale-105 shadow-xl text-white' : 'bg-white text-black'
        }`}
      >
        {hoverIndex === index && (
          <div
            className="absolute inset-0 bg-cover bg-center brightness-75"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center transition-colors duration-300">
          <div>
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            {hoverIndex === index && (
              <>
                <span className="inline-block mb-2 px-3 py-1 rounded-full text-sm font-semibold bg-white text-[#4b2e24]">
                  مادة
                </span>
                <p className="text-sm leading-relaxed">{description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Bottom Row - 2 Cards */}
  <div className="flex gap-12">
    {courses.slice(3, 5).map(({ title, description, bgImage }, index) => (
      <div
        key={title}
        onMouseEnter={() => setHoverIndex(index + 3)}
        onMouseLeave={() => setHoverIndex(null)}
        className={`relative w-60 h-36 rounded-xl border border-gray-200 shadow-md cursor-pointer overflow-hidden transition-transform duration-300 ${
          hoverIndex === index + 3 ? 'scale-105 shadow-xl text-white' : 'bg-white text-black'
        }`}
      >
        {hoverIndex === index + 3 && (
          <div
            className="absolute inset-0 bg-cover bg-center brightness-75"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        <div className="relative z-10 flex items-center justify-center h-full px-4 text-center transition-colors duration-300">
          <div>
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            {hoverIndex === index + 3 && (
              <>
                <span className="inline-block mb-2 px-3 py-1 rounded-full text-sm font-semibold bg-white text-[#4b2e24]">
                  مادة
                </span>
                <p className="text-sm leading-relaxed">{description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

          </div>
        </section> 

        {/* Media Highlights Section */}
        <section className="py-20 px-4 bg-white text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#4b2e24]">مقتطفات من برامجنا</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                platform: 'YouTube',
                label: 'خطبة دعوية ملهمة',
                thumb: '/assets/media/youtube_thumb.jpg',
                link: 'https://www.youtube.com/'
              },
              {
                platform: 'TikTok',
                label: 'رد سريع على شبهة',
                thumb: '/assets/media/tiktok_thumb.jpg',
                link: 'https://www.tiktok.com/'
              },
              {
                platform: 'Podcast',
                label: 'حوار دعوي مسموع',
                thumb: '/assets/media/podcast_thumb.jpg',
                link: 'https://open.spotify.com/'
              },
              {
                platform: 'Instagram',
                label: 'ملخص بصري لقيمة دعوية',
                thumb: '/assets/media/insta_thumb.jpg',
                link: 'https://www.instagram.com/'
              },
            ].map(({ platform, label, thumb, link }, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                className="block group border border-[#e6dcc6] rounded-xl overflow-hidden shadow hover:shadow-md transition"
              >
                <img src={thumb} alt={label} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-[#4b2e24] mb-1">{platform}</h4>
                  <p className="text-sm text-[#5c4633]">{label}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Scholars Section */}
        <section id="scholars" className="py-16 px-4 bg-[#f5eedc]">
          <h2 className="text-3xl font-bold text-center mb-10">Our Scholars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((id) => (
              <div key={id} className="bg-white p-6 rounded shadow border border-[#e6dcc6] text-center">
                <User className="mx-auto mb-4 text-[#a67c52]" size={48} />
                <h4 className="text-lg font-semibold">Sheikh Name {id}</h4>
                <p className="text-sm text-[#5c4633]">Specialized in Fiqh & Tafsir</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center py-16 px-4">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-6">
            Have a question or suggestion? We're happy to hear from you.
          </p>
          <PrimaryButton href="mailto:contact@alwaei-aldaawy.com" className="bg-[#a67c52] text-white hover:bg-[#8c6240]">
            Email Us
          </PrimaryButton>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#e6dcc6] text-[#4b2e24] text-center py-4 text-sm">
        © {new Date().getFullYear()} Alwaei Al Daawy. All rights reserved.
      </footer>
    </>
  );
}