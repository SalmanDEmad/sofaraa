import { Link } from '@inertiajs/react'; // Import Inertia's Link component
import { Home, LifeBuoy, LogOut, Menu, MonitorPlay, PanelLeftClose, Radio, Settings, User } from 'lucide-react';
import React from 'react';
import Base from './BaseLayout';

interface ActiveLinkProps {
  isActive: boolean;
  href: string;
  children: any;
}

const ActiveLink = ({ isActive, href, children } : ActiveLinkProps) => {
  return (
    <Link
      href={href}
      className={
        "flex items-center p-4 w-full justify-start "
        + (isActive ? "bg-opacity-55 bg-gray-600": "bg-opacity-100")
      }
    >
      {children}
    </Link>
  )
}

interface DashboardProps {
  activeLink: string;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  children: any
}

const DashboardLayout: React.FC<DashboardProps> = ({ activeLink, isCollapsed, toggleSidebar, children }) => {
  return (
    <Base>
    <div className={`h-screen w-screen`}>

      <div className={`h-full w-full flex flex-1 flex-grow flex-row`}>
        <div
          className={`top-0 left-0 h-full bg-gray-800 text-white transition-width duration-300 ease-in-out ${
            isCollapsed ? 'w-16' : 'w-64'
          }`}
          >
          {/* Toggle Button */}
          <button className="p-4 text-xl flex items-start" onClick={toggleSidebar}>
            {isCollapsed ? <Menu /> : <PanelLeftClose />}
          </button>

          {/* Search Icon */}
          {/*<div className="mt-4 px-4 flex justify-start">
              <SearchIcon className="text-white w-6 h-6" />
          </div>*/}

          {/* Main Links */}
          <div className="mt-8 flex-grow flex flex-col items-start " >
            <ActiveLink isActive={activeLink === "#dashboard"} href={route("dashboard.index")}>
              <Home className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>Home</span>
            </ActiveLink>
            <ActiveLink isActive={activeLink === "#livestream"} href={route("livestream.index")}>
              <Radio className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>Livestream</span>
            </ActiveLink>
            <ActiveLink isActive={activeLink === "#video"} href={route("video.index")}>
              <MonitorPlay className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>Your Videos</span>
            </ActiveLink>
            <ActiveLink isActive={activeLink === "#profile"} href={route("profile.edit")}>
              <User className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>Profile</span>
            </ActiveLink>
          </div>

          {/* Footer Links */}
          <div className="absolute bottom-0 w-full flex flex-col items-start">
            {/* <ActiveLink isActive={activeLink === "#settings"} href="/settings">
              <Settings className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>Settings</span>
            </ActiveLink> */}
            <ActiveLink isActive={activeLink === "#support"} href="/support">
              <LifeBuoy className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>Support</span>
            </ActiveLink>
            <Link href="/logout" className="flex items-center p-4 w-full justify-start">
              <LogOut className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>Logout</span>
            </Link>
          </div>
        </div>
        <div className={`h-full w-full overflow-x-hidden`}>
          {children}
        </div>
      </div>
    </div>
    </Base>
  );
};
// TODO: Remove hack for scroll above

export default DashboardLayout;
