import InputHome from "@/components/home/InputHome";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  // condition for user has been login cant in landing page
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data, error } = await supabase
      .from("user_data")
      .select("username")
      .eq("email", user.email);
    if (data && data.length > 0) {
      redirect(`/${data[0].username}`);
    }
  }
  return (
    <main>
      <div className="max-w-[480px] mx-auto mt-10 px-5">
        <h1 className="text-3xl text-center leading-normal">
          Make your online appereance more profesional
        </h1>
        <InputHome />
      </div>
    </main>
  );
}
