# TAFE Supplier Portal - Document Analysis Report

**Classification:** Internal  
**Analysis Date:** October 07, 2025  
**Organization:** Tractors and Farm Equipment Limited (TAFE)

---

## Executive Summary

This report provides a comprehensive analysis of six internal documentation files related to the TAFE Supplier Portal and SYNCHRON Delivery Request System. The documents cover the complete supplier lifecycle including delivery request management, invoice processing, quality control, material planning, and vendor performance tracking.

---

## Document Inventory

### 1. TAFE DR System User Manual Part1.pdf

**Classification:** Internal  
**Publication Date:** December 18, 2020  
**System:** SYNCHRON Delivery Request System – Non Warehouse Flow  
**Page Count:** 15 pages

#### Key Contents

**System Overview**
- Complete workflow documentation for the Delivery Request (DR) process
- Integration between vendors, transporters, and plant operations
- Automated system publishing and data synchronization

**Access & Navigation**
- Portal URL: https://wb01.tafechannel.com
- Username and password authentication
- Navigation path: Synchron → DR List

**Core Functionalities**

**DR List Management**
- View DRs awaiting print and invoice updates
- Print single or multiple DRs with QR codes as PDF
- Export DR List data to Excel format
- Search and filter capabilities with pagination (10 records per page)
- Status tracking for all delivery requests

**New Parts System (NPS) Confirmation**
- Mandatory confirmation process for new parts before DR processing
- Plant-specific part confirmation workflow
- Automated population of NPS parts for selected plants
- Bulk selection and confirmation capability

**Reporting Capabilities**
- **DR Status Report:** Real-time status tracking with drill-down details and Excel export
- **DR Itemwise Report:** Part number-wise analysis with drill-down and Excel export

**Documentation Features**
- Step-by-step instructions with numbered guidance
- Screenshots and visual aids for each process
- Detailed explanations of field requirements and validations

---

### 2. TAFE DR System User Manual Part2.pdf

**Classification:** Internal  
**Publication Date:** December 21, 2020  
**System:** SYNCHRON Delivery Request System – Non Warehouse Flow  
**Page Count:** 15 pages

#### Key Contents

**Invoice Details Update Process**

**Prerequisites and Business Rules**
- DR must be in "PENDING FOR INVOICE UPDATION" status
- Older DR/DDR must be processed first (FIFO principle)
- DR may contain multiple part numbers
- Invoice No. and Invoice Date combination must be unique per vendor

**Invoice Fields and Validations**
- Invoice Number (mandatory)
- Invoice Date (mandatory, unique combination with Invoice No.)
- Invoice Unit (cannot exceed Request Unit)
- Invoice Quantity (auto-calculated: Invoice Unit × Unit Size)
- Suggested Invoice Value (auto-populated based on PO and part number)
- PO Effective From Date (auto-populated)
- Final Invoice Value (includes tax, variance warnings if gap exists)
- CGST, SGST, IGST fields

**Multi-Invoice Handling**
- Single invoice per part number (standard)
- Multiple invoices allowed when Request Unit > 1
- Add/Remove row functionality for multiple invoices
- Total Invoice Unit validation against Request Unit
- Gap justification requirement for under-invoicing

**DQMS Batch Details Integration**

**Batch Management Rules**
- Mandatory when vendor and part are DQMS-enabled
- Batch details must accompany invoice updates
- FIFO (First In First Out) batch consumption required
- Total Batch Quantity must match Total Invoice Quantity
- Full batch consumption until Invoice Quantity is reached
- Justification required for skipping batches in FIFO order

**Transporter & LR (Lorry Receipt) Details**

**Transporter Selection**
- Mapped transporters (if vendor uses Transporter Maintenance Form)
- All authorized TAFE transporters (if no mapping exists)
- "Self" option for vendor-owned transporters

**LR Details Requirements (Mandatory for "Self" Transporter)**
- LR Number
- LR Date (must be ≥ Invoice Date, no future dates allowed)
- Number of Packages
- Weight in KGs
- Type of Vehicle
- Start Date (must be ≥ Invoice Date and LR Date)

**Invoice Upload (Batch Mode)**
- Bulk upload capability for multiple DRs simultaneously
- Excel-based template for batch processing
- Validation and error reporting

---

### 3. TAFE Supplier Portal ApplicationsI.pdf (Part 1)

**Classification:** Internal

