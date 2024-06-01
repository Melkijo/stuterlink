import { interest, socialMedia, dummyAccount } from "@/data/data";
import Image from "next/image";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Portfolio from "@/components/Portfolio";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certificate from "@/components/Certificate";
import Interest from "@/components/Interest";
import { CertificateItem, EducationItem, ExperienceItem } from "@/types/types";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import SocialMedia from "@/components/SocialMedia";
import UsernameButton from "@/components/username/UsernameButton";

async function getUserDetail(username: string) {
  try {
    const response = await fetch(
      `https://stuterlink.vercel.app/api/${username}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("cant fetching data: ", error);
  }
}

async function getUserSocialMedia(userId: string) {
  const supabase = createClient(); // Assuming you have supabase configured

  const { data: response, error } = await supabase
    .from("social_media")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching social media:", error);
    return null;
  }

  return response;
}

async function getUserPortfolio(userId: string) {
  const supabase = createClient();

  const { data: response, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }

  return response;
}

async function getUserCertificates(userId: string) {
  const supabase = createClient();

  const { data: response, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }

  return response;
}

async function getUserEducation(userId: string) {
  const supabase = createClient();

  const { data: response, error } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }

  return response;
}
async function getUserExperiences(userId: string) {
  const supabase = createClient();

  const { data: response, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }

  return response;
}

async function getUserOtherLink(userId: string) {
  const supabase = createClient();

  const { data: response, error } = await supabase
    .from("other_link")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }

  return response;
}

export default async function Page({ params }: any) {
  const supabase = createClient(); // Assuming you have supabase configured

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userDetail = await getUserDetail(params.username);

  if (!userDetail.account_data[0]) {
    return <h1>No User found</h1>;
  }

  const userSocialMedia = await getUserSocialMedia(
    userDetail.account_data[0].id
  );
  const userPortfolio = await getUserPortfolio(userDetail.account_data[0].id);
  const userCertificates = await getUserCertificates(
    userDetail.account_data[0].id
  );
  const userEducation = await getUserEducation(userDetail.account_data[0].id);
  const userExperiences = await getUserExperiences(
    userDetail.account_data[0].id
  );
  const userOtherLink = await getUserOtherLink(userDetail.account_data[0].id);

  //store all the data in one object
  const userData = {
    ...userDetail.account_data[0],
    socialMedia: userSocialMedia,
    portfolios: userPortfolio,
    certificates: userCertificates,
    education: userEducation,
    experiences: userExperiences,
    otherLink: userOtherLink,
  };

  //   console.log(userData);

  return (
    <>
      <Navbar />
      {/* <UsernameButton /> */}

      {user && user.email === userData.email ? (
        <UsernameButton data={userData} />
      ) : (
        <h1>Not authorized</h1>
      )}

      <div className="max-w-[480px] mx-auto ">
        <div className="w-full  text-dark px-5 py-10">
          {userDetail.account_data[0] ? (
            <>
              {/* header */}
              <div className="flex justify-between items-center ">
                <div className="w-32 h-32 overflow-hidden rounded-full">
                  <Image
                    src={userDetail.account_data[0].profile_picture}
                    alt="profile picture"
                    className="w-full h-full object-cover"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`mailto:${userDetail.account_data[0].email}`}
                    target="_blank"
                    className="px-7 py-3 rounded-full bg-dark text-light font-medium"
                  >
                    Contact Me
                  </Link>
                  <Link
                    href={userDetail.account_data[0].resume}
                    target="_blank"
                    className="px-7 py-3 rounded-full border border-dark font-medium"
                  >
                    My Resume
                  </Link>
                </div>
              </div>
              {/* user detail */}
              <div className="mt-3">
                <h1 className="text-xl font-bold">
                  {userDetail.account_data[0].name}
                </h1>
                <div className="flex flex-wrap gap-4">
                  <p>@{userDetail.account_data[0].username}</p>
                  <p>{userDetail.account_data[0].occupation}</p>

                  <p>{userDetail.account_data[0].pronouns}</p>
                  <p>
                    {userDetail.account_data[0].city}, {""}
                    {userDetail.account_data[0].country}
                  </p>
                </div>
              </div>

              {/* Interest */}
              <div className="mt-4">
                <Interest interest={userDetail.account_data[0].interests} />
              </div>

              {/* Social Media */}
              <div className="flex gap-2 mt-4 ">
                <SocialMedia userId={userDetail.account_data[0].id} />
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
                      {userPortfolio && userPortfolio.length > 0 ? (
                        userPortfolio.map((item, index) => (
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
