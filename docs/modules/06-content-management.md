# 6. Content Management

## Overview
This module manages the promotional content library and its centralized, one-to-many
distribution to affiliates. Managers and Marketing staff upload content once and distribute
it to hundreds of affiliate accounts by target city, with products auto-attached and content
protected against misuse.

## Functional Scope

### Content Library
- Upload and organize media (videos, images, posters) in a central repository.
- Categorize content and flag sensitive categories such as film/drama.
- Search and filter across thousands of items.

### Central Distribution
- Distribute one content item to many affiliates in a single action.
- Assign by city/region or to specific affiliates.
- Caption templates with variables (city, affiliate name, voucher code).
- Scheduled posting at a configured publish time.
- Per-account status monitor: sent, failed, or pending.

### Yellow Cart (Keranjang Kuning)
- Products are auto-attached to the affiliate's TikTok draft when content is distributed.
- Affiliate only has to press publish — no manual product linking.
- Product assignment respects per-affiliate product eligibility.

### Content Security
- **Automatic watermark** — the affiliate identifier is embedded into each item before it
  reaches the affiliate.
- **Direct upload** — source media goes straight to the platform; it never passes through or
  is downloadable to an affiliate's device.
- **Restricted access** — affiliates only see content explicitly assigned to them.
- **Film/drama blocking** — high-value film/drama content can never be assigned to Freelance
  affiliates (enforced against `affiliates.affiliate_type`).
- **Activity logging** — every access, assignment, and publish action is recorded permanently.

## Data
- `media`, `contents`, `content_assignments` (see `docs/database/12-content.md`).
- Content type/category drives the film/drama blocking rule.

## Notes
Content management is a signature capability of the platform. It converts what was manual
coordination across hundreds of accounts into a single distribution action, while protecting
high-value assets through watermarking, direct upload, and access control.
