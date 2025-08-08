// File: resources/js/Pages/Welcome.tsx
// Description: Dense, visually rich welcome page (~500 lines) for أكاديمية سفراء الهداية
// - Tailwind + Framer Motion + Inertia Head
// - Compact wave dividers, geometric ornaments, tighter paddings
// - Sections: Hero, Metrics, Values, About, Courses, Programs, Media, Testimonials,
//             FAQ, Partners, Newsletter CTA, Contact

import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import PrimaryButton from '@/Components/PrimaryButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import {
  Youtube, Facebook, Instagram, Twitter, Send,
  BookOpenCheck, ShieldCheck, Star, Users, Mail, Check, Play, ArrowRight,
  FolderKanban, GraduationCap, BookText, Sparkles, Globe2, CalendarDays,
  Radio, Library, BookMarked, MessageSquare, Video, Megaphone
} from 'lucide-react';

// ---------------------------------------------
// Icons & Helpers
// ---------------------------------------------
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M27.88 9.42a6.11 6.11 0 0 1-3.33-1c-.17-.1-.35-.23-.5-.34V20a7.13 7.13 0 1 1-7.1-7.1V16.7a3.29 3.29 0 1 0 3.29 3.29V2h3.23c.08 2.23 1.65 4.1 3.89 4.5v2.92z"/>
  </svg>
);

// Motion variants
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 18 } } };
const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } };

// Theme colors
const COLOR_DARK = '#192925';
const COLOR_MID = '#3B5049';
const ACCENT = '#B3B79D';

// ---------------------------------------------
// Data
// ---------------------------------------------
const values = [
  'الرسالية','الأصالة','الوسطية','المعاصرة','التكامل','الإتقان',
  'الإبداع','المصداقية','العمل الجماعي','التطوير المستمر'
];

const courses = [
  { icon: <BookOpenCheck className="w-10 h-10 text-[${ACCENT}]" />, title: 'دورات التأسيس الإيماني', description: 'بناء الأساس الدعوي على فهم إيماني متين.' },
  { icon: <ShieldCheck className="w-10 h-10 text-[${ACCENT}]" />, title: 'التحصين والعقيدة', description: 'تحصين الشباب ضد التشكيك والانحراف.' },
  { icon: <Star className="w-10 h-10 text-[${ACCENT}]" />, title: 'قوانين القرآن', description: 'فهم القرآن بمنهجية واضحة.' },
  { icon: <Users className="w-10 h-10 text-[${ACCENT}]" />, title: 'التأهيل الدعوي', description: 'إعداد دعاة مؤثرين معرفياً وسلوكياً.' },
  { icon: <BookText className="w-10 h-10 text-[${ACCENT}]" />, title: 'مهارات الخطابة', description: 'إتقان فنون الإلقاء والتأثير.' },
  { icon: <GraduationCap className="w-10 h-10 text-[${ACCENT}]" />, title: 'المنهجية الفكرية', description: 'تأسيس عقلية ناقدة وبصيرة.' },
  { icon: <Library className="w-10 h-10 text-[${ACCENT}]" />, title: 'علوم القرآن', description: 'مباحث علوم القرآن وأدوات الفهم.' },
  { icon: <BookMarked className="w-10 h-10 text-[${ACCENT}]" />, title: 'الفقه الميسر', description: 'مختصرات عملية للمبتدئ والمتوسط.' },
];

const programs = [
  { icon: <FolderKanban className="w-6 h-6" />, title: 'مسار التكوين', points: ['أصول الإيمان', 'فقه العبادة', 'مهارات الدراسة'] },
  { icon: <GraduationCap className="w-6 h-6" />, title: 'مسار الداعية', points: ['خطابة وتأثير', 'مناظرة هادئة', 'حضور رقمي'] },
  { icon: <Megaphone className="w-6 h-6" />, title: 'مسار المحتوى', points: ['كتابة نصوص', 'تصميم مرئي', 'مونتاج مبسط'] },
  { icon: <Radio className="w-6 h-6" />, title: 'مسار البودكاست', points: ['إعداد حلقات', 'تقديم حوارات', 'نشر وترويج'] },
];

const metrics = [
  { label: 'طلاب نشطون', value: '2,400+', icon: <Users className="w-6 h-6" /> },
  { label: 'دروس منشورة', value: '350+', icon: <Video className="w-6 h-6" /> },
  { label: 'ساعات تعلم', value: '1,800+', icon: <CalendarDays className="w-6 h-6" /> },
  { label: 'بلدان مشاركة', value: '27', icon: <Globe2 className="w-6 h-6" /> },
];

