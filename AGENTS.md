# AGENTS.md

> 🌶️ AI Agent Instructions for Abang Colek Brand OS  
> **"Rasa Padu, Pedas Menggamit"** - by Liurleleh House

## Project Overview

**Abang Colek Brand OS** is a comprehensive business management system for the Abang Colek brand, featuring:

- **Brand Editor**: Pitch deck, brand song, SOP, manifesto management
- **Event Pipeline**: Event management, booth operations, EO contacts
- **TikTok Engine**: Hook bank, content planning, shot lists
- **Review System**: Post-event performance tracking
- **WOCS**: WhatsApp OPS Control System for voice/text command automation

## Brand Identity

| Element | Value |
| ------- | ----- |
| **Tagline** | "Rasa Padu, Pedas Menggamit" |
| **TikTok** | @styloairpool |
| **Primary Color** | `#FFC107` (Colek Yellow) |
| **Accent Color** | `#E53935` (Sambal Red) |
| **Mascot** | Blue character with MCM outfit |

## Quick Start

```bash
npm install
npm run dev
```

**Access:** <http://localhost:5173>

## Documentation Links

### Brand & Marketing

| Document | Path | Purpose |
| ------------ | ------------------------------------ | -------------------- |
| **Brand Kit** | [docs/BRANDKIT.md](docs/BRANDKIT.md) | Complete A-Z brand guidelines |
| **Jingles** | [docs/BRAND-JINGLES.md](docs/BRAND-JINGLES.md) | Song lyrics & SUNO prompts |
| **Lucky Draw** | [docs/Lucky-Draw-Campaign.md](docs/Lucky-Draw-Campaign.md) | Event lucky draw system |
| **Staff Brief** | [docs/Staff-Briefing.md](docs/Staff-Briefing.md) | Staff training materials |

### Technical

| Document | Path | Purpose |
| ------------ | ------------------------------------ | -------------------- |
| **PRD** | [PRD.md](PRD.md) | Product requirements |
| **Architecture** | [ARCHITECTURE.md](ARCHITECTURE.md) | System design |
| **WOCS Spec** | [docs/WOCS_SPEC.md](docs/WOCS_SPEC.md) | WhatsApp bot system |
| **Backlog** | [BACKLOG.md](BACKLOG.md) | Feature backlog |
| **Schemas** | [SCHEMAS.md](SCHEMAS.md) | Data models |

---

## Skill Categories

The skill playbooks are organized in `skills/` folder:

| Category | Path | Purpose |
| ------------- | -------------------------------------- | ------------------------------ |
| Architecture | `skills/architecture-design/` | System design patterns |
| Security | `skills/security-compliance/` | Security & compliance |
| DevOps | `skills/devops-infra/` | Infrastructure & CI/CD |
| Data | `skills/data-analytics/` | Data modeling & analytics |
| Testing | `skills/testing-quality/` | Quality assurance |
| Codegen | `skills/codegen-scaffolding/` | Code generation |
| Maintenance | `skills/maintenance-optimization/` | Performance & optimization |
| Documentation | `skills/documentation-knowledge/` | Docs & knowledge base |
| Meta | `skills/meta/` | Process & governance |

### WOCS Skills (WhatsApp OPS Control)

WOCS-related tasks use the spec at `docs/WOCS_SPEC.md`:

- **Bot Commands**: `/landing`, `/tiktok`, `/agent`, `/content`
- **Voice Processing**: faster-whisper integration
- **Task Queue**: Redis + BullMQ patterns
- **Hosting**: Vercel + Supabase + Upstash (FREE stack)

---

## Agent Personas

### 🤖 Admin Bot (WOCS)

**Purpose:** WhatsApp command interface
**Capabilities:**

- Process text/voice commands
- Create landing pages, tasks, content
- Send status updates to admin

**Commands:**

```text
/landing create page: promo-raya title: "Jualan Gila"
/agent task to: ali type: prep_checklist
/tiktok schedule hook: trending-sound date: tomorrow
```

### 📱 Content Bot

**Purpose:** TikTok content automation
**Capabilities:**

