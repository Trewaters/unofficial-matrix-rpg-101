---
name: staged-commit-workflow
description: 'Finalize and execute a commit: create message from staged changes, bump version in package.json, update CHANGELOG.md, and run git commit. Use for complete pre-commit workflow with automatic execution.'
argument-hint: 'Optional: extra context for commit intent or release note tone'
user-invocable: true
disable-model-invocation: false
---

# Staged Commit Workflow

## What This Skill Produces

This skill produces and executes a complete commit package from the current staged diff:

1. A commit message based on staged changes
2. A version bump in `package.json` (`"version"`)
3. An updated `CHANGELOG.md` entry under the new package version header
4. Automatic execution of `git commit` with the generated message

## When to Use

Use this skill when:

- You already staged changes and want a consistent commit message
- You want changelog updates enforced before commit

Do not use this skill when:

- Nothing is staged
- You only want to commit without changelog checks

## Inputs

- Optional user note describing intent (bug fix, feature, audit cleanup)
- Optional flag: `skip-version-bump` to skip version increment (e.g., for test-only or config-only commits)
- Optional flag: `bump=patch`, `bump=minor`, or `bump=major` to override the default patch version increment
- Optional changelog policy note if team-specific rules differ from standard Keep a Changelog usage
- Current staged changes in git index

## Commit Keywords

- `ADD`: for new features.
- `UPDATE`: for changes in existing functionality.
- `DEPRECATE`: for soon-to-be removed features.
- `REMOVE`: for now removed features.
- `FIX`: for any bug fixes.
- `SECURITY`: in case of vulnerabilities.
- `AUDIT`: code clean up. Carefully removing unnecessary files.

## Procedure

1. Inspect staged changes only:
   - `git diff --cached --name-only`
   - `git diff --cached`
2. Classify the change category:
   - `ADD`, `FIX`, `UPDATE`, `REMOVE`, `DEPRECATE`, `SECURITY`, or `AUDIT`
3. Draft commit message from observed impact:
   - Format: `KEYWORD: short present-tense summary`
   - Keep summary under 72 characters when possible
   - Prefer user-visible impact over implementation detail
4. Bump version in `package.json` (skip if `skip-version-bump` flag is set):
   - Read current `"version"` from `package.json` → format `major.minor.patch`
   - Apply bump: default is **patch** increment (`major.minor.(patch+1)`); honour `bump=patch`, `bump=minor`, or `bump=major` if provided
   - Update `"version"` in `package.json` to the new version string
   - Stage `package.json`
5. Perform changelog preflight checks:
   - If `CHANGELOG.md` does not exist, create it with a standard Keep a Changelog header before proceeding
   - Use [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/) conventions
6. Update changelog with versioned header flow:
   - Read the **new** package version from `package.json` (after step 4)
   - Compute today's date in `YYYY-MM-DD`
   - In `CHANGELOG.md`, find header `## [<package-version>] - <date>`
   - If that package version section already exists, append the new bullet there (group same-version changes together across commits)
   - If that package version section does not exist, create `## [<package-version>] - <today>` and add the entry
   - Map commit keyword to changelog section names:
     - `ADD` → `### Added`
     - `FIX` → `### Fixed`
     - `UPDATE` and `AUDIT` → `### Changed`
     - `REMOVE` → `### Removed`
     - `DEPRECATE` → `### Deprecated`
     - `SECURITY` → `### Security`
   - If target section is missing in an existing version block, ask before creating it
   - Keep wording user-facing and concise
   - Stage `CHANGELOG.md`
7. Execute the commit:
   - Run `git commit -m "<commit message>"` with the formatted message
   - Confirm the commit succeeded (no errors)
8. Return final output (see Output Template below)

## Decision Rules

Use these rules in priority order:

1. If no staged files: stop and ask user to stage files first.
2. If staged changes are test-only, typo-only, comment-only, or non-functional refactors: use `bump=patch`; skip version bump entirely if `skip-version-bump` is provided.
3. If user passes `skip-version-bump`, do not modify `package.json`.
4. If uncertain about bump level, default to `patch`.

## Quality Checks

Before finalizing:

- Commit message keyword matches actual change type
- Message is present tense and specific
- `"version"` in `package.json` reflects the intended bump
- `package.json` is staged
- `CHANGELOG.md` updated under the matching **new** package version section
- Version header includes package version and date in `YYYY-MM-DD` format when newly created
- Existing version sections are reused to keep same-version commits grouped together
- No unstated assumptions about unstaged files

## Output Template

- `Commit message:` <KEYWORD: summary>
- `Version:` <old-version> → <new-version> (package.json bumped) | Skipped
- `Changelog:` <section [new-version] and line added>
- `Status:` ✅ Committed (commit hash shown)
