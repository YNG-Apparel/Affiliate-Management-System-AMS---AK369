# Products Database Design

## Overview

Stores products promoted by affiliates.

---

# Table: products

| Column | Type | Nullable | Description |
|---------|------|----------|-------------|
| id | UUID | No | Primary Key |
| category_id | UUID | No | FK product_categories.id |
| sku | VARCHAR(100) | No | Unique SKU |
| name | VARCHAR(255) | No | Product Name |
| description | TEXT | Yes | Product Description |
| image_url | TEXT | Yes | Product Image |
| price | DECIMAL(18,2) | No | Selling Price |
| commission_type | ENUM | No | Percentage or Fixed |
| commission_value | DECIMAL(18,2) | No | Commission Value |
| is_active | BOOLEAN | No | Product Status |
| created_at | TIMESTAMP | No | Created Time |
| updated_at | TIMESTAMP | No | Updated Time |

---

# Notes

- Products belong to one category.
- Products may be promoted by many affiliates.
- Commission configuration is stored with the product.

---

## Open Questions

None.
