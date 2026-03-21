import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// এখানে (request: Request) এর বদলে শুধু (request) হবে
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const {data:{user}} = await supabase.auth.getUser();
      if(user?.email !== "amraanhossen@gmail.com"){
        await supabase.auth.signOut()
      return NextResponse.redirect(`${origin}/auth/unauthorized`)
      }
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
