"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {useMutation} from "@tanstack/react-query"
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
import { Input, PasswordInput } from "@/components/ui/input";
import fetchAuth from "@/lib/fetch/fetchAuth";
import { loginPayload } from "@/lib/types/authTypes";
import Swal from "sweetalert2"
const queryClient = new QueryClient();
const formSchema = z.object({
  email: z.string().min(2, {message: "Email must be at least 2 characters.",}),
  password:z.string().min(2, { message: "Password must be at least 2 characters" })
});

function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
  const mutation = useMutation({
    mutationFn: async (data: loginPayload) => {
      const response = await fetchAuth.fetchLoginUser(data);
      return response
    },
    onSuccess: (data) => {
      const userRole = data?.results?.role;
      sessionStorage.setItem('accessToken', JSON.stringify(data));
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
    mutation.mutate(values)
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
        <h1 className="text-xl font-bold text-gray-900">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
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
                    <PasswordInput placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent-green">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginPage />
    </QueryClientProvider>
  );
};
export default App