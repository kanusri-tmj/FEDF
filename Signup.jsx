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

// ── Signup (default export) ───────────────────────────────────
function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("viewer");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    setError("");
    setSuccess("");

    if (!username || !password || !confirm) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.username === username)) {
      setError("Username already exists. Please choose another.");
      return;
    }

    users.push({ username, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Account created successfully! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1800);
  };

  return (
    <>
      <Header />

      <div className="auth-page">
        {/* Left panel */}
        <div className="auth-left">
          <div className="auth-tagline">
            Join the <span>Bank</span>
            <br />
            Operations Team
          </div>
          <p className="auth-desc">
            Register to manage holidays, schedule service downtime, oversee branch
            hours, and keep customers informed at every step.
          </p>
          <div className="auth-features">
            {[
              "Admin & Viewer role support",
              "Branch-level access control",
              "Audit history for all changes",
              "Secure, centralized data management",
            ].map((f) => (
              <div className="auth-feature" key={f}>
                <div className="auth-feature-dot">✓</div>
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — form */}
        <div className="auth-right">
          <div className="auth-card">
            <div className="auth-card-header">
              <div className="auth-card-title">Create Account</div>
              <div className="auth-card-sub">Register for portal access</div>
            </div>

            {error && <div className="form-alert danger">⚠ {error}</div>}
            {success && <div className="form-alert success">✓ {success}</div>}

            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Role</label>
              <select
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="viewer">Viewer — Read-only access</option>
                <option value="editor">Editor — Manage holidays &amp; schedules</option>
                <option value="admin">Admin — Full system access</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Re-enter your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            <button className="btn-primary" onClick={handleSignup}>
              Create Account →
            </button>

            <div className="auth-divider">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Signup;
