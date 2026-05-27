# PE Team Work Plan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Define the PE work split so Adriano, Nelson, and David cover the main implementation while Puțan Iulia keeps a small but real coding task related to validation.

**Architecture:** The project will evolve from the current static Express-served site into a framework-based front-end connected to an Express user-management API. The API owns registration, login, profile, roles, password hashing, and JWT authentication; the front-end owns the user flows and migrated UI. Iulia's task stays isolated in front-end validation helpers and form feedback, so it can be completed independently after David creates the forms.

**Tech Stack:** JavaScript, Node.js, Express, front-end framework such as React with Vite, JWT authentication, password hashing, CSS, browser form validation helpers.

---

### Task 1: Adriano Arruda - Front-End Framework Migration

**Files:**
- Individual plan: `Plano_Trabalho_PE_Adriano_Arruda.md`
- Future implementation: `src/` front-end app structure

- [ ] Create the framework project structure.
- [ ] Convert the current landing page into reusable components.
- [ ] Preserve the CACA visual identity.
- [ ] Reuse relevant animations and interactions.
- [ ] Add navigation entries for login, registration, and profile.
- [ ] Check desktop, tablet, and mobile layouts.

### Task 2: Nelson Ponte - User Management API

**Files:**
- Individual plan: `Plano_Trabalho_PE_Nelson_Ponte.md`
- Future implementation: `server.js` and backend modules/routes

- [ ] Add dependencies for JWT and password hashing.
- [ ] Create user storage and user model.
- [ ] Implement registration with validation and duplicate email protection.
- [ ] Implement login with password verification and JWT creation.
- [ ] Implement authentication middleware.
- [ ] Implement profile read/update endpoints.
- [ ] Implement basic admin role protection.

### Task 3: David Cardoso - Front-End/API Integration

**Files:**
- Individual plan: `Plano_Trabalho_PE_David_Cardoso.md`
- Future implementation: auth pages, API client, event CRUD components

- [ ] Create the front-end API client.
- [ ] Create registration, login, profile, and logout flows.
- [ ] Store and send JWT tokens for protected requests.
- [ ] Protect profile routes or views.
- [ ] Migrate the existing event CRUD into the framework structure.
- [ ] Test the complete flow against Nelson's API.

### Task 4: Puțan Iulia - Front-End Validation Task

**Files:**
- Individual plan: `Plano_Trabalho_PE_Putan_Iulia.md`
- Future implementation: validation helpers and form feedback

- [ ] Create email validation helper.
- [ ] Create registration form validation helper.
- [ ] Create login form validation helper.
- [ ] Show accessible validation messages in the forms.
- [ ] Prevent submit when validation fails.
- [ ] Test invalid and valid form states.

### Completion Criteria

- [ ] The work split matches the PE statement requirements.
- [ ] Adriano, Nelson, and David own the main implementation.
- [ ] Iulia has a clear coding task connected to validation, accessibility, and security.
- [ ] The task left for Iulia is useful but does not block the rest of the project.
