---
description: This file describes the tech stack and environment for the project. All other instructions assume this stack.
applyTo: "**"
---

# Tech Stack & Environment

> This section is the foundation for all other instructions.
> Every code suggestion, pattern, and convention in this document
> assumes this stack. Do not suggest alternatives unless explicitly asked.

## Runtime & Language

- **Node.js**: 18.x or higher
- **Language**: TypeScript (strict mode, compiled by Vite)
  - Use standard ES2020+ target syntax
  - Explicit types on all function parameters and return values
  - `strict: true` — no implicit `any`, no loose null checks
- **Module system**: ES Modules (ESM) — all imports use `import` syntax
- **Package manager**: npm

## Frontend

- **Build Tool**: Vite 5.x
  - Dev server: `npm run dev` — provides instant feedback
  - Production build: `npm run build` — creates optimized output in `dist/`
  - Preview: `npm run preview` — serves built output locally
- **UI Framework**: Vanilla HTML, CSS, and TypeScript (no JS framework)
  - Direct DOM manipulation via standard browser APIs
  - CSS with custom properties for theming and responsive design
  - **Component library**: Shoelace (`@shoelace-style/shoelace`) — Web Components
    - Import individual components: `import '@shoelace-style/shoelace/dist/components/button/button.js'`
    - Use dark theme: already imported in `main.ts`
    - Base path for icons set to `./shoelace/assets` (copied by Vite plugin during build)
    - Prefer Shoelace components over writing custom ones from scratch
- **App Type**: Client-side single-page application with local storage persistence

## Backend

- **Architecture**: Client-side only (no backend server)
- **Data Storage**: Browser localStorage for character sheet persistence
  - Store serialized JSON character data
  - Handle serialization/deserialization in data layer
  - No database, no server, no API routes
- **External APIs**: Read-only integration planned for Ethereum wallet viewing (future)

## Authentication

- **Current**: Not implemented
- **Architecture**: None required — character sheets are local/device-specific
- **Future**: Reserved placeholder fields for optional read-only wallet integration

## Key Libraries & Dependencies

Minimal dependencies by design. Only `vite` as a dev dependency.

| Purpose             | Library / Tool                    | Notes                                              |
| ------------------- | --------------------------------- | -------------------------------------------------- |
| Build & development | Vite 5.x                          | Handles TS compilation and bundling                |
| Type checking       | TypeScript 5.x                    | `npm run typecheck` — `tsc --noEmit`               |
| UI components       | Shoelace (`@shoelace-style/shoelace`) | Web Components — use before writing custom ones |
| View animations     | Motion.dev (`motion`)             | View transitions and interactive animations        |
| Asset handling      | vite-plugin-static-copy           | Copies Shoelace icons to `dist/shoelace/assets`    |

## Project Structure

```
unofficial-matrix-rpg-101/
├── src/
│   ├── main.ts          # Application entry point and view controller
│   ├── animations.ts    # Motion.dev animation utilities
│   └── styles.css       # All styling (no CSS framework)
├── index.html           # HTML entry point
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Project metadata and scripts
```

## Testing

- **Current**: No formal test framework configured
- **Recommended approach** if testing is added:
  - Use Vitest (Vite-native test framework) or Jest with simple config
  - Keep tests minimal and focused on core game logic
  - Browser automation via Playwright for end-to-end testing if needed

## Deployment & Infrastructure

- **Platform**: Any static file host (GitHub Pages, Netlify, Vercel static hosting, etc.)
- **Build output**: All files in `dist/` directory after `npm run build`
- **Environment variables**: Use `.env` files if needed (keep secrets out of repo)
- **No environment-specific configuration required** for basic deployment

## Tooling

- **Type checking**: `npm run typecheck` — runs `tsc --noEmit`
- **Linting**: ESLint (if added) — use `@typescript-eslint` ruleset
- **Formatting**: Prettier (if added) — configure to respect code readability
- **Versioning**: Semantic versioning via manual CHANGELOG updates
- **Documentation**: TSDoc comments on exported functions and types

## Browser Support Targets

- Chrome ≥ 90
- Edge ≥ 90
- Firefox ≥ 88
- Safari ≥ 14
- No IE support (modern browsers only)
