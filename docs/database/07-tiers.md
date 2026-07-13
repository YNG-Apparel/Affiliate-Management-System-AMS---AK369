# Tiers Database Design

## Overview

Defines affiliate performance levels.

---

# Table: tiers

| Column | Type | Nullable | Description |
|---------|------|----------|-------------|
| id | SMALLINT | No | Primary Key |
| name | VARCHAR(50) | No | Tier Name |
| level | SMALLINT | No | Tier Order |
| multiplier | DECIMAL(5,2) | No | Bonus Multiplier |
| description | TEXT | Yes | Description |
| is_active | BOOLEAN | No | Active Status |

---

# Seed Data

| ID | Name | Level | Multiplier |
|----|------|-------|------------|
| 1 | Starter | 1 | 1.00 |
| 2 | Advanced | 2 | 1.20 |
| 3 | Elite | 3 | 1.50 |

---

# Notes

- Each affiliate belongs to one tier.
- Tier changes are handled by the system or managers.
- Multipliers are used in commission calculations.

---

## Open Questions

None.
