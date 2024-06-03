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
import { set } from "lodash";
import { ScrollArea } from "../ui/scroll-area";

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
    console.error("Error fetching experience:", error);
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

  const { error: updateError } = await supabase
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

type Experience = {
  id: number;
  user_id: number;
  order: number;
  position: string;
  company: string;
  type: string;
  description: string;
  start_month: string;
  start_year: string;
  end_month: string;
  end_year: string;
  working_here: boolean;
};

export default function EditExperience({ userId }: { userId: number }) {
  const [workingStatus, setWorkingStatus] = useState(false);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [editExperienceId, setEditExperienceId] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: userId,
      order: 0,
      working_here: false,
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
    console.log(editExperienceId);
    editExperience(editExperienceId, values);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    postExperience(values);
  }

  function defaultValue(
    position: string,
    company: string,
    type: string,
    description: string,
    start_month: string,
    start_year: string,
    end_month: string,
    end_year: string,
    working_here: boolean
  ) {
    formEdit.setValue("position", position);
    formEdit.setValue("company", company);
    formEdit.setValue("type", type);
    formEdit.setValue("description", description);
    formEdit.setValue("start_month", start_month);
    formEdit.setValue("start_year", start_year);
    formEdit.setValue("end_month", end_month);
    formEdit.setValue("end_year", end_year);
    formEdit.setValue("working_here", working_here);
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" text-left"
              >
                <ScrollArea className="w-full h-96 pr-4 space-y-4">
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
                </ScrollArea>
                <Button type="submit" className="w-full">
                  Add new
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="mt-4 w-full h-0.5 bg-gray-400"></div>

      <div className="flex flex-col gap-2 mt-4">
        {experiences.length > 0 ? (
          experiences.map((item: Experience, index) => (
            <div
              key={index}
              className="flex  justify-between  rounded-lg  bg-white overflow-hidden"
            >
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
                </div>
                <h3 className="font-medium">{item.position}</h3>
                <p className="text-sm">{item.company}</p>
              </div>
              <div className=" grid grid-cols-1 w-[60px]">
                <Dialog>
                  <DialogTrigger
                    className="bg-yellow-400 hover:bg-yellow-500  flex items-center justify-center"
                    onClick={() => {
                      defaultValue(
                        item.position,
                        item.company,
                        item.type,
                        item.description,
                        item.start_month,
                        item.start_year,
                        item.end_month,
                        item.end_year,
                        item.working_here
                      );
                      setEditExperienceId(item.id);
                      setWorkingStatus(item.working_here);
                    }}
                  >
                    {editIcon}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="mb-4">Experience</DialogTitle>
                      <DialogDescription>
                        <Form {...formEdit}>
                          <form
                            onSubmit={formEdit.handleSubmit(handleEdit)}
                            className="space-y-4"
                          >
                            <FormField
                              control={formEdit.control}
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
                                control={formEdit.control}
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
                                control={formEdit.control}
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
                                        <SelectItem value="contract">
                                          Contract
                                        </SelectItem>
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
                                control={formEdit.control}
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
                                control={formEdit.control}
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
                              control={formEdit.control}
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
                                    <FormLabel>
                                      I currently working here
                                    </FormLabel>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {!workingStatus ? (
                              <div className="grid grid-cols-2 gap-2">
                                <FormField
                                  control={formEdit.control}
                                  name="end_month"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>End month</FormLabel>
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
                                            <SelectItem
                                              key={index}
                                              value={item}
                                            >
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
                                  control={formEdit.control}
                                  name="end_year"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>End year</FormLabel>
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
                            ) : null}

                            <FormField
                              control={formEdit.control}
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
          ))
        ) : (
          <small className="text-center">no experience added</small>
        )}
      </div>
    </>
  );
}
