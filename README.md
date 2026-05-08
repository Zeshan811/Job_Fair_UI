# NUCES Faisalabad — Job Fair Portal 2026
## React Assignment — Full Project

---

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser at http://localhost:5173
```

---

## Project Structure

```
jobfair/
├── index.html                  ← HTML entry point
├── package.json                ← dependencies & scripts
├── vite.config.js              ← Vite bundler config
└── src/
    ├── main.jsx                ← mounts App to #root
    ├── App.jsx                 ← ROOT: routing state, imports all pages
    ├── index.css               ← global styles (reset, buttons, cards, badges)
    │
    ├── data/                   ← static data files
    │   ├── jobs.js             ← JOBS array (8 job listings)
    │   ├── companies.js        ← COMPANIES array (6 companies)
    │   └── schedule.js         ← SCHEDULE array (7 events)
    │
    ├── utils/
    │   └── validate.js         ← validate() function + reusable Field component
    │
    ├── components/             ← reusable UI components
    │   ├── Navbar.jsx          ← sticky nav bar, active link highlight
    │   ├── JobCard.jsx         ← single job listing card with Apply button
    │   └── Dashboard.jsx       ← stat cards + category chart + recent listings
    │
    ├── forms/                  ← standalone controlled forms
    │   ├── StudentRegistrationForm.jsx  ← 8-field student form + validation
    │   ├── CompanyInterestForm.jsx      ← 6-field company form + validation
    │   └── FeedbackForm.jsx             ← star rating + category + comment
    │
    └── pages/                  ← page-level components (one per route)
        ├── HomePage.jsx        ← hero banner + Dashboard
        ├── JobsPage.jsx        ← search + filters + JobCard grid + modal
        ├── CompaniesPage.jsx   ← company profile cards
        ├── SchedulePage.jsx    ← event timeline
        ├── RegisterPage.jsx    ← tab switcher for both forms
        └── FeedbackPage.jsx    ← wrapper for FeedbackForm
```

---

## Component Hierarchy

```
App (routing state: page, setPage)
├── Navbar           props: page, setPage
└── [Active Page]
    ├── HomePage     props: setPage
    │   └── Dashboard
    ├── JobsPage     (no props — own state)
    │   └── JobCard  props: job, onApply
    ├── CompaniesPage
    ├── SchedulePage
    ├── RegisterPage
    │   ├── StudentRegistrationForm
    │   └── CompanyInterestForm
    └── FeedbackPage
        └── FeedbackForm
```

---

## Data Flow

| Flow | Description |
|------|-------------|
| Props (down) | `page` + `setPage` passed from App → Navbar → button onClick |
| State (local) | `search`, `category`, `jobType` in JobsPage filter the job list |
| useMemo | Filtered jobs recomputed only when search/filter state changes |
| Event handling | `onChange` on inputs updates controlled state; `onSubmit` calls `e.preventDefault()` and runs validate() |
| Lifting state | `onApply` defined in JobsPage, passed as prop to JobCard — child fires parent's handler |

---

## UX Problems Fixed

1. **No search** → Real-time search across title, company, location + two dropdown filters
2. **Broken forms** → Controlled inputs, per-field validation, success confirmation with submitted data
3. **Poor navigation** → Sticky navbar, single-click access to all 6 sections, active link highlight