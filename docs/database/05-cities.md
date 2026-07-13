# Cities Database Design

## Overview

Stores the operational cities where affiliates are assigned.

---

# Table: cities

| Column | Type | Nullable | Description |
|---------|------|----------|-------------|
| id | UUID | No | Primary Key |
| code | VARCHAR(20) | No | Unique City Code |
| name | VARCHAR(100) | No | City Name |
| province | VARCHAR(100) | Yes | Province |
| is_active | BOOLEAN | No | Active Status |
| created_at | TIMESTAMP | No | Created Time |
| updated_at | TIMESTAMP | No | Updated Time |

---

# Notes

- One affiliate belongs to one city.
- One city has many affiliates.
- Cities can be deactivated but not deleted.

---

## Open Questions

None.
