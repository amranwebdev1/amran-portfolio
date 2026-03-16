import { Geist, Geist_Mono,Roboto,Lobster } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/ui/theme-provider"
import Layout from "@/components/common/Layout"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ['400', '700'],
  subsets: ['latin'],
});
const lobster = Lobster({
  variable: "--font-lobster",
  weight: '400',
  subsets: ['latin'],
});


export const metadata = {
  title:{
    default: 'Amran Hossen | Full-Stack Web Developer',
    template: '%s | Amran Hossen',
  },
  description: 'Specializing in Next.js, Tailwind CSS, and Supabase. Building premium, high-performance web applications.',
  keywords: [
  "Md Amran",
  "Amran Hossen",
  "Full Stack Developer Bangladesh",
  "Next.js Developer",
  "React Developer",
  "Web Developer Portfolio",
  "Frontend Developer Bangladesh",
  "Tailwind CSS Developer",
  "JavaScript Developer"
  ],
  authors:[{name:"Amran Hossen"}],
  openGraph: {
    title: 'Amran Hossen | Full-Stack Developer',
    description: 'Explore my projects and skills in modern web development.',
    url: 'https://amran-portfolio.vercel.app/', // আপনার ডোমেইন
    siteName: 'amran-portfolo',
    images: [
      {
        url: '/icon2.png', // একটি সুন্দর ইমেজ যা ফেসবুকে শেয়ার করলে দেখাবে
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image', // বড় ইমেজ দেখানোর জন্য
    title: 'Amran Hossen | Full-Stack Developer',
    description: 'Building modern web experiences with Next.js & Supabase.',
    creator: '@your_twitter_handle', // আপনার টুইটার ইউজারনেম
    images: ['/icon2.png'], 
  },
  verification: {
    google:'oGOd7ksM6kVit6xiJHKRiXKj8lPv3AtozK1_F2bqLxA',
  },
};

export default function RootLayout({ children }) {
  // JSON-LD ডাটা
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Amran Hossen",
    "url": "https://amran-portfolio.vercel.app/",
    "jobTitle": "Full-Stack Web Developer",
    "sameAs": [
      "https://github.com/amranwebdev1", // আপনার সঠিক লিঙ্ক দিন
      "https://www.linkedin.com/in/md-amran-hossen-a93a672a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      
    ],
    "description": "Specializing in Next.js, Tailwind CSS, and Supabase."
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* গুগলকে আপনার সম্পর্কে স্পষ্ট ধারণা দেওয়ার জন্য */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${lobster.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}

