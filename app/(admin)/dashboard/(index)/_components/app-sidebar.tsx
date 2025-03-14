import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import FormLogout from "./form-logout";
import { SearchForm } from "./search-form";
import { VersionSwitcher } from "./version-switcher";
import ButtonSidebar from "./button-sidebar";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Main Menu",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/dashboard",
          isActive: true,
        },
        {
          title: "Products",
          url: "/dashboard/products",
        },
        {
          title: "Categories",
          url: "/dashboard/categories",
        },
        {
          title: "Locations",
          url: "/dashboard/locations",
        },
        {
          title: "Brands",
          url: "/dashboard/brands",
        },
        {
          title: "Users",
          url: "/dashboard/users",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  console.log("server rendering");
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <ButtonSidebar title={item.title} url={item.url} />
                  </SidebarMenuItem>
                ))}
                <FormLogout />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
