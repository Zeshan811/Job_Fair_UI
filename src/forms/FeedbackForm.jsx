import {
    useState
} from "react";
import {
    Validate
}

    from "../utils/validate";
import Field from "../utils/validate";

/**
 * FeedbackForm Component
 * ──────────────────────
 * Purpose : Collects student feedback about the job fair.
 *           Includes an interactive star rating (onMouseEnter/Leave/Click),
 *           category select, and a comment textarea with character count.
 *
 * Props   : none — self-contained with its own state
 */

const RATING_LABELS = [
    "",
    "Poor",
    "Fair",
    "Good",
    "Very Good",
    "Excellent"
];

function FeedbackForm() {
    const [form, setForm
    ] = useState({
        name: "", email: "", rating: "", category: "", comment: "",
    });

    const [errors, setErrors
    ] = useState({});
    const [submitted, setSubmitted
    ] = useState(null); // stores submitted snapshot
    const [hover, setHover
    ] = useState(0); // star hover state

    const update = (key, value) => setForm((prev) => ({
        ...prev,
        [key
        ]: value
    }));

    function handleSubmit(e) {
        e.preventDefault();

        const errs = Validate(form,
            {
                rating: {
                    required: "Please select a star rating"
                },
                category: {
                    required: "Please select a feedback category"
                },
                comment: {
                    required: "Please write your feedback", minLen: "Feedback must be at least 20 characters"
                },
            });

        setErrors(errs);
        if (Object.keys(errs).length === 0) setSubmitted({
            ...form
        }); // snapshot form data
    }

    function resetForm() {
        setSubmitted(null);
        setForm({
            name: "", email: "", rating: "", category: "", comment: ""
        });
        setErrors({});
    }
    // ── Success State — display submitted data ──
    if (submitted) {
        return (
            <div className="success-box" style={
                {
                    padding: "1.5rem"
                }
            }>
                <p style={
                    {
                        fontWeight: 600, fontSize: 16, marginBottom: 8
                    }
                }>Thank you for your feedback! ✓</p>
                <p style={
                    {
                        fontSize: 14, marginBottom: 4
                    }
                }>
                    Your <strong>{RATING_LABELS[submitted.rating
                    ]
                    }</strong> ({submitted.rating
                    }★) review
                    for &quot;{submitted.category
                    }&quot; has been recorded.
                </p>
                {submitted.name && (
                    <p style={
                        {
                            fontSize: 13
                        }
                    }>We&apos;ll reach out to {submitted.name
                        } if needed.</p>
                )
                }
                <button style={
                    {
                        marginTop: 12, fontSize: 13
                    }
                } onClick={resetForm
                }>
                    Submit more feedback
                </button>
            </div>
        );
    }
    // ── Form View ──
    return (
        <form onSubmit={handleSubmit
        } noValidate>

            <div style={
                {
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px"
                }
            }>
                <Field label="Your Name (optional)">
                    <input
                        value={form.name
                        }
                        onChange={(e) => update("name", e.target.value)
                        }
                        placeholder="Ali Hassan"
                    />
                </Field>

                <Field label="Email (optional)">
                    <input
                        type="email"
                        value={form.email
                        }
                        onChange={(e) => update("email", e.target.value)
                        }
                        placeholder="ali@nu.edu.pk"
                    />
                </Field>
            </div>

            { /* Star Rating — uses onMouseEnter / onMouseLeave / onClick events */}
            <div style={
                {
                    marginBottom: 14
                }
            }>
                <label style={
                    {
                        fontSize: 13, color: "#555", display: "block", marginBottom: 4, fontWeight: 500
                    }
                }>
                    Rating *
                </label>
                <div style={
                    {
                        display: "flex", gap: 6, alignItems: "center"
                    }
                }>
                    {
                        [
                            1,
                            2,
                            3,
                            4,
                            5
                        ].map((n) => {
                            const active = hover >= n || Number(form.rating) >= n;
                            return (
                                <button
                                    key={n
                                    }
                                    type="button"
                                    onMouseEnter={() => setHover(n)
                                    } // event: hover highlight
                                    onMouseLeave={() => setHover(0)
                                    } // event: remove hover
                                    onClick={() => update("rating", String(n))
                                    } // event: set rating
                                    style={
                                        {
                                            width: 36, height: 36, borderRadius: 8, fontSize: 20,
                                            border: `1px solid ${active ? "#1D9E75" : "#d1d5db"
                                                }`,
                                            background: active ? "#d1fae5" : "transparent",
                                            transition: "all .1s",
                                        }
                                    }
                                >★</button>
                            );
                        })
                    }
                    {form.rating && (
                        <span style={
                            {
                                fontSize: 13, color: "#666", marginLeft: 4
                            }
                        }>
                            {RATING_LABELS[form.rating
                            ]
                            }
                        </span>
                    )
                    }
                </div>
                {errors.rating && <p style={
                    {
                        color: "#dc2626", fontSize: 12, marginTop: 4
                    }
                }>{errors.rating
                    }</p>
                }
            </div>

            <Field label="Feedback Category *" error={errors.category
            }>
                <select value={form.category
                } onChange={(e) => update("category", e.target.value)
                }>
                    <option value="">Select a category</option>
                    {
                        [
                            "Job Listings",
                            "Company Booths",
                            "Registration Process",
                            "Website Experience",
                            "Event Organization",
                            "Other"
                        ].map((c) => (
                            <option key={c
                            }>{c
                                }</option>
                        ))
                    }
                </select>
            </Field>

            <Field label="Your Feedback *" error={errors.comment
            }>
                <textarea
                    rows={
                        4
                    }
                    value={form.comment
                    }
                    onChange={(e) => update("comment", e.target.value)
                    }
                    placeholder="Share your experience about the job fair... (minimum 20 characters)"
                />
                <p style={
                    {
                        fontSize: 11, color: "#999", marginTop: 2
                    }
                }>
                    {form.comment.length
                    } characters
                </p>
            </Field>

            <button
                type="submit"
                className="btn-primary"
                style={
                    {
                        width: "100%", padding: "11px"
                    }
                }
            >
                Submit Feedback
            </button>
        </form>
    );
}

export default FeedbackForm;