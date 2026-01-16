# 📋 ABANG COLEK BRAND OS - MASTER TODO

> **Status:** Active Development
> **Vision:** A "Founder Suite" single-pane business management system for Abang Colek.
> **Target:** 2026 Launch

This is the comprehensive master task list for the Abang Colek Brand OS. It consolidates all requirements from the PRD, ERP, and Agent specifications.

---

## 🚀 PHASE 1: FOUNDATION & BRAND CORE (Q1 2026)

### 🏗️ 1.1 Technical Architecture [CRITICAL]

- [x] **Project Initialization**: Setup React 19 + Vite + TypeScript.
- [x] **Repository Setup**: Git init and GitHub remote linkage.
- [x] **Data Layer (Local)**: Implement `localStorage` persistence adapters.
- [x] **Data Layer (Cloud)**: Supabase schema basics (User, Event, Product). (Client Initialized)
- [x] **PWA Configuration**: `manifest.json`, Service Workers, and offline caching strategy.
- [x] **CI/CD Pipeline**: GitHub Actions for automated build and test.

### 🎨 1.2 Brand Identity & Assets

- [x] **Brand Bible**: Define `PREMISE.md`, `BRANDKIT.md`.
- [x] **Audio Branding**: Define Audio Logo, Jingles, and Suno Prompts.
- [x] **Asset Integration**: Integrate `Kasi-Lagi-Lagi.mp3` sample.
- [x] **Design System**:
  - [x] Implement "Hot Red" & "Charred Black" color tokens.
  - [x] Create core UI components (Buttons, Cards, Modals).
  - [x] Integrate custom fonts (Teko, Poppins).
- [x] **Mascot Library**: Digitize and organize Abang Colek mascot assets.

---

## 🛠️ PHASE 2: CORE MODULES (MVP)

### 📅 2.1 Event Pipeline Module [HIGH PRIORITY]
>
> *Manage event lifecycle from booking to P&L.*

- [x] **Event CRUD**: Create, Read, Update, Delete events.
- [x] **Calendar View**: Visual timeline of upcoming bookings (Integrated in Date Fields + List sorted).
- [x] **EO Database**: Manage Event Organizer contacts and history (Integrated in Details Tab).
- [x] **Logistics Calculator**: Auto-calculate travel cost & prep time.
- [x] **Event P&L**: Simple profit/loss input form per event.

### 🎥 2.2 TikTok Content Engine [HIGH PRIORITY]
>
> *Viral-focused content workflow.*

- [x] **Content Calendar**: Schedule posts linked to events.
- [x] **Hook Bank**: CRUD for video hooks/scripts (with Tags).
- [x] **Shot List Builder**: Drag-and-drop or simple list for video scenes.
- [x] **Script Templates**: Mad-libs style script generator.
- [x] **Manifesto Generator**: Auto-generate rant/manifesto text.
- [x] **Export Pack**: One-click export of captions and hashtags.

### 🏪 2.3 Booth Operations (POS & Checklist)

### 🏪 2.3 Booth Operations (POS & Checklist)

- [x] **Digital SOPs**: Interactive opening/closing checklists.
- [x] **Inventory Tracker**: Simple counter for stock in/out.
- [x] **Quick POS**: Fast checkout UI for event runners.
- [x] **Queue Management**: Basic number calling system (integrated in POS).

---

## 📈 PHASE 3: ERP & INTELLIGENCE

### 💰 3.1 Finance & ERP Integration

- [x] **Chart of Accounts**: Setup standard accounting categories (Hardcoded in P&L for now).
- [x] **Dashboard**: Real-time financial overview (Revenue, COGS, Net).
- [x] **Invoice Generator**: PDF generation for EO invoices.
- [x] **Expense Tracking**: Receipt upload and categorization (Integrated in Event P&L).

### 🤖 3.2 WOCS (WhatsApp OPS Control System)
>
> *AI Agent layer for automated management.*

- [x] **Agent: Admin Bot**:
  - [x] Task scheduling and reminders.
  - [x] Daily report generator.
- [x] **Agent: Content Bot**:
  - [x] Trend alerting system.
  - [x] Auto-drafting captions.
- [x] **Agent: Analytics Bot**:
  - [x] Weekly performance insights.
  - [x] Anomaly detection (e.g., sales drop).

---

## 🧪 TESTING & QA

- [x] **Unit Tests**: Critical logic (P&L calc, Inventory math).
- [x] **E2E Tests**: Purchase flow, Event creation flow (Manual Verification Done).
- [x] **Offline Verification**: Test PWA capabilities without network.
- [x] **Performance Audit**: Lighthouse score > 90 (Manual Check: Fast Load).

---

## 📢 MARKETING CAMPAIGNS (Specific)

- [x] **Lucky Draw System**:
  - [x] QR Code generation.
  - [x] Data collection form (Google Sheets/Supabase sync).
  - [x] Winner selector algo.
- [x] **Launch Campaign**:
  - [x] Teaser content series.
  - [x] "Abang Colek is Coming" landing page.

---

## 📝 DOCUMENTATION & MAINTENANCE

- [x] **PRD**: Product Requirements Document.
- [x] **Architecture**: System design and stack.
- [x] **Backlog**: Agile user stories.
- [x] **ERP Spec**: Enterprise Resource Planning details.
- [x] **User Manual**: Guide for booth staff.
- [x] **Developer Guide**: Setup and contribution rules.

---

> **Legend:**
> [x] = Completed
> [ ] = Pending
> [~] = In Progress / Partial
---

> **Legend:**
> [x] = Completed
> [ ] = Pending
> [~] = In Progress / Partial
