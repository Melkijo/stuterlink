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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { editIcon, linkIcon, trashIcon } from "@/components/icons";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const formSchema = z.object({
  user_id: z.number(),
  order: z.number(),
  school: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  degree: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  start_year: z.string(),
  end_year: z.string(),
});

async function postEducation(values: z.infer<typeof formSchema>) {
  try {
    const supabase = createClient();

    const { error: errorInsert } = await supabase
      .from("education")
      .insert([{ ...values }])
      .select();
    if (errorInsert) {
      console.error("Error fetching authenticated user:", errorInsert);
      return;
    }
    console.log("inserted");

    return;
  } catch (err) {
    console.log(err);
  }
}

async function getEducation(userId: number) {
  const supabase = createClient();

  const { data: response, error } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching experience:", error);
    return null;
  }

  return response;
}

async function putEducation(
  values: z.infer<typeof formSchema>,
  educationId: number
) {
  try {
    const supabase = createClient();

    const { error: errorUpdate } = await supabase
      .from("education")
      .update({ ...values })
      .eq("id", educationId);

    if (errorUpdate) {
      console.error("Error fetching authenticated user:", errorUpdate);
      return;
    }
    console.log("updated");
    return;
  } catch (err) {
    console.log(err);
  }
}

async function deleteEducation(educationId: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from("education")
    .delete()
    .eq("id", educationId);

  if (error) {
    console.error("Error delete education:", error);
    return null;
  }
  console.log("deleted");
  return;
}

export default function EditEducation({ userId }: { userId: number }) {
  const [education, setEducation] = useState<any[]>([]);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    getEducation(userId).then((data) => {
      if (data) {
        setEducation(data);
      }
    });
  }, [onSubmit, handleDelete]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: userId,
      order: 0,
    },
  });

  const formEdit = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: userId,
      order: 0,
      school: "",
      degree: "",
      start_year: "",
      end_year: "",
    },
  });

  function defaultValues(
    school: string,
    degree: string,
    start_year: string,
    end_year: string
  ) {
    formEdit.setValue("school", school);
    formEdit.setValue("degree", degree);
    formEdit.setValue("start_year", start_year);
    formEdit.setValue("end_year", end_year);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    postEducation(values);
    console.log(values);
  }

  function handleDelete(educationId: number) {
    deleteEducation(educationId);
  }

  function handleEdit(values: z.infer<typeof formSchema>) {
    putEducation(values, editId);
  }

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
                        <FormLabel>School / University</FormLabel>
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
                      name="start_year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Year</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="20xx" />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="end_year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Year</FormLabel>
                          <FormControl>
                            <Input placeholder="20xx" {...field} />
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
        {education.map((item, index) => (
          <div
            key={index}
            className=" flex  justify-between rounded-lg  bg-white overflow-hidden"
          >
            <div className="py-4 ps-2">
              <h3 className="text-base font-semibold">{item.degree}</h3>
              <p className="text-sm">{item.school}</p>
              <p className="text-sm">
                {item.start_year} - {item.end_year}
              </p>
            </div>

            <div className=" grid grid-cols-1  w-[60px]">
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center w-full h-full rounded-none"
                    variant="none"
                    size="none"
                    onClick={() => {
                      setEditId(item.id);
                      defaultValues(
                        item.school,
                        item.degree,
                        item.start_year,
                        item.end_year
                      );
                    }}
                  >
                    {editIcon}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-4">Education</DialogTitle>
                    <DialogDescription>
                      <Form {...formEdit}>
                        <form
                          onSubmit={formEdit.handleSubmit(handleEdit)}
                          className="space-y-4"
                        >
                          <FormField
                            control={formEdit.control}
                            name="school"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>School / University</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="School/University"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={formEdit.control}
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
                              control={formEdit.control}
                              name="start_year"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Year</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="20xx" />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={formEdit.control}
                              name="end_year"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Year</FormLabel>
                                  <FormControl>
                                    <Input placeholder="20xx" {...field} />
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
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button
                variant="none"
                size="none"
                className="bg-red-400 hover:bg-red-500  flex items-center justify-center rounded-none"
                onClick={() => handleDelete(item.id)}
              >
                {trashIcon}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
