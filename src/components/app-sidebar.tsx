"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "TAFE User",
    email: "user@tafe.edu.au",
    avatar: "/avatars/tafe-user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Courses",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Students",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Programs",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Faculty",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Enrollments",
      icon: IconFileDescription,
      isActive: true,
      url: "#",
      items: [
        {
          title: "New Applications",
          url: "#",
        },
        {
          title: "Processing",
          url: "#",
        },
      ],
    },
    {
      title: "Assessments",
      icon: IconFileWord,
      url: "#",
      items: [
        {
          title: "Pending Review",
          url: "#",
        },
        {
          title: "Completed",
          url: "#",
        },
      ],
    },
    {
      title: "Resources",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Learning Materials",
          url: "#",
        },
        {
          title: "Training Guides",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Course Catalog",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Student Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Assessment Tools",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">TAFE</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
