import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ModelComparisonChart({ data }) {
  // Custom tooltip styles
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel" style={{ padding: "12px", border: "1px solid var(--accent-rose)" }}>
          <p style={{ fontWeight: 700, marginBottom: "4px", color: "var(--text-primary)" }}>{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} style={{ color: p.color, fontSize: "0.9rem" }}>
              {p.name}: {p.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="name" 
            stroke="var(--text-secondary)" 
            tick={{ fill: "var(--text-secondary)" }} 
            tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <YAxis 
            stroke="var(--text-secondary)" 
            tick={{ fill: "var(--text-secondary)" }} 
            tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: "15px" }} 
            tick={{ fill: "var(--text-secondary)" }}
          />
          <Bar name="Accuracy" dataKey="accuracy" fill="#d63384" radius={[4, 4, 0, 0]} />
          <Bar name="Precision" dataKey="precision" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar name="Recall" dataKey="recall" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
