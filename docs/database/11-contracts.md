# Contracts Database Design

## Overview

Stores digital affiliate contracts and their signing state.

Contracts are read and accepted digitally during onboarding.

---

# Table: contracts

## Purpose

Stores contract documents signed by affiliates.

| Column       | Type        | Nullable | Description                     |
| ------------ | ----------- | -------- | ------------------------------- |
| id           | UUID        | No       | Primary Key                     |
| user_id      | UUID        | No       | FK users.id                     |
| version      | VARCHAR(20) | No       | Contract Version                |
| document_key | TEXT        | No       | Object storage key for document |
| status       | ENUM        | No       | Pending, Signed, Declined       |
| signed_at    | TIMESTAMP   | Yes      | Signature Time                  |
| ip_address   | VARCHAR(45) | Yes      | IP at signing                   |
| created_at   | TIMESTAMP   | No       | Created Time                    |
| updated_at   | TIMESTAMP   | No       | Updated Time                    |

---

# Relationship

users (1)

↓

contracts (0..many)

---

# Notes

- A signed contract is required before an affiliate becomes Active.
- `version` allows re-signing when contract terms change.
- `signed_at` and `ip_address` provide an audit trail for consent.
- Contract documents are stored in object storage; only the key is kept here.

---

## Open Questions

None.
