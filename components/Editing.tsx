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

export default function Editing() {
  return (
    <div className="relative z-20 ">
      <div

      //   className="fixed left-0 top-0 z-10 w-[300px] bg-gray-300 h-screen overflow-y-scroll overflow-x-hidden"
      >
        <Tabs defaultValue="detail" className="w-full mt-8 ">
          <TabsList>
            <div>
              <TabsTrigger value="detail">Detail</TabsTrigger>
              <TabsTrigger value="socialMedia">Social Media</TabsTrigger>
              <TabsTrigger value="interest">Interest</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="certificate">Certificate</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </div>
          </TabsList>
          <div className="mt-6 px-4">
            <TabsContent value="detail">
              <EditDetail />
            </TabsContent>
            <TabsContent value="socialMedia">
              <EditSocialMedia />
            </TabsContent>
            <TabsContent value="interest">
              <EditInterest />
            </TabsContent>
            <TabsContent value="portfolio">
              <EditPortfolio />
            </TabsContent>
            <TabsContent value="experience">
              <EditExperience />
            </TabsContent>
            <TabsContent value="certificate">
              <EditCertificate />
            </TabsContent>
            <TabsContent value="education">
              <EditEducation />
            </TabsContent>
            <TabsContent value="other">
              <EditOther />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
