You are a senior full-stack engineer. Build a complete demo project that showcases a React application with Playwright end-to-end testing.

## 🎯 Goal

Create a React application and implement Playwright E2E tests that include:

* Page navigation validation
* Automated traversal of all routes
* A realistic multi-step user flow (form submission)
* Step-based screenshots
* Timestamp-based reporting with HTML report and screenshots

---

## 🧱 Project Structure

root/
app/
tests/
test-results/
playwright.config.ts
package.json
README.md

---

## ⚛️ React Application Requirements

1. Use React with Vite.
2. Use React Router.
3. Create 5 pages:

   * Home (/)
   * About (/about)
   * Services (/services)
   * Contact (/contact)
   * Dashboard (/dashboard)

---

## 📄 Page Requirements

Each page must include:

* Unique heading
* `data-testid="page-title"`
* Basic dummy content

---

## 📬 Contact Page (IMPORTANT – for multi-step test)

Implement a simple form:

Fields:

* Name (input)
* Email (input)
* Message (textarea)

Button:

* Submit

Behavior:

* On submit, show success message:
  "Message sent successfully"

Add test IDs:

* name-input
* email-input
* message-input
* submit-button
* success-message

---

## 🧭 Navigation

* Add navbar linking all pages
* Ensure proper routing

---

## 🎭 Playwright Configuration

* Use TypeScript
* Base URL: http://localhost:5173
* Browser: Chromium
* Headless mode

---

## ⏱️ Timestamp-Based Reporting (MANDATORY)

At runtime generate folder:

test-results/test-result_YYYYMMDD_HHMM/

Inside:

* report/
* screenshots/
* artifacts/

Configure:

* HTML reporter output → report/
* Playwright outputDir → artifacts/

Ensure:

* Each run creates a new folder
* No overwrites

---

## 🧪 Test Structure

Create tests in `/tests`:

---

### 1. navigation.spec.ts

Tests:

* Load home page
* Navigate via navbar to all pages
* Validate:

  * URL
  * Page title

---

### 2. traversal.spec.ts

* Define all routes in array
* Loop through routes
* Visit each page
* Validate heading

---

### 3. contact-flow.spec.ts (MULTI-STEP FLOW – IMPORTANT)

Test: "User navigates to contact and submits form"

Steps:

1. Open Home page

   * Validate title
   * Capture screenshot: home.png

2. Click Contact from navbar

   * Validate URL
   * Capture screenshot: contact-page.png

3. Fill form

   * Enter name
   * Enter email
   * Enter message
   * Capture screenshot: form-filled.png

4. Click Submit

   * Validate success message
   * Capture screenshot: success.png

---

## 📸 Screenshot Requirements

* Capture screenshots for:

  * Each page visit
  * Each major action step
* Store in:
  test-results/test-result_<timestamp>/screenshots/

Naming examples:

* home.png
* contact-page.png
* form-filled.png
* success.png

---

## 📊 Reporting

* Use Playwright HTML reporter
* Output:
  test-results/test-result_<timestamp>/report/

Ensure report includes:

* Test results
* Screenshots
* Execution logs

---

## ▶️ Scripts

Add:

* "start": run React app
* "test": run tests
* "test:report": open latest report

---

## 📘 README.md

Include:

* Setup steps
* Run instructions
* Explanation of:

  * Navigation tests
  * Flow test
  * Timestamp reporting

---

## ⚙️ Optional Enhancements

* Page Object Model (POM)
* Screenshot helper utility
* Reusable navigation helper

---

## 🚫 Constraints

* No authentication
* Keep UI simple
* Code must run without fixes

---

## ✅ Expected Outcome

When tests run:

1. A new timestamp folder is created
2. Screenshots captured for each step
3. Multi-step flow executes successfully
4. HTML report generated

---

Generate full working code with clean structure and best practices.
