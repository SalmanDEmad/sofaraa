import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Send, User, Shield } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Message {
  id: number;
  sender_type: 'student' | 'admin';
  message: string;
  created_at: string;
}

interface Student {
  id: number;
  name: string;
  unreadCount: number;
}

interface Props {
  students?: Student[];
  initialMessages?: Message[];
  userRole: 'student' | 'admin';
  adminId: number;
}

const ChatApp: React.FC<Props> = ({
  students = [],
  initialMessages = [],
  userRole,
  adminId,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!selectedStudent) return;

    const channelName = `chat.${selectedStudent.id}`;

    window.Echo.private(channelName)
      .listen('.MessageSent', (e: Message) => {
        setMessages((prev) => [...prev, e]);
      });

    return () => {
      window.Echo.leave(channelName);
    };
  }, [selectedStudent]);

  useEffect(() => {
    if (!selectedStudent) return;

    router.get(
      `/admin/messages/${selectedStudent.id}`,
      {},
      {
        preserveState: true,
        preserveScroll: true,
        only: ['initialMessages'],
        onSuccess: (page) => {
          setMessages((page.props as any).initialMessages || []);
        },
      }
    );
  }, [selectedStudent]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedStudent) return;

    const payload = {
      message: input,
      sender_type: userRole,
      student_id: selectedStudent.id,
      admin_id: userRole === 'admin' ? adminId : null,
    };

    try {
      const response = await fetch('/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': (
            document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement
          )?.content || '',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        const newMessage: Message = result.message;
        setMessages((prev) => [...prev, newMessage]);
        setInput('');
      } else {
        console.error('Failed to send message.');
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (students.length === 0) {
    return (
      <AdminLayout activeLink="#messages">
        <main className="flex h-screen items-center justify-center" dir="rtl">
          <p className="text-gray-500 text-lg">لا يوجد طلاب للدردشة</p>
        </main>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeLink="#messages">
      <main className="flex h-screen overflow-hidden" dir="rtl">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-l border-gray-200 flex flex-col">
          <header className="flex items-center gap-2 p-4 border-b border-gray-200 bg-[#f7fafc]">
            <Shield className="w-6 h-6 text-[#296e85]" />
            <h2 className="text-lg font-bold text-[#296e85]">رسائل الطلاب</h2>
          </header>
          <nav className="flex-1 overflow-y-auto">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`w-full px-4 py-3 text-right border-b border-gray-200 focus:outline-none hover:bg-[#eaf1f8] transition flex justify-between items-center ${
                  selectedStudent?.id === student.id ? 'bg-[#d0f0fc]' : ''
                }`}
              >
                <span>{student.name}</span>
                {student.unreadCount > 0 && (
                  <span className="bg-[#22d3ee] text-white text-xs px-2 py-0.5 rounded-full">
                    {student.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Chat Panel */}
        <section className="flex-1 flex flex-col bg-[#f0f4f8]">
          <header className="p-4 border-b border-gray-300 bg-white flex items-center gap-2">
            <User className="w-6 h-6 text-[#7bbfd9]" />
            <h2 className="font-semibold text-lg">
              {selectedStudent ? selectedStudent.name : 'اختر طالبًا للدردشة'}
            </h2>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!selectedStudent ? (
              <p className="text-center text-gray-400">يرجى اختيار طالب.</p>
            ) : messages.length === 0 ? (
              <p className="text-center text-gray-400">لا توجد رسائل بعد.</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[70%] ${
                    msg.sender_type === userRole
                      ? 'items-end ml-auto'
                      : 'items-start mr-auto'
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1 select-text whitespace-nowrap">
                    {msg.created_at}
                  </div>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      msg.sender_type === userRole
                        ? 'bg-[#22d3ee] text-white rounded-br-none shadow-md'
                        : 'bg-white border border-gray-300 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {selectedStudent && (
            <form
              onSubmit={sendMessage}
              className="p-4 bg-white border-t border-gray-300 flex gap-3"
            >
              <input
                type="text"
                placeholder="اكتب رسالتك..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={`bg-[#296e85] hover:bg-[#22d3ee] text-white rounded-lg px-5 flex items-center justify-center transition ${
                  !input.trim() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </section>
      </main>
    </AdminLayout>
  );
};

export default ChatApp;
