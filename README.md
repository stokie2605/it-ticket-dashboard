# IT Service Desk Log & Incident Tracker

Built by Dean Wilshaw.

IT Service Desk Log & Incident Tracker is a React-based support dashboard for logging, triaging, and resolving internal IT incidents. It models a practical service desk lifecycle: ticket intake, category and priority assignment, active queue visibility, resolution documentation, and resolved-history review.

The project demonstrates a technician-focused workflow with Supabase-backed persistence, demo ticket fallback data, active/resolved queue separation, and a resolution workbench that requires root-cause notes before closure.

### Visual Output / Preview

![IT Ticket Dashboard preview](screenshots/ticket-dashboard-preview.png)

```text
┌───────────────────────────────┬──────────────┬──────────┬──────────────────┐
│ Ticket                        │ Category     │ Priority │ Lifecycle State  │
├───────────────────────────────┼──────────────┼──────────┼──────────────────┤
│ Warehouse scanner timeout     │ Network      │ High     │ Open             │
│ Finance MFA lockout           │ Account      │ Medium   │ Open             │
│ Conference adapter replaced   │ Hardware     │ Low      │ Resolved         │
└───────────────────────────────┴──────────────┴──────────┴──────────────────┘
```

### Ticket Lifecycle Architecture

- **Demo ticket fallback:** The app initializes with realistic service desk examples so the dashboard remains useful even if Supabase is unavailable.
- **Supabase ticket fetch:** On load, the frontend queries the `tickets` table ordered by newest `created_at` values.
- **Incident intake form:** Technicians submit a title, description, category, and priority to create an `Open` ticket.
- **Queue segmentation:** Tickets are split into active problems and resolved history using their `status` field.
- **Resolution workbench:** Selecting an active ticket opens a closure form that requires resolution notes before updating the record.
- **Audit-friendly history:** Resolved tickets retain the original problem description and documented fix action for later review.

## The Business Problem

Service desks need a consistent way to track internal support work from first report through resolution. Without a structured ticket lifecycle, incidents can be missed, repeated fixes are hard to review, and technicians may close work without documenting what actually solved the issue.

Common operational problems include:

- Hardware, network, and access problems arrive through scattered channels.
- Priority and category handling is inconsistent between technicians.
- Active issues and completed work are difficult to separate at a glance.
- Resolution notes are skipped when closure is informal.
- Managers lack simple evidence of troubleshooting work performed.
- Cloud availability issues can leave a dashboard empty without fallback data.

## The Solution & Architecture

The dashboard models a lightweight ticket management system:

```text
Technician Incident Form
          |
          v
Supabase tickets Insert
          |
          v
Ticket Queue State
          |
          +--> Active Problems
          |
          +--> Resolution Workbench
                    |
                    v
             Supabase status update
                    |
                    v
              Resolved History
```

## Technical Toolkit

- React
- Vite
- JavaScript
- Supabase JavaScript client
- Supabase PostgreSQL
- React hooks
- Browser-based service desk UI

## Local Execution Setup

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Ticket Data Model

The frontend expects a `tickets` table with fields similar to:

```text
id                Unique ticket identifier
title             Short issue summary
description       Technician-readable issue details
category          Hardware, Network, or Account / Access
priority          Low, Medium, or High
status            Open or Resolved
resolution_notes  Root-cause fix documentation
created_at        Ticket creation timestamp
```

Example ticket:

```json
{
  "title": "Finance user locked out after MFA reset",
  "description": "User cannot complete sign-in after mobile authenticator replacement.",
  "category": "Account / Access",
  "priority": "Medium",
  "status": "Open"
}
```

## Production Readiness Notes

- Move Supabase URL and publishable key into environment variables before production deployment.
- Add authenticated roles for technician, resolver, and service desk manager access.
- Add SLA timers and escalation rules based on priority.
- Add ticket comments, attachments, and assignment ownership.
- Add audit timestamps for status changes and resolution events.
- Add tests for ticket creation, queue filtering, and resolution validation.
