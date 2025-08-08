import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import NavLink from './NavLink';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import ApplicationLogo from './ApplicationLogo';

interface HeaderProps {
  activeLink: string;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ activeLink, userName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 bg-[#1B2A41] text-[#E8C547] px-4 py-4 shadow-md border-b border-[#243B55]"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <ApplicationLogo className="text-2xl md:text-3xl font-bold text-[#E8C547]" />
          </Link>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <HamburgerMenu isOpen={menuOpen} onToggle={toggleMenu} />
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-reverse space-x-6">
            {[
              { href: '/', id: '#home', label: 'الرئيسية' },
              { href: '/about', id: '#about', label: 'من نحن' },
              { href: '/blogs', id: '#blogs', label: 'الأخبار والتحديثات' },
              { href: '/tutors', id: '#tutors', label: 'المدرسون' },
              { href: '/subjects', id: '#subjects', label: 'المواد' },
              { href: '/contact', id: '#contact', label: 'تواصل معنا' },
            ].map((link) => (
              <NavLink
                key={link.id}
                active={activeLink === link.id}
                href={link.href}
                className={`text-[#E8C547] hover:text-[#E8C547] border-b-2 ${
                  activeLink === link.id
                    ? 'border-[#A68A2D]'
                    : 'border-transparent'
                } hover:border-[#A68A2D] pb-1`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop buttons */}
          {userName ? (
            <div className="lg:flex items-center space-x-reverse space-x-4">
              <NavLink active={false} href="/dashboard" className="text-[#E8C547] hover:text-[#A68A2D]">
                {userName}
              </NavLink>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-reverse space-x-4">
              <PrimaryButton
                href={route('login')}
                className="bg-[#243B55] text-[#E8C547] hover:bg-[#A68A2D] hover:text-[#1B2A41]"
              >
                تسجيل الدخول
              </PrimaryButton>
              <SecondaryButton
                href={route('register')}
                className="border border-[#A68A2D] text-[#A68A2D] hover:bg-[#E8C547] hover:text-[#1B2A41]"
              >
                تسجيل جديد
              </SecondaryButton>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4" dir="rtl">
            <nav className="flex flex-col space-y-4 text-center">
              {[
                { href: '/', id: '#home', label: 'الرئيسية' },
                { href: '/about', id: '#about', label: 'من نحن' },
                { href: '/blogs', id: '#blogs', label: 'الأخبار والتحديثات' },
                { href: '/tutors', id: '#tutors', label: 'المدرسون' },
                { href: '/subjects', id: '#subjects', label: 'المواد' },
                { href: '/contact', id: '#contact', label: 'تواصل معنا' },
              ].map((link) => (
                <NavLink
                  key={link.id}
                  active={activeLink === link.id}
                  href={link.href}
                  className="text-[#E8C547] hover:text-[#A68A2D]"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {userName ? (
              <div className="mt-4 flex flex-col" dir="rtl">
                <NavLink active={false} href="/dashboard" className="text-[#E8C547] hover:text-[#A68A2D]">
                  {userName}
                </NavLink>
              </div>
            ) : (
              <div className="mt-4 flex flex-col space-y-2" dir="rtl">
                <PrimaryButton
                  href={route('login')}
                  className="bg-[#243B55] text-[#E8C547] hover:bg-[#A68A2D] hover:text-[#1B2A41]"
                >
                  تسجيل الدخول
                </PrimaryButton>
                <SecondaryButton
                  href={route('register')}
                  className="border border-[#A68A2D] text-[#A68A2D] hover:bg-[#E8C547] hover:text-[#1B2A41]"
                >
                  تسجيل جديد
                </SecondaryButton>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;