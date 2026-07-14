# Enterprise Service Desk ITSM Workflow Engine

A robust IT service management (ITSM) ticketing core engineered to streamline technical support routing, enforce strict database-level security policies, and monitor incident resolution SLAs.

> **Live Demo:** [it-ticket-dashboard.vercel.app](https://it-ticket-dashboard.vercel.app)

<div align="center">
  <img src="screenshots/ticket-dashboard-preview.png" width="800" alt="IT Ticket Dashboard preview">
</div>

---

## Operational Focus
* **The Problem:** Disorganized helpdesk operations lead to lost tickets, SLA breaches, and unauthorized internal access to critical administrative records.
* **The Solution:** A secure ticket lifecycle tracker backed by PostgreSQL Row-Level Security (RLS) and automated ticket escalation schemas to guarantee high-integrity support workflows.

---

## Core Capabilities
* **PostgreSQL Row-Level Security (RLS):** Enforces strict data access boundaries, ensuring technicians and users only interact with authorized tickets.
* **Automated SLA & Priority Escalation:** Scripted routing policies that automatically flag and prioritize high-severity infrastructure incidents.
* **ITSM Workflow Audit Logging:** Captures atomic state changes for every ticket to maintain a verifiable audit trail of system diagnostics and resolutions.
* **Structural Database Design:** Optimized relational schemas mapping agents, ticket states, and categories to reduce query latency and data redundancy.

---

## ⚙️ Ticket Lifecycle Architecture
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

*   **Offline Fallback Mode:** Initializes with local demo ticket data if the Supabase environment connection is missing or offline.
*   **Queue Segmentation:** Dynamic sorting split into Active tickets and Resolved History using PostgreSQL statuses.
*   **Mandatory Resolution Audits:** Enforces technician documentation input for problem resolutions before updates write back to the database.
*   **Audit-friendly Logs:** Persists historical problem records with their associated troubleshooting resolutions for compliance reviews.

---

## 🛠️ Local Setup

1. Clone the repository and install dependency nodes:
   ```bash
   npm install
   ```
2. Start the local server:
   ```bash
   npm run dev
   ```
3. Open your browser to: `http://localhost:5173`.

---

## Recent Architectural Upgrades
* **Operational Restructuring:** Standardized repository file hierarchies by separating core automation logic, helper scripts, and test files.
* **Security Hardening:** Swapped legacy credential configs for environment variables and secure token validation policies.
* **Database Schema Upgrades:** Refactored primitive database types into native data structures for robust ORM and transaction handling.
* **Systems Maintenance:** Eradicated legacy diagnostic scripts, optimized loops, and established static analysis scanning to ensure code hygiene.
