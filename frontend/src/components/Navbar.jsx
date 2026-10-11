import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, LayoutDashboard, BarChart3, LogOut, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("pcosense_user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("pcosense_user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="glass-panel" style={{
      position: "sticky",
      top: "16px",
      zIndex: 100,
      margin: "0 16px 32px 16px",
      padding: "12px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: "1px",
      borderRadius: "16px"
    }}>
      <Link to="/" style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
        color: "inherit"
      }}>
        <Activity size={28} color="#d63384" />
        <span style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontSize: "1.4rem",
          background: "linear-gradient(135deg, #ff758f 0%, #d63384 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          PCOSense
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Link to="/" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}>
          Home
        </Link>
        <Link to="/predict" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}>
          Predict Risk
        </Link>
        <Link to="/insights" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}>
          Model Insights
        </Link>
        <Link to="/admin" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}>
          Owner Portal
        </Link>
        {user && (
          <Link to="/dashboard" style={{
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "0.95rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}>
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user ? (
          <>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Hi, <strong style={{ color: "var(--text-primary)" }}>{user.name}</strong>
            </span>
            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
              <LogOut size={14} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth?mode=login" className="btn btn-secondary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
              <LogIn size={14} />
              Login
            </Link>
            <Link to="/auth?mode=signup" className="btn btn-primary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
              <UserPlus size={14} />
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
