import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import PrimaryButton from '@/Components/PrimaryButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Youtube, Facebook, Instagram, Twitter, Send,
  BookOpenCheck, ShieldCheck, Star, Users, Mail
} from 'lucide-react';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
    <path d="M27.88 9.42a6.11 6.11 0 0 1-3.33-1c-.17-.1-.35-.23-.5-.34V20a7.13 7.13 0 1 1-7.1-7.1V16.7a3.29 3.29 0 1 0 3.29 3.29V2h3.23c.08 2.23 1.65 4.1 3.89 4.5v2.92z"/>
  </svg>
);

// Animations
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 18 } } };

// Colors
const COLOR_DARK = '#192925';
const COLOR_MID  = '#3B5049';

// Values & Courses
const values = [
  'الرسالية','الأصالة','الوسطية','المعاصرة','التكامل','الإتقان',
  'الإبداع','المصداقية','العمل الجماعي','التطوير المستمر'
];

const courses = [
  { icon: <BookOpenCheck className="w-12 h-12 text-[#B3B79D]" />, title: 'دورات التأسيس الإيماني', description: 'بناء الأساس الدعوي على فهم إيماني متين.' },
  { icon: <ShieldCheck className="w-12 h-12 text-[#B3B79D]" />, title: 'التحصين والعقيدة', description: 'تحصين الشباب ضد التشكيك والانحراف.' },
  { icon: <Star className="w-12 h-12 text-[#B3B79D]" />, title: 'قوانين القرآن', description: 'فهم القرآن بمنهجية واضحة.' },
  { icon: <Users className="w-12 h-12 text-[#B3B79D]" />, title: 'التأهيل الدعوي', description: 'إعداد دعاة مؤثرين معرفياً وسلوكياً.' },
  { icon: <BookOpenCheck className="w-12 h-12 text-[#B3B79D]" />, title: 'مهارات الخطابة', description: 'إتقان فنون الإلقاء والتأثير.' },
  { icon: <ShieldCheck className="w-12 h-12 text-[#B3B79D]" />, title: 'المنهجية الفكرية', description: 'تأسيس عقلية ناقدة وبصيرة.' }
];

const socialLinks = [
  { platform: 'يوتيوب', label: 'خطبة دعوية ملهمة', href: 'https://www.youtube.com/user/dr.abo_al_nasar_attar', icon: <Youtube className="w-8 h-8 text-[#f00]" />, accent: 'from-[#ff3838]/70 to-[#333]/70' },
  { platform: 'انستغرام', label: 'ملخص بصري دعوي', href: 'https://www.instagram.com/dr.abo_al_nasar_attar', icon: <Instagram className="w-8 h-8 text-[#E4405F]" />, accent: 'from-[#fd297b]/70 to-[#fdf497]/70' },
  { platform: 'فيسبوك', label: 'تحديثات دعوية', href: 'https://www.facebook.com/sufaraalhidaya', icon: <Facebook className="w-8 h-8 text-[#1877f3]" />, accent: 'from-[#1877f3]/60 to-[#eee]/60' },
  { platform: 'تلغرام', label: 'انضم لمجموعاتنا', href: 'https://t.me/alwaei_aldaawy_academy', icon: <Send className="w-8 h-8 text-[#229ed9]" />, accent: 'from-[#229ed9]/80 to-[#fff]/80' },
  { platform: 'تويتر', label: 'فوائد قصيرة', href: 'https://twitter.com/aboalnsr1392?lang=ar', icon: <Twitter className="w-8 h-8 text-[#1da1f2]" />, accent: 'from-[#1da1f2]/70 to-[#fff]/70' },
  { platform: 'تيك توك', label: 'محتوى دعوي قصير', href: 'https://www.tiktok.com/@dr.abo_al_nasar_attar', icon: <TikTokIcon className="w-8 h-8 text-black" />, accent: 'from-[#000]/70 to-[#39c5bb]/70' }
];

const faqs = [
  { q: 'ما شروط الالتحاق بالدورات؟', a: 'الاهتمام بالعلم الشرعي.' },
  { q: 'هل الدورات مجانية؟', a: 'نعم، جميع برامجنا مجانية بالكامل.' },
  { q: 'هل الشهادات معترف بها؟', a: 'ليست معتمدة رسمياً حتى الآن.' },
  { q: 'هل الدروس مباشرة أم مسجلة؟', a: 'نقدّم كلا النوعين حسب المادة.' },
  { q: 'هل التسجيل متاح من خارج الدولة؟', a: 'نعم، التسجيل مفتوح للجميع.' }
];

