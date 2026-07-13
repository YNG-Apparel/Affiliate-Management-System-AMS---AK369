# Affiliate Database Design

## Overview

The affiliates table stores business-specific information about an affiliate.

Authentication information belongs in the `users` table.

Personal information belongs in the `profiles` table.

Business information belongs here.

An affiliate is one of two types:

- **Freelance** — external self-onboarded affiliates. Paid on performance only (commission and bonuses). Restricted from high-value content such as film/drama.
- **Internal** — company-employed affiliates. Receive a fixed base salary in addition to commission and bonuses, and may access all content.

A high-performing Freelance affiliate may be promoted to Internal.

---

# Table: affiliates

## Purpose

Stores affiliate business information.

| Column              | Type          | Nullable | Description                         |
| ------------------- | ------------- | -------- | ----------------------------------- |
| id                  | UUID          | No       | Primary Key                         |
| user_id             | UUID          | No       | FK users.id                         |
| affiliate_code      | VARCHAR(20)   | No       | Unique Affiliate Code               |
| affiliate_type      | ENUM          | No       | Freelance, Internal                 |
| tier_id             | SMALLINT      | No       | FK tiers.id                         |
| city_id             | UUID          | No       | FK cities.id                        |
| base_salary         | DECIMAL(18,2) | Yes      | Monthly base salary (Internal only) |
| bank_id             | UUID          | Yes      | FK banks.id                         |
| bank_account_name   | VARCHAR(150)  | Yes      | Account Holder Name                 |
| bank_account_number | VARCHAR(50)   | Yes      | Bank Account Number                 |
| tiktok_username     | VARCHAR(100)  | Yes      | TikTok Username                     |
| shopee_username     | VARCHAR(100)  | Yes      | Shopee Username                     |
| tokopedia_username  | VARCHAR(100)  | Yes      | Tokopedia Username                  |
| joined_at           | TIMESTAMP     | No       | Approval Date                       |
| approved_by         | UUID          | Yes      | FK users.id (Manager)               |
| promoted_at         | TIMESTAMP     | Yes      | Freelance → Internal promotion date |
| promoted_by         | UUID          | Yes      | FK users.id (Manager)               |
| created_at          | TIMESTAMP     | No       | Created Time                        |
| updated_at          | TIMESTAMP     | No       | Updated Time                        |

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
- `affiliate_type` defaults to `Freelance` on self-registration.
- `base_salary` must be `NULL` for Freelance and set for Internal.
- Freelance affiliates are excluded from base-salary payroll runs.
- Content flagged as film/drama must never be assigned to Freelance affiliates (see `docs/database/12-content.md`).
- Promotion from Freelance to Internal is a manual Manager action; it sets `affiliate_type = Internal`, `base_salary`, `promoted_at`, and `promoted_by`.
