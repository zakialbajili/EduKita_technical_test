"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import Swal from "sweetalert2";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import fetchAssignment from "@/lib/fetch/fetchAssignment";
import { payloadAssignment } from "@/lib/types/assignmentTypes";

const queryClient = new QueryClient();

const formSchema = z.object({
  subject: z.enum(["ENGLISH", "MATEMATHIC"], {
    required_error: "Subject is required",
    invalid_type_error: "Subject must be either 'english' or 'matemathic'",
  }),
  title: z.string().min(2, { message: "Title must filled" }),
  content: z.string().min(2, { message: "Content must filled" }),
});
const TemplateFormAddAssignment = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "ENGLISH",
      title: "",
      content: "",
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: payloadAssignment) => {
      const response = await fetchAssignment.sendAssignment(data);
      console.log("ini reponse api", response);
      return response;
    },
    onSuccess: (data) => {
      const userRole = data?.results?.role;
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login successful",
        timer: 1500,
        showConfirmButton: false,
      });

      if (userRole === "TEACHER") {
        window.location.href = "/dashboard/teacher";
      } else if (userRole === "STUDENT") {
        window.location.href = "/dashboard/student";
      }
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Error occured when login.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const {subject, title, content} = values
    const accessToken = sessionStorage.getItem("accessToken")
    if(accessToken){
        const dataUser = JSON.parse(accessToken)
        const studentId = dataUser.results.id
        const payload = {subject, title, content, studentId}
        mutation.mutate(payload);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENGLISH">ENGLISH</SelectItem>
                    <SelectItem value="MATEMATHIC">MATEMATHIC</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-accent-green">
          Submit
        </Button>
      </form>
    </Form>
  );
};
const FormAddAssignment = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TemplateFormAddAssignment />
    </QueryClientProvider>
  );
};
export default FormAddAssignment;
