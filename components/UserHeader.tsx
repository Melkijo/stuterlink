import { dummyAccount } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import Interest from "./Interest";

export default function UserHeader({ userDetail }: any) {
  const user = userDetail;

  return (
    <>
      {user ? (
        <>
          {/* header */}
          <div className="flex justify-between items-center">
            <div className="w-32 h-32 overflow-hidden rounded-full">
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
            <div className="flex flex-col gap-2">
              <Link
                href={`mailto:${user.email ? user.email : ""}`}
                target="_blank"
                className="px-7 py-3 rounded-full bg-dark text-light font-medium"
              >
                Contact Me
              </Link>
              <Link
                href={user.resume ? user.resume : ""}
                target="_blank"
                className="px-7 py-3 rounded-full border border-dark font-medium"
              >
                My Resume
              </Link>
            </div>
          </div>
          {/* user detail */}
          <div className="mt-3">
            <div className="flex gap-4 items-center mb-2">
              <h1 className="text-2xl font-bold">
                {user.name ? user.name : "No Name"}
              </h1>
              {user.open_to_work ? (
                <p className="text-sm font-medium bg-green-400 text-white px-4 py-2 rounded-full">
                  Open to work
                </p>
              ) : (
                <p className="text-sm font-medium bg-red-400 text-white px-4 py-2 rounded-full">
                  Not open to work
                </p>
              )}
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
          <div className="mt-4">
            <Interest interest={user.interests} />
          </div>

          {/* Social Media */}
          <div className="flex gap-2 mt-4">
            <SocialMedia userId={user.id} />
          </div>
        </>
      ) : (
        <p>No user details available</p>
      )}
    </>
  );
}
