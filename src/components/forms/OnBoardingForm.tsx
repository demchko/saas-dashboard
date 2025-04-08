"use client";
import { useState } from "react";
import { ChooseType } from "../onboarding/ChooseType"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { CompanyForm } from "../onboarding/CompanyForm";
import { SeekerForm } from "../onboarding/UserForm";

export const OnBoardingForm = ({ name }: { name: string | null | undefined }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<"company" | "user" | null>(null);

  const handleSelectType = (val: "company" | "user") => {
    setSelectedType(val);
    setStep(2);
  }

  const backToType = () => setStep(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ChooseType handleSelectType={handleSelectType} />
      case 2:
        return selectedType === "company" ? <CompanyForm backToType={backToType} /> : <SeekerForm backToType={backToType} />
    }
  }

  return (
    <Card className="w-100" >
      <CardHeader className="text-center">
        <CardTitle>Welcome, {name}</CardTitle>
        <CardDescription>Choose how would you like to use our platform</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4" >
        {renderStep()}
      </CardContent>
    </Card>
  )
}