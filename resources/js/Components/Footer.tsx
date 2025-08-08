import React from 'react';
import ApplicationLogo from './ApplicationLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const FooterAlt1: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      dir="rtl"
      className="bg-[#1B2A41] text-[#F5F5F0] pt-12"
      style={{
        backgroundImage: "url('/patterns/geometric.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right mb-10">
          {/* Logo & Motto */}
          <div>
            <ApplicationLogo width="72" height="72" />
            <h1 className="text-2xl font-bold mt-3">أكاديمية سفراء الهداية</h1>
            <p className="text-[#E8C547] mt-1">سفراء علمٍ ونورٍ وهداية</p>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-[#E8C547]">تواصل معنا</h2>
            <p>إسطنبول، باشاك شهير</p>
            <p>الهاتف: ٠٥٤٢٣٨٢٥٠١٤</p>
            <p>البريد: info@sofaraalhidaya.com</p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-[#E8C547]">روابط سريعة</h2>
            <ul className="space-y-1">
              <li><a href="/about" className="hover:text-[#E8C547]">من نحن</a></li>
              <li><a href="/courses" className="hover:text-[#E8C547]">الدورات</a></li>
              <li><a href="/contact" className="hover:text-[#E8C547]">تواصل معنا</a></li>
            </ul>
          </div>
        </div>

        {/* Social Icons & Copyright */}
        <div className="border-t border-[#A68A2D] pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {year} أكاديمية سفراء الهداية. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            {[faFacebookF, faTwitter, faInstagram, faLinkedinIn].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="bg-[#243B55] hover:bg-[#E8C547] hover:text-[#1B2A41] p-3 rounded-full transition"
              >
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterAlt1;