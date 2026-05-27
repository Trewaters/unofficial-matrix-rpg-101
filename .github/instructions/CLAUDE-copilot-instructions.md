---
applyTo: "**"
---

# Unofficial Matrix RPG AI Development Reference

## Goal

Provide AI agents with essential knowledge to be immediately productive
in the Unofficial Matrix RPG character sheet builder codebase. This
reference covers the full stack — architecture, coding standards, testing,
security, and game design — for the application.

## Output

- **Format:** Internal reference only (no output file generated)
- **Usage:** Used by the agent to inform all development decisions,
  code generation, and troubleshooting

## Persona

Act as a senior frontend engineer with deep knowledge of TypeScript,
Vite, HTML/CSS, localStorage persistence, and tabletop RPG mechanics.
You prefer clear, idiomatic TypeScript with strict typing and understand
the Matrix RPG ruleset. Guide development decisions with understanding
of both technical architecture and game design requirements.

---

---

# Tech Stack & Environment

This is a **client-side only** application. There is no backend server,
no database, and no authentication system. All data is stored in browser
localStorage.

## Runtime & Language

- **Node.js**: 18.x or higher
- **Language**: TypeScript (strict mode, `ES2020` target)
  - Explicit types on all function parameters and return values
  - `strict: true` — no implicit `any`, no loose null checks
  - TSDoc comments on all exported functions and types
- **Module system**: ES Modules (ESM) — all imports use `import` syntax
- **Package manager**: npm

## Frontend

- **Build Tool**: Vite 5.x
  - Dev server: `npm run dev` — instant feedback on changes
  - Production build: `npm run build` — creates optimized output in `dist/`
  - Preview: `npm run preview` — serves built output locally
- **UI Framework**: Vanilla HTML, CSS, and TypeScript (no JS framework)
  - Direct DOM manipulation via standard browser APIs
  - CSS custom properties for theming and responsive design
  - **Component library**: Shoelace (`@shoelace-style/shoelace`) — Web Components
    - Always prefer a Shoelace component over writing a custom one from scratch
    - Import components on-demand: `import '@shoelace-style/shoelace/dist/components/<name>/<name>.js'`
    - Dark theme CSS and base path are initialized in `main.ts`
- **App Type**: Client-side single-page application (SPA) with localStorage persistence

## Data Storage

- **Client-only**: Browser localStorage for character sheet persistence
  - Serialized JSON character data
  - No syncing, no backend, no cloud
  - User manages export/import for backups and portability
- **No external APIs**: Future placeholder for read-only Ethereum wallet viewing

## Testing

- **Current**: No formal test framework configured
- **Recommended approach** if testing is added:
  - Use Vitest (Vite-native test framework) or Jest
  - Keep tests minimal and focused on core game logic
  - Focus on: character validation, game rules, data serialization

## Deployment & Infrastructure

- **Platform**: Any static file host (GitHub Pages, Netlify, Vercel static, etc.)
- **Build output**: All files in `dist/` directory after `npm run build`
- **No environment variables**: None required for basic deployment
- **No CI/CD complexity**: Single build command is sufficient

## Tooling

- **Linting**: ESLint (if added) — keep rules minimal for vanilla JS
- **Formatting**: Prettier (if added) — configure to respect readability
- **Versioning**: Semantic versioning via manual CHANGELOG updates
- **Documentation**: JSDoc comments in code — no generated docs needed

## Changelog & Commit Convention

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
All commits and changelog entries must use these keywords:

| Keyword     | Purpose                                            |
| ----------- | -------------------------------------------------- |
| `ADD`       | New features                                       |
| `UPDATE`    | Changes to existing functionality                  |
| `DEPRECATE` | Features marked for upcoming removal               |
| `REMOVE`    | Features that have been deleted                    |
| `FIX`       | Bug fixes                                          |
| `SECURITY`  | Security vulnerability fixes                       |
| `AUDIT`     | Code cleanup; careful removal of unnecessary files |

## Browser Support Targets

- Chrome >= 90
- Edge >= 90
- Firefox >= 88
- Safari >= 14
- No IE support (modern browsers only)

---

# Project Overview

The Unofficial Matrix RPG Character Sheet is a local-first web application
for creating and saving player character sheets for The Unofficial Matrix RPG
tabletop role-playing game. Players build characters with identity, abilities,
skills, equipment, and notes. Everything is saved to browser localStorage
and can be exported as JSON for backup and portability.

## Application Views

The app has three main views accessible via top navigation:

1. **Home** — Landing page with welcome message and Call to Action buttons
2. **Learn** — Educational content about Matrix RPG rules and mechanics
3. **Jack In** — Character builder where players create/edit sheets

## Character Builder Structure

The "Jack In" view contains the character sheet editor with five tabs:

1. **Identity** — Character name, archetype, basic descriptors
2. **Abilities** — Primary stats and ability scores (Matrix RPG attributes)
3. **Skills** — Learned abilities, techniques, and proficiencies
4. **Loadout** — Equipment, weapons, armor, and other gear
5. **Notes** — Free-form text notes and custom character details

---

# Core Architecture Patterns

## Single-Page Application (SPA) Structure

- **Entry point**: `index.html` — standard Vite HTML entry
- **Main controller**: `src/main.ts` — handles view routing and rendering
- **Animations**: `src/animations.ts` — motion.dev animation utilities
- **Styling**: `src/styles.css` — all application styles with CSS custom properties

## View Management

The application manages three primary views:

```javascript
// View names used throughout the app
const VIEWS = {
  HOME: "home",
  LEARN: "learn",
  BUILDER: "builder", // also called "Jack In" in UI
};
```

Navigation between views is triggered by:

- Top navigation buttons (Home, Learn, Play)
- Call-to-action buttons on landing page
- Back buttons within views

## Character Sheet Data Model

Character data is a single JavaScript object:

```javascript
{
  // Identity tab
  name: string,
  archetype: string,
  description: string,

  // Abilities tab
  health: number,
  armor: number,
  speed: number,
  perception: number,
  willpower: number,
  // ... other Matrix RPG attributes

  // Skills tab
  skills: [
    { name: string, level: number },
    // ...
  ],

  // Loadout tab
  equipment: [
    { name: string, type: string, properties: string },
    // ...
  ],

  // Notes tab
  notes: string
}
```

## localStorage Pattern

- **Save key**: `character_sheet_<characterId>` (defaults to 'default')
- **Format**: JSON string via `JSON.stringify()`
- **Lifecycle**:
  - Load on app startup via `loadCharacter()`
  - Save on every significant change via `saveCharacter()`
  - Export as JSON file for backup
  - Import from JSON file for restoration

## Error Handling Strategy

All localStorage operations must:

1. Wrap in `try/catch`
2. Handle JSON.parse errors (corrupted data)
3. Handle quota exceeded (private browsing, full storage)
4. Provide user-friendly error messages
5. Offer fallback UI (create new character, reset to defaults)

---

---

# Matrix RPG Domain Knowledge

## Core Concepts

