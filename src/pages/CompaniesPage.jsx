import COMPANIES from "../data/companies";

/**
 * CompaniesPage
 * ─────────────
 * Purpose : Displays all participating company profiles in a grid.
 *           Each card shows logo, name, industry, and open slots.
 *
 * Props   : none — reads data from COMPANIES constant
 */
function CompaniesPage() {
    return (
        <div style={
            {
                padding: "1.5rem"
            }
        }>
            <h2 className="sr-only">Company Profiles</h2>

            <p style={
                {
                    color: "#666", fontSize: 13, marginBottom: "1rem"
                }
            }>
                {COMPANIES.length
                } companies attending this year&apos;s job fair
            </p>

            <div style={
                {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "1rem",
                }
            }>
                {COMPANIES.map((company) => (
                    <div
                        key={company.name
                        }
                        className="card"
                        style={
                            {
                                display: "flex", flexDirection: "column",
                                alignItems: "center", textAlign: "center",
                                padding: "1.5rem", gap: 10,
                            }
                        }
                    >
                        { /* Company logo circle */}
                        <div style={
                            {
                                width: 54, height: 54, borderRadius: 12,
                                background: company.color,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "#fff", fontWeight: 700, fontSize: 18,
                            }
                        }>
                            {company.logo
                            }
                        </div>

                        <div>
                            <p style={
                                {
                                    fontWeight: 600, fontSize: 14
                                }
                            }>{company.name
                                }</p>
                            <p style={
                                {
                                    fontSize: 12, color: "#666"
                                }
                            }>{company.industry
                                }</p>
                        </div>

                        <span className="badge badge-teal">
                            {company.slots
                            } open slot{company.slots > 1 ? "s" : ""
                            }
                        </span>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default CompaniesPage;