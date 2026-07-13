# Authentication Module

## Status

Draft

## Objective

Provide secure authentication and authorization for all users.

---

# User Types

- Super Admin
- Manager
- Finance
- Marketing
- Affiliate

---

# Authentication Method

- Email
- Password

---

# Registration

## Manager

- Created by Super Admin

## Affiliate

- Self Registration
- Email Verification Required
- Account Status = Pending
- Requires Manager Approval

---

# Login Rules

Users can login only if:

- Email is verified
- Status = Active

Users cannot login if:

- Pending
- Suspended
- Archived
- Inactive

---

# Forgot Password

Supported

Flow:

Forgot Password

↓

Email Link

↓

Reset Password

↓

Login

---

# Remember Me

Supported

---

# Multiple Devices

Allowed

---

# Session

JWT Access Token

Refresh Token

---

# Security

- Password Hashing (Argon2)
- HTTPS
- Rate Limiting
- Secure Cookies

---

# Future Features

- Google Login
- Two-Factor Authentication
