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