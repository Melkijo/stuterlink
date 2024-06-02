import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
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
    <html lang="en">
      <body className={satoshi.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
