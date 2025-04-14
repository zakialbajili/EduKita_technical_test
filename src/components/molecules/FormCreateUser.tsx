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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { registerPayload } from "@/lib/types/authTypes";
import fetchAuth from "@/lib/fetch/fetchAuth";

const queryClient = new QueryClient();

const formSchema = z.object({
  role: z.enum(["STUDENT", "TEACHER"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be either 'STUDENT' or 'TEACHER'",
  }),
  name: z.string().min(2, { message: "Name must filled" }),
  email: z.string().min(2, { message: "Email must filled" }),
  password: z.string().min(2, { message: "Password must filled" }),
});
const TemplateCreateUser = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "STUDENT",
      name: "",
      email: "",
      password:""
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: registerPayload) => {
      const response = await fetchAuth.fetchRegistUser(data);
      console.log("ini reponse api", response);
      return response;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Create user successful",
        timer: 1500,
        showConfirmButton: false,
      });
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const dataUser = JSON.parse(accessToken);
        const userRole = dataUser.results?.role;
        if (userRole === "TEACHER") {
          window.location.href = "/dashboard/teacher";
        }
      }
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Error occured create user",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  defaultValue="STUDENT"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STUDENT">STUDENT</SelectItem>
                    <SelectItem value="TEACHER">TEACHER</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
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
const FormCreateUser = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4 border-2 rounded-lg shadow-lg">
        <TemplateCreateUser />
      </div>
    </QueryClientProvider>
  );
};
export default FormCreateUser;
