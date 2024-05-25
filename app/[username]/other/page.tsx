import Navbar from "@/components/Navbar";
import OtherLink from "@/components/OtherLink";
import { dummyAccount } from "@/data/data";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-[480px] mx-auto px-5 py-10">
        {dummyAccount ? (
          <>
            {/* header */}
            <div className="flex justify-between items-center ">
              <div className="w-32 h-32 overflow-hidden rounded-full">
                <Image
                  src={dummyAccount.profilePicture}
                  alt="profile picture"
                  className="w-full h-full object-cover "
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="/profile"
                  className="px-7 py-3 rounded-full bg-dark text-light font-medium"
                >
                  Contact Me
                </Link>
                <Link
                  href="/profile"
                  className="px-7 py-3 rounded-full border border-dark font-medium"
                >
                  My Resume
                </Link>
              </div>
            </div>
            {/* user detail */}
            <div className="mt-3">
              <h1 className="text-xl font-bold">{dummyAccount.name}</h1>
              <div className="flex flex-wrap gap-4">
                <p>@{dummyAccount.username}</p>
                <p>{dummyAccount.pronouns}</p>
                <p>
                  {dummyAccount.city},{dummyAccount.country}
                </p>
              </div>
            </div>

            <h2 className="text-lg font-bold mt-6 mb-2">Other resource</h2>

            {dummyAccount.otherLinks ? (
              <div className="flex w-full gap-2 flex-col">
                {dummyAccount.otherLinks.map((link) => (
                  <OtherLink
                    key={link.title}
                    url={link.url}
                    title={link.title}
                    image={link.image}
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
