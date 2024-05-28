'use server'
 
import { createClient } from '@/utils/supabase/server'
 
export async function actions() {
  const supabase = createClient()

    const { data, error } = await supabase
    .from('users')
    .select('username')

    if (error) {
        console.error("Error fetching authenticated user:", error);
        return null;
        }
    else{
        console.log(data)
       return data;

    }
}