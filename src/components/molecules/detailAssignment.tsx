import api from "@/axios/config";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React from "react";
import Loading from "../atoms/loading";
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DetailAssignmentResponse } from "@/lib/types/assignmentTypes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import FormSubmitGrade from "./FormSubmitGrade";

interface propsDetailAssignment {
  studentId: number;
  assignmentId: number;
  scope?: "student" | "teacher";
}

const queryClient = new QueryClient();
const TemplateDetailAssignment: React.FC<propsDetailAssignment> = ({
  studentId,
  assignmentId,
  scope = "teacher",
}) => {
  const fetchAPIDetailAssignment =
    async (): Promise<DetailAssignmentResponse> => {
      console.log(studentId, assignmentId);
      const { data } = await api.get(
        `/assignments?student=${studentId}&assignment=${assignmentId}`
      );
      console.log(data);
      return data;
    };
  const {
    data: detailAssignment,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["detailAssignment"],
    queryFn: fetchAPIDetailAssignment,
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Error occured when request data detail assignment.",
      timer: 1500,
      showConfirmButton: false,
    });
  }
  return (
    <article className="w-full min-h-screen flex flex-col gap-4 h-full p-4 lg:p-6">
      {detailAssignment && detailAssignment.results && (
        <Card className="w-full dark:bg-gray-700/50">
          <CardHeader>
            <CardTitle>{detailAssignment.results.title}</CardTitle>
            <CardDescription>
              {detailAssignment.results.subject}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{detailAssignment.results.content}</p>
          </CardContent>
          <CardFooter className="">
            <Accordion
              type="single"
              collapsible
              className="w-full shadow-lg p-3 rounded-lg border-2"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="py-0">
                  <h4 className="text-lg">
                    {scope === "teacher" ? "Balas" : "Result"}
                  </h4>
                </AccordionTrigger>
                <AccordionContent className="py-5">
                    {scope === "teacher" &&
                        <FormSubmitGrade assignmentId={assignmentId} />
                    }
                    {scope === "student" &&
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <h4 className="font-semibold">Grade:</h4>
                                <p className={`${detailAssignment.results.grade>50? 'text-accent-green':'text-accent-red'} font-bold text-lg`}>{detailAssignment.results.grade}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4 className="font-semibold">Feedback:</h4>
                                <p className="dark:text-gray-300">{detailAssignment.results.feedback}</p>
                            </div>
                        </div>
                    }
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardFooter>
        </Card>
      )}
    </article>
  );
};
const DetailAssignment: React.FC<propsDetailAssignment> = ({
  studentId,
  assignmentId,
  scope = "teacher",
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TemplateDetailAssignment
        scope={scope}
        studentId={studentId}
        assignmentId={assignmentId}
      />
    </QueryClientProvider>
  );
};
export default DetailAssignment;
