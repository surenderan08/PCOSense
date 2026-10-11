import React from "react";
import { Link } from "react-router-dom";
import { Activity, ShieldCheck, Heart, Sparkles, ChevronRight, BarChart3 } from "lucide-react";

export default function Landing() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 60px 24px" }} className="animate-fade-in">
      {/* Hero Section */}
      <div style={{
        textAlign: "center",
        padding: "60px 0 80px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 16px",
          borderRadius: "20px",
          background: "rgba(214, 51, 132, 0.05)",
          border: "1px solid rgba(214, 51, 132, 0.2)",
          color: "var(--accent-rose)",
          fontSize: "0.85rem",
          fontWeight: 600,
          marginBottom: "24px"
        }}>
          <Sparkles size={14} />
          <span>AI-Powered PCOS Diagnostics & Wellness</span>
        </div>

        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 800,
          lineHeight: "1.1",
          maxWidth: "900px",
          marginBottom: "24px"
        }}>
          Early Detection of <span className="gradient-text">PCOS</span> Made Simple & Accurate
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          color: "var(--text-secondary)",
          maxWidth: "680px",
          lineHeight: "1.6",
          marginBottom: "40px"
        }}>
          Empowering women with predictive intelligence. Get instant risk insights based on our 85% accurate machine learning models, along with personalized diet and exercise plans.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/predict" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: "1.05rem" }}>
            Start Diagnostic Assessment
            <ChevronRight size={18} />
          </Link>
          <Link to="/insights" className="btn btn-secondary" style={{ padding: "14px 32px", fontSize: "1.05rem" }}>
            <BarChart3 size={18} />
            Explore ML Accuracy
          </Link>
        </div>
      </div>

      {/* Grid Features */}
      <div className="grid-responsive" style={{ marginBottom: "80px" }}>
        <div className="glass-panel" style={{ padding: "32px" }}>
          <div style={{
            background: "rgba(214, 51, 132, 0.1)",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px"
          }}>
            <Activity size={24} color="var(--accent-rose)" />
          </div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>85% Prediction Accuracy</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.5", fontSize: "0.95rem" }}>
            Powered by a Logistic Regression classification model trained on robust clinical datasets, validating over 40 variables.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: "32px" }}>
          <div style={{
            background: "rgba(16, 185, 129, 0.1)",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px"
          }}>
            <ShieldCheck size={24} color="var(--success)" />
          </div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>Privacy First & History</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.5", fontSize: "0.95rem" }}>
            Create an account securely to save your predictions, track changes in your health parameters over time, and download report histories.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: "32px" }}>
          <div style={{
            background: "rgba(59, 130, 246, 0.1)",
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px"
          }}>
            <Heart size={24} color="#3b82f6" />
          </div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "12px" }}>Tailored Indian Care</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.5", fontSize: "0.95rem" }}>
            Receive customized Indian diet charts (vegetarian/non-vegetarian options) and specific gym or home workouts (yoga/HIIT) matching your risk score.
          </p>
        </div>
      </div>

      {/* Analytics Briefing */}
      <div className="glass-panel" style={{
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        borderRadius: "24px"
      }}>
        <div style={{ maxWidth: "600px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "16px" }}>Medical Science Meets Machine Learning</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
            PCOS (Polycystic Ovary Syndrome) affects 1 in 5 women in India. Early screening helps mitigate long-term complications like insulin resistance, diabetes, and cardiovascular health risks. Our model leverages clinical data parameters including hormonal levels, ultrasound follicle counts, and lifestyle indices.
          </p>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          paddingTop: "32px"
        }}>
          <div>
            <h4 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-rose)", marginBottom: "4px" }}>85%</h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Logistic Regression (Highest)</p>
          </div>
          <div>
            <h4 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px" }}>81%</h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Naive Bayes Classifier</p>
          </div>
          <div>
            <h4 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px" }}>76%</h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Decision Tree Model</p>
          </div>
          <div>
            <h4 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px" }}>40+</h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Biometric & Lab Features</p>
          </div>
        </div>
      </div>
    </div>
  );
}