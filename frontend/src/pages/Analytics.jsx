import React, { useState, useEffect } from "react";
import { BarChart3, HelpCircle, Layers, CheckCircle2, ChevronRight } from "lucide-react";
import axios from "axios";
import ModelComparisonChart from "../components/ModelComparisonChart";

export default function Analytics() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/analytics");
        setModels(response.data.models || []);
      } catch (err) {
        console.error("Error fetching analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px 60px 24px" }} className="animate-fade-in">
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800 }}>Model <span className="gradient-text">Insights</span> & Performance</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "4px" }}>Performance analysis of trained algorithms on the PCOS dataset</p>
      </div>

      {loading ? (
        <p style={{ color: "var(--text-secondary)" }}>Loading analytics...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {/* Comparison Graph */}
          <div className="glass-panel" style={{ padding: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <BarChart3 size={22} color="var(--accent-rose)" />
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700 }}>Algorithm Comparison (Accuracy, Precision, Recall)</h3>
            </div>
            <ModelComparisonChart data={models} />
          </div>

          {/* Model Breakdown cards */}
          <div className="grid-responsive">
            {models.map((m, idx) => {
              const isLR = m.name.includes("Logistic");
              return (
                <div key={idx} className="glass-panel" style={{ padding: "24px", border: isLR ? "1px solid rgba(214, 51, 132, 0.4)" : "1px solid var(--glass-border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                    <h4 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{m.name}</h4>
                    <span style={{ 
                      fontSize: "0.75rem", 
                      padding: "4px 8px", 
                      borderRadius: "6px", 
                      background: isLR ? "rgba(214,51,132,0.1)" : "rgba(255,255,255,0.03)",
                      color: isLR ? "var(--accent-rose)" : "var(--text-secondary)",
                      fontWeight: 600
                    }}>
                      {m.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Accuracy</span>
                      <strong style={{ color: "var(--text-primary)" }}>{m.accuracy}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Precision</span>
                      <strong style={{ color: "var(--text-primary)" }}>{m.precision}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>Recall</span>
                      <strong style={{ color: "var(--text-primary)" }}>{m.recall}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>F1-Score</span>
                      <strong style={{ color: "var(--text-primary)" }}>{m.f1}%</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Research Context Panel */}
          <div className="glass-panel" style={{ padding: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Layers size={20} color="var(--accent-rose)" />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Dataset & Preprocessing Methodology</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.6" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <CheckCircle2 size={16} color="var(--accent-rose)" style={{ marginTop: "4px", flexShrink: 0 }} />
                <span><strong>Data Splitting:</strong> The Kaggle clinical database was cleaned and divided into <strong>80% training data</strong> (to fit the algorithms) and <strong>20% testing data</strong> (to evaluate predictive strength on unseen patient profiles).</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <CheckCircle2 size={16} color="var(--accent-rose)" style={{ marginTop: "4px", flexShrink: 0 }} />
                <span><strong>Feature Cleaning:</strong> Removed unique identifiers like serial numbers and patient file keys. Substituted empty/non-numeric artifacts with the column-wise calculated median value to construct a normalized, high-density baseline dataset.</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <CheckCircle2 size={16} color="var(--accent-rose)" style={{ marginTop: "4px", flexShrink: 0 }} />
                <span><strong>Feature Scaling:</strong> Applied a standard scaler to fit features to a unit variance before training standard distance-based/linear classifiers (Logistic Regression and Naive Bayes) to ensure stability and uniform parameter influence.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}