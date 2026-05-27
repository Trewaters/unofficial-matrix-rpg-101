---
description: This file describes the TypeScript code style for the project.
applyTo: "**"
---

# TypeScript Code Style

> This section covers naming conventions, file organization,
> and code patterns that keep the codebase consistent.
> The project uses TypeScript with strict mode and ES2020+ target.

## Naming Conventions

| Construct         | Convention                         | Example                                        |
| ----------------- | ---------------------------------- | ---------------------------------------------- |
| Functions         | camelCase                          | `createCharacterSheet()`, `renderPlayerView()` |
| Classes           | PascalCase                         | `CharacterBuilder`, `PlayerState`              |
| Interfaces/Types  | PascalCase                         | `CharacterSheet`, `SkillEntry`                 |
| Constants         | SCREAMING_SNAKE_CASE               | `MAX_ABILITY_SCORE`, `LOCAL_STORAGE_KEY`       |
| Objects/Modules   | camelCase                          | `characterData`, `uiManager`                   |
| Files             | lowercase or camelCase             | `main.ts`, `characterSheet.ts`                 |
| Test files        | Match source filename + `.test.ts` | `characterSheet.test.ts`                       |
| CSS/style files   | lowercase                          | `styles.css`, `theme.css`                      |

## File & Folder Organization

```
unofficial-matrix-rpg-101/
├── src/
│   ├── main.ts          # Application entry point and view controller
│   ├── animations.ts    # Motion.dev animation utilities
│   └── styles.css       # All styling
├── index.html           # HTML entry point
├── tsconfig.json        # TypeScript configuration
├── docs/                # Documentation or generated docs
└── vite.config.ts       # Build configuration
```

- **src/main.ts**: Central application logic, view rendering, user interactions
- **src/animations.ts**: All motion.dev animation functions
- **src/styles.css**: All application styling using CSS variables for theming
- **index.html**: Single entry point for the SPA (single-page application)
- Keep related functionality together in the same file or well-organized functions
- Extract functions into separate modules only when they become large (>200 lines)
  or when they are reused across multiple parts of the application

## Import Conventions

- Use ES6 `import` and `export` syntax
- Keep imports at the top of files

```typescript
// ✅ correct
import { characterData } from "./data.ts";
import { renderView } from "./views.ts";

// ❌ avoid
const characterData = require("./data.ts");
```

- No relative import hell — keep files organized logically

```typescript
// ✅ acceptable
import type { PlayerState } from "./playerState.ts";
import { saveToStorage } from "../utils/storage.ts";
```

## Exports

- Export functions and utilities as named exports
- Always include explicit return types

```typescript
  // ✅ correct for utilities
  export function createCharacterSheet(name: string): CharacterSheet { ... }
  export const MAX_ABILITY_SCORE = 18 as const

  // ✅ acceptable for default exports of primary modules
  export default function renderPlayerView(): void { ... }
```

- Keep exports close to where they're defined
- No unnecessary re-export files — import directly from the source

## Constants

- No magic numbers — extract to named constants

```javascript
  // ❌ avoid
  if (character.health > 10) { ... }

  // ✅ correct
  const MAX_HEALTH = 10
  if (character.health > MAX_HEALTH) { ... }
```

- Define constants near where they're used or in a shared constants file
- Use SCREAMING_SNAKE_CASE for all constant names

## TypeScript Patterns

### Interfaces & Types

```typescript
// ✅ Define interfaces for all data shapes
interface CharacterSheet {
  name: string
  archetype: string
  health: number
  skills: SkillEntry[]
}

interface SkillEntry {
  id: string
  name: string
  rating: number
  attribute: string
}

// ✅ Use type for unions and simple aliases
type View = 'home' | 'learn' | 'builder'
type DownloadType = 'hardwired' | 'softcoded' | 'none'
```

### Object & Data Structures

```typescript
// ✅ Clear typed destructuring in function parameters
function createAbility({ name, pointCost, requirements }: AbilityOptions): Ability { ... }

// ✅ Typed object literals for configuration
const CHARACTER_DEFAULTS: Readonly<CharacterSheet> = {
  name: '',
  archetype: '',
  health: 10,
  skills: [],
}

// ✅ Spread operator for object composition
const extendedCharacter: CharacterSheet = { ...baseCharacter, ...customizations }
```

### Array Operations

```typescript
// ✅ Modern array methods — types infer correctly
const filteredAbilities = abilities.filter(a => a.category === 'combat')
const doubled = scores.map((s: number) => s * 2)
const total = scores.reduce((sum, s) => sum + s, 0)
```

### Async Operations

```typescript
// ✅ Use async/await with typed return
async function loadCharacterSheet(id: string): Promise<CharacterSheet | null> {
  try {
    const data = localStorage.getItem(`character_${id}`)
    return data ? (JSON.parse(data) as CharacterSheet) : null
  } catch (error: unknown) {
    console.error('Failed to load character:', error)
    return null
  }
}
```

### DOM Manipulation

```typescript
// ✅ Use typed DOM APIs — assert non-null where safe
const element = document.getElementById("player-sheet") as HTMLElement
element.textContent = "New Title"
element.addEventListener("click", handleClick)

// ✅ Use dataset attributes for storing data
const el = e.target as HTMLElement
const id = el.dataset.characterId ?? ''
```

## What to Avoid

- No `var` — use `const` by default, `let` when reassignment is needed
- No `any` — use `unknown` for untrusted data, then narrow with type guards
- No commented-out code committed to the repository
- No magic numbers — extract to named constants
- No unused variables or imports
- No implicit return types on exported functions
