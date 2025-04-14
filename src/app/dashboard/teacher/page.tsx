import CardMenu from "@/components/molecules/card-menu";
import Navbar from "@/components/organism/Navbar";
import SectionCardMenu from "@/components/organism/section-card-menu";
import SidebarAdditionalFeature from "@/components/organism/SidebarAdditionalFeature";
// import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex h-full min-h-screen">
        <SectionCardMenu>
          <CardMenu
            href="/dashboard/teacher/assignment"
            urlIcon="/assets/images/task_icon.png"
            title="Manage Assignment"
          />
        </SectionCardMenu>
        <SidebarAdditionalFeature />
      </main>
    </>
  );
}
