import type { Metadata } from "next";

import { HeroBackground } from "@/components/home/HeroBackground";
import { HeroText } from "@/components/home/HeroText";
import InputHome from "@/components/home/InputHome";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Stuter",
  description: "Your profesional link",
};

export default async function Home() {
  const supabase = createClient();

  // condition for user has been login cant in landing page
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data } = await supabase
      .from("user_data")
      .select("username")
      .eq("email", user.email);
    if (data && data.length > 0) {
      redirect(`/${data[0].username}`);
    }
  }
  return (
    <div className="max-w-full ">
      <HeroBackground>
        <div className="max-w-xl mx-auto px-5 ">
          <HeroText words={"Stand Out in Today's Digital World"} />
          <InputHome />
        </div>
      </HeroBackground>
    </div>
  );
}
