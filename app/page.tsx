"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [link, setLink] = useState("");
  const handleLink = () => {
    //push to signup page and send the link as a query
    //check if the link is empty
    if (link === "") return;

    router.push(`/signup?username=${link}`);
    // router.push();
  };

  return (
    <main>
      <div className="max-w-[480px] mx-auto mt-10 px-5">
        <h1 className="text-3xl text-center leading-normal">
          Make your online appereance more profesional
        </h1>
        <div className="mt-8">
          <p>get your link now</p>
          <div className="flex w-full mt-2 items-center space-x-2">
            <Input
              type="text"
              placeholder="stuterlink/"
              onChange={(e: any) => setLink(e.target.value)}
            />
            <Button onClick={handleLink}>Get it</Button>
          </div>
          <p>
            have an account?{" "}
            <Button variant="link" size="none" className="text-blue-500">
              <Link href="/login">Login</Link>
            </Button>
          </p>
        </div>
      </div>
    </main>
  );
}
