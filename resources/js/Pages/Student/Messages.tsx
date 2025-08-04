import React, { useEffect, useRef, useState } from 'react';
import StudentLayout from '@/Layouts/StudentLayout';
import { Send, Shield } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

interface Message {
  id: number;
  message: string;
  sender_type: 'student' | 'admin';
  created_at: string;
}

interface PageProps extends InertiaPageProps {
  messages: Message[];
  studentId: number;
  [key: string]: any;  // index signature added here
}

const Messages: React.FC = () => {
  const { messages: initialMessages, studentId } = usePage<PageProps>().props;

  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    window.Echo.private(`chat.student.${studentId}`)
      .listen('.MessageSent', (e: any) => {
        setMessages((prev) => [...prev, e.message]);
      });

    return () => {
      window.Echo.leave(`chat.student.${studentId}`);
    };
  }, [studentId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const payload = {
      message: input,
      sender_type: 'student',
      student_id: studentId,
      admin_id: null,
    };

    try {
      const response = await fetch('/student/messages/send', {
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
        const data = await response.json();
        setMessages((prev) => [...prev, data.message]);
        setInput('');
      } else {
        console.error('Failed to send message');
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <StudentLayout activeLink="#messages">
      <main className="flex flex-col h-screen bg-[#f0f4f8]" dir="rtl">
        <header className="p-4 border-b border-gray-300 bg-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#7bbfd9]" />
          <h2 className="font-semibold text-lg">مراسلة الإدارة</h2>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400">لا توجد رسائل بعد.</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[70%] ${
                  msg.sender_type === 'student'
                    ? 'items-end ml-auto'
                    : 'items-start mr-auto'
                }`}
              >
                <div className="text-xs text-gray-500 mb-1 select-text whitespace-nowrap">
                  {msg.created_at}
                </div>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    msg.sender_type === 'student'
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) sendMessage(e as any);
            }}
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
      </main>
    </StudentLayout>
  );
};

export default Messages;
