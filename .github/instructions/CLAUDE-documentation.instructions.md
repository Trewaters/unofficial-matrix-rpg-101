---
description: This file defines the documentation standards and best practices for the project.
applyTo: "**"
---

# Documentation

> This project uses JSDoc comments for inline code documentation.
> Clear, well-commented code is the primary documentation source.

## What Must Be Documented

### Always document with JSDoc comments

- All exported functions
- All exported constants that are not self-explanatory
- All complex game logic or validation functions
- All functions with non-obvious side effects (DOM manipulation, localStorage access)
- Any utility functions that are reused

### Never document (noise, not signal)

- Internal implementation details that are clear from the code
- One-line utility functions where the name is self-documenting
- Test files
- Trivial getter/setter functions

## JSDoc Comment Format

```javascript
/**
 * Brief one-line description of what this does.
 *
 * Longer explanation if the behavior is non-obvious, has edge cases,
 * or requires domain knowledge (game rules, special behavior).
 *
 * @param {string} id - The unique identifier of the character to retrieve
 * @param {Object} options - Configuration options
 * @param {string} options.format - Output format (JSON or plain text)
 * @returns {Object|null} The matching character record, or null if not found
 * @throws {Error} If localStorage is unavailable
 *
 * @example
 * const char = getCharacterById('abc123')
 * if (!char) console.log('Character not found')
 */
function getCharacterById(id, options = {}) { ... }
```

## Function Documentation

```javascript
/**
 * Validates character sheet data and returns normalized form.
 * Enforces Matrix RPG rules: health cannot exceed 100, armor cannot be negative.
 *
 * @param {Object} data - The raw character sheet data
 * @param {number} data.health - Current health points
 * @param {number} data.armor - Armor rating
 * @returns {Object} Normalized character data ready for storage
 * @throws {Error} If validation fails (includes detailed message)
 */
function validateCharacterSheet(data) { ... }
```

## Async Function Documentation

```javascript
/**
 * Loads character sheet from browser localStorage.
 * Gracefully handles corrupted or missing data by returning null.
 *
 * @param {string} characterId - The character's unique identifier
 * @returns {Promise<Object|null>} The loaded character, or null if load fails
 *
 * @example
 * const char = await loadCharacter('player-1')
 * if (!char) {
 *   console.log('Failed to load character sheet')
 * }
 */
async function loadCharacter(characterId) { ... }
```

## DOM Manipulation Function Documentation

```javascript
/**
 * Renders a character card to the given DOM element.
 * Clears previous content and updates with the new character's name, class, and health.
 *
 * @param {HTMLElement} container - The element to render into
 * @param {Object} character - The character data to display
 * @returns {HTMLElement} The rendered card element
 * @throws {Error} If container is not a valid DOM element
 */
function renderCharacterCard(container, character) { ... }
```

## Inline Comments

Use inline comments for **why**, not **what**. The code shows what
is happening — comments explain non-obvious decisions.

```javascript
// ✅ explains why — preserves context a future reader would lose
// localStorage quota can be exceeded in private browsing mode;
// gracefully fall back to in-memory state if save fails
try {
  localStorage.setItem("character", JSON.stringify(data));
} catch (error) {
  useInMemoryStorage(data);
}

// ❌ explains what — the code already says this
// Save the character to storage
localStorage.setItem("character", JSON.stringify(data));
```

### When inline comments are required

- Non-obvious workarounds or browser quirks
- Game rule enforcement that isn't captured by variable names
- Known tech debt with a brief explanation

```javascript
// TECH DEBT: localStorage API is synchronous and can block UI
// if data is very large; consider refactoring to IndexedDB
const saved = localStorage.getItem("character");
```

- Intentional `any` typing or casting — must explain why

## Changelog Documentation

Every meaningful change must be recorded in `CHANGELOG.md`
using Keep a Changelog format.

```markdown
## [Unreleased]

### ADD

- Character sheet export to JSON format

### FIX

- Character builder crash when armor value exceeds maximum

### AUDIT

- Removed unused CSS from character card styles
```

- Update the changelog **in the same commit** as the code change
- Group entries under the correct keyword (`ADD`, `FIX`, etc.)
- Write entries from the **user's perspective**, not the
  implementation perspective

```markdown
# ✅ user perspective

ADD: export character sheet to JSON for backup

# ❌ implementation perspective

ADD: added jsonExport() function to character module
```

## README Documentation

The project README should contain:

- Brief description of the application
- Feature list (user-facing, not technical)
- Quick start instructions (npm install, npm run dev, npm run build)
- Link to CHANGELOG for release notes

## What to Avoid

- No documentation that just repeats the function signature

```javascript
  // ❌ useless
  /** Gets character by id */
  function getCharacterById(id) { ... }
```

- No `TODO` comments without a description of what needs doing
- No commented-out code — delete it, version control has the history
- No documentation on generated or internal implementation files
- No changelog entries that describe code instead of user impact
