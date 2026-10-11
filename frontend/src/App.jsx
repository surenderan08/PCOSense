import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PredictionForm from "./pages/PredictionForm";
import Analytics from "./pages/Analytics";
import AdminDashboard from "./pages/AdminDashboard";
import "./app.css";

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/predict" element={<PredictionForm />} />
          <Route path="/insights" element={<Analytics />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
      <footer style={{
        textAlign: "center",
        padding: "24px",
        color: "var(--text-secondary)",
        fontSize: "0.85rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.03)",
        marginTop: "40px"
      }}>
        &copy; {new Date().getFullYear()} PCOSense AI Risk Assessment System. Built for clinical demonstration.
      </footer>
    </div>
  );
}

export default App;