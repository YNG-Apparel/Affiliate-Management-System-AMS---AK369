# Entity Relationship Diagram (ERD)

```text
roles
│
└──────────────┐
               │
            users ───────< kyc
               │        ───< contracts
               │        ───< activity_logs
      ┌────────┴────────┐
      │                 │
   profiles        affiliates
                        │
      ┌─────────┬───────┼─────────┬──────────┬───────────┐
      │         │       │         │          │           │
    cities    banks   tiers    vouchers   withdrawals  payroll_items
                        │         │
product_categories      │      orders ──< commissions
        │               │         │            │
    products ───────────┘      (voucher)    payrolls ──< payroll_items
        │
     contents ──< media
        │
     content_assignments >── affiliates
```

---

# Relationships

## roles

1 → Many users

---

## users

1 → 1 profiles

1 → 0..1 affiliates

1 → 0..1 kyc

1 → 0..many contracts

1 → 0..many activity_logs

---

## affiliates

Many → 1 cities

Many → 1 banks

Many → 1 tiers

1 → 0..many vouchers

1 → 0..many orders

1 → 0..many withdrawals

1 → 0..many content_assignments

1 → 0..many payroll_items

---

## product_categories

1 → Many products

---

## contents

1 → Many media

1 → Many content_assignments

Many → 1 products (yellow-cart item)

---

## orders

Many → 1 affiliates

Many → 1 products

Many → 0..1 vouchers

1 → 0..1 commissions

---

## payrolls

1 → Many payroll_items

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

kyc.id

contracts.id

contents.id

media.id

content_assignments.id

vouchers.id

orders.id

commissions.id

payrolls.id

payroll_items.id

withdrawals.id

activity_logs.id

---

# Foreign Keys

users.role_id → roles.id

profiles.user_id → users.id

affiliates.user_id → users.id

affiliates.city_id → cities.id

affiliates.bank_id → banks.id

affiliates.tier_id → tiers.id

products.category_id → product_categories.id

kyc.user_id → users.id

contracts.user_id → users.id

contents.product_id → products.id

contents.created_by → users.id

media.content_id → contents.id

content_assignments.content_id → contents.id

content_assignments.affiliate_id → affiliates.id

content_assignments.city_id → cities.id

vouchers.affiliate_id → affiliates.id

vouchers.product_id → products.id

orders.affiliate_id → affiliates.id

orders.product_id → products.id

orders.voucher_id → vouchers.id

commissions.order_id → orders.id

commissions.affiliate_id → affiliates.id

commissions.payroll_id → payrolls.id

payrolls.generated_by → users.id

payroll_items.payroll_id → payrolls.id

payroll_items.affiliate_id → affiliates.id

withdrawals.affiliate_id → affiliates.id

withdrawals.bank_id → banks.id

activity_logs.user_id → users.id
