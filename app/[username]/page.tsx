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
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";

async function getUser(username: string) {
  const response = await fetch(
    `https://stuterlink.vercel.app/api/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export default async function Page({ params }: any) {
  const supabase = createClient(); // Assuming you have supabase configured

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const username: string = params.username;
  const userData = await getUser(username);

  console.log(userData.account_data[0]);

  if (!userData.account_data[0]) {
    return <h1>No User found</h1>;
  }
  return (
    <>
      <Navbar />
      {/* <UsernameButton /> */}

      {user && user.email === userData.account_data[0].email ? (
        <h1>Hai</h1>
      ) : (
        <h1>Not authorized</h1>
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
                    href={`mailto:${userData.account_data[0].email}`}
                    target="_blank"
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
                <h1 className="text-xl font-bold">
                  {userData.account_data[0].name}
                </h1>
                <div className="flex flex-wrap gap-4">
                  <p>@{userData.account_data[0].username}</p>
                  <p>{userData.account_data[0].occupation}</p>

                  <p>{userData.account_data[0].pronouns}</p>
                  <p>
                    {userData.account_data[0].city}, {""}
                    {userData.account_data[0].country}
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
