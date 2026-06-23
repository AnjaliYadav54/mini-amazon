import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginPage.css";

function validate({ name, email, password, confirm }) {
  const errors = {};
  if (!name.trim()) errors.name = "Enter your name.";
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
  if (password !== confirm) errors.confirm = "Passwords do not match.";
  return errors;
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fields, setFields] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    register(fields.name, fields.email);
    navigate("/");
  }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-logo">mini<span>Amazon</span></Link>

      <div className="auth-card">
        <h1>Create account</h1>

        <form onSubmit={handleSubmit} noValidate>
          {[
            { id: "name", label: "Your name", type: "text", autoComplete: "name" },
            { id: "email", label: "Email address", type: "email", autoComplete: "email" },
          ].map(({ id, label, type, autoComplete }) => (
            <div className="form-group" key={id}>
              <label htmlFor={id}>{label}</label>
              <input
                id={id} name={id} type={type} autoComplete={autoComplete}
                value={fields[id]} onChange={handleChange}
                className={errors[id] ? "error-input" : ""}
                disabled={loading}
              />
              {errors[id] && <p className="field-error">{errors[id]}</p>}
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                id="password" name="password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
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

          <div className="form-group">
            <label htmlFor="confirm">Re-enter password</label>
            <input
              id="confirm" name="confirm"
              type={showPw ? "text" : "password"}
              autoComplete="new-password"
              value={fields.confirm} onChange={handleChange}
              className={errors.confirm ? "error-input" : ""}
              disabled={loading}
            />
            {errors.confirm && <p className="field-error">{errors.confirm}</p>}
          </div>

          <button className="auth-submit-btn" type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Create your account"}
          </button>
        </form>

        <div className="auth-divider"><span>Already have an account?</span></div>
        <Link to="/login" className="new-account-btn">Sign in</Link>
      </div>
    </div>
  );
}