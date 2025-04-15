import { redirect } from "next/navigation";
import { auth } from "../utils/auth"
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import { OnBoardingForm } from "@/components/forms/OnBoardingForm";
import { prisma } from "../utils/prisma";

async function checkIfOnboardingCompleted(userId: string | undefined) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      onBoardingCompleted: true
    }
  });
  if (user?.onBoardingCompleted === true) {
    redirect("/");
  }
}

export default async function OnBoarding() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  await checkIfOnboardingCompleted(session.user.id);
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
      <OnBoardingForm name={session?.user.name} />
    </div>
  )
}