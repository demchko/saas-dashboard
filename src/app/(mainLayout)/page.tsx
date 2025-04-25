import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "../utils/prisma";
import { Button } from "@/components/ui/button";
import { MapPin, XIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

async function getData() {
  const data = await prisma.jobPost.findMany({
    select: {
      title: true,
      type: true,
      Company: true,
      salaryFrom: true,
      salaryTo: true,
      description: true,
      location: true
    }
  });
  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4" >
      <Card className="col-span-1 flex" >
        <CardHeader>
          <CardTitle className="flex justify-between items-center" >
            <p className="text-2xl" >Filters</p>
            <Button variant="destructive" className="cursor-pointer" >Clear all <XIcon /></Button>
          </CardTitle>
        </CardHeader>
      </Card>
      {
        data.length
          ? (
            <div className="col-span-2 flex flex-col gap-4" >
              {
                data.map(item => (
                  <Card key={item.title} className="cursor-pointer" >
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center" >
                        <div className="flex gap-4 items-center" >
                          <Image src={item.Company?.logo} alt="Logo" width={60} height={60} className="rounded-lg" />
                          <div>
                            <p className="text-2xl" >{item.title}</p>
                            <div className="flex gap-4 text-sm text-gray-400" >
                              <p >{item.Company?.name}</p>
                              <Badge variant="secondary" >{item.type}-time</Badge>
                              <Badge>{item.location}</Badge>
                              <p>${item.salaryFrom}-${item.salaryTo}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 items-center" >
                          <MapPin />
                          <p>{item.location}</p>
                        </div>
                      </CardTitle>
                      <CardContent className="p-0" >
                        <CardDescription>
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </CardHeader>
                  </Card>
                ))
              }
            </div>
          )
          : <>No data</>
      }
    </div>
  )
}
