import { useState } from "react";
import { submitComplaint } from "../api";

export default function ComplaintForm({ onResult, onBack }) {

  // stores everything the user types
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    complaint: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // runs every time user types in any input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // runs when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // stops page from refreshing

    if (form.complaint.trim().length < 20) {
      setError("Please describe your complaint in at least 20 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await submitComplaint(form);
      onResult({ ...result, submittedForm: form });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">

      <nav className="nav">
        <div className="nav-logo">⬡ ResolveAI</div>
        <button onClick={onBack}>← Back</button>
      </nav>

      <div className="form-container">
        <h2>Submit Your Complaint</h2>
        <p>Our AI will classify and prioritize your complaint automatically.</p>

        <form onSubmit={handleSubmit}>

          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Product / Service</label>
              <input
                name="product"
                type="text"
                placeholder="e.g. Mobile App, Order #1234"
                value={form.product}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Complaint textarea */}
          <div className="form-group">
            <label>Describe your complaint *</label>
            <textarea
              name="complaint"
              required
              rows={6}
              placeholder="Describe your issue in detail..."
              value={form.complaint}
              onChange={handleChange}
            />
          </div>

          {/* Error message */}
          {error && <div className="form-error">⚠ {error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze & Submit →"}
          </button>

        </form>
      </div>
    </div>
  );
}