const socialLinks = [
  { platform: 'يوتيوب', label: 'خطبة دعوية ملهمة', href: 'https://www.youtube.com/user/dr.abo_al_nasar_attar', icon: <Youtube className="w-7 h-7 text-[#f00]" />, accent: 'from-[#ff3838]/70 to-[#333]/70' },
  { platform: 'انستغرام', label: 'ملخص بصري دعوي', href: 'https://www.instagram.com/dr.abo_al_nasar_attar', icon: <Instagram className="w-7 h-7 text-[#E4405F]" />, accent: 'from-[#fd297b]/70 to-[#fdf497]/70' },
  { platform: 'فيسبوك', label: 'تحديثات دعوية', href: 'https://www.facebook.com/sufaraalhidaya', icon: <Facebook className="w-7 h-7 text-[#1877f3]" />, accent: 'from-[#1877f3]/60 to-[#eee]/60' },
  { platform: 'تلغرام', label: 'انضم لمجموعاتنا', href: 'https://t.me/alwaei_aldaawy_academy', icon: <Send className="w-7 h-7 text-[#229ed9]" />, accent: 'from-[#229ed9]/80 to-[#fff]/80' },
  { platform: 'تويتر', label: 'فوائد قصيرة', href: 'https://twitter.com/aboalnsr1392?lang=ar', icon: <Twitter className="w-7 h-7 text-[#1da1f2]" />, accent: 'from-[#1da1f2]/70 to-[#fff]/70' },
  { platform: 'تيك توك', label: 'محتوى دعوي قصير', href: 'https://www.tiktok.com/@dr.abo_al_nasar_attar', icon: <TikTokIcon className="w-7 h-7 text-black" />, accent: 'from-[#000]/70 to-[#39c5bb]/70' }
];

const faqs = [
  { q: 'ما شروط الالتحاق بالدورات؟', a: 'الاهتمام بالعلم الشرعي والالتزام بحضور الدروس.' },
  { q: 'هل الدورات مجانية؟', a: 'نعم، جميع برامجنا مجانية بالكامل.' },
  { q: 'هل الشهادات معترف بها؟', a: 'ليست معتمدة رسمياً حتى الآن.' },
  { q: 'هل الدروس مباشرة أم مسجلة؟', a: 'نقدّم كلا النوعين حسب المادة.' },
  { q: 'هل التسجيل متاح من خارج الدولة؟', a: 'نعم، التسجيل مفتوح للجميع.' }
];

const partners = [
  '/assets/partners/1.png','/assets/partners/2.png','/assets/partners/3.png','/assets/partners/4.png','/assets/partners/5.png'
];

// ---------------------------------------------
// Utilities / Micro Components
// ---------------------------------------------
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-8">
      <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{title}</h3>
      {subtitle && (
        <p className="text-[${ACCENT}]/90 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-full bg-[#0f1a17] text-white text-sm shadow-sm border border-white/10">{children}</span>
  );
}

function Ornament({ className = '' }: { className?: string }) {
  return (
    <img aria-hidden src="/assets/pattern.svg" className={`pointer-events-none select-none opacity-10 ${className}`} />
  );
}

function MetricCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <motion.div variants={item} className="bg-[#213833] rounded-2xl p-5 shadow-lg border border-white/5 text-center">
      <div className="mx-auto w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center text-white">{icon}</div>
      <div className="mt-3 text-3xl font-extrabold text-white">{value}</div>
      <div className="text-[${ACCENT}] mt-1">{label}</div>
    </motion.div>
  );
}

