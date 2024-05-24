import { interest, socialMedia } from "@/data/data";
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

export default function Home() {
  return (
    <main className="max-w-[480px] mx-auto ">
      <div className="w-full  text-dark px-5 py-10">
        {/* header */}
        <div className="flex justify-between items-center">
          <div className="w-32 h-32 overflow-hidden rounded-full">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/beasiswakita-3e322.appspot.com/o/img%2F20220118190946_IMG_8897%201.png?alt=media&token=d9550a4e-cdbf-4300-a38c-366aaeabb85c"
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

        {/* detail */}
        <div className="mt-3">
          <h1 className="text-xl font-bold">Melki Jonathan Andara</h1>
          <div className="flex flex-wrap gap-4">
            <p>@melkijo</p>
            <p>He/Him</p>
            <p>Mataram, Indonesia</p>
          </div>
        </div>

        {/* Interest */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {interest
            ? interest.map((item, index) => (
                <div
                  key={index}
                  className="py-2 px-4 border-dark-2 border w-fit rounded-full"
                >
                  <p className="text-sm">{item}</p>
                </div>
              ))
            : null}
        </div>
        {/* Social Media */}
        <div className="flex gap-2 mt-4 ">
          {socialMedia
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
                <Portfolio />
                <Portfolio />
                <Portfolio />
              </div>
            </TabsContent>

            <TabsContent value="experience">
              <Experience />
              <Experience />
              <Experience />
            </TabsContent>
            <TabsContent value="education">
              <Education />
            </TabsContent>
            <TabsContent value="certificate" className="flex gap-2">
              <Certificate />
              <Certificate />
            </TabsContent>
          </div>
        </Tabs>

        {/* footer */}
        <div className="mt-8">
          <p className="text-sm text-center">Made with ❤️ by Mejo</p>
        </div>
      </div>
    </main>
  );
}
