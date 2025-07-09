import { Head, Link } from '@inertiajs/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import PrimaryButton from '../Components/PrimaryButton';
import { useState } from 'react';

import {
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Send,
} from 'lucide-react';

// Custom TikTok SVG icon
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    className={props.className}
    {...props}
  >
    <path d="M27.88 9.42a6.11 6.11 0 0 1-3.33-1c-.17-.1-.35-.23-.5-.34V20a7.13 7.13 0 1 1-7.1-7.1V16.7a3.29 3.29 0 1 0 3.29 3.29V2h3.23c.08 2.23 1.65 4.1 3.89 4.5v2.92z"/>
  </svg>
);

const courses = [
  {
    title: 'المنهجية العلمية',
    description: 'نؤمن بأهمية الفهم العميق والتحليل الرشيد.',
    bgImage: '/assets/course_img/1.png',
  },
  {
    title: 'الاعتدال والوسطية',
    description: 'دعوة بلا غلو ولا تفريط.',
    bgImage: '/assets/course_img/2.png',
  },
  {
    title: 'القدوة والأخلاق',
    description: 'الدعوة بالحال قبل المقال.',
    bgImage: '/assets/course_img/3.png',
  },
  {
    title: 'الوعي المعاصر',
    description: 'فهم الواقع وتحدياته المتغيرة.',
    bgImage: '/assets/course_img/4.png',
  },
  {
    title: 'التأثير والتواصل',
    description: 'دعوة مؤثرة بلغة العصر.',
    bgImage: '/assets/course_img/5.png',
  },
];

const socialLinks = [
  {
    platform: 'يوتيوب',
    label: 'خطبة دعوية ملهمة',
    thumb: '/assets/media/youtube_thumb.jpg',
    icon: <Youtube className="w-8 h-8 text-[#f00]" />,
    href: 'https://www.youtube.com/user/dr.abo_al_nasar_attar',
    accent: 'from-[#ff3838]/70 to-[#333]/70'
  },
  {
    platform: 'تيك توك',
    label: 'مقاطع دعوية قصيرة',
    thumb: '/assets/media/tiktok_thumb.jpg',
    icon: <TikTokIcon className="w-8 h-8 text-black" />,
    href: 'https://www.tiktok.com/@dr.abo_al_nasar_attar',
    accent: 'from-[#000]/70 to-[#39c5bb]/70'
  },
  {
    platform: 'انستغرام',
    label: 'ملخص بصري لقيمة دعوية',
    thumb: '/assets/media/insta_thumb.jpg',
    icon: <Instagram className="w-8 h-8 text-[#E4405F]" />,
    href: 'https://www.instagram.com/dr.abo_al_nasar_attar',
    accent: 'from-[#fd297b]/70 to-[#fdf497]/70'
  },
  {
    platform: 'فيسبوك',
    label: 'مشاركات دعوية وتحديثات',
    thumb: '/assets/media/facebook_thumb.jpg',
    icon: <Facebook className="w-8 h-8 text-[#1877f3]" />,
    href: 'https://www.facebook.com/aboalnsr1392',
    accent: 'from-[#1877f3]/60 to-[#eee]/60'
  },
  {
    platform: 'تلغرام',
    label: 'انضم لمجموعتنا',
    thumb: '/assets/media/telegram_thumb.jpg',
    icon: <Send className="w-8 h-8 text-[#229ed9]" />,
    href: 'https://t.me/aboalnsrattar',
    accent: 'from-[#229ed9]/80 to-[#fff]/80'
  },
  {
    platform: 'تويتر (إكس)',
    label: 'تغريدات وفوائد قصيرة',
    thumb: '/assets/media/twitter_thumb.jpg',
    icon: <Twitter className="w-8 h-8 text-[#1da1f2]" />,
    href: 'https://twitter.com/aboalnsr1392?lang=ar',
    accent: 'from-[#1da1f2]/70 to-[#fff]/70'
  },
];

