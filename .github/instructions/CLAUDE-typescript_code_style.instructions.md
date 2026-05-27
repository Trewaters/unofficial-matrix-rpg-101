---
description: This file describes the JavaScript code style for the project.
applyTo: "**"
---

# JavaScript Code Style

> This section covers naming conventions, file organization,
> and code patterns that keep the codebase consistent.
> The project uses vanilla JavaScript with standard ES2020+ syntax.

## Naming Conventions

| Construct       | Convention                         | Example                                        |
| --------------- | ---------------------------------- | ---------------------------------------------- |
| Functions       | camelCase                          | `createCharacterSheet()`, `renderPlayerView()` |
| Classes         | PascalCase                         | `CharacterBuilder`, `PlayerState`              |
| Constants       | SCREAMING_SNAKE_CASE               | `MAX_ABILITY_SCORE`, `LOCAL_STORAGE_KEY`       |
| Objects/Modules | camelCase                          | `characterData`, `uiManager`                   |
| Files           | lowercase or camelCase             | `main.js`, `characterSheet.js`                 |
| Test files      | Match source filename + `.test.js` | `characterSheet.test.js`                       |
| CSS/style files | lowercase                          | `styles.css`, `theme.css`                      |

## File & Folder Organization

```
unofficial-matrix-rpg-101/
├── src/
│   ├── main.js          # Application entry point and view controller
│   └── styles.css       # All styling
├── index.html           # HTML entry point
├── docs/                # Documentation or generated docs
└── vite.config.js       # Build configuration
```

- **src/main.js**: Central application logic, view rendering, user interactions
- **src/styles.css**: All application styling using CSS variables for theming
- **index.html**: Single entry point for the SPA (single-page application)
- Keep related functionality together in the same file or well-organized functions
- Extract functions into separate modules only when they become large (>200 lines)
  or when they are reused across multiple parts of the application

## Import Conventions

- Use ES6 `import` and `export` syntax
- Keep imports at the top of files

```javascript
// ✅ correct
import { characterData } from "./data.js";
import { renderView } from "./views.js";

// ❌ avoid
const characterData = require("./data.js");
```

- No relative import hell — keep files organized logically

```javascript
// ✅ acceptable
import { PlayerState } from "./playerState.js";
import { saveToStorage } from "../utils/storage.js";
```

## Exports

- Export functions and utilities as named exports

```javascript
  // ✅ correct for utilities
  export function createCharacterSheet(name) { ... }
  export const MAX_ABILITY_SCORE = 18

  // ✅ acceptable for default exports of primary modules
  export default function renderPlayerView() { ... }
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

## JavaScript Patterns

### Object & Data Structures

```javascript
// ✅ Clear object destructuring in function parameters
function createAbility({ name, pointCost, requirements }) { ... }

// ✅ Object literals for configuration
const CHARACTER_DEFAULTS = {
  health: 10,
  armor: 0,
  speed: 4,
}

// ✅ Spread operator for object composition
const extendedCharacter = { ...baseCharacter, ...customizations }
```

### Array Operations

```javascript
// ✅ Modern array methods
const filteredAbilities = abilities.filter(a => a.category === 'combat')
const doubled = scores.map(s => s * 2)
const total = scores.reduce((sum, s) => sum + s, 0)

// ❌ avoid old patterns
for (let i = 0; i < abilities.length; i++) { ... }
```

### Async Operations

```javascript
// ✅ Use async/await for promise handling
async function loadCharacterSheet(id) {
  try {
    const data = localStorage.getItem(`character_${id}`)
    return JSON.parse(data)
  } catch (error) {
    console.error('Failed to load character:', error)
    return null
  }
}

// ❌ avoid promise chains
loadCharacterSheet().then(data => { ... })
```

### DOM Manipulation

```javascript
// ✅ Use standard DOM APIs
const element = document.getElementById("player-sheet");
element.textContent = "New Title";
element.addEventListener("click", handleClick);

// ✅ Use dataset attributes for storing data
element.dataset.characterId = id;
const id = element.dataset.characterId;
```

## What to Avoid

- No `var` — use `const` by default, `let` when reassignment is needed
- No commented-out code committed to the repository
- No magic numbers — extract to named constants
- No unused variables or imports
