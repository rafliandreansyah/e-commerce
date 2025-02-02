"use client";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ButtonSidebar({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const pathname = usePathname();
  console.log(pathname);
  console.log(url);
  return (
    <SidebarMenuButton
      asChild
      isActive={url && url === pathname ? true : false}
    >
      <Link href={url}>{title}</Link>
    </SidebarMenuButton>
  );
}
