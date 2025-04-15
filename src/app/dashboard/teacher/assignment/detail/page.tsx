import { Suspense } from "react";
import Loading from "@/components/atoms/loading";
import AssignmentPageTeacher from "@/components/organism/AssignmentDetailTeacher";


export default function AssignmentDetailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AssignmentPageTeacher />
    </Suspense>
  );
}
