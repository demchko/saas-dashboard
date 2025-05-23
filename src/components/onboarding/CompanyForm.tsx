import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { companySchema } from "@/app/utils/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { ArrowBigLeft, ArrowBigRight, XIcon } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { countryList } from "@/app/utils/countriesList"
import { Textarea } from "../ui/textarea"
import { UploadDropzone } from "../custom/UploadButton"
import { createCompany } from "@/app/actions"
import { useState } from "react"
import Image from "next/image"

export const CompanyForm = ({ backToType }: { backToType: () => void }) => {
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema), defaultValues: {
      name: "",
      location: "",
      website: "",
      about: "",
      xAccount: "",
      logo: ""
    }
  })

  const [pending, setPending] = useState(false)

  async function onSubmit(val: z.infer<typeof companySchema>) {
    try {
      setPending(true);
      await createCompany(val)
    } catch (error) {
      console.log(error)
    } finally {
      setPending(false);
    }
  }

  return (
    <div >
      <Form {...form} >
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)} >
          <div className="grid grid-cols-2 gap-4" >
            <FormField control={form.control} name="name" render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>)} />
            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select defaultValue={field.value} onValueChange={field.onChange} >
                  <FormControl>
                    <SelectTrigger className="w-full" >
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>WorldWide</SelectLabel>
                      <SelectItem value="worldwide" >Remote</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Location</SelectLabel>
                      {countryList.map(item => (
                        <SelectItem value={item.name} key={item.code} >
                          <span>{item.flagEmoji}</span>
                          <span>{item.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="grid grid-cols-2 gap-4" >
            <FormField control={form.control} name="website" render={({ field }) => (
              <FormItem>
                <FormLabel>WebSite</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="xAccount" render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter(X) Account</FormLabel>
                <FormControl>
                  <Input placeholder="@yourcompanyname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="about" render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description about your company" className="max-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="logo" render={({ field }) => (
            <FormItem>
              <FormLabel>Company Logo</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="w-fit relative" >
                    <Image src={field.value} alt="Logo" width={100} height={100} className="rounded-lg object-fill" />
                    <Button className="absolute right-0 top-0" size="icon" variant="destructive" onClick={() => field.onChange("")} ><XIcon className="size-4" /></Button>
                  </div>
                ) : <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) => {
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