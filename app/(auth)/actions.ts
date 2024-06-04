'use server'
 
import { cookies } from 'next/headers'
 
export async function storeUsernameCookies(username: string) {
  cookies().set('name', username)
}