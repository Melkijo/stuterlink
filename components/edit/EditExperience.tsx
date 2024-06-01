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
import { month } from "@/data/month";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  user_id: z.number().int(),
  order: z.number().int(),
  position: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  type: z.string(),
  description: z.string(),
  start_month: z.string(),
  start_year: z.string(),
  end_month: z.string().optional(),
  end_year: z.string().optional(),
  working_here: z.boolean().optional(),
});

async function postExperience(values: z.infer<typeof formSchema>) {
  try {
    const supabase = createClient();

    const { data: newPortfolio, error: errorInsert } = await supabase
      .from("experiences")
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

async function getExperiences(userId: number) {
  const supabase = createClient();

  const { data: response, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }

  return response;
}

async function deleteExperience(experienceId: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", experienceId);

  if (error) {
    console.error("Error fetching experience:", error);
    return null;
  }

  return true;
}

async function editExperience(
  experienceId: number,
  values: z.infer<typeof formSchema>
) {
  const supabase = createClient();

  const { data: updatedData, error: updateError } = await supabase
    .from("experiences")
    .update(values)
    .eq("id", experienceId);

  if (updateError) {
    console.error("Error update experience:", updateError);
    return null;
  }
  console.log("updated");
  return;
}

export default function EditExperience({ userId }: { userId: number }) {
  const [workingStatus, setWorkingStatus] = useState(false);
  const [experiences, setExperiences] = useState<any[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: userId,
      order: 0,
      position: "",
      company: "",
      type: "",
      description: "",
      start_month: "",
      start_year: "",
      end_month: "",
      end_year: "",
      working_here: false,
    },
  });

  useEffect(() => {
    getExperiences(userId).then((data) => {
      if (data) {
        setExperiences(data);
      }
    });
  }, [onSubmit, handleDelete, handleEdit]);

  function handleDelete(experienceId: number) {
    deleteExperience(experienceId);
  }

  function handleEdit(values: z.infer<typeof formSchema>) {
    // editExperience(editId, values);
    alert("edit");
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    postExperience(values);
  }
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button className="w-full">Add new</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Experience</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="assistant lecture, web developer...."
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
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
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
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="full time">
                                Full time
                              </SelectItem>
                              <SelectItem value="part time">
                                Part time
                              </SelectItem>
                              <SelectItem value="intership">
                                Intership
                              </SelectItem>
                              <SelectItem value="contract">Contract</SelectItem>
                              <SelectItem value="volunteer">
                                Volunteer
                              </SelectItem>
                              <SelectItem value="entrepreneur">
                                Entrepreneur
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="start_month"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start month</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {month.map((item: string, index) => (
                                <SelectItem key={index} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="start_year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start year</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="20xx"
                              {...field}
                              type="number"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="working_here"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            onClick={() => {
                              setWorkingStatus(!workingStatus);
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I currently working here</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="end_month"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End month</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger disabled={workingStatus}>
                                <SelectValue placeholder="Choose" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {month.map((item: string, index) => (
                                <SelectItem key={index} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="end_year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End year</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="20xx"
                              {...field}
                              type="number"
                              disabled={workingStatus}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
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

      <div className="flex flex-col gap-2 mt-4">
        {experiences.map((item) => (
          <div className="flex  justify-between  rounded-lg  bg-white overflow-hidden">
            <div className="py-4 ps-2">
              <div className="flex gap-4">
                <small>
                  {item.start_month} {item.start_year} -
                  {item.working_here ? (
                    <span> Present</span>
                  ) : (
                    <span>
                      {item.end_month} {item.end_year}
                    </span>
                  )}{" "}
                </small>
                {/* <small>Full time</small> */}
              </div>
              <h3 className="font-medium">{item.position}</h3>
              <p className="text-sm">{item.company}</p>
            </div>
            <div className=" grid grid-cols-1 w-[60px]">
              <p className="bg-yellow-400  flex items-center justify-center">
                {editIcon}
              </p>
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
