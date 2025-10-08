"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { deliveryRequests } from "../mock-data"
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons-react"
import { useState } from "react"

export default function InvoiceUpdatePage() {
  const [selectedDR, setSelectedDR] = useState("");
  const [transporter, setTransporter] = useState("");
  const [invoiceUnit, setInvoiceUnit] = useState("");

  // Filter DRs with "Pending for Invoice Updation" status
  const pendingInvoiceDRs = deliveryRequests.filter(
    dr => dr.status === "Pending for Invoice Updation"
  );

  const selectedDRData = deliveryRequests.find(dr => dr.id === selectedDR);

  // Auto-calculate invoice quantity
  const calculatedInvoiceQty = selectedDRData && invoiceUnit 
    ? parseInt(invoiceUnit) * selectedDRData.requestUnit 
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Invoice details submitted successfully!");
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
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Invoice Update</h1>
                <p className="text-muted-foreground">
                  Update invoice details for delivery requests pending invoice updation.
                </p>
              </div>

              {/* Instructions */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <IconInfoCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2 text-sm">
                      <p className="font-medium text-blue-900">Important Instructions:</p>
                      <ul className="list-disc list-inside space-y-1 text-blue-800">
                        <li>Process older DRs first (FIFO principle)</li>
                        <li>Invoice No. + Invoice Date combination must be unique</li>
                        <li>Invoice Unit cannot exceed Request Unit</li>
                        <li>LR details are mandatory when transporter is &quot;Self&quot;</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Invoice Form */}
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Invoice Details</CardTitle>
                    <CardDescription>Enter invoice information for the selected DR</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* DR Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="dr-select">Select DR *</Label>
                      <Select value={selectedDR} onValueChange={setSelectedDR}>
                        <SelectTrigger id="dr-select">
                          <SelectValue placeholder="Choose a DR pending invoice updation" />
                        </SelectTrigger>
                        <SelectContent>
                          {pendingInvoiceDRs.length === 0 ? (
                            <div className="p-2 text-sm text-muted-foreground">
                              No DRs pending invoice updation
                            </div>
                          ) : (
                            pendingInvoiceDRs.map((dr) => (
                              <SelectItem key={dr.id} value={dr.id}>
                                {dr.drNo} - {dr.partNo} - {dr.description}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedDRData && (
                      <>
                        {/* DR Information */}
                        <div className="rounded-lg border p-4 bg-muted/50">
                          <h3 className="font-medium mb-3">DR Information</h3>
                          <div className="grid gap-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Plant:</span>
                              <span className="font-medium">{selectedDRData.plant}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Part Number:</span>
                              <span className="font-medium">{selectedDRData.partNo}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">PO Number:</span>
                              <span className="font-medium">{selectedDRData.poNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Request Unit:</span>
                              <span className="font-medium">{selectedDRData.requestUnit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Request Quantity:</span>
                              <span className="font-medium">{selectedDRData.requestQty}</span>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Invoice Fields */}
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="invoice-no">Invoice Number *</Label>
                            <Input id="invoice-no" placeholder="Enter invoice number" required />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="invoice-date">Invoice Date *</Label>
                            <Input id="invoice-date" type="date" required />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="invoice-unit">Invoice Unit *</Label>
                            <Input 
                              id="invoice-unit" 
                              type="number" 
                              placeholder="Enter invoice unit"
                              value={invoiceUnit}
                              onChange={(e) => setInvoiceUnit(e.target.value)}
                              max={selectedDRData.requestUnit}
                              required 
                            />
                            <p className="text-xs text-muted-foreground">
                              Max: {selectedDRData.requestUnit}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="invoice-qty">Invoice Quantity</Label>
                            <Input 
                              id="invoice-qty" 
                              type="number" 
                              value={calculatedInvoiceQty}
                              disabled
                              className="bg-muted"
                            />
                            <p className="text-xs text-muted-foreground">
                              Auto-calculated: Invoice Unit × Unit Size
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="suggested-value">Suggested Invoice Value</Label>
                            <Input 
                              id="suggested-value" 
                              type="number"
                              placeholder="0.00"
                              disabled
                              className="bg-muted"
                            />
                            <p className="text-xs text-muted-foreground">
                              Auto-populated from PO
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="final-value">Final Invoice Value *</Label>
                            <Input 
                              id="final-value" 
                              type="number" 
                              placeholder="Enter final value"
                              required 
                            />
                          </div>
                        </div>

                        {/* Tax Fields */}
                        <Separator />
                        <div>
                          <h3 className="font-medium mb-4">Tax Details</h3>
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                              <Label htmlFor="cgst">CGST</Label>
                              <Input id="cgst" type="number" placeholder="0.00" step="0.01" />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="sgst">SGST</Label>
                              <Input id="sgst" type="number" placeholder="0.00" step="0.01" />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="igst">IGST</Label>
                              <Input id="igst" type="number" placeholder="0.00" step="0.01" />
                            </div>
                          </div>
                        </div>

                        {/* Transporter Details */}
                        <Separator />
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="transporter">Transporter *</Label>
                            <Select value={transporter} onValueChange={setTransporter}>
                              <SelectTrigger id="transporter">
                                <SelectValue placeholder="Select transporter" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="self">Self</SelectItem>
                                <SelectItem value="tci">TCI Logistics</SelectItem>
                                <SelectItem value="vrl">VRL Logistics</SelectItem>
                                <SelectItem value="agarwal">Agarwal Packers</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* LR Details (shown only if transporter is "Self") */}
                          {transporter === "self" && (
                            <Card className="border-orange-200 bg-orange-50">
                              <CardHeader>
                                <CardTitle className="text-base">LR Details (Mandatory for Self Transporter)</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div className="space-y-2">
                                    <Label htmlFor="lr-no">LR Number *</Label>
                                    <Input id="lr-no" placeholder="Enter LR number" required />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="lr-date">LR Date *</Label>
                                    <Input id="lr-date" type="date" required />
                                    <p className="text-xs text-muted-foreground">
                                      Must be ≥ Invoice Date
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="packages">Number of Packages *</Label>
                                    <Input id="packages" type="number" placeholder="0" required />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (KGs) *</Label>
                                    <Input id="weight" type="number" placeholder="0.00" step="0.01" required />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="vehicle-type">Type of Vehicle *</Label>
                                    <Select required>
                                      <SelectTrigger id="vehicle-type">
                                        <SelectValue placeholder="Select vehicle type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="truck">Truck</SelectItem>
                                        <SelectItem value="tempo">Tempo</SelectItem>
                                        <SelectItem value="van">Van</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="start-date">Start Date</Label>
                                    <Input id="start-date" type="date" />
                                    <p className="text-xs text-muted-foreground">
                                      Must be ≥ Invoice Date and LR Date
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>

                        {/* Warning Message */}
                        {invoiceUnit && parseInt(invoiceUnit) < selectedDRData.requestUnit && (
                          <div className="flex items-start space-x-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                            <IconAlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-yellow-900">Gap Justification Required</p>
                              <p className="text-sm text-yellow-800">
                                Invoice Unit is less than Request Unit. Please provide justification for the gap.
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                {selectedDRData && (
                  <div className="flex justify-end gap-4 mt-6">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                    <Button type="submit">
                      Submit Invoice
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

