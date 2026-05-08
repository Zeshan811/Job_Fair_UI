
/**
 * Navbar Component
 * ─────────────────
 * Purpose  : Top navigation bar — shows brand logo and page links.
 *            Highlights the active page and calls setPage on click.
 *
 * Props:
 *   page    : string   — currently active page name
 *   setPage : function — updates active page in App state (event handler)
 */
function Navbar({ page, setPage
}) {
    const links = [
        "Home",
        "Jobs",
        "Companies",
        "Schedule",
        "Register",
        "Feedback"
    ];

    return (
        <nav style={
            {
                background: "#fff",
                borderBottom: "1px solid #e5e7eb",
                padding: "0 1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                height: 54,
                position: "sticky",
                top: 0,
                zIndex: 100,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }
        }>
            { /* Brand */}
            <div style={
                {
                    display: "flex", alignItems: "center", gap: 8, marginRight: "0.5rem"
                }
            }>
                <div style={
                    {
                        width: 32, height: 32, borderRadius: 8,
                        background: "#1D9E75", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 700, color: "#fff",
                    }
                }>JF</div>
                <span style={
                    {
                        fontWeight: 600, fontSize: 15
                    }
                }>JobFair Portal</span>
            </div>

            { /* Nav links — onClick triggers setPage (event handling) */}
            <div style={
                {
                    display: "flex", gap: 2, flexWrap: "wrap"
                }
            }>
                {links.map((l) => (
                    <button
                        key={l
                        }
                        onClick={() => setPage(l)
                        } // event: button click updates App-level state
                        style={
                            {
                                padding: "5px 13px",
                                fontSize: 13,
                                border: "none",
                                borderRadius: 6,
                                background: page === l ? "#f0fdf4" : "transparent",
                                fontWeight: page === l ? 600 : 400,
                                color: page === l ? "#0F6E56" : "#555",
                            }
                        }
                    >
                        {l
                        }
                    </button>
                ))
                }
            </div>
        </nav>
    );
}

export default Navbar;