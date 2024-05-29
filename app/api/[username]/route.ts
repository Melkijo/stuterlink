import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET( req: Request, context: any){
    const supabase = createClient();
    const { data: account_data, error} = await supabase.from('account_data').select("*").eq('username', context.params.username)

    if (error) {
      console.error("Error fetching authenticated user:", error);
      return null;
    }
    if(account_data){
        console.log(account_data)
      return NextResponse.json({account_data})
    }
}