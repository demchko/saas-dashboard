"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postJobSchema } from "@/app/utils/schemas";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select";
import { countryList } from "@/app/utils/countriesList";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";
import { SalaryRange } from "../custom/SalaryRange";
import { Button } from "../ui/button";
import { SubmitButton } from "../custom/SubmitButton";
import { Loader2, Send } from "lucide-react";
import { createJobPost } from "@/app/actions";
import { useState } from "react";

const employmentType = [
  { value: "full", label: "Full Time" },
  { value: "part", label: "Part Time" }
]

export const CreateJobForm = () => {
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof postJobSchema>>({
    resolver: zodResolver(postJobSchema), defaultValues: {
      title: "",
      type: ""
    }
  });

  async function submitForm(val: z.infer<typeof postJobSchema>) {
    try {
      setPending(true);
      await createJobPost(val);
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form} >
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(submitForm)} >
        <div className="grid grid-cols-2 gap-4" >
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem className="col-span-1" >
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="type" render={({ field }) => (
            <FormItem className="col-span-1" >
              <FormLabel>Employment Type</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange} >
                <FormControl>
                  <SelectTrigger className="w-full" >
                    <SelectValue placeholder="Choose employment type..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Employment Type</SelectLabel>
                    {employmentType.map(item => (
                      <SelectItem key={item.value} value={item.value} >{item.label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="grid grid-cols-2 gap-4" >
          <FormField control={form.control} name="location" render={({ field }) => (
            <FormItem className="col-span-1" >
              <FormLabel>Job Location</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange} >
                <FormControl>
                  <SelectTrigger className="w-full" >
                    <SelectValue placeholder="Choose location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>WorlWide</SelectLabel>
                    <SelectItem value="remote" >Remote</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Location</SelectLabel>
                    {countryList.map(item => (
                      <SelectItem key={item.code} value={item.name} >
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
          <FormItem className="col-span-1" >
            <FormLabel>Salary</FormLabel>
            <FormControl>
              <SalaryRange control={form.control} />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter description for your job..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button disabled={pending} >
          {
            pending
              ? <><Loader2 className="animate-spin" /> Submitting</>
              : <> <Send /> Submit</>
          }
        </Button>
      </form>
    </Form>
  )
}