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
import { editIcon, logoutIcon } from "../icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    <div className="flex flex-col gap-3 max-w-fit">
      <Sheet>
        <SheetTrigger className="py-2 px-4 bg-yellow-400 hover:bg-yellow-500 w-16 h-16 rounded-full flex justify-center items-center">
          {editIcon}
        </SheetTrigger>
        <SheetContent>
          <Editing data={data} />
        </SheetContent>
      </Sheet>
      <AlertDialog>
        <AlertDialogTrigger className="py-2 px-4 bg-red-400 hover:bg-red-500 w-16 h-16 rounded-full flex justify-center items-center">
          {logoutIcon}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              End Your Current Session
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="grid grid-cols-2 gap-4">
            <AlertDialogCancel className="w-full">No</AlertDialogCancel>
            <AlertDialogAction onClick={() => logout()} className="w-full">
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
