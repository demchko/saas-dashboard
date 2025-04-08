import { Factory, User } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const OnBoardingForm = async ({ name }: { name: string | null | undefined }) => {
  return (
    <Card className="w-100">
      <CardHeader className="text-center">
        <CardTitle>Welcome, {name}</CardTitle>
        <CardDescription>Choose how wouuld you like to use our platform</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button className="h-auto gap-4 cursor-pointer py-4" >
          <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center" >
            <Factory className="min-w-6 min-h-6 max-w-6 max-h-6" />
          </div>
          <div className="text-left" >
            <p className="text-xl font-semibold">Company/Organization</p>
            <p>Post jobs and find talent</p>
          </div>
        </Button>
        <Button className="h-auto gap-4 cursor-pointer py-4" >
          <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center" >
            <User className="min-w-6 min-h-6 max-w-6 max-h-6" />
          </div>
          <div className="text-left" >
            <p className="text-xl font-semibold">Job Seeker</p>
            <p>Find your dream job opportunity</p>
          </div>
        </Button>
      </CardContent>
    </Card>
  )
}