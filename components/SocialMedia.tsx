import {
  githubIcon,
  linkedinIcon,
  tiktokIcon,
  twitterIcon,
  instagramIcon,
} from "@/components/icons";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function SocialMedia(userId: any) {
  const supabase = createClient();
  let { data: socialMedia, error } = await supabase
    .from("social_media")
    .select("*")
    .eq("user_id", userId.userId);
  if (error) {
    console.error(error);
  }
  if (socialMedia === undefined) {
    return null;
  }
  return (
    <>
      {socialMedia &&
        socialMedia.map((item: any) => (
          <div key={item.id}>
            {item.type === "github" && (
              <Link href={item.url} target="_blank">
                <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#24292E]">
                  {githubIcon}
                </div>
              </Link>
            )}
            {item.type === "twitter" && (
              <Link href={item.url} target="_blank">
                <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#0F1419]">
                  {twitterIcon}
                </div>
              </Link>
            )}
            {item.type === "linkedIn" && (
              <Link href={item.url} target="_blank">
                <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#0077B5]">
                  {linkedinIcon}
                </div>
              </Link>
            )}
            {item.type === "instagram" && (
              <Link href={item.url} target="_blank">
                <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#D62976]">
                  {instagramIcon}
                </div>
              </Link>
            )}
            {item.type === "tiktok" && (
              <Link href={item.url} target="_blank">
                <div className="w-10 h-10 flex justify-center items-center rounded-md  bg-[#000000]">
                  {tiktokIcon}
                </div>
              </Link>
            )}
          </div>
        ))}
    </>
  );
}
