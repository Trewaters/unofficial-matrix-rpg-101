---
description: This file defines the error handling and validation standards for the project.
applyTo: "**"
---

# Error Handling & Validation

> This is a client-side only application. Error handling focuses on
> graceful degradation and user feedback, with no server-side logic.

## Core Principles

1. **Fail gracefully** — always handle errors visibly to the user
2. **Preserve user data** — never lose unsaved work due to an error
3. **Provide recovery paths** — offer retry or fallback options
4. **Log helpful context** — console output should help debugging

## Logging

Use console methods for debugging and error tracking:

```javascript
console.error("[loadCharacterSheet] Failed to load:", error);
console.warn("[characterBuilder] Missing optional field:", { id });
console.log("[renderPlayerSheet] Sheet rendered successfully");
```

- Log with function/view context as the first argument so logs are traceable
- Keep sensitive data (passwords, private keys) out of logs
- Remove `console.*` calls before committing unless they are helpful for users

## Async Error Handling

- Always use `async/await` — never mix `.then()/.catch()` chains
- Always wrap `await` calls in `try/catch` — never assume they succeed
- Always use `unknown` for caught errors and narrow before use

```javascript
  // ✅ correct
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[loadCharacterSheet]', message)
  }

  // ❌ avoid
  catch (error) { console.error(error) }
```

- No empty catch blocks — every catch must log or rethrow

```javascript
  // ❌ never do this
  catch {}
  catch (error) { }
```

## Client-Side Error Handling

- Display user-friendly messages — never raw error strings
- Always provide a recovery path — retry button, back link, or fallback UI
- Log the full error for debugging; show simplified message to user

```javascript
// ✅ client-side async error pattern with manual state
async function handleSaveCharacter() {
  try {
    console.log("[characterBuilder] Saving character...");
    await saveCharacterToStorage(formData);
    console.log("[characterBuilder] Character saved successfully");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[characterBuilder] Save failed:", message);
    alert("Failed to save character. Please try again.");
  }
}
```

## localStorage Error Handling

- Always wrap `localStorage` access in try/catch — quota exceeded or
  private browsing can throw
- Handle JSON.parse errors for corrupted data

```javascript
// ✅ correct
try {
  const data = localStorage.getItem("character_sheet");
  return data ? JSON.parse(data) : null;
} catch (error) {
  console.error("[loadFromStorage] Parse failed:", error);
  return null;
}
```

## Form Validation

Forms use manual state — no form library is in use.

- Validate on submit first — do not block typing with aggressive
  inline validation
- Show field-level errors after the user has left a field (on blur),
  not while they are typing
- Always validate before saving to localStorage

## What to Avoid

- No `console.log`, `console.error`, or `console.warn` in production code without clear purpose
- No swallowed errors — every `catch` must log or rethrow
- No unhandled promise rejections — every `await` needs a `try/catch`
- No silent failures when localStorage is unavailable
- No displaying raw error messages to users — always provide friendly messages
