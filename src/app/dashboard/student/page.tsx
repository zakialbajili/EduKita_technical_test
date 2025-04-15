import CardMenu from "@/components/molecules/card-menu";
import Navbar from "@/components/organism/Navbar";
import SectionCardMenu from "@/components/organism/section-card-menu";
import SidebarAdditionalFeature from "@/components/organism/SidebarAdditionalFeature";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex h-full min-h-screen">
        <SectionCardMenu>
          <CardMenu
            href="/dashboard/student/assignment"
            urlIcon="/assets/images/task_icon.png"
            title="Manage Assignment"
          />
        </SectionCardMenu>
        <SidebarAdditionalFeature />
      </main>
    </>
  );
}
