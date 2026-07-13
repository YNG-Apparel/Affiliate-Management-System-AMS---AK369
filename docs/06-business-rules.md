# 6. Business Rules

## Overview
This document captures the business policies and operational rules that govern the AMS.

## General Rules
- An affiliate must be approved before receiving commissions.
- Commissions are calculated based on approved sales only.
- Payouts must be reviewed and approved before disbursement.
- The same order must never generate duplicate commissions.
- Users must have appropriate roles and permissions to access sensitive functionality.

## Affiliate Type Rules
- Every affiliate is either **Freelance** or **Internal**.
- Freelance affiliates are paid on performance only (commission + bonuses); they have no base salary.
- Internal affiliates receive a fixed monthly base salary in addition to commission and bonuses.
- Only Internal affiliates are included in base-salary payroll runs.
- A Freelance affiliate may be promoted to Internal by a Manager once performance targets are met.

## Content Security Rules
- Content flagged as film/drama must never be assigned to Freelance affiliates.
- Affiliates may only access content that is explicitly assigned to them.
- Distributed content is watermarked with the affiliate identifier before it reaches the affiliate.
- Source media is uploaded directly to the platform and must never pass through an affiliate device.
- Every content access, assignment, and publish action is recorded in the activity log.

## Tier & Bonus Rules
- Each affiliate belongs to exactly one tier: Starter (1.0×), Advanced (1.2×), or Elite (1.5×).
- The tier multiplier is applied to bonus calculations.
- Tier changes are performed by the system or a Manager based on performance.