- Generate hook templates
- Create shot lists
- Schedule content calendar

### 📊 Analytics Bot

**Purpose:** Performance tracking
**Capabilities:**

- Track event performance
- Generate weekly reports
- Monitor KPIs

---

## WOCS Command Quick Reference

### Landing Page Commands

```text
/landing create page: <slug> title: <title>
/landing update page: <slug> section: hero content: <base64>
/landing publish page: <slug>
/landing preview page: <slug>
```

### Agent Task Commands

```text
/agent task to: <name> type: <type> priority: <level>
/agent list [status: pending|done]
/agent done task: <id>
```

### TikTok Commands

```text
/tiktok schedule hook: <id> date: <date>
/tiktok draft caption: <text> hook: <id>
/tiktok post [manual approval]
```

### System Commands

```text
/status
/help
/report [daily|weekly]
```

---

## Stack Profiles

Default stack profiles: `skills/STACK_PROFILES.md`

| Profile | Stack | Use Case |
| ------- | -------------------------------- | --------------- |
| **A** | Node.js + React + PostgreSQL | Modern Web SaaS |
| **B** | Java Spring + React | Enterprise |
| **C** | AWS Lambda + Next.js + DynamoDB | Serverless |

**Current Project Stack:** Profile A variant (Vite + React + localStorage → PostgreSQL)

---

## How to Use Skills

1. **Identify** the user request and match it to a skill category
2. **Open** the matching `SKILL.md` and follow its steps
3. **Produce** the listed outputs and validate with checks
4. **Sequence** multiple skills: architecture → implementation → validation → documentation

### Skill File Structure

Each `skills/<category>/<skill-slug>/SKILL.md` contains:

- Detailed step-by-step procedures
- Decision trees and conditional logic
- Error handling and edge cases
- Preconditions and postconditions
- Validation criteria
- Tool requirements
- Example workflows
- Rollback procedures
- Success metrics

---

## Standard Template Expectations

### Required Sections in SKILL.md

1. **Step-by-Step Procedures** - Ordered steps with clear goals
2. **Decision Trees** - If/else logic for choices
3. **Error Handling** - Failure modes and mitigations
4. **Preconditions** - Required inputs/access/approvals
5. **Postconditions** - Expected outputs and state
6. **Validation** - Functional, security, performance checks
7. **Tool Requirements** - CLI, SDKs, credentials needed
8. **Examples** - Minimal and production-grade workflows
9. **Rollback Procedures** - Recovery steps
10. **Success Metrics** - Measurable outcomes

---

## Change Logging (Required)

Every agent **MUST** append an entry to `IMPLEMENTATION_LOG.md` for each work session.

### Auto-Insert Template

```powershell
.\scripts\append-implementation-log.ps1
```

### Log Entry Format

```markdown
## YYYY-MM-DD

### Summary

- Short summary of changes

### Details

- Change description + reason for each change

### Files Touched (High Level)

- path/to/file.ext
```

---

## Naming Conventions

| Item | Convention | Example |
| ------------- | ---------- | ------------------- |
| Skill folders | kebab-case | `api-design-patterns` |
| Skill entry | Fixed | `SKILL.md` |
| Components | PascalCase | `EventsView.tsx` |
| Utilities | camelCase | `exporters.ts` |
| Types | PascalCase | `BrandOSData` |

---

## Integration Points

### Current Integrations

- **localStorage**: Client-side data persistence
- **PWA**: Offline-first with service worker

### Planned Integrations (WOCS)

- **WhatsApp Cloud API**: Message receiving/sending
- **Supabase**: PostgreSQL database (FREE)
- **Upstash**: Redis queue (FREE)
- **Vercel**: Serverless functions (FREE)
- **faster-whisper**: Voice transcription (local)

---

## Notes

- Keep changes consistent with existing tech stack
- Prefer small, reviewable changes with clear artifacts
- Always run `npm run build` before committing
- Update IMPLEMENTATION_LOG.md after each session
- Reference WOCS_SPEC.md for WhatsApp-related features
