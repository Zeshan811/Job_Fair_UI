import FeedbackForm from "../forms/FeedbackForm";

/**
 * FeedbackPage
 * ────────────
 * Purpose : Container page for the FeedbackForm.
 *           Keeps page layout (padding, max-width) separate from form logic.
 *
 * Props   : none
 */
function FeedbackPage() {
    return (
        <div style={
            {
                padding: "1.5rem", maxWidth: 520, margin: "0 auto"
            }
        }>
            <h2 className="sr-only">Feedback</h2>
            <FeedbackForm />
        </div>
    );
}

export default FeedbackPage;