#### Key Contents

**Portal Home Page**
- Vendor home dashboard
- Welcome message and user information
- Browser compatibility notice (optimized for Google Chrome)
- Supplementary Bills information and guidelines
- Account Balance Confirmation link
- GST Credit Accounted by TAFE reconciliation files
- TDS Portal navigation link

**Navigation Menu Structure**
- RFQ (Request for Quote)
- Issue Resolving System
- Tooling
- DQMS (Dealer Quality Management System)
- Synchron
- GST
- Home
- Quality Info
- Vendor Rating
- Account Info
- Material Info
- Options
- ASN (Advance Shipment Notice)
- Policy and Guidelines
- Agreements Info
- Maintenance Forms

**Issue Resolution System**
- Quality issue tracking
- Issue creation and management
- Resolution workflow
- Communication with TAFE quality team

**MIS Reports**
- Management Information System dashboards
- Performance metrics
- Data analytics and reporting tools

---

### 4. TAFE Supplier Portal Applications II.pdf (Part 2)

**Classification:** Internal

#### Key Contents

**MRP Schedules Module**

**Features**
- Material Requirements Planning schedule viewing
- Monthly demand forecasts (August through November shown)
- Selection by Vendor or Part Number
- Plant selection (e.g., Madurai Operations - K Path Pl - 1000)
- Excel export capability

**Schedule Display Fields**
- PO Number
- Part Number and Description
- Regular PO Series schedules
- Weekly buckets (columns 1-22+)
- Color-coded cells for different demand levels:
  - White: 0 units
  - Yellow: Warning level
  - Orange: High demand
  - Red: Critical/overdue
- Total quantities per week
- Material gaps and completion deadlines

**Schedule Vs Supply Analysis**
- Performance comparison between scheduled and actual supply
- Variance tracking
- On-time delivery metrics
- Historical performance analysis

**FG Stock Upload**
- Finished Goods stock reporting
- Inventory level updates
- Stock position management
- Integration with TAFE planning systems

**Twobin / Kanban Material Planning**
- Lean manufacturing methodology
- Pull-based replenishment system
- Bin status tracking
- Consumption-based ordering

**Buyer Confirmation**
- Purchase order acknowledgment
- Material delivery confirmation
- Quantity and date verification
- Change request management

**ASN Management**

**Create ASN (Advance Shipment Notice)**
- Shipment pre-notification
- Material dispatch details
- Expected delivery information
- Integration with gate entry system

**ASN Status**
- Real-time shipment tracking
- Status updates throughout delivery cycle
- Exception handling
- Delivery confirmation

**New Parts Confirmation**
- Introduction of new part numbers
- Vendor acceptance workflow
- Part master data validation
- First article inspection requirements

---

### 5. TAFE Supplier Portal Applications III.pdf (Part 3)

**Classification:** Internal

#### Key Contents

**Quality Info Module**

**Rejection Report**
- Quality rejection tracking
- Defect categorization
- Root cause analysis
- Rejection quantity and value

**Warranty Rejection**
- Post-delivery quality issues
- Warranty claim tracking
- Example parts shown:
  - Part No. 212683/M01: THRUST WASHER KIT (MF24 LATEST) - Rejected Qty: 1
  - Part No. 212638/M91: SPIDER THRUST WASHER KIT - Rejected Qty: 4
  - Part No. 019088/M91: ASSY, LEVER POSITION CONTROL - Rejected Qty: 1
- Month/Year filtering (01-2012 shown)
- Vendor-specific reporting
- Excel export functionality

**Rejection Despatch Details**
- Details of rejected material return process
- Despatch documentation
- Transportation arrangements
- Material tracking until disposition

**Parts Quality Inbox**
- Quality notifications from TAFE
- Action items and corrective action requests
- Communication thread management
- Response tracking

**Rejection Notification Response Time Analysis**
- Metrics on vendor response times
- Performance benchmarking
- SLA compliance tracking
- Improvement opportunity identification

**GRIN Details (Goods Receipt and Inspection Note)**
- Material receipt confirmation
- Quality inspection results
- Acceptance/rejection decisions
- Quantity verification
- Integration with payment processing

**MRP Parts Delivery Rating with Details**
- Supplier performance scoring
- Delivery punctuality metrics
- Quality performance
- Overall vendor rating
- Historical trend analysis

**Vendor Rating Section**

