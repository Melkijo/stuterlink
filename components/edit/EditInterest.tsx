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

import { Input } from "@/components/ui/input";

import { editIcon, trashIcon } from "@/components/icons";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { set } from "lodash";
import { toast } from "sonner";

const formSchema = z.object({
  interest: z.string().min(1, {
    message: "at least 1 character.",
  }),
});

async function addInterest(
  newInterest: string,
  interest: string[] | undefined,
  userId: any
) {
  // Ensure interest is an array
  const interestArray = Array.isArray(interest) ? interest : [];

  // Add the new interest to the array
  const interestData = [...interestArray, newInterest];
  console.log(interestData);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_data")
    .update({ interests: interestData })
    .eq("id", userId)
    .select();
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
}

interface EditInterestProps {
  interestList: string[]; // Replace with your actual social media object type
  userId: number; // Assuming userId is a number, adjust if it's a different type
}

async function deleteInterest(
  interest: string,
  interestList: string[] | undefined,
  userId: number
) {
  // Ensure interest is an array
  const interestArray = Array.isArray(interestList) ? interestList : [];

  // Remove the interest from the array
  const interestData = interestArray.filter((item) => item !== interest);
  console.log(interestData);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_data")
    .update({ interests: interestData })
    .eq("id", userId)
    .select();
  if (error) {
    console.error(error);
    return;
  }
  console.log("Interest Updated");
  return;
}

async function getUserInterest(userId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_data")
    .select("interests")
    .eq("id", userId);
  if (error) {
    console.error("Error fetching authenticated user:", error);
    return null;
  }

  return data;
}

export default function EditInterest(props: EditInterestProps) {
  const [interest, setInterest] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: "",
    },
  });

  useEffect(() => {
    getUserInterest(props.userId).then((data) => {
      if (data) {
        setInterest(data[0].interests);
      }
    });
  }, [onSubmit, handleDelete]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await addInterest(values.interest, interest, props.userId);
      toast("Interest added", {
        description: "Your interest has been added successfully",
      });
    } catch (error) {
      console.error("Error adding interest:", error);
      toast("Error", {
        description: "There was an error adding your interest.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
    interest: string,
    interestList: string[] | undefined,
    userId: any
  ) {
    try {
      await deleteInterest(interest, interestList, userId);
      toast("Interest deleted", {
        description: "Your interest has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting interest:", error);
      toast("Error", {
        description: "There was an error deleting your interest.",
      });
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
            <DialogTitle>Add new interest</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormControl>
                          <Input
                            placeholder="frontend web, backend, cloud...."
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
      <div>
        <div className="flex gap-2 flex-wrap items-center mt-4">
          {interest.map((item, index) => (
            <div
              key={index}
              className=" ps-2 min-h-[50px] overflow-hidden bg-white  flex  justify-between w-full rounded-lg"
            >
              <p className="text-base flex items-center">{item}</p>
              <Button
                variant="none"
                size="none"
                className=" w-[70px]   bg-red-400  hover:bg-red-500  rounded-none"
                onClick={() => handleDelete(item, interest, props.userId)}
              >
                {trashIcon}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
