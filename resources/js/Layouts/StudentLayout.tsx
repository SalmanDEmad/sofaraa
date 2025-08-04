import { Link } from '@inertiajs/react';
import {
  Home,
  LifeBuoy,
  LogOut,
  Menu,
  FileQuestion,
  BookOpenCheck,
  MonitorPlay,
  PanelLeftClose,
  BarChart2,
  Megaphone,
  User,
  MessageSquare, // ✅ added for messages
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

const ActiveLink: React.FC<ActiveLinkProps> = ({
  href,
  label,
  isActive,
  icon,
  isCollapsed,
}) => (
  <Link
    href={href}
    title={label}
    className={
      `group flex items-center px-5 py-3 w-full transition-colors duration-300 hover:bg-[#236477] ` +
      (isActive
        ? 'bg-[#296e85] text-white border-r-4 border-[#22d3ee]'
        : 'text-white')
    }
    style={isCollapsed ? { justifyContent: 'center' } : {}}
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

const DashboardLayout: React.FC<DashboardProps> = ({
  activeLink,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <BaseLayout>
      <div className="h-screen flex font-[Cairo]">
        {/* Sidebar */}
        <aside
          className={
            `hidden md:flex flex-col bg-[#194350] text-white h-full transition-width duration-300 ease-in-out overflow-hidden ` +
            (isCollapsed ? 'w-16' : 'w-64')
          }
        >
          <button
            onClick={toggleSidebar}
            title={isCollapsed ? 'توسيع القائمة' : 'إخفاء القائمة'}
            className="self-end m-2 p-2 hover:bg-[#236477] rounded"
          >
            {isCollapsed ? <Menu className="w-6 h-6" /> : <PanelLeftClose className="w-6 h-6" />}
          </button>

          <nav className="flex-1">
            {/* Main */}
            {!isCollapsed && (
              <div className="px-5 mt-4 mb-2 text-xs uppercase" style={{ color: "#7bbfd9" }}>
                الرئيسية
              </div>
            )}
            <ActiveLink
              href={route('dashboard.index')}
              label="الرئيسية"
              isActive={activeLink === '#dashboard'}
              icon={<Home className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />

            {/* Learning */}
            {!isCollapsed && (
              <div className="px-5 mt-4 mb-2 text-xs uppercase" style={{ color: "#7bbfd9" }}>
                التعلم
              </div>
            )}
            <ActiveLink
              href={route('livestream.index')}
              label="الدورات"
              isActive={activeLink === '#courses'}
              icon={<BookOpenCheck className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <ActiveLink
              href={route('student.videos')}
              label="فيديوهاتي"
              isActive={activeLink === '#videos'}
              icon={<MonitorPlay className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <ActiveLink
              href={route('progress.index')}
              label="تقدمي ودرجاتي"
              isActive={activeLink === '#progress'}
              icon={<BarChart2 className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <ActiveLink
              href={route('quizzes.index')}
              label="الاختبارات والواجبات"
              isActive={activeLink === '#quizzes'}
              icon={<FileQuestion className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <ActiveLink
              href={route('student.announcements')}
              label="الإعلانات"
              isActive={activeLink === '#announcements'}
              icon={<Megaphone className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />

            {/* Account */}
            {!isCollapsed && (
              <div className="px-5 mt-4 mb-2 text-xs uppercase" style={{ color: "#7bbfd9" }}>
                الحساب
              </div>
            )}
            <ActiveLink
              href={route('profile.edit')}
              label="الملف الشخصي"
              isActive={activeLink === '#profile'}
              icon={<User className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <ActiveLink
              href={route('student.messages')}
              label="الرسائل"
              isActive={activeLink === '#messages'}
              icon={<MessageSquare className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
          </nav>

          {/* Footer */}
          <div className="mt-auto">
            <ActiveLink
              href="/support"
              label="الدعم"
              isActive={activeLink === '#support'}
              icon={<LifeBuoy className="w-6 h-6" />}
              isCollapsed={isCollapsed}
            />
            <Link
              href="/logout"
              title="تسجيل الخروج"
              className="group flex items-center px-5 py-3 w-full hover:bg-[#236477]"
            >
              <LogOut className="w-6 h-6 text-white" />
              {!isCollapsed && (
                <span className="mr-3 text-sm">تسجيل الخروج</span>
              )}
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto bg-[#f4fbfd]">{children}</main>

        {/* Mobile Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#194350] text-white flex justify-between items-center px-4 py-2 shadow z-50">
          <Link href={route('student.announcements')} title="الإعلانات" className="flex flex-col items-center text-xs flex-1">
            <Megaphone size={20} />
            <span>الإعلانات</span>
          </Link>
          <Link href={route('livestream.index')} title="الدورات" className="flex flex-col items-center text-xs flex-1">
            <BookOpenCheck size={20} />
            <span>الدورات</span>
          </Link>
          <Link href={route('student.messages')} title="الرسائل" className="flex flex-col items-center text-xs flex-1">
            <MessageSquare size={20} />
            <span>الرسائل</span>
          </Link>
          <Link href={route('dashboard.index')} title="الرئيسية" className="flex flex-col items-center text-xs flex-1">
            <div className="bg-[#22d3ee] text-[#194350] p-2 rounded-full shadow">
              <Home size={24} />
            </div>
            <span>الرئيسية</span>
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} title="المزيد" className="flex flex-col items-center text-xs flex-1">
            <Menu size={20} />
            <span>المزيد</span>
          </button>
        </div>

        {/* Mobile Menu */}
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
            <button onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-500 float-left">✕</button>
            <div className="text-xs" style={{ color: "#7bbfd9" }}>التعلم</div>
            <Link href={route('quizzes.index')} className="flex flex-row-reverse items-center justify-end gap-3">
              <FileQuestion className="w-5 h-5" /><span>الاختبارات والواجبات</span>
            </Link>
            <Link href={route('progress.index')} className="flex flex-row-reverse items-center justify-end gap-3">
              <BarChart2 className="w-5 h-5" /><span>تقدمي ودرجاتي</span>
            </Link>
            <Link href={route('livestream.index')} className="flex flex-row-reverse items-center justify-end gap-3">
              <BookOpenCheck className="w-5 h-5" /><span>الدورات</span>
            </Link>
            <Link href={route('student.messages')} className="flex flex-row-reverse items-center justify-end gap-3">
              <MessageSquare className="w-5 h-5" /><span>الرسائل</span>
            </Link>
            <div className="text-xs mt-2 mb-1" style={{ color: "#7bbfd9" }}>الحساب</div>
            <Link href={route('profile.edit')} className="flex flex-row-reverse items-center justify-end gap-3">
              <User className="w-5 h-5" /><span>الملف الشخصي</span>
            </Link>
            <Link href="/support" className="flex flex-row-reverse items-center justify-end gap-3">
              <LifeBuoy className="w-5 h-5" /><span>الدعم الفني</span>
            </Link>
            <Link href="/logout" className="flex flex-row-reverse items-center justify-end gap-3 text-red-500">
              <LogOut className="w-5 h-5" /><span>تسجيل الخروج</span>
            </Link>
          </div>
        </aside>
      </div>
    </BaseLayout>
  );
};

export default DashboardLayout;