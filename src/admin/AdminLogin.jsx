import { useState } from "react";

import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

import "./AdminLogin.css";

// Production Backend API
const API_URL =
  "https://vikas-kumar-portfolio-5v8r.onrender.com/api";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (
        !formData.email.trim() ||
        !formData.password
      ) {
        throw new Error(
          "Email and password are required."
        );
      }

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Invalid email or password."
        );
      }

      // Save JWT token
      localStorage.setItem(
        "adminToken",
        data.token
      );

      // Save admin information
      localStorage.setItem(
        "adminData",
        JSON.stringify(data.admin)
      );

      // Redirect to dashboard
      window.location.href = "/admin";
    } catch (error) {
      setError(
        error.message ||
          "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-glow glow-one" />

      <div className="admin-login-glow glow-two" />

      <div className="admin-login-card">

        {/* Logo */}
        <div className="admin-login-logo">
          <span className="admin-logo-dot" />

          <strong>VIKAS</strong>

          <span className="admin-logo-line">
            .
          </span>
        </div>

        {/* Heading */}
        <div className="admin-login-heading">
          <span>ADMIN PANEL</span>

          <h1>
            Welcome back<span>.</span>
          </h1>

          <p>
            Sign in to manage your
            portfolio messages.
          </p>
        </div>

        {/* Form */}
        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className="admin-login-field">
            <label htmlFor="admin-email">
              EMAIL
            </label>

            <div className="admin-input-wrap">
              <Mail size={16} />

              <input
                id="admin-email"
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="admin-login-field">
            <label htmlFor="admin-password">
              PASSWORD
            </label>

            <div className="admin-input-wrap">
              <Lock size={16} />

              <input
                id="admin-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={15} />
                ) : (
                  <Eye size={15} />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2
                  size={16}
                  className="login-spinner"
                />

                SIGNING IN...
              </>
            ) : (
              <>
                SIGN IN

                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="admin-login-footer">
          <span>
            SECURE ADMIN ACCESS
          </span>

          <span>
            VIKAS KUMAR
          </span>
        </div>

      </div>
    </div>
  );
}