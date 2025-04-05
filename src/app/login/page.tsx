import Image from "next/image";
import Logo from "../../../public/logo.png";
import Link from "next/link";
import { LoginForm } from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-4">
      <Link href="/">
        <div className="flex gap-4 items-center">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold">
            SaaS<span className="text-primary">Dashboard</span>
          </h1>
        </div>
      </Link>
      <LoginForm />
    </div>
  );
}
