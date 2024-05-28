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
import { signup } from "./actions";
import { Suspense } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Page() {
  const searchParams = useSearchParams();

  const username = searchParams.get("username") || "username";
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    signup({ userData: values }, username);
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-[480px] mx-auto mt-20">
        <p className="mb-4">
          <span
          // className="py-2 px-3 bg-green-500 rounded-lg font-medium"
          >
            stuterlink.me/{username}
          </span>{" "}
          is ready!
        </p>
        <h1 className="text-3xl font-bold text-left mb-8">
          Create your account now
        </h1>
        <div className="w-full flex justify-center flex-col items-center">
          <Button className="w-full">Sign up with Google</Button>
        </div>
        <p className="my-4 text-center">Or</p>

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

            <FormDescription>
              Have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login
              </Link>
            </FormDescription>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </Suspense>
  );
}
