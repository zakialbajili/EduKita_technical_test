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
            href="/dashboard/teacher/assignment"
            urlIcon="/assets/images/task_icon.png"
            title="Manage Assignment"
          />
          <CardMenu
            href="/dashboard/teacher/users"
            urlIcon="/assets/images/manage_student.png"
            title="Create User"
          />
        </SectionCardMenu>
        <SidebarAdditionalFeature />
      </main>
    </>
  );
}
