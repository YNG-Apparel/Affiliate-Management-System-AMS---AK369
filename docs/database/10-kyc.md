# KYC Database Design

## Overview

Stores identity verification records submitted during affiliate onboarding.

Each record holds the affiliate's KTP (national ID) and selfie for manual verification by a Manager.

---

# Table: kyc

## Purpose

Stores KYC submissions and their verification state.

| Column           | Type        | Nullable | Description                    |
| ---------------- | ----------- | -------- | ------------------------------ |
| id               | UUID        | No       | Primary Key                    |
| user_id          | UUID        | No       | FK users.id                    |
| ktp_number       | VARCHAR(50) | Yes      | National ID Number (encrypted) |
| ktp_image_key    | TEXT        | No       | Object storage key for KTP     |
| selfie_image_key | TEXT        | No       | Object storage key for selfie  |
| status           | ENUM        | No       | Pending, Verified, Rejected    |
| rejection_reason | TEXT        | Yes      | Reason when rejected           |
| verified_by      | UUID        | Yes      | FK users.id (Manager)          |
| verified_at      | TIMESTAMP   | Yes      | Verification Time              |
| created_at       | TIMESTAMP   | No       | Created Time                   |
| updated_at       | TIMESTAMP   | No       | Updated Time                   |

---

# Relationship

users (1)

↓

kyc (0..1)

---

# Notes

- KYC is required for Freelance affiliates during digital onboarding.
- Images are stored in object storage; only the storage key is kept in the database.
- `ktp_number` must be encrypted at rest.
- An affiliate cannot become Active until KYC is Verified.

---

## Open Questions

None.
