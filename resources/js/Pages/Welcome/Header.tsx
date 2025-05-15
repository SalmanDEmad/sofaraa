import React from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#1f1f1f] px-4 py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link href="/" className="flex flex-row gap-4 items-center">
            <ApplicationLogo noLink className="text-2xl md:text-3xl font-bold text-[#ffc926]" />
            <h1 className="text-3xl font-semibold text-white align-middle">NowTutors</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Add desktop navigation links here */}
          </nav>

          {/* Hamburger menu for mobile */}
          {/* Add mobile menu toggle and menu items here */}
        </div>
      </div>
    </header>
  );
};

export default Header;