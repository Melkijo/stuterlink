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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { login, navigateUsername } from "./actions";
import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

async function signInWithGoogle() {
  console.log("masuk");
  const supabase = createClient();
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://stuterlink.vercel.app/callback",
    },
  });
}
export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await login({ userData: values });
    setIsLoading(false);

    if (!result.success) {
      toast("Login failed", {
        description: "Check your email or password and try again",
      });
    } else {
      toast("Login success", {
        description: "Redirecting to your profile",
      });
      navigateUsername({ username: result.data });
    }
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-lg mx-auto  h-screen  flex items-center justify-center ">
        <div className="w-full bg-white  px-6 py-8 rounded-2xl mx-4">
          <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
          <div className="w-full flex justify-center flex-col items-center">
            <Button
              className="w-full text-md "
              size="lg"
              onClick={() => signInWithGoogle()}
            >
              Sign in with Google
            </Button>
          </div>

          <hr className="my-4" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="melkijo@example.com"
                        {...field}
                        // name="email"
                        type="email"
                        required
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
                        type="password"
                        placeholder="****"
                        {...field}
                        // name="password"
                        required
                      />
                    </FormControl>

                    <Dialog>
                      <div className="w-full flex justify-end">
                        <DialogTrigger asChild>
                          <Button variant="link" size="none">
                            Forget password?
                          </Button>
                        </DialogTrigger>
                      </div>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Reset password</DialogTitle>
                          <DialogDescription>
                            Input your email and will send you a link to reset
                            your password
                          </DialogDescription>
                        </DialogHeader>
                        <div>
                          <div className="flex flex-col gap-1">
                            <Label htmlFor="name" className="text-left pb-2">
                              Email
                            </Label>
                            <Input id="name" placeholder="melkijo@gmail.com" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={() => alert("currently unavaiable")}
                          >
                            Send
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

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
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </form>
          </Form>
          <div className="flex justify-center mt-4">
            <p>Don't have an account?</p>
            <Button variant="link" size="none">
              <Link href="/" className="text-blue-500 ml-1 text-md">
                Signup
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
