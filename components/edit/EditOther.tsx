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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { interestList } from "@/data/data";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { editIcon, trashIcon } from "@/components/icons";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  thumbnail: z.string().optional(),
  url: z.string().optional(),
  description: z.string(),
});
export default function EditOther({ otherLinkList }: { otherLinkList: any[] }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   name: "",
    //   profileImage: "",
    // },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const otherLink = otherLinkList;
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button className="w-full">Add new</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Other link</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="example project" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Url</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Make it as short as posibble"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Add new
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="mt-4 w-full h-0.5 bg-gray-400"></div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="  bg-white  flex gap-1 justify-between items-center rounded-xl overflow-hidden h-[100px]">
          <div className="w-[100px] h-full">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/beasiswakita-3e322.appspot.com/o/img%2F20220118190946_IMG_8897%201.png?alt=media&token=d9550a4e-cdbf-4300-a38c-366aaeabb85c"
              alt="profile picture"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-semibold text-base w-fit">Project 1</h3>
            <p className="text-xs line-clamp-1 w-[75px]">
              Ini decriptiona sdhfkjashdfkasd sdakfjhak
            </p>
          </div>
          <div className="text-xs h-full grid grid-cols-1 w-[60px]">
            <p className="bg-yellow-400 flex items-center justify-center">
              {editIcon}
            </p>
            <p className="bg-red-400  flex items-center justify-center">
              {trashIcon}
            </p>
          </div>
        </div>
        <div className="  bg-white flex gap-1 justify-between items-center rounded-xl overflow-hidden h-[100px]">
          <div className="w-[100px] h-full">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/beasiswakita-3e322.appspot.com/o/img%2F20220118190946_IMG_8897%201.png?alt=media&token=d9550a4e-cdbf-4300-a38c-366aaeabb85c"
              alt="profile picture"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-semibold text-base w-fit">Project 1</h3>
            <p className="text-xs line-clamp-1 w-[75px]">
              Ini decriptiona sdhfkjashdfkasd sdakfjhak
            </p>
          </div>
          <div className="text-xs h-full grid grid-cols-1 w-[60px]">
            <p className="bg-yellow-400 flex items-center justify-center">
              {editIcon}
            </p>
            <p className="bg-red-400  flex items-center justify-center">
              {trashIcon}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
