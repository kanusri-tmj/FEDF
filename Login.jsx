import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

// ── Login (default export) ────────────────────────────────────
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (validUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      navigate("/");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <>
      <Header />

      <div className="auth-page">
        {/* Left panel */}
        <div className="auth-left">
          <div className="auth-tagline">
            Manage Bank <span>Holidays</span>
            <br />
            &amp; Service Schedules
          </div>
          <p className="auth-desc">
            A centralized platform for publishing bank holidays, service downtime,
            and branch operational hours with instant customer notifications.
          </p>
          <div className="auth-features">
            {[
              "Real-time customer notifications",
              "Multi-region holiday management",
              "Service downtime scheduling",
              "Export to CSV, PDF & iCal",
            ].map((f) => (
              <div className="auth-feature" key={f}>
                <div className="auth-feature-dot">✓</div>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — form */}
        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-card-header">
              <div className="auth-card-title">Welcome back</div>
              <div className="auth-card-sub">Log in to your admin account</div>
            </div>

            {error && <div className="form-alert danger">⚠ {error}</div>}

            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                className={`form-input ${error ? "error" : ""}`}
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className={`form-input ${error ? "error" : ""}`}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn-primary" onClick={handleLogin}>
              Log In →
            </button>

            <div className="auth-divider">
              New to the portal?{" "}
              <Link to="/signup" className="auth-link">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
