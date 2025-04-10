import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { seekerSchema } from "@/app/utils/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { ArrowBigLeft, ArrowBigRight } from "lucide-react"
import { Textarea } from "../ui/textarea"

export const SeekerForm = ({ backToType }: { backToType: () => void }) => {
  const form = useForm<z.infer<typeof seekerSchema>>({
    resolver: zodResolver(seekerSchema), defaultValues: {
      name: "",
      about: "",
      resume: ""
    }
  })

  function onSubmit(val: z.infer<typeof seekerSchema>) {
    console.log(val);
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
          <div className="flex gap-4 items-center" >
            <Button className="w-1/2 cursor-pointer" variant="outline" type="button" onClick={backToType} ><ArrowBigLeft /> Cancel</Button>
            <Button type="submit" className="w-1/2 cursor-pointer" >Continue <ArrowBigRight /></Button>
          </div>
        </form>
      </Form>
    </div>
  )
}