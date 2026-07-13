# Withdrawals Database Design

## Overview

Stores affiliate-initiated withdrawal requests for available earnings and their review state.

---

# Table: withdrawals

## Purpose

Stores withdrawal requests and their approval/payment status.

| Column              | Type          | Nullable | Description                        |
| ------------------- | ------------- | -------- | ---------------------------------- |
| id                  | UUID          | No       | Primary Key                        |
| affiliate_id        | UUID          | No       | FK affiliates.id                   |
| amount              | DECIMAL(18,2) | No       | Requested Amount                   |
| bank_id             | UUID          | Yes      | FK banks.id                        |
| bank_account_name   | VARCHAR(150)  | Yes      | Account Holder Name                |
| bank_account_number | VARCHAR(50)   | Yes      | Bank Account Number                |
| status              | ENUM          | No       | Requested, Approved, Rejected, Paid |
| requested_at        | TIMESTAMP     | No       | Request Time                       |
| reviewed_by         | UUID          | Yes      | FK users.id                        |
| reviewed_at         | TIMESTAMP     | Yes      | Review Time                        |
| paid_at             | TIMESTAMP     | Yes      | Payment Time                       |
| note                | TEXT          | Yes      | Review/rejection note              |
| created_at          | TIMESTAMP     | No       | Created Time                       |
| updated_at          | TIMESTAMP     | No       | Updated Time                       |

---

# Relationship

affiliates (1)

↓

withdrawals (0..many)

---

# Notes

- Bank details are snapshotted at request time in case the affiliate later changes them.
- A withdrawal cannot exceed the affiliate's available balance.
- Withdrawals require review and approval before payment.

---

## Open Questions

None.
