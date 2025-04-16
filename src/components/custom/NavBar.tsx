import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import Logo from "../../../public/logo.png";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, Heart, Layers2 } from "lucide-react";

export async function NavBar() {
  const session = await auth();
  return (
    <div className="w-full py-4 flex justify-between items-center ">
      <div className="flex gap-4 items-center">
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <Link href="/" className="text-2xl font-bold">
          SaaS<span className="text-primary">Dashboard</span>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        <Link href="/post-job" className={cn(buttonVariants())} >
          Post Job
        </Link>
        {session?.user ? (
          <UserDropdown name={session.user.name as string} email={session.user.email as string} image={session.user.image as string} />
        ) : (
          <Link href="/login" className={cn(buttonVariants())}>
            Login
          </Link>
        )}
      </div>
    </div >
  );
}

interface IUserDropdown {
  name: string;
  email: string;
  image: string;
}

const UserDropdown = ({ name, email, image }: IUserDropdown) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer" >
        <Image
          className="rounded-full"
          src={
            image ||
            "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
          }
          alt="logo"
          width={40}
          height={40}
        />
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-col" >{name} <span className="text-xs text-gray-500" >{email}</span></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Heart />
          Favourites
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Layers2 />
          Jobs list
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button className="cursor-pointer w-full" >Logout</Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}