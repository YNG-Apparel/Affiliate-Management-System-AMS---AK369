# Activity Logs Database Design

## Overview

Stores an immutable audit trail of important actions across the system, including content
access, distribution, approvals, and payments.

---

# Table: activity_logs

## Purpose

Stores audit records for security, compliance, and content-security tracking.

| Column      | Type         | Nullable | Description                              |
| ----------- | ------------ | -------- | ---------------------------------------- |
| id          | BIGINT       | No       | Primary Key (auto-increment)             |
| user_id     | UUID         | Yes      | FK users.id (actor; null for system)     |
| action      | VARCHAR(100) | No       | Action key (e.g. content.assigned)       |
| entity_type | VARCHAR(100) | Yes      | Affected entity type                     |
| entity_id   | UUID         | Yes      | Affected entity ID                       |
| metadata    | JSONB        | Yes      | Additional context                       |
| ip_address  | VARCHAR(45)  | Yes      | Actor IP Address                         |
| created_at  | TIMESTAMP    | No       | Event Time                               |

---

# Relationship

users (1)

↓

activity_logs (0..many)

---

# Notes

- Records are append-only and must never be updated or deleted.
- Every content access and download is logged to support content-security requirements.
- Key audited events include: content assigned/accessed/published, affiliate approved/suspended,
  commission approved, payroll approved, payment completed.
- `metadata` stores action-specific details as JSON.

---

## Open Questions

None.
