import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"

export async function middleware(request){
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // রিকোয়েস্ট কুকি আপডেট (সার্ভার সাইডের জন্য)
          cookiesToSet.forEach(({ name, value, options }) => 
            request.cookies.set(name, value, options) // options এখানে অবশ্যই দিতে হবে
          )
          
          supabaseResponse = NextResponse.next({ request })
          
          // রেসপন্স কুকি আপডেট (ব্রাউজারের জন্য)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      }
    }
  );
 console.log("Middleware running...");
  // সেশন ভ্যালিডেশন
  const { data: { user } } = await supabase.auth.getUser();
  
  const pathname = request.nextUrl.pathname;
  const targetEmail = "amraanhossen@gmail.com";

  // ১. ড্যাশবোর্ড প্রোটেকশন
  if (pathname.startsWith("/dashboard")) {
    if (!user || user.email !== targetEmail) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/sign-in"; // আপনার লগইন পেজের পাথ নিশ্চিত করুন
      return NextResponse.redirect(url);
    }
  }

  // ২. লগইন করা থাকলে লগইন পেজে যেতে বাধা দিন
  if (user && user.email === targetEmail && (pathname.startsWith("/auth/sign-in") || pathname === "/sign-in")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ]
}
