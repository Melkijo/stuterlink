'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login({userData}: {userData: {email: string, password: string}}) {
    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword(userData);
  
    if (signInError) {
      console.log("Error login");
      return { success: false, error: signInError.message };
    }
  
    const { data, error: dataError } = await supabase
      .from('user_data')
      .select()
      .eq('email', userData.email);
  
    if (dataError) {
      console.log(dataError);
      return { success: false, error: dataError.message };
    }
  
    // redirect(`/${data[0].username}`);
    return { success: true, data: data[0].username };

}

export async function navigateUsername({username}: {username: string}) {
    redirect(`/${username}`);
}

export async function forgetPassword({email}: {email: string}) {
    const supabase = createClient();

    const { data, error } = await supabase.auth
    .resetPasswordForEmail(email)

    if (error) {
        console.log(error);
        return { success: false, error: error.message };
    }

    return { success: true };
}