export default function Welcome({ auth }: { auth: any }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Unified linktree (CTA under the wall)
  const linktree = 'https://linktr.ee/dr_abo_al_nasar_attar';

  return (
    <>
      <Head title="الوعي" />
      <Header activeLink="#home" userName={auth?.user?.name} />

      <main className="bg-[#B3B79D] text-[#192925] pb-16 font-sans">
        {/* Hero Section */}
<section
  id="home"
  className="
    relative flex flex-col items-center justify-center min-h-[60vh] py-24 px-4
    text-center overflow-hidden
  "
  style={{
    backgroundImage: "url('https://sdmntprcentralus.oaiusercontent.com/files/00000000-6ff4-61f5-9626-9bd939064cea/raw?se=2025-07-09T15%3A38%3A09Z&sp=r&sv=2024-08-04&sr=b&scid=96b71419-b4e7-5e78-b863-582bea726e3c&skoid=add8ee7d-5fc7-451e-b06e-a82b2276cf62&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-08T21%3A09%3A40Z&ske=2025-07-09T21%3A09%3A40Z&sks=b&skv=2024-08-04&sig=/UOMMSjy0cPCrjZEfs7LIIDsKhx2rSLDkNzuaaCN4HI%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Optional: overlay for extra contrast */}
  <div className="absolute inset-0 bg-[#192925]/60 pointer-events-none" />

  <div className="relative z-10 flex flex-col items-center w-full">
    {/* Hero Badge */}
    <div className="inline-block mb-6 px-5 py-2 rounded-full bg-[#B3B79D] text-[#192925] text-lg font-bold shadow-sm border border-[#86836B] tracking-widest">
      مجانًا للجميع – بدء التسجيل الآن
    </div>

    {/* Main Heading */}
    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-white drop-shadow-[0_2px_16px_rgba(25,41,37,0.45)]">
      أكاديمية <span className="text-[#B3B79D]">الوعي الدعوي</span>
    </h1>

    {/* Subheading */}
    <h2 className="text-2xl md:text-3xl mb-7 font-bold text-white/90 bg-[#3B5049]/70 px-3 py-1 rounded-lg inline-block drop-shadow-md">
      رحلتك إلى فهم أصيل وتحليل معاصر
    </h2>

    {/* Description */}
    <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10 text-white/80 font-medium drop-shadow">
      تعلم أساسيات الإسلام من العلماء الموثوقين في بيئة تفاعلية – برامج علمية، أخلاقية، وتأثيرية، <span className="font-bold text-[#B3B79D]">مجانًا</span> ومن أي مكان في العالم.
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <a
        href="#courses"
        className="bg-[#3B5049] hover:bg-[#192925] text-[#B3B79D] hover:text-white px-8 py-4 rounded-xl text-xl shadow-lg font-bold transition"
      >
        استكشف الدورات
      </a>
      <a
        href={linktree}
        target="_blank"
        rel="noopener"
        className="bg-[#B3B79D] hover:bg-[#fff] text-[#192925] px-6 py-4 rounded-xl text-base shadow-lg font-semibold border border-[#3B5049] transition"
      >
        جميع الروابط الرسمية
      </a>
    </div>
  </div>
</section>


        {/* Floating Info Panel */}
        <section className="relative py-16 px-4 -mt-24 z-10">
          <div
            className="
              bg-[rgba(255,255,255,0.94)]
              border border-[#86836B]
              rounded-xl shadow-xl
              max-w-6xl mx-auto px-6 py-8
            "
            dir="rtl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-center text-[#3B5049]">
              <div>
                <p className="font-semibold text-lg">٤ فصول دراسية (سنتان)</p>
                <p className="text-sm text-[#86836B]">مدة البرنامج</p>
              </div>
              <div>
                <p className="font-semibold text-lg">١٢ أسبوعًا</p>
                <p className="text-sm text-[#86836B]">مدة الفصل الدراسي</p>
              </div>
              <div>
                <p className="font-semibold text-lg">مجاني</p>
                <p className="text-sm text-[#86836B]">عن بُعد</p>
              </div>
              <div>
                <p className="font-semibold text-lg">١٥ ساعة</p>
                <p className="text-sm text-[#86836B]">ساعات الأسبوع</p>
              </div>
              <div>
                <p className="font-semibold text-lg">٢٥ أغسطس</p>
                <p className="text-sm text-[#86836B]">بداية الفصل القادم</p>
              </div>
              <div>
                <Link
                  href="/register"
                  className="
                    block bg-gradient-to-r from-[#3B5049] to-[#86836B]
                    text-[#B3B79D] font-semibold
                    py-3 px-6 rounded-md shadow hover:opacity-90 transition text-lg
                  "
                >
                  سجل الآن
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
<section
  id="courses"
  className="relative py-24 px-4 bg-[#86836B] min-h-[50vh]"
>
  {/* Section Title */}
  <h2 className="text-4xl font-bold text-center mb-6 text-[#192925]">البرنامج الأكاديمي</h2>
  <p className="text-center max-w-3xl mx-auto mb-16 text-lg text-[#3B5049] font-medium">
    استكشف مسارات متنوعة تمنحك فهمًا أعمق وأدوات تطبيقية للدعوة والتأثير في العالم المعاصر.
  </p>

  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {courses.map(({ title, description, bgImage }, idx) => (
      <div
        key={title}
        className="
          group relative rounded-2xl shadow-lg border border-[#B3B79D]
          bg-[#B3B79D]/90 px-8 py-12 flex flex-col items-center text-center
          transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-[#3B5049]
          min-h-[340px]
        "
        style={{ overflow: 'hidden' }}
      >
        {/* Background Motif Image */}
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="
            absolute inset-0 w-full h-full object-cover opacity-10
            group-hover:opacity-20 transition-opacity duration-300
            pointer-events-none
          "
          draggable="false"
          style={{ zIndex: 1 }}
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <h3 className="font-extrabold text-2xl mb-3 text-[#3B5049] group-hover:text-[#192925] transition-colors duration-200">
            {title}
          </h3>
          <p className="text-[#3B5049] mb-8 text-base font-medium">{description}</p>
          <button
            className="
              mt-auto bg-[#3B5049] text-[#B3B79D] font-bold px-6 py-2 rounded-lg shadow
              hover:bg-[#86836B] hover:text-[#192925] transition text-base
            "
          >
            عرض التفاصيل
          </button>
        </div>
      </div>
    ))}
  </div>
</section>


        {/* Media Highlights Section */}
        <section className="py-20 px-2 bg-[#B3B79D] text-center">
          <h2 className="text-3xl font-bold mb-10 text-[#192925]">مقتطفات من برامجنا</h2>
          <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {socialLinks.map(({ platform, label, thumb, icon, href, accent }) => (
              <a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={`شاهد على ${platform}`}
                className={`
                  group relative overflow-hidden rounded-2xl shadow-lg
                  border border-[#86836B] flex flex-col justify-end
                  transition-transform hover:scale-105 hover:shadow-2xl duration-300
                  min-h-[220px] bg-[#3B5049]
                `}
                style={{ minHeight: 240 }}
              >
                {/* Image background */}
                <img
                  src={thumb}
                  alt={label}
                  className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />
                {/* Color overlay */}
                <div
                  className={`
                    absolute inset-0
                    bg-gradient-to-tr ${accent}
                    transition-all duration-300
                    opacity-60 group-hover:opacity-80 z-10
                  `}
                />
                {/* Icon (Lucide or TikTok) */}
                <div className="absolute left-5 top-5 z-20 bg-[#B3B79D]/80 rounded-full p-2 shadow group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                {/* Text */}
                <div className="relative z-20 p-6 text-right flex flex-col items-end">
                  <h4 className="text-xl font-bold text-white drop-shadow-lg mb-1">{platform}</h4>
                  <p className="text-md text-[#fff9] font-medium mb-2">{label}</p>
                  <span className="text-xs text-[#fff7c2] bg-[#192925]/30 px-3 py-1 rounded-full group-hover:bg-[#fff7c2] group-hover:text-[#192925] transition">
                    تصفح المزيد
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-3">
            <span className="text-[#3B5049] text-lg">كل قنواتنا وروابطنا الرسمية:</span>
            <a
              href={linktree}
              target="_blank"
              rel="noopener"
              className="inline-block bg-[#3B5049] hover:bg-[#192925] text-[#B3B79D] px-8 py-3 rounded-full font-bold text-lg shadow transition"
            >
              Linktree الرسمي للدكتور أبو النصر عطار
            </a>
          </div>
        </section>

        {/* Responsive Call-to-Action Section */}
        <section
          className="bg-cover bg-top sm:bg-center bg-no-repeat text-white"
          style={{
            backgroundImage: "url('https://en.shafaqna.com/wp-content/uploads/2019/10/Iraqi_students_receive_school_supplies_061031-F-9085B-140.jpg')",
          }}
        >
          <div className="bg-[#192925]/80 min-h-[300px] sm:min-h-[500px] flex flex-col md:flex-row justify-center md:justify-between items-center px-4 sm:px-12 py-12 sm:py-20">
            <div className="w-full md:w-1/2 text-center md:text-right">
              <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight">
                لا يجب أن يكون الوصول إلى العلم الشرعي ترفًا
              </h2>
              <p className="mb-6 text-base sm:text-lg leading-relaxed">
                ساهم في تعليم ١٢ طالبًا من طالبي العلم مجانًا من خلال دوراتنا مقابل دولار واحد فقط يوميًا.
              </p>
              <div className="inline-flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href={linktree}
                  target="_blank"
                  rel="noopener"
                  className="bg-[#3B5049] hover:bg-[#86836B] text-[#B3B79D] font-semibold px-7 py-3 rounded shadow text-lg"
                >
                  كن متبرعًا شهريًا
                </a>
                <a
                  href={linktree}
                  target="_blank"
                  rel="noopener"
                  className="bg-[#B3B79D] text-[#192925] hover:bg-[#86836B] hover:text-[#B3B79D] font-medium px-7 py-3 rounded shadow text-lg"
                >
                  أدفع زكاتك وصدقتك
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}