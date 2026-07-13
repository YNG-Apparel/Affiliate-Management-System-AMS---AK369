# Entity Relationship Diagram (ERD)

```text
roles
│
└──────────────┐
               │
            users
               │
      ┌────────┴────────┐
      │                 │
   profiles        affiliates
                        │
      ┌─────────────────┼─────────────────┐
      │                 │                 │
    cities           banks            tiers

product_categories
        │
        │
    products
```

---

# Relationships

## roles

1 → Many users

---

## users

1 → 1 profiles

1 → 0..1 affiliates

---

## affiliates

Many → 1 cities

Many → 1 banks

Many → 1 tiers

---

## product_categories

1 → Many products

---

# Primary Keys

roles.id

users.id

profiles.id

affiliates.id

cities.id

banks.id

tiers.id

product_categories.id

products.id

---

# Foreign Keys

users.role_id → roles.id

profiles.user_id → users.id

affiliates.user_id → users.id

affiliates.city_id → cities.id

affiliates.bank_id → banks.id

affiliates.tier_id → tiers.id

products.category_id → product_categories.id
