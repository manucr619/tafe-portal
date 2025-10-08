// Mock data for TAFE Supplier Portal

export type DRStatus = 
  | "Pending for Print"
  | "Pending for Invoice Updation"
  | "Invoice Updated"
  | "At Gate"
  | "Received"
  | "Closed";

export interface DeliveryRequest {
  id: string;
  drNo: string;
  plant: string;
  partNo: string;
  description: string;
  requestUnit: number;
  requestQty: number;
  status: DRStatus;
  date: string;
  poNumber: string;
}

export interface Invoice {
  id: string;
  drId: string;
  drNo: string;
  invoiceNo: string;
  invoiceDate: string;
  invoiceUnit: number;
  invoiceQty: number;
  suggestedValue: number;
  finalValue: number;
  cgst: number;
  sgst: number;
  igst: number;
  transporter: string;
  lrNo?: string;
  lrDate?: string;
}

export interface QualityRejection {
  id: string;
  partNo: string;
  description: string;
  rejectedQty: number;
  rejectionDate: string;
  reason: string;
  status: "Open" | "Resolved" | "In Progress";
  plant: string;
}

export interface WarrantyRejection {
  id: string;
  partNo: string;
  description: string;
  rejectedQty: number;
  warrantyDate: string;
  claimAmount: number;
  status: "Pending" | "Approved" | "Rejected";
  responseTime: number; // in days
}

// Mock Delivery Requests
export const deliveryRequests: DeliveryRequest[] = [
  {
    id: "1",
    drNo: "DR2025001",
    plant: "Madurai Operations - K Path Pl - 1000",
    partNo: "212683/M01",
    description: "THRUST WASHER KIT (MF24 LATEST)",
    requestUnit: 10,
    requestQty: 100,
    status: "Pending for Print",
    date: "2025-10-01",
    poNumber: "PO2025-1001",
  },
  {
    id: "2",
    drNo: "DR2025002",
    plant: "Madurai Operations - K Path Pl - 1000",
    partNo: "212638/M91",
    description: "SPIDER THRUST WASHER KIT",
    requestUnit: 5,
    requestQty: 50,
    status: "Pending for Invoice Updation",
    date: "2025-10-02",
    poNumber: "PO2025-1002",
  },
  {
    id: "3",
    drNo: "DR2025003",
    plant: "Chennai Plant - 2000",
    partNo: "019088/M91",
    description: "ASSY, LEVER POSITION CONTROL",
    requestUnit: 8,
    requestQty: 80,
    status: "Invoice Updated",
    date: "2025-10-03",
    poNumber: "PO2025-1003",
  },
  {
    id: "4",
    drNo: "DR2025004",
    plant: "Madurai Operations - K Path Pl - 1000",
    partNo: "345678/M01",
    description: "HYDRAULIC CYLINDER ASSEMBLY",
    requestUnit: 12,
    requestQty: 120,
    status: "At Gate",
    date: "2025-10-04",
    poNumber: "PO2025-1004",
  },
  {
    id: "5",
    drNo: "DR2025005",
    plant: "Chennai Plant - 2000",
    partNo: "456789/M02",
    description: "BEARING HOUSING COMPLETE",
    requestUnit: 15,
    requestQty: 150,
    status: "Received",
    date: "2025-10-05",
    poNumber: "PO2025-1005",
  },
  {
    id: "6",
    drNo: "DR2025006",
    plant: "Madurai Operations - K Path Pl - 1000",
    partNo: "567890/M03",
    description: "GEAR SHAFT ASSEMBLY",
    requestUnit: 20,
    requestQty: 200,
    status: "Closed",
    date: "2025-09-28",
    poNumber: "PO2025-1006",
  },
  {
    id: "7",
    drNo: "DR2025007",
    plant: "Chennai Plant - 2000",
    partNo: "678901/M04",
    description: "CLUTCH PLATE KIT",
    requestUnit: 6,
    requestQty: 60,
    status: "Pending for Invoice Updation",
    date: "2025-10-06",
    poNumber: "PO2025-1007",
  },
  {
    id: "8",
    drNo: "DR2025008",
    plant: "Madurai Operations - K Path Pl - 1000",
    partNo: "789012/M05",
    description: "BRAKE DRUM ASSEMBLY",
    requestUnit: 4,
    requestQty: 40,
    status: "Pending for Print",
    date: "2025-10-07",
    poNumber: "PO2025-1008",
  },
];

