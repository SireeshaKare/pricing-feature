# Pricing Feature Monorepo

A full-stack application for managing supplier products and pricing profiles.  
Built with **Next.js (frontend)** and **NestJS (backend)**.

---

## Tech Stack

### Backend (NestJS)

- **NestJS + TypeScript**
- **DTO-based architecture**
- **Swagger**
- **CORS** enabled for frontend integration

### Frontend (Next.js)

- **Next.js 16** (using `pages/` router)
- **TypeScript**
- **Redux Toolkit** with **RTK Query**
- **Material UI (MUI)** for UI components
- **TailwindCSS** for styling

---

## Core Features

### Product Module

- Fetch all products for a given supplier (`supplierId`)
- Search products by **Product Title** or **SKU Code**
- Filter products by **Category**, **Segment**, and **Brand**
- Selection modes:
  - **One Product** : Can only select 1 product
  - **Multiple Products** : Can select multiple products
  - **All Products** : All products will be selected
- “Select All” and “Deselect All” radio buttons for bulk selection

### Pricing Profile Module

- Create pricing profiles for selected products
- Calculate pricing using backend api (`useCalculatePricingMutation`)
- Update and persist pricing data

---

## Getting Started

### Install Dependencies

From the root directory (/pricing-feature):

```bash
npm install
```

### Start the servers

Both the frontend and backend server can be started with this one command.

From the root directory (/pricing-feature):

```bash
npm run dev
```

This runs the backend on http://localhost:4000 and the frontend on http://localhost:3000

Swagger can be accessed via http://localhost:4000/api

## Key files

| File                                                          | Purpose                                             |
| ------------------------------------------------------------- | --------------------------------------------------- |
| `apps/backend/src/product/product.service.ts`                 | Business logic for fetching supplier products       |
| `apps/backend/src/pricing-profile/pricing-profile.service.ts` | Logic for creating and calculating pricing          |
| `apps/frontend/src/store/api/pricingApi.ts`                   | RTK Query endpoints for API calls                   |
| `apps/frontend/src/features/ProductTable.tsx`                 | Main UI component for product selection and pricing |

## Improvements that can be made

### 1. Backend

- Add DTO validation using class-validator and class-transformer instead of manually checking values.
- Abstract pricing calculation into a utility or service helper (e.g., pricing.utils.ts)
- Use constants or enums for category types, pricing types, etc.
- Add @ApiProperty() decorators on DTO fields to improve Swagger documentation.
- Avoid recomputing filters or price calculations repeatedly
- Write more unit tests.

### 2. Frontend

- Split the UI into smaller components:
  - ProductFilters
  - ProductSelectionTable
  - PriceAdjustmentForm
  - CalculatedPriceTable
- Move repetitive CustomSelect props into a config file.
- Use TypeScript types for form and query data interfaces.
- Use useMemo for filtered products to avoid unnecessary recalculations.
- Debounce search input.
- UX and UI improvements.
- Form validation and error handling
- Avoid string literals like "one", "multiple" — replace with enums:

```bash
enum SelectionMode {
  ONE = "one",
  MULTIPLE = "multiple",
  ALL = "all" }
```

- Use react hook form and zod for form validation
  - Centralized form state (no multiple useStates for each field).
  - Easier to manage field defaults and resets.
  - Extendable validation schema as more pricing rules are added.
  - Automatic validation messages (e.g., required, min/max values).
  - Avoid unnecessary re-renders; React hook form batches updates efficiently.
