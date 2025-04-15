//import Image from "next/image";

import ListAssignment from "@/components/organism/ListAssignment";
import Navbar from "@/components/organism/Navbar";
import SidebarAdditionalFeature from "@/components/organism/SidebarAdditionalFeature";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="w-full H-[100vh]]">
      <Navbar />
      <main className="flex h-full items-stretch">
        <div className="flex-grow h-full w-full p-4 lg:p-6">
          <Tabs defaultValue="all" className="h-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="ENGLISH">English</TabsTrigger>
              <TabsTrigger value="MATEMATHIC">Mathematic</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ListAssignment scope="teacher"/>
            </TabsContent>
            <TabsContent value="ENGLISH">
              <ListAssignment scope="teacher" type="subject" subject="ENGLISH" />
            </TabsContent>
            <TabsContent value="MATEMATHIC">
              <ListAssignment scope="teacher" type="subject" subject="MATEMATHIC" />
            </TabsContent>
          </Tabs>
        </div>
        <SidebarAdditionalFeature />
      </main>
    </div>
  );
}
