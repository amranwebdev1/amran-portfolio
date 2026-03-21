import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Image as ImageIcon } from 'lucide-react';

const loading = () => {
  // ৩টি বা ৬টি কার্ডের জন্য একটি অ্যারে
  const skeletonCards = Array.from({ length: 6 });

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Skeleton */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-4">
            <Sparkles size={16} className="text-gray-400" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-12 w-48 mb-6" />
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-4 w-full max-w-xl" />
            <Skeleton className="h-4 w-[80%] max-w-md" />
          </div>
        </div>

        {/* Projects Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletonCards.map((_, index) => (
            <div 
              key={index}
              className="rounded-2xl overflow-hidden bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col h-full"
            >
              {/* Image Area Skeleton */}
              <div className="relative h-56 w-full bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                <ImageIcon size={40} className="text-gray-300 dark:text-gray-600 relative z-10" />
                
                {/* Floating Icon Placeholder */}
                <div className="absolute top-4 left-4 z-20 bg-white/20 dark:bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10">
                  <Skeleton className="h-5 w-5 rounded-md" />
                </div>
              </div>

              {/* Content Area Skeleton */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                {/* Tech Tags Skeleton */}
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-14 rounded-md" />
                  <Skeleton className="h-5 w-16 rounded-md" />
                  <Skeleton className="h-5 w-12 rounded-md" />
                </div>

                {/* Title Skeleton */}
                <Skeleton className="h-7 w-[70%] rounded-lg" />

                {/* Description Skeleton */}
                <div className="space-y-2 flex-grow">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[60%]" />
                </div>

                {/* Buttons Skeleton */}
                <div className="flex items-center gap-3 pt-4">
                  <Skeleton className="h-10 w-32 rounded-lg" /> {/* Live Demo Button */}
                  <Skeleton className="h-10 w-10 rounded-lg" /> {/* GitHub Button */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default loading;
