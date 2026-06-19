import { useNavigate, Link } from "react-router-dom";

// ── HeroSection ──────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">🏛️ Bank Operations Portal</div>
        <h1 className="hero-title">
          Bank Holiday &amp;<br />
          <span>Service Calendar</span>
        </h1>

      </div>
    </section>
  );
}

// ── Modules ──────────────────────────────────────────────────
const MODULE_FEATURED = { icon: "📅", name: "Holiday List", desc: "View all scheduled bank holidays by region and year — filter by state, type, and month", path: "/holidays" };

const MODULE_ROW2 = [
  { icon: "➕", name: "Add Holiday", desc: "Admin form to add new holidays with type and region", path: "/add-holiday" },
  { icon: "⚠️", name: "Service Downtime", desc: "Schedule and track planned system maintenance windows", path: "/downtime" },
  { icon: "🏦", name: "Branch Hours", desc: "Manage branch-wise operational hours and exceptions", path: "/branch-hours" },
  { icon: "🕘", name: "History", desc: "Audit trail of all past holidays and schedule changes", path: "/history" },
];

const MODULE_ROW3 = [
  { icon: "📤", name: "Export", desc: "Download calendar data as CSV, PDF, or iCal", path: "/export" },
  { icon: "📣", name: "Notification Center", desc: "Compose and send SMS/email alerts for holidays and maintenance", path: "/notifications" },
  { icon: "🛡️", name: "Admin Panel", desc: "Role-based access control and system configuration", path: "/admin" },
];

function Modules() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate(path);
    } else {
      alert("Please login to access this module.");
      navigate("/login");
    }
  };

  return (
    <section className="section">
      <div className="gold-line" />
      <h2 className="section-title">Portal Modules</h2>
      <p className="section-sub">All functional modules — click to navigate</p>

      {/* Row 1 — Featured: Holiday List */}
      <div className="modules-featured" onClick={() => handleClick(MODULE_FEATURED.path)}>
        <div className="module-icon" style={{ fontSize: 48 }}>{MODULE_FEATURED.icon}</div>
        <div className="module-name" style={{ fontSize: 22 }}>{MODULE_FEATURED.name}</div>
        <div className="module-desc" style={{ fontSize: 15, maxWidth: 500 }}>{MODULE_FEATURED.desc}</div>
      </div>

      {/* Row 2 — 4 modules */}
      <div className="modules-grid modules-grid-4">
        {MODULE_ROW2.map((m) => (
          <div className="module-card" key={m.name} onClick={() => handleClick(m.path)}>
            <div className="module-icon">{m.icon}</div>
            <div className="module-name">{m.name}</div>
            <div className="module-desc">{m.desc}</div>
          </div>
        ))}
      </div>

      {/* Row 3 — 3 modules */}
      <div className="modules-grid modules-grid-3">
        {MODULE_ROW3.map((m) => (
          <div className="module-card" key={m.name} onClick={() => handleClick(m.path)}>
            <div className="module-icon">{m.icon}</div>
            <div className="module-name">{m.name}</div>
            <div className="module-desc">{m.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Highlights ───────────────────────────────────────────────
const HIGHLIGHTS = [
  { icon: "🏆", title: "High Quality Data", desc: "Accurate, verified holiday and service data updated in real-time" },
  { icon: "⚡", title: "Instant Alerts", desc: "Automated SMS & email notifications sent to customers instantly" },
  { icon: "🗺️", title: "Region Coverage", desc: "State-wise and national holiday management across all regions" },
  { icon: "🔒", title: "Secure Access", desc: "Role-based login with Admin, Editor, and Viewer access levels" },
  { icon: "📤", title: "Easy Export", desc: "Download as CSV, PDF, or sync directly with iCal calendars" },
  { icon: "🕘", title: "Full Audit Trail", desc: "Complete history of all changes with timestamps and user info" },
];

function Highlights() {
  return (
    <section className="highlights">
      <div className="gold-line" />
      <h2 className="section-title" style={{ color: "white" }}>
        Why Choose Our Portal?
      </h2>
      <p className="section-sub" style={{ color: "rgba(255,255,255,0.5)" }}>
        Built for bank operations teams who need reliability and speed
      </p>
      <div className="highlights-grid">
        {HIGHLIGHTS.map((h) => (
          <div className="highlight-card" key={h.title}>
            <div className="highlight-icon">{h.icon}</div>
            <div className="highlight-title">{h.title}</div>
            <div className="highlight-desc">{h.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Header ───────────────────────────────────────────────────
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

// ── Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <p>© 2026 <span>NationalBank</span> · Bank Holiday &amp; Service Calendar · All Rights Reserved.</p>
    </footer>
  );
}

// ── Home (default export) ─────────────────────────────────────
function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <Modules />
      <Highlights />
      <Footer />
    </>
  );
}

export default Home;
