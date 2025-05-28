import { Head, Link } from '@inertiajs/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import PrimaryButton from '../Components/PrimaryButton';
import { User } from 'lucide-react';
import { useState } from 'react';

/*  …inside your component  */
const [hoverIndex, setHoverIndex]   = useState<number | null>(null)   // desktop
const [activeIndex, setActiveIndex] = useState<number | null>(null)   // touch

/* helper */
const isOpen = (idx: number) =>
  idx === hoverIndex || idx === activeIndex

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
          /*  base → phone & iPad  |  lg → desktop */
          className="
            relative text-center pt-24 pb-48 px-4
            bg-cover bg-center
            bg-[url('/assets/img/Welcome/hero_ipad.png')]   /* phones + iPad   */
            lg:bg-[url('/assets/img/Welcome/hero.png')]     /* desktop ≥1024px */
          "
          dir="rtl"
        >
          <h1 className="text-4xl font-extrabold mb-2 text-[#4b2e24]">
            <span className="block">أكاديمية الوعي الدعوي</span>
            <span className="block bg-gradient-to-r from-[#d4af7f] to-[#5e3b1d] text-transparent bg-clip-text">
              تعلم أساسيات الإسلام
            </span>
          </h1>

          <p className="text-lg max-w-xl mx-auto mt-4 text-[#4b2e24]">
            ابدأ رحلتك في طلب المعرفة الإسلامية الأصيلة – بإشراف علمائنا الموثوقين،
            مجاناً ومتاحة للجميع من أي مكان.
          </p>

          <div className="mt-8">
            <PrimaryButton
              href="#courses"
              className="bg-[#a67c52] text-white hover:bg-[#8c6240]"
            >
              استكشف الدورات
            </PrimaryButton>
          </div>
        </section>

        <section className="relative py-16 px-4">
          {/* Floating Info Panel */}
          <div
            className="
              absolute left-1/2 top-0
              transform -translate-x-1/2 -mt-12
              z-30 w-full px-4
            "
          >
            <div
              className="
                bg-[rgba(255,255,255,0.9)]
                border border-[#e6dcc6]
                rounded-xl shadow-2xl
                max-w-6xl mx-auto px-6 py-6
              "
              dir="rtl"
            >
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
                    className="
                      inline-block
                      bg-gradient-to-r from-[#caa76b] to-[#4b2e24]
                      text-white font-semibold
                      py-2 px-4 rounded-md shadow
                      hover:opacity-90 transition
                    "
                  >
                    سجل الآن
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section (one card per row on phone/iPad, three-per-row on desktop) */}
        <section
          id="courses"
          className="relative py-20 sm:py-5 px-6 bg-white mt-56 md:mt-0"
        >
          {/* Title & intro … */}
          <h2 className="text-4xl font-bold text-center mb-12 text-black">البرنامج</h2>
          <p className="text-center max-w-4xl mx-auto mb-16 text-lg text-gray-700">
            برنامج أكاديمية الوعي الدعوي يوفر سبعة مجالات علمية للمشاركين فيه لتعزيز فهمٍ صحيحٍ
            متدرّجٍ للإسلام مقتَرنٍ بالدلائل وأدوات عصرية وأساليب سهلة وممتعة.
          </p>

          {/* One column on small / three on desktop */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
            {courses.map(({ title, description, bgImage }, idx) => (
              <div
                key={idx}
                /* ▸ desktop: open on hover ▸ touch: toggle on click */
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() =>
                  setActiveIndex((prev) => (prev === idx ? null : idx))
                }
                className={`relative lg:w-72 w-full h-48 rounded-2xl border border-gray-200
                            shadow-lg cursor-pointer overflow-hidden transition-transform
                            duration-300 ${isOpen(idx) ? 'scale-105 lg:text-white' : 'bg-white text-black'}`}
              >
                {/* background image — shown when card is open on ANY device */}
                {isOpen(idx) && (
                  <div
                    className="absolute inset-0 bg-cover bg-center brightness-75"
                    style={{ backgroundImage: `url(${bgImage})` }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center justify-center h-full
                                px-6 text-center transition-colors duration-300">
                  <h3 className="text-2xl font-bold mb-2">{title}</h3>

                  {/* details: always visible on touch, only while open on desktop */}
                  <div className={isOpen(idx) || !window.matchMedia('(hover: hover)').matches
                    ? 'block'
                    : 'hidden lg:block'}>
                    <span className="inline-block mb-4 px-4 py-2 rounded-full text-base
                                    font-semibold bg-white text-[#4b2e24]">
                      مادة
                    </span>
                    <p className="text-base leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            ))}
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

{/* Responsive Call-to-Action Section */}
<section
  className="bg-cover bg-top sm:bg-center bg-no-repeat text-white"
  style={{
    backgroundImage: "url('https://en.shafaqna.com/wp-content/uploads/2019/10/Iraqi_students_receive_school_supplies_061031-F-9085B-140.jpg')",
  }}
>
  <div className="bg-black bg-opacity-60 min-h-[300px] sm:min-h-[500px] flex flex-col md:flex-row justify-center md:justify-between items-center px-4 sm:px-8 py-12 sm:py-16">
    {/* Text Content */}
    <div className="w-full md:w-1/2 text-center md:text-right">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 leading-tight">
        لا يجب أن يكون الوصول إلى العلم الشرعي ترفًا
      </h1>

      <p className="mb-6 text-base sm:text-lg leading-relaxed">
        ساهم في تعليم ١٢ طالبًا من طالبي العلم مجانًا من خلال دوراتنا مقابل دولار واحد فقط يوميًا.
      </p>

      <div className="inline-flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
        <a
          href="/donate"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded"
        >
          كن متبرعًا شهريًا
        </a>
        <a
          href="/zakat"
          className="bg-white text-gray-900 font-medium px-4 py-2 sm:px-6 sm:py-3 rounded"
        >
          أدفع زكاتك وصدقتك
        </a>
      </div>
    </div>
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
      <Footer />
    </>
  );
}