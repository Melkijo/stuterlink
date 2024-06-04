"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { debounce } from "lodash";
import { usernameDisable, format } from "@/data/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignupPopup from "../SignupPopup";

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

async function checkUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user?.email);
}

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
      {/* <button onClick={() => checkUser()}>Check user</button> */}
      <div className="flex w-full mt-2 items-center space-x-2">
        <Input
          type="text"
          placeholder="stuterlink/"
          value={link}
          className="text-md h-12"
          onChange={(e) => setLink(e.target.value)}
        />

        <Dialog>
          <DialogTrigger
            disabled={buttonActive}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {
              usernameAvailability === null
                ? "Checking..." // Display loading message while checking
                : usernameAvailability
                ? "Username unavailable" // Display button text if username is available
                : "Get it" // Display message if username is taken
            }
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <SignupPopup link={link} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
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
