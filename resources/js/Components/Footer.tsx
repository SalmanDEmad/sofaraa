import React from 'react';
import ApplicationLogo from './ApplicationLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import NavLink from './NavLink';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3B5049] text-[#B3B79D] pt-14 pb-10 shadow-inner border-t-4 border-[#86836B]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-10">

          {/* Logo and Academy Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <ApplicationLogo width="72" height="72" />
            <h1 className="text-2xl font-bold mt-2 mb-1 text-[#B3B79D]">أكاديمية الوعي الدعوي</h1>
            <p className="text-[#86836B] text-base">ريادة في الدعوة المؤثرة</p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h2 className="text-xl font-semibold mb-3 text-[#86836B]">تواصل معنا</h2>
            <p className="text-[#B3B79D]">شارع العلم، مبنى الدعوة</p>
            <p className="text-[#B3B79D]">المدينة التعليمية، دولة المعرفة</p>
            <p className="text-[#B3B79D]">هاتف: +974 1234 5678</p>
            <p className="text-[#B3B79D]">بريد: info@alwaei-academy.com</p>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold mb-3 text-[#86836B]">تابعنا</h2>
            <div className="flex gap-3">
              {[
                { icon: faFacebookF, href: '#' },
                { icon: faTwitter, href: '#' },
                { icon: faInstagram, href: '#' },
                { icon: faLinkedinIn, href: '#' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#B3B79D]/20 hover:bg-[#B3B79D]/40 text-[#B3B79D] p-3 rounded-full shadow-sm transition"
                  style={{ fontSize: 20 }}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#86836B] pt-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-3">
            <p className="text-[#B3B79D] mb-2 md:mb-0 text-sm">
              &copy; 2025 أكاديمية الوعي الدعوي. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-5">
              {[
                { href: '#privacy', label: 'سياسة الخصوصية' },
                { href: '#terms', label: 'شروط الاستخدام' },
                { href: '#support', label: 'الدعم' },
                { href: '#careers', label: 'الانضمام' },
              ].map((link, i) => (
                <NavLink
                  key={i}
                  active={false}
                  href={link.href}
                  className="text-[#B3B79D] hover:text-[#192925] transition text-sm"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;