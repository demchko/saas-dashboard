import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { seekerSchema } from "@/app/utils/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { ArrowBigLeft, ArrowBigRight, XIcon } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { UploadDropzone } from "../custom/UploadButton"
import Image from "next/image"
import PdfSrc from "../../../public/pdf.png";
import { createSeekerAc } from "@/app/actions"
import { useState } from "react"

export const SeekerForm = ({ backToType }: { backToType: () => void }) => {
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof seekerSchema>>({
    resolver: zodResolver(seekerSchema), defaultValues: {
      name: "",
      about: "",
      resume: ""
    }
  })

  async function onSubmit(val: z.infer<typeof seekerSchema>) {
    try {
      setPending(true);
      await createSeekerAc(val);
    } catch (error) {
      console.log(error)
    }
    finally {
      setPending(false);
    }
  }

  return (
    <div>
      <Form {...form} >
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)} >
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem >
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your fill name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="about" render={({ field }) => (
            <FormItem>
              <FormLabel>About you</FormLabel>
              <FormControl>
                <Textarea className="max-h-[200px]" {...field} placeholder="Enter short about you" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="resume" render={({ field }) => (
            <FormItem>
              <FormLabel>About you</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="w-fit relative" >
                    <Image src={PdfSrc} alt="Logo" width={100} height={100} className="rounded-lg object-fill" />
                    <Button className="absolute right-0 top-0" size="icon" variant="destructive" onClick={() => field.onChange("")} ><XIcon className="size-4" /></Button>
                  </div>
                ) : <UploadDropzone endpoint="resumeUploader" onClientUploadComplete={(res) => {
                  field.onChange(res[0].url);
                }} />}
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="flex gap-4 items-center" >
            <Button className="w-1/2 cursor-pointer" variant="outline" type="button" onClick={backToType} ><ArrowBigLeft /> Cancel</Button>
            <Button type="submit" className="w-1/2 cursor-pointer" disabled={pending}>{pending ? "Submitting" : <>Continue <ArrowBigRight /></>}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}