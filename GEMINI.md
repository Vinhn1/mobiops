# Project Instructions: MobiFone Ca Mau Mini App

This document provides foundational mandates, architectural patterns, and workflows for the MobiFone Ca Mau Mini App project. Adhere to these instructions for all development tasks.

## 1. Project Overview
- **Purpose**: A secure ecosystem for developing Mini Apps and Admin Portals for MobiFone Ca Mau services.
- **Framework**: "Secure Vibe Coding" — combining AI-assisted development with rigorous security gates (OWASP ASVS/AISVS).
- **Tech Stack**:
  - **Frontend**: React 18 (TypeScript), Vite, TailwindCSS, Lucide-React.
  - **State Management**: Zustand.
  - **Monorepo**: NPM Workspaces (`apps/mini-app`, `apps/admin-portal`, `packages/shared`).

## 2. Building and Running
| Task | Command |
| :--- | :--- |
| **Install Dependencies** | `npm install` |
| **Dev: Mini App** | `npm run dev:mini` |
| **Dev: Admin Portal** | `npm run dev:admin` |
| **Build Project** | `npm run build` |
| **Lint Project** | `npm run lint` |
| **Scan Secrets** | `bash scripts/scan-secrets.sh` |
| **Scan Dependencies** | `bash scripts/scan-deps.sh` |
| **Scan SAST** | `bash scripts/scan-sast.sh` |

## 3. Architecture & Conventions
### 3.1. Layered Architecture
Strictly follow the dependency flow: **Presentation → Application → Domain → Infrastructure**.
- **Presentation**: React components, pages. No direct API calls or business logic.
- **Application**: Custom hooks, use cases, business logic.
- **Domain**: Entities, interfaces, value objects.
- **Infrastructure**: API clients, storage, external services.

### 3.2. Naming Conventions
- **Files**: `kebab-case.ts` (e.g., `user-service.ts`).
- **Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`).
- **Hooks**: `use` prefix + `PascalCase` (e.g., `useUserData.ts`).
- **Constants**: `UPPER_SNAKE_CASE`.

### 3.3. Development Practices
- **Module Boundaries**: Use `index.ts` as the public API. No deep imports (e.g., import from `../module` not `../module/internal/file`).
- **Testing**: Co-locate tests with the source (e.g., `service.ts` and `service.test.ts`).
- **Validation**: Mandatory server-side validation for all inputs. Log masking for PII (Phone, ID cards).

## 4. Security Mandates (Critical)
- **Zero Hardcoded Secrets**: Use environment variables. Run `scan-secrets.sh` before committing.
- **AI-Generated Code**: Must undergo human review. Flag AI-generated code in PRs/Commits.
- **Dependency Safety**: Never install a package suggested by AI without manual verification.
- **Security Checklists**: Use `./security/checklists/` for every feature (Pre-dev, Pre-merge, Pre-prod).
- **Critical Logic**: Authentication, Authorization, and Cryptography changes require mandatory human sign-off.

## 5. Important Locations
- **Rules**: `.agents/rules/*.md` (Comprehensive technical and security rules).
- **Skills**: `.agents/skills/` (Specialized AI skills for security, UI, and architecture).
- **Reports**: `reports/security/` (Output of local security scans).
- **Checklists**: `security/checklists/` (Security verification steps).
