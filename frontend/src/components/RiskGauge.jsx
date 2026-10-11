import React from "react";

export default function RiskGauge({ probability, riskLevel }) {
  // SVG circle calculations
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (probability / 100) * circumference;

  // Determine color based on risk level
  const getColor = () => {
    if (riskLevel === "High") return "var(--danger)";
    if (riskLevel === "Moderate") return "var(--warning)";
    return "var(--success)";
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px"
    }}>
      <div style={{ position: "relative", width: "160px", height: "160px" }}>
        <svg width="100%" height="100%" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <span style={{
            fontSize: "2rem",
            fontWeight: 800,
            fontFamily: "var(--font-heading)",
            color: "var(--text-primary)"
          }}>
            {probability}%
          </span>
          <span style={{
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 600
          }}>
            Probability
          </span>
        </div>
      </div>
      
      <div style={{
        marginTop: "16px",
        padding: "6px 16px",
        borderRadius: "20px",
        backgroundColor: `${getColor()}15`,
        border: `1px solid ${getColor()}30`,
        color: getColor(),
        fontWeight: 700,
        fontSize: "1rem"
      }}>
        {riskLevel} Risk
      </div>
    </div>
  );
}
