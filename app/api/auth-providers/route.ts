/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) throw error;

    const stats = {
      email: 0,
      phone: 0,
      email_phone: 0,
    };

    data.users?.forEach((user) => {
      const hasEmail = !!user.email;
      const hasPhone = !!user.phone;

      if (hasEmail && hasPhone) stats.email_phone++;
      else if (hasEmail) stats.email++;
      else if (hasPhone) stats.phone++;
    });

    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
