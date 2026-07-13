# Roles Database Design

## Overview

Defines the available user roles in the system.

---

# Table: roles

| Column      | Type        | Nullable | Description      |
| ----------- | ----------- | -------- | ---------------- |
| id          | SMALLINT    | No       | Primary Key      |
| name        | VARCHAR(50) | No       | Unique Role Name |
| description | TEXT        | Yes      | Role Description |

---

# Seed Data

| ID  | Name        |
| --- | ----------- |
| 1   | Super Admin |
| 2   | Manager     |
| 3   | Finance     |
| 4   | Marketing   |
| 5   | Affiliate   |

---

# Notes

- Roles are seeded during system initialization.
- Roles cannot be deleted.
- Only Super Admin can manage roles.

---

## Open Questions

None.
