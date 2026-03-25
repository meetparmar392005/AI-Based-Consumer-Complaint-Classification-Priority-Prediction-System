import { useState, useEffect } from "react";
import { fetchComplaints } from "../api";

export default function HistoryPage({ onHome }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Fetch all complaints when page loads
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchComplaints();
        setComplaints(data);
      } catch (err) {
        setError(err.message || "Failed to load complaints.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []); // ← empty array = runs once on mount

  // Build unique filter options from real data
  const categories = ["All", ...new Set(complaints.map(c => c.category).filter(Boolean))];
  const priorities = ["All", ...new Set(complaints.map(c => c.priority).filter(Boolean))];

  // Apply both filters together
  const filtered = complaints.filter(c => {
    const matchCategory = categoryFilter === "All" || c.category === categoryFilter;
    const matchPriority = priorityFilter === "All" || c.priority === priorityFilter;
    return matchCategory && matchPriority;
  });

  return (
    <div className="history-page">

      <nav className="nav">
        <div className="nav-logo">⬡ ResolveAI</div>
        <button className="nav-btn" onClick={onHome}>← Home</button>
      </nav>

      <div className="history-container">

        <div className="history-header">
          <h2>Complaints History</h2>
          <p>{filtered.length} of {complaints.length} total complaints</p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              {priorities.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Show reset only when a filter is active */}
          {(categoryFilter !== "All" || priorityFilter !== "All") && (
            <button
              className="filter-reset"
              onClick={() => {
                setCategoryFilter("All");
                setPriorityFilter("All");
              }}
            >
              ✕ Reset Filters
            </button>
          )}
        </div>

        {/* States */}
        {loading && <div className="history-status">Loading complaints...</div>}
        {error   && <div className="form-error">⚠ {error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div className="history-status">No complaints found.</div>
        )}

        {/* Table */}
        {!loading && !error && filtered.length > 0 && (
          <div className="table-wrapper">
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>Submitted By</th>
                  <th>Complaint</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, index) => (
                  <tr key={c.id || index}>
                    <td>{c.submitted_by || "Anonymous"}</td>
                    <td className="complaint-text">{c.text}</td>
                    <td>
                      <span className="tag tag-category">
                        {c.category}
                      </span>
                    </td>
                    <td>
                      <span className={`tag tag-${c.priority?.toLowerCase()}`}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="date-cell">
                      {c.created_at
                        ? new Date(c.created_at).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}