- **Archetype**: Character class/role (e.g., Hacker, Operative, Face)
- **Attributes**: Core statistics (Health, Armor, Speed, Perception, Willpower)
- **Skills**: Learned abilities and proficiencies
- **Equipment**: Tools, weapons, and gear the character carries
- **Health & Armor**: Defensive stats used in combat resolution

## Game Rules to Enforce

When validating character sheets, enforce these rules:

- Health cannot exceed 100 or go below 0
- Armor cannot be negative
- Speed must be a positive integer
- All numeric fields must be within reasonable bounds
- Character name is required before saving
- At least one ability must be selected

## References for Rules

- The Unofficial Matrix RPG uses d20 mechanics
- Character creation follows the game's point-buy or class system
- Equipment availability depends on the campaign setting
- Skills are typically learned through leveling or specific training

---

# File Organization & Key Components

## Main Application File (`src/main.js`)

Responsibilities:

- Initialize the application
- Manage view state (which view is currently displayed)
- Route navigation between Home, Learn, and Builder views
- Manage builder state (selected tab within character sheet)
- Handle save/load/export/import operations

Key functions:

- `render()` — render the current view
- `showView(viewName)` — switch to a specific view
- `saveCharacter()` — persist to localStorage
- `loadCharacter()` — restore from localStorage

## Styling (`src/styles.css`)

- **CSS Custom Properties**: Define theme colors, spacing, fonts
- **Responsive Design**: Mobile-first approach with media queries
- **Layout**: Flexbox for navigation, forms, and content areas
- **States**: Styling for active tabs, error states, disabled buttons

## localStorage Utility Functions

Expected helper functions for data persistence:

```typescript
// Save character to localStorage
function saveCharacter(characterData: CharacterSheet): void

// Load character from localStorage
function loadCharacter(characterId: string): CharacterSheet | null

// Export character as JSON file
function exportCharacter(characterData: CharacterSheet): void

// Import character from JSON file
function importCharacter(jsonString: string): CharacterSheet

// Validate character data before saving
function validateCharacterSheet(data: unknown): data is CharacterSheet
```

---

# Development Workflow

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# App opens at http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

## Making Changes

1. Edit files in `src/`
2. Vite hot-reloads automatically
3. Test in browser with localStorage persistence
4. Commit changes with proper message format
5. Update `CHANGELOG.md` in same commit

## Common Tasks

**Add a new character attribute:**

- Add field to character data model
- Add form input in Identity or Abilities tab
- Add validation rule
- Update localStorage save/load

**Add a new skill:**

- Add skill entry form in Skills tab
- Handle add/edit/delete operations
- Serialize to character JSON
- Validate skill names are unique

**Change UI styling:**

- Modify `src/styles.css`
- Use CSS custom properties for consistency
- Test on mobile viewport (Vite dev tools)

---

# Code Style & Naming

## Naming Conventions

| Type              | Convention             | Example                              |
| ----------------- | ---------------------- | ------------------------------------ |
| Functions         | camelCase              | `saveCharacter()`, `validateSheet()` |
| Constants         | SCREAMING_SNAKE_CASE   | `MAX_HEALTH`, `LOCAL_STORAGE_KEY`    |
| Objects/Variables | camelCase              | `characterData`, `formState`         |
| Files             | lowercase or camelCase | `main.js`, `utils.js`                |
| CSS classes       | kebab-case             | `character-card`, `builder-tab`      |

## Code Patterns

- Use `const` by default, `let` when reassignment is needed
- No `var` keyword
- Prefer `async/await` over `.then()` chains
- Always use `try/catch` for async operations
- Comment non-obvious game rules and business logic
- Keep functions focused — split if >150 lines

---

# Testing Strategy

When tests are added, focus on:

1. **Character validation** — stats stay within bounds
2. **Game rules** — Matrix RPG rules are enforced
3. **Data persistence** — JSON serialization/restore works
4. **localStorage safety** — corruption handling, quota limits
5. **User interactions** — navigation, form submission

Test character sheet validation extensively since invalid data breaks
the game mechanic simulation.

---

# Known Limitations & Tech Debt

- **No backend**: All data is client-side only
- **No cloud sync**: Character sheets don't sync across devices
- **No authentication**: No login system, device-scoped only
- **No real-time collaboration**: One user per device
- **localStorage quota**: Mobile browsers have storage limits (~5-10MB)
  - Current design stores minimal data, but large equipment lists could
    eventually exceed quota

---

# Debugging Tips

**Character not saving:**

- Check browser console for localStorage errors
- Verify JSON.stringify/parse is not failing on special characters
- Check if private browsing mode is blocking storage

**View not rendering:**

- Verify view name matches `VIEWS` constants
- Check that render() function is called after view change
- Inspect DOM to see if content is in page but hidden

**Form input not updating character:**

- Verify input change event listener is attached
- Check that data is being assigned to characterData object
- Ensure saveCharacter() is called after update

### Explicit return types on all functions

```typescript
// avoid — return type inferred
async function getUser(id: string) {
  return prisma.userData.findUnique({ where: { id } });
}

// correct
async function getUser(id: string): Promise<UserData | null> {
  return prisma.userData.findUnique({ where: { id } });
}
```

### Generics over duplication

```typescript
// avoid — repeated shape for each asset type
function getAsanaById(id: string): Promise<Asana | null> { ... }
function getFlowById(id: string): Promise<Flow | null> { ... }

// correct — shared generic utility where appropriate
function getById<T>(model: PrismaModel, id: string): Promise<T | null> { ... }
```

## React & Component Patterns

- **One component per file** — no multi-component files
- **Props interface always defined** above the component, not inline
- **Default exports** for all React components
- **Never use barrel index files** — import directly from the source file
- **Destructure props** at the function signature level

```typescript
// correct
function AsanaCard({ id, name, onSelect }: AsanaCardProps) { ... }

// avoid
function AsanaCard(props: AsanaCardProps) {
  const { id, name, onSelect } = props
}
```

## What to Avoid

- No `var` — use `const` by default, `let` when reassignment is needed
- No implicit `any` through untyped function parameters
- No barrel re-exports (`index.ts` files that re-export other modules)
- No commented-out code committed to the repository
- No magic numbers — extract to named constants
- No new constants files — consolidate into existing ones in `app/utils/`

---

# Error Handling & Validation

> Security rules around error responses (never leak personal data,
> always require auth) are defined in the Data Privacy section.
> This section covers the mechanics of how errors are structured,
> caught, and communicated.

## Core Principles

1. **Never let errors fail silently** — always handle or rethrow
2. **Never leak internals** — Prisma errors, stack traces, and user
   data must never appear in API responses
3. **Validate at the boundary** — all external input (API requests,
   form data, query params) must be validated before use
4. **Fail fast** — validate input before any database or business logic

## Logging

- **Never use `console.log`, `console.error`, or `console.warn`**
  directly in application code
- The project uses a centralized logging utility located at
  `app/utils/logger.ts`. Always import and use it:

