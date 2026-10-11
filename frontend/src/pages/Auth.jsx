import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Mail, User, AlertCircle } from "lucide-react";
import axios from "axios";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const isLoginMode = searchParams.get("mode") !== "signup";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const url = isLoginMode 
      ? "http://localhost:5000/api/auth/login" 
      : "http://localhost:5000/api/auth/signup";

    const payload = isLoginMode 
      ? { username, password } 
      : { username, password, name };

    try {
      const response = await axios.post(url, payload);
      if (isLoginMode) {
        localStorage.setItem("pcosense_user", JSON.stringify(response.data.user));
        navigate("/dashboard");
        window.location.reload();
      } else {
        navigate("/auth?mode=login");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "40px auto", padding: "0 20px" }} className="animate-fade-in">
      <div className="glass-panel" style={{ padding: "40px 32px" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "8px", textAlign: "center" }}>
          {isLoginMode ? "Welcome Back" : "Create Account"}
        </h2>
        <p style={{ color: "var(--text-secondary)", textAlign: "center", marginBottom: "28px", fontSize: "0.9rem" }}>
          {isLoginMode ? "Access your personal PCOSense dashboard" : "Register to track your diagnostics health history"}
        </p>

        {error && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            borderRadius: "8px",
            color: "var(--danger)",
            fontSize: "0.85rem",
            marginBottom: "20px"
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {!isLoginMode && (
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <User size={16} color="var(--text-secondary)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: "42px" }}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
              Username / Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="var(--text-secondary)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="jane.doe@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ paddingLeft: "42px" }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="var(--text-secondary)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "42px" }}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }} disabled={loading}>
            {loading ? "Processing..." : isLoginMode ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <span 
            onClick={() => navigate(isLoginMode ? "/auth?mode=signup" : "/auth?mode=login")}
            style={{ color: "var(--accent-rose)", cursor: "pointer", fontWeight: 600 }}
          >
            {isLoginMode ? "Sign Up" : "Log In"}
          </span>
        </div>
      </div>
    </div>
  );
}