"use client";
import { interest, socialMedia, dummyAccount } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import {
  githubIcon,
  linkedinIcon,
  tiktokIcon,
  twitterIcon,
  instagramIcon,
} from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Portfolio from "@/components/Portfolio";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certificate from "@/components/Certificate";
import Interest from "@/components/Interest";
import { CertificateItem, EducationItem, ExperienceItem } from "@/types/types";
import type { Metadata, ResolvingMetadata } from "next";
import Navbar from "@/components/Navbar";
import Editing from "@/components/Editing";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import { logout, checkUser, checkLogin } from "./actions";
import { useEffect, useState } from "react";

export default function Page() {
  //get url params
  const params = useParams<{ username: string }>();

  //   console.log(params);
  function handleLogout() {
    logout();
  }

  const [userCheckResult, setUserCheckResult] = useState<{
    match: boolean;
    user?: any;
    message?: string;
  } | null>(null);

  useEffect(() => {
    const verifyUser = async () => {
      const email = await checkLogin();
      if (email && params.username) {
        const result = await checkUser(email, params.username);
        setUserCheckResult(result);
      } else {
        setUserCheckResult({
          match: false,
          message: "No authenticated user or username not provided",
        });
      }
    };

    verifyUser();
  }, []);

  if (!userCheckResult) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      {userCheckResult && userCheckResult.match === false ? (
        ""
      ) : (
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
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}

      <div className="max-w-[480px] mx-auto ">
        <div className="w-full  text-dark px-5 py-10">
          {dummyAccount ? (
            <>
              {/* header */}
              <div className="flex justify-between items-center ">
                <div className="w-32 h-32 overflow-hidden rounded-full">
                  <Image
                    src={dummyAccount.profilePicture}
                    alt="profile picture"
                    className="w-full h-full object-cover"
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

              {/* Interest */}
              <div className="mt-4">
                <Interest interest={dummyAccount.interests} />
              </div>

              {/* Social Media */}
              <div className="flex gap-2 mt-4 ">
                {dummyAccount.socialMedia
                  ? socialMedia.map((item, index) => (
                      <div key={index}>
                        {item.type === "Github" && (
                          <Link href={item.url} target="_blank">
                            <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#24292E]">
                              {githubIcon}
                            </div>
                          </Link>
                        )}
                        {item.type === "Twitter" && (
                          <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#0F1419]">
                            <Link href={item.url} target="_blank">
                              {twitterIcon}
                            </Link>
                          </div>
                        )}
                        {item.type === "LinkedIn" && (
                          <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#0077B5]">
                            <Link href={item.url} target="_blank">
                              {linkedinIcon}
                            </Link>
                          </div>
                        )}
                        {item.type === "Instagram" && (
                          <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#D62976]">
                            <Link href={item.url} target="_blank">
                              {instagramIcon}
                            </Link>
                          </div>
                        )}
                        {item.type === "Tiktok" && (
                          <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#000000]">
                            <Link href={item.url} target="_blank">
                              {tiktokIcon}
                            </Link>
                          </div>
                        )}
                      </div>
                    ))
                  : null}
              </div>

              {/* tabs */}
              <Tabs defaultValue="portfolio" className="w-full mt-8">
                <TabsList>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="certificate">Certificate</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                </TabsList>
                <div className="mt-6">
                  <TabsContent value="portfolio">
                    <div className="flex flex-col gap-2">
                      {dummyAccount.portfolios &&
                      dummyAccount.portfolios.length > 0 ? (
                        dummyAccount.portfolios.map((item, index) => (
                          <Portfolio key={index} portfolio={item} />
                        ))
                      ) : (
                        <div>No portfolios available.</div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="experience">
                    {dummyAccount.experiences &&
                    dummyAccount.experiences.length > 0 ? (
                      dummyAccount.experiences.map(
                        (item: ExperienceItem, index) => (
                          <Experience key={index} experience={item} />
                        )
                      )
                    ) : (
                      <div>No experience available.</div>
                    )}
                  </TabsContent>
                  <TabsContent value="education">
                    {dummyAccount.education &&
                    dummyAccount.education.length > 0 ? (
                      dummyAccount.education.map(
                        (item: EducationItem, index) => (
                          <Education key={index} education={item} />
                        )
                      )
                    ) : (
                      <div>No education available.</div>
                    )}
                  </TabsContent>
                  <TabsContent
                    value="certificate"
                    className="grid grid-cols-2 gap-2"
                  >
                    {dummyAccount.certificates &&
                    dummyAccount.certificates.length > 0 ? (
                      dummyAccount.certificates.map(
                        (item: CertificateItem, index) => (
                          <Certificate key={index} certificate={item} />
                        )
                      )
                    ) : (
                      <div>No certificates available.</div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </>
          ) : null}
          {/* footer */}
          <div className="mt-8">
            <p className="text-sm text-center">Made with ❤️ by Mejo</p>
          </div>
        </div>
      </div>
    </>
  );
}
