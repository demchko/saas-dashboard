"use server";

import { z } from "zod";
import { companySchema } from "./utils/schemas";
import { auth } from "./utils/auth";
import { redirect } from "next/navigation";
import { prisma } from "./utils/prisma";

export async function createCompany(val: z.infer<typeof companySchema>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const validData = companySchema.parse(val);
  await prisma.user.update({
    where: {
      id: session?.user.id
    },
    data: {
      onBoardingCompleted: true,
      userType: "COMPANY",
      company: {
        create: {
          ...validData
        }
      }
    }
  })

  return redirect("/")
}