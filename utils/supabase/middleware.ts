import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          // If the cookie is updated, update the cookies for the request and response
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          // If the cookie is removed, update the cookies for the request and response
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#middleware
  const { data: { user } } = await supabase.auth.getUser();

  // AUTH PROTECTED ROUTES LOGIC
  const url = request.nextUrl.clone();

  // If user is NOT authenticated and trying to access protected routes
  // Standard check: is the path not /login or /signup?
  const isAuthPage = url.pathname === '/login' || url.pathname === '/signup';
  
  // We can also check if it's in the (authenticated) group by looking at the path
  // but since Next.js route groups aren't in the URL, we might need a list of protected routes
  // or a general rule. 
  // Let's assume everything except '/', '/login', '/signup', and static files are protected.
  // Or more specifically, any route that isn't public.

  const isPublicRoute = isAuthPage || url.pathname === '/' || url.pathname.startsWith('/contact');

  if (!user && !isPublicRoute) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If user IS authenticated and trying to access login/signup
  if (user && isAuthPage) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
};
