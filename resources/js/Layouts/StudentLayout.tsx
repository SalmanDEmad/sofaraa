import { Link } from '@inertiajs/react';
import {
  Home, LifeBuoy, LogOut, Menu, FileQuestion, BookOpenCheck,
  MonitorPlay, PanelLeftClose, BarChart2, Megaphone, User
} from 'lucide-react';
import React, { useState } from 'react';
import Base from './BaseLayout';

interface ActiveLinkProps {
  isActive: boolean;
  href: string;
  children: any;
}

const ActiveLink = ({ isActive, href, children }: ActiveLinkProps) => {
  return (
    <Link
      href={href}
      className={
        "flex items-center p-4 w-full justify-start " +
        (isActive ? "bg-opacity-55 bg-gray-600" : "bg-opacity-100")
      }
    >
      {children}
    </Link>
  );
};

interface DashboardProps {
  activeLink: string;
  children: any;
}

const DashboardLayout: React.FC<DashboardProps> = ({ activeLink, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Collapsed by default
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Base>
      <div className="h-screen w-screen">
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Sidebar for desktop */}
          <div
            className={`hidden md:block top-0 left-0 h-full bg-[#402a13] text-white transition-width duration-300 ease-in-out ${
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

              <ActiveLink isActive={activeLink === "#courses"} href={route("livestream.index")}> 
                <BookOpenCheck className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الدورات</span>
              </ActiveLink>

              <ActiveLink isActive={activeLink === "#videos"} href={route('student.videos')}> 
                <MonitorPlay className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>فيديوهاتي</span>
              </ActiveLink>

              <ActiveLink isActive={activeLink === "#progress"} href={route("progress.index")}> 
                <BarChart2 className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>تقدمي ودرجاتي</span>
              </ActiveLink>

              <ActiveLink isActive={activeLink === "#quizzes"} href={route("quizzes.index")}> 
                <FileQuestion className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الاختبارات والواجبات</span>
              </ActiveLink>

              <ActiveLink isActive={activeLink === "#announcements"} href={route("student.announcements")}> 
                <Megaphone className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الإعلانات</span>
              </ActiveLink>

              <ActiveLink isActive={activeLink === "#profile"} href={route("profile.edit")}> 
                <User className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الملف الشخصي</span>
              </ActiveLink>
            </div>

            {/* Footer Links */}
            <div className="absolute bottom-0 flex flex-col items-start">
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

          {/* Main Content Area */}
          <div className="h-full w-full overflow-x-hidden pb-16 md:pb-0">
            {children}
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#402a13] text-white flex justify-between items-center px-4 py-2 shadow z-50">
            <Link href={route("student.announcements")} className="flex flex-col items-center text-xs flex-1">
              <Megaphone size={20} />
              <span>الإعلانات</span>
            </Link>

            <Link href={route("profile.edit")} className="flex flex-col items-center text-xs flex-1">
              <User size={20} />
              <span>حسابي</span>
            </Link>

            <Link href={route("student.videos")} className="flex flex-col items-center text-xs flex-1">
              <MonitorPlay size={20} />
              <span>فيديو</span>
            </Link>

            <Link href={route("dashboard.index")} className="flex flex-col items-center text-xs flex-1">
              <div className="bg-[#d3a661] text-[#402a13] p-2 rounded-full shadow">
                <Home size={24} />
              </div>
              <span>الرئيسية</span>
            </Link>

            <div className="flex flex-col items-center text-xs flex-1">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu size={20} />
              </button>
              <span>المزيد</span>
            </div>
          </div>

          {/* Mobile Popup Menu */}
          {isMenuOpen && (
            <div className="md:hidden fixed bottom-16 left-4 right-4 bg-white shadow rounded-lg p-4 z-50 text-black space-y-2">
              <Link href={route("quizzes.index")} className="block">الاختبارات والواجبات</Link>
              <Link href={route("progress.index")} className="block">تقدمي ودرجاتي</Link>
              <Link href={route("livestream.index")} className="block">الدورات</Link>
              <Link href="/support" className="block">الدعم</Link>
              <Link href="/logout" className="block text-red-500">تسجيل الخروج</Link>
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default DashboardLayout;
