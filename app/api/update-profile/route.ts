/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, display_name, email, phone, avatar_url } = body;

    if (!userId)
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    // 1. Create user in auth.users
    const { data: user, error } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      {
        email,
        phone,
        user_metadata: { display_name, phone },
      },
    );

    if (error) throw error;

    // 2️⃣ update profiles
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        email,
        phone,
        display_name,
        avatar_url,
      })
      .eq('id', userId);

    if (profileError) throw profileError;

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
