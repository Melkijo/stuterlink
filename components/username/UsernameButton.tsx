"use client";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Editing from "../Editing";
import { navigate } from "./actions";
import { createClient } from "@/utils/supabase/client";

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    // redirect('/')
    console.log("error logout");
  } else {
    navigate();
  }
}

export default function UsernameButton({ data }: { data: any }) {
  //   console.log(data);

  return (
    <>
      <Sheet>
        <SheetTrigger className="py-2 px-4 bg-background">Edit</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <Editing data={data} />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
