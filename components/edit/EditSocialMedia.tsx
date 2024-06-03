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
import { toast } from "sonner";

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
  userId: number
) {
  const client = createClient();
  const { data, error } = await client
    .from("social_media")
    .update(values)
    .eq("user_id", userId)
    .select();
  if (error) {
    console.error(error);
    return;
  }
  return;
}

async function addSocialMedia(values: z.infer<typeof formSchema>, userId: any) {
  const client = createClient();
  const { data, error } = await client.from("social_media").insert(values);

  if (error) {
    console.error(error);
    return;
  }
  return console.log("success");
}

interface EditSocialMediaProps {
  socialMediaList: any; // Replace with your actual social media object type
  userId: number; // Assuming userId is a number, adjust if it's a different type
}

export default function EditSocialMedia(props: EditSocialMediaProps) {
  const socialMedia = props.socialMediaList;
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: props.userId,
      linkedin: socialMedia[0]?.linkedin || "",
      github: socialMedia[0]?.github || "",
      x: socialMedia[0]?.x || "",
      instagram: socialMedia[0]?.instagram || "",
      facebook: socialMedia[0]?.facebook || "",
      youtube: socialMedia[0]?.youtube || "",
      tiktok: socialMedia[0]?.tiktok || "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      if (socialMedia.length === 0) {
        await addSocialMedia(values, props.userId);
        toast("Social media added", {
          description: "Your social media has been added successfully",
        });
      } else {
        await updateSocialMedia(values, props.userId);
        toast("Social media updated", {
          description: "Your social media has been updated successfully",
        });
      }
    } catch (error) {
      console.error("Error updating social media:", error);
      toast("Error", {
        description:
          "There was an error updating your social media. Refresh to view the changes.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Input placeholder="github.com/..." {...field} />
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
                <Input placeholder="x.com/..." {...field} />
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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Update"}
        </Button>
      </form>
    </Form>
  );
}
