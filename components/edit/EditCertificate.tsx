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
  certificateName: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  url: z.string().url(),
  yearPublished: z.number().int(),
  publishedBy: z.string(),
});
export default function EditCertificate({
  certificateList,
}: {
  certificateList: any[];
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
  const certificates = certificateList;
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
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="certificateName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="marketing certificate, web developer...."
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
                      name="yearPublished"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year published</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="publishedBy"
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
          <div className="ps-2 py-2">
            <div className="flex justify-between">
              <small>2020</small>
            </div>
            <h3 className="font-medium">Certificate 1</h3>
            <small>Google</small>
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
          <div className="ps-2 py-2">
            <div className="flex justify-between">
              <small>2020</small>
            </div>
            <h3 className="font-medium">Certificate 1</h3>
            <small>Google</small>
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
