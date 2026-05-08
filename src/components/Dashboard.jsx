import JOBS from "../data/jobs";
import COMPANIES from "../data/companies";
/**
 * Dashboard Component
 * ───────────────────
 * Purpose : Displays key stats (total jobs, companies, categories, internships)
 *           and a horizontal bar chart of jobs grouped by category,
 *           plus a list of the 4 most recently posted jobs.
 *
 * Props   : none — reads data directly from imported constants
 */
function Dashboard() {
    const totalJobs = JOBS.length;
    const totalCos = COMPANIES.length;
    const categories = new Set(JOBS.map((j) => j.category)).size;
    const internships = JOBS.filter((j) => j.type === "Internship").length;

    // Count jobs per category for the bar chart
    const catCounts = JOBS.reduce((acc, j) => {
        acc[j.category
        ] = (acc[j.category
        ] || 0) + 1;
        return acc;
    },
        {});

    const statCards = [
        {
            label: "Total Jobs", value: totalJobs, color: "#1D9E75"
        },
        {
            label: "Companies", value: totalCos, color: "#185FA5"
        },
        {
            label: "Categories", value: categories, color: "#7F77DD"
        },
        {
            label: "Internships", value: internships, color: "#D85A30"
        },
    ];

    return (
        <div style={
            {
                padding: "1.5rem"
            }
        }>

            { /* Stat Cards */}
            <div style={
                {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                    gap: 12,
                    marginBottom: "1.5rem",
                }
            }>
                {statCards.map(({ label, value, color
                }) => (
                    <div key={label
                    } style={
                        {
                            background: "#f0fdf4", borderRadius: 10, padding: "1rem", textAlign: "center"
                        }
                    }>
                        <p style={
                            {
                                fontSize: 30, fontWeight: 700, color
                            }
                        }>{value
                            }</p>
                        <p style={
                            {
                                fontSize: 13, color: "#555"
                            }
                        }>{label
                            }</p>
                    </div>
                ))
                }
            </div>

            { /* Jobs by Category — horizontal bar chart */}
            <div className="card" style={
                {
                    marginBottom: "1rem"
                }
            }>
                <p style={
                    {
                        fontWeight: 600, marginBottom: 12, fontSize: 14
                    }
                }>Jobs by Category</p>
                <div style={
                    {
                        display: "flex", flexDirection: "column", gap: 10
                    }
                }>
                    {Object.entries(catCounts).map(([cat, count
                    ]) => (
                        <div key={cat
                        } style={
                            {
                                display: "flex", alignItems: "center", gap: 10
                            }
                        }>
                            <span style={
                                {
                                    fontSize: 13, minWidth: 110, color: "#444"
                                }
                            }>{cat
                                }</span>
                            <div style={
                                {
                                    flex: 1, height: 9, background: "#e5e7eb", borderRadius: 100, overflow: "hidden"
                                }
                            }>
                                <div style={
                                    {
                                        width: `${(count / totalJobs) * 100
                                            }%`,
                                        height: "100%",
                                        background: "#1D9E75",
                                        borderRadius: 100,
                                    }
                                } />
                            </div>
                            <span style={
                                {
                                    fontSize: 13, color: "#666", minWidth: 20, textAlign: "right"
                                }
                            }>{count
                                }</span>
                        </div>
                    ))
                    }
                </div>
            </div>

            { /* Recent Listings */}
            <div className="card">
                <p style={
                    {
                        fontWeight: 600, marginBottom: 12, fontSize: 14
                    }
                }>Recent Listings</p>
                <div style={
                    {
                        display: "flex", flexDirection: "column", gap: 10
                    }
                }>
                    {JOBS.slice(0,
                        4).map((j) => (
                            <div key={j.id
                            } style={
                                {
                                    display: "flex", alignItems: "center", gap: 10
                                }
                            }>
                                <div style={
                                    {
                                        width: 30, height: 30, borderRadius: 6,
                                        background: j.color, flexShrink: 0,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#fff", fontSize: 10, fontWeight: 700,
                                    }
                                }>
                                    {j.logo
                                    }
                                </div>
                                <div style={
                                    {
                                        flex: 1, minWidth: 0
                                    }
                                }>
                                    <p style={
                                        {
                                            fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                                        }
                                    }>
                                        {j.title
                                        }
                                    </p>
                                    <p style={
                                        {
                                            fontSize: 11, color: "#888"
                                        }
                                    }>{j.company
                                        }</p>
                                </div>
                                <span style={
                                    {
                                        fontSize: 11, color: "#aaa", flexShrink: 0
                                    }
                                }>{j.posted
                                    }</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;