import { Geist, Geist_Mono,Roboto,Lobster } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/ui/theme-provider"
import Layout from "@/components/common/Layout"
import { Toaster } from 'react-hot-toast';

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
  metadataBase: new URL('https://amran-portfolio.vercel.app/'), // Canonical URL এর জন্য এটি প্রয়োজন
  title: {
    default: 'Amran Hossen | Full-Stack Web Developer',
    template: '%s | Amran Hossen',
  },
  description: '6+ years of experience in building premium, high-performance web applications using Next.js, Tailwind CSS, and Supabase.',
  keywords: [
    "Amran Hossen", "Next.js Developer Bangladesh", "React Specialist", 
    "Full Stack Web Developer", "Supabase Expert", "UI/UX Designer", 
    "Shadcn UI Portfolio", "Modern Web Templates"
  ],
  authors: [{ name: "Amran Hossen", url: "https://amran-portfolio.vercel.app/" }],
  creator: "Amran Hossen",
  publisher: "Amran Hossen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Amran Hossen | Full-Stack Developer',
    description: 'Specializing in high-performance React & Next.js applications.',
    url: '/',
    siteName: 'Amran Hossen Portfolio',
    images: [
      {
        url: '/og-image.png', // আপনার প্রোফাইলের একটি প্রফেশনাল ব্যানার দিতে পারেন
        width: 1200,
        height: 630,
        alt: 'Amran Hossen Portfolio Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amran Hossen | Full-Stack Developer',
    description: 'Building modern web experiences with Next.js & Supabase.',
    images: ['/og-image.png'], 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'oGOd7ksM6kVit6xiJHKRiXKj8lPv3AtozK1_F2bqLxA',
  },
};


export default function RootLayout({ children }) {
  // JSON-LD ডাটা
  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Amran Hossen",
  "alternateName": "Md Amran Hossen",
  "url": "https://amran-portfolio.vercel.app/",
  "image": "https://amran-portfolio.vercel.app/icon2.jpg", // আপনার ছবি
  "jobTitle": "Full-Stack Web Developer",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Bangladesh"
  },
  "sameAs": [
    "https://github.com/amranwebdev1",
    "https://www.linkedin.com/in/md-amran-hossen-a93a672a3",
    "https://www.facebook.com/share/1bk7nHTFZ9/" // যদি থাকে
  ],
  "knowsAbout": ["React", "Next.js", "Tailwind CSS", "Supabase", "TypeScript", "Node.js,html,css,sql,mongodb"]
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
          <Layout>
            {children}
            <Toaster />
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}

