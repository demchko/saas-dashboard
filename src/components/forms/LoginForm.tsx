import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/app/utils/auth";
import { SubmitButton } from "../custom/SubmitButton";
import { Github, Mail } from "lucide-react";

export const LoginForm = () => {
  return (
    <Card className="w-100">
      <CardHeader className="text-center">
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Login with Google or Github</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/" });
          }}
        >
          <SubmitButton
            icon={<Github />}
            text="Login with GitHub"
            variant="outline"
          />
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <SubmitButton icon={<Mail />} text="Login with Google" />
        </form>
      </CardContent>
    </Card>
  );
};
