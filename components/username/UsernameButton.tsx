"use client";

import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import Editing from "../Editing";
import useSWR from "swr";

export default function UsernameButton() {
  const params = useParams<{ username: string }>();

  //   function handleLogout() {
  //     logout();
  //   }
  //   const [userCheckResult, setUserCheckResult] = useState<{
  //     match?: boolean;
  //     user?: any;
  //     message?: string;
  //   }>;

  //   useEffect(() => {
  //     const verifyUser = async () => {
  //       const email = await checkLogin();
  //       if (email && params.username) {
  //         const result = await checkUser(email, params.username);
  //         setUserCheckResult(result);
  //       } else {
  //         setUserCheckResult({
  //           match: false,
  //           message: "No authenticated user or username not provided",
  //         });
  //       }
  //     };

  //     verifyUser();
  //   }, []);

  //   if (error) return <div>failed to load</div>;
  //   if (isLoading) return <div>loading...</div>;
  return (
    <>
      {/* <h1>{`${data.user ? data.user : null}`}</h1> */}
      {/* {userCheckResult && userCheckResult.match === false ? (
        ""
      ) : ( */}
      <>
        <Sheet>
          <SheetTrigger>
            <Button>Edit</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <Editing />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Button>Logout</Button>
      </>
      {/* )} */}
    </>
  );
}
