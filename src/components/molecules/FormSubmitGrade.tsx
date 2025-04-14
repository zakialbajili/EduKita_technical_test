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
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { z } from "zod";
import { payloadGrades } from "@/lib/types/gradesTypes";
import fetchGrades from "@/lib/fetch/fetchGrades";

const formSchema = z.object({
  grade: z.string().regex(/^[1-9]\d*$/, { message: "Grades must number" }),
  feedback: z.string().min(2, { message: "Content must filled" }),
});
interface propsFormSubmitGrades {
  assignmentId: number;
}
const FormSubmitGrade: React.FC<propsFormSubmitGrades> = ({ assignmentId }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grade: "",
      feedback: "",
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: payloadGrades) => {
      const response = await fetchGrades.submitGrades(data);
      console.log("ini reponse api", response);
      return response;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Submit grade & feedback successful",
        timer: 1500,
        showConfirmButton: false,
      });
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        const dataUser = JSON.parse(accessToken);
        const userRole = dataUser.results?.role;
        if (userRole === "TEACHER") {
          window.location.href = "/dashboard/teacher/assignment";
        } else if (userRole === "STUDENT") {
          window.location.href = "/dashboard/student/assignment";
        }
      }
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Error occured when submit grade & feedback .",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { grade, feedback } = values;
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      const dataUser = JSON.parse(accessToken);
      const userId = dataUser.results.id;
      const payload = {
        grade: Number(grade),
        feedback,
        teacherId: userId,
        assignmentId,
      };
      mutation.mutate(payload);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input placeholder="Enter your grade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your feedback" {...field} />
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
export default FormSubmitGrade;
