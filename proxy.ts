import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { PATHS } from './data/paths';

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      // This protects the session and enables Supabase to properly control cookies.
      cookies: {
        // Read all cookies in the request
        getAll() {
          // Read cookies from request
          return req.cookies.getAll().map(({ name, value }) => ({
            name,
            value,
          }));
        },
        // Cookies are written after any session update
        setAll(cookiesToSet) {
          // Writing cookies on response
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL(PATHS.AUTH.LOGIN, req.url));
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single(); // To ensure that only one row is brought in.

  if (error || !profile) {
    return NextResponse.redirect(new URL(PATHS.AUTH.LOGIN, req.url));
  }

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (profile.role !== 'ADMIN') {
      return NextResponse.redirect(new URL(PATHS.HOME, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/my-account'],
};
