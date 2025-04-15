"use client";
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
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Swal from "sweetalert2";

export default function Navbar() {
  const [dataUser, setDatauser] = useState<credentialUser | null>(null);
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      setDatauser(JSON.parse(accessToken));
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "You not have persmission, please login again!",
        timer: 1500,
        showConfirmButton: false,
      });
      window.location.href="/auth/login"
    }
  }, []);
  const handleLogout = () => {
    if (dataUser) {
      sessionStorage.removeItem("accessToken");
      window.location.href = "/";
    }
  };
  return (
    <header className="flex justify-around p-4 shadow-xl items-center sticky top-0 bg-background dark:bg-[#01522f] z-30">
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
              <Link
                href={`${
                  dataUser?.results?.role === "TEACHER"
                    ? "/dashboard/teacher"
                    : "/dashboard/student"
                }`}
                passHref
                className="dark:hover:bg-gray-700/50"
              >
                Dashboard
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-3 items-center">
        <ModeToggle />
        {dataUser ? (
          <div className="flex gap-2 items-center">
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-fit dark:bg-gray-700/50">
                <Button
                  className="w-fit py-2 px-5 bg-accent-green rounded text-white font-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
            <p className="hidden md:block">{dataUser?.results?.name}</p>
          </div>
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