```typescript
import { logger } from "@/app/utils/logger";

logger.error("[getAsanaById] Failed to fetch asana", error);
logger.warn("[AsanaCard] Missing optional field", { id });
logger.info("[POST /api/asana] Asana created", { id: result.id });
```

- Log with route or function context as the first argument so logs
  are traceable without a stack trace
- ⚠️ **Tech debt**: Inconsistent logging exists throughout the codebase.
  Do not add new `console.*` calls — use the logger utility in all new
  and modified code

## API Route Error Handling

All API routes must follow this structure:

```typescript
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();
    const parsed = MySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 },
      );
    }

    // business logic here using parsed.data

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    logger.error("[POST /api/my-route]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### HTTP Status Code Standards

| Situation                        | Status Code |
| -------------------------------- | ----------- |
| Success                          | `200`       |
| Created                          | `201`       |
| No content (DELETE)              | `204`       |
| Bad request / validation failure | `400`       |
| Unauthenticated                  | `401`       |
| Authenticated but forbidden      | `403`       |
| Not found                        | `404`       |
| Server error                     | `500`       |

### Error Response Shape

```typescript
// always return this shape for errors
{
  error: string;
}

// never return raw error objects
{
  error: error.message;
}
{
  error: prismaError;
}
```

## Input Validation with Zod

Prefer Zod for all input validation in new code. Use it at the API
boundary before any business logic runs.

```typescript
import { z } from 'zod'

const CreateAsanaSchema = z.object({
  name: z.string().min(1).max(100),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  description: z.string().optional(),
})

// Export schema alongside inferred type for reuse
export const CreateAsanaSchema = z.object({ ... })
export type CreateAsanaInput = z.infer<typeof CreateAsanaSchema>
```

### Zod Rules

- Use `safeParse` in API routes — never `parse()` which throws uncontrolled
- Use `parse()` only in scripts or test setup where throwing is acceptable
- Colocate schemas with the feature they validate

## Async Error Handling

- Always use `async/await` — never mix `.then()/.catch()` chains
- Always wrap `await` calls in `try/catch` — never assume they succeed
- Always use `unknown` for caught errors and narrow before use

```typescript
// correct
catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  logger.error('[getAsanaById]', message)
}
```

- No empty catch blocks — every catch must log or rethrow

## Prisma Error Handling

```typescript
// correct
async function getAsanaById(id: string): Promise<Asana | null> {
  try {
    return await prisma.asana.findUnique({ where: { id } });
  } catch (error) {
    logger.error("[getAsanaById]", error);
    throw new Error("Failed to fetch asana");
  }
}

// At the call site — always handle null
const asana = await getAsanaById(id);
if (!asana) {
  return NextResponse.json({ error: "Asana not found" }, { status: 404 });
}
```

## React Error Boundaries

Error boundaries prevent a single component failure from crashing the
entire page. Wrap all feature modules and async UI regions with one.

**Where to place Error Boundaries:**

- Feature module root — wrap each `app/[feature]/` entry point
- Async data regions — wrap components that fetch and render data
- Third-party integrations — wrap map, calendar, and chart components

```typescript
// app/components/FeatureErrorBoundary.tsx
'use client'

import { Component, ReactNode } from 'react'
import { Alert, Button } from '@mui/material'

interface Props {
  children: ReactNode
  fallbackMessage?: string
}

interface State { hasError: boolean }

export default class FeatureErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error): void {
    logger.error('[FeatureErrorBoundary]', error)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Alert
          severity="error"
          action={
            <Button onClick={() => this.setState({ hasError: false })}>
              Retry
            </Button>
          }
        >
          {this.props.fallbackMessage ?? 'Something went wrong. Please try again.'}
        </Alert>
      )
    }
    return this.props.children
  }
}
```

## Client-Side Error Handling

```typescript
// client-side async error pattern with manual state
const [error, setError] = useState<string | null>(null)
const [isLoading, setIsLoading] = useState(false)

async function handleSubmit(): Promise<void> {
  setIsLoading(true)
  setError(null)
  try {
    await saveAsana(formData)
  } catch {
    setError('Failed to save asana. Please try again.')
  } finally {
    setIsLoading(false)
  }
}

{error && <Alert severity="error">{error}</Alert>}
```

## Form Validation

Forms use manual `useState` — no form library is in use.

- Validate on submit — do not block typing with aggressive inline validation
- Show field-level errors after the user has left a field (on blur)
- Track errors in a typed error state object

```typescript
interface AsanaFormErrors {
  name?: string;
  difficulty?: string;
}
const [errors, setErrors] = useState<AsanaFormErrors>({});
```

- Always validate on the server — client validation is UX only, not security

## What to Avoid

- No `console.log`, `console.error`, or `console.warn` — use the logger
- No swallowed errors — every `catch` must log or rethrow
- No `any` typed error catches — always use `unknown`
- No raw Prisma errors or stack traces in API responses
- No `parse()` in API route handlers — always `safeParse()`
- No unhandled promise rejections — every `await` needs a `try/catch`

---

# Testing

> The project uses Jest for unit and integration tests, and
> Playwright for end-to-end tests. Both are required — they cover
> different failure modes and are not interchangeable.

## Core Philosophy

- **Test behavior, not implementation** — test what a component does,
  not how it does it internally
- **Every new feature needs tests** — do not commit features without
  corresponding test coverage
- **Tests are first-class code** — apply the same TypeScript and style
  standards to test files as to source files
- **No skipped tests without a reason** — `test.skip` and `xit` must
  have a comment explaining why and a linked issue

## Test Types & When to Use Each

| Type          | Tool                   | Use for                                           |
| ------------- | ---------------------- | ------------------------------------------------- |
| Unit          | Jest                   | Pure functions, utilities, hooks, isolated logic  |
| Component     | Jest + Testing Library | React component rendering and interaction         |
| Integration   | Jest                   | API routes, database operations, multi-unit flows |
| Accessibility | Jest + jest-axe        | WCAG compliance on all UI components              |
| End-to-end    | Playwright             | Critical user journeys through the full app       |

## File Organization

- Mirror source structure under `__test__/` directories
- Test files named to match source: `AsanaCard.test.tsx`
- E2E test files live in `e2e/` at the project root
- E2E files named by user journey: `asana-creation.spec.ts`

## Running Tests

```bash
npm run test                # Full Jest suite
npm run test:coverage       # Jest with coverage report
npm run test:bail           # Stop on first failure
npm run test:minimal        # Silent run, no coverage
npm run e2e                 # Playwright headless
npm run e2e:ui              # Playwright with UI mode
npm run e2e:report          # View last Playwright report
```

## Jest: Unit & Component Tests

### Required Mocks

Always mock these core dependencies at the top of every test file:

```typescript
jest.mock("next/navigation");
jest.mock("next-auth/react");
jest.mock("@/app/context/UserContext");
jest.mock("@/app/context/AsanaSeriesContext");
jest.mock("@/app/context/AsanaPostureContext");

jest.mock("@/prisma/generated/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    asana: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));
```

### Mock Lifecycle

```typescript
describe("AsanaCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
});
```

### Component Test Setup

```typescript
import { ThemeProvider } from '@mui/material'
import { theme } from '@/app/styles/theme'

