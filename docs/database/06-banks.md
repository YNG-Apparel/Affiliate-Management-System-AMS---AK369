# Banks Database Design

## Overview

Stores the list of supported banks.

---

# Table: banks

| Column | Type | Nullable | Description |
|---------|------|----------|-------------|
| id | UUID | No | Primary Key |
| code | VARCHAR(20) | No | Bank Code |
| name | VARCHAR(100) | No | Bank Name |
| is_active | BOOLEAN | No | Active Status |
| created_at | TIMESTAMP | No | Created Time |
| updated_at | TIMESTAMP | No | Updated Time |

---

# Notes

- One bank can be used by many affiliates.
- Banks are managed by Super Admin.

---

## Open Questions

None.
