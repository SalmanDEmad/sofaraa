import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import NavLink from './NavLink';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

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
      className="sticky top-0 z-50 bg-[#4b2e24] text-[#fdf6e3] px-4 py-4 shadow-md"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo placeholder */}
          <Link href="/" className="text-2xl md:text-3xl font-bold tracking-wide text-[#ffc26d]">
            الوعي الدعوي
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
              className="text-[#fdf6e3] hover:text-[#ffc26d] border-b-2 border-transparent hover:border-[#ffc26d] pb-1"
            >
              الرئيسية
            </NavLink>
            <NavLink
              active={activeLink === '#about'}
              href="/about"
              className="text-[#fdf6e3] hover:text-[#ffc26d] border-b-2 border-transparent hover:border-[#ffc26d] pb-1"
            >
              من نحن
            </NavLink>
            <NavLink
              active={activeLink === '#tutors'}
              href="/tutors"
              className="text-[#fdf6e3] hover:text-[#ffc26d] border-b-2 border-transparent hover:border-[#ffc26d] pb-1"
            >
              المدرسون
            </NavLink>
            <NavLink
              active={activeLink === '#subjects'}
              href="/subjects"
              className="text-[#fdf6e3] hover:text-[#ffc26d] border-b-2 border-transparent hover:border-[#ffc26d] pb-1"
            >
              المواد
            </NavLink>
            <NavLink
              active={activeLink === '#contact'}
              href="/contact"
              className="text-[#fdf6e3] hover:text-[#ffc26d] border-b-2 border-transparent hover:border-[#ffc26d] pb-1"
            >
              تواصل معنا
            </NavLink>
          </nav>

          {/* Desktop buttons */}
          {userName ? (
            <div className="lg:flex items-center space-x-reverse space-x-4">
              <NavLink active={false} href="/dashboard" className="text-[#fdf6e3] hover:text-[#ffc26d]">
                {userName}
              </NavLink>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-reverse space-x-4">
              <PrimaryButton href={route('login')} className="bg-[#ffc26d] text-[#4b2e24] hover:bg-[#f0b84e]">
                تسجيل الدخول
              </PrimaryButton>
              <SecondaryButton
                href={route('register')}
                className="border border-[#ffc26d] text-[#ffc26d] hover:text-white hover:bg-[#a67c52]"
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
              <NavLink active={activeLink === '#home'} href="/" className="text-[#fdf6e3] hover:text-[#ffc26d]">
                الرئيسية
              </NavLink>
              <NavLink active={activeLink === '#about'} href="/about" className="text-[#fdf6e3] hover:text-[#ffc26d]">
                من نحن
              </NavLink>
              <NavLink active={activeLink === '#tutors'} href="/tutors" className="text-[#fdf6e3] hover:text-[#ffc26d]">
                المدرسون
              </NavLink>
              <NavLink active={activeLink === '#subjects'} href="/subjects" className="text-[#fdf6e3] hover:text-[#ffc26d]">
                المواد
              </NavLink>
              <NavLink active={activeLink === '#contact'} href="/contact" className="text-[#fdf6e3] hover:text-[#ffc26d]">
                تواصل معنا
              </NavLink>
            </nav>

            {userName ? (
              <div className="mt-4 flex flex-col" dir="rtl">
                <NavLink active={false} href="/dashboard" className="text-[#fdf6e3] hover:text-[#ffc26d]">
                  {userName}
                </NavLink>
              </div>
            ) : (
              <div className="mt-4 flex flex-col space-y-2" dir="rtl">
                <PrimaryButton href={route('login')} className="bg-[#ffc26d] text-[#4b2e24] hover:bg-[#f0b84e]">
                  تسجيل الدخول
                </PrimaryButton>
                <SecondaryButton
                  href={route('register')}
                  className="border border-[#ffc26d] text-[#ffc26d] hover:text-white hover:bg-[#a67c52]"
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