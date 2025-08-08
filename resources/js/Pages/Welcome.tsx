import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import PrimaryButton from '@/Components/PrimaryButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Youtube, Facebook, Instagram, Twitter, Send,
  BookOpenCheck, ShieldCheck, Star, Users, Mail,
  ArrowRight, ArrowLeft, GraduationCap, BookText, Library, BookMarked, Megaphone, Radio, CalendarDays, Globe2, Video
} from 'lucide-react';

/**
 * THEME (Midnight & Gold)
 * bg-primary:    #0B1F3A (deep navy)
 * bg-secondary:  #132B4A (slightly lighter navy)
 * text-accent:   #F5F5F0 (ivory)
 * brand-gold:    #D4AF37 (burnished gold)
 * neutral:       #8FA0B5 (cool grey)
 */

const BG_PRIMARY   = '#0B1F3A';
const BG_SECONDARY = '#132B4A';
const TEXT_IVORY   = '#F5F5F0';
const GOLD         = '#D4AF37';
const COOL_GREY    = '#8FA0B5';

// Motion
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 18 } } };

// Data
const values = [
  'الرسالية','الأصالة','الوسطية','المعاصرة','التكامل','الإتقان',
  'الإبداع','المصداقية','العمل الجماعي','التطوير المستمر'
];

const metrics = [
  { label: 'طلاب نشطون', value: '2,400+', icon: <Users className="w-5 h-5" /> },
  { label: 'دروس منشورة', value: '350+', icon: <Video className="w-5 h-5" /> },
  { label: 'ساعات تعلم', value: '1,800+', icon: <CalendarDays className="w-5 h-5" /> },
  { label: 'بلدان مشاركة', value: '27', icon: <Globe2 className="w-5 h-5" /> },
];

const courses = [
  { icon: <BookOpenCheck className="w-10 h-10 text-[#D4AF37]" />, title: 'التأسيس الإيماني',   description: 'بناء الأساس الدعوي على فهم إيماني متين.' },
  { icon: <ShieldCheck   className="w-10 h-10 text-[#D4AF37]" />, title: 'التحصين والعقيدة',   description: 'تحصين الشباب ضد التشكيك والانحراف.' },
  { icon: <Star          className="w-10 h-10 text-[#D4AF37]" />, title: 'قوانين القرآن',      description: 'فهم القرآن بمنهجية واضحة.' },
  { icon: <GraduationCap className="w-10 h-10 text-[#D4AF37]" />, title: 'التأهيل الدعوي',     description: 'إعداد دعاة مؤثرين معرفياً وسلوكياً.' },
  { icon: <BookText      className="w-10 h-10 text-[#D4AF37]" />, title: 'مهارات الخطابة',     description: 'إتقان فنون الإلقاء والتأثير.' },
  { icon: <Library       className="w-10 h-10 text-[#D4AF37]" />, title: 'علوم القرآن',         description: 'مباحث علوم القرآن وأدوات الفهم.' },
  { icon: <BookMarked    className="w-10 h-10 text-[#D4AF37]" />, title: 'الفقه الميسر',        description: 'مختصرات عملية للمبتدئ والمتوسط.' },
  { icon: <Megaphone     className="w-10 h-10 text-[#D4AF37]" />, title: 'المحتوى الدعوي',      description: 'كتابة، تصميم، ونشر هادف.' },
];

const programs = [
  { icon: <GraduationCap className="w-6 h-6" />, title: 'مسار التكوين',  points: ['أصول الإيمان', 'فقه العبادة', 'مهارات الدراسة'] },
  { icon: <Megaphone     className="w-6 h-6" />, title: 'مسار المحتوى',  points: ['كتابة نصوص', 'تصميم مرئي', 'مونتاج مبسط'] },
  { icon: <Radio         className="w-6 h-6" />, title: 'مسار البودكاست', points: ['إعداد حلقات', 'حوارات هادفة', 'نشر وترويج'] },
  { icon: <BookText      className="w-6 h-6" />, title: 'مسار الداعية',  points: ['خطابة وتأثير', 'مناظرة هادئة', 'حضور رقمي'] },
];

