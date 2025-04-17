import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(3, "At least 3 symbols"),
  location: z.string().min(3, "At least 3 symbols"),
  about: z.string().min(10, "More about your company"),
  logo: z.string().min(1, "Upload the photo"),
  website: z.string().url("Enter the valid url form"),
  xAccount: z.string().optional()
})

export const seekerSchema = z.object({
  name: z.string().min(4, "At least 4 symbols"),
  about: z.string().min(10, "At least 10 symbols"),
  resume: z.string().min(1, "Please upload the resume")
})

export const postJobSchema = z.object({
  title: z.string().min(4, "At least 4 symb"),
  type: z.string().min(1, "At least 1 symbol"),
  location: z.string().min(3, "At least 3 symbols"),
  salaryFrom: z.number().min(1, "Salary is required"),
  salaryTo: z.number().min(1, "Salary required"),
  description: z.string().min(10, "Desrciption min 10 symbols")
})