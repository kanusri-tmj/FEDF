import { useState } from "react";
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

const ROLE_CONFIG = {
  admin: { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", label: "🛡️ Admin" },
  user:  { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", label: "👤 User" },
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUsername = localStorage.getItem("username");

  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || []);
  const currentRole = users.find((u) => u.username === currentUsername)?.role || null;

  const [editId, setEditId] = useState(null);
  const [editRole, setEditRole] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const saveUsers = (data) => {
    setUsers(data);
    localStorage.setItem("users", JSON.stringify(data));
  };

  const handleRoleSave = (username) => {
    const updated = users.map((u) => u.username === username ? { ...u, role: editRole } : u);
    saveUsers(updated);
    const audit = JSON.parse(localStorage.getItem("auditLog")) || [];
    audit.unshift({ id: Date.now(), action: "Role Changed", detail: `${username} → ${editRole}`, user: currentUsername, at: new Date().toISOString() });
    localStorage.setItem("auditLog", JSON.stringify(audit));
    setEditId(null);
    setSuccess(`Role updated for ${username} → ${editRole}`);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDeleteUser = (username) => {
    if (username === currentUsername) {
      alert("You cannot delete your own account.");
      return;
    }
    if (!window.confirm(`Delete user "${username}"? This cannot be undone.`)) return;
    const updated = users.filter((u) => u.username !== username);
    saveUsers(updated);
    setSuccess(`User "${username}" deleted.`);
    setTimeout(() => setSuccess(""), 3000);
  };

  const filtered = users.filter((u) => {
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchSearch = u.username.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  const roleCounts = { admin: 0, user: 0 };
  users.forEach((u) => { if (roleCounts[u.role] !== undefined) roleCounts[u.role]++; });

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="access-denied">
            <div className="access-icon">🔒</div>
            <div className="access-title">Login Required</div>
            <div className="access-desc">Please log in to access the admin panel.</div>
            <button className="btn-primary" style={{ marginTop: 20, width: "auto", padding: "12px 32px" }} onClick={() => navigate("/login")}>Go to Login</button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (currentRole !== "admin") {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="access-denied">
            <div className="access-icon">⛔</div>
            <div className="access-title">Admin Access Only</div>
            <div className="access-desc">Only <strong>Admins</strong> can access the Admin Panel.</div>
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
              <span>Admin Panel</span>
            </div>
            <h1 className="page-title">Admin Panel</h1>
            <p className="page-desc">Manage user accounts and role-based access control across the portal.</p>
          </div>
        </div>

        {success && <div className="section-inner"><div className="form-alert success">✓ {success}</div></div>}

        {/* Role Stats */}
        <div className="section-inner" style={{ paddingBottom: 0 }}>
          <div className="stats-row">
            {[["All", users.length, { color: "#0a1628", bg: "#f0f4fa", border: "#dde3ec" }],
              ["admin", roleCounts.admin, ROLE_CONFIG.admin],
              ["user", roleCounts.user, ROLE_CONFIG.user],
            ].map(([r, count, cfg]) => (
              <button
                key={r}
                className={`stat-filter-btn${roleFilter === r ? " active" : ""}`}
                style={roleFilter === r ? { background: cfg.color, color: "white", borderColor: cfg.color } : {}}
                onClick={() => setRoleFilter(r)}
              >
                <span className="stat-filter-count">{count}</span>
                <span className="stat-filter-label">{r === "All" ? "Total Users" : r.charAt(0).toUpperCase() + r.slice(1) + "s"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="section-inner" style={{ paddingBottom: 0, paddingTop: 12 }}>
          <div className="filter-bar">
            <input className="form-input filter-search" type="text" placeholder="🔍  Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="filter-count">{filtered.length} user{filtered.length !== 1 ? "s" : ""}</div>
          </div>
        </div>

        {/* User Table */}
        <div className="section-inner table-wrapper">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👤</div>
              <div className="empty-title">No users found</div>
              <div className="empty-desc">Try adjusting your search or filter.</div>
            </div>
          ) : (
            <>
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => {
                    const cfg = ROLE_CONFIG[u.role] || ROLE_CONFIG.viewer;
                    const isCurrentUser = u.username === currentUsername;
                    return (
                      <tr key={u.username}>
                        <td className="td-num">{i + 1}</td>
                        <td className="td-name">
                          👤 {u.username}
                          {isCurrentUser && <span className="type-badge" style={{ marginLeft: 8, background: "#f0f4fa", color: "#0a1628", border: "1px solid #dde3ec", fontSize: 11 }}>You</span>}
                        </td>
                        <td>
                          {editId === u.username ? (
                            <select
                              className="form-input"
                              value={editRole}
                              onChange={(e) => setEditRole(e.target.value)}
                              style={{ width: 140, padding: "6px 10px" }}
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          ) : (
                            <span className="type-badge" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                              {cfg.label}
                            </span>
                          )}
                        </td>
                        <td>
                          <span className="type-badge" style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}>
                            ● Active
                          </span>
                        </td>
                        <td className="td-actions">
                          {editId === u.username ? (
                            <>
                              <button className="action-btn edit" onClick={() => handleRoleSave(u.username)}>✓ Save</button>
                              <button className="action-btn" onClick={() => setEditId(null)}>✕</button>
                            </>
                          ) : (
                            <>
                              {!isCurrentUser && (
                                <>
                                  <button className="action-btn edit" onClick={() => { setEditId(u.username); setEditRole(u.role); }}>✏️ Edit Role</button>
                                  <button className="action-btn delete" onClick={() => handleDeleteUser(u.username)}>🗑</button>
                                </>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="table-footer">
                {users.length} registered user{users.length !== 1 ? "s" : ""} · {roleCounts.admin} admin · {roleCounts.user} user
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
