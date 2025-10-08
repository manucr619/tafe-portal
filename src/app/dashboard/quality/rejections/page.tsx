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
import { qualityRejections, getQualityStatusColor } from "../../mock-data"
import { IconFileDownload, IconAlertCircle, IconAlertTriangle } from "@tabler/icons-react"
import { useState } from "react"

export default function RejectionsPage() {
  const [monthFilter, setMonthFilter] = useState<string>("all");
  const [plantFilter, setPlantFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter rejections
  const filteredRejections = qualityRejections.filter((rejection) => {
    const matchesMonth = monthFilter === "all" || 
      new Date(rejection.rejectionDate).toLocaleString('default', { month: 'numeric', year: 'numeric' }) === monthFilter;
    const matchesPlant = plantFilter === "all" || rejection.plant === plantFilter;
    const matchesStatus = statusFilter === "all" || rejection.status === statusFilter;
    
    return matchesMonth && matchesPlant && matchesStatus;
  });

  // Calculate totals
  const totalRejectedQty = filteredRejections.reduce((sum, r) => sum + r.rejectedQty, 0);
  const openRejections = filteredRejections.filter(r => r.status === "Open").length;
  const resolvedRejections = filteredRejections.filter(r => r.status === "Resolved").length;

  const uniquePlants = Array.from(new Set(qualityRejections.map(r => r.plant)));

  const handleExport = () => {
    alert("Exporting Rejection Report to Excel");
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
                  <h1 className="text-3xl font-bold tracking-tight">Rejection Report</h1>
                  <p className="text-muted-foreground">
                    Quality rejection tracking and analysis
                  </p>
                </div>
                <Button onClick={handleExport}>
                  <IconFileDownload className="mr-2 h-4 w-4" />
                  Export to Excel
                </Button>
              </div>

              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Rejections</CardTitle>
                    <IconAlertCircle className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{filteredRejections.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Total rejected qty: {totalRejectedQty}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Rejections</CardTitle>
                    <IconAlertTriangle className="h-4 w-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{openRejections}</div>
                    <p className="text-xs text-muted-foreground">
                      Require attention
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{resolvedRejections}</div>
                    <p className="text-xs text-muted-foreground">
                      Resolution rate: {filteredRejections.length > 0 ? Math.round((resolvedRejections / filteredRejections.length) * 100) : 0}%
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
                      <Label htmlFor="month-filter">Month/Year</Label>
                      <Select value={monthFilter} onValueChange={setMonthFilter}>
                        <SelectTrigger id="month-filter">
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Months</SelectItem>
                          <SelectItem value="9/2025">September 2025</SelectItem>
                          <SelectItem value="10/2025">October 2025</SelectItem>
                        </SelectContent>
                      </Select>
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
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rejection Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Rejection Details ({filteredRejections.length})</CardTitle>
                  <CardDescription>
                    Complete list of quality rejections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Part No.</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Plant</TableHead>
                          <TableHead className="text-right">Rejected Qty</TableHead>
                          <TableHead>Rejection Date</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRejections.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No rejections found for the selected filters
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredRejections.map((rejection) => (
                            <TableRow key={rejection.id} className="hover:bg-muted/50">
                              <TableCell className="font-medium">{rejection.partNo}</TableCell>
                              <TableCell className="max-w-[250px] truncate">{rejection.description}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{rejection.plant}</TableCell>
                              <TableCell className="text-right font-medium text-red-600">
                                {rejection.rejectedQty}
                              </TableCell>
                              <TableCell>{new Date(rejection.rejectionDate).toLocaleDateString()}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{rejection.reason}</TableCell>
                              <TableCell>
                                <Badge variant="secondary" className={getQualityStatusColor(rejection.status)}>
                                  {rejection.status}
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

              {/* Rejection by Reason */}
              <Card>
                <CardHeader>
                  <CardTitle>Rejection by Reason</CardTitle>
                  <CardDescription>Root cause analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(
                      filteredRejections.reduce((acc, r) => {
                        acc[r.reason] = (acc[r.reason] || 0) + r.rejectedQty;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([reason, qty]) => (
                      <div key={reason} className="flex items-center justify-between">
                        <span className="text-sm">{reason}</span>
                        <div className="flex items-center gap-4">
                          <div className="w-48 bg-muted rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${(qty / totalRejectedQty) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {qty}
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

