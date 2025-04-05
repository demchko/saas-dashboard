import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const LoginForm = () => {
  return (
    <Card className="w-100">
      <CardHeader className="text-center">
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Login with Google or Github</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <form>
          <Button className="w-full" variant="outline">
            Login with Github
          </Button>
        </form>
        <form>
          <Button className="w-full">Login with Google</Button>
        </form>
      </CardContent>
    </Card>
  );
};