// Always wrap MUI components in ThemeProvider
function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}
```

### Element Selection Priority

```typescript
// 1. Accessible role — preferred
screen.getByRole("button", { name: "Save Asana" });

// 2. Label text — for form inputs
screen.getByLabelText("Asana Name");

// 3. data-testid — for elements with no semantic role
screen.getByTestId("asana-card-123");

// 4. Avoid — class names or DOM structure
container.querySelector(".asana-card");
```

### Test Naming Convention

```typescript
// Pattern: should [expected behavior] when [condition]
it("should display asana name when card renders");
it("should call onSelect with asana id when card is clicked");
it("should show error alert when save fails");
it("should disable submit button while request is loading");
```

### API Route Tests

Every user-scoped API route must include:

```typescript
describe("POST /api/asana", () => {
  it("should return 401 when request is unauthenticated");
  it("should return 403 when user accesses another users data");
  it("should return 400 when request body fails validation");
  it("should return 201 when asana is created successfully");
});
```

### Accessibility Tests

Every component test file must include an axe check:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

it('should have no accessibility violations', async () => {
  const { container } = renderWithTheme(<AsanaCard {...mockProps} />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Data Asset Test Strategy

```typescript
// Test each asset type independently
describe("Asana CRUD");
describe("Flow CRUD");
describe("Sequence CRUD");

// Test the build sequence
it("should create asana, add to flow, add flow to sequence");

// Test cascading deletion display
it("should show strikethrough when referenced asana is deleted");
it("should show strikethrough when referenced flow is deleted");

// Test reusability
it("should allow the same asana to be added to multiple flows");
it("should allow the same flow to be added to multiple sequences");
```

## Playwright: End-to-End Tests

### What E2E Tests Cover

Critical user journeys only — not every feature:

1. Authentication (sign in, sign out, session expiry)
2. Core data asset creation (asana → flow → sequence)
3. Account management (data export, account deletion)
4. Payment or subscription flows (if applicable)
5. PWA-specific behavior (offline, install prompt)

### File & Test Structure

```typescript
// e2e/asana-creation.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Asana Creation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/api/auth/signin");
    // use a dedicated E2E test account — never production credentials
  });

  test("should create a new asana and display it in the library", async ({
    page,
  }) => {
    await page.goto("/asanaPoses/create");
    await page.getByLabel("Asana Name").fill("Warrior I");
    await page.getByRole("button", { name: "Save Asana" }).click();
    await expect(page.getByText("Warrior I")).toBeVisible();
  });
});
```

### E2E Rules

- Use a dedicated E2E test database — provision with `npm run db:create-e2e`
- Use a dedicated test account — store credentials in `.env`
- Each test must be independent — no shared state between tests
- Clean up created data in `afterEach`

### Playwright Selector Priority

```typescript
page.getByRole("button", { name: "Save Asana" }); // 1. preferred
page.getByLabel("Asana Name"); // 2. form inputs
page.getByText("Warrior I"); // 3. visible text
page.getByTestId("asana-card"); // 4. last resort
page.locator(".asana-card button"); // avoid
```

## Coverage Expectations

- All new utility functions: **100% coverage**
- All new API routes: **auth, validation, success, and error cases**
- All new components: **render, interaction, and accessibility**
- E2E coverage for all **critical user journeys**

## What to Avoid

- No `test.only` or `it.only` committed to the repository
- No `test.skip` without a comment and a linked issue
- No testing implementation details — test behavior and output
- No direct database calls in component tests — mock Prisma
- No production credentials or real user data in any test file
- No E2E tests that depend on each other's execution order

---

# Code Review Standards

> This is a solo project. All reviews are self-reviews.
> Copilot acts as a second set of eyes — these standards define
> what it should flag proactively.

## The Definition of Done

- [ ] Implements the feature or fix correctly
- [ ] Has TypeScript types — no `any`, explicit return types
- [ ] Has unit or component tests covering behavior
- [ ] Has accessibility check passing (`jest-axe`)
- [ ] Passes `npm run lint` with no errors
- [ ] Uses the logger utility — no `console.*` calls
- [ ] Has no hardcoded secrets, role strings, or magic numbers
- [ ] Follows naming conventions from the Code Style section
- [ ] Includes TypeDoc comments on all exported functions and types

## Reject — Must Fix Before Committing

- `any` type without a justifying comment
- Missing `try/catch` around `await` calls
- `console.log`, `console.error`, or `console.warn` — use logger
- Hardcoded role strings (`"admin"`, `"premium_teacher"`)
- Raw Prisma errors or user data in API responses
- API route missing authentication check (`auth()`)
- New user-linked data model missing from `delete-account` transaction
- New user-linked data model missing from `download-data` endpoint
- `parse()` used instead of `safeParse()` in an API route
- Secrets or credentials in source code
- `test.only` or `test.skip` without explanation
- Barrel export (`index.ts`) files introduced

## Flag — Should Fix, Can Discuss

- Missing explicit return type on a function
- `useEffect` with a missing or incomplete dependency array
- Component longer than ~200 lines — consider splitting
- Zod validation missing on a new API route input
- New feature with no tests
- `Date` used instead of `Luxon` for formatting or manipulation
- User-generated content rendered without DOMPurify sanitization
- New constants file created instead of adding to an existing one
- Direct Prisma import in a component (should go through a service)

## Approve — Good Patterns to Reinforce

- Zod schema exported alongside its inferred type
- `FeatureErrorBoundary` wrapping a new feature module
- `data-testid` attributes on interactive elements
- Shared role constants used correctly
- Generic utility written instead of duplicating logic
- Accessibility check included in component test

## AI-Generated Code Review Checklist

- [ ] Types are real — not hallucinated interface names
- [ ] Imported modules actually exist in `package.json`
- [ ] Prisma queries match the actual schema field names
- [ ] No new `console.*` calls introduced
- [ ] Auth check is not missing from generated API routes
- [ ] Generated tests actually assert behavior, not just render
- [ ] No new barrel exports introduced
- [ ] No new constants files introduced

## Patterns That Signal a Deeper Problem

- A component importing from another feature's internals
  → signals a missing shared abstraction
- Props passed through multiple component levels
  → signals a context or composition problem
- Repeated try/catch blocks with identical handling
  → signals a missing shared error utility
- Multiple files checking the same role string
  → signals role constants are not being used

---

# Documentation

> This project uses TypeDoc for API documentation generation.
> `typedoc.web.json` → HTML docs (`npm run docs`)
> `typedoc.json` → Markdown docs (`npm run docs:md`)
>
> Documentation is not optional. Undocumented exports are incomplete code.

## What Must Be Documented

Always document with TypeDoc JSDoc comments:

- All exported functions and methods
- All exported interfaces and types
- All React component props interfaces
- All context providers and their value shapes
- All API route handlers (purpose, auth requirement, request/response shape)
- All Zod schemas that are exported for reuse

Never document:

- Internal implementation details clear from the code
- One-line utility functions where the name is self-documenting
- Test files
- Generated files (`./prisma/generated/`)

## TypeDoc Comment Format

```typescript
/**
 * Brief one-line description of what this does.
 *
 * Longer explanation if the behavior is non-obvious or requires
 * domain knowledge (yoga terminology, business rules).
 *
 * @param id - The unique identifier of the asana to retrieve
 * @param userId - The authenticated user's ID for ownership validation
 * @returns The matching Asana record, or null if not found
 * @throws {Error} If the database query fails
 *
 * @example
 * const asana = await getAsanaById('abc123', session.user.id)
 * if (!asana) return notFound()
 */
