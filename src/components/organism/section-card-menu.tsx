import { cn } from "@/lib/utils";
import React from "react";


const SectionCardMenu = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
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
