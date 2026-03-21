import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";
const loading = () => {
  return (
    <div>
      <section className="py-20 w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title Placeholder */}
        <div className="flex flex-col items-center mb-16">
          <Skeleton className="h-12 w-64 rounded-xl" />
          <Skeleton className="h-1 w-20 mt-4 rounded-full bg-[#1f87de]/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* About Text Placeholder - Detailed version */}
          <div className="order-2 md:order-1 rounded-2xl p-8 bg-gradient-to-tr from-gray-100 to-gray-50 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-sm space-y-6">
            
            {/* প্যারাগ্রাফ ১ এর জন্য স্কেলিটন */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-[95%] rounded-full" />
              <Skeleton className="h-4 w-[85%] rounded-full" />
            </div>

            {/* প্যারাগ্রাফ ২ এর জন্য স্কেলিটন */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-[98%] rounded-full" />
              <Skeleton className="h-4 w-[90%] rounded-full" />
              <Skeleton className="h-4 w-[70%] rounded-full" />
            </div>

            {/* প্যারাগ্রাফ ৩ বা ছোট লাইনের জন্য */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-[92%] rounded-full" />
              <Skeleton className="h-4 w-[40%] rounded-full" />
            </div>
          </div>

          {/* About Photo Placeholder */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative group">
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#1f87de]/20 animate-[spin_10s_linear_infinite]" />
              
              {/* Main Profile Circle */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <Skeleton className="h-full w-full absolute inset-0 rounded-full" />
                <User size={100} className="text-gray-400 dark:text-gray-600 relative z-10 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default loading;