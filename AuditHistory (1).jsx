import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const ACTION_CONFIG = {
  "Added Holiday":               { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", icon: "➕" },
  "Deleted Holiday":             { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", icon: "🗑" },
  "Added Downtime":              { color: "#d97706", bg: "#fffbeb", border: "#fde68a", icon: "⚠️" },
  "Updated Branch Hours":        { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", icon: "✏️" },
  "Sent Notification":           { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", icon: "📣" },
  "Saved Notification Draft":    { color: "#6b7c93", bg: "#f8f9fc", border: "#dde3ec", icon: "💾" },
  "User Login":                  { color: "#0a1628", bg: "#f0f4fa", border: "#dde3ec", icon: "🔑" },
  "User Registered":             { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", icon: "👤" },
  "Role Changed":                { color: "#d97706", bg: "#fffbeb", border: "#fde68a", icon: "🛡️" },
};

const SEED_AUDIT = [
  { id: 10, action: "Added Holiday", detail: "Republic Day on 2026-01-26", user: "admin", at: "2026-01-01T08:00:00.000Z" },
  { id: 9,  action: "Sent Notification", detail: "Branch Closure Notice — Independence Day", user: "admin", at: "2026-06-01T10:00:00.000Z" },
  { id: 8,  action: "Added Downtime", detail: "Core Banking System on 2026-06-15", user: "admin", at: "2026-06-01T10:05:00.000Z" },
  { id: 7,  action: "Updated Branch Hours", detail: "Head Office — Hyderabad", user: "admin", at: "2026-05-15T11:30:00.000Z" },
  { id: 6,  action: "User Registered", detail: "New user account created", user: "editor1", at: "2026-05-10T09:00:00.000Z" },
  { id: 5,  action: "Deleted Holiday", detail: "Test Holiday on 2026-04-01", user: "admin", at: "2026-04-02T14:20:00.000Z" },
];

function getAuditLog() {
  const stored = localStorage.getItem("auditLog");
  if (stored) {
    const parsed = JSON.parse(stored);
    return parsed.length > 0 ? parsed : SEED_AUDIT;
  }
  localStorage.setItem("auditLog", JSON.stringify(SEED_AUDIT));
  return SEED_AUDIT;
}

export default function AuditHistory() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const role = users.find((u) => u.username === username)?.role || null;

  const [log, setLog] = useState(getAuditLog);
  const [actionFilter, setActionFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLog(getAuditLog());
  }, []);

  const uniqueUsers = ["All", ...new Set(log.map((e) => e.user))];
  const allActions = ["All", ...Object.keys(ACTION_CONFIG)];

  const filtered = log.filter((e) => {
    const matchAction = actionFilter === "All" || e.action === actionFilter;
    const matchUser = userFilter === "All" || e.user === userFilter;
    const matchSearch = !search || e.detail.toLowerCase().includes(search.toLowerCase()) || e.user.toLowerCase().includes(search.toLowerCase()) || e.action.toLowerCase().includes(search.toLowerCase());
    return matchAction && matchUser && matchSearch;
  });

  const handleClear = () => {
    if (window.confirm("Clear entire audit log? This cannot be undone.")) {
      localStorage.setItem("auditLog", JSON.stringify([]));
      setLog([]);
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="access-denied">
            <div className="access-icon">🔒</div>
            <div className="access-title">Login Required</div>
            <div className="access-desc">Please log in to view audit history.</div>
            <button className="btn-primary" style={{ marginTop: 20, width: "auto", padding: "12px 32px" }} onClick={() => navigate("/login")}>Go to Login</button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (role !== "admin") {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="access-denied">
            <div className="access-icon">⛔</div>
            <div className="access-title">Admin Access Only</div>
            <div className="access-desc">Only <strong>Admins</strong> can view the full audit history.</div>
            <button className="btn-primary" style={{ marginTop: 20, width: "auto", padding: "12px 32px" }} onClick={() => navigate("/")}>Back to Home</button>
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
        <div className="page-hero">
          <div className="page-hero-inner">
            <div className="page-breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-sep">›</span>
              <span>Audit History</span>
            </div>
            <h1 className="page-title">Audit History</h1>
            <p className="page-desc">Timestamped log of all changes made across the portal by all users.</p>
          </div>
          <div className="page-hero-actions">
            <span className="filter-count">{filtered.length} entries</span>
            {role === "admin" && log.length > 0 && (
              <button className="btn-secondary" style={{ padding: "10px 20px" }} onClick={handleClear}>🗑 Clear Log</button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="section-inner" style={{ paddingBottom: 0 }}>
          <div className="filter-bar">
            <input className="form-input filter-search" type="text" placeholder="🔍  Search log entries..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <select className="form-input filter-select" value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}>
              {allActions.map((a) => <option key={a}>{a}</option>)}
            </select>
            <select className="form-input filter-select" value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
              {uniqueUsers.map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>

        {/* Log Table */}
        <div className="section-inner table-wrapper">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🕘</div>
              <div className="empty-title">No audit entries found</div>
              <div className="empty-desc">No changes match your current filters.</div>
            </div>
          ) : (
            <>
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Action</th>
                    <th>Detail</th>
                    <th>User</th>
                    <th>Date &amp; Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((entry, i) => {
                    const cfg = ACTION_CONFIG[entry.action] || { color: "#6b7c93", bg: "#f8f9fc", border: "#dde3ec", icon: "•" };
                    const d = new Date(entry.at);
                    return (
                      <tr key={entry.id}>
                        <td className="td-num">{i + 1}</td>
                        <td>
                          <span className="type-badge" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                            {cfg.icon} {entry.action}
                          </span>
                        </td>
                        <td className="td-name">{entry.detail}</td>
                        <td style={{ fontWeight: 600, color: "var(--navy)", fontSize: 13 }}>👤 {entry.user}</td>
                        <td className="td-date">
                          {d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          <span style={{ color: "var(--muted)", marginLeft: 6, fontSize: 12 }}>
                            {d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="table-footer">
                Showing <strong>{filtered.length}</strong> of <strong>{log.length}</strong> total audit entries
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
