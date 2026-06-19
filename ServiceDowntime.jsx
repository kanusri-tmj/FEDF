import { useState, useEffect } from "react";
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

function Footer() {
  return (
    <footer>
      <p>© 2026 <span>NationalBank</span> · Bank Holiday &amp; Service Calendar · All Rights Reserved.</p>
    </footer>
  );
}

const STATUS_CONFIG = {
  Scheduled:  { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  Active:     { color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  Completed:  { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  Cancelled:  { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
};

const SYSTEM_OPTIONS = [
  "Core Banking System",
  "Internet Banking",
  "Mobile Banking App",
  "ATM Network",
  "NEFT / RTGS",
  "UPI Services",
  "Card Services",
  "Customer Portal",
  "Loan Management System",
  "Trade Finance Module",
];

const SEED_DOWNTIMES = [
  {
    id: 1,
    system: "Core Banking System",
    date: "2026-06-15",
    startTime: "02:00",
    endTime: "05:00",
    reason: "Quarterly database maintenance and index rebuild",
    status: "Scheduled",
    createdBy: "admin",
    createdAt: "2026-06-01T10:00:00.000Z",
  },
  {
    id: 2,
    system: "ATM Network",
    date: "2026-06-22",
    startTime: "00:00",
    endTime: "03:00",
    reason: "Firmware upgrade across all ATM nodes",
    status: "Scheduled",
    createdBy: "admin",
    createdAt: "2026-06-02T09:00:00.000Z",
  },
  {
    id: 3,
    system: "NEFT / RTGS",
    date: "2026-05-18",
    startTime: "23:00",
    endTime: "01:00",
    reason: "RBI mandated system upgrade",
    status: "Completed",
    createdBy: "admin",
    createdAt: "2026-05-10T08:00:00.000Z",
  },
];

function getDowntimes() {
  const stored = localStorage.getItem("downtimes");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("downtimes", JSON.stringify(SEED_DOWNTIMES));
  return SEED_DOWNTIMES;
}

function saveDowntimes(data) {
  localStorage.setItem("downtimes", JSON.stringify(data));
}

export default function ServiceDowntime() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const role = users.find((u) => u.username === username)?.role || null;
  const canManage = role === "admin";

  const [downtimes, setDowntimes] = useState(getDowntimes);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [form, setForm] = useState({ system: SYSTEM_OPTIONS[0], date: "", startTime: "", endTime: "", reason: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    setError("");
    if (!form.date || !form.startTime || !form.endTime || !form.reason.trim()) {
      setError("All fields are required.");
      return;
    }
    const entry = {
      id: Date.now(),
      ...form,
      status: "Scheduled",
      createdBy: username,
      createdAt: new Date().toISOString(),
    };
    const updated = [entry, ...downtimes];
    setDowntimes(updated);
    saveDowntimes(updated);
    // Add to audit log
    const audit = JSON.parse(localStorage.getItem("auditLog")) || [];
    audit.unshift({ id: Date.now(), action: "Added Downtime", detail: `${form.system} on ${form.date}`, user: username, at: new Date().toISOString() });
    localStorage.setItem("auditLog", JSON.stringify(audit));
    setSuccess(`Downtime scheduled for ${form.system}!`);
    setForm({ system: SYSTEM_OPTIONS[0], date: "", startTime: "", endTime: "", reason: "" });
    setShowForm(false);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = downtimes.map((d) => d.id === id ? { ...d, status: newStatus } : d);
    setDowntimes(updated);
    saveDowntimes(updated);
  };

  const handleDelete = (id) => {
    const updated = downtimes.filter((d) => d.id !== id);
    setDowntimes(updated);
    saveDowntimes(updated);
  };

  const filtered = statusFilter === "All" ? downtimes : downtimes.filter((d) => d.status === statusFilter);

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="access-denied">
            <div className="access-icon">🔒</div>
            <div className="access-title">Login Required</div>
            <div className="access-desc">Please log in to view service downtime schedules.</div>
            <button className="btn-primary" style={{ marginTop: 20, width: "auto", padding: "12px 32px" }} onClick={() => navigate("/login")}>Go to Login</button>
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
        {/* Hero */}
        <div className="page-hero">
          <div className="page-hero-inner">
            <div className="page-breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-sep">›</span>
              <span>Service Downtime</span>
            </div>
            <h1 className="page-title">Service Downtime Scheduler</h1>
            <p className="page-desc">Schedule and track planned maintenance windows across all banking systems.</p>
          </div>
          {canManage && (
            <div className="page-hero-actions">
              <button className="btn-primary" style={{ width: "auto", padding: "12px 28px", marginTop: 0 }} onClick={() => setShowForm(!showForm)}>
                {showForm ? "✕ Cancel" : "＋ Schedule Downtime"}
              </button>
            </div>
          )}
        </div>

        {success && <div className="section-inner"><div className="form-alert success">✓ {success}</div></div>}

        {/* Add Form */}
        {showForm && canManage && (
          <div className="section-inner">
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-title">Schedule Maintenance Window</div>
                <div className="form-card-badge">⚠️ {role}</div>
              </div>
              {error && <div className="form-alert danger">⚠ {error}</div>}
              <div className="form-grid">
                <div className="form-group form-full">
                  <label className="form-label">Affected System</label>
                  <select className="form-input" name="system" value={form.system} onChange={handleChange}>
                    {SYSTEM_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input className="form-input" type="date" name="date" value={form.date} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Start Time</label>
                  <input className="form-input" type="time" name="startTime" value={form.startTime} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">End Time</label>
                  <input className="form-input" type="time" name="endTime" value={form.endTime} onChange={handleChange} />
                </div>
                <div className="form-group form-full">
                  <label className="form-label">Reason / Notes</label>
                  <textarea className="form-input" name="reason" rows={3} value={form.reason} onChange={handleChange} placeholder="Describe the reason for this maintenance window..." style={{ resize: "vertical" }} />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn-primary form-submit-btn" onClick={handleSubmit}>Schedule →</button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="section-inner" style={{ paddingBottom: 0 }}>
          <div className="stats-row">
            {["All", "Scheduled", "Active", "Completed", "Cancelled"].map((s) => {
              const count = s === "All" ? downtimes.length : downtimes.filter((d) => d.status === s).length;
              const cfg = s === "All" ? { color: "#0a1628", bg: "#f0f4fa", border: "#dde3ec" } : STATUS_CONFIG[s];
              return (
                <button
                  key={s}
                  className={`stat-filter-btn${statusFilter === s ? " active" : ""}`}
                  style={statusFilter === s ? { background: cfg.color, color: "white", borderColor: cfg.color } : {}}
                  onClick={() => setStatusFilter(s)}
                >
                  <span className="stat-filter-count">{count}</span>
                  <span className="stat-filter-label">{s}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Downtime Cards */}
        <div className="section-inner">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">⚙️</div>
              <div className="empty-title">No downtime windows found</div>
              <div className="empty-desc">No maintenance scheduled for the selected status.</div>
            </div>
          ) : (
            <div className="downtime-list">
              {filtered.map((d) => {
                const cfg = STATUS_CONFIG[d.status] || STATUS_CONFIG.Scheduled;
                const dateObj = new Date(d.date);
                const dateStr = dateObj.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
                const dayStr = dateObj.toLocaleDateString("en-IN", { weekday: "long" });
                return (
                  <div className="downtime-card" key={d.id}>
                    <div className="downtime-card-left">
                      <div className="downtime-system">{d.system}</div>
                      <div className="downtime-meta">
                        📅 {dateStr} · {dayStr} &nbsp;|&nbsp; 🕐 {d.startTime} – {d.endTime}
                      </div>
                      <div className="downtime-reason">{d.reason}</div>
                      <div className="downtime-footer-meta">
                        Added by <strong>{d.createdBy}</strong> · {new Date(d.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </div>
                    </div>
                    <div className="downtime-card-right">
                      <span className="type-badge" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                        {d.status}
                      </span>
                      {canManage && (
                        <div className="downtime-actions">
                          {d.status === "Scheduled" && (
                            <button className="action-btn edit" onClick={() => handleStatusChange(d.id, "Active")} title="Mark Active">▶ Active</button>
                          )}
                          {d.status === "Active" && (
                            <button className="action-btn edit" onClick={() => handleStatusChange(d.id, "Completed")} title="Mark Completed">✓ Done</button>
                          )}
                          {d.status !== "Completed" && (
                            <button className="action-btn delete" onClick={() => handleDelete(d.id)} title="Delete">🗑</button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
