# Commissions Database Design

## Overview

Stores the commission calculated for each attributed order. One order produces at most one
commission.

---

# Table: commissions

## Purpose

Stores per-order commission records and their approval state.

| Column          | Type          | Nullable | Description                        |
| --------------- | ------------- | -------- | ---------------------------------- |
| id              | UUID          | No       | Primary Key                        |
| order_id        | UUID          | No       | FK orders.id                       |
| affiliate_id    | UUID          | No       | FK affiliates.id                   |
| base_amount     | DECIMAL(18,2) | No       | Commission before tier multiplier  |
| tier_multiplier | DECIMAL(5,2)  | No       | Applied tier multiplier            |
| amount          | DECIMAL(18,2) | No       | Final commission amount            |
| status          | ENUM          | No       | Pending, Approved, Rejected, Paid  |
| approved_by     | UUID          | Yes      | FK users.id                        |
| approved_at     | TIMESTAMP     | Yes      | Approval Time                      |
| payroll_id      | UUID          | Yes      | FK payrolls.id (when included)     |
| created_at      | TIMESTAMP     | No       | Created Time                       |
| updated_at      | TIMESTAMP     | No       | Updated Time                       |

---

# Relationships

orders (1)
│
└──────< commissions (1)

affiliates (1)
│
└──────< commissions

---

# Notes

- `order_id` is unique — one order can generate only one commission.
- `amount = base_amount × tier_multiplier`.
- Only commissions with `status = Approved` feed into a payroll run.
- `payroll_id` links the commission to the run in which it was paid.

---

## Open Questions

None.
