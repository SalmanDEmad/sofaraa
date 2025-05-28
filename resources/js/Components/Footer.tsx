import React from 'react';
import ApplicationLogo from './ApplicationLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import NavLink from './NavLink';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#402a13] text-[#fdf7ee] py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between mb-8">

          {/* Logo and Academy Info */}
          <div className="mb-6 md:mb-0">
            <ApplicationLogo width="80" height="80" />  
            <h1 className="text-2xl font-semibold mt-2 mb-1">أكاديمية الوعي الدعوي</h1>
            <p className="text-[#e6dcc6]">ريادة في الدعوة المؤثرة</p>
          </div>
          
          {/* Contact Details */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4 text-[#d3a661]">تواصل معنا</h2>
            <p className="text-[#e6dcc6]">شارع العلم، مبنى الدعوة</p>
            <p className="text-[#e6dcc6]">المدينة التعليمية، دولة المعرفة</p>
            <p className="text-[#e6dcc6]">هاتف: +974 1234 5678</p>
            <p className="text-[#e6dcc6]">بريد: info@alwaei-academy.com</p>
          </div>
          
          {/* Social Icons */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4 text-[#d3a661]">تابعنا</h2>
            <div className="flex gap-4">
              {[faFacebookF, faTwitter, faInstagram, faLinkedinIn].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e6dcc6] hover:text-[#fdf7ee] transition"
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Legal Links */}
        <div className="border-t border-[#5e3c26] pt-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-[#e6dcc6] mb-4 md:mb-0">
              &copy; 2025 أكاديمية الوعي الدعوي. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-4">
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
                  className="text-[#e6dcc6] hover:text-[#fdf7ee] transition"
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
