"use client"

import { IconSparkles, type Icon } from "@tabler/icons-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!prompt.trim()) return

    const userMessage = prompt.trim()
    setPrompt("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    // Simulate AI response - replace with actual API call
    setTimeout(() => {
      const response = `I can help you with information about:\n\n• Delivery Requests (DR)\n• Invoice Processing\n• Quality Reports\n• Vendor Ratings\n• MRP Schedules\n\nYou asked: "${userMessage}"\n\nPlease provide more specific details about what you'd like to know.`
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Ask AI"
              onClick={() => setIsAIDrawerOpen(true)}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 hover:text-white active:from-violet-700 active:to-indigo-700 active:text-white min-w-8 duration-200 ease-linear shadow-md"
            >
              <IconSparkles className="size-4" />
              <span className="font-semibold">Ask AI</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <a href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>

      <Drawer open={isAIDrawerOpen} onOpenChange={setIsAIDrawerOpen}>
        <DrawerContent className="h-[85vh]">
          <DrawerHeader className="border-b">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center size-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600">
                <IconSparkles className="size-5 text-white" />
              </div>
              <div>
                <DrawerTitle className="text-xl">Ask AI Assistant</DrawerTitle>
                <DrawerDescription>
                  Ask questions about delivery requests, invoices, quality reports, and more
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="flex items-center justify-center size-16 rounded-full bg-gradient-to-r from-violet-100 to-indigo-100 mb-4">
                  <IconSparkles className="size-8 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">How can I help you today?</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-6">
                  I can help you find information about delivery requests, invoices, quality reports, vendor ratings, and more.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-2xl">
                  {[
                    "Show me pending delivery requests",
                    "What are my recent invoices?",
                    "Quality rejection reports",
                    "View my vendor rating",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setPrompt(suggestion)
                      }}
                      className="p-3 text-left text-sm rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-start justify-center size-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shrink-0 mt-1">
                        <IconSparkles className="size-4 text-white mt-2" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex items-start justify-center size-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shrink-0 mt-1">
                      <IconSparkles className="size-4 text-white mt-2" />
                    </div>
                    <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted">
                      <div className="flex gap-1">
                        <div className="size-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                        <div className="size-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.2s]" />
                        <div className="size-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <DrawerFooter className="border-t">
            <div className="flex gap-2 w-full">
              <Input
                placeholder="Ask a question about your supplier portal..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!prompt.trim() || isLoading}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              >
                <IconSparkles className="size-4 mr-2" />
                Send
              </Button>
            </div>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </SidebarGroup>
  )
}
