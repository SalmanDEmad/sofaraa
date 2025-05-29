import { Link } from '@inertiajs/react'; // Import Inertia's Link component
import { Home, LifeBuoy, LogOut, Menu, FileQuestion, BookOpenCheck, MonitorPlay, PanelLeftClose, BarChart2, Megaphone, Settings, User } from 'lucide-react';
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
          className={`top-0 left-0 h-full bg-[#402a13] text-white transition-width duration-300 ease-in-out ${
            isCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          {/* Toggle Button */}
          <button
            className="p-4 text-xl flex items-start text-[#fdf7ee] hover:text-[#d3a661]"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <Menu /> : <PanelLeftClose />}
          </button>

          {/* Main Links */}
          <div className="mt-6 flex-grow flex flex-col items-start">
            <ActiveLink isActive={activeLink === "#dashboard"} href={route("dashboard.index")}>
              <Home className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الرئيسية</span>
            </ActiveLink>
            <ActiveLink isActive={activeLink === "#livestream"} href={route("livestream.index")}>
              <BookOpenCheck className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الدورات</span>
            </ActiveLink>
            <ActiveLink isActive={activeLink === "#video"} href={route("video.index")}>
              <MonitorPlay className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>فيديوهاتي</span>
            </ActiveLink>
            <ActiveLink isActive={activeLink === "#progress"} href={route("progress.index")}>
              <BarChart2 className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} /* You can use an appropriate icon here */ />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>تقدمي ودرجاتي</span>
            </ActiveLink>

            <ActiveLink isActive={activeLink === "#quizzes"} href={route("quizzes.index")}>
              <FileQuestion className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} /* Choose a quiz icon */ />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الاختبارات والواجبات</span>
            </ActiveLink>

            <ActiveLink isActive={activeLink === "#announcements"} href={route("announcements.index")}>
              <Megaphone className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الإعلانات</span>
            </ActiveLink>

            <ActiveLink isActive={activeLink === "#profile"} href={route("profile.edit")}>
              <User className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الملف الشخصي</span>
            </ActiveLink>

          </div>

          {/* Footer Links */}
          <div className="absolute bottom-0 w-full flex flex-col items-start">
            <ActiveLink isActive={activeLink === "#support"} href="/support">
              <LifeBuoy className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الدعم</span>
            </ActiveLink>
            <Link href="/logout" className="flex items-center p-4 w-full justify-start text-[#fdf7ee] hover:text-[#d3a661]">
              <LogOut className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`} />
              <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>تسجيل الخروج</span>
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
