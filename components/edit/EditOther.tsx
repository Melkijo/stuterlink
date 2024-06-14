"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { editIcon, trashIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

const formSchema = z.object({
  user_id: z.number(),
  order: z.number(),
  title: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  image: z.any(),
  url: z.string(),
  description: z.string().optional(),
});

async function postOtherLink(image: File, values: z.infer<typeof formSchema>) {
  try {
    const supabase = createClient();

    //upload image to storage
    const { error } = await supabase.storage
      .from("stuterlink")
      .upload(`otherLink/${image.name}`, image, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.log("error", error);
    }

    //get image link
    const { data: imageLink } = supabase.storage
      .from("stuterlink")
      .getPublicUrl(`otherLink/${image.name}`);

    if (!imageLink.publicUrl) return console.log("error upload image");

    //add new object data in values
    values.image = imageLink.publicUrl;

    const { error: errorInsert } = await supabase
      .from("other_link")
      .insert([{ ...values }])
      .select();
    if (errorInsert) {
      console.error("Error fetching authenticated user:", errorInsert);
      return;
    }

    return;
  } catch (err) {
    console.log(err);
  }
}

async function getOtherLink(userId: number) {
  const supabase = createClient();

  const { data: response, error } = await supabase
    .from("other_link")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching otherLink:", error);
    return null;
  }

  return response;
}

async function deleteOtherLink(otherLinkId: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from("other_link")
    .delete()
    .eq("id", otherLinkId);

  if (error) {
    console.error("Error fetching otherLink:", error);
    return null;
  }

  return true;
}

async function editOtherLink(
  otherLinkId: number,
  values: z.infer<typeof formSchema>,
  image?: File
) {
  const supabase = createClient();

  if (image) {
    const { error } = await supabase.storage
      .from("stuterlink")
      .upload(`otherLink/${image.name}`, image, {
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
      .getPublicUrl(`otherLink/${image.name}`);

    if (imageLink.publicUrl !== values.image)
      values.image = imageLink.publicUrl;
  }

  const { error: updateError } = await supabase
    .from("other_link")
    .update(values)
    .eq("id", otherLinkId);

  if (updateError) {
    console.error("Error update other link:", updateError);
    return null;
  }
  console.log("updated");
}

interface OtherLinkProps {
  otherLinkList: string[];
  userId: number;
}
export default function EditOther({ userId }: Readonly<OtherLinkProps>) {
  const [otherLink, setOtherLink] = useState<any[]>([]);
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number>(0);
  const [imageEdit, setImageEdit] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: userId,
      order: otherLink.length + 1,
    },
  });

  const formEdit = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: userId,
      order: 0,
    },
  });

  useEffect(() => {
    getOtherLink(userId).then((data) => {
      if (data) {
        setOtherLink(data);
        setLoading(false);
      }
    });
  }, [onSubmit, handleDelete, handleEdit]);

  async function handleDelete(otherLinkId: number) {
    try {
      await deleteOtherLink(otherLinkId); // Assuming deleteOtherLink is an async function
      toast("Other Link deleted", {
        description: "The other link has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting other link:", error);
      toast("Error", {
        description: "There was an error deleting the other link.",
      });
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (image) {
        await postOtherLink(image, values); // Assuming postOtherLink is an async function
        toast("Other Link added", {
          description: "The other link has been added successfully",
        });
      } else {
        toast("Please upload image");
      }
    } catch (error) {
      console.error("Error adding other link:", error);
      toast("Error", {
        description: "There was an error adding the other link.",
      });
    } finally {
      setLoading(false);
      setImage(undefined);
    }
  }

  async function handleEdit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (!values.image) values.image = imageEdit;
      if (image) {
        await editOtherLink(editId, values, image); // Assuming editOtherLink is an async function
      } else {
        await editOtherLink(editId, values);
      }
      toast("Other Link updated", {
        description: "The other link has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating other link:", error);
      toast("Error", {
        description: "There was an error updating the other link.",
      });
    } finally {
      setLoading(false);
    }
  }

  function defaultValue(title: string, url: string, description: string) {
    formEdit.setValue("title", title);
    formEdit.setValue("url", url);
    formEdit.setValue("description", description);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button className="w-full">Add new</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Other Link</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 text-left"
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
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
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
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Loading..." : "Add new"}
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="mt-4 w-full h-0.5 bg-gray-400"></div>
      <div className="mt-4 flex flex-col gap-2">
        {otherLink.length === 0 ? (
          <small className="text-center">No other link yet</small>
        ) : (
          <>
            {/* otherLink list */}
            {otherLink.map((item: any, index) => (
              <div
                key={index}
                className="  bg-white  flex gap-1 justify-between items-center rounded-xl overflow-hidden h-[100px]"
              >
                <div className="w-[100px] h-full">
                  <Image
                    src={`${item.image}`}
                    alt="profile picture"
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-base w-fit">
                    {item.title}
                  </h3>
                  <p className="text-xs line-clamp-1 w-[75px]">
                    {item.description}
                  </p>
                </div>
                <div className="text-xs h-full grid grid-cols-1 w-[60px]">
                  <Dialog>
                    <DialogTrigger className="w-full">
                      <Button
                        className="bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center w-full h-full rounded-none"
                        variant="none"
                        size="none"
                        onClick={() => {
                          setEditId(item.id);
                          setImageEdit(item.image);
                          defaultValue(item.title, item.url, item.description);
                        }}
                      >
                        {editIcon}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="mb-4">
                          Edit otherLink {item.title}
                        </DialogTitle>
                        <DialogDescription>
                          <Form {...formEdit}>
                            <form
                              onSubmit={formEdit.handleSubmit(handleEdit)}
                              className="space-y-4 text-left"
                            >
                              <FormField
                                control={formEdit.control}
                                name="title"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="example project"
                                        {...field}
                                        defaultValue={item.title}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={formEdit.control}
                                name="url"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Url</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="https://example.com"
                                        {...field}
                                        defaultValue={item.url}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={formEdit.control}
                                name="image"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Image</FormLabel>
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
                                control={formEdit.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>description</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Make it as short as posibble"
                                        className="resize-none"
                                        {...field}
                                        defaultValue={item.description}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                              >
                                {loading ? "Loading..." : "Update"}
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
          </>
        )}
      </div>
    </>
  );
}
