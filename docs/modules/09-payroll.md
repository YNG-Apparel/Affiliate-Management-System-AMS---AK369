# 9. Payroll

## Overview
This module automatically calculates each affiliate's total earnings for a period and manages
the review, approval, and payout workflow. It removes the manual monthly calculation of salary,
bonuses, and tier multipliers.

## Earnings Components
A payroll run aggregates the following per affiliate:

- **Base Salary** — fixed monthly amount for **Internal** affiliates only. Freelance affiliates
  have no base salary.
- **Sales Bonus** — commission earned from attributed orders (percentage of GMV or per order,
  configured per affiliate/product).
- **TikTok LIVE Gift Bonus** — bonus derived from gifts/diamonds received during LIVE sessions.
- **Tier Multiplier** — the affiliate's tier multiplier (Starter 1.0×, Advanced 1.2×,
  Elite 1.5×) applied to eligible bonus components.

Formula (per affiliate, per period):

```
total = base_salary (Internal only)
      + sales_bonus
      + live_gift_bonus
      × tier_multiplier applied to eligible bonuses
```

## Functional Scope
- Generate payroll runs for a period.
- Calculate each earnings component automatically from approved commission and sales data.
- Apply the tier multiplier.
- Review payout eligibility per affiliate.
- Approval workflow — Finance/Manager reviews and approves the batch before payout.
- Track payment status per affiliate (pending, approved, paid, failed).
- **Bulk transfer export** — generate a mass-transfer file for internet banking.
- Maintain payment history.

## Data
- `payrolls`, `payroll_items` (see `docs/database/16-payroll.md`).
- Depends on approved `commissions` and `orders`.

## Notes
Payroll runs only after commissions are calculated and approved. Base salary applies exclusively
to Internal affiliates; all other components apply to both affiliate types. Every run must pass
the approval workflow before any payout file is generated.
