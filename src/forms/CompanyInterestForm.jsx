import {
    useState
} from "react";
import {
    Validate
}
    from "../utils/validate";
import Field from "../utils/validate";

/**
 * CompanyInterestForm Component
 * ─────────────────────────────
 * Purpose : Controlled form for companies to register interest in attending.
 *           Validates required fields and shows submitted data on success.
 *
 * Props   : none — self-contained with its own state
 */
function CompanyInterestForm() {
    const [form, setForm
    ] = useState({
        company: "", contact: "", email: "",
        industry: "", openings: "", message: "",
    });

    const [errors, setErrors
    ] = useState({});
    const [submitted, setSubmitted
    ] = useState(false);

    const update = (key, value) => setForm((prev) => ({
        ...prev,
        [key
        ]: value
    }));

    function handleSubmit(e) {
        e.preventDefault(); // prevent default page reload

        const errs = Validate(form,
            {
                company: {
                    required: "Company name is required"
                },
                contact: {
                    required: "Contact person name is required"
                },
                email: {
                    required: "Email is required", email: "Enter a valid email address"
                },
                industry: {
                    required: "Please select an industry"
                },
                openings: {
                    required: "Number of openings is required"
                },
            });

        setErrors(errs);
        if (Object.keys(errs).length === 0) setSubmitted(true);
    }

    function resetForm() {
        setSubmitted(false);
        setForm({
            company: "", contact: "", email: "", industry: "", openings: "", message: ""
        });
        setErrors({});
    }
    // ── Success State ──
    if (submitted) {
        return (
            <div className="success-box">
                <p style={
                    {
                        fontWeight: 600, marginBottom: 4
                    }
                }>Interest Form Submitted! ✓</p>
                <p>
                    <strong>{form.company
                    }</strong> has been registered.
                    Our team will contact <strong>{form.contact
                    }</strong> at {form.email
                    }.
                </p>
                <p style={
                    {
                        marginTop: 6, fontSize: 13
                    }
                }>
                    Listed openings: {form.openings
                    } | Industry: {form.industry
                    }
                </p>
                <button style={
                    {
                        marginTop: 12, fontSize: 13
                    }
                } onClick={resetForm
                }>
                    Submit another
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
                <Field label="Company Name *" error={errors.company
                }>
                    <input
                        value={form.company
                        }
                        onChange={(e) => update("company", e.target.value)
                        }
                        placeholder="TechCorp Ltd."
                    />
                </Field>

                <Field label="Contact Person *" error={errors.contact
                }>
                    <input
                        value={form.contact
                        }
                        onChange={(e) => update("contact", e.target.value)
                        }
                        placeholder="HR Manager Name"
                    />
                </Field>

                <Field label="Email Address *" error={errors.email
                }>
                    <input
                        type="email"
                        value={form.email
                        }
                        onChange={(e) => update("email", e.target.value)
                        }
                        placeholder="hr@company.com"
                    />
                </Field>

                <Field label="Industry *" error={errors.industry
                }>
                    <select value={form.industry
                    } onChange={(e) => update("industry", e.target.value)
                    }>
                        <option value="">Select industry</option>
                        {
                            [
                                "Software",
                                "Fintech",
                                "E-commerce",
                                "Telecom",
                                "AI/ML",
                                "Consulting",
                                "Other"
                            ].map((i) => (
                                <option key={i
                                }>{i
                                    }</option>
                            ))
                        }
                    </select>
                </Field>

                <Field label="Number of Openings *" error={errors.openings
                }>
                    <input
                        type="number"
                        min="1"
                        value={form.openings
                        }
                        onChange={(e) => update("openings", e.target.value)
                        }
                        placeholder="5"
                    />
                </Field>
            </div>

            <Field label="Message to Students (optional)">
                <textarea
                    rows={
                        3
                    }
                    value={form.message
                    }
                    onChange={(e) => update("message", e.target.value)
                    }
                    placeholder="Tell students about your company and the roles you're recruiting for..."
                />
            </Field>

            <button
                type="submit"
                className="btn-primary"
                style={
                    {
                        width: "100%", padding: "11px", marginTop: 4
                    }
                }
            >
                Submit Interest Form
            </button>
        </form>
    );
}

export default CompanyInterestForm;