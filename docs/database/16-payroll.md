# Payroll Database Design

## Overview

Stores payroll runs and their per-affiliate line items.

- `payrolls` — a payroll run for a period.
- `payroll_items` — the calculated earnings for one affiliate within a run.

---

# Table: payrolls

## Purpose

Stores a payroll run for a period.

| Column       | Type          | Nullable | Description                             |
| ------------ | ------------- | -------- | --------------------------------------- |
| id           | UUID          | No       | Primary Key                             |
| period_start | DATE          | No       | Period Start                            |
| period_end   | DATE          | No       | Period End                              |
| status       | ENUM          | No       | Draft, PendingApproval, Approved, Paid  |
| total_amount | DECIMAL(18,2) | No       | Sum of all line items                   |
| generated_by | UUID          | No       | FK users.id                             |
| approved_by  | UUID          | Yes      | FK users.id (Finance/Manager)           |
| approved_at  | TIMESTAMP     | Yes      | Approval Time                           |
| created_at   | TIMESTAMP     | No       | Created Time                            |
| updated_at   | TIMESTAMP     | No       | Updated Time                            |

---

# Table: payroll_items

## Purpose

Stores the calculated earnings for one affiliate within a payroll run.

| Column          | Type          | Nullable | Description                        |
| --------------- | ------------- | -------- | ---------------------------------- |
| id              | UUID          | No       | Primary Key                        |
| payroll_id      | UUID          | No       | FK payrolls.id                     |
| affiliate_id    | UUID          | No       | FK affiliates.id                   |
| base_salary     | DECIMAL(18,2) | No       | Base salary (Internal; 0 for Freelance) |
| sales_bonus     | DECIMAL(18,2) | No       | Commission/sales bonus             |
| live_gift_bonus | DECIMAL(18,2) | No       | TikTok LIVE gift/diamond bonus     |
| tier_multiplier | DECIMAL(5,2)  | No       | Applied tier multiplier            |
| total_amount    | DECIMAL(18,2) | No       | Total payable for this affiliate   |
| payment_status  | ENUM          | No       | Pending, Paid, Failed              |
| paid_at         | TIMESTAMP     | Yes      | Payment Time                       |
| created_at      | TIMESTAMP     | No       | Created Time                       |
| updated_at      | TIMESTAMP     | No       | Updated Time                       |

---

# Relationships

payrolls (1)
│
└──────< payroll_items

affiliates (1)
│
└──────< payroll_items

---

# Notes

- `(payroll_id, affiliate_id)` is unique — one line item per affiliate per run.
- `base_salary` is only populated for Internal affiliates; Freelance items use 0.
- The tier multiplier is applied to eligible bonus components (see `docs/modules/09-payroll.md`).
- A run must reach `status = Approved` before an internet-banking transfer file is exported.

---

## Open Questions

None.
