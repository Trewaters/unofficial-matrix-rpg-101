---
description: This file defines the testing standards and best practices for the project.
applyTo: "**"
---

# Testing

> Testing is recommended for core game logic and data persistence.
> The project has no formal test framework currently configured,
> but can be extended with Vitest or Jest when needed.

## Core Philosophy

- **Test behavior, not implementation** — test what a function does,
  not how it does it internally
- **Every complex feature needs tests** — do not merge complex logic without validation
- **Tests document expected behavior** — test code should be clear and readable
- **No skipped tests without a reason** — if tests are skipped,
  document why and link to an issue

## Test Types & When to Use Each

| Type        | Tool           | Use for                                |
| ----------- | -------------- | -------------------------------------- |
| Unit        | Vitest or Jest | Pure functions, utilities, game logic  |
| Integration | Vitest or Jest | Multi-unit flows, data persistence     |
| End-to-end  | Playwright     | Critical user journeys through the app |

## Current State

- **No formal test framework configured yet**
- **Recommended**: Vitest (Vite-native test framework) when tests are added
- **Alternative**: Jest with simple config

## Testing Game Logic

Focus testing on:

1. **Character sheet validation** — ensure stats stay within bounds
2. **Game rules** — validate Matrix RPG rules are enforced
3. **Data serialization** — JSON persistence/restore works correctly
4. **localStorage operations** — read/write/corruption handling

### Example test structure (pseudo-code for future implementation)

```javascript
// Example: character sheet validation
describe("Character Sheet", () => {
  it("should not allow health below zero");
  it("should not allow armor above maximum");
  it("should enforce skill point limits");
  it("should restore from saved JSON correctly");
});
```

## Testing Views (DOM Interaction)

When a test framework is added, focus on:

1. **Navigation** — views switch correctly on user interaction
2. **Form submission** — data saves on button click
3. **Error states** — error messages display on failure
4. **Data display** — loaded data renders correctly

## localStorage Testing

Always test localStorage interactions:

```javascript
// When test framework is added, test these scenarios:
- Save character succeeds
- Load character succeeds
- Corrupted JSON gracefully fails
- Storage quota exceeded is handled
- Missing optional fields don't crash loading
```

## Running Tests (Future)

When a test framework is added:

```bash
npm run test                # Full test suite
npm run test:watch         # Watch mode for development
npm run test:coverage      # Coverage report
npm run e2e                # End-to-end tests
```

## What to Avoid

- No untested game logic — core rules must be validated
- No test-only code committed to the repo without tests in place
- No `console.log` in test files — use proper test output
- No tests that depend on each other's execution order
- No ignored tests without documentation
