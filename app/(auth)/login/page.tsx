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
import { useRouter } from "next/navigation";
import { login } from "./actions";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Page() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    // },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    login({ userData: values });
  }

  return (
    <div className="max-w-[480px] mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
      <div className="w-full flex justify-center flex-col items-center">
        <Button className="w-full">Sign in with Google</Button>
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
                <FormDescription>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" size="none" className="p-0 py-0">
                        Forget password
                      </Button>
                    </DialogTrigger>
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
                        <Button type="submit">Send</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* dont have an account */}
          <FormDescription>
            Don't have an account?{" "}
            <Link href="/" className="text-blue-500">
              Signup
            </Link>
          </FormDescription>

          <Button
            type="submit"
            //   formAction={login}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
