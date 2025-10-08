"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { warrantyRejections, getQualityStatusColor } from "../../mock-data"
import { IconFileDownload, IconClock, IconCurrencyDollar } from "@tabler/icons-react"
import { useState } from "react"

export default function WarrantyPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter warranty rejections
  const filteredWarranty = warrantyRejections.filter((warranty) => {
    const matchesStatus = statusFilter === "all" || warranty.status === statusFilter;
    return matchesStatus;
  });

  // Calculate totals
  const totalClaims = filteredWarranty.length;
  const totalClaimAmount = filteredWarranty.reduce((sum, w) => sum + w.claimAmount, 0);
  const avgResponseTime = filteredWarranty.length > 0 
    ? Math.round(filteredWarranty.reduce((sum, w) => sum + w.responseTime, 0) / filteredWarranty.length)
    : 0;
  const approvedClaims = filteredWarranty.filter(w => w.status === "Approved").length;

  const handleExport = () => {
    alert("Exporting Warranty Rejection Report to Excel");
  };

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
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">Warranty Rejection</h1>
                  <p className="text-muted-foreground">
                    Post-delivery quality issues and warranty claim tracking
                  </p>
                </div>
                <Button onClick={handleExport}>
                  <IconFileDownload className="mr-2 h-4 w-4" />
                  Export to Excel
                </Button>
              </div>

              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalClaims}</div>
                    <p className="text-xs text-muted-foreground">
                      Warranty claims filed
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
                    <IconCurrencyDollar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{totalClaimAmount.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Claim value
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                    <IconClock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgResponseTime} days</div>
                    <p className="text-xs text-muted-foreground">
                      Average turnaround
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalClaims > 0 ? Math.round((approvedClaims / totalClaims) * 100) : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {approvedClaims} of {totalClaims} approved
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle>Filter Options</CardTitle>
                  <CardDescription>Customize your report view</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="status-filter">Status</Label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger id="status-filter">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Warranty Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Warranty Claims ({filteredWarranty.length})</CardTitle>
                  <CardDescription>
                    Complete list of warranty rejections and claims
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Part No.</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Rejected Qty</TableHead>
                          <TableHead>Warranty Date</TableHead>
                          <TableHead className="text-right">Claim Amount</TableHead>
                          <TableHead className="text-right">Response Time</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredWarranty.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No warranty claims found for the selected filters
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredWarranty.map((warranty) => (
                            <TableRow key={warranty.id} className="hover:bg-muted/50">
                              <TableCell className="font-medium">{warranty.partNo}</TableCell>
                              <TableCell className="max-w-[250px] truncate">{warranty.description}</TableCell>
                              <TableCell className="text-right font-medium text-red-600">
                                {warranty.rejectedQty}
                              </TableCell>
                              <TableCell>{new Date(warranty.warrantyDate).toLocaleDateString()}</TableCell>
                              <TableCell className="text-right font-medium">
                                ₹{warranty.claimAmount.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <span className={warranty.responseTime > 10 ? "text-orange-600" : ""}>
                                  {warranty.responseTime} days
                                </span>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className={getQualityStatusColor(warranty.status)}>
                                  {warranty.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time Analysis */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Response Time Analysis</CardTitle>
                    <CardDescription>Claims by response time category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Fast (&lt; 5 days)</span>
                        <div className="flex items-center gap-4">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ 
                                width: `${(filteredWarranty.filter(w => w.responseTime < 5).length / filteredWarranty.length) * 100}%` 
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8 text-right">
                            {filteredWarranty.filter(w => w.responseTime < 5).length}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Medium (5-10 days)</span>
                        <div className="flex items-center gap-4">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-yellow-500 h-2 rounded-full" 
                              style={{ 
                                width: `${(filteredWarranty.filter(w => w.responseTime >= 5 && w.responseTime <= 10).length / filteredWarranty.length) * 100}%` 
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8 text-right">
                            {filteredWarranty.filter(w => w.responseTime >= 5 && w.responseTime <= 10).length}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Slow (&gt; 10 days)</span>
                        <div className="flex items-center gap-4">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ 
                                width: `${(filteredWarranty.filter(w => w.responseTime > 10).length / filteredWarranty.length) * 100}%` 
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8 text-right">
                            {filteredWarranty.filter(w => w.responseTime > 10).length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Claim Status Distribution</CardTitle>
                    <CardDescription>Status breakdown of warranty claims</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Pending', 'Approved', 'Rejected'].map((status) => {
                        const count = filteredWarranty.filter(w => w.status === status).length;
                        return (
                          <div key={status} className="flex items-center justify-between">
                            <Badge variant="secondary" className={getQualityStatusColor(status)}>
                              {status}
                            </Badge>
                            <div className="flex items-center gap-4">
                              <div className="w-32 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${(count / filteredWarranty.length) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-8 text-right">
                                {count}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

