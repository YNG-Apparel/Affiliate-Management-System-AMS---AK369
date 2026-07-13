# Vouchers Database Design

## Overview

Stores unique voucher codes issued per affiliate for sales attribution on platforms without
native tracking (Shopee, Tokopedia).

---

# Table: vouchers

## Purpose

Stores per-affiliate voucher codes used to attribute orders.

| Column         | Type          | Nullable | Description                |
| -------------- | ------------- | -------- | -------------------------- |
| id             | UUID          | No       | Primary Key                |
| affiliate_id   | UUID          | No       | FK affiliates.id           |
| code           | VARCHAR(50)   | No       | Unique Voucher Code        |
| platform       | ENUM          | No       | Shopee, Tokopedia          |
| product_id     | UUID          | Yes      | FK products.id             |
| discount_type  | ENUM          | Yes      | Percentage, Fixed          |
| discount_value | DECIMAL(18,2) | Yes      | Discount Value             |
| is_active      | BOOLEAN       | No       | Active Status              |
| valid_from     | TIMESTAMP     | Yes      | Validity Start             |
| valid_until    | TIMESTAMP     | Yes      | Validity End               |
| created_at     | TIMESTAMP     | No       | Created Time               |
| updated_at     | TIMESTAMP     | No       | Updated Time               |

---

# Relationship

affiliates (1)

↓

vouchers (0..many)

---

# Notes

- Voucher `code` is globally unique and maps an order back to the issuing affiliate.
- Used for Shopee and Tokopedia, where native affiliate tracking is unavailable.
- TikTok orders are attributed natively and do not require a voucher.
- Orders reference the voucher via `orders.voucher_id`.

---

## Open Questions

None.
