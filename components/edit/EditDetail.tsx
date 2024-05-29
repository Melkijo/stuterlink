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
import { createClient } from "@/utils/supabase/server";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  occupation: z.string().optional(),
  profilePicture: z.instanceof(FileList).optional(),
  resume: z.string().optional(),
  pronouns: z.string(),
  city: z.string(),
  country: z.string(),
});
export default function EditDetail() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      resume: "",
      occupation: "",
    },
  });

  //   const supabase = createClient();

  //   const uploadFile = async (event: any) => {
  //     const file = event.target.files[0];
  //     const bucket = "stuterlink";

  //     // Call Storage API to upload file
  //     const { data, error } = await supabase.storage
  //       .from(bucket)
  //       .upload(file.name, file);

  //     // Handle error if upload failed
  //     if (error) {
  //       alert("Error uploading file.");
  //       return;
  //     }

  //     alert("File uploaded successfully!");
  //   };

  const fileRef = form.register("profilePicture");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                <Input placeholder="melkijo" {...field} />
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
                <Input placeholder="student, freelance..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input type="file" placeholder="shadcn" {...fileRef} />
              </FormControl>
              {/* <FormDescription>
                            This is your public display name.
                        </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image test</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="shadcn"
                  // onChange={uploadFile}
                />
              </FormControl>
              {/* <FormDescription>
                            This is your public display name.
                        </FormDescription> */}
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
                <Input type="file" {...field} />
              </FormControl>
              {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <Input placeholder="Lagos" {...field} />
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
                  <Input placeholder="Africa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Update
        </Button>
      </form>
    </Form>
  );
}
