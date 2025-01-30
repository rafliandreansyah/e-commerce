"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Form from "next/form";
import { useActionState } from "react";
import { logout } from "../lib/action";

export default function FormLogout() {
  const initialState = {
    error: "",
  };
  const [state, formAction, isPending] = useActionState(logout, initialState);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Form action={formAction}>
          <button type="submit">Logout</button>
        </Form>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
