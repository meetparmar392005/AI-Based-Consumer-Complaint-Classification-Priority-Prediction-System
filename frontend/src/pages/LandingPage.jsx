export default function LandingPage({ onStart, onHistory }) {
  return (
    <div className="landing">

      {/* SECTION 1: Top navigation bar */}
      <nav className="nav">
  <div className="nav-logo">⬡ ResolveAI</div>
  <div style={{ display: "flex", gap: "10px" }}>
    <button onClick={onHistory}>View History</button> {/* ← ADD */}
    <button onClick={onStart}>File Complaint →</button>
  </div>
  </nav>

      {/* SECTION 2: Hero — main headline + button */}
      <main className="landing-main">
        <h1>Your Complaints, Resolved Smarter.</h1>
        <p>Our AI instantly classifies your issue and assigns the right priority.</p>
        <button onClick={onStart}>Submit a Complaint</button>
      </main>

      {/* SECTION 3: Feature cards */}
      <div className="feature-grid">
        <div className="feature-card">
          <h3>🏷️ Auto-Classification</h3>
          <p>AI detects your complaint category instantly</p>
        </div>
        <div className="feature-card">
          <h3>🎯 Priority Prediction</h3>
          <p>Smart priority scoring ensures urgent issues are handled fast</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Instant Analysis</h3>
          <p>Results in seconds, no manual triage needed</p>
        </div>
      </div>

    </div>
  );
}