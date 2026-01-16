# Contributing to Abang Colek Brand OS

Welcome to the Abang Colek Brand OS technical documentation. This guide will help you get started with development.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State**: LocalStorage Persistence (Custom Hooks)

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run Development Server**:

    ```bash
    npm run dev
    ```

## 📂 Project Structure

- `src/App.tsx`: Main entry point & routing logic.
- `src/types.ts`: Core TypeScript definitions.
- `src/components/features/`: Feature-specific views (Events, POS, Dashboard).
- `src/components/layout/`: Common layout components (Sidebar, Header).
- `src/lib/`: Utility functions and business logic.
- `docs/`: Product requirements and brand documentation.

## 💾 State Management

The app uses a "Single Source of Truth" object called `BrandOSData`.

- State is lifted to `App.tsx`.
- Persisted automatically to `localStorage` via `useLocalStorage` hook.
- Passed down to components via props (`data`, `setData`).

## ✅ Code Quality

- Ensure no TypeScript errors: `npx tsc --noEmit`
- Follow accessibility best practices (labels, semantic HTML).
- Keep components modular and reusable.
