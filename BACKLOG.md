# 🌶️ Backlog: Abang Colek Brand OS - Founder Suite

> **"Rasa Padu, Pedas Menggamit"** - by Liurleleh House

## Epics

### E1: Foundation and Data Model

- Story: Normalize core data structures (BrandProfile, Event, Content, SOP, Asset).
  - Task: Define TypeScript interfaces and JSON schemas.
  - Task: Add validation layer for persisted data.
- Story: Reliable storage and backup.
  - Task: Add storage guards for privacy-restricted browsers.
  - Task: Export + import snapshot flow.

### E2: Event Pipeline and Booth Ops

- Story: Event pipeline with EO contacts and event details.
  - Task: Event CRUD with date, location, fees, requirements.
  - Task: EO contact record + notes.
- Story: Booth ops checklists.
  - Task: Template-based checklist library.
  - Task: Per-event checklist instantiation.
- Story: Prep and logistics.
  - Task: Prep list generator.
  - Task: Travel plan template per event.

### E3: TikTok Content Engine

- Story: Content calendar linked to events.
  - Task: Content slot planning per event day.
  - Task: Cadence rules and reminders.
- Story: Hook and script templates.
  - Task: Hook bank with tags.
  - Task: Script/CTA templates and caption bank.
- Story: Content pack export.
  - Task: Export captions + hook list + shot list.

### E4: Performance and Experiments

- Story: Event and content performance dashboard.
  - Task: KPI tiles (views, watch time, top hook).
  - Task: Weekly summary generator.
- Story: Experiments and A/B testing.
  - Task: Experiment setup (hypothesis, metric).
  - Task: Result logging and winner promotion.

### E5: Team Workflow and Access

- Story: Multi-user roles and approvals.
  - Task: Roles (Owner/Admin, Founder/Approver, Editor, Viewer).
  - Task: Approval workflow for key assets.
- Story: Audit log and history.
  - Task: Change history and diff view.
  - Task: Restore previous versions.

### E6: PWA and Mobile Ops

- Story: PWA install and offline mode.
  - Task: Cache strategy + sync queue.
  - Task: Event-day quick actions UI.
- Story: On-site ops UX.
  - Task: One-tap checklist completion.
  - Task: Quick notes capture during event.

### E7: Integrations

- Story: Calendar integration.
  - Task: Google Calendar sync (optional).
- Story: Asset backups.
  - Task: Google Drive export or backup push.
- Story: Messaging templates.
  - Task: WhatsApp Business template library.

### E8: Admin AI Agent Hub

- Story: Admin agent with orchestration.
  - Task: Task queue + scheduling.
  - Task: Auto-generated checklists and reports.
  - Task: Approval gate before publish.

### E9: Brand Kit & Marketing System

- Story: Digital brand kit management.
  - Task: Brand colors, typography, logo management.
  - Task: Mascot asset library.
- Story: Lucky draw campaign system.
  - Task: QR registration + Google Form integration.
  - Task: TikTok viral requirement tracking.
- Story: Audio branding.
  - Task: Jingle library with SUNO prompts.
  - Task: Audio logo integration.
- Story: Social media templates.
  - Task: Instagram grid layout templates.
  - Task: TikTok video standards.
  - Task: Story highlight covers.

## MVP Scope (Suggested)

- Event pipeline + booth checklist
- TikTok content engine (hook bank + shot list)
- Exports (JSON/MD + event pack)
- Minimal dashboard (views + top hook)
- PWA offline basics
- Brand kit basics (colors, logo, tagline)

## Delivery Order

1) E1 Foundation
2) E2 Event Pipeline and Booth Ops
3) E3 TikTok Content Engine
4) E9 Brand Kit & Marketing (partial)
5) E6 PWA Mobile Ops (partial)
6) E4 Performance and Experiments
7) E5 Team Workflow
8) E8 Admin AI Agent Hub
9) E7 Integrations
