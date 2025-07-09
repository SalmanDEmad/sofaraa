import React from 'react';
import Header from '../Components/Header';
import TextInput from '../Components/TextInput';
import TextArea from '../Components/TextArea';
import InputLabel from '../Components/InputLabel';
import InputError from '../Components/InputError';
import Footer from '../Components/Footer';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const SOCIAL = [
  {
    label: 'واتساب',
    icon: <MessageCircle className="w-6 h-6 mr-2 text-[#3B5049]" />,
    href: 'https://wa.me/97412345678',
    cta: 'دردشة مباشرة',
  },
  {
    label: 'البريد الإلكتروني',
    icon: <Mail className="w-6 h-6 mr-2 text-[#3B5049]" />,
    href: 'mailto:info@alwaei-academy.com',
    cta: 'إرسال رسالة',
  },
  {
    label: 'اتصال هاتفي',
    icon: <Phone className="w-6 h-6 mr-2 text-[#3B5049]" />,
    href: 'tel:+97412345678',
    cta: 'اتصل بنا',
  },
];

const Contact: React.FC<{ auth?: any }> = ({ auth }) => {
  return (
    <main className="bg-[#B3B79D] text-[#192925] min-h-screen font-sans">
      <Header activeLink="#contact" userName={auth?.user?.name} />
      <div className="container mx-auto px-4 lg:px-8 py-14">
        {/* Header Block */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-black mb-4 text-[#192925]">تواصل معنا</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#3B5049]">
            نسعد بالتواصل معك! أرسل استفسارك أو ملاحظتك وسيقوم فريقنا بالرد في أسرع وقت ممكن.<br />
            <span className="inline-block mt-2 text-[#86836B] text-sm">متوسط وقت الاستجابة: أقل من 24 ساعة</span>
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Contact Form */}
          <div className="md:col-span-2 bg-[#fdf7ee] border border-[#B3B79D] rounded-xl shadow-md p-8 flex flex-col justify-center">
            <form className="space-y-6 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <InputLabel htmlFor="name">الاسم</InputLabel>
                  <TextInput id="name" name="name" placeholder="أدخل اسمك" required />
                  <InputError id="name" />
                </div>
                <div>
                  <InputLabel htmlFor="email">البريد الإلكتروني</InputLabel>
                  <TextInput id="email" name="email" type="email" placeholder="أدخل بريدك" required />
                  <InputError id="email" />
                </div>
              </div>
              <div>
                <InputLabel htmlFor="message">رسالتك</InputLabel>
                <TextArea id="message" name="message" rows={5} placeholder="اكتب رسالتك" required />
                <InputError id="message" />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#3B5049] text-[#B3B79D] font-semibold rounded-lg hover:bg-[#192925] hover:text-[#fdf7ee] transition text-lg"
              >
                إرسال الرسالة
              </button>
              <p className="text-xs text-[#86836B] text-center pt-3">
                بياناتك سرية ولن يتم مشاركتها مع أي طرف آخر.
              </p>
            </form>
          </div>

          {/* Sidebar: Quick Contact & Info */}
          <div className="flex flex-col gap-7">
            {/* Quick Contact Card */}
            <div className="bg-[#3B5049] rounded-xl shadow-md p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold mb-3 text-[#B3B79D]">طرق تواصل سريعة</h3>
              <div className="flex flex-col gap-3 w-full">
                {SOCIAL.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    className={`
                      flex items-center justify-center py-2 px-3 rounded-lg font-bold text-lg
                      bg-white text-[#3B5049] border border-[#B3B79D] hover:bg-[#fdf7ee] transition
                      shadow
                    `}
                  >
                    {s.icon}
                    {s.cta}
                  </a>
                ))}
              </div>
            </div>
            {/* Address Card */}
            <div className="bg-[#fdf7ee] border border-[#B3B79D] rounded-xl shadow p-6 flex flex-col items-center">
              <MapPin className="w-8 h-8 mb-2 text-[#3B5049]" />
              <h4 className="font-bold mb-1 text-[#3B5049]">العنوان</h4>
              <p className="text-[#3B5049] text-sm leading-relaxed">
                شارع العلم، مبنى الدعوة<br />
                المدينة التعليمية، دولة المعرفة
              </p>
            </div>
            {/* Help Card */}
            <div className="bg-[#fdf7ee] border border-[#B3B79D] rounded-xl shadow p-6 flex flex-col items-center">
              <h4 className="font-bold mb-1 text-[#3B5049]">بحاجة لمساعدة عاجلة؟</h4>
              <a
                href="https://wa.me/97412345678"
                target="_blank"
                rel="noopener"
                className="inline-block mt-2 bg-white border border-[#B3B79D] text-[#3B5049] rounded-lg px-5 py-2 font-bold hover:bg-[#fdf7ee] transition"
              >
                تواصل عبر الواتساب
              </a>
              <span className="text-xs text-[#86836B] mt-2">خدمة متوفرة يومياً 10ص - 10م</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <section className="max-w-4xl mx-auto mt-16 rounded-xl overflow-hidden shadow border border-[#B3B79D] bg-[#fdf7ee]">
          <h2 className="text-2xl font-bold mb-2 pt-8 px-8 text-[#3B5049]">موقعنا على الخريطة</h2>
          <div className="relative h-80 mx-6 mb-8 rounded-lg overflow-hidden shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115410.76293597782!2d51.2840375972656!3d25.3180985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45ddc0246003ab%3A0x199c77493ae46219!2sEducation%20City%20Headquarter!5e0!3m2!1sen!2sqa!4v1725747879435!5m2!1sen!2sqa"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Map showing Education City"
            />
          </div>
        </section>

        {/* Social Proof/Assurance */}
        <section className="text-center mt-10 text-[#86836B] text-sm">
          <span className="inline-block px-3 py-2 rounded-md bg-[#B3B79D]/60 text-[#3B5049] font-semibold">
            موثوقية عالية - رد سريع - دعم شخصي
          </span>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;