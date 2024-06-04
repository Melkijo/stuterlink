import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
    console.log("masuk callback")
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'
  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      
      const { data: { user } } = await supabase.auth.getUser();
      console.log("user",user)
        if (user) {
            // store the user's email in a cookie
           const {data,error} =await supabase
           .from('user_data')
           .select('username').eq('email',user.email)

            console.log("data",data)
              if(data && data.length === 0){
                const newUsername = cookies().get('name')
                console.log("new username",newUsername?.value)

                if(newUsername){
                    const { error } = await supabase
                    .from("user_data")
                    .insert({ email: user.email, username: newUsername.value });
                    if(!error){
                        cookies().delete('name')
                        return NextResponse.redirect(`${origin}${next}${newUsername.value}`)
                    }
                }
              }
            else {
                console.log("kondisi user udah ada", data)
                if (data && data.length > 0) {
                    return NextResponse.redirect(`${origin}${next}${data[0].username}`)
                }
            }


        }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}