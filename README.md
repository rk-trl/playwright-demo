# Playwright Demo - Story-Based E2E Testing

This project contains:

- A React + Vite app with 5 routes (`/`, `/about`, `/services`, `/contact`, `/dashboard`)
- Playwright tests organized by user story folders
- Timestamped test result output (report, screenshots, artifacts)
- A generator script that creates a `spec.ts` from a scenario `description.md`

The design goal is to let you keep adding new test use cases dynamically.  
As long as a `*.spec.ts` exists under `tests/stories`, Playwright will discover and run it automatically.

## Project Structure

```text
app/                                   # React app
tests/
  helpers/                             # shared utilities
  pages/                               # page objects
  stories/                             # one folder per story/scenario
    US001-home-navigation/
      description.md
      navigation.spec.ts
    US002-route-traversal/
      description.md
      traversal.spec.ts
    ...
scripts/
  generate-spec.js                     # scaffold spec from description.md
  open-latest-report.js                # open newest HTML report
playwright.config.ts
```

## Prerequisites

- Node.js 18+ (recommended: Node 20 from `.nvmrc`)

## Setup

Install dependencies:

```bash
npm install
npm --prefix app install
```

Install Playwright browser:

```bash
npm run pw:install
```

## Run Commands

Start app:

```bash
npm run start
```

Run all tests:

```bash
npm test
```

Open latest report:

```bash
npm run test:report
```

> **Important:** Always open the HTML report using `npm run test:report`. Do NOT open `report/index.html` directly via the file system (`file://`). The trace viewer ("View trace" link inside the report) uses a Service Worker, which browsers block under the `file://` protocol. The `test:report` command starts a local HTTP server via `npx playwright show-report`, so the trace viewer works correctly.

Generate a new spec skeleton from a story folder:

```bash
npm run generate-spec -- US005-dashboard-table
```

If the spec already exists and you want to regenerate it:

```bash
npm run generate-spec -- US005-dashboard-table --force
```

## Timestamp Reporting

Every test run creates a unique folder:

```text
test-results/test-result_YYYYMMDD_HHMM/
```

Inside each run:

- `report/` -> HTML report
- `screenshots/` -> manually captured step screenshots
- `artifacts/` -> Playwright artifacts (trace, retry evidence, etc.)

## Viewing the Trace

Playwright records a full **trace** (DOM snapshots, network, console, screenshots, source) for every failed test that ran with retries. The trace is the most powerful debugging tool — it lets you scrub through the test timeline frame by frame.

### Why traces require an HTTP server

Playwright's trace viewer uses a **Service Worker** to read the `trace.zip` file. Browsers (Chrome, Edge, Firefox) block Service Workers when a page is loaded over the `file://` protocol for security reasons. If you open the report directly from the file system, the trace viewer will display:

```text
The Playwright Trace Viewer must be loaded over the http:// or https:// protocols.
```

This is **expected behavior**, not a bug. The fix is to serve the report over HTTP.

### Step-by-step: how to view a trace

1. **Run the tests** so a report exists:

   ```bash
   npm test
   ```

2. **Start the HTTP report server** (this is the critical step):

   ```bash
   npm run test:report
   ```

   You will see output similar to:

   ```text
   Opening report from test-result_20260425_2058
   Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
   ```

3. **Open the served URL in your browser**:

   ```text
   http://localhost:9323
   ```

   Do **NOT** open `test-results/test-result_*/report/index.html` directly via Windows Explorer or `file://`.

4. **Click a failing test row** in the report (e.g. `US006 - Intentional Failure Demo`).

5. **Click the "View trace" link** on that test. The trace viewer opens with:
   - Action timeline
   - Before/after DOM snapshots
   - Network requests
   - Console logs
   - Source code with the failing assertion highlighted

6. **Stop the server** when done by pressing `Ctrl+C` in the terminal where `npm run test:report` is running.

### Common issues and fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| `The Playwright Trace Viewer must be loaded over the http:// or https:// protocols.` | Report opened via `file://` | Run `npm run test:report` and use `http://localhost:9323` |
| `Error: listen EADDRINUSE: address already in use ::1:9323` | A previous report server is still running | Either visit the existing `http://localhost:9323`, or kill the orphan process: `Get-NetTCPConnection -LocalPort 9323 \| Select -Expand OwningProcess \| Stop-Process -Force` |
| `npm run test:report` says "report folder is missing" | No tests have been run yet | Run `npm test` first |
| Test passes but no trace is generated | Traces are only kept on retry/failure (`trace: 'on-first-retry'`) | Force a failure or change `trace` setting in `playwright.config.ts` |
| `View trace` link is missing on a test row | That test passed on the first try | Only failed/retried tests have traces by default |

### Quick reference

| What you want | Command |
|---------------|---------|
| Run all tests | `npm test` |
| View latest report with working traces | `npm run test:report` |
| Open a specific report manually | `npx playwright show-report "test-results/test-result_YYYYMMDD_HHMM/report"` |
| Stop the report server | `Ctrl+C` in the report terminal |

> **Golden rule:** Always view the report through `http://localhost:9323` (served by `npm run test:report`). Never open `report/index.html` directly from the file system.

## Story-Driven Workflow (Dynamic Use Cases)

Use this flow to add test cases tomorrow (or anytime):

1. Create a folder in `tests/stories`:
   - Example: `tests/stories/US005-check-dashboard-filter/`
2. Add `description.md` with your scenario details
3. Run:
   - `npm run generate-spec -- US005-check-dashboard-filter`
4. Use Cursor/Copilot/any AI tool to fill the generated `*.spec.ts`
5. Save file in the same story folder
6. Run `npm test`

No Playwright config update is required.  
Because config uses:

- `testDir: ./tests/stories`
- `testMatch: **/*.spec.ts`

Any new `spec.ts` is automatically included.

## `description.md` Template

```md
# US005 - Dashboard Filter

## Overview
Short scenario summary.

## Steps
- Open dashboard
- Apply filter
- Validate filtered result

## Screenshots
- dashboard-before-filter.png
- dashboard-after-filter.png

## Assertions
- Filter changes displayed rows
- Expected row is visible
```

## AI-Generated Specs Guidance

If you generate tests with any AI tool:

- Keep file extension as `.spec.ts`
- Place the file inside `tests/stories/<story-folder>/`
- Reuse existing helpers when possible:
  - `tests/helpers/screenshot.ts`
  - `tests/helpers/nav.ts`
  - `tests/pages/contact.page.ts`

As long as those rules are followed, tests run automatically with `npm test`.
