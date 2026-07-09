# IT Ticket Dashboard
> **The 1-Line Mission:** React-based incident management dashboard integrating Supabase persistence to log, classify, and audit helpdesk support tickets.

### ⚡ Engineering Breakdown
* **The Problem:** Helpdesk operations suffer from disorganized ticket lifecycles, non-standardized classification structures, and missing resolution audits when tasks are closed without root-cause documentation.
* **The Solution:** A state-driven React application integrating Supabase database triggers, segregating ticket queues (Active/Resolved) via PostgreSQL status properties, and requiring validated resolution input forms before executing ticket update operations.
* **The Tech Stack:** `React` `Vite` `Supabase (Postgres)` `CSS Modules`