// Mock Invoices
export const invoices: Invoice[] = [
  {
    id: "1",
    drId: "3",
    drNo: "DR2025003",
    invoiceNo: "INV2025-001",
    invoiceDate: "2025-10-03",
    invoiceUnit: 8,
    invoiceQty: 80,
    suggestedValue: 24000,
    finalValue: 28320,
    cgst: 2160,
    sgst: 2160,
    igst: 0,
    transporter: "TCI Logistics",
  },
  {
    id: "2",
    drId: "4",
    drNo: "DR2025004",
    invoiceNo: "INV2025-002",
    invoiceDate: "2025-10-04",
    invoiceUnit: 12,
    invoiceQty: 120,
    suggestedValue: 60000,
    finalValue: 70800,
    cgst: 5400,
    sgst: 5400,
    igst: 0,
    transporter: "Self",
    lrNo: "LR2025-001",
    lrDate: "2025-10-04",
  },
];

// Mock Quality Rejections
export const qualityRejections: QualityRejection[] = [
  {
    id: "1",
    partNo: "212683/M01",
    description: "THRUST WASHER KIT (MF24 LATEST)",
    rejectedQty: 1,
    rejectionDate: "2025-09-15",
    reason: "Dimensional deviation",
    status: "In Progress",
    plant: "Madurai Operations - K Path Pl - 1000",
  },
  {
    id: "2",
    partNo: "212638/M91",
    description: "SPIDER THRUST WASHER KIT",
    rejectedQty: 4,
    rejectionDate: "2025-09-20",
    reason: "Material defect",
    status: "Open",
    plant: "Madurai Operations - K Path Pl - 1000",
  },
  {
    id: "3",
    partNo: "019088/M91",
    description: "ASSY, LEVER POSITION CONTROL",
    rejectedQty: 1,
    rejectionDate: "2025-09-25",
    reason: "Assembly error",
    status: "Resolved",
    plant: "Chennai Plant - 2000",
  },
  {
    id: "4",
    partNo: "345678/M01",
    description: "HYDRAULIC CYLINDER ASSEMBLY",
    rejectedQty: 2,
    rejectionDate: "2025-09-28",
    reason: "Leakage detected",
    status: "Open",
    plant: "Madurai Operations - K Path Pl - 1000",
  },
];

// Mock Warranty Rejections
export const warrantyRejections: WarrantyRejection[] = [
  {
    id: "1",
    partNo: "212683/M01",
    description: "THRUST WASHER KIT (MF24 LATEST)",
    rejectedQty: 1,
    warrantyDate: "2025-08-12",
    claimAmount: 3500,
    status: "Approved",
    responseTime: 5,
  },
  {
    id: "2",
    partNo: "212638/M91",
    description: "SPIDER THRUST WASHER KIT",
    rejectedQty: 4,
    warrantyDate: "2025-08-20",
    claimAmount: 12000,
    status: "Pending",
    responseTime: 12,
  },
  {
    id: "3",
    partNo: "019088/M91",
    description: "ASSY, LEVER POSITION CONTROL",
    rejectedQty: 1,
    warrantyDate: "2025-09-01",
    claimAmount: 5000,
    status: "Rejected",
    responseTime: 8,
  },
];

// Helper function to get status color
export function getStatusColor(status: DRStatus): string {
  switch (status) {
    case "Pending for Print":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "Pending for Invoice Updation":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    case "Invoice Updated":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "At Gate":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    case "Received":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Closed":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

// Helper function to get quality status color
export function getQualityStatusColor(status: string): string {
  switch (status) {
    case "Open":
    case "Pending":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "In Progress":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "Resolved":
    case "Approved":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Rejected":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

// Dashboard stats
export const dashboardStats = {
  pendingDRs: 2,
  pendingInvoices: 2,
  totalRejections: 4,
  vendorRating: 4.5,
};

