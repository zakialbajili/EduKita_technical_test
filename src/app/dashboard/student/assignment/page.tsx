"use client";
import ListAssignment from "@/components/organism/ListAssignment";
import ModalAddAssignment from "@/components/organism/ModalAddAssignment";
import Navbar from "@/components/organism/Navbar";
import SidebarAdditionalFeature from "@/components/organism/SidebarAdditionalFeature";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { credentialUser } from "@/lib/types/authTypes";
import { useEffect, useState } from "react";

export default function Home() {
  const [dataUser, setDatauser] = useState<credentialUser | null>(null);
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      setDatauser(JSON.parse(accessToken));
    }
  }, []);
  return (
    <div className="w-full h-[200vh]">
      <Navbar />
      <main className=" flex h-full bmin-h-screen">
        <div className="flex-grow w-[70%] w-full p-4 lg:p-6 relative">
          {dataUser && (
            <Tabs defaultValue="send">
              <TabsList>
                <TabsTrigger value="send">Send</TabsTrigger>
                <TabsTrigger value="result">Graded</TabsTrigger>
              </TabsList>
              <TabsContent value="send">
                <div className="w-full flex flex-col gap-5">
                  <div className="flex justify-end">
                    <ModalAddAssignment />
                  </div>
                  <ListAssignment
                    scope="student"
                    studentTab="send"
                    studentId={dataUser?.results?.id}
                  />
                </div>
              </TabsContent>
              <TabsContent value="result">
                <ListAssignment
                  scope="student"
                  studentTab="result"
                  studentId={dataUser?.results?.id}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
        <SidebarAdditionalFeature />
      </main>
    </div>
  );
}
