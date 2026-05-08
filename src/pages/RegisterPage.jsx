import {
    useState
} from "react";
import StudentRegistrationForm from "../forms/StudentRegistrationForm.jsx";
import CompanyInterestForm from "../forms/CompanyInterestForm.jsx";
/**
 * RegisterPage
 * ────────────
 * Purpose : Container page that hosts both registration forms.
 *           A tab switcher (controlled by local state) shows
 *           either StudentRegistrationForm or CompanyInterestForm.
 *
 * Props   : none
 *
 * State:
 *   tab : string — "student" or "company" — controls which form is shown
 */
function RegisterPage() {
    const [tab, setTab
    ] = useState("student");

    return (
        <div style={
            {
                padding: "1.5rem", maxWidth: 580, margin: "0 auto"
            }
        }>
            <h2 className="sr-only">Registration</h2>

            { /* Tab Switcher — onClick updates tab state, re-renders active form */}
            <div style={
                {
                    display: "flex", gap: 4,
                    marginBottom: "1.5rem",
                    background: "#f0f2f4",
                    borderRadius: 10, padding: 4,
                }
            }>
                {
                    [
                        "student",
                        "company"
                    ].map((t) => (
                        <button
                            key={t
                            }
                            onClick={() => setTab(t)
                            } // event: click switches active tab
                            style={
                                {
                                    flex: 1, border: "none", borderRadius: 7, padding: "7px",
                                    fontSize: 13,
                                    fontWeight: tab === t ? 600 : 400,
                                    background: tab === t ? "#fff" : "transparent",
                                    color: tab === t ? "#0F6E56" : "#555",
                                    boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                                }
                            }
                        >
                            {t === "student" ? "Student Registration" : "Company Interest"
                            }
                        </button>
                    ))
                }
            </div>

            { /* Render form based on active tab */}
            {tab === "student" && <StudentRegistrationForm />
            }
            {tab === "company" && <CompanyInterestForm />
            }
        </div>
    );
}

export default RegisterPage;