**MRP Parts Rating**
- Regular material performance
- On-time delivery percentage
- Quality acceptance rate
- Overall score calculation

**TWOBIN Parts Rating**
- Kanban/Twobin specific performance
- Replenishment effectiveness
- Stock-out incidents
- Response time metrics

---

### 6. TAFE Supplier Portal Applications IV.pdf (Part 4)

**Classification:** Internal

#### Key Contents

**Policy & Guidelines**
- Portal usage policies
- Standard operating procedures
- Compliance requirements
- Data security guidelines
- Communication protocols
- Escalation procedures
- Terms and conditions
- Vendor code of conduct

**Scrap Disposal Request Form**
- Process for requesting scrap disposal approvals
- Rejected material disposition
- Environmental compliance
- Documentation requirements
- Approval workflow
- Disposal method selection
- Certificate of disposal

**Freight Request Approval**
- Logistics and transportation request management
- Special freight arrangement requests
- Cost approval process
- Route optimization requests
- Emergency shipment procedures
- Freight cost reconciliation

---

## System Architecture Overview

### SYNCHRON DR System Workflow

**Process Flow:**
1. **Automated DR Publishing** - System publishes DR to Supplier Portal at scheduled intervals
2. **Vendor DR Print** - Vendor downloads DR with QR code for invoice preparation
3. **Invoice Update** - Vendor updates invoice details in portal
4. **Transporter Selection:**
   - If "Self" (vendor-owned): Vendor updates LR details with invoice
   - If third-party: Transporter updates LR details separately
5. **ERP Integration** - System publishes DR, invoice, and LR details to ERP for gate entry
6. **Gate Entry** - Plant gate entry officer creates entry for DR
7. **Goods Receipt** - Receiving officer confirms DR for in-warding
8. **DR Closure** - DR marked as closed
9. **Delay DR Generation** - If gap exists between Request Qty. and Received Qty., system generates Delay DR
10. **Status Publishing** - System publishes gate entry, GRIN, and closure details back to portal

### Portal Module Integration

**Core Modules:**
- **Synchron** - DR management system
- **Quality Info** - Rejection and warranty management
- **Material Info** - MRP, schedules, and planning
- **ASN** - Advance shipment notification
- **Vendor Rating** - Performance management
- **Account Info** - Financial information
- **Agreements Info** - Contracts and terms

---

## Key Features and Capabilities

### Delivery Request Management
- QR code integration for tracking
- Batch PDF generation
- Real-time status tracking
- Multi-plant support
- Automated workflow

### Invoice Processing
- Single and multiple invoice handling
- Auto-calculation of values
- PO integration
- Tax computation (CGST, SGST, IGST)
- Variance detection and alerts

### Quality Management
- Real-time rejection reporting
- Warranty claim tracking
- Response time monitoring
- GRIN integration
- Corrective action tracking

### Material Planning
- MRP schedule visibility
- Schedule vs. supply analysis
- Kanban/Twobin support
- Demand forecasting
- Stock upload capability

### Performance Management
- Delivery rating system
- Quality metrics
- Response time analysis
- Historical performance tracking
- Benchmarking capabilities

### Reporting and Analytics
- Excel export functionality
- Customizable date ranges
- Multi-parameter filtering
- Drill-down capabilities
- Real-time data refresh

---

## Business Rules and Validations

### DR Processing Rules
1. NPS parts must be confirmed before DR processing for new parts
2. Older DRs must be processed before newer ones (FIFO)
3. DR print must be taken before invoice update
4. Total invoice quantity cannot exceed request quantity

### Invoice Validation Rules
1. Invoice No. + Invoice Date combination must be unique per vendor
2. Invoice Unit ≤ Request Unit for each part number
3. Total Invoice Unit (if multiple invoices) ≤ Request Unit
4. Gap between Request Unit and Invoice Unit requires justification
5. Final Invoice Value variance triggers warning if significant

### DQMS Batch Rules
1. Batch details mandatory when part is DQMS-enabled
2. Batch consumption must follow FIFO order
3. Batch must be consumed fully until Invoice Quantity reached
4. Total Batch Quantity = Total Invoice Quantity
5. Justification required if batch skipped in FIFO order

### LR (Lorry Receipt) Rules
1. Mandatory when transporter is "Self" (vendor-owned)
2. LR Date ≥ Invoice Date
3. LR Date cannot be future date
4. Start Date ≥ Invoice Date and LR Date (if provided)

