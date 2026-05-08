import Dashboard from "../components/Dashboard";

/**
 * HomePage
 * ────────
 * Purpose : Landing page shown on first visit.
 *           Hero banner with CTA buttons + Dashboard stats below.
 *
 * Props:
 *   setPage : function — navigates to another page on button click
 */
function HomePage({ setPage
}) {
    return (
        <div>
            { /* Hero Banner */}
            <div style={
                {
                    background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 60%, #5DCAA5 100%)",
                    padding: "2.5rem 1.5rem",
                    textAlign: "center",
                    color: "#fff",
                }
            }>
                <div style={
                    {
                        width: 60, height: 60, borderRadius: 14,
                        background: "rgba(255,255,255,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 700, fontSize: 24,
                        margin: "0 auto 16px",
                        border: "2px solid rgba(255,255,255,0.4)",
                    }
                }>JF</div>

                <p style={
                    {
                        fontWeight: 700, fontSize: 22, marginBottom: 6
                    }
                }>
                    NUCES Faisalabad Job Fair 2026
                </p>
                <p style={
                    {
                        fontSize: 14, opacity: 0.85, marginBottom: "1.25rem"
                    }
                }>
                    Connect with top companies · Find your next opportunity · April 28,
                    2026
                </p>

                <div style={
                    {
                        display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap"
                    }
                }>
                    <button
                        onClick={() => setPage("Jobs")
                        }
                        style={
                            {
                                background: "#fff", color: "#0F6E56", border: "none", fontWeight: 600, padding: "9px 22px", borderRadius: 8
                            }
                        }
                    >
                        Browse Jobs
                    </button>
                    <button
                        onClick={() => setPage("Register")
                        }
                        style={
                            {
                                background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", padding: "9px 22px", borderRadius: 8
                            }
                        }
                    >
                        Register Now
                    </button>
                </div>
            </div>

            { /* Dashboard stats below hero */}
            <Dashboard />
        </div>
    );
}

export default HomePage;