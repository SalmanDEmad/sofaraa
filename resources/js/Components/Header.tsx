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
      className="sticky top-0 z-50 bg-[#192925] text-[#B3B79D] px-4 py-4 shadow-md border-b border-[#3B5049]"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo placeholder */}
          <Link href="/">
            <ApplicationLogo className="text-2xl md:text-3xl font-bold text-[#B3B79D]" />
          </Link>

          {/* Hamburger menu for mobile */}
          <div className="lg:hidden">
            <HamburgerMenu isOpen={menuOpen} onToggle={toggleMenu} />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-reverse space-x-6">
            <NavLink
              active={activeLink === '#home'}
              href="/"
              className={`text-[#B3B79D] hover:text-[#B3B79D] border-b-2 ${activeLink === '#home' ? 'border-[#86836B]' : 'border-transparent'} hover:border-[#86836B] pb-1`}
            >
              الرئيسية
            </NavLink>
            <NavLink
              active={activeLink === '#about'}
              href="/about"
              className={`text-[#B3B79D] hover:text-[#B3B79D] border-b-2 ${activeLink === '#about' ? 'border-[#86836B]' : 'border-transparent'} hover:border-[#86836B] pb-1`}
            >
              من نحن
            </NavLink>
            <NavLink
              active={activeLink === '#blogs'}
              href="/blogs"
              className={`text-[#B3B79D] hover:text-[#B3B79D] border-b-2 ${activeLink === '#blogs' ? 'border-[#86836B]' : 'border-transparent'} hover:border-[#86836B] pb-1`}
            >
              الأخبار والتحديثات
            </NavLink>
            <NavLink
              active={activeLink === '#tutors'}
              href="/tutors"
              className={`text-[#B3B79D] hover:text-[#B3B79D] border-b-2 ${activeLink === '#tutors' ? 'border-[#86836B]' : 'border-transparent'} hover:border-[#86836B] pb-1`}
            >
              المدرسون
            </NavLink>
            <NavLink
              active={activeLink === '#subjects'}
              href="/subjects"
              className={`text-[#B3B79D] hover:text-[#B3B79D] border-b-2 ${activeLink === '#subjects' ? 'border-[#86836B]' : 'border-transparent'} hover:border-[#86836B] pb-1`}
            >
              المواد
            </NavLink>
            <NavLink
              active={activeLink === '#contact'}
              href="/contact"
              className={`text-[#B3B79D] hover:text-[#B3B79D] border-b-2 ${activeLink === '#contact' ? 'border-[#86836B]' : 'border-transparent'} hover:border-[#86836B] pb-1`}
            >
              تواصل معنا
            </NavLink>
          </nav>

          {/* Desktop buttons */}
          {userName ? (
            <div className="lg:flex items-center space-x-reverse space-x-4">
              <NavLink active={false} href="/dashboard" className="text-[#B3B79D] hover:text-[#86836B]">
                {userName}
              </NavLink>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-reverse space-x-4">
              <PrimaryButton href={route('login')} className="bg-[#3B5049] text-[#B3B79D] hover:bg-[#86836B] hover:text-[#192925]">
                تسجيل الدخول
              </PrimaryButton>
              <SecondaryButton
                href={route('register')}
                className="border border-[#86836B] text-[#86836B] hover:bg-[#B3B79D] hover:text-[#192925]"
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
              <NavLink active={activeLink === '#home'} href="/" className="text-[#B3B79D] hover:text-[#86836B]">
                الرئيسية
              </NavLink>
              <NavLink active={activeLink === '#about'} href="/about" className="text-[#B3B79D] hover:text-[#86836B]">
                من نحن
              </NavLink>
              <NavLink active={activeLink === '#blogs'} href="/blogs" className="text-[#B3B79D] hover:text-[#86836B]">
                الأخبار والتحديثات
              </NavLink>
              <NavLink active={activeLink === '#tutors'} href="/tutors" className="text-[#B3B79D] hover:text-[#86836B]">
                المدرسون
              </NavLink>
              <NavLink active={activeLink === '#subjects'} href="/subjects" className="text-[#B3B79D] hover:text-[#86836B]">
                المواد
              </NavLink>
              <NavLink active={activeLink === '#contact'} href="/contact" className="text-[#B3B79D] hover:text-[#86836B]">
                تواصل معنا
              </NavLink>
            </nav>

            {userName ? (
              <div className="mt-4 flex flex-col" dir="rtl">
                <NavLink active={false} href="/dashboard" className="text-[#B3B79D] hover:text-[#86836B]">
                  {userName}
                </NavLink>
              </div>
            ) : (
              <div className="mt-4 flex flex-col space-y-2" dir="rtl">
                <PrimaryButton href={route('login')} className="bg-[#3B5049] text-[#B3B79D] hover:bg-[#86836B] hover:text-[#192925]">
                  تسجيل الدخول
                </PrimaryButton>
                <SecondaryButton
                  href={route('register')}
                  className="border border-[#86836B] text-[#86836B] hover:bg-[#B3B79D] hover:text-[#192925]"
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