async function getAsanaById(
  id: string,
  userId: string
): Promise<Asana | null> { ... }
```

## Component Documentation

```typescript
/**
 * Displays a single yoga asana as a selectable card.
 * Renders a strikethrough style when the asana has been deleted
 * from the system but still referenced by a flow.
 */
interface AsanaCardProps {
  /** Unique identifier for the asana */
  id: string;
  /** Sanskrit or common name of the pose */
  name: string;
  /** Visual difficulty indicator shown as a badge */
  difficulty: DifficultyLevel;
  /** When true, renders name with strikethrough to indicate deletion */
  isDeleted?: boolean;
  /** Called with the asana id when the card is clicked */
  onSelect: (id: string) => void;
}
```

## API Route Documentation

```typescript
/**
 * Creates a new asana for the authenticated user.
 *
 * @auth Required — returns 401 if session is missing
 * @method POST
 * @route /api/asana
 *
 * @returns {201} The newly created Asana record
 * @returns {400} If request body fails Zod validation
 * @returns {401} If the request is unauthenticated
 * @returns {500} If the database operation fails
 */
export async function POST(request: Request): Promise<NextResponse> { ... }
```

## Inline Comments

Use inline comments for **why**, not **what**.

```typescript
// Prisma requires explicit null for optional MongoDB fields;
// undefined will be ignored on update operations
await prisma.asana.update({
  where: { id },
  data: { thumbnailUrl: newUrl ?? null },
});
```

When inline comments are required:

- Non-obvious TypeScript workarounds
- Business rule enforcement not captured by types
- Known tech debt

```typescript
// TECH DEBT: NextAuth 5 beta — session shape may change on upgrade
const userId = session?.user?.id as string;
```

## Changelog Documentation

Update `CHANGELOG.md` in the same commit as the code change.
Write entries from the user's perspective:

```markdown
## [Unreleased]

### ADD

- Filter asanas by difficulty level on the library page

### FIX

- Sequence builder crash when flow contains no asanas
```

## What to Avoid

- No documentation that just repeats the function signature
- No `TODO` comments without a description of what needs doing
- No commented-out code — delete it, version control has the history
- No changelog entries that describe code instead of user impact

---

# Performance

> **Measure before optimizing.** Do not add complexity without
> evidence of a problem.

## Default Behaviors — Always Apply

### Images

```typescript
// correct — always use Next.js Image
import Image from 'next/image'
<Image src={asana.thumbnailUrl} alt={asana.name} width={300} height={200} />

// avoid
<img src={asana.thumbnailUrl} alt={asana.name} />
```

- Always provide `width` and `height` to prevent layout shift
- Use `priority` only for above-the-fold images
- Store images via `@vercel/blob` — never commit binary assets

### Data Fetching

```typescript
// correct — select only needed fields
await prisma.asana.findMany({
  where: { userId },
  select: { id: true, name: true, difficulty: true },
});
```

- Always paginate list queries — never fetch unbounded collections
- Add `orderBy` to all list queries

### Bundle Awareness

```typescript
// correct — named import
import { DateTime } from "luxon";

// avoid — full library import
import * as luxon from "luxon";
```

## React Rendering Optimization

Apply these only when a component is measurably slow.

- Use `React.memo` when confirmed slow via React DevTools profiler
- Use `useMemo` for expensive computations with stable inputs
- Use `useCallback` when passing functions to memoized children
- Memoize context value objects to prevent unnecessary re-renders

```typescript
const contextValue = useMemo(
  () => ({
    asanas,
    selectedAsana,
    setSelectedAsana,
  }),
  [asanas, selectedAsana],
);
```

## Next.js Performance Patterns

```typescript
// Dynamic imports for heavy or conditionally rendered components
import dynamic from 'next/dynamic'

const AsanaSequencePlayer = dynamic(
  () => import('@/app/clientComponents/AsanaSequencePlayer'),
  { loading: () => <CircularProgress />, ssr: false }
)
```

- Use MUI `Skeleton` for content loading in list and card layouts
- Use `CircularProgress` for action loading (form submit, button click)

## PWA & Mobile Performance

- Touch targets: minimum 44x44px — MUI meets this by default
- Always reserve space for images and async content to avoid layout shift
- Notify users when offline rather than silently failing network requests

## Database Query Performance

```typescript
// correct — single query with include
await prisma.asanaSeries.findMany({
  where: { userId },
  include: { asanas: true },
});

// avoid — N+1 queries
const flows = await prisma.asanaSeries.findMany({ where: { userId } });
for (const flow of flows) {
  flow.asanas = await prisma.asana.findMany({ where: { flowId: flow.id } });
}
```

- Always add `take` and `skip` to list queries
- Verify frequently queried fields are indexed in the Prisma schema

## What to Avoid

- No raw `<img>` tags — always use Next.js `<Image>`
- No unbounded list queries — always paginate
- No `import *` from large libraries
- No premature memoization — measure first
- No binary assets committed to the repository

---

# Security

> Data privacy rules and GDPR/CCPA compliance are defined in the
> Data Privacy section. This section covers code-level security mechanics.

## Core Principles

1. **Never trust external input** — validate and sanitize everything
2. **Least privilege** — only expose and return what is needed
3. **Defense in depth** — server-side checks are the real security layer
4. **Secrets never touch source code**

## Authentication & Authorization

```typescript
// correct — auth then ownership
const session = await auth();
if (!session) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

