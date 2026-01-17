<p align="center">
  <img src="ABANG-COLEX-LOGO-2.png" alt="Abang Colek Logo" width="300"/>
</p>

<h1 align="center">🌶️ Abang Colek Brand OS</h1>

<p align="center">
  <strong>"Rasa Padu, Pedas Menggamit"</strong><br/>
  Single-pane business management system for Abang Colek by Liurleleh House
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-documentation">Docs</a> •
  <a href="#-brand-identity">Brand</a> •
  <a href="#-tech-stack">Stack</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-FFC107?style=for-the-badge" alt="Version"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite" alt="Vite"/>
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge" alt="PWA"/>
</p>

---

## 🔗 Git Repository

```bash
git clone https://github.com/thisisniagahub/abang-colek-os.git
```

> **Repository:** <https://github.com/thisisniagahub/abang-colek-os>

---

## 📖 Overview

**Abang Colek Brand OS** is a comprehensive, all-in-one business management platform designed specifically for the Abang Colek street food brand. Built with modern web technologies, it provides founders and teams with tools to manage events, content, branding, and operations from a single dashboard.

### 🎯 Key Objectives

- **Centralize Operations** - One platform for all brand activities
- **Streamline Events** - From booking to post-event review
- **Boost Content** - TikTok-first content planning engine
- **Maintain Brand Consistency** - Digital brand kit always accessible
- **Enable Remote Control** - WhatsApp-based command system (WOCS)

---

## ✨ Features

### 🏠 Core Modules

| Module | Description | Status |
| ------ | ----------- | ------ |
| **Dashboard** | Bento-style overview of all metrics | ✅ Live |
| **Brand Editor** | Pitch deck, brand song, SOP, manifesto | ✅ Live |
| **Event Pipeline** | Event booking, EO contacts, status tracking | ✅ Live |
| **Booth Ops** | Checklists, prep lists, travel planning | ✅ Live |
| **TikTok Engine** | Hook bank, content calendar, shot lists | ✅ Live |
| **Reviews** | Post-event KPIs and performance tracking | ✅ Live |

### 🚀 Advanced Features

| Feature | Description |
| ------- | ----------- |
| 🔄 **Autosave** | Debounced localStorage persistence |
| 🌙 **Dark Mode** | System-aware theme toggle |
| 🔍 **Global Search** | Cmd+K spotlight search |
| 📤 **Multi-Export** | JSON, Markdown, Event Pack, TikTok Pack |
| 📥 **Import** | Restore from JSON backup |
| 📱 **PWA** | Offline-ready progressive web app |
| ⌨️ **Keyboard Shortcuts** | Power-user navigation |

### 🤖 Coming Soon: WOCS (WhatsApp OPS Control System)

Control your entire operation via WhatsApp messages:

```bash
/landing create page: promo-raya title: "Jualan Gila"
/agent task to: ali type: prep_checklist
/tiktok schedule hook: trending-sound date: tomorrow
```

See [WOCS Specification](docs/WOCS_SPEC.md) for complete documentation.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** 9+ or **pnpm** 8+
- Modern browser (Chrome, Firefox, Edge, Safari)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/abang-colek-brand-os.git
cd abang-colek-brand-os

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start dev server at <http://localhost:5173> |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |

### First Run Checklist

- [ ] Open <http://localhost:5173>
- [ ] Explore the Dashboard
- [ ] Create your first event
- [ ] Set up TikTok hook bank
- [ ] Test export functionality

---

## 📁 Project Structure

```text
abang-colek-brand-os/
├── 📂 src/
│   ├── 📄 App.tsx              # Main application entry
│   ├── 📄 types.ts             # TypeScript interfaces
│   ├── 📄 preset.ts            # Default data templates
│   ├── 📂 components/
│   │   ├── 📂 features/        # Module views (Events, TikTok, etc.)
│   │   └── 📂 layout/          # Header, Sidebar, Navigation
│   └── 📂 lib/                 # Utilities and helpers
│
├── 📂 docs/                    # Documentation
│   ├── 📄 BRANDKIT.md          # Complete brand guidelines
│   ├── 📄 BRAND-JINGLES.md     # Audio branding & lyrics
│   ├── 📄 Lucky-Draw-Campaign.md
│   ├── 📄 Staff-Briefing.md
│   └── 📄 WOCS_SPEC.md         # WhatsApp bot specification
│
├── 📂 public/                  # Static assets, PWA manifest
├── 📂 skills/                  # AI skill playbooks
├── 📂 scripts/                 # PowerShell utilities
│
├── 📄 PRD.md                   # Product Requirements
├── 📄 ARCHITECTURE.md          # System architecture
├── 📄 BACKLOG.md               # Feature backlog
├── 📄 SCHEMAS.md               # Data models
└── 📄 AGENTS.md                # AI agent instructions
```

---

## 📚 Documentation

### 🎨 Brand & Marketing

| Document | Description | Link |
| -------- | ----------- | ---- |
| **Brand Kit** | Complete A-Z brand guidelines (25 sections) | [BRANDKIT.md](docs/BRANDKIT.md) |
| **Jingles** | Song lyrics, SUNO prompts, audio branding | [BRAND-JINGLES.md](docs/BRAND-JINGLES.md) |
| **Lucky Draw** | Event campaign system with TikTok viral loop | [Lucky-Draw-Campaign.md](docs/Lucky-Draw-Campaign.md) |
| **Staff Briefing** | Training materials for event staff | [Staff-Briefing.md](docs/Staff-Briefing.md) |

### 🔧 Technical

