const StatCard = ({ title, value, change, icon, color, bgColor }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start">
      <div className={`${bgColor} ${color} p-2.5 rounded-xl transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
        LIVE
      </span>
    </div>
    <div className="mt-4">
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
        <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-md">
          {change}
        </span>
      </div>
    </div>
  </div>
);

export default StatCard;