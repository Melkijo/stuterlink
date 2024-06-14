import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
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
        if (user) {
            // store the user's email in a cookie
           const {data} =await supabase
           .from('user_data')
           .select('username').eq('email',user.email)

          
              if(data && data.length === 0){
                const newUsername = cookies().get('name')


                if(newUsername){
                    const { error } = await supabase
                    .from("user_data")
                    .insert({ email: user.email, username: newUsername.value });
                    if(!error){
                        cookies().delete('name')
                        return NextResponse.redirect(`${origin}${next}${newUsername.value}`)
                    }
                }
                else{
                    await supabase.auth.signOut();
                    return NextResponse.redirect(`${origin}`)

                }
              }
              else if (data && data.length > 0) {
                cookies().delete('name')
                return NextResponse.redirect(`${origin}${next}${data[0].username}`)
            }
           


        }

      return NextResponse.redirect(`https://stuterlink.vercel.app${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}`)
}