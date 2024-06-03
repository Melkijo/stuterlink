"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

async function signup(
  { userData }: { userData: { email: string; password: string } },
  newUsername: string
) {
  const supabase = createClient();

  const { error: signUpError } = await supabase.auth.signUp(userData);

  if (signUpError) {
    console.log("Error during signup:", signUpError.message);
    return { success: false, error: signUpError.message };
  }

  const { error: insertError } = await supabase
    .from("user_data")
    .insert({ email: userData.email, username: newUsername });

  if (insertError) {
    console.log("Error storing user data:", insertError.message);
    return { success: false, error: insertError.message };
  }

  return { success: true, data: newUsername };
}

export default function SignupPopup({ link }: { link: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const username = link;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await signup({ userData: values }, username);
    setIsLoading(false);

    if (!result.success) {
      toast("Register failed", {
        description: "Check your email or password and try again",
      });
    } else {
      toast("Register success", {
        description: "Redirecting to your profile",
      });
      router.push(`/${result.data}`);
    }
  }

  return (
    <div className="text-left max-w-lg mx-auto flex items-center justify-center ">
      <div className="w-full bg-white  px-4 py-4 rounded-2xl ">
        <p className="mb-4">
          <span>stuterlink.me/{username}</span> is ready!
        </p>
        <h1 className="text-3xl font-bold text-left mb-6">
          Create your account now
        </h1>
        <div className="w-full flex justify-center flex-col items-center">
          <Button className="w-full text-md" size="lg">
            Sign up with Google
          </Button>
        </div>
        <hr className="my-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      // name="email"
                      type="email"
                      required
                      placeholder="melkijo@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      // name="password"
                      type="password"
                      required
                      placeholder="****"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full text-md"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign up"}
            </Button>
          </form>
        </Form>
        <div className="flex justify-center mt-4">
          <p>Have an account?</p>
          <Button variant="link" size="none">
            <Link href="/login" className="text-blue-500 ml-1 text-md">
              Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
