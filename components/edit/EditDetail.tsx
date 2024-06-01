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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  occupation: z.string().optional(),
  profile_picture: z.any(),
  resume: z.any(),
  pronouns: z.string(),
  city: z.string(),
  country: z.string(),
});

async function updateDetail(
  userId: number,
  values: z.infer<typeof formSchema>,
  image?: File,
  resume?: File
) {
  const supabase = createClient();

  if (image) {
    const { data, error } = await supabase.storage
      .from("stuterlink")
      .upload(`profilePicture/${image.name}`, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("error", error);
      return null;
    }

    // get image link
    const { data: imageLink } = supabase.storage
      .from("stuterlink")
      .getPublicUrl(`profilePicture/${image.name}`);

    if (imageLink.publicUrl !== values.profile_picture)
      values.profile_picture = imageLink.publicUrl;
  }

  if (resume) {
    const { data, error } = await supabase.storage
      .from("stuterlink")
      .upload(`resume/${resume.name}`, resume, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("error", error);
      return null;
    }

    // get resume link
    const { data: resumeLink } = supabase.storage
      .from("stuterlink")
      .getPublicUrl(`resume/${resume.name}`);

    if (resumeLink.publicUrl !== values.resume)
      values.resume = resumeLink.publicUrl;
  }

  console.log(values);

  const { data: updatedData, error: updateError } = await supabase
    .from("user_data")
    .update(values)
    .eq("id", userId);

  if (updateError) {
    console.error("Error update detail user:", updateError);
    return null;
  }
  console.log("updated");
  return;
}

// async function updateProfile(
//   values: z.infer<typeof formSchema>,
//   userId: number
// ) {
//   const client = createClient();
//   const { data, error } = await client
//     .from("user_data")
//     .update(values)
//     .eq("id", userId)
//     .select();
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log(data);
// }

export default function EditDetail({ data }: { data: any }) {
  const [image, setImage] = useState<File>();
  const [resume, setResume] = useState<File>();

  const [loading, setLoading] = useState(false);
  const [imageEdit, setImageEdit] = useState<string>("");
  const [resumeEdit, setResumeEdit] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      //   resume: data.resume,
      occupation: data.occupation,
      //   profilePicture: data.profilePicture,
      pronouns: data.pronouns,
      city: data.city,
      country: data.country,
    },
  });

  function handleEdit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (!values.profile_picture && !values.resume) {
      values.profile_picture = imageEdit;
      values.resume = resumeEdit;
    } else if (!values.profile_picture) {
      values.profile_picture = imageEdit;
    } else if (!values.resume) {
      values.resume = resumeEdit;
    }

    console.log(values);
    if (image && resume) {
      updateDetail(data.id, values, image, resume);
    } else if (image) {
      updateDetail(data.id, values, image);
    } else if (resume) {
      updateDetail(data.id, values, resume);
    } else {
      updateDetail(data.id, values);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // updateProfile(values, data.id);
    console.log(image, resume);
    console.log(values);

    if (!values.profile_picture && !values.resume) {
      values.profile_picture = imageEdit;
      values.resume = resumeEdit;
    } else if (!values.profile_picture) {
      values.profile_picture = imageEdit;
    } else if (!values.resume) {
      values.resume = resumeEdit;
    }

    console.log(values);
    if (image && resume) {
      updateDetail(data.id, values, image, resume);
    } else if (image) {
      updateDetail(data.id, values, image);
    } else if (resume) {
      updateDetail(data.id, values, resume);
    } else {
      updateDetail(data.id, values);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="melkijo"
                  {...field}
                  //   defaultValue={data.name}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <FormControl>
                <Input
                  placeholder="student, freelance..."
                  {...field}
                  //   value={data.occupation}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profile_picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile picture</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...field}
                  onChange={(event) => {
                    if (event.target.files) {
                      setImage(event.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...field}
                  onChange={(event) => {
                    if (event.target.files) {
                      setResume(event.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pronouns"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pronouns</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                // value={data.pronouns}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your pronouns" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="He">He</SelectItem>
                  <SelectItem value="She">She</SelectItem>
                  <SelectItem value="King">King</SelectItem>
                  <SelectItem value="Queen">Queen</SelectItem>
                  <SelectItem value="Master">Master</SelectItem>
                  <SelectItem value="Suhu">Suhu</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Lagos"
                    {...field}

                    //   value={data.city}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Africa"
                    {...field}
                    //   value={data.country}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          onClick={() => {
            setResumeEdit(data.resume);
            setImageEdit(data.image);
          }}
        >
          Update
        </Button>
      </form>
    </Form>
  );
}
