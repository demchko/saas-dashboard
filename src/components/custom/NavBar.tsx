import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "../../../public/logo.png";
import Image from "next/image";

export const NavBar = () => {
  return (
    <div className="w-full py-2 flex justify-between items-center ">
      <div className="flex gap-4 items-center">
        <Image src={Logo} alt="Logo" width={40} height={40} />
        <Link href="/" className="text-2xl font-bold">
          Saas<span className="text-primary">Dashboard</span>
        </Link>
      </div>
      <Button>Login</Button>
    </div>
  );
};
