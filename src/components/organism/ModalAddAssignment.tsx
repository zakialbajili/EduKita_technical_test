import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import FormAddAssignment from "./FormAddAssignment";

const ModalAddAssignment = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-3 font-semibold rounded-lg dark:text-white">
          <Plus />
          <span>Add Assignment</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex flex-col justify-center items-center">
          <DialogTitle>Add Assignment</DialogTitle>
          <DialogDescription>Fill in the details of the assignment to be sent</DialogDescription>
        </DialogHeader>
        <FormAddAssignment/>
      </DialogContent>
    </Dialog>
  );
};
export default ModalAddAssignment;
