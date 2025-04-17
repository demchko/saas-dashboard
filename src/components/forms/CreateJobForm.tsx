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

const employmentType = [
  { value: "full", label: "Full Time" },
  { value: "part", label: "Part Time" }
]

export const CreateJobForm = () => {
  const form = useForm<z.infer<typeof postJobSchema>>({
    resolver: zodResolver(postJobSchema), defaultValues: {
      title: "",
      type: ""
    }
  });
  return (
    <Form {...form} >
      <form className="flex flex-col gap-4" >
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
          {/* ##### NEED TO ADD CORRECT FIELD FORM CONTROL */}
          <FormField control={form.control} name="type" render={({ field }) => (
            <FormItem className="col-span-1" >
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Slider
                  min={300}
                  max={10000}
                  // step={step}
                  // value={range}
                  // onValueChange={handleRangeChange}
                  className="py-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter description for your job..." />
            </FormControl>
          </FormItem>
        )} />
      </form>
    </Form>
  )
}