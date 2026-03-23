export default function ResultPage({ result, onNew, onHome }) {

  // safely read data from backend response
  const category   = result?.category || "General";
  const priority   = result?.priority || "Medium";
  const confidence = result?.confidence != null
  ? Math.round(result.confidence * 100)
  : null;
  // ADD this line after the confidence line
  const ticketId = result?.id || "N/A";

  // priority styling map
  const PRIORITY_META = {
    High:   { color: "#ff4d4d", icon: "🔴", desc: "Response within 4 hours" },
    Medium: { color: "#f59e0b", icon: "🟡", desc: "Response within 24 hours" },
    Low:    { color: "#22c55e", icon: "🟢", desc: "Response within 72 hours" },
  };

  const meta = PRIORITY_META[priority] || PRIORITY_META["Medium"];

  return (
    <div className="result-page">

      <nav className="nav">
        <div className="nav-logo">⬡ ResolveAI</div>
        <button onClick={onHome}>Home</button>
      </nav>

      <div className="result-container">

        {/* Success badge */}
        <div className="result-badge">✓ Complaint Received</div>

        <h2>AI Analysis Complete</h2>
<p>Ticket <strong>#{ticketId}</strong> — our team has been notified.</p>
        {/* Result cards */}
        <div className="result-cards">

          <div className="result-card">
            <div className="result-card-label">Classified Category</div>
            <div className="result-card-icon">🏷️</div>
            <div className="result-card-value">{category}</div>

            {/* Only show confidence bar if backend sends it */}
            {confidence !== null && (
              <div className="confidence">
                <div className="confidence-bar-bg">
                  <div
                    className="confidence-bar-fill"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <span>{confidence}% confidence</span>
              </div>
            )}
          </div>

          <div
            className="result-card"
            style={{ borderColor: meta.color }}
          >
            <div className="result-card-label">Predicted Priority</div>
            <div className="result-card-icon">{meta.icon}</div>
            <div className="result-card-value" style={{ color: meta.color }}>
              {priority} Priority
            </div>
            <div className="result-card-desc">{meta.desc}</div>
          </div>

        </div>

        {/* Submitted info summary */}
        {result?.submittedForm && (
          <div className="result-summary">
            <div className="summary-row">
              <span>Name</span>
              <span>{result.submittedForm.name}</span>
            </div>
            <div className="summary-row">
              <span>Email</span>
              <span>{result.submittedForm.email}</span>
            </div>
            {result.submittedForm.product && (
              <div className="summary-row">
                <span>Product</span>
                <span>{result.submittedForm.product}</span>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="result-actions">
          <button className="btn-primary" onClick={onNew}>
            Submit Another
          </button>
          <button className="btn-outline" onClick={onHome}>
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}