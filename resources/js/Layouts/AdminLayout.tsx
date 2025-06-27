import { Link } from '@inertiajs/react';
import {
  Megaphone,
  Inbox,
  BookOpenCheck,
  Video,
  FolderKanban,
  GraduationCap,
  UserPlus,
  Settings,
  LogOut,
  Menu,
  PanelLeftClose,
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

  return (
    <Base>
      <div className="h-screen w-screen">
        <div className="h-full w-full flex flex-1 flex-grow flex-row">
          {/* Sidebar */}
          <div className={`top-0 left-0 h-full bg-[#402a13] text-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <button
              className="p-4 text-xl flex items-start text-[#fdf7ee] hover:text-[#d3a661]"
              onClick={toggleSidebar}
            >
              {isCollapsed ? <Menu /> : <PanelLeftClose />}
            </button>

            <div className="mt-6 flex-grow flex flex-col items-start">
              {/* Communication */}
              <ActiveLink isActive={activeLink === "/admin/announcements"} href="/admin/announcements">
                <Megaphone className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الإعلانات / المدونة</span>
              </ActiveLink>

              <ActiveLink isActive={activeLink === "#messages"} href="#">
                <Inbox className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>رسائل الطلاب</span>
              </ActiveLink>

              {!isCollapsed && <hr className="w-full my-2 border-[#d3a661]" />}

              <ActiveLink isActive={activeLink === "#courses"} href={route('admin.courses.index')}>
                <BookOpenCheck className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>إدارة الدورات</span>
              </ActiveLink>
              
              <ActiveLink isActive={activeLink === "videos"} href={route('admin.videos.index')}>
                <Video className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>رفع الفيديوهات</span>
              </ActiveLink>

              <ActiveLink isActive={activeLink === "#resources"} href="#">
                <FolderKanban className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>إدارة الملفات</span>
              </ActiveLink>

              {!isCollapsed && <hr className="w-full my-2 border-[#d3a661]" />}

              {/* Students */}
              <ActiveLink isActive={activeLink === "#students"} href={route('admin.students.index')}>
                <GraduationCap className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الطلاب</span>
              </ActiveLink>

              <ActiveLink isActive={activeLink === "#enrollments"} href="#">
                <UserPlus className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>طلبات التسجيل</span>
              </ActiveLink>
            </div>

            {/* Footer*/}
            <div className="absolute bottom-0 flex flex-col items-start">
              <ActiveLink isActive={activeLink === "#settings"} href="#">
                <Settings className={`w-6 h-6 text-[#fdf7ee] ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>الإعدادات</span>
              </ActiveLink>
              <Link href="/logout" className="flex items-center p-4 w-full justify-start text-[#fdf7ee] hover:text-[#d3a661]">
                <LogOut className={`w-6 h-6 ${isCollapsed ? '' : 'mr-3'}`} />
                <span className={`ml-3 ${isCollapsed ? 'hidden' : 'block'}`}>تسجيل الخروج</span>
              </Link>
            </div>
          </div>




          {/* Main Content Area */}
          <div className="h-full w-full overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default DashboardLayout;