// src/app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path') || '/';
  
  // 'layout' দেওয়ার ফলে ওই পাথের ভেতরে থাকা সব সাব-পেজও আপডেট হবে
  revalidatePath(path, 'layout'); 
  
  return NextResponse.json({ revalidated: true });
}
