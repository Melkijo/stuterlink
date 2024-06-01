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
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

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

async function postPortfolio(image: File, values: z.infer<typeof formSchema>) {
  try {
    const supabase = createClient();

    //upload image to storage
    const { data, error } = await supabase.storage
      .from("stuterlink")
      .upload(`portfolio/${image.name}`, image, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.log("error", error);
    }

    //get image link
    const { data: imageLink } = supabase.storage
      .from("stuterlink")
      .getPublicUrl(`portfolio/${image.name}`);

    if (!imageLink.publicUrl) return console.log("error upload image");

    //add new object data in values
    values.image = imageLink.publicUrl;

    const { data: newPortfolio, error: errorInsert } = await supabase
      .from("portfolios")
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

async function getPortfolio(userId: number) {
  const supabase = createClient();

  const { data: response, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }

  return response;
}

async function deletePortfolio(portfolioId: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("portfolios")
    .delete()
    .eq("id", portfolioId);

  if (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }

  return true;
}

async function editPortfolio(
  portfolioId: number,
  values: z.infer<typeof formSchema>,
  image?: File
) {
  const supabase = createClient();

  if (image) {
    const { data, error } = await supabase.storage
      .from("stuterlink")
      .upload(`portfolio/${image.name}`, image, {
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
      .getPublicUrl(`portfolio/${image.name}`);

    if (imageLink.publicUrl !== values.image)
      values.image = imageLink.publicUrl;
  }

  const { data: updatedData, error: updateError } = await supabase
    .from("portfolios")
    .update(values)
    .eq("id", portfolioId);

  if (updateError) {
    console.error("Error update portfolio:", updateError);
    return null;
  }
  console.log("updated");
  return;
}

interface PortfolioProps {
  portfolioList: string[];
  userId: number;
}
export default function EditPortfolio({
  portfolioList,
  userId,
}: PortfolioProps) {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [image, setImage] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number>(0);
  const [imageEdit, setImageEdit] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: userId,
      order: portfolio.length + 1,
    },
  });

  const formEdit = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: userId,
      order: portfolioList.length + 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    if (image) {
      postPortfolio(image, values);
    } else {
      alert("Please upload image");
    }

    setImage(undefined);
  }

  useEffect(() => {
    getPortfolio(userId).then((data) => {
      if (data) {
        setPortfolio(data);
        setLoading(false);
      }
    });
  }, [onSubmit, handleDelete, handleEdit]);

  function handleDelete(portfolioId: number) {
    deletePortfolio(portfolioId);
  }

  function handleEdit(values: z.infer<typeof formSchema>) {
    if (!values.image) values.image = imageEdit;
    if (image) {
      editPortfolio(editId, values, image);
    } else {
      editPortfolio(editId, values);
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button className="w-full">Add new</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Portfolio</DialogTitle>
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
        {portfolio.length === 0 ? (
          <p className="text-center">No portfolio yet</p>
        ) : (
          <>
            {/* Portfolio list */}
            {portfolio.map((item: any, index) => (
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
                        }}
                      >
                        {editIcon}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="mb-4">
                          Edit portfolio {item.title}
                        </DialogTitle>
                        <DialogDescription>
                          <Form {...formEdit}>
                            <form
                              onSubmit={formEdit.handleSubmit(handleEdit)}
                              className="space-y-4"
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
