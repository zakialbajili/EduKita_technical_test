import FormCreateUser from "@/components/molecules/FormCreateUser";
import Navbar from "@/components/organism/Navbar";
import SidebarAdditionalFeature from "@/components/organism/SidebarAdditionalFeature";

export default function Home() {
  return (
    <div className="w-full h-[200vh]">
      <Navbar />
      <main className=" flex h-full bmin-h-screen">
        <div className="flex-grow w-[70%] w-full p-4 lg:p-6">
          <FormCreateUser />
        </div>
        <SidebarAdditionalFeature />
      </main>
    </div>
  );
}
