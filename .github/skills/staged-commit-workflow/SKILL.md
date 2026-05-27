---
name: staged-commit-workflow
description: 'Finalize and execute a commit: create message from staged changes, update CHANGELOG.md, and run git commit. Version bumps and changelog reorganization happen during release, not on every commit. Use for complete pre-commit workflow with automatic execution.'
argument-hint: 'Optional: extra context for commit intent or focus area'
user-invocable: true
disable-model-invocation: false
---

# Staged Commit Workflow

## What This Skill Produces

This skill produces and executes a complete commit package from the current staged diff:

1. A commit message based on staged changes
2. An updated `CHANGELOG.md` entry in the `[Unreleased]` section
3. Automatic execution of `git commit` with the generated message

**Note:** Version bumps happen only during release, not on every commit. See git instructions for release process.

## When to Use

Use this skill when:

- You already staged changes and want a consistent commit message
- You want changelog entries added to `[Unreleased]` before commit

Do not use this skill when:

- Nothing is staged
- You are performing a release (version bump is handled separately in release process)

## Inputs

- Optional user note describing intent (new feature, bug fix, cleanup)
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
4. Perform changelog preflight checks:
   - If `CHANGELOG.md` does not exist, create it with Keep a Changelog structure:
     ```markdown
     # Changelog

     All notable changes to this project will be documented in this file.

     The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

     ## [Unreleased]

     ### Added
     ### Changed
     ### Deprecated
     ### Removed
     ### Fixed
     ### Security
     ```
5. Update changelog in the `[Unreleased]` section:
   - Find the `## [Unreleased]` header in `CHANGELOG.md`
   - Map commit keyword to changelog section names:
     - `ADD` → `### Added`
     - `FIX` → `### Fixed`
     - `UPDATE` and `AUDIT` → `### Changed`
     - `REMOVE` → `### Removed`
     - `DEPRECATE` → `### Deprecated`
     - `SECURITY` → `### Security`
   - Add bullet point under matching section in `[Unreleased]` (create section if missing)
   - Keep wording user-facing and concise
   - Stage `CHANGELOG.md`
6. Execute the commit:
   - Run `git commit -m "<commit message>"` with the formatted message
   - Confirm the commit succeeded (no errors)

## Decision Rules

Use these rules in priority order:

1. If no staged files: stop and ask user to stage files first.
2. If staged changes are test-only, typo-only, comment-only, or non-functional refactors: classify as `AUDIT` and add to changelog.
3. If uncertain about category: ask the user which keyword best fits (`ADD`, `FIX`, `UPDATE`, etc.)

## Quality Checks

Before finalizing:

- Commit message keyword matches actual change type
- Message is present tense and specific
- `CHANGELOG.md` has `## [Unreleased]` section
- Changelog entry added under matching section in `[Unreleased]`
- Changelog entry is user-facing and concise
- `CHANGELOG.md` is staged
- No version changes to `package.json` (saved for release process)
- No unstated assumptions about unstaged files

## Output Template

- `Commit message:` <KEYWORD: summary>
- `Changelog:` Entry added to [Unreleased] → <section name>
- `Status:` ✅ Committed (commit hash shown)
