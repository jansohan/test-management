# Test Management

A test management application built with React, TypeScript, Tailwind CSS v4, and Zustand. It supports chapterwise test creation, PYQ and mock test tabs, marking scheme configuration, test tracking with search and edit, and persistent authentication.

## Features

- Authentication with persistent login state
- Dashboard with test statistics
- Test creation with tabs:
  - Chapterwise (details → questions)
  - PYQ
  - Mock Test
- Chapterwise question builder:
  - Rich text editor (TipTap) for question descriptions
  - Question list with per-question edit and delete actions
  - "Add Another Question" and "Save & Continue" inline actions
  - Optional topic, sub-topic, and media URL per question
- Test tracking with search, edit, and delete
- Marking scheme configuration per test
- Responsive sidebar navigation with icons and icon-only collapse on the questions step
- Form validation using Zod and React Hook Form
- Mock data mode for offline development (`VITE_DUMMY_DATA=true`)
- Image optimization in production builds

## Tech Stack

- React 18
- TypeScript 5.6
- Vite 6
- Tailwind CSS 4
- React Router 7
- Zustand 5
- TipTap (rich text editor)
- Zod
- React Hook Form
- vite-plugin-image-optimizer

## Project Structure

```
src/
  components/
    auth/
      ForgotPasswordForm.tsx
      LoginFields.tsx
      LoginForm.tsx
      LoginHeader.tsx
      LoginLayout.tsx
    dashboard/
      DashboardFilters.tsx
      DashboardStats.tsx
      DashboardTable.tsx
      DashboardTableActions.tsx
      DashboardTableHeader.tsx
      DashboardTableRow.tsx
      index.tsx
    icons/
      ActionIcons.tsx
    layout/
      AppSidebar.tsx
      Header.tsx
      Logo.tsx
      ProtectedLayout.tsx
      SidebarLink.tsx
      SidebarNav.tsx
      UserMenu.tsx
      index.ts
    questions/
      QuestionForm.tsx
      QuestionList.tsx
      QuestionNav.tsx
    tests/
      ChapterwiseForm.tsx
      FormActions.tsx
      TestFormFields.tsx
      TestTracking.tsx
      commonFields.ts
      context/
        TestFormContext.tsx
      index.tsx
      steps/
        ChapterwiseSummary.tsx
        QuestionsStep.tsx
        TestSummaryStats.tsx
      tabs/
        MockTestTab.tsx
        PyqTab.tsx
        TestTabs.tsx
    ui/
      Badge.tsx
      Breadcrumb.tsx
      Button.tsx
      Card.tsx
      FormField.tsx
      Input.tsx
      KeyValue.tsx
      MultiSelect.tsx
      RichTextEditor.tsx
      Select.tsx
      index.ts
  constants/
    app.ts
    colors.ts
    messages.ts
    routes.ts
    testStatus.ts
  data/
    mockData.ts
  lib/
    defaults.ts
    validation.ts
  services/
    auth.service.ts
    question.service.ts
    subject.service.ts
    sub-topic.service.ts
    test.service.ts
    topic.service.ts
  stores/
    useAuthStore.ts
    useQuestionNavStore.ts
    useTestStore.ts
  types/
    auth.ts
    index.ts
    stores.ts
  utils/
    api.ts
    auth.ts
    format.ts
  App.tsx
  main.tsx
  vite-env.d.ts
```

## Getting Started

### Prerequisites

- Node.js >= 20.19.0
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Configuration

- Path alias: `@` maps to `./src`
- Theme colors: `primary` (`#384EC7`) and `primary-light` (`#f8faff`) are defined in `src/index.css`
- Font: Inter via Google Fonts

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` |
| `VITE_DUMMY_LOGIN` | Enable mock login (`vedant-admin` / `vedant123`) | `false` |
| `VITE_DUMMY_DATA` | Enable mock data for all API calls | `false` |

## Rich Text Editor

Question descriptions use a lightweight rich text editor powered by **TipTap** (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-placeholder`). The reusable `RichTextEditor` component lives at `src/components/ui/RichTextEditor.tsx` and integrates with React Hook Form via `useController`.

Supported formatting:
- Bold
- Italic
- Bullet list
- Numbered list

The editor serializes content to HTML (`editor.getHTML()`), stores it in the form state, and restores it via `field.value` on mount.

## State Management

- `useAuthStore` — authentication state with localStorage persistence
- `useTestStore` — test CRUD operations with localStorage persistence
- `useQuestionNavStore` — active question navigation state (active question, total questions, questions step flag)

## Validation

Forms are validated using Zod schemas defined in `src/lib/validation.ts` and enforced via React Hook Form with `@hookform/resolvers`. Question fields support optional `topic`, `subTopic`, and `mediaUrl`.

## API Layer

Service functions in `src/services/` wrap `fetch` calls defined in `src/utils/api.ts`. All API responses follow the shape:

```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
}
```

When `VITE_DUMMY_DATA=true`, services return mock data from `src/data/mockData.ts` instead of making network requests.

## Messages & Labels

- `src/constants/messages.ts` — centralized `MESSAGES.error` and `MESSAGES.success` for validation and status copy.
- `src/constants/app.ts` — `APP_LABELS` holds all UI strings (nav, forms, buttons, auth, dashboard, etc.). New strings (e.g. `common.active`, `common.saveAndContinue`) are added here rather than hardcoded.

## Browser Support

Modern browsers supporting ES2020 and CSS nesting.
