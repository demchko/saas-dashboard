import { NavBar } from "@/components/custom/NavBar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 md:px-6 lg:px-8">
      <NavBar />
      {children}
    </div>
  );
}
