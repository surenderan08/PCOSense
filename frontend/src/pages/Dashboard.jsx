import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, History, ChevronRight, CalendarPlus } from "lucide-react";
import axios from "axios";
import RiskGauge from "../components/RiskGauge";
import DietExerciseCard from "../components/DietExerciseCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("pcosense_user") || "null");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth?mode=login");
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/predictions/history/${user.id}`);
        setHistory(response.data.history || []);
      } catch (err) {
        console.error("Error fetching prediction history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, navigate]);

  const handleSelectRecord = async (record) => {
    setDetailLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/predict", {
        ...record.inputs
      });
      setSelectedRecord({
        ...record,
        recommendations: response.data.recommendations
      });
    } catch (err) {
      console.error(err);
      alert("Failed to fetch detailed recommendations. Ensure the backend is active.");
    } finally {
      setDetailLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 60px 24px" }} className="animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800 }}>Welcome Back, <span className="gradient-text">{user.name}</span></h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "4px" }}>Monitor your PCOS risk level assessments</p>
        </div>
        <button onClick={() => navigate("/predict")} className="btn btn-primary">
          <CalendarPlus size={18} />
          New Assessment
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedRecord ? "1fr 1.2fr" : "1fr", gap: "32px", alignItems: "start" }}>
        {/* Left Side - History List */}
        <div className="glass-panel" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <History size={20} color="var(--accent-rose)" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Assessment History</h3>
          </div>

          {loading ? (
            <p style={{ color: "var(--text-secondary)" }}>Loading history...</p>
          ) : history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>No diagnostic history found. Take your first test today!</p>
              <button onClick={() => navigate("/predict")} className="btn btn-secondary">Start Prediction</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {history.map((record) => {
                const date = new Date(record.timestamp).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                });
                const isHigh = record.risk_status.includes("High");
                const isMod = record.risk_status.includes("Moderate");
                const color = isHigh ? "var(--danger)" : isMod ? "var(--warning)" : "var(--success)";

                return (
                  <div 
                    key={record.id}
                    onClick={() => handleSelectRecord(record)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px",
                      borderRadius: "12px",
                      background: selectedRecord?.id === record.id ? "rgba(214, 51, 132, 0.08)" : "rgba(255, 255, 255, 0.02)",
                      border: `1px solid ${selectedRecord?.id === record.id ? "var(--accent-rose)" : "rgba(255, 255, 255, 0.05)"}`,
                      cursor: "pointer",
                      transition: "var(--transition)"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Calendar size={12} />
                          {date}
                        </span>
                      </div>
                      <h4 style={{ fontWeight: 600, color: "var(--text-primary)" }}>{record.risk_status}</h4>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{
                        padding: "4px 10px",
                        borderRadius: "8px",
                        backgroundColor: `${color}15`,
                        color: color,
                        fontSize: "0.8rem",
                        fontWeight: 700
                      }}>
                        {record.probability}% Probability
                      </div>
                      <ChevronRight size={18} color="var(--text-secondary)" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side - Detailed Record View */}
        {selectedRecord && (
          <div className="glass-panel" style={{ padding: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Record Insights</h3>
              <button 
                onClick={() => setSelectedRecord(null)}
                style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.9rem" }}
              >
                Close View
              </button>
            </div>

            {detailLoading ? (
              <p style={{ color: "var(--text-secondary)" }}>Fetching report details...</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fade-in">
                <div style={{ display: "flex", justifyContent: "center", background: "rgba(255,255,255,0.02)", borderRadius: "12px", padding: "12px" }}>
                  <RiskGauge probability={selectedRecord.probability} riskLevel={selectedRecord.risk_status.includes("High") ? "High" : selectedRecord.risk_status.includes("Moderate") ? "Moderate" : "Low"} />
                </div>

                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>Medical Summary</h4>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                    {selectedRecord.recommendations?.medical_advice}
                  </p>
                </div>

                {selectedRecord.recommendations && (
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: "12px" }}>Personalized Health Charts</h4>
                    <DietExerciseCard recommendations={selectedRecord.recommendations} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}