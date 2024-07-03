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
  DialogHeader,
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

export default function InputHome() {
  const [link, setLink] = useState("");
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const [usernameAvailability, setUsernameAvailability] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    setLink(link.toLowerCase());
    const handleUsernameChange = async () => {
      if (!link) {
        setUsernameAvailability(null);
        setButtonActive(true);
        return;
      }

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

  return (
    <div className="mt-8">
      <p className="text-base md:text-lg">
        Get a professional online presence now
      </p>
      <div className="flex w-full mt-2 items-center space-x-2">
        <Input
          type="text"
          placeholder="stuter.me/"
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
            <SignupPopup link={link} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-2 text-base text-gray-400">
        have an account?{" "}
        <Link href="/login">
          <Button
            variant="link"
            size="none"
            className="text-blue-500 ml-1 text-base"
          >
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
