# Profile Database Design

## Overview

The profiles table stores personal information about users.

Authentication data is stored in the `users` table.

---

# Table: profiles

## Purpose

Stores user profile information.

| Column     | Type        | Nullable | Description     |
| ---------- | ----------- | -------- | --------------- |
| id         | UUID        | No       | Primary Key     |
| user_id    | UUID        | No       | FK users.id     |
| phone      | VARCHAR(20) | Yes      | Phone Number    |
| avatar_url | TEXT        | Yes      | Profile Picture |
| gender     | ENUM        | Yes      | Male, Female    |
| birth_date | DATE        | Yes      | Date of Birth   |
| created_at | TIMESTAMP   | No       | Created Time    |
| updated_at | TIMESTAMP   | No       | Updated Time    |

---

# Relationship

users (1)

↓

profiles (1)

Each user has exactly one profile.

---

# Notes

Authentication data must never be stored inside this table.

Only profile information belongs here.
