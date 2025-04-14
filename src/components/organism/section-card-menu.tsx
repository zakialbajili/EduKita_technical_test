import { cn } from "@/lib/utils";
import React from "react";

interface SectionCardMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

const SectionCardMenu = ({ className, children, ...props }: SectionCardMenuProps) => {
  return (
    <div 
    className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-5 p-4 lg:p-6",
        className
    )} {...props}>
      {children}
    </div>
  );
};

export default SectionCardMenu;