export default function Welcome({ auth }: { auth: any }) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const linktree = 'https://linktr.ee/dr_abo_al_nasar_attar';
  const testimonials = [
    { name: 'محمد عبدالله', avatar: '/assets/avatars/1.png', text: 'كانت نقطة تحول في فهمي للدعوة. شكراً لهذه الرؤية النقية.' },
    { name: 'فاطمة الزهراء', avatar: '/assets/avatars/2.png', text: 'منهج متكامل جمع العلم بالأخلاق والوسطية.' },
    { name: 'علي حسن', avatar: '/assets/avatars/3.png', text: 'تعلمت كيف أكون داعية حقيقي بالعلم والسلوك.' },
    { name: 'سارة محمود', avatar: '/assets/avatars/4.png', text: 'أسلوب رائع وأجواء محفزة للتعلم.' }
  ];

  return (
    <>
      <Head title="أكاديمية سفراء الهداية" />
      <Header activeLink="#home" userName={auth?.user?.name} />

      <main className="bg-[#192925] text-[#B3B79D] font-sans relative overflow-hidden">
        {/* Hero */}
        <motion.section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative"
          initial="hidden" animate="show" variants={container}
          style={{ background: 'linear-gradient(180deg, #192925, #3B5049)' }}
        >
          <img src="/assets/pattern.svg" className="absolute inset-0 w-full h-full opacity-10 object-cover pointer-events-none" />
          <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold text-white mb-4 relative z-10">
            أكاديمية <span className="text-[#B3B79D]">سفراء الهداية</span>
          </motion.h1>
          <motion.p variants={item} className="text-xl md:text-2xl mb-8 max-w-2xl relative z-10">
            نحو بعثٍ جديد، بصناعة دعوة جادة وعصرية.
          </motion.p>
          <motion.div variants={container} className="flex flex-wrap gap-4 justify-center relative z-10">
            <motion.a variants={item} href="#courses" className="px-6 py-3 bg-[#B3B79D] text-[#192925] rounded-xl font-bold hover:bg-white transition">البرامج الأساسية</motion.a>
            <motion.a variants={item} href={linktree} target="_blank" rel="noopener" className="px-6 py-3 border border-[#B3B79D] rounded-xl hover:text-white hover:border-white transition">جميع الروابط الرسمية</motion.a>
          </motion.div>
        </motion.section>

        {/* Divider: HERO -> VALUES */}
        <WaveDivider from={COLOR_MID} to={COLOR_DARK} />

        {/* Values */}
        <motion.section className="py-12 md:py-14 px-4 bg-[#3B5049]" initial="hidden" whileInView="show" variants={container}>
          <motion.h3 variants={item} className="text-3xl md:text-4xl font-bold text-white text-center mb-8">قيمنا الأساسية</motion.h3>
          <motion.div variants={container} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="px-4 py-2 bg-[#192925] rounded-full text-center text-white font-semibold shadow-sm"
              >
                {val}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Divider: VALUES -> COURSES */}
        <WaveDivider from={COLOR_DARK} to={COLOR_MID} flip />

        {/* Courses */}
        <motion.section id="courses" className="py-14 md:py-16 px-4 bg-[#192925]" initial="hidden" whileInView="show" variants={container}>
          <motion.h3 variants={item} className="text-3xl md:text-4xl font-bold text-white text-center mb-10">أبرز الدورات</motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {courses.map((c,i) => (
              <motion.div key={i} variants={item} className="bg-[#3B5049] p-6 rounded-2xl shadow-lg text-center hover:scale-[1.02] transition-transform">
                <div className="mb-4 flex justify-center">{c.icon}</div>
                <h4 className="text-2xl font-bold text-white mb-2">{c.title}</h4>
                <p className="text-[#B3B79D]">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Divider: COURSES -> TESTIMONIALS */}
        <WaveDivider from={COLOR_MID} to={COLOR_DARK} />

        {/* Testimonials */}
        <motion.section id="testimonial" className="py-14 md:py-16 px-4 bg-[#3B5049]" initial="hidden" whileInView="show" variants={container}>
          <motion.h3 variants={item} className="text-3xl md:text-4xl font-bold text-white text-center mb-10">آراء طلابنا</motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div key={idx} variants={item} className="bg-[#192925] p-6 rounded-xl shadow-lg text-center">
                <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[#B3B79D]" />
                <p className="italic text-white mb-3">"{t.text}"</p>
                <h5 className="text-[#B3B79D] font-bold">{t.name}</h5>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Divider: TESTIMONIALS -> FAQ */}
        <WaveDivider from={COLOR_DARK} to={COLOR_MID} flip />

        {/* FAQ */}
        <motion.section id="faq" className="py-14 md:py-16 px-4 bg-[#192925]" initial="hidden" whileInView="show" variants={container}>
          <motion.h3 variants={item} className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">الأسئلة الشائعة</motion.h3>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, idx) => (
              <div key={idx} className="text-[#B3B79D] border-b border-[#3B5049] pb-2">
                <motion.button onClick={() => setFaqOpen(faqOpen === idx ? null : idx)} className="w-full text-right py-3 font-semibold">
                  {f.q}
                </motion.button>
                <AnimatePresence>
                  {faqOpen === idx && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="pl-4">
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Divider: FAQ -> MEDIA */}
        <WaveDivider from={COLOR_MID} to={COLOR_DARK} />

        {/* Media */}
        <motion.section id="media" className="py-14 md:py-16 px-4 bg-[#3B5049]" initial="hidden" whileInView="show" variants={container}>
          <motion.h3 variants={item} className="text-3xl md:text-4xl font-bold text-white text-center mb-10">تابعونا عبر</motion.h3>
          <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {socialLinks.map((s, idx) => (
              <motion.a key={idx} variants={item} href={s.href} target="_blank" rel="noopener" className="relative overflow-hidden rounded-2xl shadow-lg hover:scale-[1.02] transition">
                <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-60`} />
                <div className="relative z-10 p-4 text-right">
                  <div className="bg-white p-2 rounded-full inline-block">{s.icon}</div>
                  <h4 className="text-lg font-bold text-white mt-2">{s.platform}</h4>
                  <p className="text-sm text-white/80">{s.label}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        {/* Divider: MEDIA -> CONTACT */}
        <WaveDivider from={COLOR_DARK} to={COLOR_MID} flip />

        {/* Contact */}
        <motion.section id="contact" className="py-14 md:py-16 px-4 bg-[#192925]" initial="hidden" whileInView="show" variants={container}>
          <motion.h3 variants={item} className="text-3xl md:text-4xl font-bold text-white text-center mb-6">تواصل معنا</motion.h3>
          <motion.p variants={item} className="text-lg text-[#B3B79D] mb-8 text-center">إسطنبول، باشاك شهير · ٠٥٤٢٣٨٢٥٠١٤ · من ٩ صباحًا إلى ٥ مساءً</motion.p>
          <motion.form variants={item} className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <div className="relative w-full">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#192925] w-5 h-5" />
              <input type="email" placeholder="بريدك الإلكتروني" required className="w-full h-14 pl-10 pr-4 rounded-lg bg-[#B3B79D] text-[#192925] placeholder-[#192925]/70 focus:ring-2 focus:ring-white outline-none" />
            </div>
            <PrimaryButton type="submit" className="h-14">اشترك الآن</PrimaryButton>
          </motion.form>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}

/**
 * Wave divider that blends sections by coloring the SVG paths
 * to match the previous/next background colors (no white strips).
 */
function WaveDivider({ from, to, flip }: { from: string; to: string; flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ backgroundColor: from }}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 block">
        <path d="M0,0V46.29c47.79,22.2,103.93,29.05,158,17C283.68,36,351.94,0,420,0s136.32,36,262,63,210.86,5,318-9V0Z"
              fill={to} opacity=".25"></path>
        <path d="M0,0V15.81C47.79,35.53,103.93,41.28,158,33c75.68-11.64,143.94-47.64,212-47.64s136.32,36,262,63,210.86,5,318-9V0Z"
              fill={to} opacity=".5"></path>
        <path d="M0,0V5.63C47.79,28.91,103.93,39.69,158,33c75.68-9.89,143.94-43.07,212-43.07s136.32,36,262,63,210.86,5,318-9V0Z"
              fill={to}></path>
      </svg>
    </div>
  );
}