'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'



export async function signup({userData}: {userData: {email: string, password: string}},username: string) {
  const supabase = createClient();


  const { error } = await supabase.auth.signUp(userData);

  if (error) {
    // redirect('/')
    console.log("error signup")
  }
else{
    const {error}= await supabase.from('user_data').insert({email: userData.email, username: username})
    if(error){
        // alert('error store data')
        console.log(error)
    }
    else{
        redirect(`/${username}`)
    }
}
}