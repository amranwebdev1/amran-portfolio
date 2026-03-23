"use client"
import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MessageCircle, 
  Trash2, 
  Clock, 
  User, 
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Send,
  ArrowLeft
} from 'lucide-react';
import { createClient } from "@/lib/supabase/client";
import { formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale';

const MessageInbox = () => {
  const supabase = createClient();
  const [messages, setMessages] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMessages();
    
    // রিয়েল-টাইম মেসেজ লিসেনার
    const channel = supabase
      .channel('db-messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => fetchMessages())
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order('created_at', { ascending: false });

    if (!error) setMessages(data);
    setLoading(false);
  };

  const handleSelectMessage = async (msg) => {
    setSelectedMsg(msg);
    if (!msg.is_read) {
      const { error } = await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("id", msg.id);
      
      if (!error) {
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
      }
    }
  };

  const deleteMsg = async (id) => {
    if (!confirm("আপনি কি নিশ্চিত যে এই মেসেজটি ডিলিট করতে চান?")) return;
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (!error) {
      setMessages(prev => prev.filter(m => m.id !== id));
      setSelectedMsg(null);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(search.toLowerCase()) || 
    m.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-[#020617] min-h-[90vh] rounded-3xl border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl py-18">
      
      {/* বাম পাশের লিস্ট */}
      <div className={`w-full md:w-[380px] border-r border-white/10 flex flex-col ${selectedMsg ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 border-b border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Mail className="text-indigo-500 w-5 h-5" /> ইনবক্স
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="মেসেজ খুঁজুন..." 
              className="w-full bg-slate-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500/50"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {loading ? (
            <div className="p-10 text-center text-slate-500">লোড হচ্ছে...</div>
          ) : filteredMessages.map((msg) => (
            <div 
              key={msg.id} 
              onClick={() => handleSelectMessage(msg)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                selectedMsg?.id === msg.id 
                ? 'bg-indigo-600/20' 
                : 'bg-transparent border-transparent hover:bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold uppercase tracking-widest ${msg.is_read ? 'text-slate-500' : 'text-indigo-400'}`}>
                  {msg.is_read ? 'পঠিত' : 'নতুন মেসেজ'}
                </span>
                <span className="text-[10px] text-slate-500">
                  {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true, locale: bn })}
                </span>
              </div>
              <h3 className={`text-sm font-semibold truncate ${msg.is_read ? 'text-slate-400' : 'text-white'}`}>{msg.name}</h3>
              <p className="text-xs text-slate-500 truncate mt-1 leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ডান পাশের ডিটেইল ভিউ */}
      <div className={`flex-1 flex flex-col bg-slate-900/30 ${!selectedMsg ? 'hidden md:flex' : 'flex'}`}>
        {selectedMsg ? (
          <>
            {/* হেডার */}
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedMsg(null)} className="md:hidden p-2 text-slate-400"><ArrowLeft /></button>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                  {selectedMsg.name?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">{selectedMsg.name}</h2>
                  <p className="text-xs text-slate-500">{selectedMsg?.email}</p>
                  <p className="text-xs text-slate-500">{selectedMsg?.Whatsapp}</p>
                </div>
              </div>
              <button 
                onClick={() => deleteMsg(selectedMsg.id)}
                className="p-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl transition-all border border-rose-500/20"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* মেসেজ বডি */}
            <div className="flex-1 p-8 overflow-y-auto">
               <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                    মেসেজের বিষয়বস্তু
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                    {selectedMsg.message}
                  </p>
                  <div className="mt-10 pt-6 border-t border-white/5 text-[11px] text-slate-500 italic">
                    পাঠানো হয়েছে: {new Date(selectedMsg.created_at).toLocaleString('bn-BD', { dateStyle: 'full', timeStyle: 'short' })}
                  </div>
               </div>
            </div>

            {/* রিপ্লাই অ্যাকশন বাটন */}
            <div className="p-6 bg-white/5 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* ইমেইল রিপ্লাই */}
               <a 
                 href={`mailto:${selectedMsg.email}?subject=Reply to your message&body=Hello ${selectedMsg.name},`}
                 className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl font-bold transition-all group"
               >
                 <Mail className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                 ইমেইলে রিপ্লাই দিন
               </a>

               {/* হোয়াটসঅ্যাপ রিপ্লাই */}
               <a 
                 href={`https://wa.me/++880${selectedMsg.Whatsapp?.replace(/\D/g, '')}?text=Hello ${selectedMsg.name}, I am replying to your message from portfolio.`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center justify-center gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-500 py-4 rounded-2xl font-bold transition-all group"
               >
                 <MessageCircle className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                 হোয়াটসঅ্যাপে রিপ্লাই
               </a>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-50">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
               <Mail size={40} className="text-slate-700" />
            </div>
            <h2 className="text-xl font-bold text-slate-400">মেসেজ সিলেক্ট করুন</h2>
            <p className="text-slate-600 max-w-xs mt-2 text-sm">ইনবক্স থেকে কোনো মেসেজ সিলেক্ট করলে এখানে তার বিস্তারিত এবং রিপ্লাই অপশন দেখতে পাবেন।</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInbox;

