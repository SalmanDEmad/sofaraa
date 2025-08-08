// File: resources/js/Pages/About.tsx
// About page for أكاديمية سفراء الهداية (Sofara al‑Hidaya Academy)
// Theme: Midnight & Gold (deep navy + warm gold + ivory)
// Tech: React + Inertia + Tailwind + Framer Motion (light use)
// Notes: RTL‑friendly layout, no decorative SVG waves, compact spacing, clean hierarchy

import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import PrimaryButton from '@/Components/PrimaryButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Users, BookOpenCheck, ShieldCheck, Star, GraduationCap, BookText,
  Library, BookMarked, Megaphone, Radio, CalendarDays, Globe2, Video,
  Check, Mail, Award, Building2, Bookmark, Sparkles
} from 'lucide-react';

// ---------------------------------------------
// Theme
// ---------------------------------------------
const BG_PRIMARY   = '#0B1F3A';   // deep navy
const BG_SECONDARY = '#132B4A';   // slightly lighter navy
const TEXT_IVORY   = '#F5F5F0';   // ivory
const GOLD         = '#D4AF37';   // burnished gold
const COOL_GREY    = '#8FA0B5';   // cool grey

// Motion
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 18 } } };

// ---------------------------------------------
// Page
// ---------------------------------------------
export default function About({ auth }: { auth: any }) {
  // set CSS variables once
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', BG_PRIMARY);
    document.documentElement.style.setProperty('--secondary', BG_SECONDARY);
    document.documentElement.style.setProperty('--ivory', TEXT_IVORY);
    document.documentElement.style.setProperty('--gold', GOLD);
    document.documentElement.style.setProperty('--grey', COOL_GREY);
  }, []);

  // FAQ disclosure
  const [open, setOpen] = useState<number | null>(null);

  // Data (from academy brief)
  const values = ['الرسالية','الأصالة','الوسطية','المعاصرة','التكامل','الإتقان'];

  const specializations = [
    { icon: <BookOpenCheck className="w-8 h-8" />, title: 'التأسيس الإيماني', desc: 'بناء الأساس الدعوي على فهم إيماني متين.' },
    { icon: <ShieldCheck   className="w-8 h-8" />, title: 'التحصين',        desc: 'تحصين الشباب ضد التشكيك والانحراف.' },
    { icon: <Star          className="w-8 h-8" />, title: 'قوانين القرآن',   desc: 'فهم سنن القرآن ومنهجيته في البناء.' },
    { icon: <Star          className="w-8 h-8" />, title: 'قوانين الصراع',   desc: 'تبصير بسنن الصراع كما وردت في القرآن.' },
    { icon: <BookText      className="w-8 h-8" />, title: 'كيف نتعامل مع القرآن', desc: 'منهجية عملية للتعامل مع كتاب الله.' },
    { icon: <GraduationCap className="w-8 h-8" />, title: 'التأهيل الدعوي',  desc: 'إعداد دعاة مؤثرين معرفياً وسلوكياً.' },
    { icon: <Library       className="w-8 h-8" />, title: 'التزكية',          desc: 'تزكية النفس ومكارم الأخلاق.' },
    { icon: <BookMarked    className="w-8 h-8" />, title: 'مرتكزات النجاح للدعاة', desc: 'إضاءات عملية لمسيرة الداعية.' },
  ];

  const metrics = [
    { label: 'طلاب مستهدفون', value: 'طلاب العلم والمهتمون بالقرآن', icon: <Users className="w-5 h-5" /> },
    { label: 'نمط الدراسة',  value: 'مباشر ومسجل', icon: <Video className="w-5 h-5" /> },
    { label: 'التكلفة',      value: 'مجاني بالكامل', icon: <Bookmark className="w-5 h-5" /> },
    { label: 'نطاق الانتساب', value: 'من جميع الدول', icon: <Globe2 className="w-5 h-5" /> },
  ];

  const faqs = [
    { q: 'هل الدورات مجانية؟', a: 'نعم، جميع برامج الأكاديمية مجانية بالكامل.' },
    { q: 'هل الشهادات معترف بها؟', a: 'حالياً لا، ونعمل على الاعتماد والتوثيق.' },
    { q: 'هل يوجد بث مباشر أم مسجّل؟', a: 'كلاهما، بحسب المقرر والمستوى.' },
    { q: 'هل يمكن التسجيل من خارج الدولة؟', a: 'نعم، التسجيل متاح للجميع.' },
    { q: 'هل هناك قسم خاص بالنساء؟', a: 'نعم، هناك أقسام وبرامج مهيأة.' },
    { q: 'هل توجد منح دراسية؟', a: 'نعم، يوجد نظام منح وفق ضوابط معلنة.' },
  ];

  const contacts = {
    address: 'إسطنبول، باشاك شهير',
    phone: '٠٥٤٢٣٨٢٥٠١٤',
    email: 'info@sofaraalhidaya.com', // placeholder until finalized
    hours: 'من التاسعة صباحًا حتى الخامسة مساءً',
    socials: [
      { name: 'فيسبوك', href: '#', label: 'صفحتنا الرسمية' },
      { name: 'تلغرام', href: '#', label: 'قناة الإعلانات' },
      { name: 'يوتيوب', href: '#', label: 'المكتبة المرئية' },
    ],
  };

  const accredit = [
    { title: 'الاعتماد المؤسسي', value: 'قيد العمل', icon: <Building2 className="w-5 h-5" /> },
    { title: 'الشهادات', value: 'شهادات خاصة بالأكاديمية + تعاون مع جهات علمية', icon: <Award className="w-5 h-5" /> },
  ];

  return (
    <>
      <Head title="من نحن | أكاديمية سفراء الهداية" />
      <Header activeLink="#top" userName={auth?.user?.name} />

      <main className="font-sans bg-[--primary] text-[--ivory]" id="top">
        {/* Hero */}
        <motion.section initial="hidden" animate="show" variants={container}
          className="px-4 py-16 md:py-20"
          style={{ background: `linear-gradient(180deg, ${BG_PRIMARY}, ${BG_SECONDARY})` }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.p variants={item} className="text-xs tracking-widest text-[--grey] mb-2">أكاديمية سفراء الهداية</motion.p>
              <motion.h1 variants={item} className="text-4xl md:text-6xl font-extrabold mb-3">من نحن؟</motion.h1>
              <motion.p variants={item} className="text-lg text-[--grey] mb-6">نحو بعثٍ جديد — نُسهم في إعداد نخبة شبابية واعية ومؤهلة لتحمل المسؤولية العقدية والدعوية والفكرية، وفق منهج قرآني متكامل.</motion.p>
              <motion.div variants={container} className="flex flex-wrap gap-3">
                <a href="#mission" className="px-5 py-3 rounded-xl font-bold text-[#0B1F3A] bg-[--gold] hover:opacity-90 transition">رسالتنا ورؤيتنا</a>
                <a href="#tracks" className="px-5 py-3 rounded-xl font-bold border border-[--gold]/70 hover:bg-[--secondary] transition">مساراتنا</a>
              </motion.div>
            </div>
            <motion.div variants={item} className="rounded-2xl border border-white/10 bg-[--secondary] p-6">
              <div className="aspect-video w-full bg-black/20 grid place-items-center rounded-lg">
                <div className="text-center">
                  <Sparkles className="mx-auto mb-2" />
                  <p className="font-semibold">فيديو تعريفي قريبًا</p>
                  <p className="text-[--grey] text-sm">يمكن إضافة مقطع 15–30 ثانية لاحقًا</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section id="mission" initial="hidden" whileInView="show" variants={container} viewport={{ once: true, amount: 0.3 }} className="px-4 py-12 bg-[--secondary]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            <motion.div variants={item} className="rounded-2xl p-6 border border-white/10 bg-black/20">
              <h3 className="text-2xl font-extrabold mb-2">رسالتنا</h3>
              <p className="text-[--grey] leading-relaxed">المساهمة في إعداد نخبة شبابية واعية ومؤهلة لتحمل المسؤولية العقدية والدعوية والفكرية، ومواجهة حملات التشكيك والانحراف، وفق منهج قرآني متكامل.</p>
            </motion.div>
            <motion.div variants={item} className="rounded-2xl p-6 border border-white/10 bg-black/20">
              <h3 className="text-2xl font-extrabold mb-2">رؤيتنا</h3>
              <p className="text-[--grey] leading-relaxed">بناء جيل قرآني رسالي ينهض بالأمة ويصون عقيدتها ويسهم في إعادة بعثها الحضاري.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section initial="hidden" whileInView="show" variants={container} viewport={{ once: true, amount: 0.3 }} className="px-4 py-10 bg-[--primary]">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">قيمنا الأساسية</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {values.map((v, i) => (
                <motion.div key={i} variants={item} className="px-4 py-2 rounded-full text-center bg-black/20 border border-white/10">{v}</motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Target & Study Facts */}
        <motion.section initial="hidden" whileInView="show" variants={container} viewport={{ once: true, amount: 0.3 }} className="px-4 py-12 bg-[--secondary]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <motion.div key={i} variants={item} className="rounded-xl p-5 text-center border border-white/10 bg-black/20">
                <div className="mx-auto w-10 h-10 rounded-lg bg-black/30 flex items-center justify-center">{m.icon}</div>
                <div className="mt-3 text-sm text-[--grey]">{m.label}</div>
                <div className="mt-1 font-extrabold">{m.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Specializations / Courses */}
        <motion.section id="courses" initial="hidden" whileInView="show" variants={container} viewport={{ once: true, amount: 0.3 }} className="px-4 py-12 bg-[--primary]">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-6">ماذا نُدرّس؟</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specializations.map((s, i) => (
                <motion.div key={i} variants={item} className="rounded-2xl p-6 border border-white/10 bg-[--secondary]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-black/20 grid place-items-center text-[--gold]">{s.icon}</div>
                    <h4 className="text-xl font-bold">{s.title}</h4>
                  </div>
                  <p className="text-[--grey]">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Tracks (example grouping) */}
        <motion.section id="tracks" initial="hidden" whileInView="show" variants={container} viewport={{ once: true, amount: 0.3 }} className="px-4 py-12 bg-[--secondary]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            <motion.div variants={item} className="rounded-2xl p-6 border border-white/10 bg-black/20">
              <h4 className="text-xl font-bold mb-3 flex items-center gap-2"><GraduationCap className="w-5 h-5"/> مسار التكوين</h4>
              <ul className="space-y-2 text-[--grey] pr-6 list-disc">
                <li>أصول الإيمان، فقه العبادة، مهارات الدراسة.</li>
                <li>خطوات عملية للانطلاق بثبات.</li>
              </ul>
            </motion.div>
            <motion.div variants={item} className="rounded-2xl p-6 border border-white/10 bg-black/20">
              <h4 className="text-xl font-bold mb-3 flex items-center gap-2"><Megaphone className="w-5 h-5"/> مسار الداعية والمحتوى</h4>
              <ul className="space-y-2 text-[--grey] pr-6 list-disc">
                <li>خطابة وتأثير، كتابة نصوص، تصميم مرئي، بودكاست.</li>
                <li>حضور رقمي هادف بأساليب معاصرة.</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Accreditation & Certificates */}
        <motion.section initial="hidden" whileInView="show" variants={container} viewport={{ once: true, amount: 0.3 }} className="px-4 py-12 bg-[--primary]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {accredit.map((a, i) => (
              <motion.div key={i} variants={item} className="rounded-2xl p-6 border border-white/10 bg-[--secondary]">
                <div className="flex items-center gap-3 text-[--ivory] mb-2">
                  <div className="w-10 h-10 rounded-lg bg-black/20 grid place-items-center">{a.icon}</div>
                  <h4 className="text-xl font-bold">{a.title}</h4>
                </div>
                <p className="text-[--grey]">{a.value}</p>
              </motion.div>
            ))}
            <motion.div variants={item} className="rounded-2xl p-6 border border-white/10 bg-[--secondary] md:col-span-2">
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2"><Award className="w-5 h-5"/> أنواع الشهادات</h4>
              <p className="text-[--grey]">شهادة خاصة بالأكاديمية (تخرج، أو شهادة إتمام لمادة/مرحلة). وقد يتم لاحقًا توثيقها بالشراكة مع جهات علمية متعاونة.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Blog / Tweets (placeholder CTA) */}
        <motion.section initial="hidden" whileInView="show" variants={container} viewport={{ once: true, amount: 0.3 }} className="px-4 py-12 bg-[--secondary]">
          <div className="max-w-6xl mx-auto rounded-2xl p-6 border border-white/10 bg-black/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-2xl font-extrabold mb-1">مدونة ومقتطفات</h4>
                <p className="text-[--grey]">مقالات علمية قصيرة وتغريدات معرفية تُلخّص أهم الأفكار.</p>
              </div>
              <a href="#contact" className="px-5 py-3 rounded-xl font-bold text-[#0B1F3A] bg-[--gold] hover:opacity-90 transition">أرسل لنا مقترحًا</a>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section id="faq" initial="hidden" whileInView="show" variants={container} viewport={{ once: true, amount: 0.3 }} className="px-4 py-12 bg-[--primary]">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-6">الأسئلة الشائعة</h3>
            <div className="space-y-3">
              {faqs.map((f, idx) => (
                <div key={idx} className="border-b border-white/10 pb-2">
                  <button onClick={() => setOpen(open === idx ? null : idx)} className="w-full text-right py-3 font-semibold flex items-center justify-between">
                    <span>{f.q}</span>
                    <span className="text-xs text-[--grey]">{open === idx ? 'إخفاء' : 'عرض'}</span>
                  </button>
                  <AnimatePresence>
                    {open === idx && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="pl-1 pb-3 text-[--grey]">{f.a}</motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section id="contact" initial="hidden" whileInView="show" variants={container} viewport={{ once: true, amount: 0.3 }} className="px-4 py-12 bg-[--secondary]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            <motion.form variants={item} className="rounded-2xl p-6 border border-white/10 bg-black/20 space-y-3">
              <h4 className="text-xl font-bold mb-2">تواصل معنا</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="h-11 rounded-lg bg-black/30 border border-white/10 px-3 text-[--ivory] placeholder-white/50" placeholder="الاسم" />
                <input className="h-11 rounded-lg bg-black/30 border border-white/10 px-3 text-[--ivory] placeholder-white/50" placeholder="البريد" />
              </div>
              <input className="h-11 rounded-lg bg-black/30 border border-white/10 px-3 text-[--ivory] placeholder-white/50" placeholder="الموضوع" />
              <textarea className="min-h-[120px] rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-[--ivory] placeholder-white/50" placeholder="رسالتك" />
              <PrimaryButton type="submit" className="h-11">إرسال</PrimaryButton>
            </motion.form>

            <motion.div variants={item} className="rounded-2xl p-6 border border-white/10 bg-black/20">
              <h4 className="text-xl font-bold mb-2">بيانات التواصل</h4>
              <ul className="text-[--grey] space-y-2">
                <li><strong className="text-[--ivory]">العنوان:</strong> {contacts.address}</li>
                <li><strong className="text-[--ivory]">الهاتف:</strong> {contacts.phone}</li>
                <li><strong className="text-[--ivory]">البريد:</strong> {contacts.email}</li>
                <li><strong className="text-[--ivory]">الدوام:</strong> {contacts.hours}</li>
              </ul>
              <div className="mt-4">
                <h5 className="font-bold mb-2">حساباتنا</h5>
                <div className="flex flex-wrap gap-3">
                  {contacts.socials.map((s, i) => (
                    <a key={i} href={s.href} className="px-3 py-2 rounded-lg border border-white/10 hover:bg-black/30 transition" target="_blank" rel="noopener">{s.name} · <span className="text-[--grey] text-sm">{s.label}</span></a>
                  ))}
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