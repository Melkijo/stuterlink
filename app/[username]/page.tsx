import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Portfolio from "@/components/Portfolio";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certificate from "@/components/Certificate";
import { CertificateItem, EducationItem, ExperienceItem } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import UsernameButton from "@/components/username/UsernameButton";
import OtherTab from "@/components/OtherTab";
import UserHeader from "@/components/UserHeader";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
async function getUserDetail(username: string) {
  const supabase = createClient();
  const { data: account_data, error } = await supabase
    .from("user_data")
    .select("*")
    .eq("username", username);
  if (error) {
    console.error("Error fetching authenticated user:", error);
    return null;
  }

  if (account_data) {
    return account_data;
  }
}

async function getUserSocialMedia(userId: string) {
  const supabase = createClient();
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
    console.error("Error fetching certificate:", error);
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
type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const username = params.username;

  return {
    title: `${username} | Stuterlink`,
  };
}

export default async function Page({ params }: any) {
  const supabase = createClient(); // Assuming you have supabase configured

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userDetail = await getUserDetail(params.username);

  if (userDetail === null || userDetail?.length === 0) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <h1 className="text-2xl">User not found</h1>
        <Link href="/">Return Home</Link>
      </div>
    );
  }

  const userSocialMedia = await getUserSocialMedia(userDetail?.[0]?.id);
  const userPortfolio = await getUserPortfolio(userDetail?.[0]?.id);
  const userCertificates = await getUserCertificates(userDetail?.[0]?.id);
  const userEducation = await getUserEducation(userDetail?.[0]?.id);
  const userExperiences = await getUserExperiences(userDetail?.[0]?.id);
  const userOtherLink = await getUserOtherLink(userDetail?.[0]?.id);

  //store all the data in one object
  const userData = {
    ...userDetail?.[0],
    socialMedia: userSocialMedia,
    portfolios: userPortfolio,
    certificates: userCertificates,
    education: userEducation,
    experiences: userExperiences,
    otherLink: userOtherLink,
  };

  return (
    <>
      {user && user.email === userData.email ? (
        <div className="relative max-w-[720px] mx-auto ">
          <div className="mx-4 ">
            <div className="absolute h-screen">
              <div className="fixed bottom-10">
                <UsernameButton data={userData} />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="max-w-[480px] mx-auto ">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <div className="w-full  text-dark px-5 py-10">
              <UserHeader userDetail={userData} />

              {/* tabs */}
              <Tabs defaultValue="portfolio" className="w-full mt-8">
                <TabsList>
                  <TabsTrigger value="portfolio">Portfolios</TabsTrigger>
                  {userExperiences && userExperiences.length > 0 ? (
                    <TabsTrigger value="experience">Experiences</TabsTrigger>
                  ) : null}
                  {userCertificates && userCertificates.length > 0 ? (
                    <TabsTrigger value="certificate">Certificates</TabsTrigger>
                  ) : null}
                  {userEducation && userEducation.length > 0 ? (
                    <TabsTrigger value="education">Education</TabsTrigger>
                  ) : null}
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
                    {userExperiences && userExperiences.length > 0 ? (
                      userExperiences.map((item: ExperienceItem, index) => (
                        <Experience key={index} experience={item} />
                      ))
                    ) : (
                      <div>No experience available.</div>
                    )}
                  </TabsContent>
                  <TabsContent value="education">
                    {userEducation && userEducation.length > 0 ? (
                      userEducation.map((item: EducationItem, index) => (
                        <Education key={index} education={item} />
                      ))
                    ) : (
                      <div>No education available.</div>
                    )}
                  </TabsContent>
                  <TabsContent
                    value="certificate"
                    className="grid grid-cols-2 gap-2"
                  >
                    {userCertificates && userCertificates.length > 0 ? (
                      userCertificates.map((item: CertificateItem, index) => (
                        <Certificate key={index} certificate={item} />
                      ))
                    ) : (
                      <div>No certificates available.</div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </TabsContent>
          <TabsContent value="other">
            <OtherTab userData={userData} />
          </TabsContent>
        </Tabs>
        {/* footer */}
        <div className="mt-8  ">
          <p className="text-sm text-center">Made by Mejo</p>
        </div>
      </div>
    </>
  );
}
