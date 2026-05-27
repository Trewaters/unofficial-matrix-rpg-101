# Changelog and Docs Threshold Rules

## Minor Changes (docs can be skipped)

- Test-only changes (`__test__/`, `e2e/`, mocks)
- Spelling/grammar/comment-only changes
- Pure style-only refactors with no behavior change
- Internal cleanup with no exported API or runtime behavior impact
- If `force-docs` is provided, run docs anyway

## Non-Minor Changes (run docs)

- New or changed exported functions, interfaces, or component props
- API route contract changes (request/response/auth behavior)
- User-visible feature behavior updates
- Schema/model changes that alter documented behavior
- Changes that affect TypeDoc-exposed surfaces

## Changelog Wording Guidelines

- Write from user perspective
- Keep one concise bullet per logical change
- Avoid implementation details in changelog bullets
- Group changes under the current package version section in `CHANGELOG.md`
- If the target section is missing in an existing package version block, ask before creating it

## Commit Keyword Mapping

- `ADD`: for new features
- `UPDATE`: for changes in existing functionality
- `DEPRECATE`: for soon-to-be removed features
- `REMOVE`: for now removed features
- `FIX`: for any bug fixes
- `SECURITY`: in case of vulnerabilities
- `AUDIT`: code clean up. Carefully removing unnecessary files
