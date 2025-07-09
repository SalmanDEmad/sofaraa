import React from 'react';
import Header from '../Components/Header';
import VouchCard from '../Components/VouchCard';
import {
  Target, Mic, Users, Star, Layers, Award, MessageCircle
} from 'lucide-react';

const VALUE_ICONS = [
  <Layers className="w-8 h-8 text-[#3B5049]" />,
  <Award className="w-8 h-8 text-[#86836B]" />,
  <Star className="w-8 h-8 text-[#7bb56e]" />,
  <Users className="w-8 h-8 text-[#192925]" />,
  <MessageCircle className="w-8 h-8 text-[#B3B79D]" />,
];

const GOALS = [
  {
    title: "تطوير المعرفة الشرعية والوعي الفكري",
    desc: "فهم عميق للعلوم الشرعية مع ربطها بواقع الحياة ومقاصد الشريعة، وتعزيز التفكير النقدي.",
    icon: <Target className="w-7 h-7 text-[#3B5049] inline ml-2" />
  },
  {
    title: "صقل المهارات الدعوية والتواصل",
    desc: "تدريب عملي على الخطابة والإلقاء واستخدام وسائل التواصل المعاصرة للدعوة.",
    icon: <Mic className="w-7 h-7 text-[#86836B] inline ml-2" />
  },
  {
    title: "غرس القيم والأخلاق الدعوية",
    desc: "ترسيخ قيم الاعتدال والرحمة، وبناء شخصية الداعية القدوة.",
    icon: <Star className="w-7 h-7 text-[#7bb56e] inline ml-2" />
  },
  {
    title: "إعداد قيادات دعوية مؤثرة",
    desc: "تأهيل قادة قادرين على إحداث أثر إيجابي في مجتمعاتهم.",
    icon: <Users className="w-7 h-7 text-[#192925] inline ml-2" />
  }
];

const CORE_VALUES = [
  {
    title: "المنهجية العلمية",
    desc: "الالتزام بالدليل والبحث المنهجي وتحري الدقة.",
    icon: VALUE_ICONS[0]
  },
  {
    title: "الاعتدال والوسطية",
    desc: "تجسيد التسامح والوسطية في الفكر والسلوك.",
    icon: VALUE_ICONS[1]
  },
  {
    title: "الوعي المعاصر",
    desc: "مواكبة العصر والتقنيات الحديثة لخدمة الدعوة.",
    icon: VALUE_ICONS[2]
  },
  {
    title: "القدوة والأخلاق",
    desc: "غرس قيم الصدق والتواضع والرحمة.",
    icon: VALUE_ICONS[3]
  },
  {
    title: "المسؤولية المجتمعية",
    desc: "الإسهام الفعّال في المجتمع بروح المبادرة.",
    icon: VALUE_ICONS[4]
  }
];

const TESTIMONIALS = [
  {
    imageSrc: "https://randomuser.me/api/portraits/men/31.jpg",
    name: "أحمد العلي",
    title: "طالب دبلوم الدعوة",
    text: "الأكاديمية منحتني عمقًا علميًا وبيئة ملهمة للنمو والتأثير.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    imageSrc: "https://randomuser.me/api/portraits/women/42.jpg",
    name: "فاطمة الشامسي",
    title: "خريجة مهارات الخطابة",
    text: "تعلمت هنا كيف أخاطب الناس وألهمهم بالرحمة والحكمة.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    imageSrc: "https://randomuser.me/api/portraits/men/77.jpg",
    name: "سعيد المنصوري",
    title: "خريج برنامج التأهيل الدعوي",
    text: "الأساليب المعاصرة والقيم الأصيلة كانت مزيجًا فريدًا.",
    rating: "⭐⭐⭐⭐⭐"
  }
];

