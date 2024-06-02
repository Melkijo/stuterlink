import Navbar from "@/components/Navbar";
import OtherLink from "@/components/OtherLink";
import { dummyAccount } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import UserHeader from "./UserHeader";

export default function OtherTab({ userData }: { userData: any }) {
  console.log(userData);
  return (
    <>
      <div className="max-w-[480px] mx-auto px-5 py-10">
        {userData ? (
          <>
            <UserHeader userDetail={userData} />
            <h2 className="text-lg font-bold mt-6 mb-2">Other resource</h2>

            {userData.otherLink ? (
              <div className="flex w-full gap-2 flex-col">
                {userData.otherLink.map((item: any) => (
                  <OtherLink
                    key={item.title}
                    url={item.url}
                    title={item.title}
                    image={item.image}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
}
