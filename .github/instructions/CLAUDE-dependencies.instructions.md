---
description: This file defines the dependency management standards and best practices for the project.
applyTo: "**"
---

# Dependency Management

> The preferred libraries for this project are defined in the
> Tech Stack section. This section covers how to evaluate,
> add, and maintain dependencies.

## Core Principle

Every dependency is a long-term maintenance commitment. It carries
security risk, upgrade cost, and bundle weight. Add dependencies
deliberately — not because it's convenient.

## Before Adding a New Dependency

Answer these questions before running `npm install`:

1. **Is it already covered?** Check the Tech Stack section first.
   The project currently has only Vite as a dev dependency.
2. **Is it necessary?** Can the functionality be implemented
   in under ~30 lines with native browser APIs?
   If so, write it instead.
3. **Is it maintained?** Check for recent releases, open issues,
   and active maintainers. Avoid packages with no commits in
   the past year.
4. **Is it healthy?** Run `npm audit` after adding — do not
   introduce packages with known vulnerabilities.
5. **Is it appropriately sized?** Check bundle impact for
   packages — a utility that adds 200kb for one
   function is not justified.

```bash
# Check bundle size impact before installing
npx bundlephobia <package-name>

# Audit immediately after installing
npm audit
```

## Categorizing Dependencies Correctly

Place every package in the right category — this affects
production bundle size and deployment:

```bash
# Runtime dependency — ships to production
npm install <package>

# Development only — never ships to production
npm install --save-dev <package>
```

| Category          | Examples                                      | Current Status |
| ----------------- | --------------------------------------------- | -------------- |
| `dependencies`    | None currently — keep minimal                 | Empty          |
| `devDependencies` | Vite, testing frameworks (if added), bundlers | Vite 5.x       |

A common mistake is installing dev tools as runtime dependencies.
If it is only used in tests or build scripts, it belongs in `devDependencies`.

## Evaluating a Package

```javascript
// Before installing, check:
// 1. npm page — weekly downloads, last publish date
// 2. GitHub — open issues, recent commits, contributor count
// 3. License — must be MIT, Apache 2.0, or BSD compatible
// 4. Bundle size — https://bundlephobia.com
// 5. No unnecessary large dependencies
```

## Keeping Dependencies Updated

- Review and update dependencies **monthly** at minimum
- Use `npm outdated` to identify stale packages
- Update one package at a time and run `npm run build`
  between updates — do not batch major version upgrades
- Pay extra attention to security patches — apply promptly

```bash
# See what is out of date
npm outdated

# Update a specific package
npm install <package>@latest

# Build after any update
npm run build
```

## Removing Dependencies

Removing a package is as important as adding one. When a feature
is removed or replaced:

- Remove the package from `package.json` immediately
- Run `npm install` to update `package-lock.json`
- Run `npm audit` to confirm no new vulnerabilities were introduced
- Search the codebase for any remaining imports and remove them

```bash
npm uninstall <package>
npm audit
```

## What to Avoid

- No unnecessary dependencies — start with vanilla JS, add only if needed
- No packages without modern maintenance — last publish over one year ago is a
  red flag
- No GPL or other copyleft licenses — this is a private commercial project
- No new dependencies added without running `npm audit` first
- No packages added just because an AI tool suggested them —
  verify the package exists and is appropriate before installing
- No abandoned packages
