# Authentication Database Design

## Overview

The Authentication module manages user authentication, authorization, email verification, password reset, and account lifecycle.

---

# Table: roles

## Purpose

Stores the available user roles.

| Column      | Type        | Nullable | Description      |
| ----------- | ----------- | -------- | ---------------- |
| id          | SMALLINT    | No       | Primary Key      |
| name        | VARCHAR(50) | No       | Role Name        |
| description | TEXT        | Yes      | Role Description |

## Seed Data

| id  | Role        |
| --- | ----------- |
| 1   | Super Admin |
| 2   | Manager     |
| 3   | Finance     |
| 4   | Marketing   |
| 5   | Affiliate   |

---

# Table: users

## Purpose

Stores authentication credentials and basic user information.

| Column            | Type         | Nullable | Description                                    |
| ----------------- | ------------ | -------- | ---------------------------------------------- |
| id                | UUID         | No       | Primary Key                                    |
| role_id           | SMALLINT     | No       | FK դեպի roles.id                               |
| full_name         | VARCHAR(150) | No       | User Full Name                                 |
| email             | VARCHAR(255) | No       | Unique Email                                   |
| password_hash     | TEXT         | No       | Argon2 Password Hash                           |
| email_verified_at | TIMESTAMP    | Yes      | Email Verification Time                        |
| status            | ENUM         | No       | Pending, Active, Suspended, Inactive, Archived |
| last_login_at     | TIMESTAMP    | Yes      | Last Login                                     |
| created_at        | TIMESTAMP    | No       | Created Time                                   |
| updated_at        | TIMESTAMP    | No       | Updated Time                                   |
| archived_at       | TIMESTAMP    | Yes      | Soft Delete Timestamp                          |

---

# Table: password_reset_tokens

## Purpose

Stores password reset requests.

| Column     | Type      | Nullable | Description        |
| ---------- | --------- | -------- | ------------------ |
| id         | UUID      | No       | Primary Key        |
| user_id    | UUID      | No       | FK users.id        |
| token      | TEXT      | No       | Secure Reset Token |
| expires_at | TIMESTAMP | No       | Expiration Time    |
| used_at    | TIMESTAMP | Yes      | Token Usage Time   |
| created_at | TIMESTAMP | No       | Created Time       |

---

# Table: email_verification_tokens

## Purpose

Stores email verification requests.

| Column      | Type      | Nullable | Description        |
| ----------- | --------- | -------- | ------------------ |
| id          | UUID      | No       | Primary Key        |
| user_id     | UUID      | No       | FK users.id        |
| token       | TEXT      | No       | Verification Token |
| expires_at  | TIMESTAMP | No       | Expiration Time    |
| verified_at | TIMESTAMP | Yes      | Verification Time  |
| created_at  | TIMESTAMP | No       | Created Time       |

---

# Relationships

roles (1)
│
└──────< users

users (1)
│
├──────< password_reset_tokens

    └──────< email_verification_tokens

---

# Notes

- One user has exactly one role.
- Email addresses must be unique.
- Passwords are stored using Argon2 hashing.
- Users are never physically deleted.
- Soft delete is implemented using `archived_at`.
- Authentication only checks users with `status = Active`.
