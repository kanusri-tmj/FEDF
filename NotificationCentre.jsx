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

const CHANNEL_CONFIG = {
  SMS:   { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", icon: "📱" },
  Email: { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", icon: "✉️" },
  Both:  { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", icon: "📣" },
};

const STATUS_CONFIG = {
  Sent:    { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  Draft:   { color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  Pending: { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
};

const TEMPLATES = [
  {
    label: "Holiday Closure",
    subject: "Branch Closure Notice — [Holiday Name]",
    body: "Dear Customer,\n\nPlease be informed that all NationalBank branches will remain closed on [Date] on account of [Holiday Name].\n\nFor urgent banking needs, our 24×7 digital services — Internet Banking, Mobile App, and ATMs — remain fully operational.\n\nWe apologise for any inconvenience caused.\n\nWarm regards,\nNationalBank Customer Services",
  },
  {
    label: "System Maintenance",
    subject: "Scheduled Maintenance — [System Name]",
    body: "Dear Customer,\n\nOur [System Name] will undergo scheduled maintenance on [Date] from [Start Time] to [End Time].\n\nDuring this window, the service will be temporarily unavailable. We recommend completing any pending transactions before the maintenance period begins.\n\nThank you for your patience.\n\nWarm regards,\nNationalBank IT Operations",
  },
  {
    label: "Branch Hours Change",
    subject: "Updated Branch Hours — [Branch Name]",
    body: "Dear Customer,\n\nPlease note that the operational hours for NationalBank [Branch Name] have been revised effective [Date].\n\nNew Hours: [Day] — [Open Time] to [Close Time]\n\nFor the full updated schedule, please visit our website or contact our helpline at 1800-XXX-XXXX.\n\nWarm regards,\nNationalBank Branch Administration",
  },
];

const SEED_NOTIFICATIONS = [
  {
    id: 1,
    subject: "Branch Closure Notice — Independence Day",
    body: "Dear Customer,\n\nAll NationalBank branches will remain closed on August 15, 2026 on account of Independence Day.\n\nOur digital services remain available 24×7.\n\nWarm regards,\nNationalBank Customer Services",
    channel: "Both",
    audience: "All Customers",
    status: "Sent",
    sentBy: "admin",
    sentAt: "2026-08-01T10:00:00.000Z",
  },
  {
    id: 2,
    subject: "Scheduled Maintenance — Core Banking System",
    body: "Our Core Banking System will undergo maintenance on June 15, 2026 from 02:00 to 05:00 AM.",
    channel: "SMS",
    audience: "All Customers",
    status: "Sent",
    sentBy: "admin",
    sentAt: "2026-06-01T09:30:00.000Z",
  },
];

function getNotifications() {
  const stored = localStorage.getItem("notifications");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("notifications", JSON.stringify(SEED_NOTIFICATIONS));
  return SEED_NOTIFICATIONS;
}

function saveNotifications(data) {
  localStorage.setItem("notifications", JSON.stringify(data));
}

export default function NotificationCentre() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const role = users.find((u) => u.username === username)?.role || null;
  const canManage = role === "admin";

  const [notifications, setNotifications] = useState(getNotifications);
  const [showCompose, setShowCompose] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [form, setForm] = useState({ subject: "", body: "", channel: "Both", audience: "All Customers" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const applyTemplate = (t) => {
    setForm((prev) => ({ ...prev, subject: t.subject, body: t.body }));
    setActiveTemplate(t.label);
  };

  const handleSend = (asDraft = false) => {
    setError("");
    if (!form.subject.trim() || !form.body.trim()) {
      setError("Subject and message body are required.");
      return;
    }
    const entry = {
      id: Date.now(),
      ...form,
      status: asDraft ? "Draft" : "Sent",
      sentBy: username,
      sentAt: new Date().toISOString(),
    };
    const updated = [entry, ...notifications];
    setNotifications(updated);
    saveNotifications(updated);
    const audit = JSON.parse(localStorage.getItem("auditLog")) || [];
    audit.unshift({ id: Date.now(), action: asDraft ? "Saved Notification Draft" : "Sent Notification", detail: form.subject, user: username, at: new Date().toISOString() });
    localStorage.setItem("auditLog", JSON.stringify(audit));
    setSuccess(asDraft ? "Draft saved." : "Notification sent successfully!");
    setForm({ subject: "", body: "", channel: "Both", audience: "All Customers" });
    setShowCompose(false);
    setActiveTemplate(null);
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDelete = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    saveNotifications(updated);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="access-denied">
            <div className="access-icon">🔒</div>
            <div className="access-title">Login Required</div>
            <div className="access-desc">Please log in to access the notification centre.</div>
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
        <div className="page-hero">
          <div className="page-hero-inner">
            <div className="page-breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-sep">›</span>
              <span>Notifications</span>
            </div>
            <h1 className="page-title">Notification Centre</h1>
            <p className="page-desc">Compose and send SMS / email alerts for holidays, downtime, and branch updates.</p>
          </div>
          {canManage && (
            <div className="page-hero-actions">
              <button className="btn-primary" style={{ width: "auto", padding: "12px 28px", marginTop: 0 }} onClick={() => setShowCompose(!showCompose)}>
                {showCompose ? "✕ Close" : "✉️ Compose Alert"}
              </button>
            </div>
          )}
        </div>

        {success && <div className="section-inner"><div className="form-alert success">✓ {success}</div></div>}

        {/* Compose Panel */}
        {showCompose && canManage && (
          <div className="section-inner">
            <div className="form-card" style={{ maxWidth: "100%" }}>
              <div className="form-card-header">
                <div className="form-card-title">Compose Alert</div>
                <div className="form-card-badge">📣 {role}</div>
              </div>

              {/* Templates */}
              <div style={{ marginBottom: 24 }}>
                <div className="form-label" style={{ marginBottom: 10 }}>Quick Templates</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.label}
                      className={`state-btn${activeTemplate === t.label ? " active" : ""}`}
                      onClick={() => applyTemplate(t)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && <div className="form-alert danger">⚠ {error}</div>}

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Channel</label>
                  <select className="form-input" name="channel" value={form.channel} onChange={handleChange}>
                    <option>Both</option>
                    <option>SMS</option>
                    <option>Email</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Audience</label>
                  <select className="form-input" name="audience" value={form.audience} onChange={handleChange}>
                    <option>All Customers</option>
                    <option>Business Accounts</option>
                    <option>Retail Customers</option>
                    <option>Loan Customers</option>
                    <option>Priority Banking</option>
                  </select>
                </div>
                <div className="form-group form-full">
                  <label className="form-label">Subject / Headline</label>
                  <input className="form-input" type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Branch Closure Notice — Independence Day" />
                </div>
                <div className="form-group form-full">
                  <label className="form-label">Message Body</label>
                  <textarea className="form-input" name="body" rows={7} value={form.body} onChange={handleChange} placeholder="Type your message here..." style={{ resize: "vertical" }} />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setShowCompose(false)}>Cancel</button>
                <button className="btn-secondary" onClick={() => handleSend(true)}>💾 Save Draft</button>
                <button className="btn-primary form-submit-btn" onClick={() => handleSend(false)}>📤 Send Now →</button>
              </div>
            </div>
          </div>
        )}

        {/* Notification History */}
        <div className="section-inner">
          <div className="form-card-title" style={{ marginBottom: 16 }}>Sent &amp; Drafted Alerts</div>
          {notifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔔</div>
              <div className="empty-title">No notifications yet</div>
              <div className="empty-desc">Compose an alert to notify customers about holidays or maintenance.</div>
            </div>
          ) : (
            <div className="notif-list">
              {notifications.map((n) => {
                const chCfg = CHANNEL_CONFIG[n.channel] || CHANNEL_CONFIG.Both;
                const stCfg = STATUS_CONFIG[n.status] || STATUS_CONFIG.Draft;
                return (
                  <div className="notif-card" key={n.id}>
                    {preview === n.id ? (
                      <div className="notif-preview">
                        <div className="notif-preview-subject">{n.subject}</div>
                        <pre className="notif-preview-body">{n.body}</pre>
                        <button className="action-btn edit" style={{ marginTop: 12 }} onClick={() => setPreview(null)}>✕ Close Preview</button>
                      </div>
                    ) : (
                      <>
                        <div className="notif-card-left">
                          <div className="notif-subject">{n.subject}</div>
                          <div className="notif-meta">
                            <span style={{ color: chCfg.color }}>{chCfg.icon} {n.channel}</span>
                            &nbsp;·&nbsp; 👥 {n.audience}
                            &nbsp;·&nbsp; By <strong>{n.sentBy}</strong>
                            &nbsp;·&nbsp; {new Date(n.sentAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </div>
                        </div>
                        <div className="notif-card-right">
                          <span className="type-badge" style={{ background: stCfg.bg, color: stCfg.color, border: `1px solid ${stCfg.border}` }}>{n.status}</span>
                          <button className="action-btn edit" onClick={() => setPreview(n.id)}>👁 Preview</button>
                          {canManage && <button className="action-btn delete" onClick={() => handleDelete(n.id)}>🗑</button>}
                        </div>
                      </>
                    )}
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
