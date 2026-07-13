# Orders Database Design

## Overview

Stores sales orders imported from external platforms and attributed to the affiliate that
generated them.

---

# Table: orders

## Purpose

Stores imported multi-platform sales orders.

| Column            | Type          | Nullable | Description                          |
| ----------------- | ------------- | -------- | ------------------------------------ |
| id                | UUID          | No       | Primary Key                          |
| affiliate_id      | UUID          | No       | FK affiliates.id (attributed seller) |
| product_id        | UUID          | Yes      | FK products.id                       |
| voucher_id        | UUID          | Yes      | FK vouchers.id (Shopee/Tokopedia)    |
| platform          | ENUM          | No       | TikTok, Shopee, Tokopedia            |
| external_order_id | VARCHAR(100)  | No       | Order ID from the platform           |
| quantity          | INT           | No       | Quantity Ordered                     |
| gross_amount      | DECIMAL(18,2) | No       | Order GMV                            |
| status            | ENUM          | No       | Pending, Completed, Cancelled, Refunded |
| ordered_at        | TIMESTAMP     | No       | Order Time on Platform               |
| imported_at       | TIMESTAMP     | No       | Import Time into AMS                 |
| created_at        | TIMESTAMP     | No       | Created Time                         |
| updated_at        | TIMESTAMP     | No       | Updated Time                         |

---

# Relationships

affiliates (1)
│
└──────< orders

products (1)
│
└──────< orders

vouchers (1)
│
└──────< orders

---

# Notes

- `(platform, external_order_id)` is unique to prevent duplicate imports.
- TikTok orders are attributed natively; Shopee/Tokopedia use `voucher_id`.
- Only orders with `status = Completed` are eligible for commission.
- Commissions are calculated from orders in the `commissions` table.

---

## Open Questions

None.
