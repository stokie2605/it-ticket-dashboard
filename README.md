# IT Service Desk Log & Incident Tracker

A dynamic frontend web dashboard built to track corporate IT support tickets through their complete lifecycle—from initial submission to documented resolution. 

## Dashboard Preview

![IT Ticket Dashboard preview](screenshots/ticket-dashboard-preview.png)

## Key Features
* **Live Problem Registration:** Allows support technicians to log hardware, network, and access issues with specific priority and category mappings.
* **Incident Lifecycles:** Real-time state segmentation displaying active issues versus archived resolution history.
* **Resolution Workbench:** An interface component that forces technicians to document root-cause troubleshooting steps before securely closing a ticket.
* **Cloud Database Backend:** Secured data persistence driven by a cloud-hosted Supabase infrastructure with dedicated relational tables.

---

## 🛠️ Troubleshooting & Core Resolutions

During development, deployment, and cloud integration, several standard frontend development and system hurdles were encountered and resolved:

### 1. Terminal Scope & Root Directory Misalignment (`ENOENT`)
* **Problem:** Running terminal management tasks like `npm run dev` or trying to update packages failed with an `ENOENT` error, indicating missing configuration blueprints (`package.json`).
* **Resolution:** Diagnosed as a system path context error. Identified via VS Code directory trees that the project directory was initialized in the primary user directory (`C:\Users\Wilshaw\it-ticket-dashboard`) rather than subfolders. Resolved by running targeted directory navigation commands (`cd it-ticket-dashboard`) to correctly align the shell workspace before execution.

### 2. Isolated Dependency Installation Scope
* **Problem:** The system build engine crashed on launch with a red screen error stating `[plugin:vite:import-analysis] Failed to resolve import "@supabase/supabase-js"`.
* **Resolution:** Discovered that the primary database helper library had been accidentally executed and downloaded in the global home directory rather than the target project folder. Pushed a direct resolution by navigating the target shell inside the project folder root and running a local scope installation (`npm install @supabase/supabase-js`), immediately populating the local node modules.

### 3. Build Tool Hot Module Cache Lock
* **Problem:** The terminal framework failed to recognize newly installed internal components even after local dependency files were fixed.
* **Resolution:** Isolated as a standard Vite builder caching hold. Resolved by executing a hard termination sequence (`Ctrl + C`) to clear the build instance and running a clean engine reboot (`npm run dev`), forcing the system to re-verify the active file map.
