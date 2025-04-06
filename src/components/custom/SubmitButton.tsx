"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface ISubmitButton {
  text: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  icon: ReactNode;
}

export const SubmitButton = ({ text, variant, icon }: ISubmitButton) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full cursor-pointer"
      disabled={pending}
      variant={variant}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Submitting
        </>
      ) : (
        <>
          {icon} {text}
        </>
      )}
    </Button>
  );
};
