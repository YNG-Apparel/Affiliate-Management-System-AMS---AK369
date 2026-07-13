# Business Requirements

Version: 1.0

Status: Draft

---

# 1. Business Overview

The Affiliate Management System (AMS) supports the daily operations of a company that manages a network of affiliate marketers. Affiliates promote products through supported platforms such as TikTok Shop, Shopee, and Tokopedia.

The company requires a centralized system to manage affiliate information, distribute promotional content, monitor sales performance, calculate commissions, and generate payroll reports.

The objective is to replace manual processes currently handled through spreadsheets, messaging applications, and multiple disconnected platforms.

---

# 2. Business Actors

The following actors participate in the affiliate business process.

## Business Owner

Responsible for overseeing the entire affiliate program and reviewing business performance.

---

## Operations Manager

Responsible for managing affiliates, approving registrations, assigning promotional content, and monitoring daily operations.

---

## Marketing Staff

Responsible for uploading promotional materials, organizing campaigns, and distributing content to affiliates.

---

## Finance Staff

Responsible for reviewing commissions, approving payroll, and maintaining payment records.

---

## Affiliate

An individual who promotes company products through supported platforms.

Affiliates can:

- Register
- Complete profile
- Access assigned content
- Monitor earnings
- View commissions
- Request withdrawals (future)

---

## Customer

The end customer who purchases products through affiliate promotions.

Customers do not access the AMS platform.

---

# 3. Business Entities

The business operates using the following core entities.

- User
- Role
- Affiliate
- Product
- Product Category
- Content
- Media
- Assignment
- City
- Commission
- Payroll
- Tier
- Order
- KYC
- Contract
- Notification
- Report
- Activity Log

These entities represent the primary business objects that will later become part of the system design.

---

# 4. Core Business Process

The affiliate lifecycle follows these general steps.

1. Affiliate registers.
2. Manager reviews the registration.
3. Affiliate is approved.
4. Affiliate completes profile information.
5. Marketing uploads promotional content.
6. Content is assigned to affiliates or cities.
7. Affiliate promotes products.
8. Customer purchases products.
9. Sales data is synchronized into the system.
10. Commission is calculated.
11. Payroll is generated.
12. Finance reviews payroll.
13. Payment is approved.
14. Affiliate receives payment.

---

# 5. Business Rules

The following business rules govern the affiliate program.

BR-001
Only approved affiliates may participate in promotional campaigns.

BR-002
Each affiliate must maintain complete profile information before becoming active.

BR-003
Each affiliate belongs to one operational city.

BR-004
Managers may manage all affiliate accounts.

BR-005
Affiliates may only access their own information.

BR-006
Content is distributed by management.

BR-007
One promotional content may be assigned to multiple affiliates.

BR-008
Commission is calculated only from valid sales records.

BR-009
Payroll requires approval before payment.

BR-010
All important activities must be recorded in the system log.

---

# 6. Business Events

The following events occur during normal business operations.

- Affiliate Registered
- Affiliate Approved
- Affiliate Suspended
- Content Uploaded
- Content Assigned
- Product Updated
- Order Imported
- Commission Calculated
- Payroll Generated
- Payroll Approved
- Payment Completed
- Notification Sent

Each event may trigger additional automated processes.

---

# 7. Business Constraints

Current business constraints include:

- The business operates using multiple external platforms.
- Sales data originates from third-party services.
- API availability depends on external providers.
- Business rules may evolve over time.

---

# 8. Assumptions

The following assumptions are made for Version 1.

- One company uses the system.
- Affiliates have internet access.
- Supported platforms provide usable APIs.
- Managers have authority to approve affiliate accounts.
- Payroll is processed after commission calculation.

---

# 9. Future Considerations

Future versions may include:

- AI-assisted reporting
- Mobile applications
- Multi-company support
- Additional marketplace integrations
- Advanced automation
