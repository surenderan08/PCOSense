import React, { useState, useEffect } from "react";
import { Users, BarChart3, Database, ShieldAlert, Calendar, Eye, Search, FileText } from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(
    sessionStorage.getItem("pcosense_admin_authorized") === "true"
  );
  const [passkey, setPasskey] = useState("");
  const [passkeyError, setPasskeyError] = useState("");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState("users"); // "users" or "logs"

  const handleAuthorize = (e) => {
    e.preventDefault();
    if (passkey === "admin123") {
      setIsAuthorized(true);
      sessionStorage.setItem("pcosense_admin_authorized", "true");
      setPasskeyError("");
    } else {
      setPasskeyError("Invalid passkey. Access denied.");
    }
  };

  useEffect(() => {
    if (!isAuthorized) return;
    
    const fetchAdminData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/dashboard");
        setStats(response.data.stats);
        setUsers(response.data.users);
        setPredictions(response.data.predictions);
      } catch (err) {
        console.error("Error fetching admin dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [isAuthorized]);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLogs = predictions.filter(p => 
    p.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.risk_status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthorized) {
    return (
      <div style={{ maxWidth: "400px", margin: "80px auto", padding: "0 20px" }} className="animate-fade-in">
        <div className="glass-panel" style={{ padding: "40px 32px", textAlign: "center" }}>
          <div style={{
            background: "rgba(214, 51, 132, 0.1)",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px"
          }}>
            <ShieldAlert size={30} color="var(--accent-rose)" />
          </div>
          
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "8px" }}>Owner Authorization</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "28px" }}>
            Please enter the passkey to access the owner portal database.
          </p>

          {passkeyError && (
            <div style={{
              padding: "10px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: "8px",
              color: "var(--danger)",
              fontSize: "0.82rem",
              marginBottom: "16px"
            }}>
              {passkeyError}
            </div>
          )}

          <form onSubmit={handleAuthorize} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input
              type="password"
              placeholder="Enter admin passkey"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              required
              autoFocus
            />
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Authorize Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px", color: "var(--text-secondary)" }}>
        Loading owner portal...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 60px 24px" }} className="animate-fade-in">
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800 }}>Website Owner <span className="gradient-text">Database Portal</span></h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "4px" }}>System-wide user database, analytics, and diagnostics log metrics</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid-responsive" style={{ marginBottom: "40px" }}>
          <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ background: "rgba(214, 51, 132, 0.1)", padding: "12px", borderRadius: "12px" }}>
              <Users size={24} color="var(--accent-rose)" />
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Total Registrations</p>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.total_users}</h3>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ background: "rgba(59, 130, 246, 0.1)", padding: "12px", borderRadius: "12px" }}>
              <Database size={24} color="#3b82f6" />
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Assessments Conducted</p>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.total_predictions}</h3>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ background: "rgba(16, 185, 129, 0.1)", padding: "12px", borderRadius: "12px" }}>
              <BarChart3 size={24} color="var(--success)" />
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Average Risk Score</p>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.avg_probability}%</h3>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ background: "rgba(239, 68, 68, 0.1)", padding: "12px", borderRadius: "12px" }}>
              <ShieldAlert size={24} color="var(--danger)" />
            </div>
            <div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>High Risk Prevalence</p>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-primary)" }}>{stats.high_risk_percentage}%</h3>
            </div>
          </div>
        </div>
      )}

      {/* Main Database Table Area */}
      <div className="glass-panel" style={{ padding: "28px" }}>
        {/* Toggle & Search */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "24px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          paddingBottom: "20px"
        }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setActiveSubTab("users")}
              className="btn"
              style={{
                padding: "8px 16px",
                fontSize: "0.9rem",
                backgroundColor: activeSubTab === "users" ? "var(--accent-rose)" : "rgba(255,255,255,0.03)",
                color: activeSubTab === "users" ? "white" : "var(--text-secondary)"
              }}
            >
              Users Registered
            </button>
            <button
              onClick={() => setActiveSubTab("logs")}
              className="btn"
              style={{
                padding: "8px 16px",
                fontSize: "0.9rem",
                backgroundColor: activeSubTab === "logs" ? "var(--accent-rose)" : "rgba(255,255,255,0.03)",
                color: activeSubTab === "logs" ? "white" : "var(--text-secondary)"
              }}
            >
              Diagnostic Assessment Logs
            </button>
          </div>

          <div style={{ position: "relative", width: "300px" }}>
            <Search size={16} color="var(--text-secondary)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder={`Search ${activeSubTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>

        {/* Users Table */}
        {activeSubTab === "users" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                  <th style={{ padding: "12px 16px" }}>User ID</th>
                  <th style={{ padding: "12px 16px" }}>Full Name</th>
                  <th style={{ padding: "12px 16px" }}>Username / Email</th>
                  <th style={{ padding: "12px 16px" }}>Signup Date</th>
                  <th style={{ padding: "12px 16px" }}>Tests Taken</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)", fontSize: "0.95rem" }}>
                    <td style={{ padding: "16px" }}>{u.id}</td>
                    <td style={{ padding: "16px", fontWeight: 600 }}>{u.name}</td>
                    <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{u.username}</td>
                    <td style={{ padding: "16px", color: "var(--text-secondary)" }}>
                      {new Date(u.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ padding: "2px 8px", background: "rgba(214,51,132,0.05)", borderRadius: "6px", color: "var(--accent-rose)", fontWeight: 600 }}>
                        {u.test_count} tests
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Logs Table */}
        {activeSubTab === "logs" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                  <th style={{ padding: "12px 16px" }}>Log ID</th>
                  <th style={{ padding: "12px 16px" }}>Patient Name</th>
                  <th style={{ padding: "12px 16px" }}>Assessment Date</th>
                  <th style={{ padding: "12px 16px" }}>Risk Classification</th>
                  <th style={{ padding: "12px 16px" }}>Probability</th>
                  <th style={{ padding: "12px 16px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((p, idx) => {
                  const isHigh = p.risk_status.includes("High");
                  const isMod = p.risk_status.includes("Moderate");
                  const color = isHigh ? "var(--danger)" : isMod ? "var(--warning)" : "var(--success)";
                  return (
                    <tr key={idx} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.03)", fontSize: "0.95rem" }}>
                      <td style={{ padding: "16px" }}>{p.id}</td>
                      <td style={{ padding: "16px", fontWeight: 600 }}>{p.user_name}</td>
                      <td style={{ padding: "16px", color: "var(--text-secondary)" }}>
                        {new Date(p.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td style={{ padding: "16px", color: color, fontWeight: 700 }}>{p.risk_status}</td>
                      <td style={{ padding: "16px" }}>
                        <span style={{ padding: "2px 8px", background: `${color}12`, borderRadius: "6px", color: color, fontWeight: 600 }}>
                          {p.probability}%
                        </span>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <button
                          onClick={() => setSelectedLog(p)}
                          className="btn btn-secondary"
                          style={{ padding: "6px 12px", fontSize: "0.8rem", gap: "4px" }}
                        >
                          <Eye size={12} />
                          Inspect 41 Inputs
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Log Inspector Modal */}
      {selectedLog && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div className="glass-panel animate-fade-in" style={{
            maxWidth: "750px",
            width: "100%",
            maxHeight: "90%",
            overflowY: "auto",
            padding: "32px",
            border: "1px solid rgba(214, 51, 132, 0.3)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "12px" }}>
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700 }}>Assessment Biometrics Log #{selectedLog.id}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "2px" }}>Patient: <strong>{selectedLog.user_name}</strong> • Risk Score: <strong style={{ color: "var(--accent-rose)" }}>{selectedLog.probability}%</strong></p>
              </div>
              <button 
                onClick={() => setSelectedLog(null)}
                style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "1.2rem", fontWeight: "bold" }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", fontSize: "0.85rem" }}>
              {Object.entries(selectedLog.inputs).map(([key, val]) => (
                <div key={key} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.02)", borderRadius: "6px", display: "flex", justifyContent: "space-between", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <span style={{ color: "var(--text-secondary)", marginRight: "8px" }}>{key}</span>
                  <strong style={{ color: "var(--text-primary)" }}>{typeof val === 'number' ? val.toFixed(2).replace(/\.00$/, '') : val}</strong>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "24px", textAlign: "right" }}>
              <button onClick={() => setSelectedLog(null)} className="btn btn-secondary">Close Inspector</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}