"use client"

import { IconChevronRight, type Icon } from "@tabler/icons-react"
import { useState } from "react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavCollapsible({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(
    items.reduce((acc, item) => {
      acc[item.title] = item.isActive || false
      return acc
    }, {} as Record<string, boolean>)
  )

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton 
              tooltip={item.title}
              onClick={() => toggleItem(item.title)}
              className="cursor-pointer"
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <IconChevronRight 
                className={`ml-auto transition-transform duration-200 ${
                  openItems[item.title] ? 'rotate-90' : ''
                }`} 
              />
            </SidebarMenuButton>
            {openItems[item.title] && (
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      <a href={subItem.url}>
                        <span>{subItem.title}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

