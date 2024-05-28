'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'



export async function logout() {
  const supabase = createClient()

const { error } = await supabase.auth.signOut();

  if (error) {
    // redirect('/')
    console.log("error logout")
  }
else{
    redirect('/login')
}
}

// export async function checkUser( {username}: {username: string}) {
//   const supabase = createClient()

  
//     const { data: { user } } = await supabase.auth.getUser()
//     if(user){
//         console.log(user.email)
//         const { data, error } = await supabase
//         .from('users')
//         .select()
//         .eq('email', user.email)

//         if (data && data.length > 0) {
//             console.log(username)
//             console.log(data[0].username);
//             if(data[0].username === username){
//                 console.log("user match")
               
//             }
//           } else {
//             console.log("No matching user found");
//           }

//     }else{
//         console.log("no user")
//         return null
//     }
// }
export async function checkLogin() {
    const supabase = createClient();
  
    

    const { data: { user }, error } = await supabase.auth.getUser()
  
    if (error) {
      console.error("Error fetching authenticated user:", error);
      return null;
    }
  
    if (user) {
      console.log("Authenticated user email:", user.email);
      return  user.email;
    } else {
      console.log("No authenticated user");
      return null;
    }
  }

  export async function checkUser(email: string, username: string) {
    const supabase = createClient();
  
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email);
  
    if (error) {
      console.error("Error fetching user data:", error);
      return { match: false, message: "Error fetching user data" };
    }
  
    if (data && data.length > 0) {
      console.log("Provided username:", username);
      console.log("Database username:", data[0].username);
      if (data[0].username === username) {
        console.log("User match");
        return { match: true, user: data[0] };
      } else {
        console.log("No matching user found");
        return { match: false, message: "Username does not match" };
      }
    } else {
      console.log("No matching user found");
      return { match: false, message: "No user found with the given email" };
    }
  }