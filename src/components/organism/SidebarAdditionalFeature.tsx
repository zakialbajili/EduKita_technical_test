import { Calendar } from "../ui/calendar";
export default function SidebarAdditionalFeature() {
  return (
    <aside className="hidden min-h-screen w-[30%] border-l-2 h-full lg:flex justify-center py-10">
      <Calendar mode="single" className="rounded-md border h-fit w-fit z-0" />
    </aside>
  );
}
