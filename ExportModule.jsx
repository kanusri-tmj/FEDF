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

// ── CSV Export ─────────────────────────────────────────────────
function exportCSV(holidays, filename = "nationalbank_holidays_2026.csv") {
  const headers = ["#", "Holiday Name", "Date", "Day", "Type", "State / Scope", "Description"];
  const rows = holidays.map((h, i) => {
    const d = new Date(h.date);
    return [
      i + 1,
      `"${h.name}"`,
      d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      d.toLocaleDateString("en-IN", { weekday: "long" }),
      h.type,
      h.state || "National",
      `"${h.description || ""}"`,
    ];
  });
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  downloadBlob(csv, filename, "text/csv");
}

// ── iCal Export ────────────────────────────────────────────────
function exportICal(holidays, filename = "nationalbank_holidays_2026.ics") {
  const escape = (s) => (s || "").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
  const formatDate = (dateStr) => dateStr.replace(/-/g, "");

  const events = holidays.map((h) => {
    const uid = `holiday-${h.id}@nationalbank.in`;
    return [
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTART;VALUE=DATE:${formatDate(h.date)}`,
      `DTEND;VALUE=DATE:${formatDate(h.date)}`,
      `SUMMARY:${escape(h.name)}`,
      `DESCRIPTION:${escape(h.description || h.type)}`,
      `CATEGORIES:${escape(h.type)}`,
      "END:VEVENT",
    ].join("\r\n");
  });

  const ical = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NationalBank//Holiday Calendar 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:NationalBank Holidays 2026",
    "X-WR-TIMEZONE:Asia/Kolkata",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");

  downloadBlob(ical, filename, "text/calendar");
}

// ── Simple HTML → PDF-friendly Print ──────────────────────────
function exportPDF(holidays) {
  const rows = holidays.map((h, i) => {
    const d = new Date(h.date);
    return `<tr>
      <td>${i + 1}</td>
      <td>${h.name}</td>
      <td>${d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
      <td>${d.toLocaleDateString("en-IN", { weekday: "short" })}</td>
      <td>${h.type}</td>
      <td>${h.state || "National"}</td>
    </tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>NationalBank Holidays 2026</title>
<style>
  body { font-family: Arial, sans-serif; margin: 40px; color: #1a2332; }
  h1 { font-size: 22px; margin-bottom: 4px; }
  p { color: #6b7c93; font-size: 13px; margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { background: #0a1628; color: white; padding: 10px 12px; text-align: left; }
  td { padding: 9px 12px; border-bottom: 1px solid #e8ecf2; }
  tr:nth-child(even) td { background: #f8f9fc; }
  @media print { body { margin: 20px; } }
</style></head><body>
<h1>🏛️ NationalBank Holiday Calendar 2026</h1>
<p>Generated on ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })} · ${holidays.length} holidays</p>
<table>
  <thead><tr><th>#</th><th>Holiday</th><th>Date</th><th>Day</th><th>Type</th><th>State</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
</body></html>`;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const EXPORT_FORMATS = [
  {
    id: "csv",
    icon: "📊",
    title: "CSV Spreadsheet",
    desc: "Download as a comma-separated file — open in Excel, Google Sheets, or any spreadsheet app.",
    badge: "Universal",
    badgeColor: "#16a34a",
  },
  {
    id: "pdf",
    icon: "📄",
    title: "PDF / Print",
    desc: "Opens a print-ready view in a new tab. Use your browser's Print to PDF option to save.",
    badge: "Print-Ready",
    badgeColor: "#dc2626",
  },
  {
    id: "ical",
    icon: "📅",
    title: "iCal / .ics File",
    desc: "Import directly into Google Calendar, Apple Calendar, Outlook, or any calendar app.",
    badge: "Calendar Sync",
    badgeColor: "#2563eb",
  },
];

export default function ExportModule() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [stateFilter, setStateFilter] = useState("All States");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [exporting, setExporting] = useState(null);
  const [done, setDone] = useState(null);

  const allHolidays = JSON.parse(localStorage.getItem("holidays")) || [];

  const filteredHolidays = allHolidays.filter((h) => {
    const matchState = stateFilter === "All States" || h.state === stateFilter || h.state === "All States";
    const matchType = typeFilter === "All Types" || h.type === typeFilter;
    return matchState && matchType;
  });

  const ALL_INDIA_STATES = [
    "All States",
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Chandigarh (UT)", "Delhi", "Puducherry (UT)",
  ];

  const uniqueStates = ALL_INDIA_STATES;
  const uniqueTypes = ["All Types", "National Holiday", "Bank Holiday", "Restricted Holiday", "Regional Holiday", "State Holiday"];

  const handleExport = (format) => {
    setExporting(format);
    setTimeout(() => {
      if (format === "csv") exportCSV(filteredHolidays);
      else if (format === "ical") exportICal(filteredHolidays);
      else if (format === "pdf") exportPDF(filteredHolidays);
      setExporting(null);
      setDone(format);
      setTimeout(() => setDone(null), 3000);
    }, 600);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="page-content">
          <div className="access-denied">
            <div className="access-icon">🔒</div>
            <div className="access-title">Login Required</div>
            <div className="access-desc">Please log in to export holiday data.</div>
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
              <span>Export</span>
            </div>
            <h1 className="page-title">Export Calendar Data</h1>
            <p className="page-desc">Download holiday data as CSV, PDF, or sync with your calendar using iCal.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="section-inner" style={{ paddingBottom: 0 }}>
          <div className="form-card" style={{ maxWidth: 640 }}>
            <div className="form-card-title" style={{ marginBottom: 20 }}>Export Filters</div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">State / Region</label>
                <select className="form-input" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
                  {uniqueStates.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Holiday Type</label>
                <select className="form-input" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  {uniqueTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="export-summary">
              📋 <strong>{filteredHolidays.length}</strong> holiday{filteredHolidays.length !== 1 ? "s" : ""} selected for export
              {stateFilter !== "All States" && <> · State: <strong>{stateFilter}</strong></>}
              {typeFilter !== "All Types" && <> · Type: <strong>{typeFilter}</strong></>}
            </div>
          </div>
        </div>

        {/* Export Format Cards */}
        <div className="section-inner">
          <div className="export-formats-grid">
            {EXPORT_FORMATS.map((fmt) => (
              <div className="export-format-card" key={fmt.id}>
                <div className="export-format-icon">{fmt.icon}</div>
                <div className="export-format-title">{fmt.title}</div>
                <div className="export-format-desc">{fmt.desc}</div>
                <div style={{ marginBottom: 16 }}>
                  <span className="type-badge" style={{ background: "#f0f4fa", color: fmt.badgeColor, border: `1px solid ${fmt.badgeColor}33` }}>{fmt.badge}</span>
                </div>
                {done === fmt.id ? (
                  <div className="form-alert success" style={{ marginBottom: 0 }}>✓ Download started!</div>
                ) : (
                  <button
                    className="btn-primary"
                    style={{ marginTop: 0 }}
                    disabled={exporting === fmt.id || filteredHolidays.length === 0}
                    onClick={() => handleExport(fmt.id)}
                  >
                    {exporting === fmt.id ? "⏳ Preparing..." : `Download ${fmt.title} →`}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