function ProgramCard({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
  return (
    <motion.div variants={item} className="bg-[#213833] rounded-2xl p-6 shadow-lg border border-white/5">
      <div className="flex items-center gap-3 text-white">
        <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center">{icon}</div>
        <h4 className="text-xl font-bold">{title}</h4>
      </div>
      <ul className="mt-4 space-y-2 pr-6 list-disc text-[${ACCENT}]">
        {points.map((p, i) => (
          <li key={i} className="leading-relaxed">{p}</li>
        ))}
      </ul>
      <div className="mt-5">
        <a href="#contact" className="inline-flex items-center gap-2 text-white hover:opacity-90">
          <span>سجّل اهتمامك</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

function CourseCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div variants={item} className="bg-[#3B5049] p-6 rounded-2xl shadow-lg text-center hover:scale-[1.02] transition-transform border border-white/5">
      <div className="mb-4 flex justify-center text-[${ACCENT}]">{icon}</div>
      <h4 className="text-2xl font-bold text-white mb-2">{title}</h4>
      <p className="text-[${ACCENT}]">{description}</p>
    </motion.div>
  );
}

function WaveDivider({ from, to, flip }: { from: string; to: string; flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} -mt-2`} style={{ backgroundColor: from }}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-6 block">
        <path d="M0,0V46.29c47.79,22.2,103.93,29.05,158,17C283.68,36,351.94,0,420,0s136.32,36,262,63,210.86,5,318-9V0Z" fill={to} opacity=".25"></path>
        <path d="M0,0V15.81C47.79,35.53,103.93,41.28,158,33c75.68-11.64,143.94-47.64,212-47.64s136.32,36,262,63,210.86,5,318-9V0Z" fill={to} opacity=".5"></path>
        <path d="M0,0V5.63C47.79,28.91,103.93,39.69,158,33c75.68-9.89,143.94-43.07,212-43.07s136.32,36,262,63,210.86,5,318-9V0Z" fill={to}></path>
      </svg>
    </div>
  );
}

// ---------------------------------------------
// Page
// ---------------------------------------------
export default function Welcome({ auth }: { auth: any }) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const linktree = 'https://linktr.ee/dr_abo_al_nasar_attar';

  const testimonials = useMemo(() => ([
    { name: 'محمد عبدالله', avatar: '/assets/avatars/1.png', text: 'كانت نقطة تحول في فهمي للدعوة. شكراً لهذه الرؤية النقية.' },
    { name: 'فاطمة الزهراء', avatar: '/assets/avatars/2.png', text: 'منهج متكامل جمع العلم بالأخلاق والوسطية.' },
    { name: 'علي حسن', avatar: '/assets/avatars/3.png', text: 'تعلمت كيف أكون داعية حقيقي بالعلم والسلوك.' },
    { name: 'سارة محمود', avatar: '/assets/avatars/4.png', text: 'أسلوب رائع وأجواء محفزة للتعلم.' }
  ]), []);

  return (
    <>
      <Head title="أكاديمية سفراء الهداية" />
      <Header activeLink="#home" userName={auth?.user?.name} />

      <main className="bg-[#192925] text-[#B3B79D] font-sans relative overflow-hidden">
        {/* ======================= HERO ======================= */}
        <motion.section
          id="home"
          className="min-h-[88vh] flex flex-col justify-center items-center text-center px-4 relative"
          initial="hidden" animate="show" variants={container}
          style={{ background: 'linear-gradient(180deg, #192925, #3B5049)' }}
        >
          <Ornament className="absolute inset-0 w-full h-full object-cover" />
          <motion.div variants={item} className="mb-4">
            <Badge>أهلاً بكم</Badge>
          </motion.div>
          <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold text-white mb-3 relative z-10">
            أكاديمية <span className="text-[${ACCENT}]">سفراء الهداية</span>
          </motion.h1>
          <motion.p variants={item} className="text-lg md:text-2xl mb-6 max-w-2xl relative z-10">
            نحو بعثٍ جديد، بصناعة دعوة جادة وعصرية.
          </motion.p>
          <motion.div variants={container} className="flex flex-wrap gap-3 justify-center relative z-10">
            <motion.a variants={item} href="#courses" className="px-6 py-3 bg-[${ACCENT}] text-[#192925] rounded-xl font-bold hover:bg-white transition">البرامج الأساسية</motion.a>
            <motion.a variants={item} href={linktree} target="_blank" rel="noopener" className="px-6 py-3 border border-[${ACCENT}] rounded-xl hover:text-white hover:border-white transition">جميع الروابط الرسمية</motion.a>
            <motion.a variants={item} href="#about" className="px-6 py-3 bg-black/20 text-white rounded-xl hover:bg-black/30 transition flex items-center gap-2"><Play className="w-4 h-4"/> لمحة سريعة</motion.a>
          </motion.div>

          {/* metrics */}
          <motion.div variants={container} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl w-full">
            {metrics.map((m, i) => (
              <MetricCard key={i} icon={m.icon} value={m.value} label={m.label} />
            ))}
          </motion.div>
        </motion.section>

        <WaveDivider from={COLOR_MID} to={COLOR_DARK} />

        {/* ======================= VALUES ======================= */}
        <motion.section className="py-8 md:py-10 px-4 bg-[#3B5049] relative" initial="hidden" whileInView="show" variants={container}>
          <Ornament className="absolute -top-12 right-0 w-64" />
          <SectionHeading title="قيمنا الأساسية" subtitle="منظومة قيم تبني إنساناً رسالياً متوازناً." />
          <motion.div variants={container} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {values.map((val, idx) => (
              <motion.div key={idx} variants={item} className="px-5 py-3 bg-[#192925] rounded-full text-center text-white font-semibold shadow-sm text-lg">
                {val}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <WaveDivider from={COLOR_DARK} to={COLOR_MID} flip />

        {/* ======================= ABOUT ======================= */}
        <motion.section id="about" className="py-12 md:py-14 px-4 bg-[#192925] relative" initial="hidden" whileInView="show" variants={container}>
          <Ornament className="absolute left-0 top-0 w-72" />
          <SectionHeading title="رؤيتنا ورسالتنا" subtitle="رؤية: بناء جيل قرآني رسالي ينهض بالأمة. رسالة: إعداد نخبة شبابية واعية بالعلم والعمل والأخلاق." />
          <motion.div variants={container} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <motion.div variants={item} className="bg-[#213833] rounded-2xl p-6 border border-white/5">
              <h4 className="text-xl font-bold text-white mb-3">مبادئ العمل</h4>
              <ul className="space-y-2 text-[${ACCENT}] pr-5 list-disc">
                <li>المنهجية القرآنية والنبويّة.</li>
                <li>التوازن بين المعرفة والسلوك.</li>
                <li>الرقمنة في التعليم والدعوة.</li>
                <li>شراكات للنفع العام.</li>
              </ul>
            </motion.div>
            <motion.div variants={item} className="bg-[#213833] rounded-2xl p-6 border border-white/5">
              <h4 className="text-xl font-bold text-white mb-3">أهدافنا</h4>
              <ul className="space-y-2 text-[${ACCENT}] pr-5 list-disc">
                <li>تأهيل دعاة شباب مؤثرين.</li>
                <li>إنتاج محتوى معرفي رصين.</li>
                <li>مدّ الجسور مع المجتمع المدني.</li>
                <li>بناء منصات تعلم مستمرة.</li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.section>

        <WaveDivider from={COLOR_MID} to={COLOR_DARK} />

        {/* ======================= COURSES ======================= */}
        <motion.section id="courses" className="py-14 md:py-16 px-4 bg-[#3B5049]" initial="hidden" whileInView="show" variants={container}>
          <SectionHeading title="أبرز الدورات" subtitle="مجموعة من المقررات المختصرة والمتدرجة لبناء الأساس المتين." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {courses.map((c, i) => (
              <CourseCard key={i} icon={c.icon} title={c.title} description={c.description} />
            ))}
          </div>
        </motion.section>

        <WaveDivider from={COLOR_DARK} to={COLOR_MID} flip />

        {/* ======================= PROGRAMS (TRACKS) ======================= */}
        <motion.section className="py-12 md:py-14 px-4 bg-[#192925]" initial="hidden" whileInView="show" variants={container}>
          <SectionHeading title="المسارات التعليمية" subtitle="اختر مسارك بحسب هدفك ومرحلتك." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {programs.map((p, i) => (
              <ProgramCard key={i} icon={p.icon} title={p.title} points={p.points} />
            ))}
          </div>
        </motion.section>

        <WaveDivider from={COLOR_MID} to={COLOR_DARK} />

        {/* ======================= MEDIA ======================= */}
        <motion.section id="media" className="py-12 md:py-14 px-4 bg-[#3B5049]" initial="hidden" whileInView="show" variants={container}>
          <SectionHeading title="تابعونا عبر" subtitle="منصّاتنا الإعلامية لنشر الخير والمعرفة." />
          <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {socialLinks.map((s, idx) => (
              <motion.a key={idx} variants={item} href={s.href} target="_blank" rel="noopener" className="relative overflow-hidden rounded-2xl shadow-lg hover:scale-[1.02] transition border border-white/5">
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

        <WaveDivider from={COLOR_DARK} to={COLOR_MID} flip />

        {/* ======================= TESTIMONIALS ======================= */}
        <motion.section id="testimonial" className="py-12 md:py-14 px-4 bg-[#192925]" initial="hidden" whileInView="show" variants={container}>
          <SectionHeading title="آراء طلابنا" subtitle="ما الذي تغيّر في رحلتهم بعد الانضمام؟" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div key={idx} variants={item} className="bg-[#213833] p-6 rounded-xl shadow-lg text-center border border-white/5">
                <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-[${ACCENT}]" />
                <p className="italic text-white mb-3">"{t.text}"</p>
                <h5 className="text-[${ACCENT}] font-bold">{t.name}</h5>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <WaveDivider from={COLOR_MID} to={COLOR_DARK} />

        {/* ======================= FAQ ======================= */}
        <motion.section id="faq" className="py-12 md:py-14 px-4 bg-[#3B5049]" initial="hidden" whileInView="show" variants={container}>
          <SectionHeading title="الأسئلة الشائعة" subtitle="تفاصيل تنظيمية ومعلومات عامة عن منظومتنا." />
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, idx) => (
              <div key={idx} className="text-[${ACCENT}] border-b border-white/10 pb-2">
                <motion.button onClick={() => setFaqOpen(faqOpen === idx ? null : idx)} className="w-full text-right py-3 font-semibold text-white flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-xs opacity-80">{faqOpen === idx ? 'إخفاء' : 'عرض'}</span>
                </motion.button>
                <AnimatePresence>
                  {faqOpen === idx && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="pl-4 pb-3">
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

        <WaveDivider from={COLOR_DARK} to={COLOR_MID} flip />

        {/* ======================= PARTNERS ======================= */}
        <motion.section className="py-10 md:py-12 px-4 bg-[#192925]" initial="hidden" whileInView="show" variants={container}>
          <SectionHeading title="شركاء المعرفة" subtitle="نتعاون مع مؤسسات تسهم في رسالة الخير." />
          <motion.div variants={container} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 place-items-center">
            {partners.map((src, i) => (
              <motion.img key={i} variants={item} src={src} className="h-12 md:h-14 opacity-80 hover:opacity-100 transition" alt="partner" />
            ))}
          </motion.div>
        </motion.section>

        <WaveDivider from={COLOR_MID} to={COLOR_DARK} />

        {/* ======================= NEWSLETTER CTA ======================= */}
        <motion.section className="py-12 md:py-14 px-4 bg-[#3B5049]" initial="hidden" whileInView="show" variants={container}>
          <div className="max-w-4xl mx-auto bg-[#213833] rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
            <Ornament className="absolute -left-10 -top-10 w-64" />
            <motion.div variants={fadeIn}>
              <h4 className="text-2xl md:text-3xl font-extrabold text-white mb-2">انضم إلى القائمة البريدية</h4>
              <p className="text-[${ACCENT}] mb-4">مختصرات دروس، جداول المقررات، وتنبيهات البث المباشر.</p>
            </motion.div>
            <motion.form variants={container} className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#192925] w-5 h-5" />
                <input type="email" placeholder="بريدك الإلكتروني" required className="w-full h-12 pl-10 pr-4 rounded-lg bg-[${ACCENT}] text-[#192925] placeholder-[#192925]/70 focus:ring-2 focus:ring-white outline-none" />
              </div>
              <PrimaryButton type="submit" className="h-12 px-6">اشترك الآن</PrimaryButton>
            </motion.form>
            <div className="mt-3 flex items-center gap-2 text-[${ACCENT}] text-sm">
              <Check className="w-4 h-4" />
              <span>لا رسائل إزعاج، إلغاء الاشتراك متاح بأي وقت.</span>
            </div>
          </div>
        </motion.section>

        <WaveDivider from={COLOR_DARK} to={COLOR_MID} flip />

        {/* ======================= CONTACT ======================= */}
        <motion.section id="contact" className="py-12 md:py-14 px-4 bg-[#192925]" initial="hidden" whileInView="show" variants={container}>
          <SectionHeading title="تواصل معنا" subtitle="إسطنبول، باشاك شهير · ٠٥٤٢٣٨٢٥٠١٤ · من ٩ صباحًا إلى ٥ مساءً" />
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <motion.form variants={item} className="bg-[#213833] rounded-2xl p-6 border border-white/5 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="h-11 rounded-lg bg-black/20 border border-white/10 px-3 text-white placeholder-white/50" placeholder="الاسم" />
                <input className="h-11 rounded-lg bg-black/20 border border-white/10 px-3 text-white placeholder-white/50" placeholder="البريد" />
              </div>
              <input className="h-11 rounded-lg bg-black/20 border border-white/10 px-3 text-white placeholder-white/50" placeholder="الموضوع" />
              <textarea className="min-h-[120px] rounded-lg bg:black/20 bg-black/20 border border-white/10 px-3 py-2 text-white placeholder-white/50" placeholder="رسالتك" />
              <PrimaryButton type="submit" className="h-11">إرسال</PrimaryButton>
            </motion.form>

            <motion.div variants={item} className="rounded-2xl border border-white/10 overflow-hidden bg-[#213833]">
              {/* Map placeholder / promo video */}
              <div className="aspect-video w-full bg-black/30 grid place-items-center">
                <div className="text-center">
                  <Play className="mx-auto mb-2" />
                  <p className="text-white">مقطع تعريفي قصير</p>
                  <p className="text-[${ACCENT}] text-sm">يمكن استبداله بخرائط Google لاحقاً</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}
