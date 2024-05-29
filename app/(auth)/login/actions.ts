'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login({userData}: {userData: {email: string, password: string}}) {
  const supabase = createClient()


 

  const {error, data}= await supabase.auth.signInWithPassword(userData)
 

  if (error) {
    console.log("error login")
   
   
  }
  else{
    const { data, error } = await supabase
  .from('account_data')
  .select()
  .eq('email', userData.email)


  if(error){
    // alert('error store data')
    console.log(error)
    }
    else{
    redirect(`/${data[0].username}`)
    }
  }

}