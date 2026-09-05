# 🧪 ReqRes API Automation Testing Framework

An enterprise-ready, modular API Automation Testing suite for [ReqRes.in](https://reqres.in) built with **TypeScript**, **Mocha**, **Chai**, and **Supertest**.

Designed with strict separation of concerns (Layered Service Pattern), JSON Schema validation, custom HTML reporting, and modern TypeScript runtime execution (	sx).

---

## 📑 Table of Contents

- [Features](#-features)
- [Project Architecture](#-project-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Running the Tests](#-running-the-tests)
- [Test Reports (Mochawesome)](#-test-reports-mochawesome)
- [Test Scenarios Covered](#-test-scenarios-covered)
- [Best Practices & Design Decisions](#-best-practices--design-decisions)

---

## ✨ Features

- **Layered Architecture (Service Pattern)**: Decoupled test logic, HTTP requests, payloads, and schema validations.
- **End-to-End (E2E) CRUD Lifecycle**: Tests covering user creation, retrieval, updates, detail inspection, and deletion.
- **Positive & Negative Scenarios**: Comprehensive validation covering HTTP status codes, schema compliance, payload validation, boundary, and error handling.
- **Strict JSON Schema Validation**: Automated schema checks using chai-json-schema to guarantee API contract stability.
- **Smart Failure Reporting**: Custom Mochawesome hook that automatically attaches the full HTTP Response Body & Status Code only when a test fails.
- **High-Performance Execution**: Powered by 	sx (esbuild) for zero-compilation-overhead TypeScript execution.

---

## 🏗 Project Architecture

The project adheres to the **Service Object Pattern** to ensure high maintainability and reusability:

`	ext
reqres-automation-api/
├── mochawesome-report/             # Generated HTML & JSON test reports
├── src/
│   ├── config/                     # Environment configuration & constants
│   │   └── environment.ts
│   ├── payloads/                   # Reusable request payloads (Mock Data)
│   │   └── users.payload.ts
│   ├── schemas/                    # JSON Schemas for response contract assertions
│   │   └── users.schema.ts
│   ├── services/                   # Encapsulated API HTTP request abstractions
│   │   └── users.service.ts
│   ├── tests/                      # Test suites (Mocha specs)
│   │   └── temp-users.spec.ts
│   └── utils/                      # Helper utilities
│       └── report/
│           └── response-reporter.ts# Mochawesome failure attachment utility
├── .env                            # Environment variables (Base URL, API Keys)
├── .env.example                    # Sample environment template
├── package.json                    # Project scripts & dependencies
├── tsconfig.json                   # TypeScript compiler configuration
└── README.md                       # Project documentation
`

---

## 🛠 Tech Stack

| Tool | Purpose |
| :--- | :--- |
| **[TypeScript](https://www.typescriptlang.org/)** (v5.x) | Static typing, maintainable codebase, and autocompletion |
| **[Mocha](https://mochajs.org/)** (v11.x) | Test runner and test structure framework (describe, it, hooks) |
| **[Chai](https://www.chaijs.com/)** & **[chai-json-schema](https://www.npmjs.com/package/chai-json-schema)** | BDD assertion library & JSON Schema contract validator |
| **[Supertest](https://github.com/ladjs/supertest)** | High-level HTTP client for testing Node.js and REST APIs |
| **[tsx](https://github.com/privatenumber/tsx)** | Native TypeScript runtime engine based on esbuild |
| **[Mochawesome](https://github.com/adamgruber/mochawesome)** | Rich HTML/CSS/JS test reporting generator |

---

## 📋 Prerequisites

Before running the project, ensure you have the following installed:
- **Node.js**: 18.x or higher (Recommended: 20.x or 22.x)
- **npm**: 9.x or higher

Check your installed versions:
`ash
node -v
npm -v
`

---

## 🚀 Getting Started

1. **Clone the Repository**
   `ash
   git clone <repository-url>
   cd reqres-automation-api
   `

2. **Install Dependencies**
   `ash
   npm install
   `

---

## ⚙️ Environment Configuration

Create a .env file in the root directory (or copy from .env.example):

`ash
cp .env.example .env
`

Define the configuration variables:
`env
BASE_URL=https://reqres.in/api
API_KEY=your_optional_api_key_here
`

| Variable | Description | Default |
| :--- | :--- | :--- |
| BASE_URL | Base URL for the ReqRes API | https://reqres.in/api |
| API_KEY | Optional header key for authentication scenarios | *Optional* |

---

## 🧪 Running the Tests

To execute all test suites and generate the HTML report:

`ash
npm test
`

> **Cross-Platform Compatibility**: The test script is configured to run smoothly across **Windows (PowerShell / CMD)**, **macOS**, and **Linux**.

---

## 📊 Test Reports (Mochawesome)

After running the tests, an interactive HTML report is automatically compiled into the mochawesome-report/ directory.

### Viewing the Report

Open the generated HTML report in your preferred browser:

- **Windows (PowerShell):**
  `powershell
  Start-Process mochawesome-report/mochawesome.html
  `
- **macOS:**
  `ash
  open mochawesome-report/mochawesome.html
  `
- **Linux:**
  `ash
  xdg-open mochawesome-report/mochawesome.html
  `

### 💡 Smart Failure Context
To keep reports lightweight and clutter-free:
- **Passing tests** display a clean pass status without unnecessary data dumps.
- **Failing tests** automatically attach the full **HTTP Status**, **Headers**, and **Response Body JSON** under the Context dropdown to accelerate debugging and root-cause analysis.

---

## 📌 Test Scenarios Covered

The test suite covers the complete **E2E CRUD Life Cycle** of the /users endpoint:

| Step | Method | Endpoint | Scenario | Expected Result |
| :---: | :---: | :--- | :--- | :--- |
| **1** | POST | /users | **Positive**: Create user with valid payload | Status 201, matches createUserSchema, returns generated id & createdAt |
| **1** | POST | /users | **Negative**: Create user with empty payload {} | Handles validation status (201 / 400) |
| **2** | GET | /users?page=2 | **Positive**: Retrieve paginated list of users | Status 200, matches getUsersSchema, data array is not empty |
| **2** | GET | /users?page=2 | **Negative**: Access with invalid auth credentials | Handles unauthorized access response |
| **3** | PUT | /users/:id | **Positive**: Update existing user details | Status 200, matches updateUserSchema, updated attributes match payload |
| **4** | GET | /users/:id | **Positive**: View detail of an existing user (ID: 2) | Status 200, matches getSingleUserSchema, user attributes valid |
| **4** | GET | /users/:id | **Negative**: Query non-existent user (ID: 99999) | Status 404 Not Found, returns empty response {} |
| **5** | DELETE| /users/:id | **Positive**: Delete user record (ID: 2) | Status 204 No Content, empty body |

---

## 🎯 Best Practices & Design Decisions

1. **DRY (Don't Repeat Yourself)**: All endpoints are abstracted inside UserService. If an endpoint path or header changes, edits are localized to a single service file.
2. **Schema & Contract Testing**: We validate not just status codes, but the shape of the data using JSON Schemas to ensure backend regressions are caught immediately.
3. **Resilience to Rate Limiting (HTTP 429)**: Public sandbox APIs like ReqRes enforce strict IP-based rate limiting (typically 40 requests/window). Using 	sx and consolidated test runs minimizes unnecessary network roundtrips.
4. **Contextual Debugging via Hooks**: Using Mocha's fterEach lifecycle hook to dynamically inspect 	his.currentTest.state === 'failed' ensures that diagnostic logs are captured only when actually needed.

---

## 👨‍💻 Author

- **Rifqi Ardian Pratama**
