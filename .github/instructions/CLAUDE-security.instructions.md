---
description: This file defines the client-side storage security standards and best practices for the project.
applyTo: "**"
---

## Client-Side Storage Security

Browsers offer several storage mechanisms. Each has different
security properties. The rule is simple: **sensitive data lives
on the server, not in the browser.**

### What is sensitive data

- Authentication tokens and session identifiers
- User personal information (email, name, profile data)
- Role and permission information used for access decisions
- API keys or secrets of any kind
- Payment or billing information
- Health or practice history data

### Storage mechanism rules

| Storage                 | Use for                                                      | Never store                                                                          |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `localStorage`          | Non-sensitive UI preferences (theme, language)               | Sensitive data of any kind — persists indefinitely, accessible to any JS on the page |
| `sessionStorage`        | Non-sensitive temporary UI state                             | Sensitive data — cleared on tab close but still accessible to JS                     |
| Cookies (JS-accessible) | Nothing sensitive — avoid entirely for auth                  | Tokens, session data, personal info                                                  |
| IndexedDB               | Large non-sensitive app data (cached poses, offline content) | User personal data, tokens, credentials                                              |

### localStorage usage pattern

When localStorage is appropriate (UI preferences only):

```javascript
// ✅ correct — non-sensitive preference only
localStorage.setItem("theme", "dark");
localStorage.setItem("preferredLanguage", "en");
localStorage.setItem("characterSheet", JSON.stringify(characterData));

// ❌ never store user data
localStorage.setItem("userEmail", userEmail);
localStorage.setItem("authToken", token);
```

### What to avoid

- No sensitive data in `localStorage` or `sessionStorage` — ever
- No authentication tokens in any browser storage
- No user personal data stored client-side
- No role or permission data stored client-side and trusted
  for security decisions
- No secrets or API keys in any browser storage
