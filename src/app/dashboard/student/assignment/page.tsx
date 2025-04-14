import ModalAddAssignment from "@/components/organism/ModalAddAssignment";
import Navbar from "@/components/organism/Navbar";
import SidebarAdditionalFeature from "@/components/organism/SidebarAdditionalFeature";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="w-full h-[200vh]">
      <Navbar />
      <main className=" flex h-full bmin-h-screen">
        <div className="flex-grow w-[70%] w-full p-4 lg:p-6 relative">
          <Tabs defaultValue="send">
            <TabsList>
              <TabsTrigger value="send">Send</TabsTrigger>
              <TabsTrigger value="result">Result</TabsTrigger>
            </TabsList>
            <TabsContent value="send">
              <div className="w-full">
                <div className="flex justify-end">
                  <ModalAddAssignment />
                </div>
                <p>Send</p>
              </div>
            </TabsContent>
            <TabsContent value="result">Result</TabsContent>
          </Tabs>
        </div>
        <SidebarAdditionalFeature />
      </main>
    </div>
  );
}
