/**
 * validate(fields, rules)
 * Validates a form fields object against a rules map.
 *
 * Rule options per field:
 *   required : string  — error message if field is empty
 *   email    : string  — error message if not valid email format
 *   minLen   : string  — error message if shorter than minimum length (set min inside message)
 *   match    : string  — key of another field whose value must match
 *
 * Returns: { fieldKey: errorMessage } — empty object means no errors
 */
export function Validate(fields, rules) {
    const errs = {};
    for (const [key, rule
    ] of Object.entries(rules)) {
        const value = fields[key
        ]?.trim() || "";

        if (rule.required && !value) {
            errs[key
            ] = rule.required;
        } else if (rule.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errs[key
            ] = rule.email;
        } else if (rule.minLen && value && value.length < 6) {
            errs[key
            ] = rule.minLen;
        } else if (rule.match && fields[key
        ] !== fields[rule.match
            ]) {
            errs[key
            ] = "Passwords do not match";
        }
    }
    return errs;
}
/**
 * Field component
 * Reusable labelled wrapper for form inputs with inline error display.
 * Props:
 *   label    : string         — label text shown above input
 *   error    : string | null  — validation error message
 *   children : ReactNode      — the actual input/select/textarea element
 */
export default function Field({ label, error, children
}) {
    return (
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
                {label
                }
            </label>
            {children
            }
            {error && (
                <p style={
                    {
                        color: "#dc2626", fontSize: 12, marginTop: 4
                    }
                }>{error
                    }</p>
            )
            }
        </div>
    );
}