"use client"

import * as React from "react"
import {
  IconTruck,
  IconReceipt,
  IconChartBar,
  IconFileInvoice,
  IconDashboard,
  IconAlertCircle,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react"
import Image from "next/image"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavCollapsible } from "@/components/nav-collapsible"
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
    name: "Vendor User",
    email: "vendor@tafesupplier.com",
    avatar: "/avatars/vendor-user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "DR List",
      url: "/dashboard/dr-list",
      icon: IconTruck,
    },
    {
      title: "Invoice Update",
      url: "/dashboard/invoice-update",
      icon: IconFileInvoice,
    },
  ],
  navClouds: [
    {
      title: "Reports",
      icon: IconReport,
      isActive: true,
      url: "#",
      items: [
        {
          title: "DR Status Report",
          url: "/dashboard/reports/dr-status",
        },
        {
          title: "DR Itemwise Report",
          url: "/dashboard/reports/dr-itemwise",
        },
      ],
    },
    {
      title: "Quality Info",
      icon: IconAlertCircle,
      url: "#",
      items: [
        {
          title: "Rejection Report",
          url: "/dashboard/quality/rejections",
        },
        {
          title: "Warranty Rejection",
          url: "/dashboard/quality/warranty",
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
      name: "MRP Schedules",
      url: "#",
      icon: IconChartBar,
    },
    {
      name: "Vendor Rating",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Policy & Guidelines",
      url: "#",
      icon: IconReceipt,
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
              <a href="/dashboard" className="flex items-center gap-2">
                <Image 
                  src="https://www.tafe.com/img/TAFE-65-LOGO.webp" 
                  alt="TAFE Logo" 
                  width={32} 
                  height={32}
                  className="!size-8"
                />
                <span className="text-base font-semibold">TAFE Supplier Portal</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavCollapsible items={data.navClouds} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
