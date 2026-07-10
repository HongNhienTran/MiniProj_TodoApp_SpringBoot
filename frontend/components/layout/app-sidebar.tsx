"use client";

import {
  LayoutDashboard,
  CheckSquare,
  User,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Todos",
    url: "/todos",
    icon: CheckSquare,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupLabel>
            Todo App
          </SidebarGroupLabel>

          <SidebarGroupContent>

            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton asChild>

                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>

                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}