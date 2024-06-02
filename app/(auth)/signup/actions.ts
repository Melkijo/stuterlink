'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'



export async function signup({userData}: {userData: {email: string, password: string}},newUsername: string) {
  const supabase = createClient();

  const { error: signUpError } = await supabase.auth.signUp(userData);

  if (signUpError) {
    console.log("Error during signup:", signUpError.message);
    return { success: false, error: signUpError.message };
  }

  const { error: insertError } = await supabase
    .from('user_data')
    .insert({ email: userData.email, username: newUsername });

  if (insertError) {
    console.log("Error storing user data:", insertError.message);
    return { success: false, error: insertError.message };
  }

  return { success: true, data: newUsername };
}

export async function navigateUsername({username}: {username: string}) {
    redirect(`/${username}`);
}