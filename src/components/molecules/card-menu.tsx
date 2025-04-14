import React from "react";
import Image from "next/image";
import Link from "next/link";
interface propsCardMenu {
    href:string;
    urlIcon?:string;
    title:string;
}
const CardMenu:React.FC<propsCardMenu> = ({href, urlIcon, title}) => {
    return(
          <Link
            href={href}
            className="h-fit w-full flex flex-wrap justify-center items-center gap-4 xl:flex-nowrap items-center p-6 bg-accent-green/70 dark:bg-gray-500/30 text-card-foreground rounded-xl border shadow-sm"
          >
            {urlIcon&&
            <Image
              src={urlIcon}
              alt="Menu Icon"
              width={100}
              height={60}
              className="w-20 h-auto object-contain"
            />
            }
            <h2 className="font-semibold text-lg text-white text-center">
                {title}
            </h2>
          </Link>
    )
}
export default CardMenu