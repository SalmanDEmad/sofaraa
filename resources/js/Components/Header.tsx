import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import ApplicationLogo from './ApplicationLogo';
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

  console.log("[Header] userName: ", userName);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 bg-[#1f1f1f] px-4 py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
        <Link href="/">
          <ApplicationLogo className="text-2xl md:text-3xl font-bold text-[#ffc926]" />
        </Link>

          {/* Hamburger menu for mobile */}
          <div className="lg:hidden">
            <HamburgerMenu isOpen={menuOpen} onToggle={toggleMenu} />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavLink active={activeLink === "#home"} href="/" className="text-white hover:text-[#ffc926]">
              Home
            </NavLink>
            <NavLink active={activeLink === "#about"} href="/about" className="text-white hover:text-[#ffc926]">
              About
            </NavLink>
            <NavLink active={activeLink === "#tutors"} href="/tutors" className="text-white hover:text-[#ffc926]">
              Tutors
            </NavLink>
            <NavLink active={activeLink === "#subjects"} href="/subjects" className="text-white hover:text-[#ffc926]">
              Subjects
            </NavLink>
            <NavLink active={activeLink === "#contact"} href="/contact" className="text-white hover:text-[#ffc926]">
              Contact
            </NavLink>
          </nav>

          {/* Desktop buttons */}
            {!!userName ? (
                <div className="lg:flex items-center space-x-4">
                    <NavLink active={false} href="/dashboard" className="text-white hover:text-[#ffc926]">
                        {userName}
                    </NavLink>
                </div>
            ) : (
                <div className="hidden lg:flex items-center space-x-4">
                    <PrimaryButton href={route('login')} className="text-[#121212] bg-[#ffc926] hover:bg-[#e0b528]">
                        Login
                    </PrimaryButton>
                    <SecondaryButton href={route('register')} className="text-[#121212] bg-[#ffc926] hover:bg-[#e0b528]">
                        Register
                    </SecondaryButton>
                </div>
            )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              <NavLink active={activeLink === "#home"} href="/" className="text-white hover:text-[#ffc926] text-center">
                Home
              </NavLink>
              <NavLink active={activeLink === "#about"} href="/about" className="text-white hover:text-[#ffc926]">
                About
              </NavLink>
              <NavLink active={activeLink === "#tutors"} href="/tutors" className="text-white hover:text-[#ffc926]">
                Tutors
              </NavLink>
              <NavLink active={activeLink === "#subjects"} href="/subjects" className="text-white hover:text-[#ffc926]">
                Subjects
              </NavLink>
              <NavLink active={activeLink === "#contact"} href="#contact" className="text-white hover:text-[#ffc926]">
                Contact
              </NavLink>
            </nav>
            {!!userName ? (
                <div className="mt-4 flex flex-col">
                    <NavLink active={false} href="/dashboard" className="text-white hover:text-[#ffc926]">
                        {userName}
                    </NavLink>
                </div>
            ) : (
                <div className="mt-4 flex flex-col space-y-2">
                    <PrimaryButton href={route('login')} className="text-[#121212] bg-[#ffc926] hover:bg-[#e0b528]">
                        Login
                    </PrimaryButton>
                    <SecondaryButton href={route('register')} className="text-[#121212] bg-[#ffc926] hover:bg-[#e0b528]">
                        Register
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