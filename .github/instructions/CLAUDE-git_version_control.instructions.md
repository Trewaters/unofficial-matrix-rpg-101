---
description: This file defines the Git and version control standards and best practices for the project.
applyTo: "**"
---

# Git & Version Control

> Commit message keywords are defined in the Tech Stack section
> and reinforced in Code Review Standards. This section covers
> branch strategy, CI pipeline, release process, and what
> never belongs in version control.

## Commit Messages

Follow Keep a Changelog conventions on every commit.
Format: `KEYWORD: short description in present tense`

```bash
# correct
ADD: character sheet export to JSON
FIX: character builder crash when no armor equipped
UPDATE: localStorage persistence for character data
REMOVE: legacy unused CSS from styles.css
AUDIT: remove unused imports from main.js
SECURITY: sanitize user-generated content before display

# avoid
fixed bug
updated stuff
WIP
checkpoint
more changes
```

### Commit message rules

- Use present tense — `ADD:` not `ADDED:`
- Keep the description under 72 characters
- Describe user or codebase impact — not implementation details
- One logical change per commit — do not bundle unrelated changes
- Update `CHANGELOG.md` in the same commit as the code change

## Branch Strategy

This is a solo project — keep branching simple and consistent.

```
main              ← production-ready code only
├── feature/      ← new features
├── fix/          ← bug fixes
├── audit/        ← code cleanup and refactoring
└── security/     ← security patches
```

### Branch naming

Match the changelog keyword to the branch prefix:

```bash
# Pattern: keyword/short-description-in-kebab-case
feature/character-export-json
fix/builder-armor-crash
audit/remove-unused-styles
security/sanitize-html-content
update/character-schema
```

### Branch rules

- `main` is always deployable — never commit broken code directly
- Keep feature branches short-lived — merge or close within a week
- Delete branches after merging — do not accumulate stale branches
- One feature or fix per branch — do not bundle unrelated changes

## GitHub Actions CI Pipeline

The project runs `npm run build` in CI to ensure production builds succeed.
The runner path is `/home/runner/work/unofficial-matrix-rpg-101/unofficial-matrix-rpg-101/`.

### What CI must pass before merging to main

- [ ] `npm run build` — production build succeeds

### CI environment requirements

- No environment-specific variables required for basic build
- Never hardcode secrets in workflow files — use GitHub Actions secrets
- Keep workflows simple — focus on catching broken builds

## Release Process

The project uses semantic versioning via manual version updates in `package.json`.

### Before releasing

```bash
# 1. Ensure build succeeds
npm run build

# 2. Audit dependencies
npm audit

# 3. Update CHANGELOG.md with all changes since last release
#    Move entries from [Unreleased] to the new version section

# 4. Update package.json version number

# 5. Create a release commit and tag
git commit -m "RELEASE: version X.X.X"
git tag vX.X.X
git push origin main --tags
```

### CHANGELOG.md format

```markdown
## [Unreleased]

### ADD

- Character sheet export to JSON format

---

## [1.0.0] - 2024-01-15

### FIX

- Character builder crash when armor value exceeds maximum

### AUDIT

- Removed unused CSS from character card styles
```

- Always keep an `[Unreleased]` section at the top
- Date format: `YYYY-MM-DD`
- Entries written from the user's perspective — not implementation
- One entry per logical change — not one per commit if commits are granular

## What Never Goes in Version Control

```bash
# Secrets and credentials
.env
.env.local
.env.production
.env.development

# Generated files — always reproducible
node_modules/
dist/
coverage/
.eslintcache

# Binary assets
*.jpg
*.jpeg
*.png
*.gif
*.mp4
*.pdf

# OS and editor noise
.DS_Store
Thumbs.db
*.swp
```

Verify these are all in `.gitignore` — generated files and secrets
committed by accident are the most common git security mistakes.

## Recovering from Common Mistakes

### Accidentally committed a secret

```bash
# 1. Immediately rotate the exposed credential — do not wait
# 2. Remove from git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" HEAD

# 3. Force push — this rewrites history
git push origin --force --all

# 4. Audit all environments that used the credential
```

### Accidentally committed to main

```bash
# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Move changes to a proper branch
git checkout -b fix/description
git commit -m "FIX: description"
```

## What to Avoid

- No direct commits to `main` — always branch and merge
- No WIP, checkpoint, or untitled commits
- No secrets or credentials in any committed file
- No binary assets committed — use external storage if needed
- No generated files committed (`node_modules/`, `dist/`)
- No bundling unrelated changes in one commit or branch
- No environment variable values in GitHub Actions workflow
  files — always use repository secrets
- No production database credentials in CI configuration
