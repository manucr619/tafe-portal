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
import { deliveryRequests, invoices } from "../../mock-data"
import { IconFileDownload, IconSearch } from "@tabler/icons-react"
import { useState } from "react"

interface ItemwiseSummary {
  partNo: string;
  description: string;
  totalRequestQty: number;
  totalInvoiceQty: number;
  gap: number;
  drCount: number;
}

export default function DRItemwiseReportPage() {
  const [plantFilter, setPlantFilter] = useState<string>("all");
  const [partNoSearch, setPartNoSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter DRs
  const filteredDRs = deliveryRequests.filter((dr) => {
    const matchesPlant = plantFilter === "all" || dr.plant === plantFilter;
    const matchesPartNo = partNoSearch === "" || dr.partNo.toLowerCase().includes(partNoSearch.toLowerCase());
    
    let matchesDate = true;
    if (startDate) {
      matchesDate = matchesDate && new Date(dr.date) >= new Date(startDate);
    }
    if (endDate) {
      matchesDate = matchesDate && new Date(dr.date) <= new Date(endDate);
    }
    
    return matchesPlant && matchesPartNo && matchesDate;
  });

  // Group by part number
  const itemwiseSummary: ItemwiseSummary[] = Object.values(
    filteredDRs.reduce((acc, dr) => {
      if (!acc[dr.partNo]) {
        // Find invoices for this part
        const partInvoices = invoices.filter(inv => {
          const invDr = deliveryRequests.find(d => d.id === inv.drId);
          return invDr?.partNo === dr.partNo;
        });
        
        const totalInvoiceQty = partInvoices.reduce((sum, inv) => sum + inv.invoiceQty, 0);
        
        acc[dr.partNo] = {
          partNo: dr.partNo,
          description: dr.description,
          totalRequestQty: 0,
          totalInvoiceQty,
          gap: 0,
          drCount: 0,
        };
      }
      
      acc[dr.partNo].totalRequestQty += dr.requestQty;
      acc[dr.partNo].drCount += 1;
      acc[dr.partNo].gap = acc[dr.partNo].totalRequestQty - acc[dr.partNo].totalInvoiceQty;
      
      return acc;
    }, {} as Record<string, ItemwiseSummary>)
  );

  const uniquePlants = Array.from(new Set(deliveryRequests.map(dr => dr.plant)));

  const handleExport = () => {
    alert("Exporting DR Itemwise Report to Excel");
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
                  <h1 className="text-3xl font-bold tracking-tight">DR Itemwise Report</h1>
                  <p className="text-muted-foreground">
                    Part number-wise analysis with drill-down capability
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
                      <Label htmlFor="part-search">Part Number</Label>
                      <div className="relative">
                        <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="part-search"
                          placeholder="Search part number..."
                          value={partNoSearch}
                          onChange={(e) => setPartNoSearch(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Parts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{itemwiseSummary.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Unique part numbers
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Request Qty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {itemwiseSummary.reduce((sum, item) => sum + item.totalRequestQty, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Across all parts
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Invoice Qty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {itemwiseSummary.reduce((sum, item) => sum + item.totalInvoiceQty, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Invoiced quantity
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Itemwise Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Part Number-wise Analysis ({itemwiseSummary.length})</CardTitle>
                  <CardDescription>
                    Complete breakdown of DRs by part number
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Part No.</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">DR Count</TableHead>
                          <TableHead className="text-right">Total Request Qty</TableHead>
                          <TableHead className="text-right">Total Invoice Qty</TableHead>
                          <TableHead className="text-right">Gap</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {itemwiseSummary.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No parts found for the selected filters
                            </TableCell>
                          </TableRow>
                        ) : (
                          itemwiseSummary.map((item) => (
                            <TableRow key={item.partNo} className="hover:bg-muted/50 cursor-pointer">
                              <TableCell className="font-medium">{item.partNo}</TableCell>
                              <TableCell className="max-w-[300px] truncate">{item.description}</TableCell>
                              <TableCell className="text-right">{item.drCount}</TableCell>
                              <TableCell className="text-right font-medium">{item.totalRequestQty}</TableCell>
                              <TableCell className="text-right">{item.totalInvoiceQty}</TableCell>
                              <TableCell className="text-right">
                                <span className={item.gap > 0 ? "text-orange-600 font-medium" : ""}>
                                  {item.gap}
                                </span>
                              </TableCell>
                              <TableCell>
                                {item.gap === 0 ? (
                                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                                    Complete
                                  </Badge>
                                ) : item.totalInvoiceQty > 0 ? (
                                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                    Partial
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                                    Pending
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Parts with Gaps */}
              <Card>
                <CardHeader>
                  <CardTitle>Parts with Pending Gap</CardTitle>
                  <CardDescription>Parts requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {itemwiseSummary
                      .filter(item => item.gap > 0)
                      .map((item) => (
                        <div key={item.partNo} className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="font-medium">{item.partNo}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-orange-600">
                              Gap: {item.gap} units
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.totalInvoiceQty} of {item.totalRequestQty} invoiced
                            </p>
                          </div>
                        </div>
                      ))}
                    {itemwiseSummary.filter(item => item.gap > 0).length === 0 && (
                      <p className="text-center py-8 text-muted-foreground">
                        No parts with pending gaps
                      </p>
                    )}
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

