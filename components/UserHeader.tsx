import { dummyAccount } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import Interest from "./Interest";
import { Button } from "./ui/button";

export default function UserHeader({ userDetail }: any) {
  const user = userDetail;

  return (
    <>
      {user ? (
        <>
          {/* header */}
          <div className="flex justify-between items-center">
            <div className="relative">
              <div
                className={`w-32 h-32 overflow-hidden  rounded-full ${
                  user.open_to_work ? `border-[5px] border-green-300` : ``
                }`}
              >
                <Image
                  src={
                    user.profile_picture
                      ? user.profile_picture
                      : dummyAccount.profilePicture
                  }
                  alt="profile picture"
                  className="w-full h-full object-cover"
                  width={200}
                  height={200}
                />
              </div>
              {user.open_to_work ? (
                <div className="absolute rounded-full right-0 bottom-3 w-8 h-8 bg-green-300 border-4 border-white "></div>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href={`mailto:${user.email ? user.email : ""}`}
                target="_blank"
                className="px-7 py-3 rounded-full bg-dark text-light font-medium"
              >
                Contact Me
              </Link>
              {user.resume !== null && user.resume !== "" ? (
                <Link
                  href={user.resume ? user.resume : ""}
                  target="_blank"
                  className="px-7 py-3 rounded-full border border-dark font-medium"
                >
                  My Resume
                </Link>
              ) : null}
            </div>
          </div>
          {/* user detail */}
          <div className="mt-3">
            <div className="flex gap-4 items-center mb-2">
              <h1 className="text-2xl font-bold">
                {user.name ? user.name : "No Name"}
              </h1>
            </div>
            <div className="flex flex-wrap gap-4">
              <p>@{user.username}</p>
              <p className="capitalize">
                {user.occupation ? user.occupation : ""}
              </p>
              <p className="capitalize">{user.pronouns ? user.pronouns : ""}</p>
              <p className="capitalize">
                {user.city ? user.city : ""}
                {user.city && user.country ? ", " : ""}
                {user.country ? user.country : ""}
              </p>
            </div>
          </div>

          {/* Interest */}
          {user.interests && user.interests.length > 0 ? (
            <div className="mt-4">
              <Interest interest={user.interests} />
            </div>
          ) : null}

          {/* Social Media */}
          {user.socialMedia && user.socialMedia.length > 0 ? (
            <div className="flex gap-2 mt-4">
              <SocialMedia userId={user.id} />
            </div>
          ) : null}
        </>
      ) : (
        <p>No user details available</p>
      )}
    </>
  );
}
