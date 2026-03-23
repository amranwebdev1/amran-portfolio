"use client"
import React, { useState,useEffect } from 'react';
import { 
  Briefcase, 
  MessageSquare, 
  Users, 
  History, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUpRight,
  MoreVertical,
  Activity
} from 'lucide-react';

import StatCard from "./StatCard"
import {ChartAreaGradient} from "./Chart"
import {createClient} from "@/lib/supabase/client";
import { formatDistanceToNow } from 'date-fns';
import { bn } from 'date-fns/locale'; // বাংলা ফরম্যাটের জন্য

const Home = ({projectData,messageData,initialCount}) => {
  const supabase = createClient();
  const [project,setProject] = useState(projectData || [])
  const [messages, setMessages] = useState(messageData || []);
const [totalVisitors,setTotalVisitors] = useState( initialCount || null)
const [history, setHistory] = useState([]);
  //project data fetch
  
    useEffect(()=>{
      const projectData = async()=>{
        const {data,error} = await supabase.from("projects").select("*")
        if(error) return;
        setProject(data)
    }
    projectData()
    },[])
// এই মাসের শুরুর তারিখ বের করা
const now = new Date();
const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
// শুধু এই মাসের প্রজেক্টগুলো ফিল্টার করা
const thisMonthProjects = project.filter(item => {
  const projectDate = new Date(item.created_at);
  return projectDate >= firstDayOfMonth;
});



useEffect(() => {
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order('created_at', { ascending: false });

    if (!error) setMessages(data);
  };
  fetchMessages();
}, []);

// অপঠিত মেসেজ ফিল্টার করা
const unreadMessages = messages.filter(msg => msg.is_read === false);

//total visitor
// ভিজিটর ডাটা ফেচ করার জন্য useEffect
useEffect(() => {
  const fetchVisitors = async () => {
    const { count, error } = await supabase
      .from("analytics")
      .select('*', { count: 'exact', head: true });

    if (!error) {
      setTotalVisitors(count);
    } else {
      console.error("Visitor fetch error:", error.message);
    }
  };

  fetchVisitors();
}, []); // [] মানে পেজ লোড হলে একবার রান হবে

  // State for Project History
  useEffect(() => {
  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order('created_at', { ascending: false })
      .limit(10); // শুধু শেষের ১০টি দেখাবে

    if (!error) setHistory(data);
  };
  fetchHistory();
}, []);
useEffect(() => {
  const channel = supabase
    .channel('realtime-history')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'activities' }, 
      (payload) => {
        // নতুন অ্যাক্টিভিটি সবার উপরে যোগ হবে
        setHistory((prev) => [payload.new, ...prev].slice(0, 10));
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, [supabase]);


  return (
    <div className="w-full bg-[#020617] my-18 min-h-screen p-4 md:p-6 space-y-6">
      
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="মোট প্রজেক্ট" 
          value={project?.length || 0} 
          change={`+${thisMonthProjects?.length || 0} এই মাসে`}
          icon={<Briefcase className="w-5 h-5" />} 
          color="text-blue-600" 
          bgColor="bg-blue-100" 
        />
        <StatCard 
          title="নতুন মেসেজ" 
          value={messages?.length || 0} 
          change={`${unreadMessages?.length || 0} টি অপঠিত`} 
          icon={<MessageSquare className="w-5 h-5" />} 
          color="text-purple-600" 
          bgColor="bg-purple-100" 
        />
        <StatCard 
          title="মোট ভিজিটর" 
          value={totalVisitors || 0} 
          change="+১৮% গত সপ্তাহ" 
          icon={<Users className="w-5 h-5" />} 
          color="text-emerald-600" 
          bgColor="bg-emerald-100" 
        />
        <StatCard 
          title="সিস্টেম হেলথ" 
          value="৯৯.৯%" 
          change="স্ট্যাবল" 
          icon={<Activity className="w-5 h-5" />} 
          color="text-orange-600" 
          bgColor="bg-orange-100" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Section */}
        <ChartAreaGradient />
        {/* Recent History / Activities */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" />
              <h2 className="text-lg font-bold text-slate-800">রিসেন্ট হিস্টোরি</h2>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-all">
              <MoreVertical size={16} className="text-slate-400" />
            </button>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
  {history?.map((item) => (
    <div key={item.id} className="relative pl-8 group">
      {/* Timeline Line */}
      <div className="absolute left-[15px] top-8 bottom-[-24px] w-[2px] bg-slate-100 group-last:hidden"></div>
      
      {/* Status Dot */}
      <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${
        item.type === 'ADD' ? 'bg-emerald-500' : 
        item.type === 'UPDATE' ? 'bg-blue-500' : 'bg-rose-500'
      }`}>
        {item.type === 'ADD' && <Plus size={14} className="text-white" />}
        {item.type === 'UPDATE' && <Edit3 size={14} className="text-white" />}
        {item.type === 'DELETE' && <Trash2 size={14} className="text-white" />}
      </div>

      <div className="bg-slate-50/50 p-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-white transition-all cursor-default">
        <p className="text-sm font-semibold text-slate-700">{item.task}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {/* সময়কে "১০ মিনিট আগে" ফরম্যাটে রূপান্তর */}
            {formatDistanceToNow(new Date(item.created_at), { addSuffix: true, locale: bn })}
          </span>
          <ArrowUpRight size={12} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
        </div>
      </div>
    </div>
  ))}
</div>

        </div>

      </div>
    </div>
  );
};


export default Home;

