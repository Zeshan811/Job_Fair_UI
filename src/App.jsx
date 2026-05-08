import {
    useState
} from "react";

// ── Global Styles ──
import "./index.css";
// ── Layout Components ──
import Navbar from "./components/Navbar.jsx";
// ── Pages ──
import HomePage from "./pages/HomePage.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import CompaniesPage from "./pages/CompaniesPage.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
/**
 * App (Root Component)
 * ────────────────────
 * Purpose : Top-level component that manages page routing via useState.
 *           Renders the Navbar and the currently active page.
 *
 * Data Flow:
 *   - "page" state lives here (single source of truth for routing)
 *   - "setPage" is passed DOWN to Navbar and HomePage as a prop
 *   - Navbar fires setPage on link click → state updates → active page re-renders
 *
 * Component Hierarchy:
 *   App
 *   ├── Navbar          (receives: page, setPage)
 *   └── [Active Page]
 *       ├── HomePage    (receives: setPage)
 *       │   └── Dashboard
 *       ├── JobsPage
 *       │   └── JobCard (×N)
 *       ├── CompaniesPage
 *       ├── SchedulePage
 *       ├── RegisterPage
 *       │   ├── StudentRegistrationForm
 *       │   └── CompanyInterestForm
 *       └── FeedbackPage
 *           └── FeedbackForm
 */
function App() {
    // "page" state controls which page is rendered — the core routing mechanism
    const [page, setPage
    ] = useState("Home");

    // Map page name → component
    const pages = {
        Home: <HomePage setPage={setPage
        } />,
        Jobs: <JobsPage />,
        Companies: <CompaniesPage />,
        Schedule: <SchedulePage />,
        Register: <RegisterPage />,
        Feedback: <FeedbackPage />,
    };

    return (
        <div>
            { /* Navbar always visible — receives page (to highlight active link)
          and setPage (to navigate on click) */}
            <Navbar page={page
            } setPage={setPage
            } />

            { /* Render active page, fall back to Home if unknown route */}
            {pages[page
            ] ?? <HomePage setPage={setPage
            } />
            }
        </div>
    );
}

export default App;