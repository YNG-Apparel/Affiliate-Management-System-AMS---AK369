# Product Categories Database Design

## Overview

Stores product categories.

---

# Table: product_categories

| Column | Type | Nullable | Description |
|---------|------|----------|-------------|
| id | UUID | No | Primary Key |
| name | VARCHAR(100) | No | Category Name |
| description | TEXT | Yes | Description |
| is_active | BOOLEAN | No | Active Status |
| created_at | TIMESTAMP | No | Created Time |
| updated_at | TIMESTAMP | No | Updated Time |

---

# Notes

- One category contains many products.
- Categories can be disabled but not deleted.

---

## Open Questions

None.
