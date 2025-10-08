import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deliveryRequests, dashboardStats, getStatusColor } from "./mock-data"
import { IconTruck, IconFileInvoice, IconAlertCircle, IconStar } from "@tabler/icons-react"

export default function Page() {
  // Get recent DRs (last 5)
  const recentDRs = deliveryRequests.slice(0, 5);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              {/* Welcome Banner */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Welcome to TAFE Supplier Portal</h1>
                <p className="text-muted-foreground">
                  Portal URL: https://wb01.tafechannel.com | Vendor Dashboard
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending DRs</CardTitle>
                    <IconTruck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.pendingDRs}</div>
                    <p className="text-xs text-muted-foreground">
                      Awaiting print
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
                    <IconFileInvoice className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.pendingInvoices}</div>
                    <p className="text-xs text-muted-foreground">
                      Require invoice update
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Quality Rejections</CardTitle>
                    <IconAlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.totalRejections}</div>
                    <p className="text-xs text-muted-foreground">
                      Pending resolution
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Vendor Rating</CardTitle>
                    <IconStar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.vendorRating}/5.0</div>
                    <p className="text-xs text-muted-foreground">
                      Current performance
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Delivery Requests</CardTitle>
                  <CardDescription>Your latest DR activity and status updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>DR No.</TableHead>
                        <TableHead>Part No.</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Request Qty</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentDRs.map((dr) => (
                        <TableRow key={dr.id}>
                          <TableCell className="font-medium">{dr.drNo}</TableCell>
                          <TableCell>{dr.partNo}</TableCell>
                          <TableCell className="max-w-[300px] truncate">{dr.description}</TableCell>
                          <TableCell>{dr.requestQty}</TableCell>
                          <TableCell>{new Date(dr.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={getStatusColor(dr.status)}>
                              {dr.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Important Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Important Notifications</CardTitle>
                  <CardDescription>System announcements and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4 rounded-lg border p-4">
                    <IconAlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Browser Compatibility</p>
                      <p className="text-sm text-muted-foreground">
                        This portal is optimized for Google Chrome. For best experience, please use the latest version of Chrome.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 rounded-lg border p-4">
                    <IconFileInvoice className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">FIFO Processing</p>
                      <p className="text-sm text-muted-foreground">
                        Please process older DRs first to maintain FIFO sequence. Newer DRs cannot be processed until older ones are completed.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