// Socials (placeholders for the academy; replace hrefs later)
const socialLinks = [
  { platform: 'يوتيوب',    label: 'حلقات مرئية',  href: '#', icon: <Youtube className="w-7 h-7 text-[#ff0000]" /> },
  { platform: 'انستغرام',  label: 'لقطات ومقتطفات', href: '#', icon: <Instagram className="w-7 h-7 text-[#E4405F]" /> },
  { platform: 'فيسبوك',    label: 'تحديثات رسمية', href: '#', icon: <Facebook className="w-7 h-7 text-[#1877f3]" /> },
  { platform: 'تلغرام',    label: 'إعلانات ومواعيد', href: '#', icon: <Send className="w-7 h-7 text-[#229ed9]" /> },
  { platform: 'تويتر X',   label: 'فوائد قصيرة',  href: '#', icon: <Twitter className="w-7 h-7 text-[#1da1f2]" /> },
];

// FAQ
const faqs = [
  { q: 'ما شروط الالتحاق بالدورات؟', a: 'الاهتمام بالعلم الشرعي والالتزام بالحضور.' },
  { q: 'هل الدورات مجانية؟', a: 'نعم، جميع برامج الأكاديمية مجانية.' },
  { q: 'هل الشهادات معترف بها؟', a: 'ليست معتمدة رسمياً حتى الآن.' },
  { q: 'هل الدروس مباشرة أم مسجلة؟', a: 'نقدّم كلا النوعين بحسب المادة.' },
  { q: 'هل التسجيل متاح للجميع؟', a: 'نعم، التسجيل مفتوح من أي بلد.' },
];

// Components
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-8">
      <h3 className="text-3xl md:text-4xl font-extrabold text-[--ivory] mb-2">{title}</h3>
      {subtitle && <p className="text-[--grey]">{subtitle}</p>}
    </div>
  );
}

function MetricCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <motion.div variants={item} className="rounded-xl p-5 text-center border border-white/10 bg-[--secondary]">
      <div className="mx-auto w-10 h-10 rounded-lg bg-black/20 flex items-center justify-center text-[--ivory]">{icon}</div>
      <div className="mt-3 text-2xl font-extrabold text-[--ivory]">{value}</div>
      <div className="text-[--grey] mt-1">{label}</div>
    </motion.div>
  );
}

function ProgramCard({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
  return (
    <motion.div variants={item} className="rounded-2xl p-6 border border-white/10 bg-[--secondary]">
      <div className="flex items-center gap-3 text-[--ivory]">
        <div className="w-10 h-10 rounded-lg bg-black/20 flex items-center justify-center">{icon}</div>
        <h4 className="text-xl font-bold">{title}</h4>
      </div>
      <ul className="mt-4 space-y-2 pr-6 list-disc text-[--grey]">
        {points.map((p, i) => <li key={i} className="leading-relaxed">{p}</li>)}
      </ul>
    </motion.div>
  );
}

function CourseCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div variants={item} className="bg-[--secondary] p-6 rounded-2xl shadow-lg text-center hover:scale-[1.02] transition-transform border border-white/10">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h4 className="text-2xl font-bold text-[--ivory] mb-2">{title}</h4>
      <p className="text-[--grey]">{description}</p>
    </motion.div>
  );
}

// Testimonials Carousel
function useAutoPlay(index: number, setIndex: (n: number) => void, total: number, enabled = true, delay = 4500) {
  const ref = useRef<number | null>(null);
  useEffect(() => {
    if (!enabled) return;
    ref.current && window.clearTimeout(ref.current);
    ref.current = window.setTimeout(() => setIndex((index + 1) % total), delay);
    return () => { if (ref.current) window.clearTimeout(ref.current); };
  }, [index, setIndex, total, enabled, delay]);
}

