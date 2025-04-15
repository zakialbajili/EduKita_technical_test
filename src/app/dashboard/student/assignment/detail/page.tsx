import { Suspense } from "react";
import Loading from "@/components/atoms/loading";
import AssignmentPageClient from "@/components/organism/AssignmentDetailClilent";


export default function AssignmentDetailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AssignmentPageClient />
    </Suspense>
  );
}
