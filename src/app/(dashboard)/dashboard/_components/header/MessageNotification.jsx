"use client";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client"; // ক্লায়েন্ট সাইড ইনভায়রনমেন্ট অনুযায়ী

const MessageNotification = ({ initialCount}) => {
  const [unreadCount, setUnreadCount] = useState(initialCount || 0);
  const supabase = createClient();

  useEffect(() => {
    // ১. রিয়েল-টাইম সাবস্ক্রিপশন সেটআপ
    const channel = supabase
      .channel('realtime_messages')
      .on(
        'postgres_changes',
        {
          event: '*', // INSERT বা UPDATE হলে
          schema: 'public',
          table: 'messages',
        },
        () => {
          fetchUnreadCount(); // কোনো পরিবর্তন হলে কাউন্ট রিফ্রেশ করবে
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // কাউন্ট নিয়ে আসার ফাংশন
  const fetchUnreadCount = async () => {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);
    
    if (!error) setUnreadCount(count);
  };

  if (unreadCount === 0) {
    return (
      <Link href="/dashboard/message" className="w-10 h-10 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative">
        <Mail size={18} />
      </Link>
    );
  }

  return (
    <Link href="/dashboard/message" className="w-10 h-10 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer transition-colors relative">
      <Mail size={18} />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-[#020617]">
        {unreadCount > 9 ? '9+' : unreadCount}
      </span>
    </Link>
  );
};

export default MessageNotification;
