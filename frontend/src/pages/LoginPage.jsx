import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginPage.css";

function validate({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";
  return errors;
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [fields, setFields] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
    setApiError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(fields.email, fields.password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setApiError(result.message);
    }
  }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-logo">mini<span>Amazon</span></Link>

      <div className="auth-card">
        <h1>Sign in</h1>

        {apiError && <div className="api-error-box">{apiError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email" name="email" type="email"
              autoComplete="email" autoFocus
              value={fields.email} onChange={handleChange}
              className={errors.email ? "error-input" : ""}
              disabled={loading}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                id="password" name="password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                value={fields.password} onChange={handleChange}
                className={errors.password ? "error-input" : ""}
                disabled={loading}
              />
              <button type="button" className="show-hide-btn" onClick={() => setShowPw((v) => !v)}>
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>

          <button className="auth-submit-btn" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p style={{ fontSize: 11, color: "#767676", marginTop: 12 }}>
          By signing in you agree to miniAmazon's Conditions of Use.
        </p>

        <div className="auth-divider"><span>New to miniAmazon?</span></div>
        <Link to="/register" className="new-account-btn">Create your account</Link>

        <div className="dev-hint">
          <strong>Dev:</strong> test@test.com / 123456
        </div>
      </div>
    </div>
  );
}