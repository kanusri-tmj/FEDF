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

// ── Shared Footer ─────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <p>© 2026 <span>NationalBank</span> · Bank Holiday &amp; Service Calendar · All Rights Reserved.</p>
    </footer>
  );
}

// ── Holiday type color config ─────────────────────────────────
const TYPE_CONFIG = {
  "National Holiday":    { color: "#ef4444", bg: "#fef2f2", border: "#fecaca", label: "National Holiday" },
  "Bank Holiday":        { color: "#dc2626", bg: "#fff1f1", border: "#fca5a5", label: "Bank Holiday" },
  "Restricted Holiday":  { color: "#f97316", bg: "#fff7ed", border: "#fed7aa", label: "Restricted Holiday" },
  "Regional Holiday":    { color: "#eab308", bg: "#fefce8", border: "#fde68a", label: "Regional Holiday" },
  "State Holiday":       { color: "#22c55e", bg: "#f0fdf4", border: "#bbf7d0", label: "State Holiday" },
};

// ── India States ──────────────────────────────────────────────
const INDIA_STATES = [
  "All States",
  "Andhra Pradesh", "Assam", "Bihar", "Chandigarh (UT)", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Meghalaya", "Odisha", "Puducherry (UT)", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "West Bengal",
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// ── Complete 2026 State-wise Holiday Data ─────────────────────
function getSeedData() {
  // id, name, date, type, state, description
  // National holidays apply to all states
  const national = [
    { name: "Republic Day",       date: "2026-01-26", type: "National Holiday",  state: "All States",       description: "India's Republic Day — observed nationwide" },
    { name: "Independence Day",   date: "2026-08-15", type: "National Holiday",  state: "All States",       description: "India's Independence Day — observed nationwide" },
    { name: "Gandhi Jayanti",     date: "2026-10-02", type: "National Holiday",  state: "All States",       description: "Birth anniversary of Mahatma Gandhi" },
  ];

  // State-specific holidays sourced from RBI / bankcliq 2026
  const stateHolidays = [
    // ── Andhra Pradesh ──
    { name: "Makara Sankranti",         date: "2026-01-14", type: "Regional Holiday",   state: "Andhra Pradesh",    description: "Harvest festival / Uttarayana" },
    { name: "Mahashivratri",            date: "2026-02-15", type: "Regional Holiday",   state: "Andhra Pradesh",    description: "Festival of Shiva" },
    { name: "Holi",                     date: "2026-03-04", type: "Regional Holiday",   state: "Andhra Pradesh",    description: "Festival of colours" },
    { name: "Eid al-Fitr",             date: "2026-03-20", type: "Bank Holiday",        state: "Andhra Pradesh",    description: "End of Ramadan" },
    { name: "Good Friday",             date: "2026-04-03", type: "Bank Holiday",        state: "Andhra Pradesh",    description: "Christian observance" },
    { name: "Dr. Ambedkar Jayanti / Ugadi", date: "2026-04-14", type: "Regional Holiday", state: "Andhra Pradesh", description: "Ambedkar Jayanti & Telugu New Year (Ugadi)" },
    { name: "Labour Day",              date: "2026-05-01", type: "Regional Holiday",   state: "Andhra Pradesh",    description: "International Workers' Day" },
    { name: "Bakri Eid (Eid ul-Adha)", date: "2026-05-27", type: "Bank Holiday",        state: "Andhra Pradesh",    description: "Festival of sacrifice" },
    { name: "Eid-e-Milad",            date: "2026-08-25", type: "Bank Holiday",        state: "Andhra Pradesh",    description: "Prophet Mohammed's birthday" },
    { name: "Janmashtami",             date: "2026-09-04", type: "Regional Holiday",   state: "Andhra Pradesh",    description: "Birth of Lord Krishna" },
    { name: "Ganesh Chaturthi",        date: "2026-09-14", type: "Regional Holiday",   state: "Andhra Pradesh",    description: "Festival of Ganesha" },
    { name: "Christmas Day",           date: "2026-12-25", type: "Bank Holiday",        state: "Andhra Pradesh",    description: "Christmas" },

    // ── Assam ──
    { name: "Makara Sankranti / Magha Bihu", date: "2026-01-14", type: "Regional Holiday", state: "Assam",          description: "Harvest festival of Assam" },
    { name: "Holi / Doljatra",         date: "2026-03-04", type: "Regional Holiday",   state: "Assam",             description: "Doljatra — Assam's version of Holi" },
    { name: "Eid al-Fitr",            date: "2026-03-20", type: "Bank Holiday",        state: "Assam",             description: "End of Ramadan" },
    { name: "Bohag Bihu / Ambedkar Jayanti", date: "2026-04-14", type: "Regional Holiday", state: "Assam",         description: "Bohag Bihu — Assamese New Year" },
    { name: "Bohag Bihu (2nd day)",    date: "2026-04-15", type: "Regional Holiday",   state: "Assam",             description: "Second day of Bohag Bihu celebrations" },
    { name: "Labour Day",              date: "2026-05-01", type: "Regional Holiday",   state: "Assam",             description: "International Workers' Day" },
    { name: "Bakri Eid",              date: "2026-05-27", type: "Bank Holiday",        state: "Assam",             description: "Festival of sacrifice" },
    { name: "Tirubhav Tithi of Srimanta Sankardeva", date: "2026-08-25", type: "State Holiday", state: "Assam",    description: "Commemorates the passing of saint Srimanta Sankardeva" },
    { name: "Durga Puja / Maha Ashtami", date: "2026-10-19", type: "Regional Holiday", state: "Assam",            description: "Durga Puja — most important festival in Assam" },
    { name: "Dussehra / Vijaya Dashami", date: "2026-10-20", type: "Regional Holiday", state: "Assam",            description: "Victory of Goddess Durga over Mahishasura" },
    { name: "Christmas Day",           date: "2026-12-25", type: "Bank Holiday",        state: "Assam",             description: "Christmas" },

    // ── Bihar ──
    { name: "Holi",                    date: "2026-03-04", type: "Regional Holiday",   state: "Bihar",             description: "Festival of colours" },
    { name: "Eid al-Fitr",            date: "2026-03-20", type: "Bank Holiday",        state: "Bihar",             description: "End of Ramadan" },
    { name: "Good Friday",            date: "2026-04-03", type: "Bank Holiday",        state: "Bihar",             description: "Christian observance" },
    { name: "Dr. Ambedkar Jayanti",   date: "2026-04-14", type: "Regional Holiday",   state: "Bihar",             description: "Birth anniversary of Dr. B. R. Ambedkar" },
    { name: "Labour Day",             date: "2026-05-01", type: "Regional Holiday",   state: "Bihar",             description: "International Workers' Day" },
    { name: "Bakri Eid",             date: "2026-05-27", type: "Bank Holiday",        state: "Bihar",             description: "Festival of sacrifice" },
    { name: "Janmashtami",            date: "2026-09-04", type: "Regional Holiday",   state: "Bihar",             description: "Birth of Lord Krishna" },
    { name: "Durga Puja / Maha Ashtami", date: "2026-10-19", type: "Regional Holiday", state: "Bihar",            description: "Durga Puja celebrations" },
    { name: "Dussehra",              date: "2026-10-20", type: "Regional Holiday",   state: "Bihar",             description: "Victory of good over evil" },
    { name: "Diwali / Deepawali",    date: "2026-11-10", type: "Bank Holiday",        state: "Bihar",             description: "Festival of lights" },
    { name: "Christmas Day",         date: "2026-12-25", type: "Bank Holiday",        state: "Bihar",             description: "Christmas" },

    // ── Chandigarh (UT) ──
    { name: "Guru Gobind Singh Jayanti", date: "2026-01-06", type: "State Holiday",   state: "Chandigarh (UT)",   description: "Birthday of Sri Guru Gobind Singh Ji" },
    { name: "Mahashivratri",          date: "2026-02-15", type: "Regional Holiday",   state: "Chandigarh (UT)",   description: "Festival of Shiva" },
    { name: "Holi",                   date: "2026-03-04", type: "Regional Holiday",   state: "Chandigarh (UT)",   description: "Festival of colours" },
    { name: "Eid al-Fitr",           date: "2026-03-20", type: "Bank Holiday",        state: "Chandigarh (UT)",   description: "End of Ramadan" },
    { name: "Good Friday",           date: "2026-04-03", type: "Bank Holiday",        state: "Chandigarh (UT)",   description: "Christian observance" },
    { name: "Buddha Purnima",        date: "2026-05-01", type: "Regional Holiday",   state: "Chandigarh (UT)",   description: "Birth of Gautama Buddha" },
    { name: "Bakri Eid",            date: "2026-05-27", type: "Bank Holiday",        state: "Chandigarh (UT)",   description: "Festival of sacrifice" },
    { name: "Janmashtami",           date: "2026-09-04", type: "Regional Holiday",   state: "Chandigarh (UT)",   description: "Birth of Lord Krishna" },
    { name: "Maharishi Valmiki Jayanti", date: "2026-10-26", type: "State Holiday",  state: "Chandigarh (UT)",   description: "Birth anniversary of Maharishi Valmiki" },
    { name: "Guru Nanak Jayanti",    date: "2026-11-24", type: "Regional Holiday",   state: "Chandigarh (UT)",   description: "Birth of Guru Nanak Dev Ji" },
    { name: "Christmas Day",         date: "2026-12-25", type: "Bank Holiday",        state: "Chandigarh (UT)",   description: "Christmas" },

    // ── Chhattisgarh ──
    { name: "Mahashivratri",         date: "2026-02-15", type: "Regional Holiday",   state: "Chhattisgarh",      description: "Festival of Shiva" },
    { name: "Holi",                  date: "2026-03-04", type: "Regional Holiday",   state: "Chhattisgarh",      description: "Festival of colours" },
    { name: "Eid al-Fitr",          date: "2026-03-20", type: "Bank Holiday",        state: "Chhattisgarh",      description: "End of Ramadan" },
    { name: "Mahavir Jayanti",       date: "2026-03-31", type: "Regional Holiday",   state: "Chhattisgarh",      description: "Birth of Lord Mahavir" },
    { name: "Good Friday",          date: "2026-04-03", type: "Bank Holiday",        state: "Chhattisgarh",      description: "Christian observance" },
    { name: "Buddha Purnima",       date: "2026-05-01", type: "Regional Holiday",   state: "Chhattisgarh",      description: "Birth of Gautama Buddha" },
    { name: "Bakri Eid",           date: "2026-05-27", type: "Bank Holiday",        state: "Chhattisgarh",      description: "Festival of sacrifice" },
    { name: "Janmashtami",          date: "2026-09-04", type: "Regional Holiday",   state: "Chhattisgarh",      description: "Birth of Lord Krishna" },
    { name: "Id-e-Milad",          date: "2026-09-26", type: "Bank Holiday",        state: "Chhattisgarh",      description: "Prophet Mohammed's birthday" },
    { name: "Guru Nanak Jayanti",   date: "2026-11-24", type: "Regional Holiday",   state: "Chhattisgarh",      description: "Birth of Guru Nanak Dev Ji" },
    { name: "Christmas Day",        date: "2026-12-25", type: "Bank Holiday",        state: "Chhattisgarh",      description: "Christmas" },

    // ── Delhi ──
    { name: "Holi",                 date: "2026-03-04", type: "Regional Holiday",   state: "Delhi",             description: "Festival of colours" },
    { name: "Eid al-Fitr",         date: "2026-03-20", type: "Bank Holiday",        state: "Delhi",             description: "End of Ramadan" },
    { name: "Mahavir Jayanti",      date: "2026-03-31", type: "Regional Holiday",   state: "Delhi",             description: "Birth of Lord Mahavir" },
    { name: "Good Friday",         date: "2026-04-03", type: "Bank Holiday",        state: "Delhi",             description: "Christian observance" },
    { name: "Ram Navami",          date: "2026-03-26", type: "Regional Holiday",   state: "Delhi",             description: "Birth of Lord Ram" },
    { name: "Buddha Purnima",      date: "2026-05-01", type: "Regional Holiday",   state: "Delhi",             description: "Birth of Gautama Buddha" },
    { name: "Bakri Eid",          date: "2026-05-27", type: "Bank Holiday",        state: "Delhi",             description: "Festival of sacrifice" },
    { name: "Eid-e-Milad",        date: "2026-08-25", type: "Bank Holiday",        state: "Delhi",             description: "Prophet Mohammed's birthday" },
    { name: "Diwali",             date: "2026-11-10", type: "Bank Holiday",        state: "Delhi",             description: "Festival of lights" },
    { name: "Guru Nanak Jayanti",  date: "2026-11-24", type: "Regional Holiday",   state: "Delhi",             description: "Birth of Guru Nanak Dev Ji" },
    { name: "Christmas Day",       date: "2026-12-25", type: "Bank Holiday",        state: "Delhi",             description: "Christmas" },

    // ── Goa ──
    { name: "Holi",                date: "2026-03-04", type: "Regional Holiday",   state: "Goa",               description: "Festival of colours" },
    { name: "Eid al-Fitr",        date: "2026-03-20", type: "Bank Holiday",        state: "Goa",               description: "End of Ramadan" },
    { name: "Good Friday",        date: "2026-04-03", type: "Bank Holiday",        state: "Goa",               description: "Christian observance" },
    { name: "Dr. Ambedkar Jayanti", date: "2026-04-14", type: "Regional Holiday",  state: "Goa",               description: "Birth anniversary of Dr. Ambedkar" },
    { name: "Labour Day",         date: "2026-05-01", type: "Regional Holiday",   state: "Goa",               description: "International Workers' Day" },
    { name: "Bakri Eid",         date: "2026-05-27", type: "Bank Holiday",        state: "Goa",               description: "Festival of sacrifice" },
    { name: "Ganesh Chaturthi",   date: "2026-09-14", type: "Regional Holiday",   state: "Goa",               description: "10-day Ganesh festival — grand in Goa" },
    { name: "Dussehra",          date: "2026-10-20", type: "Regional Holiday",   state: "Goa",               description: "Victory of good over evil" },
    { name: "Diwali",            date: "2026-11-10", type: "Bank Holiday",        state: "Goa",               description: "Festival of lights" },
    { name: "Christmas Day",      date: "2026-12-25", type: "Bank Holiday",        state: "Goa",               description: "Christmas — widely celebrated in Goa" },

    // ── Gujarat ──
    { name: "Uttarayan (Makar Sankranti)", date: "2026-01-14", type: "Regional Holiday", state: "Gujarat",    description: "Kite festival — major celebration in Gujarat" },
    { name: "Mahashivratri",      date: "2026-02-15", type: "Regional Holiday",   state: "Gujarat",           description: "Festival of Shiva" },
    { name: "Dhuleti (Holi)",     date: "2026-03-04", type: "Regional Holiday",   state: "Gujarat",           description: "Holi celebrations in Gujarat" },
    { name: "Eid al-Fitr",       date: "2026-03-20", type: "Bank Holiday",        state: "Gujarat",           description: "End of Ramadan" },
    { name: "Ram Navami",        date: "2026-03-26", type: "Regional Holiday",   state: "Gujarat",           description: "Birth of Lord Ram" },
    { name: "Mahavir Jayanti",   date: "2026-03-31", type: "Regional Holiday",   state: "Gujarat",           description: "Birth of Lord Mahavir — important in Gujarat" },
    { name: "Good Friday",       date: "2026-04-03", type: "Bank Holiday",        state: "Gujarat",           description: "Christian observance" },
    { name: "Labour Day",        date: "2026-05-01", type: "Regional Holiday",   state: "Gujarat",           description: "International Workers' Day" },
    { name: "Bakri Eid",        date: "2026-05-27", type: "Bank Holiday",        state: "Gujarat",           description: "Festival of sacrifice" },
    { name: "Eid-e-Milad",      date: "2026-08-25", type: "Bank Holiday",        state: "Gujarat",           description: "Prophet Mohammed's birthday" },
    { name: "Janmashtami",       date: "2026-09-04", type: "Regional Holiday",   state: "Gujarat",           description: "Birth of Lord Krishna — very grand in Gujarat" },
    { name: "Samvatsari / Paryushana", date: "2026-09-14", type: "Regional Holiday", state: "Gujarat",       description: "Jain festival of Paryushana" },
    { name: "Dussehra",         date: "2026-10-20", type: "Regional Holiday",   state: "Gujarat",           description: "Navratri & Dussehra widely celebrated" },
    { name: "Diwali",           date: "2026-11-10", type: "Bank Holiday",        state: "Gujarat",           description: "Festival of lights & Gujarati New Year" },
    { name: "Vikram Samvat New Year", date: "2026-11-11", type: "State Holiday", state: "Gujarat",           description: "Gujarati New Year (Bestu Varsh)" },
    { name: "Christmas Day",     date: "2026-12-25", type: "Bank Holiday",        state: "Gujarat",           description: "Christmas" },

    // ── Haryana ──
    { name: "Lohri",             date: "2026-01-13", type: "State Holiday",      state: "Haryana",           description: "Harvest festival of Punjab & Haryana" },
    { name: "Mahashivratri",     date: "2026-02-15", type: "Regional Holiday",   state: "Haryana",           description: "Festival of Shiva" },
    { name: "Holi",              date: "2026-03-04", type: "Regional Holiday",   state: "Haryana",           description: "Festival of colours" },
    { name: "Eid al-Fitr",      date: "2026-03-20", type: "Bank Holiday",        state: "Haryana",           description: "End of Ramadan" },
    { name: "Good Friday",      date: "2026-04-03", type: "Bank Holiday",        state: "Haryana",           description: "Christian observance" },
    { name: "Baisakhi",         date: "2026-04-14", type: "Regional Holiday",   state: "Haryana",           description: "Harvest festival" },
    { name: "Buddha Purnima",   date: "2026-05-01", type: "Regional Holiday",   state: "Haryana",           description: "Birth of Gautama Buddha" },
    { name: "Bakri Eid",       date: "2026-05-27", type: "Bank Holiday",        state: "Haryana",           description: "Festival of sacrifice" },
    { name: "Janmashtami",      date: "2026-09-04", type: "Regional Holiday",   state: "Haryana",           description: "Birth of Lord Krishna" },
    { name: "Maharishi Valmiki Jayanti", date: "2026-10-26", type: "State Holiday", state: "Haryana",       description: "Birth anniversary of Maharishi Valmiki" },
    { name: "Diwali",           date: "2026-11-10", type: "Bank Holiday",        state: "Haryana",           description: "Festival of lights" },
    { name: "Guru Nanak Jayanti", date: "2026-11-24", type: "Regional Holiday", state: "Haryana",           description: "Birth of Guru Nanak Dev Ji" },
    { name: "Christmas Day",    date: "2026-12-25", type: "Bank Holiday",        state: "Haryana",           description: "Christmas" },

    // ── Himachal Pradesh ──
    { name: "Lohri",            date: "2026-01-13", type: "State Holiday",      state: "Himachal Pradesh",  description: "Harvest festival" },
    { name: "Mahashivratri",    date: "2026-02-15", type: "Regional Holiday",   state: "Himachal Pradesh",  description: "Festival of Shiva" },
    { name: "Holi",             date: "2026-03-04", type: "Regional Holiday",   state: "Himachal Pradesh",  description: "Festival of colours" },
    { name: "Eid al-Fitr",     date: "2026-03-20", type: "Bank Holiday",        state: "Himachal Pradesh",  description: "End of Ramadan" },
    { name: "Good Friday",     date: "2026-04-03", type: "Bank Holiday",        state: "Himachal Pradesh",  description: "Christian observance" },
    { name: "Himachal Day",    date: "2026-04-15", type: "State Holiday",      state: "Himachal Pradesh",  description: "Himachal Pradesh Foundation Day" },
    { name: "Buddha Purnima",  date: "2026-05-01", type: "Regional Holiday",   state: "Himachal Pradesh",  description: "Birth of Gautama Buddha" },
    { name: "Bakri Eid",      date: "2026-05-27", type: "Bank Holiday",        state: "Himachal Pradesh",  description: "Festival of sacrifice" },
    { name: "Janmashtami",     date: "2026-09-04", type: "Regional Holiday",   state: "Himachal Pradesh",  description: "Birth of Lord Krishna" },
    { name: "Dussehra",       date: "2026-10-20", type: "Regional Holiday",   state: "Himachal Pradesh",  description: "Victory of good over evil" },
    { name: "Diwali",         date: "2026-11-10", type: "Bank Holiday",        state: "Himachal Pradesh",  description: "Festival of lights" },
    { name: "Guru Nanak Jayanti", date: "2026-11-24", type: "Regional Holiday", state: "Himachal Pradesh", description: "Birth of Guru Nanak Dev Ji" },
    { name: "Christmas Day",  date: "2026-12-25", type: "Bank Holiday",        state: "Himachal Pradesh",  description: "Christmas" },

    // ── Jharkhand ──
    { name: "Holi",           date: "2026-03-04", type: "Regional Holiday",   state: "Jharkhand",         description: "Festival of colours" },
    { name: "Eid al-Fitr",   date: "2026-03-20", type: "Bank Holiday",        state: "Jharkhand",         description: "End of Ramadan" },
    { name: "Good Friday",   date: "2026-04-03", type: "Bank Holiday",        state: "Jharkhand",         description: "Christian observance" },
    { name: "Dr. Ambedkar Jayanti", date: "2026-04-14", type: "Regional Holiday", state: "Jharkhand",     description: "Birth anniversary of Dr. Ambedkar" },
    { name: "Labour Day",    date: "2026-05-01", type: "Regional Holiday",   state: "Jharkhand",         description: "International Workers' Day" },
    { name: "Bakri Eid",    date: "2026-05-27", type: "Bank Holiday",        state: "Jharkhand",         description: "Festival of sacrifice" },
    { name: "Janmashtami",   date: "2026-09-04", type: "Regional Holiday",   state: "Jharkhand",         description: "Birth of Lord Krishna" },
    { name: "Dussehra",     date: "2026-10-20", type: "Regional Holiday",   state: "Jharkhand",         description: "Victory of good over evil" },
    { name: "Diwali",       date: "2026-11-10", type: "Bank Holiday",        state: "Jharkhand",         description: "Festival of lights" },
    { name: "Jharkhand Foundation Day", date: "2026-11-15", type: "State Holiday", state: "Jharkhand",   description: "Jharkhand state formation day" },
    { name: "Christmas Day", date: "2026-12-25", type: "Bank Holiday",        state: "Jharkhand",         description: "Christmas" },

    // ── Karnataka ──
    { name: "Makara Sankranti", date: "2026-01-14", type: "Regional Holiday",  state: "Karnataka",         description: "Harvest festival" },
    { name: "Mahashivratri",  date: "2026-02-15", type: "Regional Holiday",   state: "Karnataka",         description: "Festival of Shiva" },
    { name: "Holi",          date: "2026-03-04", type: "Regional Holiday",   state: "Karnataka",         description: "Festival of colours" },
    { name: "Ugadi",         date: "2026-03-30", type: "Regional Holiday",   state: "Karnataka",         description: "Kannada New Year" },
    { name: "Eid al-Fitr",  date: "2026-03-20", type: "Bank Holiday",        state: "Karnataka",         description: "End of Ramadan" },
    { name: "Good Friday",  date: "2026-04-03", type: "Bank Holiday",        state: "Karnataka",         description: "Christian observance" },
    { name: "Dr. Ambedkar Jayanti", date: "2026-04-14", type: "Regional Holiday", state: "Karnataka",    description: "Birth anniversary of Dr. Ambedkar" },
    { name: "Labour Day",   date: "2026-05-01", type: "Regional Holiday",   state: "Karnataka",         description: "International Workers' Day" },
    { name: "Karnataka Rajyotsava", date: "2026-11-01", type: "State Holiday", state: "Karnataka",      description: "Karnataka Formation Day" },
    { name: "Bakri Eid",   date: "2026-05-27", type: "Bank Holiday",        state: "Karnataka",         description: "Festival of sacrifice" },
    { name: "Eid-e-Milad", date: "2026-08-25", type: "Bank Holiday",        state: "Karnataka",         description: "Prophet Mohammed's birthday" },
    { name: "Ganesh Chaturthi", date: "2026-09-14", type: "Regional Holiday", state: "Karnataka",       description: "Festival of Ganesha" },
    { name: "Ayudha Puja / Dussehra", date: "2026-10-20", type: "Regional Holiday", state: "Karnataka", description: "Mysuru Dasara — grand state celebration" },
    { name: "Diwali",      date: "2026-11-10", type: "Bank Holiday",        state: "Karnataka",         description: "Festival of lights" },
    { name: "Christmas Day", date: "2026-12-25", type: "Bank Holiday",      state: "Karnataka",         description: "Christmas" },

    // ── Kerala ──
    { name: "Mannam Jayanti",  date: "2026-01-01", type: "State Holiday",     state: "Kerala",            description: "Birth anniversary of Sree Narayana Guru's disciple" },
    { name: "Makara Vilakku", date: "2026-01-14", type: "Regional Holiday",  state: "Kerala",            description: "Sabarimala festival" },
    { name: "Eid al-Fitr",   date: "2026-03-20", type: "Bank Holiday",       state: "Kerala",            description: "End of Ramadan" },
    { name: "Good Friday",   date: "2026-04-03", type: "Bank Holiday",       state: "Kerala",            description: "Christian observance" },
    { name: "Vishu",         date: "2026-04-14", type: "Regional Holiday",   state: "Kerala",            description: "Malayalam New Year" },
    { name: "Labour Day",    date: "2026-05-01", type: "Regional Holiday",   state: "Kerala",            description: "International Workers' Day" },
    { name: "Bakri Eid",    date: "2026-05-27", type: "Bank Holiday",        state: "Kerala",            description: "Festival of sacrifice" },
    { name: "Eid-e-Milad",  date: "2026-08-25", type: "Bank Holiday",        state: "Kerala",            description: "Prophet Mohammed's birthday" },
    { name: "Onam (Thiruvonam)", date: "2026-09-01", type: "Regional Holiday", state: "Kerala",          description: "Kerala's major harvest festival" },
    { name: "Dussehra",     date: "2026-10-20", type: "Regional Holiday",   state: "Kerala",            description: "Victory of good over evil" },
    { name: "Christmas Day", date: "2026-12-25", type: "Bank Holiday",       state: "Kerala",            description: "Christmas — widely celebrated in Kerala" },

    // ── Madhya Pradesh ──
    { name: "Mahashivratri", date: "2026-02-15", type: "Regional Holiday",  state: "Madhya Pradesh",    description: "Festival of Shiva" },
    { name: "Holi",         date: "2026-03-04", type: "Regional Holiday",  state: "Madhya Pradesh",    description: "Festival of colours" },
    { name: "Eid al-Fitr",  date: "2026-03-20", type: "Bank Holiday",      state: "Madhya Pradesh",    description: "End of Ramadan" },
    { name: "Mahavir Jayanti", date: "2026-03-31", type: "Regional Holiday", state: "Madhya Pradesh",   description: "Birth of Lord Mahavir" },
    { name: "Good Friday",  date: "2026-04-03", type: "Bank Holiday",      state: "Madhya Pradesh",    description: "Christian observance" },
    { name: "Dr. Ambedkar Jayanti", date: "2026-04-14", type: "Regional Holiday", state: "Madhya Pradesh", description: "Birth anniversary of Dr. Ambedkar" },
    { name: "Labour Day",   date: "2026-05-01", type: "Regional Holiday",  state: "Madhya Pradesh",    description: "International Workers' Day" },
    { name: "Bakri Eid",   date: "2026-05-27", type: "Bank Holiday",       state: "Madhya Pradesh",    description: "Festival of sacrifice" },
    { name: "Janmashtami",  date: "2026-09-04", type: "Regional Holiday",  state: "Madhya Pradesh",    description: "Birth of Lord Krishna" },
    { name: "Dussehra",    date: "2026-10-20", type: "Regional Holiday",  state: "Madhya Pradesh",    description: "Victory of good over evil" },
    { name: "Diwali",      date: "2026-11-10", type: "Bank Holiday",       state: "Madhya Pradesh",    description: "Festival of lights" },
    { name: "Guru Nanak Jayanti", date: "2026-11-24", type: "Regional Holiday", state: "Madhya Pradesh", description: "Birth of Guru Nanak Dev Ji" },
    { name: "Christmas Day", date: "2026-12-25", type: "Bank Holiday",    state: "Madhya Pradesh",    description: "Christmas" },

    // ── Maharashtra ──
    { name: "Mahashivratri",   date: "2026-02-15", type: "Regional Holiday", state: "Maharashtra",      description: "Festival of Shiva" },
    { name: "Chhatrapati Shivaji Maharaj Jayanti", date: "2026-02-19", type: "State Holiday", state: "Maharashtra", description: "Birth anniversary of Maratha king Shivaji" },
    { name: "Holi / Rang Panchami", date: "2026-03-04", type: "Regional Holiday", state: "Maharashtra",  description: "Holi / Dhulwad celebrations" },
    { name: "Eid al-Fitr",   date: "2026-03-20", type: "Bank Holiday",      state: "Maharashtra",       description: "End of Ramadan" },
    { name: "Gudhi Padwa",   date: "2026-03-20", type: "State Holiday",     state: "Maharashtra",       description: "Marathi New Year — major Maharashtra festival" },
    { name: "Ram Navami",    date: "2026-03-26", type: "Regional Holiday",  state: "Maharashtra",       description: "Birth of Lord Ram" },
    { name: "Good Friday",   date: "2026-04-03", type: "Bank Holiday",      state: "Maharashtra",       description: "Christian observance" },
    { name: "Dr. Ambedkar Jayanti", date: "2026-04-14", type: "Regional Holiday", state: "Maharashtra", description: "Birth anniversary of Dr. Ambedkar — born in Maharashtra" },
    { name: "Maharashtra Day", date: "2026-05-01", type: "State Holiday",   state: "Maharashtra",       description: "Maharashtra Foundation Day" },
    { name: "Bakri Eid",    date: "2026-05-27", type: "Bank Holiday",       state: "Maharashtra",       description: "Festival of sacrifice" },
    { name: "Eid-e-Milad",  date: "2026-08-25", type: "Bank Holiday",       state: "Maharashtra",       description: "Prophet Mohammed's birthday" },
    { name: "Ganesh Chaturthi", date: "2026-09-14", type: "Regional Holiday", state: "Maharashtra",     description: "10-day Ganeshotsav — grandest in Maharashtra" },
    { name: "Dussehra",     date: "2026-10-20", type: "Regional Holiday",  state: "Maharashtra",       description: "Victory of good over evil" },
    { name: "Diwali / Lakshmi Puja", date: "2026-11-10", type: "Bank Holiday", state: "Maharashtra",   description: "Festival of lights" },
    { name: "Guru Nanak Jayanti", date: "2026-11-24", type: "Regional Holiday", state: "Maharashtra",  description: "Birth of Guru Nanak Dev Ji" },
    { name: "Christmas Day",  date: "2026-12-25", type: "Bank Holiday",    state: "Maharashtra",       description: "Christmas" },

    // ── Meghalaya ──
    { name: "Republic Day",  date: "2026-01-26", type: "National Holiday",  state: "Meghalaya",         description: "Republic Day" },
    { name: "Good Friday",   date: "2026-04-03", type: "Bank Holiday",      state: "Meghalaya",         description: "Christian observance — major in Meghalaya" },
    { name: "Easter Sunday", date: "2026-04-05", type: "Regional Holiday",  state: "Meghalaya",         description: "Easter — widely observed in Meghalaya" },
    { name: "Labour Day",    date: "2026-05-01", type: "Regional Holiday",  state: "Meghalaya",         description: "International Workers' Day" },
    { name: "Bakri Eid",    date: "2026-05-27", type: "Bank Holiday",       state: "Meghalaya",         description: "Festival of sacrifice" },
    { name: "Autumn Festival / Nongkrem Dance", date: "2026-11-05", type: "State Holiday", state: "Meghalaya", description: "Ka Nongkrem dance festival of Khasis" },
    { name: "Christmas Day", date: "2026-12-25", type: "Bank Holiday",      state: "Meghalaya",         description: "Christmas — grandly celebrated in Meghalaya" },

    // ── Odisha ──
    { name: "Makara Sankranti", date: "2026-01-14", type: "Regional Holiday", state: "Odisha",           description: "Harvest festival" },
    { name: "Holi / Doljatra",  date: "2026-03-04", type: "Regional Holiday", state: "Odisha",           description: "Doljatra — Odisha's Holi" },
    { name: "Eid al-Fitr",     date: "2026-03-20", type: "Bank Holiday",     state: "Odisha",            description: "End of Ramadan" },
    { name: "Good Friday",     date: "2026-04-03", type: "Bank Holiday",     state: "Odisha",            description: "Christian observance" },
    { name: "Maha Vishuva Sankranti (Odia New Year)", date: "2026-04-14", type: "State Holiday", state: "Odisha", description: "Odia New Year / Pana Sankranti" },
    { name: "Labour Day",      date: "2026-05-01", type: "Regional Holiday", state: "Odisha",            description: "International Workers' Day" },
    { name: "Rath Yatra",      date: "2026-06-27", type: "State Holiday",   state: "Odisha",            description: "Puri Rath Yatra — world's largest chariot festival" },
    { name: "Bakri Eid",      date: "2026-05-27", type: "Bank Holiday",     state: "Odisha",            description: "Festival of sacrifice" },
    { name: "Janmashtami",     date: "2026-09-04", type: "Regional Holiday", state: "Odisha",            description: "Birth of Lord Krishna" },
    { name: "Kumar Purnima",   date: "2026-10-26", type: "State Holiday",   state: "Odisha",            description: "Major festival for unmarried women in Odisha" },
    { name: "Dussehra",       date: "2026-10-20", type: "Regional Holiday", state: "Odisha",            description: "Victory of good over evil" },
    { name: "Christmas Day",  date: "2026-12-25", type: "Bank Holiday",     state: "Odisha",            description: "Christmas" },

    // ── Puducherry (UT) ──
    { name: "Pongal",          date: "2026-01-14", type: "Regional Holiday", state: "Puducherry (UT)",  description: "Harvest festival — major in Puducherry" },
    { name: "Eid al-Fitr",    date: "2026-03-20", type: "Bank Holiday",     state: "Puducherry (UT)",  description: "End of Ramadan" },
    { name: "Good Friday",    date: "2026-04-03", type: "Bank Holiday",     state: "Puducherry (UT)",  description: "Christian observance" },
    { name: "Tamil New Year / Dr. Ambedkar Jayanti", date: "2026-04-14", type: "Regional Holiday", state: "Puducherry (UT)", description: "Tamil New Year" },
    { name: "Labour Day",     date: "2026-05-01", type: "Regional Holiday", state: "Puducherry (UT)",  description: "International Workers' Day" },
    { name: "Bakri Eid",     date: "2026-05-27", type: "Bank Holiday",      state: "Puducherry (UT)",  description: "Festival of sacrifice" },
    { name: "Puducherry Liberation Day", date: "2026-11-01", type: "State Holiday", state: "Puducherry (UT)", description: "Puducherry Liberation Day — state specific" },
    { name: "Diwali",        date: "2026-11-10", type: "Bank Holiday",      state: "Puducherry (UT)",  description: "Festival of lights" },
    { name: "Christmas Day", date: "2026-12-25", type: "Bank Holiday",      state: "Puducherry (UT)",  description: "Christmas" },

    // ── Punjab ──
    { name: "Lohri",          date: "2026-01-13", type: "State Holiday",   state: "Punjab",            description: "Harvest festival of Punjab" },
    { name: "Guru Gobind Singh Jayanti", date: "2026-01-06", type: "State Holiday", state: "Punjab",   description: "Birthday of Sri Guru Gobind Singh Ji" },
    { name: "Mahashivratri",  date: "2026-02-15", type: "Regional Holiday", state: "Punjab",           description: "Festival of Shiva" },
    { name: "Holi",           date: "2026-03-04", type: "Regional Holiday", state: "Punjab",           description: "Festival of colours" },
    { name: "Eid al-Fitr",   date: "2026-03-20", type: "Bank Holiday",     state: "Punjab",            description: "End of Ramadan" },
    { name: "Good Friday",   date: "2026-04-03", type: "Bank Holiday",     state: "Punjab",            description: "Christian observance" },
    { name: "Baisakhi",      date: "2026-04-14", type: "Regional Holiday", state: "Punjab",            description: "Harvest festival / Khalsa Panth founding" },
    { name: "Buddha Purnima", date: "2026-05-01", type: "Regional Holiday", state: "Punjab",           description: "Birth of Gautama Buddha" },
    { name: "Bakri Eid",    date: "2026-05-27", type: "Bank Holiday",       state: "Punjab",            description: "Festival of sacrifice" },
    { name: "Janmashtami",   date: "2026-09-04", type: "Regional Holiday", state: "Punjab",            description: "Birth of Lord Krishna" },
    { name: "Maharishi Valmiki Jayanti", date: "2026-10-26", type: "State Holiday", state: "Punjab",   description: "Birth anniversary of Maharishi Valmiki" },
    { name: "Diwali",        date: "2026-11-10", type: "Bank Holiday",     state: "Punjab",            description: "Festival of lights / Bandi Chhor Divas" },
    { name: "Guru Nanak Jayanti", date: "2026-11-24", type: "Regional Holiday", state: "Punjab",       description: "Birth of Guru Nanak Dev Ji — most important in Punjab" },
    { name: "Christmas Day", date: "2026-12-25", type: "Bank Holiday",     state: "Punjab",            description: "Christmas" },

    // ── Rajasthan ──
    { name: "Mahashivratri",  date: "2026-02-15", type: "Regional Holiday", state: "Rajasthan",        description: "Festival of Shiva" },
    { name: "Holi",           date: "2026-03-04", type: "Regional Holiday", state: "Rajasthan",        description: "Festival of colours" },
    { name: "Eid al-Fitr",   date: "2026-03-20", type: "Bank Holiday",     state: "Rajasthan",         description: "End of Ramadan" },
    { name: "Ram Navami",    date: "2026-03-26", type: "Regional Holiday", state: "Rajasthan",         description: "Birth of Lord Ram" },
    { name: "Mahavir Jayanti", date: "2026-03-31", type: "Regional Holiday", state: "Rajasthan",       description: "Birth of Lord Mahavir — important in Rajasthan" },
    { name: "Good Friday",   date: "2026-04-03", type: "Bank Holiday",     state: "Rajasthan",         description: "Christian observance" },
    { name: "Dr. Ambedkar Jayanti", date: "2026-04-14", type: "Regional Holiday", state: "Rajasthan",  description: "Birth anniversary of Dr. Ambedkar" },
    { name: "Bakri Eid",    date: "2026-05-27", type: "Bank Holiday",       state: "Rajasthan",         description: "Festival of sacrifice" },
    { name: "Janmashtami",   date: "2026-09-04", type: "Regional Holiday", state: "Rajasthan",         description: "Birth of Lord Krishna" },
    { name: "Dussehra",     date: "2026-10-20", type: "Regional Holiday", state: "Rajasthan",         description: "Victory of good over evil" },
    { name: "Diwali",       date: "2026-11-10", type: "Bank Holiday",     state: "Rajasthan",         description: "Festival of lights" },
    { name: "Guru Nanak Jayanti", date: "2026-11-24", type: "Regional Holiday", state: "Rajasthan",    description: "Birth of Guru Nanak Dev Ji" },
    { name: "Christmas Day", date: "2026-12-25", type: "Bank Holiday",    state: "Rajasthan",         description: "Christmas" },

    // ── Sikkim ──
    { name: "Losar (Tibetan New Year)", date: "2026-02-18", type: "State Holiday", state: "Sikkim",    description: "Tibetan New Year — widely observed in Sikkim" },
    { name: "Holi",           date: "2026-03-04", type: "Regional Holiday", state: "Sikkim",           description: "Festival of colours" },
    { name: "Eid al-Fitr",   date: "2026-03-20", type: "Bank Holiday",     state: "Sikkim",            description: "End of Ramadan" },
    { name: "Good Friday",   date: "2026-04-03", type: "Bank Holiday",     state: "Sikkim",            description: "Christian observance" },
    { name: "Baisakh / Bihu", date: "2026-04-14", type: "Regional Holiday", state: "Sikkim",           description: "Harvest festival" },
    { name: "Labour Day",    date: "2026-05-01", type: "Regional Holiday", state: "Sikkim",            description: "International Workers' Day" },
    { name: "Bakri Eid",    date: "2026-05-27", type: "Bank Holiday",       state: "Sikkim",            description: "Festival of sacrifice" },
    { name: "Saga Dawa",     date: "2026-06-04", type: "State Holiday",    state: "Sikkim",            description: "Buddhist festival — birth of Lord Buddha (Sikkim specific)" },
    { name: "Tendong Lho Rum Faat", date: "2026-08-08", type: "State Holiday", state: "Sikkim",       description: "Ancient Lepcha festival unique to Sikkim" },
    { name: "Pang Lhabsol", date: "2026-09-12", type: "State Holiday",    state: "Sikkim",            description: "Sikkim Guardian deity festival" },
    { name: "Dussehra",     date: "2026-10-20", type: "Regional Holiday", state: "Sikkim",            description: "Victory of good over evil" },
    { name: "Christmas Day", date: "2026-12-25", type: "Bank Holiday",    state: "Sikkim",            description: "Christmas" },

    // ── Tamil Nadu ──
    { name: "Pongal (1st day)",    date: "2026-01-14", type: "Regional Holiday", state: "Tamil Nadu",  description: "Harvest festival — biggest festival in Tamil Nadu" },
    { name: "Thiruvalluvar Day",   date: "2026-01-15", type: "State Holiday",   state: "Tamil Nadu",   description: "Commemorates Tamil poet Thiruvalluvar" },
    { name: "Uzhavar Thirunal",    date: "2026-01-16", type: "State Holiday",   state: "Tamil Nadu",   description: "Farmers' Day / Mattu Pongal" },
    { name: "Eid al-Fitr",        date: "2026-03-20", type: "Bank Holiday",     state: "Tamil Nadu",   description: "End of Ramadan" },
    { name: "Good Friday",        date: "2026-04-03", type: "Bank Holiday",     state: "Tamil Nadu",   description: "Christian observance" },
    { name: "Tamil New Year / Dr. Ambedkar Jayanti", date: "2026-04-14", type: "Regional Holiday", state: "Tamil Nadu", description: "Tamil New Year (Puthandu)" },
    { name: "Labour Day",         date: "2026-05-01", type: "Regional Holiday", state: "Tamil Nadu",   description: "Tamil Nadu Labour Day" },
    { name: "Bakri Eid",         date: "2026-05-27", type: "Bank Holiday",      state: "Tamil Nadu",   description: "Festival of sacrifice" },
    { name: "Eid-e-Milad",       date: "2026-08-25", type: "Bank Holiday",      state: "Tamil Nadu",   description: "Prophet Mohammed's birthday" },
    { name: "Ayudha Puja",        date: "2026-10-19", type: "Regional Holiday", state: "Tamil Nadu",   description: "Worship of tools & instruments" },
    { name: "Vijaya Dashami",     date: "2026-10-20", type: "Regional Holiday", state: "Tamil Nadu",   description: "Victory of good over evil / Dussehra" },
    { name: "Diwali",            date: "2026-11-10", type: "Bank Holiday",      state: "Tamil Nadu",   description: "Festival of lights" },
    { name: "Christmas Day",     date: "2026-12-25", type: "Bank Holiday",      state: "Tamil Nadu",   description: "Christmas" },

    // ── Telangana ──
    { name: "Makara Sankranti",   date: "2026-01-14", type: "Regional Holiday", state: "Telangana",    description: "Harvest festival" },
    { name: "Mahashivratri",      date: "2026-02-15", type: "Regional Holiday", state: "Telangana",    description: "Festival of Shiva" },
    { name: "Holi",              date: "2026-03-04", type: "Regional Holiday", state: "Telangana",    description: "Festival of colours" },
    { name: "Eid al-Fitr",      date: "2026-03-20", type: "Bank Holiday",      state: "Telangana",    description: "End of Ramadan" },
    { name: "Ugadi",             date: "2026-03-30", type: "Regional Holiday", state: "Telangana",    description: "Telugu New Year — biggest festival in Telangana" },
    { name: "Good Friday",      date: "2026-04-03", type: "Bank Holiday",      state: "Telangana",    description: "Christian observance" },
    { name: "Dr. Ambedkar Jayanti", date: "2026-04-14", type: "Regional Holiday", state: "Telangana", description: "Birth anniversary of Dr. Ambedkar" },
    { name: "Labour Day",        date: "2026-05-01", type: "Regional Holiday", state: "Telangana",    description: "International Workers' Day" },
    { name: "Bakri Eid",        date: "2026-05-27", type: "Bank Holiday",       state: "Telangana",    description: "Festival of sacrifice" },
    { name: "Telangana Formation Day", date: "2026-06-02", type: "State Holiday", state: "Telangana", description: "Telangana state formation day" },
    { name: "Eid-e-Milad",      date: "2026-08-25", type: "Bank Holiday",       state: "Telangana",    description: "Prophet Mohammed's birthday" },
    { name: "Janmashtami",       date: "2026-09-04", type: "Regional Holiday", state: "Telangana",    description: "Birth of Lord Krishna" },
    { name: "Ganesh Chaturthi",  date: "2026-09-14", type: "Regional Holiday", state: "Telangana",    description: "11-day Ganesh festival — hugely celebrated in Hyderabad" },
    { name: "Dussehra",         date: "2026-10-20", type: "Regional Holiday", state: "Telangana",    description: "Victory of good over evil" },
    { name: "Diwali / Naraka Chaturdashi", date: "2026-11-10", type: "Bank Holiday", state: "Telangana", description: "Festival of lights" },
    { name: "Christmas Day",    date: "2026-12-25", type: "Bank Holiday",       state: "Telangana",    description: "Christmas" },

    // ── Tripura ──
    { name: "Holi",              date: "2026-03-04", type: "Regional Holiday", state: "Tripura",       description: "Festival of colours" },
    { name: "Eid al-Fitr",      date: "2026-03-20", type: "Bank Holiday",     state: "Tripura",        description: "End of Ramadan" },
    { name: "Good Friday",      date: "2026-04-03", type: "Bank Holiday",     state: "Tripura",        description: "Christian observance" },
    { name: "Garia Puja",       date: "2026-04-20", type: "State Holiday",    state: "Tripura",        description: "Tripuri harvest festival — unique to Tripura" },
    { name: "Labour Day",       date: "2026-05-01", type: "Regional Holiday", state: "Tripura",        description: "International Workers' Day" },
    { name: "Bakri Eid",       date: "2026-05-27", type: "Bank Holiday",      state: "Tripura",        description: "Festival of sacrifice" },
    { name: "Kharchi Puja",    date: "2026-07-10", type: "State Holiday",     state: "Tripura",        description: "14-deity festival unique to Tripura" },
    { name: "Ker Puja",        date: "2026-08-04", type: "State Holiday",     state: "Tripura",        description: "State festival of Tripura" },
    { name: "Janmashtami",      date: "2026-09-04", type: "Regional Holiday", state: "Tripura",        description: "Birth of Lord Krishna" },
    { name: "Durga Puja / Maha Ashtami", date: "2026-10-19", type: "Regional Holiday", state: "Tripura", description: "Durga Puja celebrations" },
    { name: "Dussehra",        date: "2026-10-20", type: "Regional Holiday", state: "Tripura",        description: "Vijayadashami" },
    { name: "Christmas Day",   date: "2026-12-25", type: "Bank Holiday",      state: "Tripura",        description: "Christmas" },

    // ── Uttar Pradesh ──
    { name: "Mahashivratri",    date: "2026-02-15", type: "Regional Holiday", state: "Uttar Pradesh",  description: "Festival of Shiva" },
    { name: "Holi",             date: "2026-03-04", type: "Regional Holiday", state: "Uttar Pradesh",  description: "Festival of colours" },
    { name: "Eid al-Fitr",     date: "2026-03-20", type: "Bank Holiday",     state: "Uttar Pradesh",  description: "End of Ramadan" },
    { name: "Ram Navami",      date: "2026-03-26", type: "Regional Holiday", state: "Uttar Pradesh",  description: "Birth of Lord Ram — especially significant in Ayodhya" },
    { name: "Mahavir Jayanti", date: "2026-03-31", type: "Regional Holiday", state: "Uttar Pradesh",  description: "Birth of Lord Mahavir" },
    { name: "Good Friday",     date: "2026-04-03", type: "Bank Holiday",     state: "Uttar Pradesh",  description: "Christian observance" },
    { name: "Dr. Ambedkar Jayanti", date: "2026-04-14", type: "Regional Holiday", state: "Uttar Pradesh", description: "Birth anniversary of Dr. Ambedkar" },
    { name: "Buddha Purnima",  date: "2026-05-01", type: "Regional Holiday", state: "Uttar Pradesh",  description: "Birth of Gautama Buddha — Buddha was enlightened in UP" },
    { name: "Bakri Eid",      date: "2026-05-27", type: "Bank Holiday",      state: "Uttar Pradesh",  description: "Festival of sacrifice" },
    { name: "Eid-e-Milad",    date: "2026-08-25", type: "Bank Holiday",      state: "Uttar Pradesh",  description: "Prophet Mohammed's birthday" },
    { name: "Janmashtami",     date: "2026-09-04", type: "Regional Holiday", state: "Uttar Pradesh",  description: "Birth of Lord Krishna — grand in Mathura & Vrindavan" },
    { name: "Dussehra",       date: "2026-10-20", type: "Regional Holiday", state: "Uttar Pradesh",  description: "Ram Leela and Dussehra" },
    { name: "Diwali / Deepawali", date: "2026-11-10", type: "Bank Holiday",  state: "Uttar Pradesh",  description: "Festival of lights" },
    { name: "Guru Nanak Jayanti", date: "2026-11-24", type: "Regional Holiday", state: "Uttar Pradesh", description: "Birth of Guru Nanak Dev Ji" },
    { name: "Christmas Day",  date: "2026-12-25", type: "Bank Holiday",     state: "Uttar Pradesh",  description: "Christmas" },

    // ── West Bengal ──
    { name: "Saraswati Puja",   date: "2026-02-02", type: "Regional Holiday", state: "West Bengal",   description: "Worship of Goddess Saraswati — widely observed in WB" },
    { name: "Holi / Doljatra",  date: "2026-03-04", type: "Regional Holiday", state: "West Bengal",   description: "Doljatra — Bengali Holi" },
    { name: "Eid al-Fitr",     date: "2026-03-20", type: "Bank Holiday",     state: "West Bengal",   description: "End of Ramadan" },
    { name: "Good Friday",     date: "2026-04-03", type: "Bank Holiday",     state: "West Bengal",   description: "Christian observance" },
    { name: "Bengali New Year (Nabo Borsho)", date: "2026-04-15", type: "State Holiday", state: "West Bengal", description: "Bengali New Year — Pohela Boishakh" },
    { name: "Labour Day",      date: "2026-05-01", type: "Regional Holiday", state: "West Bengal",   description: "International Workers' Day" },
    { name: "Bakri Eid",      date: "2026-05-27", type: "Bank Holiday",      state: "West Bengal",   description: "Festival of sacrifice" },
    { name: "Eid-e-Milad",    date: "2026-08-25", type: "Bank Holiday",      state: "West Bengal",   description: "Prophet Mohammed's birthday" },
    { name: "Durga Puja / Maha Saptami", date: "2026-10-18", type: "Regional Holiday", state: "West Bengal", description: "Durga Puja — West Bengal's biggest celebration" },
    { name: "Durga Puja / Maha Ashtami", date: "2026-10-19", type: "Regional Holiday", state: "West Bengal", description: "Maha Ashtami of Durga Puja" },
    { name: "Vijaya Dashami / Dussehra", date: "2026-10-20", type: "Regional Holiday", state: "West Bengal", description: "Vijaya Dashami — immersion of Durga idol" },
    { name: "Diwali / Kali Puja", date: "2026-11-10", type: "Bank Holiday",  state: "West Bengal",   description: "Kali Puja — uniquely celebrated in West Bengal" },
    { name: "Guru Nanak Jayanti", date: "2026-11-24", type: "Regional Holiday", state: "West Bengal", description: "Birth of Guru Nanak Dev Ji" },
    { name: "Christmas Day",  date: "2026-12-25", type: "Bank Holiday",     state: "West Bengal",   description: "Christmas — Park Street celebrations famous" },
  ];

  let id = 1;
  const allHolidays = [];
  national.forEach(h => allHolidays.push({ id: id++, ...h }));
  stateHolidays.forEach(h => allHolidays.push({ id: id++, ...h }));
  return allHolidays;
}

// ── Calendar View ─────────────────────────────────────────────
function CalendarView({ holidays }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthHolidays = holidays.filter(h => {
    const d = new Date(h.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const holidaysByDay = {};
  monthHolidays.forEach(h => {
    const day = new Date(h.date).getDate();
    if (!holidaysByDay[day]) holidaysByDay[day] = [];
    holidaysByDay[day].push(h);
  });

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();

  return (
    <div className="calendar-view">
      {/* Month Navigation */}
      <div className="cal-nav">
        <button className="cal-nav-btn" onClick={prevMonth} disabled={month === 0}>&lsaquo;</button>
        <div className="cal-month-title">{MONTHS[month]} {year}</div>
        <button className="cal-nav-btn" onClick={nextMonth} disabled={month === 11}>&rsaquo;</button>
      </div>

      {/* Day Headers */}
      <div className="cal-grid cal-header-row">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="cal-day-header">{d}</div>
        ))}
      </div>

      {/* Calendar Cells */}
      <div className="cal-grid">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} className="cal-cell cal-empty" />;
          const dayHolidays = holidaysByDay[day] || [];
          const isToday = today.getFullYear()===year && today.getMonth()===month && today.getDate()===day;
          return (
            <div key={day} className={`cal-cell${isToday ? " cal-today" : ""}${dayHolidays.length ? " cal-has-holiday" : ""}`}>
              <div className="cal-date-num">{day}</div>
              <div className="cal-dots">
                {dayHolidays.slice(0, 3).map((h, i) => {
                  const cfg = TYPE_CONFIG[h.type] || TYPE_CONFIG["Regional Holiday"];
                  return (
                    <div
                      key={i}
                      className="cal-dot-tag"
                      title={`${h.name} — ${h.type}`}
                      style={{ background: cfg.bg, color: cfg.color, borderLeft: `3px solid ${cfg.color}` }}
                    >
                      {h.name.length > 14 ? h.name.slice(0,13)+"…" : h.name}
                    </div>
                  );
                })}
                {dayHolidays.length > 3 && (
                  <div className="cal-more">+{dayHolidays.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Month Summary */}
      {monthHolidays.length > 0 ? (
        <div className="cal-month-summary">
          <div className="cal-summary-title">📋 Holidays this month ({monthHolidays.length})</div>
          {monthHolidays.map(h => {
            const cfg = TYPE_CONFIG[h.type] || TYPE_CONFIG["Regional Holiday"];
            const d = new Date(h.date);
            return (
              <div key={h.id} className="cal-summary-row">
                <span className="cal-summary-date">{d.getDate()} {MONTHS[d.getMonth()].slice(0,3)}</span>
                <span className="cal-summary-name">{h.name}</span>
                <span className="cal-summary-badge" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                  {h.type}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="cal-no-holidays">No holidays this month for selected state.</div>
      )}
    </div>
  );
}

// ── HolidayList (default export) ──────────────────────────────
function HolidayList() {
  const navigate = useNavigate();
  const role = (() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const username = localStorage.getItem("username");
    return users.find((u) => u.username === username)?.role || "viewer";
  })();
  const canAdd = role === "admin";

  const loadHolidays = () => {
    // Check both keys: holidays_v2 (seed data) and holidays (user-added)
    const stored = localStorage.getItem("holidays_v2");
    const userAdded = JSON.parse(localStorage.getItem("holidays") || "[]");
    if (stored) {
      const base = JSON.parse(stored);
      // Merge user-added holidays that aren't already in base
      const baseIds = new Set(base.map(h => h.id));
      const merged = [...base, ...userAdded.filter(h => !baseIds.has(h.id))];
      return merged;
    } else {
      const seed = getSeedData();
      localStorage.setItem("holidays_v2", JSON.stringify(seed));
      return [...seed, ...userAdded];
    }
  };

  const [allHolidays, setAllHolidays] = useState(loadHolidays);
  const [state, setState] = useState("All States");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [view, setView] = useState("list"); // "list" | "calendar"

  useEffect(() => {
    const refresh = () => setAllHolidays(loadHolidays());
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const types = ["All Types", "National Holiday", "Bank Holiday", "Restricted Holiday", "Regional Holiday", "State Holiday"];

  // For "All States" view, show National Holidays once; for specific state, show national + state holidays
  const filteredByState = allHolidays.filter(h => {
    if (state === "All States") return true;
    return h.state === "All States" || h.state === state;
  });

  const filtered = filteredByState.filter(h => {
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All Types" || h.type === typeFilter;
    return matchSearch && matchType;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleDelete = (id) => {
    if (!window.confirm("Delete this holiday?")) return;
    const updated = allHolidays.filter(h => h.id !== id);
    setAllHolidays(updated);
    localStorage.setItem("holidays_v2", JSON.stringify(updated));
    // Also sync the holidays key
    const legacy = JSON.parse(localStorage.getItem("holidays") || "[]");
    localStorage.setItem("holidays", JSON.stringify(legacy.filter(h => h.id !== id)));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <Header />
      <div className="page-content">
        {/* Page Header */}
        <div className="page-hero">
          <div className="page-hero-inner">
            <div className="page-breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-sep">›</span>
              <span>Holiday List</span>
            </div>
            <h1 className="page-title">Bank Holiday Calendar 2026</h1>
            <p className="page-desc">State-wise RBI-approved bank holidays for India 2026 — National, Regional, Bank &amp; Restricted holidays.</p>
          </div>
          {canAdd && (
            <button className="btn-primary page-hero-btn" onClick={() => navigate("/add-holiday")}>
              + Add Holiday
            </button>
          )}
        </div>

        {/* View Toggle */}
        <div className="section-inner" style={{ paddingBottom: 0 }}>
          <div className="view-toggle">
            <button className={`view-btn${view === "list" ? " active" : ""}`} onClick={() => setView("list")}>
              📋 List View
            </button>
            <button className={`view-btn${view === "calendar" ? " active" : ""}`} onClick={() => setView("calendar")}>
              📅 Calendar View
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="section-inner" style={{ paddingTop: 12, paddingBottom: 8 }}>
          <div className="type-legend">
            {Object.entries(TYPE_CONFIG).map(([type, cfg]) => (
              <div key={type} className="legend-item">
                <span className="legend-dot" style={{ background: cfg.color }} />
                <span style={{ color: cfg.color, fontWeight: 600, fontSize: 12 }}>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* State Filter */}
        <div className="section-inner" style={{ paddingTop: 8 }}>
          <div className="state-filter-label">🗺️ Select State / UT</div>
          <div className="state-filter-scroll">
            {INDIA_STATES.map(s => (
              <button
                key={s}
                className={`state-btn${state === s ? " active" : ""}`}
                onClick={() => setState(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Type Filter */}
        <div className="filter-bar">
          <input
            className="form-input filter-search"
            type="text"
            placeholder="🔍  Search holidays..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="form-input filter-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            {types.map(t => <option key={t}>{t}</option>)}
          </select>
          <div className="filter-count">
            {filtered.length} holiday{filtered.length !== 1 ? "s" : ""}{state !== "All States" ? ` in ${state}` : " (All India)"}
          </div>
        </div>

        {/* Calendar View */}
        {view === "calendar" && (
          <div className="section-inner">
            <CalendarView holidays={filtered} />
          </div>
        )}

        {/* List View */}
        {view === "list" && (
          <div className="section-inner table-wrapper">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <div className="empty-title">No holidays found</div>
                <div className="empty-desc">Try adjusting your filters or search term.</div>
              </div>
            ) : (
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Holiday Name</th>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Type</th>
                    <th>State / Scope</th>
                    <th>Description</th>
                    {canAdd && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((h, i) => {
                    const cfg = TYPE_CONFIG[h.type] || TYPE_CONFIG["Regional Holiday"];
                    const d = new Date(h.date);
                    const dayName = d.toLocaleDateString("en-IN", { weekday: "short" });
                    return (
                      <tr key={h.id}>
                        <td className="td-num">{i + 1}</td>
                        <td className="td-name">{h.name}</td>
                        <td className="td-date">{d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                        <td style={{ color: "var(--muted)", fontSize: 13 }}>{dayName}</td>
                        <td>
                          <span
                            className="type-badge"
                            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                          >
                            {h.type}
                          </span>
                        </td>
                        <td style={{ fontSize: 13 }}>
                          <span className={h.state === "All States" ? "scope-national" : "scope-state"}>
                            {h.state === "All States" ? "🇮🇳 National" : h.state}
                          </span>
                        </td>
                        <td className="td-desc">{h.description || "—"}</td>
                        {canAdd && (
                          <td className="td-actions">
                            <button className="action-btn delete" onClick={() => handleDelete(h.id)} title="Delete">🗑</button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <div className="table-footer">
              Showing <strong>{filtered.length}</strong> holidays for <strong>{state}</strong> · Year 2026
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default HolidayList;
