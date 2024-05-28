"use client";
import Link from "next/link";

import { useParams } from "next/navigation";

export default function Navbar() {
  //get params from url
  const params = useParams();

  return (
    <div className="relative z-10 bg-dark text-white">
      <nav className="max-w-[480px] mx-auto  flex items-center  w-full pt-4 px-8 pb-2 h-14 font-medium ">
        <ul className="grid grid-cols-2 w-full items-center h-full">
          <li className="h-full">
            <Link
              href={`/${params.username}`}
              className="flex justify-center w-full items-center flex-col h-full "
            >
              <p>Personal</p>
              {/* {params.username !== "" ? (
                <div className="w-full h-1 bg-white"></div>
              ) : (
                ""
              )} */}
              {/* <div className="w-full h-1 bg-white"></div> */}
            </Link>
          </li>
          <li className="h-full">
            <Link
              href={`/${params.username}/other`}
              className="flex justify-center w-full items-center flex-col h-full "
            >
              <p>Other</p>
              {/* {params.username !== "" ? (
                <div className="w-full h-1 bg-white"></div>
              ) : (
                ""
              )} */}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