const AboutUs: React.FC<{ auth?: any }> = ({ auth }) => {
  return (
    <main className="bg-[#f5f6ef] text-[#192925] min-h-screen font-sans">
      <Header activeLink="#about" userName={auth?.user?.name} />

      {/* HERO */}
      <section className="relative text-center py-24 px-2 bg-gradient-to-br from-[#fcfcfc] via-[#B3B79D]/20 to-[#86836B]/10">
        <div className="max-w-3xl mx-auto rounded-3xl px-8 py-16 shadow-md bg-white/80 border border-[#B3B79D]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#3B5049] leading-tight">
            أكاديمية الوعي الدعوي
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-[#86836B] font-medium">
            الريادة في الدعوة المؤثرة والتأهيل الشرعي العصري
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <span className="inline-block bg-[#B3B79D]/50 text-[#3B5049] px-4 py-1 rounded-full text-sm font-semibold">
              بيئة أكاديمية عصرية
            </span>
            <span className="inline-block bg-[#3B5049]/10 text-[#3B5049] px-4 py-1 rounded-full text-sm font-semibold">
              بإشراف علماء موثوقين
            </span>
            <span className="inline-block bg-[#86836B]/20 text-[#192925] px-4 py-1 rounded-full text-sm font-semibold">
              متاحة عن بعد مجانًا
            </span>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-[#fdf7ee]">
        <div className="container max-w-5xl mx-auto grid gap-8 md:grid-cols-2 px-2">
          <div className="bg-white rounded-2xl shadow border border-[#B3B79D] flex flex-col items-center px-7 py-9 text-center">
            <span className="block text-4xl mb-3">🌟</span>
            <h2 className="text-2xl font-bold text-[#3B5049] mb-2">رؤيتنا</h2>
            <p className="text-lg text-[#192925] leading-relaxed">
              أن نصبح الأكاديمية الأولى في إعداد الدعاة القادرين على التأثير الإيجابي
              وبناء وعي مجتمعي مستنير بمقاصد الشريعة وفهم الواقع.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow border border-[#B3B79D] flex flex-col items-center px-7 py-9 text-center">
            <span className="block text-4xl mb-3">🎯</span>
            <h2 className="text-2xl font-bold text-[#3B5049] mb-2">رسالتنا</h2>
            <p className="text-lg text-[#192925] leading-relaxed">
              تقديم برامج تعليمية وتدريبية متكاملة تجمع بين المنهجية العلمية، القيم الأخلاقية، والمهارات العصرية.
            </p>
          </div>
        </div>
      </section>

      {/* Goals (Timeline style) */}
      <section className="py-20 bg-[#B3B79D]/20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-14 text-[#3B5049]">أهداف الأكاديمية</h2>
          <ol className="relative border-r-4 border-[#B3B79D] pr-10">
            {GOALS.map((goal, i) => (
              <li key={i} className="mb-10 last:mb-0 relative">
                <div className="absolute right-[-27px] top-1 flex items-center justify-center w-12 h-12 bg-white border-2 border-[#B3B79D] rounded-full shadow">
                  <span className="text-2xl">{i + 1}</span>
                </div>
                <div className="bg-white rounded-xl shadow border border-[#B3B79D]/60 px-8 py-6 mr-8">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">{goal.icon}{goal.title}</h3>
                  <p className="text-[#3B5049]">{goal.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#fdf7ee]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3B5049]">القيم الأساسية</h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {CORE_VALUES.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center text-center bg-white border border-[#B3B79D]/70 rounded-2xl shadow-sm px-6 py-10 hover:scale-105 transition-all duration-200">
                <div className="mb-3">{val.icon}</div>
                <h4 className="text-lg font-bold text-[#3B5049] mb-2">{val.title}</h4>
                <p className="text-sm text-[#192925]">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#B3B79D]/20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3B5049]">آراء الخريجين</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex-1 bg-white rounded-2xl shadow p-8 border border-[#B3B79D] flex flex-col items-center text-center max-w-sm mx-auto">
                <img src={t.imageSrc} alt={t.name} className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-[#B3B79D]/30" />
                <h5 className="font-bold text-lg mb-1">{t.name}</h5>
                <span className="text-[#86836B] mb-2 text-sm">{t.title}</span>
                <p className="mb-4 text-[#3B5049]">{t.text}</p>
                <span className="text-xl">{t.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;