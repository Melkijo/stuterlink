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
import { editIcon, linkIcon, trashIcon } from "@/components/icons";
const formSchema = z.object({
  school: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  degree: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  startYear: z.number().int(),
  endYear: z.number().int(),
});

export default function EditEducation({
  educationList,
}: {
  educationList: any[];
}) {
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
  const education = educationList;

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button className="w-full">Add new</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Education</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School/University</FormLabel>
                        <FormControl>
                          <Input placeholder="School/University" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="BSc Computer Science"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="startYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Year</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="2020" />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Year</FormLabel>
                          <FormControl>
                            <Input placeholder="2023" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
      <div className="flex flex-col gap-2 mt-4">
        <div className=" flex  justify-between rounded-lg  bg-white overflow-hidden">
          <div className="py-4 ps-2">
            <h3 className="text-base font-semibold">BSc Computer Science</h3>
            <p className="text-sm">University of Lagos</p>
            <p className="text-sm">2020 - 2024</p>
          </div>

          <div className=" grid grid-cols-1  w-[60px]">
            <p className="bg-yellow-400 flex items-center justify-center">
              {editIcon}
            </p>
            <p className="bg-red-400   flex items-center justify-center">
              {trashIcon}
            </p>
          </div>
        </div>
        <div className=" flex  justify-between rounded-lg  bg-white overflow-hidden">
          <div className="py-4 ps-2">
            <h3 className="text-base font-semibold">BSc Computer Science</h3>
            <p className="text-sm">University of Lagos</p>
            <p className="text-sm">2020 - 2024</p>
          </div>

          <div className=" grid grid-cols-1  w-[60px]">
            <p className="bg-yellow-400 flex items-center justify-center">
              {editIcon}
            </p>
            <p className="bg-red-400   flex items-center justify-center">
              {trashIcon}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
