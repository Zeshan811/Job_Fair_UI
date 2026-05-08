import SCHEDULE from "../data/schedule";

/**
 * SchedulePage
 * ────────────
 * Purpose : Displays the full event schedule for the job fair day
 *           in a vertical timeline list with time, event, location, and type badge.
 *
 * Props   : none — reads data from SCHEDULE constant
 */
function SchedulePage() {
    const typeColor = {
        Event: "badge-blue",
        Fair: "badge-green",
        Workshop: "badge-amber",
        Break: "badge-coral",
    };

    return (
        <div style={
            {
                padding: "1.5rem"
            }
        }>
            <h2 className="sr-only">Event Schedule</h2>

            <p style={
                {
                    fontSize: 13, color: "#666", marginBottom: "1rem"
                }
            }>
                Job Fair Schedule — April 28,
                2026
            </p>

            <div style={
                {
                    display: "flex", flexDirection: "column", gap: "0.75rem"
                }
            }>
                {SCHEDULE.map((item, index) => (
                    <div
                        key={index
                        }
                        className="card"
                        style={
                            {
                                display: "flex", alignItems: "center", gap: 16
                            }
                        }
                    >
                        { /* Time */}
                        <span style={
                            {
                                fontWeight: 600, fontSize: 13, minWidth: 88, color: "#0F6E56"
                            }
                        }>
                            {item.time
                            }
                        </span>

                        { /* Event details */}
                        <div style={
                            {
                                flex: 1
                            }
                        }>
                            <p style={
                                {
                                    fontWeight: 600, fontSize: 14
                                }
                            }>{item.event
                                }</p>
                            <p style={
                                {
                                    fontSize: 12, color: "#666"
                                }
                            }>{item.location
                                }</p>
                        </div>

                        { /* Type badge */}
                        <span className={`badge ${typeColor[item.type
                        ]
                            }`
                        }>
                            {item.type
                            }
                        </span>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default SchedulePage;