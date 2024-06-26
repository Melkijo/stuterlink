"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditExperience from "./edit/EditExperience";
import EditDetail from "./edit/EditDetail";
import EditInterest from "./edit/EditInterest";
import EditPortfolio from "./edit/EditPortfolio";
import EditCertificate from "./edit/EditCertificate";
import EditEducation from "./edit/EditEducation";
import EditSocialMedia from "./edit/EditSocialMedia";
import EditOther from "./edit/EditOther";

export default function Editing({ data }: Readonly<{ data: any }>) {
  return (
    <div className="relative z-20 ">
      <Tabs defaultValue="detail" className="w-full mt-8 ">
        <TabsList>
          <div>
            <TabsTrigger value="detail">Detail</TabsTrigger>
            <TabsTrigger value="socialMedia">Social Media</TabsTrigger>
            <TabsTrigger value="interest">Interest</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolios</TabsTrigger>
            <TabsTrigger value="experience">Experiences</TabsTrigger>
            <TabsTrigger value="certificate">Certificates</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </div>
        </TabsList>
        <div className="mt-6 ">
          <TabsContent value="detail">
            <EditDetail data={data} />
          </TabsContent>
          <TabsContent value="socialMedia">
            <EditSocialMedia
              socialMediaList={data.socialMedia}
              userId={data.id}
            />
          </TabsContent>
          <TabsContent value="interest">
            <EditInterest interestList={data.interests} userId={data.id} />
          </TabsContent>
          <TabsContent value="portfolio">
            <EditPortfolio portfolioList={data.portfolios} userId={data.id} />
          </TabsContent>
          <TabsContent value="experience">
            <EditExperience userId={data.id} />
          </TabsContent>
          <TabsContent value="certificate">
            <EditCertificate userId={data.id} />
          </TabsContent>
          <TabsContent value="education">
            <EditEducation userId={data.id} />
          </TabsContent>
          <TabsContent value="other">
            <EditOther otherLinkList={data.portfolios} userId={data.id} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
