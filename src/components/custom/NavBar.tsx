import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import Logo from "../../../public/logo.png";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";
import { cn } from "@/lib/utils";
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
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        {session?.user ? (
          <>
            <Image
              className="rounded-full"
              src={
                session.user.image ||
                "https://png.pngtree.com/png-clipart/20200224/original/pngtree-cartoon-color-simple-male-avatar-png-image_5230557.jpg"
              }
              alt="logo"
              width={40}
              height={40}
            />
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button>Logout</Button>
            </form>
          </>
        ) : (
          <Link href="/login" className={cn(buttonVariants())}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
