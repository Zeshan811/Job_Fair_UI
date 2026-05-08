import {
    useState, useMemo
} from "react";
import JobCard from "../components/JobCard";
import JOBS from "../data/jobs";

/**
 * JobsPage
 * ────────
 * Purpose : Displays all job listings with real-time search and dual filters.
 *           Tracks which jobs the user has applied for.
 *           Shows an application confirmation modal on apply.
 *
 * Props   : none — manages its own state
 *
 * State:
 *   search   : string   — real-time text filter (title / company / location)
 *   category : string   — job category dropdown filter
 *   jobType  : string   — employment type dropdown filter
 *   applied  : number[] — list of job IDs the user has applied to
 *   modal    : object   — job object shown in confirmation modal (null = hidden)
 */
function JobsPage() {
    const [search, setSearch
    ] = useState("");
    const [category, setCategory
    ] = useState("All");
    const [jobType, setJobType
    ] = useState("All");
    const [applied, setApplied
    ] = useState([]);
    const [modal, setModal
    ] = useState(null);

    const categories = [
        "All", ...new Set(JOBS.map((j) => j.category))
    ];
    const types = [
        "All",
        "Full-time",
        "Part-time",
        "Internship"
    ];

    /**
     * useMemo — recomputes filtered list only when search/category/jobType change.
     * This keeps re-renders cheap and UI responsive.
     */
    const filtered = useMemo(() => {
        return JOBS.filter((job) => {
            const s = search.toLowerCase();
            const matchSearch =
                !s ||
                job.title.toLowerCase().includes(s) ||
                job.company.toLowerCase().includes(s) ||
                job.location.toLowerCase().includes(s);
            const matchCat = category === "All" || job.category === category;
            const matchType = jobType === "All" || job.type === jobType;
            return matchSearch && matchCat && matchType;
        });
    },
        [search, category, jobType
        ]);

    // Called when Apply Now is clicked inside JobCard
    function handleApply(job) {
        if (!applied.includes(job.id)) {
            setApplied((prev) => [...prev, job.id
            ]); // add to applied list (state update)
        }
        setModal(job); // show confirmation modal
    }

    function clearFilters() {
        setSearch("");
        setCategory("All");
        setJobType("All");
    }

    const hasFilters = search || category !== "All" || jobType !== "All";

    return (
        <div style={
            {
                padding: "1.5rem"
            }
        }>
            <h2 className="sr-only">Job Listings</h2>

            { /* Search & Filter Bar */}
            <div style={
                {
                    display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap"
                }
            }>
                <input
                    style={
                        {
                            flex: "1 1 220px", minWidth: 160
                        }
                    }
                    placeholder="Search by title, company or location..."
                    value={search
                    }
                    onChange={(e) => setSearch(e.target.value)
                    } // event: onChange updates state → re-renders list
                />
                <select
                    style={
                        {
                            flex: "0 1 150px"
                        }
                    }
                    value={category
                    }
                    onChange={(e) => setCategory(e.target.value)
                    }
                >
                    {categories.map((c) => <option key={c
                    }>{c
                        }</option>)
                    }
                </select>
                <select
                    style={
                        {
                            flex: "0 1 140px"
                        }
                    }
                    value={jobType
                    }
                    onChange={(e) => setJobType(e.target.value)
                    }
                >
                    {types.map((t) => <option key={t
                    }>{t
                        }</option>)
                    }
                </select>
                {hasFilters && (
                    <button onClick={clearFilters
                    } style={
                        {
                            fontSize: 13, color: "#666"
                        }
                    }>
                        ✕ Clear
                    </button>
                )
                }
            </div>

            { /* Result count */}
            <p style={
                {
                    fontSize: 13, color: "#666", marginBottom: "1rem"
                }
            }>
                {filtered.length
                } listing{filtered.length !== 1 ? "s" : ""
                } found
                {applied.length > 0 && ` · ${applied.length
                    } applied`
                }
            </p>

            { /* Job Grid */}
            {filtered.length === 0 ? (
                <div className="card" style={
                    {
                        textAlign: "center", padding: "2.5rem"
                    }
                }>
                    <p style={
                        {
                            color: "#888", marginBottom: 12
                        }
                    }>No jobs match your current filters.</p>
                    <button onClick={clearFilters
                    }>Clear all filters</button>
                </div>
            ) : (
                <div style={
                    {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "1rem",
                    }
                }>
                    {filtered.map((job) => (
                        <div key={job.id
                        } style={
                            {
                                position: "relative"
                            }
                        }>
                            { /* Applied badge overlaid on card */}
                            {applied.includes(job.id) && (
                                <div style={
                                    {
                                        position: "absolute", top: 10, right: 10, zIndex: 1,
                                        fontSize: 11, background: "#d1fae5", color: "#065f46",
                                        padding: "2px 8px", borderRadius: 100, fontWeight: 600,
                                    }
                                }>✓ Applied</div>
                            )
                            }
                            { /* JobCard receives job data and the apply handler as props */}
                            <JobCard job={job
                            } onApply={handleApply
                            } />
                        </div>
                    ))
                    }
                </div>
            )
            }

            { /* Application Confirmation Modal */}
            {modal && (
                <div
                    onClick={() => setModal(null)
                    } // click outside = close
                    style={
                        {
                            position: "fixed", inset: 0,
                            background: "rgba(0,0,0,0.4)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            zIndex: 200,
                        }
                    }
                >
                    <div
                        className="card"
                        onClick={(e) => e.stopPropagation()
                        } // prevent close when clicking inside
                        style={
                            {
                                maxWidth: 380, width: "90%", padding: "1.75rem"
                            }
                        }
                    >
                        <p style={
                            {
                                fontWeight: 600, fontSize: 16, marginBottom: 8
                            }
                        }>
                            Application Submitted! ✓
                        </p>
                        <p style={
                            {
                                fontSize: 14, color: "#555", marginBottom: 16, lineHeight: 1.7
                            }
                        }>
                            You&apos;ve applied for <strong>{modal.title
                            }</strong> at{
                                " "
                            }
                            <strong>{modal.company
                            }</strong>. You&apos;ll be contacted via your registered email.
                        </p>
                        <button className="btn-primary" style={
                            {
                                width: "100%"
                            }
                        } onClick={() => setModal(null)
                        }>
                            Close
                        </button>
                    </div>
                </div>
            )
            }
        </div>
    );
}

export default JobsPage;