"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { debounce } from "lodash";
import { usernameDisable, format } from "@/data/data";

const checkAvailableUsername = async (
  usernameInput: string
): Promise<boolean | null> => {
  const username = usernameInput.toLowerCase();

  if (usernameDisable.includes(username)) {
    return true;
  } else {
    if (format.test(username)) {
      console.log("ada di format");
      return true;
    }
    try {
      const supabase = createClient();
      const { data: account_data, error } = await supabase
        .from("user_data")
        .select("username")
        .eq("username", username);

      if (error) {
        console.error("Error fetching username:", error);
        return false;
      }

      return account_data?.length > 0; // Check if any accounts match the username
    } catch (e) {
      console.error("Error fetching username:", e);
      return null;
    }
  }
};

export default function InputHome() {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [buttonActive, setButtonActive] = useState<boolean>(false); // State for button disabled state (boolean type)
  const [usernameAvailability, setUsernameAvailability] = useState<
    boolean | null
  >(null); // State for username availability check result (boolean or null type)

  //its for checking username availability real time
  useEffect(() => {
    setLink(link.toLowerCase());
    const handleUsernameChange = async () => {
      if (!link) {
        setUsernameAvailability(null); // Reset availability on empty input
        setButtonActive(true); // Disable button if no username
        return;
      }

      // check if link have a symbol that is prohibited in url
      if (link.match(/[^a-zA-Z0-9-]/g)) {
        setUsernameAvailability(true);
        setButtonActive(true);
        return;
      }

      const isUsernameAvailable = await checkAvailableUsername(link);
      setUsernameAvailability(isUsernameAvailable);
      if (isUsernameAvailable) {
        setButtonActive(true);
      } else {
        setButtonActive(false);
      }
    };
    const debouncedHandleUsernameChange = debounce(handleUsernameChange, 500); // Debounce for performance
    debouncedHandleUsernameChange(); // Initial check and on subsequent changes

    return () => debouncedHandleUsernameChange.cancel(); // Cleanup on unmount
  }, [link]); // Re-run useEffect on link change

  const handleLink = () => {
    setButtonActive(true);
    if (link === "") return;

    router.push(`/signup?username=${link}`);
    setButtonActive(false);
  };
  return (
    <div className="mt-8">
      <p className="text-base md:text-lg">
        Get a professional online presence now
      </p>
      <div className="flex w-full mt-2 items-center space-x-2">
        <Input
          type="text"
          placeholder="stuterlink/"
          value={link}
          className="text-md h-12"
          onChange={(e) => setLink(e.target.value)}
        />
        <Button
          onClick={handleLink}
          disabled={buttonActive}
          className="text-md h-12"
        >
          {
            usernameAvailability === null
              ? "Checking..." // Display loading message while checking
              : usernameAvailability
              ? "Username unavailable" // Display button text if username is available
              : "Get it" // Display message if username is taken
          }
        </Button>
      </div>
      <div className="mt-2 text-base text-gray-400">
        have an account?{" "}
        <Button
          variant="link"
          size="none"
          className="text-blue-500 ml-1 text-base"
        >
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
