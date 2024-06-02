"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
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
import { navigateUsername, signup } from "./actions";
import { Suspense, useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function useSearch() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "username";
  return username;
}

function PageContent() {
  const [isLoading, setIsLoading] = useState(false);

  const username = useSearch();

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
      navigateUsername({ username: result.data || "" });
    }
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-lg mx-auto  h-screen  flex items-center justify-center ">
        <div className="w-full bg-white  px-6 py-8 rounded-2xl mx-4">
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
                Signup
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
