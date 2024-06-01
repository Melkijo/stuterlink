"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const formSchema = z.object({
  user_id: z.number(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  x: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
});

async function updateSocialMedia(
  values: z.infer<typeof formSchema>,
  userId: any
) {
  const client = createClient();
  const { data, error } = await client
    .from("user_data")
    .update(values)
    .eq("id", userId)
    .select();
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
}

async function addSocialMedia(values: z.infer<typeof formSchema>, userId: any) {
  const client = createClient();
  const { data, error } = await client.from("social_media").insert(values);

  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
}

interface EditSocialMediaProps {
  socialMediaList: any; // Replace with your actual social media object type
  userId: any; // Assuming userId is a number, adjust if it's a different type
}

export default function EditSocialMedia(props: EditSocialMediaProps) {
  const socialMedia = props.socialMediaList;
  //   console.log(socialMedia);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: props.userId,
      linkedin: socialMedia[0].linkedin || "",
      github: socialMedia[0].github || "",
      x: socialMedia[0].x || "",
      instagram: socialMedia[0].instagram || "",
      facebook: socialMedia[0].facebook || "",
      youtube: socialMedia[0].youtube || "",
      tiktok: socialMedia[0].tiktok || "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (socialMedia.length === 0) {
      addSocialMedia(values, props.userId);
    } else {
      updateSocialMedia(values, props.userId);
    }
    console.log(values);
  }
  //   console.log(socialMedia);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} className="hidden" />
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin</FormLabel>
              <FormControl>
                <Input placeholder="linkedin.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github</FormLabel>
              <FormControl>
                <Input
                  placeholder="github.com/..."
                  {...field}
                  //   value={
                  //     socialMedia.find(
                  //       (item: socialMediaType) => item.type === "github"
                  //     )?.url
                  //   }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="x"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter</FormLabel>
              <FormControl>
                <Input
                  placeholder="x.com/..."
                  {...field}
                  //   value={
                  //     socialMedia.find(
                  //       (item: socialMediaType) => item.type === "x"
                  //     )?.url
                  //   }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input placeholder="instagram.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook</FormLabel>
              <FormControl>
                <Input placeholder="facebook.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="youtube"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Youtube</FormLabel>
              <FormControl>
                <Input placeholder="youtube.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tiktok"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiktok</FormLabel>
              <FormControl>
                <Input placeholder="tiktok.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Update
        </Button>
      </form>
    </Form>
  );
}
