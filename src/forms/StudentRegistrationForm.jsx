import {
    useState
} from "react";
import { Validate } from "../utils/validate";
import Field from "../utils/validate";
/**
 * StudentRegistrationForm Component
 * ──────────────────────────────────
 * Purpose : Controlled form for student registration.
 *           All inputs are controlled via useState.
 *           On submit, validates fields and shows success state.
 *
 * Props   : none — self-contained with its own state
 *
 * Concepts demonstrated:
 *   - Controlled components (every input bound to state)
 *   - Input validation with inline error messages
 *   - e.preventDefault() to stop page reload
 *   - Display of submitted data on success
 */
function StudentRegistrationForm() {
    // Controlled form state — every field mirrors what's in the input
    const [form, setForm
    ] = useState({
        name: "", rollNo: "", email: "",
        program: "", semester: "", phone: "",
        password: "", confirm: "",
    });

    const [errors, setErrors
    ] = useState({}); // validation error messages
    const [submitted, setSubmitted
    ] = useState(false); // toggle success view

    // Generic updater: keeps one handler for all fields
    const update = (key, value) => setForm((prev) => ({
        ...prev,
        [key
        ]: value
    }));

    // Form submission handler
    function handleSubmit(e) {
        e.preventDefault(); // prevent default browser form submission / page reload

        const errs = Validate(form,
            {
                name: {
                    required: "Full name is required"
                },
                rollNo: {
                    required: "Roll number is required"
                },
                email: {
                    required: "Email is required", email: "Enter a valid email address"
                },
                program: {
                    required: "Please select your program"
                },
                semester: {
                    required: "Please select your semester"
                },
                password: {
                    required: "Password is required", minLen: "Password must be at least 6 characters"
                },
                confirm: {
                    required: "Please confirm your password", match: "password"
                },
            });

        setErrors(errs);
        if (Object.keys(errs).length === 0) setSubmitted(true); // no errors → show success
    }

    function resetForm() {
        setSubmitted(false);
        setForm({
            name: "", rollNo: "", email: "", program: "", semester: "", phone: "", password: "", confirm: ""
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
                }>Registration Successful! ✓</p>
                <p>Welcome, <strong>{form.name
                }</strong>! Roll number <strong>{form.rollNo
                }</strong> is now registered.</p>
                <p style={
                    {
                        marginTop: 6, fontSize: 13
                    }
                }>Confirmation will be sent to: {form.email
                    }</p>
                <button style={
                    {
                        marginTop: 12, fontSize: 13
                    }
                } onClick={resetForm
                }>
                    Register another student
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
                <Field label="Full Name *" error={errors.name
                }>
                    <input
                        value={form.name
                        }
                        onChange={(e) => update("name", e.target.value)
                        }
                        placeholder="Ali Hassan"
                    />
                </Field>

                <Field label="Roll Number *" error={errors.rollNo
                }>
                    <input
                        value={form.rollNo
                        }
                        onChange={(e) => update("rollNo", e.target.value)
                        }
                        placeholder="21F-3456"
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
                        placeholder="ali@nu.edu.pk"
                    />
                </Field>

                <Field label="Phone Number" error={errors.phone
                }>
                    <input
                        value={form.phone
                        }
                        onChange={(e) => update("phone", e.target.value)
                        }
                        placeholder="0300-1234567"
                    />
                </Field>
            </div>

            <div style={
                {
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px"
                }
            }>
                <Field label="Program *" error={errors.program
                }>
                    <select value={form.program
                    } onChange={(e) => update("program", e.target.value)
                    }>
                        <option value="">Select program</option>
                        {
                            [
                                "BS CS",
                                "BS SE",
                                "BS AI",
                                "BS DS",
                                "MS CS",
                                "MBA"
                            ].map((p) => (
                                <option key={p
                                }>{p
                                    }</option>
                            ))
                        }
                    </select>
                </Field>

                <Field label="Semester *" error={errors.semester
                }>
                    <select value={form.semester
                    } onChange={(e) => update("semester", e.target.value)
                    }>
                        <option value="">Select semester</option>
                        {
                            [...Array(8)
                            ].map((_, i) => (
                                <option key={i + 1
                                }>Semester {i + 1
                                    }</option>
                            ))
                        }
                    </select>
                </Field>
            </div>

            <div style={
                {
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px"
                }
            }>
                <Field label="Password *" error={errors.password
                }>
                    <input
                        type="password"
                        value={form.password
                        }
                        onChange={(e) => update("password", e.target.value)
                        }
                    />
                </Field>

                <Field label="Confirm Password *" error={errors.confirm
                }>
                    <input
                        type="password"
                        value={form.confirm
                        }
                        onChange={(e) => update("confirm", e.target.value)
                        }
                    />
                </Field>
            </div>

            <button
                type="submit"
                className="btn-primary"
                style={
                    {
                        width: "100%", padding: "11px", marginTop: 4
                    }
                }
            >
                Register for Job Fair
            </button>
        </form>
    );
}

export default StudentRegistrationForm;