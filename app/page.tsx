"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const router = useRouter();
  const [link, setLink] = useState("");
  const handleLink = () => {
    router.push(`/${link}`);
  };
  return (
    <main>
      <div className="max-w-[480px] mx-auto mt-10">
        <h1 className="text-4xl text-center leading-normal">
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
        </div>
      </div>
    </main>
  );
}
