import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import ResponsiveNavLink from './ResponsiveNavLink';

interface MobileDropdownProps {
  user: {
    name: string;
    email: string;
  };
  route: (path: string) => string;
}

const MobileDropdown: React.FC<MobileDropdownProps> = ({ user, route }) => {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <>
      {/* Button to toggle dropdown */}
      <div className="-me-2 flex items-center sm:hidden">
        <HamburgerMenu
          isOpen={showingNavigationDropdown}
          onToggle={() => setShowingNavigationDropdown(prev => !prev)}
        />
      </div>

      {/* Dropdown menu */}
      <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {/* <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}> */}
          <ResponsiveNavLink href={route('dashboard')} active={false}>
            Dashboard
          </ResponsiveNavLink>
        </div>

        <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
          <div className="px-4">
            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
              {user.name}
            </div>
            <div className="font-medium text-sm text-gray-500">{user.email}</div>
          </div>

          <div className="mt-3 space-y-1">
            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
            <ResponsiveNavLink method="post" href={route('logout')} as="button">
              Log Out
            </ResponsiveNavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileDropdown;
