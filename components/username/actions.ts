'use server'
 
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation'
 

export async function navigate() {
    redirect('/login')
    }
