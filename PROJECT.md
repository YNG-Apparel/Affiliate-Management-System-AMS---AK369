Affiliate Management System (AMS)

Version: 1.0

Status: Planning

Project Type: Enterprise SaaS

Developer: Vio (Solo Developer)

1. Project Overview

Affiliate Management System (AMS) is a centralized platform that helps companies manage hundreds or thousands of affiliates from one system.

Instead of using Excel, WhatsApp, Google Drive, and manual payroll, everything is integrated into one platform.

The system is designed to:

Manage affiliates
Manage promotional content
Track sales
Calculate commissions
Calculate payroll
Monitor performance
Generate reports

The proposal targets businesses with approximately 500+ affiliates, so scalability is an important consideration.

2. Problem Statement

Without AMS, the company experiences:

Manual affiliate registration
Manual payroll calculation
Spreadsheet management
Manual content sharing
No centralized dashboard
Difficult performance monitoring
Sales data spread across multiple platforms

AMS solves these operational problems by providing a centralized management platform.

3.  System Architecture
    Affiliate Management System

                        ┌──────────────────────┐
                        │    Manager Dashboard │
                        │      (Web App)       │
                        └──────────┬───────────┘
                                   │
                                   │
                        ┌──────────▼───────────┐
                        │     Backend API      │
                        │ Business Logic Layer │
                        └──────────┬───────────┘
                                   │
              ┌────────────────────┼─────────────────────┐
              │                    │                     │
        PostgreSQL           Object Storage         Queue Jobs
              │                    │                     │
              └────────────────────┼─────────────────────┘
                                   │
                     TikTok / Shopee / Tokopedia APIs
                                   │
                        ┌──────────▼───────────┐
                        │    Affiliate Portal  │
                        │    PWA / Mobile      │
                        └──────────────────────┘

4.  Users
    Manager

Internal company staff.

Responsibilities:

Approve affiliates
Upload content
Manage products
Monitor performance
Manage payroll
View reports
Configure commission rules

Permission Level:

Highest

Affiliate

External users.

Responsibilities:

Register
Complete profile
Upload KTP
View assigned content
Publish promotions
Monitor earnings
Request withdrawals

Permission Level:

Limited to personal account.

5. Business Flow
   Affiliate registers

↓

Manager approves

↓

Affiliate receives account

↓

Manager uploads content

↓

Content assigned

↓

Affiliate publishes

↓

Sales generated

↓

Sales imported

↓

Commission calculated

↓

Manager approves payroll

↓

Affiliate receives payment 6. Major Modules
Module 1

Authentication

Purpose

Manage user access.

Features

Login
Register
Forgot Password
Email Verification
Role Management
Session Management
Module 2

Affiliate Management

Purpose

Manage all affiliates.

Features

Create
Edit
Delete
Suspend
Approve
Reject
Search
Filter
Bank Information
City Assignment
Tier Assignment
Module 3

Product Management

Purpose

Store all products.

Features

CRUD
Product Images
Price
Commission Rate
SKU
Status
Module 4

Content Management

Purpose

Store promotional materials.

Features

Upload Videos
Upload Images
Upload Posters
Categories
Search
Assign to City
Assign to Affiliate
Schedule
Module 5

Sales Tracking

Purpose

Monitor affiliate sales.

Features

Orders
Revenue
Commission
Sales History
Daily Statistics
Monthly Statistics
Module 6

Payroll

Purpose

Automatically calculate affiliate income.

Features

Commission
Salary
Bonus
Tier Multiplier
Payment Approval
Payment History
Module 7

Tier System

Purpose

Reward high-performing affiliates.

Levels

Starter

↓

Advanced

↓

Elite

Each level increases commission or bonuses.

Module 8

Reporting

Purpose

Provide management insights.

Reports

Sales
Revenue
Affiliate Ranking
Payroll
Product Performance
Monthly Reports
Module 9

Notifications

Purpose

Notify affiliates.

Examples

New Content
Payment Approved
Promotion
Account Approved
Module 10

Settings

Purpose

Configure business rules.

Examples

Commission Rates
Tier Rules
Cities
Categories
Payroll Settings 7. Integrations

Phase 1

TikTok Shop

Phase 2

Shopee

Phase 3

Tokopedia

Future

WhatsApp
Firebase
Email 8. Expected Database

Estimated tables

users

roles

permissions

affiliates

cities

banks

products

categories

media

contents

content_assignments

orders

commissions

payrolls

withdrawals

tiers

notifications

kyc

contracts

activity_logs

settings

Around 20–30 core tables is a reasonable starting point. We can add more later as integrations and advanced features are implemented.

9. Non-Functional Requirements

The system should support:

500+ affiliates
Fast dashboard loading
Mobile responsive design
Secure authentication
Audit logs
Daily backups
Scalable architecture 10. Success Criteria

A successful AMS should allow the company to:

Register affiliates digitally
Manage affiliate accounts centrally
Distribute promotional content
Track affiliate performance
Calculate commissions accurately
Generate payroll
View business analytics
Scale without relying on spreadsheets
