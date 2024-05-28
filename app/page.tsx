"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { actions } from "./actions";

export default function Home() {
  const router = useRouter();
  const [link, setLink] = useState("");
  //make useState to store action data
  const [actionData, setActionData] = useState<any>(null);
  const handleLink = () => {
    //push to signup page and send the link as a query
    //check if the link is empty
    if (link === "") return;

    router.push(`/signup?username=${link}`);
  };
  useEffect(() => {
    //fetch the action data
    const fetchData = async () => {
      const data = await actions();
      setActionData(data);
    };
    fetchData();
  }, []);

  console.log(actionData);
  return (
    <main>
      <div className="max-w-[480px] mx-auto mt-10 px-5">
        <h1 className="text-3xl text-center leading-normal">
          Make your online appereance more profesional
        </h1>
        {actionData
          ? actionData.map((action: any) => (
              <div key={action.username} className="mt-2">
                <h2 className="text-sm font-bold">{action.username}</h2>
              </div>
            ))
          : null}
        <div className="mt-8">
          <p>get your link now</p>
          <div className="flex w-full mt-2 items-center space-x-2">
            <Input
              type="text"
              placeholder="stuterlink/"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button onClick={handleLink} disabled={false}>
              Get it
            </Button>
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