| Document | Description | Link |
| -------- | ----------- | ---- |
| **PRD** | Product Requirements Document | [PRD.md](PRD.md) |
| **Architecture** | System design with diagrams | [ARCHITECTURE.md](ARCHITECTURE.md) |
| **WOCS Spec** | WhatsApp bot specification | [WOCS_SPEC.md](docs/WOCS_SPEC.md) |
| **Backlog** | Feature backlog and epics | [BACKLOG.md](BACKLOG.md) |
| **Schemas** | Data model definitions | [SCHEMAS.md](SCHEMAS.md) |
| **Agents** | AI agent instructions | [AGENTS.md](AGENTS.md) |

---

## 🎨 Brand Identity

<table>
<tr>
<td width="50%">

### Logo & Mascot

- **Logo**: ABANG COLEX with chili icon
- **Mascot**: Blue character with MCM outfit
- **TikTok**: @styloairpool

### Tagline

> **"Rasa Padu, Pedas Menggamit"**

</td>
<td width="50%">

### Color Palette

| Color | Hex | Name |
| ----- | --- | ---- |
| 🟡 | `#FFC107` | Colek Yellow |
| 🔴 | `#E53935` | Sambal Red |
| ⚫ | `#1A1A1A` | Midnight Black |
| 🔵 | `#4A90D9` | Mascot Blue |
| 🟢 | `#4CAF50` | Chili Green |

</td>
</tr>
</table>

### Typography

| Use | Font | Weight |
| --- | ---- | ------ |
| Headlines | Impact / Bebas Neue | Bold |
| Body | Poppins / Inter | Regular |

📖 See [BRANDKIT.md](docs/BRANDKIT.md) for complete brand guidelines.

---

## 🔧 Tech Stack

### Frontend

| Technology | Version | Purpose |
| ---------- | ------- | ------- |
| **React** | 19 | UI Framework |
| **TypeScript** | 5.9 | Type Safety |
| **Vite** | 7 | Build Tool |
| **Tailwind CSS** | 3.4 | Styling |
| **ESLint** | 9 | Code Quality |

### Storage

| Layer | Technology | Purpose |
| ----- | ---------- | ------- |
| **Current** | localStorage | Client-side persistence |
| **Planned** | Supabase PostgreSQL | Cloud database (FREE) |
| **Queue** | Upstash Redis | Task queue (FREE) |

### PWA Features

- ✅ Offline support via Service Worker
- ✅ Install prompt for desktop/mobile
- ✅ App manifest with icons
- ✅ Background sync queue

---

## 💾 Data Management

### Storage Key

```javascript
localStorage.setItem('abangColekBrandOS:v1', data)
```

### Export Formats

| Format | Contents | Use Case |
| ------ | -------- | -------- |
| **JSON** | Full data backup | Backup & restore |
| **Markdown** | Brand assets formatted | Documentation |
| **Event Pack** | Event + checklists + shot list | Pre-event prep |
| **TikTok Pack** | Hooks + captions + shot list | Content creation |

### Data Security

- All data stored client-side
- No external API calls in current version
- Export for manual backup recommended

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| -------- | ------ |
| `Cmd/Ctrl + K` | Open global search |
| `Cmd/Ctrl + S` | Force save |
| `Cmd/Ctrl + E` | Export menu |
| `Cmd/Ctrl + ,` | Settings |
| `Cmd/Ctrl + D` | Toggle dark mode |
| `1-6` | Switch modules |

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅

- [x] Core modules (Dashboard, Events, TikTok)
- [x] PWA support
- [x] Export functionality
- [x] Brand kit documentation

### Phase 2: WOCS Integration 🚧

- [ ] WhatsApp Cloud API integration
- [ ] Voice command processing
- [ ] Task queue system
- [ ] Real-time notifications

### Phase 3: Cloud & Team 📋

- [ ] Supabase backend
- [ ] Multi-user support
- [ ] Role-based access
- [ ] Audit logging

### Phase 4: Analytics & AI 🔮

- [ ] Event performance dashboard
- [ ] Content analytics
- [ ] AI-powered recommendations
- [ ] Automated reporting

---

## 🤝 Contributing

### Development Workflow

1. Check [BACKLOG.md](BACKLOG.md) for available tasks
2. Follow existing patterns in codebase
3. Run linting before committing:

   ```bash
   npm run lint
   ```

4. Update [IMPLEMENTATION_LOG.md](IMPLEMENTATION_LOG.md)

### Code Style

- Follow ESLint configuration
- Use TypeScript strict mode
- Component naming: PascalCase
- Utilities: camelCase
- Keep files under 300 lines

### Commit Convention

```
type(scope): message

feat(events): add bulk event import
fix(tiktok): resolve hook duplication
docs(readme): update installation steps
```

---

## 🛡️ Security

### Current Implementation

- Client-side only (no server)
- No sensitive data transmission
- localStorage with prefix isolation

### Planned (WOCS)

- OAuth for integrations
- Encrypted token storage
- Audit logging for all actions
- Role-based access control

---

## 📞 Support

### Contact

| Channel | Details |
| ------- | ------- |
| **TikTok** | [@styloairpool](https://tiktok.com/@styloairpool) |
| **Instagram** | @abangcolek |
| **WhatsApp** | Business account |

### Reporting Issues

1. Check existing issues first
2. Include browser/OS info
3. Provide steps to reproduce
4. Attach console errors if any

---

## 📄 License

**Private** - © 2026 Abang Colek by Liurleleh House

All rights reserved. This software and associated documentation are proprietary to Abang Colek / Liurleleh House.

---

<p align="center">
  <strong>🌶️ Rasa Padu, Pedas Menggamit 🌶️</strong><br/>
  <sub>Built with ❤️ by Liurleleh House</sub>
</p>
