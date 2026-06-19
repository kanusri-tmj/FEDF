import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Shared Header ─────────────────────────────────────────────
function Header() {
  const name = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header>
      <div className="header-brand">
        <div className="header-icon">🏛️</div>
        <div>
          <div className="header-title">NationalBank Portal</div>
          <div className="header-sub">Holiday &amp; Service Calendar</div>
        </div>
      </div>
      <nav className="header-nav">
        <Link to="/" className="nav-btn">Home</Link>
        {name ? (
          <>
            <span className="nav-user">👤 {name}</span>
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/signup" className="nav-btn primary">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

// ── Shared Footer ─────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <p>© 2026 <span>NationalBank</span> · Bank Holiday &amp; Service Calendar · All Rights Reserved.</p>
    </footer>
  );
}

// ── AddHoliday (default export) ───────────────────────────────
function AddHoliday() {
  const navigate = useNavigate();

  // Role guard — only admin can access
  const role = (() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const username = localStorage.getItem("username");
    return users.find((u) => u.username === username)?.role || null;
  })();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [form, setForm] = useState({
    name: "",
    date: "",
    type: "National Holiday",
    region: "National",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setError("");
    setSuccess("");

    if (!form.name || !form.date) {
      setError("Holiday name and date are required.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("holidays_v2")) || [];

    const duplicate = existing.find(
      (h) => h.name.toLowerCase() === form.name.toLowerCase() && h.date === form.date
    );
    if (duplicate) {
      setError("A holiday with the same name and date already exists.");
      return;
    }

    const newHoliday = {
      id: Date.now(),
      name: form.name.trim(),
      date: form.date,
      type: form.type,
      state: form.region,
      region: form.region,
      description: form.description.trim(),
      addedBy: localStorage.getItem("username"),
      addedAt: new Date().toISOString(),
    };

    localStorage.setItem("holidays_v2", JSON.stringify([...existing, newHoliday]));
    // Also write to "holidays" key for export compatibility
    const legacyList = JSON.parse(localStorage.getItem("holidays") || "[]");
    localStorage.setItem("holidays", JSON.stringify([...legacyList, newHoliday]));
    window.dispatchEvent(new Event("storage"));
    setSuccess(`"${form.name}" has been added successfully!`);
    setForm({ name: "", date: "", type: "National Holiday", region: "National", description: "" });

    setTimeout(() => navigate("/holidays"), 1800);
  };

  // Not logged in
  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="access-denied">
            <div className="access-icon">🔒</div>
            <div className="access-title">Login Required</div>
            <div className="access-desc">Please log in to access this page.</div>
            <button className="btn-primary" style={{ marginTop: 20, width: "auto", padding: "12px 32px" }} onClick={() => navigate("/login")}>
              Go to Login
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Viewer role — no access
  if (role === "user" || !role) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="access-denied">
            <div className="access-icon">⛔</div>
            <div className="access-title">Access Restricted</div>
            <div className="access-desc">
              Only <strong>Admins</strong> can add holidays.
              Your current role is <strong>{role || "unknown"}</strong>.
            </div>
            <button className="btn-primary" style={{ marginTop: 20, width: "auto", padding: "12px 32px" }} onClick={() => navigate("/holidays")}>
              View Holidays
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="page-content">
        {/* Page Hero */}
        <div className="page-hero">
          <div className="page-hero-inner">
            <div className="page-breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-sep">›</span>
              <Link to="/holidays" className="breadcrumb-link">Holiday List</Link>
              <span className="breadcrumb-sep">›</span>
              <span>Add Holiday</span>
            </div>
            <h1 className="page-title">Add New Holiday</h1>
            <p className="page-desc">Fill in the details below to add a new bank holiday to the calendar.</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="section-inner">
          <div className="form-card">
            <div className="form-card-header">
              <div className="form-card-title">Holiday Details</div>
              <div className="form-card-badge">{role === "admin" ? "🛡️ Admin" : "👤 User"}</div>
            </div>

            {error && <div className="form-alert danger">⚠ {error}</div>}
            {success && <div className="form-alert success">✓ {success}</div>}

            <div className="form-grid">
              {/* Name */}
              <div className="form-group form-full">
                <label className="form-label">Holiday Name *</label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="e.g. Independence Day"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              {/* Date */}
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  className="form-input"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              {/* Type */}
              <div className="form-group">
                <label className="form-label">Holiday Type</label>
                <select className="form-input" name="type" value={form.type} onChange={handleChange}>
                  <option>National Holiday</option>
                  <option>Regional Holiday</option>
                  <option>Bank Holiday</option>
                  <option>Restricted Holiday</option>
                </select>
              </div>

              {/* Region */}
              <div className="form-group">
                <label className="form-label">Region</label>
                <select className="form-input" name="region" value={form.region} onChange={handleChange}>
                  <option>National</option>
                  <option>North</option>
                  <option>South</option>
                  <option>East</option>
                  <option>West</option>
                  <option>Central</option>
                </select>
              </div>

              {/* Description */}
              <div className="form-group form-full">
                <label className="form-label">Description <span style={{ fontWeight: 400, textTransform: "none", color: "var(--muted)" }}>(optional)</span></label>
                <textarea
                  className="form-input"
                  name="description"
                  rows={3}
                  placeholder="Brief description of this holiday..."
                  value={form.description}
                  onChange={handleChange}
                  style={{ resize: "vertical" }}
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={() => navigate("/holidays")}>
                Cancel
              </button>
              <button className="btn-primary form-submit-btn" onClick={handleSubmit}>
                Add Holiday →
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddHoliday;
