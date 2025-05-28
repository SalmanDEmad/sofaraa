import React, { useState, useRef, useEffect } from 'react';
import Header from '../Components/Header';
import VouchCard from '../Components/VouchCard';

interface AboutUsProps {
  auth?: any;
}

const AboutUs: React.FC<AboutUsProps> = ({ auth }) => {
  const [activeGoalIndex, setActiveGoalIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goals = [
    {
      title: "تطوير المعرفة الشرعية والوعي الفكري",
      desc: "تزويد الدارسين بفهم عميق وشامل للعلوم الشرعية، مع التركيز على فقه الواقع ومقاصد الشريعة، وتعزيز التفكير النقدي."
    },
    {
      title: "صقل المهارات الدعوية والتواصل",
      desc: "تدريب الدارسين على فنون الخطابة والإلقاء، وتنمية مهارات الحوار الفعال واستخدام الوسائل الحديثة للدعوة."
    },
    {
      title: "غرس القيم والأخلاق الدعوية",
      desc: "ترسيخ قيم الاعتدال والتسامح والرحمة، وبناء شخصية الداعية القدوة والملتزمة بالأخلاق الإسلامية السامية."
    },
    {
      title: "إعداد قيادات دعوية مؤثرة",
      desc: "تأهيل الدعاة ليكونوا قادة فكر ومصلحين في مجتمعاتهم وبناء شبكة تعاون خبرات داعية."
    }
  ];

  const coreValues = [
    {
      title: "المنهجية العلمية والعمق الفكري",
      desc: "الإيمان بأهمية المعرفة الصحيحة والبحث المنهجي، والالتزام بالأدلة الشرعية والتدقيق العلمي."
    },
    {
      title: "الاعتدال والوسطية",
      desc: "التزام بمنهج وسطي متوازن بعيداً عن التطرف، وتعزيز قيم التسامح وقبول الآخر."
    },
    {
      title: "الوعي الشامل ومواكبة العصر",
      desc: "تأهيل الدعاة لاستخدام التكنولوجيا والوسائط الحديثة، وسد الفجوة بين التراث والمعاصرة."
    },
    {
      title: "الأخلاق الحميدة والقدوة الحسنة",
      desc: "غرس قيم الصدق، التواضع، والرحمة، وبناء شخصية داعية قدوة في المجتمع."
    },
    {
      title: "التأثير الإيجابي والمسؤولية المجتمعية",
      desc: "السعي الدائم لإحداث فرق ملموس وتعزيز روح المبادرة والعمل التطوعي."
    }
  ];

  return (
    <main className="bg-[#fdf7ee] text-[#402a13] pb-16">
      <Header activeLink="#about" userName={auth?.user?.name} />

      <div className="container px-6 mx-auto p-5 space-y-16">

        {/* Hero */}
        <section
          id="about"
          className="relative text-center py-16 px-4 bg-cover bg-center rounded-xl"
        >
          <div className="bg-[#402a13] bg-opacity-60 p-8 rounded-lg inline-block">
            <h2 className="text-5xl font-bold mb-2 text-white">أكاديمية الوعي الدعوي</h2>
            <p className="text-xl text-white">ريادة في الدعوة المؤثرة</p>
          </div>
        </section>

        {/* Vision */}
        <section className="space-y-4 px-4 lg:px-8">
          <h2 className="text-3xl font-semibold text-center">رؤية الأكاديمية</h2>
          <p className="text-lg leading-relaxed text-center">
            أن نكون المؤسسة الرائدة في تأهيل الدعاة والمصلحين، وتمكينهم من إحداث تأثير إيجابي ووعي مجتمعي مستنير، قائم على الفهم العميق للإسلام ومقتضيات العصر.
          </p>
        </section>

        {/* Mission */}
        <section className="space-y-4 px-4 lg:px-8">
          <h2 className="text-3xl font-semibold text-center">رسالة الأكاديمية</h2>
          <p className="text-lg leading-relaxed text-center">
            نسعى في أكاديمية الوعي الدعوي إلى بناء القدرات الدعوية والفكرية للأفراد من خلال تقديم برامج تعليمية وتدريبية متكاملة ومبتكرة. تهدف هذه البرامج إلى غرس المنهجية العلمية والوعي الشامل بالقضايا الشرعية والمجتمعية، وتزويدهم بالمهارات اللازمة للتواصل الفعال، وتعزيز القيم الأخلاقية، والإسهام بفعالية في بناء مجتمع واعٍ ومتحضر.
          </p>
        </section>

        {/* Goals Accordion */}
        <section className="px-4 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-8">أهداف الأكاديمية</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {goals.map((goal, idx) => (
              <div
                key={idx}
                className="bg-[#f6eddc] border border-[#e6dcc6] rounded-lg shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() =>
                    setActiveGoalIndex(activeGoalIndex === idx ? null : idx)
                  }
                  className="w-full text-right px-6 py-4 font-semibold text-lg flex justify-between items-center focus:outline-none"
                >
                  <span>{idx + 1}. {goal.title}</span>
                  <span className="text-xl">{activeGoalIndex === idx ? '−' : '+'}</span>
                </button>

                {/* Collapsible content with height transition */}
                <div
                  ref={(el) => (contentRefs.current[idx] = el)}
                  style={{
                    maxHeight:
                      activeGoalIndex === idx
                        ? `${contentRefs.current[idx]?.scrollHeight}px`
                        : '0px',
                  }}
                  className="px-6 text-base text-[#402a13] transition-max-height duration-500 ease-in-out overflow-hidden"
                >
                  <div className="py-4">{goal.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="px-4 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-12">القيم الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-[#fdf7ee] border border-[#e6dcc6] shadow-sm rounded-xl p-6 space-y-3"
              >
                <h3 className="text-xl font-bold text-[#402a13]">{val.title}</h3>
                <hr className="border-[#d3a661] w-12 border-t-2" />
                <p className="text-base leading-relaxed text-[#402a13]">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-6">آراء الخريجين</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <VouchCard
              imageSrc="https://via.placeholder.com/150"
              name="أحمد العلي"
              title="طالب دبلوم الدعوة"
              text="المنهجية العميقة والبيئة التفاعلية في الأكاديمية حولتني من متعلم إلى داعية قادر على التأثير."
              rating="5 ⭐⭐⭐⭐⭐"
            />
            <VouchCard
              imageSrc="https://via.placeholder.com/150"
              name="فاطمة الشامسي"
              title="خريجة مهارات الخطابة"
              text="تعلمت هنا فنون الإلقاء والخطابة، وصرت أكثر ثقة أمام الجمهور."
              rating="5 ⭐⭐⭐⭐⭐"
            />
            <VouchCard
              imageSrc="https://via.placeholder.com/150"
              name="سعيد المنصوري"
              title="خريج برنامج التأهيل الدعوي"
              text="الأكاديمية منحتني الأدوات والأساليب الحديثة لأكون أكثر تأثيرًا في مجتمعي."
              rating="5 ⭐⭐⭐⭐⭐"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;