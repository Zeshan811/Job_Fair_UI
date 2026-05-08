
/**
 * JobCard Component
 * ─────────────────
 * Purpose  : Displays a single job listing as a card.
 *            Shows logo, title, company, location, type badge,
 *            category, salary, posted date, and an Apply button.
 *
 * Props:
 *   job     : object   — job data object { id, title, company, location,
 *                         type, category, salary, posted, logo, color }
 *   onApply : function — called when Apply button is clicked (event handler)
 */
function JobCard({ job, onApply
}) {
    // Map job type to badge colour class
    const typeColor = {
        "Full-time": "badge-green",
        "Internship": "badge-blue",
        "Part-time": "badge-amber",
    };

    return (
        <div className="card" style={
            {
                display: "flex", flexDirection: "column", gap: 10
            }
        }>

            { /* Header: company logo + title + type badge */}
            <div style={
                {
                    display: "flex", alignItems: "center", gap: 10
                }
            }>
                <div style={
                    {
                        width: 42, height: 42, borderRadius: 9,
                        background: job.color, display: "flex",
                        alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0,
                    }
                }>
                    {job.logo
                    }
                </div>

                <div style={
                    {
                        flex: 1, minWidth: 0
                    }
                }>
                    <p style={
                        {
                            fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                        }
                    }>
                        {job.title
                        }
                    </p>
                    <p style={
                        {
                            fontSize: 12, color: "#666"
                        }
                    }>
                        {job.company
                        } · {job.location
                        }
                    </p>
                </div>

                <span className={`badge ${typeColor[job.type
                ] || "badge-teal"
                    }`
                }>
                    {job.type
                    }
                </span>
            </div>

            { /* Footer: category + salary + posted date */}
            <div style={
                {
                    display: "flex", alignItems: "center", justifyContent: "space-between"
                }
            }>
                <div style={
                    {
                        display: "flex", gap: 6, alignItems: "center"
                    }
                }>
                    <span className="badge badge-gray">{job.category
                    }</span>
                    <span style={
                        {
                            fontSize: 12, color: "#666"
                        }
                    }>{job.salary
                        }</span>
                </div>
                <span style={
                    {
                        fontSize: 11, color: "#999"
                    }
                }>{job.posted
                    }</span>
            </div>

            { /* Apply button — fires onApply event passed from parent (JobsPage) */}
            <button
                className="btn-primary"
                style={
                    {
                        width: "100%", marginTop: 2, padding: "9px"
                    }
                }
                onClick={() => onApply(job)
                }
            >
                Apply Now
            </button>
        </div>
    );
}

export default JobCard;