### Date Validation Rules
1. No future dates allowed for invoices and LR
2. Start Date must be logical sequence after Invoice Date
3. Chronological validation across all date fields

---

## Technical Specifications

### Access Details
- **Portal URL:** https://wb01.tafechannel.com
- **Authentication:** Username and password
- **Recommended Browser:** Google Chrome
- **Time Zone:** IST (UTC+5:30)

### Data Export Capabilities
- Excel format (.xlsx)
- PDF format for DRs with QR codes
- Batch export for multiple records
- Template-based bulk uploads

### Integration Points
- ERP system (bidirectional)
- DQMS (Dealer Quality Management System)
- Gate entry system
- GRIN system
- Payment/accounting systems

---

## User Roles and Responsibilities

### Vendor Responsibilities
- Take DR prints for invoice preparation
- Update invoice details accurately
- Maintain DQMS batch records
- Update LR details (if self-transporter)
- Confirm new parts (NPS)
- Monitor rejection reports
- Respond to quality notifications
- Maintain delivery performance

### Transporter Responsibilities
- Update LR details in portal
- Ensure timely delivery
- Coordinate with vendors and plants

### Plant Responsibilities
- Create gate entries
- Confirm goods receipt
- Quality inspection and GRIN creation
- DR closure processing

### System Responsibilities
- Automated DR publishing
- Data synchronization with ERP
- Status updates and notifications
- Delay DR generation
- Performance calculations

---

## Document Change Control

| Document | Version | Date | Classification |
|----------|---------|------|----------------|
| TAFE DR System User Manual Part1 | 1.0 | 18-Dec-20 | Internal |
| TAFE DR System User Manual Part2 | 1.0 | 21-Dec-20 | Internal |
| TAFE Supplier Portal ApplicationsI | - | - | Internal |
| TAFE Supplier Portal Applications II | - | - | Internal |
| TAFE Supplier Portal Applications III | - | - | Internal |
| TAFE Supplier Portal Applications IV | - | - | Internal |

---

## Recommendations

### For Vendors
1. Complete NPS confirmation promptly to avoid DR processing delays
2. Process older DRs first to maintain FIFO sequence
3. Maintain accurate DQMS batch records for compliance
4. Monitor rejection reports and respond within SLA
5. Utilize batch upload features for efficiency

### For TAFE
1. Consider consolidating the six documents into a single comprehensive manual
2. Add version numbers and revision dates to all portal applications documents
3. Include troubleshooting section for common issues
4. Provide video tutorials for complex processes
5. Implement role-based documentation for different user types

### For System Enhancement
1. Real-time validation during data entry
2. Mobile-responsive design for field access
3. Automated email notifications for critical actions
4. Dashboard analytics for quick insights
5. API documentation for system integrators

---

## Glossary of Terms

- **ASN** - Advance Shipment Notice
- **DR** - Delivery Request
- **DDR** - Delay Delivery Request
- **DQMS** - Dealer Quality Management System
- **FIFO** - First In First Out
- **FG** - Finished Goods
- **GRIN** - Goods Receipt and Inspection Note
- **GST** - Goods and Services Tax (CGST, SGST, IGST)
- **LR** - Lorry Receipt
- **MIS** - Management Information System
- **MRP** - Material Requirements Planning
- **NPS** - New Parts System
- **PO** - Purchase Order
- **QR Code** - Quick Response Code
- **RFQ** - Request for Quote
- **SLA** - Service Level Agreement
- **TDS** - Tax Deducted at Source
- **TWOBIN** - Two-Bin Kanban System

---

## Conclusion

The TAFE Supplier Portal documentation suite provides comprehensive coverage of the supplier lifecycle from material planning through delivery and quality management. The SYNCHRON DR System streamlines the delivery request process with automated workflows, while the broader portal applications support quality management, performance tracking, and vendor development.

The documentation demonstrates a mature, integrated system with strong controls, validations, and reporting capabilities. The six documents collectively serve as a complete reference for vendors, transporters, and internal TAFE users.

**Total Documents Analyzed:** 6  
**Total Page Coverage:** Approximately 60+ pages  
**Classification:** All Internal  
**System Owner:** Tractors and Farm Equipment Limited (TAFE)

---

**Report Prepared By:** Document Analysis System  
**Date:** October 07, 2025  
**Classification:** Internal