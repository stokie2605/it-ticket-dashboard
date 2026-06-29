# Ticket Lifecycle

The dashboard models a simple IT service desk flow.

## Flow

```text
Incident Intake
  -> Open Ticket
  -> Active Queue
  -> Resolution Workbench
  -> Required Resolution Notes
  -> Resolved History
```

## Supabase Table

Expected table: `tickets`

| Field | Purpose |
| --- | --- |
| `id` | Unique ticket identifier |
| `title` | Short issue summary |
| `description` | Technician-readable details |
| `category` | Hardware, Network, or Account / Access |
| `priority` | Low, Medium, or High |
| `status` | Open or Resolved |
| `resolution_notes` | Root-cause or fix notes |
| `created_at` | Creation timestamp |

## Reviewer Notes

If Supabase is not configured, the app falls back to demo ticket data so the interface remains reviewable.
