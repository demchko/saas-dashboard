"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "../../../public/logo.png";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const NavBar = () => {
  const { setTheme } = useTheme();
  return (
    <div className="w-full py-4 flex justify-between items-center ">
      <div className="flex gap-4 items-center">
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <Link href="/" className="text-2xl font-bold">
          SaaS<span className="text-primary">Dashboard</span>
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};
