---
description: This file defines the performance optimization standards and best practices for the project.
applyTo: "**"
---

# Performance

> Performance optimization follows one rule:
> **measure before optimizing**. Do not add complexity in the name
> of performance without evidence of a problem. This section defines
> what to do by default and what to reach for when there is a measured
> problem.

## Default Behaviors — Always Apply

These cost nothing and should be done as a matter of course:

### Data Serialization

- Always validate and parse localStorage data carefully
- Avoid storing large or deeply nested objects
- JSON.stringify/parse is synchronous and can block the UI on large data
  — keep serialized data minimal

### Bundle Awareness

- Do not import entire libraries when only one function is needed

```javascript
// ✅ correct — specific import if the library supports it
import { someFunction } from "large-library";

// ❌ avoid — imports entire library
import * as lib from "large-library";
```

- Keep the application lean — vanilla JS without frameworks is already
  lightweight

## DOM Performance

Apply these patterns to avoid layout thrashing and reflows:

### Batch DOM Updates

```javascript
// ❌ avoid — causes multiple reflows
element.style.width = "100px";
element.style.height = "200px";
element.textContent = "New text";

// ✅ correct — batch into single class or style update
element.classList.add("large-item");
element.textContent = "New text";
```

### Event Delegation

Use event delegation for lists of items instead of adding listeners
to each item:

```javascript
// ❌ avoid — adds listener to every item
items.forEach((item) => {
  item.addEventListener("click", handleItemClick);
});

// ✅ correct — single listener on container
container.addEventListener("click", (e) => {
  const item = e.target.closest("[data-item-id]");
  if (item) handleItemClick(item);
});
```

## What to Avoid

- No unnecessary DOM operations in loops
- No large synchronous computations on the main thread
- No massive JSON objects in localStorage — keep data minimal
- No premature optimization without measurement
- No polyfills for modern browsers — target evergreen browsers only
