import React, { useState } from "react";
import { Utensils, Dumbbell, ShieldAlert, Heart, Calendar } from "lucide-react";

export default function DietExerciseCard({ recommendations }) {
  const [dietTab, setDietTab] = useState("veg");
  const [workoutTab, setWorkoutTab] = useState("home");

  const dietList = recommendations.diet[dietTab] || [];
  const exerciseList = recommendations.exercises[workoutTab] || [];

  return (
    <div className="grid-responsive" style={{ marginTop: "24px" }}>
      {/* Diet Plan Panel */}
      <div className="glass-panel" style={{ padding: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Utensils size={24} color="var(--accent-rose)" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Healthy Indian Diet Plan</h3>
          </div>
          
          <div style={{ display: "flex", background: "rgba(255,255,255,0.03)", padding: "4px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <button 
              onClick={() => setDietTab("veg")}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                backgroundColor: dietTab === "veg" ? "var(--accent-rose)" : "transparent",
                color: dietTab === "veg" ? "white" : "var(--text-secondary)",
                transition: "var(--transition)"
              }}
            >
              Vegetarian
            </button>
            <button 
              onClick={() => setDietTab("nonveg")}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                backgroundColor: dietTab === "nonveg" ? "var(--accent-rose)" : "transparent",
                color: dietTab === "nonveg" ? "white" : "var(--text-secondary)",
                transition: "var(--transition)"
              }}
            >
              Non-Veg
            </button>
          </div>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {dietList.map((item, idx) => (
            <li key={idx} style={{ 
              display: "flex", 
              alignItems: "flex-start", 
              gap: "10px", 
              marginBottom: "14px", 
              color: "var(--text-secondary)",
              lineHeight: "1.5"
            }}>
              <span style={{ 
                color: "var(--accent-rose)", 
                fontWeight: "bold",
                marginTop: "3px" 
              }}>?</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        
        <div style={{ 
          marginTop: "20px", 
          padding: "12px", 
          borderRadius: "8px", 
          background: "rgba(214, 51, 132, 0.03)", 
          borderLeft: "4px solid var(--accent-rose)",
          fontSize: "0.85rem",
          color: "var(--text-secondary)"
        }}>
          <strong>Note:</strong> Hydration is key. Drink at least 2.5 - 3 liters of water daily. Avoid processed sugars and seed oils.
        </div>
      </div>

      {/* Exercise Plan Panel */}
      <div className="glass-panel" style={{ padding: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Dumbbell size={24} color="var(--accent-rose)" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Exercise & Fitness Routine</h3>
          </div>
          
          <div style={{ display: "flex", background: "rgba(255,255,255,0.03)", padding: "4px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <button 
              onClick={() => setWorkoutTab("home")}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                backgroundColor: workoutTab === "home" ? "var(--accent-rose)" : "transparent",
                color: workoutTab === "home" ? "white" : "var(--text-secondary)",
                transition: "var(--transition)"
              }}
            >
              Home (Yoga/HIIT)
            </button>
            <button 
              onClick={() => setWorkoutTab("gym")}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                backgroundColor: workoutTab === "gym" ? "var(--accent-rose)" : "transparent",
                color: workoutTab === "gym" ? "white" : "var(--text-secondary)",
                transition: "var(--transition)"
              }}
            >
              Gym (Weight/Cardio)
            </button>
          </div>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {exerciseList.map((item, idx) => (
            <li key={idx} style={{ 
              display: "flex", 
              alignItems: "flex-start", 
              gap: "10px", 
              marginBottom: "14px", 
              color: "var(--text-secondary)",
              lineHeight: "1.5"
            }}>
              <span style={{ 
                color: "var(--accent-rose)", 
                fontWeight: "bold",
                marginTop: "3px" 
              }}>?</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div style={{ 
          marginTop: "20px", 
          padding: "12px", 
          borderRadius: "8px", 
          background: "rgba(16, 185, 129, 0.03)", 
          borderLeft: "4px solid var(--success)",
          fontSize: "0.85rem",
          color: "var(--text-secondary)"
        }}>
          <strong>Tip:</strong> Consistency beats intensity. Aim for 30-45 minutes of daily physical activity to improve insulin response.
        </div>
      </div>
    </div>
  );
}
