import type { Metadata } from "next";
import "../../../globals.css";

import { AppSidebar } from "./_components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppHeader from "./_components/app-header";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await getUser();

  if (!session) {
    return redirect("/dashboard/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
