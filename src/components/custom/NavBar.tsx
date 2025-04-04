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
          Saas<span className="text-primary">Dashboard</span>
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
        <Button>Login</Button>
      </div>
    </div>
  );
};
