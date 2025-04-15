"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import fetchAuth from "@/lib/fetch/fetchAuth";
import { registerPayload } from "@/lib/types/authTypes";
import Swal from "sweetalert2";
import Link from "next/link";

enum UserRole {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

const queryClient = new QueryClient();
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must filled" }),
  email: z.string().min(2, { message: "Email must filled" }),
  password: z.string().min(2, { message: "Password must filled" }),
});
function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: registerPayload) => {
      const response = await fetchAuth.fetchRegistUser(data);
      return response;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Register successful",
        timer: 1500,
        showConfirmButton: false,
      });
      window.location.href = "/auth/login";
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Error occured when Register.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: UserRole.STUDENT,
    };
    mutation.mutate(payload);
  }
  return (
    <main className="w-full h-screen flex justify-center items-center bg-accent-green">
      <div className="min-h-fit w-fit md:min-w-[300px] max-w-[80%] px-4 py-6 flex flex-col items-center gap-4 bg-gray-200 rounded-lg shadow-lg">
        <Image
          src={"/assets/images/logo_edukita.png"}
          alt="Logo Edukita"
          width={80}
          height={60}
          className="w-20 h-auto object-content"
        />
        <h1 className="text-xl font-bold text-gray-900">Register</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Name</FormLabel>
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
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                  <FormLabel className="text-black">Password</FormLabel>
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
        <div className="text-xs">Do you have account? <Link href={"/auth/register"} className="text-accent-green underline">Login</Link></div>
      </div>
    </main>
  );
}
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RegisterPage />
    </QueryClientProvider>
  );
};
export default App;
