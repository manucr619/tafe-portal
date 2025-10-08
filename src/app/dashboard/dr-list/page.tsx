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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { deliveryRequests, getStatusColor } from "../mock-data"
import { IconPrinter, IconFileDownload, IconSearch } from "@tabler/icons-react"
import { useState } from "react"

export default function DRListPage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [plantFilter, setPlantFilter] = useState<string>("all");

  // Filter DRs based on search and filters
  const filteredDRs = deliveryRequests.filter((dr) => {
    const matchesSearch = 
      dr.drNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dr.partNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dr.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || dr.status === statusFilter;
    const matchesPlant = plantFilter === "all" || dr.plant === plantFilter;
    
    return matchesSearch && matchesStatus && matchesPlant;
  });

  // Pagination (10 records per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredDRs.length / itemsPerPage);
  const paginatedDRs = filteredDRs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedDRs.map(dr => dr.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handlePrint = () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one DR to print");
      return;
    }
    alert(`Printing ${selectedRows.length} DR(s) with QR codes as PDF`);
  };

  const handleExport = () => {
    alert("Exporting DR List to Excel");
  };

  // Get unique plants for filter
  const uniquePlants = Array.from(new Set(deliveryRequests.map(dr => dr.plant)));

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
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">DR List</h1>
                <p className="text-muted-foreground">
                  View and manage your delivery requests. Print DRs or export data.
                </p>
              </div>

              {/* Filters and Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Search & Filter</CardTitle>
                  <CardDescription>Find specific delivery requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="relative">
                      <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search DR No, Part No..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8"
                      />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
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

                    <Select value={plantFilter} onValueChange={setPlantFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by plant" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Plants</SelectItem>
                        {uniquePlants.map((plant) => (
                          <SelectItem key={plant} value={plant}>{plant}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                      <Button 
                        onClick={handlePrint}
                        disabled={selectedRows.length === 0}
                        className="flex-1"
                      >
                        <IconPrinter className="mr-2 h-4 w-4" />
                        Print ({selectedRows.length})
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleExport}
                      >
                        <IconFileDownload className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* DR Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Requests ({filteredDRs.length})</CardTitle>
                  <CardDescription>
                    Showing {paginatedDRs.length} of {filteredDRs.length} delivery requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox
                              checked={selectedRows.length === paginatedDRs.length && paginatedDRs.length > 0}
                              onCheckedChange={handleSelectAll}
                            />
                          </TableHead>
                          <TableHead>DR No.</TableHead>
                          <TableHead>Plant</TableHead>
                          <TableHead>Part No.</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>PO Number</TableHead>
                          <TableHead>Request Qty</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedDRs.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                              No delivery requests found
                            </TableCell>
                          </TableRow>
                        ) : (
                          paginatedDRs.map((dr) => (
                            <TableRow key={dr.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedRows.includes(dr.id)}
                                  onCheckedChange={(checked) => handleSelectRow(dr.id, checked as boolean)}
                                />
                              </TableCell>
                              <TableCell className="font-medium">{dr.drNo}</TableCell>
                              <TableCell className="max-w-[200px] truncate">{dr.plant}</TableCell>
                              <TableCell>{dr.partNo}</TableCell>
                              <TableCell className="max-w-[250px] truncate">{dr.description}</TableCell>
                              <TableCell>{dr.poNumber}</TableCell>
                              <TableCell>{dr.requestQty}</TableCell>
                              <TableCell>{new Date(dr.date).toLocaleDateString()}</TableCell>
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

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

