import { useState } from 'react';
import DashboardLayout from '@/Layouts/StudentLayout';
import { Megaphone, ChevronDown, ChevronUp } from 'lucide-react';
import { PageProps } from '@/types';

interface Announcement {
  id: number;
  title: string;
  description: string;
  announced_at: string;
  is_pinned: boolean;
}

interface Props extends PageProps {
  pinned: Announcement[];
  unpinned: Announcement[];
}

const Announcements = ({ pinned, unpinned }: Props) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <DashboardLayout activeLink="#announcements">
      <main className="flex-1 bg-beige-50 min-h-screen">
        <div className="bg-[#fdf7ee] min-h-screen text-brown-800 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-right">الإعلانات</h1>

            {/* Pinned Announcements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {pinned.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-[#f6eddc] p-5 rounded-xl shadow border border-[#e6dcc6] text-right"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#402a13]">{announcement.title}</h3>
                    <Megaphone className="w-5 h-5 text-[#6b4c33]" />
                  </div>
                  <p className="text-sm text-[#6b4c33]">{announcement.description}</p>
                  <p className="text-xs text-[#a38c74] mt-2">📅 {announcement.announced_at}</p>
                </div>
              ))}
            </div>

            {/* Accordion for Unpinned Announcements */}
            <div className="bg-[#f6eddc] rounded-xl shadow border border-[#e6dcc6] text-right overflow-hidden">
              {unpinned.map((announcement) => (
                <div key={announcement.id} className="border-t border-[#e6dcc6]">
                  <button
                    onClick={() => toggleAccordion(announcement.id)}
                    className="w-full px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-[#f1e6cf] focus:outline-none"
                  >
                    <div className="flex flex-col md:flex-row md:gap-4 w-full justify-between items-start md:items-center">
                      <span className="text-[#402a13] font-bold text-sm md:text-base">
                        {announcement.title}
                      </span>
                      <span className="text-xs text-[#a38c74] whitespace-nowrap mt-1 md:mt-0">
                        📅 {announcement.announced_at}
                      </span>
                    </div>
                    <div className="mt-2 md:mt-0">
                      {expandedId === announcement.id ? (
                        <ChevronUp className="w-5 h-5 text-[#6b4c33]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#6b4c33]" />
                      )}
                    </div>
                  </button>
                  {expandedId === announcement.id && (
                    <div className="px-6 pb-4 text-sm text-[#4b2e24]">
                      <p>{announcement.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Announcements;