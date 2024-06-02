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
import { editIcon } from "../icons";

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("error logout");
  } else {
    navigate();
  }
}

export default function UsernameButton({ data }: Readonly<{ data: any }>) {
  return (
    <>
      <div className="flex flex-col gap-4 max-w-fit">
        <Sheet>
          <SheetTrigger className="py-2 px-4 bg-yellow-400 hover:bg-yellow-500 w-16 h-16 rounded-full flex justify-center items-center">
            {editIcon}
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <Editing data={data} />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Button onClick={logout}>Logout</Button>
      </div>
    </>
  );
}
