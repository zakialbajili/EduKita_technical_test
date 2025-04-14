"use client"
import Loading from "@/components/atoms/loading";
import DetailAssignment from "@/components/molecules/detailAssignment";
import Navbar from "@/components/organism/Navbar";
import SidebarAdditionalFeature from "@/components/organism/SidebarAdditionalFeature";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const student = searchParams.get('student')
  if(!id || !student){
    return <Loading />
  }
  return (
    <>
      <Navbar />
      <main className="flex h-full min-h-screen">
        <DetailAssignment studentId={Number(student)} assignmentId={Number(id)}/>
        <SidebarAdditionalFeature />
      </main>
    </>
  );
}
