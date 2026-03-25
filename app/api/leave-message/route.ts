/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/leave-message/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  try {
    const { username, email, subject, message } = await req.json();

    if (!username || !email || !message) {
      return NextResponse.json(
        { error: 'Username, email and message are required.' },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from('messages')
      .insert([{ username, email, subject, message }])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to send message.' },
      { status: 400 },
    );
  }
}
