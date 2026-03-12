/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: NextRequest) {
  try {
    const { page, userId, visitorId } = await req.json();

    if (!page || (!userId && !visitorId)) {
      return NextResponse.json(
        { error: 'Missing page or userId/visitorId' },
        { status: 400 },
      );
    }

    let profile = null;
    if (userId) {
      const { data } = await supabaseAdmin
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      profile = data;
    }

    // Here, only success is returned without entering any row, and this prevents the admin from registering in page_views.
    if (profile?.role === 'ADMIN') {
      return NextResponse.json({ success: true });
    }

    /**
     * Reason for adding visitor_id:
      - Now we can track unique visitors even if they are not logged in.
      - Each new tab in the same browser can have a different visitorId → This solves the problem of visitors in multiple tabs.
     */
    const { error } = await supabaseAdmin.from('page_views').insert({
      page,
      user_id: userId || null,
      visitor_id: visitorId,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
