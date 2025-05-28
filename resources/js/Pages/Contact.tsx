import React from 'react';
import Header from '../Components/Header';
import TextInput from '../Components/TextInput';
import TextArea from '../Components/TextArea';
import InputLabel from '../Components/InputLabel';
import InputError from '../Components/InputError';
import Footer from '../Components/Footer';
import { Phone, Mail, Twitter, Facebook, Instagram } from 'lucide-react';

const Contact: React.FC<{ auth?: any }> = ({ auth }) => {
  return (
    <main className="bg-[#fdf7ee] text-[#402a13] min-h-screen">
      <Header activeLink="#contact" userName={auth?.user?.name} />
      <div className="container mx-auto px-4 lg:px-8 py-12">

        {/* Contact Info Section */}
        <section className="grid grid-cols-1 lg:mx-32 md:grid-cols-3 gap-12 mb-12">
          {[
            {
              Icon: Phone,
              title: "اتصل بنا",
              contact: "+974 1234 5678",
              href: "tel:+97412345678"
            },
            {
              Icon: Mail,
              title: "راسلنا",
              contact: "info@alwaei-academy.com",
              href: "mailto:info@alwaei-academy.com"
            },
            {
              Icon: Twitter,
              title: "تابعنا",
              links: [
                { label: "Twitter", href: "https://twitter.com/alwaei_academy" },
                { label: "Facebook", href: "https://facebook.com/alwaei_academy" },
                { label: "Instagram", href: "https://instagram.com/alwaei_academy" }
              ]
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#f6eddc] p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <item.Icon className="w-6 h-6 text-[#d3a661] mr-2" />
                <h2 className="text-2xl font-bold text-[#d3a661]">
                  {item.title}
                </h2>
              </div>

              {item.contact && (
                <p className="text-[#402a13] text-lg">
                  <a href={item.href} className="underline">
                    {item.contact}
                  </a>
                </p>
              )}

              {item.links && (
                <div className="space-y-2">
                  {item.links.map((link, j) => (
                    <a
                      key={j}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[#402a13] hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Contact Form Section */}
        <section className="grid grid-cols-1 lg:mx-32 md:grid-cols-2 gap-12 mb-12">
          {/* Form */}
          <div>
            <div className="bg-[#f6eddc] p-6 rounded-lg shadow-sm">
              <h2 className="text-3xl font-bold mb-6 text-[#d3a661]">
                تواصل معنا
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <InputLabel htmlFor="name">الاسم</InputLabel>
                    <TextInput
                      id="name"
                      name="name"
                      placeholder="أدخل اسمك"
                      required
                    />
                    <InputError id="name" />
                  </div>
                  <div>
                    <InputLabel htmlFor="email">البريد الإلكتروني</InputLabel>
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      placeholder="أدخل بريدك"
                      required
                    />
                    <InputError id="email" />
                  </div>
                </div>

                <div>
                  <InputLabel htmlFor="message">رسالتك</InputLabel>
                  <TextArea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="اكتب رسالتك"
                    required
                  />
                  <InputError id="message" />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#402a13] text-[#fdf7ee] font-semibold rounded-lg hover:bg-[#5e3c26] transition"
                >
                  إرسال
                </button>
              </form>
            </div>
          </div>

          {/* Help Box */}
          <div>
            <div className="bg-[#f6eddc] p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-[#d3a661]">
                كيف يمكننا مساعدتك؟
              </h2>
              <p className="text-[#402a13] leading-relaxed">
                نحن هنا للإجابة على أي استفسارات أو مشكلات قد تواجهها. سواء كان
                لديك سؤال حول الدورات، حسابك أو أي أمر آخر، فريق الدعم لدينا جاهز
                لمساعدتك وتقديم المعلومات اللازمة بسرعة وكفاءة.
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-12 lg:mx-32">
          <div className="bg-[#f6eddc] p-6 rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-[#d3a661]">
              موقعنا على الخريطة
            </h2>
            <div className="relative h-80 rounded-md overflow-hidden">
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
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
};

export default Contact;