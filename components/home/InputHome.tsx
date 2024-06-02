"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { debounce } from "lodash";

const fetchUsername = async (
  usernameInput: string
): Promise<boolean | null> => {
  try {
    const supabase = createClient();
    const { data: account_data, error } = await supabase
      .from("user_data")
      .select("username")
      .eq("username", usernameInput);

    console.log(usernameInput);

    if (error) {
      console.error("Error fetching username:", error);
      return false;
    }

    return account_data?.length > 0; // Check if any accounts match the username
  } catch (e) {
    console.error("Error fetching username:", e);
    return null;
  }
};

export default function InputHome() {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [buttonActive, setButtonActive] = useState<boolean>(false); // State for button disabled state (boolean type)
  const [usernameAvailability, setUsernameAvailability] = useState<
    boolean | null
  >(null); // State for username availability check result (boolean or null type)

  useEffect(() => {
    const handleUsernameChange = async () => {
      if (!link) {
        setUsernameAvailability(null); // Reset availability on empty input
        setButtonActive(true); // Disable button if no username
        return;
      }

      const isUsernameAvailable = await fetchUsername(link);
      console.log(isUsernameAvailable);
      setUsernameAvailability(isUsernameAvailable);
      if (isUsernameAvailable) {
        setButtonActive(true);
      } else {
        setButtonActive(false);
      }
      //   setButtonActive(isUsernameAvailable); // Enable button if username is available
    };

    const debouncedHandleUsernameChange = debounce(handleUsernameChange, 500); // Debounce for performance

    debouncedHandleUsernameChange(); // Initial check and on subsequent changes

    return () => debouncedHandleUsernameChange.cancel(); // Cleanup on unmount
  }, [link]); // Re-run useEffect on link change

  const handleLink = () => {
    if (link === "") return;

    router.push(`/signup?username=${link}`);
  };
  return (
    <div className="mt-8">
      <p>get your link now</p>
      <div className="flex w-full mt-2 items-center space-x-2">
        <Input
          type="text"
          placeholder="stuterlink"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button onClick={handleLink} disabled={buttonActive}>
          {
            usernameAvailability === null
              ? "Checking availability..." // Display loading message while checking
              : usernameAvailability
              ? "Username unavailable" // Display button text if username is available
              : "Get it" // Display message if username is taken
          }
        </Button>
      </div>
      <p>
        have an account?{" "}
        <Button variant="link" size="none" className="text-blue-500">
          <Link href="/login">Login</Link>
        </Button>
      </p>
    </div>
  );
}
