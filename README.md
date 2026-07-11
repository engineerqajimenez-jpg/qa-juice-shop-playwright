# QA Juice Shop — Playwright + k6

Automated testing suite for [OWASP Juice Shop](https://github.com/juice-shop/juice-shop), covering E2E functional tests with Playwright and performance tests with k6.

---

## Tech Stack

- **Playwright** + TypeScript — E2E automation
- **k6** — Performance testing
- **GitHub Actions** — CI/CD pipeline
- **Page Object Model (POM)** — Test architecture
- **storageState** — Session reuse across tests

---

## Project Structure

```
├── pages/                  # Page Object classes
│   ├── LoginPage.ts
│   └── RegisterPage.ts
├── tests/
│   ├── auth/               # Auth setup (storageState)
│   └── e2e/                # Functional test specs
│       ├── login.spec.ts
│       └── register.spec.ts
├── performance/            # k6 performance tests
│   ├── smoke.test.js
│   ├── load.test.js
│   ├── stress.test.js
│   ├── spike.test.js
│   └── breakpoint.test.js
└── .github/workflows/      # CI/CD pipeline
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- [k6](https://k6.io/docs/get-started/installation/) installed
- [OWASP Juice Shop](https://github.com/juice-shop/juice-shop) running locally on port 3000

### Install

```bash
npm install
npx playwright install
```

### Run E2E Tests

```bash
npx playwright test
```

### Run Performance Tests

```bash
# Smoke test (1 VU, 30s)
k6 run performance/smoke.test.js

# Load test (up to 30 VUs)
k6 run performance/load.test.js

# Stress test (up to 50 VUs)
k6 run performance/stress.test.js

# Spike test (200 VUs sudden burst)
k6 run performance/spike.test.js

# Breakpoint test (ramps until system breaks)
k6 run performance/breakpoint.test.js
```

HTML reports are saved to `performance/reports/` after each run.

---

## E2E Test Coverage

| Module   | Test Cases |
|----------|-----------|
| Login    | Valid credentials, invalid credentials, empty fields, SQL Injection, email with spaces |
| Register | Valid registration, invalid email, password mismatch, password too short/long, duplicate email, empty fields, missing security question/answer |

---

## Performance Test Results

Tests run against a local Juice Shop instance. Each test chains 3 authenticated requests: **login → product search → basket**.

| Test       | Max VUs | p(95)  | Threshold | Result |
|------------|---------|--------|-----------|--------|
| Smoke      | 1       | 55ms   | < 500ms   | ✅ Pass |
| Load       | 30      | 249ms  | < 800ms   | ✅ Pass |
| Stress     | 50      | 76ms   | < 800ms   | ✅ Pass |
| Spike      | 200     | 3.93s  | < 800ms   | ❌ Fail |
| Breakpoint | ~126    | 2.12s  | < 2000ms  | ❌ Aborted |

**Breakpoint finding:** The local Juice Shop instance starts degrading around **126 concurrent users**, where p(95) crosses the 2s threshold.

---

## CI/CD

GitHub Actions runs the full Playwright suite on every push and pull request to `main`. Juice Shop is spun up automatically using Docker.

[![Playwright Tests](https://github.com/engineerqajimenez-jpg/qa-juice-shop-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/engineerqajimenez-jpg/qa-juice-shop-playwright/actions/workflows/playwright.yml)

---

## Author

**Jose Jimenez** — QA Engineer  
[LinkedIn](https://linkedin.com/in/josejimenez07) · [GitHub](https://github.com/engineerqajimenez-jpg)