export default function Welcome({ auth }: { auth: any }) {
  // CSS vars for theme
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', BG_PRIMARY);
    document.documentElement.style.setProperty('--secondary', BG_SECONDARY);
    document.documentElement.style.setProperty('--ivory', TEXT_IVORY);
    document.documentElement.style.setProperty('--gold', GOLD);
    document.documentElement.style.setProperty('--grey', COOL_GREY);
  }, []);

  const testimonials = useMemo(() => ([
    { name: 'محمد عبدالله', avatar: '/assets/avatars/1.png', text: 'كانت نقطة تحول في فهمي للدعوة. شكراً لهذه الرؤية.' },
    { name: 'فاطمة الزهراء', avatar: '/assets/avatars/2.png', text: 'منهج متكامل جمع العلم بالأخلاق والوسطية.' },
    { name: 'علي حسن', avatar: '/assets/avatars/3.png', text: 'تعلمت كيف أكون داعية حقيقي بالعلم والسلوك.' },
    { name: 'سارة محمود', avatar: '/assets/avatars/4.png', text: 'أسلوب رائع وأجواء محفزة للتعلم.' },
  ]), []);

  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Carousel state
  const [slide, setSlide] = useState(0);
  const perView = useResponsivePerView(); // 1 on mobile, 2 on md, 3 on lg+
  useAutoPlay(slide, setSlide, Math.ceil(testimonials.length / perView), true, 5000);

  const totalPages = Math.max(1, Math.ceil(testimonials.length / perView));
  const pageItems = chunk(testimonials, perView);

  return (
    <>
      <Head title="أكاديمية سفراء الهداية" />
      <Header activeLink="#home" userName={auth?.user?.name} />

      <main className="font-sans bg-[--primary] text-[--ivory]">
        {/* HERO */}
        <motion.section
          id="home"
          initial="hidden" animate="show" variants={container}
          className={`min-h-screen px-4 flex flex-col items-center justify-center`}
        >
          <div
            className="absolute inset-0 -z-10 w-full h-full"
            style={{ background: `linear-gradient(180deg, ${BG_PRIMARY}, ${BG_SECONDARY})` }}
          />
          <motion.div variants={item} className="text-xs tracking-widest uppercase text-[--grey] mb-3">أكاديمية سفراء الهداية</motion.div>
          <motion.h1 variants={item} className="text-5xl md:text-7xl font-extrabold text-center mb-3">
            سفراء <span className="text-[--gold]">الهداية</span>
          </motion.h1>
          <motion.p variants={item} className="text-lg md:text-2xl text-center max-w-2xl text-[--grey] mb-6">
            نحو بعثٍ جديد بصناعة دعوة جادة وعصرية تنطلق من العلم والعمل.
          </motion.p>
          <motion.div variants={container} className="flex flex-wrap gap-3 justify-center">
            <a href="#courses" className="px-6 py-3 rounded-xl font-bold text-[#0B1F3A] bg-[--gold] hover:opacity-90 transition">ابدأ من الدورات</a>
            <a href="#about" className="px-6 py-3 rounded-xl font-bold border border-[--gold]/70 text-[--ivory] hover:bg-[--secondary] transition">اعرف المزيد</a>
          </motion.div>

          {/* Metrics */}
          <motion.div variants={container} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl w-full">
            {metrics.map((m, i) => (<MetricCard key={i} icon={m.icon} value={m.value} label={m.label} />))}
          </motion.div>
        </motion.section>

        {/* VALUES */}
        <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
                        variants={container} className="min-h-screen px-4 py-10 bg-[--secondary]">
          <SectionHeading title="قيمنا الأساسية" subtitle="منظومة قيم تبني إنساناً رسالياً متوازناً." />
          <motion.div variants={container} className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {values.map((val, idx) => (
              <motion.div key={idx} variants={item}
                          className="px-5 py-3 rounded-full text-center font-semibold bg-black/20 border border-white/10">
                {val}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ABOUT */}
        <motion.section id="about" initial="hidden" whileInView="show" variants={container}
                        viewport={{ once: true, amount: 0.3 }} className="min-h-screen px-4 py-12 bg-[--primary]">
          <SectionHeading title="رؤيتنا ورسالتنا"
                          subtitle="رؤية: بناء جيل قرآني رسالي ينهض بالأمة. رسالة: إعداد نخبة شبابية واعية بالعلم والعمل والأخلاق." />
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <motion.div variants={item} className="rounded-2xl p-6 border border-white/10 bg-[--secondary]">
              <h4 className="text-xl font-bold mb-3">مبادئ العمل</h4>
              <ul className="space-y-2 text-[--grey] pr-6 list-disc">
                <li>المنهجية القرآنية والنبويّة.</li>
                <li>التوازن بين المعرفة والسلوك.</li>
                <li>الرقمنة في التعليم والدعوة.</li>
                <li>شراكات للنفع العام.</li>
              </ul>
            </motion.div>
            <motion.div variants={item} className="rounded-2xl p-6 border border-white/10 bg-[--secondary]">
              <h4 className="text-xl font-bold mb-3">أهدافنا</h4>
              <ul className="space-y-2 text-[--grey] pr-6 list-disc">
                <li>تأهيل دعاة شباب مؤثرين.</li>
                <li>إنتاج محتوى معرفي رصين.</li>
                <li>مدّ الجسور مع المجتمع المدني.</li>
                <li>بناء منصات تعلم مستمرة.</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* COURSES */}
        <motion.section id="courses" initial="hidden" whileInView="show" variants={container}
                        viewport={{ once: true, amount: 0.3 }} className="min-h-screen px-4 py-14 bg-[--secondary]">
          <SectionHeading title="أبرز الدورات"
                          subtitle="مقررات مختصرة ومتدرجة لبناء الأساس المتين." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {courses.map((c, i) => (<CourseCard key={i} icon={c.icon} title={c.title} description={c.description} />))}
          </div>
        </motion.section>

        {/* PROGRAMS */}
        <motion.section initial="hidden" whileInView="show" variants={container}
                        viewport={{ once: true, amount: 0.3 }} className="min-h-screen px-4 py-12 bg-[--primary]">
          <SectionHeading title="المسارات التعليمية" subtitle="اختر مسارك بحسب هدفك ومرحلتك." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {programs.map((p, i) => (<ProgramCard key={i} icon={p.icon} title={p.title} points={p.points} />))}
          </div>
        </motion.section>

        {/* MEDIA (links are placeholders) */}
        <motion.section id="media" initial="hidden" whileInView="show" variants={container}
                        viewport={{ once: true, amount: 0.3 }} className="min-h-screen px-4 py-12 bg-[--secondary]">
          <SectionHeading title="تابعونا عبر" subtitle="منصّات الأكاديمية للنشر والتواصل." />
          <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {socialLinks.map((s, idx) => (
              <motion.a key={idx} variants={item} href={s.href} target="_blank" rel="noopener"
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[--primary] p-4 hover:bg-black/30 transition">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-full">{s.icon}</div>
                  <div>
                    <h4 className="text-lg font-bold text-[--ivory]">{s.platform}</h4>
                    <p className="text-sm text-[--grey]">{s.label}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        {/* TESTIMONIALS — Carousel */}
        <motion.section id="testimonial" initial="hidden" whileInView="show" variants={container}
                        viewport={{ once: true, amount: 0.2 }} className="min-h-screen px-4 py-12 bg-[--primary]">
          <SectionHeading title="آراء طلابنا" subtitle="لقطات سريعة من أثر البرامج على طلابنا." />
          <div className="max-w-6xl mx-auto">
            {/* Controls */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <button
                aria-label="السابق"
                onClick={() => setSlide((s) => (s - 1 + totalPages) % totalPages)}
                className="p-2 rounded-lg border border-white/10 hover:bg-black/20"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="text-sm text-[--grey]">الصفحة {slide + 1} / {totalPages}</div>
              <button
                aria-label="التالي"
                onClick={() => setSlide((s) => (s + 1) % totalPages)}
                className="p-2 rounded-lg border border-white/10 hover:bg-black/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="relative overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={slide}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.35 }}
                  className={`grid gap-6 ${perView === 1 ? 'grid-cols-1' : perView === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}
                >
                  {pageItems[slide].map((t, idx) => (
                    <div key={idx} className="bg-[--secondary] p-6 rounded-xl border border-white/10 text-center">
                      <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2" style={{ borderColor: GOLD }} />
                      <p className="italic mb-3">"{t.text}"</p>
                      <h5 className="font-bold" style={{ color: GOLD }}>{t.name}</h5>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section id="faq" initial="hidden" whileInView="show" variants={container}
                        viewport={{ once: true, amount: 0.2 }} className="min-h-screen px-4 py-12 bg-[--secondary]">
          <SectionHeading title="الأسئلة الشائعة" />
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, idx) => (
              <div key={idx} className="border-b border-white/10 pb-2">
                <button onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                        className="w-full text-right py-3 font-semibold flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-xs text-[--grey]">{faqOpen === idx ? 'إخفاء' : 'عرض'}</span>
                </button>
                <AnimatePresence>
                  {faqOpen === idx && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                              className="pl-4 pb-3 text-[--grey]">
                      {f.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section id="contact" initial="hidden" whileInView="show" variants={container}
                        viewport={{ once: true, amount: 0.2 }} className="min-h-screen px-4 py-12 bg-[--primary]">
          <SectionHeading title="تواصل معنا" subtitle="إسطنبول، باشاك شهير · ٠٥٤٢٣٨٢٥٠١٤ · من ٩ صباحًا إلى ٥ مساءً" />
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <motion.form variants={item} className="rounded-2xl p-6 border border-white/10 bg-[--secondary] space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="h-11 rounded-lg bg-black/20 border border-white/10 px-3 text-[--ivory] placeholder-white/50" placeholder="الاسم" />
                <input className="h-11 rounded-lg bg-black/20 border border-white/10 px-3 text-[--ivory] placeholder-white/50" placeholder="البريد" />
              </div>
              <input className="h-11 rounded-lg bg-black/20 border border-white/10 px-3 text-[--ivory] placeholder-white/50" placeholder="الموضوع" />
              <textarea className="min-h-[120px] rounded-lg bg-black/20 border border-white/10 px-3 py-2 text-[--ivory] placeholder-white/50" placeholder="رسالتك" />
              <PrimaryButton type="submit" className="h-11">إرسال</PrimaryButton>
            </motion.form>
            <motion.div variants={item} className="rounded-2xl border border-white/10 bg-[--secondary] p-6">
              <div className="aspect-video w-full bg-black/20 grid place-items-center rounded-lg">
                <div className="text-center">
                  <p className="text-[--ivory] font-semibold">مقطع تعريفي / خريطة الموقع</p>
                  <p className="text-[--grey] text-sm">ضع فيديو تعريفي قصير أو تضمين خرائط لاحقاً</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-[--grey]">
                البريد: info@sofaraahidaya.com
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}

/* ---------- utilities ---------- */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
function useResponsivePerView() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const mq2 = window.matchMedia('(min-width: 768px)');
    const mq3 = window.matchMedia('(min-width: 1024px)');
    const update = () => setN(mq3.matches ? 3 : mq2.matches ? 2 : 1);
    update();
    mq2.addEventListener('change', update);
    mq3.addEventListener('change', update);
    return () => { mq2.removeEventListener('change', update); mq3.removeEventListener('change', update); };
  }, []);
  return n;
}