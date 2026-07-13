# Content Database Design

## Overview

Stores the promotional content library, its media files, and its distribution to affiliates.

- `contents` — a logical content item (promo, film, drama, poster).
- `media` — the uploaded files belonging to a content item.
- `content_assignments` — the distribution of a content item to an affiliate.

---

# Table: contents

## Purpose

Stores content library items.

| Column       | Type         | Nullable | Description                       |
| ------------ | ------------ | -------- | --------------------------------- |
| id           | UUID         | No       | Primary Key                       |
| title        | VARCHAR(255) | No       | Content Title                     |
| description  | TEXT         | Yes      | Description                       |
| content_type | ENUM         | No       | Promo, Film, Drama, Poster        |
| category     | VARCHAR(100) | Yes      | Content Category                  |
| product_id   | UUID         | Yes      | FK products.id (yellow-cart item) |
| status       | ENUM         | No       | Draft, Ready, Archived            |
| scheduled_at | TIMESTAMP    | Yes      | Default scheduled publish time    |
| created_by   | UUID         | No       | FK users.id                       |
| created_at   | TIMESTAMP    | No       | Created Time                      |
| updated_at   | TIMESTAMP    | No       | Updated Time                      |

---

# Table: media

## Purpose

Stores the files belonging to a content item. Files are uploaded directly to object storage
and never pass through an affiliate device.

| Column      | Type         | Nullable | Description               |
| ----------- | ------------ | -------- | ------------------------- |
| id          | UUID         | No       | Primary Key               |
| content_id  | UUID         | No       | FK contents.id            |
| media_type  | ENUM         | No       | Video, Image, Poster      |
| storage_key | TEXT         | No       | Object storage key        |
| mime_type   | VARCHAR(100) | Yes      | MIME Type                 |
| size_bytes  | BIGINT       | Yes      | File Size                 |
| created_at  | TIMESTAMP    | No       | Created Time              |

---

# Table: content_assignments

## Purpose

Stores the distribution of a content item to a specific affiliate, including the per-affiliate
watermarked output and posting status.

| Column                 | Type      | Nullable | Description                       |
| ---------------------- | --------- | -------- | --------------------------------- |
| id                     | UUID      | No       | Primary Key                       |
| content_id             | UUID      | No       | FK contents.id                    |
| affiliate_id           | UUID      | No       | FK affiliates.id                  |
| city_id                | UUID      | Yes      | FK cities.id (assignment scope)   |
| caption                | TEXT      | Yes      | Rendered caption from template    |
| watermarked_media_key  | TEXT      | Yes      | Per-affiliate watermarked output  |
| status                 | ENUM      | No       | Pending, Sent, Published, Failed  |
| scheduled_at           | TIMESTAMP | Yes      | Scheduled publish time            |
| published_at           | TIMESTAMP | Yes      | Actual publish time               |
| created_at             | TIMESTAMP | No       | Created Time                      |
| updated_at             | TIMESTAMP | No       | Updated Time                      |

---

# Relationships

contents (1)
│
├──────< media
│
└──────< content_assignments

affiliates (1)
│
└──────< content_assignments

---

# Notes

- Content with `content_type` in (Film, Drama) must never be assigned to Freelance affiliates.
- Watermarking embeds the affiliate identifier before distribution; the output is stored per
  assignment in `watermarked_media_key`.
- The linked `product_id` is auto-attached to the affiliate's TikTok draft (yellow cart).
- One content item may be assigned to many affiliates; assignment scope can be a whole city.
- `status` on `content_assignments` powers the per-account posting monitor.

---

## Open Questions

None.
