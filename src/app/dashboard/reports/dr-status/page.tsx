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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deliveryRequests, getStatusColor, type DRStatus } from "../../mock-data"
import { IconFileDownload, IconTrendingUp, IconTrendingDown, IconMinus } from "@tabler/icons-react"
import { useState } from "react"

export default function DRStatusReportPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [plantFilter, setPlantFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter DRs
  const filteredDRs = deliveryRequests.filter((dr) => {
    const matchesStatus = statusFilter === "all" || dr.status === statusFilter;
    const matchesPlant = plantFilter === "all" || dr.plant === plantFilter;
    
    let matchesDate = true;
    if (startDate) {
      matchesDate = matchesDate && new Date(dr.date) >= new Date(startDate);
    }
    if (endDate) {
      matchesDate = matchesDate && new Date(dr.date) <= new Date(endDate);
    }
    
    return matchesStatus && matchesPlant && matchesDate;
  });

  // Calculate status distribution
  const statusCounts = filteredDRs.reduce((acc, dr) => {
    acc[dr.status] = (acc[dr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const uniquePlants = Array.from(new Set(deliveryRequests.map(dr => dr.plant)));

  const handleExport = () => {
    alert("Exporting DR Status Report to Excel");
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
                  <h1 className="text-3xl font-bold tracking-tight">DR Status Report</h1>
                  <p className="text-muted-foreground">
                    Real-time status tracking with drill-down details
                  </p>
                </div>
                <Button onClick={handleExport}>
                  <IconFileDownload className="mr-2 h-4 w-4" />
                  Export to Excel
                </Button>
              </div>

              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle>Filter Options</CardTitle>
                  <CardDescription>Customize your report view</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="plant-filter">Plant</Label>
                      <Select value={plantFilter} onValueChange={setPlantFilter}>
                        <SelectTrigger id="plant-filter">
                          <SelectValue placeholder="Select plant" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Plants</SelectItem>
                          {uniquePlants.map((plant) => (
                            <SelectItem key={plant} value={plant}>{plant}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status-filter">Status</Label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger id="status-filter">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="Pending for Print">Pending for Print</SelectItem>
                          <SelectItem value="Pending for Invoice Updation">Pending for Invoice Updation</SelectItem>
                          <SelectItem value="Invoice Updated">Invoice Updated</SelectItem>
                          <SelectItem value="At Gate">At Gate</SelectItem>
                          <SelectItem value="Received">Received</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Summary Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
                    <IconTrendingUp className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(statusCounts["Pending for Print"] || 0) + (statusCounts["Pending for Invoice Updation"] || 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Requires vendor action
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">In Transit</CardTitle>
                    <IconMinus className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(statusCounts["Invoice Updated"] || 0) + (statusCounts["At Gate"] || 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      On the way or at gate
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <IconTrendingDown className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(statusCounts["Received"] || 0) + (statusCounts["Closed"] || 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Received or closed
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Status Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed DR Status ({filteredDRs.length})</CardTitle>
                  <CardDescription>
                    Complete list of delivery requests with current status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>DR No.</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Plant</TableHead>
                          <TableHead>Part No.</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>PO Number</TableHead>
                          <TableHead>Request Qty</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDRs.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No delivery requests found for the selected filters
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredDRs.map((dr) => (
                            <TableRow key={dr.id} className="hover:bg-muted/50 cursor-pointer">
                              <TableCell className="font-medium">{dr.drNo}</TableCell>
                              <TableCell>{new Date(dr.date).toLocaleDateString()}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{dr.plant}</TableCell>
                              <TableCell>{dr.partNo}</TableCell>
                              <TableCell className="max-w-[250px] truncate">{dr.description}</TableCell>
                              <TableCell>{dr.poNumber}</TableCell>
                              <TableCell>{dr.requestQty}</TableCell>
                              <TableCell>
                                <Badge variant="secondary" className={getStatusColor(dr.status)}>
                                  {dr.status}
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

              {/* Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Status Distribution</CardTitle>
                  <CardDescription>Breakdown by status category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(statusCounts).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className={getStatusColor(status as DRStatus)}>
                            {status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-48 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(count / filteredDRs.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {count} ({Math.round((count / filteredDRs.length) * 100)}%)
                          </span>
                        </div>
                      </div>
                    ))}
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

