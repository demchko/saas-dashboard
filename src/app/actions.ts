"use server";

import { z } from "zod";
import { companySchema, postJobSchema, seekerSchema } from "./utils/schemas";
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

export async function createJobPost(val: z.infer<typeof postJobSchema>) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/");
  }
  const validData = postJobSchema.parse(val);
  const company = await prisma.company.findUnique({
    where: {
      userId: session.user.id
    },
    select: {
      name: true,
      id: true
    }
  })
  if (!company?.id) {
    redirect("/");
  }
  await prisma.jobPost.create({
    data: {
      companyId: company.id,
      title: validData.title,
      description: validData.description,
      salaryFrom: validData.salaryFrom,
      salaryTo: validData.salaryTo,
      type: validData.type,
      location: validData.location
    }
  })
  redirect("/");
}

export async function createSeekerAc(val: z.infer<typeof seekerSchema>) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }

  const validData = seekerSchema.parse(val);

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      onBoardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: {
          ...validData
        }
      }
    }
  })

  return redirect("/");
}