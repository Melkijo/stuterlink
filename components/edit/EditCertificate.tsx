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
import { Input } from "@/components/ui/input";
import { editIcon, trashIcon } from "@/components/icons";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  user_id: z.number(),
  order: z.number(),
  title: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  url: z.string().url(),
  year_published: z.string(),
  published_by: z.string(),
});
async function getCertificates(userId: number) {
  const supabase = createClient();

  const { data: response, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching experience:", error);
    return null;
  }

  return response;
}

async function putCertificate(
  values: z.infer<typeof formSchema>,
  certificateId: number
) {
  try {
    const supabase = createClient();

    const { error: errorUpdate } = await supabase
      .from("certificates")
      .update({ ...values })
      .eq("id", certificateId);

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

async function postCertificate(values: z.infer<typeof formSchema>) {
  try {
    const supabase = createClient();

    const { error: errorInsert } = await supabase
      .from("certificates")
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
async function deleteCertificate(certificateId: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from("certificates")
    .delete()
    .eq("id", certificateId);

  if (error) {
    console.error("Error fetching certificate:", error);
    return null;
  }
  console.log("deleted");
}

export default function EditCertificate({
  userId,
}: Readonly<{ userId: number }>) {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [editId, setEditId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
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
    },
  });

  useEffect(() => {
    getCertificates(userId).then((data) => {
      if (data) {
        setCertificates(data);
      }
    });
  }, [onSubmit, handleDelete]);

  function defaultValues(
    title: string,
    url: string,
    year_published: string,
    published_by: string
  ) {
    formEdit.setValue("title", title);
    formEdit.setValue("url", url);
    formEdit.setValue("year_published", year_published);
    formEdit.setValue("published_by", published_by);
  }

  async function handleDelete(certificateId: number) {
    try {
      await deleteCertificate(certificateId); // Assuming deleteCertificate is an async function
      toast("Certificate deleted", {
        description: "Your certificate has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting certificate:", error);
      toast("Error", {
        description: "There was an error deleting your certificate.",
      });
    }
  }

  async function handleEdit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await putCertificate(values, editId); // Assuming editCertificate is an async function
      toast("Certificate updated", {
        description: "Your certificate has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating certificate:", error);
      toast("Error", {
        description: "There was an error updating your certificate.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await postCertificate(values); // Assuming postCertificate is an async function
      toast("Certificate added", {
        description: "Your certificate has been added successfully",
      });
    } catch (error) {
      console.error("Error adding certificate:", error);
      toast("Error", {
        description: "There was an error adding your certificate.",
      });
    } finally {
      setLoading(false);
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
            <DialogTitle className="mb-4">Certificate</DialogTitle>
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
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="frontend web certificate...."
                            {...field}
                          />
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
                          <Input
                            placeholder="https://example.com/certificate/..."
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
                      name="year_published"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year published</FormLabel>
                          <FormControl>
                            <Input placeholder="20xx" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="published_by"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Published By</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="google, microsoft..."
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
      <div className="flex flex-col gap-2 mt-4">
        {certificates.length > 0 ? (
          certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="flex justify-between rounded-lg bg-white overflow-hidden border border-gray-200"
            >
              <div className="ps-2 py-2">
                <div className="flex justify-between">
                  <small>{certificate.year_published}</small>
                </div>
                <h3 className="font-medium">{certificate.title}</h3>
                <small>{certificate.published_by}</small>
              </div>
              <div className="grid grid-cols-1 w-[60px]">
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button
                      className="bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center w-full h-full rounded-none"
                      variant="none"
                      size="none"
                      onClick={() => {
                        setEditId(certificate.id);
                        defaultValues(
                          certificate.title,
                          certificate.url,
                          certificate.year_published,
                          certificate.published_by
                        );
                      }}
                    >
                      {editIcon}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="mb-4">
                        Certificate {certificate.title}
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
                                      placeholder="frontend web certificate...."
                                      {...field}
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
                                      placeholder="https://example.com/certificate/..."
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
                                name="year_published"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Year published</FormLabel>
                                    <FormControl>
                                      <Input placeholder="20xx" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={formEdit.control}
                                name="published_by"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Published By</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="google, microsoft..."
                                        {...field}
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
                  className="bg-red-400 hover:bg-red-500 flex items-center justify-center rounded-none"
                  onClick={() => handleDelete(certificate.id)}
                  disabled={loading}
                >
                  {trashIcon}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full ">
            <small>No certificates</small>
          </div>
        )}
      </div>
    </>
  );
}
