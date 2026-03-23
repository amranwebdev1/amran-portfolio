"use client"
import React, { useEffect, useState } from 'react'
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { createClient } from "@/lib/supabase/client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "#6366f1", // Indigo color
  },
}

export function ChartAreaGradient() {
  const supabase = createClient();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLast7DaysVisitors = async () => {
      // ১. গত ৭ দিনের ডেট রেঞ্জ তৈরি
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().split('T')[0]); // YYYY-MM-DD format
      }

      // ২. ডাটাবেস থেকে গত ৭ দিনের ডাটা আনা
      const { data, error } = await supabase
        .from("analytics")
        .select("created_at")
        .gte("created_at", days[0]);

      if (error) {
        console.error(error.message);
        return;
      }

      // ৩. ডাটাকে চার্ট ফরম্যাটে সাজানো
      const formattedData = days.map(day => {
        const count = data.filter(item => 
          item.created_at.startsWith(day)
        ).length;
        
        // তারিখটিকে সুন্দর দেখাতে (যেমন: 23 Mar)
        const label = new Date(day).toLocaleDateString('bn-BD', { 
          day: 'numeric', 
          month: 'short' 
        });

        return { day: label, visitors: count };
      });

      setChartData(formattedData);
      setLoading(false);
    };

    fetchLast7DaysVisitors();
  }, []);

  if (loading) return <div className="h-[300px] flex items-center justify-center text-white">লোড হচ্ছে...</div>;

  return (
    <Card className="lg:col-span-2 bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">ভিজিটর অ্যানালিটিক্স</CardTitle>
        <CardDescription className="text-slate-400">
          গত ৭ দিনের মোট ভিজিটর সংখ্যা
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{fill: '#94a3b8'}}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area
              dataKey="visitors"
              type="natural"
              fill="url(#fillVisitors)"
              fillOpacity={0.4}
              stroke="#6366f1"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm text-slate-400">
          <div className="flex items-center gap-2 leading-none font-medium text-emerald-500">
            রিয়েল-টাইম ডাটা <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
