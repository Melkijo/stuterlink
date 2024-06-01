import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

//get user detail
export async function GET( req: Request, context: any){
    const supabase = createClient();
    const { data: account_data, error } = await supabase
        .from('user_data')
        .select("*")
        .eq('username', context.params.username);

    if (error) {
        console.error("Error fetching authenticated user:", error);
        return NextResponse.error();
    }

    if (account_data) {
        // console.log(account_data);
        return NextResponse.json({ account_data });
    }

    return NextResponse.json({ account_data: [] });
}