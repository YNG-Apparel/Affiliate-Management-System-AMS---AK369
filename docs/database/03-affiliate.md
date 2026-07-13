# Affiliate Database Design

## Overview

The affiliates table stores business-specific information about an affiliate.

Authentication information belongs in the `users` table.

Personal information belongs in the `profiles` table.

Business information belongs here.

---

# Table: affiliates

## Purpose

Stores affiliate business information.

| Column              | Type         | Nullable | Description           |
| ------------------- | ------------ | -------- | --------------------- |
| id                  | UUID         | No       | Primary Key           |
| user_id             | UUID         | No       | FK users.id           |
| affiliate_code      | VARCHAR(20)  | No       | Unique Affiliate Code |
| tier_id             | SMALLINT     | No       | FK tiers.id           |
| city_id             | UUID         | No       | FK cities.id          |
| bank_id             | UUID         | Yes      | FK banks.id           |
| bank_account_name   | VARCHAR(150) | Yes      | Account Holder Name   |
| bank_account_number | VARCHAR(50)  | Yes      | Bank Account Number   |
| tiktok_username     | VARCHAR(100) | Yes      | TikTok Username       |
| shopee_username     | VARCHAR(100) | Yes      | Shopee Username       |
| tokopedia_username  | VARCHAR(100) | Yes      | Tokopedia Username    |
| joined_at           | TIMESTAMP    | No       | Approval Date         |
| approved_by         | UUID         | Yes      | FK users.id (Manager) |
| created_at          | TIMESTAMP    | No       | Created Time          |
| updated_at          | TIMESTAMP    | No       | Updated Time          |

---

# Relationship

users (1)

↓

affiliates (1)

Each affiliate is exactly one user.

---

# Notes

- Only users with role = Affiliate may have an affiliate record.
- Affiliate Code must be unique.
- Platform usernames are optional.
- Bank information may be completed after approval.
