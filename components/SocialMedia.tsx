import {
  githubIcon,
  linkedinIcon,
  tiktokIcon,
  twitterIcon,
  instagramIcon,
  facebookIcon,
  youtubeIcon,
} from "@/components/icons";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function SocialMedia({
  userId,
}: Readonly<{ userId: string }>) {
  console.log(userId);
  const supabase = createClient();
  let { data: socialMedia, error } = await supabase
    .from("social_media")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    console.error(error);
  }
  if (socialMedia === undefined) {
    console.log("No social media found");
    return null;
  }

  console.log(socialMedia);
  return (
    <>
      {socialMedia !== null && socialMedia.length !== 0 ? (
        <div className="flex gap-4 ">
          {(socialMedia[0].github !== null && socialMedia[0].github !== "") ||
          "" ? (
            <Link href={socialMedia[0].github} target="_blank">
              <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#24292E]">
                {githubIcon}
              </div>
            </Link>
          ) : null}
          {socialMedia[0].x !== null && socialMedia[0].x !== "" ? (
            <Link href={socialMedia[0].x} target="_blank">
              <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#0F1419]">
                {twitterIcon}
              </div>
            </Link>
          ) : null}
          {socialMedia[0].linkedin !== null &&
          socialMedia[0].linkedin !== "" ? (
            <Link href={socialMedia[0].linkedin} target="_blank">
              <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#0077B5]">
                {linkedinIcon}
              </div>
            </Link>
          ) : null}
          {socialMedia[0].instagram !== null &&
          socialMedia[0].instagram !== "" ? (
            <Link href={socialMedia[0].instagram} target="_blank">
              <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#D62976]">
                {instagramIcon}
              </div>
            </Link>
          ) : null}
          {socialMedia[0].tiktok !== null && socialMedia[0].tiktok !== "" ? (
            <Link href={socialMedia[0].tiktok} target="_blank">
              <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#000000]">
                {tiktokIcon}
              </div>
            </Link>
          ) : null}
          {socialMedia[0].facebook !== null &&
          socialMedia[0].facebook !== "" ? (
            <Link href={socialMedia[0].facebook} target="_blank">
              <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#1877F2]">
                {facebookIcon}
              </div>
            </Link>
          ) : null}
          {socialMedia[0].youtube !== null && socialMedia[0].youtube !== "" ? (
            <Link href={socialMedia[0].youtube} target="_blank">
              <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#F40100]">
                {youtubeIcon}
              </div>
            </Link>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
