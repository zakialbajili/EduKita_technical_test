//import Image from "next/image";

import Navbar from "@/components/organism/Navbar";
import SidebarAdditionalFeature from "@/components/organism/SidebarAdditionalFeature";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="w-full h-[200vh]">
      <Navbar />
      <main className=" flex h-full bmin-h-screen">
        <div className="flex-grow w-full p-4 lg:p-6">
          <Tabs defaultValue="english">
            <TabsList>
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="mathematic">Mathematic</TabsTrigger>
            </TabsList>
            <TabsContent value="english">English</TabsContent>
            <TabsContent value="mathematic">Mathematic</TabsContent>
          </Tabs>
        </div>
        <SidebarAdditionalFeature/>
      </main>
    </div>
  );
}