const asana = await getAsanaById(id);
if (!asana) {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
if (asana.userId !== session.user.id) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

- Return `404` instead of `403` when a resource belongs to another user
  — avoids confirming the resource exists to an unauthorized caller

## XSS Prevention with DOMPurify

```typescript
import DOMPurify from 'isomorphic-dompurify'

// correct — sanitize before rendering user content as HTML
const sanitizedDescription = DOMPurify.sanitize(asana.description)
<div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />

// never — unsanitized user content
<div dangerouslySetInnerHTML={{ __html: asana.description }} />
```

- Always use `isomorphic-dompurify` — works in both server and client contexts
- Sanitize at render time, not write time
- Never use `dangerouslySetInnerHTML` without DOMPurify — no exceptions

## Environment Variables & Secrets

- All secrets live in `.env` files — never in source code
- Validate required env vars at startup

```typescript
const requiredEnvVars = [
  "DATABASE_URL",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
] as const;
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
```

- Prefix client-side vars with `NEXT_PUBLIC_`
- Never log environment variable values

## Input Sanitization

| Concern                   | Tool       | Purpose                          |
| ------------------------- | ---------- | -------------------------------- |
| Shape & type validation   | Zod        | Reject malformed input           |
| HTML content sanitization | DOMPurify  | Strip malicious HTML/scripts     |
| NoSQL injection           | Prisma ORM | Parameterized queries by default |

Never construct raw MongoDB queries from user input.

## JWT & Token Handling

- Never decode or validate JWTs manually — use NextAuth exclusively
- Never store sensitive data in JWT payloads
- Auth decisions always go through server-side `auth()` call

## Client-Side Storage Security

**Sensitive data lives on the server, not in the browser.**

| Storage            | Use for                                        | Never store             |
| ------------------ | ---------------------------------------------- | ----------------------- |
| `localStorage`     | Non-sensitive UI preferences (theme, language) | Any sensitive data      |
| `sessionStorage`   | Non-sensitive temporary UI state               | Any sensitive data      |
| Cookies (HttpOnly) | Session — handled by NextAuth                  | Do not set manually     |
| IndexedDB          | Non-sensitive cached app data                  | User data, tokens       |
| PWA Cache          | Static assets, public API responses            | Authenticated responses |

```typescript
// correct — NextAuth manages sessions automatically
const session = await auth();

// never — manual session storage
localStorage.setItem("session", JSON.stringify(session));
```

PWA offline caching rules:

- Cache static assets and non-sensitive API responses freely
- Never cache authenticated responses containing personal user data
- Clear user-specific cached data on sign out

## Dependency Security

```bash
npm audit          # Run before adding dependencies and before releases
npm audit fix      # Fix automatically where safe
```

## HTTP Security Headers

```typescript
// next.config.js
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];
```

## Role-Based Access Control

```typescript
// correct — server-side, using constants
import { ROLE } from '@/app/utils/roles'
if (session.user.role !== ROLE.PREMIUM_TEACHER) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

// avoid — hardcoded string, client-side only
if (user.role === 'premium_teacher') { ... }
```

## What to Avoid

- No `dangerouslySetInnerHTML` without DOMPurify
- No hardcoded secrets anywhere in source
- No manual JWT validation
- No raw MongoDB queries from user input
- No client-side-only auth or role checks for security decisions
- No sensitive data in `localStorage`, `sessionStorage`, or IndexedDB
- No authenticated API responses cached in the PWA service worker
- No `.env` files committed to the repository

---

# Dependency Management

> Preferred libraries are defined in the Tech Stack section.
> Every dependency is a long-term maintenance commitment.

## Before Adding a New Dependency

1. **Is it already covered?** Check the Tech Stack section first
2. **Is it necessary?** Can it be done in ~30 lines of native code?
3. **Is it maintained?** No commits in the past year is a red flag
4. **Is it healthy?** Run `npm audit` after adding
5. **Is it sized appropriately?** Check bundle impact at bundlephobia.com

```bash
npx bundlephobia <package-name>   # Check bundle impact
npm audit                          # Check for vulnerabilities
```

## Categorizing Dependencies Correctly

```bash
npm install <package>              # Runtime — ships to production
npm install --save-dev <package>   # Dev only — never ships to production
```

Dev-only: Jest, Playwright, TypeDoc, ESLint, Prettier, TypeScript, `ts-jest`

## Preferred Libraries — Use Before Adding Alternatives

| Need                 | Use                                 |
| -------------------- | ----------------------------------- |
| Schema validation    | Zod                                 |
| Date / time          | Luxon                               |
| UI components        | MUI                                 |
| Data visualization   | Recharts                            |
| XSS sanitization     | isomorphic-dompurify                |
| Calendar UI          | react-big-calendar                  |
| File / image storage | `@vercel/blob`                      |
| Email                | Resend or Nodemailer (both present) |
| QR codes             | qrcode.react                        |

Do not add an alternative without first removing the existing package.

## Keeping Dependencies Updated

```bash
npm outdated               # See what is out of date
npm install <pkg>@latest   # Update one package at a time
npm run test               # Run full suite after every update
npm run e2e
```

Update monthly at minimum. Apply security patches promptly.

## What to Avoid

- No duplicate solutions — one library per problem
- No packages without TypeScript support
- No GPL or copyleft licenses — this is a private commercial project
- No new dependencies without running `npm audit` first
- No dev tools installed as runtime `dependencies`
- No packages added just because an AI tool suggested them —
  verify the package exists and is appropriate before installing

---

# Git & Version Control

## Commit Messages

Format: `KEYWORD: short description in present tense`

```bash
# correct
ADD: difficulty filter to asana library view
FIX: sequence builder crash when flow has no asanas
UPDATE: Prisma schema to add thumbnailUrl to AsanaSeries
REMOVE: legacy mongoDb.ts raw driver from app code
AUDIT: remove unused MUI imports from AsanaCard
SECURITY: sanitize asana description before HTML render
DEPRECATE: credentials provider pending NextAuth replacement

# avoid
fixed bug / updated stuff / WIP / checkpoint
```

Rules:

- Present tense — `ADD:` not `ADDED:`
- Under 72 characters
- Describe user or codebase impact — not implementation details
- One logical change per commit
- Update `CHANGELOG.md` in the same commit as the code change

## Branch Strategy

```
main              <- production-ready code only
feature/          <- new features
fix/              <- bug fixes
audit/            <- code cleanup and refactoring
security/         <- security patches
```

Branch naming matches changelog keyword:

```bash
feature/asana-difficulty-filter
fix/sequence-builder-crash
audit/remove-unused-mui-imports
security/sanitize-asana-descriptions
```

Rules:

- `main` is always deployable — never commit broken code directly
- Keep branches short-lived — merge or close within a week
- Delete branches after merging
- One feature or fix per branch

## GitHub Actions CI Pipeline

The project runs tests in CI via GitHub Actions.
Runner path: `/home/runner/work/uvuyoga/uvuyoga/`

**CI must pass before merging to main:**

- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run e2e`
- [ ] `npm run build`

Environment variables must come from GitHub Actions secrets:

```yaml
env:
  DATABASE_URL: ${{ secrets.E2E_DATABASE_URL }}
  NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
  NEXTAUTH_URL: ${{ secrets.NEXTAUTH_URL }}
```

## Release Process

```bash
npm run test          # 1. All tests pass
npm run e2e
npm audit             # 2. No vulnerabilities
# 3. Update CHANGELOG.md — move [Unreleased] to new version
npm run build         # 4. Production build succeeds
# 5. Merge to main — semantic-release handles version and tag
```

## CHANGELOG.md Format

```markdown
## [Unreleased]

### ADD

- Difficulty filter on asana library page

---

## [1.21.3] - 2024-01-15

### FIX

- Sequence builder crash when flow contains no asanas
```

- Always keep `[Unreleased]` section at the top
- Date format: `YYYY-MM-DD`
- Entries from the user's perspective

## What Never Goes in Version Control

```bash
.env / .env.local / .env.production    # Secrets
./prisma/generated/ / .next/           # Generated files
node_modules/ / coverage/              # Dependencies and reports
*.jpg / *.png / *.gif / *.pdf          # Binary assets
.DS_Store / Thumbs.db                  # OS noise
```

## What to Avoid

- No direct commits to `main`
- No WIP or untitled commits
- No secrets or credentials in any committed file
- No binary assets — use `@vercel/blob`
- No generated files committed
- No environment variable values in workflow files

---

# Accessibility: Keyboard Navigation & Focus Management

All interactive UI in Uvuyoga must be fully operable by keyboard alone
(WCAG 2.1 AA). Apply these rules whenever writing or reviewing components.

## Keyboard Navigation — DOs

- **Use native interactive elements** (`<button>`, `<a href>`, `<input>`,
  `<select>`) so keyboard behaviour is free. MUI `Button`, `IconButton`,
  `TextField`, `Select`, and `Link` already render the correct native
  element — prefer them over `Box`/`div` with `onClick`.
- **Style focus with `:focus-visible`**, not `:focus`. This shows the
  ring for keyboard users while hiding it for mouse clicks:
  ```typescript
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: '2px',
  }
  ```
- **Suppress `:focus` only when `:focus-visible` is also present.**
  Never write `outline: 0` or `outline: none` without the
  `:focus-visible` counterpart.
- **Ensure a single page landmark** — `AppNavigationShell` owns
  `role="main"` (`id="main-content"`). Do not add a second
  `role="main"` inside page components.
- **Keep the skip link visible and reachable.** The skip link must use
  `position: fixed` (not `absolute`) and `zIndex` above the header:
  ```typescript
  position: 'fixed', top: 0, zIndex: 9999,
  transform: 'translateY(-100%)',
  // on focus:
  transform: 'translateY(0)',
  ```
- **Wire `aria-controls` to a real `id`.** If a button declares
  `aria-controls="foo"`, an element with `id="foo"` must exist in the DOM.
- **Navigate lists with arrow keys** when implementing custom composite
  widgets (menus, tab panels, carousels). Wrap focus at list boundaries.
- **Close overlays with Escape.** Drawers, modals, and dropdowns must
  handle `onKeyDown` for `Escape` and return focus to the trigger element.
- **Set `aria-expanded`** on trigger buttons for toggleable regions
  (drawers, accordions, collapsibles).
- **Use `aria-busy`** to signal in-progress async operations on a button;
  use `aria-live="polite"` to announce completion.
- **Add `tabIndex={-1}` to non-interactive containers** only when you
  need to programmatically call `.focus()` on them. Do not assign
  `tabIndex={0}` to non-interactive `div`/`span` elements.
- **Provide visible text or an `aria-label` on every icon-only button.**
  The label should describe the action, not the icon name
  (e.g., `aria-label="Open main navigation"`, not `aria-label="Menu icon"`).
- **Decorative images inside links**: set `alt=""` on the `<Image>` and
  put the accessible name on the `<Link>` with `aria-label`.

## Keyboard Navigation — DON'Ts

- **Don't add `role="button"` to a native `<button>` or MUI `IconButton`**
  — the implicit role is already `button`; the duplicate adds
  screen-reader noise.
- **Don't use `aria-pressed` as a loading indicator.** Use `aria-busy`
  for loading states instead.
- **Don't override `aria-label` with a machine-readable path string.**
  A default like `"Navigate to /flows/createSeries"` exposes routing
  internals to screen readers.
- **Don't use `aria-labelledby` pointing to an `id` that doesn't exist.**
  Always verify the referenced element is in the DOM.
- **Don't nest interactive elements** (e.g., a `<button>` inside an
  `<a>`). This is invalid HTML and breaks tab order unpredictably.
- **Don't rely on `title` as the sole accessible name.** Always pair
  with `aria-label` or visible text.
- **Don't use `tabIndex > 0`.** Positive tab indices diverge from DOM
  order and are hard to maintain.
- **Don't suppress focus styles globally** (e.g., `* { outline: none }`).
  Always scope suppression via `:focus:not(:focus-visible)`.

## Focus Management — DOs

- **Move focus to the first focusable element inside a dialog/drawer on
  open.** MUI `Dialog` and `Drawer` do this automatically — don't fight
  it by setting `disableAutoFocus`.
- **Return focus to the trigger after a dialog/drawer closes.** Store a
  `ref` to the opener button and call `.focus()` in the `onClose` callback.
- **Trap focus inside modals.** MUI `Modal` includes a `FocusTrap` by
  default; leave it enabled.
- **On route change**, move focus to the page's `<h1>` or
  `id="main-content"` landmark. Use `useEffect` with a
  `ref.current.focus()` call after navigation completes.
- **Announce dynamic content changes** with `aria-live` regions. Use
  `aria-live="polite"` for non-critical updates and
  `aria-live="assertive"` only for errors requiring immediate attention.
- **Use `useRef` + `.focus()` for programmatic focus** — never manipulate
  `document.activeElement` directly.
- Ensure focus management has strong visual outline elements.

## Focus Management — DON'Ts

- **Don't move focus unexpectedly** during interactions that don't
  open/close a region.
- **Don't call `.focus()` synchronously during render.** Always wrap in
  `useEffect` or `setTimeout(fn, 0)`.
- **Don't set `disableAutoFocus` or `disableEnforceFocus` on MUI
  `Dialog`/`Drawer`** without providing an equivalent focus strategy.
- **Don't allow focus to escape a modal** to background content.
- **Don't remove focus indicators during navigation loading states.**

## ARIA Landmark Checklist

Every page must have exactly one of each required landmark,
delivered through `AppNavigationShell`:

| Landmark               | Element / Attribute                                    | Owner                         |
| ---------------------- | ------------------------------------------------------ | ----------------------------- |
| `banner`               | `<header>` / `AppBar`                                  | `Header` component            |
| `main`                 | `id="main-content"`                                    | `AppNavigationShell` `Box`    |
| `navigation` (primary) | `<nav id="main-navigation">`                           | Header drawer                 |
| `navigation` (bottom)  | `<Box component="nav" aria-label="Bottom navigation">` | `NavBottom`                   |
| `contentinfo`          | `<footer>`                                             | Footer component (if present) |

Never add a second `role="main"` inside a page component — it creates
duplicate landmark violations.

---

# Role Design Pattern

- Keep role identifiers in one shared module (a dedicated role constants
  file or shared role utility)
- Prefer `ROLE.PREMIUM_TEACHER` or `isPremiumTeacherRole(user.role)`
  over direct string comparisons
- Reuse shared helpers for canonicalization, display labels, and
  permission checks instead of re-implementing role logic in each feature
- When migrating role names, update the central constants and helpers
  first, then update call sites to consume those exports rather than
  introducing temporary inline strings
- Apply the same pattern in tests: import the shared role constant when
  asserting role-specific behavior

---

# Yoga-Specific Domain Knowledge

## Core Concepts

- **Asana**: Individual yoga poses/postures
- **Vinyasa**: Flow sequences connecting poses
- **Pranayama**: Breathing techniques and exercises
- **Dhyana**: Meditation practices
- **Mantra**: Sacred sounds and chanting
- **Sequence**: Ordered series of asanas for practice
- **Series**: Thematic groupings of related asanas

## Application Features

- **Asana management**: `app/asanaPoses/`
- **Series creation**: Group related asanas into series
- **Sequence building**: Create ordered practice sequences
- **Practice tracking**: Monitor yoga session progress
- **Breathing exercises**: Pranayama features in `app/breathwork/`
- **Meditation**: Guided meditation in `app/meditation/`
- **Mantras**: Mantra practice in `app/mantra/`

## User Experience Patterns

- **Practice planning**: Users create and save custom sequences
- **Progress tracking**: Monitor improvement over time
- **Personalization**: Adapt to user skill level and preferences
- **Guided practice**: Step-by-step instruction through sequences
- **Community features**: Sharing and discovering practices

Use proper Sanskrit terms and translations. Maintain consistent
spelling in all UI copy, documentation, and code comments.

---

# Data Privacy & GDPR/CCPA Compliance

The application processes personal data (email, name, yoga preferences,
practice history, profile images) and must comply with GDPR and CCPA.
A **privacy-by-design** approach is enforced: data is protected by
default, access requires authentication, and users retain control.

## Existing Privacy Infrastructure

- **Data export** (GDPR Art. 15 & 20): `GET /api/user/download-data`
  — authenticated JSON export of all user data
- **Account deletion** (GDPR Art. 17 / CCPA):
  `DELETE /api/user/delete-account` — atomic cascading deletion
- **Privacy mode**: `UserData.privacyMode` defaults to `"private"`;
  public profiles gated by role via `canSetPublicAccountPrivacy()`
- **Privacy settings API**: `GET/PATCH /api/users/me/privacy`
  — requires `requireAuth()`
- **TOS tracking**: `UserTosAcceptance` model with append-only audit trail
- **Privacy policy**: `/profile/privacy-policy`
- **User data access control**: `GET /api/user` requires auth and
  enforces email-match ownership

## Privacy Rules for New Code

1. **Auth required**: Every API endpoint that reads or writes personal
   data must call `auth()` and validate the session
2. **Ownership enforcement**: Users may only access their own data.
   Cross-user access requires an explicit sharing mechanism with
   `privacyMode` checks
3. **Data minimization**: Only collect and return fields necessary for
   the feature
4. **Error message safety**: Never leak personal data (emails, IDs,
   Prisma errors) in error responses. Use generic messages like
   `"Failed to fetch user data"`
5. **Deletion cascade**: When introducing new user-linked data models,
   add them to `app/api/user/delete-account/route.ts`
6. **Export coverage**: When introducing new user-linked data models,
   add them to `app/api/user/download-data/route.ts`
7. **Purpose limitation**: Data collected for one purpose must not be
   repurposed without additional consent

## Privacy Testing Requirements

- Every user-scoped API route test suite must include unauthenticated
  and cross-user access denial assertions
- `delete-account` tests must verify all data types are removed
- `download-data` tests must verify all user-linked data is included
- Profile endpoints must be tested with both `"public"` and `"private"`
  privacy modes

---

# Development Patterns — Quick Reference

These rules are project-specific and apply to all new code:

1. **Route organization**: Feature routes at `app/[feature]/`
2. **Context consumers**: Always provide fallback implementations
3. **Database operations**: Use Prisma client with proper error handling
4. **Authentication**: Check session state before accessing user features
5. **Data privacy**: Every personal data endpoint requires auth. See
   the Data Privacy section.
6. **Navigation**: Use path aliases and centralized navigation constants
   from `app/utils/navigation/`
7. **Feature flags**: Use FEATURES object for development toggles
8. **Component props**: Use TypeScript interfaces for prop validation
9. **Role checks**: Never compare roles with hardcoded strings. Use
   exported constants from the shared role module.
10. **Role source of truth**: If a role constant does not exist yet, add
    it to the shared role module before using the role in new code.
11. **Yoga terminology**: Use proper Sanskrit terms and translations
12. **Mobile responsiveness**: Design mobile-first with touch-friendly
    interfaces (minimum 44x44px touch targets)
13. **Deletion cascade**: When adding a new user-linked data model,
    update `app/api/user/delete-account/route.ts`
14. **Export coverage**: When adding a new user-linked data model,
    update `app/api/user/download-data/route.ts`

---

# Development Workflows & Scripts

## Daily Development

```bash
npm run dev                    # Development server (port 3000)
npm run dev:concurrent         # Run MongoDB + Next.js concurrently
npm run mongo                  # Start MongoDB server (Windows)
npm run lint                   # Check for ESLint errors
npm run lint-fix               # Auto-fix ESLint issues
```

Note: Do not run `npm run pretty:fix` manually. VS Code handles
formatting automatically on save.

## Testing

```bash
npm run test                   # Full Jest suite
npm run test:coverage          # Jest with coverage report
npm run test:bail              # Stop on first failure
npm run test:minimal           # Silent, no coverage
npm run e2e                    # Playwright headless
npm run e2e:ui                 # Playwright UI mode
npm run e2e:report             # View last Playwright report
```

## Database

```bash
npm run prisma:generate        # Regenerate Prisma client
npm run prisma:push            # Push schema to database
npm run db:create-e2e          # Provision E2E test database
npm run db:sync                # Sync from production (dev only)
npm run db:backup-prod         # Backup production database
```

## Documentation & Build

```bash
npm run docs                   # Generate HTML TypeDoc docs
npm run docs:md                # Generate Markdown TypeDoc docs
npm run build                  # Production build
npm run start                  # Start production server
```

## Environment Requirements

- **MongoDB**: Local MongoDB server or connection string
- **NextAuth**: GitHub and Google OAuth credentials
- `DATABASE_URL` — Prisma MongoDB connection string
- `NEXTAUTH_SECRET` — NextAuth signing secret
- `NEXTAUTH_URL` — Application base URL

---

# Common Gotchas

- **Provider order**: Yoga contexts depend on user session and theme —
  never change the order in `providers/Providers.tsx`
- **Prisma generation**: Always run `prisma generate` after schema
  changes — stale generated types cause cryptic TypeScript errors
- **NextAuth beta**: NextAuth 5 is a beta release. Do not extend its
  internals — wrap auth logic in local utilities
- **Mobile layout**: Test navigation and forms on mobile screen sizes
  before committing
- **Feature flags**: Use the FEATURES object — never use inline booleans
  for feature gating
- **Sanskrit terminology**: Use consistent spelling in all UI copy and
  code comments — refer to the Yoga Domain Knowledge section
- **Deletion cascade**: New user-linked models must be added to both
  `delete-account` and `download-data` routes or GDPR compliance breaks
- **Constants proliferation**: Do not create new constants files —
  the codebase already has too many from AI generation. Consolidate.
- **Logger**: Do not use `console.*` — use the logger utility.
  Inconsistent logging is existing tech debt, not a pattern to follow.
