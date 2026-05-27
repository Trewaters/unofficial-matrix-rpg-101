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
- **Language**: JavaScript (vanilla, no transpilation or framework)
  - Use standard ES2020+ syntax
  - No TypeScript — prefer clear naming and comments for documentation
  - No complex type systems — use JSDoc comments where helpful
- **Module system**: ES Modules (ESM) — all imports use `import` syntax
- **Package manager**: npm

## Frontend

- **Build Tool**: Vite 5.x
  - Dev server: `npm run dev` — provides instant feedback
  - Production build: `npm run build` — creates optimized output in `dist/`
  - Preview: `npm run preview` — serves built output locally
- **UI Framework**: Vanilla HTML, CSS, and JavaScript (no framework)
  - Direct DOM manipulation via standard browser APIs
  - CSS with custom properties for theming and responsive design
  - No component library — write components as organized, reusable JS functions
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

| Purpose             | Status              | Notes                                 |
| ------------------- | ------------------- | ------------------------------------- |
| Build & development | Vite 5.x            | Only build tool dependency            |
| Bundling            | Vite                | Handles all bundling and optimization |
| Runtime             | Native browser APIs | No frameworks or libraries required   |

## Project Structure

```
unofficial-matrix-rpg-101/
├── src/
│   ├── main.js          # Application entry point and view controller
│   └── styles.css       # All styling (no CSS framework)
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
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

- **Linting**: ESLint (if added) — keep rules minimal for vanilla JS
- **Formatting**: Prettier (if added) — configure to respect code readability
- **Versioning**: Semantic versioning via manual CHANGELOG updates
- **Documentation**: JSDoc comments in code — no automated doc generation needed

## Browser Support Targets

- Chrome ≥ 90
- Edge ≥ 90
- Firefox ≥ 88
- Safari ≥ 14
- No IE support (modern browsers only)
