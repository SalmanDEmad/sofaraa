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
  Home,
  X,
  FileQuestion,
  BarChart2,
  LifeBuoy,
} from 'lucide-react';
import React, { useState } from 'react';
import BaseLayout from './BaseLayout';

interface ActiveLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  icon: React.ReactNode;
  isCollapsed?: boolean;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ href, label, isActive, icon, isCollapsed }) => (
  <Link
    href={href}
    title={label}
    className={
      `group flex items-center px-5 py-3 w-full transition-colors duration-300 hover:bg-gray-700 ` +
      (isActive
        ? 'bg-gray-800 text-white border-l-4 border-blue-500'
        : 'text-white')
    }
  >
    <span className="flex-none">{icon}</span>
    {!isCollapsed && (
      <span className="mr-3 text-sm truncate opacity-100 group-hover:opacity-100">
        {label}
      </span>
    )}
  </Link>
);

interface DashboardProps {
  activeLink: string;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardProps> = ({ activeLink, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <BaseLayout>
      <div className="h-screen flex font-[Cairo]">
        {/* Sidebar */}
        <aside
          className={
            `hidden md:flex flex-col bg-[#1e2a3a] text-white h-full transition-width duration-300 ease-in-out overflow-hidden ` +
            (isCollapsed ? 'w-16' : 'w-64')
          }
        >
          {/* Collapse Toggle at Top */}
          <button
            onClick={toggleSidebar}
            title={isCollapsed ? 'توسيع القائمة' : 'إخفاء القائمة'}
            className="self-end m-2 p-2 hover:bg-gray-700 rounded"
          >
            {isCollapsed ? <Menu className="w-6 h-6" /> : <PanelLeftClose className="w-6 h-6" />}
          </button>

          {/* Navigation Groups */}
          <nav className="flex-1">
            {/* Core */}
            <ActiveLink
              href="/dashboard"
              label="الرئيسية"
              isActive={activeLink === '#dashboard'}
              icon={<Home className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <ActiveLink
              href="/admin/announcements"
              label="الإعلانات / المدونة"
              isActive={activeLink === '#announcements'}
              icon={<Megaphone className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <ActiveLink
              href={route('admin.messages')}
              label="رسائل الطلاب"
              isActive={activeLink === '#messages'}
              icon={<Inbox className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />

            {/* Management Section */}
            {!isCollapsed && (
              <div className="px-5 mt-4 mb-2 text-xs uppercase text-gray-400">الإدارة</div>
            )}
            <ActiveLink
              href={route('admin.courses.index')}
              label="إدارة الدورات"
              isActive={activeLink === '#courses'}
              icon={<BookOpenCheck className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <ActiveLink
              href={route('admin.videos.index')}
              label="رفع المقاطع"
              isActive={activeLink === '#videos'}
              icon={<Video className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <ActiveLink
              href="#"
              label="إدارة الملفات"
              isActive={activeLink === '#resources'}
              icon={<FolderKanban className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />

            {/* Users Section */}
            {!isCollapsed && (
              <div className="px-5 mt-4 mb-2 text-xs uppercase text-gray-400">المستخدمون</div>
            )}
            <ActiveLink
              href={route('admin.students.index')}
              label="الطلاب"
              isActive={activeLink === '#students'}
              icon={<GraduationCap className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <ActiveLink
              href="#"
              label="طلبات التسجيل"
              isActive={activeLink === '#enrollments'}
              icon={<UserPlus className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
          </nav>

          {/* Footer & Actions */}
          <div className="mt-auto">
            <ActiveLink
              href="#"
              label="الإعدادات"
              isActive={activeLink === '#settings'}
              icon={<Settings className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <Link
              href="/logout"
              title="تسجيل الخروج"
              className="group flex items-center px-5 py-3 w-full hover:bg-gray-700"
            >
              <LogOut className="w-6 h-6 text-white" />
              {!isCollapsed && (
                <span className="mr-3 text-sm">تسجيل الخروج</span>
              )}
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1e2a3a] text-white flex justify-between items-center px-4 py-2 shadow z-50">
          <Link href="/admin/announcements" title="الإعلانات" className="flex flex-col items-center text-xs flex-1">
            <Megaphone size={20} />
            <span>الإعلانات</span>
          </Link>
          <Link href={route('admin.courses.index')} title="الدورات" className="flex flex-col items-center text-xs flex-1">
            <BookOpenCheck size={20} />
            <span>الدورات</span>
          </Link>
          <Link href={route('dashboard.index')} title="الرئيسية" className="flex flex-col items-center text-xs flex-1">
            <div className="bg-[#9db4d3] text-[#1e2a3a] p-2 rounded-full shadow">
              <Home size={24} />
            </div>
            <span>الرئيسية</span>
          </Link>
          <Link href={route('admin.videos.index')} title="الفيديوهات" className="flex flex-col items-center text-xs flex-1">
            <Video size={20} />
            <span>الفيديوهات</span>
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} title="المزيد" className="flex flex-col items-center text-xs flex-1">
            <Menu size={20} />
            <span>المزيد</span>
          </button>
        </div>

        {/* Mobile Offcanvas */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-200 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        <aside
          className={`md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl z-50 transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="p-4 space-y-3 text-black text-right">
            <button onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-500 float-left">
              ✕
            </button>
            <Link href="#" title="الاختبارات والواجبات" className="flex flex-row-reverse items-center justify-end gap-3">
              <FileQuestion className="w-5 h-5" />
              <span>الاختبارات والواجبات</span>
            </Link>
            <Link href="#" title="التقدم والدرجات" className="flex flex-row-reverse items-center justify-end gap-3">
              <BarChart2 className="w-5 h-5" />
              <span>التقدم والدرجات</span>
            </Link>
            <Link href="#" title="الدورات" className="flex flex-row-reverse items-center justify-end gap-3">
              <BookOpenCheck className="w-5 h-5" />
              <span>الدورات</span>
            </Link>
            <Link href="/support" title="الدعم الفني" className="flex flex-row-reverse items-center justify-end gap-3">
              <LifeBuoy className="w-5 h-5" />
              <span>الدعم الفني</span>
            </Link>
            <Link href="/logout" title="تسجيل الخروج" className="flex flex-row-reverse items-center justify-end gap-3 text-red-500">
              <LogOut className="w-5 h-5" />
              <span>تسجيل الخروج</span>
            </Link>
          </div>
        </aside>
      </div>
    </BaseLayout>
  );
};

export default DashboardLayout;
