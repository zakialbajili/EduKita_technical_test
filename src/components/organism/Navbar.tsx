"use client"
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Image from "next/image";
import { ModeToggle } from "../atoms/mode-toggle";
import { useEffect, useState } from "react";
import { credentialUser } from "@/lib/types/authTypes";

export default function Navbar() {
  const [dataUser, setDatauser] = useState<credentialUser | null>(null);
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      setDatauser(JSON.parse(accessToken));
    }
  },[]);
  return (
    <header className="flex justify-around p-4 shadow-xl items-center sticky top-0 bg-background dark:bg-accent-green/50 z-30">
      <Link href={"/"}>
        <Image
          src={"/assets/images/logo_edukita.png"}
          alt="Logo Edukita"
          width={40}
          height={40}
          className="h-fit w-fit rounded-lg"
        />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/docs" passHref>
                Documentation
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-3 items-center">
        <ModeToggle />
        {dataUser ? (
          <Link
          href={"/"}
          className="py-2 px-5 bg-accent-green rounded text-white font-semibold"
        >
          Logout
        </Link>
        ) : (
          <Link
            href={"/"}
            className="py-2 px-5 bg-accent-green rounded text-white font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
