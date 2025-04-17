import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyImg from "../../../../public/company.png";
import Image from "next/image";
import { CreateJobForm } from "@/components/forms/CreateJobForm";

export default function PostJob() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="col-span-2" >
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
          <CardDescription>Add information about job</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateJobForm />
        </CardContent>
      </Card>
      <Card className="col-span-1" >
        <CardHeader>
          <CardTitle>Trusted by Industry Leaders</CardTitle>
          <CardDescription>Join thousands of companies hiring top talent</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4" >
          <div className="flex items-center justify-between gap-4" >
            {Array(3).fill(null).map((_i, ind) => (
              <Image key={ind} alt="company" src={CompanyImg} width={100} height={80} className="transition-opacity opacity-75 hover:opacity-100 rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4" >
            {stats.map((item, ind) => (
              <div className="rounded-lg bg-muted p-4" key={ind} >
                <p className="text-2xl font-bold" >{item.value}</p>
                <p className="text-sm text-gray-400" >{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const stats = [
  { value: "10k+", label: "Monthly active job seekers" },
  { value: "48h", label: "Average time to hire" },
  { value: "95%", label: "Employer satisfaction rate" },
  { value: "500+", label: "Companies hiring monthly" },
];